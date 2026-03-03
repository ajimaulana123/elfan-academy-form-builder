
-- Add user_id column to registrations
ALTER TABLE public.registrations 
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add unique constraint so each user can only register once
ALTER TABLE public.registrations 
ADD CONSTRAINT registrations_user_id_unique UNIQUE (user_id);

-- Create index for performance
CREATE INDEX idx_registrations_user_id ON public.registrations(user_id);

-- Drop old permissive policies and create user-scoped ones
DROP POLICY IF EXISTS "Anyone can insert registrations" ON public.registrations;
DROP POLICY IF EXISTS "Authenticated users can delete registrations" ON public.registrations;
DROP POLICY IF EXISTS "Authenticated users can update registrations" ON public.registrations;
DROP POLICY IF EXISTS "Authenticated users can view registrations" ON public.registrations;

-- Users can only view their own registrations
CREATE POLICY "Users can view own registrations"
ON public.registrations FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own registration
CREATE POLICY "Users can insert own registration"
ON public.registrations FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Users can update their own registration (for document uploads)
CREATE POLICY "Users can update own registration"
ON public.registrations FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);
