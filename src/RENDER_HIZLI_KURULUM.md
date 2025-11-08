# ⚡ RENDER.COM HIZLI KURULUM (5 DAKİKA)

## 🎯 HIZLI ÖZET

```
1. Supabase'de proje oluştur (2 dakika)
2. GitHub'a push et (1 dakika)
3. Render.com'da 2 servis oluştur (2 dakika)
✅ TAMAMLANDI!
```

---

## 🚀 ADIM 1: SUPABASE (2 DAKİKA)

### **1.1. Proje Oluştur:**
```
https://supabase.com/dashboard
→ New Project
→ Name: workigom
→ Password: [güçlü şifre - KAYDET!]
→ Region: Europe West
→ Create Project (2-3 dakika bekle)
```

### **1.2. Migration Çalıştır:**
```
Dashboard > SQL Editor > New Query

1. /supabase/migrations/001_initial_schema.sql içeriğini kopyala-yapıştır → RUN
2. /supabase/migrations/002_additional_features.sql içeriğini kopyala-yapıştır → RUN
3. /supabase/migrations/003_fix_auth_policies.sql içeriğini kopyala-yapıştır → RUN
```

### **1.3. Auth Ayarları:**
```
Authentication > Settings
→ "Enable email confirmations" KAPAT
→ "Mailer Autoconfirm" AÇ
→ Save
```

### **1.4. Bilgileri Al:**
```
Settings > API

✅ Project URL: https://xxx.supabase.co
✅ anon key: eyJhbGc...
✅ service_role key: eyJhbGc... (GİZLİ!)
✅ Database URL: postgresql://postgres:...
```

**NOT:** Bu bilgileri bir yere kaydet!

---

## 📦 ADIM 2: GITHUB (1 DAKİKA)

```bash
# Terminal'de:
git init
git add .
git commit -m "Initial commit"

# GitHub'da repository oluştur: https://github.com/new
# Repository adı: workigom
# Private olarak oluştur

git remote add origin https://github.com/[kullanici-adin]/workigom.git
git branch -M main
git push -u origin main
```

**✅ Kod GitHub'da!**

---

## 🔧 ADIM 3: RENDER.COM - BACKEND (1 DAKİKA)

```
https://render.com/
→ Sign in with GitHub
→ New + → Web Service
→ Select Repository: workigom
→ Connect

AYARLAR:
┌────────────────────────────────────────┐
│ Name: workigom-backend                 │
│ Runtime: Docker                        │
│ Dockerfile: Dockerfile.backend         │
│ Region: Frankfurt                      │
│ Plan: Free                             │
└────────────────────────────────────────┘

ENVIRONMENT VARIABLES:
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (GİZLİ!)
SUPABASE_DB_URL=postgresql://postgres:...
PORT=10000

→ Create Web Service
```

**Bekle:** Deploy tamamlanana kadar (3-5 dakika)

**✅ Backend URL:** `https://workigom-backend.onrender.com`

---

## 🎨 ADIM 4: RENDER.COM - FRONTEND (1 DAKİKA)

```
Dashboard → New + → Static Site
→ Select Repository: workigom (aynı repo)
→ Connect

AYARLAR:
┌────────────────────────────────────────┐
│ Name: workigom-frontend                │
│ Build: npm install && npm run build    │
│ Publish: dist                          │
│ Region: Frankfurt                      │
│ Plan: Free                             │
└────────────────────────────────────────┘

ENVIRONMENT VARIABLES:
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc... (ANON KEY)
VITE_BACKEND_URL=https://workigom-backend.onrender.com

→ Create Static Site
```

**Bekle:** Build tamamlanana kadar (2-3 dakika)

**✅ Frontend URL:** `https://workigom-frontend.onrender.com`

---

## 🧪 TEST ET

### **1. Backend Health Check:**
```bash
curl https://workigom-backend.onrender.com/make-server-018e1998/health

# Beklenen:
{"status":"ok","timestamp":"..."}
```

### **2. Frontend Açılıyor mu:**
```
https://workigom-frontend.onrender.com

✅ Landing page görünüyor
✅ "Kayıt Ol" butonu var
✅ Giriş yapabiliyorum
```

### **3. Kayıt Ol Test:**
```
Email: test@workigom.com
Password: Test123456!
Ad Soyad: Test Kullanıcı
Telefon: 05551234567
Kullanıcı Tipi: Bireysel

→ Kayıt Ol
→ Giriş Yap
→ Ana Sayfa
```

**✅ ÇALIŞIYOR!**

---

## 🎉 TAMAMLANDI!

```
Frontend: https://workigom-frontend.onrender.com
Backend:  https://workigom-backend.onrender.com
Database: https://xxx.supabase.co
```

---

## ⚠️ SORUN GİDERME

### **Backend 503 Error:**
```
Sebep: Cold start (30-60 saniye)
Çözüm: Bekle veya https://uptimerobot.com kullan
```

### **Frontend Beyaz Sayfa:**
```
Sebep: Build hatası
Çözüm: 
1. Render Dashboard > Logs
2. Hatayı oku
3. Düzelt, push et
```

### **Database Connection Error:**
```
Sebep: Yanlış connection string
Çözüm:
1. Supabase > Settings > Database
2. Connection string'i kopyala
3. Render > Backend > Environment
4. SUPABASE_DB_URL'yi güncelle
```

---

## 📞 YARDIM

**Detaylı rehber:** `RENDER_COM_DEPLOYMENT_REHBERI.md`

**Supabase setup:** `SIGNUP_HATA_COZUMU.md`

---

**İyi çalışmalar!** 🚀
