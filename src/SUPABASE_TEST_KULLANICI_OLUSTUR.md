# 👥 SUPABASE TEST KULLANICILARI OLUŞTURMA

Web sitenize giriş yapabilmek için Supabase'de test kullanıcıları oluşturmanız gerekiyor.

---

## 🚀 HIZLI YÖNTEM (Supabase Dashboard)

### 1️⃣ Supabase Dashboard'a Gidin
```
https://supabase.com/dashboard/project/nbtpolsxhhnpxsqyeduz
```

### 2️⃣ Authentication Sayfasına Gidin
- Sol menüden **Authentication** tıklayın
- **Users** sekmesine gidin

### 3️⃣ Test Kullanıcıları Ekleyin

#### **Kullanıcı 1: Bireysel Kullanıcı**
1. "Add user" → "Create new user" butonuna tıklayın
2. Formu doldurun:
   ```
   Email: individual@test.com
   Password: test123456
   Auto Confirm User: ✅ İŞARETLE (Email doğrulama olmadan)
   ```
3. "Create user" butonuna tıklayın

#### **Kullanıcı 2: Kurumsal Kullanıcı**
1. "Add user" → "Create new user" butonuna tıklayın
2. Formu doldurun:
   ```
   Email: corporate@test.com
   Password: test123456
   Auto Confirm User: ✅ İŞARETLE
   ```
3. "Create user" butonuna tıklayın

#### **Kullanıcı 3: Admin Kullanıcı**
1. "Add user" → "Create new user" butonuna tıklayın
2. Formu doldurun:
   ```
   Email: admin@test.com
   Password: admin123456
   Auto Confirm User: ✅ İŞARETLE
   ```
3. "Create user" butonuna tıklayın

---

## 📊 KULLANICI PROFILLERINI OLUŞTURMA

Kullanıcılar oluşturulduktan sonra, `users` tablosuna profil bilgilerini eklemeniz gerekiyor.

### 1️⃣ Table Editor'e Gidin
- Sol menüden **Table Editor** tıklayın
- **users** tablosunu seçin

### 2️⃣ Manuel Olarak Satır Ekleyin

#### **Bireysel Kullanıcı Profili:**
1. "Insert" → "Insert row" butonuna tıklayın
2. Formu doldurun:
   ```
   id: [Authentication'dan kopyalanan USER ID]
   email: individual@test.com
   full_name: Test Kullanıcı
   user_type: individual
   phone: +90 555 000 0001
   location: İstanbul
   created_at: [Otomatik doldurulacak]
   ```

#### **Kurumsal Kullanıcı Profili:**
1. "Insert" → "Insert row" butonuna tıklayın
2. Formu doldurun:
   ```
   id: [Authentication'dan kopyalanan USER ID]
   email: corporate@test.com
   full_name: Test Şirket
   user_type: corporate
   company_name: Test A.Ş.
   phone: +90 555 000 0002
   location: İstanbul
   created_at: [Otomatik doldurulacak]
   ```

#### **Admin Kullanıcı Profili:**
1. "Insert" → "Insert row" butonuna tıklayın
2. Formu doldurun:
   ```
   id: [Authentication'dan kopyalanan USER ID]
   email: admin@test.com
   full_name: Admin
   user_type: admin
   phone: +90 555 000 0000
   location: İstanbul
   created_at: [Otomatik doldurulacak]
   ```

---

## 🔑 USER ID NASIL KOPYALANIR?

### Yöntem 1: Authentication'dan Kopyalama
1. **Authentication** → **Users** sayfasına gidin
2. Kullanıcının üzerine tıklayın
3. **User UID** (UUID formatı) kopyalayın
   - Örnek: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

### Yöntem 2: SQL ile Otomatik
1. **SQL Editor** → **New query**
2. Aşağıdaki SQL'i çalıştırın:

```sql
-- Bireysel kullanıcı profilini oluştur
INSERT INTO users (id, email, full_name, user_type, phone, location)
SELECT 
  id,
  'individual@test.com',
  'Test Kullanıcı',
  'individual',
  '+90 555 000 0001',
  'İstanbul'
FROM auth.users
WHERE email = 'individual@test.com';

-- Kurumsal kullanıcı profilini oluştur
INSERT INTO users (id, email, full_name, user_type, company_name, phone, location)
SELECT 
  id,
  'corporate@test.com',
  'Test Şirket',
  'corporate',
  'Test A.Ş.',
  '+90 555 000 0002',
  'İstanbul'
FROM auth.users
WHERE email = 'corporate@test.com';

-- Admin kullanıcı profilini oluştur
INSERT INTO users (id, email, full_name, user_type, phone, location)
SELECT 
  id,
  'admin@test.com',
  'Admin',
  'admin',
  '+90 555 000 0000',
  'İstanbul'
FROM auth.users
WHERE email = 'admin@test.com';
```

3. **RUN** butonuna tıklayın

---

## ✅ KONTROL: KULLANICILAR BAŞARILI MI?

### 1. Authentication Kontrolü
```
Authentication → Users sayfasında 3 kullanıcı görünmeli:
✅ individual@test.com (Confirmed)
✅ corporate@test.com (Confirmed)
✅ admin@test.com (Confirmed)
```

### 2. Users Tablosu Kontrolü
```sql
-- SQL Editor'de çalıştırın:
SELECT id, email, full_name, user_type FROM users;

-- Beklenen sonuç:
3 satır dönmeli (individual, corporate, admin)
```

### 3. Giriş Testi
1. Web sitenize gidin: https://workigom-frontend1.onrender.com/
2. "Giriş Yap" butonuna tıklayın
3. Bireysel kullanıcı ile giriş yapın:
   ```
   Email: individual@test.com
   Şifre: test123456
   ```
4. ✅ "Giriş başarılı!" mesajı görmeli ve anasayfaya yönlendirilmelisiniz

---

## 🐛 SORUN GİDERME

### ❌ Hata: "User not found"
**Çözüm:**
1. Authentication → Users sayfasında kullanıcı var mı?
2. Email doğru yazılmış mı? (küçük harf!)
3. "Confirmed" durumunda mı?

### ❌ Hata: "Invalid login credentials"
**Çözüm:**
1. Şifre doğru mu? `test123456` (rakam!)
2. Email doğru mu? `individual@test.com` (@ işaretli!)
3. Auto Confirm işaretli mi?

### ❌ Hata: "Profile not found"
**Çözüm:**
1. `users` tablosunda profil var mı?
2. `id` sütunu Authentication'daki User UID ile eşleşiyor mu?
3. `user_type` doğru mu? (`individual`, `corporate`, veya `admin`)

---

## 🔐 PRODUCTION KULLANICILARI

**ÖNEMLİ:** Test kullanıcıları sadece geliştirme için!

Production (canlı yayın) için:
1. ❌ Test kullanıcılarını SİLİN
2. ✅ Gerçek kullanıcıların kayıt olmasını sağlayın
3. ✅ Email doğrulama aktif olmalı
4. ✅ Güçlü şifre politikası uygulayın

---

## 📋 ÖZET

**Oluşturulacak Kullanıcılar:**
```
1. individual@test.com / test123456 → Bireysel
2. corporate@test.com / test123456 → Kurumsal
3. admin@test.com / admin123456 → Admin
```

**Süreç:**
1. ✅ Authentication'da kullanıcı oluştur (3 adet)
2. ✅ Users tablosunda profil oluştur (3 adet)
3. ✅ Web sitesinde giriş testi yap
4. ✅ Başarılı! 🎉

---

**Sonraki adım:** `HIZLI_TEST_REHBERI.md` dosyasındaki test adımlarını takip edin!
