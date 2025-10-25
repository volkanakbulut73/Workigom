# ⚡ Hızlı Seed Referansı

## 🚀 Tek Komutta Seed

```bash
# Backend dizininde
cd backend
npm run prisma:seed
```

## 🔑 Hızlı Giriş Bilgileri

| Rol | Email | Şifre |
|-----|-------|-------|
| 👤 Admin | `admin@workigom.com` | `admin123` |
| 🏢 İşveren | `company1@workigom.com` | `company123` |
| 👥 İş Arayan | `mehmet@example.com` | `user123` |

## 📋 Railway'de Çalıştırma

```bash
# Railway CLI ile
railway run npm run prisma:seed

# Veya
railway run npx prisma db seed
```

## 🔄 Veritabanını Sıfırla

```bash
npm run prisma:migrate reset
# Bu otomatik olarak seed'i de çalıştırır
```

## ✅ Kontrol Et

```bash
# Prisma Studio'da görüntüle
npm run prisma:studio

# Tarayıcıda: http://localhost:5555
```

## 📊 Oluşturulan Veriler

- ✅ 10 Kullanıcı (1 Admin, 4 Kurumsal, 5 Bireysel)
- ✅ 5 İş İlanı
- ✅ 5 Başvuru
- ✅ 5 Bağış
- ✅ 4 Mesaj
- ✅ 6 Bildirim

## 🐛 Hızlı Sorun Giderme

```bash
# Prisma client yeniden oluştur
npm run prisma:generate

# Migration'ları çalıştır
npm run prisma:migrate:deploy

# Bağlantıyı test et
echo $DATABASE_URL
```

## 📚 Detaylı Dökümantasyon

- [Test Kullanıcı Bilgileri](./TEST_USERS_CREDENTIALS.md)
- [Tam Seed Rehberi](./DATABASE_SEEDING_GUIDE.md)
