# 🔍 WEB SİTESİ TEST KONTROL LİSTESİ
**URL:** https://workigom-frontend1.onrender.com/

## ✅ TEMEL KONTROL ADIMLARI

### 1️⃣ **ANASAYFA (Landing Page)**
Web sitesine ilk girdiğinizde görmeniz gerekenler:

- [ ] **Header:** Workigom logosu + "Giriş Yap" butonu görünüyor mu?
- [ ] **Badge:** "Sosyal Sorumluluk Platformu" yeşil badge var mı?
- [ ] **Başlık:** "İş Bul, Yardım Et, Birlikte Büyü 💙" tam görünüyor mu?
- [ ] **3 Floating Card:**
  - [ ] Üstte: "Günlük İşler" - Yavaşça sallanıyor mu? ↕️
  - [ ] Ortada: "Sosyal Etki" - ₺12,450 görünüyor mu?
  - [ ] Altta: "Öğün Desteği" - Yavaşça sallanıyor mu? ↕️
- [ ] **Footer:** En altta footer var mı? (Admin Girişi linki ile)

---

### 2️⃣ **RESPONSİVE TEST (Mobil Kontrol)**
Tarayıcıda F12 basın → "Toggle Device Toolbar" (Ctrl+Shift+M)

- [ ] **Mobil görünüm (375px):** Kartlar üst üste mi görünüyor?
- [ ] **Tablet görünüm (768px):** Layout düzgün mü?
- [ ] **Desktop görünüm (1920px):** Floating kartlar yanyana mı?

---

### 3️⃣ **"GİRİŞ YAP" BUTONU**
Header'daki "Giriş Yap" butonuna tıklayın:

- [ ] **Login Screen açıldı mı?**
- [ ] **İki seçenek var mı?**
  - [ ] "Bireysel Hesap" (Mavi kart)
  - [ ] "Kurumsal Hesap" (Turuncu kart)
- [ ] **"Geri Dön" butonu çalışıyor mu?** (Landing'e dönüyor mu?)

---

### 4️⃣ **SUPABASE AUTH TEST**

#### **Test Kullanıcı Bilgileri:**
```
BİREYSEL KULLANICI:
Email: individual@test.com
Şifre: test123456

KURUMSAL KULLANICI:
Email: corporate@test.com
Şifre: test123456

ADMIN KULLANICI:
Email: admin@test.com
Şifre: admin123456
```

#### **Giriş Testi:**
1. "Bireysel Hesap" seçin
2. Email: `individual@test.com` / Şifre: `test123456`
3. "Giriş Yap" butonuna tıklayın

**Beklenen Sonuç:**
- [ ] "Giriş başarılı!" toast mesajı
- [ ] Bireysel kullanıcı anasayfası açıldı mı?
- [ ] Alt kısımda Bottom Navigation bar var mı? (Anasayfa, İşler, Yemek, Profil)
- [ ] Desktop'ta sol tarafta Sidebar var mı?

---

### 5️⃣ **CONSOLE KONTROL (Hata Arama)**
Tarayıcıda F12 → **Console** sekmesi:

- [ ] **Kırmızı hata var mı?** ❌
  - Varsa, hatayı not alın
- [ ] **Sarı uyarı çok fazla mı?** ⚠️
  - Normal: 0-5 uyarı
  - Problem: 10+ uyarı

#### **Yaygın Hatalar:**
```javascript
// KÖTÜ ÖRNEKLER:
❌ "Failed to load resource: net::ERR_NAME_NOT_RESOLVED"
   → Supabase bağlantı hatası
   
❌ "Uncaught TypeError: Cannot read property 'X' of undefined"
   → JavaScript kodu hatası
   
❌ "404 Not Found: /api/..."
   → API endpoint bulunamadı

// İYİ ÖRNEKLER:
✅ Hiç kırmızı hata yok
✅ Sadece birkaç sarı uyarı (React DevTools vs.)
```

---

### 6️⃣ **NETWORK TAB KONTROL (API İstekleri)**
F12 → **Network** sekmesi → Sayfayı yenileyin (F5)

- [ ] **200 OK yanıtları mı alıyor?** ✅
- [ ] **404 veya 500 hatası var mı?** ❌
- [ ] **Supabase istekleri çalışıyor mu?**
  - `https://[PROJECT_ID].supabase.co/auth/v1/...` → 200 OK olmalı

---

### 7️⃣ **RENDER.COM DEPLOY DURUMU**
Render Dashboard'a gidin:
https://dashboard.render.com/

- [ ] **Deploy Status:** "Live" (Yeşil) mi?
- [ ] **Son deploy başarılı mı?**
- [ ] **Build logs temiz mi?** (Hata yok)

---

## 🐛 SORUN GİDERME REHBERİ

### ❌ Problem: "Sayfa boş, hiçbir şey görünmüyor"
**Çözüm:**
1. F12 → Console → Kırmızı hataları kontrol edin
2. `_redirects` dosyası doğru mu? → `/public/_redirects` (DOSYA olmalı, klasör değil)
3. `vite.config.ts` → `base: '/'` olmalı

---

### ❌ Problem: "Floating kartlar sallanmıyor"
**Çözüm:**
1. CSS animasyonları yüklendi mi? → `LandingPage.tsx` içindeki `<style>` tagını kontrol edin
2. Tarayıcı animasyonları kapatmış olabilir → "Reduce motion" ayarını kontrol edin

---

### ❌ Problem: "Giriş yapamıyorum, hata veriyor"
**Çözüm:**
1. **Supabase env variables kontrol:**
   - Render Dashboard → Environment → `VITE_SUPABASE_URL` var mı?
   - `VITE_SUPABASE_ANON_KEY` var mı?
   
2. **Test kullanıcıları oluşturuldu mu?**
   - Supabase Dashboard → Authentication → Users
   - 3 test kullanıcı (`individual@test.com`, `corporate@test.com`, `admin@test.com`) var mı?

3. **Auth callback URL doğru mu?**
   - Supabase Dashboard → Authentication → URL Configuration
   - Site URL: `https://workigom-frontend1.onrender.com`
   - Redirect URLs: `https://workigom-frontend1.onrender.com/**`

---

### ❌ Problem: "Footer'da Admin Girişi çalışmıyor"
**Çözüm:**
1. Footer'daki "Admin Girişi" → Login Screen açmalı
2. `admin@test.com` / `admin123456` ile giriş yapın
3. Admin Panel açılmalı

---

## 🎯 BEKLENTİLER (Normal Durum)

### ✅ **BAŞARILI DEPLOY ÖZELLİKLERİ:**
1. **Anasayfa tam yükleniyor** (3-5 saniye)
2. **Floating kartlar animasyonlu** (üst/alt sallanıyor)
3. **Giriş Yap butonu çalışıyor** → Login Screen açılıyor
4. **Test kullanıcılarla giriş başarılı** → Anasayfa açılıyor
5. **Console'da ciddi hata YOK** (0 kırmızı hata)
6. **Mobile responsive** (375px'de düzgün görünüyor)

---

## 📊 PERFORMANS KONTROL

### **Google PageSpeed Insights:**
https://pagespeed.web.dev/

1. URL'yi girin: `https://workigom-frontend1.onrender.com/`
2. "Analyze" butonuna tıklayın
3. **Beklenen skorlar:**
   - Performance: 70+ (İyi)
   - Accessibility: 90+ (Mükemmel)
   - Best Practices: 80+ (İyi)
   - SEO: 90+ (Mükemmel)

---

## 🔄 SONRAKI ADIMLAR

### **Eğer her şey ÇALIŞIYORSA:** ✅
1. ✅ GitHub'a push edin (son değişiklikleri kaydedin)
2. ✅ Domain bağlama hazırlığı yapın (workigom.com vs.)
3. ✅ Supabase Production ayarlarını tamamlayın

### **Eğer SORUN varsa:** ❌
1. ❌ Console hatalarını not alın (screenshot alın)
2. ❌ Network tab'daki başarısız istekleri kaydedin
3. ❌ Render build logs'u paylaşın
4. ❌ Hatayı buraya yazın, beraber çözelim! 🤝

---

## 📝 TEST RAPORU ŞABLONU

Aşağıdaki kontrol listesini doldurun:

```
✅ / ❌  Anasayfa yüklendi
✅ / ❌  Floating kartlar sallanıyor
✅ / ❌  Giriş Yap butonu çalışıyor
✅ / ❌  Login Screen açılıyor
✅ / ❌  Test kullanıcıyla giriş başarılı
✅ / ❌  Console'da hata yok
✅ / ❌  Mobile responsive
✅ / ❌  Footer görünüyor
✅ / ❌  Admin Girişi çalışıyor
✅ / ❌  Network istekleri 200 OK

GENEL DURUM: ✅ BAŞARILI / ❌ SORUNLU

Notlar:
- [Burada gözlemlediğiniz sorunları yazın]
```

---

**NOT:** Ben bir AI asistanıyım ve canlı web sitelerine erişemiyorum. Bu kontrol listesini siz manuel olarak takip edin ve sonuçları benimle paylaşın! 💙
