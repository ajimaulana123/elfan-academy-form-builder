import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, Loader2, Shield } from "lucide-react";
import { useState } from "react";

interface SubmitSectionProps {
  isSubmitting: boolean;
}

export function SubmitSection({ isSubmitting }: SubmitSectionProps) {
  const [agreed, setAgreed] = useState(false);
  
  return (
    <div className="form-section">
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Checkbox 
            id="terms" 
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked as boolean)}
            className="mt-1"
          />
          <label 
            htmlFor="terms" 
            className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
          >
            Saya menyatakan bahwa data yang saya isi adalah benar dan dapat dipertanggungjawabkan. 
            Saya bersedia menerima sanksi jika data yang saya berikan tidak sesuai dengan kenyataan.
          </label>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Data Anda dilindungi dan dijaga kerahasiaannya</span>
          </div>
          
          <Button 
            type="submit" 
            variant="hero"
            size="xl"
            disabled={!agreed || isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Mengirim...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Kirim Pendaftaran</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
