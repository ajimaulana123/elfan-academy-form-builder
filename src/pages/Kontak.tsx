import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Instagram, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: MapPin, title: "Alamat", detail: "Jl. Pendidikan No. 1, Kota Tasikmalaya, Jawa Barat 46115" },
  { icon: Phone, title: "Telepon", detail: "+62 812-3456-7890" },
  { icon: Mail, title: "Email", detail: "info@elfanacademy.ac.id" },
  { icon: Clock, title: "Jam Operasional", detail: "Senin - Jumat, 08:00 - 16:00 WIB" },
  { icon: Instagram, title: "Instagram", detail: "@elfanai.academy" },
  { icon: Globe, title: "Website", detail: "elfan-academy.vercel.app" },
];

const Kontak = () => {
  const [formData, setFormData] = useState({ nama: "", email: "", pesan: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast({ title: "Pesan terkirim!", description: "Terima kasih, kami akan segera menghubungi Anda." });
      setFormData({ nama: "", email: "", pesan: "" });
      setSending(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-16">
        <div className="relative py-20 md:py-28 bg-primary/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="container px-4 relative z-10 text-center">
            <span className="section-badge mb-4 inline-flex">Hubungi Kami</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-4">
              Kontak <span className="gradient-text">Elfan AI Academy</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Jangan ragu untuk menghubungi kami. Kami siap menjawab pertanyaan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div className="container px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Informasi Kontak</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((c, i) => (
                  <Card key={i} className="feature-card">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <c.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{c.title}</h4>
                        <p className="text-sm text-muted-foreground">{c.detail}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Kirim Pesan</h2>
              <Card className="feature-card">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Nama Lengkap</label>
                      <Input
                        placeholder="Masukkan nama Anda"
                        value={formData.nama}
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Email</label>
                      <Input
                        type="email"
                        placeholder="email@contoh.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">Pesan</label>
                      <Textarea
                        placeholder="Tulis pesan Anda..."
                        rows={5}
                        value={formData.pesan}
                        onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full btn-gold" disabled={sending}>
                      {sending ? "Mengirim..." : "Kirim Pesan"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="pb-16">
        <div className="container px-4 max-w-6xl">
          <Card className="feature-card overflow-hidden">
            <div className="bg-primary/5 h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary/30 mx-auto mb-3" />
                <p className="text-muted-foreground">Lokasi Elfan AI Academy</p>
                <p className="text-sm text-muted-foreground">Kota Tasikmalaya, Jawa Barat</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Kontak;
