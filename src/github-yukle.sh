#!/bin/bash

# Workigom GitHub Yükleme Script (Mac/Linux)
# Repository: https://github.com/volkanakbulut73/workingom1

echo ""
echo "========================================"
echo "  Workigom GitHub'a Yükleniyor..."
echo "========================================"
echo ""
echo "Repository: https://github.com/volkanakbulut73/workingom1"
echo ""

# Git başlat
echo "📦 Git repository başlatılıyor..."
git init
if [ $? -ne 0 ]; then
    echo "❌ Git init başarısız!"
    exit 1
fi

# Dosyaları ekle
echo ""
echo "📁 Dosyalar ekleniyor..."
git add .
if [ $? -ne 0 ]; then
    echo "❌ Dosyalar eklenemedi!"
    exit 1
fi

# Commit oluştur
echo ""
echo "💾 Commit oluşturuluyor..."
git commit -m "🎉 Workigom - İş pazarı ve dayanışma platformu

✨ Özellikler:
- Bireysel ve Kurumsal kullanıcı rolleri
- Acil iş talep sistemi
- Dayanışma Menüsü (Yemek bağışı sistemi)
- QR kod ve countdown timer sistemi
- Altın Kalp badge sistemi
- Admin panel ve bildirim yönetimi
- Cari hesap sistemi
- Responsive mobil tasarım
- Supabase backend entegrasyonu

🎨 Teknolojiler:
- React + TypeScript
- Tailwind CSS
- Supabase
- Vite"

if [ $? -ne 0 ]; then
    echo "❌ Commit oluşturulamadı!"
    exit 1
fi

# Ana branch
echo ""
echo "🌿 Ana branch oluşturuluyor..."
git branch -M main

# Repository bağla
echo ""
echo "🔗 GitHub repository bağlanıyor..."
git remote add origin https://github.com/volkanakbulut73/workingom1.git 2>/dev/null
if [ $? -ne 0 ]; then
    echo "Remote zaten var, güncelleniyor..."
    git remote set-url origin https://github.com/volkanakbulut73/workingom1.git
fi

# GitHub'a yükle
echo ""
echo "⬆️  GitHub'a yükleniyor..."
git push -u origin main
if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Push başarısız! Muhtemel nedenler:"
    echo "   - GitHub kimlik doğrulaması gerekiyor"
    echo "   - Repository'de zaten dosyalar var"
    echo ""
    echo "Çözüm denemesi: force push"
    read -p "Force push yapılsın mı? (y/n): " answer
    if [ "$answer" = "y" ]; then
        git push -u origin main --force
    else
        echo "❌ İşlem iptal edildi"
        exit 1
    fi
fi

echo ""
echo "========================================"
echo "  ✅ TAMAMLANDI!"
echo "========================================"
echo ""
echo "🎉 Workigom başarıyla GitHub'a yüklendi!"
echo ""
echo "📍 Repository URL:"
echo "   https://github.com/volkanakbulut73/workingom1"
echo ""
echo "🌐 Sonraki adım: Netlify'a deploy edin!"
echo "   npm run build"
echo "   dist/ klasörünü https://app.netlify.com/drop'a sürükleyin"
echo ""
echo "📚 Detaylı rehberler için:"
echo "   - HIZLI_CANLI_YAYIN.md"
echo "   - DEPLOYMENT_CHECKLIST.md"
echo "   - SUPABASE_HIZLI_BASLATMA.md"
echo ""
