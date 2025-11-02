# Workigom Backend API

Node.js + Express + TypeScript + PostgreSQL + Prisma backend API.

## 🚀 Hızlı Başlangıç

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# .env dosyasını oluştur
cp .env.example .env

# Prisma client oluştur
npm run prisma:generate

# Migration'ları çalıştır
npm run prisma:migrate

# Seed data ekle
npm run prisma:seed

# Geliştirme modunda başlat
npm run dev
```

## 📋 Scripts

- `npm run dev` - Development server (nodemon)
- `npm run build` - TypeScript build
- `npm start` - Production server
- `npm run prisma:generate` - Prisma client oluştur
- `npm run prisma:migrate` - Migration çalıştır
- `npm run prisma:studio` - Prisma Studio GUI
- `npm run prisma:seed` - Seed data ekle
- `npm run admin:create` - Admin kullanıcısı oluştur
- `npm run admin:promote` - Kullanıcıyı admin yap

## 🔧 Environment Variables

`.env` dosyasında yapılandırılması gereken değişkenler:

```env
# Server
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/database

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRES_IN=30d

# CORS
CORS_ORIGIN=http://localhost:5173

# File Upload
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/jpg,application/pdf
```

## 📁 Klasör Yapısı

```
src/
├── controllers/      # Route controllers
├── routes/           # API routes
├── middleware/       # Custom middleware
├── services/         # Business logic
├── utils/            # Utility functions
├── types/            # TypeScript types
├── config/           # Configuration
├── app.ts            # Express app
└── server.ts         # Server entry point

prisma/
├── schema.prisma     # Database schema
└── seed.ts           # Seed data

uploads/
├── resumes/          # CV dosyaları
└── avatars/          # Profil fotoğrafları
```

## 🔌 API Endpoints

### Health Check
- `GET /api/health` - API sağlık kontrolü

### Authentication
- `POST /api/auth/register` - Kayıt
- `POST /api/auth/login` - Giriş
- `POST /api/auth/verify-email` - Email doğrulama
- `POST /api/auth/forgot-password` - Şifre sıfırlama
- `POST /api/auth/reset-password` - Şifre değiştirme
- `GET /api/auth/me` - Mevcut kullanıcı (🔒)

### Users
- `GET /api/users` - Liste (🔒 Admin)
- `GET /api/users/:id` - Detay (🔒)
- `PUT /api/users/:id` - Güncelle (🔒)
- `PUT /api/users/:id/avatar` - Avatar yükle (🔒)
- `DELETE /api/users/:id` - Sil (🔒 Admin)

### Jobs
- `GET /api/jobs` - Liste
- `GET /api/jobs/:id` - Detay
- `POST /api/jobs` - Oluştur (🔒 Corporate/Admin)
- `PUT /api/jobs/:id` - Güncelle (🔒)
- `DELETE /api/jobs/:id` - Sil (🔒)
- `PUT /api/jobs/:id/approve` - Onayla (🔒 Admin)
- `PUT /api/jobs/:id/reject` - Reddet (🔒 Admin)

### Applications
- `GET /api/applications` - Liste (🔒)
- `GET /api/applications/:id` - Detay (🔒)
- `POST /api/applications` - Başvur (🔒)
- `PUT /api/applications/:id/status` - Durum güncelle (🔒)
- `DELETE /api/applications/:id` - Sil (🔒)

### Donations
- `GET /api/donations` - Liste
- `GET /api/donations/:id` - Detay
- `POST /api/donations` - Oluştur (🔒 Corporate/Admin)
- `PUT /api/donations/:id` - Güncelle (🔒)
- `PUT /api/donations/:id/request` - Talep et (🔒)
- `PUT /api/donations/:id/complete` - Tamamla (🔒)
- `DELETE /api/donations/:id` - Sil (🔒)

### Messages
- `GET /api/messages` - Liste (🔒)
- `GET /api/messages/conversations` - Konuşmalar (🔒)
- `POST /api/messages` - Gönder (🔒)
- `PUT /api/messages/:id/read` - Okundu (🔒)
- `DELETE /api/messages/:id` - Sil (🔒)

### Notifications
- `GET /api/notifications` - Liste (🔒)
- `GET /api/notifications/unread-count` - Sayı (🔒)
- `PUT /api/notifications/:id/read` - Okundu (🔒)
- `PUT /api/notifications/read-all` - Tümü okundu (🔒)
- `DELETE /api/notifications/:id` - Sil (🔒)

## 🔐 Authentication

JWT token kullanılır. Token'ı header'a ekleyin:

```
Authorization: Bearer <token>
```

## 🗄️ Database Schema

Prisma şemasını görmek için:
```bash
npm run prisma:studio
```

Veya `prisma/schema.prisma` dosyasına bakın.

## 🧪 Testing

```bash
# API'yi test et
curl http://localhost:3001/api/health

# Login test
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@workigom.com","password":"admin123"}'
```

## 📦 Deployment

### Docker

```bash
# Build
docker build -t workigom-backend .

# Run
docker run -p 3001:3001 --env-file .env workigom-backend
```

### Production

```bash
# Build
npm run build

# Start
npm start
```

## 🔒 Security Features

- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Request validation
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ SQL injection protection (Prisma)

## 📝 Error Handling

API yanıtları standardize edilmiştir:

**Success:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

**Paginated:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## 🐛 Debugging

```bash
# Prisma Studio ile veritabanını görüntüle
npm run prisma:studio

# Migration durumunu kontrol et
npx prisma migrate status

# Logs
tail -f logs/app.log
```

## 🔑 Admin User Management

### Default Admin Credentials

```
Email: admin@workigom.com
Password: Admin123!
```

⚠️ **Change password after first login!**

### Creating Admin User

To create the default admin user:

```bash
npm run admin:create
```

### Promoting User to Admin

To promote an existing user to admin role:

```bash
# Interactive mode (lists all users)
npm run admin:promote

# Direct mode
npx ts-node scripts/promote-to-admin.ts user@example.com
```

### Admin Endpoints

These endpoints require ADMIN role:
- `GET /api/users` - List all users
- `POST /api/admin/send-notification` - Send notifications
- `DELETE /api/users/:id` - Delete users
- `PUT /api/jobs/:id/approve` - Approve jobs
- `PUT /api/jobs/:id/reject` - Reject jobs

### Troubleshooting 403 Errors

If you get 403 Forbidden errors on admin endpoints:

1. Verify user has ADMIN role in database
2. Run admin creation script: `npm run admin:create`
3. Or promote existing user: `npm run admin:promote`
4. Login again to get new token with ADMIN role

📖 **See [ADMIN_USER_FIX_GUIDE.md](../ADMIN_USER_FIX_GUIDE.md) for detailed instructions**

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Admin User Fix Guide](../ADMIN_USER_FIX_GUIDE.md)
- [Admin Quick Reference](../ADMIN_QUICK_REFERENCE.md)
