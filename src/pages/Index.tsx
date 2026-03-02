import { Button } from "@/components/ui/button";
import { Sparkles, Calendar, ArrowDown, User, LogOut } from "lucide-react";
import { FloatingBadges } from "@/components/FloatingBadges";
import { RegistrationFormCard } from "@/components/RegistrationFormCard";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const scrollToForm = () => {
    const formElement = document.getElementById('registration-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Top Nav */}
      <nav className="relative z-10 border-b border-border/30 bg-background/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-14 px-4">
          <span className="text-sm font-semibold gradient-text">Elfan AI Academy</span>
          <div className="flex items-center gap-2">
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
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-8 pb-16 md:pt-16 md:pb-24">
        <div className="container relative">
          <FloatingBadges />

          <div className="text-center max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border/50 text-sm font-medium mb-8 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Jadilah generasi emas</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              FORMULIR PENDAFTARAN{" "}
              <span className="gradient-text">Elfan AI Academy</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Bergabunglah dengan Elfan AI Academy dan wujudkan potensi terbaik Anda bersama kami dalam perjalanan menuju masa depan yang cemerlang.
            </p>

            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-lg font-medium">
                Kesiapan Tes: <span className="text-foreground font-semibold">Sabtu, 31 Januari 2026</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
              <Button onClick={scrollToForm} className="btn-gradient min-w-[180px]">
                Daftar Sekarang
                <ArrowDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative pb-24">
        <div className="container px-4">
          <RegistrationFormCard />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative py-8 border-t border-border/30">
        <div className="container px-4 text-center">
          <span className="text-sm text-muted-foreground">© 2026 Elfan AI Academy. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
