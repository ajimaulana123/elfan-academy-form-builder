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
import { Users } from "lucide-react";

interface ParentDataFormProps {
  form: UseFormReturn<RegistrationForm>;
}

export function ParentDataForm({ form }: ParentDataFormProps) {
  return (
    <div className="form-section">
      <h3 className="form-section-title">
        <Users className="h-5 w-5 text-primary" />
        <span>Data Orang Tua / Wali</span>
      </h3>
      
      {/* Father's Data */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-muted-foreground mb-4">Data Ayah</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="namaAyah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Ayah</FormLabel>
                <FormControl>
                  <Input placeholder="Nama lengkap ayah" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="pekerjaanAyah"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pekerjaan Ayah</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: PNS, Wiraswasta" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="alamatAyah"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Alamat Ayah</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Alamat lengkap ayah" 
                    className="min-h-[80px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="noTelponAyah"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>No Telepon / WhatsApp Ayah</FormLabel>
                <FormControl>
                  <Input placeholder="08123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      
      {/* Mother's Data */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-4">Data Ibu</h4>
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="namaIbu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Ibu</FormLabel>
                <FormControl>
                  <Input placeholder="Nama lengkap ibu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="pekerjaanIbu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pekerjaan Ibu</FormLabel>
                <FormControl>
                  <Input placeholder="Contoh: Guru, Ibu Rumah Tangga" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="alamatIbu"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Alamat Ibu</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Alamat lengkap ibu" 
                    className="min-h-[80px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="noTelponIbu"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>No Telepon / WhatsApp Ibu</FormLabel>
                <FormControl>
                  <Input placeholder="08123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
