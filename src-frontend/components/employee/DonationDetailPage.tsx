import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowLeft, CheckCircle, Clock, Upload, CreditCard, Heart, AlertCircle, Image as ImageIcon, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FoodDonationRequest } from "../../lib/mockData";
import { toast } from "sonner";

interface DonationDetailPageProps {
  onNavigate: (page: string) => void;
  requestId?: string;
}

export function DonationDetailPage({ onNavigate, requestId }: DonationDetailPageProps) {
  const [request, setRequest] = useState<FoodDonationRequest | null>(null);
  const [qrImage, setQrImage] = useState<File | null>(null);
  const [countdown, setCountdown] = useState(300);

  useEffect(() => {
    if (!requestId) return;
    
    const requests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
    const found = requests.find((r: FoodDonationRequest) => r.id === requestId);
    setRequest(found || null);
  }, [requestId]);

  // Polling - Status değişikliklerini dinle
  useEffect(() => {
    if (!request || !requestId) return;

    const pollInterval = setInterval(() => {
      const requests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
      const updated = requests.find((r: FoodDonationRequest) => r.id === requestId);
      
      if (updated && updated.status !== request.status) {
        setRequest(updated);
        
        if (updated.status === 'qr_pending') {
          toast.success('✅ Ödeme yapıldı!', {
            description: 'Şimdi QR kod yükleyebilirsiniz'
          });
        } else if (updated.status === 'payment_confirmed') {
          toast.success('🎉 Onaylandı!', {
            description: 'Destek tamamlandı'
          });
        }
      }
    }, 2000); // Her 2 saniyede bir kontrol et

    return () => clearInterval(pollInterval);
  }, [request, requestId]);

  // Completed durumunda aktif donation'ı temizle
  useEffect(() => {
    if (request?.status === 'completed' && request.donorId) {
      const activeDonations = JSON.parse(localStorage.getItem('activeDonations') || '{}');
      delete activeDonations[request.donorId];
      localStorage.setItem('activeDonations', JSON.stringify(activeDonations));
    }
  }, [request?.status, request?.donorId]);

  // Countdown timer için ayrı useEffect
  useEffect(() => {
    if (!request?.qrExpiresAt) return;
    
    const expiryTime = new Date(request.qrExpiresAt).getTime();
    const now = Date.now();
    const remainingSeconds = Math.max(0, Math.floor((expiryTime - now) / 1000));
    setCountdown(remainingSeconds);

    const timer = setInterval(() => {
      const newRemaining = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
      setCountdown(newRemaining);
      if (newRemaining <= 0) {
        clearInterval(timer);
        // QR süresi doldu - localStorage'ı güncelle
        const requests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
        const updatedRequests = requests.map((r: FoodDonationRequest) => {
          if (r.id === request.id) {
            return { ...r, status: 'qr_expired' };
          }
          return r;
        });
        localStorage.setItem('foodDonationRequests', JSON.stringify(updatedRequests));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [request?.qrExpiresAt, request?.id]);

  // %100 desteğinde otomatik QR yükleme ekranına geçiş
  useEffect(() => {
    if (request?.status === 'donor_matched' && request.isFullSupport) {
      // 3 saniye sonra otomatik olarak qr_pending'e geç
      const timer = setTimeout(() => {
        const requests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
        const updatedRequests = requests.map((r: FoodDonationRequest) => {
          if (r.id === requestId) {
            return {
              ...r,
              status: 'qr_pending',
              autoRedirectedAt: new Date().toISOString()
            };
          }
          return r;
        });
        localStorage.setItem('foodDonationRequests', JSON.stringify(updatedRequests));
        
        toast.success('📲 QR Kod Yükleme Ekranına Yönlendiriliyorsunuz...', {
          description: 'Destek alan kişi ödeme yapmayacak'
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [request?.status, request?.isFullSupport, requestId]);

  if (!request) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white p-4">
        <p>Talep bulunamadı</p>
        <Button onClick={() => onNavigate('donor-list')}>Geri Dön</Button>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setQrImage(e.target.files[0]);
    }
  };

  const handleQRUpload = () => {
    if (!qrImage) return;

    // QR yükleme işlemi
    const qrExpiresAt = new Date(Date.now() + 300000).toISOString(); // 5 dakika
    
    const requests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
    const updatedRequests = requests.map((r: FoodDonationRequest) => {
      if (r.id === requestId) {
        return {
          ...r,
          status: 'qr_uploaded',
          qrImageUrl: URL.createObjectURL(qrImage),
          qrExpiresAt,
          qrUploadedAt: new Date().toISOString()
        };
      }
      return r;
    });
    localStorage.setItem('foodDonationRequests', JSON.stringify(updatedRequests));

    // Destek arayan kişiye bildirim
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.unshift({
      id: Date.now().toString(),
      userId: request.userId,
      type: 'qr_ready',
      title: '📷 QR Hazır!',
      message: '📷 QR yüklendi — 300 sn içinde geçerli.',
      timestamp: new Date().toISOString(),
      read: false,
      requestId: request.id
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));

    toast.success('QR kod yüklendi!', {
      description: 'Destek alan kişi QR kodu görebilecek'
    });

    setRequest({...request, status: 'qr_uploaded', qrExpiresAt, qrImageUrl: URL.createObjectURL(qrImage)});
    setCountdown(300);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Tracking görünümü - Bağışçı tarafı
  const renderTracking = (currentStatus: string, isFullSupport: boolean) => {
    const steps = isFullSupport 
      ? ['Eşleşme', 'QR Hazırlama', 'QR Yüklendi', 'Ödeme Yapıldı', 'Tamamlandı']
      : ['Eşleşme', 'Alıcı Ödemesi', 'QR Hazırlama', 'QR Yüklendi', 'Ödeme Yapıldı', 'Tamamlandı'];
    
    const stepStatus = isFullSupport ? {
      'donor_matched': 0,
      'qr_pending': 1,
      'qr_uploaded': 2,
      'payment_confirmed': 3,
      'completed': 4
    } : {
      'donor_matched': 0,
      'payment_pending': 1,
      'qr_pending': 2,
      'qr_uploaded': 3,
      'payment_confirmed': 4,
      'completed': 5
    };

    const currentIndex = stepStatus[currentStatus] || 0;

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

  const handleCancelDonation = () => {
    if (!request) return;

    // Destek talebini tekrar "waiting" durumuna döndür (bağışçı bilgilerini temizle)
    const requests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
    const updatedRequests = requests.map((r: FoodDonationRequest) => {
      if (r.id === request.id) {
        return {
          id: r.id,
          userId: r.userId,
          userName: r.userName,
          userInitials: r.userInitials,
          menuAmount: r.menuAmount,
          minSupportRate: r.minSupportRate,
          userPayAmount: r.userPayAmount,
          description: r.description,
          status: 'waiting',
          postedAt: r.postedAt
        };
      }
      return r;
    });
    localStorage.setItem('foodDonationRequests', JSON.stringify(updatedRequests));

    // Talep sahibine bildirim gönder
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.unshift({
      id: Date.now().toString(),
      userId: request.userId,
      type: 'donation_cancelled',
      title: '❌ Bağışçı İptal Etti',
      message: `${request.donorName} desteği iptal etti. Talebiniz tekrar yayınlandı.`,
      timestamp: new Date().toISOString(),
      read: false,
      requestId: request.id
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));

    // Aktif donation'ı temizle
    const activeDonations = JSON.parse(localStorage.getItem('activeDonations') || '{}');
    if (request.donorId) {
      delete activeDonations[request.donorId];
      localStorage.setItem('activeDonations', JSON.stringify(activeDonations));
    }

    toast.success('✅ İşlem iptal edildi', {
      description: 'Talep tekrar yayınlandı'
    });

    // Geri dön
    setTimeout(() => {
      onNavigate('donor-list');
    }, 1000);
  };

  // Bağışçı tarafı: Eşleşme Tamamlandı - Tracking başladı
  if (request.status === 'donor_matched') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('donor-list')}
              className="text-white hover:bg-white/10 mb-4 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
            <h1 className="text-white">Eşleşme Başarılı! ✅</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
          {renderTracking('donor_matched', request.isFullSupport || false)}
          
          <Card className="p-8 border-0 shadow-lg text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            
            <h3 className="text-[#012840] mb-2">✅ Eşleşme Tamamlandı</h3>
            <p className="text-[#0367A6] mb-6">
              {request.userName} ile eşleşme başarılı!
              <br />
              <strong>Tracking başlatıldı...</strong>
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between py-3 px-4 bg-[#C9E2F2]/20 rounded-lg">
                <span className="text-sm text-[#0367A6]">Menü Tutarı:</span>
                <span className="text-[#012840]">{request.menuAmount} ₺</span>
              </div>
              <div className="flex items-center justify-between py-3 px-4 bg-emerald-50 rounded-lg">
                <span className="text-sm text-emerald-700">Sizin Desteğiniz:</span>
                <span className="text-emerald-700">
                  {request.isFullSupport ? request.menuAmount : Math.round(request.menuAmount * 0.2)} ₺ ({request.supportRate}%)
                </span>
              </div>
            </div>

            {request.isFullSupport ? (
              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 animate-pulse">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-900 leading-relaxed">
                    <strong>"Buda Benden Olsun"</strong> dediniz! 💛
                    <br />
                    {request.userName} ödeme yapmayacak, siz QR kodu yükleyeceksiniz.
                    <br />
                    <strong>🔄 QR yükleme ekranına yönlendiriliyorsunuz...</strong>
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-900 leading-relaxed">
                    {request.userName} şimdi {request.userPayAmount} ₺ ödeme yapacak.
                    <br />
                    Ödeme tamamlandığında siz QR kodu yükleyebileceksiniz.
                  </p>
                </div>
              </div>
            )}
            
            <div className="mt-6">
              <Button
                variant="ghost"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleCancelDonation}
              >
                İşlemi İptal Et
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Bağışçı tarafı: Ödeme Bekleniyor - Ali ödeme yapıyor (sadece %20 için)
  if (request.status === 'payment_pending') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
        <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('donor-list')}
              className="text-white hover:bg-white/10 mb-4 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
            <h1 className="text-white">Tracking</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
          {renderTracking('payment_pending', request.isFullSupport || false)}
          
          <Card className="p-8 border-0 shadow-lg text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <Clock className="w-10 h-10 text-white" />
            </div>
            
            <h3 className="text-[#012840] mb-2">💳 Ödeme Bekleniyor...</h3>
            <p className="text-[#0367A6] mb-6">
              {request.userName} şu anda ödeme yapıyor ({request.userPayAmount} ₺)
              <br />
              Ödeme tamamlandığında siz QR kod yükleyebileceksiniz.
            </p>

            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-900 leading-relaxed">
                  Gerçek uygulamada burası otomatik güncellenecek.
                  <br />
                  Demo için polling ile status kontrol ediliyor...
                </p>
              </div>
            </div>
            
            <div className="mt-6">
              <Button
                variant="ghost"
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleCancelDonation}
              >
                İşlemi İptal Et
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Bağışçı tarafı: QR Yükleme Bekliyor
  if (request.status === 'qr_pending') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
        <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('donor-list')}
              className="text-white hover:bg-white/10 mb-4 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
            <h1 className="text-white">QR Kod Yükle</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
          {renderTracking('qr_pending', request.isFullSupport || false)}
          
          <Card className="p-6 border-0 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-[#012840] mb-2">
                {request.isFullSupport ? 'Destek Bekleyen Hazır ✅' : 'Yemek Tutarının Ödemesi Yapıldı ✅'}
              </h3>
              <p className="text-[#0367A6] mb-2">
                Lütfen {request.menuAmount} TL'lik QR kodu oluşturup ekran görüntüsünü yükleyiniz.
              </p>
              <p className="text-sm text-[#3F9BBF]">
                QR kod {request.userName} ile paylaşılacak
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#0367A6] flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[#0367A6] space-y-2 leading-relaxed">
                    <p><strong>QR Kod Nasıl Oluşturulur?</strong></p>
                    <ol className="list-decimal list-inside space-y-1 text-xs">
                      <li>Banka uygulamanızı açın</li>
                      <li>"Para Gönder" veya "QR ile Öde" bölümüne gidin</li>
                      <li>{request.menuAmount} ₺ tutarında QR kod oluşturun</li>
                      <li>Ekran görüntüsünü alın ve buraya yükleyin</li>
                    </ol>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="qr-upload" className="text-[#012840] mb-2 block">
                  QR Kod Ekran Görüntüsü
                </Label>
                <Input
                  id="qr-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="mb-2"
                />
                {qrImage && (
                  <p className="text-sm text-emerald-600 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    {qrImage.name}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-[#0367A6] to-[#012840] hover:from-[#012840] hover:to-[#0367A6]"
                  disabled={!qrImage}
                  onClick={handleQRUpload}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  QR Kodu Yükle
                </Button>
                
                <Button
                  variant="ghost"
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleCancelDonation}
                >
                  İşlemi İptal Et
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // QR Yüklendi - Ödeme Bekleniyor
  if (request.status === 'qr_uploaded') {
    const progressPercentage = (countdown / 300) * 100;
    const isExpiringSoon = countdown <= 60;
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
        <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('donor-list')}
              className="text-white hover:bg-white/10 mb-4 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
            <h1 className="text-white">QR Beklemede</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
          {renderTracking('qr_uploaded', request.isFullSupport || false)}
          
          {/* Countdown Timer Card */}
          <Card className={`p-6 border-2 shadow-lg mb-4 ${isExpiringSoon ? 'bg-red-50 border-red-300 animate-pulse' : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'}`}>
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
                    className={`transition-all duration-1000 ${isExpiringSoon ? 'text-red-500' : 'text-amber-500'}`}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Timer in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className={`text-4xl font-bold ${isExpiringSoon ? 'text-red-600' : 'text-amber-600'}`}>
                      {formatTime(countdown)}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">kalan süre</div>
                  </div>
                </div>
              </div>
              
              <h3 className={`mb-2 ${isExpiringSoon ? 'text-red-700' : 'text-[#012840]'}`}>
                📷 QR Yüklendi
              </h3>
              <p className={`text-sm ${isExpiringSoon ? 'text-red-600 font-medium' : 'text-[#0367A6]'}`}>
                {isExpiringSoon ? '⚠️ Süre bitiyor!' : `${request.userName} QR kodu kullanarak ödeme yapıyor...`}
              </p>
            </div>
          </Card>

          {/* Details Card */}
          <Card className="p-6 border-0 shadow-lg">
            <div className="space-y-3 mb-6">
              <div className="p-4 bg-[#C9E2F2]/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#0367A6]">QR Tutarı:</span>
                  <span className="text-[#012840]">{request.menuAmount} ₺</span>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl">
                <div className="flex items-start gap-3">
                  {request.isFullSupport ? (
                    <Heart className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm text-amber-900 leading-relaxed">
                    {request.userName} restoran POS cihazından ödemeyi yaptıktan sonra işlem tamamlanacak.
                  </p>
                </div>
              </div>
            </div>
            
            <Button
              variant="ghost"
              className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 mt-4"
              onClick={handleCancelDonation}
            >
              İşlemi İptal Et
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  // Ödeme Onaylandı - Transfer Ediliyor
  if (request.status === 'payment_confirmed') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white">İşlem Tamamlanıyor...</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
          {renderTracking('payment_confirmed', request.isFullSupport || false)}
          
          <Card className="p-8 border-0 shadow-lg text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CreditCard className="w-10 h-10 text-white" />
            </div>
            
            <h3 className="text-[#012840] mb-2">✅ Onaylandı</h3>
            <p className="text-[#0367A6] mb-6">
              {request.userName} ödemenin yapıldığını onayladı!
              <br />
              <strong>💰 Tutar hesabınıza iletiliyor...</strong>
            </p>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-900 leading-relaxed">
                  Gerçek uygulamada banka hesabınıza transfer yapılacak.
                  <br />
                  Demo için 2 saniye sonra otomatik tamamlanacak...
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Tamamlandı
  if (request.status === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white">Destek Tamamlandı</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
          {renderTracking('completed', request.isFullSupport || false)}
          
          <Card className="p-8 border-0 shadow-lg text-center bg-gradient-to-br from-emerald-50 to-white">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            
            {request.isFullSupport ? (
              <>
                <h2 className="text-[#012840] mb-3">Destek Tamamlandı 💛</h2>
                <p className="text-[#0367A6] mb-6 leading-relaxed">
                  {request.userName} için tam destek sağladınız! Profilinizde Altın Kalp ❤️ rozeti kazandınız.
                </p>
                <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl mb-6 border-2 border-amber-200">
                  <div className="text-6xl mb-3">❤️</div>
                  <h3 className="text-amber-900 mb-2">Altın Kalp Kazandın!</h3>
                  <p className="text-sm text-amber-700">
                    %100 destek verdiğin her kişi için bu rozet artacak
                  </p>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-[#012840] mb-3">Destek Tamamlandı 💛</h2>
                <p className="text-[#0367A6] mb-6 leading-relaxed">
                  {request.userName} için yemek desteği başarıyla tamamlandı. Teşekkürler!
                </p>
              </>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onNavigate('food-donation-home')}
              >
                Yemek Bağışı
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-[#0367A6] to-[#012840] hover:from-[#012840] hover:to-[#0367A6]"
                onClick={() => onNavigate('home')}
              >
                Ana Sayfa
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Request bulunamadı veya yükleniyor
  if (!requestId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
        <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('donor-list')}
              className="text-white hover:bg-white/10 mb-4 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Geri
            </Button>
            <h1 className="text-white">Talep Bulunamadı</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
          <Card className="p-8 text-center border-0 shadow-md">
            <AlertCircle className="w-16 h-16 mx-auto mb-4 text-amber-500" />
            <h3 className="text-[#012840] mb-2">Talep Bulunamadı</h3>
            <p className="text-[#0367A6] mb-6">
              Aradığınız talep bulunamadı veya silinmiş olabilir.
            </p>
            <Button
              className="bg-gradient-to-r from-[#0367A6] to-[#012840] hover:from-[#012840] hover:to-[#0367A6]"
              onClick={() => onNavigate('donor-list')}
            >
              Taleplere Dön
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
        <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-white">Yükleniyor...</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
          <Card className="p-8 text-center border-0 shadow-md">
            <div className="w-12 h-12 rounded-full border-4 border-[#0367A6] border-t-transparent animate-spin mx-auto mb-4"></div>
            <p className="text-[#0367A6]">Talep yükleniyor...</p>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
