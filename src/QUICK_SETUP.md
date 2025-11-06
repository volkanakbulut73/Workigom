# ⚡ Workigom - Hızlı Kurulum (5 Dakika)

> 📌 **Not:** Bu dosya eski kurulum rehberidir. 
> 
> **Yeni ve daha kolay kurulum için:** `HIZLI_BASLANGIC.md` dosyasına bakın!

---

## ✅ İyi Haber!

Uygulama **zaten Supabase ile bağlantılı**! Credentials otomatik olarak yükleniyor.

Yapmanız gereken sadece **database schema kurulumu**.

---

## 🚀 Basit Kurulum

### 1. Dependencies Yükleyin

```bash
npm install
```

### 2. Database Schema'sını Kurun

1. [Supabase Dashboard](https://supabase.com/dashboard) açın
2. **SQL Editor** > **New query**
3. `/supabase/migrations/001_initial_schema.sql` dosyasını çalıştırın
4. **Run** butonuna tıklayın ▶️

### 3. Test Kullanıcılarını Oluşturun

SQL Editor'de test kullanıcıları SQL'ini çalıştırın (detaylar `HIZLI_BASLANGIC.md`'de)

### 4. Başlatın!

```bash
npm run dev
```

---

## 📖 Detaylı Rehber

- **Hızlı Başlangıç:** `HIZLI_BASLANGIC.md`
- **Adım Adım Rehber:** `SUPABASE_ADIM_ADIM_REHBER.md`

---

<details>
<summary>📜 Eski Kurulum Adımları (Artık Gerekli Değil)</summary>

## 🔧 Adım 2: Supabase Projesi Oluşturun (ESKİ)

### 2.1. Supabase'e Kayıt Olun
1. [supabase.com](https://supabase.com) adresine gidin
2. **"Start your project"** butonuna tıklayın
3. GitHub hesabınızla giriş yapın

### 2.2. Yeni Proje Oluşturun
1. **"New Project"** butonuna tıklayın
2. Proje bilgilerini girin:
   - **Name:** `workigom`
   - **Database Password:** Güçlü bir şifre (kaydedin!)
   - **Region:** Europe (Central)
   - **Pricing Plan:** Free
3. **"Create new project"** → Bekleyin (1-2 dakika)

---

## 📝 Adım 3: API Anahtarlarını Alın

1. Supabase Dashboard'da **Settings** (⚙️) → **API** sekmesine gidin
2. Şu iki değeri kopyalayın:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJhbGc...` (uzun bir string)

---

## 🔑 Adım 4: .env Dosyasını Yapılandırın

1. Proje root dizininde `.env` dosyasını açın
2. Placeholder değerleri kendi API key'lerinizle değiştirin:

```env
VITE_SUPABASE_URL=https://your-actual-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...your_actual_key
```

**⚠️ ÖNEMLİ:** Gerçek değerlerinizi yapıştırın, placeholder'ları kullanmayın!

---

## 🗄️ Adım 5: Database Schema'yı Kurun

1. Supabase Dashboard → **SQL Editor** sekmesine gidin
2. **"New query"** butonuna tıklayın
3. `/supabase/migrations/001_initial_schema.sql` dosyasını açın
4. **Tüm SQL kodunu** kopyalayın
5. SQL Editor'e yapıştırın
6. **"Run"** butonuna tıklayın

✅ **Başarılı:** "Success. No rows returned" mesajı görmelisiniz

### Schema Doğrulama
1. **Table Editor** sekmesine gidin
2. Şu tabloların oluşturulduğunu doğrulayın:
   - ✅ users
   - ✅ jobs
   - ✅ applications
   - ✅ donations
   - ✅ notifications
   - ✅ transactions

---

## 🚀 Adım 6: Dev Server'ı Başlatın

```bash
# Eğer çalışıyorsa durdurun (Ctrl+C)
# Sonra yeniden başlatın:
npm run dev
```

**Environment variables sadece server restart ile yüklenir!**

---

## ✅ Adım 7: Test Edin

1. Tarayıcıda `http://localhost:5173` açın
2. **"Başla"** butonuna tıklayın
3. **Bireysel** veya **Kurumsal** seçin
4. **"Kayıt Ol"** sekmesine geçin
5. Yeni hesap oluşturun

**Başarılı!** 🎉 Artık Supabase ile çalışıyorsunuz!

---

## 🐛 Sorun Giderme

### Hata: "Supabase Yapılandırılmamış"

**Çözüm:**
1. `.env` dosyasını kontrol edin
2. Placeholder değerleri değiştirdiğinizden emin olun
3. Dev server'ı **yeniden başlatın** (Ctrl+C → npm run dev)

### Hata: "Invalid API key"

**Çözüm:**
1. Supabase Dashboard → Settings → API
2. Key'leri **yeniden kopyalayın**
3. `.env` dosyasına yapıştırın
4. Dev server'ı yeniden başlatın

### Hata: "relation does not exist"

**Çözüm:**
1. SQL migration'ı çalıştırdığınızdan emin olun
2. Table Editor'de tabloları kontrol edin
3. Gerekirse migration'ı tekrar çalıştırın

### Hala Çalışmıyor?

1. **Console'u** kontrol edin (F12 → Console tab)
2. **Network tab**'ı kontrol edin (API çağrıları başarısız mı?)
3. Supabase Dashboard → **Logs** → Hataları görün

---

## 📚 Detaylı Dokümantasyon

Daha fazla bilgi için:
- **SUPABASE_SETUP.md** - Kapsamlı kurulum rehberi
- **SUPABASE_INTEGRATION_TODO.md** - Tüm görev listesi
- **NEXT_STEPS.md** - Sonraki adımlar

---

## 🎯 Özet Checklist

- [ ] `npm install` çalıştırdım
- [ ] Supabase projesi oluşturdum
- [ ] API anahtarlarını aldım
- [ ] `.env` dosyasını güncelledim
- [ ] SQL migration'ı çalıştırdım
- [ ] Tabloları doğruladım
- [ ] Dev server'ı yeniden başlattım
- [ ] Test hesabı oluşturdum

---

**Tebrikler!** 🎉 Workigom artık production-ready Supabase backend ile çalışıyor!

**Sonraki Adım:** Test kullanıcıları oluşturup uygulamayı test edin.

---

**Son Güncelleme:** 2 Kasım 2025
