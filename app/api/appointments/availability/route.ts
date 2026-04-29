import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

// Generates time slots from 8:00 AM to 5:30 PM (or 1:00 PM on Saturdays)
function generateTimeSlots(dateString: string) {
  const dateObj = new Date(dateString + 'T00:00:00'); // Local time assumption for simplicity
  const isSaturday = dateObj.getDay() === 6;
  const isSunday = dateObj.getDay() === 0;

  if (isSunday) return [];

  const slots = [];
  const startHour = 8; // 8:00 AM
  const endHour = isSaturday ? 13 : 18; // 1:00 PM or 6:00 PM

  for (let h = startHour; h < endHour; h++) {
    const hourStr = h.toString().padStart(2, '0');
    slots.push(`${hourStr}:00`);
    // If not the very last slot of the day, add X:30
    if (!(h === endHour - 1 && isSaturday)) {
      slots.push(`${hourStr}:30`);
    }
  }

  // Remove 18:30 since Clinic closes at 18:00
  return slots.filter(s => s !== "18:30");
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: 'Date is required' }, { status: 400 });
  }

  const supabase = getServiceSupabase();

  try {
    // Get all appointments for this date
    const { data: appointments, error } = await supabase
      .from('appointments')
      .select('time')
      .eq('date', date)
      .neq('status', 'cancelled');

    if (error) throw error;

    const bookedTimes = appointments?.map(a => a.time.substring(0, 5)) || []; // "HH:MM"
    const allSlots = generateTimeSlots(date);

    const slotsWithAvailability = allSlots.map(time => {
      // Very basic logic. Could cross-reference against "blocked_slots" table as well.
      return {
        time,
        available: !bookedTimes.includes(time),
      };
    });

    return NextResponse.json({ slots: slotsWithAvailability });
  } catch (error: any) {
    // DEMO FALLBACK
    const isPlaceholder = process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("placeholder");
    if (isPlaceholder || error.message?.includes("fetch")) {
      const allSlots = generateTimeSlots(date);
      return NextResponse.json({ 
        slots: allSlots.map(time => ({ time, available: true })),
        note: "MODO DEMO"
      });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
