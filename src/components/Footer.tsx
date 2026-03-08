import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/sejarah" },
  { label: "Program Studi", href: "/#program" },
  { label: "Fasilitas", href: "/#fasilitas" },
  { label: "Pendaftaran", href: "/#registration-form" },
  { label: "Kontak", href: "/kontak" },
];

export function Footer() {
  return (
    <footer className="bg-[hsl(215,45%,10%)] text-white">
      {/* Main content */}
      <div className="container px-4 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand & Description */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                EA
              </div>
              <div>
                <span className="font-bold block">Elfan AI Academy</span>
                <span className="text-sm text-accent">Pendidikan Islam Modern</span>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Lembaga pendidikan Islam yang mengintegrasikan nilai-nilai keislaman dengan teknologi kecerdasan buatan untuk membentuk generasi muslim yang berakhlak mulia dan berdaya saing global.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {["facebook", "instagram", "youtube"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    {social === "facebook" && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>}
                    {social === "instagram" && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>}
                    {social === "youtube" && <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-5">Menu Cepat</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-5">Kontak Kami</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm text-white/60">Jl. Pendidikan No. 123, Kota, Indonesia 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm text-white/60">+62 21 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span className="text-sm text-white/60">info@elfanacademy.id</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="container px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-xs text-white/40">© 2025 Elfan AI Academy. Hak Cipta Dilindungi.</span>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="text-xs text-white/40 hover:text-white/60 transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
