// /lib/auth.ts

import { supabaseAdmin } from "../supabase-admin";
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

  if (error || !user) {
    // Timing safe: even if user doesn't exist, we should wait a bit or simulate a hash comparison
    await bcrypt.compare(password, "$2b$10$invalid_hash_to_prevent_timing_attack");
    return null;
  }

  // Check if account is locked
  if (user.locked_until && new Date(user.locked_until) > new Date()) {
    throw new Error(`CUENTA_BLOQUEADA: Intenta de nuevo después de ${new Date(user.locked_until).toLocaleTimeString()}`);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    // Handle failed attempt
    const newAttempts = (user.failed_attempts || 0) + 1;
    const lockUntil = newAttempts >= 5 ? new Date(Date.now() + 15 * 60 * 1000) : null;

    try {
      await supabaseAdmin
        .from("admin_users")
        .update({ 
          failed_attempts: newAttempts,
          locked_until: lockUntil 
        })
        .eq("id", user.id);
    } catch (e) {
      console.warn("⚠️ Falló actualización de seguridad (posible falta de columnas failed_attempts/locked_until)");
    }

    return null;
  }

  // Success: Reset attempts
  try {
    await supabaseAdmin
      .from("admin_users")
      .update({ failed_attempts: 0, locked_until: null })
      .eq("id", user.id);
  } catch (e) {
    // Columnas no existen, ignorar
  }

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

