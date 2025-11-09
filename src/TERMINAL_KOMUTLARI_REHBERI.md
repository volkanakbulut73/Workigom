# 💻 TERMİNAL KOMUTLARI REHBERİ

## 🚀 SCRIPT'LERİ NASIL ÇALIŞTIRIRIM?

### **Windows Kullanıcıları İçin** 🪟

#### **YOL 1: Dosyaya Çift Tıklama** ⭐ EN KOLAY!

```
1. Proje klasörünü aç (Windows Explorer'da)

2. quick-push.bat dosyasını bul

3. Dosyaya ÇİFT TIKLA

4. ✅ Otomatik çalışır!
```

**NOT:** Bazı Windows sistemlerinde güvenlik uyarısı çıkabilir:
```
"Windows protected your PC"
→ "More info" tıkla
→ "Run anyway" tıkla
```

---

#### **YOL 2: Terminal (CMD) ile** 💻

**Adım 1: Proje Klasörüne Git**

```cmd
# Örnek: Proje D:\Projeler\workigom klasöründeyse:
cd D:\Projeler\workigom

# Veya C:\Users\KullaniciAdi\workigom klasöründeyse:
cd C:\Users\KullaniciAdi\workigom
```

**Adım 2: Script Çalıştır**

```cmd
quick-push.bat
```

**Veya tam yol ile:**

```cmd
.\quick-push.bat
```

---

#### **YOL 3: PowerShell ile** 💻

**Adım 1: PowerShell Aç**

```
1. Proje klasörüne sağ tıkla
2. "Open in Terminal" veya "PowerShell'de aç" seç
```

**Adım 2: Script Çalıştır**

```powershell
.\quick-push.bat
```

---

#### **YOL 4: Git Bash ile** 💻

**Adım 1: Git Bash Aç**

```
1. Proje klasörüne sağ tıkla
2. "Git Bash Here" seç
```

**Adım 2: Script Çalıştır**

```bash
./quick-push.bat
```

**Veya .sh versiyonunu çalıştır:**

```bash
./quick-push.sh
```

---

### **Mac/Linux Kullanıcıları İçin** 🍎🐧

#### **YOL 1: Terminal ile** ⭐ ÖNERİLEN

**Adım 1: Terminal Aç**

```
Mac: Applications > Utilities > Terminal
Linux: Ctrl+Alt+T
```

**Adım 2: Proje Klasörüne Git**

```bash
# Örnek: Proje ~/Desktop/workigom klasöründeyse:
cd ~/Desktop/workigom

# Veya tam yol:
cd /Users/kullaniciadi/workigom
```

**Adım 3: Script'i Çalıştırılabilir Yap (İLK SEFER)**

```bash
chmod +x quick-push.sh
```

**Adım 4: Script Çalıştır**

```bash
./quick-push.sh
```

---

#### **YOL 2: Finder/File Manager'dan** (Mac)

**Adım 1: Terminal'i Script Klasöründe Aç**

```
1. Finder'da proje klasörünü aç
2. quick-push.sh dosyasına SAĞ TIKLA
3. "Open With" > "Terminal" seç
```

**Veya:**

```
1. Finder'da proje klasörünü aç
2. Services > New Terminal at Folder
3. ./quick-push.sh yazıp Enter
```

---

## 📋 MEVCUT SCRIPT'LER VE KULLANIM

### **1. quick-push.bat / quick-push.sh** ⚡ HIZLI GIT PUSH

**Ne Yapar:**
```
✅ git add .
✅ git commit -m "fix: Prisma silindi + ENV check + _redirects"
✅ git push origin main
✅ Sonraki adımları gösterir
```

**Windows:**
```cmd
quick-push.bat
```

**Mac/Linux:**
```bash
chmod +x quick-push.sh
./quick-push.sh
```

---

### **2. github-prisma-sil.bat / github-prisma-sil.sh** 🗑️ PRISMA SİL

**Ne Yapar:**
```
✅ git rm -rf prisma
✅ git add .
✅ git commit -m "remove: Prisma silindi"
✅ git push origin main
✅ _redirects dosyasını düzeltir
```

**Windows:**
```cmd
github-prisma-sil.bat
```

**Mac/Linux:**
```bash
chmod +x github-prisma-sil.sh
./github-prisma-sil.sh
```

---

### **3. git-push.bat / git-push.sh** 📤 İLK GIT PUSH

**Ne Yapar:**
```
✅ Git repository başlatır
✅ GitHub'a bağlar
✅ İlk push yapar
⚠️ Sadece İLK SEFER kullanın!
```

**Windows:**
```cmd
git-push.bat
```

**Mac/Linux:**
```bash
chmod +x git-push.sh
./git-push.sh
```

---

### **4. deploy.bat / deploy.sh** 🚀 DEPLOYMENT

**Ne Yapar:**
```
✅ Build yapar
✅ Test eder
✅ Deploy eder
⚠️ Gelişmiş kullanıcılar için
```

**Windows:**
```cmd
deploy.bat
```

**Mac/Linux:**
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 🔧 MANUEL GIT KOMUTLARI

### **Temel Git İşlemleri:**

#### **1. Dosyaları Ekle**

```bash
git add .
```

**Tek dosya ekle:**
```bash
git add dosya-adi.tsx
```

---

#### **2. Commit Yap**

```bash
git commit -m "fix: Açıklama buraya"
```

**Örnekler:**
```bash
git commit -m "fix: Prisma silindi"
git commit -m "feat: ENV check endpoint eklendi"
git commit -m "docs: README güncellendi"
```

---

#### **3. GitHub'a Push Et**

```bash
git push origin main
```

**İlk push (upstream set):**
```bash
git push -u origin main
```

---

#### **4. Durum Kontrol**

```bash
git status
```

**Çıktı:**
```
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  modified:   App.tsx
  modified:   components/LoginScreen.tsx
```

---

#### **5. Log Görüntüle**

```bash
git log
```

**Kısa versiyon:**
```bash
git log --oneline
```

---

#### **6. Branch Değiştir**

```bash
git checkout main
```

**Yeni branch oluştur:**
```bash
git checkout -b yeni-branch-adi
```

---

## 🎯 ŞİMDİ NE YAPMALI? (ADIM ADIM)

### **ADIM 1: Terminal Aç**

**Windows (CMD):**
```
1. Windows tuşuna bas
2. "cmd" yaz
3. Enter
4. cd C:\path\to\workigom
```

**Windows (PowerShell):**
```
1. Proje klasörüne sağ tıkla
2. "Open in Terminal" seç
```

**Mac:**
```
1. Applications > Utilities > Terminal
2. cd ~/Desktop/workigom
```

**Linux:**
```
1. Ctrl+Alt+T
2. cd ~/workigom
```

---

### **ADIM 2: Proje Klasörüne Git**

```bash
# Nerede olduğunu kontrol et:
pwd

# Doğru klasörde misin kontrol et:
ls

# Göreceğin dosyalar:
# App.tsx
# package.json
# quick-push.bat
# vite.config.ts
# ...
```

---

### **ADIM 3: Script Çalıştır**

**Windows:**
```cmd
quick-push.bat
```

**Mac/Linux:**
```bash
chmod +x quick-push.sh
./quick-push.sh
```

---

### **ADIM 4: Çıktıyı İzle**

```
========================================
  HIZLI GIT PUSH - ENV CHECK TEST
========================================

[1/3] Dosyalar ekleniyor...
✓ Dosyalar eklendi!

[2/3] Commit olusturuluyor...
✓ Commit basarili!

[3/3] GitHub'a push ediliyor...
✓ Push basarili!

========================================
  ✅ GIT PUSH BASARILI!
========================================
```

---

## 🚨 HATA GİDERME

### **Hata 1: "command not found"**

```bash
# Mac/Linux'ta:
chmod +x quick-push.sh
./quick-push.sh

# Veya:
bash quick-push.sh
```

---

### **Hata 2: "permission denied"**

```bash
# Mac/Linux'ta:
chmod +x quick-push.sh
sudo ./quick-push.sh
```

---

### **Hata 3: "'git' is not recognized"**

```
SORUN: Git yüklü değil!

ÇÖZÜM:
1. Git indir: https://git-scm.com/downloads
2. Yükle
3. Terminal'i kapat ve tekrar aç
4. git --version ile kontrol et
```

---

### **Hata 4: "fatal: not a git repository"**

```bash
# Git başlat:
git init
git remote add origin https://github.com/KULLANICI_ADI/workigom.git
git branch -M main
git push -u origin main
```

---

### **Hata 5: "Authentication failed"**

```
SORUN: GitHub authentication gerekli!

ÇÖZÜM 1: Personal Access Token (PAT)
1. GitHub > Settings > Developer settings
2. Personal access tokens > Tokens (classic)
3. Generate new token
4. Yetkileri seç (repo, workflow)
5. Token'ı kopyala
6. Git push yaparken şifre yerine token kullan

ÇÖZÜM 2: SSH Key
1. SSH key oluştur:
   ssh-keygen -t ed25519 -C "email@example.com"
2. Public key'i GitHub'a ekle:
   GitHub > Settings > SSH keys
3. SSH ile push:
   git remote set-url origin git@github.com:KULLANICI_ADI/workigom.git
```

---

## 💡 İPUÇLARI

### **Tip 1: Terminal Kısayolları**

**Windows:**
```
Ctrl+C: İşlemi iptal et
Tab: Otomatik tamamla
↑/↓: Önceki komutlar
Ctrl+L: Ekranı temizle
```

**Mac/Linux:**
```
Ctrl+C: İşlemi iptal et
Tab: Otomatik tamamla
↑/↓: Önceki komutlar
Ctrl+L veya clear: Ekranı temizle
Ctrl+D: Terminal'i kapat
```

---

### **Tip 2: Proje Klasörüne Hızlı Git**

**Windows:**
```
1. Proje klasörünü aç (Explorer'da)
2. Adres çubuğuna "cmd" yaz
3. Enter
✅ Terminal doğru klasörde açılır!
```

**Mac:**
```
1. Finder'da proje klasörünü aç
2. Services > New Terminal at Folder
✅ Terminal doğru klasörde açılır!
```

---

### **Tip 3: Alias Oluştur (Kısayol)**

**Git Bash / Mac / Linux:**

```bash
# .bashrc veya .zshrc dosyasına ekle:
alias workigom='cd ~/Desktop/workigom'
alias qpush='./quick-push.sh'

# Kullanım:
workigom  # Proje klasörüne git
qpush     # Script çalıştır
```

---

## 🎯 HIZLI BAŞLANGIÇ ÖZETİ

### **Windows (EN KOLAY):**

```
1. Proje klasörünü Windows Explorer'da aç
2. quick-push.bat dosyasına ÇİFT TIKLA
3. BİTTİ! ✅
```

---

### **Windows (Terminal):**

```cmd
# CMD veya PowerShell aç:
cd C:\path\to\workigom
quick-push.bat
```

---

### **Mac/Linux:**

```bash
# Terminal aç:
cd ~/Desktop/workigom
chmod +x quick-push.sh
./quick-push.sh
```

---

### **Manuel Git Komutları (Her Platform):**

```bash
git add .
git commit -m "fix: Prisma + ENV check + _redirects"
git push origin main
```

---

## 📚 SONRA NE YAPMALI?

### **Git Push Sonrası:**

```
1. ✅ Git push başarılı!

2. Render Dashboard aç:
   https://dashboard.render.com/

3. workigom-backend seç

4. Manual Deploy > Deploy latest commit

5. ⏳ Bekle (2-3 dakika)

6. Test et:
   https://workigom-backend.onrender.com/api/_env-check

7. DATABASE_URL: false mu kontrol et

8. BİTTİ! 🎉
```

---

## 🔗 KAYNAKLAR

### **Git Komutları:**
```
https://git-scm.com/docs
```

### **GitHub Docs:**
```
https://docs.github.com/
```

### **Git Cheat Sheet:**
```
https://education.github.com/git-cheat-sheet-education.pdf
```

---

## ✅ ÖZET

### **Script Çalıştırma:**

```
Windows:
  → Dosyaya çift tıkla: quick-push.bat
  → Veya terminal: quick-push.bat

Mac/Linux:
  → Terminal: chmod +x quick-push.sh
  → Sonra: ./quick-push.sh

Manuel:
  → git add .
  → git commit -m "fix: Açıklama"
  → git push origin main
```

---

### **Hangi Script'i Kullanmalı?**

```
İLK SEFER GIT PUSH:
  → git-push.bat / git-push.sh

PRISMA SİLMEK İÇİN:
  → github-prisma-sil.bat / github-prisma-sil.sh

HIZLI GIT PUSH:
  → quick-push.bat / quick-push.sh  ⭐ ŞİMDİ BU!

DEPLOYMENT:
  → deploy.bat / deploy.sh
```

---

**ŞİMDİ:** `quick-push.bat` DOSYASINA ÇİFT TIKLA! 🚀

**VEYA TERMİNAL'DE:** `quick-push.bat` ÇALIŞTIR! 💻

**BAŞARILAR!** 🎉
