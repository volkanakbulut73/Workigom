# 🍽️ Workigom Menü Market Paylaşım Sistemi - Akış Dokümantasyonu

## 📋 Genel Bakış

Workigom Menü Market Paylaşım Sistemi, ihtiyaç sahibi kullanıcıların yemek masrafları için paylaşım talep etmelerini ve diğer kullanıcıların bu taleplere %20 veya %100 oranında paylaşım yapmalarını sağlayan kapsamlı bir sistemdir.

### 🎯 Temel Özellikler

- **İki Kullanıcı Rolü:** Paylaşımdan Yararlanan ve Destekçi
- **İki Paylaşım Oranı:** %20 (Kısmi Paylaşım) ve %100 "Buda Benden" (Tam Paylaşım)
- **QR Kod Sistemi:** Güvenli ödeme için 300 saniyelik QR kod
- **Altın Kalp Badge Sistemi:** Destekçileri ödüllendirme
- **Gerçek Zamanlı Bildirimler:** Tüm adımlarda anlık bilgilendirme
- **İşlem Takibi:** Her iki taraf için detaylı adım takibi

---

## 👥 Roller ve Sorumluluklar

### 🎓 Paylaşımdan Yararlanan (Beneficiary)
- Yemek masrafı için paylaşım talebi oluşturur
- Menü tutarını ve açıklamayı belirler
- Destekçi eşleşmesini bekler
- %20 paylaşımında kendi payını öder (%80)
- %100 paylaşımında ödeme yapmaz
- QR kod ile restoranda ödeme yapar
- Ödeme sonrası destekçiye teşekkür eder

### 💛 Destekçi (Supporter)
- Bekleyen paylaşım taleplerini görüntüler
- %20 veya %100 paylaşım oranını seçer
- %20 paylaşımında yararlanıcının ödemesini bekler
- QR kod oluşturur ve yükler
- Ödeme tamamlandığında bildirim alır
- Altın Kalp badge kazanır

---

## 🔄 DESTEK ARAYAN AKIŞI (Receiver Flow)

### 1️⃣ Ana Sayfa (FoodDonationHome)

**Dosya:** `/components/employee/FoodDonationHome.tsx`

**Gösterilen Bilgiler:**
- ✅ Destek olduğun kişi sayısı (bu ay)
- ✅ Sana destek olan kişi sayısı (bu ay)
- ✅ Online bağışçı sayısı (100-150 arası, gerçek zamanlı)
- ✅ Bekleyen talep sayısı
- ✅ Altın Kalp badge (varsa)

**Aksiyonlar:**
- 🔘 **"Yemek Bağışçısı Ol"** → DonorListPage'e yönlendir
  - Müsaitlik toggle butonu (online/offline)
  - Online bağışçılar kartı (büyütülmüş tasarım)
- 🔘 **"Yemeğine Destek Bul"** → FindSupportPage'e yönlendir

**LocalStorage Kullanımı:**
```javascript
// Kullanıcı bilgisi
localStorage.getItem('currentUser')

// Müsaitlik durumu
localStorage.getItem('donorAvailability')
localStorage.setItem('donorAvailability', JSON.stringify(true/false))

// Bekleyen talepler
localStorage.getItem('foodDonationRequests')

// Profil bilgileri (Altın Kalp)
localStorage.getItem('userProfiles')
```

---

### 2️⃣ Destek Talebi Oluşturma (FindSupportPage)

**Dosya:** `/components/employee/FindSupportPage.tsx`

#### **2.1 Form Adımı (step: 'form')**

**Görüntülenen Alanlar:**
- 📝 **Ad Soyad:** Otomatik doldurulur (Ahmet Y. formatı), disabled
- 💰 **Menü Tutarı:** 50-5000 TL arası
- 📄 **Açıklama:** Serbest metin alanı

**Hesaplama Gösterimi:**
```
Menü tutarı: 1000 ₺
Min. destek (%20): 200 ₺
Sen ödeyeceksin: 800 ₺
```

**Aksiyon:**
- 🔘 **"Destek Talebi Oluştur"** butonu
  - Validasyon: Tutar ≥ 50 TL ve açıklama dolu olmalı
  - LocalStorage'a yeni talep ekle (status: 'waiting')
  - Bildirim göster: "✅ Destek isteğiniz yayınlandı!"
  - 'waiting' adımına geç

**Oluşturulan Talep Objesi:**
```javascript
{
  id: Date.now().toString(),
  userId: "IND001",
  userName: "Ahmet Y.",
  userInitials: "AY",
  menuAmount: 1000,
  minSupportRate: 20,
  userPayAmount: 800,
  description: "Yaklaşık 1000 TL tutarında yemek yiyeceğim",
  status: 'waiting',
  postedAt: 'Şimdi'
}
```

---

#### **2.2 Bağışçı Bekleme Adımı (step: 'waiting')**

**Görünüm:**
- ⏳ Saat ikonu (animasyonlu)
- 📊 İşlem takibi (5 veya 6 adımlı)
- 💰 Menü tutarı ve ödeme miktarı
- 🔘 "Ana Sayfaya Dön" butonu
- 🔘 "İşlemi İptal Et" butonu (kırmızı)

**İşlem Takibi:**
```
Adımlar (6 adım - %20 destek):
1. ✓ Eşleşme
2. ⏳ Ödemeniz (mevcut)
3. ⬜ QR Hazırlama
4. ⬜ QR Yüklendi
5. ⬜ Ödeme Yapıldı
6. ⬜ Tamamlandı
```

**Polling (2 saniyede bir):**
- LocalStorage'dan güncel talebi kontrol et
- Status değişirse (waiting → donor_matched) otomatik adım geçişi
- Bildirim: "Bağışçı bulundu! {Bağışçı Adı} desteğini onayladı"

**İptal İşlemi:**
- Talebi localStorage'dan sil
- Eğer bağışçı varsa, ona bildirim gönder
- Ana sayfaya yönlendir

---

#### **2.3 Bağışçı Eşleşme Adımı (step: 'matched')**

**İki Senaryo Var:**

##### **Senaryo A: %20 Kısmi Destek**

**Görünüm:**
- ✅ Yeşil başarı ikonu
- 💛 "{Bağışçı Adı} yemeğine destek olmak istiyor"
- 📊 İşlem takibi
- 💰 Menü tutarı: 1000 ₺
- 💚 Bağışçının desteği: 200 ₺ (%20)
- 💙 Senin ödeyeceğin: 800 ₺

**Aksiyon:**
- 🔘 **"Ödeme Yap (800 ₺)"** butonu (mavi)
  - Status'u 'payment_pending' yap
  - Bağışçıya bildirim: "💳 Ödeme Başladı - {Kullanıcı Adı} ödemesini yapıyor"
  - 2 saniye sonra status'u 'qr_pending' yap
  - Toast: "✅ Ödeme yapıldı! Bağışçı QR kodu hazırlıyor"
  - Bağışçıya bildirim: "💳 Ödeme tamamlandı! QR kodu yükleyebilirsiniz"

##### **Senaryo B: %100 "Buda Benden" Tam Destek**

**Görünüm:**
- ✅ Yeşil başarı ikonu
- 💛 "{Bağışçı Adı} yemeğine \"Buda Benden\" diyerek tamamına destek olmak istiyor 💛"
- 📄 "Ödeme yapmayacaksınız, 5 dk içinde QR ekranınızda olacak."
- 💰 Menü tutarı: 1000 ₺
- 💚 Bağışçının desteği: 1000 ₺ (%100)
- ⏳ Bekleme mesajı: "Bağışçı şu anda QR kod hazırlıyor"

**Otomatik İşlem (3 saniye sonra):**
- Status'u 'qr_pending' yap
- Toast: "✨ Ödeme yapmanıza gerek yok! Bağışçı QR kodu hazırlıyor"
- QR bekleme ekranına geçiş YOK (polling ile status güncellenecek)

---

#### **2.4 QR Hazır Adımı (step: 'qr-ready')**

**Görünüm:**
- 🎉 "QR Kod Hazır!"
- 📱 QR kod görseli (büyük)
- ⏱️ **300 saniyelik countdown timer** (5:00 → 0:00)
- 📋 İşlem bilgileri
- 💰 Menü tutarı ve destek miktarları

**QR Kod Gösterimi:**
```jsx
{request.qrImageUrl && (
  <div className="mb-4">
    <img 
      src={request.qrImageUrl} 
      alt="QR Kod" 
      className="w-full max-w-sm mx-auto rounded-lg border-4 border-[#0367A6]"
    />
  </div>
)}
```

**Countdown Timer:**
```javascript
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Her saniyede güncelleme
useEffect(() => {
  const timer = setInterval(() => {
    // Kalan süreyi hesapla
    const remaining = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
    setCountdown(remaining);
    
    if (remaining <= 0) {
      toast.error('QR kod süresi doldu');
    }
  }, 1000);
  
  return () => clearInterval(timer);
}, []);
```

**Aksiyon:**
- 🔘 **"Ödeme Tamamlandı"** butonu (yeşil)
  - Status'u 'payment_confirmed' yap
  - %20 desteğinde: Bağışçıya bildirim gönder ve ana sayfaya dön
  - %100 desteğinde: 'payment-done' adımına geç (teşekkür ekranı)

**Bilgilendirme Kutusu:**
- 📄 "Restoranda kasaya QR kodu gösterin"
- ⏱️ "QR kod 5 dakika geçerlidir"
- 💡 "Ödeme sonrası 'Ödeme Tamamlandı' butonuna basın"

---

#### **2.5 Ödeme Tamamlandı Adımı (step: 'payment-done')**

**Sadece %100 Destek İçin!**

**Görünüm:**
- 🎉 "Ödeme Tamamlandı! Afiyet Olsun! 🎉"
- 💛 Başarı mesajı
- 📊 İşlem özeti

**Aksiyon:**
- 🔘 **"Teşekkür Et ❤️"** butonu (altın renk)
  - Status'u 'completed' yap
  - Bağışçıya bildirim: "💛 Destek Tamamlandı - {Kullanıcı Adı} desteğiniz için teşekkür etti ❤️"
  - Bağışçının Altın Kalp sayısını +1 artır
  - Toast: "❤️ Teşekkür gönderildi! Bağışçı Altın Kalp kazandı"
  - Ana sayfaya yönlendir

**Altın Kalp Verme İşlemi:**
```javascript
const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
if (!userProfiles[donorId]) {
  userProfiles[donorId] = {
    userId: donorId,
    userName: donorName,
    goldenHeartCount: 0,
    totalDonationsGiven: 0,
    totalDonationsReceived: 0
  };
}
userProfiles[donorId].goldenHeartCount += 1;
userProfiles[donorId].totalDonationsGiven += 1;
localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
```

---

## 🔄 BAĞIŞÇI AKIŞI (Donor Flow)

### 3️⃣ Bekleyen Talepler Listesi (DonorListPage)

**Dosya:** `/components/employee/DonorListPage.tsx`

**Görünüm:**
- 📊 Online bağışçılar kartı (büyütülmüş, yeşil, animasyonlu)
- 📋 Bekleyen talep listesi (status: 'waiting')
- 👤 Her talep kartında:
  - Kullanıcı adı (Ahmet Y. formatı) ve initials (AY)
  - Menü tutarı
  - Açıklama
  - Yayınlanma zamanı
  - "Destek Ol" butonu

**Online Bağışçılar Kartı:**
```jsx
<div className="p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 mb-4">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center animate-pulse">
        <CircleDot className="w-4 h-4 text-white fill-white" />
      </div>
      <div>
        <div className="text-green-900 font-medium">{onlineDonors} Bağışçı Online</div>
        <div className="text-xs text-green-700">Şu anda destek vermeye hazır</div>
      </div>
    </div>
    <Badge className="bg-green-500 text-white border-0 px-3 py-1">
      Aktif
    </Badge>
  </div>
</div>
```

**Talep Kartı:**
```jsx
<Card className="p-5 border-0 shadow-lg hover:shadow-xl transition-all">
  <div className="flex items-start gap-4">
    <Avatar className="w-14 h-14 border-2 border-[#C9E2F2]">
      <AvatarFallback className="bg-gradient-to-br from-[#0367A6] to-[#012840] text-white">
        {request.userInitials}
      </AvatarFallback>
    </Avatar>
    
    <div className="flex-1">
      <h3 className="text-[#012840] mb-1">{request.userName}</h3>
      <p className="text-sm text-[#0367A6] mb-3">{request.description}</p>
      
      <div className="flex items-center justify-between mb-4">
        <span className="text-[#012840]">{request.menuAmount} ₺</span>
        <Badge variant="outline">{request.postedAt}</Badge>
      </div>
      
      <Button 
        className="w-full bg-gradient-to-r from-amber-400 to-orange-500"
        onClick={() => handleSupportClick(request.id)}
      >
        <Heart className="w-4 h-4 mr-2" />
        Destek Ol
      </Button>
    </div>
  </div>
</Card>
```

**"Destek Ol" Dialog:**
- Destek oranı seçimi: %20 veya %100
- Her oran için hesaplama gösterimi
- Onay butonu

**%20 Destek Hesaplama:**
```
Menü tutarı: 1000 ₺
Senin desteğin (%20): 200 ₺
Platform ücreti (%5): 50 ₺
Toplam ödeyeceğin: 250 ₺

Alıcı ödeyecek: 800 ₺
Sana transfer edilecek: 750 ₺
```

**%100 "Buda Benden" Hesaplama:**
```
Menü tutarı: 1000 ₺
Senin desteğin (%100): 1000 ₺
Platform ücreti: 0 ₺ - Buda Bizden olsun 😊
Toplam ödeyeceğin: 0 ₺

Alıcı ödeyecek: 0 ₺
```

**Onay İşlemi:**
```javascript
const handleConfirmSupport = () => {
  // İsteği güncelle
  const updatedRequests = requests.map((req) => {
    if (req.id === selectedRequest) {
      return {
        ...req,
        status: 'donor_matched',
        donorId: currentUserId,
        donorName: currentUser.name,
        donorInitials: currentUser.initials,
        supportRate: selectedRate, // 20 veya 100
        isFullSupport: selectedRate === 100,
        matchedAt: new Date().toISOString()
      };
    }
    return req;
  });
  localStorage.setItem('foodDonationRequests', JSON.stringify(updatedRequests));
  
  // Alıcıya bildirim
  const notification = {
    userId: request.userId,
    type: 'food_donation',
    title: selectedRate === 100 ? '💛 Tam Destek!' : '💛 Destek Var!',
    message: selectedRate === 100 
      ? `${donorName} yemeğine "Buda Benden" diyerek tamamına destek olmak istiyor 💛`
      : `${donorName} yemeğine destek olmak istiyor 💛`,
    requestId: selectedRequest
  };
  
  // Aktif donation kaydet
  const activeDonations = JSON.parse(localStorage.getItem('activeDonations') || '{}');
  activeDonations[donorId] = selectedRequest;
  localStorage.setItem('activeDonations', JSON.stringify(activeDonations));
  
  // Detay sayfasına git
  onNavigate('donation-detail', selectedRequest);
};
```

**Aktif Donation Kontrolü:**
- Sayfa yüklendiğinde `activeDonations` kontrol edilir
- Eğer devam eden bir donation varsa, otomatik olarak detay sayfasına yönlendirilir
- Tamamlanmış donationlar aktif listeden temizlenir

---

### 4️⃣ Bağış Detay Sayfası (DonationDetailPage)

**Dosya:** `/components/employee/DonationDetailPage.tsx`

#### **4.1 Eşleşme Tamamlandı (status: 'donor_matched')**

**İki Senaryo:**

##### **Senaryo A: %20 Kısmi Destek**

**Görünüm:**
- ✅ Başarı mesajı
- 📊 İşlem takibi (6 adım)
- 💰 Tutar bilgileri
- ⏳ "Alıcının ödemesini bekliyoruz" mesajı
- 🔘 "İşlemi İptal Et" butonu

**Bekleme Durumu:**
- Polling ile status değişikliği kontrol edilir (2 saniye)
- Alıcı ödeme yaptığında status → 'qr_pending'
- Toast: "✅ Ödeme yapıldı! Şimdi QR kod yükleyebilirsiniz"

##### **Senaryo B: %100 Tam Destek**

**Görünüm:**
- ✅ Başarı mesajı: "Alıcı ödeme yapmayacak"
- 📊 İşlem takibi (5 adım)
- 💰 Tutar bilgileri (1000 ₺, %100 destek)
- ⏳ Otomatik yönlendirme mesajı

**Otomatik İşlem (3 saniye sonra):**
```javascript
useEffect(() => {
  if (request?.status === 'donor_matched' && request.isFullSupport) {
    const timer = setTimeout(() => {
      // Status'u qr_pending yap
      const updatedRequests = requests.map((r) => {
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
      
      toast.success('📲 QR Kod Yükleme Ekranına Yönlendiriliyorsunuz...');
    }, 3000);
    
    return () => clearTimeout(timer);
  }
}, [request?.status, request?.isFullSupport]);
```

---

#### **4.2 QR Kod Yükleme (status: 'qr_pending')**

**Görünüm:**
- 📷 "QR Kod Yükle" başlığı
- 📊 İşlem takibi
- 📤 Dosya yükleme alanı
- 🔘 "QR Kodu Yükle" butonu

**QR Yükleme Formu:**
```jsx
<div className="space-y-4">
  <Label htmlFor="qr-upload" className="text-[#012840]">
    QR Kod Görseli
  </Label>
  <Input
    id="qr-upload"
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="cursor-pointer"
  />
  
  {qrImage && (
    <div className="p-4 bg-green-50 rounded-lg">
      <p className="text-sm text-green-700">
        ✓ {qrImage.name} seçildi
      </p>
    </div>
  )}
  
  <Button
    className="w-full bg-gradient-to-r from-[#0367A6] to-[#012840]"
    onClick={handleQRUpload}
    disabled={!qrImage}
  >
    <Upload className="w-4 h-4 mr-2" />
    QR Kodu Yükle
  </Button>
</div>
```

**QR Yükleme İşlemi:**
```javascript
const handleQRUpload = () => {
  const qrExpiresAt = new Date(Date.now() + 300000).toISOString(); // 5 dakika
  
  const updatedRequests = requests.map((r) => {
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
  
  // Alıcıya bildirim
  const notification = {
    userId: request.userId,
    type: 'qr_ready',
    title: '📷 QR Hazır!',
    message: '📷 QR yüklendi — 300 sn içinde geçerli.',
    requestId: request.id
  };
  
  toast.success('QR kod yüklendi!');
  setCountdown(300); // 5 dakika = 300 saniye
};
```

---

#### **4.3 QR Yüklendi - Ödeme Bekleniyor (status: 'qr_uploaded')**

**Görünüm:**
- ⏱️ Countdown timer (5:00 → 0:00)
- 📷 Yüklenen QR kod önizlemesi
- 📊 İşlem takibi
- ⏳ "Alıcı ödeme yapıyor" mesajı

**Countdown Timer:**
```javascript
useEffect(() => {
  if (!request?.qrExpiresAt) return;
  
  const expiryTime = new Date(request.qrExpiresAt).getTime();
  const timer = setInterval(() => {
    const remaining = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
    setCountdown(remaining);
    
    if (remaining <= 0) {
      clearInterval(timer);
      // QR süresi doldu
      const updatedRequests = requests.map((r) => {
        if (r.id === request.id) {
          return { ...r, status: 'qr_expired' };
        }
        return r;
      });
      localStorage.setItem('foodDonationRequests', JSON.stringify(updatedRequests));
    }
  }, 1000);
  
  return () => clearInterval(timer);
}, [request?.qrExpiresAt]);
```

**Polling:**
- Alıcı "Ödeme Tamamlandı" butonuna bastığında status → 'payment_confirmed'
- Toast: "🎉 Onaylandı! Destek tamamlandı"

---

#### **4.4 Ödeme Onaylandı (status: 'payment_confirmed')**

**İki Durum:**

##### **%20 Destek:**
- Otomatik olarak 'completed' durumuna geçer
- Teşekkür bildirimi alıcıdan gelir
- Ana sayfaya yönlendirilir

##### **%100 Destek:**
- Alıcı "Teşekkür Et" butonuna basana kadar bekler
- Alıcı teşekkür ettiğinde:
  - Status → 'completed'
  - Bildirim: "💛 Destek Tamamlandı - {Alıcı Adı} desteğiniz için teşekkür etti ❤️\n\nAltın Kalbin oldu!"
  - Altın Kalp +1 kazanılır

**Altın Kalp Kazanma:**
```javascript
// userProfiles güncelleme
const userProfiles = JSON.parse(localStorage.getItem('userProfiles') || '{}');
userProfiles[donorId].goldenHeartCount += 1;
userProfiles[donorId].totalDonationsGiven += 1;
localStorage.setItem('userProfiles', JSON.stringify(userProfiles));
```

---

## 📊 Status (Durum) Akışı

### Destek Arayan Perspektifi
```
waiting           → Bağışçı bekleniyor
  ↓
donor_matched     → Bağışçı bulundu
  ↓ (%20 destek)
payment_pending   → Ödeme yapılıyor
  ↓
qr_pending        → QR bekleniyor
  ↓
qr_uploaded       → QR hazır
  ↓
payment_confirmed → Ödeme yapıldı
  ↓
completed         → Tamamlandı
```

### Bağışçı Perspektifi (%20 destek)
```
donor_matched     → Eşleşme
  ↓
payment_pending   → Alıcı ödeme yapıyor (bekle)
  ↓
qr_pending        → QR yükle
  ↓
qr_uploaded       → Alıcı ödeme yapıyor (bekle)
  ↓
payment_confirmed → Onaylandı
  ↓
completed         → Tamamlandı
```

### Bağışçı Perspektifi (%100 destek)
```
donor_matched     → Eşleşme
  ↓ (3 saniye otomatik)
qr_pending        → QR yükle
  ↓
qr_uploaded       → Alıcı ödeme yapıyor (bekle)
  ↓
payment_confirmed → Teşekkür bekleniyor
  ↓
completed         → Tamamlandı (Altın Kalp +1)
```

---

## 🔔 Bildirim Sistemi

### Destek Arayan Bildirimleri

1. **Bağışçı Bulundu (%20)**
```javascript
{
  type: 'food_donation',
  title: '💛 Destek Var!',
  message: '{Bağışçı Adı} yemeğine destek olmak istiyor 💛\nŞimdi ödeme ekranına yönlendiriliyorsunuz, 5 dk içinde QR ekranınızda olacak.',
  requestId: requestId
}
```

2. **Bağışçı Bulundu (%100)**
```javascript
{
  type: 'food_donation',
  title: '💛 Tam Destek!',
  message: '{Bağışçı Adı} yemeğine "Buda Benden" diyerek tamamına destek olmak istiyor 💛\nÖdeme yapmayacaksınız, 5 dk içinde QR ekranınızda olacak.',
  requestId: requestId
}
```

3. **QR Kod Hazır**
```javascript
{
  type: 'qr_ready',
  title: '📷 QR Hazır!',
  message: '📷 QR yüklendi — 300 sn içinde geçerli.',
  requestId: requestId
}
```

4. **Bağışçı İptal Etti**
```javascript
{
  type: 'donation_cancelled',
  title: '❌ Bağışçı İptal Etti',
  message: '{Bağışçı Adı} desteği iptal etti. Talebiniz tekrar yayınlandı.',
  requestId: requestId
}
```

### Bağışçı Bildirimleri

1. **Ödeme Başladı (%20 destek)**
```javascript
{
  type: 'payment_started',
  title: '💳 Ödeme Başladı',
  message: '{Alıcı Adı} ödemesini yapıyor. Hazır olun!',
  requestId: requestId
}
```

2. **Ödeme Tamamlandı (%20 destek)**
```javascript
{
  type: 'payment_completed',
  title: '💳 Ödeme Tamamlandı!',
  message: '{Alıcı Adı} ödemesini yaptı. QR kodu yükleyebilirsiniz.',
  requestId: requestId
}
```

3. **Destek Tamamlandı (%20 destek)**
```javascript
{
  type: 'donation_completed',
  title: '💛 Destek Tamamlandı',
  message: '{Alıcı Adı} desteğiniz için teşekkür ediyor!',
  requestId: requestId
}
```

4. **Altın Kalp Kazanıldı (%100 destek)**
```javascript
{
  type: 'golden_heart',
  title: '💛 Destek Tamamlandı',
  message: '{Alıcı Adı} desteğiniz için teşekkür etti ❤️\n\nAltın Kalbin oldu! Profilinizde görünecek.',
  requestId: requestId
}
```

5. **Talep İptal Edildi**
```javascript
{
  type: 'request_cancelled',
  title: '❌ Talep İptal Edildi',
  message: '{Alıcı Adı} destek talebini iptal etti.',
  requestId: requestId
}
```

---

## 💾 LocalStorage Yapısı

### 1. foodDonationRequests (Ana Veri)
```javascript
[
  {
    id: "1730000000000",
    userId: "IND001",
    userName: "Ahmet Y.",
    userInitials: "AY",
    menuAmount: 1000,
    minSupportRate: 20,
    userPayAmount: 800,
    description: "Yaklaşık 1000 TL tutarında yemek yiyeceğim",
    status: 'waiting', // veya diğer statuslar
    postedAt: 'Şimdi',
    
    // Eşleşme sonrası eklenir
    donorId: "IND002",
    donorName: "Mehmet K.",
    donorInitials: "MK",
    supportRate: 20, // veya 100
    isFullSupport: false, // veya true
    matchedAt: "2025-10-28T10:00:00.000Z",
    
    // QR yükleme sonrası eklenir
    qrImageUrl: "blob:http://...",
    qrExpiresAt: "2025-10-28T10:05:00.000Z",
    qrUploadedAt: "2025-10-28T10:00:00.000Z",
    
    // Tamamlanma
    completedAt: "2025-10-28T10:10:00.000Z",
    thanked: true // Sadece %100 destek
  }
]
```

### 2. activeDonations (Aktif Bağışlar)
```javascript
{
  "IND002": "1730000000000", // donorId: requestId
  "IND003": "1730000000001"
}
```

### 3. userProfiles (Kullanıcı Profilleri)
```javascript
{
  "IND002": {
    userId: "IND002",
    userName: "Mehmet K.",
    goldenHeartCount: 3,
    totalDonationsGiven: 5,
    totalDonationsReceived: 2
  }
}
```

### 4. donorAvailability (Bağışçı Müsaitliği)
```javascript
true // veya false
```

### 5. notifications (Bildirimler)
```javascript
[
  {
    id: "1730000000000",
    userId: "IND001",
    type: "food_donation",
    title: "💛 Destek Var!",
    message: "Mehmet K. yemeğine destek olmak istiyor 💛",
    timestamp: "2025-10-28T10:00:00.000Z",
    read: false,
    requestId: "1730000000000"
  }
]
```

---

## ⚙️ Teknik Detaylar

### Polling Mekanizması
Her 2 saniyede bir localStorage kontrol edilir:
```javascript
useEffect(() => {
  const pollInterval = setInterval(() => {
    const requests = JSON.parse(localStorage.getItem('foodDonationRequests') || '[]');
    const updated = requests.find(r => r.id === currentRequest.id);
    
    if (updated && updated.status !== currentRequest.status) {
      setCurrentRequest(updated);
      // Status değişikliğine göre işlem yap
    }
  }, 2000);
  
  return () => clearInterval(pollInterval);
}, [currentRequest]);
```

### Countdown Timer
QR kod için 300 saniyelik geri sayım:
```javascript
useEffect(() => {
  const expiryTime = new Date(request.qrExpiresAt).getTime();
  
  const timer = setInterval(() => {
    const remaining = Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
    setCountdown(remaining);
    
    if (remaining <= 0) {
      clearInterval(timer);
      // Süre doldu işlemleri
    }
  }, 1000);
  
  return () => clearInterval(timer);
}, [request.qrExpiresAt]);
```

### Online Bağışçı Sayısı
Random değer (gerçek API'de dinamik olacak):
```javascript
const updateOnlineDonors = () => {
  const randomCount = Math.floor(Math.random() * 50) + 100; // 100-150 arası
  setOnlineDonors(randomCount);
};

// Her 2 saniyede bir güncelle
setInterval(updateOnlineDonors, 2000);
```

---

## 🎨 UI Özellikleri

### Renk Paleti
- **Birincil:** #012840 (Koyu Mavi)
- **İkincil:** #0367A6 (Orta Mavi)
- **Vurgu:** #3F9BBF (Açık Mavi)
- **Arka Plan:** #C9E2F2 (Çok Açık Mavi)
- **Altın:** #FFA500 (Altın Kalp için)
- **Başarı:** Emerald/Teal gradyanları
- **Uyarı:** Amber/Orange gradyanları

### Gradient Kullanımı
```css
/* Header */
bg-gradient-to-br from-[#012840] to-[#0367A6]

/* Başarı */
bg-gradient-to-br from-emerald-500 to-teal-500

/* Uyarı */
bg-gradient-to-br from-amber-400 to-orange-500

/* Buton */
bg-gradient-to-r from-[#0367A6] to-[#012840]
```

### Animasyonlar
- **Pulse:** Online gösterge için
- **Hover:** Kartlar için shadow-xl
- **Transition:** 300ms duration

### İkonlar (Lucide React)
- Heart: Bağış/Destek
- UtensilsCrossed: Yemek
- Clock: Bekleme
- Upload: QR yükleme
- CheckCircle: Başarı
- AlertCircle: Uyarı
- CircleDot: Online gösterge
- Gift: Hediye/Destek

---

## 📱 Responsive Tasarım

### Mobil (Varsayılan)
- Bottom navigation
- Tam genişlik kartlar
- Touch-friendly buton boyutları
- pb-20 (bottom nav için padding)

### Desktop (lg: breakpoint)
- Sidebar navigation
- Maksimum genişlik (max-w-4xl)
- pb-6 (daha az padding)
- Grid layout (grid-cols-2)

---

## 🔐 Güvenlik ve Validasyon

### Form Validasyonu
- Menü tutarı: 50-5000 TL arası
- Açıklama: Boş olamaz
- QR dosyası: Resim formatı (image/*)

### Durum Kontrolleri
- Aktif donation varsa yeni eşleşme yapılamaz
- QR süresi dolduğunda durum güncellenir
- İptal işlemleri tüm tarafları bilgilendirir

### Tutarlılık
- LocalStorage her değişiklikte güncellenir
- Polling ile gerçek zamanlı senkronizasyon
- Status geçişleri sıralı ve kontrollü

---

## 🚀 Geliştirme Önerileri

### Backend Entegrasyonu
- [ ] API endpoint'leri oluştur
- [ ] WebSocket/SSE ile gerçek zamanlı güncellemeler
- [ ] QR kod oluşturma servisi
- [ ] Ödeme gateway entegrasyonu
- [ ] Fotoğraf yükleme servisi (S3, Cloudinary vb.)

### Güvenlik
- [ ] Kullanıcı kimlik doğrulama (JWT)
- [ ] QR kod şifreleme
- [ ] Rate limiting
- [ ] CSRF koruması
- [ ] XSS koruması

### Performans
- [ ] Image lazy loading
- [ ] Virtual scrolling (uzun listeler için)
- [ ] Debounce/Throttle polling
- [ ] Cache mekanizması

### UX İyileştirmeleri
- [ ] Push notification desteği
- [ ] Email/SMS bildirimleri
- [ ] QR kod otomatik oluşturma
- [ ] Konum bazlı eşleşme
- [ ] İstatistik ve analitik dashboard
- [ ] Sosyal paylaşım özellikleri

---

## 📝 Örnek Kullanım Senaryoları

### Senaryo 1: %20 Kısmi Destek
1. **Ali** (Destek Arayan):
   - Menü tutarı: 1000 ₺ girer
   - Destek talebi oluşturur (status: waiting)
   
2. **Mehmet** (Bağışçı):
   - Talepleri görüntüler
   - Ali'nin talebine %20 destek seçer
   - Onaylar (status: donor_matched)
   
3. **Ali**:
   - Bildirim alır: "Mehmet destek olmak istiyor"
   - 800 ₺ ödeme yapar (status: payment_pending → qr_pending)
   
4. **Mehmet**:
   - Bildirim alır: "Ali ödemesini yaptı"
   - QR kod yükler (status: qr_uploaded)
   
5. **Ali**:
   - Bildirim alır: "QR hazır"
   - Restoranda QR ile ödeme yapar
   - "Ödeme Tamamlandı" butonuna basar (status: payment_confirmed → completed)
   
6. **Mehmet**:
   - Bildirim alır: "Ali desteğiniz için teşekkür ediyor!"

### Senaryo 2: %100 "Buda Benden" Tam Destek
1. **Ayşe** (Destek Arayan):
   - Menü tutarı: 500 ₺ girer
   - Destek talebi oluşturur (status: waiting)
   
2. **Fatma** (Bağışçı):
   - Talepleri görüntüler
   - Ayşe'nin talebine %100 destek seçer
   - Onaylar (status: donor_matched)
   
3. **Ayşe**:
   - Bildirim alır: "Fatma 'Buda Benden' diyerek tamamına destek olmak istiyor"
   - Ödeme yapmasına gerek yok mesajı görür
   
4. **Fatma**:
   - 3 saniye sonra otomatik QR yükleme ekranına yönlendirilir
   - QR kod yükler (status: qr_uploaded)
   
5. **Ayşe**:
   - Bildirim alır: "QR hazır"
   - Restoranda QR ile ödeme yapar (Fatma ödüyor)
   - "Ödeme Tamamlandı" butonuna basar (status: payment_confirmed)
   - "Teşekkür Et ❤️" butonuna basar (status: completed)
   
6. **Fatma**:
   - Bildirim alır: "Ayşe desteğiniz için teşekkür etti ❤️ Altın Kalbin oldu!"
   - Altın Kalp badge +1 kazanır
   - Profilde görüntülenir

---

## 🎯 Sistem Akış Özeti

```
DESTEK ARAYAN                      BAĞIŞÇI
─────────────                      ───────

1. Talep oluştur
   (waiting) ─────────────────────> 2. Talepleri gör
                                        Oran seç (%20/%100)
                                        Onayla
                                        (donor_matched)
                                        
3. Bildirim al                           
   Eşleşme! <───────────────────── 

4a. %20: Ödeme yap (800₺)         4b. %100: Ödeme yapma
    (payment_pending)                  Otomatik geçiş (3sn)
    ↓                                  ↓
    (qr_pending) ─────────────────> 5. QR yükle
                                       (qr_uploaded)
                                       
6. Bildirim al                          
   QR hazır! <──────────────────── 
   (qr_uploaded)

7. Restoranda ödeme yap
   "Ödeme Tamamlandı" butonuna bas
   (payment_confirmed)
   
8a. %20: Tamamlandı              8b. %100: "Teşekkür Et" butonuna bas
    (completed)                        (completed)
    Bildirim gönder ────────────> 9. Altın Kalp +1 kazan
                                      Bildirim al
```

---

## ✅ Tamamlanan Özellikler

- [x] Destek talep oluşturma sistemi
- [x] Bağışçı eşleşme sistemi
- [x] %20 ve %100 destek oranları
- [x] QR kod yükleme ve gösterme
- [x] 300 saniyelik countdown timer
- [x] Gerçek zamanlı bildirimler
- [x] Altın Kalp badge sistemi
- [x] İşlem takip sistemi (tracking)
- [x] İptal mekanizması
- [x] Online bağışçı sayısı gösterimi
- [x] Mobil responsive tasarım
- [x] LocalStorage veri yönetimi
- [x] Polling mekanizması

---

**Versiyon:** 2.0  
**Son Güncelleme:** 28 Ekim 2025  
**Hazırlayan:** Workigom Development Team
