# 📢 Admin Bildirim Gönderme Sistemi

Bu dokümantasyon, Workigom uygulamasındaki Admin Bildirim Gönderme özelliğinin tüm detaylarını içerir.

---

## 📋 İçindekiler

1. [Genel Bakış](#genel-bakış)
2. [API Endpoint Specification](#api-endpoint-specification)
3. [Frontend Implementasyonu](#frontend-implementasyonu)
4. [LocalStorage Yapısı](#localstorage-yapısı)
5. [Kullanım Rehberi](#kullanım-rehberi)
6. [Test Senaryoları](#test-senaryoları)
7. [Production Notları](#production-notları)

---

## 🎯 Genel Bakış

Admin panel üzerinden kullanıcılara toplu veya bireysel bildirim gönderme sistemi.

### Özellikler

✅ **5 Farklı Hedef Tipi:**
- Tüm Kullanıcılar (ALL)
- Tüm Bireysel Kullanıcılar (ALL_INDIVIDUALS)
- Tüm Kurumsal Kullanıcılar (ALL_COMPANIES)
- Belirli Bireysel Kullanıcı (SINGLE_INDIVIDUAL)
- Belirli Kurumsal Kullanıcı (SINGLE_COMPANY)

✅ **Form Alanları:**
- Bildirim Başlığı (zorunlu, max 100 karakter)
- Bildirim Mesajı (zorunlu, max 500 karakter)
- Link (opsiyonel, yönlendirme için)

✅ **Özellikler:**
- Canlı önizleme
- Karakter sayacı
- Validasyon
- Toast bildirimleri
- Otomatik temizleme

---

## 📡 API Endpoint Specification

### POST /api/admin/send-notification

**Açıklama:** Yöneticinin (Admin) belirli bir kullanıcı grubuna veya bireye bildirim göndermesi için kullanılır.

#### Request Body

```json
{
  "targetType": "ALL_INDIVIDUALS",
  "targetId": null,
  "title": "Önemli Duyuru",
  "message": "Sistem bakımı 15:00-16:00 arası yapılacaktır.",
  "link": "/settings"
}
```

#### Request Body Parametreleri

| Parametre | Tip | Zorunlu | Açıklama |
|-----------|-----|---------|----------|
| `targetType` | string | ✅ | Hedef tipi. Enum: `ALL`, `ALL_INDIVIDUALS`, `ALL_COMPANIES`, `SINGLE_INDIVIDUAL`, `SINGLE_COMPANY` |
| `targetId` | string | ❌ | Tek kullanıcı/şirket için ID (SINGLE_* tipleri için zorunlu) |
| `title` | string | ✅ | Bildirim başlığı (max 100 karakter) |
| `message` | string | ✅ | Bildirim içeriği (max 500 karakter) |
| `link` | string | ❌ | Yönlendirme URL'i |

#### Response

```json
{
  "success": true,
  "message": "Bildirim gönderildi",
  "data": {
    "notificationId": "1234567890",
    "targetCount": 25,
    "sentAt": "2025-10-25T14:30:00.000Z"
  }
}
```

#### Error Responses

**400 Bad Request - Eksik Parametreler**
```json
{
  "success": false,
  "error": "Title is required",
  "code": "MISSING_TITLE"
}
```

**400 Bad Request - Geçersiz targetType**
```json
{
  "success": false,
  "error": "Invalid target type",
  "code": "INVALID_TARGET_TYPE"
}
```

**404 Not Found - Kullanıcı Bulunamadı**
```json
{
  "success": false,
  "error": "Target user not found",
  "code": "USER_NOT_FOUND"
}
```

---

## 💻 Frontend Implementasyonu

### Dosya Yapısı

```
/components/admin/
├── AdminPanel.tsx          # Ana admin panel
└── SendNotificationForm.tsx # Bildirim gönderme formu

/components/shared/
└── NotificationsPage.tsx   # Kullanıcıların gördüğü bildirimler
```

---

### SendNotificationForm Komponenti

**Dosya:** `/components/admin/SendNotificationForm.tsx`

#### Import Edilenler

```typescript
import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner@2.0.3";
import { Bell, Users, Building2, UserCheck, Send, AlertTriangle } from "lucide-react";
```

#### State Yönetimi

```typescript
const [targetType, setTargetType] = useState<string>('ALL');
const [targetId, setTargetId] = useState<string>('');
const [title, setTitle] = useState<string>('');
const [message, setMessage] = useState<string>('');
const [link, setLink] = useState<string>('');
```

#### handleSend Fonksiyonu

```typescript
const handleSend = () => {
  // 1. Validasyon
  if (!title.trim()) {
    toast.error('❌ Lütfen bildirim başlığı girin');
    return;
  }
  if (!message.trim()) {
    toast.error('❌ Lütfen bildirim mesajı girin');
    return;
  }
  if ((targetType === 'SINGLE_INDIVIDUAL' || targetType === 'SINGLE_COMPANY') && !targetId) {
    toast.error('❌ Lütfen hedef kullanıcı/şirket seçin');
    return;
  }

  // 2. Bildirim Objesi Oluştur
  const notification = {
    id: Date.now().toString(),
    type: 'admin_announcement',
    icon: 'Bell',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
    title,
    message,
    link: link || null,
    time: 'Şimdi',
    createdAt: new Date().toISOString(),
    isNew: true,
    badge: 'Admin',
    badgeColor: 'bg-purple-600',
    sentBy: 'Admin',
    targetType
  };

  // 3. Hedef Kullanıcıları Belirle
  const users = JSON.parse(localStorage.getItem('demoUsers') || '[]');
  let targetUsers: any[] = [];

  switch (targetType) {
    case 'ALL':
      targetUsers = users;
      break;
    case 'ALL_INDIVIDUALS':
      targetUsers = users.filter((u: any) => u.role === 'individual');
      break;
    case 'ALL_COMPANIES':
      targetUsers = users.filter((u: any) => u.role === 'corporate');
      break;
    case 'SINGLE_INDIVIDUAL':
      targetUsers = users.filter((u: any) => u.id === targetId && u.role === 'individual');
      break;
    case 'SINGLE_COMPANY':
      targetUsers = users.filter((u: any) => u.id === targetId && u.role === 'corporate');
      break;
  }

  // 4. Her Kullanıcı İçin Bildirim Oluştur
  const allNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]');
  targetUsers.forEach(user => {
    allNotifications.push({
      ...notification,
      userId: user.id,
      userRole: user.role
    });
  });
  localStorage.setItem('adminNotifications', JSON.stringify(allNotifications));

  // 5. Başarı Mesajı
  const targetCount = targetUsers.length;
  const targetLabel = 
    targetType === 'ALL' ? 'Tüm kullanıcılara' :
    targetType === 'ALL_INDIVIDUALS' ? 'Tüm bireysel kullanıcılara' :
    targetType === 'ALL_COMPANIES' ? 'Tüm kurumsal kullanıcılara' :
    targetType === 'SINGLE_INDIVIDUAL' ? 'Seçili bireysel kullanıcıya' :
    'Seçili kurumsal kullanıcıya';

  toast.success(`✅ Bildirim gönderildi!`, {
    description: `${targetLabel} (${targetCount} kullanıcı)`
  });

  // 6. Formu Temizle
  setTitle('');
  setMessage('');
  setLink('');
  setTargetType('ALL');
  setTargetId('');
};
```

**Ne Yapar:**
1. Form validasyonu yapar
2. Bildirim objesi oluşturur
3. Hedef kullanıcıları filtreler
4. Her kullanıcı için bildirim kaydı oluşturur
5. LocalStorage'a kaydeder
6. Başarı mesajı gösterir
7. Formu temizler

---

### AdminPanel Entegrasyonu

**Dosya:** `/components/admin/AdminPanel.tsx`

#### Import

```typescript
import { SendNotificationForm } from "./SendNotificationForm";
```

#### Render

```typescript
{activePage === 'notifications' && (
  <SendNotificationForm />
)}
```

#### Menü Yapılandırması

```typescript
{ 
  id: 'notifications' as AdminPage, 
  label: 'Bildirim Gönder', 
  icon: Bell,
  count: null
}
```

---

### NotificationsPage Güncellenmesi

**Dosya:** `/components/shared/NotificationsPage.tsx`

#### Admin Bildirimlerini Yükleme

```typescript
// Mevcut kullanıcıyı al
const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

// Admin bildirimlerini filtrele
const adminNotifications = JSON.parse(localStorage.getItem('adminNotifications') || '[]')
  .filter((notif: any) => notif.userId === currentUser.id)
  .map((notif: any) => ({
    id: notif.id,
    type: notif.type,
    icon: Bell,
    iconColor: notif.iconColor,
    iconBg: notif.iconBg,
    title: notif.title,
    message: notif.message,
    time: notif.time,
    isNew: notif.isNew,
    badge: notif.badge,
    badgeColor: notif.badgeColor,
    link: notif.link
  }));

// Statik bildirimlerle birleştir
const notifications = [...adminNotifications, ...staticNotifications];
```

**Ne Yapar:**
1. Mevcut kullanıcının ID'sini alır
2. AdminNotifications'dan bu kullanıcıya ait olanları filtreler
3. Formata uygun hale getirir
4. Statik bildirimlerle birleştirir
5. Render eder

---

## 💾 LocalStorage Yapısı

### adminNotifications

**Key:** `adminNotifications`  
**Type:** `Array<AdminNotification>`

```typescript
interface AdminNotification {
  id: string;
  userId: string;              // Hedef kullanıcı ID'si
  userRole: 'individual' | 'corporate';
  type: 'admin_announcement';
  icon: string;
  iconColor: string;
  iconBg: string;
  title: string;
  message: string;
  link: string | null;
  time: string;
  createdAt: string;           // ISO 8601 format
  isNew: boolean;
  badge: string;
  badgeColor: string;
  sentBy: string;              // 'Admin'
  targetType: string;          // 'ALL', 'ALL_INDIVIDUALS', etc.
}
```

### Örnek Veri

```json
[
  {
    "id": "1729867200000",
    "userId": "IND001",
    "userRole": "individual",
    "type": "admin_announcement",
    "icon": "Bell",
    "iconColor": "text-purple-600",
    "iconBg": "bg-purple-50",
    "title": "Önemli Duyuru",
    "message": "Sistem bakımı 15:00-16:00 arası yapılacaktır. Lütfen bu saatler arasında işlem yapmayın.",
    "link": "/settings",
    "time": "Şimdi",
    "createdAt": "2025-10-25T14:30:00.000Z",
    "isNew": true,
    "badge": "Admin",
    "badgeColor": "bg-purple-600",
    "sentBy": "Admin",
    "targetType": "ALL_INDIVIDUALS"
  },
  {
    "id": "1729867200001",
    "userId": "IND002",
    "userRole": "individual",
    "type": "admin_announcement",
    "icon": "Bell",
    "iconColor": "text-purple-600",
    "iconBg": "bg-purple-50",
    "title": "Önemli Duyuru",
    "message": "Sistem bakımı 15:00-16:00 arası yapılacaktır. Lütfen bu saatler arasında işlem yapmayın.",
    "link": "/settings",
    "time": "Şimdi",
    "createdAt": "2025-10-25T14:30:00.000Z",
    "isNew": true,
    "badge": "Admin",
    "badgeColor": "bg-purple-600",
    "sentBy": "Admin",
    "targetType": "ALL_INDIVIDUALS"
  }
]
```

---

## 📖 Kullanım Rehberi

### Senaryo 1: Tüm Kullanıcılara Bildirim Gönderme

1. **Admin Panel'e giriş yapın**
2. **Soldaki menüden "Bildirim Gönder"** seçin
3. **Hedef Kitle:** "Tüm Kullanıcılar" seçin
4. **Bildirim Başlığı:** Örn: "Sistem Bakımı Duyurusu"
5. **Bildirim Mesajı:** "Sistem bakımı 15:00-16:00 arası yapılacaktır."
6. **Link (Opsiyonel):** `/settings`
7. **"Bildirimi Gönder"** butonuna tıklayın

**Sonuç:**
```
✅ Bildirim gönderildi!
Tüm kullanıcılara (8 kullanıcı)
```

---

### Senaryo 2: Sadece Bireysel Kullanıcılara Bildirim

1. **Hedef Kitle:** "Tüm Bireysel Kullanıcılar" seçin
2. **Bildirim Başlığı:** "Yeni İş Fırsatları!"
3. **Bildirim Mesajı:** "10+ yeni acil iş ilanı eklendi. Hemen inceleyin!"
4. **Link:** `/urgent-jobs`
5. **Gönder**

**Sonuç:**
```
✅ Bildirim gönderildi!
Tüm bireysel kullanıcılara (3 kullanıcı)
```

---

### Senaryo 3: Belirli Bir Kullanıcıya Bildirim

1. **Hedef Kitle:** "Belirli Bireysel Kullanıcı" seçin
2. **Kullanıcı Seçin:** "Ahmet Yılmaz (ahmet.yilmaz@email.com)"
3. **Bildirim Başlığı:** "Profil Onaylandı"
4. **Bildirim Mesajı:** "Profiliniz başarıyla onaylandı. Artık tüm özellikleri kullanabilirsiniz."
5. **Link:** `/profile`
6. **Gönder**

**Sonuç:**
```
✅ Bildirim gönderildi!
Seçili bireysel kullanıcıya (1 kullanıcı)
```

---

## 🧪 Test Senaryoları

### Test 1: Form Validasyonu

**Adımlar:**
1. Bildirim başlığı boş bırak
2. "Bildirimi Gönder" butonuna tıkla

**Beklenen Sonuç:**
```
❌ Lütfen bildirim başlığı girin
```

---

### Test 2: Karakter Limitleri

**Adımlar:**
1. Başlığa 101 karakter yazın
2. Input maximum 100 karakterde durmalı

**Beklenen Sonuç:**
- Input 100 karakterde kısıtlanır
- Karakter sayacı "100/100" gösterir

---

### Test 3: Hedef Kullanıcı Seçimi

**Adımlar:**
1. "Belirli Bireysel Kullanıcı" seçin
2. Kullanıcı seçmeden gönder

**Beklenen Sonuç:**
```
❌ Lütfen hedef kullanıcı/şirket seçin
```

---

### Test 4: Bildirim Önizlemesi

**Adımlar:**
1. Başlık: "Test Bildirimi"
2. Mesaj: "Bu bir test mesajıdır"
3. Önizleme bölümünü kontrol edin

**Beklenen Sonuç:**
- Önizleme kartı görünür
- Mor arka plan
- Admin badge
- "Şimdi" zamanı

---

### Test 5: Kullanıcı Tarafında Görüntüleme

**Adımlar:**
1. Admin olarak bildirim gönder
2. Çıkış yap
3. Bireysel kullanıcı olarak giriş yap
4. Bildirimler sayfasına git

**Beklenen Sonuç:**
- Admin bildirimi en üstte görünür
- Mor "Admin" badge'i var
- Yeni bildirim işareti (mavi nokta) var

---

### Test 6: Link Yönlendirmesi

**Adımlar:**
1. Link ile bildirim gönder: `/profile`
2. Kullanıcı bildirimine tıklasın

**Beklenen Sonuç:**
- (Şu an için mock) Gelecekte: Profil sayfasına yönlendirilir

---

## 🎨 UI/UX Özellikleri

### Renk Paleti

```css
/* Admin Bildirimleri */
--purple-primary: #9333ea;     /* Ana renk */
--purple-light: #f3e8ff;       /* Arka plan */
--purple-dark: #7e22ce;        /* Hover */

--pink-accent: #ec4899;        /* Gradient */
```

### Gradient Butonlar

```css
/* Gönder Butonu */
background: linear-gradient(to right, #9333ea, #ec4899);

/* Hover */
background: linear-gradient(to right, #7e22ce, #db2777);
```

### Önizleme Kartı

```css
/* Arka Plan */
background: linear-gradient(to bottom right, #f3e8ff, #fce7f3);
border: 2px solid #e9d5ff;
```

---

## 🚀 Production Notları

### Backend Implementasyonu

```typescript
// Express.js örneği
app.post('/api/admin/send-notification', 
  authenticateAdmin, 
  validateNotificationPayload,
  async (req, res) => {
    const { targetType, targetId, title, message, link } = req.body;
    
    try {
      // Hedef kullanıcıları belirle
      let targetUsers = [];
      
      switch (targetType) {
        case 'ALL':
          targetUsers = await User.findAll();
          break;
        case 'ALL_INDIVIDUALS':
          targetUsers = await User.findAll({ where: { role: 'individual' } });
          break;
        case 'ALL_COMPANIES':
          targetUsers = await User.findAll({ where: { role: 'corporate' } });
          break;
        case 'SINGLE_INDIVIDUAL':
        case 'SINGLE_COMPANY':
          targetUsers = await User.findAll({ where: { id: targetId } });
          break;
      }
      
      // Bildirimleri oluştur
      const notifications = targetUsers.map(user => ({
        userId: user.id,
        title,
        message,
        link,
        type: 'admin_announcement',
        sentBy: req.admin.id,
        createdAt: new Date(),
        isRead: false
      }));
      
      await Notification.bulkCreate(notifications);
      
      // Push notification gönder (Firebase, OneSignal, vb.)
      await sendPushNotifications(targetUsers, { title, message, link });
      
      // Email gönder (opsiyonel)
      if (shouldSendEmail(targetType)) {
        await sendEmailNotifications(targetUsers, { title, message, link });
      }
      
      res.json({
        success: true,
        message: 'Bildirim gönderildi',
        data: {
          notificationId: notifications[0].id,
          targetCount: targetUsers.length,
          sentAt: new Date()
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Bildirim gönderilemedi',
        code: 'NOTIFICATION_SEND_ERROR'
      });
    }
  }
);
```

### Veritabanı Şeması

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  title VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  link VARCHAR(255),
  type VARCHAR(50) NOT NULL,
  sent_by UUID REFERENCES admins(id),
  created_at TIMESTAMP DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP,
  
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at),
  INDEX idx_is_read (is_read)
);
```

### Push Notification Entegrasyonu

```typescript
// Firebase Cloud Messaging örneği
import admin from 'firebase-admin';

async function sendPushNotifications(users: User[], notification: Notification) {
  const tokens = users
    .filter(u => u.fcmToken)
    .map(u => u.fcmToken);
    
  if (tokens.length === 0) return;
  
  const message = {
    notification: {
      title: notification.title,
      body: notification.message
    },
    data: {
      link: notification.link || '',
      type: 'admin_announcement'
    },
    tokens
  };
  
  const response = await admin.messaging().sendMulticast(message);
  
  console.log(`${response.successCount} notifications sent successfully`);
  console.log(`${response.failureCount} notifications failed`);
}
```

### Rate Limiting

```typescript
import rateLimit from 'express-rate-limit';

const notificationLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 10, // Maksimum 10 bildirim
  message: 'Çok fazla bildirim gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin.'
});

app.post('/api/admin/send-notification', notificationLimiter, ...);
```

### Logging

```typescript
// Winston ile loglama
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'notifications.log' })
  ]
});

// Her bildirim gönderimini logla
logger.info('Admin notification sent', {
  adminId: req.admin.id,
  targetType,
  targetCount: targetUsers.length,
  title,
  timestamp: new Date()
});
```

---

## 📊 Performans Optimizasyonu

### Batch Processing

Çok sayıda kullanıcıya bildirim gönderirken:

```typescript
// Batch size: 100
const BATCH_SIZE = 100;

for (let i = 0; i < targetUsers.length; i += BATCH_SIZE) {
  const batch = targetUsers.slice(i, i + BATCH_SIZE);
  await Notification.bulkCreate(batch.map(user => ({
    userId: user.id,
    title,
    message,
    // ...
  })));
}
```

### Background Job

Uzun süren işlemler için queue kullanın:

```typescript
import Queue from 'bull';

const notificationQueue = new Queue('notifications');

notificationQueue.process(async (job) => {
  const { targetUsers, notification } = job.data;
  await sendNotificationsToUsers(targetUsers, notification);
});

// Controller'da
await notificationQueue.add({
  targetUsers,
  notification: { title, message, link }
});
```

---

## 🔒 Güvenlik

### Input Sanitization

```typescript
import DOMPurify from 'isomorphic-dompurify';

const sanitizedTitle = DOMPurify.sanitize(title);
const sanitizedMessage = DOMPurify.sanitize(message);
```

### XSS Koruması

```typescript
// HTML tag'leri kaldır
const stripHtml = (html: string) => {
  return html.replace(/<[^>]*>?/gm, '');
};

const cleanTitle = stripHtml(title);
```

### SQL Injection Koruması

```typescript
// Prepared statements kullan
const notifications = await db.query(
  'INSERT INTO notifications (user_id, title, message) VALUES ($1, $2, $3)',
  [userId, title, message]
);
```

---

## 📱 Mobil Uygulama Entegrasyonu

### React Native Push Notifications

```typescript
import messaging from '@react-native-firebase/messaging';

// FCM token al
const getFCMToken = async () => {
  const token = await messaging().getToken();
  await api.post('/api/users/fcm-token', { token });
};

// Bildirim dinle
messaging().onMessage(async (remoteMessage) => {
  console.log('Notification received:', remoteMessage);
  // Bildirim göster
  showLocalNotification(remoteMessage);
});
```

---

## 📈 Analytics

### Bildirim İstatistikleri

```typescript
// Kaç bildirim gönderildi
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_sent,
  COUNT(CASE WHEN is_read = true THEN 1 END) as total_read,
  ROUND(COUNT(CASE WHEN is_read = true THEN 1 END) * 100.0 / COUNT(*), 2) as read_rate
FROM notifications
WHERE type = 'admin_announcement'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

---

## ✅ Checklist

### Development
- [x] SendNotificationForm komponenti
- [x] AdminPanel entegrasyonu
- [x] NotificationsPage güncellemesi
- [x] LocalStorage yapısı
- [x] Validasyon
- [x] Toast bildirimleri
- [x] Önizleme özelliği
- [x] Karakter sayacı

### Production
- [ ] Backend API endpoint
- [ ] Veritabanı şeması
- [ ] Authentication middleware
- [ ] Input validation (backend)
- [ ] Rate limiting
- [ ] Push notification entegrasyonu
- [ ] Email notification (opsiyonel)
- [ ] Logging sistemi
- [ ] Analytics
- [ ] Error handling
- [ ] Unit tests
- [ ] Integration tests

---

## 🎓 Örnekler

### Örnek 1: Sistem Bakım Duyurusu

```typescript
{
  "targetType": "ALL",
  "title": "Sistem Bakımı Duyurusu",
  "message": "Sevgili kullanıcılarımız, sistem bakımı 25 Ekim 2025 saat 15:00-16:00 arası gerçekleştirilecektir. Bu süre zarfında platform kullanılamayacaktır. Anlayışınız için teşekkür ederiz.",
  "link": null
}
```

### Örnek 2: Yeni Özellik Duyurusu

```typescript
{
  "targetType": "ALL_INDIVIDUALS",
  "title": "🎉 Yeni Özellik: Menü Market Paylaşımı",
  "message": "Artık ihtiyaç sahibi çalışanlara menü paylaşımı yapabilirsiniz! Detaylar için tıklayın.",
  "link": "/food-donation"
}
```

### Örnek 3: Ödeme Hatırlatması

```typescript
{
  "targetType": "SINGLE_COMPANY",
  "targetId": "COMP001",
  "title": "Ödeme Hatırlatması",
  "message": "Elite Temizlik A.Ş., 1.500 TL tutarındaki ödemeniz yakında ödenecektir. Lütfen hesap bakiyenizi kontrol edin.",
  "link": "/payments"
}
```

---

**Son Güncelleme:** 25 Ekim 2025  
**Versiyon:** 1.0  
**Yazar:** Workigom Development Team
