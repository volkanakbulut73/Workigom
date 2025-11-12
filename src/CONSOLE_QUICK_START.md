# 🚀 CONSOLE QUICK START

## Browser Console'dan Hızlı Test Komutları

Development modunda, tarayıcı console'undan doğrudan test yapabilirsiniz.

---

## ⚠️ Önemli Notlar

1. **Bu özellikler sadece DEVELOPMENT modunda çalışır**
2. Production build'de otomatik olarak devre dışı kalır
3. Sayfayı yenilediğinizde console'u tekrar açmanız gerekebilir

---

## 📋 Mevcut Komutlar

Sayfayı açtığınızda console'da şunu göreceksiniz:

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

🔧 Auth debug tools available (DEV only):
  - window.debugAuth() - Full auth debug
  - window.debugSession() - Check session state
  - window.debugLocalStorage() - Check localStorage
  - window.clearAuthData() - Clear all auth data
```

---

## 1. 🔍 Temel Kontroller

### Check if localStorage has auth data
```javascript
Object.keys(localStorage).filter(k => k.startsWith('sb-'))
```

**Beklenen çıktı (giriş yapılmışsa):**
```javascript
['sb-xxxxxxxxxxx-auth-token']
```

**Beklenen çıktı (giriş yapılmamışsa):**
```javascript
[]
```

---

### Get current storage key
```javascript
window.getAuthStorageKey()
```

**Çıktı:**
```javascript
'sb-xxxxxxxxxxx-auth-token'
```

---

### Validate storage data
```javascript
window.validateStorageData()
```

**Çıktı (giriş yapılmışsa):**
```javascript
{
  valid: true,
  reason: 'Valid',
  key: 'sb-xxxxxxxxxxx-auth-token',
  data: {
    hasAccessToken: true,
    hasRefreshToken: true,
    hasUser: true,
    expiresAt: 1699999999
  }
}
```

**Çıktı (giriş yapılmamışsa):**
```javascript
{
  valid: false,
  reason: 'No data found',
  key: 'sb-xxxxxxxxxxx-auth-token'
}
```

---

## 2. 🔐 Auth İşlemleri

### Sign In
```javascript
await supabase.auth.signInWithPassword({
  email: 'your-email@example.com',
  password: 'your-password'
})
```

**Başarılı çıktı:**
```javascript
{
  data: {
    user: { id: 'xxx', email: 'your-email@example.com', ... },
    session: { access_token: 'xxx', ... }
  },
  error: null
}
```

**Hatalı çıktı:**
```javascript
{
  data: { user: null, session: null },
  error: { message: 'Invalid login credentials', ... }
}
```

---

### Get Current Session
```javascript
await supabase.auth.getSession()
```

**Çıktı (giriş yapılmışsa):**
```javascript
{
  data: {
    session: {
      access_token: 'eyJhbGci...',
      refresh_token: 'xxx',
      expires_at: 1699999999,
      user: { id: 'xxx', email: 'xxx', ... }
    }
  },
  error: null
}
```

---

### Get Current User
```javascript
await window.getCurrentUser()
```

**Çıktı (giriş yapılmışsa):**
```javascript
{
  id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  email: 'your-email@example.com',
  user_metadata: { ... },
  ...
}
```

**Çıktı (giriş yapılmamışsa):**
```javascript
null
```

---

### Sign Out
```javascript
await supabase.auth.signOut()
```

**Çıktı:**
```javascript
{ error: null }
```

**Ardından kontrol edin:**
```javascript
Object.keys(localStorage).filter(k => k.startsWith('sb-'))
// Should be: []
```

---

## 3. 👤 User Profile İşlemleri

### Get User Profile
```javascript
// First get current user
const user = await window.getCurrentUser()

// Then get profile
const profile = await window.getUserProfile(user.id)
console.log(profile)
```

**Çıktı:**
```javascript
{
  id: 'xxx',
  email: 'your-email@example.com',
  full_name: 'Your Name',
  phone: '+90...',
  user_type: 'individual' | 'corporate' | 'admin',
  company_name: null | 'Company Name',
  tax_number: null | 'Tax Number',
  address: null | 'Address',
  created_at: '2025-11-11T...',
  updated_at: '2025-11-11T...'
}
```

---

### Query Users Table Directly
```javascript
// Get all users (admin only in production!)
const { data, error } = await supabase
  .from('users')
  .select('*')

console.log('Users:', data)
```

---

### Get Specific User by Email
```javascript
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('email', 'user@example.com')
  .single()

console.log('User:', data)
```

---

## 4. 🧪 Debug Komutları

### Full Auth Debug
```javascript
await window.debugAuth()
```

**Çıktı:** (console'da grouped output)
```
🚀 Starting full auth debug...

🔍 LocalStorage Debug
Expected key: sb-xxxxxxxxxxx-auth-token
📊 Storage validation: { valid: true, ... }
📋 All localStorage keys:
  - sb-xxxxxxxxxxx-auth-token
    ✅ Found auth data: { ... }

🔍 Session Debug
✅ Active session found:
  User ID: xxx
  Email: xxx
  Token expires at: ...
  Token expires in: 45 minutes
✅ User verified with backend:
  ...

✅ Auth debug complete
```

---

### Debug Session Only
```javascript
await window.debugSession()
```

---

### Debug LocalStorage Only
```javascript
window.debugLocalStorage()
```

---

### Clear All Auth Data
```javascript
await window.clearAuthData()
```

**Bu komut:**
1. Supabase'den sign out yapar
2. localStorage'daki auth key'leri temizler
3. Konsola detaylı log yazdırır

---

## 5. 🔬 Advanced Queries

### Check User Type
```javascript
const user = await window.getCurrentUser()
if (!user) {
  console.log('Not logged in')
} else {
  const profile = await window.getUserProfile(user.id)
  console.log('User type:', profile.user_type)
}
```

---

### Check if Admin
```javascript
const user = await window.getCurrentUser()
if (user?.email === 'cicicars.com@gmail.com') {
  console.log('✅ Admin user')
} else {
  console.log('❌ Not admin')
}
```

---

### Get All Job Postings
```javascript
const { data, error } = await supabase
  .from('job_postings')
  .select('*')
  .order('created_at', { ascending: false })

console.log('Jobs:', data)
```

---

### Get User's Applications
```javascript
const user = await window.getCurrentUser()
if (user) {
  const { data, error } = await supabase
    .from('applications')
    .select('*, job_postings(*)')
    .eq('user_id', user.id)
  
  console.log('My applications:', data)
}
```

---

## 6. 🛠️ Troubleshooting

### Problem: "supabase is not defined"

**Çözüm:**
```javascript
// Check if running in development
console.log('DEV mode:', import.meta.env?.DEV)

// If undefined, dev server may not be running
// Restart dev server: npm run dev
```

---

### Problem: No auth data in localStorage

**Kontrol:**
```javascript
// 1. Check storage key
window.getAuthStorageKey()

// 2. Check if empty
Object.keys(localStorage).filter(k => k.startsWith('sb-'))

// 3. Try login
await supabase.auth.signInWithPassword({
  email: 'test@example.com',
  password: 'password'
})

// 4. Check again
Object.keys(localStorage).filter(k => k.startsWith('sb-'))
```

---

### Problem: "Invalid login credentials"

**Kontrol:**
```javascript
// 1. Check if user exists in database
const { data, error } = await supabase
  .from('users')
  .select('email')
  .eq('email', 'your-email@example.com')

console.log('User exists:', !!data?.[0])

// 2. If not exists, sign up first
// (Use UI or check signup documentation)
```

---

### Problem: Session exists but profile not loading

**Kontrol:**
```javascript
const user = await window.getCurrentUser()
console.log('User:', user)

if (user) {
  // Check if profile exists
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
  
  console.log('Profile:', data)
  console.log('Error:', error)
}
```

---

## 7. ⚡ Quick One-Liners

```javascript
// Check login status
!!(await supabase.auth.getSession()).data.session ? '✅ Logged in' : '❌ Not logged in'

// Get current email
(await supabase.auth.getSession()).data.session?.user.email || 'Not logged in'

// Get user type
(await window.getUserProfile((await window.getCurrentUser())?.id))?.user_type || 'Not logged in'

// Check if storage is valid
window.validateStorageData().valid ? '✅ Valid' : '❌ Invalid'

// Count localStorage auth keys
Object.keys(localStorage).filter(k => k.startsWith('sb-')).length

// Time until token expires (minutes)
Math.round(((await supabase.auth.getSession()).data.session?.expires_at * 1000 - Date.now()) / 1000 / 60)
```

---

## 8. 📝 Common Workflows

### Fresh Login Test
```javascript
// 1. Clear everything
await window.clearAuthData()

// 2. Wait a bit
await new Promise(r => setTimeout(r, 1000))

// 3. Login
await supabase.auth.signInWithPassword({
  email: 'your-email@example.com',
  password: 'your-password'
})

// 4. Verify
await window.debugAuth()
```

---

### Session Persistence Test
```javascript
// 1. Check before reload
const before = await supabase.auth.getSession()
console.log('Before reload:', before.data.session?.user.email)

// 2. Reload page (Ctrl+R or Cmd+R)

// 3. Check after reload
const after = await supabase.auth.getSession()
console.log('After reload:', after.data.session?.user.email)

// Should be same email
```

---

### Profile Update Test
```javascript
const user = await window.getCurrentUser()

// Update profile
const { error } = await supabase
  .from('users')
  .update({ phone: '+905551234567' })
  .eq('id', user.id)

// Verify
const profile = await window.getUserProfile(user.id)
console.log('Updated phone:', profile.phone)
```

---

## 🎯 Production Notları

**Önemli:** Production'da bu komutlar çalışmaz!

Console'da göreceksiniz:
```
ℹ️ Auth debug tools disabled in production
```

**Production'da kullanmak için:**
- Normal UI akışını kullanın
- Backend API'leri kullanın
- Client-side console komutları yerine server logs kontrol edin

---

## ✅ Checklist

### Development Mode Check
- [ ] Console'da "Supabase client exposed" mesajı görünüyor
- [ ] `window.supabase` tanımlı
- [ ] `window.debugAuth` tanımlı
- [ ] `Object.keys(localStorage).filter(k => k.startsWith('sb-'))` çalışıyor

### After Login Check
- [ ] localStorage'da `sb-xxx-auth-token` var
- [ ] `window.validateStorageData().valid === true`
- [ ] `await window.getCurrentUser()` user döndürüyor
- [ ] `await window.debugSession()` session gösteriyor

### After Reload Check
- [ ] Session hala aktif
- [ ] localStorage'da key hala var
- [ ] `await window.getCurrentUser()` hala user döndürüyor

---

**Development:** ✅ Ready  
**Testing:** ✅ Easy  
**Debugging:** ✅ Comprehensive  
**Production:** ✅ Safe (auto-disabled)
