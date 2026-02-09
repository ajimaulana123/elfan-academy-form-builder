import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Registration } from "@/types/registration";

interface EditRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registration: Registration;
  onUpdated: (updated: Registration) => void;
}

const FIELD_LABELS: Record<string, string> = {
  nama_lengkap: "Nama Lengkap",
  tempat_lahir: "Tempat Lahir",
  tanggal_lahir: "Tanggal Lahir",
  jenis_kelamin: "Jenis Kelamin",
  tinggi_badan: "Tinggi Badan (cm)",
  berat_badan: "Berat Badan (kg)",
  nomor_ktp: "Nomor KTP",
  alamat_lengkap: "Alamat Lengkap",
  email: "Email",
  no_telpon: "No. Telepon",
  instagram: "Instagram",
  nama_ayah: "Nama Ayah",
  alamat_ayah: "Alamat Ayah",
  pekerjaan_ayah: "Pekerjaan Ayah",
  no_telpon_ayah: "No. Telp Ayah",
  nama_ibu: "Nama Ibu",
  alamat_ibu: "Alamat Ibu",
  pekerjaan_ibu: "Pekerjaan Ibu",
  no_telpon_ibu: "No. Telp Ibu",
  asal_sekolah: "Asal Sekolah",
  jurusan: "Jurusan",
  alamat_sekolah: "Alamat Sekolah",
};

const TEXTAREA_FIELDS = ["alamat_lengkap", "alamat_ayah", "alamat_ibu", "alamat_sekolah"];

export function EditRegistrationDialog({ open, onOpenChange, registration, onUpdated }: EditRegistrationDialogProps) {
  const [formData, setFormData] = useState<Record<string, string>>(() => {
    const data: Record<string, string> = {};
    for (const key of Object.keys(FIELD_LABELS)) {
      data[key] = (registration as any)[key] || "";
    }
    return data;
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data, error } = await supabase.functions.invoke("update-registration", {
        body: { id: registration.id, ...formData },
      });

      if (error) throw error;

      toast({ title: "Berhasil", description: "Data pendaftaran berhasil diperbarui." });
      onUpdated(data.registration);
      onOpenChange(false);
    } catch (error: any) {
      console.error("Update error:", error);
      toast({
        title: "Gagal Mengupdate",
        description: error?.message || "Terjadi kesalahan.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Pendaftaran — {registration.nama_lengkap}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {Object.entries(FIELD_LABELS).map(([key, label]) => {
            if (key === "jenis_kelamin") {
              return (
                <div key={key} className="space-y-1.5">
                  <Label className="text-xs">{label}</Label>
                  <Select value={formData[key]} onValueChange={(v) => updateField(key, v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="laki-laki">Laki-laki</SelectItem>
                      <SelectItem value="perempuan">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              );
            }

            if (TEXTAREA_FIELDS.includes(key)) {
              return (
                <div key={key} className="space-y-1.5 sm:col-span-2">
                  <Label className="text-xs">{label}</Label>
                  <Textarea
                    value={formData[key]}
                    onChange={(e) => updateField(key, e.target.value)}
                    rows={2}
                  />
                </div>
              );
            }

            return (
              <div key={key} className="space-y-1.5">
                <Label className="text-xs">{label}</Label>
                <Input
                  value={formData[key]}
                  onChange={(e) => updateField(key, e.target.value)}
                />
              </div>
            );
          })}
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={saving}>
            Batal
          </Button>
          <Button onClick={handleSave} disabled={saving} className="gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
