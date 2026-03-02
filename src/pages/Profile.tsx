import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, LogOut, FileText, Plus, ArrowLeft, Upload, Eye, Calendar, User as UserIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileUploadField } from "@/components/forms/FileUploadField";
import { DocumentViewer } from "@/components/admin/DocumentViewer";

interface Registration {
  id: string;
  nama_lengkap: string;
  email: string;
  jenis_kelamin: string;
  asal_sekolah: string;
  created_at: string;
  akta_url: string | null;
  kk_url: string | null;
  ktp_url: string | null;
  ijazah_url: string | null;
  bukti_transfer_url: string | null;
}

const DOCUMENT_FIELDS = [
  { key: "akta_url", label: "Akta Kelahiran", fieldName: "akta" },
  { key: "kk_url", label: "Kartu Keluarga (KK)", fieldName: "kk" },
  { key: "ktp_url", label: "KTP", fieldName: "ktp" },
  { key: "ijazah_url", label: "Ijazah", fieldName: "ijazah" },
  { key: "bukti_transfer_url", label: "Bukti Transfer", fieldName: "buktiTransfer" },
] as const;

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [docViewerOpen, setDocViewerOpen] = useState(false);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [uploadValues, setUploadValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("id, nama_lengkap, email, jenis_kelamin, asal_sekolah, created_at, akta_url, kk_url, ktp_url, ijazah_url, bukti_transfer_url")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error: any) {
      console.error("Fetch error:", error);
      toast({ title: "Gagal memuat data", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const openUploadDialog = (reg: Registration) => {
    setSelectedReg(reg);
    setUploadValues({
      akta_url: reg.akta_url || "",
      kk_url: reg.kk_url || "",
      ktp_url: reg.ktp_url || "",
      ijazah_url: reg.ijazah_url || "",
      bukti_transfer_url: reg.bukti_transfer_url || "",
    });
    setUploadDialogOpen(true);
  };

  const openDocViewer = (reg: Registration) => {
    setSelectedReg(reg);
    setDocViewerOpen(true);
  };

  const handleSaveDocuments = async () => {
    if (!selectedReg) return;
    setSaving(true);

    try {
      const { error } = await supabase.functions.invoke("update-registration", {
        body: {
          id: selectedReg.id,
          akta_url: uploadValues.akta_url || null,
          kk_url: uploadValues.kk_url || null,
          ktp_url: uploadValues.ktp_url || null,
          ijazah_url: uploadValues.ijazah_url || null,
          bukti_transfer_url: uploadValues.bukti_transfer_url || null,
        },
      });

      if (error) throw error;

      toast({ title: "Dokumen berhasil disimpan! 📄" });
      setUploadDialogOpen(false);
      fetchRegistrations();
    } catch (error: any) {
      toast({ title: "Gagal menyimpan", description: error.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const getDocuments = (reg: Registration) =>
    DOCUMENT_FIELDS.map((d) => ({
      label: d.label,
      url: reg[d.key] as string | null,
    }));

  const getDocCount = (reg: Registration) =>
    DOCUMENT_FIELDS.filter((d) => reg[d.key]).length;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Beranda
              </Button>
            </Link>
            <span className="text-lg font-semibold gradient-text">Profil Saya</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Keluar
            </Button>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Riwayat Pendaftaran</h1>
            <p className="text-muted-foreground mt-1">Lihat dan kelola dokumen pendaftaran Anda</p>
          </div>
          <Link to="/">
            <Button variant="hero" className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Daftar Baru</span>
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : registrations.length === 0 ? (
          <Card className="glass-card text-center py-16">
            <CardContent>
              <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Belum ada pendaftaran</h3>
              <p className="text-muted-foreground mb-6">Anda belum melakukan pendaftaran apapun.</p>
              <Link to="/">
                <Button variant="hero" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Daftar Sekarang
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {registrations.map((reg) => (
              <Card key={reg.id} className="glass-card card-animated">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                          <UserIcon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg truncate">{reg.nama_lengkap}</h3>
                          <p className="text-sm text-muted-foreground">{reg.asal_sekolah}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(reg.created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="h-3.5 w-3.5" />
                          {getDocCount(reg)}/5 dokumen
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDocViewer(reg)}
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Lihat
                      </Button>
                      <Button
                        variant="hero"
                        size="sm"
                        onClick={() => openUploadDialog(reg)}
                        className="gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Unggah Dokumen
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Document Viewer */}
      {selectedReg && (
        <DocumentViewer
          open={docViewerOpen}
          onOpenChange={setDocViewerOpen}
          documents={getDocuments(selectedReg)}
          registrantName={selectedReg.nama_lengkap}
        />
      )}

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Unggah Dokumen — {selectedReg?.nama_lengkap}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 md:grid-cols-2 mt-4">
            {DOCUMENT_FIELDS.map((doc) => (
              <div key={doc.key} className={doc.key === "bukti_transfer_url" ? "md:col-span-2" : ""}>
                <FileUploadField
                  label={doc.label}
                  fieldName={doc.fieldName}
                  value={uploadValues[doc.key] || ""}
                  onChange={(url) =>
                    setUploadValues((prev) => ({ ...prev, [doc.key]: url }))
                  }
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setUploadDialogOpen(false)}>
              Batal
            </Button>
            <Button variant="hero" onClick={handleSaveDocuments} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Simpan Dokumen
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
