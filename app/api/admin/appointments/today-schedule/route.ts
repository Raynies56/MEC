// /app/api/admin/appointments/today-schedule/route.ts

import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { getTodaySchedule } from "@/lib/appointments";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

  try {
    const slots = await getTodaySchedule(date);
    return NextResponse.json(slots);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
