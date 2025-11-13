import { User, Building2, ArrowLeft } from "lucide-react";
import { WorkigomLogo } from "./WorkigomLogo";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState, useEffect } from "react";
import { toast } from "sonner@2.0.3";
import { useAuth } from "../contexts/AuthContext";
import { checkUserExists } from "../utils/checkUserExists";

interface LoginScreenProps {
  onLoginSuccess: () => void;
  onBack: () => void;
  isAdminLogin?: boolean; // New prop to indicate admin login
}

type AuthMode = 'role-select' | 'login' | 'register';

// Admin email constant
const ADMIN_EMAIL = 'cicicars.com@gmail.com';

export function LoginScreen({ onLoginSuccess, onBack, isAdminLogin }: LoginScreenProps) {
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

  // Skip role-select if admin login
  useEffect(() => {
    if (isAdminLogin) {
      setAuthMode('login');
      // Don't set selectedRole for admin
    }
  }, [isAdminLogin]);

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
      // FIRST: Check if user already exists
      console.log('Checking if user exists:', email);
      const userExists = await checkUserExists(email);
      
      if (userExists) {
        setLoading(false);
        toast.error('Bu e-posta zaten kayıtlı!', {
          description: 'Giriş yapmak ister misiniz?',
          action: {
            label: 'Giriş Yap',
            onClick: () => {
              setAuthMode('login');
              // Keep email filled
            }
          },
          duration: 6000,
        });
        return;
      }

      // User doesn't exist, proceed with signup
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
        // Check if it's a duplicate key error
        if (result.error?.message?.includes('duplicate') || result.error?.message?.includes('already exists')) {
          toast.error('Bu e-posta zaten kayıtlı!', {
            description: 'Giriş yapmak ister misiniz?',
            action: {
              label: 'Giriş Yap',
              onClick: () => {
                setAuthMode('login');
              }
            },
            duration: 6000,
          });
        } else {
          toast.error('Kayıt yapılamadı', {
            description: result.error?.message || 'Bir hata oluştu'
          });
        }
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

  // ADMIN LOGIN SCREEN - Special screen for admin
  if (isAdminLogin && authMode === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#012840] via-[#0367A6] to-[#3F9BBF] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Ana Sayfaya Dön
          </Button>

          <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-white">
            {/* Admin Icon */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-[#012840] to-[#0367A6] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-3xl mb-2 bg-gradient-to-r from-[#012840] to-[#0367A6] bg-clip-text text-transparent">Admin Girişi</h2>
              <p className="text-gray-600">
                Yönetici paneline hoş geldiniz
              </p>
            </div>

            {/* Admin Login Info */}
            <div className="mb-6 bg-blue-50 border-2 border-blue-200 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-gray-700">
                  <strong>Admin hesabınızla giriş yapın.</strong>
                  <br />
                  Admin email: <code className="bg-white px-2 py-0.5 rounded text-xs">{ADMIN_EMAIL}</code>
                </div>
              </div>
            </div>

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Admin E-posta</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder={ADMIN_EMAIL}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="border-2"
                />
              </div>
              <div>
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="border-2"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#012840] to-[#0367A6] hover:from-[#0367A6] hover:to-[#012840] shadow-lg"
                disabled={loading}
              >
                {loading ? 'Giriş yapılıyor...' : '🔐 Admin Girişi'}
              </Button>
            </form>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-white/80">
              🔒 Güvenli admin erişimi
            </p>
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
                  name="email"
                  type="email"
                  autoComplete="email"
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
                  name="password"
                  type="password"
                  autoComplete="current-password"
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
                  name="name"
                  type="text"
                  autoComplete="name"
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
                      name="companyName"
                      type="text"
                      autoComplete="organization"
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
                      name="taxNumber"
                      type="text"
                      autoComplete="off"
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
                  name="phone"
                  type="tel"
                  autoComplete="tel"
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
                  name="email"
                  type="email"
                  autoComplete="email"
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
                  name="password"
                  type="password"
                  autoComplete="new-password"
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