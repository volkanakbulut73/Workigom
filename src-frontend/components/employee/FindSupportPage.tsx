import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { ArrowLeft, Heart, Clock, CheckCircle, DollarSign, AlertCircle, Image as ImageIcon, Check } from "lucide-react";
import { FoodDonationRequest } from "../../lib/mockData";
import { toast } from "sonner@2.0.3";

interface FindSupportPageProps {
  onNavigate: (page: string) => void;
  currentUserId: string;
}

export function FindSupportPage({ onNavigate, currentUserId }: FindSupportPageProps) {
  const [step, setStep] = useState<'form' | 'waiting' | 'matched' | 'qr-ready' | 'payment-done'>('form');
  const [menuAmount, setMenuAmount] = useState('');
  const [description, setDescription] = useState('');
  const [currentRequest, setCurrentRequest] = useState<FoodDonationRequest | null>(null);
  const [countdown, setCountdown] = useState(300);
  const [currentUserData, setCurrentUserData] = useState<any>(null);

  // Kullanıcı bilgilerini yükle
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUserData(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // Mevcut bekleyen talebi kontrol et
    const userId = currentUserId || 'IND001'; // Fallback to mock ID
    const requests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
    const myActiveRequest = requests.find((r: FoodDonationRequest) => 
      r.userId === userId && ['waiting', 'donor_matched', 'qr_uploaded', 'payment_confirmed'].includes(r.status)
    );

    if (myActiveRequest) {
      setCurrentRequest(myActiveRequest);
      
      if (myActiveRequest.status === 'waiting') {
        setStep('waiting');
      } else if (myActiveRequest.status === 'donor_matched') {
        setStep('matched');
      } else if (myActiveRequest.status === 'qr_uploaded') {
        setStep('qr-ready');
      } else if (myActiveRequest.status === 'payment_confirmed') {
        setStep('payment-done');
      }
    }
  }, [currentUserId]);

  // Ayrı polling useEffect - sadece iptal durumunu kontrol eder
  useEffect(() => {
    if (!currentRequest) return;

    const userId = currentUserId || 'IND001';
    const pollInterval = setInterval(() => {
      const latestRequests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
      const latestActiveRequest = latestRequests.find((r: FoodDonationRequest) => 
        r.userId === userId && r.id === currentRequest.id
      );

      // Talep tamamen silinmişse form ekranına dön
      if (!latestActiveRequest) {
        setCurrentRequest(null);
        setStep('form');
        setMenuAmount('');
        setDescription('');
        toast.info('Talep iptal edildi', {
          description: 'Ana sayfaya yönlendirildiniz'
        });
      }
    }, 3000);

    return () => clearInterval(pollInterval);
  }, [currentRequest?.id, currentUserId]);

  // Countdown timer için ayrı useEffect
  useEffect(() => {
    if (!currentRequest?.qrExpiresAt || step !== 'qr-ready') return;
    
    const expiryTime = new Date(currentRequest.qrExpiresAt).getTime();
    const now = Date.now();
    const remainingSeconds = Math.max(0, Math.floor((expiryTime - now) / 1000));
    setCountdown(remainingSeconds);

    const timer = setInterval(() => {
      const newRemaining = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
      setCountdown(newRemaining);
      if (newRemaining <= 0) {
        clearInterval(timer);
        toast.error('QR kod süresi doldu', {
          description: 'Lütfen bağışçıdan yeni QR kod talep edin'
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentRequest?.qrExpiresAt, step]);

  // Polling - localStorage'daki değişiklikleri dinle
  useEffect(() => {
    if (!currentRequest || step === 'payment-done' || step === 'form') return;

    const pollInterval = setInterval(() => {
      const userId = 'IND001';
      const requests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
      const updated = requests.find((r: FoodDonationRequest) => r.id === currentRequest.id);
      
      if (updated && updated.status !== currentRequest.status) {
        setCurrentRequest(updated);
        
        if (updated.status === 'donor_matched') {
          setStep('matched');
          toast.success('Bağışçı bulundu!', {
            description: `${updated.donorName} desteğini onayladı`
          });
        } else if (updated.status === 'qr_uploaded') {
          setStep('qr-ready');
          toast.success('QR kod hazır!', {
            description: 'Restoranda ödeme yapabilirsiniz'
          });
        } else if (updated.status === 'payment_confirmed') {
          setStep('payment-done');
          toast.success('Ödeme tamamlandı!', {
            description: 'Afiyet olsun! 🎉'
          });
        }
      }
    }, 2000); // Her 2 saniyede bir kontrol et

    return () => clearInterval(pollInterval);
  }, [currentRequest, step]);

  // %100 desteğinde otomatik QR yükleme ekranına yönlendirme
  useEffect(() => {
    if (step === 'matched' && currentRequest?.isFullSupport) {
      // 3 saniye sonra otomatik olarak qr_pending'e geç
      const timer = setTimeout(() => {
        const requests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
        const updatedRequests = requests.map((r: FoodDonationRequest) => {
          if (r.id === currentRequest.id) {
            return {
              ...r,
              status: 'qr_pending',
              fullSupportAutoRedirectAt: new Date().toISOString()
            };
          }
          return r;
        });
        localStorage.setItem('foodDonationRequests', JSON.stringify(updatedRequests));
        
        toast.success('✨ Ödeme yapmanıza gerek yok!', {
          description: 'Bağışçı QR kodu hazırlıyor'
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [step, currentRequest?.isFullSupport, currentRequest?.id]);

  const handleSubmitRequest = () => {
    const amount = parseFloat(menuAmount);
    if (!amount || amount < 50) {
      toast.error('Lütfen geçerli bir tutar girin (min. 50 TL)');
      return;
    }

    if (!description.trim()) {
      toast.error('Lütfen açıklama girin');
      return;
    }

    // Kullanıcı bilgilerini al
    const userId = currentUserId || 'IND001';
    const userName = currentUserData?.name || 'Kullanıcı';
    const userInitials = userName
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const newRequest: FoodDonationRequest = {
      id: Date.now().toString(),
      userId: userId,
      userName: userName.split(' ')[0] + ' ' + userName.split(' ')[1]?.[0] + '.', // "Ahmet Y." formatı
      userInitials: userInitials,
      menuAmount: amount,
      minSupportRate: 20,
      userPayAmount: Math.round(amount * 0.8),
      description: description.trim(),
      status: 'waiting',
      postedAt: 'Şimdi'
    };

    const requests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
    requests.unshift(newRequest);
    localStorage.setItem('foodDonationRequests', JSON.stringify(requests));

    console.log('✅ Yeni destek talebi oluşturuldu:', newRequest);
    console.log('📦 Toplam talep sayısı:', requests.length);

    setCurrentRequest(newRequest);
    setStep('waiting');
    
    toast.success('✅ Destek isteğiniz yayınlandı!', {
      description: 'Bağışçılar talepinizi görecek'
    });
  };

  const handlePaymentDone = () => {
    if (!currentRequest) return;

    const requests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
    const updatedRequests = requests.map((r: FoodDonationRequest) => {
      if (r.id === currentRequest.id) {
        return {
          ...r,
          status: 'payment_confirmed',
          completedAt: new Date().toISOString()
        };
      }
      return r;
    });
    localStorage.setItem('foodDonationRequests', JSON.stringify(updatedRequests));

    // Bağışçıya bildirim gönder
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    
    if (currentRequest.isFullSupport) {
      // %100 destek - Teşekkür et butonu ile
      setCurrentRequest({...currentRequest, status: 'payment_confirmed'});
      setStep('payment-done');
    } else {
      // %20 destek - Direkt tamamlandı
      notifications.unshift({
        id: Date.now().toString(),
        userId: currentRequest.donorId,
        type: 'donation_completed',
        title: '💛 Destek Tamamlandı',
        message: `${currentRequest.userName} desteğiniz için teşekkür ediyor!`,
        timestamp: new Date().toISOString(),
        read: false,
        requestId: currentRequest.id
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));

      toast.success('Afiyet olsun! 🎓', {
        description: 'Bağışçıya teşekkür bildirimi gönderildi'
      });

      setTimeout(() => {
        onNavigate('food-donation-home');
      }, 2000);
    }
  };

  const handleThankDonor = () => {
    if (!currentRequest) return;

    // İsteği tamamlandı olarak işaretle
    const requests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
    const updatedRequests = requests.map((r: FoodDonationRequest) => {
      if (r.id === currentRequest.id) {
        return {
          ...r,
          status: 'completed',
          thanked: true,
          completedAt: new Date().toISOString()
        };
      }
      return r;
    });
    localStorage.setItem('foodDonationRequests', JSON.stringify(updatedRequests));

    // Bağışçıya teşekkür bildirimi ve Altın Kalp
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.unshift({
      id: Date.now().toString(),
      userId: currentRequest.donorId,
      type: 'golden_heart',
      title: '💛 Destek Tamamlandı',
      message: `${currentRequest.userName} desteğiniz için teşekkür etti ❤️\n\nAltın Kalbin oldu! Profilinizde görünecek.`,
      timestamp: new Date().toISOString(),
      read: false,
      requestId: currentRequest.id
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));

    // Bağışçının Altın Kalp sayısını artır
    const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
    if (!userProfiles[currentRequest.donorId!]) {
      userProfiles[currentRequest.donorId!] = {
        userId: currentRequest.donorId,
        userName: currentRequest.donorName,
        goldenHeartCount: 0,
        totalDonationsGiven: 0,
        totalDonationsReceived: 0
      };
    }
    userProfiles[currentRequest.donorId!].goldenHeartCount += 1;
    userProfiles[currentRequest.donorId!].totalDonationsGiven += 1;
    localStorage.setItem('userProfiles', JSON.stringify(userProfiles));

    toast.success('❤️ Teşekkür gönderildi!', {
      description: 'Bağışçı Altın Kalp kazandı'
    });

    setTimeout(() => {
      onNavigate('food-donation-home');
    }, 2000);
  };

  const handleCancelRequest = () => {
    if (!currentRequest) return;

    // İsteği tamamen sil veya iptal et
    const requests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
    const updatedRequests = requests.filter((r: FoodDonationRequest) => r.id !== currentRequest.id);
    localStorage.setItem('foodDonationRequests', JSON.stringify(updatedRequests));

    // Eğer bağışçı varsa, bağışçıya bildirim gönder
    if (currentRequest.donorId) {
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      notifications.unshift({
        id: Date.now().toString(),
        userId: currentRequest.donorId,
        type: 'request_cancelled',
        title: '❌ Talep İptal Edildi',
        message: `${currentRequest.userName} destek talebini iptal etti.`,
        timestamp: new Date().toISOString(),
        read: false,
        requestId: currentRequest.id
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }

    toast.success('✅ İşlem iptal edildi', {
      description: 'Ana sayfaya yönlendiriliyorsunuz'
    });

    // Formu sıfırla ve ana sayfaya dön
    setCurrentRequest(null);
    setStep('form');
    setMenuAmount('');
    setDescription('');
    
    setTimeout(() => {
      onNavigate('food-donation-home');
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Kullanıcı adını formatlama - "Ahmet Y." şeklinde
  const getFormattedName = () => {
    if (!currentUserData?.name) return 'Kullanıcı';
    
    const nameParts = currentUserData.name.trim().split(' ');
    if (nameParts.length === 1) return nameParts[0];
    
    const firstName = nameParts[0];
    const lastNameInitial = nameParts[nameParts.length - 1][0];
    return `${firstName} ${lastNameInitial}.`;
  };

  // Tracking görünümü
  const renderTracking = (currentStep: string, isFullSupport: boolean) => {
    const steps = isFullSupport 
      ? ['Eşleşme', 'QR Hazırlama', 'QR Yüklendi', 'Ödeme Yapıldı', 'Tamamlandı']
      : ['Eşleşme', 'Ödemeniz', 'QR Hazırlama', 'QR Yüklendi', 'Ödeme Yapıldı', 'Tamamlandı'];
    
    const stepStatus = isFullSupport ? {
      'waiting': 0,
      'matched': 1,
      'qr-ready': 3,
      'payment-done': 5
    } : {
      'waiting': 0,
      'matched': 1,
      'qr-ready': 4,
      'payment-done': 6
    };

    const currentIndex = stepStatus[currentStep] || 0;

    return (
      <Card className="p-4 mb-4 border-0 shadow-md bg-white">
        <h4 className="text-sm text-[#012840] mb-3">📊 İşlem Takibi</h4>
        <div className="space-y-2">
          {steps.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={step} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isCompleted ? 'bg-emerald-500' : isCurrent ? 'bg-[#0367A6]' : 'bg-gray-200'
                }`}>
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <span className={`text-sm ${isCurrent ? 'text-white' : 'text-gray-500'}`}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <span className={`text-sm ${
                  isCompleted ? 'text-emerald-700' : isCurrent ? 'text-[#012840]' : 'text-gray-500'
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </Card>
    );
  };

  // Form - Destek Talebi Oluştur
  if (step === 'form') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
        <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('food-donation-home')}
              className="text-white hover:bg-white/10 mb-4 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-6 h-6" />
              <h1 className="text-white">Destek Bul</h1>
            </div>
            <p className="text-white/80 text-sm">Yemek için destek talep et 🍽️</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
          <Card className="p-6 border-0 shadow-lg">
            <div className="space-y-4">
              <div>
                <Label htmlFor="user-name" className="text-[#012840]">
                  Ad Soyad
                </Label>
                <Input
                  id="user-name"
                  type="text"
                  value={getFormattedName()}
                  disabled
                  className="mt-1 bg-gray-50 cursor-not-allowed"
                />
                <p className="text-xs text-[#3F9BBF] mt-1">
                  Bağışçılar bu isimle görecek
                </p>
              </div>

              <div>
                <Label htmlFor="menu-amount" className="text-[#012840]">
                  Menü Tutarı (₺)
                </Label>
                <Input
                  id="menu-amount"
                  type="number"
                  placeholder="Örn: 1000"
                  value={menuAmount}
                  onChange={(e) => setMenuAmount(e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-[#3F9BBF] mt-1">
                  Minimum 50 TL, maksimum 5000 TL
                </p>
              </div>

              <div>
                <Label htmlFor="description" className="text-[#012840]">
                  Açıklama
                </Label>
                <Textarea
                  id="description"
                  placeholder="Örn: Yaklaşık 1000 TL tutarında yemek yiyeceğim"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>

              {menuAmount && parseFloat(menuAmount) > 0 && (
                <div className="p-4 bg-[#C9E2F2]/20 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#0367A6]">Menü tutarı:</span>
                    <span className="text-[#012840]">{parseFloat(menuAmount)} ₺</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald-700">Min. destek (%20):</span>
                    <span className="text-emerald-700">{Math.round(parseFloat(menuAmount) * 0.2)} ₺</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-700">Sen ödeyeceksin:</span>
                    <span className="text-blue-700">{Math.round(parseFloat(menuAmount) * 0.8)} ₺</span>
                  </div>
                </div>
              )}

              <Button
                className="w-full bg-gradient-to-r from-[#0367A6] to-[#012840] hover:from-[#012840] hover:to-[#0367A6]"
                onClick={handleSubmitRequest}
                disabled={!menuAmount || !description.trim()}
              >
                <Heart className="w-4 h-4 mr-2" />
                Destek Talebi Oluştur
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Bağışçı Bekleniyor
  if (step === 'waiting' && currentRequest) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
        <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white">Destek Bekleniyor</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
          {renderTracking('waiting', false)}
          
          <Card className="p-8 border-0 shadow-lg text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Clock className="w-10 h-10 text-white" />
            </div>
            
            <h3 className="text-[#012840] mb-2">Talebiniz Yayınlandı</h3>
            <p className="text-[#0367A6] mb-6">
              Bağışçılar talepinizi görüyor. Biri destek olmak istediğinde bildirim alacaksınız.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between py-3 px-4 bg-[#C9E2F2]/20 rounded-lg">
                <span className="text-sm text-[#0367A6]">Menü Tutarı:</span>
                <span className="text-[#012840]">{currentRequest.menuAmount} ₺</span>
              </div>
              <div className="flex items-center justify-between py-3 px-4 bg-blue-50 rounded-lg">
                <span className="text-sm text-blue-700">Senin ödeyeceğin:</span>
                <span className="text-blue-700">{currentRequest.userPayAmount} ₺</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => onNavigate('food-donation-home')}
              >
                Ana Sayfaya Dön
              </Button>
              
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleCancelRequest}
              >
                İşlemi İptal Et
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Bağışçı Eşleşti - Ödeme Bekleniyor
  if (step === 'matched' && currentRequest) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white">Bağışçı Bulundu! 💛</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
          {renderTracking('matched', currentRequest.isFullSupport || false)}
          
          <Card className="p-6 border-0 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              {currentRequest.isFullSupport ? (
                <>
                  <h3 className="text-[#012840] mb-2">
                    {currentRequest.donorName} yemeğine "Buda Benden" diyerek tamamına destek olmak istiyor 💛
                  </h3>
                  <p className="text-[#0367A6]">
                    Ödeme yapmayacaksınız, 5 dk içinde QR ekranınızda olacak.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-[#012840] mb-2">
                    {currentRequest.donorName} yemeğine destek olmak istiyor 💛
                  </h3>
                  <p className="text-[#0367A6]">
                    Şimdi ödeme ekranına yönlendiriliyorsunuz, 5 dk içinde QR ekranınızda olacak.
                  </p>
                </>
              )}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between py-3 px-4 bg-[#C9E2F2]/20 rounded-lg">
                <span className="text-sm text-[#0367A6]">Menü Tutarı:</span>
                <span className="text-[#012840]">{currentRequest.menuAmount} ₺</span>
              </div>
              <div className="flex items-center justify-between py-3 px-4 bg-emerald-50 rounded-lg">
                <span className="text-sm text-emerald-700">Bağışçının desteği:</span>
                <span className="text-emerald-700">
                  {currentRequest.isFullSupport ? currentRequest.menuAmount : Math.round(currentRequest.menuAmount * 0.2)} ₺ (%{currentRequest.supportRate})
                </span>
              </div>
              {!currentRequest.isFullSupport && (
                <div className="flex items-center justify-between py-3 px-4 bg-blue-50 rounded-lg">
                  <span className="text-sm text-blue-700">Senin ödeyeceğin:</span>
                  <span className="text-blue-700">{currentRequest.userPayAmount} ₺</span>
                </div>
              )}
            </div>

            {/* %100 desteğinde ödeme yapılmayacak */}
            {currentRequest.isFullSupport ? (
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-900 leading-relaxed">
                    Bağışçı şu anda QR kod hazırlıyor. Kısa süre içinde QR kod ile ödeme yapabileceksiniz.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 mb-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-900 leading-relaxed">
                      Önce senin ödemen gerekiyor: <strong>{currentRequest.userPayAmount} ₺</strong>
                      <br />
                      Ödeme yaptıktan sonra bağışçı QR kodu yükleyecek.
                    </p>
                  </div>
                </div>
                
                <Button
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
                  onClick={() => {
                    // Ali ödeme yapıyor - status'u payment_pending yap
                    const requests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
                    const updatedRequests = requests.map((r: FoodDonationRequest) => {
                      if (r.id === currentRequest.id) {
                        return {
                          ...r,
                          status: 'payment_pending',
                          userPaymentStartedAt: new Date().toISOString()
                        };
                      }
                      return r;
                    });
                    localStorage.setItem('foodDonationRequests', JSON.stringify(updatedRequests));
                    
                    // Bağışçıya bildirim
                    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
                    notifications.unshift({
                      id: Date.now().toString(),
                      userId: currentRequest.donorId,
                      type: 'payment_started',
                      title: '💳 Ödeme Başladı',
                      message: `${currentRequest.userName} ödemesini yapıyor. Hazır olun!`,
                      timestamp: new Date().toISOString(),
                      read: false,
                      requestId: currentRequest.id
                    });
                    localStorage.setItem('notifications', JSON.stringify(notifications));
                    
                    toast.success('Ödeme ekranına yönlendiriliyorsunuz...', {
                      description: 'Demo için simüle edilen ödeme'
                    });
                    
                    // 2 saniye sonra ödeme tamamla
                    setTimeout(() => {
                      const requests2 = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
                      const updatedRequests2 = requests2.map((r: FoodDonationRequest) => {
                        if (r.id === currentRequest.id) {
                          return {
                            ...r,
                            status: 'qr_pending',
                            userPaymentCompletedAt: new Date().toISOString()
                          };
                        }
                        return r;
                      });
                      localStorage.setItem('foodDonationRequests', JSON.stringify(updatedRequests2));
                      
                      // Bağışçıya ödeme tamamlandı bildirimi
                      const notifications2 = JSON.parse(localStorage.getItem('notifications') || '[]');
                      notifications2.unshift({
                        id: Date.now().toString(),
                        userId: currentRequest.donorId,
                        type: 'payment_completed',
                        title: '✅ Ödeme Tamamlandı',
                        message: `${currentRequest.userName} ödemesini yaptı! Şimdi QR kodu yükleyebilirsiniz.`,
                        timestamp: new Date().toISOString(),
                        read: false,
                        requestId: currentRequest.id
                      });
                      localStorage.setItem('notifications', JSON.stringify(notifications2));
                      
                      toast.success('✅ Ödeme başarılı!', {
                        description: 'Bağışçı QR kodu yükleyecek'
                      });
                    }, 2000);
                  }}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Ödeme Yap ({currentRequest.userPayAmount} ₺)
                </Button>
              </>
            )}
            
            <div className="mt-4">
              <Button
                variant="ghost"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleCancelRequest}
              >
                İşlemi İptal Et
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // QR Hazır - Ödeme Yap
  if (step === 'qr-ready' && currentRequest) {
    const progressPercentage = (countdown / 300) * 100;
    const isExpiringSoon = countdown <= 60;
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
        <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white">QR Kod Hazır!</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
          {renderTracking('qr-ready', currentRequest.isFullSupport || false)}
          
          {/* Countdown Timer Card */}
          <Card className={`p-6 border-2 shadow-lg mb-4 ${isExpiringSoon ? 'bg-red-50 border-red-300 animate-pulse' : 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'}`}>
            <div className="text-center">
              <div className="relative inline-block mb-4">
                {/* Circular Progress */}
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - progressPercentage / 100)}`}
                    className={`transition-all duration-1000 ${isExpiringSoon ? 'text-red-500' : 'text-green-500'}`}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Timer in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${isExpiringSoon ? 'text-red-600' : 'text-green-600'}`}>
                      {formatTime(countdown)}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">kalan süre</div>
                  </div>
                </div>
              </div>
              
              <h3 className={`mb-2 ${isExpiringSoon ? 'text-red-700' : 'text-[#012840]'}`}>
                📷 QR Kod Yüklendi
              </h3>
              <p className={`text-sm ${isExpiringSoon ? 'text-red-600 font-medium' : 'text-[#0367A6]'}`}>
                {isExpiringSoon ? '⚠️ Süre bitiyor! Hemen ödeme yapın' : 'Restoran POS cihazından QR kod ile ödeme yapın'}
              </p>
            </div>
          </Card>

          {/* QR Code Card */}
          <Card className="p-6 border-0 shadow-lg">
            <div className="text-center mb-6">
              {currentRequest.qrImageUrl && (
                <div className="mb-4">
                  <img 
                    src={currentRequest.qrImageUrl} 
                    alt="QR Code" 
                    className="max-w-xs mx-auto rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between py-3 px-4 bg-[#C9E2F2]/20 rounded-lg">
                <span className="text-sm text-[#0367A6]">QR Tutarı:</span>
                <span className="text-[#012840]">{currentRequest.menuAmount} ₺</span>
              </div>
              
              {currentRequest.isFullSupport && (
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-900 leading-relaxed">
                      <strong>{currentRequest.donorName}</strong> yemek ücretinizin tamamını ödeyerek <strong>"Buda Benden Olsun"</strong> dedi 💛
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white h-12"
                onClick={handlePaymentDone}
              >
                💸 Ödeme Yapıldı
              </Button>
              
              <Button
                variant="ghost"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleCancelRequest}
              >
                İşlemi İptal Et
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Ödeme Tamamlandı - Teşekkür Et
  if (step === 'payment-done' && currentRequest) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white">Afiyet Olsun! 🎓</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
          {renderTracking('payment-done', currentRequest.isFullSupport || false)}
          
          <Card className="p-8 border-0 shadow-lg text-center bg-gradient-to-br from-emerald-50 to-white">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            <h2 className="text-[#012840] mb-3">Ödeme Başarılı!</h2>
            <p className="text-[#0367A6] mb-6 leading-relaxed">
              Yemek ücretiniz başarıyla ödendi. Afiyet olsun! 🍽️
            </p>

            {currentRequest.isFullSupport && (
              <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 mb-6">
                <div className="mb-4">
                  <div className="text-4xl mb-2">❤️</div>
                  <h3 className="text-amber-900 mb-2">
                    {currentRequest.donorName} tam destek verdi!
                  </h3>
                  <p className="text-sm text-amber-700 mb-4">
                    Teşekkürlerini ileterek Altın Kalp kazanmasını sağla
                  </p>
                </div>
                
                <Button
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                  onClick={handleThankDonor}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {currentRequest.donorName}'ye Desteği İçin Teşekkür Et
                </Button>
              </Card>
            )}

            <Button
              variant="outline"
              className="w-full"
              onClick={() => onNavigate('food-donation-home')}
            >
              Ana Sayfaya Dön
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
