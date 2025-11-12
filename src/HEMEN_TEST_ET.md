# ⚡ HEMEN TEST ET - 30 Saniye

## 🚀 Hızlı Test (Console'dan)

### 1. Dev Server Başlat (eğer çalışmıyorsa)

```bash
npm run dev
```

### 2. Browser Aç

```
http://localhost:5173
```

### 3. Console Aç (F12)

### 4. Bu Kodu Yapıştır ve Çalıştır

```javascript
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

---

## 📋 BEKLENTİLER

### Başarılı Çıktı:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 PASSWORD RESET TEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ Checking if user exists...
✅ User found: { email: 'cicicars.com@gmail.com', user_type: 'admin' }

2️⃣ Checking auth.users...
(SQL kontrol gerekli - Dashboard'dan kontrol edin)

3️⃣ Sending password reset email...

📊 RESPONSE:
  Duration: 234 ms
  Data: {}
  Error: null

✅ SUCCESS - Request accepted by Supabase
  Response data: {}

4️⃣ Next step: Check SQL for recovery_sent_at
  Run in Supabase SQL Editor:
  SELECT email, recovery_sent_at FROM auth.users WHERE email = 'cicicars.com@gmail.com'

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Hatalı Çıktı (Örnek):

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧪 PASSWORD RESET TEST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1️⃣ Checking if user exists...
✅ User found: { email: 'cicicars.com@gmail.com', user_type: 'admin' }

2️⃣ Checking auth.users...
(SQL kontrol gerekli - Dashboard'dan kontrol edin)

3️⃣ Sending password reset email...

📊 RESPONSE:
  Duration: 234 ms
  Data: null
  Error: {
    message: "User not found",
    status: 400,
    code: "user_not_found"
  }

❌ ERROR DETAILS:
  Message: User not found
  Status: 400
  Code: user_not_found
  Name: AuthApiError
  Full error: {
    "message": "User not found",
    "status": 400,
    "code": "user_not_found",
    "name": "AuthApiError"
  }

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## 🎯 Sonraki Adım

### Console çıktısını KOMPLE KOPYALAYIN ve paylaşın!

**Özellikle:**
- ✅ `Error: null` mu yoksa `Error: {...}` mu?
- ✅ `Data: {}` mi yoksa `Data: null` mu?
- ✅ Error varsa: `message`, `status`, `code` nedir?

---

## 🔍 SQL Kontrol (İsteğe Bağlı)

Supabase Dashboard → SQL Editor:

```sql
SELECT 
  email,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at
FROM auth.users
WHERE email = 'cicicars.com@gmail.com';
```

**Sonuç örneği:**

```
email                  | email_confirmed_at      | recovery_sent_at | last_sign_in_at
-----------------------|------------------------|------------------|------------------
cicicars.com@gmail.com | 2025-11-11 10:00:00    | null             | 2025-11-11 10:30:00
```

→ Bu tabloyu da paylaşın (opsiyonel ama çok yardımcı!)

---

## ✅ Checklist

- [ ] Dev server çalışıyor
- [ ] Console açık (F12)
- [ ] Test script yapıştırıldı ve çalıştırıldı
- [ ] Console output kopyalandı
- [ ] Output buraya yapıştırıldı

---

**Süre:** ~30 saniye  
**Zorluk:** Çok kolay (copy-paste)  
**Sonuç:** Hatanın tam sebebini öğreneceğiz!

🚀 **Şimdi test edin ve çıktıyı paylaşın!**
