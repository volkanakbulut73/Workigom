# 🎯 Workigom - Demo Test Rehberi

## 📋 Demo Kullanıcı Hesapları

### 👤 BİREYSEL KULLANICILAR

1. **Ahmet Yılmaz**
   - ID: IND001
   - Email: ahmet.yilmaz@email.com
   - Telefon: +90 532 123 4567
   - Uzmanlık: Temizlik, Organizasyon

2. **Ayşe Demir**
   - ID: IND002
   - Email: ayse.demir@email.com
   - Telefon: +90 533 234 5678
   - Uzmanlık: Genel İşler

3. **Mehmet Kaya**
   - ID: IND003
   - Email: mehmet.kaya@email.com
   - Telefon: +90 534 345 6789
   - Uzmanlık: Teknik İşler

### 🏢 KURUMSAL KULLANICILAR

1. **Elite Temizlik A.Ş.**
   - ID: COMP001
   - Email: info@elitetemizlik.com
   - Telefon: +90 212 555 0001
   - Sektör: Temizlik Hizmetleri

2. **Güvenlik Plus Ltd.**
   - ID: COMP002
   - Email: iletisim@guvenlikplus.com
   - Telefon: +90 212 555 0002
   - Sektör: Güvenlik Hizmetleri

3. **TeknoServis A.Ş.**
   - ID: COMP003
   - Email: destek@teknoservis.com
   - Telefon: +90 212 555 0003
   - Sektör: Teknik Servis

---

## 🚀 DEMO ACİL İŞ İLANLARI

Sistem başlatıldığında otomatik olarak 3 acil iş ilanı yüklenir:

1. **Ofis Temizliği - Acil** (Elite Temizlik A.Ş.)
   - Kategori: Temizlik
   - Konum: Levent, İstanbul
   - Günlük Ücret: 1000 ₺
   - Süre: 6 saat

2. **Güvenlik Görevlisi - Gece Vardiyası** (Güvenlik Plus Ltd.)
   - Kategori: Güvenlik
   - Konum: Maslak, İstanbul
   - Günlük Ücret: 1200 ₺
   - Süre: 12 saat

3. **Bilgisayar Teknik Servisi** (TeknoServis A.Ş.)
   - Kategori: Teknik
   - Konum: Şişli, İstanbul
   - Günlük Ücret: 1600 ₺
   - Süre: 4 saat

---

## 📝 TEST SENARYOSU 1: BİREYSEL KULLANICI - ACİL İŞ KABUL

### Adım 1: Ahmet Yılmaz Olarak Giriş Yap
1. Ana sayfada **"Hemen Başla"** butonuna tıkla
2. **"Bireysel Hesap"** kartını seç
3. **Demo Hesaplar** bölümünden **"Ahmet Yılmaz"** kartına tıkla
4. ✅ Toast mesajı: "🎉 Ahmet Yılmaz olarak giriş yapıldı!"

### Adım 2: Acil İş İlanlarını Görüntüle
1. Sol menüden (mobilde alt navigasyon) **"Acil İşler"** sekmesine git
2. 🔍 **Beklenen:** 3 acil iş ilanı görünmeli
3. **"Ofis Temizliği - Acil"** kartına tıkla

### Adım 3: İşi Kabul Et
1. İş detaylarını incele
2. **Yeşil "Kabul Et"** butonuna bas
3. ✅ Toast mesajı: "İşi kabul ettiniz! Admin tarafından değerlendirilecek"
4. Buton **"Başvuru Gönderildi"** olarak değişmeli

---

## 📝 TEST SENARYOSU 2: AYŞE DEMİR İLE FARKLI BİR İŞE BAŞVUR

### Adım 1: Çıkış Yap ve Ayşe Demir Olarak Giriş Yap
1. Sağ üst köşede (veya mobilde profil) **Çıkış** butonuna bas
2. Ana sayfa → **"Hemen Başla"** → **"Bireysel Hesap"**
3. **"Ayşe Demir"** kartına tıkla

### Adım 2: Güvenlik İşini Kabul Et
1. **"Acil İşler"** sekmesine git
2. **"Güvenlik Görevlisi - Gece Vardiyası"** ilanına tıkla
3. **"Kabul Et"** butonuna bas
4. ✅ İş kabul edildi mesajı görünmeli

---

## 📝 TEST SENARYOSU 3: MEHMET KAYA İLE TEKNİK İŞE BAŞVUR

### Adım 1: Mehmet Kaya Olarak Giriş Yap
1. Çıkış yap → Ana sayfa
2. **"Hemen Başla"** → **"Bireysel Hesap"**
3. **"Mehmet Kaya"** kartını seç

### Adım 2: Teknik Servisi Kabul Et
1. **"Acil İşler"** → **"Bilgisayar Teknik Servisi"**
2. **"Kabul Et"** butonuna bas
3. ✅ Başvuru tamamlandı

---

## 📝 TEST SENARYOSU 4: ADMİN PANELİ - KABUL EDİLEN İŞLERİ GÖRÜNTÜLE

### Adım 1: Admin Paneline Giriş Yap
1. Çıkış yap → Ana sayfa
2. **"Admin Girişi"** butonuna tıkla
3. **"Giriş Yap"** (şifre gerektirmez)

### Adım 2: Acil İş Kabullerini Görüntüle
1. Sol sidebar'da **"Acil İş Kabulleri"** sekmesine git
2. 🔍 **Beklenen Görünüm:**

**İŞ #1: Ofis Temizliği - Acil**
- Elite Temizlik A.Ş.
- 📍 Levent, İstanbul
- 💰 1000 ₺/gün
- ⏱️ 6 saat

**Kabul Eden Personeller (1):**
- **Ahmet Yılmaz**
  - 📞 +90 532 123 4567
  - 📧 ahmet.yilmaz@email.com
  - 🕐 Kabul edildi: [Tarih ve saat]
  - 🔵 **[Personeli Ata]** butonu

**İŞ #2: Güvenlik Görevlisi**
- **Ayşe Demir** - [Personeli Ata]

**İŞ #3: Bilgisayar Teknik Servisi**
- **Mehmet Kaya** - [Personeli Ata]

---

## 📝 TEST SENARYOSU 5: ADMİN - PERSONEL ATAMA (AHMET YILMAZ)

### Adım 1: Ahmet Yılmaz'ı Ata
1. **"Ofis Temizliği - Acil"** kartında
2. **Ahmet Yılmaz** personel kartının altındaki **"Personeli Ata"** butonuna bas
3. ✅ Toast mesajı: "Personel atandı! Ahmet Yılmaz Elite Temizlik A.Ş. şirketine atandı"
4. 🟢 Personel kartı yeşile döner
5. Badge: **"✓ Atandı"** görünür

### Adım 2: Diğer Personelleri de Ata
1. **Ayşe Demir** için **"Personeli Ata"** → Güvenlik Plus Ltd.'ye atandı
2. **Mehmet Kaya** için **"Personeli Ata"** → TeknoServis A.Ş.'ye atandı

---

## 📝 TEST SENARYOSU 6: ŞİRKET PANELİ - ATANAN PERSONELLERİ GÖRÜNTÜLE

### Test 6.1: Elite Temizlik A.Ş.

1. Çıkış yap → **"Hemen Başla"** → **"Kurumsal Hesap"**
2. **"Elite Temizlik A.Ş."** kartına tıkla
3. 🔍 **Ana Sayfa İstatistikler:**

**Gelecek Personel Kartı:**
- Sayı: **1** (önceden 0'dı ✓)

**Atanan Personeller (1):**
- **Ahmet Yılmaz**
  - İş: Ofis Temizliği - Acil
  - 💰 1000 ₺
  - 📞 +90 532 123 4567
  - 📅 Tarih: [Atanma tarihi]
  - 🔵 Badge: **"Atandı"**

### Test 6.2: Güvenlik Plus Ltd.

1. Çıkış yap → Kurumsal hesap
2. **"Güvenlik Plus Ltd."** olarak giriş yap
3. 🔍 **Beklenen:**
   - Gelecek Personel: **1**
   - Atanan: **Ayşe Demir** (Güvenlik Görevlisi)

### Test 6.3: TeknoServis A.Ş.

1. Çıkış yap → Kurumsal hesap
2. **"TeknoServis A.Ş."** olarak giriş yap
3. 🔍 **Beklenen:**
   - Gelecek Personel: **1**
   - Atanan: **Mehmet Kaya** (Bilgisayar Teknik Servisi)

---

## ✅ TEST SONUÇ KONTROL LİSTESİ

### Bireysel Kullanıcı Testleri
- [ ] 3 farklı bireysel kullanıcı ile giriş yapabiliyorum
- [ ] Her kullanıcı acil işleri görebiliyor
- [ ] "Kabul Et" butonu çalışıyor
- [ ] Toast mesajları görünüyor
- [ ] Kabul sonrası buton "Başvuru Gönderildi" oluyor

### Admin Panel Testleri
- [ ] Admin paneline giriş yapabiliyorum
- [ ] "Acil İş Kabulleri" sekmesi var
- [ ] Tüm kabul edilen işler görünüyor
- [ ] İşler kategorilere göre gruplanmış
- [ ] Her personelin bilgileri doğru görünüyor
- [ ] "Personeli Ata" butonu çalışıyor
- [ ] Atama sonrası badge "Atandı" oluyor
- [ ] Atama toast mesajı görünüyor

### Şirket Panel Testleri
- [ ] 3 farklı şirket ile giriş yapabiliyorum
- [ ] Her şirket kendi adını görüyor
- [ ] "Gelecek Personel" sayısı doğru (başlangıç 0, atama sonrası 1)
- [ ] "Atanan Personeller" listesi görünüyor
- [ ] Atanan personel bilgileri doğru (isim, telefon, iş)
- [ ] "Atandı" badge'i görünüyor

### Veri Tutarlılığı
- [ ] Bireysel kullanıcı kabul etti → Admin panelinde görünüyor
- [ ] Admin atadı → Şirket panelinde görünüyor
- [ ] Her şirket sadece kendine atanan personelleri görüyor
- [ ] Sayaç değerleri doğru güncellenmiş

---

## 🐛 Hata Ayıklama

### LocalStorage Verilerini Kontrol Et

DevTools Console'da çalıştır:

```javascript
// Kabul edilen işler
console.log('Acceptances:', JSON.parse(localStorage.getItem('urgentJobAcceptances')));

// Atanan personeller
console.log('Assigned:', JSON.parse(localStorage.getItem('assignedPersonnel')));

// Şirket istatistikleri
console.log('Stats:', JSON.parse(localStorage.getItem('companyStats')));

// Mevcut kullanıcı
console.log('Current User:', JSON.parse(localStorage.getItem('currentUser')));
```

### Verileri Sıfırla

```javascript
localStorage.removeItem('urgentJobAcceptances');
localStorage.removeItem('assignedPersonnel');
localStorage.removeItem('companyStats');
localStorage.removeItem('demoDataInitialized');
location.reload();
```

---

## 🎉 Başarılı Test Senaryosu Özeti

1. **3 Bireysel Kullanıcı** → 3 farklı acil işe başvurdu ✅
2. **Admin** → 3 personeli 3 farklı şirkete atadı ✅
3. **3 Şirket** → Her biri kendi atanan personelini gördü ✅
4. **Sayaçlar** → Tüm istatistikler doğru güncellendi ✅

---

## 📊 Sistem Akışı Diyagramı

```
BİREYSEL → Acil İşler → İş Detay → [Kabul Et]
                                         ↓
                              urgentJobAcceptances (localStorage)
                                         ↓
ADMİN → Acil İş Kabulleri → [Personeli Ata]
                                         ↓
                              assignedPersonnel (localStorage)
                              companyStats +1
                                         ↓
ŞİRKET → Ana Sayfa → Gelecek Personel: 1 ✅
                   → Atanan Personeller Listesi ✅
```

---

## 🎯 Sonuç

Tüm test senaryoları başarıyla tamamlandıysa, sistem tam olarak çalışıyor demektir! 

**Önemli:** Her test senaryosunu sırayla takip edin ve her adımda beklenen sonuçları kontrol edin.
