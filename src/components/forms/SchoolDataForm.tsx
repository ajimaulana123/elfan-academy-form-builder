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
import { GraduationCap } from "lucide-react";

interface SchoolDataFormProps {
  form: UseFormReturn<RegistrationForm>;
}

export function SchoolDataForm({ form }: SchoolDataFormProps) {
  return (
    <div className="form-section">
      <h3 className="form-section-title">
        <GraduationCap className="h-5 w-5 text-primary" />
        <span>Data Sekolah / Instansi</span>
      </h3>
      
      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="asalSekolah"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Asal Sekolah</FormLabel>
              <FormControl>
                <Input placeholder="Nama sekolah/instansi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="jurusan"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Jurusan</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: IPA, IPS, Teknik Informatika" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="alamatSekolah"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Alamat Sekolah</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Alamat lengkap sekolah/instansi" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
