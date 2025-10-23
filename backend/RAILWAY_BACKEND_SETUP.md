# 🚂 Railway Backend Deployment Rehberi

Bu rehber, Workigom backend'ini Railway'e doğru şekilde deploy etmek için gereken **DETAYLI** adımları içermektedir.

---

## ⚠️ Sorun Nedir?

Railway, default olarak **root directory**'deki Dockerfile'ı kullanmaya çalışır. Ancak:
- Root'ta **frontend** Dockerfile'ı var
- Backend Dockerfile **backend/** dizininde

Bu yüzden Railway yanlış Dockerfile'ı kullanıp hata veriyor:
```
COPY --from=builder /app/dist /usr/share/nginx/html
"/app/dist": not found
```

---

## ✅ Çözüm: Railway'de Root Directory Ayarlama

### Adım 1: Railway Dashboard'a Giriş

1. **Railway Dashboard**'a gidin: https://railway.app/dashboard
2. Projenizi bulun ve tıklayın
3. **Backend service**'inizi seçin

---

### Adım 2: Service Settings'e Gitme

Railway Dashboard'da backend service'inizi seçtikten sonra:

1. **Sağ üst köşede** `Settings` butonuna tıklayın
   - 🎯 **Görsel Referans**: Ekranın sağ üstünde, service adının yanında
   - ⚙️ İkon: Dişli çark simgesi

2. Settings sayfası açılacak - **Bu sayfa çok uzun, aşağı kaydırmanız gerekecek**

---

### Adım 3: Build & Deploy Ayarları

Settings sayfasında **aşağı kaydırın** ve şu bölümleri bulun:

#### 🎯 Bölüm 1: Root Directory

1. **"Build"** sekmesini arayın (sol tarafta olabilir)
2. **"Root Directory"** ayarını bulun
3. Değeri şu şekilde ayarlayın:
   ```
   backend
   ```
   ⚠️ **ÖNEMLİ**: Başında ve sonunda slash (/) OLMAMALI

#### 🎯 Bölüm 2: Build Command (Opsiyonel)

Railway otomatik olarak Dockerfile'ı kullanacak, ama manuel ayarlamak isterseniz:
```bash
npm install && npm run build
```

#### 🎯 Bölüm 3: Start Command

Start command zaten Dockerfile'da tanımlı, ama override etmek isterseniz:
```bash
node dist/server.js
```

---

### Adım 4: Dockerfile Path Kontrolü

1. Settings sayfasında **"Dockerfile Path"** ayarını bulun
2. Değer şu şekilde olmalı:
   ```
   Dockerfile
   ```
   
⚠️ **NOT**: Root directory "backend" olarak ayarlandığı için, bu path `backend/Dockerfile`'a işaret edecek.

---

### Adım 5: Environment Variables

Settings sayfasında **"Variables"** sekmesine gidin ve şu değişkenleri ekleyin:

| Variable | Değer | Açıklama |
|----------|-------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Railway PostgreSQL plugin'den alın |
| `JWT_SECRET` | Güçlü bir secret | Rastgele 32+ karakter |
| `PORT` | `3001` | Backend port |
| `NODE_ENV` | `production` | Production environment |

**DATABASE_URL nasıl alınır:**
1. Railway Dashboard'da **PostgreSQL service**'inizi seçin
2. **"Variables"** sekmesine gidin
3. `DATABASE_URL` değişkenini kopyalayın
4. Backend service'inde `DATABASE_URL` olarak ekleyin

---

### Adım 6: Deploy

1. **Tüm ayarları kaydedin**
2. Railway otomatik olarak yeniden deploy edecek
3. Logs'u izleyin:
   - Service sayfasında **"Deployments"** sekmesine gidin
   - En son deployment'a tıklayın
   - **"View Logs"** butonuna tıklayın

---

## 📋 Kontrol Listesi

Deployment öncesi kontrol edin:

- [ ] ✅ Root Directory: `backend`
- [ ] ✅ Dockerfile Path: `Dockerfile`
- [ ] ✅ Environment Variables eklendi
- [ ] ✅ DATABASE_URL PostgreSQL'den alındı
- [ ] ✅ JWT_SECRET güçlü ve güvenli
- [ ] ✅ PORT: 3001
- [ ] ✅ NODE_ENV: production

---

## 🎯 Railway Dashboard Sekme Rehberi

### Sol Sidebar (Service Seçimi)
```
┌─────────────────────┐
│ 🏠 Projects         │
│ 📊 Dashboard        │
│                     │
│ YOUR PROJECT        │
│ ├─ 🗄️ PostgreSQL   │
│ └─ ⚙️ Backend      │ ← Buraya tıklayın
└─────────────────────┘
```

### Üst Menü (Service Detayları)
```
┌────────────────────────────────────────────────────┐
│ Backend Service        Settings ⚙️   Deploy 🚀    │
└────────────────────────────────────────────────────┘
     ↑                        ↑
   Service Adı            Ayarlara git
```

### Settings Sayfası Bölümleri
```
Settings
├─ 📦 General
│  └─ Service Name, Description
│
├─ 🔨 Build
│  ├─ Root Directory     ← ÖNEMLİ: "backend" yazın
│  ├─ Dockerfile Path    ← "Dockerfile" olmalı
│  ├─ Build Command
│  └─ Watch Paths
│
├─ 🚀 Deploy
│  ├─ Start Command
│  ├─ Healthcheck Path
│  └─ Restart Policy
│
├─ 🔑 Variables
│  └─ Environment variables ekleyin
│
└─ 🌐 Networking
   └─ Public Domain, Port
```

---

## 🔍 Log İnceleme

Deployment başarılı olduysa logs'da şunları görmelisiniz:

```bash
✅ Dockerfile bulundu: backend/Dockerfile
✅ Building Docker image...
✅ Prisma migrations çalıştırılıyor...
✅ Server starting on port 3001...
🎉 Workigom Backend is running!
```

---

## ❌ Sık Karşılaşılan Hatalar

### Hata 1: "Dockerfile not found"
**Çözüm**: Root Directory ayarını `backend` olarak ayarlayın

### Hata 2: "/app/dist: not found"
**Çözüm**: Bu frontend Dockerfile hatası - Root Directory'nin `backend` olduğundan emin olun

### Hata 3: "Cannot find module 'dist/server.js'"
**Çözüm**: Build işleminin başarılı olduğundan emin olun. Logs'da `npm run build` çıktısını kontrol edin

### Hata 4: "Database connection failed"
**Çözüm**: DATABASE_URL environment variable'ının doğru ayarlandığından emin olun

---

## 📸 Ekran Görüntüsü Referansları

### 1. Root Directory Ayarı
Railway Settings sayfasında şöyle görünür:
```
┌──────────────────────────────────────┐
│ Build                                │
├──────────────────────────────────────┤
│                                      │
│ Root Directory                       │
│ ┌──────────────────────────────┐    │
│ │ backend                      │    │
│ └──────────────────────────────┘    │
│                                      │
│ Dockerfile Path                      │
│ ┌──────────────────────────────┐    │
│ │ Dockerfile                   │    │
│ └──────────────────────────────┘    │
│                                      │
└──────────────────────────────────────┘
```

### 2. Environment Variables
Variables sekmesinde:
```
┌──────────────────────────────────────┐
│ Variables                            │
├──────────────────────────────────────┤
│ DATABASE_URL    = postgresql://...  │
│ JWT_SECRET      = ****************  │
│ PORT            = 3001              │
│ NODE_ENV        = production        │
│                                      │
│ [+ Add Variable]                    │
└──────────────────────────────────────┘
```

---

## 🎓 Özet

1. **Railway Dashboard** → Projenizi seçin → Backend service
2. **Settings** ⚙️ → Build bölümü
3. **Root Directory** = `backend`
4. **Dockerfile Path** = `Dockerfile`
5. **Variables** → Environment variables ekleyin
6. **Deploy** → Logs'u izleyin

---

## 🆘 Yardım

Sorun yaşarsanız:
1. Railway logs'unu kontrol edin
2. Root Directory ayarını tekrar kontrol edin
3. Environment variables'ları doğrulayın
4. Bu rehberi baştan sona okuyun

**Başarılar! 🚀**
