import { z } from "zod";

/* ── Shared validation schemas ── */

/** Appointment creation from the public booking form */
export const appointmentSchema = z.object({
  patient_name: z
    .string()
    .trim()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre es demasiado largo")
    .regex(/^[a-zA-ZÀ-ÿ\s'.,-]+$/, "El nombre contiene caracteres no válidos"),

  patient_phone: z
    .string()
    .trim()
    .min(7, "Número de teléfono no válido")
    .max(20, "Número de teléfono demasiado largo")
    .regex(/^[\d\s\-+()]+$/, "Formato de teléfono no válido"),

  patient_email: z
    .string()
    .trim()
    .email("Correo electrónico no válido")
    .max(254)
    .optional()
    .or(z.literal("")),

  reason: z
    .string()
    .trim()
    .max(500, "El motivo es demasiado largo")
    .optional()
    .or(z.literal("")),

  is_first_visit: z.boolean().optional().default(false),

  notes: z
    .string()
    .trim()
    .max(1000, "Las notas son demasiado largas")
    .optional()
    .or(z.literal("")),

  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha no válido (YYYY-MM-DD)"),

  time: z
    .string()
    .regex(/^\d{2}:\d{2}(:\d{2})?$/, "Formato de hora no válido (HH:MM)"),

  status: z
    .enum(["pending", "confirmed", "cancelled", "completed"])
    .optional()
    .default("pending"),
});

/** Blocked slot creation (admin only) */
export const blockedSlotSchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha no válido"),
  time: z
    .string()
    .regex(/^\d{2}:\d{2}(:\d{2})?$/, "Formato de hora no válido"),
  reason: z
    .string()
    .trim()
    .max(500)
    .optional()
    .or(z.literal("")),
});

/** Admin login */
export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Correo electrónico no válido")
    .max(254),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(128),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
export type BlockedSlotInput = z.infer<typeof blockedSlotSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
