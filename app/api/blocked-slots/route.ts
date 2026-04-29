import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { getSession } from '@/lib/session';


export async function GET(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  const supabase = getServiceSupabase();
  let query = supabase.from('blocked_slots').select('*');
  if (date) query = query.eq('date', date);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const supabase = getServiceSupabase();

    const { data, error } = await supabase
      .from('blocked_slots')
      .insert([{
        date: body.date,
        time: body.time,
        reason: body.reason
      }])
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
