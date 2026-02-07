import { neon } from "npm:@neondatabase/serverless@0.10.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    console.log("Received registration data for:", body.namaLengkap);

    // Validate required fields
    const requiredFields = [
      "namaLengkap", "tempatLahir", "tanggalLahir", "jenisKelamin",
      "tinggiBadan", "beratBadan", "nomorKTP", "alamatLengkap",
      "email", "noTelpon", "namaAyah", "alamatAyah", "pekerjaanAyah",
      "noTelponAyah", "namaIbu", "alamatIbu", "pekerjaanIbu",
      "noTelponIbu", "asalSekolah", "jurusan", "alamatSekolah",
      "akta", "kk", "ktp", "ijazah", "buktiTransfer",
    ];

    for (const field of requiredFields) {
      if (!body[field] || String(body[field]).trim() === "") {
        return new Response(
          JSON.stringify({ error: `Field "${field}" wajib diisi` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    // Connect to Neon PostgreSQL using serverless driver
    const databaseUrl = Deno.env.get("NEON_DATABASE_URL");
    if (!databaseUrl) {
      console.error("NEON_DATABASE_URL is not set");
      return new Response(
        JSON.stringify({ error: "Database configuration error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const sql = neon(databaseUrl);

    // Create table if not exists (with document URL columns)
    await sql`
      CREATE TABLE IF NOT EXISTS registrations (
        id SERIAL PRIMARY KEY,
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
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;

    // Add columns if they don't exist (for existing tables)
    const docColumns = ['akta_url', 'kk_url', 'ktp_url', 'ijazah_url', 'bukti_transfer_url'];
    for (const col of docColumns) {
      try {
        await sql`
          ALTER TABLE registrations ADD COLUMN IF NOT EXISTS ${sql(col)} TEXT
        `;
      } catch (e) {
        // Column may already exist, ignore error
        console.log(`Column ${col} check:`, e);
      }
    }

    // Insert data
    const result = await sql`
      INSERT INTO registrations (
        nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin,
        tinggi_badan, berat_badan, nomor_ktp, alamat_lengkap,
        email, no_telpon, instagram,
        akta_url, kk_url, ktp_url, ijazah_url, bukti_transfer_url,
        nama_ayah, alamat_ayah, pekerjaan_ayah, no_telpon_ayah,
        nama_ibu, alamat_ibu, pekerjaan_ibu, no_telpon_ibu,
        asal_sekolah, jurusan, alamat_sekolah
      ) VALUES (
        ${body.namaLengkap}, ${body.tempatLahir}, ${body.tanggalLahir}, ${body.jenisKelamin},
        ${body.tinggiBadan}, ${body.beratBadan}, ${body.nomorKTP}, ${body.alamatLengkap},
        ${body.email}, ${body.noTelpon}, ${body.instagram || null},
        ${body.akta || null}, ${body.kk || null}, ${body.ktp || null}, ${body.ijazah || null}, ${body.buktiTransfer || null},
        ${body.namaAyah}, ${body.alamatAyah}, ${body.pekerjaanAyah}, ${body.noTelponAyah},
        ${body.namaIbu}, ${body.alamatIbu}, ${body.pekerjaanIbu}, ${body.noTelponIbu},
        ${body.asalSekolah}, ${body.jurusan}, ${body.alamatSekolah}
      )
      RETURNING id
    `;

    console.log("Registration inserted successfully, id:", result[0].id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Pendaftaran berhasil disimpan",
        id: result[0].id 
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error processing registration:", error);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan saat menyimpan data", details: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
