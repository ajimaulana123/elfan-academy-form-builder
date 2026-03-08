import { Menu, X, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        ? "bg-[hsl(215,45%,10%)] shadow-lg shadow-black/20"
        : "bg-[hsl(215,45%,10%)]/95 backdrop-blur-md"
    } border-b border-white/5`}>
      <div className="container flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-all">
            EA
          </div>
          <div className="leading-tight">
            <span className="text-sm font-bold text-white block">Elfan</span>
            <span className="text-xs text-white/60">AI Academy</span>
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
                  ? "text-primary"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick("/#registration-form")}
            className="hidden sm:inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98] shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Daftar Sekarang
          </button>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[hsl(215,45%,10%)] border-t border-white/10 py-4 px-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`block w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive(link.href)
                  ? "text-primary bg-primary/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3">
            <button
              onClick={() => handleNavClick("/#registration-form")}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Daftar Sekarang
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
