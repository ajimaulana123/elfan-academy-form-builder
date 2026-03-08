import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, Building2, Sparkles, Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const timeline = [
  { year: "2020", title: "Pendirian Yayasan", desc: "Elfan AI Academy didirikan dengan visi mencetak generasi Islam yang melek teknologi.", icon: Sparkles, color: "from-primary to-cyan" },
  { year: "2021", title: "Angkatan Pertama", desc: "Menerima santri angkatan pertama dengan kurikulum integrasi AI dan pendidikan Islam.", icon: Users, color: "from-accent to-[hsl(35,90%,55%)]" },
  { year: "2022", title: "Pembangunan Fasilitas", desc: "Membangun lab komputer, server data center, dan perpustakaan digital.", icon: Building2, color: "from-[hsl(var(--success))] to-cyan" },
  { year: "2023", title: "Prestasi Nasional", desc: "Santri meraih prestasi di berbagai kompetisi teknologi dan tahfidz tingkat nasional.", icon: Award, color: "from-accent to-primary" },
  { year: "2024", title: "Kurikulum AI Terpadu", desc: "Meluncurkan kurikulum berbasis kecerdasan buatan yang terintegrasi penuh.", icon: BookOpen, color: "from-primary to-violet" },
  { year: "2025", title: "Ekspansi & Inovasi", desc: "Membuka program studi baru dan meningkatkan kerjasama dengan industri teknologi.", icon: Rocket, color: "from-cyan to-primary" },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const Sejarah = () => {
  const hero = useReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-16">
        <div className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div ref={hero.ref} className={`container px-4 relative z-10 text-center transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="section-badge mb-4 inline-flex">
              <Sparkles className="w-3.5 h-3.5" />
              Tentang Kami
            </span>
            <h1 className="text-4xl md:text-6xl font-black mt-4 leading-tight">
              Sejarah{" "}
              <span className="gradient-text">Elfan AI Academy</span>
            </h1>
            <p className="text-muted-foreground mt-5 max-w-2xl mx-auto text-lg leading-relaxed">
              Perjalanan kami dalam membangun lembaga pendidikan Islam modern berbasis teknologi AI.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="container px-4 max-w-4xl">
          <div className="relative">
            {/* Vertical gradient line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/30 via-accent/30 to-primary/10 -translate-x-1/2" />

            <div className="space-y-16">
              {timeline.map((item, i) => {
                const reveal = useReveal();
                return (
                  <div
                    key={i}
                    ref={reveal.ref}
                    className={`relative flex items-start gap-6 md:gap-12 transition-all duration-700 delay-${i * 100} ${
                      reveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                    } ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Dot with glow */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${item.color} border-4 border-background shadow-lg`} />
                    </div>

                    {/* Content */}
                    <div className={`ml-14 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? "md:text-right" : ""}`}>
                      <Card className="group feature-card border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color} opacity-60`} />
                        <CardContent className="p-6">
                          <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                              <item.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-black text-accent">{item.year}</span>
                          </div>
                          <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sejarah;
