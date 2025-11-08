# 📊 Workigom Supabase Tablo Özeti

## 🎯 Hızlı Bakış

Workigom uygulaması için **6 ana tablo + 1 storage bucket** gereklidir.

---

## 📋 Tablo Listesi

### ✅ Zorunlu Tablolar (Migration 001)

| # | Tablo | Satır Sayısı | Açıklama | Bağlantılar |
|---|-------|--------------|----------|-------------|
| 1 | **users** | ~1,000-10,000 | Kullanıcı profilleri (bireysel/kurumsal/admin) | → jobs, applications, donations, notifications, transactions |
| 2 | **jobs** | ~5,000-50,000 | İş ilanları ve acil iş talepleri | ← users, → applications |
| 3 | **applications** | ~20,000-200,000 | İş başvuruları ve personel atamaları | ← users, jobs |
| 4 | **menu_shares** | ~1,000-10,000 | Menü Market paylaşım sistemi | ← users |
| 5 | **notifications** | ~50,000-500,000 | Sistem ve kullanıcı bildirimleri | ← users |
| 6 | **transactions** | ~10,000-100,000 | Finansal işlemler (cari hesap) | ← users |

### 🎁 Opsiyonel Tablolar (Migration 002)

| # | Tablo | Satır Sayısı | Açıklama | Bağlantılar |
|---|-------|--------------|----------|-------------|
| 7 | **messages** | ~5,000-50,000 | Kullanıcılar arası mesajlaşma | ← users |
| 8 | **job_categories** | ~10-50 | İş kategorileri (temizlik, güvenlik vb.) | → jobs |
| 9 | **favorites** | ~1,000-10,000 | Favori iş ilanları | ← users, jobs |
| 10 | **reviews** | ~5,000-50,000 | Kullanıcı değerlendirmeleri | ← users, applications |
| 11 | **donation_requests** | ~1,000-10,000 | Yemek desteği talepleri | ← users, donations |

### 📦 Storage

| Bucket | Boyut | Açıklama | İçerik |
|--------|-------|----------|--------|
| **workigom-files** | ~1-10 GB | Kullanıcı dosyaları | Profil fotoğrafları, QR kodlar, belgeler |

---

## 🗂️ Tablo Detayları

### 1. `users` - Kullanıcı Profilleri

**Amaç:** Tüm kullanıcı bilgilerini saklar (bireysel, kurumsal, admin)

**Ana Sütunlar:**
- `id` (UUID) - Supabase Auth'tan gelen kullanıcı ID
- `email` (TEXT) - E-posta adresi
- `user_type` (TEXT) - `individual`, `corporate`, `admin`
- `full_name` (TEXT) - Ad Soyad veya şirket yetkilisi
- `company_name` (TEXT) - Şirket adı (kurumsal için)
- `phone` (TEXT) - Telefon
- `iban` (TEXT) - Banka hesabı (ödeme için)
- `balance` (DECIMAL) - Hesap bakiyesi
- `golden_heart_count` (INTEGER) - Altın Kalp badge sayısı

**İlişkiler:**
- → `jobs` (1:N - Bir şirket birden fazla iş ilanı verir)
- → `applications` (1:N - Bir kişi birden fazla başvuru yapar)
- → `donations` (1:N - Bir kişi birden fazla bağış yapar)
- → `notifications` (1:N - Bir kullanıcı birden fazla bildirim alır)
- → `transactions` (1:N - Bir kullanıcı birden fazla işlem yapar)

**RLS Politikaları:**
- ✅ Kullanıcılar sadece kendi profillerini görebilir/düzenleyebilir
- ✅ Admin tüm kullanıcıları görebilir

---

### 2. `jobs` - İş İlanları

**Amaç:** Normal ve acil iş ilanlarını saklar

**Ana Sütunlar:**
- `id` (UUID) - İş ilanı ID
- `corporate_id` (UUID) - İlanı veren şirket (FK → users)
- `title` (TEXT) - İş başlığı
- `description` (TEXT) - İş açıklaması
- `location` (TEXT) - İş yeri
- `date` (DATE) - İş tarihi
- `time` (TEXT) - Çalışma saatleri
- `hourly_rate` (DECIMAL) - Saatlik ücret
- `positions` (INTEGER) - Pozisyon sayısı
- `filled_positions` (INTEGER) - Doldurulan pozisyonlar
- `status` (TEXT) - `open`, `in_progress`, `completed`, `cancelled`

**İlişkiler:**
- ← `users` (N:1 - corporate_id)
- → `applications` (1:N)

**RLS Politikaları:**
- ✅ Herkes açık ilanları görebilir
- ✅ Kurumsal kullanıcılar ilan oluşturabilir
- ✅ Şirketler kendi ilanlarını güncelleyebilir

---

### 3. `applications` - İş Başvuruları

**Amaç:** İş başvurularını ve personel atamalarını saklar

**Ana Sütunlar:**
- `id` (UUID) - Başvuru ID
- `job_id` (UUID) - İş ilanı (FK → jobs)
- `individual_id` (UUID) - Başvuran (FK → users)
- `corporate_id` (UUID) - Şirket (FK → users)
- `status` (TEXT) - `pending`, `accepted`, `rejected`, `completed`
- `applied_at` (TIMESTAMP) - Başvuru tarihi
- `accepted_at` (TIMESTAMP) - Kabul tarihi
- `completed_at` (TIMESTAMP) - Tamamlanma tarihi
- `rating` (INTEGER) - Değerlendirme (1-5)
- `review` (TEXT) - Yorum

**İlişkiler:**
- ← `users` (N:1 - individual_id, corporate_id)
- ← `jobs` (N:1 - job_id)

**RLS Politikaları:**
- ✅ Bireysel kullanıcılar kendi başvurularını görebilir
- ✅ Şirketler kendi ilanlarının başvurularını görebilir/güncelleyebilir
- ✅ Bireysel kullanıcılar başvuru yapabilir

---

### 4. `menu_shares` - Menü Market

**Amaç:** Menü paylaşımlarını saklar (kısmi %20 ve tam %100)

**Ana Sütunlar:**
- `id` (UUID) - Bağış ID
- `donor_id` (UUID) - Bağış yapan (FK → users)
- `recipient_id` (UUID) - Bağış alan (FK → users)
- `amount` (DECIMAL) - Bağış miktarı (TL)
- `donation_type` (TEXT) - `partial` (%20), `full` (%100)
- `qr_code_url` (TEXT) - QR kod dosya URL'i
- `status` (TEXT) - `pending`, `confirmed`, `expired`
- `expires_at` (TIMESTAMP) - QR kod geçerlilik süresi (5 dakika)
- `confirmed_at` (TIMESTAMP) - Onaylanma tarihi

**İlişkiler:**
- ← `users` (N:1 - donor_id, recipient_id)

**RLS Politikaları:**
- ✅ Kullanıcılar kendi bağışlarını görebilir (donor veya recipient olarak)
- ✅ Kullanıcılar bağış oluşturabilir
- ✅ Alıcılar bağışı onaylayabilir

**Özel Notlar:**
- QR kod 300 saniye (5 dakika) geçerli
- Altın Kalp badge: 10 tam bağış (%100) = 1 Altın Kalp

---

### 5. `notifications` - Bildirimler

**Amaç:** Sistem ve kullanıcı bildirimlerini saklar

**Ana Sütunlar:**
- `id` (UUID) - Bildirim ID
- `user_id` (UUID) - Bildirimi alacak kullanıcı (FK → users)
- `title` (TEXT) - Başlık
- `message` (TEXT) - Mesaj
- `type` (TEXT) - `info`, `success`, `warning`, `error`
- `is_read` (BOOLEAN) - Okundu mu?
- `created_at` (TIMESTAMP) - Bildirim tarihi

**İlişkiler:**
- ← `users` (N:1 - user_id)

**RLS Politikaları:**
- ✅ Kullanıcılar kendi bildirimlerini görebilir
- ✅ Kullanıcılar kendi bildirimlerini güncelleyebilir (okundu işareti)
- ✅ Admin bildirim oluşturabilir

**Kullanım Alanları:**
- Admin'den toplu bildirim
- Başvuru kabul/ret
- İş atama
- Bağış bildirimleri
- Sistem duyuruları

---

### 6. `transactions` - Finansal İşlemler

**Amaç:** Cari hesap hareketlerini saklar

**Ana Sütunlar:**
- `id` (UUID) - İşlem ID
- `user_id` (UUID) - İşlem yapan (FK → users)
- `amount` (DECIMAL) - Miktar (TL)
- `type` (TEXT) - `credit` (alacak), `debit` (borç)
- `category` (TEXT) - `job_payment`, `donation`, `withdrawal`, `admin_adjustment`
- `description` (TEXT) - İşlem açıklaması
- `reference_id` (UUID) - İlişkili kayıt (job_id, donation_id vb.)
- `created_at` (TIMESTAMP) - İşlem tarihi

**İlişkiler:**
- ← `users` (N:1 - user_id)

**RLS Politikaları:**
- ✅ Kullanıcılar kendi işlemlerini görebilir
- ✅ Admin tüm işlemleri görebilir
- ✅ Sistem işlem oluşturabilir

**İşlem Tipleri:**
- `credit` (Alacak): İş ödemesi, admin bonus
- `debit` (Borç): Bağış yapma, para çekme

**Kategoriler:**
- `job_payment`: İş tamamlama ödemesi
- `menu_share`: Menü Market paylaşımı
- `withdrawal`: Para çekme
- `admin_adjustment`: Admin düzeltmesi

---

## 🔗 Tablo İlişki Diyagramı (ERD)

```
                    ┌─────────────┐
                    │    USERS    │ (Ana Tablo)
                    ├─────────────┤
                    │  id (PK)    │
                    │  email      │
                    │  user_type  │
                    │  full_name  │
                    │  balance    │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           │               │               │
           ▼               ▼               ▼
    ┌───────────┐   ┌─────────────┐  ┌──────────────┐
    │   JOBS    │   │ DONATIONS   │  │NOTIFICATIONS │
    ├───────────┤   ├─────────────┤  ├──────────────┤
    │ id (PK)   │   │ id (PK)     │  │ id (PK)      │
    │corporate_id│   │ donor_id    │  │ user_id      │
    │ title     │   │recipient_id │  │ title        │
    │ status    │   │ amount      │  │ message      │
    └─────┬─────┘   │donation_type│  │ is_read      │
          │         │ qr_code_url │  └──────────────┘
          │         └─────────────┘
          │
          ▼
    ┌──────────────┐        ┌──────────────┐
    │ APPLICATIONS │        │ TRANSACTIONS │
    ├──────────────┤        ├──────────────┤
    │ id (PK)      │        │ id (PK)      │
    │ job_id       │        │ user_id      │
    │individual_id │        │ amount       │
    │corporate_id  │        │ type         │
    │ status       │        │ category     │
    │ rating       │        │ description  │
    └──────────────┘        └──────────────┘
```

---

## 📦 Storage Bucket Yapısı

### `workigom-files` Bucket

```
workigom-files/
│
├── {user_id_1}/
│   ├── profile-photos/
│   │   └── avatar.jpg
│   │
│   ├── qr-codes/
│   │   ├── donation-{uuid-1}.png
│   │   └── donation-{uuid-2}.png
│   │
│   └── documents/
│       └── id-card.pdf
│
├── {user_id_2}/
│   ├── profile-photos/
│   │   └── company-logo.png
│   │
│   └── qr-codes/
│       └── donation-{uuid-3}.png
│
└── ...
```

**Boyut Limitleri:**
- Profil fotoğrafı: Max 5 MB
- QR kod: ~50 KB
- Belgeler: Max 10 MB

**Toplam Storage:** ~1-10 GB (tahmini)

---

## 🔐 RLS (Row Level Security) Özeti

### Güvenlik Politikaları

| Tablo | SELECT (Okuma) | INSERT (Ekleme) | UPDATE (Güncelleme) | DELETE (Silme) |
|-------|----------------|-----------------|---------------------|----------------|
| **users** | ✅ Kendi profili<br>✅ Admin | ❌ | ✅ Kendi profili | ❌ |
| **jobs** | ✅ Açık ilanlar<br>✅ Kendi ilanları (kurumsal) | ✅ Kurumsal kullanıcılar | ✅ Kendi ilanları | ❌ |
| **applications** | ✅ Kendi başvuruları (bireysel)<br>✅ İlanın başvuruları (kurumsal) | ✅ Bireysel kullanıcılar | ✅ İlan sahibi (kurumsal) | ❌ |
| **donations** | ✅ Kendi bağışları | ✅ Bağış yapan | ✅ Alıcı | ❌ |
| **notifications** | ✅ Kendi bildirimleri | ✅ Admin | ✅ Kendi bildirimleri | ❌ |
| **transactions** | ✅ Kendi işlemleri<br>✅ Admin | ✅ Sistem | ❌ | ❌ |

**Güvenlik Özellikleri:**
- ✅ Row Level Security (RLS) tüm tablolarda aktif
- ✅ Kullanıcılar sadece kendi verilerine erişebilir
- ✅ Admin özel yetkilerle tüm verileri görebilir
- ✅ Kurumsal kullanıcılar kendi ilanlarını yönetebilir
- ✅ Bireysel kullanıcılar sadece başvuru yapabilir

---

## 📊 Veri Akış Örnekleri

### 1. İş İlanı ve Başvuru Akışı

```
1. Şirket iş ilanı oluşturur (jobs tablosu)
   ↓
2. Bireysel kullanıcı başvuru yapar (applications tablosu)
   ↓
3. Sistem bildirim gönderir (notifications tablosu)
   ↓
4. Şirket başvuruyu kabul eder (applications.status = 'accepted')
   ↓
5. İş tamamlanır (applications.status = 'completed')
   ↓
6. Ödeme işlenir (transactions tablosu - credit)
   ↓
7. Kullanıcı bakiyesi güncellenir (users.balance)
```

### 2. Dayanışma Menüsü Akışı

```
1. Bağışçı destek oluşturur (donations tablosu)
   ↓
2. QR kod üretilir ve storage'a yüklenir
   ↓
3. QR kod URL donations.qr_code_url'e kaydedilir
   ↓
4. Alıcı QR kodu tarar ve onaylar
   ↓
5. Bağış durumu güncellenir (donations.status = 'confirmed')
   ↓
6. İşlemler kaydedilir:
   - Bağışçı: transactions (debit, donation)
   - Alıcı: transactions (credit, donation)
   ↓
7. Altın Kalp kontrolü (10 tam bağış = 1 badge)
   ↓
8. Bakiyeler güncellenir
```

### 3. Admin Bildirim Gönderme

```
1. Admin bildirim oluşturur
   ↓
2. Hedef kullanıcılar seçilir (bireysel/kurumsal/hepsi)
   ↓
3. Her kullanıcı için notification kaydı oluşturulur
   ↓
4. Kullanıcılar bildirimi görür (is_read = false)
   ↓
5. Kullanıcı bildirimi okur (is_read = true)
```

---

## ⚙️ İndeksler ve Performans

### Kritik İndeksler

**Hızlı sorgular için oluşturulan indeksler:**

```sql
-- Jobs tablosu
idx_jobs_corporate_id       -- Şirketin ilanları
idx_jobs_status             -- Açık ilanlar
idx_jobs_date               -- Tarihe göre sıralama

-- Applications tablosu
idx_applications_job_id     -- İlanın başvuruları
idx_applications_individual_id  -- Kullanıcının başvuruları
idx_applications_corporate_id   -- Şirketin aldığı başvurular
idx_applications_status     -- Durum filtreleme

-- Donations tablosu
idx_donations_donor_id      -- Bağışçının bağışları
idx_donations_recipient_id  -- Alıcının bağışları
idx_donations_status        -- Aktif bağışlar

-- Notifications tablosu
idx_notifications_user_id   -- Kullanıcının bildirimleri
idx_notifications_is_read   -- Okunmamış bildirimler

-- Transactions tablosu
idx_transactions_user_id    -- Kullanıcının işlemleri
idx_transactions_created_at -- Tarih sıralama
```

**Performans İpuçları:**
- ✅ WHERE clause'larda kullanılan sütunlara indeks ekle
- ✅ Foreign key'lere otomatik indeks ekleniyor
- ✅ Composite indeksler (çoklu sütun) için `002_additional_features.sql`
- ✅ ANALYZE komutları düzenli çalıştırılıyor

---

## 🚀 Kurulum Talimatları

### Hızlı Kurulum (3 Adım)

#### 1. Supabase Projesi Oluştur
```
https://supabase.com → New Project
Name: workigom
Password: [güçlü şifre]
Region: Europe West
```

#### 2. Migration Dosyalarını Çalıştır
```sql
-- SQL Editor → New Query

-- Temel şema (Zorunlu)
-- /supabase/migrations/001_initial_schema.sql içeriğini yapıştır
-- Run

-- Ek özellikler (Opsiyonel)
-- /supabase/migrations/002_additional_features.sql içeriğini yapıştır
-- Run
```

#### 3. Environment Variables Ayarla
```env
# .env.local
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Detaylı Kurulum

📚 **Adım adım rehber için:**
- `SUPABASE_KURULUM_CHECKLIST.md` - Komple checklist (30 dk)
- `SUPABASE_ADIM_ADIM_REHBER.md` - Detaylı açıklamalar
- `SUPABASE_TABLOLAR.md` - Tablo detayları

---

## ✅ Kurulum Doğrulama

### SQL Sorguları ile Kontrol

```sql
-- Tüm tabloları listele
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Beklenen sonuç:
-- applications
-- donations
-- jobs
-- notifications
-- transactions
-- users

-- RLS aktif mi?
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Beklenen sonuç: Tüm tablolarda rowsecurity = true

-- Storage bucket var mı?
SELECT * FROM storage.buckets;

-- Beklenen sonuç: workigom-files bucket
```

---

## 📈 Tablo Büyüme Tahminleri

### Günlük Büyüme (1000 aktif kullanıcı için)

| Tablo | Günlük Yeni Kayıt | Aylık Yeni Kayıt | Yıllık Toplam |
|-------|-------------------|------------------|---------------|
| `users` | ~50 | ~1,500 | ~18,000 |
| `jobs` | ~100 | ~3,000 | ~36,000 |
| `applications` | ~500 | ~15,000 | ~180,000 |
| `donations` | ~20 | ~600 | ~7,200 |
| `notifications` | ~1,000 | ~30,000 | ~360,000 |
| `transactions` | ~200 | ~6,000 | ~72,000 |

### Storage Büyüme

| Dosya Tipi | Ortalama Boyut | Günlük | Aylık | Yıllık |
|------------|----------------|--------|-------|--------|
| Profil fotoğrafı | 500 KB | 25 MB | 750 MB | 9 GB |
| QR kod | 50 KB | 1 MB | 30 MB | 360 MB |
| **Toplam** | - | ~26 MB | ~780 MB | ~9.4 GB |

---

## 🔧 Bakım ve Optimizasyon

### Düzenli Yapılması Gerekenler

#### Günlük
- [ ] Hata loglarını kontrol et (Supabase Dashboard → Logs)
- [ ] API kullanım limitlerini kontrol et

#### Haftalık
- [ ] Database boyutunu kontrol et
- [ ] Storage boyutunu kontrol et
- [ ] Yavaş sorguları tespit et

#### Aylık
- [ ] Eski QR kodları temizle (expired donations)
- [ ] Okunmuş bildirimleri arşivle (>30 gün)
- [ ] Database VACUUM işlemi

**Temizlik SQL'leri:**

```sql
-- Süresi geçmiş bağışları sil (30 gün öncesi)
DELETE FROM donations 
WHERE status = 'expired' 
AND expires_at < NOW() - INTERVAL '30 days';

-- Eski okunmuş bildirimleri sil (90 gün öncesi)
DELETE FROM notifications 
WHERE is_read = true 
AND created_at < NOW() - INTERVAL '90 days';

-- Database optimize
VACUUM ANALYZE;
```

---

## 📞 Yardım ve Destek

### Faydalı Linkler

**Supabase Dashboard:**
- Tables: `https://app.supabase.com/project/YOUR_ID/editor`
- SQL Editor: `https://app.supabase.com/project/YOUR_ID/sql`
- Auth: `https://app.supabase.com/project/YOUR_ID/auth/users`
- Storage: `https://app.supabase.com/project/YOUR_ID/storage/buckets`
- Logs: `https://app.supabase.com/project/YOUR_ID/logs/explorer`

**Dokümantasyon:**
- Supabase Docs: https://supabase.com/docs
- PostgreSQL Docs: https://www.postgresql.org/docs/
- RLS Guide: https://supabase.com/docs/guides/auth/row-level-security

**Workigom Rehberleri:**
- `SUPABASE_TABLOLAR.md` - Detaylı tablo dokümantasyonu
- `SUPABASE_KURULUM_CHECKLIST.md` - Kurulum checklist
- `SUPABASE_ADIM_ADIM_REHBER.md` - Adım adım rehber
- `SORUN_GIDERME.md` - Yaygın sorunlar ve çözümleri

---

## 🎉 Özet

✅ **6 ana tablo** (users, jobs, applications, donations, notifications, transactions)  
✅ **5 opsiyonel tablo** (messages, job_categories, favorites, reviews, donation_requests)  
✅ **1 storage bucket** (workigom-files)  
✅ **RLS politikaları** tüm tablolarda aktif  
✅ **İndeksler** performans için optimize edilmiş  
✅ **Foreign keys** veri bütünlüğü için  
✅ **Triggers** otomatik güncellemeler için  

**Toplam:** 11 tablo + 1 storage bucket = Tam özellikli Workigom backend! 🚀

---

**Son Güncelleme:** 5 Kasım 2025  
**Workigom Version:** 1.0.0  
**Database Schema Version:** 1.0 (Temel) + 2.0 (Ek Özellikler)
