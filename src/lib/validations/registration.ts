import { z } from "zod";

// Sanitize string input to prevent XSS
const sanitizeString = (value: string) => {
  return value
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove event handlers
};

const stringField = (min: number, max: number, fieldName: string) =>
  z.string()
    .min(min, { message: `${fieldName} harus diisi` })
    .max(max, { message: `${fieldName} maksimal ${max} karakter` })
    .transform(sanitizeString);

const optionalStringField = (max: number) =>
  z.string()
    .max(max, { message: `Maksimal ${max} karakter` })
    .transform(sanitizeString)
    .optional()
    .or(z.literal(''));

const phoneField = (fieldName: string) =>
  z.string()
    .min(10, { message: `${fieldName} minimal 10 digit` })
    .max(15, { message: `${fieldName} maksimal 15 digit` })
    .regex(/^[0-9+\-\s]+$/, { message: `${fieldName} hanya boleh angka` })
    .transform(sanitizeString);

const emailField = z.string()
  .min(1, { message: "Email harus diisi" })
  .max(255, { message: "Email maksimal 255 karakter" })
  .email({ message: "Format email tidak valid" })
  .transform(sanitizeString);

const ktpField = z.string()
  .min(16, { message: "Nomor KTP harus 16 digit" })
  .max(16, { message: "Nomor KTP harus 16 digit" })
  .regex(/^[0-9]+$/, { message: "Nomor KTP hanya boleh angka" });

export const personalDataSchema = z.object({
  namaLengkap: stringField(2, 100, "Nama lengkap"),
  tempatLahir: stringField(2, 50, "Tempat lahir"),
  tanggalLahir: z.string().min(1, { message: "Tanggal lahir harus diisi" }),
  jenisKelamin: z.enum(["laki-laki", "perempuan"], {
    required_error: "Pilih jenis kelamin",
  }),
  tinggiBadan: z.string()
    .min(1, { message: "Tinggi badan harus diisi" })
    .regex(/^[0-9]+$/, { message: "Tinggi badan hanya boleh angka" }),
  beratBadan: z.string()
    .min(1, { message: "Berat badan harus diisi" })
    .regex(/^[0-9]+$/, { message: "Berat badan hanya boleh angka" }),
  nomorKTP: ktpField,
  alamatLengkap: stringField(10, 500, "Alamat lengkap"),
  email: emailField,
  noTelpon: phoneField("Nomor telepon"),
  instagram: optionalStringField(50),
});

export const parentDataSchema = z.object({
  namaAyah: stringField(2, 100, "Nama ayah"),
  alamatAyah: stringField(10, 500, "Alamat ayah"),
  pekerjaanAyah: stringField(2, 100, "Pekerjaan ayah"),
  noTelponAyah: phoneField("Nomor telepon ayah"),
  namaIbu: stringField(2, 100, "Nama ibu"),
  alamatIbu: stringField(10, 500, "Alamat ibu"),
  pekerjaanIbu: stringField(2, 100, "Pekerjaan ibu"),
  noTelponIbu: phoneField("Nomor telepon ibu"),
});

export const schoolDataSchema = z.object({
  asalSekolah: stringField(2, 150, "Asal sekolah"),
  jurusan: stringField(2, 100, "Jurusan"),
  alamatSekolah: stringField(10, 500, "Alamat sekolah"),
});

export const registrationSchema = personalDataSchema
  .merge(parentDataSchema)
  .merge(schoolDataSchema);

export type PersonalDataForm = z.infer<typeof personalDataSchema>;
export type ParentDataForm = z.infer<typeof parentDataSchema>;
export type SchoolDataForm = z.infer<typeof schoolDataSchema>;
export type RegistrationForm = z.infer<typeof registrationSchema>;
