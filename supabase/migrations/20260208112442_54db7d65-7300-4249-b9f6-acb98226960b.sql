
-- Create registrations table
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_lengkap VARCHAR(100) NOT NULL,
  tempat_lahir VARCHAR(50) NOT NULL,
  tanggal_lahir VARCHAR(20) NOT NULL,
  jenis_kelamin VARCHAR(10) NOT NULL,
  tinggi_badan VARCHAR(10) NOT NULL,
  berat_badan VARCHAR(10) NOT NULL,
  nomor_ktp VARCHAR(16) NOT NULL,
  alamat_lengkap TEXT NOT NULL,
  email VARCHAR(255) NOT NULL,
  no_telpon VARCHAR(15) NOT NULL,
  instagram VARCHAR(50),
  akta_url TEXT,
  kk_url TEXT,
  ktp_url TEXT,
  ijazah_url TEXT,
  bukti_transfer_url TEXT,
  nama_ayah VARCHAR(100) NOT NULL,
  alamat_ayah TEXT NOT NULL,
  pekerjaan_ayah VARCHAR(100) NOT NULL,
  no_telpon_ayah VARCHAR(15) NOT NULL,
  nama_ibu VARCHAR(100) NOT NULL,
  alamat_ibu TEXT NOT NULL,
  pekerjaan_ibu VARCHAR(100) NOT NULL,
  no_telpon_ibu VARCHAR(15) NOT NULL,
  asal_sekolah VARCHAR(150) NOT NULL,
  jurusan VARCHAR(100) NOT NULL,
  alamat_sekolah TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Public insert policy (anyone can register, no auth required)
CREATE POLICY "Anyone can insert registrations"
  ON public.registrations
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users (admins) can view registrations
CREATE POLICY "Authenticated users can view registrations"
  ON public.registrations
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- Create storage bucket for registration documents
INSERT INTO storage.buckets (id, name, public)
VALUES ('registration-documents', 'registration-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload to registration-documents bucket
CREATE POLICY "Anyone can upload registration documents"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'registration-documents');

-- Allow anyone to read registration documents (public bucket)
CREATE POLICY "Anyone can view registration documents"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'registration-documents');
