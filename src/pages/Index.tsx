import { Button } from "@/components/ui/button";
import { 
  Sparkles, Calendar, ArrowDown, User, LogOut, CheckCircle2, 
  BookOpen, Cpu, GraduationCap, Building2, Monitor, Library,
  Server, UtensilsCrossed, Dumbbell, ChevronDown, Eye, Target
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { RegistrationFormCard } from "@/components/RegistrationFormCard";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { value: 200, suffix: "+", label: "Santri Aktif" },
  { value: 50, suffix: "+", label: "Tenaga Pengajar" },
  { value: 5, suffix: "", label: "Angkatan Alumni" },
  { value: 100, suffix: "%", label: "Tingkat Kelulusan" },
];

const features = [
  { icon: BookOpen, title: "Kurikulum Terpadu", desc: "Menggabungkan ilmu agama dan pengetahuan umum dengan pendekatan AI modern" },
  { icon: GraduationCap, title: "Pengajar Berkualitas", desc: "Tenaga pendidik profesional dengan pengalaman di bidang pendidikan Islam" },
  { icon: Target, title: "Prestasi Gemilang", desc: "Lulusan berprestasi di tingkat nasional dan internasional" },
  { icon: Eye, title: "Visi Masa Depan", desc: "Mempersiapkan generasi yang siap menghadapi tantangan era digital" },
];

const facilities = [
  { icon: Building2, title: "Asrama & Masjid", desc: "Asrama nyaman dengan masjid sebagai pusat kegiatan ibadah" },
  { icon: Monitor, title: "Lab Komputer", desc: "Laboratorium komputer dengan perangkat modern dan internet cepat" },
  { icon: Library, title: "Perpustakaan Digital", desc: "Bookless library dengan akses ribuan e-book dan jurnal" },
  { icon: Server, title: "Server & Data Center", desc: "Infrastruktur IT terdepan untuk mendukung pembelajaran AI" },
  { icon: UtensilsCrossed, title: "Makan 3x Sehari", desc: "Katering halal berkualitas dengan menu bergizi seimbang" },
  { icon: Dumbbell, title: "Fasilitas Olahraga", desc: "Lapangan olahraga lengkap untuk mendukung kesehatan santri" },
];

const programs = [
  { icon: BookOpen, title: "Tahfidz Al-Quran", desc: "Program hafalan Al-Quran 30 juz dengan metode modern dan bimbingan intensif dari para hafidz.", duration: "3 Tahun" },
  { icon: Cpu, title: "AI & Technology", desc: "Pembelajaran teknologi kecerdasan buatan, coding, dan digital literacy untuk era modern.", duration: "2 Tahun" },
  { icon: GraduationCap, title: "Program Reguler", desc: "Kurikulum nasional plus dengan pendalaman ilmu agama dan bahasa Arab.", duration: "3 Tahun" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            setCount(Math.floor(progress * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <div ref={ref} className="stat-number">{count}{suffix}</div>;
}

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [alreadyRegistered, setAlreadyRegistered] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRegistration = async () => {
      if (!user) return;
      const { data } = await supabase
        .from("registrations")
        .select("id")
        .limit(1);
      setAlreadyRegistered(!!data && data.length > 0);
    };
    checkRegistration();
  }, [user]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const navLinks = [
    { label: "Beranda", id: "hero" },
    { label: "Visi Misi", id: "visi-misi" },
    { label: "Program", id: "program" },
    { label: "Fasilitas", id: "fasilitas" },
    { label: "Daftar", id: "registration-form" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              EA
            </div>
            <div className="leading-tight">
              <span className="text-sm font-bold text-foreground block">Elfan</span>
              <span className="text-xs text-muted-foreground">AI Academy</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Profil</span>
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-muted-foreground">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Keluar</span>
                </Button>
              </>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm" className="gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Masuk</span>
                </Button>
              </Link>
            )}
            <button
              onClick={() => scrollToSection('registration-form')}
              className="btn-gold text-sm hidden sm:inline-flex items-center gap-2 !px-5 !py-2"
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Screen */}
      <section
        id="hero"
        className="hero-section"
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
      >
        <div className="hero-overlay" />
        <div className="container relative z-10 px-4">
          <div className="max-w-2xl">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white/90 backdrop-blur-sm mb-6">
                <Sparkles className="h-4 w-4 text-accent" />
                Tahun Ajaran 2025/2026
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 animate-fade-up-delay-1">
              Pendidikan Islam{" "}
              <span className="gradient-text-gold">Modern</span>
            </h1>

            <p className="text-lg md:text-xl text-accent font-medium mb-4 animate-fade-up-delay-1">
              Menggabungkan Nilai-Nilai Islami dengan Teknologi AI
            </p>

            <p className="text-base text-white/70 max-w-xl mb-8 animate-fade-up-delay-2">
              Membentuk generasi yang berakhlak mulia, cerdas, dan siap menghadapi tantangan masa depan.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-up-delay-3">
              <button onClick={() => scrollToSection('registration-form')} className="btn-gold">
                Daftar Sekarang
              </button>
              <button onClick={() => scrollToSection('visi-misi')} className="btn-outline-light">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 z-10 hidden md:flex flex-col items-center gap-2 text-white/50">
          <span className="text-xs tracking-widest uppercase" style={{ writingMode: 'vertical-rl' }}>SCROLL</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 -mt-16">
        <div className="container px-4">
          <div className="bg-primary/90 backdrop-blur-md rounded-2xl border border-primary/50 grid grid-cols-2 md:grid-cols-4 py-6 md:py-8">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visi Misi Section */}
      <section id="visi-misi" className="py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-flex">Tentang Kami</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Visi & Misi <span className="gradient-text">Elfan AI Academy</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            <Card className="feature-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 text-primary">Visi</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Menjadi pendidikan vokasi terdepan dalam mencetak individu yang beradab, kompeten di bidang teknologi dan mampu menciptakan inovasi digital, berjiwa entrepreneurship, berkontribusi bagi masyarakat lokal dan global.
                </p>
              </CardContent>
            </Card>
            <Card className="feature-card">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4 text-primary">Misi</h3>
                <ul className="text-muted-foreground space-y-3 leading-relaxed">
                  <li className="flex gap-2"><span className="text-accent mt-1">•</span> Mengintegrasikan nilai-nilai adab Islam di setiap aspek pembelajaran</li>
                  <li className="flex gap-2"><span className="text-accent mt-1">•</span> Menyelenggarakan kurikulum berbasis AI yang relevan dengan kebutuhan industri digital</li>
                  <li className="flex gap-2"><span className="text-accent mt-1">•</span> Menumbuhkan jiwa entrepreneurship melalui praktik dan pemanfaatan AI</li>
                  <li className="flex gap-2"><span className="text-accent mt-1">•</span> Mencetak lulusan yang mandiri, inovatif, dan mampu menciptakan lapangan kerja</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <div key={i} className="feature-card text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">{f.title}</h4>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section id="program" className="py-20 md:py-28 bg-secondary/30">
        <div className="container px-4">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-flex">Program Studi</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Kurikulum <span className="gradient-text">Unggulan</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Program pembelajaran yang dirancang untuk menghasilkan lulusan berkualitas dengan keseimbangan ilmu agama dan teknologi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {programs.map((p, i) => (
              <Card key={i} className="feature-card overflow-hidden group">
                <CardContent className="p-0">
                  <div className="bg-primary/5 p-8 text-center border-b border-border/30">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <p.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold">{p.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground text-sm mb-4">{p.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">Durasi: {p.duration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fasilitas Section */}
      <section id="fasilitas" className="py-20 md:py-28">
        <div className="container px-4">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-flex">Fasilitas</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Fasilitas <span className="gradient-text">Terlengkap</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Kami menyediakan fasilitas lengkap untuk menunjang kenyamanan dan keberhasilan proses belajar mengajar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {facilities.map((f, i) => (
              <div key={i} className="feature-card flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <f.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{f.title}</h4>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration / CTA Section */}
      <section id="registration-form" className="py-20 md:py-28 bg-secondary/30">
        <div className="container px-4">
          <div className="text-center mb-12">
            <span className="section-badge mb-4 inline-flex">Pendaftaran</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4">
              Formulir <span className="gradient-text">Pendaftaran</span>
            </h2>
            <div className="flex items-center justify-center gap-2 text-muted-foreground mt-4">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium">
                Kesiapan Tes: <span className="text-foreground font-semibold">Sabtu, 31 Januari 2026</span>
              </span>
            </div>
          </div>

          {!user ? (
            <Card className="glass-card max-w-2xl mx-auto text-center py-12">
              <CardContent className="space-y-4">
                <User className="h-16 w-16 text-primary/50 mx-auto" />
                <h2 className="text-2xl font-bold">Silakan Login Terlebih Dahulu</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Anda perlu masuk atau membuat akun untuk melakukan pendaftaran.
                </p>
                <Link to="/login">
                  <Button variant="hero" className="gap-2 mt-4">
                    <User className="h-4 w-4" />
                    Masuk / Daftar Akun
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : alreadyRegistered === true ? (
            <Card className="glass-card max-w-2xl mx-auto text-center py-12">
              <CardContent className="space-y-4">
                <CheckCircle2 className="h-16 w-16 text-[hsl(var(--success))] mx-auto" />
                <h2 className="text-2xl font-bold">Anda Sudah Terdaftar!</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Akun Anda sudah memiliki pendaftaran. Setiap akun hanya diperbolehkan mendaftar satu kali. Anda bisa mengelola dokumen dari halaman profil.
                </p>
                <Link to="/profile">
                  <Button variant="hero" className="gap-2 mt-4">
                    <User className="h-4 w-4" />
                    Lihat Profil & Dokumen
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : alreadyRegistered === false ? (
            <RegistrationFormCard />
          ) : null}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-10 border-t border-border/30 bg-card/50">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">EA</div>
              <span className="text-sm font-semibold">Elfan AI Academy</span>
            </div>
            <span className="text-sm text-muted-foreground">© 2026 Elfan AI Academy. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
