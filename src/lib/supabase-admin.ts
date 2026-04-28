// /lib/supabase-admin.ts

import { createClient } from '@supabase/supabase-js'

// Cliente con service_role — SOLO usar en Server Components o API routes
// NUNCA importar este archivo en un Client Component
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  // En desarrollo esto podría fallar si no hay .env, pero en producción es crítico
  console.warn("⚠️ Advertencia: Faltan variables de entorno para Supabase Admin");
}

export const supabaseAdmin = createClient(
  supabaseUrl || "https://placeholder-project.supabase.co",
  supabaseServiceKey || "placeholder-service-key",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

