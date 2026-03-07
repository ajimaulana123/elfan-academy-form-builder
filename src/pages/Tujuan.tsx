import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, BookOpen, Cpu, Heart, Globe, Users, Lightbulb, Shield } from "lucide-react";

const tujuan = [
  { icon: BookOpen, title: "Pendidikan Berkualitas", desc: "Menyelenggarakan pendidikan vokasi berkualitas tinggi yang mengintegrasikan nilai-nilai Islam dengan teknologi modern." },
  { icon: Cpu, title: "Penguasaan Teknologi AI", desc: "Membekali santri dengan kemampuan teknologi kecerdasan buatan yang aplikatif dan relevan dengan kebutuhan industri." },
  { icon: Heart, title: "Akhlak Mulia", desc: "Membentuk karakter santri yang berakhlakul karimah, beradab, dan memiliki integritas tinggi." },
  { icon: Globe, title: "Wawasan Global", desc: "Mencetak lulusan yang memiliki wawasan global dan mampu bersaing di tingkat internasional." },
  { icon: Users, title: "Jiwa Entrepreneurship", desc: "Menumbuhkan jiwa kewirausahaan dan kemampuan menciptakan lapangan kerja bagi diri sendiri dan orang lain." },
  { icon: Lightbulb, title: "Inovasi Digital", desc: "Mendorong santri untuk menciptakan inovasi digital yang bermanfaat bagi masyarakat luas." },
  { icon: Shield, title: "Kemandirian", desc: "Membangun karakter mandiri dan tangguh yang siap menghadapi tantangan di era digital." },
  { icon: Target, title: "Kontribusi Sosial", desc: "Menghasilkan lulusan yang berkontribusi positif bagi masyarakat lokal dan global." },
];

const Tujuan = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-16">
        <div className="relative py-20 md:py-28 bg-primary/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="container px-4 relative z-10 text-center">
            <span className="section-badge mb-4 inline-flex">Visi Kami</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-4">
              Tujuan <span className="gradient-text">Elfan AI Academy</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Komitmen kami dalam mencetak generasi unggul yang beradab dan kompeten di bidang teknologi.
            </p>
          </div>
        </div>
      </section>

      {/* Goals Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4 max-w-6xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tujuan.map((t, i) => (
              <Card key={i} className="feature-card text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <t.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">{t.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Bergabunglah Bersama Kami
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Jadilah bagian dari generasi yang siap memimpin di era digital dengan landasan iman yang kuat.
          </p>
          <a href="/#registration-form">
            <button className="btn-gold">Daftar Sekarang</button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tujuan;
