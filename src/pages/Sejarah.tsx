import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, Building2, Sparkles } from "lucide-react";

const timeline = [
  { year: "2020", title: "Pendirian Yayasan", desc: "Elfan AI Academy didirikan dengan visi mencetak generasi Islam yang melek teknologi.", icon: Sparkles },
  { year: "2021", title: "Angkatan Pertama", desc: "Menerima santri angkatan pertama dengan kurikulum integrasi AI dan pendidikan Islam.", icon: Users },
  { year: "2022", title: "Pembangunan Fasilitas", desc: "Membangun lab komputer, server data center, dan perpustakaan digital.", icon: Building2 },
  { year: "2023", title: "Prestasi Nasional", desc: "Santri meraih prestasi di berbagai kompetisi teknologi dan tahfidz tingkat nasional.", icon: Award },
  { year: "2024", title: "Kurikulum AI Terpadu", desc: "Meluncurkan kurikulum berbasis kecerdasan buatan yang terintegrasi penuh.", icon: BookOpen },
  { year: "2025", title: "Ekspansi & Inovasi", desc: "Membuka program studi baru dan meningkatkan kerjasama dengan industri teknologi.", icon: Sparkles },
];

const Sejarah = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-16">
        <div className="relative py-20 md:py-28 bg-primary/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="container px-4 relative z-10 text-center">
            <span className="section-badge mb-4 inline-flex">Tentang Kami</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-4">
              Sejarah <span className="gradient-text">Elfan AI Academy</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Perjalanan kami dalam membangun lembaga pendidikan Islam modern berbasis teknologi AI.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24">
        <div className="container px-4 max-w-4xl">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border/50 -translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, i) => (
                <div key={i} className={`relative flex items-start gap-6 md:gap-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-10" />

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-3rem)] ${i % 2 === 0 ? "md:text-right" : ""}`}>
                    <Card className="feature-card">
                      <CardContent className="p-6">
                        <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <item.icon className="w-5 h-5 text-primary" />
                          </div>
                          <span className="text-sm font-bold text-accent">{item.year}</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground text-sm">{item.desc}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sejarah;
