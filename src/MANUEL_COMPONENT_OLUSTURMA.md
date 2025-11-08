# 🎯 MANUEL COMPONENT OLUŞTURMA REHBERİ

## ⚡ 5 DAKİKADA BİTİRELİM!

Terminal komutu çalışmadığı için VS Code'da manuel yapıyoruz.

---

## 📝 ADIM 1: FindSharePage.tsx Oluştur

### 1.1. Dosyayı Aç ve Kopyala
```
1. VS Code'da components/employee/FindSupportPage.tsx dosyasını aç
2. CTRL+A (tümünü seç)
3. CTRL+C (kopyala)
```

### 1.2. Yeni Dosya Oluştur
```
4. components/employee/ klasörüne sağ tıkla
5. "New File" (Yeni Dosya)
6. İsim: FindSharePage.tsx
7. CTRL+V (yapıştır)
```

### 1.3. Find & Replace (CTRL+H)

**ÖNEMLİ:** Her satırı TEK TEK değiştirin! Hepsini birden değil!

```
Find (Bul)                    →  Replace (Değiştir)
─────────────────────────────────────────────────────
FindSupportPage               →  FindSharePage
FindSupportPageProps          →  FindSharePageProps
FoodDonationRequest           →  MenuShareRequest
foodDonationRequests          →  menuShareRequests
activeDonations               →  activeShares
donation_cancelled            →  share_cancelled
donor_matched                 →  supporter_matched
donorId                       →  supporterId
donorName                     →  supporterName
donorInitials                 →  supporterInitials
"Bağışçı"                     →  "Destekçi"
"Destek Bul"                  →  "Paylaşım Bul"
"Destek Talebi"               →  "Paylaşım Talebi"
food-donation-home            →  menu-market-home
'Bağışçı bulundu!'            →  'Destekçi bulundu!'
'Bağışçı QR kodu hazırlıyor'  →  'Destekçi QR kodu hazırlıyor'
bağışçıdan                    →  destekçiden
Bağışçının desteği:           →  Destekçinin paylaşımı:
Bağışçılar talepinizi         →  Destekçiler talebinizi
```

### 1.4. Kaydet
```
CTRL+S (dosyayı kaydet)
```

---

## 📝 ADIM 2: ShareDetailPage.tsx Oluştur

### 2.1. Dosyayı Aç ve Kopyala
```
1. VS Code'da components/employee/DonationDetailPage.tsx dosyasını aç
2. CTRL+A (tümünü seç)
3. CTRL+C (kopyala)
```

### 2.2. Yeni Dosya Oluştur
```
4. components/employee/ klasörüne sağ tıkla
5. "New File" (Yeni Dosya)
6. İsim: ShareDetailPage.tsx
7. CTRL+V (yapıştır)
```

### 2.3. Find & Replace (CTRL+H)

**ÖNEMLİ:** Her satırı TEK TEK değiştirin!

```
Find (Bul)                    →  Replace (Değiştir)
─────────────────────────────────────────────────────
DonationDetailPage            →  ShareDetailPage
DonationDetailPageProps       →  ShareDetailPageProps
FoodDonationRequest           →  MenuShareRequest
foodDonationRequests          →  menuShareRequests
activeDonations               →  activeShares
donation_cancelled            →  share_cancelled
donor_matched                 →  supporter_matched
donorId                       →  supporterId
donorName                     →  supporterName
donorInitials                 →  supporterInitials
"Bağışçı"                     →  "Destekçi"
"Bağış Detayı"                →  "Paylaşım Detayı"
"Destek alan"                 →  "Yararlanıcı"
%20 Kısmi Destek              →  %20 Kısmi Paylaşım
%100 Tam Destek               →  %100 Tam Paylaşım
food-donation-home            →  menu-market-home
```

### 2.4. Kaydet
```
CTRL+S (dosyayı kaydet)
```

---

## 🗑️ ADIM 3: Eski Dosyaları Sil

VS Code'da bu dosyaları sil:

```
✅ components/employee/FoodDonationHome.tsx
✅ components/employee/DonorListPage.tsx  
✅ components/employee/DonationDetailPage.tsx
✅ components/employee/FindSupportPage.tsx
```

**Silme yöntemi:**
1. Dosyaya sağ tıkla
2. "Delete" (Sil)
3. Onaylayın

---

## ✅ ADIM 4: Kontrol Et

Terminal'de:

```bash
npm run build
```

**Beklenen sonuç:**
```
✓ 124 modules transformed.
dist/index.html                   0.46 kB
dist/assets/index-abc123.css     12.34 kB
dist/assets/index-xyz789.js     567.89 kB
✓ built in 2.34s
```

**HATA VARSA:**
- "Cannot find module" → İmport yollarını kontrol et
- "Duplicate identifier" → Dosya isimlerini kontrol et

---

## 🎉 BİTTİ MI? TEST ET!

```bash
npm run dev
```

Tarayıcıda:
```
1. http://localhost:5173 aç
2. Login: ahmet@test.com / Test123!
3. Menü Market'e tıkla
4. Destekçi Ol'a tıkla
5. Paylaşım Bul'a tıkla
6. Hata yoksa ✅ TAMAM!
```

---

## ❌ SORUN YAŞARSAN

### Sorun 1: "Cannot find module FindSharePage"
```
Çözüm: App.tsx'te import satırını kontrol et:
import { FindSharePage } from "./components/employee/FindSharePage";
```

### Sorun 2: "FoodDonationRequest is not defined"
```
Çözüm: FindSharePage.tsx içinde Find & Replace'i doğru yaptın mı?
MenuShareRequest olmalı
```

### Sorun 3: "activeDonations is not defined"
```
Çözüm: activeShares olarak değiştirilmeli
```

---

## 📊 CHECKLIST

```
☐ FindSharePage.tsx oluşturuldu
☐ FindSharePage.tsx içinde tüm değişiklikler yapıldı
☐ ShareDetailPage.tsx oluşturuldu
☐ ShareDetailPage.tsx içinde tüm değişiklikler yapıldı
☐ FoodDonationHome.tsx silindi
☐ DonorListPage.tsx silindi
☐ DonationDetailPage.tsx silindi
☐ FindSupportPage.tsx silindi
☐ npm run build çalıştı ✅
☐ npm run dev çalıştı ✅
☐ Tarayıcıda test edildi ✅
```

---

## ⏱️ SÜRE TAHMİNİ

```
1. FindSharePage.tsx oluştur      → 2 dakika
2. ShareDetailPage.tsx oluştur    → 2 dakika
3. Eski dosyaları sil             → 30 saniye
4. Build + Test                   → 1 dakika
───────────────────────────────────────────
TOPLAM:                             5.5 dakika
```

---

## 💡 PRO TİP

VS Code'da Find & Replace yaparken:

1. **"Match Case" (Aa) kapalı** olsun
2. **"Match Whole Word" (Ab|) açık** olsun
3. **"Use Regular Expression" (.*) kapalı** olsun
4. Her değişiklikten sonra **"Replace All"** yapın

---

**BAŞARILAR! 5 dakika sonra görüşürüz! 💪**
