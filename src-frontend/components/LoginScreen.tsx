import { User as UserIcon, Building2, Mail, ArrowLeft, Heart } from "lucide-react";
import { WorkigomLogo } from "./WorkigomLogo";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "../lib/supabaseClient";

interface LoginScreenProps {
  onRoleSelect: (role: "individual" | "corporate", userId?: string) => void;
  onBack: () => void;
}

type AuthMode = "role-select" | "login" | "register";

export function LoginScreen({ onRoleSelect, onBack }: LoginScreenProps) {
  const [authMode, setAuthMode] = useState<AuthMode>("role-select");
  const [selectedRole, setSelectedRole] = useState<"individual" | "corporate" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleClick = (role: "individual" | "corporate") => {
    setSelectedRole(role);
    setAuthMode("login");
  };

  // ✅ Supabase Login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error("Lütfen bir rol seçin");
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Giriş başarılı!");
      const user = data.user;
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        onRoleSelect(selectedRole, user.id);
      }
    } catch (error: any) {
      toast.error(error.message || "Giriş başarısız");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Supabase Register
  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.error("Lütfen bir rol seçin");
      return;
    }

    if (!name.trim()) {
      toast.error("Lütfen adınızı ve soyadınızı girin");
      return;
    }

    if (password.length < 6) {
      toast.error("Şifre en az 6 karakter olmalıdır!");
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: selectedRole, // 👈 Supabase user metadata içine rol kaydı
          },
        },
      });

      if (error) throw error;

      toast.success("Kayıt başarılı! Lütfen e-postanızı kontrol edin.");

      const user = data.user;
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        onRoleSelect(selectedRole, user.id);
      }
    } catch (error: any) {
      toast.error(error.message || "Kayıt başarısız");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToRoleSelect = () => {
    setAuthMode("role-select");
    setSelectedRole(null);
    setEmail("");
    setPassword("");
    setName("");
  };

  // === EKRAN 1: ROL SEÇİMİ ===
  if (authMode === "role-select") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#C9E2F2] via-white to-[#C9E2F2]/50 flex items-center justify-center p-4">
        <div className="w-full max-w-md lg:max-w-lg">
          <Button variant="ghost" onClick={onBack} className="mb-4 text-[#0367A6]">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Ana Sayfaya Dön
          </Button>

          <div className="text-center mb-10">
            <div className="inline-block mb-4 transform hover:scale-105 transition-transform">
              <WorkigomLogo size={80} color="gradient" />
            </div>
            <h1 className="text-5xl lg:text-6xl mb-2 bg-gradient-to-r from-[#0367A6] to-[#012840] bg-clip-text text-transparent font-bold">
              WORKIGOM
            </h1>
            <p className="text-lg lg:text-xl text-[#0367A6]">Birlikte Daha Güçlüyüz 💙</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => handleRoleClick("individual")}
              className="w-full h-32 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0367A6] to-[#012840] hover:from-[#012840] hover:to-[#0367A6] shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl border-2 border-white/20"
            >
              <UserIcon className="w-10 h-10" />
              <span className="text-xl">Bireysel Giriş</span>
            </Button>

            <Button
              onClick={() => handleRoleClick("corporate")}
              className="w-full h-32 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#3F9BBF] to-[#0367A6] hover:from-[#0367A6] hover:to-[#3F9BBF] shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl border-2 border-white/20"
            >
              <Building2 className="w-10 h-10" />
              <span className="text-xl">Kurumsal Giriş</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // === EKRAN 2: GİRİŞ ===
  if (authMode === "login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#C9E2F2] via-white to-[#C9E2F2]/50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button variant="ghost" onClick={handleBackToRoleSelect} className="mb-4 text-[#0367A6]">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Geri
          </Button>

          <Card className="p-8 space-y-6 shadow-xl border-2 border-[#C9E2F2] bg-white/95 backdrop-blur rounded-3xl">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-[#012840]">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-[#012840]">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 bg-gradient-to-r ${selectedRole === "individual"
                  ? "from-[#0367A6] to-[#012840]"
                  : "from-[#3F9BBF] to-[#0367A6]"
                  } shadow-lg rounded-xl disabled:opacity-50`}
              >
                <Mail className="w-5 h-5 mr-2" />
                {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-[#3F9BBF]">Hesabın yok mu? </span>
              <button
                onClick={() => setAuthMode("register")}
                className="text-[#0367A6] font-medium hover:underline"
                disabled={isLoading}
              >
                Kayıt Ol
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // === EKRAN 3: KAYIT ===
  if (authMode === "register") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#C9E2F2] via-white to-[#C9E2F2]/50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button variant="ghost" onClick={() => setAuthMode("login")} className="mb-4 text-[#0367A6]">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Geri
          </Button>

          <Card className="p-8 space-y-6 shadow-xl border-2 border-[#C9E2F2] bg-white/95 backdrop-blur rounded-3xl">
            <form onSubmit={handleEmailRegister} className="space-y-4">
              <Label>Ad Soyad</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />

              <Label>E-posta</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" />

              <Label>Şifre</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full h-12 bg-gradient-to-r ${selectedRole === "individual"
                  ? "from-[#0367A6] to-[#012840]"
                  : "from-[#3F9BBF] to-[#0367A6]"
                  } shadow-lg rounded-xl disabled:opacity-50`}
              >
                <Heart className="w-5 h-5 mr-2" fill="white" />
                {isLoading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-[#3F9BBF]">Zaten hesabın var mı? </span>
              <button
                onClick={() => setAuthMode("login")}
                className="text-[#0367A6] font-medium hover:underline"
                disabled={isLoading}
              >
                Giriş Yap
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
