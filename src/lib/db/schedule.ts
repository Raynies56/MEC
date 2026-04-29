// /lib/schedule.ts

import { supabaseAdmin } from "../supabase-admin";
import { BlockedSlot } from "@/types/admin";

/**
 * Obtiene slots bloqueados para una fecha
 */
export async function getBlockedSlots(date: string): Promise<BlockedSlot[]> {
  const { data, error } = await supabaseAdmin
    .from("blocked_slots")
    .select("*")
    .eq("date", date);

  if (error) throw error;
  return data as BlockedSlot[];
}

/**
 * Registra un nuevo bloqueo de horario
 */
export async function createBlockedSlot(data: { date: string; time?: string; reason?: string }): Promise<BlockedSlot> {
  const { data: created, error } = await supabaseAdmin
    .from("blocked_slots")
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return created as BlockedSlot;
}

/**
 * Elimina un bloqueo
 */
export async function deleteBlockedSlot(id: string): Promise<boolean> {
  const { error } = await supabaseAdmin
    .from("blocked_slots")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

