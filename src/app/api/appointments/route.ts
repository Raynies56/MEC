import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { getSession } from '@/lib/auth/session';
import { appointmentSchema } from '@/lib/validations';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';


export async function GET(request: Request) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');
  const status = searchParams.get('status');
  const search = searchParams.get('search');
  const tab = searchParams.get('tab'); // 'today', 'upcoming', 'all', 'cancelled'
  const page = parseInt(searchParams.get('page') || '1');
  const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50); // Cap at 50

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const supabase = getServiceSupabase();
  let query = supabase.from('appointments').select('*', { count: 'exact' });

  // Tab filters
  const today = new Date().toISOString().split('T')[0];
  if (tab === 'today') {
    query = query.eq('date', today).neq('status', 'cancelled');
  } else if (tab === 'upcoming') {
    query = query.gte('date', today).neq('status', 'cancelled');
  } else if (tab === 'cancelled') {
    query = query.eq('status', 'cancelled');
  }

  // Parameter filters
  if (date) query = query.eq('date', date);
  if (status) query = query.eq('status', status);
  if (search) {
    // Sanitize search to prevent injection
    const sanitized = search.replace(/[%_]/g, '');
    query = query.or(`patient_name.ilike.%${sanitized}%,patient_phone.ilike.%${sanitized}%`);
  }

  // Sort and Paginate
  query = query
    .order('date', { ascending: tab !== 'cancelled' })
    .order('time', { ascending: true })
    .range(from, to);

  const { data, error, count } = await query;

  if (error) {
    console.error('[API] appointments GET error:', error.message);
    return NextResponse.json({ error: 'Error al obtener citas' }, { status: 500 });
  }

  return NextResponse.json({
    data,
    total: count,
    pages: Math.ceil((count || 0) / limit),
  });
}

export async function POST(request: Request) {
  // Rate limit: 5 appointment creations per minute per IP
  const ip = getClientIP(request);
  const { allowed, remaining, resetIn } = checkRateLimit(`appointments:${ip}`, 5, 60_000);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Intente de nuevo más tarde.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(resetIn / 1000)),
          'X-RateLimit-Remaining': '0',
        },
      }
    );
  }

  try {
    const body = await request.json();

    // Validate with Zod
    const result = appointmentSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.errors[0];
      return NextResponse.json(
        { error: firstError?.message || 'Datos no válidos' },
        { status: 400 }
      );
    }

    const validated = result.data;
    const supabase = getServiceSupabase();

    // Check if slot is taken
    const { data: existing } = await supabase
      .from('appointments')
      .select('id')
      .eq('date', validated.date)
      .eq('time', validated.time)
      .neq('status', 'cancelled');

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: 'Este horario ya no está disponible' },
        { status: 409 }
      );
    }

    // Insert validated data only
    const { data, error } = await supabase
      .from('appointments')
      .insert([
        {
          patient_name: validated.patient_name,
          patient_phone: validated.patient_phone,
          patient_email: validated.patient_email || null,
          reason: validated.reason || null,
          is_first_visit: validated.is_first_visit,
          notes: validated.notes || null,
          date: validated.date,
          time: validated.time,
          status: validated.status,
        },
      ])
      .select('id')
      .single();

    if (error) throw error;

    return NextResponse.json(
      { success: true, appointment_id: data.id },
      {
        headers: {
          'X-RateLimit-Remaining': String(remaining),
        },
      }
    );
  } catch (err: any) {
    // Demo fallback
    const isPlaceholder = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes('placeholder');
    if (isPlaceholder || err.message?.includes('fetch')) {
      console.log('SIMULANDO RESERVA EXITOSA (MODO DEMO)');
      return NextResponse.json({
        success: true,
        appointment_id: 'demo-' + Math.random().toString(36).substr(2, 9),
        note: 'MODO DEMO',
      });
    }

    console.error('[API] appointments POST error:', err.message);
    return NextResponse.json(
      { error: 'Ha ocurrido un error. Intente de nuevo.' },
      { status: 500 }
    );
  }
}
