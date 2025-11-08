# ⏳ KALAN İŞLEMLER - MANUEL OLARAK YAPIN!

## ✅ TAMAMLANANLAR (%85)

```
✅ _redirects düzeltildi (16. kez!)
✅ 15 .md dosyası güncellendi
✅ Database schema (menu_shares tablosu)
✅ mockData.ts güncellendi
✅ MenuMarketHome.tsx oluşturuldu
✅ SupporterListPage.tsx oluşturuldu
✅ App.tsx kısmen güncellendi (MenuMarketHome ve SupporterListPage import'ları)
✅ LocalStorage migration kodu eklendi
```

---

## ⏳ KALAN İŞLEMLER (%15 - Tahmini 20 dakika)

### **1. İKİ COMPONENT DOSYASI OLUŞTUR** ⏱️ 10 dakika

#### **A. FindSharePage.tsx Oluştur**

**Adımlar:**
```bash
cd components/employee
cp FindSupportPage.tsx FindSharePage.tsx
```

**Sonra VS Code'da CTRL+H ile Find & Replace:**

```
FindSupportPage          → FindSharePage
FindSupportPageProps     → FindSharePageProps
FoodDonationRequest      → MenuShareRequest
foodDonationRequests     → menuShareRequests
activeDonations          → activeShares
donation_cancelled       → share_cancelled
donorId                  → supporterId
donorName                → supporterName
donorInitials            → supporterInitials
donor_matched            → supporter_matched
"Bağışçı"               → "Destekçi"
"Destek Bul"            → "Paylaşım Bul"
"Destek Talebi"         → "Paylaşım Talebi"
"Yemek Destek"          → "Menü Paylaşım"
```

---

#### **B. ShareDetailPage.tsx Oluştur**

**Adımlar:**
```bash
cd components/employee
cp DonationDetailPage.tsx ShareDetailPage.tsx
```

**Sonra VS Code'da CTRL+H ile Find & Replace:**

```
DonationDetailPage       → ShareDetailPage
DonationDetailPageProps  → ShareDetailPageProps
FoodDonationRequest      → MenuShareRequest
foodDonationRequests     → menuShareRequests
activeDonations          → activeShares
donation_cancelled       → share_cancelled
donorId                  → supporterId
donorName                → supporterName
donorInitials            → supporterInitials
donor_matched            → supporter_matched
"Bağışçı"               → "Destekçi"
"Bağış Detayı"          → "Paylaşım Detayı"
"Destek alan"           → "Yararlanıcı"
"%20 Kısmi Destek"      → "%20 Kısmi Paylaşım"
"%100 Tam Destek"       → "%100 Tam Paylaşım"
```

---

### **2. APP.TSX IMPORT'LARI GÜNCELLE** ⏱️ 2 dakika

**Dosya:** `/App.tsx`

**Satır 21-22 civarı - Import'ları güncelle:**

```typescript
import { FindSharePage } from "./components/employee/FindSharePage";
import { ShareDetailPage } from "./components/employee/ShareDetailPage";
```

**Satır 202-205 civarı - Switch case'leri güncelle:**

```typescript
case 'find-share':
  return <FindSharePage onNavigate={handleNavigate} currentUserId={user.id} />;
case 'share-detail':
  return <ShareDetailPage onNavigate={handleNavigate} requestId={selectedJobId} />;
```

---

### **3. EMPLOYEEHOME.TSX BUTONLARI GÜNCELLE** ⏱️ 3 dakika

**Dosya:** `/components/employee/EmployeeHome.tsx`

**CTRL+F ile bulun ve değiştirin:**

```typescript
// Butonlar - muhtemelen 200-300 satır arasında:

// Eski:
onClick={() => onNavigate('food-donation-home')}

// Yeni:
onClick={() => onNavigate('menu-market-home')}
```

**NOT:** EmployeeHome.tsx çok uzun bir dosya. Menü Market ile ilgili bölümü bulmak için:
1. CTRL+F ile `food-donation` arayın
2. Tüm bulunanları `menu-market` ile değiştirin
3. `Yemek Bağışçısı Ol` → `Destekçi Ol`
4. `Destek Bul` → `Paylaşım Bul`
5. `Birlikte Paylaşıyoruz` → `Menü Market`

---

### **4. ESKİ COMPONENT DOSYALARINI SİLİN** ⏱️ 1 dakika

```bash
cd components/employee

rm FoodDonationHome.tsx
rm DonorListPage.tsx
rm DonationDetailPage.tsx
rm FindSupportPage.tsx
```

---

### **5. TEST EDİN** ⏱️ 5 dakika

```bash
# TypeScript kontrolü:
npm run build

# Geliştirme sunucusu:
npm run dev
```

**Kontroller:**
```
✅ TypeScript hataları yok
✅ Build başarılı
✅ Menü Market sayfası açılıyor
✅ Destekçi Ol butonu çalışıyor
✅ Paylaşım Bul butonu çalışıyor
✅ Console'da migration logları görünüyor:
   ✅ Migrated: foodDonationRequests → menuShareRequests
   ✅ Migrated: activeDonations → activeShares
   ✅ Migrated: donorAvailability → supporterAvailability
```

---

### **6. COMMIT & PUSH** ⏱️ 2 dakika

```bash
git add .
git commit -m "🎉 Terminoloji değişikliği %100 tamamlandı: Yemek Bağışı → Menü Market Paylaşımı"
git push origin main
```

---

## 📊 TERMİNOLOJİ DEĞİŞİKLİK TABLOSU

```
ESKİ                          →    YENİ
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Yemek Bağışı                  →    Menü Market Paylaşımı
Dayanışma Menüsü              →    Menü Market
Bağışçı                       →    Destekçi
Bağış                         →    Paylaşım
Destek Arayan                 →    Paylaşımdan Yararlanan
Yemek Bağışçısı Ol            →    Destekçi Ol
Destek Bul                    →    Paylaşım Bul
Destek Bekleyen               →    Paylaşım Bekleyen
Destek alan                   →    Yararlanıcı

DATABASE:
donations                     →    menu_shares
donor_id                      →    supporter_id
recipient_id                  →    beneficiary_id

LOCALSTORAGE:
foodDonationRequests          →    menuShareRequests
activeDonations               →    activeShares
donorAvailability             →    supporterAvailability

COMPONENTS:
FoodDonationHome              →    MenuMarketHome ✅
DonorListPage                 →    SupporterListPage ✅
DonationDetailPage            →    ShareDetailPage ⏳
FindSupportPage               →    FindSharePage ⏳

ROUTES:
food-donation-home            →    menu-market-home ✅
donor-list                    →    supporter-list ✅
donation-detail               →    share-detail ✅
find-support                  →    find-share ✅

TYPES:
FoodDonationRequest           →    MenuShareRequest
donation_cancelled            →    share_cancelled
donor_matched                 →    supporter_matched

BİLDİRİM TYPES:
food_donation                 →    menu_share
```

---

## 🎯 HIZLI BAŞLANGIÇ (Kopyala-Yapıştır)

**Terminal'de çalıştırın:**

```bash
# 1. Component dosyalarını kopyala
cd components/employee
cp FindSupportPage.tsx FindSharePage.tsx
cp DonationDetailPage.tsx ShareDetailPage.tsx
cd ../..

echo "✅ Dosyalar kopyalandı!"
echo "⏳ Şimdi VS Code'da CTRL+H ile Find & Replace yapın:"
echo ""
echo "FindSharePage.tsx için:"
echo "  FindSupportPage → FindSharePage"
echo "  FoodDonationRequest → MenuShareRequest"
echo "  foodDonationRequests → menuShareRequests"
echo ""
echo "ShareDetailPage.tsx için:"
echo "  DonationDetailPage → ShareDetailPage"
echo "  FoodDonationRequest → MenuShareRequest"
echo "  foodDonationRequests → menuShareRequests"
echo ""
echo "App.tsx'i güncelle (satır 21-22 ve 202-205)"
echo "EmployeeHome.tsx'i güncelle (CTRL+F: food-donation)"
```

---

## 📋 DETAYLI KONTROL LİSTESİ

```
COMPONENT OLUŞTURMA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☑ MenuMarketHome.tsx oluşturuldu ✅
☑ SupporterListPage.tsx oluşturuldu ✅
☐ FindSharePage.tsx oluşturulacak ⏳
☐ ShareDetailPage.tsx oluşturulacak ⏳

APP.TSX GÜNCELLEMESİ:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☑ MenuMarketHome import ✅
☑ SupporterListPage import ✅
☐ FindSharePage import ⏳
☐ ShareDetailPage import ⏳
☑ Type değişiklikleri ✅
☑ MenuMarketHome switch case ✅
☑ SupporterListPage switch case ✅
☐ FindSharePage switch case ⏳
☐ ShareDetailPage switch case ⏳

EMPLOYEEHOME.TSX:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ onClick('menu-market-home') ⏳
☐ "Destekçi Ol" butonu ⏳
☐ "Paylaşım Bul" butonu ⏳
☐ "Menü Market" başlığı ⏳

ESKİ DOSYA SİLME:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ FoodDonationHome.tsx silinecek ⏳
☐ DonorListPage.tsx silinecek ⏳
☐ DonationDetailPage.tsx silinecek ⏳
☐ FindSupportPage.tsx silinecek ⏳

TEST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ npm run build ⏳
☐ npm run dev ⏳
☐ Menü Market açılıyor mu? ⏳
☐ Destekçi Ol çalışıyor mu? ⏳
☐ Paylaşım Bul çalışıyor mu? ⏳
☐ Migration logları görünüyor mu? ⏳

GIT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
☐ git add . ⏳
☐ git commit ⏳
☐ git push ⏳
```

---

## 💡 İPUCLARI

### **Find & Replace Yaparken:**
- **CTRL+H** tuşuna basın
- **Match Case** seçeneğini açın (aA düğmesi)
- **Match Whole Word** seçeneğini açın (ab| düğmesi)
- Değiştirmeden önce **Replace All** yerine **Replace** ile tek tek kontrol edin

### **EmployeeHome.tsx'de:**
- Dosya çok uzun olduğu için **CTRL+F** ile `food-donation` arayın
- Bulduğunuz her yeri dikkatlice kontrol edin
- Bazen comment satırlarında da geçebilir, onları da değiştirin

### **Test Ederken:**
- Console'u açık tutun (F12)
- Migration loglarını kontrol edin
- Hata varsa tam olarak okuyun

---

## 🎉 BAŞARILAR!

**%85 tamamlandı!** 🎊

**Kalan işlemler sadece 20 dakika sürecek.**

**Bu dosyayı takip ederek adım adım ilerleyin.**

**Başarılar! 💪**
