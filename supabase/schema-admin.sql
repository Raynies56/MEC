-- c:\Users\HP VICTUS\Desktop\MEC\supabase\schema-admin.sql

-- Tabla principal de citas
CREATE TABLE IF NOT EXISTS appointments (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name    TEXT NOT NULL,
  patient_phone   TEXT NOT NULL,
  patient_email   TEXT NOT NULL,
  reason          TEXT NOT NULL,
  is_first_visit  BOOLEAN DEFAULT true,
  notes           TEXT,
  date            DATE NOT NULL,
  time            TIME NOT NULL,
  status          TEXT DEFAULT 'pending'
                  CHECK (status IN (
                    'pending','confirmed','cancelled','rescheduled'
                  )),
  doctor_notes    TEXT,
  cancel_token    UUID DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de slots bloqueados
CREATE TABLE IF NOT EXISTS blocked_slots (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date        DATE NOT NULL,
  time        TIME,
  reason      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de configuración de horarios
CREATE TABLE IF NOT EXISTS schedule_config (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week    INTEGER CHECK (day_of_week BETWEEN 0 AND 6),
  is_active      BOOLEAN DEFAULT true,
  start_time     TIME DEFAULT '08:00',
  end_time       TIME DEFAULT '18:00',
  slot_duration  INTEGER DEFAULT 30,
  max_per_day    INTEGER DEFAULT 16
);

-- Tabla de usuarios admin
CREATE TABLE IF NOT EXISTS admin_users (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email          TEXT UNIQUE NOT NULL,
  password_hash  TEXT NOT NULL,
  name           TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Políticas RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Appointments: cualquiera puede insertar (pacientes),
-- solo service_role puede leer/modificar
CREATE POLICY "public_insert" ON appointments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "admin_all" ON appointments
  FOR ALL USING (auth.role() = 'service_role');

-- Resto de tablas: solo service_role
CREATE POLICY "admin_only_blocked" ON blocked_slots
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "admin_only_schedule" ON schedule_config
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "admin_only_users" ON admin_users
  FOR ALL USING (auth.role() = 'service_role');

-- Seed: configuración de horarios por defecto
INSERT INTO schedule_config
  (day_of_week, is_active, start_time, end_time, slot_duration)
VALUES
  (1, true,  '08:00', '18:00', 30), -- Lunes
  (2, true,  '08:00', '18:00', 30), -- Martes
  (3, true,  '08:00', '18:00', 30), -- Miércoles
  (4, true,  '08:00', '18:00', 30), -- Jueves
  (5, true,  '08:00', '18:00', 30), -- Viernes
  (6, true,  '08:00', '13:00', 30), -- Sábado
  (0, false, '08:00', '12:00', 30)  -- Domingo (inactivo)
ON CONFLICT DO NOTHING;
