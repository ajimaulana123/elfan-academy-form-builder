import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useRef } from "react";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const contactSchema = z.object({
  nama: z.string().trim().min(1, "Nama wajib diisi").max(100),
  email: z.string().trim().email("Email tidak valid").max(255),
  telepon: z.string().max(20).optional(),
  subjek: z.string().trim().min(1, "Subjek wajib diisi").max(200),
  pesan: z.string().trim().min(1, "Pesan wajib diisi").max(2000),
});

const contactCards = [
  { icon: MapPin, title: "Alamat", detail: "Jl. Pendidikan No. 123, Surakarta, Jawa Tengah 57139" },
  { icon: Phone, title: "Telepon", detail: "+62 271 123 4567" },
  { icon: Mail, title: "Email", detail: "info@elfanacademy.id" },
  { icon: Clock, title: "Jam Operasional", detail: "Senin - Jumat: 08.00 - 16.00 WIB" },
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
  const [formData, setFormData] = useState({ nama: "", email: "", telepon: "", subjek: "", pesan: "" });
  const [sending, setSending] = useState(false);
  const hero = useReveal();
  const content = useReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      toast({ title: "Error", description: result.error.errors[0]?.message, variant: "destructive" });
      return;
    }
    setSending(true);
    setTimeout(() => {
      toast({ title: "Pesan terkirim!", description: "Terima kasih, kami akan segera menghubungi Anda." });
      setFormData({ nama: "", email: "", telepon: "", subjek: "", pesan: "" });
      setSending(false);
    }, 1000);
  };

  const mapsUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63295.47291078655!2d110.7695803!3d-7.5706919!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a16704f09c5e7%3A0x4027a76e352ff60!2sSurakarta!5e0!3m2!1sen!2sid!4v1700000000000";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-16">
        <div className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[hsl(215,45%,12%)] to-[hsl(215,50%,18%)]">
          <div ref={hero.ref} className={`container px-4 relative z-10 text-center transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">
              Hubungi Kami
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mt-2 leading-tight">
              Kontak
            </h1>
            <p className="text-white/60 mt-4 max-w-xl mx-auto text-lg leading-relaxed">
              Kami siap membantu menjawab pertanyaan Anda tentang pendaftaran, program, dan informasi lainnya
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <div ref={content.ref} className={`container px-4 max-w-6xl transition-all duration-700 ${content.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Kirim <span className="text-accent">Pesan</span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Isi formulir di bawah ini dan tim kami akan menghubungi Anda dalam waktu 1x24 jam.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Nama Lengkap *</label>
                    <Input
                      placeholder="Masukkan nama lengkap"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      required
                      maxLength={100}
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Email *</label>
                    <Input
                      type="email"
                      placeholder="contoh@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      maxLength={255}
                      className="h-11"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">No. Telepon</label>
                    <Input
                      placeholder="+62 812 3456 7890"
                      value={formData.telepon}
                      onChange={(e) => setFormData({ ...formData, telepon: e.target.value })}
                      maxLength={20}
                      className="h-11"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Subjek *</label>
                    <Input
                      placeholder="Perihal pesan"
                      value={formData.subjek}
                      onChange={(e) => setFormData({ ...formData, subjek: e.target.value })}
                      required
                      maxLength={200}
                      className="h-11"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Pesan *</label>
                  <Textarea
                    placeholder="Tuliskan pesan atau pertanyaan Anda..."
                    rows={5}
                    value={formData.pesan}
                    onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                    required
                    maxLength={2000}
                  />
                </div>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground h-11 px-8 rounded-lg group" disabled={sending}>
                  <Send className="w-4 h-4 mr-2" />
                  {sending ? "Mengirim..." : "Kirim Pesan"}
                </Button>
              </form>
            </div>

            {/* Right Side: Info + Map */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Informasi <span className="text-accent">Kontak</span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {contactCards.map((c, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-border/60 bg-card">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                      <c.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h4 className="font-bold text-sm mb-1">{c.title}</h4>
                    <p className="text-sm text-muted-foreground">{c.detail}</p>
                  </div>
                ))}
              </div>

              <h3 className="text-xl font-bold mb-4">
                Lokasi <span className="text-accent">Kampus</span>
              </h3>
              <div className="rounded-2xl overflow-hidden border border-border/60">
                <iframe
                  src={mapsUrl}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Elfan AI Academy"
                />
              </div>
              <p className="text-sm text-muted-foreground mt-3 flex items-center gap-1">
                📍 Klik peta untuk membuka di Google Maps
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Kontak;
