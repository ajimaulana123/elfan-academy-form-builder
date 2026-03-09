
-- Fix: Drop restrictive policies and recreate as permissive

-- hero_images
DROP POLICY IF EXISTS "Admins can manage hero images" ON public.hero_images;
DROP POLICY IF EXISTS "Anyone can view hero images" ON public.hero_images;

CREATE POLICY "Anyone can view hero images" ON public.hero_images
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage hero images" ON public.hero_images
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- gallery_photos
DROP POLICY IF EXISTS "Admins can manage gallery photos" ON public.gallery_photos;
DROP POLICY IF EXISTS "Anyone can view gallery photos" ON public.gallery_photos;

CREATE POLICY "Anyone can view gallery photos" ON public.gallery_photos
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage gallery photos" ON public.gallery_photos
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- testimonials
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;
DROP POLICY IF EXISTS "Anyone can view active testimonials" ON public.testimonials;

CREATE POLICY "Anyone can view active testimonials" ON public.testimonials
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Storage: ensure admin can upload to site-content bucket
DROP POLICY IF EXISTS "Admin upload site-content" ON storage.objects;
DROP POLICY IF EXISTS "Public read site-content" ON storage.objects;

CREATE POLICY "Public read site-content" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-content');

CREATE POLICY "Admin upload site-content" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'site-content' AND public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (bucket_id = 'site-content' AND public.has_role(auth.uid(), 'admin'::app_role));
