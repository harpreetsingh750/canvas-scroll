-- Configure auth settings for secure OTP expiry
-- Note: OTP expiry settings are managed at the project level in Supabase
-- This creates a custom function to handle OTP validation with shorter expiry times

-- Create a custom function to validate OTP tokens with shorter expiry
CREATE OR REPLACE FUNCTION public.validate_otp_with_expiry(
  token_hash text,
  token_type text,
  created_at timestamptz DEFAULT now()
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
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

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.validate_otp_with_expiry TO authenticated;