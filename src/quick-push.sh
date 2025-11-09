#!/bin/bash

echo "========================================"
echo "  HIZLI GIT PUSH - ENV CHECK TEST"
echo "========================================"
echo ""

echo "[1/3] Dosyalar ekleniyor..."
if git add .; then
    echo "✓ Dosyalar eklendi!"
else
    echo ""
    echo "HATA: Git add başarısız!"
    exit 1
fi
echo ""

echo "[2/3] Commit oluşturuluyor..."
if git commit -m "fix: Prisma silindi + ENV check endpoint eklendi + _redirects düzeltildi"; then
    echo "✓ Commit başarılı!"
else
    echo ""
    echo "UYARI: Commit yapılamadı (belki değişiklik yok?)"
fi
echo ""

echo "[3/3] GitHub'a push ediliyor..."
if git push origin main; then
    echo ""
    echo "========================================"
    echo "  ✅ GIT PUSH BAŞARILI!"
    echo "========================================"
    echo ""
    echo "ŞİMDİ NE YAPMALI?"
    echo ""
    echo "1. Render Dashboard aç:"
    echo "   https://dashboard.render.com/"
    echo ""
    echo "2. workigom-backend seç"
    echo ""
    echo "3. Manual Deploy > Deploy latest commit"
    echo ""
    echo "4. ⏳ Bekle (2-3 dakika)"
    echo ""
    echo "5. Test et:"
    echo "   https://workigom-backend.onrender.com/api/_env-check"
    echo ""
    echo "   Beklenen:"
    echo "   {"
    echo "     \"ok\": true,"
    echo "     \"checks\": {"
    echo "       \"HAS_DATABASE_URL\": false  ✓ FALSE OLMALI!"
    echo "     }"
    echo "   }"
    echo ""
    echo "6. Eğer DATABASE_URL: false ise:"
    echo "   → MÜKEMMEL! Prisma hatası kayboldu! ✓"
    echo "   → /api/health test et"
    echo ""
    echo "7. Eğer DATABASE_URL: true ise:"
    echo "   → Render'da DATABASE_URL'i sil"
    echo "   → Backend redeploy"
    echo ""
    echo "DETAYLI REHBER: HEMEN_TEST_ET.md"
    echo ""
else
    echo ""
    echo "HATA: Push başarısız!"
    echo ""
    echo "Olası sebepler:"
    echo "- Internet bağlantısı yok"
    echo "- GitHub authentication gerekli"
    echo "- Branch adı yanlış (main/master?)"
    echo ""
    exit 1
fi
