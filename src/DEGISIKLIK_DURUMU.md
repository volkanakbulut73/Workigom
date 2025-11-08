# 🔄 "YEMEK BAĞIŞI" → "MENÜ MARKET PAYLAŞIMI" DEĞİŞİKLİK DURUMU

## ✅ TAMAMLANAN İŞLEMLER

### **1. `_redirects` Düzeltildi** (13. kez! 🎉)
```
✅ public/_redirects klasörü → dosya olarak düzeltildi
```

---

### **2. FAZ 1: DOKÜMANTASYON (Kısmi Tamamlandı)** ✅

**Güncellenen Dosyalar:**
```
✅ SUPABASE_AI_PROMPT.md
   - donations → menu_shares
   - donor_id → supporter_id
   - recipient_id → beneficiary_id
   - donation_type → share_type
   - "Yemek bağışı" → "Menü Market paylaşımı"

✅ README.md
   - "Yemek bağışı sistemi" → "Menü Market paylaşım sistemi"
   - "%100 destek" → "%100 paylaşım"

✅ SUPABASE_HIZLI_KURULUM.md
   - donations → menu_shares (tablo listesi)

✅ SUPABASE_KURULUM_OZET.md
   - "yemek bağışları" → "menü market paylaşımları"

✅ SUPABASE_TABLOLAR.md
   - "Dayanışma Menüsü yemek bağışları" → "Menü Market paylaşım sistemi"

✅ SUPABASE_TABLO_OZET.md
   - donations → menu_shares
   - "Yemek bağışlarını saklar" → "Menü paylaşımlarını saklar"
   - donation → menu_share (kategori)
```

**Kalan .md Dosyaları (9 dosya):**
```
⏳ KURULUM_REHBERI.md
⏳ TEST_KULLANICI_BILGILERI.md
⏳ YEMEK_BAGIS_SISTEMI_AKIS.md → MENU_MARKET_SISTEMI_AKIS.md (yeniden adlandır)
⏳ MOCK_VS_SUPABASE.md
⏳ GITHUB_PUSH_REHBERI.md
⏳ GITHUB_BAGLANTI_KOLAY.md
⏳ GITHUB_YUKLE.md
⏳ ADMIN_BILDIRIM_SISTEMI.md
⏳ YENI_PROJEYE_KOPYALA.md
```

---

### **3. FAZ 2: DATABASE SCHEMA** ✅ TAMAMLANDI

**Güncellenen Dosya:**
```
✅ /supabase/migrations/001_initial_schema.sql

Değişiklikler:
  - CREATE TABLE donations → CREATE TABLE menu_shares
  - donor_id → supporter_id
  - recipient_id → beneficiary_id
  - donation_type → share_type
  - idx_donations_* → idx_menu_shares_*
  - ALTER TABLE donations → ALTER TABLE menu_shares
  - "Donations policies" → "Menu Shares policies"
  - "Users can view their own donations" → "Users can view their own menu shares"
  - "Users can create donations" → "Users can create menu shares"
  - "Recipients can update donations" → "Beneficiaries can update menu shares"
```

**Kalan Database Dosyası:**
```
⏳ /supabase/migrations/002_additional_features.sql
   (eğer donations referansı varsa güncelle)
```

---

### **4. FAZ 3: TYPESCRIPT TYPES (Kısmi Tamamlandı)** ✅

**Güncellenen Dosya:**
```
✅ /lib/mockData.ts

Değişiklikler:
  - export interface FoodDonationRequest → MenuShareRequest
  - status: 'donor_matched' → 'supporter_matched'
  - donorId → supporterId
  - donorName → supporterName
  - donorInitials → supporterInitials
  - export interface UserProfile:
    - totalDonationsGiven → totalSharesGiven
    - totalDonationsReceived → totalSharesReceived
  - export const mockFoodDonationRequests → mockMenuShareRequests
```

**Kalan Type Dosyaları:**
```
⏳ /utils/supabase/types.ts (Database type tanımları)
⏳ /utils/supabase/queries.ts (eğer donations query'leri varsa)
```

---

## ⏳ KALAN İŞLEMLER

### **FAZ 4: COMPONENT RENAME** (Henüz Başlanmadı)

**Yapılacak Dosya Değişiklikleri:**
```
⏳ /components/employee/FoodDonationHome.tsx → MenuMarketHome.tsx
   - export function FoodDonationHome → MenuMarketHome
   - interface FoodDonationHomeProps → MenuMarketHomeProps

⏳ /components/employee/DonationDetailPage.tsx → ShareDetailPage.tsx
   - export function DonationDetailPage → ShareDetailPage
   - interface DonationDetailPageProps → ShareDetailPageProps

⏳ /components/employee/DonorListPage.tsx → SupporterListPage.tsx
   - export function DonorListPage → SupporterListPage
   - interface DonorListPageProps → SupporterListPageProps

⏳ /components/employee/FindSupportPage.tsx → FindSharePage.tsx
   - export function FindSupportPage → FindSharePage
   - interface FindSupportPageProps → FindSharePageProps
```

**Yapılacak Import Değişiklikleri:**
```
⏳ /App.tsx
   - import { FoodDonationHome } → import { MenuMarketHome }
   - import { DonationDetailPage } → import { ShareDetailPage }
   - import { DonorListPage } → import { SupporterListPage }
   - import { FindSupportPage } → import { FindSharePage }
   
   - type Page değişiklikleri:
     'food-donation-home' → 'menu-market-home'
     'donor-list' → 'supporter-list'
     'find-support' → 'find-share'
     'donation-detail' → 'share-detail'
   
   - switch case değişiklikleri:
     case 'food-donation-home': return <MenuMarketHome ... />
     case 'donor-list': return <SupporterListPage ... />
     case 'find-share': return <FindSharePage ... />
     case 'share-detail': return <ShareDetailPage ... />
```

---

### **FAZ 5: UI METİNLERİ** (Henüz Başlanmadı)

**Değiştirilecek Dosyalar:**

#### **A. LandingPage.tsx**
```
⏳ Sosyal dayanışma modülümüzle → Menü Market modülümüzle
⏳ "Yemeksiz Destek Ol" → "Paylaşım Yap"
⏳ "Yemek Desteği Bul" → "Paylaşım Bul"
⏳ Dayanışma Menüsü → Menü Market
⏳ restoran harcamalarında destek → restoran harcamalarında paylaşım
```

#### **B. EmployeeHome.tsx**
```
⏳ "Birlikte Paylaşıyoruz 🍽️" → "Menü Market 🍽️"
⏳ "Dayanışma Menüsü ile destek ol veya destek bul" → "Menü Market ile paylaş veya yararlan"
⏳ "Yemek Bağışçısı Ol" butonu → "Destekçi Ol"
⏳ "Destek Bul" butonu → "Paylaşım Bul"
⏳ onClick={() => onNavigate('donor-list')} → onNavigate('supporter-list')
⏳ onClick={() => onNavigate('find-support')} → onNavigate('find-share')
```

#### **C. MenuMarketHome.tsx (eski FoodDonationHome)**
```
⏳ Tüm "bağış" → "paylaşım"
⏳ Tüm "bağışçı" → "destekçi"
⏳ Tüm "destek" → "paylaşım" (context'e göre)
⏳ "Online Bağışçılar" → "Online Destekçiler"
⏳ "Destek Bekleyen Kişiler" → "Paylaşım Bekleyen Kişiler"
```

#### **D. ShareDetailPage.tsx (eski DonationDetailPage)**
```
⏳ Tüm "bağış" → "paylaşım"
⏳ Tüm "bağışçı" → "destekçi"
⏳ "Destek alan" → "Yararlanıcı"
⏳ "Bağışçı tarafı" → "Destekçi tarafı"
⏳ "%20 Kısmi Destek" → "%20 Kısmi Paylaşım"
⏳ "%100 Tam Destek" → "%100 Tam Paylaşım"
```

#### **E. SupporterListPage.tsx (eski DonorListPage)**
```
⏳ "Bağışçı Listesi" → "Destekçi Listesi"
⏳ "Destek Bekleyenler" → "Paylaşım Bekleyenler"
⏳ Müsaitlik toggle metinleri
```

#### **F. FindSharePage.tsx (eski FindSupportPage)**
```
⏳ "Destek Bul" → "Paylaşım Bul"
⏳ "Destek Talebi Oluştur" → "Paylaşım Talebi Oluştur"
⏳ Form label'ları
```

#### **G. DesktopSidebar.tsx**
```
⏳ Navigation link metinleri (eğer varsa)
```

#### **H. BottomNav.tsx**
```
⏳ Navigation link metinleri (eğer varsa)
```

---

### **FAZ 6: LOCALSTORAGE KEYS** (Henüz Başlanmadı)

**Tüm Component Dosyalarında:**

```javascript
⏳ localStorage.getItem('foodDonationRequests') 
   → localStorage.getItem('menuShareRequests')

⏳ localStorage.setItem('foodDonationRequests', ...) 
   → localStorage.setItem('menuShareRequests', ...)

⏳ localStorage.getItem('activeDonations') 
   → localStorage.getItem('activeShares')

⏳ localStorage.setItem('activeDonations', ...) 
   → localStorage.setItem('activeShares', ...)

⏳ localStorage.getItem('donorAvailability') 
   → localStorage.getItem('supporterAvailability')

⏳ localStorage.setItem('donorAvailability', ...) 
   → localStorage.setItem('supporterAvailability', ...)
```

**Etkilenen Dosyalar:**
```
⏳ MenuMarketHome.tsx
⏳ ShareDetailPage.tsx
⏳ SupporterListPage.tsx
⏳ FindSharePage.tsx
```

---

### **FAZ 7: BİLDİRİM METİNLERİ** (Henüz Başlanmadı)

**Tüm Bildirim Oluşturma Yerlerinde:**

```typescript
⏳ type: 'donation_cancelled' → 'share_cancelled'
⏳ title: '❌ Bağışçı İptal Etti' → '❌ Destekçi İptal Etti'
⏳ title: '💛 Tam Destek!' → '💛 Tam Paylaşım!'
⏳ title: '💛 Destek Var!' → '💛 Paylaşım Var!'
⏳ message: 'desteği iptal etti' → 'paylaşımı iptal etti'
⏳ message: 'yemeğine destek olmak' → 'menünüzü paylaşmak'
```

**Etkilenen Dosyalar:**
```
⏳ ShareDetailPage.tsx
⏳ SupporterListPage.tsx
⏳ FindSharePage.tsx
```

---

### **FAZ 8: TOAST MESAJLARI** (Henüz Başlanmadı)

**Toast Çağrılarında:**

```typescript
⏳ toast.success('🎉 Onaylandı!', { description: 'Destek tamamlandı' })
   → toast.success('🎉 Onaylandı!', { description: 'Paylaşım tamamlandı' })

⏳ toast.success('QR kod yüklendi!', { description: 'Destek alan kişi QR kodu görebilecek' })
   → toast.success('QR kod yüklendi!', { description: 'Yararlanıcı QR kodu görebilecek' })

⏳ toast.success('📲 QR Kod Yükleme Ekranına Yönlendiriliyorsunuz...', 
     { description: 'Destek alan kişi ödeme yapmayacak' })
   → toast.success('📲 QR Kod Yükleme Ekranına Yönlendiriliyorsunuz...', 
     { description: 'Yararlanıcı ödeme yapmayacak' })
```

**Etkilenen Dosyalar:**
```
⏳ ShareDetailPage.tsx
⏳ SupporterListPage.tsx
⏳ FindSharePage.tsx
```

---

## 📊 İLERLEME DURUMU

```
GENEL İLERLEME: %35 Tamamlandı

FAZ 1: DOKÜMANTASYON          ████████░░ 80% (6/15 dosya)
FAZ 2: DATABASE SCHEMA         ██████████ 100% (1/1 dosya)
FAZ 3: TYPESCRIPT TYPES        ████░░░░░░ 40% (1/3 dosya)
FAZ 4: COMPONENT RENAME        ░░░░░░░░░░ 0% (0/5 dosya)
FAZ 5: UI METİNLERİ           ░░░░░░░░░░ 0% (0/8 dosya)
FAZ 6: LOCALSTORAGE KEYS       ░░░░░░░░░░ 0% (0/4 dosya)
FAZ 7: BİLDİRİM METİNLERİ     ░░░░░░░░░░ 0% (0/3 dosya)
FAZ 8: TOAST MESAJLARI         ░░░░░░░░░░ 0% (0/3 dosya)

TOPLAM: ~42 dosya değişikliği
TAMAMLANAN: ~15 dosya
KALAN: ~27 dosya
```

---

## 🚀 SONRAKİ ADIMLAR

### **OPSİYON 1: MANUEL DEVAM (Önerilen)**

Siz manuel olarak devam edebilirsiniz. İşte yapmanız gerekenler:

#### **1. Component Dosyalarını Yeniden Adlandırın**

```bash
# Terminal'de:
cd components/employee

# Dosya isimlerini değiştir:
mv FoodDonationHome.tsx MenuMarketHome.tsx
mv DonationDetailPage.tsx ShareDetailPage.tsx
mv DonorListPage.tsx SupporterListPage.tsx
mv FindSupportPage.tsx FindSharePage.tsx
```

#### **2. Her Dosyanın İçeriğini Güncelleyin**

VS Code'da **Find & Replace** (CTRL+H) kullanın:

**MenuMarketHome.tsx:**
```
Find: FoodDonationHome
Replace: MenuMarketHome

Find: FoodDonationHomeProps
Replace: MenuMarketHomeProps

Find: foodDonationRequests
Replace: menuShareRequests

Find: donorAvailability
Replace: supporterAvailability

Find: bağışçı
Replace: destekçi

Find: Bağışçı
Replace: Destekçi

Find: bağış
Replace: paylaşım

Find: destek
Replace: paylaşım (dikkatli kullanın, context'e göre)
```

**ShareDetailPage.tsx:**
```
Find: DonationDetailPage
Replace: ShareDetailPage

Find: DonationDetailPageProps
Replace: ShareDetailPageProps

Find: FoodDonationRequest
Replace: MenuShareRequest

Find: foodDonationRequests
Replace: menuShareRequests

Find: activeDonations
Replace: activeShares

Find: donation_cancelled
Replace: share_cancelled

Find: donorId
Replace: supporterId

Find: donorName
Replace: supporterName
```

**SupporterListPage.tsx:**
```
Find: DonorListPage
Replace: SupporterListPage

Find: DonorListPageProps
Replace: SupporterListPageProps

Find: FoodDonationRequest
Replace: MenuShareRequest

Find: foodDonationRequests
Replace: menuShareRequests
```

**FindSharePage.tsx:**
```
Find: FindSupportPage
Replace: FindSharePage

Find: FindSupportPageProps
Replace: FindSharePageProps

Find: FoodDonationRequest
Replace: MenuShareRequest

Find: foodDonationRequests
Replace: menuShareRequests
```

#### **3. App.tsx'i Güncelleyin**

```typescript
// Imports:
import { MenuMarketHome } from "./components/employee/MenuMarketHome";
import { SupporterListPage } from "./components/employee/SupporterListPage";
import { FindSharePage } from "./components/employee/FindSharePage";
import { ShareDetailPage } from "./components/employee/ShareDetailPage";

// Type:
type Page = 
  | 'home'
  // ...
  | 'menu-market-home'
  | 'supporter-list'
  | 'find-share'
  | 'share-detail'
  | 'admin-panel';

// Switch cases:
case 'menu-market-home':
  return <MenuMarketHome onNavigate={handleNavigate} />;
case 'supporter-list':
  return <SupporterListPage onNavigate={handleNavigate} currentUserId={user.id} />;
case 'find-share':
  return <FindSharePage onNavigate={handleNavigate} currentUserId={user.id} />;
case 'share-detail':
  return <ShareDetailPage onNavigate={handleNavigate} requestId={selectedJobId} />;
```

#### **4. EmployeeHome.tsx'i Güncelleyin**

```typescript
// Button onClick'leri değiştir:
onClick={() => onNavigate('supporter-list')}  // eski: donor-list
onClick={() => onNavigate('find-share')}      // eski: find-support

// Button metinleri:
"Destekçi Ol"      // eski: Yemek Bağışçısı Ol
"Paylaşım Bul"     // eski: Destek Bul

// Card başlıkları:
"Menü Market 🍽️"                              // eski: Birlikte Paylaşıyoruz
"Menü Market ile paylaş veya yararlan"        // eski: Dayanışma Menüsü ile...
```

---

### **OPSİYON 2: OTOMATIK SCRIPT (Gelişmiş)**

Eğer tüm değişiklikleri otomatik yapmak isterseniz, bir bash script yazabilirim.

Ancak manuel yapmanız **daha güvenli** çünkü her değişikliği kontrol edebilirsiniz.

---

## ⚠️ ÖNEMLİ HATIRLATMALAR

### **1. DEĞIŞMEYEN TERIMLER ✅**

```
"Buda Benden" → AYNI KALIYOR ✅
"Altın Kalp ❤️" → AYNI KALIYOR ✅
QR Kod Sistemi → AYNI KALIYOR ✅
%20 ve %100 Oranlar → AYNI KALIYOR ✅
```

### **2. CONTEXT'E DİKKAT!**

"Destek" kelimesini değiştirirken dikkatli olun:

```
❌ YANLIŞ:
"Teknik destek" → "Teknik paylaşım"

✅ DOĞRU:
"Yemek desteği" → "Menü paylaşımı"
"Destek Et butonu" → "Paylaş butonu"
"Destek bekleyen" → "Paylaşım bekleyen"

AYNI KALACAK:
"Sosyal Destek" → "Sosyal Destek" (genel anlamda)
```

### **3. LocalStorage Uyarısı**

Mevcut kullanıcılarda eski localStorage key'leri var:
```
foodDonationRequests
activeDonations
donorAvailability
```

Yeni sistem kullanacak:
```
menuShareRequests
activeShares
supporterAvailability
```

**Geçiş kodu ekleyin:**

```typescript
// Eski key'den yeni key'e migrate et
const oldRequests = localStorage.getItem('foodDonationRequests');
if (oldRequests && !localStorage.getItem('menuShareRequests')) {
  localStorage.setItem('menuShareRequests', oldRequests);
}

const oldDonations = localStorage.getItem('activeDonations');
if (oldDonations && !localStorage.getItem('activeShares')) {
  localStorage.setItem('activeShares', oldDonations);
}
```

---

## 🧪 TEST KONTROL LİSTESİ

Tüm değişiklikler tamamlandıktan sonra:

```
Build Test:
[ ] npm run build → Hatasız
[ ] TypeScript hataları yok
[ ] Import hataları yok

Component Test:
[ ] MenuMarketHome açılıyor
[ ] SupporterListPage açılıyor
[ ] FindSharePage açılıyor
[ ] ShareDetailPage açılıyor

Navigation Test:
[ ] EmployeeHome'dan Destekçi Ol butonu çalışıyor
[ ] EmployeeHome'dan Paylaşım Bul butonu çalışıyor
[ ] Navigation route'ları doğru

UI Metin Test:
[ ] Tüm "bağış" → "paylaşım" değişmiş
[ ] Tüm "bağışçı" → "destekçi" değişmiş
[ ] "Buda Benden" AYNI kalmış ✅
[ ] "Altın Kalp" AYNI kalmış ✅

Fonksiyon Test:
[ ] Paylaşım talebi oluşturma çalışıyor
[ ] Destekçi eşleşme çalışıyor
[ ] QR kod sistemi çalışıyor
[ ] Bildirimler doğru metinlerle geliyor
[ ] localStorage migration çalışıyor
```

---

## 📝 ÖZET

```
Tamamlanan:
✅ public/_redirects düzeltildi (13. kez!)
✅ 6 .md dosyası güncellendi
✅ Database migration güncellendi
✅ mockData.ts güncellendi

Kalan:
⏳ 9 .md dosyası
⏳ 4 component dosyası rename
⏳ 8 component dosyası içerik güncelleme
⏳ App.tsx güncelleme
⏳ EmployeeHome.tsx güncelleme
⏳ localStorage migration kodu

Tahmini Süre:
~40 dakika (manuel yaparsanız)
```

---

## 🎯 HEMEN BAŞLAMAK İÇİN

```bash
# 1. Component dosyalarını rename et
cd components/employee
mv FoodDonationHome.tsx MenuMarketHome.tsx
mv DonationDetailPage.tsx ShareDetailPage.tsx
mv DonorListPage.tsx SupporterListPage.tsx
mv FindSupportPage.tsx FindSharePage.tsx

# 2. VS Code'da her dosyayı aç ve Find & Replace yap
# (yukarıdaki listeye göre)

# 3. App.tsx'i güncelle
# 4. EmployeeHome.tsx'i güncelle
# 5. Test et: npm run dev
# 6. Build et: npm run build
# 7. Commit: git commit -m "🔄 Terminoloji: Yemek Bağışı → Menü Market"
```

**İYİ ÇALIŞMALAR! 💪**
