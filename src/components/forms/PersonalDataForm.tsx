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
import { User } from "lucide-react";

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
    </div>
  );
}
