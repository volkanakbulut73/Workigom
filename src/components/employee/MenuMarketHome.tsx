import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { Heart, UtensilsCrossed, Users, Gift, ArrowLeft, CircleDot } from "lucide-react";
import { useState, useEffect } from "react";

interface MenuMarketHomeProps {
  onNavigate: (page: string) => void;
}

export function MenuMarketHome({ onNavigate }: MenuMarketHomeProps) {
  const [waitingCount, setWaitingCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [onlineSupporters, setOnlineSupporters] = useState(0);

  useEffect(() => {
    // LocalStorage migration - eski key'lerden yeni key'lere geçiş
    const oldRequests = localStorage.getItem('foodDonationRequests');
    if (oldRequests && !localStorage.getItem('menuShareRequests')) {
      localStorage.setItem('menuShareRequests', oldRequests);
      console.log('✅ Migrated: foodDonationRequests → menuShareRequests');
    }

    const oldDonations = localStorage.getItem('activeDonations');
    if (oldDonations && !localStorage.getItem('activeShares')) {
      localStorage.setItem('activeShares', oldDonations);
      console.log('✅ Migrated: activeDonations → activeShares');
    }

    const oldAvailability = localStorage.getItem('donorAvailability');
    if (oldAvailability && !localStorage.getItem('supporterAvailability')) {
      localStorage.setItem('supporterAvailability', oldAvailability);
      console.log('✅ Migrated: donorAvailability → supporterAvailability');
    }

    // Kullanıcı bilgisini yükle
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    // Müsaitlik durumunu yükle (yeni key kullan)
    const availability = localStorage.getItem('supporterAvailability');
    if (availability) {
      setIsAvailable(JSON.parse(availability));
    }

    // Bekleyen talepleri say (yeni key kullan)
    const updateWaitingCount = () => {
      const requests = JSON.parse(localStorage.getItem('menuShareRequests') || '[]');
      const waiting = requests.filter((r: any) => r.status === 'waiting').length;
      setWaitingCount(waiting);
    };

    updateWaitingCount();

    // Online destekçi sayısını random olarak ayarla (gerçek bir sistemde API'den gelecek)
    const updateOnlineSupporters = () => {
      const randomCount = Math.floor(Math.random() * 50) + 100; // 100-150 arası
      setOnlineSupporters(randomCount);
    };
    
    updateOnlineSupporters();

    // Her 2 saniyede bir güncelle
    const interval = setInterval(() => {
      updateWaitingCount();
      updateOnlineSupporters();
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const handleAvailabilityToggle = (checked: boolean) => {
    setIsAvailable(checked);
    localStorage.setItem('supporterAvailability', JSON.stringify(checked));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('home')}
            className="text-white hover:bg-white/10 mb-4 -ml-2"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-white">Menü Market 🍽️</h1>
              <p className="text-white/80 text-sm">Menü Market ile paylaş veya yararlan!</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 -mt-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6">
          <Card className="p-4 border-0 shadow-md bg-gradient-to-br from-pink-50 to-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-semibold text-[#012840] mb-1">8</div>
            <div className="text-sm text-[#0367A6]">Paylaştığın Kişi</div>
            <div className="text-xs text-[#3F9BBF] mt-1">Bu ay</div>
          </Card>

          <Card className="p-4 border-0 shadow-md bg-gradient-to-br from-emerald-50 to-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-semibold text-[#012840] mb-1">3</div>
            <div className="text-sm text-[#0367A6]">Sana Paylaşım Yapan</div>
            <div className="text-xs text-[#3F9BBF] mt-1">Bu ay</div>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="space-y-4">
          <Card 
            className="p-6 border-0 shadow-lg bg-gradient-to-br from-amber-50 via-white to-orange-50 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-[#012840]">💛 Restoran faturasını paylaş</h3>
                  {isAvailable && (
                    <Badge className="bg-green-500 text-white border-0 text-xs mt-1">
                      <CircleDot className="w-3 h-3 mr-1" />
                      Müsaitim
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#0367A6]">Müsaitim</span>
                  <Switch
                    checked={isAvailable}
                    onCheckedChange={handleAvailabilityToggle}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            </div>
            <div 
              className="cursor-pointer"
              onClick={() => onNavigate('supporter-list')}
            >
              <p className="text-sm text-[#0367A6] mb-3 leading-relaxed">
                İlanları gör, paylaşım bekleyen kişilere destek ol. Birlikte güzel şeyler başarabiliriz!
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#3F9BBF]" />
                  <span className="text-sm text-[#3F9BBF]">
                    {waitingCount > 0 ? `${waitingCount} kişi paylaşım bekliyor` : 'Şu anda paylaşım bekleyen yok'}
                  </span>
                </div>
                
                {onlineSupporters > 0 && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
                          <CircleDot className="w-4 h-4 text-white fill-white" />
                        </div>
                        <div>
                          <div className="text-green-900 font-medium">Sana destek olmak için {onlineSupporters} kişi online</div>
                          <div className="text-xs text-green-700">Şu anda paylaşım yapmaya hazır</div>
                        </div>
                      </div>
                      <Badge className="bg-green-500 text-white border-0 px-3 py-1">
                        Aktif
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 via-white to-cyan-50 cursor-pointer hover:shadow-xl transition-all duration-300"
            onClick={() => onNavigate('find-share')}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0367A6] to-[#012840] flex items-center justify-center flex-shrink-0 shadow-lg">
                <UtensilsCrossed className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[#012840] mb-2">🎓 Yemeğine Paylaşım Bul</h3>
                <p className="text-sm text-[#0367A6] mb-3 leading-relaxed">
                  Yeni ilan oluştur, paylaşım bekle. İhtiyacın olduğunda yanında olalım!
                </p>
                <div className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-[#3F9BBF]" />
                  <span className="text-sm text-[#3F9BBF]">Hemen ilan oluştur</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-6 p-4 border-0 shadow-sm bg-gradient-to-r from-[#C9E2F2]/30 to-white">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0367A6] flex items-center justify-center flex-shrink-0">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-[#012840] mb-1">Nasıl Çalışır?</h4>
              <p className="text-sm text-[#0367A6] leading-relaxed">
                Menü Market paylaşım sistemi ile paylaşım arayan ve paylaşım yapmak isteyenler bir araya geliyor. 
                Minimum %20 paylaşım ile başlayabilir, %100 paylaşım ile tam karşılayabilirsiniz. 
                QR kod sistemi ile güvenli ve hızlı ödeme yapabilirsiniz.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
