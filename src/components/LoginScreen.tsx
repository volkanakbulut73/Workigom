import { User, Building2, Mail, ArrowLeft, Heart, Zap } from "lucide-react";
import { WorkigomLogo } from "./WorkigomLogo";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import { toast } from "sonner@2.0.3";
import { demoIndividualUsers, demoCorporateUsers, DemoUser, authenticateUser } from "../lib/mockData";

interface LoginScreenProps {
  onRoleSelect: (role: 'individual' | 'corporate', userId?: string) => void;
  onBack: () => void;
}

type AuthMode = 'role-select' | 'login' | 'register';

export function LoginScreen({ onRoleSelect, onBack }: LoginScreenProps) {
  const [authMode, setAuthMode] = useState<AuthMode>('role-select');
  const [selectedRole, setSelectedRole] = useState<'individual' | 'corporate' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleRoleClick = (role: 'individual' | 'corporate') => {
    setSelectedRole(role);
    setAuthMode('login');
  };

  const handleGoogleLogin = () => {
    // Mock Google OAuth - Gerçek entegrasyon için Google OAuth API kullanılmalı
    const roleText = selectedRole === 'individual' ? 'Bireysel' : 'Kurumsal';
    toast.success(`🌐 Google ile ${roleText} hesabına giriş yapılıyor...`);
    
    // Gerçek Google OAuth akışı burada olacak:
    // 1. Google OAuth consent screen'i açılır
    // 2. Kullanıcı Google hesabını seçer
    // 3. İzinleri onaylar
    // 4. Token alınır ve backend'e gönderilir
    // 5. Kullanıcı bilgileri otomatik doldurulur
    
    setTimeout(() => {
      if (selectedRole) {
        // Mock Google user - gerçek sistemde backend'den gelecek
        const mockGoogleUser = {
          id: 'GOOGLE_' + Date.now(),
          name: 'Google Kullanıcı',
          email: 'google.user@gmail.com',
          phone: '+90 555 000 0000',
          role: selectedRole
        };
        localStorage.setItem('currentUser', JSON.stringify(mockGoogleUser));
        onRoleSelect(selectedRole, mockGoogleUser.id);
      }
    }, 1000);
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Kullanıcı doğrulaması yap
    const user = authenticateUser(email, password, selectedRole!);
    
    if (user) {
      // Başarılı giriş
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast.success(`🎉 Hoş geldin ${user.name}!`);
      setTimeout(() => {
        if (selectedRole) {
          onRoleSelect(selectedRole, user.id);
        }
      }, 800);
    } else {
      // Hatalı giriş
      toast.error('❌ E-posta veya şifre hatalı!', {
        description: 'Lütfen bilgilerinizi kontrol edip tekrar deneyin.'
      });
    }
  };

  const handleEmailRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basit e-posta formatı kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('❌ Geçersiz e-posta formatı!');
      return;
    }
    
    // Şifre uzunluk kontrolü
    if (password.length < 6) {
      toast.error('❌ Şifre en az 6 karakter olmalıdır!');
      return;
    }
    
    // E-posta zaten kayıtlı mı kontrol et
    const users = selectedRole === 'individual' ? demoIndividualUsers : demoCorporateUsers;
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      toast.error('❌ Bu e-posta adresi zaten kayıtlı!', {
        description: 'Lütfen giriş yapın veya farklı bir e-posta kullanın.'
      });
      return;
    }
    
    // Yeni kullanıcı oluştur (mock olarak - gerçek sistemde backend'e gönderilir)
    const newUser: DemoUser = {
      id: (selectedRole === 'individual' ? 'IND' : 'COMP') + Date.now(),
      name: name || 'Yeni Kullanıcı',
      email: email,
      password: password,
      phone: '+90 500 000 0000',
      role: selectedRole!
    };
    
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    toast.success('✅ Kayıt başarılı!', {
      description: 'Demo için otomatik giriş yapılıyor...'
    });
    
    setTimeout(() => {
      if (selectedRole) {
        onRoleSelect(selectedRole, newUser.id);
      }
    }, 1000);
  };

  const handleDemoLogin = () => {
    const demoMessage = selectedRole === 'individual' 
      ? '🎉 Demo Çalışan Hesabıyla Giriş Yapıldı!' 
      : '🎉 Test Şirketi Hesabıyla Giriş Yapıldı!';
    
    // Demo kullanıcı seç
    const demoUser = selectedRole === 'individual' 
      ? demoIndividualUsers[0]  // İlk bireysel kullanıcı (Ahmet Yılmaz - IND001)
      : demoCorporateUsers[0];   // İlk kurumsal kullanıcı
    
    localStorage.setItem('currentUser', JSON.stringify(demoUser));
    toast.success(demoMessage);
    
    setTimeout(() => {
      if (selectedRole) {
        onRoleSelect(selectedRole, demoUser.id);
      }
    }, 800);
  };

  const handleBackToRoleSelect = () => {
    setAuthMode('role-select');
    setSelectedRole(null);
    setEmail('');
    setPassword('');
    setName('');
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
        </div>
      </div>
    );
  }

  if (authMode === 'login') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#C9E2F2] via-white to-[#C9E2F2]/50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            onClick={handleBackToRoleSelect}
            className="mb-4 text-[#0367A6]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Geri
          </Button>

          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${selectedRole === 'individual' ? 'from-[#0367A6] to-[#012840]' : 'from-[#3F9BBF] to-[#0367A6]'} rounded-2xl flex items-center justify-center shadow-lg p-2`}>
                {selectedRole === 'individual' ? <User className="w-8 h-8 text-white" /> : <Building2 className="w-8 h-8 text-white" />}
              </div>
            </div>
            <h2 className="text-3xl font-bold text-[#012840] mb-2">
              {selectedRole === 'individual' ? 'Bireysel' : 'Kurumsal'} Giriş
            </h2>
            <p className="text-[#3F9BBF]">Hesabına giriş yap</p>
          </div>

          <Card className="p-8 space-y-6 shadow-xl border-2 border-[#C9E2F2] bg-white/95 backdrop-blur rounded-3xl">
            {/* Demo Account Button - Highlighted */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#10B981] via-[#3F9BBF] to-[#0367A6] rounded-2xl blur opacity-25 animate-pulse"></div>
              <Button
                onClick={handleDemoLogin}
                className="relative w-full h-14 bg-gradient-to-r from-[#10B981] to-[#3F9BBF] hover:from-[#3F9BBF] hover:to-[#10B981] shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
              >
                <Zap className="w-5 h-5 mr-2" fill="white" />
                <span className="flex flex-col items-start">
                  <span className="text-base">⚡ Demo Hesapla Keşfet</span>
                  <span className="text-xs opacity-90 font-normal">Hemen dene, kayıt gerektirmez</span>
                </span>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#C9E2F2]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#3F9BBF]">veya demo hesapla test et</span>
              </div>
            </div>

            {/* Demo User Selection */}
            <div className="space-y-2">
              <p className="text-sm text-[#0367A6] font-medium">Demo Hesaplar (Tek Tıkla Giriş):</p>
              <div className="space-y-2">
                {(selectedRole === 'individual' ? demoIndividualUsers : demoCorporateUsers).map((user) => (
                  <button
                    key={user.id}
                    onClick={() => {
                      localStorage.setItem('currentUser', JSON.stringify(user));
                      toast.success(`🎉 ${user.name} olarak giriş yapıldı!`);
                      setTimeout(() => {
                        if (selectedRole) {
                          onRoleSelect(selectedRole, user.id);
                        }
                      }, 800);
                    }}
                    className="w-full p-3 border-2 border-[#C9E2F2] hover:border-[#0367A6] hover:bg-[#C9E2F2]/20 rounded-xl transition-all duration-200 text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0367A6] to-[#3F9BBF] rounded-full flex items-center justify-center flex-shrink-0">
                        {selectedRole === 'individual' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Building2 className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-[#012840] group-hover:text-[#0367A6] transition-colors">
                          {user.name}
                        </div>
                        <div className="text-xs text-[#3F9BBF]">{user.email}</div>
                        <div className="text-xs text-[#0367A6]/70 mt-0.5">Şifre: {user.password}</div>
                      </div>
                      <div className="text-xs text-[#0367A6] bg-[#C9E2F2] px-2 py-1 rounded">
                        Hızlı Giriş
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#C9E2F2]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#3F9BBF]">veya hesabınla giriş yap</span>
              </div>
            </div>

            {/* Google Login Button - Bireysel kullanıcılar için özel tasarım */}
            {selectedRole === 'individual' ? (
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-20"></div>
                <Button
                  onClick={handleGoogleLogin}
                  variant="outline"
                  className="relative w-full h-14 bg-white border-2 border-gray-200 hover:border-[#4285F4] hover:bg-gray-50 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="flex flex-col items-start text-left">
                    <span className="text-base text-gray-700">Google ile Devam Et</span>
                    <span className="text-xs text-gray-500 font-normal">Hızlı ve güvenli giriş</span>
                  </span>
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full h-12 border-2 border-[#C9E2F2] hover:bg-[#C9E2F2]/30 rounded-xl"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google ile Giriş Yap
              </Button>
            )}

            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="bg-[#C9E2F2]/30 border border-[#0367A6]/20 rounded-xl p-3">
                <p className="text-xs text-[#0367A6]">
                  💡 <strong>Test için:</strong> Yukarıdaki demo hesaplardan birinin e-posta ve şifresini kullanabilirsiniz.
                </p>
              </div>

              <div>
                <Label htmlFor="email" className="text-[#012840]">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 border-2 border-[#C9E2F2] focus:border-[#0367A6] rounded-xl"
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
                  className="mt-1 border-2 border-[#C9E2F2] focus:border-[#0367A6] rounded-xl"
                />
              </div>

              <Button 
                type="submit"
                className={`w-full h-12 bg-gradient-to-r ${selectedRole === 'individual' ? 'from-[#0367A6] to-[#012840] hover:from-[#012840] hover:to-[#0367A6]' : 'from-[#3F9BBF] to-[#0367A6] hover:from-[#0367A6] hover:to-[#3F9BBF]'} shadow-lg rounded-xl`}
              >
                <Mail className="w-5 h-5 mr-2" />
                E-posta ile Giriş Yap
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-[#3F9BBF]">Hesabın yok mu? </span>
              <button
                onClick={() => setAuthMode('register')}
                className="text-[#0367A6] font-medium hover:underline"
              >
                Kayıt Ol
              </button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (authMode === 'register') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#C9E2F2] via-white to-[#C9E2F2]/50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            onClick={() => setAuthMode('login')}
            className="mb-4 text-[#0367A6]"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Geri
          </Button>

          <div className="text-center mb-8">
            <div className="inline-block mb-4 transform hover:scale-105 transition-transform">
              <WorkigomLogo size={64} color="gradient" />
            </div>
            <h2 className="text-3xl font-bold text-[#012840] mb-2">Kayıt Ol</h2>
            <p className="text-[#3F9BBF]">Workigom ailesine katıl! 🎉</p>
          </div>

          <Card className="p-8 space-y-6 shadow-xl border-2 border-[#C9E2F2] bg-white/95 backdrop-blur rounded-3xl">
            {/* Demo Account Button - Highlighted */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#10B981] via-[#3F9BBF] to-[#0367A6] rounded-2xl blur opacity-25 animate-pulse"></div>
              <Button
                onClick={handleDemoLogin}
                className="relative w-full h-14 bg-gradient-to-r from-[#10B981] to-[#3F9BBF] hover:from-[#3F9BBF] hover:to-[#10B981] shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
              >
                <Zap className="w-5 h-5 mr-2" fill="white" />
                <span className="flex flex-col items-start">
                  <span className="text-base">⚡ Demo Hesapla Keşfet</span>
                  <span className="text-xs opacity-90 font-normal">Hemen dene, kayıt gerektirmez</span>
                </span>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#C9E2F2]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#3F9BBF]">veya hesap oluştur</span>
              </div>
            </div>

            {/* Google Register Button - Bireysel kullanıcılar için özel tasarım */}
            {selectedRole === 'individual' ? (
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-20"></div>
                <Button
                  onClick={handleGoogleLogin}
                  variant="outline"
                  className="relative w-full h-14 bg-white border-2 border-gray-200 hover:border-[#4285F4] hover:bg-gray-50 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="flex flex-col items-start text-left">
                    <span className="text-base text-gray-700">Google ile Kayıt Ol</span>
                    <span className="text-xs text-gray-500 font-normal">Tek tıkla hesap oluştur</span>
                  </span>
                </Button>
              </div>
            ) : (
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full h-12 border-2 border-[#C9E2F2] hover:bg-[#C9E2F2]/30 rounded-xl"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google ile Kayıt Ol
              </Button>
            )}

            <form onSubmit={handleEmailRegister} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-[#012840]">Ad Soyad</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Adınız Soyadınız"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 border-2 border-[#C9E2F2] focus:border-[#0367A6] rounded-xl"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-[#012840]">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 border-2 border-[#C9E2F2] focus:border-[#0367A6] rounded-xl"
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
                  className="mt-1 border-2 border-[#C9E2F2] focus:border-[#0367A6] rounded-xl"
                />
              </div>

              <Button 
                type="submit"
                className={`w-full h-12 bg-gradient-to-r ${selectedRole === 'individual' ? 'from-[#0367A6] to-[#012840] hover:from-[#012840] hover:to-[#0367A6]' : 'from-[#3F9BBF] to-[#0367A6] hover:from-[#0367A6] hover:to-[#3F9BBF]'} shadow-lg rounded-xl`}
              >
                <Heart className="w-5 h-5 mr-2" fill="white" />
                Kayıt Ol
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-[#3F9BBF]">Zaten hesabın var mı? </span>
              <button
                onClick={() => setAuthMode('login')}
                className="text-[#0367A6] font-medium hover:underline"
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
