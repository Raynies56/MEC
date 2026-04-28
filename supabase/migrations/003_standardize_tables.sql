-- Migration: 003_standardize_tables.sql
-- Description: Standardize tables with created_at and updated_at as per agent rules.

-- 1. Standardize blocked_slots
ALTER TABLE blocked_slots 
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- 2. Standardize schedule_config
ALTER TABLE schedule_config 
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- 3. Standardize admin_users
ALTER TABLE admin_users 
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- 4. Standardize appointments (ensure NOT NULL and DEFAULT)
ALTER TABLE appointments 
  ALTER COLUMN created_at SET NOT NULL,
  ALTER COLUMN created_at SET DEFAULT now(),
  ALTER COLUMN updated_at SET NOT NULL,
  ALTER COLUMN updated_at SET DEFAULT now();

-- 5. Trigger for updated_at (optional but recommended in some setups, 
-- but here we'll assume manual updates or application-level handling as per existing code)
