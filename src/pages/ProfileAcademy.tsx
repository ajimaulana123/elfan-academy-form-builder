import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookOpen } from "lucide-react";
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

const ProfileAcademy = () => {
  const hero = useReveal();
  const section1 = useReveal();
  const quoteReveal = useReveal();
  const section2 = useReveal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-16">
        <div className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[hsl(215,45%,12%)] to-[hsl(215,50%,18%)]">
          <div ref={hero.ref} className={`container px-4 relative z-10 text-center transition-all duration-700 ${hero.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4">
              Tentang Kami
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mt-2 leading-tight">
              Profile
            </h1>
            <p className="text-white/60 mt-4 max-w-xl mx-auto text-lg leading-relaxed">
              Mengenal lebih dekat Elfan AI Academy
            </p>
          </div>
        </div>
      </section>

      {/* Pemikiran Dasar */}
      <section className="py-16 md:py-24">
        <div className="container px-4 max-w-4xl">
          <div ref={section1.ref} className={`transition-all duration-700 ${section1.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Pemikiran <span className="text-accent">Dasar</span>
              </h2>
            </div>

            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Elfan AI Academy</strong> adalah kampus AI pertama di Solo yang berfokus pada pengembangan Televisi AI Multimedia, Broadcasting, dan Data Analyst, berkomitmen dalam menghadirkan pembelajaran yang relevan dengan kebutuhan industri digital masa kini. Dengan mengacu kepada surat Al-Hadid ayat 25 bahwa teknologi memiliki manfaat yang sangat besar terhadap perkembangan dan efisiensi kehidupan bahkan setara dengan manfaat Qur'an terhadap ekosistem dalam kehidupan manusia, sebagaimana dalam firman-Nya.
              </p>
            </div>
          </div>

          {/* Quran Quote Block */}
          <div ref={quoteReveal.ref} className={`mt-10 p-8 rounded-2xl border border-border/40 bg-muted/30 transition-all duration-700 ${quoteReveal.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-2xl md:text-3xl text-center leading-loose font-arabic text-foreground" dir="rtl" lang="ar">
              لَقَدْ أَرْسَلْنَا رُسُلَنَا بِالْبَيِّنَاتِ وَأَنْزَلْنَا مَعَهُمُ الْكِتَابَ وَالْمِيزَانَ لِيَقُومَ النَّاسُ بِالْقِسْطِ ۖ وَأَنْزَلْنَا الْحَدِيدَ فِيهِ بَأْسٌ شَدِيدٌ وَمَنَافِعُ لِلنَّاسِ وَلِيَعْلَمَ اللَّهُ مَنْ يَنْصُرُهُ وَرُسُلَهُ بِالْغَيْبِ ۚ إِنَّ اللَّهَ قَوِيٌّ عَزِيزٌ ﴿٢٥﴾
            </p>
            <div className="mt-6 text-sm text-muted-foreground italic leading-relaxed">
              <p>
                "Sungguh, Kami benar-benar telah mengutus rasul-rasul Kami dengan bukti-bukti yang nyata dan Kami menurunkan bersama mereka kitab dan neraca (keadilan) agar manusia dapat berlaku adil. Kami menurunkan besi yang mempunyai kekuatan hebat dan berbagai manfaat bagi manusia agar Allah mengetahui siapa yang menolong (agama)-Nya dan rasul-rasul-Nya walaupun (Allah) tidak dilihatnya. Sesungguhnya Allah Mahakuat lagi Mahaperkasa."
              </p>
            </div>
            <p className="text-accent font-semibold mt-4 text-sm">(Al-Hadid : 25)</p>
          </div>

          {/* Additional paragraphs */}
          <div ref={section2.ref} className={`mt-10 space-y-5 text-muted-foreground leading-relaxed transition-all duration-700 ${section2.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p>
              Ayat tersebut memberikan landasan filosofis bahwa teknologi—yang dalam ayat tersebut direpresentasikan dengan besi—merupakan sarana peradaban yang dianugerahkan Allah SWT untuk dimanfaatkan secara optimal demi kemaslahatan manusia. Sebagaimana Al-Qur'an berfungsi sebagai petunjuk nilai dan moral kehidupan, teknologi berperan sebagai alat pendukung yang memperkuat efektivitas, efisiensi, dan keadilan dalam berbagai aspek kehidupan manusia.
            </p>
            <p>
              Dalam konteks modern, teknologi digital dan kecerdasan buatan (Artificial Intelligence) merupakan manifestasi lanjutan dari pemanfaatan "besi" di era kontemporer. AI, multimedia, broadcasting, dan data analytics tidak sekadar menjadi alat produksi informasi, namun juga instrumen strategis dalam membangun ekosistem pengetahuan, memperluas dakwah, mencerdaskan umat, serta menciptakan solusi berbasis data yang adil dan bertanggung jawab.
            </p>
            <p>
              Oleh karena itu, <strong className="text-foreground">Elfan AI Academy</strong> memandang teknologi bukan hanya sebagai kecakapan teknis, tetapi sebagai amanah peradaban yang harus dikembangkan dengan landasan nilai, etika, dan spiritualitas. Melalui integrasi antara penguasaan teknologi mutakhir dan nilai-nilai Qur'ani, Elfan AI Academy berkomitmen mencetak generasi yang tidak hanya unggul secara kompetensi digital, tetapi juga berakal, beradab menjadi muslim yang memiliki pemahaman yang komprehensif dan siap menjadi penggerak perubahan positif di tengah masyarakat global.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProfileAcademy;
