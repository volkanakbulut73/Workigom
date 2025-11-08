# 🚨 SIGNUP HATALARI ÇÖZÜMÜ

## ❌ HATALAR:

```
1. Email address "ahmet@gmail.com" is invalid
2. new row violates row-level security policy for table "users"
```

---

## ✅ ÇÖZÜM UYGULANDI!

### 🛠️ YAPILAN DEĞİŞİKLİKLER:

1. **✅ RLS Policy Eklendi** (`001_initial_schema.sql`)
   - `users` tablosuna INSERT policy eklendi
   - Artık kullanıcılar kendi profillerini oluşturabilir

2. **✅ AuthContext Güncellendi** (`AuthContext.tsx`)
   - Email confirmation hatası için ek logging eklendi
   - Hata mesajları daha detaylı

3. **✅ Yeni Migration Oluşturuldu** (`003_fix_auth_policies.sql`)
   - Users INSERT policy
   - Users görünürlük policy'leri
   - Menu shares görünürlük policy'leri
   - Admin policy'leri

---

## 🔧 SUPABASE'DE YAPILMASI GEREKENLER:

### **ADIM 1: Migration'ları Çalıştır**

Supabase Dashboard'a git ve SQL Editor'de şu dosyaları çalıştır:

1. `001_initial_schema.sql` (güncellenmiş versiyon)
2. `002_additional_features.sql`
3. `003_fix_auth_policies.sql` (YENİ!)

### **ADIM 2: Email Confirmation'ı Kapat**

**Yöntem 1: Supabase Dashboard**
```
1. Authentication > Settings
2. "Email confirmations" bölümünü bul
3. "Enable email confirmations" ayarını KAPAT
```

**Yöntem 2: Supabase CLI**
```bash
supabase settings update auth \
  --enable-signup=true \
  --mailer-autoconfirm=true
```

### **ADIM 3: Auth Ayarlarını Kontrol Et**

```
Authentication > Settings > Email Auth
✅ Enable sign ups: AÇIK
✅ Confirm email: KAPALI
✅ Secure email change: İSTEĞE BAĞLI
```

---

## 🧪 TEST ET:

### **Test Kullanıcısı Oluştur:**

```javascript
Email: test@example.com
Password: Test123456!
Ad Soyad: Test Kullanıcı
Telefon: 05551234567
Kullanıcı Tipi: individual
```

### **Console'da Kontrol Et:**

```javascript
// Başarılı signup:
✅ User created successfully: [user-id]
✅ Profile created successfully

// Hatalı signup:
❌ Auth signup error: [hata detayı]
❌ Profile creation error: [hata detayı]
```

---

## 🎯 SORUN ÇÖZÜLDÜ MÜ?

### **✅ EVET ise:**
- Kullanıcı kayıt olabilir
- Profil oluşturulur
- Giriş yapılır
- Her şey çalışır! 🎉

### **❌ HAYIR ise:**

#### **Email Invalid Hatası Devam Ediyorsa:**

1. **Supabase Dashboard'da kontrol et:**
   ```
   Authentication > Settings > Email Provider
   - "Use custom SMTP" kapalı olmalı
   - "Mailer Autoconfirm" açık olmalı
   ```

2. **Environment Variables'ı kontrol et:**
   ```bash
   # .env dosyasında
   SUPABASE_URL=https://[project-id].supabase.co
   SUPABASE_ANON_KEY=[anon-key]
   ```

3. **Manuel email confirmation kapat:**
   ```sql
   -- Supabase SQL Editor'de çalıştır
   ALTER DATABASE postgres SET "app.settings.auth.enable_signup" = 'true';
   ALTER DATABASE postgres SET "app.settings.auth.mailer_autoconfirm" = 'true';
   ```

#### **RLS Policy Hatası Devam Ediyorsa:**

1. **Policy'leri kontrol et:**
   ```sql
   -- Supabase SQL Editor'de çalıştır
   SELECT * FROM pg_policies WHERE tablename = 'users';
   ```

2. **Geçici olarak RLS'yi kapat (SADECE TEST İÇİN!):**
   ```sql
   -- UYARI: Production'da kullanma!
   ALTER TABLE users DISABLE ROW LEVEL SECURITY;
   ```

3. **Policy'leri yeniden oluştur:**
   ```sql
   -- Tüm user policy'lerini sil
   DROP POLICY IF EXISTS "Users can view their own profile" ON users;
   DROP POLICY IF EXISTS "Users can update their own profile" ON users;
   DROP POLICY IF EXISTS "Users can insert their own profile during signup" ON users;
   
   -- Tekrar oluştur (003_fix_auth_policies.sql dosyasından)
   ```

---

## 📞 DESTEK:

Sorun devam ediyorsa:

1. **Console loglarını kontrol et** (F12 > Console)
2. **Network tab'ı kontrol et** (F12 > Network)
3. **Supabase logs'u kontrol et** (Dashboard > Logs)

**Hata mesajlarını tam olarak kopyala ve paylaş!**

---

## ✅ CHECKLIST:

- [ ] Migration dosyaları çalıştırıldı
- [ ] Email confirmation kapatıldı
- [ ] RLS policies oluşturuldu
- [ ] Test kullanıcısı oluşturuldu
- [ ] Signup başarılı
- [ ] Login başarılı
- [ ] Her şey çalışıyor! 🎉
