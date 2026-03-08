import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useAdminRole } from "@/hooks/useAdminRole";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import {
  LogOut,
  RefreshCw,
  Users,
  Search,
  ChevronDown,
  ChevronUp,
  Loader2,
  ArrowLeft,
  ExternalLink,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DocumentViewer } from "@/components/admin/DocumentViewer";
import { EditRegistrationDialog } from "@/components/admin/EditRegistrationDialog";
import { DeleteRegistrationDialog } from "@/components/admin/DeleteRegistrationDialog";
import type { Registration } from "@/types/registration";
import { ContentManager } from "@/components/admin/ContentManager";
const Admin = () => {
  const { user, signOut } = useAuth();
  const { isAdmin, loading: roleLoading } = useAdminRole();
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // Dialog states
  const [docViewerReg, setDocViewerReg] = useState<Registration | null>(null);
  const [editReg, setEditReg] = useState<Registration | null>(null);
  const [deleteReg, setDeleteReg] = useState<Registration | null>(null);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("fetch-registrations");
      if (error) throw error;
      setRegistrations(data?.registrations || []);
    } catch (error: any) {
      console.error("Error fetching registrations:", error);
      toast({
        title: "Gagal Memuat Data",
        description: error?.message || "Terjadi kesalahan saat mengambil data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleSignOut = async () => {
    await signOut();
    navigate("/auth", { replace: true });
  };

  const handleUpdated = (updated: Registration) => {
    setRegistrations(prev => prev.map(r => r.id === updated.id ? updated : r));
  };

  const handleDeleted = (id: string) => {
    setRegistrations(prev => prev.filter(r => r.id !== id));
    if (expandedRow === id) setExpandedRow(null);
  };

  const getDocuments = (reg: Registration) => [
    { label: "Akta", url: reg.akta_url },
    { label: "KK", url: reg.kk_url },
    { label: "KTP", url: reg.ktp_url },
    { label: "Ijazah", url: reg.ijazah_url },
    { label: "Bukti Transfer", url: reg.bukti_transfer_url },
  ];

  const filteredRegistrations = registrations.filter((reg) => {
    const q = searchQuery.toLowerCase();
    return (
      reg.nama_lengkap.toLowerCase().includes(q) ||
      reg.email.toLowerCase().includes(q) ||
      reg.asal_sekolah.toLowerCase().includes(q) ||
      reg.no_telpon.includes(q)
    );
  });

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  if (roleLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center p-8">
          <CardContent>
            <h2 className="text-xl font-bold mb-2">Akses Ditolak</h2>
            <p className="text-muted-foreground mb-4">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
            <Button onClick={() => navigate("/")} variant="outline">Kembali ke Beranda</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold gradient-text">Admin Panel</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut} className="gap-2">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Keluar</span>
          </Button>
        </div>
      </header>

      <main className="container px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="glass-card">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{registrations.length}</p>
                <p className="text-xs text-muted-foreground">Total Pendaftar</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-[hsl(var(--blue)/0.1)] border border-[hsl(var(--blue)/0.2)] flex items-center justify-center">
                <Users className="h-6 w-6 text-[hsl(var(--blue))]" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {registrations.filter((r) => r.jenis_kelamin === "laki-laki").length}
                </p>
                <p className="text-xs text-muted-foreground">Laki-laki</p>
              </div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-[hsl(var(--pink)/0.1)] border border-[hsl(var(--pink)/0.2)] flex items-center justify-center">
                <Users className="h-6 w-6 text-[hsl(var(--pink))]" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {registrations.filter((r) => r.jenis_kelamin === "perempuan").length}
                </p>
                <p className="text-xs text-muted-foreground">Perempuan</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Table */}
        <Card className="glass-card card-animated">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-xl">Data Pendaftaran</CardTitle>
              <CardDescription>Daftar semua pendaftar Elfan AI Academy</CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama, email, sekolah..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button variant="outline" size="icon" onClick={fetchRegistrations} disabled={loading}>
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredRegistrations.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                {searchQuery ? "Tidak ditemukan data yang cocok" : "Belum ada data pendaftaran"}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/30">
                      <TableHead className="w-12">#</TableHead>
                      <TableHead>Nama Lengkap</TableHead>
                      <TableHead className="hidden md:table-cell">Email</TableHead>
                      <TableHead className="hidden lg:table-cell">Asal Sekolah</TableHead>
                      <TableHead className="hidden sm:table-cell">JK</TableHead>
                      <TableHead className="hidden xl:table-cell">Tanggal Daftar</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRegistrations.map((reg, index) => (
                      <>
                        <TableRow
                          key={reg.id}
                          className="border-border/20 hover:bg-secondary/30 transition-colors"
                        >
                          <TableCell className="font-mono text-muted-foreground">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-medium">{reg.nama_lengkap}</TableCell>
                          <TableCell className="hidden md:table-cell text-muted-foreground">
                            {reg.email}
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-muted-foreground">
                            {reg.asal_sekolah}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <span
                              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                reg.jenis_kelamin === "laki-laki"
                                  ? "bg-[hsl(var(--blue)/0.15)] text-[hsl(var(--blue))]"
                                  : "bg-[hsl(var(--pink)/0.15)] text-[hsl(var(--pink))]"
                              }`}
                            >
                              {reg.jenis_kelamin === "laki-laki" ? "L" : "P"}
                            </span>
                          </TableCell>
                          <TableCell className="hidden xl:table-cell text-muted-foreground text-sm">
                            {formatDate(reg.created_at)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-primary"
                                title="Lihat Dokumen"
                                onClick={(e) => { e.stopPropagation(); setDocViewerReg(reg); }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-primary"
                                title="Edit"
                                onClick={(e) => { e.stopPropagation(); setEditReg(reg); }}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive"
                                title="Hapus"
                                onClick={(e) => { e.stopPropagation(); setDeleteReg(reg); }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground"
                                onClick={() => setExpandedRow(expandedRow === reg.id ? null : reg.id)}
                              >
                                {expandedRow === reg.id ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {expandedRow === reg.id && (
                          <TableRow key={`detail-${reg.id}`} className="border-border/20">
                            <TableCell colSpan={7} className="bg-secondary/20 p-6">
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Personal */}
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-sm text-primary">Data Pribadi</h4>
                                  <div className="space-y-1.5 text-sm">
                                    <DetailItem label="Tempat Lahir" value={reg.tempat_lahir} />
                                    <DetailItem label="Tanggal Lahir" value={reg.tanggal_lahir} />
                                    <DetailItem label="Tinggi Badan" value={`${reg.tinggi_badan} cm`} />
                                    <DetailItem label="Berat Badan" value={`${reg.berat_badan} kg`} />
                                    <DetailItem label="No. KTP" value={reg.nomor_ktp} />
                                    <DetailItem label="Alamat" value={reg.alamat_lengkap} />
                                    <DetailItem label="Telepon" value={reg.no_telpon} />
                                    {reg.instagram && <DetailItem label="Instagram" value={reg.instagram} />}
                                  </div>
                                  {/* Inline doc links */}
                                  {(reg.akta_url || reg.kk_url || reg.ktp_url || reg.ijazah_url || reg.bukti_transfer_url) && (
                                    <div className="mt-3 pt-3 border-t border-border/30">
                                      <p className="text-xs text-muted-foreground mb-2">Dokumen:</p>
                                      <div className="flex flex-wrap gap-2">
                                        {reg.akta_url && <DocLink label="Akta" url={reg.akta_url} />}
                                        {reg.kk_url && <DocLink label="KK" url={reg.kk_url} />}
                                        {reg.ktp_url && <DocLink label="KTP" url={reg.ktp_url} />}
                                        {reg.ijazah_url && <DocLink label="Ijazah" url={reg.ijazah_url} />}
                                        {reg.bukti_transfer_url && <DocLink label="Bukti Transfer" url={reg.bukti_transfer_url} />}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                {/* Parents */}
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-sm text-primary">Data Orang Tua</h4>
                                  <div className="space-y-1.5 text-sm">
                                    <DetailItem label="Nama Ayah" value={reg.nama_ayah} />
                                    <DetailItem label="Pekerjaan Ayah" value={reg.pekerjaan_ayah} />
                                    <DetailItem label="Alamat Ayah" value={reg.alamat_ayah} />
                                    <DetailItem label="Telp. Ayah" value={reg.no_telpon_ayah} />
                                    <DetailItem label="Nama Ibu" value={reg.nama_ibu} />
                                    <DetailItem label="Pekerjaan Ibu" value={reg.pekerjaan_ibu} />
                                    <DetailItem label="Alamat Ibu" value={reg.alamat_ibu} />
                                    <DetailItem label="Telp. Ibu" value={reg.no_telpon_ibu} />
                                  </div>
                                </div>
                                {/* School */}
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-sm text-primary">Data Sekolah</h4>
                                  <div className="space-y-1.5 text-sm">
                                    <DetailItem label="Asal Sekolah" value={reg.asal_sekolah} />
                                    <DetailItem label="Jurusan" value={reg.jurusan} />
                                    <DetailItem label="Alamat Sekolah" value={reg.alamat_sekolah} />
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Dialogs */}
      {docViewerReg && (
        <DocumentViewer
          open={!!docViewerReg}
          onOpenChange={(open) => !open && setDocViewerReg(null)}
          documents={getDocuments(docViewerReg)}
          registrantName={docViewerReg.nama_lengkap}
        />
      )}

      {editReg && (
        <EditRegistrationDialog
          open={!!editReg}
          onOpenChange={(open) => !open && setEditReg(null)}
          registration={editReg}
          onUpdated={handleUpdated}
        />
      )}

      {deleteReg && (
        <DeleteRegistrationDialog
          open={!!deleteReg}
          onOpenChange={(open) => !open && setDeleteReg(null)}
          registrationId={deleteReg.id}
          registrantName={deleteReg.nama_lengkap}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
};

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="text-muted-foreground">{label}:</span>{" "}
      <span className="text-foreground">{value}</span>
    </div>
  );
}

function DocLink({ label, url }: { label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
    >
      {label}
      <ExternalLink className="h-3 w-3" />
    </a>
  );
}

export default Admin;
