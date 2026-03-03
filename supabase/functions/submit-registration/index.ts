import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
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
    // Get user from auth header
    const authHeader = req.headers.get("Authorization");
    let userId: string | null = null;

    if (authHeader?.startsWith("Bearer ")) {
      const supabaseAuth = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_ANON_KEY")!,
        { global: { headers: { Authorization: authHeader } } }
      );
      const { data } = await supabaseAuth.auth.getUser();
      userId = data?.user?.id || null;
    }

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "Anda harus login terlebih dahulu" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    console.log("Received registration data for:", body.namaLengkap);

    // Validate required fields
    const requiredFields = [
      "namaLengkap", "tempatLahir", "tanggalLahir", "jenisKelamin",
      "tinggiBadan", "beratBadan", "nomorKTP", "alamatLengkap",
      "email", "noTelpon", "namaAyah", "alamatAyah", "pekerjaanAyah",
      "noTelponAyah", "namaIbu", "alamatIbu", "pekerjaanIbu",
      "noTelponIbu", "asalSekolah", "jurusan", "alamatSekolah",
    ];

    for (const field of requiredFields) {
      if (!body[field] || String(body[field]).trim() === "") {
        return new Response(
          JSON.stringify({ error: `Field "${field}" wajib diisi` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Check if user already has a registration
    const { data: existing } = await supabase
      .from("registrations")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (existing) {
      return new Response(
        JSON.stringify({ error: "Anda sudah pernah mendaftar. Setiap akun hanya boleh mendaftar satu kali." }),
        { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { data, error } = await supabase
      .from("registrations")
      .insert({
        user_id: userId,
        nama_lengkap: body.namaLengkap,
        tempat_lahir: body.tempatLahir,
        tanggal_lahir: body.tanggalLahir,
        jenis_kelamin: body.jenisKelamin,
        tinggi_badan: body.tinggiBadan,
        berat_badan: body.beratBadan,
        nomor_ktp: body.nomorKTP,
        alamat_lengkap: body.alamatLengkap,
        email: body.email,
        no_telpon: body.noTelpon,
        instagram: body.instagram || null,
        akta_url: body.akta || null,
        kk_url: body.kk || null,
        ktp_url: body.ktp || null,
        ijazah_url: body.ijazah || null,
        bukti_transfer_url: body.buktiTransfer || null,
        nama_ayah: body.namaAyah,
        alamat_ayah: body.alamatAyah,
        pekerjaan_ayah: body.pekerjaanAyah,
        no_telpon_ayah: body.noTelponAyah,
        nama_ibu: body.namaIbu,
        alamat_ibu: body.alamatIbu,
        pekerjaan_ibu: body.pekerjaanIbu,
        no_telpon_ibu: body.noTelponIbu,
        asal_sekolah: body.asalSekolah,
        jurusan: body.jurusan,
        alamat_sekolah: body.alamatSekolah,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Insert error:", error);
      throw error;
    }

    console.log("Registration inserted successfully, id:", data.id);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Pendaftaran berhasil disimpan",
        id: data.id,
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
