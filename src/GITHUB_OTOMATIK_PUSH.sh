#!/bin/bash

echo "========================================"
echo "  WORKIGOM - GITHUB OTOMATIK PUSH"
echo "========================================"
echo ""

# Git kurulu mu kontrol et
if ! command -v git &> /dev/null; then
    echo "[HATA] Git yüklü değil!"
    echo "Git indirmek için: https://git-scm.com/"
    exit 1
fi

echo "[1/6] Git durumu kontrol ediliyor..."
git status
echo ""

echo "[2/6] Uzak repository bilgisi kontrol ediliyor..."
git remote -v
echo ""

# Eğer remote yoksa ekle
if ! git remote get-url origin &> /dev/null; then
    echo "[UYARI] Remote repository bulunamadı. Ekleniyor..."
    git remote add origin https://github.com/volkanakbulut73/Workigom.git
    echo "[BAŞARILI] Remote eklendi!"
    echo ""
fi

echo "[3/6] Dosyalar Git'e ekleniyor..."
git add .
if [ $? -ne 0 ]; then
    echo "[HATA] Dosyalar eklenemedi!"
    exit 1
fi
echo "[BAŞARILI] Tüm dosyalar eklendi!"
echo ""

echo "[4/6] Commit oluşturuluyor..."
git commit -m "Tam landing page + tüm bölümler eklendi - Render deploy hazır"
if [ $? -eq 0 ]; then
    echo "[BAŞARILI] Commit oluşturuldu!"
else
    echo "[UYARI] Commit yapılacak değişiklik yok veya hata oluştu"
fi
echo ""

echo "[5/6] GitHub'a push ediliyor..."
echo "Token ile kimlik doğrulaması yapılıyor..."
echo ""

# GitHub Personal Access Token ile push
git push https://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@github.com/volkanakbulut73/Workigom.git main

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================"
    echo "  BAŞARILI! GitHub'a yüklendi!"
    echo "========================================"
    echo ""
    echo "[6/6] Render.com otomatik deploy başlatacak..."
    echo ""
    echo "Deploy durumunu kontrol edin:"
    echo "https://dashboard.render.com/"
    echo ""
    echo "Web siteniz 2-3 dakika içinde güncellenecek:"
    echo "https://workigom-frontend1.onrender.com/"
    echo ""
else
    echo ""
    echo "========================================"
    echo "  HATA! Push başarısız!"
    echo "========================================"
    echo ""
    echo "Olası nedenler:"
    echo "1. Internet bağlantısı yok"
    echo "2. Token süresi dolmuş"
    echo "3. Repository erişim izni yok"
    echo ""
    echo "Hatayı düzeltin ve tekrar çalıştırın."
    echo ""
fi
