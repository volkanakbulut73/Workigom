# 🚀 RENDER.COM DEPLOYMENT REHBERİ

## 📋 GENEL BAKIŞ

Workigom uygulaması **3 katmanlı mimari** kullanır:

```
┌─────────────────────────────────────────────────────┐
│                   KULLANICI                          │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│  FRONTEND (Render.com - Static Site)                │
│  - React + TypeScript + Vite                        │
│  - URL: https://workigom-frontend.onrender.com      │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│  BACKEND (Render.com - Web Service)                 │
│  - Deno + Hono Framework                            │
│  - URL: https://workigom-backend.onrender.com       │
└─────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────┐
│  DATABASE (Supabase)                                │
│  - PostgreSQL + Auth + Storage                      │
│  - URL: https://[project].supabase.co               │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 NEDEN 3 KATMAN?

### ✅ AVANTAJLAR:

1. **Ölçeklenebilirlik**: Frontend ve Backend bağımsız scale olur
2. **Güvenlik**: Service Role Key frontend'e erişemez
3. **Performans**: Static frontend CDN'den servis edilir
4. **Maliyet**: Free tier'larda daha fazla kaynak
5. **Geliştirme**: Frontend ve backend ayrı ayrı deploy edilebilir

---

## 📦 ÖN GEREKSINIMLER

### 1. **GitHub Hesabı**
- Kodu GitHub'a push edin
- Render.com GitHub ile entegre çalışır

### 2. **Supabase Projesi**
- Project oluşturun: https://supabase.com/dashboard
- Migration'ları çalıştırın
- Connection bilgilerini alın

### 3. **Render.com Hesabı**
- Ücretsiz hesap: https://render.com/
- GitHub ile bağlantı kurun

---

## 🔧 ADIM ADIM KURULUM

### **ADIM 1: SUPABASE KURULUMU** ✅

#### **1.1. Supabase Projesi Oluştur**

1. https://supabase.com/dashboard adresine git
2. "New Project" butonuna tık
3. Bilgileri doldur:
   - **Name**: workigom
   - **Database Password**: Güçlü bir şifre (KAYDET!)
   - **Region**: Europe West (Frankfurt) - size en yakın
4. "Create Project" butonuna tık (2-3 dakika sürer)

#### **1.2. Database Schema Oluştur**

1. Supabase Dashboard > SQL Editor
2. Dosyaları sırayla çalıştır:

```sql
-- 1. İlk olarak
-- /supabase/migrations/001_initial_schema.sql içeriğini kopyala-yapıştır
-- Execute (Ctrl+Enter)

-- 2. Sonra
-- /supabase/migrations/002_additional_features.sql içeriğini kopyala-yapıştır
-- Execute (Ctrl+Enter)

-- 3. Son olarak
-- /supabase/migrations/003_fix_auth_policies.sql içeriğini kopyala-yapıştır
-- Execute (Ctrl+Enter)
```

#### **1.3. Auth Ayarları**

```
1. Authentication > Settings
2. "Enable email confirmations" → KAPAT
3. "Mailer Autoconfirm" → AÇ
4. "Enable signup" → AÇ
5. Save
```

#### **1.4. Connection Bilgilerini Al**

```
Settings > API

1. Project URL:
   https://xxxxxxxxxxx.supabase.co

2. Project API Keys:
   - anon (public): eyJhbGc... (ANON KEY)
   - service_role: eyJhbGc... (SERVICE ROLE KEY) ⚠️ GİZLİ!

3. Database > Connection String > URI:
   postgresql://postgres:[password]@db.xxx.supabase.co:5432/postgres
```

**⚠️ ÖNEMLİ**: Bu bilgileri güvenli bir yere kaydedin!

---

### **ADIM 2: GITHUB'A PUSH** ✅

#### **2.1. Git Repository Oluştur**

```bash
# Terminal'de proje klasöründe:
git init
git add .
git commit -m "Initial commit - Workigom v1.0"
```

#### **2.2. GitHub'da Repository Oluştur**

1. https://github.com/new adresine git
2. Repository adı: **workigom**
3. Private olarak oluştur
4. "Create repository" butonuna tık

#### **2.3. Push Et**

```bash
git remote add origin https://github.com/[kullanici-adin]/workigom.git
git branch -M main
git push -u origin main
```

**✅ BAŞARILI!** Kod GitHub'da

---

### **ADIM 3: RENDER.COM - BACKEND DEPLOY** 🔥

#### **3.1. Render.com'a Giriş Yap**

1. https://render.com/ adresine git
2. "Get Started" butonuna tık
3. "Sign in with GitHub" seç
4. GitHub repository'lerine erişim izni ver

#### **3.2. Backend Web Service Oluştur**

```
1. Dashboard > "New +" > "Web Service"

2. Repository Seç:
   - "workigom" repository'sini seç
   - "Connect" butonuna tık

3. Ayarları Yapılandır:
   ┌─────────────────────────────────────────┐
   │ Name: workigom-backend                  │
   │ Runtime: Docker                         │
   │ Branch: main                            │
   │ Dockerfile Path: Dockerfile.backend     │
   │ Region: Frankfurt (EU Central)          │
   │ Plan: Free ($0/month)                   │
   └─────────────────────────────────────────┘

4. Environment Variables Ekle:
   (Advanced > Environment Variables)

   SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... ⚠️ GİZLİ!
   SUPABASE_DB_URL=postgresql://postgres:...
   PORT=10000

5. "Create Web Service" butonuna tık
```

#### **3.3. Deploy İzle**

```
Deploy Logs:
✅ Building Docker image...
✅ Starting Deno runtime...
✅ 🚀 Workigom Backend started on port 10000
✅ Deploy successful!

Backend URL:
https://workigom-backend.onrender.com
```

#### **3.4. Health Check Test**

```bash
# Terminal'de:
curl https://workigom-backend.onrender.com/make-server-018e1998/health

# Beklenen çıktı:
{
  "status": "ok",
  "timestamp": "2025-11-08T..."
}
```

**✅ BACKEND HAZIR!**

---

### **ADIM 4: RENDER.COM - FRONTEND DEPLOY** 🎨

#### **4.1. Frontend Static Site Oluştur**

```
1. Dashboard > "New +" > "Static Site"

2. Repository Seç:
   - "workigom" repository'sini seç (aynı repo)
   - "Connect" butonuna tık

3. Ayarları Yapılandır:
   ┌─────────────────────────────────────────┐
   │ Name: workigom-frontend                 │
   │ Branch: main                            │
   │ Build Command: npm install && npm run   │
   │                build                    │
   │ Publish Directory: dist                 │
   │ Region: Frankfurt (EU Central)          │
   │ Plan: Free ($0/month)                   │
   └─────────────────────────────────────────┘

4. Environment Variables Ekle:
   (Advanced > Environment Variables)

   VITE_SUPABASE_URL=https://xxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc... (ANON KEY - public)
   VITE_BACKEND_URL=https://workigom-backend.onrender.com

5. "Create Static Site" butonuna tık
```

#### **4.2. Deploy İzle**

```
Build Logs:
✅ npm install...
✅ npm run build...
✅ vite build...
✅ Build complete!
✅ Publish to CDN...
✅ Deploy successful!

Frontend URL:
https://workigom-frontend.onrender.com
```

**✅ FRONTEND HAZIR!**

---

## 🎉 TAMAMLANDI! UYGULAMANIZ YAYINDA!

### **🌐 URL'LER:**

```
Frontend (Kullanıcı Arayüzü):
https://workigom-frontend.onrender.com

Backend (API):
https://workigom-backend.onrender.com

Database (Supabase):
https://[project].supabase.co
```

---

## 🧪 TEST ET

### **1. Frontend Test:**

```
1. https://workigom-frontend.onrender.com adresine git
2. "Kayıt Ol" butonuna tık
3. Yeni kullanıcı oluştur:
   - Email: test@workigom.com
   - Password: Test123456!
   - Ad Soyad: Test Kullanıcı
   - Telefon: 05551234567
   - Kullanıcı Tipi: Bireysel
4. Giriş yap
5. Ana sayfayı gör
```

### **2. Backend Test:**

```bash
# Terminal'de:
curl https://workigom-backend.onrender.com/make-server-018e1998/health

# Başarılı ise:
{"status":"ok","timestamp":"2025-11-08T..."}
```

### **3. Database Test:**

```
1. Supabase Dashboard > Database > Tables
2. "users" tablosunu seç
3. Yeni oluşturduğun test kullanıcısını gör
```

---

## 🔄 GÜNCELLEME NASIL YAPILIR?

### **Kod Değişikliği Yaptığınızda:**

```bash
# 1. Değişiklikleri commit et
git add .
git commit -m "Yeni özellik: X eklendi"
git push

# 2. Render.com otomatik deploy eder!
# Dashboard'dan izleyebilirsiniz
```

### **Manual Deploy:**

```
Render.com Dashboard:
1. Service'i seç (frontend veya backend)
2. "Manual Deploy" > "Deploy latest commit"
```

---

## ⚙️ ENVIRONMENT VARIABLES YÖNETİMİ

### **Frontend Environment Variables:**

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc... (public key)
VITE_BACKEND_URL=https://workigom-backend.onrender.com
```

**⚠️ DİKKAT**: Frontend'de sadece `VITE_` prefix'li değişkenler kullanılabilir!

### **Backend Environment Variables:**

```env
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc... (public key)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (⚠️ SECRET!)
SUPABASE_DB_URL=postgresql://postgres:...
PORT=10000
```

**🔒 GÜVENLİK**: Service Role Key asla frontend'e verilmemeli!

---

## 🆓 RENDER.COM FREE TIER LİMİTLERİ

### **Static Site (Frontend):**
- ✅ Unlimited bandwidth
- ✅ Global CDN
- ✅ Custom domain
- ✅ Auto SSL
- ✅ $0/month

### **Web Service (Backend):**
- ⚠️ 750 saat/ay (yaklaşık 31 gün)
- ⚠️ Inactivity sonrası sleep mode
- ⚠️ İlk istek 30-60 saniye sürebilir
- ✅ Custom domain
- ✅ Auto SSL
- ✅ $0/month

### **🎯 TİP**: Backend sürekli aktif kalması için:

**Yöntem 1: Uptime Robot**
```
1. https://uptimerobot.com/ hesap aç
2. Monitor ekle:
   - Type: HTTP(s)
   - URL: https://workigom-backend.onrender.com/make-server-018e1998/health
   - Interval: 5 dakika
3. Backend her 5 dakikada bir ping alır, sleep olmaz
```

**Yöntem 2: Paid Plan**
```
$7/month - Always-on instance
- Sleep mode yok
- 400 GB bandwidth
- Daha hızlı CPU
```

---

## 🐛 SORUN GİDERME

### **❌ Problem: Backend 503 Error**

**Sebep**: Backend sleep mode'da

**Çözüm**:
```
1. 30-60 saniye bekle (cold start)
2. Uptime Robot kullan (ücretsiz)
3. Paid plan'e geç ($7/ay)
```

### **❌ Problem: Frontend Environment Variables Görünmüyor**

**Sebep**: Vite build sırasında inject eder

**Çözüm**:
```
1. Render.com Dashboard > Frontend Service
2. Environment > Add Variable
3. VITE_ prefix'i ekle
4. Manual Deploy
```

### **❌ Problem: CORS Error**

**Sebep**: Backend CORS ayarları

**Çözüm**:
```javascript
// /supabase/functions/server/index.tsx
cors({
  origin: "*", // Veya specific domain
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
})
```

### **❌ Problem: Database Connection Error**

**Sebep**: Yanlış connection string

**Çözüm**:
```
1. Supabase Dashboard > Settings > Database
2. Connection String > URI'yi kopyala
3. Render.com > Backend > Environment > SUPABASE_DB_URL
4. Redeploy
```

---

## 📊 DASHBOARD İZLEME

### **Frontend Metrics:**
```
Render.com Dashboard > workigom-frontend:
- Requests/day
- Bandwidth usage
- Deploy history
- Build logs
```

### **Backend Metrics:**
```
Render.com Dashboard > workigom-backend:
- CPU usage
- Memory usage
- Response time
- Deploy history
- Runtime logs
```

### **Database Metrics:**
```
Supabase Dashboard:
- Database > Usage
- Auth > Users
- Storage > Objects
- API > Logs
```

---

## 💰 MALİYET HESAPLAMA

### **Ücretsiz Seçenek:**
```
Frontend:     $0/month (Unlimited)
Backend:      $0/month (750 hours)
Database:     $0/month (Supabase Free - 500MB)
Domain:       $0-15/year (Optional)
─────────────────────────────
TOPLAM:       $0-15/year
```

### **Profesyonel Seçenek:**
```
Frontend:     $0/month (Static site)
Backend:      $7/month (Always-on)
Database:     $25/month (Supabase Pro - 8GB)
Domain:       $15/year
CDN:          $0 (Included)
SSL:          $0 (Free)
─────────────────────────────
TOPLAM:       ~$32/month + $15/year
```

---

## 🎯 SONRAKI ADIMLAR

### **1. Custom Domain Ekle (Optional)**

```
1. Render.com Dashboard > Frontend Service
2. Settings > Custom Domains
3. "Add Custom Domain" butonuna tık
4. Domain: workigom.com
5. DNS ayarlarını yap:
   - Type: CNAME
   - Name: @
   - Value: workigom-frontend.onrender.com
```

### **2. SSL Sertifikası (Otomatik)**

```
✅ Render.com otomatik Let's Encrypt SSL verir
✅ HTTPS zorunlu
✅ Yenileme otomatik
```

### **3. Analytics Ekle**

```javascript
// Google Analytics
// Frontend > index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

### **4. Error Tracking**

```javascript
// Sentry.io
npm install @sentry/react
// App.tsx'te init et
```

---

## ✅ BAŞARI KRİTERLERİ

### **Tamamlanması Gereken:**

- [ ] Supabase projesi oluşturuldu
- [ ] Migration'lar çalıştırıldı
- [ ] Auth ayarları yapıldı
- [ ] GitHub'a push edildi
- [ ] Backend Render.com'da deploy edildi
- [ ] Frontend Render.com'da deploy edildi
- [ ] Health check başarılı
- [ ] Test kullanıcısı oluşturuldu
- [ ] Giriş yapıldı
- [ ] Tüm sayfalar çalışıyor

---

## 📞 YARDIM VE DESTEK

### **Render.com Docs:**
- https://render.com/docs

### **Supabase Docs:**
- https://supabase.com/docs

### **Workigom GitHub:**
- https://github.com/[kullanici-adin]/workigom

---

## 🎉 TEBRİKLER!

Workigom uygulamanız artık canlı yayında! 🚀

```
Frontend: https://workigom-frontend.onrender.com
Backend:  https://workigom-backend.onrender.com
```

**İyi çalışmalar!** 💪
