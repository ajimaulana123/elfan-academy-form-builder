
-- Hero images table
CREATE TABLE public.hero_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  title TEXT,
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.hero_images ENABLE ROW LEVEL SECURITY;

-- Everyone can read active hero images
CREATE POLICY "Anyone can view hero images" ON public.hero_images
FOR SELECT USING (true);

-- Only admins can manage
CREATE POLICY "Admins can manage hero images" ON public.hero_images
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Gallery photos table
CREATE TABLE public.gallery_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery photos" ON public.gallery_photos
FOR SELECT USING (true);

CREATE POLICY "Admins can manage gallery photos" ON public.gallery_photos
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Testimonials table
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Santri',
  quote TEXT NOT NULL,
  photo_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active testimonials" ON public.testimonials
FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage testimonials" ON public.testimonials
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for site content
INSERT INTO storage.buckets (id, name, public) VALUES ('site-content', 'site-content', true);

-- Storage RLS: anyone can read, admins can upload
CREATE POLICY "Anyone can view site content" ON storage.objects
FOR SELECT USING (bucket_id = 'site-content');

CREATE POLICY "Admins can upload site content" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'site-content' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete site content" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'site-content' AND public.has_role(auth.uid(), 'admin'));
