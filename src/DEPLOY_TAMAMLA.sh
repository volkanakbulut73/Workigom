#!/bin/bash
# Workigom Full Deploy Script (Mac/Linux)
# Git push + Render deploy talimatları

echo ""
echo "========================================"
echo "   WORKIGOM FULL DEPLOY"
echo "========================================"
echo ""

echo "🎯 ADIM 1/3: GIT PUSH"
echo "----------------------------------------"
echo ""

echo "📁 Dosyalar ekleniyor..."
git add .

echo ""
read -p "💾 Commit mesaji (bos birakirsaniz otomatik): " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="feat: Supabase backend integration and deployment"
fi

echo ""
echo "💾 Commit olusturuluyor: \"$COMMIT_MSG\""
git commit -m "$COMMIT_MSG"

echo ""
echo "⬇️  Once remote degisiklikleri aliyorum (git pull)..."
git pull origin main

if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️  Git pull basarisiz! Conflict olabilir."
    echo "📋 Conflict varsa:"
    echo "   1. Dosyalari ac ve conflict'i coz"
    echo "   2. git add ."
    echo "   3. git commit -m \"fix: merge conflicts\""
    echo "   4. Bu scripti tekrar calistir"
    read -p "Devam etmek icin Enter'a basin..."
    exit 1
fi

echo ""
echo "⬆️  GitHub'a yukleniyor..."
git push origin main

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Git push basarisiz! Devam etmeden once sorunu cozun."
    echo ""
    echo "🔧 Hizli cozum:"
    echo "   ./fix-git-push.sh calistirin"
    read -p "Devam etmek icin Enter'a basin..."
    exit 1
fi

echo ""
echo "✅ Git push basarili!"
echo ""

echo ""
echo "🎯 ADIM 2/3: RENDER BACKEND DEPLOY"
echo "----------------------------------------"
echo ""
echo "🌐 Render Dashboard acilacak..."
sleep 2

# Mac için open, Linux için xdg-open
if [[ "$OSTYPE" == "darwin"* ]]; then
    open https://dashboard.render.com/web/srv-d3u4tgppn3f5ibrl
else
    xdg-open https://dashboard.render.com/web/srv-d3u4tgppn3f5ibrl 2>/dev/null
fi

echo ""
echo "📋 YAPIN:"
echo "   1. \"Manual Deploy\" dropdown butonuna tiklayin"
echo "   2. \"Deploy latest commit\" secenegini secin"
echo "   3. Deploy tamamlanana kadar bekleyin (2-3 dakika)"
echo "   4. Logs'da su satiri arayin:"
echo "      ✅ Database connected successfully"
echo ""
read -p "⏳ Backend deploy ediliyor mu? (bekleyin...) [Enter]"

echo ""
echo "🎯 ADIM 3/3: TEST"
echo "----------------------------------------"
echo ""
echo "🔍 Backend health check acilacak..."
sleep 2

if [[ "$OSTYPE" == "darwin"* ]]; then
    open https://workigom-backend.onrender.com/api/health
else
    xdg-open https://workigom-backend.onrender.com/api/health 2>/dev/null
fi

echo ""
echo "📋 KONTROL EDIN:"
echo "   Beklenen:"
echo "   {"
echo "     \"database\": \"connected\",    ✅"
echo "     \"supabase\": \"connected\"     ✅"
echo "   }"
echo ""
echo "   Hala \"disconnected\" goruyorsaniz:"
echo "   - Backend deploy tamamlanmis mi?"
echo "   - Logs'da \"Database connected successfully\" var mi?"
echo ""

read -p "Devam etmek icin Enter'a basin..."

echo ""
echo "========================================"
echo "   TAMAMLANDI!"
echo "========================================"
echo ""
echo "✅ Git push yapildi"
echo "✅ Render deploy basladi"
echo "✅ Health check kontrol edildi"
echo ""
echo "📚 Sonraki adimlar:"
echo "   - Frontend'i test et: https://workigom-frontend1.onrender.com"
echo "   - Kayit ol / Giris yap test et"
echo ""
echo "📖 Detayli rehberler:"
echo "   - ACIL_REDEPLOY_GEREKLI.md"
echo "   - HEMEN_REDEPLOY.md"
echo ""

read -p "Devam etmek icin Enter'a basin..."
