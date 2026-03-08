import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Instagram, Globe, Send, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";

const contactInfo = [
  { icon: MapPin, title: "Alamat", detail: "Jl. Pendidikan No. 1, Kota Tasikmalaya, Jawa Barat 46115", color: "from-primary to-cyan" },
  { icon: Phone, title: "Telepon", detail: "+62 812-3456-7890", color: "from-accent to-[hsl(35,90%,55%)]" },
  { icon: Mail, title: "Email", detail: "info@elfanacademy.ac.id", color: "from-[hsl(var(--success))] to-cyan" },
  { icon: Clock, title: "Jam Operasional", detail: "Senin - Jumat, 08:00 - 16:00 WIB", color: "from-primary to-violet" },
  { icon: Instagram, title: "Instagram", detail: "@elfanai.academy", color: "from-accent to-primary" },
  { icon: Globe, title: "Website", detail: "elfan-academy.vercel.app", color: "from-cyan to-primary" },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const Kontak = () => {
  const [formData, setFormData] = useState({ nama: "", email: "", pesan: "" });
  const [sending, setSending] = useState(false);
  const hero = useReveal();
  const content = useReveal();

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
        <div className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 -translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div ref={hero.ref} className={`container px-4 relative z-10 text-center transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="section-badge mb-4 inline-flex">
              <MessageSquare className="w-3.5 h-3.5" />
              Hubungi Kami
            </span>
            <h1 className="text-4xl md:text-6xl font-black mt-4 leading-tight">
              Kontak{" "}
              <span className="gradient-text">Elfan AI Academy</span>
            </h1>
            <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
              Jangan ragu untuk menghubungi kami. Kami siap menjawab pertanyaan Anda.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div ref={content.ref} className={`container px-4 max-w-6xl transition-all duration-700 ${content.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-black mb-8 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                Informasi Kontak
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((c, i) => (
                  <Card key={i} className="group feature-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
                    <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${c.color} opacity-60`} />
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                        <c.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-1">{c.title}</h4>
                        <p className="text-sm text-muted-foreground">{c.detail}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-black mb-8 flex items-center gap-2">
                <Send className="w-5 h-5 text-primary" />
                Kirim Pesan
              </h2>
              <Card className="feature-card border-0 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-cyan opacity-60" />
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Nama Lengkap</label>
                      <Input
                        placeholder="Masukkan nama Anda"
                        value={formData.nama}
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Email</label>
                      <Input
                        type="email"
                        placeholder="email@contoh.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold mb-2 block">Pesan</label>
                      <Textarea
                        placeholder="Tulis pesan Anda..."
                        rows={5}
                        value={formData.pesan}
                        onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full btn-gold h-12 text-base group" disabled={sending}>
                      {sending ? "Mengirim..." : (
                        <span className="flex items-center gap-2">
                          Kirim Pesan
                          <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      )}
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
          <Card className="feature-card overflow-hidden border-0 shadow-xl">
            <div className="bg-gradient-to-br from-primary/5 via-accent/3 to-primary/5 h-72 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.06),transparent_60%)]" />
              <div className="text-center relative">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary/50" />
                </div>
                <p className="font-semibold text-foreground">Lokasi Elfan AI Academy</p>
                <p className="text-sm text-muted-foreground mt-1">Kota Tasikmalaya, Jawa Barat</p>
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
