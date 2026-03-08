import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Lightbulb, Target, Users, Heart, Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

const highlights = [
  {
    icon: Lightbulb,
    title: "Visi Awal",
    desc: "Respons inovatif terhadap dinamika perubahan yang didorong oleh kemajuan Kecerdasan Buatan (AI)",
  },
  {
    icon: Target,
    title: "Fokus Pembelajaran",
    desc: "Pengembangan bidang Desain Multimedia, Broadcasting, dan Data Analyst sebagai pilar utama",
  },
  {
    icon: Users,
    title: "Kolaborasi Strategis",
    desc: "Kerjasama dengan praktisi industri, akademisi, pendidik, dan komunitas kreatif teknologi",
  },
  {
    icon: Heart,
    title: "Nilai Inti",
    desc: "Integritas, etika digital, dan tanggung jawab sosial sebagai fondasi pembelajaran",
  },
];

const Sejarah = () => {
  const hero = useReveal();
  const section1 = useReveal();
  const section2 = useReveal();
  const quote = useReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-16">
        <div className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[hsl(215,45%,12%)] to-[hsl(215,50%,18%)]">
          <div ref={hero.ref} className={`container px-4 relative z-10 text-center transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">
              Perjalanan Kami
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mt-2 leading-tight">
              Sejarah
            </h1>
            <p className="text-white/60 mt-4 max-w-xl mx-auto text-lg leading-relaxed">
              Perjalanan Elfan AI Academy dalam mencetak generasi digital
            </p>
          </div>
        </div>
      </section>

      {/* Sejarah Pendirian */}
      <section className="py-16 md:py-24">
        <div className="container px-4 max-w-4xl">
          <div ref={section1.ref} className={`transition-all duration-700 ${section1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Sejarah <span className="text-accent">Pendirian</span>
              </h2>
            </div>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                Seiring dengan pesatnya perkembangan teknologi terbarukan, percepatan perubahan zaman, serta meningkatnya tuntutan dunia kerja global, <strong className="text-foreground">Elfan AI Academy</strong> hadir sebagai respons inovatif terhadap dinamika perubahan yang didorong oleh kemajuan Kecerdasan Buatan (Artificial Intelligence/AI). Kami meyakini bahwa pendidikan merupakan fondasi utama dalam membentuk masa depan peradaban.
              </p>
              <p>
                Oleh karena itu, di era ketika AI menjadi kekuatan transformatif lintas sektor, pendekatan pembelajaran konvensional tidak lagi memadai untuk menjawab tantangan zaman. Elfan AI Academy mengusung visi untuk melahirkan generasi yang tidak hanya adaptif terhadap perkembangan teknologi, tetapi juga mampu berperan sebagai agen perubahan yang berlandaskan nilai-nilai Qur'ani serta memiliki kemandirian ekonomi.
              </p>
              <p>
                Sejak awal pendiriannya, Elfan AI Academy memfokuskan pada pengembangan bidang <strong className="text-foreground">Desain Multimedia, Broadcasting, dan Data Analyst</strong> sebagai pilar utama pembelajaran. Kurikulum dirancang secara adaptif, kontekstual, dan aplikatif dengan mengacu pada kebutuhan industri digital serta tantangan era transformasi teknologi. Dengan pendekatan tersebut, peserta didik dibekali keterampilan yang relevan, berdaya saing tinggi, dan berorientasi pada keberlanjutan.
              </p>
              <p>
                Dalam perjalanannya, Elfan AI Academy terus berkembang melalui kolaborasi strategis dengan praktisi industri, akademisi, pendidik, serta komunitas kreatif dan teknologi. Melalui pendekatan <em>learning by doing</em> dan pemanfaatan teknologi berbasis AI, Elfan AI Academy berupaya membangun ekosistem pendidikan yang inovatif, inklusif, dan berorientasi pada kemaslahatan umat serta kemajuan peradaban.
              </p>
            </div>
          </div>

          {/* Highlight Cards */}
          <div className="grid md:grid-cols-2 gap-5 mt-14">
            {highlights.map((item, i) => {
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

          {/* Additional paragraphs */}
          <div ref={section2.ref} className={`mt-14 space-y-5 text-muted-foreground leading-relaxed transition-all duration-700 ${section2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p>
              Untuk mendukung visi tersebut, Elfan AI Academy merancang sistem pembelajaran yang progresif, aplikatif, dan berorientasi pada praktik nyata industri. Setiap program dirancang untuk membekali peserta didik dengan keterampilan masa depan <em>(future skills)</em>, meliputi pemanfaatan kecerdasan buatan, analisis dan pengolahan data, produksi konten multimedia, serta pengembangan kemampuan berpikir kritis dan pemecahan masalah berbasis teknologi.
            </p>
            <p>
              Lebih dari sekadar penguasaan teknologi, Elfan AI Academy menanamkan nilai integritas, etika digital, dan tanggung jawab sosial sebagai fondasi utama dalam setiap proses pembelajaran. Kami meyakini bahwa kemajuan teknologi harus berjalan dan kemaslahatan, bukan sekadar alat konsumsi teknologi.
            </p>
          </div>

          {/* Quote Block */}
          <div ref={quote.ref} className={`mt-14 p-8 rounded-2xl bg-muted/50 border border-border/40 transition-all duration-700 ${quote.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-foreground leading-relaxed text-lg">
              Dengan pendekatan holistik, <span className="text-accent font-semibold">Elfan AI Academy</span> berkomitmen menjadi pusat pengembangan talenta digital yang berdaya saing global, berakar kuat pada nilai-nilai lokal dan Qur'ani, serta mampu menciptakan peluang kemandirian ekonomi melalui inovasi, kewirausahaan digital, dan kontribusi nyata bagi pembangunan masyarakat.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sejarah;
