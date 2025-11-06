# 🗄️ Workigom Supabase Veritabanı Tabloları

## 📋 İçindekiler
- [Tablo Listesi](#tablo-listesi)
- [Detaylı Tablo Yapıları](#detaylı-tablo-yapıları)
- [İlişkiler (Relationships)](#i̇lişkiler-relationships)
- [RLS Politikaları](#rls-politikaları)
- [Kurulum Adımları](#kurulum-adımları)

---

## 📊 Tablo Listesi

Workigom uygulaması için **6 ana tablo** + **1 storage bucket** gereklidir:

### ✅ Mevcut Tablolar (Migration dosyasında)

1. **`users`** - Kullanıcı profilleri (bireysel/kurumsal/admin)
2. **`jobs`** - İş ilanları ve acil iş talepleri
3. **`applications`** - İş başvuruları ve atamalar
4. **`donations`** - Dayanışma Menüsü bağışları
5. **`notifications`** - Bildirimler
6. **`transactions`** - Finansal işlemler (cari hesap)

### 📦 Storage
- **`workigom-files`** - QR kodlar, profil fotoğrafları, belgeler

---

## 🔍 Detaylı Tablo Yapıları

### 1️⃣ `users` Tablosu

**Açıklama:** Tüm kullanıcı profilleri (bireysel çalışanlar, kurumsal şirketler, adminler)

**Sütunlar:**

| Sütun Adı | Tip | Açıklama | Zorunlu | Varsayılan |
|-----------|-----|----------|---------|------------|
| `id` | UUID | Kullanıcı ID (Supabase Auth'tan) | ✅ | - |
| `email` | TEXT | E-posta adresi | ✅ | - |
| `user_type` | TEXT | Kullanıcı tipi: `individual`, `corporate`, `admin` | ✅ | - |
| `full_name` | TEXT | Tam ad veya şirket adı | ✅ | - |
| `phone` | TEXT | Telefon numarası | ❌ | NULL |
| `company_name` | TEXT | Şirket adı (sadece corporate için) | ❌ | NULL |
| `tax_number` | TEXT | Vergi numarası (corporate için) | ❌ | NULL |
| `address` | TEXT | Adres | ❌ | NULL |
| `iban` | TEXT | Banka IBAN (ödeme için) | ❌ | NULL |
| `golden_heart_count` | INTEGER | Altın Kalp badge sayısı | ❌ | 0 |
| `balance` | DECIMAL(10,2) | Hesap bakiyesi (TL) | ❌ | 0.00 |
| `profile_photo_url` | TEXT | Profil fotoğrafı URL | ❌ | NULL |
| `created_at` | TIMESTAMP | Kayıt tarihi | ✅ | NOW() |
| `updated_at` | TIMESTAMP | Güncellenme tarihi | ✅ | NOW() |

**Örnek Veri:**

```sql
-- Bireysel Kullanıcı
INSERT INTO users (id, email, user_type, full_name, phone, iban) VALUES
('uuid-1', 'ahmet.yilmaz@email.com', 'individual', 'Ahmet Yılmaz', '+90 532 123 4567', 'TR123456789012345678901234');

-- Kurumsal Kullanıcı
INSERT INTO users (id, email, user_type, full_name, company_name, tax_number, phone) VALUES
('uuid-2', 'info@elitetemizlik.com', 'corporate', 'Elite Temizlik Yetkilisi', 'Elite Temizlik A.Ş.', '1234567890', '+90 212 555 0001');

-- Admin Kullanıcı
INSERT INTO users (id, email, user_type, full_name) VALUES
('uuid-3', 'admin@workigom.com', 'admin', 'Workigom Admin');
```

**Constraints:**
- `user_type` sadece `individual`, `corporate`, `admin` değerlerini alabilir
- `email` unique olmalı
- `id` Supabase Auth `auth.users` tablosuna referans verir

---

### 2️⃣ `jobs` Tablosu

**Açıklama:** Tüm iş ilanları (normal ve acil iş talepleri)

**Sütunlar:**

| Sütun Adı | Tip | Açıklama | Zorunlu | Varsayılan |
|-----------|-----|----------|---------|------------|
| `id` | UUID | İş ilanı ID | ✅ | auto-generated |
| `corporate_id` | UUID | İlanı veren şirket (users tablosuna referans) | ✅ | - |
| `title` | TEXT | İş başlığı | ✅ | - |
| `description` | TEXT | İş açıklaması | ✅ | - |
| `location` | TEXT | İş yeri lokasyonu | ✅ | - |
| `date` | DATE | İş tarihi | ✅ | - |
| `time` | TEXT | İş saati (örn: "09:00-17:00") | ✅ | - |
| `hourly_rate` | DECIMAL(10,2) | Saatlik ücret (TL) | ✅ | - |
| `positions` | INTEGER | Toplam pozisyon sayısı | ✅ | - |
| `filled_positions` | INTEGER | Doldurulan pozisyon sayısı | ❌ | 0 |
| `status` | TEXT | İlan durumu: `open`, `in_progress`, `completed`, `cancelled` | ❌ | 'open' |
| `created_at` | TIMESTAMP | İlan oluşturulma tarihi | ✅ | NOW() |
| `updated_at` | TIMESTAMP | Güncellenme tarihi | ✅ | NOW() |

**Örnek Veri:**

```sql
INSERT INTO jobs (
  corporate_id, 
  title, 
  description, 
  location, 
  date, 
  time, 
  hourly_rate, 
  positions
) VALUES (
  'uuid-kurumsal-kullanici',
  'Etkinlik Görevlisi',
  'Şehir merkezinde düzenlenecek fuarda görevlendirilecek personel aranmaktadır.',
  'İstanbul, Taksim',
  '2025-11-10',
  '09:00-18:00',
  85.00,
  5
);
```

**İndeksler:**
- `corporate_id` (hızlı şirket sorguları için)
- `status` (açık ilanları filtreleme için)
- `date` (tarihe göre sıralama için)

---

### 3️⃣ `applications` Tablosu

**Açıklama:** İş başvuruları ve personel atamaları

**Sütunlar:**

| Sütun Adı | Tip | Açıklama | Zorunlu | Varsayılan |
|-----------|-----|----------|---------|------------|
| `id` | UUID | Başvuru ID | ✅ | auto-generated |
| `job_id` | UUID | İş ilanı (jobs tablosuna referans) | ✅ | - |
| `individual_id` | UUID | Başvuran kişi (users tablosuna referans) | ✅ | - |
| `corporate_id` | UUID | İlanı veren şirket (users tablosuna referans) | ✅ | - |
| `status` | TEXT | Başvuru durumu: `pending`, `accepted`, `rejected`, `completed` | ❌ | 'pending' |
| `applied_at` | TIMESTAMP | Başvuru tarihi | ✅ | NOW() |
| `accepted_at` | TIMESTAMP | Kabul edilme tarihi | ❌ | NULL |
| `completed_at` | TIMESTAMP | İş tamamlanma tarihi | ❌ | NULL |
| `rating` | INTEGER | Değerlendirme puanı (1-5) | ❌ | NULL |
| `review` | TEXT | Yorum/değerlendirme | ❌ | NULL |

**Örnek Veri:**

```sql
INSERT INTO applications (
  job_id, 
  individual_id, 
  corporate_id, 
  status
) VALUES (
  'uuid-is-ilani',
  'uuid-bireysel-kullanici',
  'uuid-kurumsal-kullanici',
  'pending'
);
```

**İndeksler:**
- `job_id` (bir ilanın tüm başvurularını getirmek için)
- `individual_id` (bir kişinin başvurularını getirmek için)
- `corporate_id` (şirketin aldığı başvuruları görmek için)
- `status` (durum filtreleme için)

---

### 4️⃣ `donations` Tablosu

**Açıklama:** Dayanışma Menüsü yemek bağışları

**Sütunlar:**

| Sütun Adı | Tip | Açıklama | Zorunlu | Varsayılan |
|-----------|-----|----------|---------|------------|
| `id` | UUID | Bağış ID | ✅ | auto-generated |
| `donor_id` | UUID | Bağış yapan (users tablosuna referans) | ✅ | - |
| `recipient_id` | UUID | Bağış alan (users tablosuna referans) | ❌ | NULL |
| `amount` | DECIMAL(10,2) | Bağış miktarı (TL) | ✅ | - |
| `donation_type` | TEXT | Bağış tipi: `partial` (20% kısmi), `full` (100% tam) | ✅ | - |
| `qr_code_url` | TEXT | QR kod görsel URL'si (storage'da) | ❌ | NULL |
| `status` | TEXT | Durum: `pending`, `confirmed`, `expired` | ❌ | 'pending' |
| `expires_at` | TIMESTAMP | QR kod geçerlilik süresi (300 saniye = 5 dakika) | ✅ | - |
| `confirmed_at` | TIMESTAMP | Bağış onaylanma tarihi | ❌ | NULL |
| `created_at` | TIMESTAMP | Bağış oluşturulma tarihi | ✅ | NOW() |

**Örnek Veri:**

```sql
-- Kısmi destek (%20)
INSERT INTO donations (
  donor_id, 
  amount, 
  donation_type, 
  expires_at
) VALUES (
  'uuid-bagisci',
  15.00,
  'partial',
  NOW() + INTERVAL '5 minutes'
);

-- Tam destek (Buda Benden - 100%)
INSERT INTO donations (
  donor_id, 
  amount, 
  donation_type, 
  expires_at
) VALUES (
  'uuid-bagisci',
  75.00,
  'full',
  NOW() + INTERVAL '5 minutes'
);
```

**İndeksler:**
- `donor_id` (bağış yapanın bağışları)
- `recipient_id` (bağış alanın bağışları)
- `status` (durum filtreleme)

**Özel Notlar:**
- `expires_at`: QR kod 5 dakika (300 saniye) geçerli
- `qr_code_url`: Storage bucket'ta saklanır (örn: `/qr-codes/uuid.png`)
- `donation_type`:
  - `partial`: %20 destek
  - `full`: %100 "Buda Benden" destek

---

### 5️⃣ `notifications` Tablosu

**Açıklama:** Kullanıcı bildirimleri (admin, sistem, uygulama bildirimleri)

**Sütunlar:**

| Sütun Adı | Tip | Açıklama | Zorunlu | Varsayılan |
|-----------|-----|----------|---------|------------|
| `id` | UUID | Bildirim ID | ✅ | auto-generated |
| `user_id` | UUID | Bildirimi alacak kullanıcı | ✅ | - |
| `title` | TEXT | Bildirim başlığı | ✅ | - |
| `message` | TEXT | Bildirim mesajı | ✅ | - |
| `type` | TEXT | Bildirim tipi: `info`, `success`, `warning`, `error` | ❌ | 'info' |
| `is_read` | BOOLEAN | Okundu mu? | ❌ | FALSE |
| `created_at` | TIMESTAMP | Bildirim tarihi | ✅ | NOW() |

**Örnek Veri:**

```sql
-- Admin bildirimi (tüm kullanıcılara)
INSERT INTO notifications (user_id, title, message, type) 
SELECT id, 'Yeni Özellik!', 'Dayanışma Menüsü artık aktif!', 'success' 
FROM users 
WHERE user_type = 'individual';

-- Tekil bildirim
INSERT INTO notifications (user_id, title, message, type) VALUES
('uuid-kullanici', 'Başvurunuz Kabul Edildi', 'Etkinlik Görevlisi pozisyonuna atandınız!', 'success');
```

**İndeksler:**
- `user_id` (kullanıcının bildirimlerini getirmek için)
- `is_read` (okunmamış bildirimleri filtrelemek için)

**Kullanım Alanları:**
- ✅ Admin'den toplu bildirim gönderme
- ✅ Başvuru kabul/ret bildirimleri
- ✅ İş atama bildirimleri
- ✅ Bağış bildirimleri
- ✅ Sistem duyuruları

---

### 6️⃣ `transactions` Tablosu

**Açıklama:** Finansal işlemler (cari hesap hareketleri)

**Sütunlar:**

| Sütun Adı | Tip | Açıklama | Zorunlu | Varsayılan |
|-----------|-----|----------|---------|------------|
| `id` | UUID | İşlem ID | ✅ | auto-generated |
| `user_id` | UUID | İşlem yapan kullanıcı | ✅ | - |
| `amount` | DECIMAL(10,2) | İşlem miktarı (TL) | ✅ | - |
| `type` | TEXT | İşlem tipi: `credit` (alacak), `debit` (borç) | ✅ | - |
| `category` | TEXT | Kategori: `job_payment`, `donation`, `withdrawal`, `admin_adjustment` | ✅ | - |
| `description` | TEXT | İşlem açıklaması | ✅ | - |
| `reference_id` | UUID | İlişkili kayıt ID (job_id, donation_id vb.) | ❌ | NULL |
| `created_at` | TIMESTAMP | İşlem tarihi | ✅ | NOW() |

**Örnek Veri:**

```sql
-- İş ödemesi (credit - alacak)
INSERT INTO transactions (
  user_id, 
  amount, 
  type, 
  category, 
  description, 
  reference_id
) VALUES (
  'uuid-bireysel-kullanici',
  680.00,
  'credit',
  'job_payment',
  'Etkinlik Görevlisi işi tamamlandı',
  'uuid-job-id'
);

-- Bağış (debit - borç)
INSERT INTO transactions (
  user_id, 
  amount, 
  type, 
  category, 
  description, 
  reference_id
) VALUES (
  'uuid-bireysel-kullanici',
  15.00,
  'debit',
  'donation',
  'Dayanışma Menüsü kısmi destek',
  'uuid-donation-id'
);

-- Para çekme (debit - borç)
INSERT INTO transactions (
  user_id, 
  amount, 
  type, 
  category, 
  description
) VALUES (
  'uuid-bireysel-kullanici',
  500.00,
  'debit',
  'withdrawal',
  'IBAN: TR123... hesabına transfer'
);

-- Admin düzeltme (credit veya debit)
INSERT INTO transactions (
  user_id, 
  amount, 
  type, 
  category, 
  description
) VALUES (
  'uuid-bireysel-kullanici',
  100.00,
  'credit',
  'admin_adjustment',
  'Admin tarafından eklenen bonus'
);
```

**İndeksler:**
- `user_id` (kullanıcının tüm işlemlerini getirmek için)
- `created_at` (tarih sıralama için)

**İşlem Kategorileri:**
- `job_payment`: İş tamamlama ödemesi (credit)
- `donation`: Bağış yapma (debit)
- `withdrawal`: Para çekme (debit)
- `admin_adjustment`: Admin düzeltmesi (credit veya debit)

---

## 📦 Storage Bucket

### `workigom-files` Bucket

**Açıklama:** Kullanıcı dosyaları (QR kodlar, profil fotoğrafları, belgeler)

**Klasör Yapısı:**
```
workigom-files/
├── {user_id}/
│   ├── profile-photos/
│   │   └── avatar.jpg
│   ├── qr-codes/
│   │   └── donation-{donation_id}.png
│   └── documents/
│       └── tax-document.pdf
```

**RLS Politikaları:**
- Kullanıcılar sadece kendi klasörlerine erişebilir
- Kullanıcılar kendi dosyalarını yükleyebilir, görüntüleyebilir, silebilir

**Örnek Kullanım:**

```typescript
// QR kod yükleme
const { data, error } = await supabase.storage
  .from('workigom-files')
  .upload(`${userId}/qr-codes/donation-${donationId}.png`, qrCodeBlob);

// Profil fotoğrafı yükleme
const { data, error } = await supabase.storage
  .from('workigom-files')
  .upload(`${userId}/profile-photos/avatar.jpg`, imageFile);

// Dosya URL'si alma
const { data } = supabase.storage
  .from('workigom-files')
  .getPublicUrl(`${userId}/qr-codes/donation-${donationId}.png`);
```

---

## 🔗 İlişkiler (Relationships)

### Entity Relationship Diagram (ERD)

```
┌─────────────┐
│    users    │
│             │
│  id (PK)    │◄────────┐
│  email      │         │
│  user_type  │         │
│  full_name  │         │
│  balance    │         │
└─────────────┘         │
       ▲                │
       │                │
       │ (corporate_id) │
       │                │
┌─────────────┐         │
│    jobs     │         │
│             │         │
│  id (PK)    │         │
│  corporate_id (FK)────┘
│  title      │
│  hourly_rate│
│  positions  │
└─────────────┘
       ▲
       │ (job_id)
       │
┌─────────────────┐
│  applications   │
│                 │
│  id (PK)        │
│  job_id (FK)────┘
│  individual_id (FK)───┐
│  corporate_id (FK)────┤
│  status         │     │
└─────────────────┘     │
                        │
                        ▼
                 ┌─────────────┐
                 │    users    │
                 └─────────────┘
                        ▲
                        │
                        │ (donor_id, recipient_id)
                        │
                 ┌─────────────────┐
                 │   donations     │
                 │                 │
                 │  id (PK)        │
                 │  donor_id (FK)──┘
                 │  recipient_id (FK)
                 │  amount         │
                 │  donation_type  │
                 │  qr_code_url    │
                 └─────────────────┘

┌────────────────┐         ┌───────────────┐
│ notifications  │         │ transactions  │
│                │         │               │
│  id (PK)       │         │  id (PK)      │
│  user_id (FK)──┼────────►│  user_id (FK) │
│  title         │         │  amount       │
│  message       │         │  type         │
│  is_read       │         │  category     │
└────────────────┘         └───────────────┘
```

### Tablo İlişkileri

| Parent Table | Child Table | Foreign Key | İlişki Tipi | Açıklama |
|--------------|-------------|-------------|-------------|----------|
| `users` | `jobs` | `corporate_id` | 1:N | Bir şirket birden fazla iş ilanı verebilir |
| `users` | `applications` | `individual_id` | 1:N | Bir kişi birden fazla işe başvurabilir |
| `users` | `applications` | `corporate_id` | 1:N | Bir şirket birden fazla başvuru alabilir |
| `jobs` | `applications` | `job_id` | 1:N | Bir iş birden fazla başvuru alabilir |
| `users` | `donations` | `donor_id` | 1:N | Bir kişi birden fazla bağış yapabilir |
| `users` | `donations` | `recipient_id` | 1:N | Bir kişi birden fazla bağış alabilir |
| `users` | `notifications` | `user_id` | 1:N | Bir kullanıcı birden fazla bildirim alabilir |
| `users` | `transactions` | `user_id` | 1:N | Bir kullanıcı birden fazla işlem yapabilir |

---

## 🔐 RLS (Row Level Security) Politikaları

### `users` Tablosu

```sql
-- Kullanıcılar sadece kendi profillerini görebilir
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Kullanıcılar sadece kendi profillerini güncelleyebilir
CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Admin tüm kullanıcıları görebilir
CREATE POLICY "Admin can view all users"
  ON users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'
    )
  );
```

### `jobs` Tablosu

```sql
-- Herkes açık ilanları görebilir
CREATE POLICY "Anyone can view open jobs"
  ON jobs FOR SELECT
  USING (status = 'open');

-- Kurumsal kullanıcılar iş ilanı oluşturabilir
CREATE POLICY "Corporate users can create jobs"
  ON jobs FOR INSERT
  WITH CHECK (
    auth.uid() = corporate_id AND
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'corporate'
    )
  );

-- Şirketler kendi ilanlarını güncelleyebilir
CREATE POLICY "Corporate users can update their own jobs"
  ON jobs FOR UPDATE
  USING (auth.uid() = corporate_id);
```

### `applications` Tablosu

```sql
-- Bireysel kullanıcılar kendi başvurularını görebilir
CREATE POLICY "Individuals can view their own applications"
  ON applications FOR SELECT
  USING (auth.uid() = individual_id);

-- Şirketler kendi ilanlarının başvurularını görebilir
CREATE POLICY "Corporate users can view applications for their jobs"
  ON applications FOR SELECT
  USING (auth.uid() = corporate_id);

-- Bireysel kullanıcılar başvuru yapabilir
CREATE POLICY "Individuals can create applications"
  ON applications FOR INSERT
  WITH CHECK (
    auth.uid() = individual_id AND
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'individual'
    )
  );

-- Şirketler başvuruları güncelleyebilir (kabul/ret)
CREATE POLICY "Corporate users can update applications for their jobs"
  ON applications FOR UPDATE
  USING (auth.uid() = corporate_id);
```

### `donations` Tablosu

```sql
-- Kullanıcılar kendi bağışlarını görebilir
CREATE POLICY "Users can view their own donations"
  ON donations FOR SELECT
  USING (auth.uid() = donor_id OR auth.uid() = recipient_id);

-- Kullanıcılar bağış oluşturabilir
CREATE POLICY "Users can create donations"
  ON donations FOR INSERT
  WITH CHECK (auth.uid() = donor_id);

-- Alıcılar bağışı güncelleyebilir (onaylama)
CREATE POLICY "Recipients can update donations"
  ON donations FOR UPDATE
  USING (auth.uid() = recipient_id);
```

### `notifications` Tablosu

```sql
-- Kullanıcılar kendi bildirimlerini görebilir
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Kullanıcılar kendi bildirimlerini güncelleyebilir (okundu)
CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Admin bildirim oluşturabilir
CREATE POLICY "Admin can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'
    )
  );
```

### `transactions` Tablosu

```sql
-- Kullanıcılar kendi işlemlerini görebilir
CREATE POLICY "Users can view their own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Admin tüm işlemleri görebilir
CREATE POLICY "Admin can view all transactions"
  ON transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND user_type = 'admin'
    )
  );

-- Sistem işlem oluşturabilir
CREATE POLICY "System can create transactions"
  ON transactions FOR INSERT
  WITH CHECK (true);
```

---

## 🚀 Kurulum Adımları

### 1. Supabase Projesi Oluştur

1. https://supabase.com 'a gidin
2. "New Project" tıklayın
3. Proje bilgilerini doldurun:
   - **Name:** workigom
   - **Database Password:** Güçlü bir şifre
   - **Region:** Europe (Frankfurt) veya Turkey yakını
4. "Create new project" tıklayın

### 2. Migration Dosyasını Çalıştır

**SQL Editor'ü kullanarak:**

1. Supabase Dashboard → **SQL Editor**
2. "New query" tıklayın
3. `/supabase/migrations/001_initial_schema.sql` dosyasının içeriğini yapıştırın
4. "Run" tıklayın

### 3. Environment Variables Ayarla

`.env.local` dosyası oluşturun:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Test Verileri Ekle (Opsiyonel)

**Test kullanıcıları oluşturmak için:**

```sql
-- Admin kullanıcı
INSERT INTO auth.users (id, email) VALUES ('admin-uuid', 'admin@workigom.com');
INSERT INTO users (id, email, user_type, full_name) VALUES 
('admin-uuid', 'admin@workigom.com', 'admin', 'Workigom Admin');

-- Bireysel kullanıcı
INSERT INTO auth.users (id, email) VALUES ('ind-uuid', 'ahmet@email.com');
INSERT INTO users (id, email, user_type, full_name, phone) VALUES 
('ind-uuid', 'ahmet@email.com', 'individual', 'Ahmet Yılmaz', '+90 532 123 4567');

-- Kurumsal kullanıcı
INSERT INTO auth.users (id, email) VALUES ('corp-uuid', 'info@elite.com');
INSERT INTO users (id, email, user_type, full_name, company_name) VALUES 
('corp-uuid', 'info@elite.com', 'corporate', 'Elite Yetkilisi', 'Elite Temizlik A.Ş.');
```

---

## 📋 Tablo İstatistikleri

| Tablo | Satır Sayısı (Tahmini) | Boyut (Tahmini) | Kullanım |
|-------|------------------------|-----------------|----------|
| `users` | 1,000-10,000 | 100 KB - 1 MB | Orta |
| `jobs` | 5,000-50,000 | 500 KB - 5 MB | Yüksek |
| `applications` | 20,000-200,000 | 2 MB - 20 MB | Çok Yüksek |
| `donations` | 1,000-10,000 | 100 KB - 1 MB | Orta |
| `notifications` | 50,000-500,000 | 5 MB - 50 MB | Çok Yüksek |
| `transactions` | 10,000-100,000 | 1 MB - 10 MB | Yüksek |

---

## 🔍 Yararlı SQL Sorguları

### Kullanıcı İstatistikleri

```sql
-- Toplam kullanıcı sayısı (tiplere göre)
SELECT user_type, COUNT(*) as count 
FROM users 
GROUP BY user_type;

-- En aktif kullanıcılar (en çok başvuru yapanlar)
SELECT u.full_name, COUNT(a.id) as application_count
FROM users u
LEFT JOIN applications a ON u.id = a.individual_id
WHERE u.user_type = 'individual'
GROUP BY u.id, u.full_name
ORDER BY application_count DESC
LIMIT 10;
```

### İş İlanı İstatistikleri

```sql
-- Açık iş ilanları
SELECT COUNT(*) FROM jobs WHERE status = 'open';

-- En çok başvuru alan ilanlar
SELECT j.title, j.location, COUNT(a.id) as application_count
FROM jobs j
LEFT JOIN applications a ON j.id = a.job_id
GROUP BY j.id, j.title, j.location
ORDER BY application_count DESC
LIMIT 10;
```

### Bağış İstatistikleri

```sql
-- Toplam bağış miktarı
SELECT SUM(amount) as total_donations 
FROM donations 
WHERE status = 'confirmed';

-- En çok bağış yapan kullanıcılar
SELECT u.full_name, COUNT(d.id) as donation_count, SUM(d.amount) as total_amount
FROM users u
LEFT JOIN donations d ON u.id = d.donor_id
WHERE d.status = 'confirmed'
GROUP BY u.id, u.full_name
ORDER BY total_amount DESC
LIMIT 10;
```

### Finansal İşlemler

```sql
-- Kullanıcı bakiyesi hesaplama
SELECT 
  user_id,
  SUM(CASE WHEN type = 'credit' THEN amount ELSE 0 END) as total_credit,
  SUM(CASE WHEN type = 'debit' THEN amount ELSE 0 END) as total_debit,
  SUM(CASE WHEN type = 'credit' THEN amount ELSE -amount END) as balance
FROM transactions
GROUP BY user_id;
```

---

## ✅ Kurulum Kontrol Listesi

Migration dosyasını çalıştırdıktan sonra kontrol edin:

- [ ] `users` tablosu oluşturuldu
- [ ] `jobs` tablosu oluşturuldu
- [ ] `applications` tablosu oluşturuldu
- [ ] `donations` tablosu oluşturuldu
- [ ] `notifications` tablosu oluşturuldu
- [ ] `transactions` tablosu oluşturuldu
- [ ] `workigom-files` storage bucket oluşturuldu
- [ ] RLS politikaları aktif
- [ ] İndeksler oluşturuldu
- [ ] Foreign key constraints oluşturuldu
- [ ] Trigger'lar (updated_at) çalışıyor
- [ ] Environment variables ayarlandı

**Kontrol SQL:**

```sql
-- Tüm tabloları listele
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- RLS aktif mi?
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- Storage bucket var mı?
SELECT * FROM storage.buckets;
```

---

## 📞 Yardım

**Supabase Dashboard:**
- **URL:** https://app.supabase.com/project/YOUR_PROJECT_ID
- **SQL Editor:** SQL sorguları çalıştırmak için
- **Table Editor:** Tabloları görsel olarak düzenlemek için
- **Authentication:** Kullanıcı yönetimi
- **Storage:** Dosya yönetimi

**Faydalı Linkler:**
- Supabase Dokümantasyon: https://supabase.com/docs
- SQL Referans: https://www.postgresql.org/docs/
- RLS Guide: https://supabase.com/docs/guides/auth/row-level-security

---

**✅ Tablolar hazır!** Artık Workigom uygulaması Supabase ile çalışmaya hazır! 🎉

**Sonraki Adım:** `SUPABASE_ADIM_ADIM_REHBER.md` dosyasını takip ederek Supabase entegrasyonunu tamamlayın.

---

**Son Güncelleme:** 5 Kasım 2025  
**Workigom Version:** 1.0.0  
**Database Schema Version:** 1.0
