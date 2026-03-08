import { Link } from "react-router-dom";
import { Sparkles, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border/20 bg-card/80 backdrop-blur-md">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/3 to-transparent pointer-events-none" />
      <div className="container px-4 relative">
        {/* Main footer */}
        <div className="py-12 grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-cyan flex items-center justify-center text-white font-bold text-sm shadow-lg">
              EA
            </div>
            <div>
              <span className="text-sm font-bold block">Elfan AI Academy</span>
              <span className="text-xs text-muted-foreground">Pendidikan Islam Modern</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-8">
            {[
              { label: "Sejarah", href: "/sejarah" },
              { label: "Tujuan", href: "/tujuan" },
              { label: "Kontak", href: "/kontak" },
              { label: "Profile", href: "/profile" },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors group flex items-center gap-1"
              >
                {link.label}
                <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
              </Link>
            ))}
          </div>

          {/* Badge */}
          <div className="flex justify-end">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/50 px-3 py-1.5 rounded-full border border-border/30">
              <Sparkles className="w-3 h-3 text-accent" />
              Powered by AI
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/20 py-5 text-center">
          <span className="text-xs text-muted-foreground">© 2026 Elfan AI Academy. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
