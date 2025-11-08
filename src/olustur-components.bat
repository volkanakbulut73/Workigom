@echo off
echo.
echo 🚀 FindSharePage.tsx ve ShareDetailPage.tsx oluşturuluyor...
echo.

:: FindSharePage.tsx oluştur
powershell -Command "Get-Content components/employee/FindSupportPage.tsx | ForEach-Object { $_ -creplace 'FindSupportPage', 'FindSharePage' -creplace 'FindSupportPageProps', 'FindSharePageProps' -creplace 'FoodDonationRequest', 'MenuShareRequest' -creplace 'foodDonationRequests', 'menuShareRequests' -creplace 'activeDonations', 'activeShares' -creplace 'donation_cancelled', 'share_cancelled' -creplace 'donorId', 'supporterId' -creplace 'donorName', 'supporterName' -creplace 'donorInitials', 'supporterInitials' -creplace 'donor_matched', 'supporter_matched' -creplace '\"Bağışçı\"', '\"Destekçi\"' -creplace '\"Destek Bul\"', '\"Paylaşım Bul\"' -creplace '\"Destek Talebi\"', '\"Paylaşım Talebi\"' -creplace '\"Yemek Destek\"', '\"Menü Paylaşım\"' -creplace 'food-donation-home', 'menu-market-home' } | Out-File -Encoding UTF8 components/employee/FindSharePage.tsx"

echo ✅ FindSharePage.tsx oluşturuldu!
echo.

:: ShareDetailPage.tsx oluştur
powershell -Command "Get-Content components/employee/DonationDetailPage.tsx | ForEach-Object { $_ -creplace 'DonationDetailPage', 'ShareDetailPage' -creplace 'DonationDetailPageProps', 'ShareDetailPageProps' -creplace 'FoodDonationRequest', 'MenuShareRequest' -creplace 'foodDonationRequests', 'menuShareRequests' -creplace 'activeDonations', 'activeShares' -creplace 'donation_cancelled', 'share_cancelled' -creplace 'donorId', 'supporterId' -creplace 'donorName', 'supporterName' -creplace 'donorInitials', 'supporterInitials' -creplace 'donor_matched', 'supporter_matched' -creplace '\"Bağışçı\"', '\"Destekçi\"' -creplace '\"Bağış Detayı\"', '\"Paylaşım Detayı\"' -creplace '\"Destek alan\"', '\"Yararlanıcı\"' -creplace '%%20 Kısmi Destek', '%%20 Kısmi Paylaşım' -creplace '%%100 Tam Destek', '%%100 Tam Paylaşım' -creplace 'food-donation-home', 'menu-market-home' } | Out-File -Encoding UTF8 components/employee/ShareDetailPage.tsx"

echo ✅ ShareDetailPage.tsx oluşturuldu!
echo.

echo 🗑️  Eski dosyalar siliniyor...
echo.

:: Eski dosyaları sil
del /f components\employee\FoodDonationHome.tsx 2>nul
del /f components\employee\DonorListPage.tsx 2>nul
del /f components\employee\DonationDetailPage.tsx 2>nul
del /f components\employee\FindSupportPage.tsx 2>nul

echo ✅ Eski dosyalar silindi!
echo.
echo 🎉 TAMAMLANDI! Şimdi 'npm run build' yapın.
echo.
pause
