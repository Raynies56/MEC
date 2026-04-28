-- Supabase PostgreSQL Schema

-- 1. Doctor Users
CREATE TABLE IF NOT EXISTS doctor_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Note: Password hash should be generated using bcrypt
-- Insert a test doctor (Password is 'admin123')
-- Hash generated via node bcrypt: $2b$10$w85xN8k9t2.r1QvPQoP1.uR5rD3nZ0rO0V77wF7E8y2XbM9h0.
-- INSERT INTO doctor_users (email, password_hash, name) 
-- VALUES ('doctora@visionplena.com', '$2b$10$w85xN8k9t2.r1QvPQoP1.uR5rD3nZ0rO0V77wF7E8y2XbM9h0.', 'Dra. Valentina Reyes');

-- 2. Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_name TEXT NOT NULL,
  patient_phone TEXT NOT NULL,
  patient_email TEXT NOT NULL,
  reason TEXT NOT NULL,
  is_first_visit BOOLEAN DEFAULT true,
  notes TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled','rescheduled')),
  doctor_notes TEXT,
  cancel_token UUID DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Blocked Slots
CREATE TABLE IF NOT EXISTS blocked_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  time TIME,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Schedule Config
CREATE TABLE IF NOT EXISTS schedule_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week INTEGER,
  is_active BOOLEAN DEFAULT true,
  start_time TIME DEFAULT '08:00',
  end_time TIME DEFAULT '18:00',
  slot_duration INTEGER DEFAULT 30,
  max_per_day INTEGER DEFAULT 16
);

-- RLS (Row Level Security)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE schedule_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE doctor_users ENABLE ROW LEVEL SECURITY;

-- Anonymous can insert appointments (public form)
CREATE POLICY "Anon can insert appointments" 
  ON appointments FOR INSERT TO anon 
  WITH CHECK (true);

-- Authenticated (backend service) can do anything
-- Since we use getServiceSupabase() in API routes, it uses the service_role key 
-- which bypasses RLS entirely. 
-- For pure client-side Supabase usage by authenticated doctors, we would add:
-- CREATE POLICY "Auth doctor can manage appointments" 
--   ON appointments FOR ALL TO authenticated USING (true);
