import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Heart, Briefcase, Users, Sparkles, TrendingUp, Gift, Coffee, HandHeart, CircleDollarSign } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { WorkigomLogo } from "./WorkigomLogo";
import workigomLogoImage from "figma:asset/e0482a8e2019f84501f14a5ddb43fcc0487cdc5d.png";

interface LandingPageProps {
  onGetStarted: () => void;
  onAdminLogin: () => void;
}

export function LandingPage({ onGetStarted, onAdminLogin }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#C9E2F2]/40 via-white to-[#C9E2F2]/30">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-[#C9E2F2] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={workigomLogoImage} 
              alt="Workigom" 
              className="h-10 sm:h-12 w-auto"
            />
            <div className="hidden sm:block">
              <p className="text-xs text-[#3F9BBF]">Birlikte Daha Güçlüyüz</p>
            </div>
          </div>
          <Button 
            onClick={onGetStarted}
            className="bg-gradient-to-r from-[#0367A6] to-[#3F9BBF] hover:from-[#3F9BBF] hover:to-[#0367A6] shadow-lg"
          >
            Giriş Yap
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-20 overflow-hidden">
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#C9E2F2]/40 to-[#3F9BBF]/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#0367A6]/10 to-[#C9E2F2]/30 rounded-full blur-3xl -z-10"></div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#C9E2F2] to-[#3F9BBF]/20 px-5 py-2.5 rounded-full mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-[#0367A6]" />
              <span className="text-sm text-[#012840]">Sosyal Sorumluluk Platformu</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#012840] mb-6 leading-[1.15]">
              İş Bul,
              <br />
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-[#0367A6] via-[#3F9BBF] to-[#0367A6] bg-clip-text text-transparent">
                  Yardım Et
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10C60 2 140 2 198 10" stroke="#3F9BBF" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
              <br />
              <span className="inline-flex items-center gap-3">
                Birlikte Büyü
                <Heart className="w-10 h-10 lg:w-12 lg:h-12 text-[#0367A6] inline-block animate-pulse" fill="#0367A6" />
              </span>
            </h1>

            {/* Description */}
            <div className="space-y-4 mb-10 max-w-xl">
              <p className="text-lg lg:text-xl text-[#012840] leading-relaxed">
                <span className="font-semibold">Günlük iş fırsatları ve acil eleman ihtiyaçları için tek platform: Workigom!</span>
              </p>
              <p className="text-base lg:text-lg text-[#3F9BBF] leading-relaxed">
                Hem çalışanlar için ek gelir fırsatları, hem de şirketler için anında personel desteği.
              </p>
              <div className="bg-gradient-to-r from-[#C9E2F2]/50 to-transparent p-4 rounded-2xl border-l-4 border-[#0367A6]">
                <p className="text-base text-[#012840] leading-relaxed">
                  Üstelik sosyal dayanışma modülümüzle, <span className="font-semibold text-[#0367A6]">'Yemeğime Destek Ol'</span> ya da <span className="font-semibold text-[#0367A6]">'Yemek Desteği Bul'</span> diyerek restoran harcamalarına destek olabilir veya destek bulabilir ve paylaşmanın bir parçası olabilirsin! 💙
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                onClick={onGetStarted}
                className="group bg-[#012840] hover:bg-[#0367A6] text-lg px-8 py-7 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 rounded-2xl relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="white" />
                  Ücretsiz Başla
                </span>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-lg px-8 py-7 border-2 border-[#C9E2F2] bg-white/60 backdrop-blur-sm text-[#012840] hover:bg-[#C9E2F2]/50 hover:border-[#3F9BBF] transition-all duration-300 rounded-2xl"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Nasıl Çalışır?
              </Button>
            </div>
          </div>

          {/* Right: Visual Cards with Floating Animation */}
          <div className="relative lg:h-[600px] flex items-center justify-center">
            {/* Center Card - Main Focus */}
            <div className="relative z-20">
              <Card className="p-8 bg-white border-2 border-[#C9E2F2] rounded-[2rem] shadow-2xl w-full max-w-[340px] mx-auto hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0367A6] to-[#3F9BBF] rounded-2xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" fill="white" />
                    </div>
                    <div>
                      <h4 className="text-[#012840]">Sosyal Etki</h4>
                      <p className="text-xs text-[#3F9BBF]">Topluluk Desteği</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-[#C9E2F2]/30 to-[#C9E2F2]/10 p-4 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#3F9BBF]">Bu Ay</span>
                      <TrendingUp className="w-4 h-4 text-[#10B981]" />
                    </div>
                    <div className="text-2xl font-bold text-[#012840]">₺12,450</div>
                    <p className="text-xs text-[#3F9BBF] mt-1">+23% artış</p>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1 bg-gradient-to-br from-[#10B981]/10 to-[#10B981]/5 p-3 rounded-xl text-center">
                      <div className="text-xl font-bold text-[#012840]">24</div>
                      <p className="text-xs text-[#3F9BBF]">Tamamlanan</p>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-[#0367A6]/10 to-[#0367A6]/5 p-3 rounded-xl text-center">
                      <div className="text-xl font-bold text-[#012840]">15</div>
                      <p className="text-xs text-[#3F9BBF]">Yardım Sayısı</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Floating Cards - Top Right */}
            <div className="absolute top-0 right-0 animate-float-slow hidden lg:block">
              <Card className="p-5 bg-white border border-[#C9E2F2]/60 rounded-3xl shadow-lg w-[180px]">
                <div className="w-10 h-10 bg-[#3F9BBF] rounded-2xl flex items-center justify-center mb-3">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm text-[#012840] mb-1">Günlük İşler</h4>
                <p className="text-xs text-[#3F9BBF]">125 aktif ilan</p>
              </Card>
            </div>

            {/* Floating Cards - Bottom Left */}
            <div className="absolute bottom-8 left-0 animate-float-medium hidden lg:block">
              <Card className="p-5 bg-white border border-[#C9E2F2]/60 rounded-3xl shadow-lg w-[180px]">
                <div className="w-10 h-10 bg-[#10B981] rounded-2xl flex items-center justify-center mb-3">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-sm text-[#012840] mb-1">Öğün Desteği</h4>
                <p className="text-xs text-[#3F9BBF]">456 kişiye ulaştı</p>
              </Card>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-[#3F9BBF]/20 to-transparent rounded-full blur-2xl animate-pulse hidden lg:block"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-[#0367A6]/20 to-transparent rounded-full blur-2xl animate-pulse hidden lg:block"></div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
      `}</style>

      {/* Social Impact Section */}
      <section className="bg-gradient-to-r from-[#0367A6] to-[#3F9BBF] py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Heart className="w-4 h-4 text-white" fill="white" />
            <span className="text-sm text-white">Sosyal Etki</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Her İş, Bir İyilik Hareketi! 💙
          </h2>
          <p className="text-xl text-[#C9E2F2] max-w-3xl mx-auto mb-12">
            Workigom'da çalışarak sadece kendin için değil, toplum için de değer yaratıyorsun. 
            İhtiyaç sahiplerine restoran harcamalarında destek oluyoruz.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border-2 border-white/20">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#0367A6]" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">1,234</div>
              <p className="text-[#C9E2F2]">Aktif Kullanıcı</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border-2 border-white/20">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-[#0367A6]" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">456</div>
              <p className="text-[#C9E2F2]">Desteklenen Öğün</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-3xl border-2 border-white/20">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CircleDollarSign className="w-8 h-8 text-[#0367A6]" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">₺89K</div>
              <p className="text-[#C9E2F2]">Toplam Kazanç</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#C9E2F2]/50 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#0367A6]" />
            <span className="text-sm text-[#012840]">Basit ve Hızlı</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#012840] mb-4">
            Nasıl Çalışır? 🚀
          </h2>
          <p className="text-lg text-[#3F9BBF] max-w-2xl mx-auto">
            Sadece 3 adımda başla, kazan ve yardım et!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-8 text-center border-2 border-[#C9E2F2] rounded-3xl hover:shadow-2xl transition-all duration-300 bg-white">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0367A6] to-[#3F9BBF] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
              1
            </div>
            <h3 className="text-[#012840] mb-3">Kayıt Ol</h3>
            <p className="text-[#3F9BBF]">
              E-posta veya Google hesabınla hızlıca kayıt ol ve profilini oluştur
            </p>
          </Card>

          <Card className="p-8 text-center border-2 border-[#C9E2F2] rounded-3xl hover:shadow-2xl transition-all duration-300 bg-white">
            <div className="w-16 h-16 bg-gradient-to-br from-[#3F9BBF] to-[#0367A6] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
              2
            </div>
            <h3 className="text-[#012840] mb-3">İş Bul & Çalış</h3>
            <p className="text-[#3F9BBF]">
              Sana uygun günlük işleri keşfet, başvur ve kazanmaya başla
            </p>
          </Card>

          <Card className="p-8 text-center border-2 border-[#C9E2F2] rounded-3xl hover:shadow-2xl transition-all duration-300 bg-white">
            <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#0367A6] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
              3
            </div>
            <h3 className="text-[#012840] mb-3">Kazan & Yardım Et</h3>
            <p className="text-[#3F9BBF]">
              Para kazan ve otomatik olarak ihtiyaç sahiplerine destek ol
            </p>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-br from-[#C9E2F2]/30 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#012840] mb-4">
              Neden Workigom? 💫
            </h2>
            <p className="text-lg text-[#3F9BBF] max-w-2xl mx-auto">
              Sadece iş bulma değil, sosyal sorumluluk platformu
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="relative overflow-hidden rounded-3xl border-0 hover:shadow-2xl transition-all duration-300 group h-[280px]">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1605436247062-0461f373593b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWlseSUyMHdvcmslMjBvZmZpY2V8ZW58MXx8fHwxNzYwODMzNDY1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Günlük İşler"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#012840]/95 via-[#012840]/70 to-[#012840]/40"></div>
              <div className="relative h-full p-6 flex flex-col justify-end">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white mb-2">Günlük İşler</h3>
                <p className="text-sm text-[#C9E2F2]">Esnek çalışma saatleri, hemen kazan</p>
              </div>
            </Card>

            <Card className="relative overflow-hidden rounded-3xl border-0 hover:shadow-2xl transition-all duration-300 group h-[280px]">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1758599668125-e154250f24bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxwaW5nJTIwaGFuZHMlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzYwNzI1MjE0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Sosyal Destek"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3F9BBF]/95 via-[#3F9BBF]/70 to-[#3F9BBF]/40"></div>
              <div className="relative h-full p-6 flex flex-col justify-end">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Heart className="w-7 h-7 text-white" fill="white" />
                </div>
                <h3 className="text-white mb-2">Sosyal Destek</h3>
                <p className="text-sm text-white/90">İhtiyaç sahiplerine otomatik yardım</p>
              </div>
            </Card>

            <Card className="relative overflow-hidden rounded-3xl border-0 hover:shadow-2xl transition-all duration-300 group h-[280px]">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1596248675029-bd9b0c7dc479?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXN0JTIwcGF5bWVudCUyMG1vbmV5fGVufDF8fHx8MTc2MDgzMzQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Hızlı Ödeme"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#10B981]/95 via-[#10B981]/70 to-[#10B981]/40"></div>
              <div className="relative h-full p-6 flex flex-col justify-end">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white mb-2">Hızlı Ödeme</h3>
                <p className="text-sm text-white/90">İş bitince hemen kazancını al</p>
              </div>
            </Card>

            <Card className="relative overflow-hidden rounded-3xl border-0 hover:shadow-2xl transition-all duration-300 group h-[280px]">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1606823616145-4329a68b8bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cmUlMjBwbGF0Zm9ybSUyMHRydXN0fGVufDF8fHx8MTc2MDgzMzQ2Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Güvenli Platform"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0367A6]/95 via-[#0367A6]/70 to-[#0367A6]/40"></div>
              <div className="relative h-full p-6 flex flex-col justify-end">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white mb-2">Güvenli Platform</h3>
                <p className="text-sm text-white/90">Doğrulanmış şirketler ve kullanıcılar</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <Card className="bg-gradient-to-r from-[#0367A6] to-[#3F9BBF] p-12 lg:p-16 rounded-3xl text-center border-0 shadow-2xl">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            Haydi, Birlikte Başlayalım! 🎉
          </h2>
          <p className="text-xl text-[#C9E2F2] mb-8 max-w-2xl mx-auto">
            İster iş arayan bir birey, ister eleman arayan bir şirket ol - 
            Workigom'da herkes kazanır, herkes yardım eder!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={onGetStarted}
              className="bg-white text-[#0367A6] hover:bg-[#C9E2F2] text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Heart className="w-5 h-5 mr-2" />
              Ücretsiz Başla
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-[#012840] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src={workigomLogoImage} 
                  alt="Workigom" 
                  className="h-10 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-[#C9E2F2] text-sm">
                Birlikte büyüyen, birlikte yardım eden topluluk
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-[#C9E2F2]">
                <li>İş Ara</li>
                <li>İş İlanı Ver</li>
                <li>Nasıl Çalışır</li>
                <li>Fiyatlandırma</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3">Sosyal Etki</h4>
              <ul className="space-y-2 text-sm text-[#C9E2F2]">
                <li>Yardım Programı</li>
                <li>İstatistikler</li>
                <li>Hikayeler</li>
                <li>Partnerler</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-3">Destek</h4>
              <ul className="space-y-2 text-sm text-[#C9E2F2]">
                <li>Yardım Merkezi</li>
                <li>İletişim</li>
                <li>Gizlilik</li>
                <li>Şartlar</li>
                <li>
                  <button 
                    onClick={onAdminLogin}
                    className="hover:text-white transition-colors duration-200"
                  >
                    Admin Girişi
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-[#3F9BBF]/30 pt-8 text-center text-sm text-[#C9E2F2]">
            <p>© 2025 Workigom. Tüm hakları saklıdır. ❤️ ile yapıldı.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
