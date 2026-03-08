import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, BookOpen, Cpu, Heart, Globe, Users, Lightbulb, Shield, Sparkles, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const tujuan = [
  { icon: BookOpen, title: "Pendidikan Berkualitas", desc: "Menyelenggarakan pendidikan vokasi berkualitas tinggi yang mengintegrasikan nilai-nilai Islam dengan teknologi modern.", color: "from-primary to-cyan" },
  { icon: Cpu, title: "Penguasaan Teknologi AI", desc: "Membekali santri dengan kemampuan teknologi kecerdasan buatan yang aplikatif dan relevan dengan kebutuhan industri.", color: "from-accent to-[hsl(35,90%,55%)]" },
  { icon: Heart, title: "Akhlak Mulia", desc: "Membentuk karakter santri yang berakhlakul karimah, beradab, dan memiliki integritas tinggi.", color: "from-[hsl(0,84%,60%)] to-accent" },
  { icon: Globe, title: "Wawasan Global", desc: "Mencetak lulusan yang memiliki wawasan global dan mampu bersaing di tingkat internasional.", color: "from-cyan to-primary" },
  { icon: Users, title: "Jiwa Entrepreneurship", desc: "Menumbuhkan jiwa kewirausahaan dan kemampuan menciptakan lapangan kerja bagi diri sendiri dan orang lain.", color: "from-[hsl(var(--success))] to-cyan" },
  { icon: Lightbulb, title: "Inovasi Digital", desc: "Mendorong santri untuk menciptakan inovasi digital yang bermanfaat bagi masyarakat luas.", color: "from-accent to-primary" },
  { icon: Shield, title: "Kemandirian", desc: "Membangun karakter mandiri dan tangguh yang siap menghadapi tantangan di era digital.", color: "from-primary to-violet" },
  { icon: Target, title: "Kontribusi Sosial", desc: "Menghasilkan lulusan yang berkontribusi positif bagi masyarakat lokal dan global.", color: "from-violet to-cyan" },
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

const Tujuan = () => {
  const hero = useReveal();
  const grid = useReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-16">
        <div className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          <div ref={hero.ref} className={`container px-4 relative z-10 text-center transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="section-badge mb-4 inline-flex">
              <Target className="w-3.5 h-3.5" />
              Visi Kami
            </span>
            <h1 className="text-4xl md:text-6xl font-black mt-4 leading-tight">
              Tujuan{" "}
              <span className="gradient-text">Elfan AI Academy</span>
            </h1>
            <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
              Komitmen kami dalam mencetak generasi unggul yang beradab dan kompeten di bidang teknologi.
            </p>
          </div>
        </div>
      </section>

      {/* Goals Grid */}
      <section className="py-16 md:py-24">
        <div ref={grid.ref} className={`container px-4 max-w-6xl transition-all duration-700 ${grid.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tujuan.map((t, i) => (
              <Card key={i} className="group feature-card text-center border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${t.color} opacity-60`} />
                <CardContent className="p-7">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${t.color} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <t.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold mb-2 text-base">{t.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
        <div className="container px-4 text-center relative">
          <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
          <h2 className="text-2xl md:text-4xl font-black mb-4">
            Bergabunglah Bersama Kami
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-lg">
            Jadilah bagian dari generasi yang siap memimpin di era digital dengan landasan iman yang kuat.
          </p>
          <a href="/#registration-form">
            <button className="btn-gold group flex items-center gap-2 mx-auto">
              Daftar Sekarang
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tujuan;
