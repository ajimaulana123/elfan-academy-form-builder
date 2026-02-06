import { Button } from "@/components/ui/button";
import { Sparkles, Play, ShieldCheck, Calendar, ArrowDown } from "lucide-react";
import { FloatingBadges } from "@/components/FloatingBadges";
import { RegistrationFormCard } from "@/components/RegistrationFormCard";
import { Link } from "react-router-dom";

const Index = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('registration-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient overlay */}
      {/* Hero Section */}
      <header className="relative pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="container relative">
          {/* Floating Badges */}
          <FloatingBadges />

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto px-4">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border/50 text-sm font-medium mb-8 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Jadilah generari emas</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              FORMULIR PENDAFTARAN{" "}
              <span className="gradient-text">Elfan AI Academy</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Bergabunglah dengan Elfan AI Academy dan wujudkan potensi terbaik Anda bersama kami dalam perjalanan menuju masa depan yang cemerlang.
            </p>

            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium">
                Kesiapan Tes: <span className="text-foreground font-semibold">Sabtu, 31 Januari 2026</span>
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
              <Button onClick={scrollToForm} className="btn-gradient min-w-[180px]">
                Daftar Sekarang
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Registration Form */}
      <main className="relative pb-24">
        <div className="container px-4">
          <RegistrationFormCard />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative py-8 border-t border-border/30">
        <div className="container px-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">© 2026 Elfan AI Academy. All Rights Reserved.</span>
          <Link to="/auth">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary">
              <ShieldCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Index;
