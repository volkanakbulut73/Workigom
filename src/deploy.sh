#!/bin/bash

# 🚀 Workigom - Hızlı Deployment Script
# Bu script projenizi production'a hazırlar

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Workigom Deployment Script"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Renklendirme
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Adım 1: Dependencies kontrolü
echo "📦 Adım 1: Dependencies kontrol ediliyor..."
if [ ! -d "node_modules" ]; then
    echo "${YELLOW}⚠️  node_modules bulunamadı. npm install çalıştırılıyor...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo "${RED}❌ npm install başarısız!${NC}"
        exit 1
    fi
else
    echo "${GREEN}✅ node_modules mevcut${NC}"
fi
echo ""

# Adım 2: Type checking
echo "🔍 Adım 2: TypeScript type checking..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
    echo "${YELLOW}⚠️  TypeScript hataları var, ama build devam ediliyor...${NC}"
fi
echo ""

# Adım 3: Build
echo "🔨 Adım 3: Production build oluşturuluyor..."
npm run build
if [ $? -ne 0 ]; then
    echo "${RED}❌ Build başarısız!${NC}"
    exit 1
fi
echo "${GREEN}✅ Build başarılı!${NC}"
echo ""

# Adım 4: Build boyutunu göster
echo "📊 Adım 4: Build analizi..."
if [ -d "dist" ]; then
    DIST_SIZE=$(du -sh dist | cut -f1)
    echo "📦 dist klasörü boyutu: ${GREEN}${DIST_SIZE}${NC}"
    
    # En büyük dosyaları göster
    echo ""
    echo "📄 En büyük dosyalar:"
    find dist -type f -exec ls -lh {} \; | sort -k5 -h -r | head -5 | awk '{print "   " $9 " - " $5}'
else
    echo "${RED}❌ dist klasörü bulunamadı!${NC}"
    exit 1
fi
echo ""

# Adım 5: Deployment seçenekleri
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 Build tamamlandı! Şimdi ne yapmak istersiniz?"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1) 🌐 Netlify'a Deploy Et (Sürükle-bırak için dist klasörünü aç)"
echo "2) 🚀 Render.com için GitHub'a Push Et"
echo "3) 📦 dist.zip Oluştur (FTP yüklemesi için)"
echo "4) 🧪 Local Preview (dist klasörünü test et)"
echo "5) ❌ Çıkış"
echo ""
read -p "Seçiminiz (1-5): " choice

case $choice in
    1)
        echo ""
        echo "${GREEN}📂 dist klasörü açılıyor...${NC}"
        if [[ "$OSTYPE" == "darwin"* ]]; then
            open dist
        elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
            xdg-open dist
        elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
            explorer dist
        fi
        echo ""
        echo "${YELLOW}ℹ️  Şimdi https://app.netlify.com/drop adresine gidin${NC}"
        echo "${YELLOW}   ve dist klasörünü tarayıcıya sürükleyin!${NC}"
        ;;
    2)
        echo ""
        read -p "Git commit mesajı: " commit_msg
        if [ -z "$commit_msg" ]; then
            commit_msg="Deploy to production"
        fi
        
        echo "${YELLOW}📤 Git'e pushing...${NC}"
        git add .
        git commit -m "$commit_msg"
        git push origin main
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "${GREEN}✅ GitHub'a push başarılı!${NC}"
            echo ""
            echo "Şimdi Render.com'da:"
            echo "1. https://render.com adresine gidin"
            echo "2. 'New +' > 'Static Site' seçin"
            echo "3. Repository'nizi seçin"
            echo "4. Deploy edin!"
        else
            echo "${RED}❌ Git push başarısız!${NC}"
        fi
        ;;
    3)
        echo ""
        echo "${YELLOW}📦 dist.zip oluşturuluyor...${NC}"
        cd dist
        zip -r ../dist.zip .
        cd ..
        
        if [ -f "dist.zip" ]; then
            ZIP_SIZE=$(du -sh dist.zip | cut -f1)
            echo "${GREEN}✅ dist.zip oluşturuldu (${ZIP_SIZE})${NC}"
            echo ""
            echo "Bu dosyayı FTP ile web hosting'e yükleyebilirsiniz:"
            echo "1. FileZilla ile hosting'e bağlanın"
            echo "2. public_html klasörüne gidin"
            echo "3. dist.zip'i yükleyin"
            echo "4. cPanel'de extract edin"
        else
            echo "${RED}❌ ZIP oluşturulamadı!${NC}"
        fi
        ;;
    4)
        echo ""
        echo "${GREEN}🧪 Local preview başlatılıyor...${NC}"
        echo "${YELLOW}ℹ️  Browser'da http://localhost:4173 açılacak${NC}"
        echo "${YELLOW}ℹ️  Durdurmak için Ctrl+C${NC}"
        echo ""
        npm run preview
        ;;
    5)
        echo ""
        echo "${GREEN}👋 Görüşürüz!${NC}"
        exit 0
        ;;
    *)
        echo ""
        echo "${RED}❌ Geçersiz seçim!${NC}"
        exit 1
        ;;
esac

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "${GREEN}✅ İşlem tamamlandı!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📖 Detaylı rehber için: WEB_HOSTING_REHBERI.md"
echo ""
