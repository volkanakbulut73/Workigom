# 🧪 AUTH TEST KOMUTLARI

## 📋 Kopyala-Yapıştır Test Komutları

Bu komutları browser console'da çalıştırarak authentication akışını test edebilirsiniz.

---

## 1. 🔍 Debug Komutları (Development Only)

### Full Auth Debug
Tüm auth durumunu kontrol eder (localStorage + session + user verification).

```javascript
await window.debugAuth()
```

**Beklenen Output:**
```
🚀 Starting full auth debug...

🔍 LocalStorage Debug
Expected key: sb-xxxxxxxxxxx-auth-token

📋 All localStorage keys:
  - sb-xxxxxxxxxxx-auth-token
    ✅ Found auth data: {
      hasAccessToken: true,
      hasRefreshToken: true,
      expiresAt: 1699999999,
      user: 'user@example.com'
    }

🔍 Session Debug
✅ Active session found:
  User ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  Email: user@example.com
  Token expires at: 11/12/2025, 3:00:00 PM
  Token expires in: 45 minutes

✅ User verified with backend:
  User ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  Email: user@example.com

✅ Auth debug complete
```

---

### Session Check Only
Sadece session durumunu kontrol eder.

```javascript
await window.debugSession()
```

**Beklenen Output (Session Var):**
```
🔍 Session Debug
✅ Active session found:
  User ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  Email: user@example.com
  Token expires at: 11/12/2025, 3:00:00 PM
  Token expires in: 45 minutes

✅ User verified with backend:
  User ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  Email: user@example.com
```

**Beklenen Output (Session Yok):**
```
🔍 Session Debug
ℹ️ No active session
ℹ️ No user verified
```

---

### LocalStorage Check
localStorage'daki auth key'lerini listeler.

```javascript
window.debugLocalStorage()
```

**Beklenen Output:**
```
🔍 LocalStorage Debug
Expected key: sb-xxxxxxxxxxx-auth-token

📋 All localStorage keys:
  - sb-xxxxxxxxxxx-auth-token
    ✅ Found auth data: {
      hasAccessToken: true,
      hasRefreshToken: true,
      expiresAt: 1699999999,
      user: 'user@example.com'
    }
  - theme
  - other-app-data
```

---

### Clear Auth Data
Tüm auth data'yı temizler (logout + localStorage clear).

```javascript
await window.clearAuthData()
```

**Beklenen Output:**
```
🧹 Clearing all auth data...
  ✅ Supabase signOut complete
  Removed: sb-xxxxxxxxxxx-auth-token
✅ Auth data cleared
```

**Sonrası:**
- Session sonlanır
- localStorage temizlenir
- Landing page'e yönlendirilir

---

## 2. 🧪 Test Senaryoları

### Test 1: Fresh Login (Yeni Giriş)

```javascript
// 1. Clear all auth data
await window.clearAuthData()

// 2. Reload page
location.reload()

// 3. Login via UI (or manually)
// Email: your-email@example.com
// Password: your-password

// 4. Check console for:
// ✅ "Auth state changed: SIGNED_IN"
// ✅ "User signed in: xxx"

// 5. Verify localStorage
window.debugLocalStorage()
// ✅ Should show sb-xxx-auth-token with data
```

---

### Test 2: Session Persistence (Oturum Kalıcılığı)

```javascript
// 1. Login first
// (use UI to login)

// 2. Check session
await window.debugSession()
// ✅ Should show active session

// 3. Reload page
location.reload()

// 4. Check console for:
// ✅ "Session found: xxx"

// 5. Check session again
await window.debugSession()
// ✅ Should still show active session (no re-login needed)
```

---

### Test 3: Token Expiry Check

```javascript
// Check when token expires
await window.debugSession()

// Look for:
// Token expires at: [date/time]
// Token expires in: [minutes]

// If < 5 minutes, token should auto-refresh soon
```

---

### Test 4: Logout

```javascript
// 1. Check session before logout
await window.debugSession()
// ✅ Should show active session

// 2. Click logout button in UI

// 3. Check console for:
// ✅ "Auth state changed: SIGNED_OUT"
// ✅ "User signed out"

// 4. Verify localStorage is cleared
window.debugLocalStorage()
// ✅ Should NOT show sb-xxx-auth-token

// 5. Check session
await window.debugSession()
// ✅ Should show "No active session"
```

---

### Test 5: Token Refresh (Auto)

```javascript
// 1. Login and wait ~55 minutes (or set shorter expiry in Supabase)

// 2. Watch console for:
// ✅ "Auth state changed: TOKEN_REFRESHED"
// ✅ "Token refreshed"

// 3. Verify token updated
await window.debugSession()
// ✅ "Token expires in" should be reset to ~60 minutes
```

---

## 3. 📊 Manual LocalStorage Inspection

### Check Storage Key
```javascript
// Get expected key
const projectId = 'your-project-id' // From info.tsx
const expectedKey = `sb-${projectId}-auth-token`
console.log('Expected key:', expectedKey)

// Check if exists
const exists = localStorage.getItem(expectedKey) !== null
console.log('Key exists:', exists)
```

---

### Read Auth Data
```javascript
const projectId = 'your-project-id'
const key = `sb-${projectId}-auth-token`
const data = localStorage.getItem(key)

if (data) {
  const parsed = JSON.parse(data)
  console.log('Auth data:', {
    hasAccessToken: !!parsed.access_token,
    hasRefreshToken: !!parsed.refresh_token,
    email: parsed.user?.email,
    expiresAt: new Date(parsed.expires_at * 1000).toLocaleString()
  })
} else {
  console.log('No auth data found')
}
```

---

### Manual Clear (Specific Key)
```javascript
const projectId = 'your-project-id'
const key = `sb-${projectId}-auth-token`
localStorage.removeItem(key)
console.log('Removed:', key)
location.reload()
```

---

### Clear All Supabase Keys
```javascript
// Find all Supabase keys
const supabaseKeys = []
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i)
  if (key && key.startsWith('sb-')) {
    supabaseKeys.push(key)
  }
}

// Remove all
supabaseKeys.forEach(key => {
  localStorage.removeItem(key)
  console.log('Removed:', key)
})

console.log(`Cleared ${supabaseKeys.length} Supabase keys`)
location.reload()
```

---

## 4. 🔧 Troubleshooting Commands

### Problem: "Token not found" Error

```javascript
// 1. Check if key exists
await window.debugLocalStorage()

// 2. Check session
await window.debugSession()

// 3. If no session but token exists, clear and re-login
await window.clearAuthData()
location.reload()
```

---

### Problem: "Can't fetch profile" Error

```javascript
// 1. Check if user exists but profile missing
await window.debugSession()
// Look at user ID

// 2. Check console for profile fetch errors
// Should see: "Error fetching profile: ..."

// 3. Verify user_id exists in users table (via Supabase dashboard)
```

---

### Problem: Multiple Logins Creating Duplicate Sessions

```javascript
// Clear all sessions and re-login
await window.clearAuthData()

// Wait 2 seconds
await new Promise(resolve => setTimeout(resolve, 2000))

// Check completely cleared
await window.debugAuth()
// Should show: "No active session"

// Now login via UI
```

---

### Problem: Token Not Refreshing

```javascript
// 1. Check current expiry
await window.debugSession()
// Note "Token expires in: X minutes"

// 2. Wait until < 5 minutes remaining

// 3. Watch console for refresh
// Should see: "Auth state changed: TOKEN_REFRESHED"

// 4. If no refresh, check Supabase settings:
// - Auth > Settings > JWT expiry should be enabled
// - autoRefreshToken should be true in client config
```

---

## 5. 🎯 Production Check

⚠️ **Debug tools are disabled in production!**

If you see this in console:
```
ℹ️ Auth debug tools disabled in production
```

This is expected and correct for security.

### Production Manual Check

```javascript
// Check if localStorage has auth token
const hasAuth = Object.keys(localStorage).some(key => 
  key.startsWith('sb-') && key.includes('-auth-token')
)
console.log('Has auth token:', hasAuth)

// Check if page requires auth
const currentPath = window.location.pathname
const isProtectedRoute = !['/'].includes(currentPath)
console.log('Is protected route:', isProtectedRoute)
console.log('Has auth:', hasAuth)
console.log('Access allowed:', !isProtectedRoute || hasAuth)
```

---

## 6. 📝 Quick Reference

### Development Commands
```javascript
// Full debug
await window.debugAuth()

// Session only
await window.debugSession()

// Storage only
window.debugLocalStorage()

// Clear all
await window.clearAuthData()
```

### Manual Commands (Work in Production)
```javascript
// Check auth token exists
!!Object.keys(localStorage).find(k => k.includes('sb-') && k.includes('-auth-token'))

// Clear localStorage
localStorage.clear()

// Reload
location.reload()
```

---

## 7. 🚨 Emergency Commands

### Complete Reset (Nuclear Option)
```javascript
// 1. Clear ALL localStorage
localStorage.clear()

// 2. Clear ALL sessionStorage
sessionStorage.clear()

// 3. Clear cookies (if any)
document.cookie.split(";").forEach(c => {
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
})

// 4. Reload
location.reload()
```

---

## 8. ✅ Expected Console Output (Normal Flow)

### App Start (With Session)
```
✅ Supabase bağlantısı başarılı
📡 Supabase URL: https://xxx.supabase.co
🔑 Storage key: sb-xxx-auth-token (DEV only)
🔧 Auth debug tools available (DEV only):
  - window.debugAuth() - Full auth debug
  - window.debugSession() - Check session state
  - window.debugLocalStorage() - Check localStorage
  - window.clearAuthData() - Clear all auth data
✅ Session found: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### App Start (No Session)
```
✅ Supabase bağlantısı başarılı
📡 Supabase URL: https://xxx.supabase.co
🔑 Storage key: sb-xxx-auth-token (DEV only)
🔧 Auth debug tools available (DEV only):
  ...
ℹ️ No active session
```

### Login Flow
```
🔄 Auth state changed: SIGNED_IN
✅ User signed in: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

### Logout Flow
```
🔄 Auth state changed: SIGNED_OUT
👋 User signed out
```

### Token Refresh
```
🔄 Auth state changed: TOKEN_REFRESHED
🔄 Token refreshed
```

---

## 📌 Notes

1. **Debug tools** sadece development mode'da çalışır (`import.meta.env.DEV`)
2. **Production'da** debug tools disable edilmiştir (güvenlik)
3. **clearAuthData** hem Supabase signOut hem de localStorage clear yapar
4. **Token refresh** otomatik olarak ~5 dakika kala gerçekleşir
5. **Session persistence** sayfa yenilemeye dayanıklıdır

---

**Son Güncelleme:** 11 Kasım 2025  
**Version:** v1.1.0
