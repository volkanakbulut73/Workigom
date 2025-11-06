# 🔧 Environment Variables Kurulumu

## ❌ Sorun
```
TypeError: Cannot read properties of undefined (reading 'VITE_SUPABASE_URL')
```

## ✅ Çözüm

### Adım 1: `.env` Dosyası Oluşturun

Proje root dizininde (package.json ile aynı seviyede) `.env` dosyası oluşturun:

```bash
# Terminalden:
touch .env

# Veya manuel olarak .env dosyası oluşturun
```

### Adım 2: Environment Variables Ekleyin

`.env` dosyasını açın ve şunları ekleyin:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Adım 3: Supabase Credentials Alın

1. **Supabase'e gidin:** https://supabase.com/dashboard
2. **Proje seçin** (veya yeni proje oluşturun)
3. **Settings** ⚙️ → **API** sekmesine gidin
4. **Kopyalayın:**
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`

### Adım 4: `.env` Dosyasını Güncelleyin

Placeholder değerleri gerçek credentials ile değiştirin:

```env
# ❌ YANLIŞ (placeholder)
VITE_SUPABASE_URL=https://your-project-id.supabase.co

# ✅ DOĞRU (gerçek değer)
VITE_SUPABASE_URL=https://abcdefghij.supabase.co
```

### Adım 5: Dev Server'ı Yeniden Başlatın

**ÖNEMLİ:** Environment variables sadece server restart ile yüklenir!

```bash
# Ctrl+C ile durdurun
# Sonra yeniden başlatın:
npm run dev
```

---

## 🔍 Doğrulama

Server başladığında console'da şunu görmeli:

```
✅ Supabase configured successfully
```

Eğer şunu görüyorsanız:

```
⚠️ SUPABASE NOT CONFIGURED
```

- `.env` dosyasını kontrol edin
- Placeholder değerleri değiştirdiğinizden emin olun
- Server'ı yeniden başlattığınızdan emin olun

---

## 📁 Dosya Yapısı

`.env` dosyası şurada olmalı:

```
workigom/
├── .env                    ← Burası!
├── .env.example
├── package.json
├── App.tsx
├── vite.config.ts
└── ...
```

---

## 🔒 Güvenlik

✅ `.env` dosyası `.gitignore`'da (git'e commitlenmez)  
✅ API key'leri asla paylaşmayın  
✅ Public repoda `.env` olmamalı

---

## 💡 Alternatif: Supabase Olmadan Çalıştırma

Supabase kurmak istemiyorsanız:

1. App şu anda **mock mode** ile çalışabilir
2. Authentication disabled olacak
3. Sağ altta **Setup Checker** uyarısı göreceksiniz
4. "Kapat" diyerek uyarıyı kapatabilirsiniz

**NOT:** Production için Supabase kurulumu zorunludur!

---

## 🆘 Sorun Giderme

### `.env` dosyası okumuyor

**Çözüm:**
```bash
# 1. Dosya varlığını kontrol edin
ls -la .env

# 2. İçeriği kontrol edin
cat .env

# 3. Server'ı yeniden başlatın
npm run dev
```

### Hala hata alıyorum

**Kontrol listesi:**
- [ ] `.env` dosyası root'ta mı?
- [ ] İçinde `VITE_SUPABASE_URL` var mı?
- [ ] İçinde `VITE_SUPABASE_ANON_KEY` var mı?
- [ ] Placeholder değerler değiştirildi mi?
- [ ] Dev server yeniden başlatıldı mı?

---

## 📚 İlgili Dokümantasyon

- **QUICK_SETUP.md** - Tam kurulum rehberi
- **SUPABASE_SETUP.md** - Detaylı Supabase kurulumu
- **.env.example** - Template dosya

---

**Hazır mısınız?** `.env` dosyanızı oluşturun ve dev server'ı yeniden başlatın! 🚀
