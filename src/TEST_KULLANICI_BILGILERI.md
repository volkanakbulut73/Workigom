# 🔐 WORKIGOM Test Kullanıcı Bilgileri

## 📋 Genel Bakış

Workigom uygulamasında test yapmak için kullanabileceğiniz kayıtlı kullanıcı hesaplarıdır. Her kullanıcı sisteme tam entegre edilmiş olup e-posta ve şifre ile giriş yapabilirsiniz.

---

## 👤 BİREYSEL KULLANICILAR

### 1. Ahmet Yılmaz
```
ID: IND001
E-posta: ahmet.yilmaz@email.com
Şifre: ahmet123
Telefon: +90 532 123 4567
Rol: Bireysel (Çalışan)
```

**Kullanım Senaryoları:**
- ✅ Acil iş ilanlarına başvuru yapma
- ✅ Menü Market paylaşımı talep etme (Ali rolü)
- ✅ Profil yönetimi
- ✅ Kazanç takibi

---

### 2. Ayşe Demir
```
ID: IND002
E-posta: ayse.demir@email.com
Şifre: ayse123
Telefon: +90 533 234 5678
Rol: Bireysel (Çalışan)
```

**Kullanım Senaryoları:**
- ✅ Acil iş ilanlarına başvuru yapma
- ✅ Menü Market paylaşımı yapma (Ayşe rolü - Altın Kalp kazanma)
- ✅ İş geçmişi görüntüleme
- ✅ Bildirimler

---

### 3. Mehmet Kaya
```
ID: IND003
E-posta: mehmet.kaya@email.com
Şifre: mehmet123
Telefon: +90 534 345 6789
Rol: Bireysel (Çalışan)
```

**Kullanım Senaryoları:**
- ✅ Acil iş ilanlarına başvuru yapma
- ✅ Menü Market paylaşım sistemi testleri
- ✅ Mesajlaşma testleri

---

## 🏢 KURUMSAL KULLANICILAR

### 1. Elite Temizlik A.Ş.
```
ID: COMP001
E-posta: info@elitetemizlik.com
Şifre: elite123
Telefon: +90 212 555 0001
Rol: Kurumsal (Şirket)
Kategori: Temizlik
```

**Kullanım Senaryoları:**
- ✅ Acil iş ilanı oluşturma
- ✅ Personel atama
- ✅ Başvuruları görüntüleme
- ✅ Gelen personel listesi yönetimi

**Aktif İş İlanları:**
- Ofis Temizliği - Acil (DEMO-JOB-001)

---

### 2. Güvenlik Plus Ltd.
```
ID: COMP002
E-posta: iletisim@guvenlikplus.com
Şifre: guvenlik123
Telefon: +90 212 555 0002
Rol: Kurumsal (Şirket)
Kategori: Güvenlik
```

**Kullanım Senaryoları:**
- ✅ Güvenlik personeli talep etme
- ✅ Gece vardiyası planlaması
- ✅ Personel performans takibi
- ✅ İstatistik görüntüleme

**Aktif İş İlanları:**
- Güvenlik Görevlisi - Gece Vardiyası (DEMO-JOB-002)

---

### 3. TeknoServis A.Ş.
```
ID: COMP003
E-posta: destek@teknoservis.com
Şifre: tekno123
Telefon: +90 212 555 0003
Rol: Kurumsal (Şirket)
Kategori: Teknik
```

**Kullanım Senaryoları:**
- ✅ Teknik personel talep etme
- ✅ Acil servis çağrıları
- ✅ Personel değerlendirme
- ✅ Ödeme yönetimi

**Aktif İş İlanları:**
- Bilgisayar Teknik Servisi (DEMO-JOB-003)

---

## 🎯 GİRİŞ YÖNTEMLERİ

### Yöntem 1: Tek Tıkla Hızlı Giriş ⚡ (Önerilen)
1. Ana sayfada "Başla" butonuna tıklayın
2. Bireysel veya Kurumsal seçin
3. Giriş ekranında demo hesaplardan birini tıklayın
4. Otomatik giriş yapılır!

### Yöntem 2: E-posta ve Şifre ile Giriş 📧
1. Ana sayfada "Başla" butonuna tıklayın
2. Bireysel veya Kurumsal seçin
3. E-posta ve şifre alanlarını doldurun
4. "E-posta ile Giriş Yap" butonuna tıklayın

### Yöntem 3: Demo Hesapla Keşfet 🚀
1. Ana sayfada "Başla" butonuna tıklayın
2. Bireysel veya Kurumsal seçin
3. "⚡ Demo Hesapla Keşfet" butonuna tıklayın
4. Anında giriş yapılır (Ahmet Yılmaz / IND001 olarak)!

---

## 🧪 TEST SENARYOLARı

### Menü Market Paylaşım Sistemi Testi

**Ahmet Rolü (Destek Alan):**
```
Kullanıcı: Ahmet Yılmaz (ahmet.yilmaz@email.com / ahmet123)
1. Giriş yap
2. Menü Market → Paylaşım Bul
3. Form doldur (tutar: 1000 TL, minimum: %20)
4. Destek talebini oluştur
5. ✨ TALEP ARTIK GERÇEK ZAMANLI GÖRÜNÜYOR!
6. Ayşe'nin eşleşmesini bekle (otomatik güncellenir)
7. Ödeme yap (sadece %20 desteğinde)
8. Ayşe'nin QR kodunu görüntüle
9. "Ödeme Yapıldı" onayla
```

**Ayşe Rolü (Destek Veren):**
```
Kullanıcı: Ayşe Demir (ayse.demir@email.com / ayse123)
1. Giriş yap
2. Menü Market → Paylaşım Bekleyen Kişiler
3. ✨ Ahmet'in talebini ANINDA görürsünüz! (2 sn polling)
4. Ahmet'in talebini seç
5. %20 veya %100 seç
6. Onay ver
7. Ödeme bekleme (sadece %20'de)
8. QR kod yükle
9. Ahmet'in onayını bekle
10. Altın Kalp ❤️ kazan!
```

**🔧 Yeni Özellikler:**
- ✅ Gerçek zamanlı polling (her 2 saniyede güncelleme)
- ✅ Kullanıcı bazlı talep oluşturma (artık hardcoded değil)
- ✅ Dinamik destek bekleyen sayısı
- ✅ Kullanıcılar kendi taleplerini bağışçı listesinde görmez
- ✅ Tüm giriş yöntemlerinde userId düzgün şekilde set ediliyor

**⚠️ ÖNEMLİ NOT:**
İki farklı kullanıcı ile test etmek için:
1. Normal pencerede Ahmet (ahmet.yilmaz@email.com) ile giriş yapın
2. Gizli sekmede (Incognito/Private) Ayşe (ayse.demir@email.com) ile giriş yapın
3. Ahmet'in oluşturduğu destek talebini Ayşe'nin ekranında göreceksiniz!

### Acil İş Sistemi Testi

**Çalışan Rolü:**
```
Kullanıcı: Mehmet Kaya (mehmet.kaya@email.com / mehmet123)
1. Giriş yap
2. Acil İşler → İlanları görüntüle
3. İlana başvur
4. Başvuru durumu takip et
5. Atandıysa işe git
```

**Şirket Rolü:**
```
Kullanıcı: Elite Temizlik (info@elitetemizlik.com / elite123)
1. Giriş yap
2. Acil İş Oluştur
3. Başvuruları görüntüle
4. Personel ata
5. İş tamamlanmasını takip et
```

---

## 🔒 GÜVENLİK NOTLARI

- ⚠️ Bu şifreler **sadece test amaçlıdır**
- ⚠️ Gerçek üretim ortamında asla basit şifreler kullanmayın
- ⚠️ Şifreler localStorage'da **düz metin** olarak saklanır (sadece demo için)
- ⚠️ Gerçek sistemde şifreler hash'lenerek saklanmalıdır

---

## 📊 VERİTABANI YAPISI

Test kullanıcıları şu dosyalarda tanımlanmıştır:

```
/lib/mockData.ts
├── demoIndividualUsers[] → Bireysel kullanıcılar
├── demoCorporateUsers[] → Kurumsal kullanıcılar
└── authenticateUser() → Giriş doğrulama fonksiyonu
```

Giriş ekranı:
```
/components/LoginScreen.tsx
└── handleEmailLogin() → E-posta/şifre doğrulama
```

---

## 💡 İPUÇLARI

1. **Çoklu Kullanıcı Testi:** Farklı tarayıcılarda veya gizli sekmede iki farklı kullanıcı ile giriş yaparak real-time etkileşimleri test edebilirsiniz.

2. **Hızlı Geçiş:** Logout → Login yaparak kullanıcılar arası hızlıca geçiş yapabilirsiniz.

3. **LocalStorage Temizleme:** Sorun yaşarsanız tarayıcı geliştirici araçlarından (F12) Application → Local Storage → Clear yapabilirsiniz.

4. **Şifre Hatırlatma:** Her demo hesabın şifresi kullanıcı adının ilk kelimesi + "123" şeklindedir:
   - Ahmet Yılmaz → ahmet123
   - Elite Temizlik → elite123

---

## 📱 MOBİL TEST

Mobil cihazda test etmek için:

1. Tarayıcınızın geliştirici araçlarını açın (F12)
2. Mobil görünüm moduna geçin (📱 ikonu)
3. iPhone 12 Pro veya Galaxy S20 seçin
4. Responsive davranışları test edin

Veya gerçek mobil cihazda:
1. Uygulamanın URL'sini kopyalayın
2. WhatsApp/E-posta ile kendinize gönderin
3. Mobil cihazınızdan açın

---

## 🎨 ÖZELLİKLER

✅ **E-posta Doğrulama:** Gerçek e-posta formatı kontrolü  
✅ **Şifre Kontrolü:** Minimum 6 karakter zorunluluğu  
✅ **Hata Mesajları:** Toast bildirimleri ile kullanıcı dostu geri bildirim  
✅ **Otomatik Login:** Başarılı girişte currentUser localStorage'a kaydedilir  
✅ **User ID Tracking:** Her kullanıcının benzersiz ID'si sisteme aktarılır  

---

## 🆘 SORUN GİDERME

**"E-posta veya şifre hatalı" hatası alıyorum:**
- E-posta adresini tam olarak kopyalayın (büyük/küçük harf duyarlı değil)
- Şifreyi doğru yazdığınızdan emin olun
- Doğru rol seçimini (Bireysel/Kurumsal) yaptığınızdan emin olun

**Giriş yapıldı ama ekran değişmiyor:**
- Sayfayı yenileyin (F5)
- localStorage'ı temizleyin
- Farklı tarayıcı deneyin

**Demo hesaplar görünmüyor:**
- Sayfa tamamen yüklenene kadar bekleyin
- Konsol hatalarını kontrol edin (F12)

---

Son Güncelleme: 21 Ekim 2025  
Versiyon: 1.0
