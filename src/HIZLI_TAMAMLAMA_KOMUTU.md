# 🚀 HIZLI TAMAMLAMA KOMUTU

## ⚡ SON 2 COMPONENT'İ HIZLICA OLUŞTUR!

**ÖNEMLİ:** Terminal'i proje **KÖK DİZİNİNDE** açın!

---

## 📍 PROJE KÖK DİZİNİ NEREDE?

Proje kök dizini, `package.json` dosyasının olduğu klasördür.

**Windows:**
```
C:\Users\YourName\Desktop\Workigom\
```

**macOS/Linux:**
```
~/Desktop/Workigom/
```

**Doğru dizinde olduğunuzu kontrol edin:**
```bash
# Bu komut "package.json" göstermeli:
ls package.json

# veya Windows'ta:
dir package.json
```

---

## ⚡ KOMPLETİ ÇALIŞTIRIN (Kopyala-Yapıştır)

### **WINDOWS (PowerShell veya CMD):**

```powershell
# FindSharePage.tsx oluştur
powershell -Command "Get-Content components/employee/FindSupportPage.tsx | ForEach-Object { $_ -replace 'FindSupportPage', 'FindSharePage' -replace 'FindSupportPageProps', 'FindSharePageProps' -replace 'FoodDonationRequest', 'MenuShareRequest' -replace 'foodDonationRequests', 'menuShareRequests' -replace 'activeDonations', 'activeShares' -replace 'donation_cancelled', 'share_cancelled' -replace 'donorId', 'supporterId' -replace 'donorName', 'supporterName' -replace 'donorInitials', 'supporterInitials' -replace 'donor_matched', 'supporter_matched' -replace '\"Bağışçı\"', '\"Destekçi\"' -replace '\"Destek Bul\"', '\"Paylaşım Bul\"' -replace '\"Destek Talebi\"', '\"Paylaşım Talebi\"' } | Out-File -Encoding UTF8 components/employee/FindSharePage.tsx"

# ShareDetailPage.tsx oluştur
powershell -Command "Get-Content components/employee/DonationDetailPage.tsx | ForEach-Object { $_ -replace 'DonationDetailPage', 'ShareDetailPage' -replace 'DonationDetailPageProps', 'ShareDetailPageProps' -replace 'FoodDonationRequest', 'MenuShareRequest' -replace 'foodDonationRequests', 'menuShareRequests' -replace 'activeDonations', 'activeShares' -replace 'donation_cancelled', 'share_cancelled' -replace 'donorId', 'supporterId' -replace 'donorName', 'supporterName' -replace 'donorInitials', 'supporterInitials' -replace 'donor_matched', 'supporter_matched' -replace '\"Bağışçı\"', '\"Destekçi\"' -replace '\"Bağış Detayı\"', '\"Paylaşım Detayı\"' -replace '\"Destek alan\"', '\"Yararlanıcı\"' -replace '%20 Kısmi Destek', '%20 Kısmi Paylaşım' -replace '%100 Tam Destek', '%100 Tam Paylaşım' } | Out-File -Encoding UTF8 components/employee/ShareDetailPage.tsx"

echo "✅ Component dosyaları oluşturuldu!"
```

### **macOS/Linux (Bash):**

```bash
# FindSharePage.tsx oluştur
sed 's/FindSupportPage/FindSharePage/g; s/FindSupportPageProps/FindSharePageProps/g; s/FoodDonationRequest/MenuShareRequest/g; s/foodDonationRequests/menuShareRequests/g; s/activeDonations/activeShares/g; s/donation_cancelled/share_cancelled/g; s/donorId/supporterId/g; s/donorName/supporterName/g; s/donorInitials/supporterInitials/g; s/donor_matched/supporter_matched/g; s/"Bağışçı"/"Destekçi"/g; s/"Destek Bul"/"Paylaşım Bul"/g; s/"Destek Talebi"/"Paylaşım Talebi"/g' components/employee/FindSupportPage.tsx > components/employee/FindSharePage.tsx

# ShareDetailPage.tsx oluştur
sed 's/DonationDetailPage/ShareDetailPage/g; s/DonationDetailPageProps/ShareDetailPageProps/g; s/FoodDonationRequest/MenuShareRequest/g; s/foodDonationRequests/menuShareRequests/g; s/activeDonations/activeShares/g; s/donation_cancelled/share_cancelled/g; s/donorId/supporterId/g; s/donorName/supporterName/g; s/donorInitials/supporterInitials/g; s/donor_matched/supporter_matched/g; s/"Bağışçı"/"Destekçi"/g; s/"Bağış Detayı"/"Paylaşım Detayı"/g; s/"Destek alan"/"Yararlanıcı"/g; s/%20 Kısmi Destek/%20 Kısmi Paylaşım/g; s/%100 Tam Destek/%100 Tam Paylaşım/g' components/employee/DonationDetailPage.tsx > components/employee/ShareDetailPage.tsx

echo "✅ Component dosyaları oluşturuldu!"
```

---

## 🎯 VEYA MANUEL YÖNTEM (VS Code)

Eğer komutlar çalışmazsa:

### **1. FindSharePage.tsx:**
```
1. components/employee/FindSupportPage.tsx dosyasını açın
2. CTRL+A (tümünü seç)
3. CTRL+C (kopyala)
4. Yeni dosya oluştur: components/employee/FindSharePage.tsx
5. CTRL+V (yapıştır)
6. CTRL+H (Find & Replace)
7. Şu değişiklikleri yapın:
   FindSupportPage → FindSharePage
   FindSupportPageProps → FindSharePageProps
   FoodDonationRequest → MenuShareRequest
   foodDonationRequests → menuShareRequests
   activeDonations → activeShares
   donor_matched → supporter_matched
   donorId → supporterId
   donorName → supporterName
   "Bağışçı" → "Destekçi"
   "Destek Bul" → "Paylaşım Bul"
```

### **2. ShareDetailPage.tsx:**
```
1. components/employee/DonationDetailPage.tsx dosyasını açın
2. CTRL+A (tümünü seç)
3. CTRL+C (kopyala)
4. Yeni dosya oluştur: components/employee/ShareDetailPage.tsx
5. CTRL+V (yapıştır)
6. CTRL+H (Find & Replace)
7. Şu değişiklikleri yapın:
   DonationDetailPage → ShareDetailPage
   DonationDetailPageProps → ShareDetailPageProps
   FoodDonationRequest → MenuShareRequest
   foodDonationRequests → menuShareRequests
   activeDonations → activeShares
   donor_matched → supporter_matched
   donorId → supporterId
   donorName → supporterName
   "Bağışçı" → "Destekçi"
   "Bağış Detayı" → "Paylaşım Detayı"
   "%20 Kısmi Destek" → "%20 Kısmi Paylaşım"
```

---

## ✅ SONRA BU DOSYALARI SİLİN

**Terminal'de:**
```bash
# ESKİ component dosyalarını sil
rm components/employee/FoodDonationHome.tsx
rm components/employee/DonorListPage.tsx
rm components/employee/DonationDetailPage.tsx
rm components/employee/FindSupportPage.tsx

echo "✅ Eski dosyalar silindi!"
```

**veya Windows PowerShell:**
```powershell
Remove-Item components/employee/FoodDonationHome.tsx
Remove-Item components/employee/DonorListPage.tsx
Remove-Item components/employee/DonationDetailPage.tsx
Remove-Item components/employee/FindSupportPage.tsx

Write-Host "✅ Eski dosyalar silindi!"
```

---

## 📝 ŞİMDİ APP.TSX'İ GÜNCELLEYİN

Bunu ben yapıyorum - bir saniye! ⏳
