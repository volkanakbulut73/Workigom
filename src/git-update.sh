#!/bin/bash
# Workigom Git Update Script (Mac/Linux)
# Değişiklikleri GitHub'a push et

echo ""
echo "========================================"
echo "   Git Update - Push to GitHub"
echo "========================================"
echo ""

echo "📁 Dosyalar ekleniyor..."
git add .

echo ""
read -p "💾 Commit mesaji (bos birakirsaniz otomatik): " COMMIT_MSG

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="feat: Supabase backend integration"
fi

echo ""
echo "💾 Commit olusturuluyor: \"$COMMIT_MSG\""
git commit -m "$COMMIT_MSG"

echo ""
echo "⬆️  GitHub'a yukleniyor..."
git push origin main

echo ""
if [ $? -eq 0 ]; then
    echo "========================================"
    echo "   ✅ Basarili!"
    echo "========================================"
    echo ""
    echo "🎉 Degisiklikler GitHub'a yuklendi!"
    echo ""
    echo "🔄 Simdi Render.com'da redeploy yapin:"
    echo "   1. Render Dashboard'a git"
    echo "   2. workigom-backend sec"
    echo "   3. Manual Deploy > Deploy latest commit"
    echo ""
else
    echo "========================================"
    echo "   ❌ Hata!"
    echo "========================================"
    echo ""
    echo "Hata olustu. Detaylar yukarida."
    echo ""
fi

read -p "Devam etmek icin Enter'a basin..."
