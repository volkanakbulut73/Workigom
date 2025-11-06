# Workigom - Supabase Entegrasyon Görev Listesi

## ✅ Tamamlanan Görevler

### Backend Infrastructure
- [x] Supabase client kurulumu (`/utils/supabase/client.ts`)
- [x] TypeScript types tanımları (`/utils/supabase/types.ts`)
- [x] Authentication helper functions (`/utils/supabase/auth.ts`)
- [x] Database schema migration (`/supabase/migrations/001_initial_schema.sql`)
- [x] Row Level Security (RLS) policies
- [x] Storage bucket yapılandırması
- [x] Environment variables şablonu (`.env.example`)
- [x] Supabase kurulum dokümantasyonu (`SUPABASE_SETUP.md`)
- [x] Package.json'a `@supabase/supabase-js` eklendi

### Database Tables
- [x] users (kullanıcı profilleri)
- [x] jobs (iş ilanları)
- [x] applications (iş başvuruları)
- [x] donations (dayanışma menüsü bağışları)
- [x] notifications (bildirimler)
- [x] transactions (cari hesap işlemleri)

---

## 📋 Yapılacak Görevler

### 1. Authentication Pages (Login/Signup)

#### Login Page
- [ ] `LoginPage.tsx`'yi Supabase auth'a bağla
- [ ] `signIn()` fonksiyonunu kullan
- [ ] Session yönetimi ekle
- [ ] "Beni Hatırla" özelliği
- [ ] Şifre sıfırlama bağlantısı

#### Signup Page  
- [ ] `SignUpPage.tsx`'yi Supabase auth'a bağla
- [ ] Bireysel/Kurumsal kayıt formları
- [ ] `signUp()` fonksiyonunu kullan
- [ ] Email doğrulama (opsiyonel)
- [ ] Otomatik login sonrası redirect

#### Auth Context
- [ ] React Context oluştur (`AuthContext.tsx`)
- [ ] User state yönetimi
- [ ] Protected routes (PrivateRoute component)
- [ ] Role-based access control

---

### 2. Individual User Pages

#### Home Page
- [ ] `IndividualHomePage.tsx`'yi güncelle
- [ ] Aktif işleri Supabase'den çek
- [ ] Real-time job updates
- [ ] Kullanıcı istatistiklerini database'den al

#### Urgent Jobs Page
- [ ] `UrgentJobsPage.tsx`'yi güncelle
- [ ] jobs tablosundan veri çek (status: 'open')
- [ ] Filtreleme (tarih, konum, ücret)
- [ ] Başvuru yapma fonksiyonu (applications tablosuna insert)
- [ ] Pagination

#### My Jobs Page
- [ ] `MyJobsPage.tsx`'yi güncelle
- [ ] Kullanıcının başvurduğu işleri çek
- [ ] Ay ay filtreleme
- [ ] İstatistikleri hesapla (toplam iş, kazanç, ortalama puan)
- [ ] İş detayları modal

#### Solidarity Menu Page
- [ ] `SolidarityMenuPage.tsx`'yi güncelle
- [ ] donations tablosuna bağla
- [ ] QR kod Storage'a yükle
- [ ] Countdown timer
- [ ] Altın Kalp badge güncellemesi

#### Profile Page
- [ ] `ProfilePage.tsx`'yi güncelle
- [ ] users tablosundan profil bilgileri çek
- [ ] Profil güncelleme (updateProfile)
- [ ] IBAN bilgileri ekleme/güncelleme
- [ ] Profil fotoğrafı yükleme (Storage)

---

### 3. Corporate User Pages

#### Home Page
- [ ] `CorporateHomePage.tsx`'yi güncelle
- [ ] Şirketin aktif ilanlarını çek
- [ ] Toplam başvuru sayısı
- [ ] İstatistikler (jobs ve applications join)

#### Create Job Page
- [ ] `CreateJobPage.tsx`'yi güncelle
- [ ] jobs tablosuna insert
- [ ] Form validation
- [ ] Success notification

#### Assign Personnel Page
- [ ] `AssignPersonnelPage.tsx`'yi güncelle
- [ ] Bekleyen başvuruları çek
- [ ] Başvuru kabul/red (applications update)
- [ ] Bildirim gönder (notifications insert)

#### Applications Page
- [ ] `ApplicationsPage.tsx`'yi güncelle
- [ ] Tüm başvuruları listele
- [ ] Filtreleme (durum, tarih)
- [ ] Toplu işlemler

#### Incoming Personnel Page
- [ ] `IncomingPersonnelPage.tsx`'yi güncelle
- [ ] Kabul edilmiş başvuruları göster
- [ ] Tamamlama ve değerlendirme
- [ ] Rating sistemi (applications update)

---

### 4. Admin Pages

#### Admin Home
- [ ] `AdminHomePage.tsx`'yi güncelle
- [ ] Genel istatistikler
- [ ] Son aktiviteler
- [ ] Database metrics

#### User Management
- [ ] `UserManagementPage.tsx`'yi güncelle
- [ ] Tüm kullanıcıları listele
- [ ] Kullanıcı düzenleme
- [ ] Hesap silme/askıya alma

#### Job Management
- [ ] `JobManagementPage.tsx`'yi güncelle
- [ ] Tüm iş ilanlarını yönet
- [ ] İlan silme/düzenleme

#### Application Management
- [ ] `ApplicationManagementPage.tsx`'yi güncelle
- [ ] Tüm başvuruları görüntüle
- [ ] Sorunlu başvuruları yönet

#### Donation Management
- [ ] `DonationManagementPage.tsx`'yi güncelle
- [ ] Tüm bağışları listele
- [ ] Dolandırıcılık tespiti

#### Current Account Management
- [ ] `CurrentAccountPage.tsx`'yi güncelle
- [ ] transactions tablosunu yönet
- [ ] Ödeme yapma (balance update + transaction insert)
- [ ] Export/rapor

#### Notification Management
- [ ] `NotificationManagementPage.tsx`'yi güncelle
- [ ] Toplu bildirim gönderme
- [ ] notifications tablosuna insert
- [ ] Hedef kullanıcı seçimi

---

### 5. Shared Components

#### NotificationsPage
- [ ] Real-time notification subscriptions
- [ ] Bildirim okuma (is_read update)
- [ ] Silme fonksiyonu

#### BalanceCard
- [ ] Gerçek bakiye gösterimi
- [ ] transactions tablosundan hesaplama
- [ ] Para çekme işlemi

---

### 6. Real-time Features

#### Subscriptions
- [ ] Yeni iş ilanı bildirimi
- [ ] Başvuru durumu güncellemesi
- [ ] Yeni bildirimler
- [ ] Bağış onayı

#### Implementation
```typescript
// Örnek: Yeni iş bildirimi
supabase
  .channel('jobs-channel')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'jobs' },
    (payload) => {
      // Kullanıcıya bildirim göster
    }
  )
  .subscribe()
```

---

### 7. Storage Integration

#### QR Code Upload
- [ ] QR kod yükleme fonksiyonu
- [ ] `/userId/qr-codes/` folder structure
- [ ] Public URL alma

#### Profile Photos
- [ ] Profil fotoğrafı yükleme
- [ ] `/userId/profile/` folder
- [ ] Image resize/optimization (opsiyonel)

---

### 8. Error Handling & Loading States

#### Global Error Boundary
- [ ] React Error Boundary component
- [ ] Supabase error handling
- [ ] User-friendly error messages

#### Loading States
- [ ] Skeleton loaders
- [ ] Spinner components
- [ ] Optimistic UI updates

---

### 9. Testing

#### Manual Testing
- [ ] Bireysel kullanıcı akışı
- [ ] Kurumsal kullanıcı akışı
- [ ] Admin akışı
- [ ] Cross-browser test
- [ ] Mobile responsive test

#### Data Testing
- [ ] Test data oluşturma scripts
- [ ] Sample jobs
- [ ] Sample applications
- [ ] Sample donations

---

### 10. Performance Optimization

#### Database
- [ ] Index optimization
- [ ] Query optimization
- [ ] Connection pooling

#### Frontend
- [ ] React Query/SWR entegrasyonu (opsiyonel)
- [ ] Pagination/infinite scroll
- [ ] Image lazy loading
- [ ] Code splitting

---

### 11. Security

#### Environment Variables
- [ ] Production .env dosyası
- [ ] Render.com environment variables
- [ ] API key rotation policy

#### RLS Policies
- [ ] RLS politikalarını test et
- [ ] Edge cases kontrol
- [ ] SQL injection prevention

#### Data Validation
- [ ] Server-side validation
- [ ] Input sanitization
- [ ] XSS prevention

---

### 12. Deployment

#### Render.com
- [ ] Environment variables ekleme
- [ ] Build test
- [ ] Deploy
- [ ] Production test

#### Supabase
- [ ] Database backup politikası
- [ ] Monitoring setup
- [ ] Error tracking

---

## 🎯 Öncelik Sırası

### Phase 1: Authentication (En Yüksek Öncelik)
1. Auth Context
2. Login Page
3. Signup Page
4. Protected Routes

### Phase 2: Core Features
1. Individual - Urgent Jobs (iş listeleme & başvuru)
2. Corporate - Create Job (iş oluşturma)
3. Corporate - Assign Personnel (başvuru kabul)
4. Individual - My Jobs (iş geçmişi)

### Phase 3: Secondary Features
1. Solidarity Menu (dayanışma)
2. Notifications
3. Profile management
4. Current Account

### Phase 4: Admin & Advanced
1. Admin panels
2. Real-time subscriptions
3. Analytics
4. Reporting

### Phase 5: Polish & Deploy
1. Error handling
2. Loading states
3. Testing
4. Deployment

---

## 📝 Notlar

### localStorage'dan Migration
Mevcut localStorage kullanımını kademeli olarak değiştirin:
1. Önce auth sistemini değiştir
2. Sonra data fetching
3. Son olarak localStorage'ı tamamen kaldır

### Backward Compatibility
Development sırasında localStorage fallback'i tutabilirsiniz:

```typescript
const getJobs = async () => {
  try {
    const { data } = await supabase.from('jobs').select('*');
    return data;
  } catch (error) {
    // Fallback to localStorage
    return JSON.parse(localStorage.getItem('jobs') || '[]');
  }
};
```

---

## 🆘 Yardım Kaynakları

- Supabase Docs: https://supabase.com/docs
- React Query: https://tanstack.com/query (opsiyonel)
- This project: `SUPABASE_SETUP.md`

---

**Son Güncelleme:** 2 Kasım 2025
