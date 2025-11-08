#!/bin/bash

# Renklendirme
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 FindSharePage.tsx ve ShareDetailPage.tsx oluşturuluyor...${NC}"

# FindSharePage.tsx oluştur
sed '
s/FindSupportPage/FindSharePage/g
s/FindSupportPageProps/FindSharePageProps/g
s/FoodDonationRequest/MenuShareRequest/g
s/foodDonationRequests/menuShareRequests/g
s/activeDonations/activeShares/g
s/donation_cancelled/share_cancelled/g
s/donorId/supporterId/g
s/donorName/supporterName/g
s/donorInitials/supporterInitials/g
s/donor_matched/supporter_matched/g
s/"Bağışçı"/"Destekçi"/g
s/"Destek Bul"/"Paylaşım Bul"/g
s/"Destek Talebi"/"Paylaşım Talebi"/g
s/"Yemek Destek"/"Menü Paylaşım"/g
s/food-donation-home/menu-market-home/g
' components/employee/FindSupportPage.tsx > components/employee/FindSharePage.tsx

echo -e "${GREEN}✅ FindSharePage.tsx oluşturuldu!${NC}"

# ShareDetailPage.tsx oluştur
sed '
s/DonationDetailPage/ShareDetailPage/g
s/DonationDetailPageProps/ShareDetailPageProps/g
s/FoodDonationRequest/MenuShareRequest/g
s/foodDonationRequests/menuShareRequests/g
s/activeDonations/activeShares/g
s/donation_cancelled/share_cancelled/g
s/donorId/supporterId/g
s/donorName/supporterName/g
s/donorInitials/supporterInitials/g
s/donor_matched/supporter_matched/g
s/"Bağışçı"/"Destekçi"/g
s/"Bağış Detayı"/"Paylaşım Detayı"/g
s/"Destek alan"/"Yararlanıcı"/g
s/%20 Kısmi Destek/%20 Kısmi Paylaşım/g
s/%100 Tam Destek/%100 Tam Paylaşım/g
s/food-donation-home/menu-market-home/g
' components/employee/DonationDetailPage.tsx > components/employee/ShareDetailPage.tsx

echo -e "${GREEN}✅ ShareDetailPage.tsx oluşturuldu!${NC}"

echo -e "${BLUE}🗑️  Eski dosyalar siliniyor...${NC}"

# Eski dosyaları sil
rm -f components/employee/FoodDonationHome.tsx
rm -f components/employee/DonorListPage.tsx
rm -f components/employee/DonationDetailPage.tsx
rm -f components/employee/FindSupportPage.tsx

echo -e "${GREEN}✅ Eski dosyalar silindi!${NC}"
echo -e "${GREEN}🎉 TAMAMLANDI! Şimdi 'npm run build' yapın.${NC}"
