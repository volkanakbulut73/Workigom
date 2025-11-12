# 🔧 PASSWORD RESET DEBUG - recovery_sent_at null Sorunu

## ❌ Tespit Edilen Sorun

```
recovery_sent_at: null
```

Supabase veritabanında parola sıfırlama kaydı oluşturulmamış.

---

## ✅ Debug Kodu Eklendi

`/utils/supabase/auth.ts` dosyasındaki `resetPassword()` fonksiyonuna **detaylı debug logging** eklendi.

### Debug Çıktısı İçeriği:

```
🔄 [DEBUG] Starting password reset for: email@example.com
🔄 [DEBUG] Redirect URL: https://localhost:5173/reset-password

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 [DEBUG] Password Reset Response:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: email@example.com
Data: {...}
Error: {...}

ÖNEMLİ: Yukarıdaki output'u paylaşın!
```

---

## 🧪 TEST KOMUTLARI

### Seçenek 1: Browser Console'dan Test (ÖNERİLEN)

```javascript
// 1. Import auth module
import { resetPassword } from './utils/supabase/auth'

// 2. Test with your email
await resetPassword('cicicars.com@gmail.com')

// Console'da göreceksiniz:
// - Starting password reset for: cicicars.com@gmail.com
// - Redirect URL: https://...
// - Password Reset Response (data ve error)
```

---

### Seçenek 2: UI Üzerinden Test (KOLAY)

Eğer UI'da forgot password sayfası varsa:

1. Forgot password sayfasına git
2. Email gir: `cicicars.com@gmail.com`
3. "Reset Password" butonuna tıkla
4. **Hemen Console'u aç (F12)**
5. Console'daki tüm DEBUG output'u kopyala

---

### Seçenek 3: Doğrudan Console'dan Test (EN HIZLI)

Dev server çalışırken:

```javascript
// Supabase client zaten exposed
await supabase.auth.resetPasswordForEmail('cicicars.com@gmail.com', {
  redirectTo: `${window.location.origin}/reset-password`
})
```

**Çıktıyı paylaşın:**
```javascript
// Şöyle bir şey göreceksiniz:
{
  data: {},  // veya null
  error: {   // veya null
    message: "...",
    status: 400,  // veya başka bir kod
    code: "..."
  }
}
```

---

## 📋 HEMEN YAPMANIZ GEREKEN

### Adım 1: Dev Server Çalıştırın

```bash
npm run dev
```

### Adım 2: Browser Console Açın

- Chrome/Edge: `F12` veya `Ctrl+Shift+I`
- Firefox: `F12` veya `Ctrl+Shift+K`

### Adım 3: Aşağıdaki Komutu Çalıştırın

```javascript
await supabase.auth.resetPasswordForEmail('cicicars.com@gmail.com', {
  redirectTo: `${window.location.origin}/reset-password`
})
```

### Adım 4: RESPONSE'U KOPYALAYIN

Console'da göreceksiniz:

**Başarılı durumda:**
```javascript
{
  data: {},
  error: null
}
```

**Hata durumunda:**
```javascript
{
  data: { user: null, session: null },
  error: {
    message: "User not found",  // Örnek
    status: 400,
    code: "user_not_found",
    name: "AuthApiError"
  }
}
```

**→ Bu çıktının TAMAMINI buraya yapıştırın!**

---

## 🔍 Olası Senaryolar ve Çözümler

### Senaryo 1: `error: null` ama `recovery_sent_at` hâlâ null

**Anlamı:** 
- Frontend başarılı oldu
- Ama Supabase backend email gönderemedi

**Kontrol:**
```sql
-- Supabase SQL Editor'de:
SELECT 
  email,
  recovery_sent_at,
  confirmation_sent_at,
  email_confirmed_at
FROM auth.users
WHERE email = 'cicicars.com@gmail.com';
```

**Çözüm:**
- SMTP ayarları kontrol edilmeli
- Email provider (Resend, SendGrid, vb.) logs kontrol edilmeli

---

### Senaryo 2: `error.message = "User not found"`

**Anlamı:**
- Email database'de yok

**Kontrol:**
```javascript
// Console'da:
const { data, error } = await supabase
  .from('users')
  .select('email')
  .eq('email', 'cicicars.com@gmail.com')

console.log('User exists:', data)
```

**Çözüm:**
- Email doğru mu kontrol et
- Yoksa önce signup yapmalısın

---

### Senaryo 3: `error.message = "Email rate limit exceeded"`

**Anlamı:**
- Çok fazla reset isteği gönderildi
- Supabase rate limiting aktif

**Çözüm:**
- 60 dakika bekle
- Veya Supabase Dashboard → Authentication → Rate Limits kontrol et

---

### Senaryo 4: `error.status = 422` - "Email not confirmed"

**Anlamı:**
- Email henüz doğrulanmamış
- Supabase confirm_email: true gerektiriyor

**Kontrol:**
```sql
SELECT email, email_confirmed_at 
FROM auth.users 
WHERE email = 'cicicars.com@gmail.com';
```

**Çözüm:**
```sql
-- Email'i manuel onayla:
UPDATE auth.users
SET email_confirmed_at = NOW()
WHERE email = 'cicicars.com@gmail.com';
```

---

### Senaryo 5: Network Error

**Anlamı:**
- İstek Supabase'e ulaşamadı
- CORS, network, veya client hatası

**Kontrol:**
- Browser Network tab → XHR/Fetch filtresi
- `resetPasswordForEmail` isteğini bul
- Status code ve response'u kontrol et

**Çözüm:**
- Supabase URL doğru mu kontrol et
- API key geçerli mi kontrol et

---

## 🌐 Network Tab İncelemesi

### Adım 1: Network Tab'ı Aç

1. F12 → Network tab
2. "Preserve log" işaretle
3. "Fetch/XHR" filtresi seç

### Adım 2: Reset Password İsteği Yap

```javascript
await supabase.auth.resetPasswordForEmail('cicicars.com@gmail.com', {
  redirectTo: `${window.location.origin}/reset-password`
})
```

### Adım 3: İsteği Bul

Network tab'da ara: `recovery` veya `resetPasswordForEmail`

### Adım 4: İncele

**Request:**
- Method: POST
- URL: `https://[project-id].supabase.co/auth/v1/recover`
- Headers:
  - `apikey: [your-anon-key]`
  - `Content-Type: application/json`
- Body:
  ```json
  {
    "email": "cicicars.com@gmail.com",
    "gotrue_meta_security": {}
  }
  ```

**Response:**
- Status: `200` (başarılı) veya `400` (hata)
- Body:
  ```json
  {} 
  // veya
  { "error": "...", "error_description": "..." }
  ```

**→ Request ve Response body'sini paylaşın!**

---

## 🔧 Hızlı Test Script

Console'a yapıştırın:

```javascript
// FULL DEBUG TEST
async function testPasswordReset(email) {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧪 PASSWORD RESET TEST');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  // 1. Check if user exists
  console.log('\n1️⃣ Checking if user exists...');
  const { data: users, error: userError } = await supabase
    .from('users')
    .select('email, user_type')
    .eq('email', email);
  
  if (userError) {
    console.error('❌ Error checking user:', userError);
  } else if (!users || users.length === 0) {
    console.error('❌ User not found in users table');
  } else {
    console.log('✅ User found:', users[0]);
  }
  
  // 2. Check auth.users
  console.log('\n2️⃣ Checking auth.users...');
  console.log('(SQL kontrol gerekli - Dashboard\'dan kontrol edin)');
  
  // 3. Send reset email
  console.log('\n3️⃣ Sending password reset email...');
  const start = performance.now();
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`
  });
  
  const duration = performance.now() - start;
  
  console.log('\n📊 RESPONSE:');
  console.log('  Duration:', Math.round(duration), 'ms');
  console.log('  Data:', data);
  console.log('  Error:', error);
  
  if (error) {
    console.error('\n❌ ERROR DETAILS:');
    console.error('  Message:', error.message);
    console.error('  Status:', error.status);
    console.error('  Code:', error.code);
    console.error('  Name:', error.name);
    console.error('  Full error:', JSON.stringify(error, null, 2));
  } else {
    console.log('\n✅ SUCCESS - Request accepted by Supabase');
    console.log('  Response data:', JSON.stringify(data, null, 2));
    
    console.log('\n4️⃣ Next step: Check SQL for recovery_sent_at');
    console.log('  Run in Supabase SQL Editor:');
    console.log('  SELECT email, recovery_sent_at FROM auth.users WHERE email =', `'${email}'`);
  }
  
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  
  return { data, error };
}

// RUN TEST
await testPasswordReset('cicicars.com@gmail.com');
```

**→ Bu script'in KOMPLE çıktısını paylaşın!**

---

## 📝 SQL Kontrol Komutları

Supabase Dashboard → SQL Editor'de çalıştırın:

### 1. User Detayları
```sql
SELECT 
  email,
  email_confirmed_at,
  confirmation_sent_at,
  recovery_sent_at,
  last_sign_in_at,
  created_at,
  updated_at
FROM auth.users
WHERE email = 'cicicars.com@gmail.com';
```

### 2. Recent Reset Attempts (varsa)
```sql
-- Not: Bu tablo Supabase'de standart değil, varsa bakmak için:
SELECT * FROM auth.audit_log_entries
WHERE created_at > NOW() - INTERVAL '1 hour'
  AND payload->>'email' = 'cicicars.com@gmail.com'
ORDER BY created_at DESC
LIMIT 10;
```

### 3. Rate Limiting Check
```sql
-- Son 1 saatte kaç reset isteği yapıldı?
SELECT 
  COUNT(*) as reset_count,
  MAX(recovery_sent_at) as last_reset
FROM auth.users
WHERE email = 'cicicars.com@gmail.com';
```

---

## 🎯 BİR SONRAKİ ADIM

**Lütfen aşağıdakilerden BİRİNİ yapın:**

### Seçenek A (ÖNERİLEN): Console Test
```javascript
// 1. Dev server çalıştır
// 2. Console aç (F12)
// 3. Yukarıdaki testPasswordReset() script'ini yapıştır ve çalıştır
// 4. KOMPLE OUTPUT'U buraya yapıştır
```

### Seçenek B: Network Tab
```
1. Network tab aç
2. Password reset yap
3. "recover" isteğini bul
4. Request ve Response'u screenshot veya text olarak paylaş
```

### Seçenek C: SQL Kontrol
```sql
-- Supabase SQL Editor'de:
SELECT 
  email,
  email_confirmed_at,
  recovery_sent_at
FROM auth.users
WHERE email = 'cicicars.com@gmail.com';

-- Sonucu buraya yapıştır
```

---

## 🔍 Hangi Bilgileri Paylaşmalısınız

### ZORUNLU:
- ✅ Console'daki DEBUG output (error object dahil)
- ✅ `recovery_sent_at` değeri (SQL'den)

### İSTEĞE BAĞLI (ama çok yardımcı):
- ✅ Network tab'daki request/response
- ✅ `email_confirmed_at` değeri
- ✅ Supabase project ID (ilk 8 karakter yeterli)
- ✅ SMTP provider (Resend, SendGrid, vb.)

---

## ⚠️ GİZLİLİK NOTU

Paylaşırken:
- ❌ API key'leri REDACTEDİ yapın
- ❌ Token'ları kırpın  
- ✅ Error message'ları tam bırakın
- ✅ Status code'ları paylaşın

---

**Status:** ✅ Debug kodu eklendi  
**Next:** Console test ve output paylaşımı  
**Goal:** `recovery_sent_at` null sorununu çözmek  

---

**Test Script Hazır!** 🚀  
Yukarıdaki `testPasswordReset()` fonksiyonunu console'a yapıştırıp çalıştırın ve çıktıyı paylaşın!
