#!/bin/bash

# Workigom - Tüm Dosyaları GitHub'a Yükle

echo ""
echo "=========================================="
echo "  Tüm Dosyalar GitHub'a Yükleniyor..."
echo "=========================================="
echo ""

# Tüm dosyaları ekle
echo "📁 Tüm dosyalar ekleniyor..."
git add -A

# Durum kontrol
echo ""
echo "📊 Git durumu:"
git status --short | head -20
echo ""
echo "... ve daha fazla dosya"
echo ""

# Commit
echo "💾 Commit oluşturuluyor..."
git commit -m "✨ Tüm proje dosyaları eklendi

- React + TypeScript frontend
- Tüm componentler (admin, company, employee, shared, ui)  
- AuthContext ve state management
- Supabase entegrasyonu
- Mock data sistemi
- Deployment dosyaları
- Komple dokümantasyon
- Stil dosyaları ve konfigürasyon"

# Push
echo ""
echo "⬆️  GitHub'a yükleniyor (force)..."
git push origin main --force

echo ""
echo "=========================================="
echo "  ✅ TAMAMLANDI!"
echo "=========================================="
echo ""
echo "🎉 Tüm dosyalar GitHub'a yüklendi!"
echo ""
echo "📍 Kontrol edin:"
echo "   https://github.com/volkanakbulut73/workingom1"
echo ""
echo "📊 components/, contexts/, App.tsx, package.json"
echo "   ve 100+ dosya görmelisiniz!"
echo ""
