// /lib/email-templates.ts

import { Appointment } from "@/types/admin";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const CLINIC_INFO = {
  name: "Centro Oftalmológico Visión Plena",
  address: "Av. Abraham Lincoln #1002, Santo Domingo",
  phone: "+1 (809) 555-0123",
  maps: "https://goo.gl/maps/example"
};

export const confirmationEmail = (appointment: Appointment) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
    <h2 style="color: #14b8a6; text-align: center;">¡Cita Confirmada!</h2>
    <p>Hola <strong>${appointment.patient_name}</strong>,</p>
    <p>Tu cita con la Dra. Valentina Reyes ha sido confirmada con los siguientes detalles:</p>
    <div style="background: #f9fafb; padding: 15px; border-radius: 10px; margin: 20px 0;">
      <p><strong>Motivo:</strong> ${appointment.reason}</p>
      <p><strong>Fecha:</strong> ${format(new Date(appointment.date + 'T00:00:00'), "EEEE d 'de' MMMM, yyyy", { locale: es })}</p>
      <p><strong>Hora:</strong> ${appointment.time.substring(0, 5)}</p>
    </div>
    <p><strong>Ubicación:</strong> ${CLINIC_INFO.address}</p>
    <div style="text-align: center; margin-top: 30px;">
      <a href="${CLINIC_INFO.maps}" style="background: #14b8a6; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">Ver ubicación en Google Maps</a>
    </div>
    <hr style="margin-top: 40px; border: 0; border-top: 1px solid #eee;">
    <p style="font-size: 12px; color: #666; text-align: center;">Si necesitas cancelar o reagendar, por favor contáctanos al ${CLINIC_INFO.phone}</p>
  </div>
`;

export const cancellationEmail = (appointment: Appointment, reason: string) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
    <h2 style="color: #ef4444; text-align: center;">Cita Cancelada</h2>
    <p>Hola <strong>${appointment.patient_name}</strong>,</p>
    <p>Te informamos que tu cita programada para el día ${appointment.date} ha sido cancelada.</p>
    <p><strong>Motivo de cancelación:</strong> ${reason}</p>
    <p>Para reagendar tu cita, puedes llamarnos directamente al <strong>${CLINIC_INFO.phone}</strong> o visitar nuestro sitio web.</p>
    <div style="text-align: center; margin-top: 30px;">
      <a href="https://visionplena.com.do/citas" style="background: #14b8a6; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold;">Reagendar Cita Online</a>
    </div>
  </div>
`;

export const rescheduleEmail = (appointment: Appointment) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 15px;">
    <h2 style="color: #3b82f6; text-align: center;">Cita Reagendada</h2>
    <p>Hola <strong>${appointment.patient_name}</strong>,</p>
    <p>Tu cita ha sido reagendada exitosamente. Aquí están los nuevos detalles:</p>
    <div style="background: #f9fafb; padding: 15px; border-radius: 10px; margin: 20px 0;">
      <p><strong>Nueva Fecha:</strong> ${format(new Date(appointment.date + 'T00:00:00'), "EEEE d 'de' MMMM, yyyy", { locale: es })}</p>
      <p><strong>Nueva Hora:</strong> ${appointment.time.substring(0, 5)}</p>
    </div>
    <p>La ubicación y el motivo de consulta se mantienen iguales.</p>
  </div>
`;

