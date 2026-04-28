// /app/api/admin/appointments/[id]/route.ts

import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";
import { updateAppointment, getAppointmentById } from "@/lib/db/appointments";
import { Resend } from "resend";
import { confirmationEmail, cancellationEmail, rescheduleEmail } from "@/lib/email-templates";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const updateSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled', 'rescheduled']).optional(),
  new_date: z.string().optional(),
  new_time: z.string().optional(),
  doctor_notes: z.string().optional(),
  notify_patient: z.boolean().optional().default(false),
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getSession();
  if (!session.isLoggedIn) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = updateSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const { status, new_date, new_time, doctor_notes, notify_patient } = result.data;
    
    // 1. Obtener cita actual para el email
    const currentApt = await getAppointmentById(id);
    if (!currentApt) {
      return NextResponse.json({ error: "Cita no encontrada" }, { status: 404 });
    }

    // 2. Realizar actualización
    const updatedData: any = {};
    if (status) updatedData.status = status;
    if (new_date) updatedData.date = new_date;
    if (new_time) updatedData.time = new_time;
    if (doctor_notes !== undefined) updatedData.doctor_notes = doctor_notes;

    const updatedApt = await updateAppointment(id, updatedData);

    // 3. Notificar al paciente si se solicita
    if (notify_patient) {
      let emailHtml = "";
      let subject = "";

      if (status === 'confirmed') {
        emailHtml = confirmationEmail(updatedApt);
        subject = "Confirmación de Cita - Centro Oftalmológico Visión Plena";
      } else if (status === 'cancelled') {
        emailHtml = cancellationEmail(updatedApt, doctor_notes || "Requerimiento de la clínica");
        subject = "Cancelación de Cita - Centro Oftalmológico Visión Plena";
      } else if (status === 'rescheduled' || new_date || new_time) {
        emailHtml = rescheduleEmail(updatedApt);
        subject = "Cita Reagendada - Centro Oftalmológico Visión Plena";
      }

      if (emailHtml) {
        try {
          await resend.emails.send({
            from: "Visión Plena <noreply@visionplena.com.do>",
            to: updatedApt.patient_email,
            subject: subject,
            html: emailHtml,
          });
        } catch (emailErr) {
          console.error("Error enviando email:", emailErr);
          // No bloqueamos la respuesta principal si el email falla
        }
      }
    }

    return NextResponse.json(updatedApt);
  } catch (error: any) {
    console.error("Update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
