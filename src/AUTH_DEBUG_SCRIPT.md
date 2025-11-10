# 🔍 AUTH DEBUG SCRIPT - SUPABASE SESSION KONTROLÜ

## 🎯 AMAÇ

Frontend'de Supabase auth token ve session durumunu kontrol etmek.

---

## 📋 DATABASE DURUMU (Backend)

```
✅ auth.users: 7 rows (Kullanıcılar var!)
✅ auth.sessions: 3 rows (Aktif session'lar var!)
✅ auth.refresh_tokens: 5 rows (Refresh token'lar var!)
✅ public.users: 7 rows (User profilleri var!)
```

**Sonuç:** Backend tarafında her şey OK! 
**Sorun:** Frontend'de token/session yönetimi

---

## 🧪 CONSOLE'DA ÇALIŞTIR (F12)

### **1. Supabase Client Kontrolü**
```javascript
// Supabase client var mı?
console.log('Supabase client:', typeof supabase !== 'undefined' ? '✅ Var' : '❌ Yok');
```

---

### **2. LocalStorage Token Kontrolü**
```javascript
// Auth token'ları listele
const authKeys = Array.from(Object.keys(localStorage))
  .filter(k => k.toLowerCase().includes('supabase') || 
               k.toLowerCase().includes('auth') || 
               k.toLowerCase().includes('session'));

console.log('📦 LocalStorage Auth Keys:', authKeys);

authKeys.forEach(key => {
  const value = localStorage.getItem(key);
  if (value) {
    try {
      const parsed = JSON.parse(value);
      console.log(`🔑 ${key}:`, {
        hasAccessToken: !!parsed?.access_token,
        hasRefreshToken: !!parsed?.refresh_token,
        expiresAt: parsed?.expires_at,
        expiresIn: parsed?.expires_in,
        user: parsed?.user?.email || 'N/A'
      });
    } catch (e) {
      console.log(`🔑 ${key}: (plain text) ${value.substring(0, 50)}...`);
    }
  }
});
```

---

### **3. Session Kontrolü (Supabase Client)**
```javascript
// AuthContext'den supabase client al
import { supabase } from './utils/supabase/client';

// Session kontrol et
supabase.auth.getSession()
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ Session Error:', error.message);
      return;
    }
    
    const { session } = data;
    
    if (!session) {
      console.warn('⚠️ Session YOK! Kullanıcı giriş yapmamış.');
      return;
    }
    
    console.log('✅ Session VAR:', {
      user_email: session.user.email,
      user_role: session.user.user_metadata?.user_type,
      access_token_length: session.access_token?.length,
      refresh_token_length: session.refresh_token?.length,
      expires_at: new Date(session.expires_at * 1000).toLocaleString('tr-TR'),
      expires_in_minutes: Math.round((session.expires_at * 1000 - Date.now()) / 60000),
      is_expired: session.expires_at * 1000 < Date.now()
    });
  })
  .catch(err => {
    console.error('❌ Fatal Error:', err);
  });
```

---

### **4. Kullanıcı Bilgisi Kontrolü**
```javascript
supabase.auth.getUser()
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ User Error:', error.message);
      return;
    }
    
    const { user } = data;
    
    if (!user) {
      console.warn('⚠️ User YOK!');
      return;
    }
    
    console.log('✅ User VAR:', {
      id: user.id,
      email: user.email,
      user_type: user.user_metadata?.user_type,
      full_name: user.user_metadata?.full_name,
      created_at: user.created_at,
      last_sign_in: user.last_sign_in_at
    });
  })
  .catch(err => {
    console.error('❌ Fatal Error:', err);
  });
```

---

### **5. Refresh Token Test**
```javascript
// Refresh token'ı kullanarak session yenile
supabase.auth.refreshSession()
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ Refresh Error:', error.message);
      return;
    }
    
    const { session } = data;
    
    if (!session) {
      console.warn('⚠️ Refresh sonrası session yok!');
      return;
    }
    
    console.log('✅ Session Yenilendi!', {
      new_access_token_length: session.access_token?.length,
      new_expires_at: new Date(session.expires_at * 1000).toLocaleString('tr-TR'),
      new_expires_in_minutes: Math.round((session.expires_at * 1000 - Date.now()) / 60000)
    });
  })
  .catch(err => {
    console.error('❌ Fatal Error:', err);
  });
```

---

### **6. Network Request Kontrolü (Users Query)**
```javascript
// Admin'den kullanıcı listesi çek (SendNotificationForm gibi)
supabase
  .from('users')
  .select('id, email, full_name, user_type')
  .order('created_at', { ascending: false })
  .then(({ data, error }) => {
    if (error) {
      console.error('❌ Users Query Error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      
      // JWT hatası mı?
      if (error.message?.includes('JWT') || 
          error.message?.includes('expired') || 
          error.message?.includes('invalid')) {
        console.error('🔴 AUTH TOKEN HATASI! Session expire olmuş.');
      }
      
      return;
    }
    
    console.log('✅ Users Query Başarılı:', {
      total_users: data?.length || 0,
      users: data?.map(u => ({
        email: u.email,
        type: u.user_type,
        name: u.full_name
      }))
    });
  })
  .catch(err => {
    console.error('❌ Fatal Error:', err);
  });
```

---

## 🔧 HATA SENARYOLARI & ÇÖZÜMLER

### **Senaryo 1: "supabase is not defined"**
```
Sorun: Supabase client import edilmemiş
Çözüm: 
1. Console'da import et:
   import { supabase } from './utils/supabase/client';
   
2. Veya AuthContext'i kullan:
   - App component'inde AuthContext zaten var
   - SendNotificationForm'da useAuth() ile erişiliyor
```

---

### **Senaryo 2: "Session YOK" veya "null"**
```
Sorun: Kullanıcı giriş yapmamış veya session expire olmuş

Çözüm:
1. Logout + Login yap
2. LocalStorage temizle:
   localStorage.clear();
   location.reload();
   
3. Tekrar giriş yap
```

---

### **Senaryo 3: "JWT expired" veya "invalid token"**
```
Sorun: Access token süresi dolmuş

Çözüm 1: Otomatik Refresh (Supabase yapar)
- Supabase client otomatik refresh eder
- Ama bazen çalışmayabilir

Çözüm 2: Manuel Refresh
supabase.auth.refreshSession()

Çözüm 3: Logout + Login
- En garantili yöntem
```

---

### **Senaryo 4: "RLS Policy" veya "Permission denied"**
```
Sorun: Database policy'ler users tablosuna erişime izin vermiyor

Kontrol:
1. Supabase Dashboard → Authentication → Users
   - Admin user var mı?
   - user_metadata'da user_type: 'admin' mi?

2. Supabase Dashboard → Database → Tables → users
   - RLS enabled mı?
   - Policies doğru mu?

Çözüm: SQL Migration zaten çalıştırıldı (003_fix_auth_policies.sql)
- SELECT policy: auth.uid() kontrolü
- Admin için özel policy
```

---

## 📊 BEKLENTİLER (Normal Durum)

### **LocalStorage:**
```javascript
sb-<project-id>-auth-token: {
  access_token: "eyJhb...", // 500-1000 karakter
  refresh_token: "...",
  expires_at: 1731234567, // Unix timestamp
  expires_in: 3600, // 1 saat
  user: {
    email: "admin@workigom.com",
    user_metadata: {
      user_type: "admin",
      full_name: "Admin User"
    }
  }
}
```

---

### **Session:**
```javascript
{
  access_token: "eyJhb...",
  refresh_token: "...",
  expires_at: 1731234567,
  expires_in_minutes: 60,
  is_expired: false,
  user: {
    email: "admin@workigom.com",
    user_metadata: { user_type: "admin" }
  }
}
```

---

### **Users Query:**
```javascript
{
  total_users: 7,
  users: [
    { email: "admin@workigom.com", type: "admin", name: "Admin" },
    { email: "ali@example.com", type: "individual", name: "Ali Demir" },
    { email: "company@example.com", type: "corporate", name: "ABC Şirket" },
    ...
  ]
}
```

---

## 🚀 HIZLI TEST ADIMLARI

### **Adım 1: Console Aç (F12)**
```
Chrome/Edge: F12
Safari: Option+Cmd+C
Firefox: F12
```

---

### **Adım 2: Script'leri Çalıştır**
```javascript
// 1. LocalStorage kontrol
Array.from(Object.keys(localStorage))
  .filter(k => k.includes('supabase'))
  .forEach(k => console.log(k, localStorage.getItem(k)?.substring(0, 100)));

// 2. Session kontrol
await supabase.auth.getSession().then(r => console.log('Session:', r));

// 3. Users query
await supabase.from('users').select('*').then(r => console.log('Users:', r));
```

---

### **Adım 3: Hata Varsa Log'ları Kopyala**
```
Console'daki error mesajlarını kopyala:
❌ Session Error: ...
❌ Users Query Error: ...
```

---

## 🔍 NETWORK TAB KONTROLÜ

### **Adım 1: Network Tab Aç**
```
F12 → Network → XHR/Fetch
```

---

### **Adım 2: "Kullanıcı Seçin" Kutusunu Aç**
```
Admin > Bildirimler > Belirli Bireysel Kullanıcı > Kullanıcı Seçin
```

---

### **Adım 3: Request'i Kontrol Et**
```
Network'te "users" veya "rest/v1/users" request'ini bul:

✅ Headers:
   - Authorization: Bearer eyJhb... (var mı?)
   - apikey: ... (var mı?)

✅ Response:
   - 200 OK → ✅ Başarılı
   - 401 Unauthorized → ❌ Token expired veya invalid
   - 403 Forbidden → ❌ RLS policy sorunu
   - 500 Internal Server Error → ❌ Backend hatası

❌ Status 401:
   Response Body:
   {
     "message": "JWT expired",
     "code": "PGRST301"
   }
   
   → Token expired! Refresh gerekli.
```

---

## 💡 ÖNEMLİ NOTLAR

### **1. Token Expire Süresi**
```
Supabase varsayılan: 1 SAAT

Eğer kullanıcı 1 saatten fazla session'da kalırsa:
→ Access token expire olur
→ Refresh token kullanılarak yenilenir (otomatik)
→ Eğer refresh başarısızsa → Logout + Login
```

---

### **2. Supabase Client Auto-Refresh**
```
Supabase client otomatik olarak:
✅ Session'ı kontrol eder
✅ Expire olan token'ı yeniler
✅ LocalStorage'ı günceller

Ama bazen:
❌ Network error
❌ Refresh token de expire
❌ Client düzgün initialize edilmemiş
```

---

### **3. AuthContext vs Direct Import**
```
AuthContext (App.tsx):
✅ Merkezi auth state
✅ user, profile, loading state
✅ Tüm component'lerde kullanılabilir

Direct Import (SendNotificationForm):
✅ Direkt Supabase query
✅ Manual session kontrolü
✅ Daha düşük seviye kontrol

İKİSİ DE GEREKLİ!
- AuthContext: State management
- Direct Import: API calls
```

---

## 🎯 HIZLI ÇÖZÜM

Eğer hala "Oturum süreniz dolmuş" hatası alıyorsan:

### **Çözüm 1: Hard Refresh (30 saniye)**
```
1. Console'da:
   localStorage.clear();
   
2. Sayfa yenile:
   Ctrl+Shift+R (Windows)
   Cmd+Shift+R (Mac)
   
3. Tekrar login yap
```

---

### **Çözüm 2: Manuel Refresh (10 saniye)**
```
1. Console'da:
   await supabase.auth.refreshSession();
   
2. Sayfa yenile:
   location.reload();
```

---

### **Çözüm 3: Logout + Login (1 dakika)**
```
1. Logout butonu
2. Login ekranı
3. Admin credentials:
   - Email: admin@workigom.com
   - Password: (senin belirlediğin)
```

---

## 📚 İLGİLİ DOSYALAR

```
Auth Yönetimi:
✅ /contexts/AuthContext.tsx (State management)
✅ /utils/supabase/client.ts (Supabase client)
✅ /utils/supabase/auth.ts (Auth helpers)
✅ /components/admin/SendNotificationForm.tsx (Auth + users query)

Database:
✅ /supabase/migrations/001_initial_schema.sql
✅ /supabase/migrations/003_fix_auth_policies.sql

Debug:
✅ /AUTH_DEBUG_SCRIPT.md (bu dosya)
✅ /AUTH_FIX_TAMAMLANDI.md (detaylı rapor)
```

---

## 🎉 ÖZET

```
DATABASE: ✅ OK!
- 7 users
- 3 active sessions
- 5 refresh tokens

FRONTEND: 🔍 KONTROL GEREKLİ!
- LocalStorage token var mı?
- Session aktif mi?
- Token expire olmamış mı?

SCRIPT'LERI ÇALIŞTIR:
→ LocalStorage kontrol
→ Session kontrol
→ Users query test
→ Network tab incele

SORUN VARSA:
→ Logout + Login
→ Hard refresh
→ Console log'ları kopyala
```

---

**HEMEN TEST ET:** Console'da script'leri çalıştır! 🧪

**SORUN DEVAM EDERSE:** Console log'larını paylaş! 📋

**BAŞARILAR!** 🎉
