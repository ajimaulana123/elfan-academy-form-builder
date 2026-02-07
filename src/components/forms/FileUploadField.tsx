import { useState, useRef } from "react";
import { Upload, X, FileCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface FileUploadFieldProps {
  label: string;
  accept?: string;
  maxSizeMB?: number;
  value?: string;
  onChange: (url: string) => void;
  fieldName: string;
}

export function FileUploadField({
  label,
  accept = "image/*,.pdf",
  maxSizeMB = 5,
  value,
  onChange,
  fieldName,
}: FileUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({
        title: "File terlalu besar",
        description: `Ukuran file maksimal ${maxSizeMB}MB`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setFileName(file.name);

    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const { data, error } = await supabase.functions.invoke("upload-document", {
        body: {
          fileName: file.name,
          fileData: base64,
          fileType: file.type,
          fieldName,
        },
      });

      if (error) throw error;
      if (!data?.url) throw new Error("No URL returned");

      onChange(data.url);
      toast({
        title: "Berhasil",
        description: `${label} berhasil diunggah`,
      });
    } catch (error: any) {
      console.error("Upload error:", error);
      setFileName(null);
      toast({
        title: "Gagal mengunggah",
        description: error?.message || "Terjadi kesalahan saat mengunggah file",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    onChange("");
    setFileName(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />

      {value ? (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--success)/0.1)] border border-[hsl(var(--success)/0.3)]">
          <FileCheck className="h-5 w-5 text-[hsl(var(--success))] shrink-0" />
          <span className="text-sm text-foreground truncate flex-1">
            {fileName || "File terunggah"}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className={cn(
            "w-full flex items-center justify-center gap-2 p-4 rounded-lg border-2 border-dashed transition-all duration-200",
            "border-border/50 hover:border-primary/50 hover:bg-primary/5",
            "text-muted-foreground hover:text-foreground",
            isUploading && "opacity-60 cursor-not-allowed"
          )}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-sm">Mengunggah...</span>
            </>
          ) : (
            <>
              <Upload className="h-5 w-5" />
              <span className="text-sm">Klik untuk unggah {label}</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
