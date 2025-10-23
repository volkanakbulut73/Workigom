# 🚀 Workigom - İş Bulma ve Yemek Bağışı Platformu

Workigom, iş arayanlar ile işverenleri ve yemek bağışçılarını bir araya getiren full-stack bir web uygulamasıdır.

## 📋 İçindekiler

- [Özellikler](#özellikler)
- [Teknoloji Stack](#teknoloji-stack)
- [Proje Yapısı](#proje-yapısı)
- [Kurulum](#kurulum)
- [API Dokümantasyonu](#api-dokümantasyonu)
- [Docker ile Çalıştırma](#docker-ile-çalıştırma)
- [Veritabanı Şeması](#veritabanı-şeması)
- [Test Kullanıcıları](#test-kullanıcıları)
- [Geliştirme](#geliştirme)
- [Production Deployment](#production-deployment)

## ✨ Özellikler

### İş Bulma Modülü
- ✅ İş ilanları oluşturma ve yönetme
- ✅ İş arama ve filtreleme
- ✅ İş başvuruları
- ✅ Acil iş talepleri
- ✅ Başvuru durumu takibi
- ✅ CV yükleme

### Yemek Bağışı Modülü
- ✅ Yemek bağışı ilanları
- ✅ Bağış arama ve filtreleme
- ✅ Bağış talep etme
- ✅ Bağış durumu takibi

### Kullanıcı Yönetimi
- ✅ Kayıt ve giriş sistemi
- ✅ JWT token tabanlı authentication
- ✅ Role-based authorization (Individual, Corporate, Admin)
- ✅ Profil yönetimi
- ✅ Profil fotoğrafı yükleme
- ✅ Email doğrulama
- ✅ Şifre sıfırlama

### Mesajlaşma ve Bildirimler
- ✅ Kullanıcılar arası mesajlaşma
- ✅ Bildirim sistemi
- ✅ Okundu/okunmadı takibi

### Admin Panel
- ✅ İş ilanı onay/reddetme
- ✅ Kullanıcı yönetimi
- ✅ Sistem istatistikleri

## 🛠 Teknoloji Stack

### Frontend
- **React 18** - UI kütüphanesi
- **TypeScript** - Tip güvenli JavaScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Radix UI** - UI componentleri
- **Axios** - HTTP client
- **React Hook Form** - Form yönetimi

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Tip güvenli JavaScript
- **PostgreSQL** - Veritabanı
- **Prisma ORM** - Database ORM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload
- **Express Validator** - Validation

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Web server (production)

## 📁 Proje Yapısı

```
workigom/
├── backend/                    # Backend API
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Custom middleware
│   │   ├── services/          # Business logic
│   │   ├── utils/             # Utility functions
│   │   ├── types/             # TypeScript types
│   │   ├── config/            # Configuration files
│   │   ├── app.ts             # Express app setup
│   │   └── server.ts          # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   └── seed.ts            # Seed data
│   ├── uploads/               # Uploaded files
│   ├── .env                   # Environment variables
│   ├── Dockerfile             # Backend Docker config
│   └── package.json
├── src/                       # Frontend source
│   ├── components/            # React components
│   ├── lib/                   # Utilities
│   └── styles/                # CSS files
├── docker-compose.yml         # Docker Compose config
├── Dockerfile                 # Frontend Docker config
├── nginx.conf                 # Nginx configuration
└── README.md
```

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- PostgreSQL 14+
- npm veya yarn

### 1. Repository'yi Klonlayın
```bash
git clone <repository-url>
cd workigom
```

### 2. Backend Kurulumu

```bash
cd backend

# Bağımlılıkları yükleyin
npm install

# .env dosyasını oluşturun
cp .env.example .env

# .env dosyasını düzenleyin ve veritabanı bilgilerini girin
nano .env
```

### 3. Veritabanı Kurulumu

PostgreSQL'i kurun ve çalıştırın:
```bash
# PostgreSQL servisini başlatın
sudo systemctl start postgresql

# Veritabanı oluşturun
sudo -u postgres psql
CREATE DATABASE workigom_db;
CREATE USER workigom_user WITH PASSWORD 'workigom_password';
GRANT ALL PRIVILEGES ON DATABASE workigom_db TO workigom_user;
\q
```

Prisma migration'larını çalıştırın:
```bash
cd backend

# Prisma client oluşturun
npm run prisma:generate

# Migration'ları çalıştırın
npm run prisma:migrate

# Seed data ekleyin
npm run prisma:seed
```

### 4. Backend'i Başlatın

```bash
cd backend

# Development modunda
npm run dev

# Production modunda
npm run build
npm start
```

Backend şimdi `http://localhost:3001` adresinde çalışıyor.

### 5. Frontend Kurulumu

```bash
# Ana dizine dönün
cd ..

# Bağımlılıkları yükleyin
npm install

# Development modunda başlatın
npm run dev
```

Frontend şimdi `http://localhost:5173` adresinde çalışıyor.

## 🐳 Docker ile Çalıştırma

Tüm uygulamayı Docker ile çalıştırmak için:

```bash
# Tüm servisleri başlatın
docker-compose up -d

# Logları görüntüleyin
docker-compose logs -f

# Servisleri durdurun
docker-compose down

# Veritabanı ile birlikte temizleyin
docker-compose down -v
```

Servisler:
- Frontend: `http://localhost:80`
- Backend: `http://localhost:3001`
- PostgreSQL: `localhost:5432`

## 📚 API Dokümantasyonu

### Base URL
```
http://localhost:3001/api
```

### Authentication
Tüm korumalı endpoint'ler için Header'a JWT token ekleyin:
```
Authorization: Bearer <token>
```

### Endpoints

#### Authentication (`/api/auth`)
- `POST /register` - Kullanıcı kaydı
- `POST /login` - Kullanıcı girişi
- `POST /verify-email` - Email doğrulama
- `POST /forgot-password` - Şifre sıfırlama talebi
- `POST /reset-password` - Şifre sıfırlama
- `GET /me` - Mevcut kullanıcı bilgisi (🔒)

#### Users (`/api/users`)
- `GET /` - Tüm kullanıcıları listele (🔒 Admin)
- `GET /:id` - Kullanıcı detayı (🔒)
- `PUT /:id` - Kullanıcı güncelle (🔒)
- `PUT /:id/avatar` - Avatar yükle (🔒)
- `DELETE /:id` - Kullanıcı sil (🔒 Admin)

#### Jobs (`/api/jobs`)
- `GET /` - İş ilanlarını listele
- `GET /:id` - İş ilanı detayı
- `POST /` - İş ilanı oluştur (🔒 Corporate/Admin)
- `PUT /:id` - İş ilanı güncelle (🔒)
- `DELETE /:id` - İş ilanı sil (🔒)
- `PUT /:id/approve` - İş ilanı onayla (🔒 Admin)
- `PUT /:id/reject` - İş ilanı reddet (🔒 Admin)

#### Applications (`/api/applications`)
- `GET /` - Başvuruları listele (🔒)
- `GET /:id` - Başvuru detayı (🔒)
- `POST /` - Başvuru yap (🔒)
- `PUT /:id/status` - Başvuru durumu güncelle (🔒)
- `DELETE /:id` - Başvuru sil (🔒)

#### Donations (`/api/donations`)
- `GET /` - Bağışları listele
- `GET /:id` - Bağış detayı
- `POST /` - Bağış oluştur (🔒 Corporate/Admin)
- `PUT /:id` - Bağış güncelle (🔒)
- `PUT /:id/request` - Bağış talep et (🔒)
- `PUT /:id/complete` - Bağış tamamla (🔒)
- `DELETE /:id` - Bağış sil (🔒)

#### Messages (`/api/messages`)
- `GET /` - Mesajları listele (🔒)
- `GET /conversations` - Konuşmaları listele (🔒)
- `POST /` - Mesaj gönder (🔒)
- `PUT /:id/read` - Okundu işaretle (🔒)
- `DELETE /:id` - Mesaj sil (🔒)

#### Notifications (`/api/notifications`)
- `GET /` - Bildirimleri listele (🔒)
- `GET /unread-count` - Okunmamış sayısı (🔒)
- `PUT /:id/read` - Okundu işaretle (🔒)
- `PUT /read-all` - Tümünü okundu işaretle (🔒)
- `DELETE /:id` - Bildirim sil (🔒)

### Query Parameters

**Pagination:**
- `page` - Sayfa numarası (default: 1)
- `limit` - Sayfa başı kayıt (default: 10)

**Filtering:**
- `status` - Durum filtresi
- `search` - Arama terimi
- `role` - Rol filtresi
- `jobId` - İş ID filtresi
- `userId` - Kullanıcı ID filtresi

## 🗄️ Veritabanı Şeması

### Tablolar
- **users** - Kullanıcılar
- **jobs** - İş ilanları
- **applications** - İş başvuruları
- **donations** - Yemek bağışları
- **messages** - Mesajlar
- **notifications** - Bildirimler

Detaylı şema için `backend/prisma/schema.prisma` dosyasına bakın.

## 👤 Test Kullanıcıları

Seed data ile oluşturulan test kullanıcıları:

### Admin
- Email: `admin@workigom.com`
- Şifre: `admin123`

### Corporate (İşveren)
- Email: `company1@workigom.com`
- Şifre: `company123`

- Email: `company2@workigom.com`
- Şifre: `company123`

### Individual (İş Arayan)
- Email: `mehmet@example.com`
- Şifre: `user123`

- Email: `ayse@example.com`
- Şifre: `user123`

## 🔧 Geliştirme

### Backend Development

```bash
cd backend

# Watch mode
npm run dev

# Prisma Studio (Database GUI)
npm run prisma:studio

# Migrations
npm run prisma:migrate

# Generate Prisma Client
npm run prisma:generate
```

### Frontend Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚢 Production Deployment

### Environment Variables

Production için `.env` dosyasını güncelleyin:
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=<güçlü-secret-key>
JWT_REFRESH_SECRET=<güçlü-refresh-secret>
CORS_ORIGIN=https://yourdomain.com
```

### Build & Deploy

```bash
# Backend build
cd backend
npm run build

# Frontend build
cd ..
npm run build

# Docker ile deploy
docker-compose up -d
```

### Nginx Configuration

Production için nginx.conf dosyasını domain'inize göre güncelleyin.

## 🔐 Güvenlik

- ✅ JWT token authentication
- ✅ Password hashing (bcrypt)
- ✅ CORS configuration
- ✅ Helmet.js security headers
- ✅ Rate limiting
- ✅ Input validation
- ✅ SQL injection protection (Prisma)
- ✅ XSS protection

## 📝 Lisans

MIT

## 👥 Katkıda Bulunma

Pull request'ler memnuniyetle karşılanır. Büyük değişiklikler için lütfen önce bir issue açın.

## 📧 İletişim

Sorularınız için: info@workigom.com

---

Made with ❤️ by Workigom Team
