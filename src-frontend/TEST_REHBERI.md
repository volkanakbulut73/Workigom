# 🧪 Acil İş Talep Sistemi - Test Rehberi

## 📋 Test Özeti

Bu rehber, Workigom acil iş talep sisteminin tam akışını test etmeniz için hazırlanmıştır.

---

## 🏢 Test Şirketi Bilgileri

**Şirket:** Test Şirketi  
**E-posta:** info@testsirket.com  
**Şirket ID:** CORP006  
**Yetkili:** Test Yönetici  
**Konum:** Beşiktaş, İstanbul  
**Sektör:** Çok Sektörlü Test Şirketi  
**Durum:** ✅ Tam Doğrulanmış  
**Abonelik:** Premium (2026'ya kadar)

---

## 🔄 Test Akışı

### 1️⃣ Kurumsal Hesap ile Giriş

**Adımlar:**

1. Ana sayfada **"Hadi Başlayalım"** butonuna tıklayın
2. **"Kurumsal Giriş"** butonunu seçin
3. **"⚡ Demo Hesapla Keşfet"** butonuna tıklayın
   - Toast mesajı: "🎉 Test Şirketi Hesabıyla Giriş Yapıldı!"
4. Kurumsal ana sayfaya yönlendirileceksiniz

**Beklenen Sonuç:**
- ✅ Şirket profili görüntülenir
- ✅ Şirket adı: "Test Şirketi"
- ✅ Konum: "Beşiktaş, İstanbul"
- ✅ Üyelik tarihi: "Ekim 2025"

---

### 2️⃣ Acil İş İlanı Oluşturma

**Adımlar:**

1. Ana sayfada **"Acil İş İlanı Ver"** kartına tıklayın
2. Formu doldurun:

```
İş Başlığı: Acil Ofis Temizliği - Test İlanı
Kategori: Temizlik
Konum: Levent, İstanbul
Günlük Ücret: 1600 ₺
Zaman: 08:00-16:00
Başlangıç Zamanı: Bugün, 09:00
İş Açıklaması: Bu bir test ilanıdır. Ofis temizliği için deneyimli personel aranıyor.
```

3. **"İlanı Yayınla"** butonuna tıklayın

**Beklenen Sonuç:**
- ✅ Toast mesajı: "🚀 Acil iş talebi admin onayına gönderildi!"
- ✅ Ana sayfaya yönlendirme
- ✅ LocalStorage'a kayıt: `urgentJobRequests`

**Kontrol:**
```javascript
// Tarayıcı Console'da
localStorage.getItem('urgentJobRequests')
```

---

### 3️⃣ Admin Panel'e Giriş

**Adımlar:**

1. **Çıkış yapın** (Sağ üst köşe - Çıkış butonu)
2. Ana sayfada **footer'daki "Admin Girişi"** linkine tıklayın
3. Admin giriş sayfasında (e-posta ve şifre gerekli değil):
4. **"Giriş Yap"** butonuna tıklayın

**Beklenen Sonuç:**
- ✅ Admin paneline yönlendirme
- ✅ Dashboard görüntülenir
- ✅ Sidebar menüsü aktif

---

### 4️⃣ Acil Talepleri Görüntüleme

**Adımlar:**

1. Sol sidebar'dan **"Acil Talepler"** menüsüne tıklayın
2. Sayfada şu bilgileri görmelisiniz:

**Header:**
- Sayfa başlığı: "Acil Talepler"
- Badge: "[Sayı] Bekleyen Talep" (kırmızı)

**Talep Kartı:**
```
┌───────────────────────────────────────────────────────┐
│ 🚨 ACİL  [Temizlik]                                   │
│ Acil Ofis Temizliği - Test İlanı                     │
│ 🏢 Test Şirketi | ⏰ Şimdi                            │
├───────────────────────────────────────────────────────┤
│ ┌─────────────────┬─────────────────┐                │
│ │ 📍 Konum        │ ⏰ Çalışma Saati│                │
│ │ Levent, İstanbul│ 08:00-16:00     │                │
│ └─────────────────┴─────────────────┘                │
│ ┌─────────────────┬─────────────────┐                │
│ │ 💵 Günlük Ücret │ ⏰ Başlangıç    │                │
│ │ 1600 ₺          │ Bugün, 09:00    │                │
│ │ 200 ₺/saat      │                 │                │
│ └─────────────────┴─────────────────┘                │
├───────────────────────────────────────────────────────┤
│ İş Açıklaması                                         │
│ Bu bir test ilanıdır. Ofis temizliği için            │
│ deneyimli personel aranıyor.                          │
├───────────────────────────────────────────────────────┤
│ Talep Zamanı: [Timestamp]                             │
├───────────────────────────────────────────────────────┤
│ [📤 Bildirim Olarak Gönder]  [❌ Reddet]             │
└───────────────────────────────────────────────────────┘
```

**Beklenen Sonuç:**
- ✅ Mock data'dan 3 talep + Yeni talep = 4 talep görünür
- ✅ Kartlar gradient arka plana sahip
- ✅ Tüm detaylar doğru şekilde gösteriliyor
- ✅ **ÖNEMLİ:** Günlük ücret olarak girilen değer (1600 ₺) görünmeli
- ✅ Alt satırda saatlik ücret hesaplanmış olarak gösterilmeli (200 ₺/saat)

---

### 5️⃣ Talebi Onaylama

**Adımlar:**

1. Test ilanının kartında **"📤 Bildirim Olarak Gönder"** butonuna tıklayın

**Beklenen Sonuç:**
- ✅ Toast mesajı: "✅ İş ilanı onaylandı! Talep tüm bireysel kullanıcılara bildirim olarak gönderildi."
- ✅ Kart listeden kaybolur
- ✅ Badge sayısı azalır
- ✅ LocalStorage güncellenir: `approvedUrgentJobs`

**Kontrol:**
```javascript
// Tarayıcı Console'da
localStorage.getItem('approvedUrgentJobs')
```

---

### 6️⃣ Bireysel Kullanıcı Girişi

**Adımlar:**

1. **Çıkış yapın**
2. Ana sayfada **"Hadi Başlayalım"** butonuna tıklayın
3. **"Bireysel Giriş"** butonunu seçin
4. **"⚡ Demo Hesapla Keşfet"** butonuna tıklayın

**Beklenen Sonuç:**
- ✅ Toast mesajı: "🎉 Demo Çalışan Hesabıyla Giriş Yapıldı!"
- ✅ Bireysel kullanıcı ana sayfasına yönlendirme

---

### 7️⃣ Acil İşleri Görüntüleme

**Adımlar:**

1. Alt menüden **"Acil İşler"** sekmesine tıklayın
2. Veya ana sayfada **"Acil İşler"** kartına tıklayın

**Beklenen Banner:**
```
┌─────────────────────────────────────────────────┐
│ ⚡ 🚨 [Sayı] Yeni Acil İş İlanı!                │
│ Admin tarafından onaylanan acil işler           │
│ yayınlandı. Hemen başvur!                       │
└─────────────────────────────────────────────────┘
```

**Beklenen İş Kartı:**
```
┌──────────────────────────────────┐[YENİ⚡]
│ Acil Ofis Temizliği - Test İlanı│ 🚨 Acil│
│ Test Şirketi                     │         │
├──────────────────────────────────┤         │
│ 📍 Levent, İstanbul              │         │
│ ⏰ Bugün, 09:00 • 08:00-16:00    │         │
│ 💵 200 ₺/saat                    │         │
├──────────────────────────────────┤         │
│ Şimdi yayınlandı | 0 başvuru     │         │
├──────────────────────────────────┤         │
│ ⚠️ Admin onaylı acil iş ilanı    │         │
└──────────────────────────────────┘         │
```

**Özellikler:**
- ✅ Gradient arka plan (amber-orange)
- ✅ Kalın turuncu border
- ✅ Sağ üst köşede "YENİ" badge'i
- ✅ Kırmızı "🚨 Acil" badge'i
- ✅ Alt kısımda admin onaylı etiketi

---

## 🔍 Detaylı Kontroller

### LocalStorage Verileri

**1. urgentJobRequests**
```javascript
JSON.parse(localStorage.getItem('urgentJobRequests'))
```
**Beklenen:**
- Array içinde talep objesi
- Status: 'approved'
- reviewedAt: Timestamp

**2. approvedUrgentJobs**
```javascript
JSON.parse(localStorage.getItem('approvedUrgentJobs'))
```
**Beklenen:**
- Array içinde iş objesi
- Status: 'active'
- approvedAt: Timestamp

---

## 🧹 Test Sonrası Temizlik

LocalStorage'ı temizlemek için:

```javascript
// Tüm test verilerini temizle
localStorage.removeItem('urgentJobRequests');
localStorage.removeItem('approvedUrgentJobs');

// Veya tüm localStorage'ı temizle
localStorage.clear();
```

---

## ❌ Reddetme Testi (Opsiyonel)

### Red Akışı

**Adımlar:**

1. Yeni bir acil iş ilanı oluşturun (Adım 1-2)
2. Admin paneline giriş yapın (Adım 3-4)
3. Talep kartında **"❌ Reddet"** butonuna tıklayın

**Beklenen Sonuç:**
- ✅ Toast mesajı: "❌ İş ilanı reddedildi. Test Şirketi şirketine bildirim gönderildi."
- ✅ Kart listeden kaybolur
- ✅ Badge sayısı azalır
- ✅ Talep status'u: 'rejected'

---

## 📊 Test Checklist

### Şirket Tarafı
- [ ] Giriş yapabilme
- [ ] Şirket profili doğru görünüyor
- [ ] İlan formu açılıyor
- [ ] Form validasyonu çalışıyor
- [ ] İlan başarıyla gönderiliyor
- [ ] Toast mesajı gösteriliyor
- [ ] Ana sayfaya yönlendirme

### Admin Tarafı
- [ ] Admin paneline giriş
- [ ] Acil Talepler sayfası açılıyor
- [ ] Talepler listeleniyor
- [ ] Talep detayları doğru
- [ ] Onay butonu çalışıyor
- [ ] Red butonu çalışıyor
- [ ] Toast mesajları gösteriliyor
- [ ] Sidebar badge güncelleniyor
- [ ] Dashboard istatistikleri güncelleniyor

### Bireysel Kullanıcı Tarafı
- [ ] Giriş yapabilme
- [ ] Acil İşler sayfasına erişim
- [ ] Banner görüntüleniyor
- [ ] Onaylanan işler listeleniyor
- [ ] Kartlar doğru tasarımda
- [ ] "YENİ" badge'i görünüyor
- [ ] Admin onaylı etiketi var
- [ ] Filtreleme çalışıyor
- [ ] İş detayına tıklama

---

## 🐛 Bilinen Sorunlar ve Çözümler

### Sorun 1: Talepler Görünmüyor
**Çözüm:** Sayfa yenilemeyi deneyin veya localStorage'ı kontrol edin

### Sorun 2: Toast Mesajları Gözükmüyor
**Çözüm:** Toaster component'inin yüklendiğinden emin olun

### Sorun 3: Onay Sonrası Kart Kalmıyor
**Çözüm:** Bu normal davranış - talep onaylandığında listeden kaldırılır

---

## 📸 Ekran Görüntüleri İçin Kontrol Noktaları

1. **Şirket Ana Sayfa:** Test Şirketi profili
2. **İlan Formu:** Doldurulmuş form
3. **Admin Talep Kartı:** Detaylı talep kartı
4. **Admin Onay Toast:** Başarı mesajı
5. **Bireysel Banner:** Yeni acil işler banner'ı
6. **Bireysel İş Kartı:** Gradient tasarımlı kart

---

## 🎯 Başarı Kriterleri

✅ Tüm adımlar sorunsuz çalışıyor  
✅ Toast mesajları doğru gösteriliyor  
✅ LocalStorage verileri kaydediliyor  
✅ Tasarımlar responsive  
✅ Animasyonlar sorunsuz  
✅ Veri akışı doğru çalışıyor

---

## 📞 Sorun Yaşarsanız

1. Console'u kontrol edin (F12)
2. Network tab'ını kontrol edin
3. LocalStorage verilerini kontrol edin
4. Sayfayı yenileyin (Hard Refresh: Ctrl+Shift+R)

---

**Test Tarihi:** 19 Ekim 2025  
**Test Versiyonu:** 1.0.0  
**Test Durumu:** ✅ Hazır  
**Tahmini Süre:** 5-10 dakika
