import { Button } from "@/components/ui/button";
import { 
  Sparkles, Calendar, User, CheckCircle2, 
  BookOpen, Cpu, GraduationCap, Building2, Monitor, Library,
  Server, UtensilsCrossed, Dumbbell, ChevronDown, Eye, Target,
  ChevronLeft, ChevronRight, ArrowRight, Star, Zap, Quote, MessageCircle, Camera
} from "lucide-react";
import { RegistrationFormCard } from "@/components/RegistrationFormCard";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const galleryItems = [
  { src: gallery1, label: "Kegiatan Belajar", category: "Akademik" },
  { src: gallery2, label: "Tahfidz Al-Quran", category: "Ibadah" },
  { src: gallery3, label: "Lab Komputer & AI", category: "Teknologi" },
  { src: gallery4, label: "Kegiatan Olahraga", category: "Ekstrakurikuler" },
  { src: gallery5, label: "Wisuda Santri", category: "Prestasi" },
  { src: gallery6, label: "Makan Bersama", category: "Kehidupan Santri" },
];

const stats = [
  { value: 200, suffix: "+", label: "Santri Aktif", icon: User },
  { value: 50, suffix: "+", label: "Tenaga Pengajar", icon: GraduationCap },
  { value: 5, suffix: "", label: "Angkatan Alumni", icon: Star },
  { value: 100, suffix: "%", label: "Tingkat Kelulusan", icon: CheckCircle2 },
];

const features = [
  { icon: BookOpen, title: "Kurikulum Terpadu", desc: "Menggabungkan ilmu agama dan pengetahuan umum dengan pendekatan AI modern", color: "from-primary to-cyan" },
  { icon: GraduationCap, title: "Pengajar Berkualitas", desc: "Tenaga pendidik profesional dengan pengalaman di bidang pendidikan Islam", color: "from-accent to-[hsl(35,90%,55%)]" },
  { icon: Target, title: "Prestasi Gemilang", desc: "Lulusan berprestasi di tingkat nasional dan internasional", color: "from-[hsl(var(--success))] to-cyan" },
  { icon: Eye, title: "Visi Masa Depan", desc: "Mempersiapkan generasi yang siap menghadapi tantangan era digital", color: "from-primary to-violet" },
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
  { icon: BookOpen, title: "Tahfidz Al-Quran", desc: "Program hafalan Al-Quran 30 juz dengan metode modern dan bimbingan intensif dari para hafidz.", duration: "3 Tahun", accent: "accent" },
  { icon: Cpu, title: "AI & Technology", desc: "Pembelajaran teknologi kecerdasan buatan, coding, dan digital literacy untuk era modern.", duration: "2 Tahun", accent: "primary" },
  { icon: GraduationCap, title: "Program Reguler", desc: "Kurikulum nasional plus dengan pendalaman ilmu agama dan bahasa Arab.", duration: "3 Tahun", accent: "cyan" },
];

const heroSlides = [
  {
    bg: "/hero-bg.jpg",
    badge: "Tahun Ajaran 2025/2026",
    title: "Pendidikan Islam",
    highlight: "Modern",
    subtitle: "Menggabungkan Nilai-Nilai Islami dengan Teknologi AI",
    desc: "Membentuk generasi yang berakhlak mulia, cerdas, dan siap menghadapi tantangan masa depan.",
  },
  {
    bg: "/hero-bg-2.jpg",
    badge: "Pendaftaran Dibuka",
    title: "Generasi Unggul",
    highlight: "Berteknologi",
    subtitle: "Kurikulum Berbasis AI untuk Masa Depan Cemerlang",
    desc: "Mencetak lulusan yang mandiri, inovatif, dan mampu bersaing di era digital global.",
  },
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

  return <div ref={ref} className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">{count}{suffix}</div>;
}

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [alreadyRegistered, setAlreadyRegistered] = useState<boolean | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef<ReturnType<typeof setInterval>>();




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

  const startAutoSlide = useCallback(() => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
  }, []);

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(slideInterval.current);
  }, [startAutoSlide]);

  const goToSlide = (index: number) => {
    clearInterval(slideInterval.current);
    setCurrentSlide(index);
    startAutoSlide();
  };

  const prevSlide = () => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
  const nextSlide = () => goToSlide((currentSlide + 1) % heroSlides.length);

  const visiMisi = useScrollReveal();
  const programRef = useScrollReveal();
  const fasilitasRef = useScrollReveal();
  const registrationRef = useScrollReveal();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      {/* Hero Slider */}
      <section id="hero" className="relative min-h-screen overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-all duration-1000 ${
              i === currentSlide ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
            }`}
          >
            <div className="hero-section" style={{ backgroundImage: `url(${slide.bg})` }}>
              <div className="hero-overlay" />
              {/* Decorative particles */}
              <div className="absolute inset-0 z-[5]">
                <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-accent/20 animate-float blur-[1px]" />
                <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-primary/30 animate-float-delayed blur-[1px]" />
                <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-white/15 animate-float-slow blur-[1px]" />
                <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 rounded-full bg-accent/25 animate-float" />
                <div className="absolute bottom-1/4 right-1/2 w-2.5 h-2.5 rounded-full bg-primary/20 animate-float-slow" />
              </div>
              <div className="container relative z-10 px-4">
                <div className="max-w-2xl">
                  <div className={i === currentSlide ? "animate-fade-up" : ""}>
                    <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/20 border border-accent/30 text-sm font-semibold text-accent backdrop-blur-md mb-6 shadow-lg">
                      <Sparkles className="h-4 w-4" />
                      {slide.badge}
                    </span>
                  </div>

                  <h1 className={`text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 ${i === currentSlide ? "animate-fade-up-delay-1" : ""}`}>
                    {slide.title}{" "}
                    <span className="gradient-text-gold relative">
                      {slide.highlight}
                      <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                        <path d="M1 5.5C47 2 153 2 199 5.5" stroke="hsl(var(--accent))" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
                      </svg>
                    </span>
                  </h1>

                  <p className={`text-lg md:text-xl text-accent/90 font-semibold mb-4 ${i === currentSlide ? "animate-fade-up-delay-1" : ""}`}>
                    {slide.subtitle}
                  </p>

                  <p className={`text-base md:text-lg text-white/60 max-w-xl mb-10 leading-relaxed ${i === currentSlide ? "animate-fade-up-delay-2" : ""}`}>
                    {slide.desc}
                  </p>

                  <div className={`flex flex-col sm:flex-row items-start gap-4 ${i === currentSlide ? "animate-fade-up-delay-3" : ""}`}>
                    <button onClick={() => scrollToSection('registration-form')} className="btn-gold group flex items-center gap-2">
                      Daftar Sekarang
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <button onClick={() => scrollToSection('visi-misi')} className="btn-outline-light">
                      Pelajari Lebih Lanjut
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <button onClick={prevSlide} className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all shadow-lg">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/25 hover:scale-110 transition-all shadow-lg">
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots & progress */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`rounded-full transition-all duration-500 ${
                i === currentSlide ? "w-10 h-3 bg-accent shadow-[0_0_12px_hsl(var(--accent)/0.5)]" : "w-3 h-3 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 right-8 z-20 hidden md:flex flex-col items-center gap-2 text-white/40">
          <span className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ writingMode: 'vertical-rl' }}>SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* Stats Section - Floating cards */}
      <section className="relative z-10 -mt-20">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-primary/95 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <stat.icon className="w-6 h-6 text-accent mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <div className="text-xs md:text-sm text-white/60 mt-2 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visi Misi Section */}
      <section id="visi-misi" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.04),transparent_60%)]" />
        <div ref={visiMisi.ref} className={`container px-4 relative transition-all duration-700 ${visiMisi.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-flex">
              <Sparkles className="w-3.5 h-3.5" />
              Tentang Kami
            </span>
            <h2 className="text-3xl md:text-5xl font-black mt-4 leading-tight">
              Visi & Misi{" "}
              <span className="gradient-text">Elfan AI Academy</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-cyan/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="relative feature-card h-full border-primary/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">Visi</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Menjadi pendidikan vokasi terdepan dalam mencetak individu yang beradab, kompeten di bidang teknologi dan mampu menciptakan inovasi digital, berjiwa entrepreneurship, berkontribusi bagi masyarakat lokal dan global.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Card className="relative feature-card h-full border-accent/20">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-accent">Misi</h3>
                  </div>
                  <ul className="text-muted-foreground space-y-3 leading-relaxed">
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" /> Mengintegrasikan nilai-nilai adab Islam di setiap aspek pembelajaran</li>
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" /> Menyelenggarakan kurikulum berbasis AI yang relevan dengan kebutuhan industri digital</li>
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" /> Menumbuhkan jiwa entrepreneurship melalui praktik dan pemanfaatan AI</li>
                    <li className="flex gap-3"><span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" /> Mencetak lulusan yang mandiri, inovatif, dan mampu menciptakan lapangan kerja</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Feature cards with gradient icons */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <div key={i} className="feature-card text-center group cursor-default">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold mb-2">{f.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Section */}
      <section id="program" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/40" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
        <div ref={programRef.ref} className={`container px-4 relative transition-all duration-700 ${programRef.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-flex">
              <Zap className="w-3.5 h-3.5" />
              Program Studi
            </span>
            <h2 className="text-3xl md:text-5xl font-black mt-4">
              Kurikulum <span className="gradient-text">Unggulan</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Program pembelajaran yang dirancang untuk menghasilkan lulusan berkualitas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {programs.map((p, i) => (
              <Card key={i} className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-card">
                <div className={`absolute top-0 left-0 right-0 h-1 bg-${p.accent}`} />
                <CardContent className="p-0">
                  <div className="p-8 text-center">
                    <div className={`w-20 h-20 rounded-3xl bg-${p.accent}/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <p.icon className={`w-10 h-10 text-${p.accent}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{p.desc}</p>
                    <span className={`inline-flex items-center gap-2 text-xs font-bold text-${p.accent} bg-${p.accent}/10 px-4 py-2 rounded-full`}>
                      <Calendar className="w-3.5 h-3.5" />
                      Durasi: {p.duration}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fasilitas Section */}
      <section id="fasilitas" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--accent)/0.04),transparent_60%)]" />
        <div ref={fasilitasRef.ref} className={`container px-4 relative transition-all duration-700 ${fasilitasRef.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-flex">
              <Building2 className="w-3.5 h-3.5" />
              Fasilitas
            </span>
            <h2 className="text-3xl md:text-5xl font-black mt-4">
              Fasilitas <span className="gradient-text">Terlengkap</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Kami menyediakan fasilitas lengkap untuk menunjang kenyamanan dan keberhasilan proses belajar mengajar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {facilities.map((f, i) => (
              <div key={i} className="feature-card group flex items-start gap-5 hover:border-accent/30">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center shrink-0 group-hover:from-accent/30 group-hover:to-accent/10 transition-all duration-300 group-hover:scale-105">
                  <f.icon className="w-7 h-7 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold mb-1.5 group-hover:text-accent transition-colors">{f.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section id="testimonial" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/40" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/4 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className={`container px-4 relative`}>
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-flex">
              <MessageCircle className="w-3.5 h-3.5" />
              Testimoni
            </span>
            <h2 className="text-3xl md:text-5xl font-black mt-4">
              Apa Kata <span className="gradient-text">Mereka?</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Cerita dan pengalaman dari alumni, santri, dan orang tua tentang Elfan AI Academy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Ahmad Fauzan",
                role: "Alumni Angkatan 2022",
                text: "Elfan AI Academy mengubah hidup saya. Saya belajar tahfidz sekaligus coding, dan sekarang bekerja di perusahaan teknologi sambil tetap menjaga hafalan.",
                rating: 5,
              },
              {
                name: "Ibu Siti Nurhaliza",
                role: "Orang Tua Santri",
                text: "Sebagai orang tua, saya sangat bersyukur anak saya bisa belajar di lingkungan yang Islami dengan kurikulum teknologi yang relevan. Perubahan akhlak anak saya luar biasa.",
                rating: 5,
              },
              {
                name: "Muhammad Rizki",
                role: "Santri Aktif - Angkatan 2024",
                text: "Di sini saya tidak hanya belajar agama, tapi juga AI dan programming. Gurunya sangat supportif dan fasilitasnya lengkap. Saya bangga jadi santri Elfan!",
                rating: 5,
              },
            ].map((t, i) => (
              <Card key={i} className="group relative border-0 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-card overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-cyan opacity-50" />
                <CardContent className="p-8 flex flex-col h-full">
                  <Quote className="w-10 h-10 text-accent/20 mb-4 -scale-x-100" />
                  <p className="text-muted-foreground leading-relaxed flex-1 italic">
                    "{t.text}"
                  </p>
                  <div className="mt-6 pt-6 border-t border-border/30">
                    <div className="flex items-center gap-2 mb-2">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.03),transparent_60%)]" />
        <div className="container px-4 relative">
          <div className="text-center mb-16">
            <span className="section-badge mb-4 inline-flex">
              <Camera className="w-3.5 h-3.5" />
              Gallery
            </span>
            <h2 className="text-3xl md:text-5xl font-black mt-4">
              Kegiatan <span className="gradient-text">Santri</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              Momen-momen berharga dari kehidupan sehari-hari santri Elfan AI Academy.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {galleryItems.map((item, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                  i === 0 ? "md:row-span-2" : ""
                }`}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className={`w-full object-cover transition-all duration-700 group-hover:scale-110 ${
                    i === 0 ? "h-full min-h-[280px] md:min-h-full" : "h-48 md:h-56"
                  }`}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-xs font-semibold text-accent bg-accent/20 backdrop-blur-sm px-2.5 py-1 rounded-full">{item.category}</span>
                  <p className="text-white font-bold mt-2 text-sm">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration / CTA Section */}
      <section id="registration-form" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
        <div ref={registrationRef.ref} className={`container px-4 relative transition-all duration-700 ${registrationRef.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-14">
            <span className="section-badge mb-4 inline-flex">
              <Sparkles className="w-3.5 h-3.5" />
              Pendaftaran
            </span>
            <h2 className="text-3xl md:text-5xl font-black mt-4">
              Formulir <span className="gradient-text">Pendaftaran</span>
            </h2>
            <div className="flex items-center justify-center gap-3 text-muted-foreground mt-6">
              <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold">
                  Kesiapan Tes: <span className="text-foreground">Sabtu, 31 Januari 2026</span>
                </span>
              </div>
            </div>
          </div>

          {!user ? (
            <Card className="glass-card max-w-2xl mx-auto text-center py-14 border-primary/20 shadow-xl">
              <CardContent className="space-y-5">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <User className="h-10 w-10 text-primary/60" />
                </div>
                <h2 className="text-2xl font-bold">Silakan Login Terlebih Dahulu</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Anda perlu masuk atau membuat akun untuk melakukan pendaftaran.
                </p>
                <Link to="/login">
                  <Button variant="hero" className="gap-2 mt-4 px-8">
                    <User className="h-4 w-4" />
                    Masuk / Daftar Akun
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : alreadyRegistered === true ? (
            <Card className="glass-card max-w-2xl mx-auto text-center py-14 border-[hsl(var(--success))]/20 shadow-xl">
              <CardContent className="space-y-5">
                <div className="w-20 h-20 rounded-full bg-[hsl(var(--success))]/10 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-10 w-10 text-[hsl(var(--success))]" />
                </div>
                <h2 className="text-2xl font-bold">Anda Sudah Terdaftar!</h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Akun Anda sudah memiliki pendaftaran. Anda bisa mengelola dokumen dari halaman profil.
                </p>
                <Link to="/profile">
                  <Button variant="hero" className="gap-2 mt-4 px-8">
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

      <Footer />
    </div>
  );
};

export default Index;
