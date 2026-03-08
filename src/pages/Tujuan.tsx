import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Star, Zap, Link2, Users, Target, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

const tujuanPembelajaran = [
  {
    icon: Star,
    title: "Individu Beradab",
    desc: "Membentuk individu yang beradab tinggi dan memiliki kesadaran spiritual beretika Islami dalam pemanfaatan teknologi digital.",
  },
  {
    icon: Zap,
    title: "Kompetensi Digital",
    desc: "Mengembangkan kompetensi peserta didik di bidang teknologi digital berbasis AI sesuai kebutuhan industri di bidang Televisi, Desain Multimedia, Broadcasting, dan Data Analyst.",
  },
  {
    icon: Link2,
    title: "Jiwa Kewirausahaan",
    desc: "Menumbuhkan jiwa kewirausahaan dan kemandirian melalui pembelajaran berbasis praktik.",
  },
  {
    icon: Users,
    title: "Lulusan Inovatif",
    desc: "Menyiapkan lulusan yang inovatif dan mampu berkontribusi bagi masyarakat.",
  },
  {
    icon: Target,
    title: "Adaptif & Siap",
    desc: "Mendorong peserta didik untuk mampu beradaptasi dengan perkembangan teknologi dan perubahan dunia kerja.",
  },
];

const targetCapaian = [
  "Terwujudnya lulusan yang memiliki keseimbangan antara adab, kesadaran spiritual, kompetensi teknologi, dan jiwa entrepreneurship.",
  "Peserta didik mampu menguasai keterampilan teknologi digital dan AI secara aplikatif.",
  "Dihasilkannya karya, produk digital, atau usaha rintisan oleh peserta didik.",
  "Terciptanya ekosistem pembelajaran yang adaptif, efisien, dan berbasis teknologi.",
  "Terbangunnya lulusan yang siap kerja, siap berwirausaha, dan siap berkontribusi di masyarakat.",
];

const Tujuan = () => {
  const hero = useReveal();
  const section1 = useReveal();
  const section2 = useReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-16">
        <div className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[hsl(215,45%,12%)] to-[hsl(215,50%,18%)]">
          <div ref={hero.ref} className={`container px-4 relative z-10 text-center transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">
              Arah & Sasaran
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mt-2 leading-tight">
              Tujuan & Target
            </h1>
            <p className="text-white/60 mt-4 max-w-xl mx-auto text-lg leading-relaxed">
              Komitmen kami dalam mencetak generasi unggul
            </p>
          </div>
        </div>
      </section>

      {/* Tujuan Pembelajaran */}
      <section className="py-16 md:py-24">
        <div className="container px-4 max-w-5xl">
          <div ref={section1.ref} className={`text-center mb-12 transition-all duration-700 ${section1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
              Tujuan Kami
            </span>
            <h2 className="text-2xl md:text-3xl font-bold">
              Tujuan <span className="text-accent">Pembelajaran</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {tujuanPembelajaran.slice(0, 3).map((item, i) => {
              const reveal = useReveal();
              return (
                <div
                  key={i}
                  ref={reveal.ref}
                  className={`p-6 rounded-2xl border border-border/60 bg-card transition-all duration-500 ${reveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="grid md:grid-cols-2 gap-5 mt-5">
            {tujuanPembelajaran.slice(3).map((item, i) => {
              const reveal = useReveal();
              return (
                <div
                  key={i}
                  ref={reveal.ref}
                  className={`p-6 rounded-2xl border border-border/60 bg-card transition-all duration-500 ${reveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${(i + 3) * 100}ms` }}
                >
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Target Capaian */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container px-4 max-w-3xl">
          <div ref={section2.ref} className={`text-center mb-12 transition-all duration-700 ${section2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
              Target Kami
            </span>
            <h2 className="text-2xl md:text-3xl font-bold">
              Target <span className="text-accent">Capaian</span>
            </h2>
          </div>

          <div className="space-y-4">
            {targetCapaian.map((item, i) => {
              const reveal = useReveal();
              return (
                <div
                  key={i}
                  ref={reveal.ref}
                  className={`flex items-start gap-4 p-5 rounded-2xl border border-border/60 bg-card transition-all duration-500 ${reveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <CheckCircle className="w-6 h-6 text-accent shrink-0 mt-0.5" />
                  <p className="text-muted-foreground leading-relaxed">{item}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tujuan;
