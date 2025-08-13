-- Configure secure OTP settings
-- Set OTP expiry to 10 minutes (600 seconds) for better security
-- This replaces the default longer expiry which is a security risk

-- Update auth configuration for OTP expiry
UPDATE auth.config 
SET 
  email_confirm_change_expiry = 600,  -- 10 minutes
  password_reset_expiry = 600,        -- 10 minutes  
  email_signup_confirm_expiry = 3600, -- 1 hour for initial signup
  sms_otp_expiry = 300               -- 5 minutes for SMS OTP
WHERE true;

-- If no config exists, insert default secure values
INSERT INTO auth.config (
  email_confirm_change_expiry,
  password_reset_expiry, 
  email_signup_confirm_expiry,
  sms_otp_expiry
) 
SELECT 600, 600, 3600, 300
WHERE NOT EXISTS (SELECT 1 FROM auth.config);