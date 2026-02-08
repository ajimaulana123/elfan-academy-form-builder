import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const BUCKET_NAME = "registration-documents";

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
    const { fileName, fileData, fileType, fieldName } = await req.json();

    if (!fileName || !fileData || !fileType || !fieldName) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: fileName, fileData, fileType, fieldName" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate field name
    const allowedFields = ["akta", "kk", "ktp", "ijazah", "buktiTransfer"];
    if (!allowedFields.includes(fieldName)) {
      return new Response(
        JSON.stringify({ error: "Invalid field name" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    if (!allowedTypes.includes(fileType)) {
      return new Response(
        JSON.stringify({ error: "Tipe file tidak didukung. Gunakan JPG, PNG, WebP, atau PDF." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Use service role for storage access
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Decode base64 data
    const base64Data = fileData.includes(",") ? fileData.split(",")[1] : fileData;
    const binaryString = atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Generate unique file path
    const timestamp = Date.now();
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const filePath = `${fieldName}/${timestamp}_${sanitizedName}`;

    console.log("Uploading file to:", filePath, "size:", bytes.length, "type:", fileType);

    // Upload to storage
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, bytes, {
        contentType: fileType,
        upsert: false,
      });

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return new Response(
        JSON.stringify({ error: "Gagal mengunggah file", details: String(uploadError.message) }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    console.log("File uploaded successfully:", urlData.publicUrl);

    return new Response(
      JSON.stringify({ success: true, url: urlData.publicUrl }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing upload:", error);
    return new Response(
      JSON.stringify({ error: "Terjadi kesalahan saat mengunggah", details: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
