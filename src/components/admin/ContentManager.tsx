import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Star, Image, MessageSquare, Upload, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface HeroImage {
  id: string;
  image_url: string;
  title: string | null;
  is_active: boolean;
}

interface GalleryPhoto {
  id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  photo_url: string | null;
  is_active: boolean;
}

async function uploadFile(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("site-content").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("site-content").getPublicUrl(path);
  return data.publicUrl;
}

export function ContentManager() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const [h, g, t] = await Promise.all([
      supabase.from("hero_images").select("*").order("created_at", { ascending: false }),
      supabase.from("gallery_photos").select("*").order("sort_order"),
      supabase.from("testimonials").select("*").order("created_at", { ascending: false }),
    ]);
    setHeroImages((h.data as HeroImage[]) || []);
    setGalleryPhotos((g.data as GalleryPhoto[]) || []);
    setTestimonials((t.data as Testimonial[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>;
  }

  return (
    <Tabs defaultValue="hero" className="w-full">
      <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
        <TabsTrigger value="hero" className="gap-2"><Image className="h-4 w-4" /> Hero</TabsTrigger>
        <TabsTrigger value="gallery" className="gap-2"><Star className="h-4 w-4" /> Galeri</TabsTrigger>
        <TabsTrigger value="testimonials" className="gap-2"><MessageSquare className="h-4 w-4" /> Testimoni</TabsTrigger>
      </TabsList>

      <TabsContent value="hero">
        <HeroManager items={heroImages} onRefresh={fetchAll} />
      </TabsContent>
      <TabsContent value="gallery">
        <GalleryManager items={galleryPhotos} onRefresh={fetchAll} />
      </TabsContent>
      <TabsContent value="testimonials">
        <TestimonialManager items={testimonials} onRefresh={fetchAll} />
      </TabsContent>
    </Tabs>
  );
}

function HeroManager({ items, onRefresh }: { items: HeroImage[]; onRefresh: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleAdd = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file, "hero");
      const { error } = await supabase.from("hero_images").insert({ image_url: url, title: title || null, is_active: false });
      if (error) throw error;
      toast({ title: "Hero image ditambahkan!" });
      setDialogOpen(false);
      setTitle("");
      setFile(null);
      onRefresh();
    } catch (e: any) {
      toast({ title: "Gagal", description: e.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    // If activating, deactivate others first
    if (!current) {
      await supabase.from("hero_images").update({ is_active: false }).neq("id", id);
    }
    await supabase.from("hero_images").update({ is_active: !current }).eq("id", id);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("hero_images").delete().eq("id", id);
    onRefresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Hero Images</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Tambah</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Tambah Hero Image</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Judul (opsional)</Label>
                <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Judul hero" />
              </div>
              <div>
                <Label>Gambar</Label>
                <Input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
              </div>
              <Button onClick={handleAdd} disabled={!file || uploading} className="w-full gap-2">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {uploading ? "Mengupload..." : "Upload"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">Belum ada hero image</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <img src={item.image_url} alt={item.title || ""} className="w-full h-40 object-cover" />
              <CardContent className="p-3">
                <p className="text-sm font-medium truncate">{item.title || "Tanpa judul"}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <Switch checked={item.is_active} onCheckedChange={() => toggleActive(item.id, item.is_active)} />
                    <span className="text-xs text-muted-foreground">{item.is_active ? "Aktif" : "Nonaktif"}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive h-8 w-8">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function GalleryManager({ items, onRefresh }: { items: GalleryPhoto[]; onRefresh: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleAdd = async () => {
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadFile(file, "gallery");
      const { error } = await supabase.from("gallery_photos").insert({
        image_url: url,
        caption: caption || null,
        sort_order: items.length,
      });
      if (error) throw error;
      toast({ title: "Foto ditambahkan!" });
      setDialogOpen(false);
      setCaption("");
      setFile(null);
      onRefresh();
    } catch (e: any) {
      toast({ title: "Gagal", description: e.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("gallery_photos").delete().eq("id", id);
    onRefresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Foto Kegiatan</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Tambah</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Tambah Foto Kegiatan</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Caption (opsional)</Label>
                <Input value={caption} onChange={e => setCaption(e.target.value)} placeholder="Deskripsi foto" />
              </div>
              <div>
                <Label>Gambar</Label>
                <Input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
              </div>
              <Button onClick={handleAdd} disabled={!file || uploading} className="w-full gap-2">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {uploading ? "Mengupload..." : "Upload"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">Belum ada foto kegiatan</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map(item => (
            <Card key={item.id} className="overflow-hidden">
              <img src={item.image_url} alt={item.caption || ""} className="w-full h-40 object-cover" />
              <CardContent className="p-3 flex items-center justify-between">
                <p className="text-sm truncate flex-1">{item.caption || "Tanpa caption"}</p>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive h-8 w-8 shrink-0">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function TestimonialManager({ items, onRefresh }: { items: Testimonial[]; onRefresh: () => void }) {
  const [saving, setSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ name: "", role: "Santri", quote: "" });
  const [file, setFile] = useState<File | null>(null);

  const handleAdd = async () => {
    if (!form.name || !form.quote) return;
    setSaving(true);
    try {
      let photo_url = null;
      if (file) {
        photo_url = await uploadFile(file, "testimonials");
      }
      const { error } = await supabase.from("testimonials").insert({
        name: form.name,
        role: form.role,
        quote: form.quote,
        photo_url,
      });
      if (error) throw error;
      toast({ title: "Testimoni ditambahkan!" });
      setDialogOpen(false);
      setForm({ name: "", role: "Santri", quote: "" });
      setFile(null);
      onRefresh();
    } catch (e: any) {
      toast({ title: "Gagal", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    await supabase.from("testimonials").update({ is_active: !current }).eq("id", id);
    onRefresh();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    onRefresh();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Testimoni</h3>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-2"><Plus className="h-4 w-4" /> Tambah</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Tambah Testimoni</DialogTitle></DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>Nama *</Label>
                <Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nama santri" />
              </div>
              <div>
                <Label>Role</Label>
                <Input value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="Santri / Alumni" />
              </div>
              <div>
                <Label>Kutipan *</Label>
                <Textarea value={form.quote} onChange={e => setForm({ ...form, quote: e.target.value })} placeholder="Testimoni..." rows={3} />
              </div>
              <div>
                <Label>Foto (opsional)</Label>
                <Input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
              </div>
              <Button onClick={handleAdd} disabled={!form.name || !form.quote || saving} className="w-full gap-2">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                {saving ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-8">Belum ada testimoni</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map(item => (
            <Card key={item.id} className="p-4">
              <div className="flex gap-3">
                {item.photo_url ? (
                  <img src={item.photo_url} alt={item.name} className="w-12 h-12 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold">
                    {item.name[0]}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                  <p className="text-sm mt-1 line-clamp-2">{item.quote}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <Switch checked={item.is_active} onCheckedChange={() => toggleActive(item.id, item.is_active)} />
                  <span className="text-xs text-muted-foreground">{item.is_active ? "Aktif" : "Nonaktif"}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)} className="text-destructive h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
