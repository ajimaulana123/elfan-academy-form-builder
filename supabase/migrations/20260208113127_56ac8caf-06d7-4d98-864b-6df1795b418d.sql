
-- Allow authenticated users to update registrations
CREATE POLICY "Authenticated users can update registrations"
  ON public.registrations
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete registrations
CREATE POLICY "Authenticated users can delete registrations"
  ON public.registrations
  FOR DELETE
  USING (auth.role() = 'authenticated');
