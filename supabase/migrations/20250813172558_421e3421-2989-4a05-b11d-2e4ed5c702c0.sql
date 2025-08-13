-- Fix security issues from the previous migration
-- Set proper search path for security

-- Fix the validate_otp_with_expiry function to include proper search path
CREATE OR REPLACE FUNCTION public.validate_otp_with_expiry(
  token_hash text,
  token_type text,
  created_at timestamptz DEFAULT now()
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  expiry_minutes integer;
BEGIN
  -- Set expiry based on token type
  CASE token_type
    WHEN 'recovery' THEN expiry_minutes := 10;  -- 10 minutes for password reset
    WHEN 'email_change' THEN expiry_minutes := 10;  -- 10 minutes for email change
    WHEN 'signup' THEN expiry_minutes := 60;  -- 1 hour for initial signup
    WHEN 'phone_change' THEN expiry_minutes := 5;  -- 5 minutes for phone change
    ELSE expiry_minutes := 10;  -- Default 10 minutes
  END CASE;
  
  -- Check if token is within expiry window
  RETURN (created_at + (expiry_minutes || ' minutes')::interval) > now();
END;
$$;