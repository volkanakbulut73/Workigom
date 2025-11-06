# ⚡ Workigom - 10 Dakikada Canlı Yayın

## 🎯 Hedef: www.workigom.com Canlı Yayında!

**Süre:** 10 dakika + 30-60 dakika DNS bekleme  
**Maliyet:** 50-150 TL/yıl (sadece domain)

---

## 📋 3 Adımda Canlı Yayın

```
1️⃣ Domain Al (5 dakika)
     ↓
2️⃣ Deploy Et (3 dakika)
     ↓
3️⃣ Domain Bağla (2 dakika)
     ↓
⏳ DNS Bekle (30-60 dakika)
     ↓
✅ CANLI: https://www.workigom.com
```

---

## 1️⃣ DOMAIN AL (5 Dakika)

### Seçenek A: Natro (Türkçe, Kolay) ⭐

1. **https://www.natro.com** aç
2. Domain ara kutusuna: `workigom` yaz
3. Seç:
   - ✅ `workigom.com.tr` → **50 TL/yıl** (EN UCUZ)
   - ✅ `workigom.com` → **150 TL/yıl** (PROFESYONEL)
   - ✅ `workigom.app` → **120 TL/yıl** (MODERN)
4. **Sepete Ekle** → Hesap oluştur → Ödeme yap
5. **✅ Domain'iniz hazır!**

### Seçenek B: Namecheap (Ucuz, İngilizce)

1. **https://www.namecheap.com** aç
2. Domain ara: `workigom`
3. `.com` seç → **~$10/yıl** (100 TL)
4. **Add to Cart** → Checkout → Ödeme
5. **✅ Domain hazır!**

---

## 2️⃣ DEPLOY ET (3 Dakika)

### Terminal'de:

```bash
# 1. Build al (2 dakika)
npm install
npm run build

# 2. dist klasörü oluştu mu kontrol et
ls dist/
# Çıktı: index.html, assets/, vite.svg, vs.
```

### Tarayıcıda:

1. **https://app.netlify.com/drop** aç
2. **Netlify'a ücretsiz kayıt ol** (GitHub/Email ile)
3. **dist klasörünü** tarayıcı penceresine **sürükle-bırak**
4. ⏳ 30 saniye bekle

**✅ Site canlı:**
```
https://random-name-12345.netlify.app
```

Tıklayıp test edin! ✅

---

## 3️⃣ DOMAIN BAĞLA (2 Dakika)

### Netlify'da:

1. **Site settings** butonuna tıkla (방금 deploy ettiğiniz sitede)
2. **Domain management** > **Add custom domain**
3. Domain'inizi girin: `workigom.com` (veya `.com.tr`, `.app`)
4. **Verify** tıkla
5. **Netlify DNS kullan** seçeneğini seç (EN KOLAY)

Netlify size **4 nameserver** verecek:
```
dns1.p03.nsone.net
dns2.p03.nsone.net
dns3.p03.nsone.net
dns4.p03.nsone.net
```

### Domain Sağlayıcınızda (Natro örneği):

1. **https://www.natro.com** > Giriş yap
2. **Domain Yönetimi** > `workigom.com` seçin
3. **Nameserver Ayarları** (veya DNS Yönetimi)
4. **Kendi nameserver kullan** seç
5. Netlify'ın 4 nameserver'ını yapıştır:
   ```
   dns1.p03.nsone.net
   dns2.p03.nsone.net
   dns3.p03.nsone.net
   dns4.p03.nsone.net
   ```
6. **Kaydet** ✅

---

## ⏳ DNS YAYİLMASI (30-60 Dakika)

### Ne Yapmalı?

**Kahve molası verin ☕** - DNS dünya geneline yayılıyor.

### Kontrol Et:

**https://dnschecker.org** aç:
```
Domain: workigom.com
Type: A
Check
```

🟢 **Yeşil işaretler** = DNS yayıldı!

---

## ✅ CANLI YAYIN TEST

### 1. Domain'i Aç

Tarayıcıda:
```
https://www.workigom.com
```

**✅ Workigom açıldı mı?** → Başarılı!

### 2. HTTPS Kontrol

URL'de **🔒 kilit simgesi** var mı?
```
✅ https://www.workigom.com (GÜVENLİ)
❌ http://www.workigom.com (GÜVENSİZ)
```

Netlify otomatik HTTPS açar!

### 3. Mobil Test

Telefonda aç:
```
https://www.workigom.com
```

**Responsive mi?** → ✅

---

## 🔧 SUPABASE KURULUMU (ZORUNLU)

Domain'e deploy ettikten sonra **mutlaka yapın:**

### 1. Database Schema Kur

1. **https://supabase.com/dashboard** aç
2. Projenizi seçin
3. **SQL Editor** > **New query**
4. Dosyayı açın: `supabase/migrations/001_initial_schema.sql`
5. Kopyalayıp SQL Editor'e yapıştır
6. **Run** ▶️
7. ✅ "Success" mesajı

### 2. Test Kullanıcıları Oluştur

`HIZLI_BASLANGIC.md` dosyasındaki SQL kodunu çalıştırın.

### 3. Supabase'e Domain Ekle

1. **Supabase Dashboard** > **Authentication** > **URL Configuration**
2. **Site URL:** `https://www.workigom.com`
3. **Redirect URLs:** `https://www.workigom.com/*`
4. **Save**

### 4. Login Test

```
Email: individual@workigom.com
Şifre: individual123
```

**✅ Giriş başarılı?** → HER ŞEY HAZIR!

---

## 📊 Özet

### Yaptıklarınız:

✅ Domain satın aldınız (workigom.com)  
✅ Projeyi Netlify'a deploy ettiniz  
✅ Custom domain bağladınız  
✅ HTTPS otomatik aktif  
✅ Supabase kurulumunu yaptınız  

### Sonuç:

🎉 **Workigom canlı yayında:**
```
https://www.workigom.com
```

---

## 💰 Toplam Maliyet

| Öğe | Fiyat | Süre |
|-----|-------|------|
| Domain (.com.tr) | 50 TL | 1 yıl |
| Netlify Hosting | **ÜCRETSİZ** | Sınırsız |
| HTTPS SSL | **ÜCRETSİZ** | Otomatik |
| Supabase Database | **ÜCRETSİZ** | 500 MB |
| **TOPLAM** | **50 TL/yıl** | - |

**Alternatif:**
- Domain (.com): 150 TL/yıl
- Domain (.app): 120 TL/yıl

---

## 🚀 Sonraki Adımlar

### 1. Google Analytics Ekle (Opsiyonel)

`index.html` dosyasına:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

### 2. SEO Optimize Et

`index.html` meta taglerini güncelle:
```html
<title>Workigom - İş Pazarı Platformu</title>
<meta name="description" content="İş arayanlarla şirketleri buluşturan platform">
```

### 3. Logo ve Favicon

`public/` klasörüne:
- `favicon.ico`
- `logo192.png`
- `logo512.png`

### 4. Sosyal Medya Paylaş

```
🚀 Workigom artık canlı!
🔗 www.workigom.com
💼 İş fırsatları ve personel bulma platformu
#Workigom #İşBul #İşveren
```

---

## 🐛 Sorun mu Var?

### "Domain çalışmıyor"
→ DNS için 24 saat bekleyin  
→ Nameserver'ları doğru girdiniz mi?

### "HTTPS hatası"
→ 1-2 saat bekleyin, Netlify otomatik halleder

### "Boş sayfa açılıyor"
→ Browser console'u açın (F12)  
→ Hataları `SORUN_GIDERME.md`'de arayın

### "Login çalışmıyor"
→ Supabase schema kurulumunu yaptınız mı?  
→ CORS ayarlarında domain var mı?

---

## 📚 Detaylı Rehberler

- `DOMAIN_VE_CANLI_YAYIN_REHBERI.md` - Tüm detaylar
- `WEB_HOSTING_REHBERI.md` - Alternatif platformlar
- `HIZLI_BASLANGIC.md` - Supabase kurulumu
- `SORUN_GIDERME.md` - Hata çözümleri

---

## 🎊 TEBRİKLER!

Workigom projeniz **kendi domain'inizle canlı yayında!**

```
✅ https://www.workigom.com
```

**Paylaşın, tanıtın, geliştirin! 🚀**

---

**İyi çalışmalar!**

**Son Güncelleme:** 2 Kasım 2025  
**Süre:** ~10 dakika aktif iş + 30-60 dk DNS  
**Maliyet:** 50-150 TL/yıl
