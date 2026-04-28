import { createClient } from "@supabase/supabase-js";

// Use placeholder values to prevent initialization crash if environment variables are missing
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

// Only create a real client if we have real credentials, otherwise use placeholders
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getServiceSupabase() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-service-key";
  return createClient(supabaseUrl, serviceKey);
}

