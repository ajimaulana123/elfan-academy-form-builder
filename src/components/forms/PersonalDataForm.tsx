import { UseFormReturn } from "react-hook-form";
import { RegistrationForm } from "@/lib/validations/registration";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, FileText } from "lucide-react";
import { FileUploadField } from "./FileUploadField";

interface PersonalDataFormProps {
  form: UseFormReturn<RegistrationForm>;
}

export function PersonalDataForm({ form }: PersonalDataFormProps) {
  return (
    <div className="form-section">
      <h3 className="form-section-title">
        <User className="h-5 w-5 text-primary" />
        <span>Data Pribadi</span>
      </h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="namaLengkap"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Nama Lengkap</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nama lengkap" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tempatLahir"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tempat Lahir</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: Jakarta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tanggalLahir"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tanggal Lahir</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="jenisKelamin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Kelamin</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="laki-laki">Laki-laki</SelectItem>
                  <SelectItem value="perempuan">Perempuan</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="tinggiBadan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tinggi Badan (cm)</FormLabel>
                <FormControl>
                  <Input placeholder="170" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="beratBadan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Berat Badan (kg)</FormLabel>
                <FormControl>
                  <Input placeholder="65" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="nomorKTP"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Nomor KTP</FormLabel>
              <FormControl>
                <Input placeholder="16 digit nomor KTP" maxLength={16} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="alamatLengkap"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Alamat Lengkap</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Masukkan alamat lengkap" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="noTelpon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>No Telepon / WhatsApp</FormLabel>
              <FormControl>
                <Input placeholder="08123456789" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="instagram"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Instagram (opsional)</FormLabel>
              <FormControl>
                <Input placeholder="@username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Document Uploads Section */}
      <div className="mt-8 pt-6 border-t border-border/30">
        <h4 className="text-base font-semibold text-foreground flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-primary" />
          <span>Unggah Dokumen</span>
        </h4>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="akta"
            render={({ field }) => (
              <FormItem>
                <FileUploadField
                  label="Akta Kelahiran"
                  fieldName="akta"
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kk"
            render={({ field }) => (
              <FormItem>
                <FileUploadField
                  label="Kartu Keluarga (KK)"
                  fieldName="kk"
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ktp"
            render={({ field }) => (
              <FormItem>
                <FileUploadField
                  label="KTP"
                  fieldName="ktp"
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ijazah"
            render={({ field }) => (
              <FormItem>
                <FileUploadField
                  label="Ijazah"
                  fieldName="ijazah"
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="buktiTransfer"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FileUploadField
                  label="Bukti Transfer"
                  fieldName="buktiTransfer"
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
