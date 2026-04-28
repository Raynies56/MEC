// /app/api/admin/appointments/route.ts

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { getAppointments, createManualAppointment } from "@/lib/db/appointments";
import { z } from "zod";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const tab = searchParams.get("tab") || "all";
  const search = searchParams.get("search") || "";
  const date = searchParams.get("date") || "";
  const status = searchParams.get("status") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  try {
    const data = await getAppointments({ tab, search, date, status, page, limit });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

const appointmentSchema = z.object({
  patient_name: z.string().min(3),
  patient_phone: z.string().min(10),
  patient_email: z.string().email(),
  reason: z.any(), // AppointmentReason type
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string(),
  is_first_visit: z.boolean().optional(),
  notes: z.string().optional(),
  status: z.string().optional().default("confirmed"),
});

export async function POST(request: Request) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = appointmentSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.format() }, { status: 400 });
    }

    const newAppointment = await createManualAppointment(result.data as any);
    return NextResponse.json(newAppointment);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

