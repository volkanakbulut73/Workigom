# 🚀 Workigom - İş Pazarı Uygulaması

Workigom, çalışanları şirketlerle acil iş fırsatları için bağlayan mobil öncelikli bir iş pazarı uygulamasıdır.

## 📋 Özellikler

### 👤 Bireysel Kullanıcılar (Çalışanlar)
- ⚡ Acil iş ilanlarına başvuru
- 💼 İş geçmişi takibi
- 🍽️ Yemek bağışı sistemi (Destek bul/Bağışçı ol)
- 💛 Altın Kalp rozetleri (%100 destek için)
- 📱 Bildirimler ve mesajlaşma
- 👤 Profil yönetimi

### 🏢 Kurumsal Kullanıcılar (Şirketler)
- 📝 Acil iş ilanı oluşturma
- 👥 Personel atama sistemi
- 📊 İstatistikler ve raporlama
- ✅ Başvuru onaylama/reddetme
- 💰 Kazanç takibi

### 🎯 Yemek Bağışı Sistemi
- %20 kısmi destek akışı
- %100 "Buda Benden" tam destek akışı
- QR kod sistemi (300 saniyelik countdown)
- Detaylı tracking sistemi
- Bildirim ve mesajlaşma entegrasyonu
- Altın Kalp rozet sistemi

## 🎨 Tasarım

### Renk Paleti
- **Koyu Mavi:** `#012840` (Ana renkler)
- **Orta Mavi:** `#0367A6` (Vurgular)
- **Açık Mavi:** `#3F9BBF` (İkincil)
- **Çok Açık Mavi:** `#C9E2F2` (Arka planlar)

### Responsive Tasarım
- **Mobil:** Bottom navigation
- **Desktop:** Sidebar navigation
- Modern, şık ve kullanıcı dostu arayüz

## 🛠️ Teknolojiler

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Vite** - Build tool
- **Shadcn/ui** - UI components
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **LocalStorage** - Demo veri saklama

## 📦 Kurulum

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlat
```bash
npm run dev
```

### 3. Production Build
```bash
npm run build
```

### 4. Preview Build
```bash
npm run preview
```

## 🧪 Test Kullanıcıları

### Bireysel Kullanıcılar
1. **Ahmet Yılmaz**
   - E-posta: ahmet.yilmaz@email.com
   - Şifre: ahmet123
   - ID: IND001

2. **Ayşe Demir**
   - E-posta: ayse.demir@email.com
   - Şifre: ayse123
   - ID: IND002

3. **Mehmet Kaya**
   - E-posta: mehmet.kaya@email.com
   - Şifre: mehmet123
   - ID: IND003

### Kurumsal Kullanıcılar
1. **Elite Temizlik A.Ş.**
   - E-posta: info@elitetemizlik.com
   - Şifre: elite123
   - ID: COMP001

2. **Güvenlik Plus Ltd.**
   - E-posta: iletisim@guvenlikplus.com
   - Şifre: guvenlik123
   - ID: COMP002

3. **TeknoServis A.Ş.**
   - E-posta: destek@teknoservis.com
   - Şifre: tekno123
   - ID: COMP003

## 📚 Dokümantasyon

Proje içinde aşağıdaki dokümantasyon dosyaları bulunmaktadır:

- `YEMEK_BAGIS_TEST_REHBERI.md` - Yemek bağışı sistemi test rehberi
- `TEST_KULLANICI_BILGILERI.md` - Test kullanıcı bilgileri
- `DEMO_TEST_REHBERI.md` - Genel test rehberi
- `GOOGLE_OAUTH_ENTEGRASYON_REHBERI.md` - OAuth entegrasyon rehberi
- `ACIL_IS_TALEP_SISTEMI.md` - Acil iş talep sistemi dokümantasyonu

## 📁 Proje Yapısı

```
workigom/
├── App.tsx                      # Ana uygulama
├── components/
│   ├── employee/                # Bireysel kullanıcı sayfaları
│   │   ├── EmployeeHome.tsx
│   │   ├── UrgentJobsPage.tsx
│   │   ├── FoodDonationHome.tsx
│   │   ├── DonorListPage.tsx
│   │   ├── FindSupportPage.tsx
│   │   └── DonationDetailPage.tsx
│   ├── company/                 # Kurumsal kullanıcı sayfaları
│   │   ├── CompanyHome.tsx
│   │   ├── PostJobForm.tsx
│   │   └── ...
│   ├── shared/                  # Paylaşılan komponenler
│   │   ├── NotificationsPage.tsx
│   │   └── MessagesPage.tsx
│   └── ui/                      # Shadcn UI komponentleri
├── lib/
│   └── mockData.ts              # Demo veri ve fonksiyonlar
├── styles/
│   └── globals.css              # Global stiller
└── package.json
```

## 🔑 Önemli Özellikler

### Acil İş Sistemi
- Kategoriler: Temizlik, Teknik, Güvenlik, Diğer
- Günlük ücret standardizasyonu
- Acil iş onay/red sistemi
- Personel atama sistemi

### Yemek Bağışı Sistemi
- **%20 Kısmi Destek:**
  - Bağışçı %20 destekler
  - Destek alan %80 öder
  - Platform ücreti %5 (destek alandan kesilir)
  
- **%100 Tam Destek:**
  - Bağışçı tamamını karşılar
  - Destek alan ödeme yapmaz
  - Platform ücreti %0
  - Altın Kalp rozeti kazanılır

### Tracking Sistemi
Her işlemde adım adım takip:
1. Eşleşme
2. Ödeme (varsa)
3. QR Hazırlama
4. QR Yüklendi
5. Ödeme Yapıldı
6. Tamamlandı

## 🐛 Debug

### Console Log'ları Kontrol
Tarayıcı konsolunu (F12) açın ve şunları göreceksiniz:
- Talep sayıları
- Kullanıcı ID'leri
- Status güncellemeleri

### LocalStorage Kontrol
```javascript
// Tüm talepleri gör
JSON.parse(localStorage.getItem('foodDonationRequests'))

// Bildirimleri gör
JSON.parse(localStorage.getItem('notifications'))

// Aktif bağışları gör
JSON.parse(localStorage.getItem('activeDonations'))
```

### LocalStorage Temizle
```javascript
localStorage.clear()
// veya
localStorage.removeItem('foodDonationRequests')
localStorage.removeItem('notifications')
localStorage.removeItem('activeDonations')
```

## 🚧 Geliştirme Notları

### LocalStorage Kullanımı
Bu demo sürümünde tüm veriler `localStorage`'da saklanmaktadır. Production ortamında:
- Backend API entegrasyonu yapılmalı
- Gerçek veritabanı kullanılmalı
- Authentication sistemi eklenmelidir
- WebSocket ile gerçek zamanlı bildirimler eklenmelidir

### Google OAuth
`GOOGLE_OAUTH_ENTEGRASYON_REHBERI.md` dosyasında detaylı OAuth entegrasyon adımları bulunmaktadır.

## 📱 Responsive Davranış

- **Mobil (< 1024px):**
  - Bottom navigation
  - Tam ekran kartlar
  - Touch-friendly butonlar

- **Desktop (≥ 1024px):**
  - Sol sidebar navigation
  - Merkezi içerik alanı
  - Hover efektleri

## 🎯 Gelecek Özellikler

- [ ] Backend API entegrasyonu
- [ ] Gerçek ödeme sistemi (Stripe/iyzico)
- [ ] Push notification desteği
- [ ] Gerçek zamanlı mesajlaşma
- [ ] Dosya yükleme (CV, QR kodlar)
- [ ] Harita entegrasyonu (lokasyon)
- [ ] Email bildirimleri
- [ ] SMS bildirimleri

## 📄 Lisans

Bu proje demo amaçlıdır. Ticari kullanım için lütfen iletişime geçin.

## 🤝 Katkıda Bulunma

Bu bir demo projedir. Önerilerinizi paylaşabilirsiniz.

## 📞 İletişim

Sorularınız için dokümantasyon dosyalarına bakın veya issue açın.

---

**Not:** Bu uygulama mobil öncelikli tasarlanmıştır. En iyi deneyim için mobil görünümde test edin!
