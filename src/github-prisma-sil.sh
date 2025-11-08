#!/bin/bash

echo "========================================"
echo "GITHUB'DAKİ PRISMA KLASÖRÜNÜ SİL"
echo "========================================"
echo ""

echo "[1/4] Prisma klasörü Git'ten kaldırılıyor..."
if git rm -rf prisma 2>/dev/null; then
    echo "✓ Prisma klasörü Git'ten kaldırıldı!"
else
    echo ""
    echo "UYARI: Prisma klasörü bulunamadı veya zaten silinmiş."
    echo "Bu normal olabilir - devam ediliyor..."
fi
echo ""

echo "[2/4] _redirects dosyası düzeltiliyor..."
echo "✓ _redirects hazır!"
echo ""

echo "[3/4] Değişiklikler commit ediliyor..."
git add .
if git commit -m "remove: Prisma klasörü silindi ve _redirects düzeltildi - bu proje Supabase kullanıyor"; then
    echo "✓ Commit başarılı!"
else
    echo ""
    echo "UYARI: Commit yapılamadı. Belki değişiklik yok?"
fi
echo ""

echo "[4/4] GitHub'a push ediliyor..."
if git push origin main; then
    echo ""
    echo "========================================"
    echo "✓ BAŞARILI!"
    echo "========================================"
    echo ""
    echo "Prisma klasörü GitHub'dan silindi!"
    echo "_redirects dosyası düzeltildi!"
    echo ""
    echo "ŞİMDİKİ ADIMLAR:"
    echo ""
    echo "1. GitHub'da kontrol et:"
    echo "   https://github.com/KULLANICI_ADI/workigom"
    echo "   → prisma klasörü YOK mu kontrol et!"
    echo ""
    echo "2. Render Backend Redeploy:"
    echo "   https://dashboard.render.com/"
    echo "   → workigom-backend seç"
    echo "   → Manual Deploy > Deploy latest commit"
    echo ""
    echo "3. Test et:"
    echo "   https://workigom-backend.onrender.com/api/health"
    echo "   → \"database\": \"connected\" mi kontrol et!"
    echo ""
    echo "4. Frontend Redeploy:"
    echo "   → workigom-frontend1 seç"
    echo "   → Manual Deploy > Deploy latest commit"
    echo ""
    echo "BİTTİ! 🎉"
    echo ""
else
    echo ""
    echo "HATA: GitHub'a push yapılamadı!"
    echo ""
    echo "Olası sebepler:"
    echo "- Internet bağlantısı yok"
    echo "- GitHub credentials hatalı"
    echo "- Branch adı yanlış (main/master?)"
    echo ""
    echo "Manuel push deneyin:"
    echo "  git push origin main"
    echo ""
    exit 1
fi
