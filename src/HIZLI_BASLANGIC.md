# 🚀 Workigom - Hızlı Başlangıç

## ✅ İyi Haber!

Uygulamanız **zaten Supabase ile bağlantılı**! 

Supabase credentials otomatik olarak `/utils/supabase/info.tsx` dosyasından yükleniyor.

---

## 🔧 Yapmanız Gereken Tek Şey: Database Schema Kurulumu

### Adım 1: Supabase Dashboard'u Açın

1. https://supabase.com/dashboard adresine gidin
2. **Projenizi seçin** (Project ID: `rfelydfhllvwoofqlnqu`)

### Adım 2: SQL Editor'de Schema'yı Çalıştırın

1. Sol menüden **"SQL Editor"** seçeneğine tıklayın
2. **"+ New query"** butonuna tıklayın
3. `/supabase/migrations/001_initial_schema.sql` dosyasını açın
4. **Tüm SQL kodunu kopyalayın**
5. Supabase SQL Editor'e **yapıştırın**
6. **"Run"** butonuna tıklayın ▶️

✅ **Sonuç:** "Success. No rows returned" mesajı görmelisiniz

### Adım 3: Test Kullanıcıları Oluşturun

SQL Editor'de şu SQL kodunu çalıştırın:

```sql
-- Admin kullanıcısı
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password, 
  email_confirmed_at, created_at, updated_at,
  raw_user_meta_data, role, aud
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'admin@workigom.com',
  crypt('admin123', gen_salt('bf')),
  NOW(), NOW(), NOW(),
  '{"full_name": "Admin Workigom", "user_type": "admin"}'::jsonb,
  'authenticated', 'authenticated'
);

INSERT INTO public.users (id, email, user_type, full_name, phone) 
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'admin@workigom.com', 'admin', 'Admin Workigom', '+90 555 000 0001'
);

-- Bireysel kullanıcı
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_user_meta_data, role, aud
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000000',
  'individual@workigom.com',
  crypt('individual123', gen_salt('bf')),
  NOW(), NOW(), NOW(),
  '{"full_name": "Ahmet Yılmaz", "user_type": "individual"}'::jsonb,
  'authenticated', 'authenticated'
);

INSERT INTO public.users (id, email, user_type, full_name, phone)
VALUES (
  '00000000-0000-0000-0000-000000000002',
  'individual@workigom.com', 'individual', 'Ahmet Yılmaz', '+90 555 123 4567'
);

-- Kurumsal kullanıcı
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password,
  email_confirmed_at, created_at, updated_at,
  raw_user_meta_data, role, aud
) VALUES (
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000000',
  'corporate@workigom.com',
  crypt('corporate123', gen_salt('bf')),
  NOW(), NOW(), NOW(),
  '{"full_name": "ABC Teknoloji A.Ş.", "user_type": "corporate"}'::jsonb,
  'authenticated', 'authenticated'
);

INSERT INTO public.users (id, email, user_type, full_name, phone, company_name, tax_number)
VALUES (
  '00000000-0000-0000-0000-000000000003',
  'corporate@workigom.com', 'corporate', 'ABC Teknoloji',
  '+90 555 999 8888', 'ABC Teknoloji A.Ş.', '1234567890'
);
```

### Adım 4: Uygulamayı Yeniden Başlatın

Terminal'de:

```bash
# Ctrl+C ile durdurun (eğer çalışıyorsa)
npm run dev
```

### Adım 5: Giriş Yapın! 🎉

Artık şu kullanıcılarla giriş yapabilirsiniz:

| Kullanıcı Tipi | Email | Şifre |
|----------------|-------|-------|
| **Admin** | `admin@workigom.com` | `admin123` |
| **Bireysel** | `individual@workigom.com` | `individual123` |
| **Kurumsal** | `corporate@workigom.com` | `corporate123` |

---

## ❓ Sorun mu Yaşıyorsunuz?

### "Invalid API key" hatası

**Çözüm:** 
- `/utils/supabase/info.tsx` dosyasını kontrol edin
- `projectId` ve `publicAnonKey` değerleri doğru olmalı

### "relation does not exist" hatası

**Çözüm:**
- Adım 2'deki SQL migration'ı çalıştırdığınızdan emin olun
- Supabase > Table Editor'de 6 tablonun oluşturulduğunu doğrulayın:
  - users
  - jobs
  - applications
  - donations
  - notifications
  - transactions

### Login çalışmıyor

**Çözüm:**
- Adım 3'teki test kullanıcılarını oluşturduğunuzdan emin olun
- Supabase > Authentication > Users'da kullanıcıları görebilmelisiniz

---

## 📚 Daha Fazla Bilgi

- **Detaylı Kurulum:** `SUPABASE_ADIM_ADIM_REHBER.md`
- **Test Kullanıcıları:** `TEST_KULLANICI_BILGILERI.md`
- **Deployment:** `RENDER_DEPLOYMENT.md`

---

## 🎯 Özet

1. ✅ **Supabase bağlantısı zaten yapılandırılmış** (credentials otomatik)
2. 🔧 **Sadece database schema'sını kurmanız yeterli** (5 dakika)
3. 🚀 **Test kullanıcıları ile giriş yapın ve başlayın!**

**Başarılar!** 💪
