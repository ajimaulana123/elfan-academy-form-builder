import { Button } from "@/components/ui/button";
import { User, LogOut, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30">
      <div className="container flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            EA
          </div>
          <div className="leading-tight">
            <span className="text-sm font-bold text-foreground block">Elfan</span>
            <span className="text-xs text-muted-foreground">AI Academy</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-foreground underline underline-offset-4 decoration-primary decoration-2"
                  : "text-muted-foreground hover:text-foreground"
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
                <Button variant="ghost" size="sm" className="gap-2 hidden sm:inline-flex">
                  <User className="h-4 w-4" />
                  Profil
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-muted-foreground hidden sm:inline-flex">
                <LogOut className="h-4 w-4" />
                Keluar
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm" className="gap-2 hidden sm:inline-flex">
                <User className="h-4 w-4" />
                Masuk
              </Button>
            </Link>
          )}
          <button
            onClick={() => handleNavClick("/#registration-form")}
            className="btn-gold text-sm hidden sm:inline-flex items-center gap-2 !px-5 !py-2"
          >
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
        <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border/30 py-4 px-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-foreground bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-border/30 space-y-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground"
              >
                Keluar
              </button>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)}>
                <span className="block px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground">
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
