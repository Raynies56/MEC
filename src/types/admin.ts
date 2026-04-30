// /types/admin.ts

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'rescheduled';

export type AppointmentReason = 
  | 'Consulta General' 
  | 'Evaluación de Lentes' 
  | 'Dolor Ocular' 
  | 'Visión Borrosa' 
  | 'Seguimiento' 
  | 'Glaucoma' 
  | 'Cataratas' 
  | 'Emergencia Ocular' 
  | 'Otro';

export interface Appointment {
  id: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string;
  reason: AppointmentReason;
  is_first_visit: boolean;
  notes: string | null;
  date: string;           // YYYY-MM-DD
  time: string;           // HH:MM:SS from Postgres, UI uses HH:MM
  status: AppointmentStatus;
  doctor_notes: string | null;
  cancel_token: string;
  created_at: string;
  updated_at: string;
}

export interface BlockedSlot {
  id: string;
  date: string;
  time: string | null;
  reason: string | null;
  created_at: string;
}

export interface TimeSlot {
  time: string;           // "08:00"
  available: boolean;
  appointment: Appointment | null;
  blocked: boolean;
  blockReason: string | null;
  blockId?: string;       // ID del bloqueo para poder eliminarlo
}

export interface AppointmentsResponse {
  appointments: Appointment[];
  total: number;
  pages: number;
  currentPage: number;
}

export interface AdminSession {
  userId: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

export interface SessionData {
  userId: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
}

