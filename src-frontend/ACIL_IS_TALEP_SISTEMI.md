# 🚨 Acil İş Talep Sistemi - Workigom

## 📋 Genel Bakış

Workigom'un acil iş talep sistemi, şirketlerin acil iş ilanlarını hızlı bir şekilde yayınlamasını ve admin onayıyla bireysel kullanıcılara iletilmesini sağlar.

---

## 🔄 İş Akışı

### 1️⃣ Şirket Tarafı - İlan Oluşturma

**Adımlar:**
1. Kurumsal hesapla giriş yap
2. Ana sayfadan "Acil İş İlanı Ver" kartına tıkla
3. Formu doldur:
   - İş Başlığı
   - Kategori (Temizlik, Teknik, Güvenlik, Diğer)
   - Konum
   - Günlük Ücret
   - Çalışma Zamanı
   - Başlangıç Zamanı
   - İş Açıklaması
4. **"İlanı Yayınla"** butonuna tıkla
5. ✅ Başarı mesajı: "Acil iş talebi admin onayına gönderildi!"

**Dosya:** `/components/company/PostJobForm.tsx`

**Özellikler:**
- Form validasyonu
- LocalStorage'a kaydetme
- Otomatik timestamp
- Şirket bilgilerini ekleme

---

### 2️⃣ Admin Tarafı - Talep Onaylama/Reddetme

**Adımlar:**
1. Admin hesabıyla giriş yap
2. Sol menüden **"Acil Talepler"** sayfasına git
3. Bekleyen talepleri görüntüle

**Her talep kartında:**
- 🚨 Acil badge'i
- İş başlığı ve kategori
- Şirket bilgileri
- Konum, ücret, başlangıç zamanı
- İş açıklaması
- Gereksinimler

**İki Seçenek:**

### ✅ Bildirim Olarak Gönder
- **Butona tıkla:** "Bildirim Olarak Gönder" (Yeşil buton)
- **Sistem:**
  - Talebi onaylar
  - `approvedUrgentJobs` listesine ekler
  - Tüm bireysel kullanıcılara bildirim gönderir
  - Acil İşler sayfasında görünür hale gelir
- **Toast Mesajı:** "İş ilanı onaylandı! Talep tüm bireysel kullanıcılara bildirim olarak gönderildi."

### ❌ Reddet
- **Butona tıkla:** "Reddet" (Kırmızı outline buton)
- **Sistem:**
  - Talebi reddeder
  - Şirkete bildirim gönderir
  - Listeden kaldırır
- **Toast Mesajı:** "İş ilanı reddedildi. [Şirket Adı] şirketine bildirim gönderildi."

**Dosya:** `/components/admin/AdminPanel.tsx`

**Özellikler:**
- Real-time talep sayısı
- Detaylı talep kartları
- Gradient tasarım
- İkon ve badge'ler
- Responsive layout

---

### 3️⃣ Bireysel Kullanıcı - Acil İşleri Görüntüleme

**Adımlar:**
1. Bireysel hesapla giriş yap
2. Ana sayfadan "Acil İşler" kartına tıkla veya alt menüden "Acil İşler" sekmesine git
3. Onaylanan acil işleri görüntüle

**Özellikler:**

### 🎯 Yeni Acil İş Banner'ı
Admin onaylı yeni işler için özel banner:
```
🚨 [N] Yeni Acil İş İlanı!
Admin tarafından onaylanan acil işler yayınlandı. Hemen başvur!
```

### 💳 İş Kartları

**Normal İş Kartı:**
- Standart beyaz arka plan
- Standart border
- "Acil" veya "Müsait" badge'i

**Yeni Acil İş Kartı:**
- 🔥 Gradient arka plan (amber-orange)
- Kalın turuncu border
- Sağ üst köşede "YENİ" badge'i
- 🚨 Acil badge'i (kırmızı)
- Alt kısımda "Admin onaylı acil iş ilanı" etiketi

**Filtreleme:**
- Arama çubuğu (iş başlığı, şirket adı)
- Kategori filtresi

**Dosya:** `/components/employee/UrgentJobsPage.tsx`

---

## 💾 Veri Yapısı

### UrgentJobRequest Interface

```typescript
export interface UrgentJobRequest {
  id: string;                      // Unique ID: "URG001"
  jobData: Job;                    // İş detayları
  requestedAt: string;             // Talep zamanı (ISO)
  requestedBy: string;             // Şirket ID
  companyName: string;             // Şirket adı
  status: 'pending' | 'approved' | 'rejected';
  reviewedAt?: string;             // Onay/red zamanı
  reviewedBy?: string;             // Admin ID
  rejectionReason?: string;        // Red nedeni
}
```

### Job Interface Güncellemeleri

```typescript
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  hourlyRate: number;
  duration: string;
  urgency: 'high' | 'medium' | 'low';
  description: string;
  requirements: string[];
  postedAt: string;
  startTime: string;
  category: string;
  applicants?: number;
  status?: 'active' | 'pending' | 'rejected';  // ✨ Yeni
  isUrgent?: boolean;                           // ✨ Yeni
  companyId?: string;                           // ✨ Yeni
}
```

---

## 🗂️ LocalStorage Yapısı

### 1. urgentJobRequests
Şirketlerden gelen acil iş talepleri
```json
[
  {
    "id": "URG1729331400000",
    "jobData": {
      "id": "JOB_1729331400000",
      "title": "Acil Ofis Temizliği",
      "category": "Temizlik",
      "status": "pending",
      "isUrgent": true,
      ...
    },
    "requestedAt": "2025-10-19T08:30:00Z",
    "companyName": "TemizPro Hizmetleri",
    "status": "pending"
  }
]
```

### 2. approvedUrgentJobs
Admin tarafından onaylanan işler
```json
[
  {
    "id": "JOB_1729331400000",
    "title": "Acil Ofis Temizliği",
    "status": "active",
    "isUrgent": true,
    "approvedAt": "2025-10-19T09:00:00Z",
    ...
  }
]
```

---

## 🎨 Tasarım Özellikleri

### Admin Panel - Acil Talepler Sayfası

**Header:**
- Sayfa başlığı: "Acil Talepler"
- Kırmızı badge: "[N] Bekleyen Talep"

**Talep Kartları:**
```
┌─────────────────────────────────────────┐
│ 🚨 ACİL  [Kategori]                     │
│ [İş Başlığı]                            │
│ 🏢 [Şirket] | ⏰ [Zaman]               │
├─────────────────────────────────────────┤
│ 📍 Konum    💵 Ücret    ⏰ Başlangıç   │
├─────────────────────────────────────────┤
│ İş Açıklaması                           │
│ Gereksinimler                           │
├─────────────────────────────────────────┤
│ [📤 Bildirim Olarak Gönder] [❌ Reddet]│
└─────────────────────────────────────────┘
```

**Renk Paleti:**
- Header: Kırmızı-turuncu gradient
- Border: Kırmızı (`border-red-200`)
- Approve Button: Yeşil gradient (`from-green-600 to-emerald-600`)
- Reject Button: Kırmızı outline (`border-red-300`)

### Bireysel Kullanıcı - Acil İşler Sayfası

**Banner:**
```
┌─────────────────────────────────────────┐
│ ⚡ 🚨 [N] Yeni Acil İş İlanı!          │
│ Admin tarafından onaylanan acil işler   │
│ yayınlandı. Hemen başvur!               │
└─────────────────────────────────────────┘
```

**Yeni Acil İş Kartı:**
```
┌─────────────────────────────────┐[YENİ⚡]
│ [İş Başlığı]              🚨 Acil │
│ [Şirket Adı]                      │
├───────────────────────────────────┤
│ 📍 [Konum]                        │
│ ⏰ [Zaman] • [Süre]               │
│ 💵 [Ücret]/saat                   │
├───────────────────────────────────┤
│ [Yayın Tarihi] | [Başvuru Sayısı] │
├───────────────────────────────────┤
│ ⚠️ Admin onaylı acil iş ilanı     │
└───────────────────────────────────┘
```

---

## 📊 İstatistikler ve Sayaçlar

### Admin Panel

**Dashboard Kartı:**
- Başlık: "Acil Talepler"
- Değer: Dinamik (urgentRequests.length)
- İkon: ⚠️ AlertTriangle
- Renk: Kırmızı (`text-red-500`, `bg-red-50`)

**Sidebar Menü:**
- "Acil Talepler" menü öğesi
- Badge: Dinamik talep sayısı
- Aktif olduğunda yeşil renk

### Bireysel Kullanıcı

**Acil İşler Sayfası:**
- Header badge: Toplam iş sayısı
- Banner: Yeni acil iş sayısı
- Her kartta "YENİ" etiketi

---

## 🔔 Bildirim Sistemi

### Admin Onayı Sonrası

**Başarı Mesajı:**
```javascript
toast.success('✅ İş ilanı onaylandı!', {
  description: 'Talep tüm bireysel kullanıcılara bildirim olarak gönderildi.'
});
```

**Red Mesajı:**
```javascript
toast.error('❌ İş ilanı reddedildi', {
  description: `${companyName} şirketine bildirim gönderildi.`
});
```

### Şirket Tarafı

**İlan Gönderimi:**
```javascript
toast.success('🚀 Acil iş talebi admin onayına gönderildi!', {
  description: 'Talep onaylandığında bildirim alacaksınız.'
});
```

---

## 🚀 Kullanım Senaryoları

### Senaryo 1: Başarılı Akış
1. **Şirket:** "Acil Ofis Temizliği" ilanı oluşturur
2. **Sistem:** Talebi localStorage'a kaydeder
3. **Admin:** Acil Talepler sayfasında talebi görür
4. **Admin:** "Bildirim Olarak Gönder" butonuna tıklar
5. **Sistem:** İlanı `approvedUrgentJobs` listesine ekler
6. **Bireysel Kullanıcılar:** Acil İşler sayfasında yeni banner ve kartı görür
7. **Kullanıcı:** İlana başvurur

### Senaryo 2: Red Akışı
1. **Şirket:** Uygunsuz bir ilan oluşturur
2. **Admin:** Talebi inceler
3. **Admin:** "Reddet" butonuna tıklar
4. **Sistem:** Şirkete bildirim gönderir
5. **Şirket:** Red bildirimini görür

### Senaryo 3: Çoklu Talep
1. **3 Farklı Şirket:** Aynı anda acil iş talebi gönderir
2. **Admin Panel:** Sidebar'da "3" badge'i gösterir
3. **Dashboard:** "Acil Talepler" kartında "3" gösterir
4. **Admin:** Talepleri tek tek inceler ve onaylar
5. **Bireysel Kullanıcılar:** "🚨 3 Yeni Acil İş İlanı!" banner'ını görür

---

## 🧪 Test Senaryoları

### Test 1: İlan Oluşturma
- [x] Form validasyonu çalışıyor mu?
- [x] LocalStorage'a kaydediliyor mu?
- [x] Başarı mesajı gösteriliyor mu?
- [x] Ana sayfaya yönlendirme yapılıyor mu?

### Test 2: Admin Onayı
- [x] Talepler doğru gösteriliyor mu?
- [x] Onay butonu çalışıyor mu?
- [x] approvedUrgentJobs listesine ekleniyor mu?
- [x] Toast mesajı gösteriliyor mu?
- [x] Talep listeden kaldırılıyor mu?

### Test 3: Bireysel Kullanıcı Görüntüleme
- [x] Onaylanan işler gösteriliyor mu?
- [x] Yeni banner gösteriliyor mu?
- [x] Kartlar doğru tasarımda mı?
- [x] Filtreleme çalışıyor mu?

### Test 4: Red İşlemi
- [x] Red butonu çalışıyor mu?
- [x] Toast mesajı gösteriliyor mu?
- [x] Talep listeden kaldırılıyor mu?

---

## 📱 Responsive Tasarım

### Desktop (≥1024px)
- Admin Panel: Tam genişlik layout
- Acil İşler: 3 sütunlu grid
- Sidebar: Sabit sol menü

### Tablet (768px - 1023px)
- Admin Panel: Responsive cards
- Acil İşler: 2 sütunlu grid
- Sidebar: Daraltılabilir

### Mobile (<768px)
- Admin Panel: Tek sütun
- Acil İşler: Tek sütun
- Bottom navigation
- Hamburger menü

---

## 🔧 Teknik Detaylar

### State Yönetimi
```typescript
const [urgentRequests, setUrgentRequests] = useState<UrgentJobRequest[]>([]);
const [approvedJobs, setApprovedJobs] = useState<Job[]>([]);
```

### useEffect Hooks
```typescript
// Admin Panel - Load requests
useEffect(() => {
  const localRequests = JSON.parse(localStorage.getItem('urgentJobRequests') || '[]');
  const allRequests = [...mockUrgentJobRequests, ...localRequests];
  const pendingRequests = allRequests.filter(req => req.status === 'pending');
  setUrgentRequests(pendingRequests);
}, [activePage]);

// Urgent Jobs Page - Load approved jobs
useEffect(() => {
  const approved = JSON.parse(localStorage.getItem('approvedUrgentJobs') || '[]');
  setApprovedJobs(approved);
}, []);
```

### Handler Functions
```typescript
handleApproveRequest(requestId: string)
handleRejectRequest(requestId: string)
```

---

## 🎯 Gelecek Geliştirmeler

### Backend Entegrasyonu
- [ ] API endpoints oluşturma
- [ ] Real-time bildirimler (WebSocket)
- [ ] Database entegrasyonu
- [ ] Authentication & Authorization

### Özellikler
- [ ] E-posta bildirimleri
- [ ] SMS bildirimleri
- [ ] Push notifications
- [ ] Talep detay sayfası
- [ ] İstatistik ve analytics
- [ ] Red nedeni girme formu
- [ ] Şirket bildirim geçmişi

### UX İyileştirmeleri
- [ ] Animasyonlar
- [ ] Loading states
- [ ] Error handling
- [ ] Confirmation dialogs
- [ ] Undo/Redo functionality

---

## 📝 Notlar

1. **LocalStorage Limiti:** Tarayıcı başına ~5-10MB limit vardır
2. **Mock Data:** `mockUrgentJobRequests` başlangıç verisi sağlar
3. **Real-time:** Şu anda sayfa yenilemesi gerekir, WebSocket ile real-time olabilir
4. **Güvenlik:** Production'da JWT token ve API authentication gereklidir

---

## 🤝 Ekip Rolleri

**Şirket Yetkilisi:**
- Acil iş ilanı oluşturur
- Onay/red bildirimlerini takip eder

**Admin:**
- Talepleri inceler
- Onaylar veya reddeder
- Sistemi yönetir

**Bireysel Kullanıcı:**
- Onaylanan acil işleri görür
- Başvuru yapar
- Bildirim alır

---

**Oluşturulma Tarihi:** 19 Ekim 2025  
**Versiyon:** 1.0.0  
**Durum:** ✅ Aktif ve Çalışıyor  
**Platform:** React + TypeScript + Tailwind CSS v4
