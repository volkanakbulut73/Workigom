# ⚡ SCRIPT ÇALIŞTIRMA - SÜPER BASİT!

## 🪟 WINDOWS KULLANICILARI

### **YÖNTEM 1: ÇİFT TIKLA** ⭐ EN KOLAY!

```
1. 📁 Proje klasörünü aç (workigom klasörü)

2. 🔍 "quick-push.bat" dosyasını bul

3. 🖱️ Dosyaya ÇİFT TIKLA

4. ✅ Otomatik çalışır!
```

**GÖRSELLEŞTİRME:**
```
workigom/
  ├── quick-push.bat  👈 BUNA ÇİFT TIKLA!
  ├── package.json
  ├── App.tsx
  └── ...
```

---

### **YÖNTEM 2: TERMİNAL** 💻

**Adım 1: Terminal Aç**
```
Yöntem A: Windows tuşu + R → "cmd" yaz → Enter
Yöntem B: Proje klasörüne sağ tıkla → "Open in Terminal"
```

**Adım 2: Proje Klasörüne Git**
```cmd
cd C:\Users\KullaniciAdiniz\Desktop\workigom
```

**Adım 3: Script Çalıştır**
```cmd
quick-push.bat
```

**VEYA tek satır:**
```cmd
.\quick-push.bat
```

---

## 🍎 MAC KULLANICILARI

### **YÖNTEM: TERMİNAL** 💻

**Adım 1: Terminal Aç**
```
Applications > Utilities > Terminal
```

**Adım 2: Proje Klasörüne Git**
```bash
cd ~/Desktop/workigom
```

**Adım 3: Script'i Çalıştırılabilir Yap (Sadece İLK SEFER)**
```bash
chmod +x quick-push.sh
```

**Adım 4: Script Çalıştır**
```bash
./quick-push.sh
```

---

## 🐧 LINUX KULLANICILARI

### **YÖNTEM: TERMİNAL** 💻

**Adım 1: Terminal Aç**
```
Ctrl + Alt + T
```

**Adım 2: Proje Klasörüne Git**
```bash
cd ~/workigom
```

**Adım 3: Script'i Çalıştırılabilir Yap (Sadece İLK SEFER)**
```bash
chmod +x quick-push.sh
```

**Adım 4: Script Çalıştır**
```bash
./quick-push.sh
```

---

## ❓ HANGI DOSYAYI ÇALIŞTIRMALIYIM?

### **Şu Anda Kullanacağın:** ⭐

```
Windows: quick-push.bat
Mac:     quick-push.sh
Linux:   quick-push.sh
```

---

### **Diğer Script'ler:**

```
git-push.bat/sh
  → İLK SEFER GitHub'a yüklemek için
  → Sadece BİR KEZ kullan!

github-prisma-sil.bat/sh
  → Prisma klasörünü silmek için
  → Zaten silindi, gerekmez!

deploy.bat/sh
  → Production deployment için
  → Gelişmiş kullanıcılar için
```

---

## 🎯 ŞUANDA NE YAPMALI?

### **ADIM 1: Script Çalıştır**

**Windows:**
```
1. workigom klasörünü aç
2. quick-push.bat dosyasına ÇİFT TIKLA
```

**Mac/Linux:**
```bash
cd ~/Desktop/workigom
chmod +x quick-push.sh
./quick-push.sh
```

---

### **ADIM 2: Çıktıyı İzle**

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

SIMDI NE YAPMALI?

1. Render Dashboard ac:
   https://dashboard.render.com/

2. workigom-backend sec

3. Manual Deploy > Deploy latest commit

4. Test et:
   https://workigom-backend.onrender.com/api/_env-check
```

---

### **ADIM 3: Render'da Backend Redeploy**

```
1. https://dashboard.render.com/ aç

2. Sol menüden "workigom-backend" seç

3. Sağ üst "Manual Deploy" > "Deploy latest commit"

4. ⏳ Bekle (2-3 dakika)

5. "Your service is live" ✅
```

---

### **ADIM 4: Test Et**

**Tarayıcıda aç:**
```
https://workigom-backend.onrender.com/api/_env-check
```

**Beklenen:**
```json
{
  "ok": true,
  "checks": {
    "HAS_DATABASE_URL": false  ✅
  }
}
```

---

## 🚨 SORUN ÇÖZME

### **"Windows protected your PC" Uyarısı**

```
1. "More info" tıkla
2. "Run anyway" tıkla
✅ Script çalışır
```

---

### **"command not found" (Mac/Linux)**

```bash
# Önce çalıştırılabilir yap:
chmod +x quick-push.sh

# Sonra çalıştır:
./quick-push.sh
```

---

### **"'git' is not recognized" (Windows)**

```
SORUN: Git yüklü değil!

ÇÖZÜM:
1. https://git-scm.com/downloads
2. Git'i indir ve yükle
3. Terminal'i kapat ve tekrar aç
4. Tekrar dene
```

---

### **"fatal: not a git repository"**

```
SORUN: Yanlış klasördesin!

ÇÖZÜM:
1. Doğru klasöre git:
   cd C:\path\to\workigom

2. Kontrol et:
   dir (Windows)
   ls (Mac/Linux)

3. package.json görünüyor mu? ✅
```

---

## 💡 HIZLI İPUÇLARI

### **Windows İpucu:**

```
Proje klasörünü Explorer'da aç
→ Adres çubuğuna "cmd" yaz
→ Enter
✅ Terminal doğru klasörde açılır!
```

---

### **Mac İpucu:**

```
Finder'da proje klasörüne sağ tıkla
→ Services > New Terminal at Folder
✅ Terminal doğru klasörde açılır!
```

---

### **Her Platform İçin:**

```
Script çalışmazsa manuel yap:

git add .
git commit -m "fix: Prisma + ENV check + _redirects"
git push origin main
```

---

## ✅ ÖZET

### **Ne Yapacaksın:**

```
1. ✅ quick-push.bat çalıştır (Windows'ta çift tıkla!)
   VEYA
   ✅ quick-push.sh çalıştır (Mac/Linux'ta terminal'de)

2. ✅ Render'da backend redeploy

3. ✅ Test et: /api/_env-check

4. ✅ DATABASE_URL: false mu kontrol et

5. ✅ BİTTİ! 🎉
```

---

### **Toplam Süre:**

```
Script çalıştır:     30 saniye
Backend redeploy:    3 dakika
Test:                30 saniye
────────────────────────────────
TOPLAM:              4 dakika
```

---

**HEMEN BAŞLA:**

**Windows:** `quick-push.bat` dosyasına ÇİFT TIKLA! 🖱️

**Mac/Linux:** Terminal'de `./quick-push.sh` çalıştır! 💻

**BAŞARILAR!** 🎉
