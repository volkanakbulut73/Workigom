# 🚀 WORKIGOM - Hızlı Başvuru Rehberi

## 📧 Kullanıcı Bilgileri

### Admin
- **Email:** `cicicars.com@gmail.com`
- **Şifre:** (magic link veya manuel belirlenen şifre)
- **Tip:** `admin`
- **Giriş:** Landing page → "Admin Girişi" (footer)

### Test Kullanıcıları
- **Bireysel Kullanıcı:** Kayıt ekranından oluşturabilirsiniz
- **Kurumsal Kullanıcı:** Kayıt ekranından oluşturabilirsiniz

## 🌐 Deployment Adresleri

### Frontend (Render.com)
- **URL:** https://workigom-frontend.onrender.com
- **Build Command:** `npm run build`
- **Start Command:** `npm run preview`

### Backend (Render.com)
- **URL:** https://workigom-backend.onrender.com
- **Start Command:** `deno run --allow-net --allow-env --allow-read supabase/functions/server/index.tsx`

## 🔐 Environment Variables

### Frontend (.env)
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (.env)
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_DB_URL=your_database_url
```

## 🎨 Renk Paleti

```css
#012840 - Koyu Mavi (Dark Blue)
#0367A6 - Orta Mavi (Medium Blue)
#3F9BBF - Açık Mavi (Light Blue)
#C9E2F2 - Çok Açık Mavi (Very Light Blue)
```

## 📁 Proje Yapısı

```
workigom/
├── components/
│   ├── admin/           # Admin panel bileşenleri
│   ├── company/         # Kurumsal kullanıcı bileşenleri
│   ├── employee/        # Bireysel kullanıcı bileşenleri
│   ├── shared/          # Paylaşılan bileşenler
│   └── ui/              # ShadCN UI bileşenleri
├── contexts/
│   └── AuthContext.tsx  # Authentication context
├── utils/
│   └── supabase/        # Supabase utilities
├── supabase/
│   ├── functions/       # Edge functions
│   └── migrations/      # Database migrations
└── public/
    └── _redirects       # SPA routing için
```

## 🔧 Sık Karşılaşılan Sorunlar

### 1. "Duplicate key value" Hatası
**Sorun:** Email zaten kayıtlı  
**Çözüm:** ✅ Email kontrol mekanizması eklendi - kayıt öncesi email kontrolü yapılıyor

### 2. Admin Login Hatası
**Sorun:** Admin signup duplicate error  
**Çözüm:** ✅ Özel admin login ekranı oluşturuldu - landing page → Admin Girişi

### 3. Session/Token Sorunları
**Sorun:** Login sonrası token bulunamıyor  
**Çözüm:** ✅ Auth akışı iyileştirildi - PKCE flow, explicit storage, event-based handling

**Debug Tools:**
```javascript
// Browser console'da
window.debugAuth()          // Full auth debug
window.debugSession()       // Session check
window.debugLocalStorage()  // Storage check
window.clearAuthData()      // Clear all auth data
```

## 📝 GitHub Workflow

### Yerel Değişiklikleri GitHub'a Yükleme
```bash
# 1. Projeyi ZIP olarak indirin (Figma Make'den)
# 2. ZIP'i çıkartın
# 3. Git repository'ye girin
cd workigom

# 4. Değişiklikleri ekleyin
git add .

# 5. Commit yapın
git commit -m "Admin login sorunu çözüldü"

# 6. Push yapın
git push origin main
```

### Render.com Otomatik Deployment
- GitHub'a push yapıldığında otomatik deploy olur
- Build süreleri:
  - Frontend: ~3-5 dakika
  - Backend: ~2-3 dakika

## 🔧 Geliştirme Komutları

### Frontend
```bash
npm install          # Bağımlılıkları yükle
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Build'i önizle
```

### Backend
```bash
# Deno kullanılıyor
deno run --allow-net --allow-env --allow-read supabase/functions/server/index.tsx
```

## 📊 Database Schema

### Users Tablosu
- `id` (UUID) - Primary key
- `email` (TEXT) - Unique
- `full_name` (TEXT)
- `phone` (TEXT)
- `user_type` (TEXT) - 'individual' | 'corporate' | 'admin'
- `company_name` (TEXT) - Nullable
- `tax_number` (TEXT) - Nullable
- `address` (TEXT) - Nullable
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 🎯 Önemli Dosyalar

### Dokümantasyon
- `ADMIN_LOGIN_COZULDU.md` - Admin login çözüm detayları
- `HEMEN_COZUM_2_DK.md` - Magic link çözümü
- `START_HERE_FIGMA_MAKE.md` - Figma Make başlangıç rehberi

### Yapılandırma
- `render.yaml` - Render.com deployment config
- `vite.config.ts` - Vite configuration
- `package.json` - NPM dependencies

## 📞 Yardım ve Destek

### Sorun Yaşıyorsanız:
1. ✅ Console'da hata mesajlarını kontrol edin
2. ✅ Network tab'ında API çağrılarını inceleyin
3. ✅ `localStorage.clear()` deneyin
4. ✅ Browser cache'i temizleyin
5. ✅ Dev server'ı yeniden başlatın

### Debug Komutları (Browser Console)
```javascript
// LocalStorage temizle
localStorage.clear()

// Supabase bağlantısını kontrol et
console.log(import.meta.env.VITE_SUPABASE_URL)

// Auth durumunu kontrol et
// Auth context kullanılıyor
```

## ✅ Tamamlanan Özellikler

- ✅ Admin panel ve giriş sistemi
- ✅ Bireysel kullanıcı özellikleri
- ✅ Kurumsal kullanıcı özellikleri
- ✅ Bildirim sistemi
- ✅ Mesajlaşma sistemi
- ✅ İş ilanları yönetimi
- ✅ Başvuru sistemi
- ✅ Responsive tasarım (mobile + desktop)
- ✅ Supabase entegrasyonu
- ✅ Render.com deployment

## 🚀 Hızlı Test Senaryoları

### Admin Test
1. Landing page aç
2. Footer'da "Admin Girişi"
3. Email: `cicicars.com@gmail.com`
4. Şifre gir ve giriş yap
5. Admin paneli açılmalı

### Bireysel Kullanıcı Test
1. Landing page aç
2. "Giriş Yap" butonuna tıkla
3. "Bireysel Giriş" seç
4. Yeni kayıt oluştur veya giriş yap
5. Bireysel home sayfası açılmalı

### Kurumsal Kullanıcı Test
1. Landing page aç
2. "Giriş Yap" butonuna tıkla
3. "Kurumsal Giriş" seç
4. Yeni kayıt oluştur veya giriş yap
5. Kurumsal home sayfası açılmalı

---

**Son Güncelleme:** 11 Kasım 2025
**Durum:** ✅ Proje tamamen çalışır durumda
**Version:** v1.0.0