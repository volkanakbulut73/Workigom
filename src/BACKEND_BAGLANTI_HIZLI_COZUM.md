# ⚡ BACKEND BAĞLANTI HIZLI ÇÖZÜM (2 DAKİKA)

## 🚨 SORUN: YANLIŞ ENVIRONMENT VARIABLES!

Ekran görüntünüzde şu variables var:
```
❌ CORS_ORIGIN
❌ DATABASE_URL
❌ JWT_EXPIRES_IN
❌ JWT_REFRESH_EXPIRES_IN
❌ JWT_REFRESH_SECRET
❌ JWT_SECRET
```

**Workigom bunları kullanmıyor! Hemen düzeltelim! ⚡**

---

## 🔧 HIZLI ÇÖZÜM (2 ADIM)

### **ADIM 1: SİL (30 saniye)**

```
Render Dashboard > workigom-backend > Environment

Her variable için:
Sağdaki "..." → Delete → Confirm

❌ SİL: CORS_ORIGIN
❌ SİL: DATABASE_URL
❌ SİL: JWT_EXPIRES_IN
❌ SİL: JWT_REFRESH_EXPIRES_IN
❌ SİL: JWT_REFRESH_SECRET
❌ SİL: JWT_SECRET
```

---

### **ADIM 2: EKLE (1 dakika)**

**"Add Environment Variable" butonuna tıkla, 5 kez tekrarla:**

#### **1. SUPABASE_URL**
```
Key:   SUPABASE_URL
Value: https://[project-id].supabase.co

Nereden: Supabase > Settings > API > Project URL
```

#### **2. SUPABASE_ANON_KEY**
```
Key:   SUPABASE_ANON_KEY
Value: eyJhbGc... (uzun string)

Nereden: Supabase > Settings > API > anon public
```

#### **3. SUPABASE_SERVICE_ROLE_KEY** ⚠️
```
Key:   SUPABASE_SERVICE_ROLE_KEY
Value: eyJhbGc... (uzun string - GİZLİ!)

Nereden: Supabase > Settings > API > service_role (Show)
```

#### **4. SUPABASE_DB_URL**
```
Key:   SUPABASE_DB_URL
Value: postgresql://postgres:[password]@db...

Nereden: Supabase > Settings > Database > URI
```

#### **5. PORT**
```
Key:   PORT
Value: 10000
```

---

### **ADIM 3: REDEPLOY (30 saniye)**

```
Render Dashboard > workigom-backend
→ "Manual Deploy" → "Deploy latest commit"
→ Bekle (2-3 dakika)

✅ Deploy successful!
```

---

## 🧪 TEST

```bash
curl https://workigom-backend.onrender.com/make-server-018e1998/health

✅ Başarılı:
{"status":"ok","timestamp":"..."}

❌ Hata:
503 → 30-60 saniye bekle (cold start)
500 → Logs kontrol et, variable yanlış
```

---

## 🌐 FRONTEND

**Eğer frontend environment variables değiştirilmemişse:**

```
Render Dashboard > workigom-frontend > Environment

Kontrol et:
✅ VITE_SUPABASE_URL var mı?
✅ VITE_SUPABASE_ANON_KEY var mı?
✅ VITE_BACKEND_URL var mı? → Doğru backend URL'si ile

Yoksa ekle, redeploy et.
```

---

## ✅ TAMAMLANDI!

```
Backend URL:  https://workigom-backend.onrender.com
Frontend URL: https://workigom-frontend1.onrender.com

Test: Frontend'e git → Kayıt ol → Giriş yap → ✅ Çalışıyor!
```

---

## 📞 YARDIM

**Detaylı rehber:**
- `RENDER_BACKEND_BAGLANTI_DUZELTME.md`
- `RENDER_ENV_VARS_GORSEL_REHBER.md`

**Hala sorun varsa:**
- Backend Logs kontrol et
- Console (F12) kontrol et
- Supabase bilgilerini doğrula

**İyi çalışmalar!** 🚀
