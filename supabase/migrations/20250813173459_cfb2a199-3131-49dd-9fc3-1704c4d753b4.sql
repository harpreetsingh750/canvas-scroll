-- Set the existing user as admin
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'harpreetsingh750@gmail.com';