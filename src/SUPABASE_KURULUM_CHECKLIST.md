# ✅ Supabase Kurulum Checklist - Workigom

## 🎯 Hızlı Başlangıç

Bu checklist ile Workigom uygulamanızı Supabase ile 30 dakikada entegre edin!

---

## 📋 Ön Hazırlık (5 dakika)

### 1. Gereksinimler
- [ ] Supabase hesabı oluşturuldu (https://supabase.com)
- [ ] Node.js yüklü (v18+)
- [ ] Git yüklü
- [ ] Proje yerel makinede çalışıyor

### 2. Dosyaları Kontrol Et
- [ ] `/supabase/migrations/001_initial_schema.sql` var
- [ ] `/supabase/migrations/002_additional_features.sql` var (opsiyonel)
- [ ] `/utils/supabase/` klasörü var
- [ ] `.env.local` hazır (şimdi oluşturulacak)

---

## 🚀 Adım 1: Supabase Projesi Oluştur (5 dakika)

### Supabase Dashboard

1. **Proje Oluştur**
   - [ ] https://app.supabase.com → "New Project"
   - [ ] Project name: `workigom`
   - [ ] Database password: **GÜVENLİ ŞİFRE OLUŞTUR VE KAYDET!** 🔐
   - [ ] Region: `Europe West (Ireland)` veya en yakın
   - [ ] "Create new project" tıkla

2. **Proje Bilgilerini Kaydet**
   - [ ] Project URL kopyalandı
   - [ ] Anon key kopyalandı
   - [ ] Database password kaydedildi

**Not:** Proje oluşturma 2-3 dakika sürebilir ⏳

---

## 🗄️ Adım 2: Veritabanı Şemasını Oluştur (10 dakika)

### SQL Editor'de Migration Çalıştır

#### Temel Şema (Zorunlu) ✅

1. **SQL Editor'ü Aç**
   - [ ] Supabase Dashboard → SQL Editor (sol menü)
   - [ ] "New query" tıkla

2. **Migration Dosyasını Kopyala**
   - [ ] `/supabase/migrations/001_initial_schema.sql` dosyasını aç
   - [ ] Tüm içeriği kopyala (Ctrl/Cmd + A, Ctrl/Cmd + C)
   - [ ] SQL Editor'e yapıştır (Ctrl/Cmd + V)

3. **Migration'ı Çalıştır**
   - [ ] "Run" butonu tıkla
   - [ ] ✅ "Success. No rows returned" mesajı göründü mü?
   - [ ] ❌ Hata varsa: Hata mesajını kontrol et, dosyayı tekrar dene

**Oluşturulan Tablolar:**
- ✅ `users` (kullanıcı profilleri)
- ✅ `jobs` (iş ilanları)
- ✅ `applications` (başvurular)
- ✅ `donations` (bağışlar)
- ✅ `notifications` (bildirimler)
- ✅ `transactions` (finansal işlemler)
- ✅ `workigom-files` (storage bucket)

#### Ek Özellikler (Opsiyonel) 🎁

1. **Ek Özellikler Migration'ı Çalıştır**
   - [ ] Yeni query aç
   - [ ] `/supabase/migrations/002_additional_features.sql` dosyasını kopyala
   - [ ] SQL Editor'e yapıştır
   - [ ] "Run" tıkla

**Eklenen Özellikler:**
- ✅ `messages` tablosu (mesajlaşma)
- ✅ `job_categories` tablosu (iş kategorileri)
- ✅ `favorites` tablosu (favoriler)
- ✅ `reviews` tablosu (değerlendirmeler)
- ✅ `donation_requests` tablosu (destek talepleri)
- ✅ `user_stats` view (kullanıcı istatistikleri)
- ✅ `job_details` view (iş detayları)

### Tabloları Kontrol Et

**Table Editor'de kontrol:**
- [ ] Database → Tables → `users` görünüyor mu?
- [ ] Database → Tables → `jobs` görünüyor mu?
- [ ] Database → Tables → `applications` görünüyor mu?
- [ ] Database → Tables → `donations` görünüyor mu?
- [ ] Database → Tables → `notifications` görünüyor mu?
- [ ] Database → Tables → `transactions` görünüyor mu?

**Storage kontrolü:**
- [ ] Storage → `workigom-files` bucket var mı?

---

## 🔐 Adım 3: Authentication Ayarları (3 dakika)

### Email Authentication

1. **Email Provider Ayarları**
   - [ ] Authentication → Settings → Email (zaten açık)
   - [ ] "Confirm email" KAPALI olabilir (geliştirme için)
   - [ ] Save

### Google OAuth (Opsiyonel ama Önerilen)

1. **Google Console'da OAuth Oluştur**
   - [ ] `GOOGLE_OAUTH_ENTEGRASYON_REHBERI.md` dosyasını takip et
   - [ ] Client ID ve Client Secret al

2. **Supabase'e Google Provider Ekle**
   - [ ] Authentication → Providers → Google
   - [ ] "Enable Sign in with Google" aç
   - [ ] Client ID ve Client Secret yapıştır
   - [ ] Redirect URL'i kopyala
   - [ ] Save

### URL Configuration

1. **Site URL Ayarla**
   - [ ] Authentication → URL Configuration
   - [ ] Site URL: `http://localhost:5173` (geliştirme için)
   - [ ] Production'da: `https://workigom.com` (kendi domain'iniz)
   - [ ] Redirect URLs: 
     ```
     http://localhost:5173/**
     https://workigom.com/**
     ```
   - [ ] Save

---

## ⚙️ Adım 4: Environment Variables (2 dakika)

### .env.local Dosyası Oluştur

**Proje root klasöründe:**

1. **Dosya Oluştur**
   ```bash
   # Windows
   type nul > .env.local
   
   # Mac/Linux
   touch .env.local
   ```

2. **Değerleri Ekle**
   - [ ] `.env.local` dosyasını aç
   - [ ] Aşağıdaki içeriği yapıştır:

   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   
   # Google OAuth (opsiyonel)
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

3. **Değerleri Doldur**
   - [ ] Supabase Dashboard → Settings → API
   - [ ] **Project URL** kopyala → `VITE_SUPABASE_URL` yerine yapıştır
   - [ ] **anon/public key** kopyala → `VITE_SUPABASE_ANON_KEY` yerine yapıştır
   - [ ] Google Client ID (varsa) yapıştır

4. **Dosyayı Kaydet**
   - [ ] `.env.local` kaydedildi
   - [ ] `.gitignore` dosyasında `.env.local` var mı kontrol et

**⚠️ ÖNEMLİ:** `.env.local` dosyasını ASLA GitHub'a commit etmeyin!

---

## 🧪 Adım 5: Test Kullanıcıları Oluştur (5 dakika)

### SQL Editor'de Test Verileri

**Opsiyonel ama önerilen - test için kullanıcılar oluştur:**

1. **SQL Editor → New Query**

2. **Admin Kullanıcı Oluştur**
   ```sql
   -- Admin kullanıcı oluştur
   INSERT INTO auth.users (
     instance_id,
     id,
     aud,
     role,
     email,
     encrypted_password,
     email_confirmed_at,
     created_at,
     updated_at,
     confirmation_token,
     raw_app_meta_data,
     raw_user_meta_data
   ) VALUES (
     '00000000-0000-0000-0000-000000000000',
     gen_random_uuid(),
     'authenticated',
     'authenticated',
     'admin@workigom.com',
     crypt('admin123', gen_salt('bf')),
     NOW(),
     NOW(),
     NOW(),
     '',
     '{"provider":"email","providers":["email"]}',
     '{}'
   ) RETURNING id;
   
   -- Yukarıdaki sorgu çalıştıktan sonra dönen UUID'yi kopyalayın
   -- Sonra aşağıdaki sorguda USER_ID_HERE yerine yapıştırın
   
   INSERT INTO users (id, email, user_type, full_name) VALUES
   ('USER_ID_HERE', 'admin@workigom.com', 'admin', 'Workigom Admin');
   ```

**NOT:** Bu karmaşık gelebilir. Daha kolay yol: Uygulamayı çalıştırıp kayıt ol sayfasından kayıt olmak!

### Alternatif: Uygulamadan Kayıt Ol

**Daha kolay yöntem:**

1. **Uygulamayı Başlat**
   ```bash
   npm run dev
   ```

2. **Kullanıcı Oluştur**
   - [ ] http://localhost:5173 aç
   - [ ] "Kayıt Ol" tıkla
   - [ ] Bireysel veya Kurumsal seç
   - [ ] Form doldur ve kayıt ol

3. **Email Onayı**
   - [ ] Supabase Dashboard → Authentication → Users
   - [ ] Kullanıcıyı bul
   - [ ] Email'i manuel onayla (development için)

---

## 🔧 Adım 6: RLS Politikalarını Test Et (3 dakika)

### Politikaları Kontrol

1. **Authentication → Policies**
   - [ ] `users` tablosu için policies var
   - [ ] `jobs` tablosu için policies var
   - [ ] `applications` tablosu için policies var
   - [ ] `donations` tablosu için policies var
   - [ ] `notifications` tablosu için policies var
   - [ ] `transactions` tablosu için policies var

2. **Test SQL Sorguları**

   **SQL Editor'de test et:**
   
   ```sql
   -- Tüm tabloları listele
   SELECT table_name, row_security 
   FROM information_schema.tables 
   WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
   
   -- RLS aktif mi kontrol et
   SELECT tablename, rowsecurity 
   FROM pg_tables 
   WHERE schemaname = 'public';
   
   -- Storage bucket var mı
   SELECT * FROM storage.buckets;
   ```

---

## 🚦 Adım 7: Uygulamayı Test Et (5 dakika)

### Local Test

1. **Uygulamayı Başlat**
   ```bash
   npm run dev
   ```
   - [ ] Uygulama açıldı (http://localhost:5173)

2. **Giriş/Kayıt Test**
   - [ ] "Giriş Yap" butonu çalışıyor
   - [ ] Kayıt ol formu açılıyor
   - [ ] Email ile kayıt olunabiliyor
   - [ ] Google ile giriş çalışıyor (ayarladıysanız)

3. **Kullanıcı Tipleri Test**
   - [ ] Bireysel kullanıcı kaydı yapıldı
   - [ ] Kurumsal kullanıcı kaydı yapıldı
   - [ ] Her iki kullanıcı farklı dashboard'a yönlendiriliyor

4. **Temel İşlevsellik**
   - [ ] İş ilanları görüntüleniyor
   - [ ] İş ilanı oluşturulabiliyor (kurumsal kullanıcı)
   - [ ] İş başvurusu yapılabiliyor (bireysel kullanıcı)
   - [ ] Bildirimler çalışıyor
   - [ ] Profil güncelleniyor

5. **Storage Test**
   - [ ] Profil fotoğrafı yüklenebiliyor
   - [ ] QR kod oluşturuluyor (bağış sistemi)

---

## 🐛 Sorun Giderme

### Sık Karşılaşılan Hatalar

#### ❌ "Failed to fetch"
**Çözüm:**
- [ ] `.env.local` dosyasında `VITE_SUPABASE_URL` doğru mu?
- [ ] Supabase projesi çalışıyor mu? (Dashboard'da "Paused" yazıyor mu?)
- [ ] İnternet bağlantısı var mı?

#### ❌ "Invalid API key"
**Çözüm:**
- [ ] `.env.local` dosyasında `VITE_SUPABASE_ANON_KEY` doğru kopyalandı mı?
- [ ] Supabase Dashboard → Settings → API → anon/public key'i tekrar kopyala

#### ❌ "Row Level Security policy violation"
**Çözüm:**
- [ ] RLS policies oluşturuldu mu? (`001_initial_schema.sql` çalıştırıldı mı?)
- [ ] Kullanıcı giriş yapmış mı?
- [ ] SQL Editor'de policies kontrol et:
  ```sql
  SELECT * FROM pg_policies WHERE schemaname = 'public';
  ```

#### ❌ "relation 'users' does not exist"
**Çözüm:**
- [ ] Migration dosyası (`001_initial_schema.sql`) çalıştırıldı mı?
- [ ] SQL Editor'de tabloları kontrol et:
  ```sql
  SELECT * FROM information_schema.tables WHERE table_schema = 'public';
  ```

#### ❌ "Email not confirmed"
**Çözüm:**
- [ ] Authentication → Settings → Email → "Confirm email" KAPALI olsun (development için)
- [ ] VEYA: Authentication → Users → kullanıcıyı bul → "Confirm email" tıkla

---

## 📊 Kurulum Sonrası Kontrol

### Final Checklist

#### Supabase Dashboard
- [ ] 6 tablo oluşturuldu (`users`, `jobs`, `applications`, `donations`, `notifications`, `transactions`)
- [ ] Storage bucket oluşturuldu (`workigom-files`)
- [ ] RLS policies aktif (tüm tablolarda)
- [ ] Authentication provider'lar ayarlandı (Email + Google)

#### Yerel Geliştirme
- [ ] `.env.local` dosyası oluşturuldu ve dolduruldu
- [ ] `.env.local` dosyası `.gitignore`'da
- [ ] Uygulama çalışıyor (`npm run dev`)
- [ ] Kullanıcı girişi yapılabiliyor
- [ ] Test kullanıcıları oluşturuldu

#### İşlevsellik
- [ ] Giriş/Kayıt sistemi çalışıyor
- [ ] İş ilanları CRUD işlemleri çalışıyor
- [ ] Başvuru sistemi çalışıyor
- [ ] Bildirimler çalışıyor
- [ ] Profil güncelleme çalışıyor
- [ ] Storage (dosya yükleme) çalışıyor

---

## 🎉 Tebrikler!

**✅ Workigom artık Supabase ile tamamen entegre!**

### Sonraki Adımlar

1. **Production Deployment**
   - [ ] `WEB_HOSTING_REHBERI.md` dosyasını takip et
   - [ ] Netlify/Vercel/Render'a deploy et
   - [ ] Production domain ekle (Supabase → Authentication → URL Configuration)

2. **Google OAuth Production**
   - [ ] Google Console'da authorized domains ekle
   - [ ] Production URL'i Supabase'e ekle

3. **Database Backup**
   - [ ] Supabase Dashboard → Database → Backups
   - [ ] Otomatik backup aktif mi kontrol et

4. **Monitoring**
   - [ ] Supabase Dashboard → Logs
   - [ ] API kullanımını izle
   - [ ] Hataları takip et

---

## 📚 Faydalı Dökümanlar

**Workigom Rehberleri:**
- `SUPABASE_TABLOLAR.md` - Detaylı tablo açıklamaları
- `SUPABASE_ADIM_ADIM_REHBER.md` - Adım adım Supabase kurulumu
- `GOOGLE_OAUTH_ENTEGRASYON_REHBERI.md` - Google OAuth kurulumu
- `WEB_HOSTING_REHBERI.md` - Production deployment

**Supabase Dökümanları:**
- https://supabase.com/docs - Resmi dokümantasyon
- https://supabase.com/docs/guides/auth - Authentication guide
- https://supabase.com/docs/guides/database - Database guide
- https://supabase.com/docs/guides/storage - Storage guide

---

## 🆘 Yardıma İhtiyacınız Var mı?

### Supabase Dashboard Linkleri

**API Keys:**
```
https://app.supabase.com/project/YOUR_PROJECT_ID/settings/api
```

**SQL Editor:**
```
https://app.supabase.com/project/YOUR_PROJECT_ID/sql
```

**Table Editor:**
```
https://app.supabase.com/project/YOUR_PROJECT_ID/editor
```

**Authentication:**
```
https://app.supabase.com/project/YOUR_PROJECT_ID/auth/users
```

**Storage:**
```
https://app.supabase.com/project/YOUR_PROJECT_ID/storage/buckets
```

### Komut Dosyaları

**Development başlat:**
```bash
npm run dev
```

**Build test:**
```bash
npm run build
```

**Preview build:**
```bash
npm run preview
```

---

## ⏱️ Toplam Süre: ~30 Dakika

- ✅ Proje oluştur: 5 dakika
- ✅ Migration çalıştır: 10 dakika
- ✅ Authentication ayarla: 3 dakika
- ✅ Environment variables: 2 dakika
- ✅ Test kullanıcıları: 5 dakika
- ✅ RLS test: 3 dakika
- ✅ Uygulama test: 5 dakika

**Toplam: ~33 dakika** ⚡

---

**Son Güncelleme:** 5 Kasım 2025  
**Workigom Version:** 1.0.0  
**Checklist Version:** 1.0

**İyi çalışmalar! 🚀**
