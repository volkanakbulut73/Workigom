# ⚡ Supabase Hızlı Başlatma - Workigom

## 🎯 5 Dakikada Supabase'i Çalıştır!

Bu rehber ile Workigom'u Supabase ile **5 dakikada** çalışır hale getirin!

---

## ✅ Gereksinimler

- [ ] Supabase hesabı (https://supabase.com - ücretsiz)
- [ ] Workigom projesinin yerel kopyası
- [ ] Node.js yüklü

---

## 🚀 3 Adımda Kurulum

### 1️⃣ Supabase Projesi Oluştur (2 dakika)

#### a) Projeyi Oluştur
1. https://app.supabase.com → **New Project**
2. **Organization** seçin (yoksa oluşturun)
3. Bilgileri doldurun:
   ```
   Name: workigom
   Database Password: [GÜÇ

LÜ ŞİFRE OLUŞTUR - KAYDET!]
   Region: Europe West (Ireland)
   ```
4. **Create new project** tıklayın
5. ⏳ 2-3 dakika bekleyin (proje hazırlanıyor)

#### b) API Bilgilerini Kopyalayın
1. Project oluştuktan sonra → **Settings** → **API**
2. Şunları kopyalayın:
   - ✅ **Project URL**
   - ✅ **anon/public key**

---

### 2️⃣ Database Şemasını Oluştur (2 dakika)

#### SQL Editor'de Migration Çalıştır

1. **SQL Editor** → **New query** (sol menüden)

2. Workigom projesinde `/supabase/migrations/001_initial_schema.sql` dosyasını açın

3. **Tüm içeriği kopyalayın** (Ctrl/Cmd + A, Ctrl/Cmd + C)

4. SQL Editor'e **yapıştırın** (Ctrl/Cmd + V)

5. **Run** butonu tıklayın ▶️

6. ✅ **"Success. No rows returned"** mesajını görünüz mü?
   - **EVET** → Tebrikler! Tablolar oluşturuldu 🎉
   - **HAYIR** → Hata mesajını okuyun, tekrar deneyin

**Oluşturulan Tablolar:**
- ✅ `users`
- ✅ `jobs`
- ✅ `applications`
- ✅ `donations`
- ✅ `notifications`
- ✅ `transactions`
- ✅ `workigom-files` (storage bucket)

---

### 3️⃣ Environment Variables Ayarla (1 dakika)

#### .env.local Dosyası Oluştur

**Workigom proje klasöründe:**

1. **Terminal** açın
2. `.env.local` dosyası oluşturun:
   ```bash
   # Windows
   type nul > .env.local
   
   # Mac/Linux
   touch .env.local
   ```

3. Dosyayı bir editörle açın ve şunu yapıştırın:
   ```env
   VITE_SUPABASE_URL=BURAYA_PROJECT_URL_YAPIŞTIR
   VITE_SUPABASE_ANON_KEY=BURAYA_ANON_KEY_YAPIŞTIR
   ```

4. **Project URL** ve **anon key**'i yapıştırın (Adım 1'de kopyaladınız)

5. **Dosyayı kaydedin**

**Örnek `.env.local`:**
```env
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 🎉 Tamamlandı! Test Edelim

### Uygulamayı Çalıştır

```bash
# Development server'ı başlat
npm run dev
```

### Test Adımları

1. **Tarayıcıda açın:** http://localhost:5173

2. **Kayıt Ol** sayfasına gidin

3. **Bireysel kullanıcı** olarak kayıt olun:
   ```
   Ad Soyad: Test Kullanıcı
   Email: test@workigom.com
   Şifre: test123456
   ```

4. ✅ Kayıt başarılı oldu mu?
   - **EVET** → Harika! Supabase çalışıyor! 🎉
   - **HAYIR** → Aşağıdaki sorun giderme bölümüne bakın

5. **Supabase Dashboard'da kontrol edin:**
   - Authentication → Users → Yeni kullanıcı göründü mü?
   - Table Editor → `users` → Kayıt var mı?

---

## 🐛 Sorun Giderme

### ❌ "Failed to fetch" Hatası

**Sorun:** `.env.local` yanlış veya Supabase projesi çalışmıyor

**Çözüm:**
1. `.env.local` dosyasını kontrol edin
2. `VITE_SUPABASE_URL` doğru mu?
3. Supabase Dashboard'da proje "Paused" değil mi?
4. Development server'ı **yeniden başlatın**:
   ```bash
   # Ctrl+C ile durdurun
   npm run dev
   ```

### ❌ "Invalid API key" Hatası

**Sorun:** `VITE_SUPABASE_ANON_KEY` yanlış

**Çözüm:**
1. Supabase Dashboard → Settings → API
2. **anon/public key**'i tekrar kopyalayın
3. `.env.local`'e yapıştırın
4. Development server'ı yeniden başlatın

### ❌ "relation 'users' does not exist" Hatası

**Sorun:** Migration dosyası çalıştırılmadı

**Çözüm:**
1. Supabase Dashboard → SQL Editor
2. `001_initial_schema.sql` dosyasını tekrar çalıştırın
3. "Success" mesajını bekleyin

### ❌ "Email not confirmed" Hatası

**Sorun:** Email onaylama aktif

**Çözüm (Geliştirme için):**
1. Authentication → Settings → Email
2. **"Confirm email"** seçeneğini KAPATIN
3. Save
4. VEYA: Authentication → Users → kullanıcıyı bul → "Confirm email"

---

## 🎨 Opsiyonel: Ek Özellikler Ekle

**Mesajlaşma, favoriler, değerlendirmeler eklemek için:**

1. SQL Editor → New query
2. `/supabase/migrations/002_additional_features.sql` dosyasını açın
3. İçeriği kopyala → SQL Editor'e yapıştır
4. Run

**Eklenen Özellikler:**
- ✅ Mesajlaşma sistemi
- ✅ İş kategorileri
- ✅ Favori ilanlar
- ✅ Kullanıcı değerlendirmeleri
- ✅ Destek talepleri

---

## 📚 Detaylı Rehberler

### Tablo Dokümantasyonu
- **`SUPABASE_TABLOLAR.md`** - Her tablonun detaylı açıklaması
- **`SUPABASE_TABLO_OZET.md`** - Hızlı tablo özeti

### Kurulum Rehberleri
- **`SUPABASE_KURULUM_CHECKLIST.md`** - 30 dakikalık komple checklist
- **`SUPABASE_ADIM_ADIM_REHBER.md`** - Detaylı adım adım kurulum

### Özel Özellikler
- **`GOOGLE_OAUTH_ENTEGRASYON_REHBERI.md`** - Google ile giriş
- **`YEMEK_BAGIS_SISTEMI_AKIS.md`** - Dayanışma Menüsü akışı

---

## 🔐 Güvenlik Notları

### Yapmanız Gerekenler:
- ✅ `.env.local` dosyasını `.gitignore`'a ekleyin
- ✅ Güçlü database şifresi kullanın
- ✅ Production'da email onaylama açın
- ✅ RLS politikalarını test edin

### Yapmamanız Gerekenler:
- ❌ `.env.local`'i GitHub'a commit etmeyin
- ❌ Database şifresini paylaşmayın
- ❌ anon key'i production'da public yapmayın
- ❌ RLS politikalarını devre dışı bırakmayın

---

## 📊 Supabase Dashboard Hızlı Erişim

**Projeniz URL'si:**
```
https://app.supabase.com/project/YOUR_PROJECT_ID
```

**Önemli Sayfalar:**

| Sayfa | Ne İçin Kullanılır | Link |
|-------|-------------------|------|
| **SQL Editor** | SQL sorguları, migration | `/sql` |
| **Table Editor** | Tabloları görüntüle/düzenle | `/editor` |
| **Authentication** | Kullanıcıları yönet | `/auth/users` |
| **Storage** | Dosyaları yönet | `/storage/buckets` |
| **Logs** | Hataları görüntüle | `/logs/explorer` |
| **API Settings** | URL ve key'leri kopyala | `/settings/api` |

---

## 🎯 Sonraki Adımlar

### 1. Test Verileri Ekle
```sql
-- SQL Editor'de
-- Örnek iş ilanı oluştur
INSERT INTO jobs (corporate_id, title, description, location, date, time, hourly_rate, positions)
SELECT id, 'Etkinlik Görevlisi', 'Test iş ilanı', 'İstanbul', '2025-11-10', '09:00-17:00', 85.00, 3
FROM users WHERE user_type = 'corporate' LIMIT 1;
```

### 2. Production'a Deploy Et
- `WEB_HOSTING_REHBERI.md` - Netlify, Vercel, Render
- Production URL'i Supabase'e ekle (Authentication → URL Configuration)

### 3. Google OAuth Ekle
- `GOOGLE_OAUTH_ENTEGRASYON_REHBERI.md`
- Google Console'da OAuth credentials oluştur
- Supabase'e Google provider ekle

### 4. Monitoring Ayarla
- Supabase Dashboard → Logs → Error tracking
- Email bildirimleri aktif et
- Database backup'ları kontrol et

---

## ✅ Kurulum Checklist

**Temel Kurulum:**
- [ ] Supabase projesi oluşturuldu
- [ ] Database şifresi kaydedildi
- [ ] Migration dosyası (`001_initial_schema.sql`) çalıştırıldı
- [ ] 6 tablo oluşturuldu (users, jobs, applications, donations, notifications, transactions)
- [ ] Storage bucket oluşturuldu (workigom-files)
- [ ] `.env.local` dosyası oluşturuldu
- [ ] `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` eklendi
- [ ] `.gitignore` dosyasında `.env.local` var

**Test:**
- [ ] `npm run dev` çalıştırıldı
- [ ] http://localhost:5173 açıldı
- [ ] Kayıt ol sayfası çalışıyor
- [ ] Kullanıcı oluşturuldu
- [ ] Supabase'de kullanıcı göründü

**Opsiyonel:**
- [ ] Ek özellikler migration (`002_additional_features.sql`) çalıştırıldı
- [ ] Google OAuth ayarlandı
- [ ] Email onaylama ayarlandı
- [ ] Test verileri eklendi

---

## 🆘 Yardıma İhtiyacınız mı?

### Hızlı Yardım

**Tablolar eksik:**
→ `001_initial_schema.sql` dosyasını SQL Editor'de çalıştırın

**Bağlantı hatası:**
→ `.env.local` dosyasını kontrol edin, dev server'ı yeniden başlatın

**RLS hatası:**
→ Migration dosyası çalıştırıldı mı kontrol edin

**Email onay:**
→ Authentication → Settings → Email → "Confirm email" KAPATIN (dev için)

### Detaylı Yardım

**Komple rehber:**
- `SUPABASE_KURULUM_CHECKLIST.md`

**Sorun giderme:**
- `SORUN_GIDERME.md`

**Supabase dokümantasyon:**
- https://supabase.com/docs

---

## 🎉 Tebrikler!

**✅ Workigom artık Supabase ile çalışıyor!**

**Başarıyla tamamladınız:**
- ✅ Supabase projesi oluşturuldu
- ✅ Database şeması kuruldu (6 tablo + storage)
- ✅ Environment variables ayarlandı
- ✅ Uygulama test edildi

**Şimdi ne yapabilirsiniz:**
- 🎨 Arayüzü test edin
- 💼 İş ilanları oluşturun
- 👥 Kullanıcı rolleri deneyin
- 💙 Dayanışma Menüsü'nü kullanın
- 🚀 Production'a deploy edin

**İyi çalışmalar! 🚀**

---

**Son Güncelleme:** 5 Kasım 2025  
**Workigom Version:** 1.0.0  
**Süre:** ~5 dakika ⚡
