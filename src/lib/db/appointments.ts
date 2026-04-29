// /lib/appointments.ts

import { supabaseAdmin } from "../supabase-admin";
import { Appointment, AppointmentsResponse, TimeSlot } from "@/types/admin";

interface GetAppointmentsParams {
  tab?: string;
  search?: string;
  date?: string;
  status?: string;
  page: number;
  limit: number;
}

/**
 * Obtiene citas con filtros y paginación
 */
export async function getAppointments({
  tab,
  search,
  date,
  status,
  page,
  limit
}: GetAppointmentsParams): Promise<AppointmentsResponse> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabaseAdmin
    .from("appointments")
    .select("*", { count: "exact" });

  const today = new Date().toISOString().split("T")[0];

  // Aplicar filtros de Tabs
  if (tab === "today") {
    query = query.eq("date", today).neq("status", "cancelled");
  } else if (tab === "upcoming") {
    query = query.gte("date", today).neq("status", "cancelled");
  } else if (tab === "cancelled") {
    query = query.eq("status", "cancelled");
  }

  // Filtros adicionales
  if (date) query = query.eq("date", date);
  if (status) query = query.eq("status", status);
  if (search) {
    query = query.or(`patient_name.ilike.%${search}%,patient_phone.ilike.%${search}%`);
  }

  // Orden y Paginación
  const { data, error, count } = await query
    .order("date", { ascending: tab !== "cancelled" })
    .order("time", { ascending: true })
    .range(from, to);

  if (error) throw error;

  return {
    appointments: data as Appointment[],
    total: count || 0,
    pages: Math.ceil((count || 0) / limit),
    currentPage: page
  };
}

/**
 * Obtiene una cita por ID
 */
export async function getAppointmentById(id: string): Promise<Appointment | null> {
  const { data, error } = await supabaseAdmin
    .from("appointments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data as Appointment;
}

/**
 * Actualiza una cita
 */
export async function updateAppointment(id: string, data: Partial<Appointment>): Promise<Appointment> {
  // Aseguramos que actualizamos updated_at
  const updatePayload = {
    ...data,
    updated_at: new Date().toISOString()
  };

  const { data: updated, error } = await supabaseAdmin
    .from("appointments")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return updated as Appointment;
}

/**
 * Genera la agenda del día con slots y disponibilidad
 */
export async function getTodaySchedule(dateStr: string): Promise<TimeSlot[]> {
  const dateObj = new Date(dateStr + 'T00:00:00');
  const dayOfWeek = dateObj.getDay();

  // 1. Obtener configuración de ese día semanal
  const { data: config } = await supabaseAdmin
    .from("schedule_config")
    .select("*")
    .eq("day_of_week", dayOfWeek)
    .single();

  if (!config || !config.is_active) return [];

  // 2. Obtener citas y bloqueos existentes
  const { data: appointments } = await supabaseAdmin
    .from("appointments")
    .select("*")
    .eq("date", dateStr)
    .neq("status", "cancelled");

  const { data: blocked } = await supabaseAdmin
    .from("blocked_slots")
    .select("*")
    .eq("date", dateStr);

  // 3. Generar slots
  const slots: TimeSlot[] = [];
  const start = config.start_time; // HH:MM:SS
  const end = config.end_time;
  const duration = config.slot_duration; // mins

  let current = new Date(`2000-01-01T${start}`);
  const endTime = new Date(`2000-01-01T${end}`);

  while (current < endTime) {
    const timeStr = current.toTimeString().substring(0, 5); // "HH:MM"
    
    // Buscar si hay cita en este slot
    const appt = appointments?.find(a => a.time.startsWith(timeStr)) || null;
    
    // Buscar si está bloqueado
    const block = blocked?.find(b => b.time?.startsWith(timeStr) || b.time === null) || null;

    slots.push({
      time: timeStr,
      available: !appt && !block,
      appointment: appt as Appointment | null,
      blocked: !!block,
      blockReason: block?.reason || null
    });

    current = new Date(current.getTime() + duration * 60000);
  }

  return slots;
}

/**
 * Crea una cita manualmente desde el panel
 */
export async function createManualAppointment(data: Partial<Appointment>): Promise<Appointment> {
  const { data: created, error } = await supabaseAdmin
    .from("appointments")
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return created as Appointment;
}

