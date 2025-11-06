# ⚡ GitHub'a HEMEN Bağlan!

## 🎯 2 Yöntem - Siz Seçin!

---

## Yöntem 1: Otomatik Script (EN KOLAY) 🚀

### Windows Kullanıcıları:
```cmd
git-push.bat
```

### Mac/Linux Kullanıcıları:
```bash
chmod +x git-push.sh
./git-push.sh
```

**Script ne yapacak?**
1. Git başlatacak
2. Dosyaları ekleyecek
3. Commit oluşturacak
4. GitHub kullanıcı adınızı soracak
5. Repository'nizi bağlayacak
6. Yükleyecek

**Sadece GitHub kullanıcı adınızı yazın, gerisini script halleder! ✅**

---

## Yöntem 2: Manuel Komutlar (KLASİK) 💻

### Adım 1: GitHub'da Repository Oluştur
1. https://github.com → **+** → **New repository**
2. **Name:** workigom
3. **Public** ✅
4. **Create repository**

### Adım 2: Terminalden Komutları Çalıştır

**Tüm komutları kopyala-yapıştır:**

```bash
git init
git add .
git commit -m "🎉 Workigom ilk commit"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/workigom.git
git push -u origin main
```

**⚠️ KULLANICI_ADINIZ yerine kendi GitHub kullanıcı adınızı yazın!**

---

## ✅ Tamamlandı mı Kontrol Et

**GitHub'da repository'nizi açın:**
```
https://github.com/KULLANICI_ADINIZ/workigom
```

**Dosyalar görünüyor mu?**
- ✅ EVET → Tebrikler! 🎉
- ❌ HAYIR → `SORUN_GIDERME.md` dosyasına bakın

---

## 🔄 Güncellemeleri Nasıl Gönderirim?

**Kod değiştirdikten sonra:**

```bash
git add .
git commit -m "✨ Yeni özellik eklendi"
git push
```

**Sadece 3 komut! Hepsi bu! 🚀**

---

## 🐛 Hızlı Sorun Giderme

### ❌ "git: command not found"
→ Git yükleyin: https://git-scm.com/downloads

### ❌ "Repository not found"
→ GitHub'da workigom repository'sini oluşturdunuz mu?

### ❌ "Permission denied"
→ Yukarıdaki komutlar HTTPS kullanıyor, çalışması lazım

### ❌ Script çalışmıyor
→ Manuel komutları kullanın (Yöntem 2)

---

## 📚 Daha Fazla Bilgi

**Basit rehber:**
- `GITHUB_BAGLANTI_KOLAY.md` - Detaylı ama basit

**Komple rehber:**
- `GITHUB_HIZLI_BASLANGIC.md` - Her şey dahil
- `GITHUB_KOMUTLAR.md` - Tüm Git komutları

**Sorun mu var?**
- `SORUN_GIDERME.md` - Yaygın hatalar

---

## 🎉 Başarılı Oldunuz!

**Repository URL:**
```
https://github.com/KULLANICI_ADINIZ/workigom
```

**Sonraki Adımlar:**

1. **Netlify'a Deploy Et** → `WEB_HOSTING_REHBERI.md`
2. **Domain Bağla** → `DOMAIN_VE_CANLI_YAYIN_REHBERI.md`
3. **Supabase Backend** → `SUPABASE_HIZLI_BASLATMA.md`

**İyi çalışmalar! 🚀**

---

**💡 İpucu:** Script kullanırsanız süreç sadece **30 saniye** sürer!
