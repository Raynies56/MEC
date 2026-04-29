// /lib/auth.ts

import { supabaseAdmin } from "./supabase-admin";
import bcrypt from "bcryptjs";

/**
 * Verifica las credenciales de la doctora contra la tabla admin_users
 */
export async function verifyAdminCredentials(email: string, password: string) {
  const { data: user, error } = await supabaseAdmin
    .from("admin_users")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !user) return null;

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Genera un hash Bcrypt para una contraseña
 */
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

/**
 * Script de utilidad para generar un hash inicial
 * Puedes ejecutar esto temporalmente para obtener el hash del seed SQL
 */
export async function generateSeedHash(password: string) {
  return await hashPassword(password);
}
