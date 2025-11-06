# 🎯 Workigom - Supabase Adım Adım Kurulum Rehberi

## 📌 Genel Bakış

Bu rehber, Workigom uygulamanızı Supabase backend ile entegre etmek için atmanız gereken **tüm adımları** sırasıyla açıklar. Her adım için detaylı açıklamalar, ekran görüntüsü referansları ve olası hatalar dahildir.

---

## ⏱️ Tahmini Süre

- **İlk Kurulum:** 30-45 dakika
- **Test ve Doğrulama:** 15-20 dakika
- **Toplam:** ~1 saat

---

## 📋 Ön Hazırlık

### İhtiyacınız Olanlar

- ✅ GitHub hesabı (Supabase için)
- ✅ Tarayıcı (Chrome/Firefox/Safari)
- ✅ Kod editörü (VS Code önerilir)
- ✅ Terminal erişimi
- ✅ İnternet bağlantısı

---

# BÖLÜM 1: SUPABASE PROJESİ OLUŞTURMA

## Adım 1.1: Supabase'e Giriş Yapın

1. Tarayıcınızda **https://supabase.com** adresine gidin
2. Sağ üst köşede **"Sign In"** butonuna tıklayın
3. **"Continue with GitHub"** seçeneğini seçin (önerilen)
4. GitHub hesabınızla giriş yapın ve izinleri onaylayın

> 💡 **İpucu:** GitHub ile giriş yapmak deployment sürecini kolaylaştırır.

---

## Adım 1.2: Yeni Proje Oluşturun

1. Dashboard'da **"New Project"** butonuna tıklayın (yeşil buton)
2. **Organization seçin** veya yeni bir organization oluşturun
3. Proje bilgilerini girin:
   ```
   Name: workigom
   Database Password: [Güçlü bir şifre - kaydedin!]
   Region: Europe Central (eu-central-1)
   Pricing Plan: Free
   ```

4. **"Create new project"** butonuna tıklayın

⏳ **Bekleyin:** Proje kurulumu ~2 dakika sürer. Ekranda "Building project..." mesajı görünecek.

✅ **Başarılı:** Dashboard ana sayfasını gördüğünüzde proje hazır.

---

# BÖLÜM 2: DATABASE SCHEMA KURULUMU

## Adım 2.1: SQL Editor'ü Açın

1. Sol menüden **"SQL Editor"** butonuna tıklayın
2. **"+ New query"** butonuna tıklayın
3. Boş bir SQL editör açılacak

---

## Adım 2.2: Schema Migration'ı Yapıştırın

1. **Yerel bilgisayarınızda** `/supabase/migrations/001_initial_schema.sql` dosyasını açın
2. **Tüm içeriği kopyalayın** (Ctrl+A, sonra Ctrl+C)
3. **Supabase SQL Editor'e yapıştırın** (Ctrl+V)
4. **Sağ alt köşedeki "Run" butonuna tıklayın** ▶️

⏳ **Bekleyin:** Query çalışacak (~5-10 saniye)

✅ **Başarılı mesaj:**
```
Success. No rows returned
```

❌ **Hata alırsanız:**
- Editor'ü tamamen temizleyin
- SQL'i tekrar yapıştırın
- Tek seferde çalıştırdığınızdan emin olun

---

## Adım 2.3: Tabloları Doğrulayın

1. Sol menüden **"Table Editor"** seçeneğine tıklayın
2. Şu 6 tablonun oluşturulduğunu doğrulayın:

   ✅ **users** - Kullanıcı profilleri  
   ✅ **jobs** - İş ilanları  
   ✅ **applications** - İş başvuruları  
   ✅ **donations** - Dayanışma menüsü bağışları  
   ✅ **notifications** - Bildirimler  
   ✅ **transactions** - Cari hesap işlemleri

3. Her tabloya tıklayarak kolonları kontrol edin

---

## Adım 2.4: Indexes ve Triggers'ı Kontrol Edin

SQL Editor'de şu komutu çalıştırın:

```sql
-- Indexes kontrolü
SELECT tablename, indexname 
FROM pg_indexes 
WHERE schemaname = 'public' 
ORDER BY tablename, indexname;
```

✅ **Beklenen sonuç:** ~10-15 index görmeli

```sql
-- Triggers kontrolü
SELECT trigger_name, event_manipulation, event_object_table 
FROM information_schema.triggers 
WHERE trigger_schema = 'public';
```

✅ **Beklenen sonuç:** 2 trigger (update_users_updated_at, update_jobs_updated_at)

---

# BÖLÜM 3: ROW LEVEL SECURITY (RLS) KURULUMU

## Adım 3.1: RLS Durumunu Kontrol Edin

SQL Editor'de çalıştırın:

```sql
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

✅ **Tüm tablolarda `rowsecurity` = true olmalı**

---

## Adım 3.2: Policies'leri Doğrulayın

1. **Table Editor** > **users** tablosunu seçin
2. Sağ üstteki **"RLS disabled"** butonuna tıklayın (zaten enabled olmalı)
3. **"View Policies"** seçeneğine tıklayın

✅ **users tablosu için 3 policy görmelisiniz:**
- Users can view their own profile
- Users can update their own profile
- Admin can view all users

Diğer tablolar için de benzer şekilde kontrol edin.

---

# BÖLÜM 4: STORAGE BUCKET YAPISI

## Adım 4.1: Storage Bucket'ı Kontrol Edin

1. Sol menüden **"Storage"** seçeneğine tıklayın
2. **"workigom-files"** bucket'ının oluşturulduğunu doğrulayın

✅ **Bucket ayarları:**
- Name: `workigom-files`
- Public: `false` (güvenlik için)
- File size limit: Default (50MB)

---

## Adım 4.2: Storage Policies'i Kontrol Edin

1. **workigom-files** bucket'ına tıklayın
2. **"Policies"** sekmesine gidin

✅ **4 policy görmelisiniz:**
- Users can upload their own files (INSERT)
- Users can view their own files (SELECT)
- Users can update their own files (UPDATE)
- Users can delete their own files (DELETE)

---

## Adım 4.3: Folder Yapısını Anlayın

Storage yapısı şöyle olacak:

```
workigom-files/
├── {user-id-1}/
│   ├── profile/
│   │   └── avatar.jpg
│   └── qr-codes/
│       ├── donation-123.png
│       └── donation-456.png
├── {user-id-2}/
│   ├── profile/
│   └── qr-codes/
└── ...
```

> 💡 Her kullanıcının kendi klasörü var - RLS otomatik koruma sağlar.

---

# BÖLÜM 5: TEST KULLANICILARI OLUŞTURMA

## Adım 5.1: Test Kullanıcıları SQL Script'ini Çalıştırın

SQL Editor'de şu script'i çalıştırın:

```sql


-- Bireysel kullanıcı
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  role,
  aud
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000000',
  'individual@workigom.com',
  crypt('individual123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"full_name": "Ahmet Yılmaz", "user_type": "individual"}'::jsonb,
  'authenticated',
  'authenticated'
);

INSERT INTO public.users (
  id, email, user_type, full_name, phone, balance, golden_heart_count
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  'individual@workigom.com',
  'individual',
  'Ahmet Yılmaz',
  '+90 555 123 4567',
  0.00,
  0
);

-- Kurumsal kullanıcı
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  role,
  aud
) VALUES (
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000000',
  'corporate@workigom.com',
  crypt('corporate123', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"full_name": "ABC Teknoloji A.Ş.", "user_type": "corporate"}'::jsonb,
  'authenticated',
  'authenticated'
);

INSERT INTO public.users (
  id, email, user_type, full_name, phone, company_name, tax_number, balance, golden_heart_count
) VALUES (
  '00000000-0000-0000-0000-000000000003',
  'corporate@workigom.com',
  'corporate',
  'ABC Teknoloji',
  '+90 555 999 8888',
  'ABC Teknoloji A.Ş.',
  '1234567890',
  0.00,
  0
);
```

✅ **Başarılı:** "Success. No rows returned"

---

## Adım 5.2: Kullanıcıları Doğrulayın

**Authentication'da kontrol:**
1. Sol menüden **"Authentication"** > **"Users"** seçeneğine gidin
2. 3 kullanıcı görmelisiniz:
   - admin@workigom.com
   - individual@workigom.com
   - corporate@workigom.com

**Database'de kontrol:**
```sql
SELECT id, email, user_type, full_name FROM users;
```

✅ **3 satır dönmeli**

---

## Adım 5.3: Test Kullanıcı Bilgileri

| Kullanıcı Tipi | Email | Şifre | Açıklama |
|----------------|-------|-------|----------|
| **Admin** | `admin@workigom.com` | `admin123` | Tüm yetkilere sahip |
| **Bireysel** | `individual@workigom.com` | `individual123` | İş arayan kullanıcı |
| **Kurumsal** | `corporate@workigom.com` | `corporate123` | İş veren şirket |

> 🔒 **Güvenlik:** Production'da bu şifreleri mutlaka değiştirin!

---

# BÖLÜM 6: API CREDENTIALS ALMA

## Adım 6.1: API Settings Sayfasına Gidin

1. Sol menüden **"Settings"** (⚙️) butonuna tıklayın
2. **"API"** sekmesine gidin

---

## Adım 6.2: Credentials'ı Kopyalayın

Sayfada şu bilgileri bulacaksınız:

### 1. Project URL
```
https://xxxxxxxxxxxxx.supabase.co
```
**Kopyalayın** (sağdaki copy butonuna tıklayın)

### 2. Project API keys

**anon public** key'i bulun:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
```
**Kopyalayın** (uzun bir string - ~200+ karakter)

⚠️ **ÖNEMLİ:** 
- ✅ `anon` key'i kullanın (public, frontend için)
- ❌ `service_role` key'i kullanmayın (gizli, sadece backend)

---

## Adım 6.3: Credentials'ı Geçici Olarak Kaydedin

Bir metin dosyasına yapıştırın:

```
PROJECT_URL: https://xxxxxxxxxxxxx.supabase.co
ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> 💡 Sonraki adımda bunları `.env` dosyasına koyacaksınız.

---

# BÖLÜM 7: ENVIRONMENT VARIABLES KURULUMU

## Adım 7.1: .env Dosyası Oluşturun

**VS Code'da (veya kod editörünüzde):**

1. Proje root dizinine gidin (package.json'un olduğu yer)
2. Yeni dosya oluşturun: `.env`
3. Şu satırları ekleyin:

```env
VITE_SUPABASE_URL=https://rfelydfhllvwoofqlnqu.supabase.com
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmZWx5ZGZobGx2d29vZnFsbnF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIwODExNjAsImV4cCI6MjA3NzY1NzE2MH0.QZO1dwpvkbB1x--kKJNLVA_GgVOhIPoVTLqYp2YkBnc
```

---

## Adım 7.2: Gerçek Değerleri Yapıştırın

Önceki adımda kopyaladığınız değerlerle değiştirin:

```env
VITE_SUPABASE_URL=https://abcdefghijk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.ACTUAL_LONG_KEY_HERE
```

**Önemli:**
- Satır sonunda boşluk olmamalı
- Tırnak işareti kullanmayın
- Placeholder metinleri sildiğinizden emin olun

---

## Adım 7.3: .env Dosyasını Doğrulayın

Terminal'de:

```bash
# Dosyanın varlığını kontrol edin
ls -la .env

# İçeriğini kontrol edin (Mac/Linux)
cat .env

# İçeriğini kontrol edin (Windows)
type .env
```

✅ **Doğru görünüm:**
```
-rw-r--r--  1 user  staff  256 Nov  2 10:30 .env
```

---

## Adım 7.4: .gitignore'u Kontrol Edin

`.gitignore` dosyasında şu satırın olduğundan emin olun:

```
.env
.env.local
```

✅ **Bu kritik!** API key'leriniz Git'e commit edilmemeli.

---

# BÖLÜM 8: YEREL GELIŞTIRME ORTAMINI TEST ETME

## Adım 8.1: Dev Server'ı Yeniden Başlatın

⚠️ **Önemli:** Environment variables ancak server restart sonrası yüklenir!

```bash
# Eğer server çalışıyorsa durdurun (Ctrl+C)

# Yeniden başlatın
npm run dev
```

---

## Adım 8.2: Console Loglarını Kontrol Edin

Tarayıcınızı açın (örn: http://localhost:5173) ve:

1. **F12** tuşuna basın (Developer Tools)
2. **Console** sekmesine gidin
3. Şu mesajı arayin:

✅ **Başarılı:**
```
✅ Supabase configured successfully
Supabase URL: https://xxxxx.supabase.co
```

❌ **Başarısız:**
```
⚠️ SUPABASE NOT CONFIGURED
Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file
```

**Sorun giderme:**
- `.env` dosyasını kontrol edin
- Server'ı yeniden başlattığınızdan emin olun
- Değerlerin doğru olduğunu kontrol edin

---

## Adım 8.3: Setup Checker'ı Kontrol Edin

Uygulama açıldığında sağ altta bir bildirim göreceksiniz:

✅ **Yeşil bildirim:** "Supabase bağlantısı başarılı!"  
❌ **Kırmızı bildirim:** "Supabase yapılandırılmamış"

---

# BÖLÜM 9: LOGİN SİSTEMİNİ TEST ETME

## Adım 9.1: Login Sayfasını Açın

1. Uygulamayı açın (http://localhost:5173)
2. Login ekranında olmalısınız

---

## Adım 9.2: Bireysel Kullanıcı ile Giriş Yapın

```
Email: individual@workigom.com
Şifre: individual123
```

**"Giriş Yap"** butonuna tıklayın

✅ **Başarılı:** Ana sayfaya yönlendirileceksiniz  
❌ **Hata:** Console'da hata mesajını kontrol edin

---

## Adım 9.3: Network Tab'ı Kontrol Edin

Developer Tools > **Network** sekmesi:

1. **`auth/v1/token?grant_type=password`** isteğini bulun
2. **Status:** `200 OK` olmalı
3. **Response:** `access_token` içermeli

```json
{
  "access_token": "eyJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": "...",
    "email": "individual@workigom.com"
  }
}
```

---

## Adım 9.4: Kullanıcı Profilini Kontrol Edin

Login olduktan sonra:

1. Console'a gidin
2. Şunu yazın:

```javascript
console.log(localStorage.getItem('supabase.auth.token'))
```

✅ **Access token** görmelisiniz

---

## Adım 9.5: Diğer Kullanıcılarla Test Edin

**Çıkış yapın** ve sırayla test edin:

### Kurumsal kullanıcı:
```
Email: corporate@workigom.com
Şifre: corporate123
```

### Admin kullanıcı:
```
Email: admin@workigom.com
Şifre: admin123
```

Her kullanıcı tipinin farklı bir ana sayfa gösterdiğini doğrulayın.

---

# BÖLÜM 10: DATABASE İŞLEMLERİNİ TEST ETME

## Adım 10.1: İş İlanı Oluşturma (Corporate User)

1. **corporate@workigom.com** ile giriş yapın
2. **"Acil İş İlanı Ver"** sayfasına gidin
3. Formu doldurun:
   ```
   İş Başlığı: Garson (Test)
   Açıklama: Test iş ilanı
   Konum: İstanbul, Kadıköy
   Tarih: Yarın
   Saat: 10:00-18:00
   Saatlik Ücret: 150
   Kişi Sayısı: 2
   ```
4. **"İlanı Yayınla"** butonuna tıklayın

---

## Adım 10.2: Supabase'de Kontrol Edin

1. Supabase Dashboard > **Table Editor** > **jobs**
2. Yeni oluşturduğunuz ilanı görmelisiniz:

```
id: [UUID]
corporate_id: 00000000-0000-0000-0000-000000000003
title: Garson (Test)
status: open
...
```

✅ **Başarılı!** Frontend ↔ Database bağlantısı çalışıyor.

---

## Adım 10.3: İş Başvurusu Yapma (Individual User)

1. **Çıkış yapın**
2. **individual@workigom.com** ile giriş yapın
3. **"Acil İşler"** sayfasına gidin
4. Az önce oluşturduğunuz ilana başvurun

---

## Adım 10.4: Başvuruyu Supabase'de Kontrol Edin

1. Supabase Dashboard > **Table Editor** > **applications**
2. Yeni başvuruyu görmelisiniz:

```
id: [UUID]
job_id: [az önce oluşturulan iş UUID'si]
individual_id: 00000000-0000-0000-0000-000000000002
status: pending
```

---

# BÖLÜM 11: REAL-TIME SUBSCRIPTIONS KURULUMU

## Adım 11.1: Replication'ı Aktifleştirin

1. Supabase Dashboard > **Database** > **Replication**
2. Şu tablolar için replication'ı aktif edin:

   - ✅ **notifications** - Toggle'ı açın
   - ✅ **applications** - Toggle'ı açın
   - ✅ **jobs** - Toggle'ı açın

Her tablo için **"Enable"** butonuna tıklayın.

---

## Adım 11.2: Real-time'ı Test Edin

**2 tarayıcı penceresi açın:**

### Pencere 1: Bireysel kullanıcı
```
individual@workigom.com
→ Bildirimler sayfasını açık tutun
```

### Pencere 2: Admin kullanıcı
```
admin@workigom.com
→ Bildirim Gönder formunu açın
→ individual@workigom.com'a bildirim gönderin
```

✅ **Beklenen sonuç:** Pencere 1'de bildirim anında görünmeli (sayfa yenilenmeden!)

---

# BÖLÜM 12: STORAGE (DOSYA YÜKLEME) TEST

## Adım 12.1: Profil Fotoğrafı Yükleme

1. **individual@workigom.com** ile giriş yapın
2. **Profil** sayfasına gidin
3. Profil fotoğrafı yükleme alanını bulun
4. Bir resim seçin ve yükleyin

---

## Adım 12.2: Supabase Storage'da Kontrol Edin

1. Supabase Dashboard > **Storage** > **workigom-files**
2. Şu path'i kontrol edin:
   ```
   00000000-0000-0000-0000-000000000002/profile/
   ```
3. Yüklediğiniz resmi görmelisiniz

---

## Adım 12.3: QR Kod Yükleme (Dayanışma Menüsü)

1. **Dayanışma Menüsü** sayfasına gidin
2. **"Buda Benden"** (%100) desteği seçin
3. QR kod yükleyin

Storage'da şurada görünmeli:
```
00000000-0000-0000-0000-000000000002/qr-codes/[donation-id].png
```

---

# BÖLÜM 13: ROW LEVEL SECURITY (RLS) TEST

## Adım 13.1: Yetkisiz Erişim Testi

**SQL Editor'de çalıştırın:**

```sql
-- Admin olmayan bir kullanıcının tüm kullanıcıları görmesi engellenmeli
SET LOCAL "request.jwt.claims" = '{"sub": "00000000-0000-0000-0000-000000000002", "role": "authenticated"}';
SELECT * FROM users;
```

❌ **Beklenen sonuç:** Sadece kendi kaydını görmeli (1 satır)

---

## Adım 13.2: Admin Erişim Testi

```sql
-- Admin kullanıcısı tüm kullanıcıları görebilmeli
SET LOCAL "request.jwt.claims" = '{"sub": "00000000-0000-0000-0000-000000000001", "role": "authenticated"}';
SELECT * FROM users;
```

✅ **Beklenen sonuç:** Tüm kullanıcıları görebilmeli (3+ satır)

---

## Adım 13.3: Cross-User Data Access Testi

Bireysel kullanıcı başka birinin başvurularını görebilir mi?

1. **individual@workigom.com** ile giriş yapın
2. Browser Console'da:

```javascript
const { data } = await supabase
  .from('applications')
  .select('*')
  .neq('individual_id', 'kendi-user-id');

console.log(data); // Boş olmalı!
```

✅ **RLS çalışıyor** - Sadece kendi verilerini görebilir.

---

# BÖLÜM 14: PRODUCTION DEPLOYMENT (RENDER.COM)

## Adım 14.1: Render.com'a Giriş Yapın

1. https://render.com adresine gidin
2. GitHub ile giriş yapın
3. **"New +"** > **"Web Service"** seçin

---

## Adım 14.2: Repository Bağlayın

1. GitHub reponuzu seçin (`workigom`)
2. **Name:** `workigom-app`
3. **Environment:** `Node`
4. **Build Command:**
   ```bash
   npm install && npm run build
   ```
5. **Start Command:**
   ```bash
   npm run preview
   ```

---

## Adım 14.3: Environment Variables Ekleyin

**Environment** sekmesinde:

```
VITE_SUPABASE_URL = https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGc...
```

> ⚠️ Aynı değerlerle `.env` dosyanızdan kopyalayın!

---

## Adım 14.4: Deploy Edin

1. **"Create Web Service"** butonuna tıklayın
2. Build başlayacak (~3-5 dakika)
3. **Deploy log'ları** izleyin

✅ **Başarılı:** `Your service is live at https://workigom-app.onrender.com`

---

## Adım 14.5: Production'ı Test Edin

1. Deploy edilen URL'i açın
2. Login sayfasını görün
3. Test kullanıcıları ile giriş yapın
4. Temel fonksiyonları test edin

---

# BÖLÜM 15: MONİTORİNG VE DEBUGGING

## Adım 15.1: Supabase Logs'u İzleyin

1. Supabase Dashboard > **Logs** > **Logs Explorer**
2. Filter:
   ```
   severity: error
   timestamp: last 1 hour
   ```

Database hatalarını gerçek zamanlı izleyin.

---

## Adım 15.2: Query Performance

1. **Database** > **Query Performance**
2. En yavaş sorguları görün
3. Index eklemek için fırsatları belirleyin

---

## Adım 15.3: Auth Logs

1. **Authentication** > **Logs**
2. Login denemeleri
3. Başarısız girişler
4. Token yenilemeleri

---

# BÖLÜM 16: GÜVENLIK KONTROL LİSTESİ

## Kontrol Listesi

### Environment Variables
- [ ] `.env` dosyası `.gitignore`'da
- [ ] Production `.env` Render'da ayarlandı
- [ ] `service_role` key asla frontend'de kullanılmıyor

### Row Level Security
- [ ] Tüm tablolarda RLS enabled
- [ ] Her tablo için policies tanımlı
- [ ] Cross-user data access engellenmiş

### Storage
- [ ] Bucket private (public değil)
- [ ] Folder-based isolation
- [ ] File size limits ayarlandı

### Authentication
- [ ] Email verification active (production)
- [ ] Password strength policy
- [ ] Session timeout ayarlandı

---

# BÖLÜM 17: SORUN GİDERME

## Hata: "Invalid API key"

**Çözüm:**
1. `.env` dosyasındaki key'leri kontrol edin
2. Supabase dashboard'dan tekrar kopyalayın
3. Server'ı yeniden başlatın (`npm run dev`)

---

## Hata: "Row Level Security policy violation"

**Çözüm:**
1. Supabase > **Table Editor** > Tabloyu seç > **RLS** durumunu kontrol et
2. **Policies** sekmesini incele
3. Gerekirse migration'ı tekrar çalıştır

---

## Hata: "relation does not exist"

**Çözüm:**
1. **Table Editor**'de tabloyu arayın
2. Tablolar yoksa migration'ı tekrar çalıştırın
3. Tablo isimlerinin doğru yazıldığından emin olun (küçük harf, çoğul)

---

## Hata: "Failed to upload to storage"

**Çözüm:**
1. **Storage** > **workigom-files** bucket'ının var olduğunu doğrulayın
2. **Policies** sekmesinde upload policy'si var mı kontrol edin
3. Dosya boyutunu kontrol edin (Free plan: 1GB limit)
4. Dosya formatını kontrol edin (desteklenen: jpg, png, pdf, vb.)

---

## Hata: "Authentication session missing"

**Çözüm:**
1. Login sayfasına yönlendirin
2. `localStorage.getItem('supabase.auth.token')` kontrol edin
3. Token expire olmuş olabilir - yeniden login edin

---

## Hata: Real-time subscriptions çalışmıyor

**Çözüm:**
1. **Database** > **Replication** > İlgili tabloların enabled olduğunu doğrulayın
2. RLS policies'in subscription'a izin verdiğini kontrol edin
3. Subscription kodunu console'da test edin:
   ```javascript
   supabase
     .channel('test')
     .on('postgres_changes', 
       { event: '*', schema: 'public', table: 'notifications' },
       (payload) => console.log(payload)
     )
     .subscribe()
   ```

---

# BÖLÜM 18: PERFORMANS OPTİMİZASYONU

## Adım 18.1: Index Optimizasyonu

Sık kullanılan sorguları analiz edin:

```sql
-- En çok çalışan sorguları göster
SELECT query, calls, total_time, mean_time 
FROM pg_stat_statements 
ORDER BY calls DESC 
LIMIT 10;
```

Gerekirse yeni index ekleyin:

```sql
-- Örnek: Location bazlı job araması için
CREATE INDEX idx_jobs_location ON jobs(location);
```

---

## Adım 18.2: Connection Pooling

Free plan'de:
- **Max connections:** 60
- **Pooler mode:** Transaction

Production için yeterli olmalı.

---

## Adım 18.3: Query Optimization

**İyi örnekler:**

```sql
-- ✅ Sadece gerekli kolonları seç
SELECT id, title, location FROM jobs WHERE status = 'open';

-- ✅ Index kullanılan sorgular
SELECT * FROM jobs WHERE date >= CURRENT_DATE ORDER BY date;
```

**Kötü örnekler:**

```sql
-- ❌ SELECT * kullanımı
SELECT * FROM jobs;

-- ❌ Index kullanılmayan sorgular
SELECT * FROM jobs WHERE LOWER(title) LIKE '%garson%';
```

---

# 🎉 TEBRİKLER!

Workigom uygulamanız artık Supabase ile tamamen entegre edildi!

## ✅ Tamamladıklarınız

- ✅ Supabase projesi oluşturuldu
- ✅ 6 tabloluk database schema kuruldu
- ✅ Row Level Security policies tanımlandı
- ✅ Storage bucket yapılandırıldı
- ✅ Test kullanıcıları oluşturuldu
- ✅ Authentication sistemi çalışıyor
- ✅ Real-time subscriptions aktif
- ✅ Production'a deploy edildi

---

## 🚀 Sonraki Adımlar

### Kısa Vadede (Bu Hafta)
1. [ ] Tüm sayfalarda Supabase entegrasyonunu tamamlayın
2. [ ] Mock data'dan gerçek database'e geçin
3. [ ] Error handling ekleyin
4. [ ] Loading states iyileştirin

### Orta Vadede (Bu Ay)
1. [ ] Email verification aktifleştirin
2. [ ] Social login ekleyin (Google OAuth)
3. [ ] Analytics ekleyin
4. [ ] Backup stratejisi oluşturun

### Uzun Vadede (Gelecek)
1. [ ] Paid plan'e geçin (büyüme için)
2. [ ] Custom domain ekleyin
3. [ ] CDN yapılandırın
4. [ ] Performance monitoring

---

## 📚 Ek Kaynaklar

### Dokümantasyon
- 📖 [Supabase Docs](https://supabase.com/docs)
- 📖 [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- 📖 [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- 📖 [Realtime](https://supabase.com/docs/guides/realtime)

### Video Tutorials
- 🎥 [Supabase Crash Course](https://www.youtube.com/watch?v=7uKQBl9uZ00)
- 🎥 [RLS Best Practices](https://www.youtube.com/watch?v=Ow_Uzedfohk)

### Community
- 💬 [Supabase Discord](https://discord.supabase.com)
- 💬 [GitHub Discussions](https://github.com/supabase/supabase/discussions)

---

## 🆘 Destek

Sorun yaşarsanız:

1. **Bu rehberi** tekrar gözden geçirin
2. **Console logs** kontrol edin
3. **Supabase Logs** inceleyin
4. **GitHub Issues** açın
5. **Supabase Discord** sorun

---

**Hazırladı:** AI Assistant  
**Son Güncelleme:** 2 Kasım 2025  
**Versiyon:** 1.0.0  
**Workigom x Supabase** 🚀

---

## 📝 Notlar

- Bu rehber adım adım ilerlemek için tasarlandı
- Her adımı atlamamanız önerilir
- Testleri atlamayın - sorunları erken tespit edin
- Environment variables her değişiklikte server restart gerektirir
- Production'da test kullanıcılarını silmeyi unutmayın

**İyi çalışmalar! 💪**
