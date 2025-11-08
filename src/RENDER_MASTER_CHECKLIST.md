# ✅ RENDER.COM MASTER CHECKLIST

## 🎯 HIZLI DURUM ÖZET

```
┌─────────────────────────────────────────────┐
│ BACKEND                                     │
├─────────────────────────────────────────────┤
│ Environment Variables:                      │
│ ❌ YANLIŞ variables var (JWT_*, CORS_*, etc)│
│ ❌ Doğru variables eksik                    │
│ ⏳ Redeploy gerekli                          │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ FRONTEND                                    │
├─────────────────────────────────────────────┤
│ Environment Variables:                      │
│ ✅ VITE_BACKEND_URL doğru                   │
│ ✅ VITE_SUPABASE_URL doğru                  │
│ ✅ VITE_SUPABASE_ANON_KEY doğru             │
│ ⏳ Redeploy gerekli                          │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ SUPABASE                                    │
├─────────────────────────────────────────────┤
│ Project: wsmeyishhzsctnqnslmw               │
│ URL: https://wsmeyishhzsctnqnslmw...        │
│ ⚠️ Durumu bilinmiyor - kontrol gerekli      │
└─────────────────────────────────────────────┘
```

---

## 🚀 TAMAMLANMA PLANI (10 DAKİKA)

### **ÖNCE:** Backend Environment Variables Düzelt

**⏱️ Süre:** 3 dakika

```
Render Dashboard > workigom-backend > Environment

1. SİL (7 adet):
   ❌ CORS_ORIGIN
   ❌ DATABASE_URL
   ❌ JWT_EXPIRES_IN
   ❌ JWT_REFRESH_EXPIRES_IN
   ❌ JWT_REFRESH_SECRET
   ❌ JWT_SECRET
   ❌ NODE_ENV (opsiyonel)

2. EKLE (5 adet):
   ✅ SUPABASE_URL
   ✅ SUPABASE_ANON_KEY
   ✅ SUPABASE_SERVICE_ROLE_KEY
   ✅ SUPABASE_DB_URL
   ✅ PORT=10000

3. REDEPLOY:
   Manual Deploy > Deploy latest commit
   Bekle (2-3 dakika)
```

**Detay:** `BACKEND_BAGLANTI_HIZLI_COZUM.md`

---

### **SONRA:** Frontend Redeploy

**⏱️ Süre:** 3 dakika

```
Render Dashboard > workigom-frontend

1. KONTROL:
   ✅ VITE_BACKEND_URL var
   ✅ VITE_SUPABASE_URL var
   ✅ VITE_SUPABASE_ANON_KEY var

2. REDEPLOY:
   Manual Deploy > Deploy latest commit
   Bekle (2-3 dakika)
```

**Detay:** `FRONTEND_HIZLI_TEST.md`

---

### **SON:** Test Et

**⏱️ Süre:** 4 dakika

```
1. Backend Health Check (30 saniye):
   curl https://workigom-backend.onrender.com/make-server-018e1998/health
   ✅ {"status":"ok"}

2. Frontend Açılıyor mu? (30 saniye):
   https://workigom-frontend1.onrender.com
   ✅ Landing page görünüyor

3. Kayıt Ol Test (2 dakika):
   Email: test3@workigom.com
   ✅ Kayıt başarılı

4. Giriş Yap Test (1 dakika):
   ✅ Giriş başarılı
   ✅ Dashboard açıldı
```

---

## 📋 DETAYLI CHECKLIST

### **BACKEND (srv-d3u4tgppn3f5ibrl)**

#### **Environment Variables:**
- [ ] ❌ CORS_ORIGIN silindi
- [ ] ❌ DATABASE_URL silindi
- [ ] ❌ JWT_EXPIRES_IN silindi
- [ ] ❌ JWT_REFRESH_EXPIRES_IN silindi
- [ ] ❌ JWT_REFRESH_SECRET silindi
- [ ] ❌ JWT_SECRET silindi
- [ ] ❌ NODE_ENV silindi (opsiyonel)
- [ ] ✅ SUPABASE_URL eklendi
- [ ] ✅ SUPABASE_ANON_KEY eklendi
- [ ] ✅ SUPABASE_SERVICE_ROLE_KEY eklendi
- [ ] ✅ SUPABASE_DB_URL eklendi
- [ ] ✅ PORT=10000 eklendi

#### **Deployment:**
- [ ] ⏳ Manual Deploy yapıldı
- [ ] ⏳ Build başarılı
- [ ] ⏳ "🚀 Workigom Backend started on port 10000" görüldü

#### **Test:**
- [ ] ⏳ Health check 200 OK
- [ ] ⏳ Logs temiz (hata yok)

---

### **FRONTEND (srv-xxxxx)**

#### **Environment Variables:**
- [x] ✅ VITE_BACKEND_URL var
- [x] ✅ VITE_SUPABASE_URL var
- [x] ✅ VITE_SUPABASE_ANON_KEY var

#### **Deployment:**
- [ ] ⏳ Manual Deploy yapıldı
- [ ] ⏳ Build başarılı
- [ ] ⏳ "Deploy successful" görüldü

#### **Test:**
- [ ] ⏳ Frontend açılıyor
- [ ] ⏳ Landing page görünüyor
- [ ] ⏳ Kayıt ol çalışıyor
- [ ] ⏳ Giriş yap çalışıyor
- [ ] ⏳ Dashboard açılıyor
- [ ] ⏳ Navigation çalışıyor
- [ ] ⏳ Console'da hata yok

---

### **SUPABASE**

#### **Database:**
- [ ] ⚠️ Migration'lar çalıştırıldı mı?
- [ ] ⚠️ Tablolar var mı? (users, jobs, applications, etc)
- [ ] ⚠️ RLS policies var mı?

#### **Auth:**
- [ ] ⚠️ Email confirmation KAPALI mı?
- [ ] ⚠️ Signup AÇIK mı?

#### **Test:**
- [ ] ⏳ Test kullanıcısı oluşturuldu
- [ ] ⏳ Users tablosunda görünüyor

**Detay:** `SIGNUP_HATA_COZUMU.md`

---

## 🎯 DOĞRU ENVIRONMENT VARIABLES

### **Backend (Server-side):**

```env
# Render.com > workigom-backend > Environment

SUPABASE_URL=https://wsmeyishhzsctnqnslmw.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... (SECRET!)
SUPABASE_DB_URL=postgresql://postgres:[password]@db.wsmeyishhzsctnqnslmw.supabase.co:5432/postgres
PORT=10000
```

**Nereden alınır:**
```
Supabase Dashboard:
https://supabase.com/dashboard/project/wsmeyishhzsctnqnslmw/settings/api

✅ Project URL
✅ anon public key
✅ service_role key (Show butonuna tıkla)

Database:
https://supabase.com/dashboard/project/wsmeyishhzsctnqnslmw/settings/database

✅ Connection String > URI
```

---

### **Frontend (Client-side):**

```env
# Render.com > workigom-frontend > Environment

VITE_SUPABASE_URL=https://wsmeyishhzsctnqnslmw.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_BACKEND_URL=https://workigom-backend.onrender.com
```

**⚠️ DİKKAT:**
- Frontend'de `VITE_` prefix zorunlu!
- Service Role Key frontend'de ASLA kullanılmamalı!

---

## 🧪 TEST PROSEDÜRÜ

### **1. Backend Test:**

```bash
# Terminal'de:
curl https://workigom-backend.onrender.com/make-server-018e1998/health

# Beklenen:
{
  "status": "ok",
  "timestamp": "2025-11-08T..."
}

# Hatalı:
503 → Cold start, 30-60 saniye bekle
500 → Environment variables yanlış, logs kontrol et
404 → URL yanlış
```

---

### **2. Frontend Test:**

```
Browser:
https://workigom-frontend1.onrender.com

Beklenen:
✅ Landing page açılıyor
✅ Logo görünüyor
✅ Butonlar çalışıyor

F12 Console:
✅ No errors
❌ CORS error → Backend CORS fix
❌ Network error → Backend çalışmıyor
```

---

### **3. Full Stack Test:**

```
1. Kayıt Ol:
   Email: test@workigom.com
   Password: Test123456!
   
   Beklenen:
   ✅ "User created successfully"
   ✅ Otomatik giriş
   ✅ Dashboard açıldı

2. Logout > Giriş Yap:
   ✅ Giriş başarılı
   ✅ Session devam ediyor

3. Navigation:
   ✅ Ana Sayfa
   ✅ İş İlanları
   ✅ Menü Market ⭐
   ✅ Mesajlar
   ✅ Profil

4. Database Kontrol:
   Supabase > Database > users
   ✅ Yeni kullanıcı görünüyor
```

---

## 🐛 SORUN GİDERME

### **Backend 503 Error:**

**Problem:**
```
curl https://workigom-backend.onrender.com/... → 503
```

**Sebep:** Cold start (Render free tier)

**Çözüm:**
```
1. 30-60 saniye bekle
2. Tekrar dene
3. Uptime Robot kullan (ücretsiz):
   https://uptimerobot.com/
   Monitor: https://workigom-backend.onrender.com/make-server-018e1998/health
   Interval: 5 dakika
```

---

### **Frontend Beyaz Ekran:**

**Problem:**
```
https://workigom-frontend1.onrender.com → Beyaz ekran
```

**Sebep:** Build hatası veya environment variables eksik

**Çözüm:**
```
1. Render > workigom-frontend > Logs
2. Build hatalarını oku
3. Environment variables kontrol et
4. Redeploy
```

---

### **CORS Error:**

**Problem:**
```
Console: "blocked by CORS policy"
```

**Sebep:** Backend CORS ayarları frontend'i allow etmiyor

**Çözüm:**
```
Backend code:
/supabase/functions/server/index.tsx

app.use("/*", cors({
  origin: "*", // Tüm originlere izin
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}))

Git push → Backend redeploy
```

---

### **Kayıt Ol Hatası:**

**Problem:**
```
"Email not confirmed"
```

**Sebep:** Supabase email confirmation açık

**Çözüm:**
```
Supabase Dashboard:
Authentication > Settings
→ "Enable email confirmations" KAPAT
→ "Mailer Autoconfirm" AÇ
→ Save
```

---

## 📊 BAŞARI KRİTERLERİ

### **Tamamlanması Gereken:**

```
Backend:
✅ Environment variables doğru (5 adet)
✅ Redeploy başarılı
✅ Health check 200 OK
✅ Logs temiz

Frontend:
✅ Environment variables doğru (3 adet)
✅ Redeploy başarılı
✅ Build başarılı
✅ Landing page açılıyor

Integration:
✅ Kayıt ol çalışıyor
✅ Giriş yap çalışıyor
✅ Dashboard açılıyor
✅ Navigation çalışıyor
✅ Menü Market menüsü var
✅ Console'da hata yok
```

---

## 📞 YARDIM REHBERLERI

| Dosya | Açıklama | Süre |
|-------|----------|------|
| **BACKEND_BAGLANTI_HIZLI_COZUM.md** | Backend env vars fix | 2 dak |
| **FRONTEND_HIZLI_TEST.md** | Frontend test | 3 dak |
| **RENDER_BACKEND_BAGLANTI_DUZELTME.md** | Backend detaylı | 10 dak |
| **FRONTEND_YAPILANDIRMA_KONTROL.md** | Frontend detaylı | 10 dak |
| **RENDER_COM_DEPLOYMENT_REHBERI.md** | Full deployment | 30 dak |
| **SIGNUP_HATA_COZUMU.md** | Supabase auth fix | 5 dak |

---

## 🎉 TAMAMLANDIĞINDA

```
Backend URL:  https://workigom-backend.onrender.com
Frontend URL: https://workigom-frontend1.onrender.com
Database URL: https://wsmeyishhzsctnqnslmw.supabase.co

Test:
✅ curl backend/health → 200 OK
✅ Frontend açılıyor
✅ Kayıt ol → Başarılı
✅ Giriş yap → Başarılı
✅ Dashboard → Açılıyor
✅ Tüm özellikler çalışıyor

🎉 WORKIGOM CANLI! 🎉
```

---

## 🚀 ŞİMDİ NE YAPMALIYIM?

### **ADIM ADIM:**

1. **Backend Environment Variables Düzelt** (3 dak)
   → `BACKEND_BAGLANTI_HIZLI_COZUM.md` oku

2. **Backend Redeploy** (3 dak)
   → Manual Deploy > Bekle

3. **Backend Test** (1 dak)
   → curl health check

4. **Frontend Redeploy** (3 dak)
   → Manual Deploy > Bekle

5. **Frontend Test** (2 dak)
   → Browser'da aç

6. **Full Stack Test** (3 dak)
   → Kayıt ol > Giriş yap

**TOPLAM:** ~15 dakika

**İyi çalışmalar!** 🚀
