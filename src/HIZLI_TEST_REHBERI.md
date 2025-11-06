# ⚡ HIZLI TEST REHBERİ
**5 Dakikada Web Sitenizi Test Edin!**

---

## 🎯 HIZLI KONTROL (30 SANİYE)

### 1. Web sitesini açın:
```
https://workigom-frontend1.onrender.com/
```

### 2. Görmeli gerekenler:
- ✅ **Workigom logosu** üstte
- ✅ **"İş Bul, Yardım Et, Birlikte Büyü"** başlığı
- ✅ **3 kart sağda** (biri sallanıyor olmalı)
- ✅ **Footer** en altta

### 3. Console'u kontrol edin:
- `F12` basın
- **Console** sekmesine gidin
- ✅ **Yeşil tick:** "✅ Supabase bağlantısı başarılı"
- ❌ **Kırmızı hata varsa:** Aşağıdaki "Sorun Giderme"ye gidin

---

## 🔐 GİRİŞ TESTİ (1 DAKİKA)

### 1. "Giriş Yap" butonuna tıklayın

### 2. "Bireysel Hesap" seçin

### 3. Test kullanıcı ile giriş yapın:
```
Email: individual@test.com
Şifre: test123456
```

### 4. "Giriş Yap" butonuna tıklayın

### 5. Beklenen sonuç:
- ✅ "Giriş başarılı!" toast mesajı
- ✅ Anasayfa açıldı (İşler listesi vs.)
- ✅ Alt kısımda menü bar var (Anasayfa, İşler, Yemek, Profil)

---

## 🐛 SORUN GİDERME

### ❌ "Sayfa yüklenmiyor / boş sayfa"
**Çözüm:**
```bash
# 1. _redirects dosyasını kontrol edin
# Doğru: /public/_redirects (DOSYA)
# Yanlış: /public/_redirects/ (KLASÖR)

# 2. Render'da yeniden deploy
git add .
git commit -m "Fix _redirects"
git push origin main
```

---

### ❌ "Console'da kırmızı hata var"
**Yaygın Hatalar:**

#### Hata 1: `ERR_NAME_NOT_RESOLVED`
**Anlam:** Supabase URL'ye erişilemiyor
**Çözüm:**
1. Supabase projeniz çalışıyor mu? → https://supabase.com/dashboard
2. `utils/supabase/info.tsx` dosyasındaki `projectId` doğru mu?

#### Hata 2: `Invalid API key`
**Anlam:** Supabase API key yanlış
**Çözüm:**
1. Supabase Dashboard → Settings → API
2. `anon` key'i kopyalayın
3. `utils/supabase/info.tsx` dosyasındaki `publicAnonKey`'i güncelleyin

#### Hata 3: `User not found`
**Anlam:** Test kullanıcıları oluşturulmamış
**Çözüm:**
1. Supabase Dashboard → Authentication → Users
2. "Add user" → Email authentication
3. 3 test kullanıcı ekleyin (TEST_KULLANICI_BILGILERI.md'ye bakın)

---

### ❌ "Giriş yapamıyorum"
**Kontrol listesi:**

1. **Email doğru mu?** `individual@test.com` (küçük harf!)
2. **Şifre doğru mu?** `test123456` (rakam!)
3. **Console'da hata var mı?** F12 → Console
4. **Network'te 200 OK alıyor mu?** F12 → Network → "auth/token"

**Eğer yine olmuyorsa:**
```bash
# AuthContext'i kontrol edin
# contexts/AuthContext.tsx dosyasında:
console.log('Login attempt:', email, password); # Ekleyin
```

---

### ❌ "Kartlar sallanmıyor"
**Çözüm:**
1. Tarayıcıyı yenileyin (Ctrl+F5 - Hard Reload)
2. "Reduce Motion" kapalı mı? → Tarayıcı ayarları
3. CSS animasyonları yüklendi mi? → `LandingPage.tsx` kontrol

---

## 📱 MOBİL TEST (30 SANİYE)

### 1. Tarayıcıda `F12` → `Ctrl+Shift+M` (Toggle Device Toolbar)

### 2. Cihaz seçin: `iPhone 12 Pro` veya `Pixel 5`

### 3. Kontrol edin:
- ✅ Kartlar üst üste mi?
- ✅ Metin okunabiliyor mu?
- ✅ Butonlar tıklanabiliyor mu?
- ✅ Alt menü görünüyor mu?

---

## 🚀 RENDER.COM KONTROL (1 DAKİKA)

### 1. Render Dashboard'a gidin:
```
https://dashboard.render.com/
```

### 2. "workigom-frontend1" servisine tıklayın

### 3. Kontrol edin:
- ✅ **Status:** "Live" (Yeşil)
- ✅ **Latest Deploy:** "Succeeded"
- ✅ **Build Log:** Hata yok

### 4. Eğer "Failed" ise:
- Logs'u okuyun
- Son satırdaki hatayı not alın
- "Manual Deploy" → "Clear build cache & deploy"

---

## 📊 PERFORMANS TESTİ (2 DAKİKA)

### 1. Google PageSpeed'e gidin:
```
https://pagespeed.web.dev/
```

### 2. URL girin:
```
https://workigom-frontend1.onrender.com/
```

### 3. "Analyze" butonuna tıklayın

### 4. Beklenen skorlar:
- **Performance:** 70+ ✅
- **Accessibility:** 90+ ✅
- **Best Practices:** 80+ ✅
- **SEO:** 90+ ✅

### 5. Eğer skorlar düşükse:
- Görseller optimize edilmeli → WebP formatı
- Lazy loading eklenmeli → `loading="lazy"`
- Cache ayarları yapılmalı → `Cache-Control` headers

---

## ✅ BAŞARILI TEST SONUCU

Eğer aşağıdaki kontroller TAMAM ise, tebrikler! 🎉

```
✅ Anasayfa yüklendi
✅ Floating kartlar sallanıyor
✅ Giriş Yap butonu çalışıyor
✅ Test kullanıcıyla giriş başarılı
✅ Console'da "Supabase bağlantısı başarılı" var
✅ Console'da kırmızı hata YOK
✅ Mobile responsive çalışıyor
✅ Render.com "Live" durumda
✅ PageSpeed skoru 70+
```

**Bir sonraki adım:**
1. Domain bağlama → `workigom.com`
2. SSL sertifikası → HTTPS
3. Production Supabase ayarları
4. Google Analytics entegrasyonu

---

## 🆘 YARDIM GEREKİYORSA

### Test sonuçlarını paylaşın:

```markdown
## TEST RAPORU

**Tarih:** [Bugünün tarihi]
**URL:** https://workigom-frontend1.onrender.com/

### Console Durumu:
- [ ] ✅ Supabase bağlantısı başarılı
- [ ] ❌ Hata var: [Hata mesajı buraya]

### Giriş Testi:
- [ ] ✅ Giriş başarılı
- [ ] ❌ Giriş başarısız: [Hata mesajı buraya]

### Render.com Durumu:
- [ ] ✅ Live
- [ ] ❌ Failed: [Hata mesajı buraya]

### Ekran Görüntüleri:
[Screenshot'ları buraya yapıştırın]

### Console Hatası:
```
[F12 → Console'daki hataları buraya kopyalayın]
```

### Network Hatası:
```
[F12 → Network'teki başarısız istekleri buraya]
```
```

Bu raporu benimle paylaşın, beraber çözelim! 💪

---

## 🎯 SON KONTROL

Web siteniz şu anda **%100 HAZIR** mı?

**EVET:** 🎉 Tebrikler! Production'a geçebilirsiniz!
**HAYIR:** 🔧 Yukarıdaki sorun giderme adımlarını takip edin.

---

**NOT:** Bu test rehberi 5 dakikada tamamlanabilir. Daha detaylı test için `WEB_SITESI_TEST_KONTROL.md` dosyasına bakın.
