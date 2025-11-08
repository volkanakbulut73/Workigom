# ⚡ GitHub'a 2 Dakikada Bağlan!

## 🎯 Tek Yapmanız Gereken

### 1️⃣ GitHub'da Repository Oluştur (1 dakika)

1. https://github.com → **Giriş yap**
2. Sağ üst **+** → **New repository**
3. Bilgileri doldur:
   ```
   Repository name: workigom
   Description: Mobil öncelikli iş pazarı ve dayanışma platformu 💼💙
   Public ✅
   ❌ README EKLEME (zaten var)
   ```
4. **Create repository** tıkla

---

### 2️⃣ Terminalden Komutları Çalıştır (1 dakika)

**Proje klasöründe terminali aç ve TÜMU KOMUTLARI kopyala-yapıştır:**

```bash
# Git başlat
git init

# Tüm dosyaları ekle
git add .

# İlk commit
git commit -m "🎉 Workigom - İş pazarı ve dayanışma platformu

✨ Özellikler:
- Bireysel ve Kurumsal kullanıcı rolleri
- Acil iş talep sistemi
- Menü Market (Paylaşım sistemi)
- QR kod sistemi
- Admin paneli
- Bildirim sistemi
- Cari hesap yönetimi
- Responsive mobil tasarım"

# Ana branch
git branch -M main

# GitHub repository ekle (KENDİ KULLANICI ADINIZI YAZIN!)
git remote add origin https://github.com/KULLANICI_ADINIZ/workigom.git

# GitHub'a yükle
git push -u origin main
```

**⚠️ ÖNEMLİ:** `KULLANICI_ADINIZ` yerine kendi GitHub kullanıcı adınızı yazın!

**Örnek:**
```bash
git remote add origin https://github.com/ahmetyilmaz/workigom.git
```

---

## ✅ Tamamlandı!

**GitHub Repository URL'niz:**
```
https://github.com/KULLANICI_ADINIZ/workigom
```

**Artık kodlarınız GitHub'da! 🎉**

---

## 🔄 Güncellemeleri Göndermek İçin

**Değişiklik yaptıktan sonra:**

```bash
git add .
git commit -m "✨ Yeni özellik eklendi"
git push
```

**Sadece 3 komut!**

---

## 🐛 Hata Alırsanız?

### ❌ "git: command not found"
**Çözüm:** Git'i yükleyin → https://git-scm.com/downloads

### ❌ "Permission denied (publickey)"
**Çözüm:** HTTPS kullanın (yukarıdaki komutlar zaten HTTPS)

### ❌ "Repository not found"
**Çözüm:** 
1. GitHub'da repository oluşturdunuz mu?
2. Kullanıcı adı doğru mu?
3. Repository adı `workigom` mi?

### ❌ "fatal: not a git repository"
**Çözüm:** Proje klasöründe misiniz? `git init` komutu çalıştı mı?

---

## 🎨 Repository'yi Güzelleştir

### GitHub'da About Bölümü

1. Repository sayfanızda **⚙️ (sağ üstte küçük dişli)**
2. **Description:** "Mobil öncelikli iş pazarı ve dayanışma platformu 💼💙"
3. **Topics:** Ekleyin:
   ```
   react
   typescript
   tailwindcss
   job-marketplace
   social-impact
   mobile-first
   supabase
   dayanisma
   ```
4. **Website:** (canlı site varsa URL'nizi ekleyin)
5. **Save changes**

---

## 📊 GitHub Badge Ekle

**README.md dosyanıza ekleyebilirsiniz:**

```markdown
![GitHub stars](https://img.shields.io/github/stars/KULLANICI_ADINIZ/workigom?style=social)
![GitHub forks](https://img.shields.io/github/forks/KULLANICI_ADINIZ/workigom?style=social)
![License](https://img.shields.io/github/license/KULLANICI_ADINIZ/workigom)
```

---

## 🌟 Sonraki Adımlar

### 1. Netlify'a Deploy Et
```bash
# Netlify ile otomatik deployment
1. https://app.netlify.com → "Add new site" → "Import from Git"
2. GitHub repository'nizi seçin
3. Build settings:
   - Build command: npm run build
   - Publish directory: dist
4. Deploy!
```

### 2. Domain Bağla
- `DOMAIN_VE_CANLI_YAYIN_REHBERI.md` takip edin
- Domain satın alın (50-150 TL/yıl)
- Netlify'da domain ayarları yapın

### 3. Supabase Backend Ekle
- `SUPABASE_HIZLI_BASLATMA.md` takip edin
- 5 dakikada backend çalışır halde

---

## 🎯 Tüm Komutlar (Kopyala-Yapıştır)

**İlk kez GitHub'a yükleme:**

```bash
git init
git add .
git commit -m "🎉 Workigom - İş pazarı ve dayanışma platformu"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/workigom.git
git push -u origin main
```

**Güncellemeleri gönderme:**

```bash
git add .
git commit -m "✨ Yeni özellik eklendi"
git push
```

**GitHub'dan değişiklikleri çekme:**

```bash
git pull origin main
```

---

## ✅ Checklist

İlk Yükleme:
- [ ] GitHub hesabı var
- [ ] Repository oluşturuldu (workigom)
- [ ] Git yüklü (`git --version`)
- [ ] Komutlar çalıştırıldı
- [ ] GitHub'da kodlar göründü

Repository Ayarları:
- [ ] Description eklendi
- [ ] Topics eklendi
- [ ] About bölümü dolduruldu

Sonraki Adımlar:
- [ ] Netlify deployment
- [ ] Domain bağlama
- [ ] Supabase backend

---

## 🎉 Tebrikler!

**✅ Workigom artık GitHub'da!**

**Repository:**
```
https://github.com/KULLANICI_ADINIZ/workigom
```

**Canlı Demo (Netlify deployment sonrası):**
```
https://workigom.netlify.app
```

**İyi çalışmalar! 🚀**

---

**Not:** Daha detaylı bilgi için `GITHUB_HIZLI_BASLANGIC.md` veya `GITHUB_PUSH_REHBERI.md` dosyalarına bakabilirsiniz.
