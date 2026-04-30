-- 004_security_hardening.sql
-- Add brute force protection to admin_users

ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS failed_attempts INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS locked_until TIMESTAMPTZ;

-- Index for faster lookup during login
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Ensure RLS is still active and secure
-- (Already enabled in 002, but good to reinforce)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
