import { UseFormReturn } from "react-hook-form";
import { RegistrationForm } from "@/lib/validations/registration";
import {
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FileText } from "lucide-react";
import { FileUploadField } from "./FileUploadField";

interface DocumentUploadFormProps {
  form: UseFormReturn<RegistrationForm>;
}

export function DocumentUploadForm({ form }: DocumentUploadFormProps) {
  return (
    <div className="form-section">
      <h3 className="form-section-title">
        <FileText className="h-5 w-5 text-primary" />
        <span>Unggah Dokumen</span>
      </h3>

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
  );
}
