import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative py-10 border-t border-border/30 bg-card/50">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
              EA
            </div>
            <span className="text-sm font-semibold">Elfan AI Academy</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/sejarah" className="hover:text-foreground transition-colors">Sejarah</Link>
            <Link to="/tujuan" className="hover:text-foreground transition-colors">Tujuan</Link>
            <Link to="/kontak" className="hover:text-foreground transition-colors">Kontak</Link>
          </div>
          <span className="text-sm text-muted-foreground">© 2026 Elfan AI Academy. All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
}
