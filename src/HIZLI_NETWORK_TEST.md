# 🔍 HIZLI NETWORK TEST - 2 DAKİKA!

## ✅ TOKEN GEÇERLİ! ŞİMDİ API CALL TEST!

LocalStorage'da token var ve geçerli:
```
✅ hasAccessToken: true
✅ hasRefreshToken: true
✅ expiresAt: 1762743772 (geçerli!)
✅ user: volkanbulut73@gmail.com
```

Şimdi **users query** test edelim!

---

## 🎯 TEST ADIMLARI (2 Dakika)

### **Adım 1: Network Tab Aç (10 saniye)**
```
1. F12 (DevTools)
2. "Network" tab'a geç
3. "XHR/Fetch" filter'ını seç (sadece API call'ları görmek için)
4. "Clear" butonu ile temizle (önceki request'ler gitsin)
```

---

### **Adım 2: Users Query Tetikle (20 saniye)**
```
1. Workigom uygulamasında admin olarak giriş yap
2. "Admin Paneli" sekmesine git (bottom nav'de veya sidebar'da)
3. "Bildirimler" alt sekmesini seç
4. "Gönderim Türü" → "Belirli Bireysel Kullanıcı" seç
5. "Kullanıcı Seçin" dropdown'ını aç (tıkla)
```

Bu işlem **users** tablosundan query yapar!

---

### **Adım 3: Network Request Bul (10 saniye)**
```
Network tab'de şunu ara:
- İsim: "users" veya "rest/v1/users" 
- Method: GET
- Type: fetch

Tıkla → Request detaylarına bak
```

---

### **Adım 4: Status Kontrol (10 saniye)**

#### **✅ BAŞARILI (200 OK):**
```
Status: 200 OK
Response tab:
[
  {
    "id": "...",
    "email": "ali@example.com",
    "full_name": "Ali Demir",
    "user_type": "individual"
  },
  {
    "id": "...",
    "email": "ayse@example.com",
    "full_name": "Ayşe Yılmaz",
    "user_type": "individual"
  },
  ...
]

→ 🎉 MÜKEMMEL! Kullanıcı listesi geldi!
→ Dropdown'da kullanıcılar görünüyor olmalı!
→ Hiçbir şey yapma, çalışıyor! ✅
```

#### **❌ HATA 1: 401 Unauthorized**
```
Status: 401 Unauthorized
Response tab:
{
  "message": "JWT expired",
  "code": "PGRST301"
}

→ Token expire olmuş!
→ Ama LocalStorage'da geçerli görünüyordu!
→ Çözüm: localStorage.clear() + Logout + Login
```

#### **❌ HATA 2: 403 Forbidden**
```
Status: 403 Forbidden
Response tab:
{
  "message": "permission denied for table users",
  "code": "42501"
}

→ RLS policy hatası!
→ Admin user yetkileri eksik!
→ Çözüm: Admin user metadata kontrol et
```

#### **❌ HATA 3: 500 Internal Server Error**
```
Status: 500 Internal Server Error
Response tab:
{
  "message": "internal error",
  "details": "..."
}

→ Backend hatası!
→ Database veya policy hatası
→ Çözüm: Supabase logs kontrol et
```

---

### **Adım 5: Request Headers Kontrol (30 saniye)**

Network request'i seç → **Headers** tab

#### **BEKLENTİ:**
```http
Request Headers:
✅ Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
✅ apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
✅ Content-Type: application/json
```

#### **EĞER Authorization YOKSA:**
```http
Request Headers:
❌ Authorization: (YOK!)
✅ apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

→ **SORUN:** Token header'a eklenmiyor!
→ **NEDEN:** Supabase client düzgün initialize edilmemiş
→ **ÇÖZÜM:** `utils/supabase/client.ts` kontrol et

---

### **Adım 6: Response Body Kopyala (20 saniye)**

Eğer **200 dışında** bir status alıyorsan:

```
1. Network request'i seç
2. "Response" tab'a geç
3. Tüm response body'yi kopyala
4. Bana yapıştır!

Örnek:
{
  "message": "JWT expired",
  "code": "PGRST301",
  "details": null,
  "hint": null
}
```

---

## 🔧 HIZLI ÇÖZÜMLER

### **Çözüm 1: Token Expire (401)**
```javascript
// Console'da:
localStorage.clear();

// Sayfa yenile:
location.reload();

// Tekrar login yap
```

---

### **Çözüm 2: RLS Policy (403)**

#### **Kontrol 1: User Metadata**
```
Supabase Dashboard → Authentication → Users
→ volkanbulut73@gmail.com'u bul
→ "User Metadata" sütununa bak:

Beklenen:
{
  "user_type": "admin"
}

Eğer YOK veya farklıysa:
→ SQL migration çalıştır!
```

#### **Kontrol 2: Public Users Table**
```
Supabase Dashboard → Database → Tables → users
→ volkanbulut73@gmail.com satırını bul

Beklenen:
| id | email | user_type | full_name |
|----|-------|-----------|-----------|
| xxx | volkanbulut73@gmail.com | admin | Admin |

Eğer user_type "admin" değilse:
→ SQL ile güncelle!
```

#### **SQL Güncelleme:**
```sql
-- Supabase Dashboard → SQL Editor

-- Admin user oluştur/güncelle:
INSERT INTO public.users (
  id, 
  email, 
  full_name, 
  user_type
)
VALUES (
  (SELECT id FROM auth.users WHERE email = 'volkanbulut73@gmail.com'),
  'volkanbulut73@gmail.com',
  'Admin User',
  'admin'
)
ON CONFLICT (id) 
DO UPDATE SET 
  user_type = 'admin',
  full_name = 'Admin User';

-- Kontrol:
SELECT id, email, user_type, full_name 
FROM public.users 
WHERE email = 'volkanbulut73@gmail.com';
```

---

### **Çözüm 3: Authorization Header Yok**

#### **Kontrol: Supabase Client**

`/utils/supabase/client.ts`:
```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### **Kontrol: Environment Variables**

Console'da:
```javascript
console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY);

// Beklenen:
// VITE_SUPABASE_URL: "https://wstmyjshbzsctpngwliw.supabase.co"
// VITE_SUPABASE_ANON_KEY: "eyJhb..."

// Eğer undefined:
// → .env dosyası eksik!
```

---

## 📋 BEKLENTİLER

### **NORMAL DURUM (Başarılı):**
```
Network Request:
✅ Status: 200 OK
✅ Authorization header: Bearer eyJhb...
✅ Response: Array of users (3-7 kullanıcı)

UI:
✅ "Kullanıcı Seçin" dropdown açılıyor
✅ Kullanıcılar listesi dolu
✅ Ali Demir, Ayşe Yılmaz, vb. görünüyor
✅ Console'da error YOK!

→ 🎉 ÇALIŞIYOR! Hiçbir şey yapma!
```

---

### **HATA DURUMU 1 (Token Expire):**
```
Network Request:
❌ Status: 401 Unauthorized
❌ Response: { "message": "JWT expired" }

UI:
❌ "Kullanıcı Seçin" dropdown boş
❌ "Oturum süreniz dolmuş" mesajı
❌ Console: "Authentication failed - Token may be expired"

Çözüm:
1. localStorage.clear()
2. Logout + Login
```

---

### **HATA DURUMU 2 (RLS Policy):**
```
Network Request:
❌ Status: 403 Forbidden
❌ Response: { "message": "permission denied for table users" }

UI:
❌ "Kullanıcı Seçin" dropdown boş
❌ "Yetkiniz yok" veya benzeri mesaj (varsa)

Çözüm:
1. Admin user metadata kontrol
2. public.users → user_type: 'admin' kontrol
3. SQL güncelleme
```

---

### **HATA DURUMU 3 (Header Yok):**
```
Network Request:
✅ Status: Belirsiz (muhtemelen 401 veya 403)
❌ Authorization header: YOK!
✅ apikey header: VAR

Çözüm:
1. Supabase client kontrol
2. Environment variables kontrol
3. AuthContext kontrol
```

---

## 🎯 SONUÇ BEKLENTİSİ

### **Token Geçerliyse (LocalStorage'da):**
```
BEKLENTİ: ✅ 200 OK

Çünkü:
✅ LocalStorage'da token var
✅ Token geçerli (expiresAt gelecekte)
✅ Supabase client otomatik token ekler
✅ RLS policy admin'e izin verir (migration çalıştırıldı)

→ Muhtemelen ÇALIŞIYOR!
```

---

### **Eğer Hata Alırsan:**
```
MUHTEMEL NEDEN:
❌ Token aslında expire (LocalStorage timestamp yanlış)
❌ Admin user_type eksik (metadata veya public.users)
❌ RLS policy yanlış configured

→ Response body paylaş!
→ SQL kontrol gerekli!
```

---

## 💡 DEBUG TİPLERİ

### **Tip 1: JWT Decode**

Token'ın **gerçek** expire tarihini görmek için:

```javascript
// Console'da:
const token = localStorage.getItem('authToken');

// https://jwt.io/ sitesine git
// Token'ı yapıştır

// Payload'a bak:
{
  "exp": 1731234567,  // ← ASIL EXPIRE!
  "sub": "user-id",
  "email": "volkanbulut73@gmail.com",
  ...
}

// exp ile LocalStorage expiresAt karşılaştır!
const expireDate = new Date(1731234567 * 1000);
console.log('Gerçek expire:', expireDate.toLocaleString('tr-TR'));
```

---

### **Tip 2: Manual Query (Console)**

**Eğer supabase global değişken değilse:**

```javascript
// Alternatif: Direct fetch
const token = JSON.parse(
  localStorage.getItem('sb-wstmyjshbzsctpngwliw-auth-token')
).access_token;

fetch('https://wstmyjshbzsctpngwliw.supabase.co/rest/v1/users?select=*', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'apikey': 'SUPABASE_ANON_KEY_BURAYA',
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => console.log('Users:', data))
.catch(err => console.error('Error:', err));
```

---

## 🚀 ÖZET

```
TOKEN: ✅ GEÇERLİ!

ŞİMDİ:
1. Network tab aç → 10 sn
2. Users query tetikle → 20 sn
3. Request bul → 10 sn
4. Status kontrol → 10 sn
5. Response kopyala → 20 sn

TOPLAM: 70 SANİYE = ~1 DAKİKA ⏱️

BEKLENTİ:
✅ 200 OK → ÇALIŞIYOR! 🎉
❌ 401/403 → Response paylaş! 📋

SONRA:
→ GitHub'a yükle
→ Redeploy et
→ Production test
```

---

**HEMEN TEST ET:** Network tab! 🔍

**STATUS NE:** 200, 401, 403, 500? 📊

**RESPONSE PAYLAŞ:** Error varsa! 📋

**BAŞARILAR!** 🎉
