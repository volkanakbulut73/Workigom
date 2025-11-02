# 🔐 Workigom Test Kullanıcıları ve Bilgileri

Bu doküman, Workigom platformunda test amaçlı oluşturulmuş kullanıcı hesaplarını içermektedir.

## 📋 Genel Bilgiler

Veritabanına test verileri eklemek için `prisma seed` komutu kullanılır. Bu komut:
- 10 test kullanıcısı oluşturur (1 Admin, 4 Kurumsal, 5 Bireysel)
- 5 iş ilanı oluşturur
- 5 iş başvurusu oluşturur
- 5 yemek bağışı oluşturur
- Mesajlar ve bildirimler oluşturur

---

## 👤 Test Kullanıcıları

### 🛡️ 1. Admin Kullanıcı

| Alan | Değer |
|------|-------|
| **Email** | `admin@workigom.com` |
| **Şifre** | `admin123` |
| **İsim** | Admin User |
| **Telefon** | +90 555 000 0000 |
| **Rol** | ADMIN |
| **Doğrulanmış** | ✅ Evet |

**Açıklama:** Platform yöneticisi. Tüm içerikleri yönetebilir, kullanıcıları görüntüleyebilir.

---

### 🏢 2. Kurumsal Kullanıcılar (İşveren / Bağışçı)

#### 2.1 Tech Solutions Ltd.

| Alan | Değer |
|------|-------|
| **Email** | `company1@workigom.com` |
| **Şifre** | `company123` |
| **İsim** | Tech Solutions Ltd. |
| **Telefon** | +90 555 111 1111 |
| **Rol** | CORPORATE |
| **Doğrulanmış** | ✅ Evet |

**Yayınladığı İlanlar:**
- Yazılım Geliştirici (Full-time, İstanbul)
- Grafik Tasarımcı (Contract, İstanbul - Hibrit)

**Yaptığı Bağışlar:**
- Paket Gıda Yardımı (Konserve, makarna, pirinç)

---

#### 2.2 Restoran Lezzet

| Alan | Değer |
|------|-------|
| **Email** | `company2@workigom.com` |
| **Şifre** | `company123` |
| **İsim** | Restoran Lezzet |
| **Telefon** | +90 555 222 2222 |
| **Rol** | CORPORATE |
| **Doğrulanmış** | ✅ Evet |

**Yayınladığı İlanlar:**
- Garson (Part-time, Ankara)

**Yaptığı Bağışlar:**
- Ev Yapımı Yemek (Mantı ve çorba)
- Sebze Meyve Paketi (RESERVED - Mehmet'e verildi)

---

#### 2.3 Yapı Market A.Ş.

| Alan | Değer |
|------|-------|
| **Email** | `company3@workigom.com` |
| **Şifre** | `company123` |
| **İsim** | Yapı Market A.Ş. |
| **Telefon** | +90 555 333 3333 |
| **Rol** | CORPORATE |
| **Doğrulanmış** | ✅ Evet |

**Yayınladığı İlanlar:**
- Depo Elemanı (Full-time, İzmir)

**Yaptığı Bağışlar:**
- Taze Ekmek ve Börekler

---

#### 2.4 E-Ticaret Global

| Alan | Değer |
|------|-------|
| **Email** | `company4@workigom.com` |
| **Şifre** | `company123` |
| **İsim** | E-Ticaret Global |
| **Telefon** | +90 555 444 4444 |
| **Rol** | CORPORATE |
| **Doğrulanmış** | ✅ Evet |

**Yayınladığı İlanlar:**
- Müşteri Temsilcisi (Full-time, Uzaktan)

**Yaptığı Bağışlar:**
- Süt Ürünleri Paketi

---

### 👥 3. Bireysel Kullanıcılar (İş Arayan / Bağış Alıcı)

#### 3.1 Mehmet Yılmaz

| Alan | Değer |
|------|-------|
| **Email** | `mehmet@example.com` |
| **Şifre** | `user123` |
| **İsim** | Mehmet Yılmaz |
| **Telefon** | +90 555 555 5555 |
| **Rol** | INDIVIDUAL |
| **Doğrulanmış** | ✅ Evet |

**Başvurduğu İşler:**
- Yazılım Geliştirici (PENDING)

**Aldığı Bağışlar:**
- Sebze Meyve Paketi (RESERVED)

---

#### 3.2 Ayşe Demir

| Alan | Değer |
|------|-------|
| **Email** | `ayse@example.com` |
| **Şifre** | `user123` |
| **İsim** | Ayşe Demir |
| **Telefon** | +90 555 666 6666 |
| **Rol** | INDIVIDUAL |
| **Doğrulanmış** | ✅ Evet |

**Başvurduğu İşler:**
- Garson (ASSIGNED - İşe atandı ✅)

---

#### 3.3 Ali Kaya

| Alan | Değer |
|------|-------|
| **Email** | `ali@example.com` |
| **Şifre** | `user123` |
| **İsim** | Ali Kaya |
| **Telefon** | +90 555 777 7777 |
| **Rol** | INDIVIDUAL |
| **Doğrulanmış** | ✅ Evet |

**Başvurduğu İşler:**
- Depo Elemanı (PENDING)

---

#### 3.4 Fatma Şahin

| Alan | Değer |
|------|-------|
| **Email** | `fatma@example.com` |
| **Şifre** | `user123` |
| **İsim** | Fatma Şahin |
| **Telefon** | +90 555 888 8888 |
| **Rol** | INDIVIDUAL |
| **Doğrulanmış** | ✅ Evet |

**Başvurduğu İşler:**
- Müşteri Temsilcisi (PENDING)

---

#### 3.5 Can Özdemir

| Alan | Değer |
|------|-------|
| **Email** | `can@example.com` |
| **Şifre** | `user123` |
| **İsim** | Can Özdemir |
| **Telefon** | +90 555 999 9999 |
| **Rol** | INDIVIDUAL |
| **Doğrulanmış** | ✅ Evet |

**Başvurduğu İşler:**
- Grafik Tasarımcı (ASSIGNED - İşe atandı ✅)

---

## 🔑 Şifre Özeti

| Kullanıcı Tipi | Şifre |
|----------------|-------|
| Admin | `admin123` |
| Kurumsal (Tüm şirketler) | `company123` |
| Bireysel (Tüm kullanıcılar) | `user123` |

---

## 📊 Oluşturulan Veriler Özeti

- **1** Admin kullanıcı
- **4** Kurumsal kullanıcı (İşveren/Bağışçı)
- **5** Bireysel kullanıcı (İş Arayan/Bağış Alıcı)
- **5** İş ilanı
- **5** İş başvurusu
- **5** Yemek bağışı
- **4** Mesaj
- **6** Bildirim

---

## 🎯 Test Senaryoları

### Senaryo 1: İş Arayan Olarak Giriş
1. `mehmet@example.com` / `user123` ile giriş yapın
2. İş ilanlarını görüntüleyin
3. Başvuru durumunuzu kontrol edin
4. Mesajlarınızı ve bildirimleri görüntüleyin

### Senaryo 2: İşveren Olarak Giriş
1. `company1@workigom.com` / `company123` ile giriş yapın
2. Yayınladığınız iş ilanlarını görüntüleyin
3. Başvuruları inceleyin
4. Yeni ilan ekleyin

### Senaryo 3: Bağış Alıcı Olarak Giriş
1. `mehmet@example.com` / `user123` ile giriş yapın
2. Mevcut bağışları görüntüleyin
3. Bağış talebinde bulunun

### Senaryo 4: Bağışçı Olarak Giriş
1. `company2@workigom.com` / `company123` ile giriş yapın
2. Yayınladığınız bağışları görüntüleyin
3. Yeni bağış ekleyin

### Senaryo 5: Admin Olarak Giriş
1. `admin@workigom.com` / `admin123` ile giriş yapın
2. Tüm kullanıcıları görüntüleyin
3. İlanları onayla/reddet
4. Sistem ayarlarını yönetin

---

## 📝 Notlar

- Tüm kullanıcılar doğrulanmış (verified) olarak oluşturulmuştur
- Şifreler bcrypt ile hash'lenmiştir
- Test verilerini silmek için veritabanını sıfırlayın: `npx prisma migrate reset`
- Yeni test verileri eklemek için: `npm run prisma:seed`

---

## ⚠️ Güvenlik Uyarısı

**ÖNEMLİ:** Bu kullanıcı bilgileri sadece test ve geliştirme ortamı içindir. 
Production ortamında asla bu şifreleri kullanmayın!

---

*Son Güncelleme: 25 Ekim 2025*
