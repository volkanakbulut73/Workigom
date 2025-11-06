# 🎯 GitHub Hızlı Komutlar - Workigom

## ⚡ İlk Kez GitHub'a Yükleme

```bash
# 1. Git başlat
git init

# 2. Dosyaları ekle
git add .

# 3. İlk commit
git commit -m "🎉 Workigom ilk commit"

# 4. Main branch
git branch -M main

# 5. GitHub bağla (KENDİ KULLANICI ADINIZI YAZIN!)
git remote add origin https://github.com/KULLANICI_ADINIZ/workigom.git

# 6. Yükle
git push -u origin main
```

**✅ Bitti!** GitHub'da görünecek.

---

## 🔄 Güncellemeleri Gönderme (Sık Kullanılır)

```bash
# 1. Değişiklikleri ekle
git add .

# 2. Commit yap
git commit -m "✨ Yeni özellik eklendi"

# 3. GitHub'a gönder
git push
```

**3 komut, hepsi bu kadar!**

---

## 📥 GitHub'dan Güncellemeleri Çekme

```bash
# GitHub'daki son değişiklikleri al
git pull origin main
```

---

## 📋 Yaygın Git Komutları

### Durum Kontrolü
```bash
# Hangi dosyalar değişti?
git status

# Son commit'ler
git log --oneline

# Detaylı log
git log
```

### Branch İşlemleri
```bash
# Branch listesi
git branch

# Yeni branch oluştur ve geç
git checkout -b feature/yeni-ozellik

# Başka branch'e geç
git checkout main

# Branch'i sil
git branch -d feature/yeni-ozellik
```

### Değişiklikleri Geri Alma
```bash
# Değişiklikleri geri al (dikkatli!)
git reset --hard HEAD

# Son commit'i geri al (değişiklikler kalır)
git reset --soft HEAD~1

# Belirli dosyayı geri al
git checkout -- dosya.tsx
```

### Remote (GitHub) İşlemleri
```bash
# Remote URL'i göster
git remote -v

# Remote URL değiştir
git remote set-url origin https://github.com/YENİ_KULLANICI/workigom.git

# Remote ekle
git remote add upstream https://github.com/BASKA_KULLANICI/workigom.git
```

---

## 🎨 Commit Mesajları Şablonları

### İyi Örnekler
```bash
git commit -m "✨ feat: Kullanıcı profil sayfası eklendi"
git commit -m "🐛 fix: Login butonu hata düzeltildi"
git commit -m "📝 docs: README güncellendi"
git commit -m "♻️ refactor: AuthContext optimize edildi"
git commit -m "🎨 style: Landing page tasarım iyileştirmesi"
git commit -m "🚀 perf: İş ilanları yükleme hızı artırıldı"
git commit -m "🔒 security: API key'ler .env'e taşındı"
git commit -m "🗑️ chore: Kullanılmayan kodlar temizlendi"
```

### Emoji Listesi
```
✨ :sparkles:        Yeni özellik
🐛 :bug:             Bug fix
📝 :memo:            Dokümantasyon
🎨 :art:             UI/UX
♻️ :recycle:         Refactoring
🚀 :rocket:          Performance
🔒 :lock:            Güvenlik
🔧 :wrench:          Config
🗑️ :wastebasket:    Kod silme
🚧 :construction:    Work in progress
💄 :lipstick:        CSS/Styling
🌐 :globe_with_meridians: i18n
📱 :iphone:          Responsive design
```

---

## 🚨 Hata Çözümleri

### "Permission denied (publickey)"
```bash
# HTTPS kullan
git remote set-url origin https://github.com/KULLANICI_ADINIZ/workigom.git
```

### "Repository not found"
```bash
# URL kontrol et
git remote -v

# Doğru URL set et
git remote set-url origin https://github.com/DOGRU_KULLANICI_ADI/workigom.git
```

### "Merge conflict"
```bash
# 1. Conflict olan dosyayı aç
# 2. <<<<<<< ve >>>>>>> arasındaki kodları düzenle
# 3. Kaydet
# 4. Commit et
git add .
git commit -m "🔀 Merge conflict çözüldü"
git push
```

### "Changes not staged for commit"
```bash
# Tüm değişiklikleri ekle
git add .

# Veya belirli dosyayı ekle
git add dosya-adi.tsx
```

### Yanlış commit mesajı yazdım
```bash
# Son commit mesajını değiştir (henüz push etmediyseniz)
git commit --amend -m "Doğru mesaj"

# Push ettiyseniz, yeni commit yapın
git commit -m "📝 Önceki commit mesajı düzeltildi"
git push
```

---

## 📦 Dosya İşlemleri

### Dosya Ekleme
```bash
# Tüm dosyalar
git add .

# Belirli dosya
git add components/LandingPage.tsx

# Belirli klasör
git add components/employee/

# Belirli uzantı
git add *.tsx
```

### Dosya Silme
```bash
# Git'ten ve dosya sisteminden sil
git rm dosya.txt
git commit -m "🗑️ Dosya silindi"

# Sadece Git'ten sil (dosya sistemi korunur)
git rm --cached dosya.txt
```

### Dosya Taşıma
```bash
# Dosya taşı/yeniden adlandır
git mv eski.txt yeni.txt
git commit -m "📝 Dosya yeniden adlandırıldı"
```

---

## 🔍 Geçmişi İnceleme

```bash
# Tüm commit geçmişi
git log

# Son 5 commit
git log -5

# Tek satırda log
git log --oneline

# Grafik şeklinde
git log --graph --oneline --all

# Belirli dosyanın geçmişi
git log -- components/LandingPage.tsx

# Kim ne değiştirmiş?
git blame components/LandingPage.tsx

# İki commit arası farklar
git diff commit1 commit2
```

---

## 🌿 Branch Stratejisi

### Feature Branch Workflow

```bash
# 1. Main'den feature branch oluştur
git checkout -b feature/yemek-bagisi

# 2. Değişiklikleri yap
# ... kod yazılır ...

# 3. Commit et
git add .
git commit -m "✨ Yemek bağışı sistemi eklendi"

# 4. GitHub'a push et
git push origin feature/yemek-bagisi

# 5. GitHub'da Pull Request oluştur

# 6. Merge edildikten sonra local'de main'e geç
git checkout main

# 7. Main'i güncelle
git pull origin main

# 8. Feature branch'i sil
git branch -d feature/yemek-bagisi
```

---

## 🔀 Pull Request (PR) Workflow

### GitHub'da PR Oluşturma

1. **Branch'i push et:**
```bash
git push origin feature/yeni-ozellik
```

2. **GitHub'da:**
   - Repository sayfasına git
   - "Compare & pull request" butonuna tıkla
   - Başlık ve açıklama yaz
   - "Create pull request" tıkla

3. **Review sonrası merge et**

4. **Local'de temizlik:**
```bash
git checkout main
git pull origin main
git branch -d feature/yeni-ozellik
```

---

## 🏷️ Tag ve Release

### Version Tag Oluşturma

```bash
# Tag oluştur
git tag -a v1.0.0 -m "İlk stabil versiyon"

# Tag'i push et
git push origin v1.0.0

# Tüm tag'leri push et
git push --tags

# Tag listesi
git tag

# Tag silme
git tag -d v1.0.0
git push origin :refs/tags/v1.0.0
```

### Semantic Versioning
```
v1.0.0 - Major.Minor.Patch

v1.0.0 → v1.0.1 (Patch: Bug fix)
v1.0.1 → v1.1.0 (Minor: Yeni özellik, backward compatible)
v1.1.0 → v2.0.0 (Major: Breaking changes)
```

---

## 🔧 Git Config

### Kullanıcı Ayarları
```bash
# Ad ve email ayarla (ilk kurulum)
git config --global user.name "Adınız Soyadınız"
git config --global user.email "email@example.com"

# Kontrol et
git config --global user.name
git config --global user.email

# Tüm ayarları göster
git config --list
```

### Faydalı Ayarlar
```bash
# Renkli output
git config --global color.ui auto

# Default editor (VS Code)
git config --global core.editor "code --wait"

# Alias'lar (kısayollar)
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
git config --global alias.lg "log --oneline --graph"

# Kullanım:
git st     # git status yerine
git lg     # güzel log yerine
```

---

## 🎓 İpuçları ve Best Practices

### 1. Sık Commit Yapın
```bash
# ✅ İYİ
git commit -m "✨ Login formu eklendi"
git commit -m "🎨 Login formu CSS iyileştirmesi"
git commit -m "🐛 Login butonu hata düzeltildi"

# ❌ KÖTÜ
# 3 gün sonra tek commit:
git commit -m "Login sayfası tamamlandı"
```

### 2. Açıklayıcı Commit Mesajları
```bash
# ✅ İYİ
git commit -m "🐛 fix: Profil resmi yüklenirken oluşan 404 hatası düzeltildi"

# ❌ KÖTÜ
git commit -m "fix"
git commit -m "update"
git commit -m "changes"
```

### 3. Push Öncesi Test Edin
```bash
# Build kontrol
npm run build

# Hata yoksa push et
git push
```

### 4. .gitignore Kullanın
```bash
# node_modules, .env gibi dosyalar
# .gitignore'da olmalı
```

### 5. Pull Before Push
```bash
# Push öncesi güncellemeleri çek
git pull origin main

# Sonra push et
git push
```

---

## 📊 Durum Kontrolü

### Hızlı Bakış
```bash
# Durumu göster
git status

# Kısa versiyon
git status -s

# Branch bilgisi
git branch -v

# Remote bilgisi
git remote -v

# Son commit
git log -1
```

---

## 🆘 Acil Durum Komutları

### Tüm Değişiklikleri Geri Al
```bash
# ⚠️ DİKKAT: Tüm değişiklikler kaybolur!
git reset --hard HEAD
```

### Yanlış Branch'te Çalıştım
```bash
# Değişiklikleri sakla
git stash

# Doğru branch'e geç
git checkout main

# Değişiklikleri geri getir
git stash pop
```

### Son Commit'i Geri Al
```bash
# Commit'i geri al, değişiklikler kalsın
git reset --soft HEAD~1

# Commit'i ve değişiklikleri geri al
git reset --hard HEAD~1
```

### GitHub'daki Dosyayı Local'den Sil
```bash
# Git takibinden çıkar ama dosyayı silme
git rm --cached dosya.txt
git commit -m "🗑️ Dosya git'ten kaldırıldı"
git push
```

---

## 📚 Kaynak ve Yardım

### Git Dokümantasyonu
- Resmi dokümantasyon: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com

### Yardım Komutları
```bash
# Komut yardımı
git help
git help commit
git help push

# Kısa yardım
git commit -h
```

---

## ✅ Checklist - Her Commit Öncesi

- [ ] `git status` ile değişiklikleri kontrol ettim
- [ ] Gereksiz dosyalar `.gitignore`'da
- [ ] `npm run build` çalışıyor
- [ ] Commit mesajı açıklayıcı
- [ ] Hassas bilgiler (API key) yok

---

## 🎯 Hızlı Başvuru

**En Sık Kullanılan 10 Komut:**

```bash
1.  git status          # Durum kontrolü
2.  git add .           # Değişiklikleri ekle
3.  git commit -m ""    # Commit yap
4.  git push            # GitHub'a gönder
5.  git pull            # GitHub'dan çek
6.  git log --oneline   # Commit geçmişi
7.  git branch          # Branch listesi
8.  git checkout        # Branch değiştir
9.  git reset --hard    # Değişiklikleri geri al
10. git remote -v       # Remote bilgisi
```

---

**🎉 Bu kadar!** Artık GitHub ile çalışmaya hazırsınız!

**İyi çalışmalar! 🚀**

---

**Son Güncelleme:** 2 Kasım 2025  
**Workigom Version:** 1.0.0
