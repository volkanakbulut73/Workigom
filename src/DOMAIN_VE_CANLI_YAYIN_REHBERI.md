# 🌐 Workigom - Kendi Domain'inizle Canlı Yayın Rehberi

## ✅ EVET! Kendi Alan Adınızla Yayınlayabilirsiniz

Projenizi **www.workigom.com** gibi kendi domain adınızla canlı yayına alabilirsiniz.

---

## 🎯 İki Adımda Canlı Yayın

### 1️⃣ Domain (Alan Adı) Satın Alın
### 2️⃣ Projeyi Deploy Edip Domain'i Bağlayın

**Toplam Süre:** 15-20 dakika  
**Toplam Maliyet:** 50-200 TL/yıl (sadece domain için)

---

## 📍 ADIM 1: Domain (Alan Adı) Satın Alma

### Türkiye'deki Popüler Domain Sağlayıcıları

| Sağlayıcı | .com Fiyat | .com.tr Fiyat | Özellik |
|-----------|------------|---------------|---------|
| **Natro** | ~150 TL/yıl | ~50 TL/yıl | Türkçe destek, kolay panel |
| **Turhost** | ~180 TL/yıl | ~60 TL/yıl | Türk şirketi |
| **GoDaddy** | $15/yıl | - | Dünya lideri |
| **Namecheap** | $10/yıl | - | Ucuz, kolay |
| **Cloudflare** | $10/yıl | - | En ucuz, hızlı |

### Önerilen Domain Uzantıları

```
✅ www.workigom.com      (En profesyonel)
✅ www.workigom.app      (Modern startup)
✅ www.workigom.io       (Tech startup)
✅ www.workigom.com.tr   (Türkiye'ye özel, ucuz)
✅ www.workigom.net      (Alternatif)
```

### Domain Satın Alma (Natro Örneği)

1. **https://www.natro.com** adresine gidin
2. **Domain ara** kutusuna `workigom` yazın
3. Uygun uzantıyı seçin (.com, .app, .com.tr)
4. **Satın Al** butonuna tıklayın
5. Hesap oluşturun ve ödeme yapın

**✅ Domain'iniz hazır!**

---

## 📍 ADIM 2: Projeyi Deploy Edip Domain Bağlama

### YÖNTEM A: Netlify (EN KOLAY - ÖNERİLEN) ⭐

#### 2.1. Projeyi Netlify'a Yükleyin

```bash
# Terminal'de
npm run build

# Tarayıcıda https://app.netlify.com/drop açın
# dist klasörünü sürükleyip bırakın
```

**Veya GitHub ile:**

```bash
# GitHub'a push edin
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/KULLANICI_ADINIZ/workigom.git
git push -u origin main

# Netlify'da: New site > Import from Git > Repository seçin
```

#### 2.2. Custom Domain Ekleyin

1. **Netlify Dashboard** > Sitenizi seçin
2. **Site settings** > **Domain management**
3. **Add custom domain** butonuna tıklayın
4. Domain'inizi girin: `www.workigom.com`
5. **Verify** tıklayın

#### 2.3. DNS Ayarlarını Yapın

Netlify size DNS kayıtları verecek:

**Seçenek 1: Netlify DNS (KOLAY)**
```
Netlify'ın nameserver'larını kullanın:
dns1.p03.nsone.net
dns2.p03.nsone.net
dns3.p03.nsone.net
dns4.p03.nsone.net
```

Domain sağlayıcınızda (Natro/GoDaddy):
1. **DNS Yönetimi** > **Nameservers**
2. Yukarıdaki nameserver'ları girin
3. **Kaydet**

**Seçenek 2: Mevcut DNS'i Kullanın**
```
Type: A
Name: @ (veya workigom.com)
Value: 75.2.60.5 (Netlify IP)

Type: CNAME
Name: www
Value: YOUR-SITE-NAME.netlify.app
```

Domain sağlayıcınızda:
1. **DNS Yönetimi** > **DNS Kayıtları**
2. Yukarıdaki kayıtları ekleyin
3. **Kaydet**

#### 2.4. HTTPS Aktif Edin

Netlify otomatik HTTPS açar (Let's Encrypt):
1. **Site settings** > **Domain management** > **HTTPS**
2. **Verify DNS configuration**
3. **Provision certificate** (otomatik)

⏳ **15-60 dakika** bekleyin, DNS yayılması için.

**✅ SİTENİZ CANLI:**
```
https://www.workigom.com
```

---

### YÖNTEM B: Render.com (OTOMATIK DEPLOY)

#### 2.1. GitHub'a Push

```bash
git init
git add .
git commit -m "Deploy Workigom"
git remote add origin https://github.com/KULLANICI/workigom.git
git push -u origin main
```

#### 2.2. Render'da Deploy

1. **https://render.com** > **New +** > **Static Site**
2. **Connect Repository** > workigom seçin
3. **Build Command:** `npm run build`
4. **Publish Directory:** `dist`
5. **Create Static Site**

#### 2.3. Custom Domain Ekle

1. **Dashboard** > Siteniz > **Settings**
2. **Custom Domains** > **Add Custom Domain**
3. Domain girin: `www.workigom.com`

Render size DNS kayıtları verecek:
```
Type: CNAME
Name: www
Value: YOUR-APP.onrender.com
```

#### 2.4. DNS Ayarları (Domain Sağlayıcınızda)

Natro/GoDaddy/Namecheap panelinde:
1. **DNS Yönetimi**
2. CNAME kaydı ekleyin
3. **Kaydet**

⏳ **15-60 dakika** bekleyin.

**✅ CANLI:** `https://www.workigom.com`

---

### YÖNTEM C: Vercel (EN HIZLI)

#### 2.1. GitHub + Vercel

```bash
# GitHub'a push
git push origin main
```

1. **https://vercel.com** > **New Project**
2. **Import Git Repository**
3. **Deploy**

#### 2.2. Domain Bağla

1. **Project Settings** > **Domains**
2. **Add Domain:** `workigom.com`
3. DNS kayıtlarını kopyalayın

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Domain sağlayıcınızda kayıtları girin
5. **Verify**

**✅ CANLI:** `https://www.workigom.com`

---

### YÖNTEM D: Geleneksel Hosting (cPanel ile)

**Eğer Natro/Turhost'tan hosting paketi aldıysanız:**

#### 2.1. Domain Hosting'e Bağlı

Domain satın aldığınızda otomatik bağlı olur.

#### 2.2. Build ve Yükle

```bash
# Build
npm run build

# FTP bilgilerinizi alın (Natro panel > FTP Hesapları)
# FileZilla ile bağlanın
# dist/* dosyalarını public_html'e yükleyin
```

#### 2.3. .htaccess Yükle

`public_html/.htaccess` dosyası:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

#### 2.4. SSL Aktif Et

cPanel > **SSL/TLS Status** > **AutoSSL** (ücretsiz)

**✅ CANLI:** `https://www.workigom.com`

---

## 🔧 DNS Ayarları - Detaylı Rehber

### Natro'da DNS Ayarları

1. **https://www.natro.com** > Giriş yap
2. **Domain Yönetimi** > `workigom.com` seçin
3. **DNS Yönetimi** veya **Nameserver Ayarları**

**Netlify için:**
```
Nameserver'ları değiştir:
dns1.p03.nsone.net
dns2.p03.nsone.net
dns3.p03.nsone.net
dns4.p03.nsone.net
```

**Render/Vercel için:**
```
DNS Kayıtları ekle:

A Record:
Name: @
Value: (Render/Vercel'in verdiği IP)

CNAME Record:
Name: www
Value: YOUR-APP.onrender.com (veya vercel-dns.com)
```

4. **Kaydet**
5. ⏳ 15-60 dakika bekleyin

### GoDaddy'de DNS Ayarları

1. **https://dcc.godaddy.com**
2. **My Products** > **Domains** > `workigom.com` > **DNS**
3. **Nameservers** veya **DNS Records** değiştirin
4. **Save**

### Namecheap'te DNS Ayarları

1. **https://www.namecheap.com**
2. **Domain List** > `workigom.com` > **Manage**
3. **Advanced DNS** tab
4. Kayıtları ekleyin
5. **Save**

---

## 🧪 Domain Çalışıyor mu Kontrol

### 1. DNS Propagation Kontrol

**https://dnschecker.org** adresine gidin:
```
Domain: workigom.com
Type: A (veya CNAME)
Check
```

✅ Tüm dünyada yeşil işaret görmelisiniz.

### 2. SSL Kontrol

**https://www.ssllabs.com/ssltest/** adresine gidin:
```
Domain: www.workigom.com
Test
```

✅ A+ rating hedefleyin.

### 3. Manuel Test

Tarayıcıda:
```
https://www.workigom.com
https://workigom.com
```

Her ikisi de çalışmalı.

---

## 💰 Maliyet Özeti

### Sadece Domain (Hosting Yok)

**Netlify/Render/Vercel (Ücretsiz) + Domain:**

| Domain | Fiyat/Yıl | Toplam |
|--------|-----------|--------|
| .com | ~150 TL | **150 TL/yıl** |
| .com.tr | ~50 TL | **50 TL/yıl** |
| .app | ~120 TL | **120 TL/yıl** |

**✅ ÖNERİLEN:** Netlify (ücretsiz) + .com.tr domain = **50 TL/yıl**

### Domain + Hosting Paketi

**Natro/Turhost Hosting:**

| Paket | Fiyat/Yıl | Özellik |
|-------|-----------|---------|
| Başlangıç | ~300 TL | 5 GB, 1 domain |
| Profesyonel | ~600 TL | 10 GB, sınırsız domain |

**⚠️ Gerekli mi?** 
- Netlify/Render/Vercel **ücretsiz** ve **daha hızlı**
- Sadece domain almak yeterli

---

## 🚀 Hızlı Başlangıç (5 Dakika)

### En Hızlı ve Ucuz Yöntem

#### 1. Domain Al (5 dakika)
```
Natro.com > workigom.com.tr ara > 50 TL ödeme
```

#### 2. Deploy Et (3 dakika)
```bash
npm run build
# dist klasörünü https://app.netlify.com/drop'a sürükle
```

#### 3. Domain Bağla (2 dakika)
```
Netlify > Add custom domain > workigom.com.tr
Natro > DNS > Netlify nameserver'ları gir
```

#### 4. Bekle (30-60 dakika)
```
DNS yayılması için kahve molası ☕
```

**✅ CANLI:** `https://www.workigom.com.tr`

**TOPLAM MALİYET:** 50 TL/yıl  
**TOPLAM SÜRE:** 10 dakika (+ 30-60 dk DNS yayılması)

---

## ⚠️ Önemli Notlar

### Supabase Kurulumu

Domain'e deploy ettikten sonra **mutlaka yapın:**

1. **Supabase Dashboard** > SQL Editor
2. `/supabase/migrations/001_initial_schema.sql` çalıştır
3. Test kullanıcıları oluştur

**Detay:** `HIZLI_BASLANGIC.md`

### CORS Ayarları (Supabase)

Domain'inizi Supabase'e ekleyin:
1. **Supabase Dashboard** > **Authentication** > **URL Configuration**
2. **Site URL:** `https://www.workigom.com`
3. **Redirect URLs:** `https://www.workigom.com/*`
4. **Save**

### Email Ayarları

Şu an Supabase otomatik email confirmation kapalı.
Aktif etmek için:
1. **Supabase** > **Authentication** > **Email Templates**
2. SMTP ayarları yapın (Gmail/SendGrid)

---

## 🎯 Hangi Yöntemi Seçmeliyim?

### Yeni Başlıyorsanız
→ **Netlify + .com.tr domain** (En kolay, 50 TL/yıl)

### Profesyonel Site
→ **Vercel + .com domain** (En hızlı, 150 TL/yıl)

### Otomatik Deploy İstiyorsanız
→ **Render + GitHub + domain** (Git push = otomatik deploy)

### Mevcut Hosting Paketiniz Var
→ **cPanel + FTP** (Build'i yükleyin)

---

## 📊 Platform Karşılaştırması

| Platform | Custom Domain | HTTPS | Maliyet | Hız |
|----------|---------------|-------|---------|-----|
| **Netlify** | ✅ Ücretsiz | ✅ Otomatik | Domain fiyatı | ⚡⚡⚡ |
| **Render** | ✅ Ücretsiz | ✅ Otomatik | Domain fiyatı | ⚡⚡⚡ |
| **Vercel** | ✅ Ücretsiz | ✅ Otomatik | Domain fiyatı | ⚡⚡⚡⚡ |
| **cPanel Hosting** | ✅ Dahil | ✅ Let's Encrypt | ~300 TL/yıl | ⚡⚡ |

---

## 🐛 Sık Karşılaşılan Sorunlar

### "Domain çalışmıyor"
→ DNS propagation için 24-48 saat bekleyin  
→ https://dnschecker.org'da kontrol edin

### "SSL hatası"
→ HTTPS provision için 1-2 saat bekleyin  
→ Netlify/Vercel otomatik halleder

### "www ile çalışıyor, www olmadan çalışmıyor"
→ Redirect kuralı ekleyin (Netlify otomatik yapar)

### "Login çalışmıyor"
→ Supabase CORS ayarlarına domain'i ekleyin

---

## 📚 İlgili Dokümantasyonlar

- `WEB_HOSTING_REHBERI.md` - Deployment detayları
- `HIZLI_BASLANGIC.md` - Supabase kurulumu
- `SORUN_GIDERME.md` - Hata çözümleri

---

## ✅ Deployment Checklist

### Domain Satın Alma
- [ ] Domain sağlayıcı seçildi (Natro/GoDaddy/Namecheap)
- [ ] Domain adı seçildi (workigom.com/com.tr/app)
- [ ] Domain satın alındı
- [ ] Domain panel erişimi var

### Deployment
- [ ] Build başarılı (`npm run build`)
- [ ] Platform seçildi (Netlify/Render/Vercel)
- [ ] Proje deploy edildi
- [ ] Deploy URL'i çalışıyor

### Domain Bağlama
- [ ] Custom domain eklendi
- [ ] DNS kayıtları yapıldı
- [ ] DNS propagation tamamlandı (dnschecker.org)
- [ ] HTTPS aktif

### Supabase
- [ ] Database schema kuruldu
- [ ] Test kullanıcıları oluşturuldu
- [ ] CORS ayarları yapıldı
- [ ] Site URL güncellendi

### Test
- [ ] https://www.workigom.com açılıyor
- [ ] https://workigom.com redirect ediyor
- [ ] Login çalışıyor
- [ ] Mobil responsive
- [ ] SSL A+ rating

---

## 🎉 Tebrikler!

Workigom projeniz artık **kendi domain'inizle canlı yayında!**

**Örnek URL'ler:**
```
✅ https://www.workigom.com
✅ https://workigom.com
✅ https://www.workigom.app
✅ https://www.workigom.com.tr
```

**Sosyal medyada paylaşın:**
```
🚀 Workigom artık canlı yayında!
🔗 www.workigom.com
💼 İş arayanlarla şirketleri buluşturan platform
```

---

## 📞 Destek

**Domain sorunları:**
- Natro: 0850 532 0 532
- GoDaddy: Chat destek
- Namecheap: Ticket sistemi

**Hosting sorunları:**
- Netlify: https://answers.netlify.com
- Render: https://render.com/docs
- Vercel: https://vercel.com/support

**Teknik sorunlar:**
- Supabase: https://supabase.com/docs
- Bu dokümantasyonlar: `SORUN_GIDERME.md`

---

**Başarılar! 🎊**

**Son Güncelleme:** 2 Kasım 2025  
**Workigom Version:** 1.0.0
