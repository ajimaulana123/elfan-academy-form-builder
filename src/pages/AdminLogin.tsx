import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAdminRole } from "@/hooks/useAdminRole";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, LogIn, ShieldCheck } from "lucide-react";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

const AdminLogin = () => {
  const { user, signIn } = useAuth();
  const { isAdmin, loading: roleLoading } = useAdminRole();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && !roleLoading) {
      if (isAdmin) {
        navigate("/admin", { replace: true });
      }
    }
  }, [user, isAdmin, roleLoading, navigate]);

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
      const { error } = await signIn(email, password);
      if (error) {
        let message = error.message;
        if (message.includes("Invalid login")) {
          message = "Email atau password salah";
        }
        toast({ title: "Login Gagal", description: message, variant: "destructive" });
      }
      // Role check will happen via useEffect after auth state updates
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(215,45%,8%)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
              <ShieldCheck className="h-7 w-7 text-red-500" />
            </div>
            <CardTitle className="text-2xl font-bold">
              Admin Login
            </CardTitle>
            <CardDescription className="mt-2">
              Masuk ke dashboard administrator
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email Admin</Label>
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@elfanacademy.id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <Input
                  id="admin-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  autoComplete="current-password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Memverifikasi...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    <span>Masuk Admin</span>
                  </>
                )}
              </button>
            </form>

            {/* Show message if logged in but not admin */}
            {user && !roleLoading && !isAdmin && (
              <div className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-center">
                <p className="text-destructive font-medium">Akun ini tidak memiliki akses admin.</p>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-white/30 text-xs mt-6">
          Area terbatas — hanya untuk administrator
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
