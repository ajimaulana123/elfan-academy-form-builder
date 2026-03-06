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
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, hsl(262 83% 58% / 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 50%, hsl(220 90% 56% / 0.1), transparent),
            radial-gradient(ellipse 60% 40% at 20% 80%, hsl(262 83% 58% / 0.08), transparent)
          `,
        }}
      />

      <div className="w-full max-w-md relative">
        <Card className="glass-card card-animated">
          <CardHeader className="text-center pb-2 pt-8">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold gradient-text">
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

              <Button
                type="submit"
                variant="hero"
                size="xl"
                className="w-full"
                disabled={loading}
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
              </Button>
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
