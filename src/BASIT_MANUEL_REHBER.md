# 🚀 5 DAKİKADA BİTİR - BASİT REHBER

## ⚡ TAKİP EDİN:

### ✅ ADIM 1: FindSharePage.tsx (2 dk)

**VS Code'da:**

```
1. Aç: components/employee/FindSupportPage.tsx
2. CTRL+A (hepsini seç)
3. CTRL+C (kopyala)
4. Yeni dosya: components/employee/FindSharePage.tsx
5. CTRL+V (yapıştır)
6. CTRL+H (Find & Replace aç)
7. ÜSTTEKİ KUTUCUĞA YAZACAKSINIZ, ALTTAKİNE DEĞİŞTİRECEKSİNİZ
```

**Değişiklikler (her satırı TEK TEK):**

```
1. ÜST: FindSupportPage       ALT: FindSharePage       [Replace All]
2. ÜST: FindSupportPageProps  ALT: FindSharePageProps  [Replace All]
3. ÜST: FoodDonationRequest   ALT: MenuShareRequest    [Replace All]
4. ÜST: foodDonationRequests  ALT: menuShareRequests   [Replace All]
5. ÜST: activeDonations       ALT: activeShares        [Replace All]
6. ÜST: donation_cancelled    ALT: share_cancelled     [Replace All]
7. ÜST: donor_matched         ALT: supporter_matched   [Replace All]
8. ÜST: donorId               ALT: supporterId         [Replace All]
9. ÜST: donorName             ALT: supporterName       [Replace All]
10. ÜST: donorInitials        ALT: supporterInitials   [Replace All]
11. ÜST: "Bağışçı"            ALT: "Destekçi"          [Replace All]
12. ÜST: "Destek Bul"         ALT: "Paylaşım Bul"      [Replace All]
13. ÜST: "Destek Talebi"      ALT: "Paylaşım Talebi"   [Replace All]
14. ÜST: food-donation-home   ALT: menu-market-home    [Replace All]
15. ÜST: 'Bağışçı bulundu!'   ALT: 'Destekçi bulundu!' [Replace All]
16. ÜST: 'Bağışçı QR kodu'    ALT: 'Destekçi QR kodu'  [Replace All]
17. ÜST: bağışçıdan           ALT: destekçiden         [Replace All]
18. ÜST: Bağışçının desteği:  ALT: Destekçinin paylaşımı: [Replace All]
19. ÜST: Bağışçılar talepinizi ALT: Destekçiler talebinizi [Replace All]
```

**8. CTRL+S (kaydet)**

---

### ✅ ADIM 2: ShareDetailPage.tsx (2 dk)

**VS Code'da:**

```
1. Aç: components/employee/DonationDetailPage.tsx
2. CTRL+A
3. CTRL+C
4. Yeni dosya: components/employee/ShareDetailPage.tsx
5. CTRL+V
6. CTRL+H
```

**Değişiklikler (her satırı TEK TEK):**

```
1. ÜST: DonationDetailPage      ALT: ShareDetailPage      [Replace All]
2. ÜST: DonationDetailPageProps ALT: ShareDetailPageProps [Replace All]
3. ÜST: FoodDonationRequest     ALT: MenuShareRequest     [Replace All]
4. ÜST: foodDonationRequests    ALT: menuShareRequests    [Replace All]
5. ÜST: activeDonations         ALT: activeShares         [Replace All]
6. ÜST: donation_cancelled      ALT: share_cancelled      [Replace All]
7. ÜST: donor_matched           ALT: supporter_matched    [Replace All]
8. ÜST: donorId                 ALT: supporterId          [Replace All]
9. ÜST: donorName               ALT: supporterName        [Replace All]
10. ÜST: donorInitials          ALT: supporterInitials    [Replace All]
11. ÜST: "Bağışçı"              ALT: "Destekçi"           [Replace All]
12. ÜST: "Bağış Detayı"         ALT: "Paylaşım Detayı"    [Replace All]
13. ÜST: "Destek alan"          ALT: "Yararlanıcı"        [Replace All]
14. ÜST: %20 Kısmi Destek       ALT: %20 Kısmi Paylaşım   [Replace All]
15. ÜST: %100 Tam Destek        ALT: %100 Tam Paylaşım    [Replace All]
16. ÜST: food-donation-home     ALT: menu-market-home     [Replace All]
```

**7. CTRL+S**

---

### ✅ ADIM 3: Eski Dosyaları Sil (30 sn)

**VS Code'da:**

```
components/employee/ klasörüne git

SİL (sağ tıkla → Delete):
✅ FoodDonationHome.tsx
✅ DonorListPage.tsx
✅ DonationDetailPage.tsx
✅ FindSupportPage.tsx
```

---

### ✅ ADIM 4: Test (1 dk)

**Terminal:**

```bash
npm run build
npm run dev
```

**Tarayıcı:**

```
1. http://localhost:5173
2. Login: ahmet@test.com / Test123!
3. "Menü Market" tıkla
4. Çalışıyor mu? ✅
```

---

## 💡 HATIRLATMALAR:

### Find & Replace Ayarları:
```
VS Code'da CTRL+H'yi açınca:

✅ "Match Case" (Aa) → KAPALI (tıklayıp pasif yap)
✅ "Match Whole Word" (Ab|) → AÇIK (tıklayıp aktif yap)
✅ "Use Regular Expression" (.*) → KAPALI

Her değişiklikten sonra "Replace All" düğmesine bas!
```

### Dosya Silme:
```
Dosyaya sağ tıkla → "Delete" → Enter
```

---

## ⏱️ TOPLAM SÜRE: 5.5 DAKİKA

```
ADIM 1: 2 dk
ADIM 2: 2 dk
ADIM 3: 30 sn
ADIM 4: 1 dk
```

---

## ❌ HATA ALIRSAN:

### "Cannot find module"
→ Dosya adını yanlış yazmış olabilirsin, kontrol et

### "FoodDonationRequest is not defined"
→ ADIM 1 veya 2'deki değişiklikleri tekrar yap

### Build hata
→ Terminal'de hata mesajını oku, hangi satırda olduğunu gösterir

---

## ✅ BİTTİ Mİ?

```
☐ FindSharePage.tsx oluşturuldu
☐ ShareDetailPage.tsx oluşturuldu
☐ 4 eski dosya silindi
☐ npm run build ✅
☐ npm run dev ✅
☐ Tarayıcıda test ✅
```

---

**BAŞARILAR! 5 DAKIKADA BİTECEK! 💪**
