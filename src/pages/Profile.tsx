import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, LogOut, FileText, Plus, ArrowLeft, Upload, Eye, Calendar, User as UserIcon, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileUploadField } from "@/components/forms/FileUploadField";
import { DocumentViewer } from "@/components/admin/DocumentViewer";

interface Registration {
  id: string;
  nama_lengkap: string;
  tempat_lahir: string;
  tanggal_lahir: string;
  jenis_kelamin: string;
  tinggi_badan: string;
  berat_badan: string;
  nomor_ktp: string;
  alamat_lengkap: string;
  email: string;
  no_telpon: string;
  instagram: string | null;
  nama_ayah: string;
  alamat_ayah: string;
  pekerjaan_ayah: string;
  no_telpon_ayah: string;
  nama_ibu: string;
  alamat_ibu: string;
  pekerjaan_ibu: string;
  no_telpon_ibu: string;
  asal_sekolah: string;
  jurusan: string;
  alamat_sekolah: string;
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

function DetailItem({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <span className="text-muted-foreground">{label}</span>
      <p className="font-medium mt-0.5">{value}</p>
    </div>
  );
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedReg, setExpandedReg] = useState<string | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [docViewerOpen, setDocViewerOpen] = useState(false);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [uploadValues, setUploadValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
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

  const getMissingDocs = (reg: Registration) =>
    DOCUMENT_FIELDS.filter((d) => !reg[d.key]).map((d) => d.label);

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
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Riwayat Pendaftaran</h1>
          <p className="text-muted-foreground mt-1">Lihat dan kelola dokumen pendaftaran Anda</p>
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
                        {getDocCount(reg) < 5 ? (
                          <span className="flex items-center gap-1 text-amber-500">
                            <AlertTriangle className="h-3.5 w-3.5" />
                            {getDocCount(reg)}/5 dokumen — belum lengkap
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[hsl(var(--success))]">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            5/5 dokumen lengkap
                          </span>
                        )}
                      </div>

                      {/* Missing documents warning */}
                      {getDocCount(reg) < 5 && (
                        <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-sm">
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                            <div>
                              <p className="font-medium text-amber-600 dark:text-amber-400">Dokumen belum lengkap!</p>
                              <p className="text-muted-foreground mt-1">
                                Dokumen yang belum diunggah:{" "}
                                <span className="font-medium text-foreground">
                                  {getMissingDocs(reg).join(", ")}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedReg(expandedReg === reg.id ? null : reg.id)}
                        className="gap-2"
                      >
                        {expandedReg === reg.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        Detail
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDocViewer(reg)}
                        className="gap-2"
                      >
                        <Eye className="h-4 w-4" />
                        Dokumen
                      </Button>
                      <Button
                        variant="hero"
                        size="sm"
                        onClick={() => openUploadDialog(reg)}
                        className="gap-2"
                      >
                        <Upload className="h-4 w-4" />
                        Unggah
                      </Button>
                    </div>
                  </div>

                  {/* Expandable Detail Section */}
                  {expandedReg === reg.id && (
                    <div className="mt-6 pt-6 border-t border-border/30 space-y-6">
                      {/* Data Pribadi */}
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-3">Data Pribadi</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <DetailItem label="Nama Lengkap" value={reg.nama_lengkap} />
                          <DetailItem label="Email" value={reg.email} />
                          <DetailItem label="Tempat Lahir" value={reg.tempat_lahir} />
                          <DetailItem label="Tanggal Lahir" value={reg.tanggal_lahir} />
                          <DetailItem label="Jenis Kelamin" value={reg.jenis_kelamin} />
                          <DetailItem label="No. Telepon" value={reg.no_telpon} />
                          <DetailItem label="Tinggi Badan" value={`${reg.tinggi_badan} cm`} />
                          <DetailItem label="Berat Badan" value={`${reg.berat_badan} kg`} />
                          <DetailItem label="Nomor KTP" value={reg.nomor_ktp} />
                          {reg.instagram && <DetailItem label="Instagram" value={reg.instagram} />}
                          <DetailItem label="Alamat" value={reg.alamat_lengkap} className="sm:col-span-2" />
                        </div>
                      </div>

                      {/* Data Orang Tua */}
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-3">Data Orang Tua</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <DetailItem label="Nama Ayah" value={reg.nama_ayah} />
                          <DetailItem label="Pekerjaan Ayah" value={reg.pekerjaan_ayah} />
                          <DetailItem label="No. Telpon Ayah" value={reg.no_telpon_ayah} />
                          <DetailItem label="Alamat Ayah" value={reg.alamat_ayah} />
                          <DetailItem label="Nama Ibu" value={reg.nama_ibu} />
                          <DetailItem label="Pekerjaan Ibu" value={reg.pekerjaan_ibu} />
                          <DetailItem label="No. Telpon Ibu" value={reg.no_telpon_ibu} />
                          <DetailItem label="Alamat Ibu" value={reg.alamat_ibu} />
                        </div>
                      </div>

                      {/* Data Sekolah */}
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-3">Data Sekolah</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                          <DetailItem label="Asal Sekolah" value={reg.asal_sekolah} />
                          <DetailItem label="Jurusan" value={reg.jurusan} />
                          <DetailItem label="Alamat Sekolah" value={reg.alamat_sekolah} className="sm:col-span-2" />
                        </div>
                      </div>
                    </div>
                  )}
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
