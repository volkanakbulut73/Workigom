# 🤖 SUPABASE AI İÇİN PROMPT

Bu prompt'u **Supabase AI**'ya yapıştırarak Workigom projesi için gerekli tüm database yapısını, authentication, storage ve backend işlemlerini otomatik olarak kurabilirsiniz.

---

## 📋 SUPABASE AI'YA KOPYALA-YAPIŞTIR

```
Merhaba Supabase AI! 👋

"Workigom" adında bir mobil iş pazarı uygulaması geliştiriyorum. 
React + TypeScript + Vite + Tailwind CSS kullanıyorum ve Supabase'i backend olarak kullanmak istiyorum.

## 🎯 PROJE HAKKINDA

Workigom, çalışanları şirketlerle acil iş fırsatları için bağlayan bir platformdur.
3 farklı kullanıcı rolü var:
1. **Bireysel Kullanıcılar (Individual):** İş arayanlar
2. **Kurumsal Kullanıcılar (Corporate):** İş verenler (şirketler)
3. **Admin Kullanıcılar:** Platform yöneticileri

## 📊 GEREKLİ DATABASE TABLOLARI

### 1. **users** tablosu
Kullanıcı profilleri için (auth.users'a bağlı)

Kolonlar:
- id (UUID, PRIMARY KEY) → auth.users(id) referansı
- email (TEXT, UNIQUE, NOT NULL)
- user_type (TEXT, NOT NULL) → 'individual', 'corporate', veya 'admin'
- full_name (TEXT, NOT NULL)
- phone (TEXT)
- company_name (TEXT) → sadece corporate kullanıcılar için
- tax_number (TEXT) → sadece corporate kullanıcılar için
- address (TEXT)
- iban (TEXT) → ödeme bilgileri için
- golden_heart_count (INTEGER, DEFAULT 0) → Altın Kalp rozeti (%100 paylaşım için)
- balance (DECIMAL(10, 2), DEFAULT 0.00) → kullanıcı bakiyesi
- profile_photo_url (TEXT) → profil fotoğrafı URL
- created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())
- updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

### 2. **jobs** tablosu
İş ilanları için

Kolonlar:
- id (UUID, PRIMARY KEY, DEFAULT uuid_generate_v4())
- corporate_id (UUID, NOT NULL) → users(id) referansı
- title (TEXT, NOT NULL) → iş başlığı
- description (TEXT, NOT NULL) → iş açıklaması
- location (TEXT, NOT NULL) → iş yeri adresi
- date (DATE, NOT NULL) → iş tarihi
- time (TEXT, NOT NULL) → iş saati
- hourly_rate (DECIMAL(10, 2), NOT NULL) → saatlik ücret
- positions (INTEGER, NOT NULL) → toplam pozisyon sayısı
- filled_positions (INTEGER, DEFAULT 0) → doldurulan pozisyonlar
- status (TEXT, DEFAULT 'open') → 'open', 'in_progress', 'completed', 'cancelled'
- created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())
- updated_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

### 3. **applications** tablosu
İş başvuruları için

Kolonlar:
- id (UUID, PRIMARY KEY, DEFAULT uuid_generate_v4())
- job_id (UUID, NOT NULL) → jobs(id) referansı
- individual_id (UUID, NOT NULL) → users(id) referansı (başvuran kişi)
- corporate_id (UUID, NOT NULL) → users(id) referansı (iş veren)
- status (TEXT, DEFAULT 'pending') → 'pending', 'accepted', 'rejected', 'completed'
- applied_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())
- accepted_at (TIMESTAMP WITH TIME ZONE)
- completed_at (TIMESTAMP WITH TIME ZONE)
- rating (INTEGER) → 1-5 arası değerlendirme
- review (TEXT) → kullanıcı yorumu
- created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

### 4. **menu_shares** tablosu
Menü Market paylaşım sistemi için

Kolonlar:
- id (UUID, PRIMARY KEY, DEFAULT uuid_generate_v4())
- supporter_id (UUID, NOT NULL) → users(id) referansı (destekçi/paylaşan kişi)
- beneficiary_id (UUID) → users(id) referansı (yararlanıcı, NULL olabilir)
- amount (DECIMAL(10, 2), NOT NULL) → paylaşım tutarı
- share_type (TEXT, NOT NULL) → 'partial' (%20 kısmi paylaşım) veya 'full' (%100 tam paylaşım)
- qr_code_url (TEXT) → QR kod resmi URL
- status (TEXT, DEFAULT 'pending') → 'pending', 'confirmed', 'expired'
- expires_at (TIMESTAMP WITH TIME ZONE, NOT NULL) → QR kod son kullanma tarihi (5 dakika)
- confirmed_at (TIMESTAMP WITH TIME ZONE)
- created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

### 5. **notifications** tablosu
Bildirimler için

Kolonlar:
- id (UUID, PRIMARY KEY, DEFAULT uuid_generate_v4())
- user_id (UUID, NOT NULL) → users(id) referansı
- title (TEXT, NOT NULL) → bildirim başlığı
- message (TEXT, NOT NULL) → bildirim mesajı
- type (TEXT, DEFAULT 'info') → 'info', 'success', 'warning', 'error'
- is_read (BOOLEAN, DEFAULT FALSE)
- created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

### 6. **transactions** tablosu
Finansal işlemler için

Kolonlar:
- id (UUID, PRIMARY KEY, DEFAULT uuid_generate_v4())
- user_id (UUID, NOT NULL) → users(id) referansı
- amount (DECIMAL(10, 2), NOT NULL) → işlem tutarı
- type (TEXT, NOT NULL) → 'credit' (gelen para) veya 'debit' (giden para)
- category (TEXT, NOT NULL) → 'job_payment', 'donation', 'withdrawal', 'admin_adjustment'
- description (TEXT, NOT NULL) → işlem açıklaması
- reference_id (UUID) → ilgili job, donation veya application ID'si
- created_at (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

---

## 🔐 AUTHENTICATION İHTİYAÇLARI

1. **Email + Password** ile kayıt ve giriş
2. **Sign Up** sırasında kullanıcı tipini (individual/corporate) seçebilme
3. Session yönetimi
4. Email doğrulama (geliştirme aşamasında kapalı olabilir)

**ÖNEMLİ:** Sign up işlemi sırasında otomatik olarak `users` tablosuna da kayıt eklenmeli (trigger ile).

---

## 📦 STORAGE İHTİYAÇLARI

**Bucket adı:** `workigom-files`

**Public değil** (private bucket) → signed URL kullanılacak

**Dosya tipleri:**
1. **Profile photos** → `/users/{user_id}/profile.jpg`
2. **QR codes** → `/qr-codes/{donation_id}/qr.png`

**Storage policies:**
- Kullanıcılar sadece kendi klasörlerine upload edebilir
- Kullanıcılar sadece kendi dosyalarını görebilir/silebilir

---

## 🔒 ROW LEVEL SECURITY (RLS) POLİTİKALARI

### **users** tablosu:
1. Kullanıcılar kendi profillerini görebilir ve güncelleyebilir
2. Admin'ler tüm kullanıcıları görebilir

### **jobs** tablosu:
1. Herkes açık ('open') işleri görebilir
2. Sadece corporate kullanıcılar iş ilanı oluşturabilir
3. Corporate kullanıcılar kendi ilanlarını güncelleyebilir ve silebilir

### **applications** tablosu:
1. Individual kullanıcılar kendi başvurularını görebilir
2. Corporate kullanıcılar kendi işlerine gelen başvuruları görebilir
3. Individual kullanıcılar başvuru oluşturabilir
4. Corporate kullanıcılar başvuru durumunu güncelleyebilir

### **donations** tablosu:
1. Kullanıcılar kendi bağışlarını (donor veya recipient olarak) görebilir
2. Kullanıcılar bağış oluşturabilir
3. Alıcılar bağış durumunu güncelleyebilir

### **notifications** tablosu:
1. Kullanıcılar kendi bildirimlerini görebilir ve güncelleyebilir
2. Sadece admin'ler bildirim oluşturabilir

### **transactions** tablosu:
1. Kullanıcılar kendi işlemlerini görebilir
2. Admin'ler tüm işlemleri görebilir
3. Sistem (backend) işlem oluşturabilir

---

## 🔄 TRIGGERS VE FUNCTIONS

### 1. **Automatic User Profile Creation**
Auth'da yeni kullanıcı oluşturulduğunda otomatik olarak `users` tablosuna ekle

```sql
-- Trigger: auth.users'a kayıt olunca users tablosuna da ekle
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, user_type, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'individual'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 2. **Updated_at Timestamp**
`users` ve `jobs` tablolarında güncelleme olduğunda `updated_at` otomatik güncellensin

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
  BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 3. **Donation Expiry Check**
QR kodların 5 dakika sonra otomatik expire olması için

```sql
-- Function: Süresi dolan bağışları otomatik 'expired' yap
CREATE OR REPLACE FUNCTION expire_old_donations()
RETURNS void AS $$
BEGIN
  UPDATE donations
  SET status = 'expired'
  WHERE status = 'pending'
    AND expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Bu function'u bir cron job ile her dakika çalıştır (opsiyonel)
```

---

## 📈 INDEXES

Performans için gerekli indexler:

```sql
-- Jobs tablosu
CREATE INDEX idx_jobs_corporate_id ON jobs(corporate_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_date ON jobs(date);

-- Applications tablosu
CREATE INDEX idx_applications_job_id ON applications(job_id);
CREATE INDEX idx_applications_individual_id ON applications(individual_id);
CREATE INDEX idx_applications_corporate_id ON applications(corporate_id);
CREATE INDEX idx_applications_status ON applications(status);

-- Donations tablosu
CREATE INDEX idx_donations_donor_id ON donations(donor_id);
CREATE INDEX idx_donations_recipient_id ON donations(recipient_id);
CREATE INDEX idx_donations_status ON donations(status);

-- Notifications tablosu
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- Transactions tablosu
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
```

---

## 🧪 TEST KULLANICILARI

Lütfen şu test kullanıcılarını oluştur:

### 1. **Admin Kullanıcı**
- Email: admin@workigom.com
- Password: Admin123!
- user_type: 'admin'
- full_name: 'Admin Kullanıcı'

### 2. **Bireysel Kullanıcı**
- Email: ahmet@test.com
- Password: Test123!
- user_type: 'individual'
- full_name: 'Ahmet Yılmaz'
- phone: '0532 123 4567'
- golden_heart_count: 3

### 3. **Kurumsal Kullanıcı**
- Email: sirket@test.com
- Password: Test123!
- user_type: 'corporate'
- full_name: 'Mehmet Demir'
- company_name: 'ABC Restaurant'
- tax_number: '1234567890'
- phone: '0212 345 6789'

---

## 🚀 ÖRNEK DATALAR

### Örnek İş İlanı:
```sql
INSERT INTO jobs (
  corporate_id,
  title,
  description,
  location,
  date,
  time,
  hourly_rate,
  positions,
  status
) VALUES (
  (SELECT id FROM users WHERE email = 'sirket@test.com'),
  'Garson - Acil İhtiyaç',
  'Hafta sonu etkinlik için deneyimli garson aranıyor',
  'İstanbul, Beşiktaş',
  CURRENT_DATE + INTERVAL '3 days',
  '18:00 - 23:00',
  150.00,
  5,
  'open'
);
```

### Örnek Bildirim:
```sql
INSERT INTO notifications (
  user_id,
  title,
  message,
  type
) VALUES (
  (SELECT id FROM users WHERE email = 'ahmet@test.com'),
  'Yeni İş Fırsatı! 💼',
  'Yakınınızda yeni bir garson ilanı yayınlandı. Başvurmak için tıklayın!',
  'info'
);
```

---

## ⚙️ EDGE FUNCTIONS (Opsiyonel)

Eğer backend işlemler için Edge Function gerekiyorsa:

**Function adı:** `make-server-018e1998`

**Görevleri:**
1. QR kod oluşturma (donation için)
2. Signed URL oluşturma (storage için)
3. Karmaşık business logic (ör: iş tamamlandığında otomatik ödeme)
4. Bildirim gönderme
5. Admin işlemleri

**Environment Variables:**
- SUPABASE_URL
- SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

---

## 📱 FRONTEND BAĞLANTI BİLGİLERİ

**Mevcut Supabase Project ID:** nbtpolsxhhnpxsqyeduz
**Anon Key:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5idHBvbHN4aGhucHhzcXllZHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNDg4ODMsImV4cCI6MjA3NzkyNDg4M30.0vL-QnAexwDcP6mSYvPx4cwk2fBPNBf6SCK_xNqEQR8

**Frontend kod örneği:**
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nbtpolsxhhnpxsqyeduz.supabase.co';
const supabaseAnonKey = 'eyJhbGci...';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

## ✅ YAPILMASI GEREKENLER ÖZET

Lütfen şunları otomatik oluştur:

1. ✅ 6 database tablosu (users, jobs, applications, donations, notifications, transactions)
2. ✅ UUID extension aktif et
3. ✅ Tüm foreign key ilişkileri
4. ✅ RLS policies (tüm tablolar için)
5. ✅ Triggers (new user, updated_at)
6. ✅ Indexes (performans için)
7. ✅ Storage bucket (workigom-files, private)
8. ✅ Storage policies
9. ✅ 3 test kullanıcısı (admin, individual, corporate)
10. ✅ Örnek job ve notification dataları

---

## 🆘 EKSTRA İSTEKLER

1. **Email doğrulama:** Geliştirme aşamasında KAPALI olsun (prod'da açılacak)
2. **Session süresiz:** Auto refresh token aktif olsun
3. **Realtime:** Bildirimler için realtime subscription kurulabilir olsun
4. **Soft delete:** Şu an gerekli değil, hard delete kullanacağız

---

## 📊 BEKLENEN SONUÇ

Bu prompt'tan sonra:
- ✅ Database şeması tamamen hazır olmalı
- ✅ Authentication çalışıyor olmalı
- ✅ Storage bucket ve policies hazır olmalı
- ✅ Test kullanıcıları ile giriş yapabilmeliyim
- ✅ RLS policies çalışıyor olmalı
- ✅ Frontend'den direkt Supabase client ile bağlanabilmeliyim

---

## 🔗 PROJE LINKLERI

- **Frontend GitHub:** https://github.com/volkanakbulut73/Workigom
- **Deploy URL:** https://workigom-frontend1.onrender.com/
- **Tech Stack:** React, TypeScript, Vite, Tailwind CSS, Supabase
- **UI Library:** shadcn/ui, Lucide icons

---

Teşekkürler Supabase AI! Lütfen yukarıdaki tüm tabloları, policies, triggers, indexes ve test datalarını oluştur. 🚀

Oluşturduktan sonra bana şunları rapor et:
1. Hangi tablolar oluşturuldu?
2. Kaç RLS policy eklendi?
3. Test kullanıcıları başarıyla oluşturuldu mu?
4. Storage bucket hazır mı?
5. Herhangi bir hata veya uyarı var mı?
```

---

## 📝 PROMPT'U NASIL KULLANACAKSINIZ?

### **Adım 1: Supabase Dashboard'a Gidin**
```
https://supabase.com/dashboard
```

1. Projenizi açın: **nbtpolsxhhnpxsqyeduz**
2. Sol menüden **"SQL Editor"** seçin
3. Veya **"Database"** → **"Tables"** bölümüne gidin

---

### **Adım 2: Supabase AI'yı Açın**
```
Dashboard'da sağ alt köşede "Ask Supabase AI" butonu var
```

1. **"Ask Supabase AI"** butonuna tıklayın (💬 ikon)
2. Veya **"SQL Editor"** içinde **"AI Assistant"** kullanın

---

### **Adım 3: Prompt'u Yapıştırın**

Yukarıdaki **tüm prompt'u** (baştan sona) kopyalayın ve Supabase AI'ya yapıştırın:

```
Başlangıç: "Merhaba Supabase AI! 👋"
Bitiş: "5. Herhangi bir hata veya uyarı var mı?"
```

**CTRL + A** → **CTRL + C** → Supabase AI'ya **CTRL + V**

---

### **Adım 4: "Generate" veya "Run" Basın**

Supabase AI prompt'u analiz edecek ve:
1. SQL komutlarını otomatik oluşturacak
2. Size onay için gösterecek
3. "Run" dediğinizde tüm database'i kuracak

---

### **Adım 5: Sonuçları Kontrol Edin**

AI oluşturduktan sonra kontrol edin:

```
✅ Database → Tables → 6 tablo var mı?
✅ Authentication → Users → 3 test kullanıcısı var mı?
✅ Storage → Buckets → 'workigom-files' bucket var mı?
✅ Database → Policies → RLS policies aktif mi?
```

---

## 🔧 ALTERNATIF YÖNTEM: MANUEL SQL

Eğer Supabase AI çalışmazsa, manuel SQL dosyasını kullanın:

### **SQL dosyaları zaten hazır:**
```
/supabase/migrations/001_initial_schema.sql  ← Ana schema
/supabase/migrations/002_additional_features.sql  ← Ekstra özellikler
```

### **Nasıl çalıştırılır:**

1. **Supabase Dashboard** → **SQL Editor**
2. **001_initial_schema.sql** dosyasını açın
3. İçeriği **kopyalayın**
4. SQL Editor'e **yapıştırın**
5. **"Run"** basın ▶️
6. Aynı işlemi **002_additional_features.sql** için tekrarlayın

---

## 🆘 SORUN ÇIKARSA

### **Hata: "Extension uuid-ossp already exists"**
```
Normal! UUID extension zaten kurulu, devam edin.
```

### **Hata: "Permission denied"**
```
Çözüm: Dashboard'da Admin olarak giriş yapın
Project Settings → Database → "Enable RLS" kontrol edin
```

### **Hata: "Trigger already exists"**
```
Çözüm: Önce trigger'ı silin:
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
```

### **Test kullanıcıları oluşturulamadı**
```
Çözüm: Manuel oluşturun:
Dashboard → Authentication → Users → "Add User" ▶️
```

---

## 🎯 BAŞARI KRİTERLERİ

Prompt çalıştıktan sonra **şunlar hazır olmalı:**

### ✅ **Database:**
```
✅ 6 tablo (users, jobs, applications, donations, notifications, transactions)
✅ Tüm foreign keys
✅ Tüm indexes
✅ 2 trigger (new user, updated_at)
```

### ✅ **Security:**
```
✅ RLS enabled (6 tabloda)
✅ 20+ RLS policy
✅ Storage policies (4 adet)
```

### ✅ **Test Data:**
```
✅ admin@workigom.com (admin)
✅ ahmet@test.com (individual)
✅ sirket@test.com (corporate)
✅ 1 örnek job
✅ 1 örnek notification
```

### ✅ **Storage:**
```
✅ 'workigom-files' bucket (private)
✅ Upload/view/delete policies
```

---

## 🧪 TEST ETME

Prompt çalıştıktan sonra **hemen test edin:**

### **1. Test Kullanıcı ile Giriş**
```typescript
// Frontend'de test:
import { supabase } from './utils/supabase/client';

const { data, error } = await supabase.auth.signInWithPassword({
  email: 'ahmet@test.com',
  password: 'Test123!',
});

console.log('Giriş başarılı:', data);
```

### **2. Users Tablosunu Okuma**
```typescript
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('email', 'ahmet@test.com')
  .single();

console.log('Kullanıcı profili:', data);
```

### **3. Jobs Tablosunu Okuma**
```typescript
const { data, error } = await supabase
  .from('jobs')
  .select('*')
  .eq('status', 'open');

console.log('Açık işler:', data);
```

---

## 📊 ÖZET

```
Hazırlanan:
✅ Supabase AI için tam prompt (kopyala-yapıştır)
✅ 6 tablo şeması
✅ 20+ RLS policy
✅ 3 test kullanıcısı
✅ Triggers ve functions
✅ Storage bucket ve policies
✅ Indexes (performans)

Dosya boyutu: 850+ satır SQL
Tahmini kurulum süresi: 2-3 dakika
```

---

## 🚀 ŞİMDİ NE YAPACAKSINIZ?

### **ADIM 1: Supabase Dashboard Açın**
```
https://supabase.com/dashboard/project/nbtpolsxhhnpxsqyeduz
```

### **ADIM 2: SQL Editor'e Gidin**
```
Sol menü → SQL Editor → New Query
```

### **ADIM 3: Prompt'u Yapıştırın**
```
Yukarıdaki prompt'u tamamen kopyalayın
Supabase AI'ya yapıştırın
"Generate" veya "Run" basın
```

### **ADIM 4: 3 Dakika Bekleyin**
```
Supabase AI tüm SQL'leri oluşturacak ve çalıştıracak
```

### **ADIM 5: Test Edin**
```
Frontend'de test kullanıcıları ile giriş yapın
```

---

**TOPLAM SÜRE:** 5 dakika (prompt yapıştır 1dk + AI çalışır 3dk + test 1dk)

---

**BAŞARILAR! 🎉**

Supabase AI ile 850+ satır SQL'i 3 dakikada kurabilirsiniz! 🚀
