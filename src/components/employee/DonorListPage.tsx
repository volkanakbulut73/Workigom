import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heart, UtensilsCrossed, ArrowLeft, Clock, MapPin, CircleDot } from "lucide-react";
import { FoodDonationRequest } from "../../lib/mockData";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface DonorListPageProps {
  onNavigate: (page: string, requestId?: string) => void;
  currentUserId: string;
}

export function DonorListPage({ onNavigate, currentUserId }: DonorListPageProps) {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [selectedRate, setSelectedRate] = useState<20 | 100>(20);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [requests, setRequests] = useState<FoodDonationRequest[]>([]);
  const [onlineDonors, setOnlineDonors] = useState(0);

  // İlk yükleme
  useEffect(() => {
    // Aktif donation kontrolü - varsa detay sayfasına yönlendir
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const activeDonations = JSON.parse(localStorage.getItem('activeDonations') || '{}');
    const myActiveDonation = activeDonations[currentUserId] || activeDonations[currentUser.id];
    
    if (myActiveDonation) {
      // Aktif donation var - talebin durumunu kontrol et
      const allRequests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
      const activeRequest = allRequests.find((r: FoodDonationRequest) => r.id === myActiveDonation);
      
      if (activeRequest && activeRequest.status !== 'completed' && activeRequest.status !== 'cancelled') {
        // Henüz tamamlanmamış aktif donation var - detay sayfasına yönlendir
        onNavigate('donation-detail', myActiveDonation);
        return;
      } else if (activeRequest && activeRequest.status === 'completed') {
        // Tamamlanmış - aktif donation'ı temizle
        delete activeDonations[currentUserId];
        delete activeDonations[currentUser.id];
        localStorage.setItem('activeDonations', JSON.stringify(activeDonations));
      }
    }

    const loadRequests = () => {
      const stored = localStorage.getItem('foodDonationRequests');
      if (stored) {
        setRequests(JSON.parse(stored));
      } else {
        // Mock data yerine boş array ile başlat
        localStorage.setItem('foodDonationRequests', JSON.stringify([]));
        setRequests([]);
      }
    };

    loadRequests();

    // Online bağışçı sayısını random olarak ayarla (gerçek bir sistemde API'den gelecek)
    const updateOnlineDonors = () => {
      const randomCount = Math.floor(Math.random() * 50) + 100; // 100-150 arası
      setOnlineDonors(randomCount);
    };
    
    updateOnlineDonors();

    // Her 2 saniyede bir yeni talepleri kontrol et
    const pollInterval = setInterval(() => {
      loadRequests();
      updateOnlineDonors();
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [currentUserId, onNavigate]);

  // Sadece bekleyen talepleri göster
  // NOT: Demo ortamı için tüm bekleyen talepler gösteriliyor (kendi talebin dahil)
  // Gerçek üretimde: r.status === 'waiting' && r.userId !== currentUserId
  const waitingRequests = requests.filter(r => r.status === 'waiting');
  
  // Debug: Talepleri console'a yazdır
  useEffect(() => {
    console.log('📋 Toplam talep sayısı:', requests.length);
    console.log('⏳ Bekleyen talepler (waiting):', requests.filter(r => r.status === 'waiting').length);
    console.log('👤 Mevcut kullanıcı ID:', currentUserId);
    console.log('✅ Gösterilen talepler:', waitingRequests.length);
    if (waitingRequests.length > 0) {
      console.log('📦 Talep detayları:', waitingRequests);
    }
  }, [requests, waitingRequests, currentUserId]);
  
  const currentRequest = waitingRequests.find(r => r.id === selectedRequest);

  const handleSupportClick = (requestId: string) => {
    setSelectedRequest(requestId);
    setShowConfirmDialog(true);
  };

  const handleConfirmSupport = () => {
    if (!currentRequest) return;

    // Gerçek bağışçı bilgilerini localStorage'dan al
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const donorId = currentUserId || currentUser.id || 'DONOR001';
    const donorName = currentUser.name || 'Bağışçı';
    const donorInitials = donorName
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    // İsteği güncelle - İLK OLARAK donor_matched yapıyoruz!
    const allRequests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
    const updatedRequests = allRequests.map((req: any) => {
      if (req.id === selectedRequest) {
        return {
          ...req,
          status: 'donor_matched', // Her iki durumda da önce matched olmalı!
          donorId,
          donorName,
          donorInitials,
          supportRate: selectedRate,
          isFullSupport: selectedRate === 100,
          matchedAt: new Date().toISOString()
        };
      }
      return req;
    });
    localStorage.setItem('foodDonationRequests', JSON.stringify(updatedRequests));

    // Bildirim oluştur - Destek arayan kişiye
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    
    if (selectedRate === 100) {
      // %100 destek bildirimi
      notifications.unshift({
        id: Date.now().toString(),
        userId: currentRequest.userId,
        type: 'food_donation',
        title: '💛 Tam Destek!',
        message: `${donorName} yemeğine "Buda Benden" diyerek tamamına destek olmak istiyor 💛\nÖdeme yapmayacaksınız, 5 dk içinde QR ekranınızda olacak.`,
        timestamp: new Date().toISOString(),
        read: false,
        requestId: selectedRequest
      });
    } else {
      // %20 destek bildirimi
      notifications.unshift({
        id: Date.now().toString(),
        userId: currentRequest.userId,
        type: 'food_donation',
        title: '💛 Destek Var!',
        message: `${donorName} yemeğine destek olmak istiyor 💛\nŞimdi ödeme ekranına yönlendiriliyorsunuz, 5 dk içinde QR ekranınızda olacak.`,
        timestamp: new Date().toISOString(),
        read: false,
        requestId: selectedRequest
      });
    }
    localStorage.setItem('notifications', JSON.stringify(notifications));

    // Bağışçının aktif donation'ını kaydet
    const activeDonations = JSON.parse(localStorage.getItem('activeDonations') || '{}');
    activeDonations[donorId] = selectedRequest;
    localStorage.setItem('activeDonations', JSON.stringify(activeDonations));

    setShowConfirmDialog(false);
    
    // Detay sayfasına git
    onNavigate('donation-detail', selectedRequest!);
  };

  const calculateSupport = (menuAmount: number, rate: 20 | 100) => {
    if (rate === 100) {
      return {
        yourContribution: menuAmount,
        platformFee: 0,
        totalPayment: 0, // No payment for 100% support
        receiverPayAmount: 0,
        transferToYou: 0,
        feeMessage: "Platform ücreti: %0 - Buda Bizden olsun 😊"
      };
    } else {
      const contribution = menuAmount * 0.20;
      const platformFee = menuAmount * 0.05;
      const receiverPayAmount = menuAmount - contribution; // 800 TL
      const transferToYou = receiverPayAmount - platformFee; // 750 TL
      return {
        yourContribution: contribution, // 200 TL
        platformFee: platformFee, // 50 TL
        totalPayment: contribution + platformFee, // 250 TL
        receiverPayAmount: receiverPayAmount, // 800 TL
        transferToYou: transferToYou, // 750 TL
        feeMessage: "Platform ücreti: %5"
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
      {/* Header */}
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
          <div className="flex items-center gap-3 mb-3">
            <Heart className="w-6 h-6" />
            <h1 className="text-white">Destek Bekleyen Kişiler</h1>
          </div>
          
          {onlineDonors > 0 && (
            <div className="mb-3 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center animate-pulse flex-shrink-0">
                  <CircleDot className="w-5 h-5 text-white fill-white" />
                </div>
                <div className="flex-1">
                  <div className="text-white font-medium">{onlineDonors} Bağışçı Online</div>
                  <div className="text-white/70 text-sm">Destek vermek için bekliyor 💛</div>
                </div>
                <Badge className="bg-green-500 text-white border-0 px-3 py-1">
                  Aktif
                </Badge>
              </div>
            </div>
          )}
          
          <p className="text-white/80 text-sm">
            Destek elini uzat, bir fark yarat
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
        {/* Request List */}
        <div className="space-y-3">
          {waitingRequests.map((request) => (
            <Card 
              key={request.id}
              className="p-4 border-0 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0367A6] to-[#012840] flex items-center justify-center text-white flex-shrink-0">
                  <span>{request.userInitials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-[#012840]">{request.userName}</h4>
                    <Badge className="bg-amber-100 text-amber-700 border-0 flex-shrink-0">
                      Destek Bekliyor
                    </Badge>
                  </div>
                  <p className="text-sm text-[#0367A6] mb-2">{request.description}</p>
                  <div className="flex items-center gap-2 text-xs text-[#3F9BBF]">
                    <Clock className="w-3 h-3" />
                    <span>{request.postedAt}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between py-2 px-3 bg-[#C9E2F2]/20 rounded-lg">
                  <span className="text-sm text-[#0367A6]">Menü tutarı:</span>
                  <span className="text-[#012840]">{request.menuAmount} ₺</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-emerald-50 rounded-lg">
                  <span className="text-sm text-emerald-700">Min. destek oranı:</span>
                  <span className="text-emerald-700">%{request.minSupportRate}</span>
                </div>
                <div className="flex items-center justify-between py-2 px-3 bg-blue-50 rounded-lg">
                  <span className="text-sm text-blue-700">Kişi ödeyecek:</span>
                  <span className="text-blue-700">{request.userPayAmount} ₺</span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md"
                onClick={() => handleSupportClick(request.id)}
              >
                <Heart className="w-4 h-4 mr-2" />
                🍽️ Destek Ol
              </Button>
            </Card>
          ))}
        </div>

        {waitingRequests.length === 0 && (
          <Card className="p-12 text-center border-0 shadow-md">
            <UtensilsCrossed className="w-16 h-16 mx-auto mb-4 text-[#C9E2F2]" />
            <h3 className="text-[#012840] mb-2">Şu anda destek bekleyen yok</h3>
            <p className="text-[#0367A6]">Yeni talepler geldiğinde burada görünecek</p>
          </Card>
        )}
      </div>

      {/* Confirm Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#012840]">Destek Seçimi</DialogTitle>
            <DialogDescription className="text-[#0367A6]">
              {currentRequest?.userName} için destek oranını seçin
            </DialogDescription>
          </DialogHeader>

          {currentRequest && (
            <div className="space-y-4">
              {/* Support Rate Selection */}
              <div className="space-y-3">
                <button
                  onClick={() => setSelectedRate(20)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    selectedRate === 20
                      ? 'border-[#0367A6] bg-[#C9E2F2]/20'
                      : 'border-[#C9E2F2] hover:border-[#3F9BBF]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#012840]">%20 Destek</span>
                    <Badge className="bg-[#0367A6] text-white border-0">Standart</Badge>
                  </div>
                  <div className="text-sm space-y-2">
                    <div className="flex items-center justify-between text-[#0367A6]">
                      <span>Senin katkın:</span>
                      <span>{calculateSupport(currentRequest.menuAmount, 20).yourContribution} ₺</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#3F9BBF]">
                      <span>{calculateSupport(currentRequest.menuAmount, 20).feeMessage}</span>
                      <span>{calculateSupport(currentRequest.menuAmount, 20).platformFee} ₺</span>
                    </div>
                    <div className="h-px bg-[#C9E2F2]"></div>
                    <div className="flex items-center justify-between text-[#012840]">
                      <span>Toplam ödeyeceğin:</span>
                      <span>{calculateSupport(currentRequest.menuAmount, 20).totalPayment} ₺</span>
                    </div>
                    <div className="mt-3 p-2 bg-emerald-50 rounded-lg">
                      <div className="flex items-center justify-between text-emerald-700">
                        <span className="text-xs">Hesabına aktarılacak:</span>
                        <span>{calculateSupport(currentRequest.menuAmount, 20).transferToYou} ₺</span>
                      </div>
                      <p className="text-xs text-emerald-600 mt-1">
                        Destek alan {calculateSupport(currentRequest.menuAmount, 20).receiverPayAmount} ₺ ödeyecek
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedRate(100)}
                  className={`w-full p-4 rounded-xl border-2 transition-all ${
                    selectedRate === 100
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-[#C9E2F2] hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#012840]">%100 Buda Benden ❤️</span>
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                      Altın Kalp
                    </Badge>
                  </div>
                  <div className="text-sm space-y-2">
                    <div className="flex items-center justify-between text-[#0367A6]">
                      <span>Senin katkın:</span>
                      <span>{calculateSupport(currentRequest.menuAmount, 100).yourContribution} ₺</span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#3F9BBF]">
                      <span>{calculateSupport(currentRequest.menuAmount, 100).feeMessage}</span>
                    </div>
                    <div className="mt-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                      <p className="text-xs text-amber-800 leading-relaxed mb-2">
                        Yemek ücretinin tamamını ödemeyi kabul ettiniz.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-amber-700">Hesabınıza aktarılacak tutar:</span>
                        <span className="text-amber-900">0 ₺</span>
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowConfirmDialog(false)}
                >
                  İptal
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-[#0367A6] to-[#012840] hover:from-[#012840] hover:to-[#0367A6]"
                  onClick={handleConfirmSupport}
                >
                  Devam Et
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
