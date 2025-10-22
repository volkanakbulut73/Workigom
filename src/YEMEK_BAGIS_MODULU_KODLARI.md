# 🍽️ Workigom Yemek Bağış Modülü - Tasarım Kodları

## 📋 İçindekiler
1. [Ana Sayfa - FoodDonationHome](#1-ana-sayfa---fooddonationhome)
2. [Bağışçı Listesi - DonorListPage](#2-bağışçı-listesi---donorlistpage)
3. [Yemeğine Destek Bul - FindSupportPage](#3-yemeğine-destek-bul---findsupportpage)
4. [Bağış Detay Sayfası - DonationDetailPage](#4-bağış-detay-sayfası---donationdetailpage)
5. [Mock Data](#5-mock-data)
6. [Renk Paleti](#6-renk-paleti)
7. [Özellikler ve İş Akışı](#7-özellikler-ve-iş-akışı)

---

## 1. Ana Sayfa - FoodDonationHome

**Dosya:** `/components/employee/FoodDonationHome.tsx`

```tsx
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Heart, UtensilsCrossed, Users, Gift, ArrowLeft } from "lucide-react";

interface FoodDonationHomeProps {
  onNavigate: (page: string) => void;
}

export function FoodDonationHome({ onNavigate }: FoodDonationHomeProps) {
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
              <h1 className="text-white">Birlikte Paylaşıyoruz 🍽️</h1>
              <p className="text-white/80 text-sm">Dilersen birine destek ol, dilersen desteğini bul!</p>
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
            <div className="text-sm text-[#0367A6]">Destek Olduğun Kişi</div>
            <div className="text-xs text-[#3F9BBF] mt-1">Bu ay</div>
          </Card>

          <Card className="p-4 border-0 shadow-md bg-gradient-to-br from-emerald-50 to-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="text-3xl font-semibold text-[#012840] mb-1">3</div>
            <div className="text-sm text-[#0367A6]">Sana Destek Olan Kişi</div>
            <div className="text-xs text-[#3F9BBF] mt-1">Bu ay</div>
          </Card>
        </div>

        {/* Main Actions */}
        <div className="space-y-4">
          <Card 
            className="p-6 border-0 shadow-lg bg-gradient-to-br from-amber-50 via-white to-orange-50 cursor-pointer hover:shadow-xl transition-all duration-300"
            onClick={() => onNavigate('donor-list')}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[#012840] mb-2">💛 Yemek Bağışçısı Ol</h3>
                <p className="text-sm text-[#0367A6] mb-3 leading-relaxed">
                  İlanları gör, destek bekleyen kişilere yardım et. Birlikte güzel şeyler başarabiliriz!
                </p>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#3F9BBF]" />
                  <span className="text-sm text-[#3F9BBF]">4 kişi destek bekliyor</span>
                </div>
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 via-white to-cyan-50 cursor-pointer hover:shadow-xl transition-all duration-300"
            onClick={() => onNavigate('find-support')}
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0367A6] to-[#012840] flex items-center justify-center flex-shrink-0 shadow-lg">
                <UtensilsCrossed className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-[#012840] mb-2">🎓 Yemeğine Destek Bul</h3>
                <p className="text-sm text-[#0367A6] mb-3 leading-relaxed">
                  Yeni ilan oluştur, destek bekle. İhtiyacın olduğunda yanında olalım!
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
                Yemek Bağışı sistemi ile ihtiyaç sahipleri ve bağışçılar bir araya geliyor. 
                Minimum %20 destek ile başlayabilir, %100 destek ile tam karşılayabilirsiniz. 
                QR kod sistemi ile güvenli ve hızlı ödeme yapabilirsiniz.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
```

---

## 2. Bağışçı Listesi - DonorListPage

**Dosya:** `/components/employee/DonorListPage.tsx`

```tsx
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Heart, UtensilsCrossed, ArrowLeft, Clock, MapPin } from "lucide-react";
import { mockFoodDonationRequests } from "../../lib/mockData";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface DonorListPageProps {
  onNavigate: (page: string, requestId?: string) => void;
}

export function DonorListPage({ onNavigate }: DonorListPageProps) {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [selectedRate, setSelectedRate] = useState<20 | 100>(20);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const waitingRequests = mockFoodDonationRequests.filter(r => r.status === 'waiting');
  const currentRequest = waitingRequests.find(r => r.id === selectedRequest);

  const handleSupportClick = (requestId: string) => {
    setSelectedRequest(requestId);
    setShowConfirmDialog(true);
  };

  const handleConfirmSupport = () => {
    setShowConfirmDialog(false);
    // Navigate to donation detail page with the request
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
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6" />
            <h1 className="text-white">Destek Bekleyen Kişiler</h1>
          </div>
          <p className="text-white/80 text-sm">Yardım elini uzat, bir fark yarat 💛</p>
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
                  className={\`w-full p-4 rounded-xl border-2 transition-all \${
                    selectedRate === 20
                      ? 'border-[#0367A6] bg-[#C9E2F2]/20'
                      : 'border-[#C9E2F2] hover:border-[#3F9BBF]'
                  }\`}
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
                  className={\`w-full p-4 rounded-xl border-2 transition-all \${
                    selectedRate === 100
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-[#C9E2F2] hover:border-amber-300'
                  }\`}
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
```

---

## 3. Yemeğine Destek Bul - FindSupportPage

**Dosya:** `/components/employee/FindSupportPage.tsx`

```tsx
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { UtensilsCrossed, ArrowLeft, Info, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/badge";

interface FindSupportPageProps {
  onNavigate: (page: string) => void;
}

export function FindSupportPage({ onNavigate }: FindSupportPageProps) {
  const [menuAmount, setMenuAmount] = useState<string>('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateAmounts = (amount: number) => {
    const minSupportRate = 20;
    const supportAmount = amount * (minSupportRate / 100);
    const userPayAmount = amount - supportAmount;
    return {
      supportAmount,
      userPayAmount,
      minSupportRate
    };
  };

  const amounts = menuAmount ? calculateAmounts(parseFloat(menuAmount)) : null;

  const handleSubmit = () => {
    if (!menuAmount || parseFloat(menuAmount) < 100) return;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#C9E2F2]/30 to-white pb-20 lg:pb-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#012840] to-[#0367A6] text-white p-4 lg:p-6 rounded-b-3xl lg:rounded-none">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6" />
              <h1 className="text-white">İlan Oluşturuldu</h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
          <Card className="p-8 border-0 shadow-lg text-center bg-gradient-to-br from-emerald-50 to-white">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-[#012840] mb-3">İlanın Yayınlandı! 🎉</h2>
            <p className="text-[#0367A6] mb-6 leading-relaxed">
              Yemek desteği talebiniz başarıyla oluşturuldu. Bağışçılar talebinizi görebilir ve 
              destek olabilir.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between py-3 px-4 bg-white rounded-lg shadow-sm">
                <span className="text-sm text-[#0367A6]">Menü Tutarı:</span>
                <span className="text-[#012840]">{menuAmount} ₺</span>
              </div>
              <div className="flex items-center justify-between py-3 px-4 bg-white rounded-lg shadow-sm">
                <span className="text-sm text-[#0367A6]">Senin Ödeyeceğin:</span>
                <span className="text-[#012840]">{amounts?.userPayAmount} ₺</span>
              </div>
              <Badge className="bg-amber-100 text-amber-700 border-0 text-sm py-2 px-4">
                ⏳ Destek Bekleniyor
              </Badge>
            </div>

            <div className="bg-blue-50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#0367A6] flex-shrink-0 mt-0.5" />
                <p className="text-sm text-[#0367A6] text-left leading-relaxed">
                  Bir bağışçı bulunduğunda bildirim alacaksın ve ödeme yapman için yönlendirileceksin.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onNavigate('food-donation-home')}
              >
                Ana Sayfaya Dön
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-[#0367A6] to-[#012840] hover:from-[#012840] hover:to-[#0367A6]"
                onClick={() => onNavigate('home')}
              >
                Tamam
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center gap-3 mb-2">
            <UtensilsCrossed className="w-6 h-6" />
            <h1 className="text-white">Yemeğine Destek Bul</h1>
          </div>
          <p className="text-white/80 text-sm">Yeni ilan oluştur, destek bekle 🎓</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 lg:px-6 mt-4">
        <Card className="p-6 border-0 shadow-lg">
          <div className="space-y-6">
            {/* Name Field */}
            <div>
              <Label htmlFor="name" className="text-[#012840]">Ad Soyad</Label>
              <Input
                id="name"
                value="Volkan A."
                disabled
                className="mt-2 bg-[#C9E2F2]/20 text-[#0367A6]"
              />
              <p className="text-xs text-[#3F9BBF] mt-1">
                Gizlilik için sadece ilk harf gösterilir
              </p>
            </div>

            {/* Menu Amount */}
            <div>
              <Label htmlFor="amount" className="text-[#012840]">
                Menü Tutarı <span className="text-red-500">*</span>
              </Label>
              <div className="relative mt-2">
                <Input
                  id="amount"
                  type="number"
                  placeholder="Örn: 1000"
                  value={menuAmount}
                  onChange={(e) => setMenuAmount(e.target.value)}
                  className="pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0367A6]">
                  ₺
                </span>
              </div>
            </div>

            {/* Calculation Display */}
            {amounts && (
              <div className="space-y-3 p-4 bg-gradient-to-br from-[#C9E2F2]/20 to-blue-50 rounded-xl">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#0367A6]">Min. destek oranı:</span>
                  <Badge className="bg-emerald-500 text-white border-0">
                    %{amounts.minSupportRate}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#0367A6]">Beklenen destek:</span>
                  <span className="text-emerald-600">{amounts.supportAmount} ₺</span>
                </div>
                <div className="h-px bg-[#C9E2F2]"></div>
                <div className="flex items-center justify-between">
                  <span className="text-[#012840]">Senin ödeyeceğin:</span>
                  <span className="text-[#012840]">{amounts.userPayAmount} ₺</span>
                </div>
              </div>
            )}

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-[#012840]">
                Açıklama (İsteğe Bağlı)
              </Label>
              <Textarea
                id="description"
                placeholder="Yemek talebiniz hakkında kısa bir açıklama yazabilirsiniz..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 min-h-24"
              />
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#0367A6] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-[#0367A6] space-y-2 leading-relaxed">
                  <p>
                    <strong>Yardım talebin ilan olarak yayınlanacaktır.</strong>
                  </p>
                  <p>
                    Bağışçı bulunduğunda ödeme için yönlendirileceksin.
                  </p>
                  <p className="text-xs text-[#3F9BBF]">
                    Minimum destek oranı %20'dir. Bazı bağışçılar %100 destek de verebilir.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              className="w-full bg-gradient-to-r from-[#0367A6] to-[#012840] hover:from-[#012840] hover:to-[#0367A6] text-white shadow-md"
              disabled={!menuAmount || parseFloat(menuAmount) < 100}
              onClick={handleSubmit}
            >
              <UtensilsCrossed className="w-4 h-4 mr-2" />
              İlanı Paylaş
            </Button>

            {menuAmount && parseFloat(menuAmount) < 100 && (
              <p className="text-xs text-red-500 text-center">
                Minimum tutar 100 ₺ olmalıdır
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
```

---

## 4. Bağış Detay Sayfası - DonationDetailPage

**Dosya:** `/components/employee/DonationDetailPage.tsx`

**Not:** Bu dosya 450+ satır olduğu için ana özellikleri ve adımları özetleyeceğim:

### Özellikler:
- **5 Adımlı İşlem Akışı:**
  1. `confirm` - Destek Onayı
  2. `payment` - Ödeme İşlemi (sadece %20 destek için)
  3. `qr-upload` - QR Kod Yükleme
  4. `qr-pending` - QR Beklemede (5 dakika geri sayım)
  5. `completed` - Destek Tamamlandı

### Hesaplama Mantığı:
```typescript
// %20 Destek için:
- Bağışçı katkısı: 200 TL (1000 TL'nin %20'si)
- Platform ücreti: 50 TL (1000 TL'nin %5'i)
- Bağışçı ödeyecek: 250 TL
- Hesaba aktarılacak: 750 TL
- Destek alan ödeyecek: 800 TL

// %100 Destek için:
- Bağışçı katkısı: 1000 TL
- Platform ücreti: 0 TL (Buda bizden!)
- Bağışçı ödeyecek: 0 TL
- Hesaba aktarılacak: 0 TL
- Destek alan ödeyecek: 0 TL
- ✨ Altın Kalp rozeti kazanır!
```

Tam kod için `/components/employee/DonationDetailPage.tsx` dosyasına bakınız.

---

## 5. Mock Data

**Dosya:** `/lib/mockData.ts`

```typescript
// Food Donation Types
export interface FoodDonationRequest {
  id: string;
  userName: string;
  userInitials: string;
  menuAmount: number;
  minSupportRate: number;
  userPayAmount: number;
  description: string;
  status: 'waiting' | 'matched' | 'payment_pending' | 'qr_pending' | 'qr_uploaded' | 'completed';
  postedAt: string;
  donorId?: string;
  donorName?: string;
  supportRate?: number;
  isFullSupport?: boolean;
  qrImageUrl?: string;
  qrExpiresAt?: Date;
}

export const mockFoodDonationRequests: FoodDonationRequest[] = [
  {
    id: '1',
    userName: 'Ahmet Y.',
    userInitials: 'AY',
    menuAmount: 1000,
    minSupportRate: 20,
    userPayAmount: 800,
    description: 'Yaklaşık 1000 TL tutarında yemek yiyeceğim',
    status: 'waiting',
    postedAt: '2 saat önce'
  },
  {
    id: '2',
    userName: 'Zeynep K.',
    userInitials: 'ZK',
    menuAmount: 750,
    minSupportRate: 20,
    userPayAmount: 600,
    description: 'Ailece yemek için destek bekliyorum',
    status: 'waiting',
    postedAt: '5 saat önce'
  },
  {
    id: '3',
    userName: 'Mehmet D.',
    userInitials: 'MD',
    menuAmount: 500,
    minSupportRate: 20,
    userPayAmount: 400,
    description: 'Öğle yemeği için destek',
    status: 'waiting',
    postedAt: '1 gün önce'
  },
  {
    id: '4',
    userName: 'Ayşe T.',
    userInitials: 'AT',
    menuAmount: 1200,
    minSupportRate: 20,
    userPayAmount: 960,
    description: 'Özel gün yemeği için destek arıyorum',
    status: 'waiting',
    postedAt: '3 saat önce'
  }
];
```

---

## 6. Renk Paleti

Workigom uygulaması için kullanılan ana renkler:

```css
/* Ana Mavi Tonları */
--primary-dark: #012840    /* Koyu mavi - header, başlıklar */
--primary: #0367A6         /* Ana mavi - butonlar, aktif durumlar */
--primary-light: #3F9BBF   /* Açık mavi - hover, ikincil öğeler */
--primary-pale: #C9E2F2    /* Çok açık mavi - arkaplanlar, border */

/* Yemek Bağışı Özel Renkleri */
--amber-500: #F59E0B       /* Bağışçı butonları */
--orange-500: #F97316      /* Gradient efektleri */
--emerald-500: #10B981     /* Başarı mesajları */
--pink-500: #EC4899        /* İstatistik kartları */
```

---

## 7. Özellikler ve İş Akışı

### 🎯 Ana Özellikler

1. **İki Taraflı Sistem:**
   - 💛 Bağışçı Ol: Başkalarına destek ver
   - 🎓 Destek Bul: Yardım talebi oluştur

2. **Destek Oranları:**
   - **%20 Standart Destek:** Minimum destek oranı
   - **%100 Altın Kalp:** Tam destek (platform ücreti yok!)

3. **QR Kod Sistemi:**
   - Bağışçı QR kod oluşturur
   - Destek alan QR kodu kullanır
   - 5 dakikalık geçerlilik süresi

4. **Platform Ücretleri:**
   - %20 destek: %5 platform ücreti
   - %100 destek: %0 ücret (Buda bizden!)

### 📱 İş Akışı

#### Bağışçı Perspektifi:
1. Yemek Bağışı ana sayfasına gir
2. "Yemek Bağışçısı Ol" kartına tıkla
3. Destek bekleyen kişileri gör
4. Destek oranını seç (%20 veya %100)
5. Ödeme yap (sadece %20 için)
6. QR kod oluştur ve yükle
7. Destek tamamlandı!

#### Destek Alan Perspektifi:
1. "Yemeğine Destek Bul" kartına tıkla
2. Menü tutarını gir
3. Açıklama ekle (opsiyonel)
4. İlanı paylaş
5. Bağışçı bul
6. QR kodu kullanarak öde
7. Teşekkür et!

### 🏆 Gamification

- **Altın Kalp Rozeti:** %100 destek verenlere
- **İstatistikler:** Aylık destek sayıları
- **Başarı Mesajları:** Her adımda motivasyon

---

## 📦 Gerekli Bağımlılıklar

```json
{
  "dependencies": {
    "lucide-react": "latest",
    "@radix-ui/react-dialog": "latest",
    "tailwindcss": "^4.0.0"
  }
}
```

---

## 🚀 Kurulum ve Kullanım

### 1. Dosyaları Kopyala
Yukarıdaki tüm component dosyalarını ilgili klasörlere yerleştir.

### 2. Mock Data'yı Ekle
`/lib/mockData.ts` dosyasına yemek bağışı veri yapısını ekle.

### 3. Navigasyon Ekle
`App.tsx` içinde ilgili route'ları tanımla:

```typescript
case 'food-donation-home':
  return <FoodDonationHome onNavigate={handleNavigate} />;
case 'donor-list':
  return <DonorListPage onNavigate={handleNavigate} />;
case 'find-support':
  return <FindSupportPage onNavigate={handleNavigate} />;
case 'donation-detail':
  return <DonationDetailPage onNavigate={handleNavigate} requestId={selectedJobId} />;
```

### 4. Ana Sayfaya Link Ekle
Employee home'a yemek bağışı kartı ekle:

```tsx
<Card onClick={() => onNavigate('food-donation-home')}>
  <UtensilsCrossed />
  <h3>Yemek Bağışı</h3>
  <p>Birlikte paylaşalım</p>
</Card>
```

---

## 📝 Notlar

- Tüm tutarlar TL cinsinden
- Minimum ilan tutarı: 100 TL
- QR kod geçerlilik süresi: 5 dakika
- Platform ücreti hesaplama: Menü tutarının %5'i
- Gizlilik: Kullanıcı adları ilk harfle gösterilir

---

## 🎨 Tasarım Prensipleri

1. **Mobil Öncelikli:** Responsive tasarım
2. **Gradient Kullanımı:** Modern görünüm
3. **Card Bazlı Layout:** Temiz ve organize
4. **İkon Kullanımı:** Lucide React
5. **Renk Uyumu:** Workigom mavi paleti
6. **Animasyonlar:** Smooth transitions
7. **Feedback:** Her adımda kullanıcı bilgilendirmesi

---

**Oluşturulma Tarihi:** 19 Ekim 2025  
**Versiyon:** 1.0.0  
**Proje:** Workigom Yemek Bağış Modülü  
**Platform:** React + TypeScript + Tailwind CSS v4
