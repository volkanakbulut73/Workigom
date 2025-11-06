# 🔄 "YEMEK BAĞIŞI" → "MENÜ MARKET PAYLAŞIMI" DEĞİŞİKLİĞİ

## 📝 TERMİNOLOJİ DEĞİŞİKLİĞİ

### **ESKİ TERİMLER → YENİ TERİMLER**

```
GENEL TERİMLER:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Yemek Bağışı          → Menü Market Paylaşımı
Dayanışma Menüsü      → Menü Market
Bağış                 → Paylaşım
Bağışçı               → Destekçi / Paylaşan
Bağış Yapan           → Paylaşım Yapan / Destekleyen
Alıcı / Recipient     → Yararlanıcı / Paylaşımdan Yararlanan
Destek Alan           → Paylaşımdan Yararlanan
Destek Bul            → Paylaşım Bul
Destek Bekleyen       → Paylaşım Bekleyen

AKSIYON TERİMLERİ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Bağış Yap             → Paylaşım Yap
Bağışçı Ol            → Destekçi Ol
Destek Et             → Paylaş
%20 Kısmi Destek      → %20 Kısmi Paylaşım
%100 Tam Destek       → %100 Tam Paylaşım
"Buda Benden"         → "Buda Benden" (AYNI KALIYOR ✅)

DATABASE TERİMLERİ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
donations             → menu_shares (tablo adı)
donation_type         → share_type (kolon adı)
donor_id              → supporter_id (kolon adı)
recipient_id          → beneficiary_id (kolon adı)
foodDonationRequests  → menuShareRequests (localStorage key)
activeDonations       → activeShares (localStorage key)
```

---

## 📊 DEĞİŞTİRİLECEK DOSYALAR

### **1. DOKÜMANTASYON DOSYALARI (.md)**

```
📄 SUPABASE_AI_PROMPT.md
📄 SUPABASE_HIZLI_KURULUM.md
📄 SUPABASE_KURULUM_OZET.md
📄 SUPABASE_TABLOLAR.md
📄 SUPABASE_TABLO_OZET.md
📄 README.md
📄 KURULUM_REHBERI.md
📄 TEST_KULLANICI_BILGILERI.md
📄 YEMEK_BAGIS_SISTEMI_AKIS.md → MENU_MARKET_SISTEMI_AKIS.md
📄 MOCK_VS_SUPABASE.md
📄 GITHUB_PUSH_REHBERI.md
... (toplam 15 dosya)
```

---

### **2. DATABASE MIGRATION DOSYALARI (.sql)**

```
📄 /supabase/migrations/001_initial_schema.sql
📄 /supabase/migrations/002_additional_features.sql
```

**Değişiklikler:**
- Tablo adı: `donations` → `menu_shares`
- Kolonlar: `donor_id` → `supporter_id`, `recipient_id` → `beneficiary_id`
- Kolon: `donation_type` → `share_type`

---

### **3. COMPONENT DOSYALARI (.tsx)**

```
COMPONENT İSİMLERİ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FoodDonationHome.tsx       → MenuMarketHome.tsx
DonationDetailPage.tsx     → ShareDetailPage.tsx
DonorListPage.tsx          → SupporterListPage.tsx
FindSupportPage.tsx        → FindSharePage.tsx

İMPORT İSİMLERİ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FoodDonationRequest        → MenuShareRequest
foodDonationRequests       → menuShareRequests
activeDonations            → activeShares
```

**Etkilenen Dosyalar:**
```
/App.tsx
/components/employee/FoodDonationHome.tsx
/components/employee/DonationDetailPage.tsx
/components/employee/DonorListPage.tsx
/components/employee/FindSupportPage.tsx
/components/employee/EmployeeHome.tsx
/lib/mockData.ts
```

---

### **4. UI METİNLERİ**

**Landing Page:**
```tsx
// ÖNCE:
"Yemek Desteği Bul"
"Yemeksiz Destek Ol"
"Dayanışma Menüsü ile ihtiyaç sahiplerine restoran harcamalarında destek oluyoruz"

// SONRA:
"Menü Market Paylaşımı"
"Paylaşım Yap"
"Menü Market ile restoran harcamalarında paylaşım yapabilir veya yararlanabilirsiniz"
```

**Employee Home:**
```tsx
// ÖNCE:
"Birlikte Paylaşıyoruz 🍽️"
"Yemek Bağışçısı Ol"
"Destek Bul"

// SONRA:
"Menü Market 🍽️"
"Destekçi Ol / Paylaş"
"Paylaşım Bul"
```

**Button/Link Metinleri:**
```tsx
// ÖNCE:
"Yemek Bağışı"
"Bağış Yap"
"Destek Bekleyen Kişiler"

// SONRA:
"Menü Market"
"Paylaşım Yap"
"Paylaşım Bekleyen Kişiler"
```

---

## 🔧 ADIM ADIM DEĞİŞİKLİK PLANI

### **FAZ 1: DOKÜMANTASYON (ÖNCELİKLİ)** ⏱️ 15 dakika

#### **1.1 SUPABASE_AI_PROMPT.md Güncelle**

```diff
- ### 4. **donations** tablosu
- Yemek bağışı sistemi için
+ ### 4. **menu_shares** tablosu
+ Menü Market paylaşım sistemi için

Kolonlar:
- id (UUID, PRIMARY KEY, DEFAULT uuid_generate_v4())
- donor_id (UUID, NOT NULL) → users(id) referansı (bağışçı)
- recipient_id (UUID) → users(id) referansı (alıcı, NULL olabilir)
+ supporter_id (UUID, NOT NULL) → users(id) referansı (destekçi)
+ beneficiary_id (UUID) → users(id) referansı (yararlanıcı, NULL olabilir)
- amount (DECIMAL(10, 2), NOT NULL) → bağış tutarı
+ amount (DECIMAL(10, 2), NOT NULL) → paylaşım tutarı
- donation_type (TEXT, NOT NULL) → 'partial' (%20 destek) veya 'full' (%100 destek)
+ share_type (TEXT, NOT NULL) → 'partial' (%20 paylaşım) veya 'full' (%100 paylaşım)
- qr_code_url (TEXT) → QR kod resmi URL
+ qr_code_url (TEXT) → QR kod resmi URL (AYNI)
- status (TEXT, DEFAULT 'pending') → 'pending', 'confirmed', 'expired'
+ status (TEXT, DEFAULT 'pending') → 'pending', 'confirmed', 'expired' (AYNI)
- expires_at (TIMESTAMP WITH TIME ZONE, NOT NULL) → QR kod son kullanma tarihi (5 dakika)
+ expires_at (TIMESTAMP WITH TIME ZONE, NOT NULL) → QR kod son kullanma tarihi (AYNI)
```

#### **1.2 README.md Güncelle**

```diff
- 🍽️ Yemek bağışı sistemi (Destek bul/Bağışçı ol)
+ 🍽️ Menü Market paylaşım sistemi (Paylaşım bul/Destekçi ol)
- 💛 Altın Kalp rozetleri (%100 destek için)
+ 💛 Altın Kalp rozetleri (%100 paylaşım için)

- ### 🎯 Yemek Bağışı Sistemi
+ ### 🎯 Menü Market Paylaşım Sistemi
- %20 kısmi destek akışı
+ %20 kısmi paylaşım akışı
- %100 "Buda Benden" tam destek akışı
+ %100 "Buda Benden" tam paylaşım akışı
```

#### **1.3 Diğer .md Dosyaları**

Tüm `.md` dosyalarında:
```bash
# Find & Replace:
"Yemek Bağışı" → "Menü Market Paylaşımı"
"yemek bağış" → "menü market paylaşım"
"Bağış" → "Paylaşım"
"Bağışçı" → "Destekçi"
"Alıcı" → "Yararlanıcı"
"donations" → "menu_shares"
```

---

### **FAZ 2: DATABASE SCHEMA** ⏱️ 10 dakika

#### **2.1 Migration Dosyalarını Güncelle**

**001_initial_schema.sql:**

```diff
- -- Donations table
- CREATE TABLE donations (
+ -- Menu Shares table
+ CREATE TABLE menu_shares (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
-  donor_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
-  recipient_id UUID REFERENCES users(id) ON DELETE SET NULL,
+  supporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
+  beneficiary_id UUID REFERENCES users(id) ON DELETE SET NULL,
  amount DECIMAL(10, 2) NOT NULL,
-  donation_type TEXT NOT NULL CHECK (donation_type IN ('partial', 'full')),
+  share_type TEXT NOT NULL CHECK (share_type IN ('partial', 'full')),
  qr_code_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'expired')),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

- CREATE INDEX idx_donations_donor_id ON donations(donor_id);
- CREATE INDEX idx_donations_recipient_id ON donations(recipient_id);
- CREATE INDEX idx_donations_status ON donations(status);
+ CREATE INDEX idx_menu_shares_supporter_id ON menu_shares(supporter_id);
+ CREATE INDEX idx_menu_shares_beneficiary_id ON menu_shares(beneficiary_id);
+ CREATE INDEX idx_menu_shares_status ON menu_shares(status);
```

**RLS Policies:**

```diff
- -- Donations policies
- CREATE POLICY "Users can view their own donations"
-   ON donations FOR SELECT
-   USING (auth.uid() = donor_id OR auth.uid() = recipient_id);
+ -- Menu Shares policies
+ CREATE POLICY "Users can view their own menu shares"
+   ON menu_shares FOR SELECT
+   USING (auth.uid() = supporter_id OR auth.uid() = beneficiary_id);

- CREATE POLICY "Users can create donations"
-   ON donations FOR INSERT
-   WITH CHECK (auth.uid() = donor_id);
+ CREATE POLICY "Users can create menu shares"
+   ON menu_shares FOR INSERT
+   WITH CHECK (auth.uid() = supporter_id);

- CREATE POLICY "Recipients can update donations"
-   ON donations FOR UPDATE
-   USING (auth.uid() = recipient_id);
+ CREATE POLICY "Beneficiaries can update menu shares"
+   ON menu_shares FOR UPDATE
+   USING (auth.uid() = beneficiary_id);
```

---

### **FAZ 3: TYPESCRIPT TYPES** ⏱️ 5 dakika

#### **3.1 /lib/mockData.ts Güncelle**

```diff
- export interface FoodDonationRequest {
+ export interface MenuShareRequest {
  id: string;
  userId: string;
  userName: string;
  menuAmount: number;
  description: string;
  status: 'waiting' | 'donor_matched' | 'payment_pending' | 'qr_pending' | 'qr_uploaded' | 'payment_confirmed' | 'completed' | 'qr_expired';
-  donorId?: string;
-  donorName?: string;
+  supporterId?: string;
+  supporterName?: string;
  supportRate?: number;
  isFullSupport?: boolean;
  qrImageUrl?: string;
  qrExpiresAt?: string;
  createdAt: string;
}

- export const mockFoodDonationRequests: FoodDonationRequest[] = [];
+ export const mockMenuShareRequests: MenuShareRequest[] = [];
```

#### **3.2 /utils/supabase/types.ts Güncelle**

```diff
export interface Database {
  public: {
    Tables: {
-      donations: {
+      menu_shares: {
        Row: {
          id: string;
-          donor_id: string;
-          recipient_id: string | null;
+          supporter_id: string;
+          beneficiary_id: string | null;
          amount: number;
-          donation_type: 'partial' | 'full';
+          share_type: 'partial' | 'full';
          qr_code_url: string | null;
          status: 'pending' | 'confirmed' | 'expired';
          expires_at: string;
          confirmed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
-          donor_id: string;
-          recipient_id?: string | null;
+          supporter_id: string;
+          beneficiary_id?: string | null;
          amount: number;
-          donation_type: 'partial' | 'full';
+          share_type: 'partial' | 'full';
          qr_code_url?: string | null;
          status?: 'pending' | 'confirmed' | 'expired';
          expires_at: string;
          confirmed_at?: string | null;
          created_at?: string;
        };
        Update: {
          // ... same as Insert
        };
      };
    };
  };
}
```

---

### **FAZ 4: COMPONENT RENAME** ⏱️ 10 dakika

#### **4.1 Dosya İsimlerini Değiştir**

```bash
# Old → New
/components/employee/FoodDonationHome.tsx → MenuMarketHome.tsx
/components/employee/DonationDetailPage.tsx → ShareDetailPage.tsx
/components/employee/DonorListPage.tsx → SupporterListPage.tsx
/components/employee/FindSupportPage.tsx → FindSharePage.tsx
```

#### **4.2 Component İsimlerini Değiştir**

```diff
// FoodDonationHome.tsx → MenuMarketHome.tsx
- export function FoodDonationHome({ onNavigate }: FoodDonationHomeProps) {
+ export function MenuMarketHome({ onNavigate }: MenuMarketHomeProps) {

// DonationDetailPage.tsx → ShareDetailPage.tsx
- export function DonationDetailPage({ onNavigate, requestId }: DonationDetailPageProps) {
+ export function ShareDetailPage({ onNavigate, requestId }: ShareDetailPageProps) {

// DonorListPage.tsx → SupporterListPage.tsx
- export function DonorListPage({ onNavigate, currentUserId }: DonorListPageProps) {
+ export function SupporterListPage({ onNavigate, currentUserId }: SupporterListPageProps) {

// FindSupportPage.tsx → FindSharePage.tsx
- export function FindSupportPage({ onNavigate, currentUserId }: FindSupportPageProps) {
+ export function FindSharePage({ onNavigate, currentUserId }: FindSharePageProps) {
```

#### **4.3 App.tsx İmportları Güncelle**

```diff
- import { FoodDonationHome } from "./components/employee/FoodDonationHome";
- import { DonorListPage } from "./components/employee/DonorListPage";
- import { FindSupportPage } from "./components/employee/FindSupportPage";
- import { DonationDetailPage } from "./components/employee/DonationDetailPage";
+ import { MenuMarketHome } from "./components/employee/MenuMarketHome";
+ import { SupporterListPage } from "./components/employee/SupporterListPage";
+ import { FindSharePage } from "./components/employee/FindSharePage";
+ import { ShareDetailPage } from "./components/employee/ShareDetailPage";

type Page = 
  | 'home'
  // ...
-  | 'food-donation-home'
-  | 'donor-list'
-  | 'find-support'
-  | 'donation-detail'
+  | 'menu-market-home'
+  | 'supporter-list'
+  | 'find-share'
+  | 'share-detail'
  | 'admin-panel';

// Switch statement'ta:
-  case 'food-donation-home':
-    return <FoodDonationHome onNavigate={handleNavigate} />;
-  case 'donor-list':
-    return <DonorListPage onNavigate={handleNavigate} currentUserId={user.id} />;
-  case 'find-support':
-    return <FindSupportPage onNavigate={handleNavigate} currentUserId={user.id} />;
-  case 'donation-detail':
-    return <DonationDetailPage onNavigate={handleNavigate} requestId={selectedJobId} />;
+  case 'menu-market-home':
+    return <MenuMarketHome onNavigate={handleNavigate} />;
+  case 'supporter-list':
+    return <SupporterListPage onNavigate={handleNavigate} currentUserId={user.id} />;
+  case 'find-share':
+    return <FindSharePage onNavigate={handleNavigate} currentUserId={user.id} />;
+  case 'share-detail':
+    return <ShareDetailPage onNavigate={handleNavigate} requestId={selectedJobId} />;
```

---

### **FAZ 5: UI METİNLERİ** ⏱️ 15 dakika

#### **5.1 LandingPage.tsx**

```diff
<p className="text-base text-[#012840] leading-relaxed">
-  Üstelik sosyal dayanışma modülümüzle, <span className="font-semibold text-[#0367A6]">"Yemeksiz Destek Ol"</span> ya da <span className="font-semibold text-[#0367A6]">"Yemek Desteği Bul"</span> diyerek, restoran harcamalarına destek olabilir veya destek bulabilirsin ve paylaşmanın bir parçası olabilirsin! 💙
+  Üstelik Menü Market modülümüzle, <span className="font-semibold text-[#0367A6]">"Paylaşım Yap"</span> ya da <span className="font-semibold text-[#0367A6]">"Paylaşım Bul"</span> diyerek, restoran harcamalarında paylaşım yapabilir veya yararlanabilirsin! 💙
</p>

<p className="text-xl text-[#C9E2F2] max-w-3xl mx-auto mb-12">
-  Workigom'da çalışarak sadece kendin için değil, toplum için de değer yaratıyorsun. Dayanışma Menüsü ile ihtiyaç sahiplerine restoran harcamalarında destek oluyoruz.
+  Workigom'da çalışarak sadece kendin için değil, toplum için de değer yaratıyorsun. Menü Market ile ihtiyaç sahiplerine restoran harcamalarında paylaşım yapıyoruz.
</p>

<h3 className="text-white mb-2">Sosyal Destek</h3>
-<p className="text-sm text-white/90">İhtiyaç sahiplerine otomatik destek</p>
+<p className="text-sm text-white/90">Menü Market paylaşımı</p>

<li>Destek Programı</li>
+<li>Paylaşım Programı</li>
```

#### **5.2 EmployeeHome.tsx**

```diff
<Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-6 cursor-pointer hover:scale-105 transition-transform">
-  <h3 className="text-white mb-2">Birlikte Paylaşıyoruz 🍽️</h3>
-  <p className="text-sm text-white/90 mb-4">Dayanışma Menüsü ile destek ol veya destek bul</p>
+  <h3 className="text-white mb-2">Menü Market 🍽️</h3>
+  <p className="text-sm text-white/90 mb-4">Menü Market ile paylaş veya yararlan</p>
  <div className="flex gap-2">
-    <Button variant="secondary" size="sm" onClick={() => onNavigate('donor-list')}>
-      Yemek Bağışçısı Ol
+    <Button variant="secondary" size="sm" onClick={() => onNavigate('supporter-list')}>
+      Destekçi Ol
    </Button>
-    <Button variant="secondary" size="sm" onClick={() => onNavigate('find-support')}>
-      Destek Bul
+    <Button variant="secondary" size="sm" onClick={() => onNavigate('find-share')}>
+      Paylaşım Bul
    </Button>
  </div>
</Card>
```

#### **5.3 Navigation Links**

Tüm `onNavigate('food-donation-home')` çağrılarını `onNavigate('menu-market-home')` olarak değiştir.

```diff
- onClick={() => onNavigate('food-donation-home')}
+ onClick={() => onNavigate('menu-market-home')}

- onClick={() => onNavigate('donor-list')}
+ onClick={() => onNavigate('supporter-list')}

- onClick={() => onNavigate('find-support')}
+ onClick={() => onNavigate('find-share')}

- onClick={() => onNavigate('donation-detail')}
+ onClick={() => onNavigate('share-detail')}
```

---

### **FAZ 6: LOCALSTORAGE KEYS** ⏱️ 10 dakika

Tüm component dosyalarında:

```diff
- localStorage.getItem('foodDonationRequests')
+ localStorage.getItem('menuShareRequests')

- localStorage.setItem('foodDonationRequests', ...)
+ localStorage.setItem('menuShareRequests', ...)

- localStorage.getItem('activeDonations')
+ localStorage.getItem('activeShares')

- localStorage.setItem('activeDonations', ...)
+ localStorage.setItem('activeShares', ...)
```

**Etkilenen Dosyalar:**
- MenuMarketHome.tsx (eski FoodDonationHome.tsx)
- ShareDetailPage.tsx (eski DonationDetailPage.tsx)
- SupporterListPage.tsx (eski DonorListPage.tsx)
- FindSharePage.tsx (eski FindSupportPage.tsx)

---

### **FAZ 7: BİLDİRİM METİNLERİ** ⏱️ 5 dakika

```diff
// Bildirim başlıkları ve mesajları
- title: '💛 Tam Destek!',
- message: '${donorName} yemeğine "Buda Benden" diyerek tamamına destek olmak istiyor 💛',
+ title: '💛 Tam Paylaşım!',
+ message: '${supporterName} menünüzü "Buda Benden" diyerek tamamen paylaşmak istiyor 💛',

- title: '💛 Destek Var!',
- message: '${donorName} yemeğine destek olmak istiyor 💛',
+ title: '💛 Paylaşım Var!',
+ message: '${supporterName} menünüzü paylaşmak istiyor 💛',

- title: '❌ Bağışçı İptal Etti',
- message: '${request.donorName} desteği iptal etti.',
+ title: '❌ Destekçi İptal Etti',
+ message: '${request.supporterName} paylaşımı iptal etti.',
```

---

### **FAZ 8: TOAST MESAJLARI** ⏱️ 5 dakika

```diff
- toast.success('🎉 Onaylandı!', { description: 'Destek tamamlandı' });
+ toast.success('🎉 Onaylandı!', { description: 'Paylaşım tamamlandı' });

- toast.success('QR kod yüklendi!', { description: 'Destek alan kişi QR kodu görebilecek' });
+ toast.success('QR kod yüklendi!', { description: 'Yararlanıcı QR kodu görebilecek' });

- toast.success('📲 QR Kod Yükleme Ekranına Yönlendiriliyorsunuz...', { description: 'Destek alan kişi ödeme yapmayacak' });
+ toast.success('📲 QR Kod Yükleme Ekranına Yönlendiriliyorsunuz...', { description: 'Yararlanıcı ödeme yapmayacak' });
```

---

## ⚠️ DİKKAT EDİLMESİ GEREKENLER

### **1. "BUDA BENDEN" İFADESİ DEĞİŞMİYOR! ✅**

```
❌ YANLIŞ:
"Buda Benden" → "Bu da Paylaşımım"

✅ DOĞRU:
"Buda Benden" → "Buda Benden" (AYNI KALIYOR)
```

Bu ifade marka ismi gibi, değiştirmeyin!

---

### **2. ALTıN KALP ROZETİ AYNI KALIYOR ✅**

```
❌ YANLIŞ:
"Altın Kalp" → "Altın Paylaşım Rozeti"

✅ DOĞRU:
"Altın Kalp ❤️" → "Altın Kalp ❤️" (AYNI KALIYOR)
```

Rozet ismi değişmiyor, sadece ne zaman kazanıldığı değişiyor:
```
%100 destek verdiğin her kişi için → %100 paylaşım yaptığın her kişi için
```

---

### **3. QR KOD SİSTEMİ AYNI KALIYOR**

QR kod akışı, süreler (5 dakika), durumlar (pending, confirmed, expired) hepsi aynı kalıyor.

Sadece yorumlar/açıklamalar değişiyor:
```diff
- // Bağış talebi için QR kod
+ // Paylaşım talebi için QR kod

- // Bağışçı QR kodu yükleyecek
+ // Destekçi QR kodu yükleyecek
```

---

### **4. %20 ve %100 ORANLAR AYNI**

Oran isimleri değişmeli:
```diff
- %20 Kısmi Destek
+ %20 Kısmi Paylaşım

- %100 Tam Destek
+ %100 Tam Paylaşım
```

---

### **5. BACKEND ENTEGRASYON**

Eğer Supabase kuruluysa:

```sql
-- Tablo adını değiştir
ALTER TABLE donations RENAME TO menu_shares;

-- Kolonları değiştir
ALTER TABLE menu_shares RENAME COLUMN donor_id TO supporter_id;
ALTER TABLE menu_shares RENAME COLUMN recipient_id TO beneficiary_id;
ALTER TABLE menu_shares RENAME COLUMN donation_type TO share_type;

-- İndexleri yeniden oluştur
DROP INDEX IF EXISTS idx_donations_donor_id;
DROP INDEX IF EXISTS idx_donations_recipient_id;
DROP INDEX IF EXISTS idx_donations_status;

CREATE INDEX idx_menu_shares_supporter_id ON menu_shares(supporter_id);
CREATE INDEX idx_menu_shares_beneficiary_id ON menu_shares(beneficiary_id);
CREATE INDEX idx_menu_shares_status ON menu_shares(status);

-- RLS policies'leri yeniden oluştur (DROP + CREATE)
```

---

## 📊 DEĞİŞİKLİK ÖZETİ

```
DOSYA SAYISI:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
15 .md dosyası
2 .sql dosyası
5 .tsx component dosyası (rename + içerik)
3 .ts/.tsx utility/type dosyası
1 App.tsx dosyası

TOPLAM: ~26 dosya

KELİME DEĞİŞİKLİĞİ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"Yemek Bağışı" → "Menü Market Paylaşımı"
"Bağış" → "Paylaşım"
"Bağışçı" → "Destekçi"
"Alıcı" → "Yararlanıcı"
"donations" → "menu_shares"
"donor" → "supporter"
"recipient" → "beneficiary"

TAHMİNİ SÜRE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Dokümantasyon: 15 dakika
Database: 10 dakika
TypeScript: 5 dakika
Component Rename: 10 dakika
UI Metinleri: 15 dakika
LocalStorage: 10 dakika
Bildirimler: 5 dakika
Toast: 5 dakika

TOPLAM: ~75 dakika (1 saat 15 dakika)
```

---

## 🚀 BAŞLATMA PLANI

### **OPSİYON 1: HEMEN BAŞLA (Önerilen)**

```bash
# Adım 1: Yeni branch oluştur
git checkout -b feature/menu-market-terminology

# Adım 2: Değişiklikleri yap (yukarıdaki sıraya göre)
# ... (manuel değişiklikler)

# Adım 3: Test et
npm run dev

# Adım 4: Commit
git add .
git commit -m "🔄 Terminoloji değişikliği: Yemek Bağışı → Menü Market Paylaşımı"

# Adım 5: GitHub'a push
git push origin feature/menu-market-terminology

# Adım 6: Main'e merge
git checkout main
git merge feature/menu-market-terminology
git push origin main
```

---

### **OPSİYON 2: AŞAMALı DEĞİŞİKLİK**

**Faz 1:** Sadece dokümantasyon değiştir (bugün)
**Faz 2:** Database schema değiştir (yarın)
**Faz 3:** Component'leri yeniden adlandır (3. gün)
**Faz 4:** UI metinlerini değiştir (4. gün)
**Faz 5:** LocalStorage keys değiştir (5. gün)
**Faz 6:** Test ve deploy (6. gün)

Her faz için ayrı commit + push

---

## ✅ TEST KONTROL LİSTESİ

Değişiklik tamamlandıktan sonra:

### **Frontend Test:**
- [ ] Landing page'de "Menü Market Paylaşımı" yazıyor
- [ ] Employee home'da "Destekçi Ol" ve "Paylaşım Bul" butonları var
- [ ] Menü Market sayfası açılıyor
- [ ] Paylaşım oluşturma akışı çalışıyor
- [ ] Destekçi listesi çalışıyor
- [ ] QR kod sistemi çalışıyor (isimler değişmiş ama akış aynı)
- [ ] Bildirimler doğru metinlerle geliyor
- [ ] Toast mesajları güncellenmiş

### **Database Test (Supabase kuruluysa):**
- [ ] `menu_shares` tablosu var
- [ ] `donations` tablosu yok (rename edildi)
- [ ] `supporter_id`, `beneficiary_id`, `share_type` kolonları var
- [ ] RLS policies çalışıyor
- [ ] Indexler oluşturulmuş

### **Type Test:**
- [ ] TypeScript hataları yok
- [ ] `MenuShareRequest` interface tanımlı
- [ ] `FoodDonationRequest` kullanımı yok
- [ ] Import hataları yok

---

## 🆘 SORUN GİDERME

### **"Cannot find module 'FoodDonationHome'" hatası**

```
Çözüm: Component dosyasının adını değiştirmeyi unuttunuz.
FoodDonationHome.tsx → MenuMarketHome.tsx
```

### **LocalStorage'da eski data var**

```
Çözüm: localStorage'ı temizleyin
localStorage.removeItem('foodDonationRequests');
localStorage.removeItem('activeDonations');

Veya tarayıcı console'da:
localStorage.clear();
```

### **TypeScript hatası: "Property 'donor_id' does not exist"**

```
Çözüm: Type tanımlarını güncelleyin
/lib/mockData.ts ve /utils/supabase/types.ts dosyalarındaki
donor_id → supporter_id
recipient_id → beneficiary_id
donation_type → share_type
```

---

## 📝 ÖZET

**Amaç:** "Yemek Bağışı" terminolojisini "Menü Market Paylaşımı" olarak değiştirmek

**Etkilenen Alan:** 26 dosya (15 .md, 2 .sql, 9 .tsx/.ts)

**Süre:** ~75 dakika (1 saat 15 dakika)

**Sonuç:** 
- ✅ Tüm "bağış" kelimeleri "paylaşım" olacak
- ✅ Database tablosu `menu_shares` olacak
- ✅ Component isimleri güncellenecek
- ✅ UI metinleri değişecek
- ✅ "Buda Benden" ve "Altın Kalp" aynı kalacak ✅

---

**SİMDİ NE YAPACAKSINIZ?**

1. Bu dosyayı okuyun ✅ (TAMAMLANDI)
2. Hangi opsiyonu seçeceğinize karar verin (Hemen başla vs Aşamalı)
3. Değişiklikleri yapmaya başlayın (yukarıdaki sıraya göre)
4. Her faz sonrası test edin
5. Commit + Push yapın

**BAŞARILAR! 🎉**
