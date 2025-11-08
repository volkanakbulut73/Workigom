# 🔧 RENDER.COM BACKEND BAĞLANTI DÜZELTMESİ

## ⚠️ MEVCUT SORUN

Render.com'da backend environment variables **YANLIŞ AYARLANMIŞ!**

### **Mevcut (YANLIŞ) Environment Variables:**
```
❌ CORS_ORIGIN=https://workigom-frontend1.onrender.com
❌ DATABASE_URL=postgresql://...
❌ JWT_EXPIRES_IN=7d
❌ JWT_REFRESH_EXPIRES_IN=30d
❌ JWT_REFRESH_SECRET=...
❌ JWT_SECRET=...
❌ NODE_ENV=production
```

**SORUN:** Bizim backend bu environment variables'ları kullanmıyor! 
Workigom backend **Supabase entegrasyonu** kullanıyor.

---

## ✅ DOĞRU YAPILANDIRMA

### **Backend'in İHTİYAÇ DUYDUĞU Variables:**

```env
✅ SUPABASE_URL=https://[project-id].supabase.co
✅ SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
✅ SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (GİZLİ!)
✅ SUPABASE_DB_URL=postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
✅ PORT=10000
```

---

## 🔥 HEMEN DÜZELTELİM!

### **ADIM 1: Render.com Dashboard'a Git**

```
https://dashboard.render.com/web/srv-d3u4tgppn3f5ibrl/env

workigom-backend > Environment
```

### **ADIM 2: YANLIŞ Variables'ları Sil**

**Şu variables'ları SİL (Delete):**
```
❌ CORS_ORIGIN
❌ DATABASE_URL  
❌ JWT_EXPIRES_IN
❌ JWT_REFRESH_EXPIRES_IN
❌ JWT_REFRESH_SECRET
❌ JWT_SECRET
❌ NODE_ENV (isteğe bağlı, zarar vermez)
```

**Nasıl Silinir:**
```
1. Her variable'ın sağındaki "..." menüsüne tıkla
2. "Delete" seç
3. Confirm
```

### **ADIM 3: DOĞRU Variables'ları Ekle**

**Supabase Dashboard'dan bilgileri al:**
```
https://supabase.com/dashboard/project/[project-id]/settings/api

1. Project URL → Kopyala
2. Project API keys:
   - anon public → Kopyala
   - service_role → Kopyala (⚠️ GİZLİ!)
3. Database > Connection String > URI → Kopyala
```

**Render.com'da ekle:**

#### **1. SUPABASE_URL**
```
Key: SUPABASE_URL
Value: https://[project-id].supabase.co
```
**"Add Environment Variable" → Save**

#### **2. SUPABASE_ANON_KEY**
```
Key: SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (uzun string)
```
**"Add Environment Variable" → Save**

#### **3. SUPABASE_SERVICE_ROLE_KEY** ⚠️
```
Key: SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (uzun string - GİZLİ!)
```
**"Add Environment Variable" → Save**

#### **4. SUPABASE_DB_URL**
```
Key: SUPABASE_DB_URL
Value: postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres
```
**"Add Environment Variable" → Save**

#### **5. PORT**
```
Key: PORT
Value: 10000
```
**"Add Environment Variable" → Save**

### **ADIM 4: Manual Deploy**

```
Render Dashboard > workigom-backend
→ "Manual Deploy" dropdown
→ "Deploy latest commit"

Deploy logs izle:
✅ Building...
✅ Starting Deno runtime...
✅ 🚀 Workigom Backend started on port 10000
✅ Deploy successful!
```

---

## 🌐 FRONTEND BAĞLANTISI

### **Frontend Environment Variables Kontrol:**

**Render.com Dashboard:**
```
https://dashboard.render.com/static/srv-xxxxxx/env

workigom-frontend > Environment
```

**Olması gereken variables:**

#### **1. VITE_SUPABASE_URL**
```
Key: VITE_SUPABASE_URL
Value: https://[project-id].supabase.co
```

#### **2. VITE_SUPABASE_ANON_KEY**
```
Key: VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (ANON KEY - public)
```

#### **3. VITE_BACKEND_URL**
```
Key: VITE_BACKEND_URL
Value: https://workigom-backend.onrender.com
```

**⚠️ NOT:** Eğer backend URL'niz farklıysa (örn: `workigom-backend-xyz.onrender.com`), onu kullanın!

**Backend URL'nizi öğrenmek için:**
```
Render Dashboard > workigom-backend
→ Settings > URL
→ Kopyala
```

**Frontend'i redeploy et:**
```
Render Dashboard > workigom-frontend
→ "Manual Deploy" > "Deploy latest commit"
```

---

## 🧪 TEST ET

### **1. Backend Health Check:**

```bash
# Terminal'de:
curl https://workigom-backend.onrender.com/make-server-018e1998/health

# Beklenen çıktı:
{
  "status": "ok",
  "timestamp": "2025-11-08T..."
}
```

**❌ Hata alırsanız:**
```
503 Service Unavailable → Backend cold start, 30-60 saniye bekle
404 Not Found → URL yanlış, kontrol et
500 Internal Server Error → Environment variables yanlış, logları kontrol et
```

### **2. Backend Logs Kontrol:**

```
Render Dashboard > workigom-backend > Logs

Aranan satırlar:
✅ 🚀 Workigom Backend started on port 10000
✅ GET /make-server-018e1998/health 200

Hata varsa:
❌ Error: Environment variable SUPABASE_URL is not set
❌ Error: Failed to connect to database
```

### **3. Frontend Test:**

```
1. https://workigom-frontend1.onrender.com (veya sizin URL'niz)
2. F12 (Developer Tools) > Console
3. "Kayıt Ol" butonuna tıkla
4. Yeni kullanıcı oluştur
5. Console'da hata kontrolü:

✅ Başarılı:
   "User created successfully"
   "Profile created successfully"

❌ Hatalı:
   "Network error"
   "CORS error"
   "Failed to fetch"
```

---

## 🔧 CORS AYARLARI (Gerekirse)

Eğer CORS hatası alırsanız, backend'de CORS ayarlarını kontrol edin:

### **Backend CORS Config:**

`/supabase/functions/server/index.tsx` dosyasında:

```typescript
app.use(
  "/*",
  cors({
    origin: "*", // Veya specific frontend URL
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);
```

**Eğer sadece kendi frontend'inizi allow etmek isterseniz:**

```typescript
app.use(
  "/*",
  cors({
    origin: [
      "https://workigom-frontend1.onrender.com", // Production
      "http://localhost:5173" // Local development
    ],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);
```

**Değişiklik yaptıysanız:**
```bash
git add .
git commit -m "Update CORS settings"
git push

# Render otomatik redeploy eder
```

---

## 📋 ÖZET CHECKLIST

### **Backend Environment Variables:**
- [ ] ❌ CORS_ORIGIN silindi
- [ ] ❌ DATABASE_URL silindi
- [ ] ❌ JWT_* variables silindi
- [ ] ✅ SUPABASE_URL eklendi
- [ ] ✅ SUPABASE_ANON_KEY eklendi
- [ ] ✅ SUPABASE_SERVICE_ROLE_KEY eklendi
- [ ] ✅ SUPABASE_DB_URL eklendi
- [ ] ✅ PORT=10000 eklendi
- [ ] ✅ Backend redeploy edildi

### **Frontend Environment Variables:**
- [ ] ✅ VITE_SUPABASE_URL var
- [ ] ✅ VITE_SUPABASE_ANON_KEY var
- [ ] ✅ VITE_BACKEND_URL var (doğru URL ile)
- [ ] ✅ Frontend redeploy edildi

### **Test:**
- [ ] ✅ Backend health check başarılı
- [ ] ✅ Backend logs temiz
- [ ] ✅ Frontend açılıyor
- [ ] ✅ Kayıt ol çalışıyor
- [ ] ✅ Giriş yap çalışıyor
- [ ] ✅ Console'da hata yok

---

## 🎯 BEKLENEN SONUÇ

### **Backend Health Check:**
```bash
curl https://workigom-backend.onrender.com/make-server-018e1998/health

Response:
{
  "status": "ok",
  "timestamp": "2025-11-08T12:34:56.789Z"
}
```

### **Frontend:**
```
https://workigom-frontend1.onrender.com
→ Landing page görünüyor
→ "Kayıt Ol" çalışıyor
→ "Giriş Yap" çalışıyor
→ Dashboard açılıyor
```

### **Console (F12):**
```
✅ No errors
✅ "User created successfully"
✅ "Profile created successfully"
✅ Network tab: All requests 200 OK
```

---

## 🐛 SORUN GİDERME

### **Problem 1: Backend 503 Error**

**Sebep:** Cold start (Render free tier)

**Çözüm:**
```
1. 30-60 saniye bekle
2. Tekrar dene
3. Uptime Robot kullan: https://uptimerobot.com/
   - Monitor: https://workigom-backend.onrender.com/make-server-018e1998/health
   - Interval: 5 dakika
```

### **Problem 2: Environment Variable Errors**

**Hata:**
```
Error: Environment variable SUPABASE_URL is not set
```

**Çözüm:**
```
1. Render Dashboard > Backend > Environment
2. Variable'ı kontrol et (typo var mı?)
3. Save Changes
4. Manual Deploy
```

### **Problem 3: CORS Errors**

**Hata:**
```
Access to fetch at 'https://backend...' from origin 'https://frontend...'
has been blocked by CORS policy
```

**Çözüm:**
```
1. Backend CORS config'i kontrol et
2. origin: "*" yap (veya frontend URL ekle)
3. Git push
4. Redeploy
```

### **Problem 4: Database Connection Error**

**Hata:**
```
Failed to connect to database
```

**Çözüm:**
```
1. SUPABASE_DB_URL kontrol et
2. Password doğru mu?
3. Supabase Dashboard > Database > Connection string kopyala
4. Render > Backend > Environment > SUPABASE_DB_URL güncelle
5. Redeploy
```

---

## 📞 HIZLI YARDIM

### **Backend URL'nizi Bulmak:**
```
Render Dashboard > workigom-backend > Settings
→ URL: https://workigom-backend-[random].onrender.com
```

### **Frontend URL'nizi Bulmak:**
```
Render Dashboard > workigom-frontend > Settings
→ URL: https://workigom-frontend1.onrender.com
```

### **Supabase Bilgilerinizi Bulmak:**
```
https://supabase.com/dashboard/project/[project-id]/settings/api

✅ Project URL
✅ anon public key
✅ service_role key

Database > Connection String > URI
✅ postgresql://postgres:...
```

---

## ✅ TAMAMLANDI!

Backend ve Frontend artık düzgün bağlandı! 🎉

```
Frontend: https://workigom-frontend1.onrender.com
Backend:  https://workigom-backend.onrender.com
Database: https://[project-id].supabase.co
```

**İyi çalışmalar!** 🚀
