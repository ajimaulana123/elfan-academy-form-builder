import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, LogIn, UserPlus, GraduationCap } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

const UserAuth = () => {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        title: "Validasi Gagal",
        description: validation.error.errors[0].message,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          let message = error.message;
          if (message.includes("Invalid login")) {
            message = "Email atau password salah";
          }
          toast({ title: "Login Gagal", description: message, variant: "destructive" });
        } else {
          toast({ title: "Login Berhasil! 🎉", description: "Selamat datang!" });
          navigate("/", { replace: true });
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          let message = error.message;
          if (message.includes("already registered")) {
            message = "Email sudah terdaftar. Silakan login.";
          }
          toast({ title: "Registrasi Gagal", description: message, variant: "destructive" });
        } else {
          toast({
            title: "Registrasi Berhasil! ✉️",
            description: "Silakan cek email Anda untuk verifikasi akun.",
          });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-4"
      style={{ backgroundImage: 'url(/hero-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="hero-overlay" />
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              EA
            </div>
            <div className="text-left">
              <span className="text-lg font-bold text-white block">Elfan</span>
              <span className="text-sm text-white/70">AI Academy</span>
            </div>
          </div>
        </div>

        <Card className="bg-card/90 backdrop-blur-xl border border-border/50 shadow-2xl">
          <CardHeader className="text-center pb-2 pt-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {isLogin ? "Masuk" : "Buat Akun"}
            </CardTitle>
            <CardDescription className="mt-2">
              {isLogin
                ? "Masuk untuk mengakses formulir pendaftaran"
                : "Daftar akun untuk memulai pendaftaran"}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full flex items-center justify-center gap-2 !py-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{isLogin ? "Masuk..." : "Mendaftar..."}</span>
                  </>
                ) : (
                  <>
                    {isLogin ? <LogIn className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
                    <span>{isLogin ? "Masuk" : "Daftar"}</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {isLogin
                  ? "Belum punya akun? Daftar di sini"
                  : "Sudah punya akun? Login di sini"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserAuth;
