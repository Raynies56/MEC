import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { getSession } from '@/lib/auth/session';
import { blockedSlotSchema } from '@/lib/validations';


export async function GET(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  const supabase = getServiceSupabase();
  let query = supabase.from('blocked_slots').select('*');
  if (date) query = query.eq('date', date);

  const { data, error } = await query;
  if (error) {
    console.error('[API] blocked-slots GET error:', error.message);
    return NextResponse.json({ error: 'Error al obtener horarios bloqueados' }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate with Zod
    const result = blockedSlotSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.errors[0];
      return NextResponse.json(
        { error: firstError?.message || 'Datos no válidos' },
        { status: 400 }
      );
    }

    const validated = result.data;
    const supabase = getServiceSupabase();

    const { data, error } = await supabase
      .from('blocked_slots')
      .insert([{
        date: validated.date,
        time: validated.time,
        reason: validated.reason || null,
      }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('[API] blocked-slots POST error:', error.message);
    return NextResponse.json(
      { error: 'Error al bloquear horario' },
      { status: 500 }
    );
  }
}
