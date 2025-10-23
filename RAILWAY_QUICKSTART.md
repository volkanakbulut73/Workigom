# 🚀 Railway Backend Deploy - Hızlı Başlangıç

## ⚡ 3 Adımda Deploy

### 1️⃣ Railway'de Servis Oluştur

1. https://railway.app → Projeniz → **"+ New"** → **"GitHub Repo"**
2. `workigom` repository'sini seç

### 2️⃣ Ayarları Yap

**Settings** → **Build** bölümünde:

```
Root Directory: backend
```

Diğer ayarlar otomatik algılanacak ✅

### 3️⃣ Environment Variables Ekle

**Variables** sekmesinde:

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=your-super-secret-jwt-key-here-change-this
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-frontend-url.railway.app
MAX_FILE_SIZE=5242880
UPLOAD_DIR=uploads
```

**Deploy** butonuna tıkla! 🎉

---

## 🗄️ Database (PostgreSQL)

Railway'de **"+ New"** → **"Database"** → **"PostgreSQL"**

`DATABASE_URL` otomatik eklenecek.

---

## ✅ Deploy Sonrası Kontrol

1. **URL'yi test et**: `https://your-backend-url/api/health`
2. Başarılı yanıt: `{"status": "ok", "timestamp": "..."}`

---

## 🚨 Hata: "/app/dist": not found

**Çözüm**: Settings → Root Directory → `backend` olarak ayarla

---

## 📖 Detaylı Rehber

Daha fazla bilgi için: [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)

---

**Hazır! Backend şimdi Railway'de çalışıyor** 🚂✨
