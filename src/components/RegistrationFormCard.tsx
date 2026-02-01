import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { registrationSchema, RegistrationForm as RegistrationFormType } from "@/lib/validations/registration";
import { PersonalDataForm } from "@/components/forms/PersonalDataForm";
import { ParentDataForm } from "@/components/forms/ParentDataForm";
import { SchoolDataForm } from "@/components/forms/SchoolDataForm";
import { SubmitSection } from "@/components/forms/SubmitSection";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { CalendarDays } from "lucide-react";

export function RegistrationFormCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<RegistrationFormType>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      namaLengkap: "",
      tempatLahir: "",
      tanggalLahir: "",
      jenisKelamin: undefined,
      tinggiBadan: "",
      beratBadan: "",
      nomorKTP: "",
      alamatLengkap: "",
      email: "",
      noTelpon: "",
      instagram: "",
      namaAyah: "",
      alamatAyah: "",
      pekerjaanAyah: "",
      noTelponAyah: "",
      namaIbu: "",
      alamatIbu: "",
      pekerjaanIbu: "",
      noTelponIbu: "",
      asalSekolah: "",
      jurusan: "",
      alamatSekolah: "",
    },
  });

  const onSubmit = async (data: RegistrationFormType) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", data);
    
    toast({
      title: "Pendaftaran Berhasil! 🎉",
      description: "Data Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.",
    });
    
    setIsSubmitting(false);
    form.reset();
  };

  return (
    <Card className="glass-card max-w-4xl mx-auto overflow-hidden">
      <CardHeader className="text-center pb-2 pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mx-auto mb-4">
          <CalendarDays className="h-4 w-4" />
          <span>Kesiapan Tes: Sabtu, 31 Januari 2026</span>
        </div>
        <CardTitle className="text-2xl md:text-3xl font-bold gradient-text">
          FORMULIR PENDAFTARAN
        </CardTitle>
        <CardDescription className="text-lg mt-2">
          Elfan AI Academy
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PersonalDataForm form={form} />
            <ParentDataForm form={form} />
            <SchoolDataForm form={form} />
            <SubmitSection isSubmitting={isSubmitting} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
