export interface Appointment {
  id?: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string;
  reason: string;
  is_first_visit: boolean;
  notes?: string;
  date: string;
  time: string;
  status?: 'pending' | 'confirmed' | 'cancelled' | 'rescheduled';
  doctor_notes?: string;
  cancel_token?: string;
  created_at?: string;
}

export interface BlockedSlot {
  id?: string;
  date: string;
  time?: string | null;
  reason?: string;
}

export interface ScheduleConfig {
  id?: string;
  day_of_week: number;
  is_active: boolean;
  start_time: string;
  end_time: string;
  slot_duration: number;
  max_per_day: number;
}
