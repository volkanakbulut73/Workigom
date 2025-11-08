# 📸 RENDER.COM ENVIRONMENT VARIABLES GÖRSEL REHBER

## 🎯 EKRAN GÖRÜNTÜNÜZDEKİ SORUN

Görüntüde şu environment variables var:

```
❌ CORS_ORIGIN
❌ DATABASE_URL
❌ JWT_EXPIRES_IN
❌ JWT_REFRESH_EXPIRES_IN
❌ JWT_REFRESH_SECRET
❌ JWT_SECRET
❌ NODE_ENV
```

**PROBLEM:** Bunlar başka bir proje için! Workigom bunları kullanmıyor! 😱

---

## ✅ DOĞRU YAPILANDIRMA

### **Render.com Dashboard:**
```
URL: https://dashboard.render.com/web/srv-d3u4tgppn3f5ibrl/env
       (workigom-backend > Environment)
```

---

## 🗑️ ADIM 1: YANLIŞ VARIABLES'LARI SİL

### **Ekran görüntünüzde şunları görüyorum:**

| Variable | Action | Neden |
|----------|--------|-------|
| `CORS_ORIGIN` | ❌ **SİL** | Backend kodu `cors({origin: "*"})` kullanıyor |
| `DATABASE_URL` | ❌ **SİL** | Supabase kullanıyoruz, `SUPABASE_DB_URL` gerekli |
| `JWT_EXPIRES_IN` | ❌ **SİL** | JWT'yi Supabase yönetiyor |
| `JWT_REFRESH_EXPIRES_IN` | ❌ **SİL** | JWT'yi Supabase yönetiyor |
| `JWT_REFRESH_SECRET` | ❌ **SİL** | JWT'yi Supabase yönetiyor |
| `JWT_SECRET` | ❌ **SİL** | JWT'yi Supabase yönetiyor |
| `NODE_ENV` | ⚠️ **TUTAB İLİRSİNİZ** | Zarar vermez ama gerekli değil |

### **Nasıl Silinir:**

```
Render Dashboard > workigom-backend > Environment

Her variable için:
1. Sağdaki "..." (3 nokta) menüsüne tıkla
2. "Delete" seç
3. "Delete Environment Variable" confirm
4. Tekrarla (7 variable için)
```

---

## ➕ ADIM 2: DOĞRU VARIABLES'LARI EKLE

### **"Add Environment Variable" Butonuna Tıkla**

Her biri için:

---

### **1️⃣ SUPABASE_URL**

```
┌──────────────────────────────────────────────────┐
│ Key:   SUPABASE_URL                              │
├──────────────────────────────────────────────────┤
│ Value: https://xxxxxxxxxxx.supabase.co           │
│                                                  │
│ [Buraya Supabase Project URL'nizi yapıştırın]   │
└──────────────────────────────────────────────────┘

Nereden alınır:
Supabase Dashboard > Settings > API > Project URL
```

**"Add Environment Variable" → Kaydet**

---

### **2️⃣ SUPABASE_ANON_KEY**

```
┌──────────────────────────────────────────────────┐
│ Key:   SUPABASE_ANON_KEY                         │
├──────────────────────────────────────────────────┤
│ Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...   │
│                                                  │
│ [Çok uzun bir string - yaklaşık 500 karakter]   │
│ [Buraya Supabase anon key'i yapıştırın]         │
└──────────────────────────────────────────────────┘

Nereden alınır:
Supabase Dashboard > Settings > API > 
Project API keys > anon public
```

**"Add Environment Variable" → Kaydet**

---

### **3️⃣ SUPABASE_SERVICE_ROLE_KEY** ⚠️ GİZLİ!

```
┌──────────────────────────────────────────────────┐
│ Key:   SUPABASE_SERVICE_ROLE_KEY                 │
├──────────────────────────────────────────────────┤
│ Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...   │
│                                                  │
│ [Çok uzun bir string - yaklaşık 500 karakter]   │
│ [Buraya Supabase service_role key'i yapıştırın] │
│                                                  │
│ ⚠️ BU GİZLİ BİR KEY! PAYLAŞMAYIN!                │
└──────────────────────────────────────────────────┘

Nereden alınır:
Supabase Dashboard > Settings > API > 
Project API keys > service_role (Show butonuna tıkla)
```

**"Add Environment Variable" → Kaydet**

---

### **4️⃣ SUPABASE_DB_URL**

```
┌──────────────────────────────────────────────────┐
│ Key:   SUPABASE_DB_URL                           │
├──────────────────────────────────────────────────┤
│ Value: postgresql://postgres:[password]@db.     │
│        xxxxxxxxxxx.supabase.co:5432/postgres     │
│                                                  │
│ [Connection string - şifreniz içinde]            │
│ [Buraya Supabase DB URI'sini yapıştırın]        │
└──────────────────────────────────────────────────┘

Nereden alınır:
Supabase Dashboard > Settings > Database >
Connection String > URI > Copy
```

**"Add Environment Variable" → Kaydet**

---

### **5️⃣ PORT**

```
┌──────────────────────────────────────────────────┐
│ Key:   PORT                                      │
├──────────────────────────────────────────────────┤
│ Value: 10000                                     │
│                                                  │
│ [Sadece sayı: 10000]                             │
└──────────────────────────────────────────────────┘

Not: Render.com 10000 portunu kullanır
```

**"Add Environment Variable" → Kaydet**

---

## 📸 SONUÇ: DOĞRU EKRAN GÖRÜNTÜSÜ

**Environment Variables sayfanız şöyle görünmeli:**

```
┌────────────────────────────────────────────────────┐
│ Environment Variables                              │
├────────────────────────────────────────────────────┤
│                                                    │
│ SUPABASE_URL                                       │
│ https://xxxxxxxxxxx.supabase.co              [👁️][🗑️]│
│                                                    │
│ SUPABASE_ANON_KEY                                  │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...      [👁️][🗑️]│
│                                                    │
│ SUPABASE_SERVICE_ROLE_KEY                          │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...      [👁️][🗑️]│
│                                                    │
│ SUPABASE_DB_URL                                    │
│ postgresql://postgres:...                    [👁️][🗑️]│
│                                                    │
│ PORT                                               │
│ 10000                                        [👁️][🗑️]│
│                                                    │
└────────────────────────────────────────────────────┘

✅ 5 Environment Variables
❌ 0 Yanlış Variables
```

---

## 🚀 ADIM 3: REDEPLOY

### **Manual Deploy:**

```
Render Dashboard > workigom-backend

1. Sağ üstte "Manual Deploy" dropdown
2. "Deploy latest commit" seç
3. Deployment loglarını izle:

Deploy Logs:
==> Building...
==> Starting Deno runtime...
==> 🚀 Workigom Backend started on port 10000
==> Your service is live 🎉

✅ Deploy successful!
```

---

## 🧪 TEST

### **Health Check:**

```bash
# Terminal veya browser:
https://workigom-backend.onrender.com/make-server-018e1998/health

Beklenen response:
{
  "status": "ok",
  "timestamp": "2025-11-08T12:34:56.789Z"
}
```

**✅ Başarılı:** Status 200, JSON response

**❌ Hatalı:**
- 503: Cold start, 30-60 saniye bekle
- 500: Environment variables yanlış, logs kontrol et
- 404: URL yanlış

### **Logs Kontrol:**

```
Render Dashboard > workigom-backend > Logs

Aranacak satırlar:
✅ "🚀 Workigom Backend started on port 10000"
✅ "GET /make-server-018e1998/health 200"

Hata satırları:
❌ "Error: Environment variable ... is not set"
❌ "Failed to connect to database"
```

---

## 🌐 FRONTEND TARAFINDA

### **Frontend Environment Variables:**

**Render Dashboard > workigom-frontend > Environment**

Olması gereken:

```
┌────────────────────────────────────────────────────┐
│ VITE_SUPABASE_URL                                  │
│ https://xxxxxxxxxxx.supabase.co              [👁️][🗑️]│
│                                                    │
│ VITE_SUPABASE_ANON_KEY                             │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...      [👁️][🗑️]│
│                                                    │
│ VITE_BACKEND_URL                                   │
│ https://workigom-backend.onrender.com        [👁️][🗑️]│
│                                                    │
└────────────────────────────────────────────────────┘
```

**⚠️ DİKKAT:**
- Frontend variables `VITE_` prefix ile başlamalı!
- `VITE_BACKEND_URL` sizin backend URL'nizi içermeli
- Backend URL'nizi buradan alın:
  ```
  Render Dashboard > workigom-backend > Settings > URL
  Örnek: https://workigom-backend-abc123.onrender.com
  ```

**Değiştirdiyseniz redeploy edin:**
```
Render Dashboard > workigom-frontend
→ Manual Deploy > Deploy latest commit
```

---

## 📋 HIZLI CHECKLIST

### **Backend Environment Variables (5 adet):**
- [ ] ✅ `SUPABASE_URL` eklendi
- [ ] ✅ `SUPABASE_ANON_KEY` eklendi
- [ ] ✅ `SUPABASE_SERVICE_ROLE_KEY` eklendi
- [ ] ✅ `SUPABASE_DB_URL` eklendi
- [ ] ✅ `PORT` eklendi
- [ ] ❌ Eski variables silindi (CORS_ORIGIN, DATABASE_URL, JWT_*)
- [ ] ✅ Backend redeploy edildi
- [ ] ✅ Health check başarılı

### **Frontend Environment Variables (3 adet):**
- [ ] ✅ `VITE_SUPABASE_URL` var
- [ ] ✅ `VITE_SUPABASE_ANON_KEY` var
- [ ] ✅ `VITE_BACKEND_URL` var (doğru URL ile)
- [ ] ✅ Frontend redeploy edildi

---

## 🎉 TAMAMLANDI!

Artık backend ve frontend doğru bağlantıya sahip! 🚀

**URL'ler:**
```
Frontend: https://workigom-frontend1.onrender.com
Backend:  https://workigom-backend.onrender.com
Database: https://[project-id].supabase.co
```

**Test:**
1. Backend health check ✅
2. Frontend açılıyor ✅
3. Kayıt ol çalışıyor ✅
4. Giriş yap çalışıyor ✅

**İyi çalışmalar!** 💪
