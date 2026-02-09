import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface DeleteRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registrationId: string;
  registrantName: string;
  onDeleted: (id: string) => void;
}

export function DeleteRegistrationDialog({
  open,
  onOpenChange,
  registrationId,
  registrantName,
  onDeleted,
}: DeleteRegistrationDialogProps) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const { error } = await supabase.functions.invoke("delete-registration", {
        body: { id: registrationId },
      });

      if (error) throw error;

      toast({ title: "Berhasil", description: "Data pendaftaran berhasil dihapus." });
      onDeleted(registrationId);
      onOpenChange(false);
    } catch (error: any) {
      console.error("Delete error:", error);
      toast({
        title: "Gagal Menghapus",
        description: error?.message || "Terjadi kesalahan.",
        variant: "destructive",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Data Pendaftaran?</AlertDialogTitle>
          <AlertDialogDescription>
            Anda yakin ingin menghapus data pendaftaran atas nama{" "}
            <strong>{registrantName}</strong>? Tindakan ini tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>Batal</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 gap-2"
          >
            {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
