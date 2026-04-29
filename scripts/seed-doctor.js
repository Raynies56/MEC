/**
 * SCRIPT DE INICIALIZACIÓN DE USUARIO MÉDICO
 * 
 * Ejecuta este script para crear la cuenta de la Dra. Valentina Reyes
 * en tu base de datos de Supabase.
 */

const bcrypt = require("bcrypt");
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ ERROR: Faltan variables de entorno en .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDoctor() {
  const email = "doctora@visionplena.com.do";
  const password = "Administrador2026"; // Contraseña segura para la simulación
  const name = "Dra. Valentina Reyes";

  console.log("--- Iniciando Creación de Usuario ---");
  console.log(`Email: ${email}`);
  
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);

  const { data, error } = await supabase
    .from("admin_users")
    .upsert({ 
      email, 
      password_hash: hash, 
      name 
    }, { onConflict: 'email' })
    .select();

  if (error) {
    console.error("❌ Error al crear usuario:", error.message);
  } else {
    console.log("✅ Usuario creado exitosamente!");
    console.log("Ya puedes iniciar sesión con las credenciales proporcionadas.");
  }
}

seedDoctor();
