import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { registrationSchema, RegistrationForm as RegistrationFormType } from "@/lib/validations/registration";
import { PersonalDataForm } from "@/components/forms/PersonalDataForm";
import { ParentDataForm } from "@/components/forms/ParentDataForm";
import { SchoolDataForm } from "@/components/forms/SchoolDataForm";
import { DocumentUploadForm } from "@/components/forms/DocumentUploadForm";
import { SubmitSection } from "@/components/forms/SubmitSection";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { CalendarDays, User, Users, GraduationCap, FileText, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Define fields for each step
const STEP_FIELDS = {
  personal: [
    "namaLengkap",
    "tempatLahir", 
    "tanggalLahir",
    "jenisKelamin",
    "tinggiBadan",
    "beratBadan",
    "nomorKTP",
    "alamatLengkap",
    "email",
    "noTelpon",
  ] as const,
  parent: [
    "namaAyah",
    "alamatAyah",
    "pekerjaanAyah",
    "noTelponAyah",
    "namaIbu",
    "alamatIbu",
    "pekerjaanIbu",
    "noTelponIbu",
  ] as const,
  documents: [
    "akta",
    "kk",
    "ktp",
    "ijazah",
    "buktiTransfer",
  ] as const,
  school: [
    "asalSekolah",
    "jurusan",
    "alamatSekolah",
  ] as const,
};

const STEPS = [
  { id: "personal", label: "Data Pribadi", icon: User },
  { id: "parent", label: "Data Orang Tua", icon: Users },
  { id: "documents", label: "Dokumen", icon: FileText },
  { id: "school", label: "Data Sekolah", icon: GraduationCap },
] as const;

type StepId = typeof STEPS[number]["id"];

export function RegistrationFormCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState<StepId>("personal");
  const [completedSteps, setCompletedSteps] = useState<Set<StepId>>(new Set());
  
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
      akta: "",
      kk: "",
      ktp: "",
      ijazah: "",
      buktiTransfer: "",
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
    mode: "onChange",
  });

  const onSubmit = async (data: RegistrationFormType) => {
    setIsSubmitting(true);
    
    try {
      const { data: result, error } = await supabase.functions.invoke("submit-registration", {
        body: data,
      });

      if (error) throw error;

      toast({
        title: "Pendaftaran Berhasil! 🎉",
        description: "Data Anda telah berhasil disimpan ke database. Kami akan menghubungi Anda segera.",
      });

      form.reset();
      setActiveStep("personal");
      setCompletedSteps(new Set());
    } catch (error: any) {
      console.error("Submit error:", error);
      toast({
        title: "Gagal Mengirim Pendaftaran",
        description: error?.message || "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentStepIndex = STEPS.findIndex(s => s.id === activeStep);
  
  const validateCurrentStep = async (): Promise<boolean> => {
    const currentFields = STEP_FIELDS[activeStep];
    const result = await form.trigger(currentFields as unknown as (keyof RegistrationFormType)[]);
    
    if (!result) {
      toast({
        title: "Mohon lengkapi data",
        description: "Silakan isi semua field yang wajib dengan benar sebelum melanjutkan.",
        variant: "destructive",
      });
    }
    
    return result;
  };
  
  const goToNextStep = async () => {
    const isValid = await validateCurrentStep();
    
    if (isValid && currentStepIndex < STEPS.length - 1) {
      setCompletedSteps(prev => new Set([...prev, activeStep]));
      setActiveStep(STEPS[currentStepIndex + 1].id);
    }
  };
  
  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setActiveStep(STEPS[currentStepIndex - 1].id);
    }
  };
  
  const handleStepClick = async (stepId: StepId) => {
    const targetIndex = STEPS.findIndex(s => s.id === stepId);
    
    // Allow going back without validation
    if (targetIndex < currentStepIndex) {
      setActiveStep(stepId);
      return;
    }
    
    // For forward navigation, validate current step first
    if (targetIndex > currentStepIndex) {
      const isValid = await validateCurrentStep();
      if (isValid) {
        setCompletedSteps(prev => new Set([...prev, activeStep]));
        setActiveStep(stepId);
      }
    }
  };

  return (
    <Card id="registration-form" className="glass-card max-w-4xl mx-auto overflow-hidden card-animated">
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
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs value={activeStep} className="w-full">
              {/* Step Navigation */}
              <TabsList className="w-full h-auto p-2 bg-secondary/50 backdrop-blur-sm rounded-xl mb-8 grid grid-cols-4 gap-2">
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = activeStep === step.id;
                  const isCompleted = completedSteps.has(step.id);
                  
                  return (
                    <TabsTrigger
                      key={step.id}
                      value={step.id}
                      onClick={() => handleStepClick(step.id)}
                      className={cn(
                        "flex flex-col sm:flex-row items-center gap-1 sm:gap-2 py-3 px-2 sm:px-4 rounded-lg transition-all duration-300",
                        "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg",
                        "data-[state=inactive]:hover:bg-secondary/80",
                        isCompleted && !isActive && "text-[hsl(var(--success))] border border-[hsl(var(--success)/0.3)]"
                      )}
                    >
                      <div className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
                        isActive ? "bg-primary-foreground/20" : isCompleted ? "bg-[hsl(var(--success)/0.2)]" : "bg-muted"
                      )}>
                        {isCompleted && !isActive ? (
                          <CheckCircle2 className="h-4 w-4 text-[hsl(var(--success))]" />
                        ) : (
                          <Icon className="h-4 w-4" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-center sm:text-left">{step.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              
              {/* Step Content */}
              <div className="step-content-wrapper">
                <TabsContent value="personal" className="step-content mt-0">
                  <PersonalDataForm form={form} />
                </TabsContent>
                
                <TabsContent value="parent" className="step-content mt-0">
                  <ParentDataForm form={form} />
                </TabsContent>
                
                <TabsContent value="documents" className="step-content mt-0">
                  <DocumentUploadForm form={form} />
                </TabsContent>
                
                <TabsContent value="school" className="step-content mt-0">
                  <SchoolDataForm form={form} />
                  <div className="mt-6">
                    <SubmitSection isSubmitting={isSubmitting} />
                  </div>
                </TabsContent>
              </div>
              
              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/30">
                <Button
                  type="button"
                  variant="outline"
                  onClick={goToPrevStep}
                  disabled={currentStepIndex === 0}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Sebelumnya</span>
                </Button>
                
                {/* Step Indicator */}
                <div className="flex items-center gap-2">
                  {STEPS.map((step, index) => (
                    <div
                      key={step.id}
                      className={cn(
                        "w-2.5 h-2.5 rounded-full transition-all duration-300",
                        index === currentStepIndex 
                          ? "bg-primary w-8" 
                          : index < currentStepIndex 
                            ? "bg-primary/60" 
                            : "bg-muted"
                      )}
                    />
                  ))}
                </div>
                
                {currentStepIndex < STEPS.length - 1 ? (
                  <Button
                    type="button"
                    variant="hero"
                    onClick={goToNextStep}
                    className="gap-2"
                  >
                    <span className="hidden sm:inline">Selanjutnya</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <div className="w-[120px]" /> 
                )}
              </div>
            </Tabs>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
