# 🔐 Google OAuth Entegrasyon Rehberi - Workigom

## 📋 Genel Bakış

Workigom uygulamasında **bireysel kullanıcılar** için Google OAuth 2.0 ile hızlı ve güvenli giriş sistemi entegre edilmiştir. Bu özellik kullanıcıların tek tıkla Google hesaplarıyla giriş yapmasına olanak tanır.

---

## 🎨 Mevcut Tasarım

### Bireysel Kullanıcılar İçin Özel Tasarım
- **Gradient efektli buton**: Mavi-mor-pembe gradient blur efekti
- **Çift satırlı açıklama**: "Google ile Devam Et" + "Hızlı ve güvenli giriş"
- **Hover animasyonları**: Border rengi değişimi ve shadow artışı
- **Responsive tasarım**: Mobil ve desktop uyumlu

### Kurumsal Kullanıcılar İçin Standart Tasarım
- Daha minimal ve profesyonel görünüm
- Tek satırlı basit buton

---

## 🚀 Gerçek Google OAuth Entegrasyonu

### 1. Google Cloud Console Kurulumu

#### Adım 1: Proje Oluşturma
1. [Google Cloud Console](https://console.cloud.google.com/) adresine gidin
2. "New Project" butonuna tıklayın
3. Proje adı: `Workigom`
4. "Create" butonuna tıklayın

#### Adım 2: OAuth Consent Screen
1. Sol menüden **APIs & Services** > **OAuth consent screen** seçin
2. User Type: **External** seçin
3. App information:
   - App name: `Workigom`
   - User support email: `support@workigom.com`
   - App logo: Workigom logosunu yükleyin
4. App domain:
   - Homepage: `https://workigom.com`
   - Privacy policy: `https://workigom.com/privacy`
   - Terms of service: `https://workigom.com/terms`
5. Developer contact: `dev@workigom.com`
6. Scopes ekleyin:
   - `userinfo.email`
   - `userinfo.profile`
   - `openid`

#### Adım 3: Credentials Oluşturma
1. **APIs & Services** > **Credentials** seçin
2. **Create Credentials** > **OAuth client ID** tıklayın
3. Application type: **Web application**
4. Name: `Workigom Web Client`
5. Authorized JavaScript origins:
   ```
   http://localhost:5173
   https://workigom.com
   https://www.workigom.com
   ```
6. Authorized redirect URIs:
   ```
   http://localhost:5173/auth/google/callback
   https://workigom.com/auth/google/callback
   https://www.workigom.com/auth/google/callback
   ```
7. **Create** butonuna tıklayın
8. **Client ID** ve **Client Secret** değerlerini kaydedin

---

## 💻 Frontend Entegrasyonu

### Gerekli Kütüphaneler

```bash
npm install @react-oauth/google jwt-decode
```

### Environment Variables

`.env` dosyası oluşturun:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
VITE_API_URL=https://api.workigom.com
```

### React OAuth Provider Kurulumu

#### 1. `main.tsx` veya `index.tsx` dosyasını güncelleyin:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './styles/globals.css';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
```

#### 2. `LoginScreen.tsx` dosyasını güncelleyin:

```typescript
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// Component içinde:
const loginWithGoogle = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    try {
      // Google'dan kullanıcı bilgilerini al
      const userInfo = await axios.get(
        'https://www.googleapis.com/oauth2/v3/userinfo',
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        }
      );

      // Backend'e gönder
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/google`,
        {
          googleToken: tokenResponse.access_token,
          userData: userInfo.data,
          role: selectedRole, // 'individual' veya 'corporate'
        }
      );

      // JWT token'ı localStorage'a kaydet
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userRole', selectedRole!);

      // Kullanıcıyı yönlendir
      toast.success(`🎉 Google ile giriş başarılı!`);
      onRoleSelect(selectedRole!);
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Google ile giriş başarısız oldu. Lütfen tekrar deneyin.');
    }
  },
  onError: (error) => {
    console.error('Google OAuth error:', error);
    toast.error('Google ile bağlantı kurulamadı.');
  },
});

// Butona onClick olarak ekleyin:
const handleGoogleLogin = () => {
  loginWithGoogle();
};
```

---

## 🔧 Backend Entegrasyonu

### Node.js + Express Örneği

#### 1. Gerekli paketleri yükleyin:

```bash
npm install express google-auth-library jsonwebtoken bcrypt
```

#### 2. Google Auth Route oluşturun:

```javascript
// routes/auth.js
const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/auth/google', async (req, res) => {
  try {
    const { googleToken, userData, role } = req.body;

    // Google token'ı doğrula
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const googleId = payload['sub'];
    const email = payload['email'];
    const name = payload['name'];
    const picture = payload['picture'];

    // Kullanıcıyı veritabanında ara veya oluştur
    let user = await User.findOne({ email });

    if (!user) {
      // Yeni kullanıcı oluştur
      user = new User({
        email,
        role: role, // 'individual' veya 'corporate'
        personalInfo: {
          firstName: payload['given_name'],
          lastName: payload['family_name'],
          displayName: name,
          email,
          profilePhoto: picture,
        },
        googleId,
        verification: {
          emailVerified: payload['email_verified'],
          phoneVerified: false,
          identityVerified: false,
        },
        joinedAt: new Date(),
        lastActive: new Date(),
      });

      await user.save();
    } else {
      // Mevcut kullanıcı - son aktif zamanı güncelle
      user.lastActive = new Date();
      await user.save();
    }

    // JWT token oluştur
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.personalInfo.displayName,
        role: user.role,
        profilePhoto: user.personalInfo.profilePhoto,
      },
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({
      success: false,
      message: 'Google ile giriş başarısız oldu.',
    });
  }
});

module.exports = router;
```

#### 3. Environment Variables (Backend):

```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
JWT_SECRET=your_jwt_secret_here
MONGODB_URI=your_mongodb_connection_string
```

---

## 📊 Kullanıcı Veritabanı Şeması

### MongoDB Şeması Örneği

```javascript
// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Google OAuth bilgileri
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  
  // Temel bilgiler
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  
  role: {
    type: String,
    enum: ['individual', 'corporate', 'admin'],
    required: true,
  },
  
  // Bireysel kullanıcılar için
  personalInfo: {
    firstName: String,
    lastName: String,
    displayName: String,
    phone: String,
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    profilePhoto: String,
  },
  
  // Konum bilgileri
  location: {
    city: String,
    district: String,
    address: String,
  },
  
  // İş bilgileri (bireysel için)
  workInfo: {
    categories: [String],
    skills: [String],
    experience: String,
    availability: {
      type: String,
      enum: ['immediate', 'flexible', 'planned'],
    },
    preferredWorkHours: [String],
  },
  
  // İstatistikler
  stats: {
    totalJobsCompleted: { type: Number, default: 0 },
    totalEarnings: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    successRate: { type: Number, default: 0 },
    responseTime: String,
  },
  
  // Yemek bağışı bilgileri
  foodDonation: {
    donationsGiven: { type: Number, default: 0 },
    donationsReceived: { type: Number, default: 0 },
    goldenHeartBadges: { type: Number, default: 0 },
    totalDonatedAmount: { type: Number, default: 0 },
    totalReceivedAmount: { type: Number, default: 0 },
  },
  
  // Finansal bilgiler
  financials: {
    balance: { type: Number, default: 0 },
    totalWithdrawn: { type: Number, default: 0 },
    pendingPayments: { type: Number, default: 0 },
  },
  
  // Ayarlar
  settings: {
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
    },
    privacy: {
      showFullName: { type: Boolean, default: false },
      showPhone: { type: Boolean, default: false },
      showLocation: { type: Boolean, default: true },
    },
  },
  
  // Doğrulama
  verification: {
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    identityVerified: { type: Boolean, default: false },
  },
  
  // Tarihler
  joinedAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
```

---

## 🔒 Güvenlik Önlemleri

### 1. Token Doğrulama
- Her Google token'ı backend'de doğrulanmalıdır
- Frontend'den gelen token'lara güvenilmemelidir

### 2. HTTPS Kullanımı
- Production ortamında mutlaka HTTPS kullanın
- Mixed content engellenmelidir

### 3. CORS Ayarları
```javascript
// server.js
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://workigom.com',
    'https://www.workigom.com'
  ],
  credentials: true,
}));
```

### 4. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 10, // 10 deneme
  message: 'Çok fazla giriş denemesi. Lütfen 15 dakika sonra tekrar deneyin.',
});

app.use('/auth', authLimiter);
```

---

## 📱 Kullanıcı Deneyimi

### Başarılı Giriş Akışı
1. Kullanıcı "Google ile Devam Et" butonuna tıklar
2. Google OAuth popup penceresi açılır
3. Kullanıcı Google hesabını seçer
4. İzinleri onaylar
5. Token backend'e gönderilir
6. Kullanıcı profili oluşturulur/güncellenir
7. JWT token döner
8. Kullanıcı ana sayfaya yönlendirilir
9. Hoş geldin mesajı gösterilir

### Hata Yönetimi
- **Token doğrulama hatası**: "Google ile giriş başarısız. Tekrar deneyin."
- **Network hatası**: "Bağlantı kurulamadı. İnternet bağlantınızı kontrol edin."
- **Server hatası**: "Sunucu hatası. Lütfen daha sonra tekrar deneyin."

---

## 🧪 Test Senaryoları

### 1. Başarılı İlk Giriş
```javascript
// Test: Yeni kullanıcı Google ile ilk kez giriş yapıyor
// Beklenti: Yeni profil oluşturulmalı, hoş geldin mesajı gösterilmeli
```

### 2. Mevcut Kullanıcı Girişi
```javascript
// Test: Daha önce kayıt olan kullanıcı tekrar giriş yapıyor
// Beklenti: Mevcut profil yüklenmeli, son aktif zamanı güncellenip
```

### 3. Token Süresi Dolması
```javascript
// Test: Kullanıcının JWT token'ı süresi dolmuş
// Beklenti: Otomatik olarak yeniden giriş yapması istenmeli
```

### 4. İzin Reddi
```javascript
// Test: Kullanıcı Google izinlerini reddediyor
// Beklenti: Uygun hata mesajı gösterilmeli, alternatif giriş yöntemi sunulmalı
```

---

## 📈 Analytics ve İzleme

### Google Analytics Events

```javascript
// Giriş başarılı olduğunda
gtag('event', 'login', {
  method: 'Google',
  role: selectedRole,
});

// Kayıt başarılı olduğunda
gtag('event', 'sign_up', {
  method: 'Google',
  role: selectedRole,
});

// Hata olduğunda
gtag('event', 'login_error', {
  method: 'Google',
  error_message: error.message,
});
```

---

## 🎯 Önemli Notlar

1. **Google Client ID** production ve development için farklı olabilir
2. **Redirect URI**'ler tam olarak eşleşmelidir
3. **Email scope** mutlaka eklenmelidir
4. **Bireysel kullanıcılar** için özel tasarım aktif
5. **Kurumsal kullanıcılar** için standart buton kullanılıyor
6. **Mock sistem** şu anda aktif - gerçek OAuth entegrasyonu için yukarıdaki adımları uygulayın

---

## 🚀 Deployment Checklist

- [ ] Google Cloud Console projesini oluştur
- [ ] OAuth consent screen'i yapılandır
- [ ] Production domain'i ekle
- [ ] Redirect URI'leri güncelle
- [ ] Environment variables'ı ayarla
- [ ] Backend API'yi deploy et
- [ ] HTTPS sertifikası kur
- [ ] CORS ayarlarını yap
- [ ] Rate limiting ekle
- [ ] Error tracking (Sentry) entegre et
- [ ] Analytics kur
- [ ] Kullanıcı testleri yap

---

## 📞 Destek

Entegrasyon sırasında sorun yaşarsanız:
- Google OAuth Docs: https://developers.google.com/identity/protocols/oauth2
- React OAuth Docs: https://www.npmjs.com/package/@react-oauth/google
- Workigom Teknik Destek: tech@workigom.com

---

**Son Güncelleme:** 19 Ekim 2025  
**Versiyon:** 1.0.0  
**Proje:** Workigom Google OAuth Entegrasyonu
