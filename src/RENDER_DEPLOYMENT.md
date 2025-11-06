# Workigom - Render.com Deployment Rehberi 🚀

Bu rehber, Workigom uygulamasını Render.com üzerinde nasıl yayınlayacağınızı adım adım açıklamaktadır.

## 📋 Ön Gereksinimler

1. ✅ Render.com hesabı (ücretsiz hesap yeterli)
2. ✅ GitHub/GitLab/Bitbucket hesabı
3. ✅ Projenizin git repository'sinde olması

---

## 🔧 1. Adım: Projeyi Git Repository'ye Push Etme

Eğer henüz yapmadıysanız, projenizi GitHub'a push edin:

```bash
# Git repository'si oluşturun (henüz oluşturmadıysanız)
git init

# Tüm dosyaları ekleyin
git add .

# Commit yapın
git commit -m "Initial commit for Render deployment"

# GitHub'daki repository'nize push edin
git remote add origin https://github.com/KULLANICI_ADINIZ/workigom.git
git branch -M main
git push -u origin main
```

**Not:** `GITHUB_PUSH_REHBERI.md` dosyasında detaylı GitHub talimatları bulabilirsiniz.

---

## 🌐 2. Adım: Render.com'da Yeni Static Site Oluşturma

### 2.1. Render Dashboard'a Giriş

1. [Render.com](https://render.com) adresine gidin
2. Hesabınıza giriş yapın veya yeni hesap oluşturun
3. Dashboard'da **"New +"** butonuna tıklayın
4. **"Static Site"** seçeneğini seçin

### 2.2. Repository Bağlama

1. GitHub/GitLab hesabınızı bağlayın (ilk kez kullanıyorsanız)
2. Workigom repository'nizi listeden seçin
3. **"Connect"** butonuna tıklayın

### 2.3. Site Ayarları

Aşağıdaki bilgileri girin:

| Alan | Değer |
|------|-------|
| **Name** | `workigom` veya istediğiniz bir isim |
| **Branch** | `main` (veya kullandığınız branch) |
| **Root Directory** | Boş bırakın |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |
| **Auto-Deploy** | ✅ Evet (önerilen) |

### 2.4. Environment Variables (Opsiyonel)

Eğer çevre değişkenleri kullanıyorsanız:

1. **"Advanced"** butonuna tıklayın
2. **"Add Environment Variable"** ile değişkenlerinizi ekleyin

Örnek:
```
NODE_VERSION=18
```

---

## 🎯 3. Adım: Deploy Etme

1. **"Create Static Site"** butonuna tıklayın
2. Render otomatik olarak build işlemini başlatacak
3. Build logs'u izleyerek ilerlemeyi takip edebilirsiniz

**Build süresi:** ~2-5 dakika

---

## ✅ 4. Adım: Deployment Doğrulama

Build tamamlandığında:

1. Render size bir URL verecek: `https://workigom.onrender.com`
2. Bu URL'e tıklayarak uygulamanızı görüntüleyin
3. Tüm sayfaların ve özelliklerin çalıştığından emin olun

---

## 🔄 5. Otomatik Deploy (CI/CD)

Render otomatik olarak yapılandırılmıştır:

- ✅ Her `git push` sonrası otomatik build
- ✅ Pull Request preview'ları (opsiyonel)
- ✅ Branch koruma ile production deploy'ları

### Otomatik Deploy'u Test Etme

```bash
# Bir değişiklik yapın
git add .
git commit -m "Test deployment"
git push

# Render otomatik olarak yeni build başlatacak
```

---

## 🎨 6. Custom Domain Bağlama (Opsiyonel)

Kendi domain'inizi kullanmak için:

1. Render Dashboard'da sitenize gidin
2. **"Settings"** sekmesine tıklayın
3. **"Custom Domains"** bölümünde **"Add Custom Domain"** seçin
4. Domain'inizi girin (örn: `workigom.com`)
5. DNS ayarlarını domain sağlayıcınızda yapılandırın:

```
Type: CNAME
Name: www (veya @)
Value: workigom.onrender.com
```

**SSL Sertifikası:** Render otomatik olarak Let's Encrypt SSL sertifikası sağlar (ücretsiz).

---

## 🔍 7. Render Yapılandırma Dosyası (render.yaml)

Proje root'unda `render.yaml` dosyası bulunmaktadır. Bu dosya:

- ✅ Otomatik yapılandırma sağlar
- ✅ Güvenlik başlıklarını ayarlar
- ✅ SPA routing'i düzeltir (tüm route'lar index.html'e yönlendirilir)

```yaml
services:
  - type: web
    name: workigom
    runtime: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

---

## 🐛 8. Sorun Giderme

### Build Hatası

**Hata:** `npm ERR! missing script: build`

**Çözüm:** `package.json` dosyasını kontrol edin:
```json
{
  "scripts": {
    "build": "tsc && vite build"
  }
}
```

### 404 Hatası (Routing Sorunu)

**Sorun:** `/profile` gibi route'lara direkt gittiğinizde 404 hatası

**Çözüm:** `render.yaml` dosyasının doğru yapılandırıldığından emin olun (yukarıdaki routes kısmı)

### Build Çok Yavaş

**Çözüm 1:** Node version'ı belirtin
```
Environment Variable:
NODE_VERSION=18
```

**Çözüm 2:** Dependencies'i optimize edin
```bash
# Kullanılmayan paketleri kaldırın
npm prune
```

### localStorage Sorunu

**Not:** Render static site'lar için localStorage kullanımı sorun çıkarmaz, ancak production'da gerçek bir backend kullanmanız önerilir.

---

## 📊 9. Monitoring ve Analytics

### Render Dashboard

- 📈 **Deployment History:** Tüm deploy'ları görüntüleyin
- 📊 **Bandwidth Usage:** Trafik istatistikleri
- ⚡ **Build Logs:** Detaylı log'lar

### Google Analytics Ekleme (Opsiyonel)

`index.html` dosyasına Google Analytics kodunu ekleyin:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🎓 10. Render Free Tier Limitleri

Render'ın ücretsiz planında:

- ✅ **Bandwidth:** 100 GB/ay
- ✅ **Build Minutes:** Sınırsız
- ✅ **Sites:** Sınırsız
- ✅ **SSL:** Ücretsiz
- ⚠️ **Cold Start:** 15 dakika hareketsizlikten sonra sleep mode (sadece web services için, static sites etkilenmez)

**Workigom için:** Static site olduğu için sleep mode sorunu yok! ✨

---

## 🚀 11. Production Optimizasyonları

### 11.1. Performance İyileştirmeleri

```bash
# Vite build optimizasyonu
npm run build -- --mode production
```

### 11.2. Asset Compression

Render otomatik olarak gzip compression uygular.

### 11.3. Caching

`vite.config.ts` içinde:

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react']
        }
      }
    }
  }
})
```

---

## 📱 12. Test Etme

Deploy sonrası test listesi:

- [ ] Ana sayfa yükleniyor
- [ ] Bireysel/Kurumsal giriş çalışıyor
- [ ] Mobil responsive tasarım doğru
- [ ] Desktop sidebar görünüyor
- [ ] Acil iş sistemi çalışıyor
- [ ] Dayanışma Menüsü çalışıyor
- [ ] Admin paneli erişilebilir
- [ ] localStorage verileri kaydediliyor
- [ ] Bildirimler çalışıyor
- [ ] Tüm route'lar doğru yükleniyor

---

## 🔐 13. Güvenlik

Render otomatik olarak şunları sağlar:

- ✅ **HTTPS:** Otomatik SSL sertifikası
- ✅ **DDoS Protection:** Temel koruma
- ✅ **Security Headers:** `render.yaml` içinde tanımlı

### Ek Güvenlik Headers

`render.yaml` dosyasında zaten yapılandırılmış:

```yaml
headers:
  - path: /*
    name: X-Frame-Options
    value: SAMEORIGIN
  - path: /*
    name: X-Content-Type-Options
    value: nosniff
```

---

## 📚 14. Ek Kaynaklar

- 📖 [Render Static Sites Docs](https://render.com/docs/static-sites)
- 📖 [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- 📖 [React Router on Static Hosts](https://reactrouter.com/en/main/guides/deploying#static-hosting)

---

## 🎉 15. Tebrikler!

Workigom uygulamanız artık canlıda! 🚀

**Sonraki Adımlar:**
1. ✅ Custom domain bağlayın
2. ✅ Google Analytics ekleyin
3. ✅ SEO optimizasyonu yapın
4. ✅ Gerçek backend entegrasyonu (Supabase, Firebase vb.)
5. ✅ Sosyal medyada paylaşın!

---

## 💡 İpuçları

1. **Preview Deployments:** PR'lar için otomatik preview URL'leri
2. **Branch Deploys:** Farklı branch'ler için ayrı URL'ler
3. **Rollback:** Önceki deployment'lara geri dönebilirsiniz
4. **Notifications:** Slack/Discord webhook'ları ile bildirim alın

---

## 🆘 Yardım

Sorun yaşıyorsanız:

1. 📧 Render Support: support@render.com
2. 💬 Render Community: [community.render.com](https://community.render.com)
3. 📖 Bu projedeki diğer rehberler: `KURULUM_REHBERI.md`, `GITHUB_PUSH_REHBERI.md`

---

**Son Güncelleme:** 2 Kasım 2025
**Workigom Version:** 1.0.0
