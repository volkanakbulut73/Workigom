# 🍽️ Yemek Bağışı Sistemi - Test Rehberi

## Test Kullanıcıları

Yemek bağışı sistemini test etmek için farklı kullanıcılarla giriş yapabilirsiniz:

### Bireysel Kullanıcılar

#### Kullanıcı 1 - Ahmet Yılmaz (Destek İsteyen)
- **E-posta:** ahmet.yilmaz@email.com
- **Şifre:** ahmet123
- **ID:** IND001

#### Kullanıcı 2 - Ayşe Demir (Bağışçı)
- **E-posta:** ayse.demir@email.com
- **Şifre:** ayse123
- **ID:** IND002

#### Kullanıcı 3 - Mehmet Kaya (Bağışçı)
- **E-posta:** mehmet.kaya@email.com
- **Şifre:** mehmet123
- **ID:** IND003

---

## Test Senaryosu 1: %20 Destek Akışı

### Adım 1: Destek Talebi Oluştur
1. **Ahmet Yılmaz** ile giriş yap
2. Ana sayfadan **"Birlikte Paylaşıyoruz 🍽️"** kartına tıkla
3. **"Yemeğine Destek Bul"** butonuna tıkla
4. Formu doldur:
   - Menü Tutarı: 1000 TL
   - Açıklama: "Bugün öğle yemeği için destek arıyorum"
5. **"İlanı Yayınla"** butonuna tıkla
6. ✅ Talep yayınlandı - "Tracking" başladı

### Adım 2: Bağışçı Olarak Destek Ver
1. Çıkış yap
2. **Ayşe Demir** ile giriş yap
3. Ana sayfadan **"Birlikte Paylaşıyoruz 🍽️"** kartına tıkla
4. **"Yemek Bağışçısı Ol"** butonuna tıkla
5. **Ahmet Y.'nin** talebini gör
6. **"Destek Ol"** butonuna tıkla
7. %20 seçeneğini seç ve **"Desteği Onayla"** butonuna tıkla

### Adım 3: Mesajlar Kontrol Et

**Ahmet Yılmaz (Destek Alan) Görür:**
> "Ayşe D. yemeğine destek olmak istiyor 💛
> 
> Şimdi ödeme ekranına yönlendiriliyorsunuz, 5 dk içinde QR ekranınızda olacak."

### Adım 4: Ödeme Yap (Destek Alan)
1. Çıkış yap ve **Ahmet Yılmaz** ile giriş yap
2. Bildirimler sayfasına git - mesajı gör
3. Destek Bul sayfasına git - tracking'de "Ödemeniz" adımını gör
4. **"Ödeme Yap (800 ₺)"** butonuna tıkla

**Ayşe Demir (Bağışçı) Görür:**
> "Yemek tutarının ödemesi yapıldı ✅
> 
> Lütfen 1000 TL'lik QR kodu oluşturup ekran görüntüsünü yükleyiniz."

### Adım 5: QR Kod Yükle (Bağışçı)
1. Çıkış yap ve **Ayşe Demir** ile giriş yap
2. QR kod yükleme ekranında bir görsel yükle
3. **"QR Kodu Yükle"** butonuna tıkla

**Ahmet Yılmaz (Destek Alan) Görür:**
> "📷 QR yüklendi — 300 sn içinde geçerli."

### Adım 6: Restoranda Ödeme Yap (Destek Alan)
1. Çıkış yap ve **Ahmet Yılmaz** ile giriş yap
2. QR kodu gör ve 300 saniyelik countdown'u takip et
3. "Restoranda" ödemeyi yap (simüle et)
4. **"💸 Ödeme Yapıldı"** butonuna tıkla

**Sonuç:**
- **Ahmet Yılmaz görür:** "Afiyet olsun 🎓"
- **Ayşe Demir görür:** "Destek tamamlandı 💛"

---

## Test Senaryosu 2: %100 "Buda Benden" Akışı

### Adım 1: Destek Talebi Oluştur
1. **Mehmet Kaya** ile giriş yap
2. Ana sayfadan **"Birlikte Paylaşıyoruz 🍽️"** kartına tıkla
3. **"Yemeğine Destek Bul"** butonuna tıkla
4. Formu doldur:
   - Menü Tutarı: 500 TL
   - Açıklama: "Akşam yemeği için destek arıyorum"
5. **"İlanı Yayınla"** butonuna tıkla

### Adım 2: Bağışçı Olarak Tam Destek Ver
1. Çıkış yap
2. **Ayşe Demir** ile giriş yap
3. **"Yemek Bağışçısı Ol"** butonuna tıkla
4. **Mehmet K.'nin** talebini gör
5. **"Destek Ol"** butonuna tıkla
6. **%100 "Buda Benden Olsun"** seçeneğini seç
7. **"Desteği Onayla"** butonuna tıkla

### Adım 3: Mesajlar Kontrol Et

**Mehmet Kaya (Destek Alan) Görür:**
> "Ayşe D. yemeğine "Buda Benden" diyerek tamamına destek olmak istiyor 💛
> 
> Ödeme yapmayacaksınız, 5 dk içinde QR ekranınızda olacak."

**Ayşe Demir (Bağışçı) Görür:**
> "Destek bekleyen hazır ✅
> 
> Lütfen 500 TL'lik QR kodu oluşturup ekran görüntüsünü yükleyiniz."

### Adım 4: QR Kod Yükle (Bağışçı)
1. **Ayşe Demir** hesabında kal
2. QR kod yükleme ekranında bir görsel yükle
3. **"QR Kodu Yükle"** butonuna tıkla

**Mehmet Kaya (Destek Alan) Görür:**
> "📷 QR yüklendi — 300 sn içinde geçerli."

### Adım 5: Restoranda Ödeme Yap (Destek Alan)
1. Çıkış yap ve **Mehmet Kaya** ile giriş yap
2. QR kodu gör ve countdown'u takip et
3. "Restoranda" ödemeyi yap
4. **"💸 Ödeme Yapıldı"** butonuna tıkla

**Sonuç:**
- **Mehmet Kaya görür:** "Afiyet olsun 🎓" + **"Ayşe D.'ye Desteği İçin Teşekkür Et"** butonu
- Teşekkür et butonuna tıkla
- **Ayşe Demir görür:** "Destek tamamlandı 💛" + "Altın Kalbin oldu! ❤️"

### Adım 6: Altın Kalp Kontrolü
1. **Ayşe Demir** ile Profil sayfasına git
2. İsmin yanında Altın Kalp ❤️ ikonunu ve sayısını gör

---

## 📊 Tracking Sistemi

Her kullanıcı kendi tarafında işlem adımlarını görebilir:

### %20 Destek İçin (Destek Alan):
1. ⚪ Eşleşme
2. ⚪ Ödemeniz
3. ⚪ QR Hazırlama
4. ⚪ QR Yüklendi
5. ⚪ Ödeme Yapıldı
6. ⚪ Tamamlandı

### %100 Destek İçin (Destek Alan):
1. ⚪ Eşleşme
2. ⚪ QR Hazırlama
3. ⚪ QR Yüklendi
4. ⚪ Ödeme Yapıldı
5. ⚪ Tamamlandı

### Bağışçı Tarafı:
- Eşleşme
- (Alıcı Ödemesi - sadece %20 için)
- QR Hazırlama
- QR Yüklendi
- Ödeme Yapıldı
- Tamamlandı

---

## 🎯 Test Noktaları

### ✅ Kontrol Edilmesi Gerekenler:

1. **Form Validasyonu:**
   - Minimum tutar 50 TL
   - Açıklama zorunlu
   - İsim otomatik dolu ve doğru formatta

2. **Bildirimler:**
   - Tüm adımlarda doğru bildirimler gönderiliyor mu?
   - Mesaj içerikleri doğru mu?

3. **Tracking:**
   - Her adımda doğru adım vurgulanıyor mu?
   - Tamamlanan adımlar yeşil işaretli mi?

4. **QR Countdown:**
   - 300 saniye (5 dakika) doğru sayıyor mu?
   - Son 60 saniyede kırmızı uyarı gösteriliyor mu?

5. **Altın Kalp:**
   - %100 destekte teşekkür butonu görünüyor mu?
   - Teşekkür edilince bağışçı Altın Kalp kazanıyor mu?
   - Profilde Altın Kalp görünüyor mu?

6. **Polling:**
   - Sayfalar arası geçişte veriler güncelleniyor mu?
   - 2 saniyelik polling düzgün çalışıyor mu?

---

## 🔧 Debug İpuçları

### Console Log'ları
Tarayıcı konsolunu (F12) açın ve şunları kontrol edin:

```
📋 Toplam talep sayısı: X
⏳ Bekleyen talepler: X
👤 Mevcut kullanıcı ID: INDXXX
✅ Gösterilen talepler: X
```

### LocalStorage Kontrol
Console'da şunu yazın:
```javascript
// Tüm talepleri gör
JSON.parse(localStorage.getItem('foodDonationRequests'))

// Bildirimleri gör
JSON.parse(localStorage.getItem('notifications'))

// Profilleri gör
JSON.parse(localStorage.getItem('userProfiles'))
```

### LocalStorage Temizle (Reset)
Tüm verileri sıfırlamak için:
```javascript
localStorage.removeItem('foodDonationRequests')
localStorage.removeItem('notifications')
localStorage.removeItem('userProfiles')
```

---

## 🐛 Bilinen Sorunlar ve Çözümler

### Sorun: Talepler görünmüyor
**Çözüm:** 
- Farklı kullanıcılarla giriş yapıldığından emin olun
- Console'da talep sayısını kontrol edin
- LocalStorage'ı temizleyip yeniden deneyin

### Sorun: Bildirimler gelmiyor
**Çözüm:**
- Polling aktif mi kontrol edin (2 saniyelik interval)
- Kullanıcı ID'lerinin doğru olduğunu kontrol edin

### Sorun: Tracking güncellenmiy or
**Çözüm:**
- Sayfayı yenileyin
- LocalStorage'daki status'ü kontrol edin

---

## 📞 Destek

Sorun yaşarsanız:
1. Console log'larını kontrol edin
2. LocalStorage verilerini kontrol edin
3. Farklı kullanıcılarla test edin
4. Gerekirse tüm verileri sıfırlayın

**Not:** Bu bir demo ortamıdır. Gerçek üretimde backend API entegrasyonu gereklidir.
