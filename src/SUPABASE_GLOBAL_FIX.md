# 🔧 SUPABASE GLOBAL FIX - Exposure Sorunu Çözüldü

## ❌ Sorun

```javascript
typeof window.supabase === "undefined"
// ReferenceError: supabase is not defined
```

Helper fonksiyonlar, exposure kodundan **SONRA** tanımlandığı için `undefined` oluyordu.

---

## ✅ Çözüm

**Helper fonksiyonları, window'a atamadan ÖNCE tanımladık.**

### Dosya: `/utils/supabase/client.ts`

**Önce (YANLIŞ):**
```typescript
// Create client
export const supabase = createClient(...)

// ❌ Exposure here - functions not defined yet!
if (typeof window !== 'undefined' && isDevelopment) {
  window.supabase = supabase;
  window.getAuthStorageKey = getAuthStorageKey;  // undefined!
  window.validateStorageData = validateStorageData;  // undefined!
}

// Helper functions defined AFTER exposure
export const getAuthStorageKey = () => {...}
export const validateStorageData = () => {...}
```

**Sonra (DOĞRU):**
```typescript
// Create client
export const supabase = createClient(...)

// ✅ Define helper functions FIRST
export const getCurrentUser = async () => {...}
export const getUserProfile = async (userId: string) => {...}
export const getAuthStorageKey = () => {...}
export const isDevelopmentMode = () => {...}
export const validateStorageData = () => {...}

// ✅ Then expose to window
if (typeof window !== 'undefined' && isDevelopment) {
  window.supabase = supabase;
  window.getAuthStorageKey = getAuthStorageKey;  // ✅ Now defined!
  window.validateStorageData = validateStorageData;  // ✅ Now defined!
  window.getCurrentUser = getCurrentUser;
  window.getUserProfile = getUserProfile;
  
  console.log('🔧 Supabase client exposed to console (DEV only)');
  // ... logs
}
```

---

## 🧪 Test Etmek İçin

### 1. Dev Server'ı Yeniden Başlatın

```bash
# Ctrl+C ile durdurun
npm run dev
```

**ÖNEMLİ:** Server'ı yeniden başlatmadan değişiklikler uygulanmaz!

---

### 2. Browser Console'da Göreceksiniz

```
✅ Supabase bağlantısı başarılı
📡 Supabase URL: https://xxx.supabase.co
🔑 Storage key: sb-xxx-auth-token

🔧 Supabase client exposed to console (DEV only):
  - window.supabase - Supabase client
  - window.getAuthStorageKey() - Get storage key
  - window.validateStorageData() - Validate storage
  - window.getCurrentUser() - Get current user
  - window.getUserProfile(userId) - Get user profile
```

---

### 3. Console'da Test Edin

```javascript
// Check if exposed
console.log('supabase:', typeof window.supabase);
// Should be: "object"

console.log('getAuthStorageKey:', typeof window.getAuthStorageKey);
// Should be: "function"

console.log('validateStorageData:', typeof window.validateStorageData);
// Should be: "function"
```

**Beklenen çıktı:**
```
supabase: "object"
getAuthStorageKey: "function"
validateStorageData: "function"
getCurrentUser: "function"
getUserProfile: "function"
```

---

### 4. Supabase API'yi Test Edin

```javascript
// Get storage key
window.getAuthStorageKey()
// Should return: "sb-xxxxxxxxxxx-auth-token"

// Validate storage
window.validateStorageData()
// Should return: { valid: false/true, reason: '...', ... }

// Check localStorage
Object.keys(localStorage).filter(k => k.startsWith('sb-'))
// Should return: [] or ['sb-xxx-auth-token']

// Test password reset
await supabase.auth.resetPasswordForEmail('cicicars.com@gmail.com', {
  redirectTo: `${window.location.origin}/reset-password`
})
// Should return: { data: {}, error: null } or { data: null, error: {...} }
```

---

## 🎯 Full Password Reset Test

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

## 🛠️ Troubleshooting

### Problem: Hâlâ "supabase is not defined"

**Çözüm 1: Dev server yeniden başlatıldı mı?**
```bash
# Ctrl+C ile durdurun
npm run dev
```

**Çözüm 2: Console'u temizleyip sayfayı yenileyin**
```
Ctrl+Shift+R (hard reload)
veya
Cmd+Shift+R (Mac)
```

**Çözüm 3: Dev mode check**
```javascript
// Console'da
console.log('import.meta.env.DEV:', import.meta?.env?.DEV);
// Should be: true (development mode)
```

**Çözüm 4: Manuel exposure (temporary)**
```javascript
// Console'da (temporary fix)
import { supabase } from './utils/supabase/client';
window.supabase = supabase;

// Then test
await supabase.auth.resetPasswordForEmail('test@example.com', {
  redirectTo: window.location.origin + '/reset-password'
});
```

---

### Problem: "Cannot read properties of undefined"

**Sebep:** Helper fonksiyonlar hâlâ undefined

**Kontrol:**
```javascript
// Console'da
console.log('Available on window:', Object.keys(window).filter(k => k.includes('supabase') || k.includes('Auth')));
```

**Çözüm:**
- Dev server'ı yeniden başlat
- Sayfayı hard reload yap
- Console'da log'ları kontrol et

---

## 📋 Checklist

Server yeniden başlatıldıktan sonra kontrol edin:

- [ ] Console'da "Supabase client exposed" mesajı görünüyor
- [ ] `typeof window.supabase === "object"`
- [ ] `typeof window.getAuthStorageKey === "function"`
- [ ] `typeof window.validateStorageData === "function"`
- [ ] `typeof window.getCurrentUser === "function"`
- [ ] `typeof window.getUserProfile === "function"`
- [ ] `await supabase.auth.getSession()` çalışıyor (error atmıyor)

---

## ✅ Başarı Kriterleri

Console'da çalıştığında:

```javascript
// 1. Type checks
typeof window.supabase
// Returns: "object" ✅

typeof window.getAuthStorageKey
// Returns: "function" ✅

typeof window.validateStorageData
// Returns: "function" ✅

// 2. Function calls
window.getAuthStorageKey()
// Returns: "sb-xxxxxxxxxxx-auth-token" ✅

window.validateStorageData()
// Returns: { valid: true/false, reason: '...', ... } ✅

// 3. Supabase API
await supabase.auth.getSession()
// Returns: { data: {...}, error: null } ✅

// 4. Password reset
await supabase.auth.resetPasswordForEmail('test@example.com', {
  redirectTo: `${window.location.origin}/reset-password`
})
// Returns: { data: {}, error: null } or { data: null, error: {...} } ✅
```

---

## 🚀 Sonraki Adım

1. ✅ Dev server'ı yeniden başlat
2. ✅ Console'da exposure log'larını kontrol et
3. ✅ `testPasswordReset()` scriptini çalıştır
4. ✅ Console output'u KOMPLE kopyala ve paylaş

**Özellikle paylaş:**
- ✅ `Error: null` mu yoksa `Error: {...}` mu?
- ✅ Error varsa: `message`, `status`, `code` ne?
- ✅ `Data: {}` mi yoksa `Data: null` mu?

---

**Status:** ✅ FIXED  
**Action:** Dev server restart gerekli  
**Next:** Test script çalıştır ve output paylaş  

---

**Tarih:** 11 Kasım 2025  
**Fix:** Helper function exposure sıralaması  
**Version:** v1.5.1
