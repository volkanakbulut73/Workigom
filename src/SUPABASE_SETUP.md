# 🚀 Workigom - Supabase Kurulum Rehberi

Bu rehber, Workigom uygulaması için Supabase backend'ini nasıl kuracağınızı adım adım açıklamaktadır.

## 📋 İçindekiler

1. [Supabase Projesi Oluşturma](#1-supabase-projesi-oluşturma)
2. [Database Schema Kurulumu](#2-database-schema-kurulumu)
3. [Environment Variables Ayarlama](#3-environment-variables-ayarlama)
4. [Storage Bucket Yapılandırma](#4-storage-bucket-yapılandırma)
5. [Test Kullanıcıları Oluşturma](#5-test-kullanıcıları-oluşturma)
6. [Real-time Subscriptions](#6-real-time-subscriptions)
7. [Deployment (Render.com)](#7-deployment-rendercom)

---

## 1. Supabase Projesi Oluşturma

### 1.1. Hesap Oluşturma

1. [supabase.com](https://supabase.com) adresine gidin
2. **"Start your project"** veya **"Sign In"** butonuna tıklayın
3. GitHub hesabınızla giriş yapın (önerilen)

### 1.2. Yeni Proje Oluşturma

1. Dashboard'da **"New Project"** butonuna tıklayın
2. Proje bilgilerini girin:
   - **Name:** `workigom` veya istediğiniz isim
   - **Database Password:** Güçlü bir şifre oluşturun (kaydedin!)
   - **Region:** En yakın bölgeyi seçin (Europe West için `eu-central-1`)
   - **Pricing Plan:** Free plan yeterli (başlangıç için)
3. **"Create new project"** butonuna tıklayın

⏳ **Bekleme süresi:** 1-2 dakika

---

## 2. Database Schema Kurulumu

### 2.1. SQL Editor'ü Açma

1. Sol menüden **"SQL Editor"** seçeneğine tıklayın
2. **"New query"** butonuna tıklayın

### 2.2. Schema Migration'ı Çalıştırma

1. `/supabase/migrations/001_initial_schema.sql` dosyasını açın
2. Tüm SQL kodunu kopyalayın
3. Supabase SQL Editor'e yapıştırın
4. Sağ alt köşedeki **"Run"** butonuna tıklayın

✅ **Başarılı oldu mu?** "Success. No rows returned" mesajı görmelisiniz.

### 2.3. Tabloları Doğrulama

1. Sol menüden **"Table Editor"** seçeneğine tıklayın
2. Şu tabloların oluşturulduğunu doğrulayın:
   - ✅ users
   - ✅ jobs
   - ✅ applications
   - ✅ donations
   - ✅ notifications
   - ✅ transactions

---

## 3. Environment Variables Ayarlama

### 3.1. API Key'leri Alma

1. Sol menüden **"Settings"** (⚙️) seçeneğine tıklayın
2. **"API"** sekmesine gidin
3. Şu değerleri kopyalayın:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **anon public key:** `eyJhbGc...` (uzun bir string)

### 3.2. .env Dosyası Oluşturma

1. Proje root'unda `.env` dosyası oluşturun
2. `.env.example` dosyasını kopyalayın
3. Değerleri kendi API key'lerinizle değiştirin:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your_actual_key
```

⚠️ **ÖNEMLİ:** `.env` dosyasını asla git'e commit etmeyin!

### 3.3. Vite Dev Server'ı Yeniden Başlatma

```bash
# Dev server'ı durdurun (Ctrl+C)
npm run dev
```

---

## 4. Storage Bucket Yapılandırma

Storage bucket'ı SQL migration otomatik oluşturdu, ancak doğrulamak için:

### 4.1. Storage'ı Kontrol Etme

1. Sol menüden **"Storage"** seçeneğine tıklayın
2. `workigom-files` bucket'ının oluşturulduğunu doğrulayın

### 4.2. Manuel Oluşturma (Gerekirse)

Eğer bucket yoksa:

1. **"New bucket"** butonuna tıklayın
2. **Name:** `workigom-files`
3. **Public bucket:** ❌ KAPALI (güvenlik için)
4. **Create bucket**

### 4.3. Storage Policies

Storage policies zaten SQL migration'da tanımlandı. Kontrol için:

1. Bucket'a tıklayın
2. **"Policies"** sekmesine gidin
3. 4 policy görmelisiniz (INSERT, SELECT, UPDATE, DELETE)

---

## 5. Test Kullanıcıları Oluşturma

### 5.1. SQL ile Test Kullanıcıları Ekleme

SQL Editor'de şu komutu çalıştırın:

```sql
-- Admin kullanıcısı
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin@workigom.com',
  crypt('admin123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"full_name": "Admin User", "user_type": "admin"}'::jsonb
);

INSERT INTO users (id, email, user_type, full_name, phone) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin@workigom.com',
  'admin',
  'Admin User',
  '+90 555 000 0001'
);

-- Bireysel kullanıcı
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  'individual@workigom.com',
  crypt('individual123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"full_name": "Ahmet Yılmaz", "user_type": "individual"}'::jsonb
);

INSERT INTO users (id, email, user_type, full_name, phone) VALUES (
  '00000000-0000-0000-0000-000000000002',
  'individual@workigom.com',
  'individual',
  'Ahmet Yılmaz',
  '+90 555 000 0002'
);

-- Kurumsal kullanıcı
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data
) VALUES (
  '00000000-0000-0000-0000-000000000003',
  'corporate@workigom.com',
  crypt('corporate123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"full_name": "ABC Şirketi", "user_type": "corporate"}'::jsonb
);

INSERT INTO users (id, email, user_type, full_name, phone, company_name, tax_number) VALUES (
  '00000000-0000-0000-0000-000000000003',
  'corporate@workigom.com',
  'corporate',
  'ABC Şirketi',
  '+90 555 000 0003',
  'ABC Teknoloji A.Ş.',
  '1234567890'
);
```

### 5.2. Test Kullanıcıları ile Giriş

Artık bu kullanıcılarla giriş yapabilirsiniz:

| Kullanıcı Tipi | Email | Şifre |
|----------------|-------|-------|
| Admin | `admin@workigom.com` | `admin123` |
| Bireysel | `individual@workigom.com` | `individual123` |
| Kurumsal | `corporate@workigom.com` | `corporate123` |

---

## 6. Real-time Subscriptions

### 6.1. Real-time'ı Aktifleştirme

1. Sol menüden **"Database"** > **"Replication"** seçeneğine gidin
2. Şu tablolar için replication'ı aktif edin:
   - ✅ notifications
   - ✅ applications
   - ✅ jobs

### 6.2. Real-time Politikaları

Real-time subscription'lar RLS (Row Level Security) politikalarına tabidir. Migration'da zaten tanımlı.

---

## 7. Deployment (Render.com)

### 7.1. Environment Variables (Render'da)

Render.com'da projenizi deploy ederken:

1. Render Dashboard > Your Project > **"Environment"** sekmesine gidin
2. Şu değişkenleri ekleyin:

```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...your_actual_key
```

### 7.2. Build Command Güncelleme

Render'da build command'ınız:

```bash
npm install && npm run build
```

**Not:** Environment variables build sırasında kullanılacak.

---

## 🎯 Supabase Dashboard Özellikleri

### Table Editor
- Veritabanı tablolarını görsel olarak yönetin
- Satır ekleyin, düzenleyin, silin
- SQL yazmadan CRUD işlemleri

### SQL Editor
- Özel SQL sorguları çalıştırın
- Migration'ları yönetin
- Database bakımı

### Authentication
- Kullanıcıları görüntüleyin
- Manuel kullanıcı ekleyin
- Auth ayarlarını yapılandırın

### Storage
- Dosyaları yönetin
- QR kodları görüntüleyin
- Storage policies'i düzenleyin

### API Docs
- Otomatik oluşturulan API dokümantasyonu
- Her tablo için CRUD örnekleri
- JavaScript/TypeScript kod örnekleri

---

## 🔍 Debugging ve Monitoring

### Logs

1. Sol menüden **"Logs"** seçeneğine gidin
2. **"Logs Explorer"** ile tüm aktiviteleri görüntüleyin

### Database Metrics

1. **"Database"** > **"Usage"** sekmesine gidin
2. Şunları izleyin:
   - Database size
   - Connection count
   - Query performance

---

## 🐛 Sorun Giderme

### Hata: "Invalid API key"

**Çözüm:**
1. `.env` dosyasındaki key'leri kontrol edin
2. Supabase dashboard'dan key'leri yeniden kopyalayın
3. Dev server'ı yeniden başlatın

### Hata: "Row Level Security policy violation"

**Çözüm:**
1. SQL Editor'de RLS policies'i kontrol edin
2. `001_initial_schema.sql`'i tekrar çalıştırın
3. Kullanıcının doğru role sahip olduğundan emin olun

### Hata: "relation does not exist"

**Çözüm:**
1. Table Editor'de tabloların varlığını kontrol edin
2. Migration'ı tekrar çalıştırın
3. Tablo isimlerinin doğru olduğundan emin olun

### Storage Upload Hatası

**Çözüm:**
1. Bucket'ın oluşturulduğunu doğrulayın
2. Storage policies'i kontrol edin
3. Dosya boyutunu kontrol edin (Free plan: 1GB limit)

---

## 📊 Database Schema Diyagramı

```
┌─────────────┐
│   users     │
├─────────────┤
│ id          │──┐
│ email       │  │
│ user_type   │  │
│ full_name   │  │
│ ...         │  │
└─────────────┘  │
                 │
     ┌───────────┼──────────────┐
     │           │              │
     ▼           ▼              ▼
┌─────────┐ ┌──────────────┐ ┌─────────────┐
│  jobs   │ │ applications │ │  donations  │
├─────────┤ ├──────────────┤ ├─────────────┤
│ id      │ │ id           │ │ id          │
│ corp_id │─┤ job_id       │ │ donor_id    │─┐
│ title   │ │ indiv_id     │─┤ recipient_id│ │
│ ...     │ │ corp_id      │─┤ amount      │ │
└─────────┘ │ status       │ │ ...         │ │
            │ ...          │ └─────────────┘ │
            └──────────────┘                 │
                                             │
     ┌───────────────────────────────────────┘
     │
     ▼
┌──────────────┐     ┌──────────────┐
│notifications │     │ transactions │
├──────────────┤     ├──────────────┤
│ id           │     │ id           │
│ user_id      │─┐   │ user_id      │─┐
│ title        │ │   │ amount       │ │
│ ...          │ │   │ type         │ │
└──────────────┘ │   │ ...          │ │
                 │   └──────────────┘ │
                 │                    │
                 └────────────────────┘
```

---

## 📚 Ek Kaynaklar

- 📖 [Supabase Documentation](https://supabase.com/docs)
- 📖 [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- 📖 [Row Level Security (RLS)](https://supabase.com/docs/guides/auth/row-level-security)
- 📖 [Supabase Storage](https://supabase.com/docs/guides/storage)
- 📖 [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)

---

## 🎉 Tebrikler!

Supabase backend'iniz artık hazır! 🚀

**Sonraki Adımlar:**
1. ✅ Uygulamayı test edin (`npm run dev`)
2. ✅ Test kullanıcıları ile giriş yapın
3. ✅ İş ilanı oluşturun
4. ✅ Başvuru yapın
5. ✅ Dayanışma Menüsü'nü test edin
6. ✅ Render.com'a deploy edin

---

**Son Güncelleme:** 2 Kasım 2025
**Workigom Version:** 1.0.0 (with Supabase)
