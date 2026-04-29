import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';
import { getSession } from '@/lib/auth/session';


// Helper to generate slots
function generateTimeSlots(isSaturday: boolean) {
  const slots = [];
  const startHour = 8;
  const endHour = isSaturday ? 13 : 18;
  for (let h = startHour; h < endHour; h++) {
    const hh = h.toString().padStart(2, '0');
    slots.push(`${hh}:00`);
    if (!(h === endHour - 1 && isSaturday)) slots.push(`${hh}:30`);
  }
  return slots;
}

export async function GET(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const dateStr = searchParams.get('date') || new Date().toISOString().split('T')[0];
  
  const supabase = getServiceSupabase();
  const dateObj = new Date(dateStr + 'T00:00:00');
  const isSaturday = dateObj.getDay() === 6;

  try {
    // 1. Get appointments
    const { data: appointments } = await supabase
      .from('appointments')
      .select('id, patient_name, reason, time, status')
      .eq('date', dateStr)
      .neq('status', 'cancelled');

    // 2. Get blocked slots
    const { data: blocked } = await supabase
      .from('blocked_slots')
      .select('id, time, reason')
      .eq('date', dateStr);

    const allSlots = generateTimeSlots(isSaturday);
    
    const schedule = allSlots.map(time => {
      const appt = appointments?.find(a => a.time.startsWith(time));
      const block = blocked?.find(b => b.time?.startsWith(time) || b.time === null);

      return {
        time,
        type: appt ? 'appointment' : (block ? 'blocked' : 'free'),
        data: appt || block || null
      };
    });

    return NextResponse.json({ date: dateStr, schedule });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

