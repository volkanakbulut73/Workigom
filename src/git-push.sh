#!/bin/bash

# Workigom GitHub Push Script
# Bu dosyayı çalıştırmadan önce GitHub'da repository oluşturun!

echo "🚀 Workigom GitHub'a Yükleniyor..."
echo ""

# Kullanıcı adını sor
read -p "GitHub kullanıcı adınız: " USERNAME

if [ -z "$USERNAME" ]; then
    echo "❌ Kullanıcı adı boş olamaz!"
    exit 1
fi

echo ""
echo "📦 Git repository başlatılıyor..."
git init

echo ""
echo "📁 Dosyalar ekleniyor..."
git add .

echo ""
echo "💾 Commit oluşturuluyor..."
git commit -m "🎉 Workigom - İş pazarı ve dayanışma platformu

✨ Özellikler:
- Bireysel ve Kurumsal kullanıcı rolleri
- Acil iş talep sistemi
- Dayanışma Menüsü (Yemek bağışı)
- QR kod sistemi
- Admin paneli
- Bildirim sistemi
- Cari hesap yönetimi
- Responsive mobil tasarım"

echo ""
echo "🌿 Ana branch oluşturuluyor..."
git branch -M main

echo ""
echo "🔗 GitHub repository bağlanıyor..."
git remote add origin https://github.com/$USERNAME/workigom.git

echo ""
echo "⬆️  GitHub'a yükleniyor..."
git push -u origin main

echo ""
echo "✅ Tamamlandı!"
echo ""
echo "🎉 Workigom artık GitHub'da!"
echo "📍 Repository URL: https://github.com/$USERNAME/workigom"
echo ""
echo "📚 Sonraki adımlar için GITHUB_BAGLANTI_KOLAY.md dosyasına bakın"
