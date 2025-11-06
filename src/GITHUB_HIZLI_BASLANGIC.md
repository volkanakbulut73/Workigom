# ⚡ GitHub Hızlı Başlangıç - Workigom

## 🎯 5 Dakikada GitHub'a Yükle!

### 📋 Ön Koşullar

✅ Git yüklü mü? Kontrol edin:
```bash
git --version
```

❌ Yüklü değilse: https://git-scm.com/downloads

---

## 🚀 Adım Adım Kılavuz

### 1️⃣ GitHub Repository Oluştur (2 dakika)

1. **GitHub'a giriş yapın:** https://github.com
2. **Sağ üst köşe** → **+** → **New repository**
3. **Bilgileri doldurun:**
   ```
   Repository name: workigom
   Description: Mobil öncelikli iş pazarı ve dayanışma platformu
   Public ✅ (veya Private)
   ❌ README EKLEMEYIN (zaten var)
   ```
4. **Create repository** tıklayın

---

### 2️⃣ Projeyi Figma Make'ten İndir

1. **Figma Make** → **Export/Download** butonu
2. ZIP dosyasını indirin ve açın
3. Projenin bulunduğu klasörü açın

---

### 3️⃣ Terminal'de Projeye Git

**Windows (CMD veya PowerShell):**
```cmd
cd C:\Users\YourName\Downloads\workigom
```

**Mac/Linux:**
```bash
cd ~/Downloads/workigom
```

---

### 4️⃣ Git Komutlarını Çalıştır (3 dakika)

**Tüm komutları sırayla çalıştırın:**

```bash
# 1. Git başlat
git init

# 2. Tüm dosyaları ekle
git add .

# 3. İlk commit
git commit -m "🎉 Workigom ilk commit - İş pazarı ve dayanışma platformu"

# 4. Ana branch'i main yap
git branch -M main

# 5. GitHub repository'yi ekle (KENDİ KULLANICI ADINIZI YAZIN!)
git remote add origin https://github.com/KULLANICI_ADINIZ/workigom.git

# 6. GitHub'a yükle
git push -u origin main
```

---

## ✅ Tamamlandı!

Projeniz artık GitHub'da! 🎉

**Repository URL:**
```
https://github.com/KULLANICI_ADINIZ/workigom
```

---

## 🔄 Sonraki Güncellemeler İçin

Kod değişikliği yaptıktan sonra:

```bash
# 1. Değişiklikleri ekle
git add .

# 2. Commit yap
git commit -m "✨ Yeni özellik eklendi"

# 3. GitHub'a gönder
git push
```

---

## 🐛 Hata Alırsanız?

### ❌ "git: command not found"
**Çözüm:** Git'i yükleyin → https://git-scm.com/downloads

### ❌ "Permission denied (publickey)"
**Çözüm:** GitHub'a SSH key ekleyin veya HTTPS kullanın

HTTPS için:
```bash
git remote set-url origin https://github.com/KULLANICI_ADINIZ/workigom.git
```

### ❌ "Repository not found"
**Çözüm:** GitHub'da repository'yi oluşturdunuz mu? Kullanıcı adı doğru mu?

### ❌ "fatal: not a git repository"
**Çözüm:** Projenin doğru klasöründe misiniz? `git init` komutu çalıştırıldı mı?

---

## 🎨 GitHub Repository'yi Güzelleştir

### Repository About Bölümü

1. GitHub repository sayfanızda **⚙️ Settings (sağ tarafta küçük dişli)**
2. **About** bölümünü düzenle
3. **Description:** "Mobil öncelikli iş pazarı ve dayanışma platformu 💼💙"
4. **Website:** Canlı site URL'niz (varsa)
5. **Topics:** `react`, `typescript`, `tailwindcss`, `job-marketplace`, `social-impact`, `mobile-first`

### README.md Güncellemeleri

README.md dosyanıza ekleyebilecekleriniz:

```markdown
## 📸 Ekran Görüntüleri

![Ana Sayfa](screenshots/homepage.png)
![İş İlanları](screenshots/jobs.png)

## 🌐 Canlı Demo

🔗 [Workigom'u Deneyin](https://workigom.netlify.app)

## 🏗️ Teknolojiler

- ⚛️ React 18
- 🎨 Tailwind CSS v4
- 📘 TypeScript
- 🗄️ Supabase (Backend)
- 📱 Mobile-First Design
```

---

## 📦 .gitignore Dosyası (Önerilen)

Projenizde `.gitignore` dosyası yoksa oluşturun:

**Dosya oluşturma:**
```bash
# Windows
type nul > .gitignore

# Mac/Linux
touch .gitignore
```

**.gitignore içeriği:**
```
# Dependencies
node_modules/
.pnp
.pnp.js

# Production
build/
dist/

# Environment variables
.env
.env.local
.env.production

# Logs
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
*.swp
```

**Sonra yeniden commit:**
```bash
git add .gitignore
git commit -m "📝 .gitignore eklendi"
git push
```

---

## 🌟 GitHub Repository Özellikleri

### 1. GitHub Actions (CI/CD)

`.github/workflows/deploy.yml` dosyası oluşturarak otomatik deployment:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Build
        run: |
          npm install
          npm run build
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
        with:
          args: deploy --prod --dir=dist
```

### 2. Issue Templates

`.github/ISSUE_TEMPLATE/bug_report.md` oluşturarak bug raporlama şablonu:

```markdown
---
name: Bug Raporu
about: Bir hata bildirin
title: '[BUG] '
labels: bug
assignees: ''
---

**Hata Açıklaması**
Hatanın net bir açıklaması.

**Adımlar**
1. '...' sayfasına git
2. '...' butonuna tıkla
3. Hatayı gör

**Beklenen Davranış**
Ne olmasını bekliyordunuz?

**Ekran Görüntüleri**
Varsa ekleyin.
```

### 3. Pull Request Template

`.github/pull_request_template.md`:

```markdown
## Değişiklikler

Yapılan değişikliklerin açıklaması.

## Tip

- [ ] Yeni özellik
- [ ] Bug fix
- [ ] Dokümantasyon
- [ ] Refactoring

## Checklist

- [ ] Kod test edildi
- [ ] Dokümantasyon güncellendi
- [ ] UI değişiklikleri responsive
```

---

## 🔐 Güvenlik

### Hassas Bilgileri Koruma

**❌ ASLA GitHub'a eklemeyin:**
- API keys
- Şifreler
- Database credentials
- Secret tokens

**✅ Bunun yerine:**

1. `.env` dosyası oluşturun:
```
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
```

2. `.gitignore`'a ekleyin:
```
.env
.env.local
```

3. Kod'da kullanın:
```typescript
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
```

4. Deployment platformunda (Netlify, Vercel) environment variables ekleyin

---

## 📊 GitHub Stats

Repository'nize badge ekleyin (README.md):

```markdown
![GitHub stars](https://img.shields.io/github/stars/KULLANICI_ADINIZ/workigom?style=social)
![GitHub forks](https://img.shields.io/github/forks/KULLANICI_ADINIZ/workigom?style=social)
![GitHub issues](https://img.shields.io/github/issues/KULLANICI_ADINIZ/workigom)
![GitHub license](https://img.shields.io/github/license/KULLANICI_ADINIZ/workigom)
```

---

## 🤝 Collaboration (Takım Çalışması)

### Ekip Arkadaşı Eklemek

1. Repository → **Settings** → **Collaborators**
2. **Add people** → GitHub kullanıcı adı girin
3. Erişim seviyesi seçin:
   - **Read:** Sadece okuma
   - **Write:** Kod yazabilir
   - **Admin:** Tam yetki

### Branch Stratejisi

```bash
# Yeni özellik için branch oluştur
git checkout -b feature/yeni-ozellik

# Değişiklikleri yap ve commit et
git add .
git commit -m "✨ Yeni özellik eklendi"

# GitHub'a push et
git push origin feature/yeni-ozellik

# GitHub'da Pull Request oluştur
```

---

## 📖 Faydalı Git Komutları

```bash
# Durum kontrolü
git status

# Commit geçmişi
git log --oneline

# Değişiklikleri geri al (dikkatli!)
git reset --hard HEAD

# Uzak değişiklikleri çek
git pull origin main

# Branch listesi
git branch -a

# Branch silme
git branch -d branch-adi

# Son commit'i düzelt
git commit --amend -m "Düzeltilmiş mesaj"

# Dosya silme
git rm dosya.txt
git commit -m "Dosya silindi"

# Dosya taşıma/yeniden adlandırma
git mv eski.txt yeni.txt
git commit -m "Dosya yeniden adlandırıldı"
```

---

## 🎓 GitHub Best Practices

### Commit Mesajları

**İyi commit mesajı:**
```
✨ feat: Kullanıcı profil sayfası eklendi
🐛 fix: Login butonu hata düzeltildi
📝 docs: README güncellendi
♻️ refactor: Kod temizlendi
🎨 style: CSS düzenlemeleri
```

**Kötü commit mesajı:**
```
update
fix
changes
asdasd
```

### Commit İkonları (Emojiler)

- ✨ `:sparkles:` - Yeni özellik
- 🐛 `:bug:` - Bug fix
- 📝 `:memo:` - Dokümantasyon
- 🎨 `:art:` - UI/UX iyileştirme
- ♻️ `:recycle:` - Refactoring
- 🚀 `:rocket:` - Performance iyileştirme
- 🔒 `:lock:` - Güvenlik
- 🔧 `:wrench:` - Config değişikliği
- 🗑️ `:wastebasket:` - Kod silme

---

## 🌐 Deployment Entegrasyonu

### Netlify

1. GitHub repository'ye push edin
2. Netlify'da **New site from Git**
3. GitHub repository seçin
4. Build settings:
   ```
   Build command: npm run build
   Publish directory: dist
   ```
5. **Deploy site**

### Vercel

```bash
# Vercel CLI yükle
npm i -g vercel

# Deploy et
vercel --prod
```

### Render

1. `render.yaml` dosyası (zaten var)
2. Render.com → **New Static Site**
3. GitHub repository bağla
4. Otomatik deploy başlar

---

## 📋 Checklist - GitHub'a Yükledikten Sonra

- [ ] `.gitignore` dosyası oluşturuldu
- [ ] Hassas bilgiler (API keys) `.env` dosyasında
- [ ] README.md güncel ve açıklayıcı
- [ ] Repository description ve topics eklendi
- [ ] LICENSE dosyası eklendi (örn: MIT)
- [ ] Contributing guidelines eklendi (opsiyonel)
- [ ] GitHub Pages veya başka platform ile deploy edildi
- [ ] Repository social preview image eklendi

---

## 🎉 Sonuç

**✅ Tebrikler!** Workigom projeniz artık GitHub'da ve dünyaya açık!

**Sonraki Adımlar:**
1. ⭐ Repository'yi star'layın (kendiniz bile!)
2. 📢 Projeyi sosyal medyada paylaşın
3. 🌐 Canlıya alın (Netlify, Vercel, Render)
4. 📊 GitHub Analytics'i takip edin
5. 🤝 Open source katkı kabul edin

---

**Repository URL:**
```
https://github.com/KULLANICI_ADINIZ/workigom
```

**Canlı Demo (Netlify örnek):**
```
https://workigom.netlify.app
```

**İyi çalışmalar! 🚀**

---

**Son Güncelleme:** 2 Kasım 2025  
**Workigom Version:** 1.0.0
