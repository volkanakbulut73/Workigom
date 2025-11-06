import { User, Building2, ArrowLeft } from "lucide-react";
import { WorkigomLogo } from "./WorkigomLogo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";
import { useAuth } from "../contexts/AuthContext";

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

type AuthMode = 'role-select' | 'login' | 'register';

export function LoginScreen({ onLoginSuccess, onBack }: LoginScreenProps) {
  const { signIn, signUp, isSupabaseReady } = useAuth();
  const [authMode, setAuthMode] = useState<AuthMode>('role-select');
  const [selectedRole, setSelectedRole] = useState<'individual' | 'corporate' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [loading, setLoading] = useState(false);

  // Show warning if Supabase is not configured
  useEffect(() => {
    if (!isSupabaseReady && authMode !== 'role-select') {
      toast.error('Supabase Yapılandırılmamış', {
        description: 'Lütfen .env dosyanızı yapılandırın ve dev server\'ı yeniden başlatın.',
        duration: 6000,
      });
    }
  }, [isSupabaseReady, authMode]);

  const handleRoleClick = (role: 'individual' | 'corporate') => {
    setSelectedRole(role);
    setAuthMode('login');
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn(email, password);
      
      if (result.success) {
        onLoginSuccess();
      } else {
        toast.error('Giriş yapılamadı', {
          description: result.error?.message || 'E-posta veya şifre hatalı'
        });
      }
    } catch (error) {
      toast.error('Bir hata oluştu', {
        description: 'Lütfen tekrar deneyin'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Geçersiz e-posta formatı!');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Şifre en az 6 karakter olmalıdır!');
      return;
    }

    if (!name.trim()) {
      toast.error('İsim alanı zorunludur!');
      return;
    }

    if (!phone.trim()) {
      toast.error('Telefon alanı zorunludur!');
      return;
    }

    if (selectedRole === 'corporate' && !companyName.trim()) {
      toast.error('Şirket adı alanı zorunludur!');
      return;
    }

    setLoading(true);

    try {
      const result = await signUp({
        email,
        password,
        fullName: name,
        phone,
        userType: selectedRole!,
        companyName: selectedRole === 'corporate' ? companyName : undefined,
        taxNumber: selectedRole === 'corporate' ? taxNumber : undefined,
      });
      
      if (result.success) {
        toast.success('Kayıt başarılı!', {
          description: 'Giriş yapılıyor...'
        });
        setTimeout(() => {
          onLoginSuccess();
        }, 1000);
      } else {
        toast.error('Kayıt yapılamadı', {
          description: result.error?.message || 'Bir hata oluştu'
        });
      }
    } catch (error) {
      toast.error('Bir hata oluştu', {
        description: 'Lütfen tekrar deneyin'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToRoleSelect = () => {
    setAuthMode('role-select');
    setSelectedRole(null);
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    setCompanyName('');
    setTaxNumber('');
  };

  if (authMode === 'role-select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#C9E2F2] via-white to-[#C9E2F2]/50 flex items-center justify-center p-4">
        <div className="w-full max-w-md lg:max-w-lg">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-[#0367A6]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Ana Sayfaya Dön
          </Button>

          <div className="text-center mb-10">
            <div className="inline-block mb-4 transform hover:scale-105 transition-transform">
              <WorkigomLogo size={80} color="gradient" />
            </div>
            <h1 className="text-5xl lg:text-6xl mb-2 bg-gradient-to-r from-[#0367A6] to-[#012840] bg-clip-text text-transparent font-bold">WORKIGOM</h1>
            <p className="text-lg lg:text-xl text-[#0367A6]">Birlikte Daha Güçlüyüz 💙</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => handleRoleClick('individual')}
              className="w-full h-32 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0367A6] to-[#012840] hover:from-[#012840] hover:to-[#0367A6] shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl border-2 border-white/20"
            >
              <User className="w-10 h-10" />
              <span className="text-xl">Bireysel Giriş</span>
            </Button>

            <Button
              onClick={() => handleRoleClick('corporate')}
              className="w-full h-32 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#3F9BBF] to-[#0367A6] hover:from-[#0367A6] hover:to-[#3F9BBF] shadow-xl hover:shadow-2xl transition-all duration-300 rounded-3xl border-2 border-white/20"
            >
              <Building2 className="w-10 h-10" />
              <span className="text-xl">Kurumsal Giriş</span>
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Güvenli ve hızlı giriş için hazırız
            </p>
          </div>
        </div>
      </div>
    );
  }

  const roleText = selectedRole === 'individual' ? 'Bireysel' : 'Kurumsal';

  // Show Supabase setup message if not configured
  if (!isSupabaseReady && authMode !== 'role-select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#C9E2F2] via-white to-[#C9E2F2]/50 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <Button
            variant="ghost"
            onClick={handleBackToRoleSelect}
            className="mb-4 text-[#0367A6]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Geri Dön
          </Button>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-yellow-200">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">⚙️</span>
              </div>
              <h2 className="text-3xl mb-2 text-gray-800">Supabase Kurulum Gerekli</h2>
              <p className="text-gray-600 text-lg">
                Authentication için Supabase yapılandırması gerekiyor
              </p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-6">
              <h3 className="text-xl mb-4 text-gray-800">📋 Kurulum Adımları:</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-3 mt-1">1️⃣</span>
                  <div>
                    <strong>Supabase Projesi Oluşturun:</strong>
                    <br />
                    <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-[#0367A6] hover:underline">
                      supabase.com
                    </a> adresine gidin ve yeni bir proje oluşturun
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">2️⃣</span>
                  <div>
                    <strong>API Anahtarlarını Alın:</strong>
                    <br />
                    Settings → API → Project URL ve anon public key
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">3️⃣</span>
                  <div>
                    <strong>.env Dosyasını Güncelleyin:</strong>
                    <br />
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      VITE_SUPABASE_URL=your_url
                    </code>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="mr-3 mt-1">4️⃣</span>
                  <div>
                    <strong>Dev Server'ı Yeniden Başlatın:</strong>
                    <br />
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      npm run dev
                    </code>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg mb-2 text-gray-800">📖 Detaylı Rehber:</h3>
              <p className="text-gray-700">
                Proje root dizinindeki <code className="bg-white px-2 py-1 rounded">SUPABASE_SETUP.md</code> dosyasında adım adım kurulum talimatları bulabilirsiniz.
              </p>
            </div>

            <div className="mt-6 text-center">
              <Button
                onClick={onBack}
                className="bg-gradient-to-r from-[#0367A6] to-[#012840] hover:from-[#012840] hover:to-[#0367A6]"
              >
                Ana Sayfaya Dön
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E2F2] via-white to-[#C9E2F2]/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={handleBackToRoleSelect}
          className="mb-4 text-[#0367A6]"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Geri Dön
        </Button>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-[#C9E2F2]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0367A6] to-[#012840] rounded-2xl flex items-center justify-center mx-auto mb-4">
              {selectedRole === 'individual' ? (
                <User className="w-8 h-8 text-white" />
              ) : (
                <Building2 className="w-8 h-8 text-white" />
              )}
            </div>
            <h2 className="text-2xl mb-2">{roleText} {authMode === 'login' ? 'Giriş' : 'Kayıt'}</h2>
            <p className="text-gray-600">
              {authMode === 'login' ? 'Hesabınıza giriş yapın' : 'Yeni hesap oluşturun'}
            </p>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0367A6] to-[#012840] hover:from-[#012840] hover:to-[#0367A6]"
                disabled={loading}
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </Button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="text-[#0367A6] hover:underline"
                  disabled={loading}
                >
                  Hesabınız yok mu? Kayıt olun
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleEmailRegister} className="space-y-4">
              <div>
                <Label htmlFor="name">{selectedRole === 'corporate' ? 'Yetkili Adı' : 'Ad Soyad'}</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={selectedRole === 'corporate' ? 'Ahmet Yılmaz' : 'Ad Soyad'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              
              {selectedRole === 'corporate' && (
                <>
                  <div>
                    <Label htmlFor="companyName">Şirket Adı</Label>
                    <Input
                      id="companyName"
                      type="text"
                      placeholder="ABC Teknoloji A.Ş."
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxNumber">Vergi Numarası (Opsiyonel)</Label>
                    <Input
                      id="taxNumber"
                      type="text"
                      placeholder="1234567890"
                      value={taxNumber}
                      onChange={(e) => setTaxNumber(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+90 555 000 0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <Label htmlFor="password">Şifre (min. 6 karakter)</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0367A6] to-[#012840] hover:from-[#012840] hover:to-[#0367A6]"
                disabled={loading}
              >
                {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-[#0367A6] hover:underline"
                  disabled={loading}
                >
                  Zaten hesabınız var mı? Giriş yapın
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            🔒 Verileriniz güvenli bir şekilde saklanmaktadır
          </p>
        </div>
      </div>
    </div>
  );
}
