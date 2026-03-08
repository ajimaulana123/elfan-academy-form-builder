import { Button } from "@/components/ui/button";
import { User, LogOut, Menu, X, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Visi Misi", href: "/#visi-misi" },
  { label: "Program", href: "/#program" },
  { label: "Profile", href: "/profile" },
  { label: "Sejarah", href: "/sejarah" },
  { label: "Tujuan", href: "/tujuan" },
  { label: "Kontak", href: "/kontak" },
];

export function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    } else {
      navigate(href);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    if (href.startsWith("/#")) return false;
    return location.pathname === href;
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-background/90 backdrop-blur-xl border-b border-border/30 shadow-lg shadow-black/5" 
        : "bg-transparent border-b border-transparent"
    }`}>
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-cyan flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all">
            EA
          </div>
          <div className="leading-tight">
            <span className={`text-sm font-bold block ${scrolled ? "text-foreground" : "text-white"}`}>Elfan</span>
            <span className={`text-xs ${scrolled ? "text-muted-foreground" : "text-white/70"}`}>AI Academy</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-all ${
                isActive(link.href)
                  ? scrolled ? "text-primary bg-primary/10" : "text-white bg-white/15"
                  : scrolled ? "text-muted-foreground hover:text-foreground hover:bg-secondary/50" : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
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
                <Button variant="ghost" size="sm" className={`gap-2 hidden sm:inline-flex ${!scrolled ? "text-white/80 hover:text-white hover:bg-white/10" : ""}`}>
                  <User className="h-4 w-4" />
                  Profil
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className={`gap-2 hidden sm:inline-flex ${scrolled ? "text-muted-foreground" : "text-white/70 hover:text-white hover:bg-white/10"}`}>
                <LogOut className="h-4 w-4" />
                Keluar
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm" className={`gap-2 hidden sm:inline-flex ${!scrolled ? "text-white/80 hover:text-white hover:bg-white/10" : ""}`}>
                <User className="h-4 w-4" />
                Masuk
              </Button>
            </Link>
          )}
          <button
            onClick={() => handleNavClick("/#registration-form")}
            className="btn-gold text-sm hidden sm:inline-flex items-center gap-2 !px-5 !py-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Daftar Sekarang
          </button>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/30 py-4 px-4 space-y-1 shadow-xl">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive(link.href)
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-border/30 space-y-1">
            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              >
                Keluar
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <span className="block px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                  Masuk / Daftar
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
