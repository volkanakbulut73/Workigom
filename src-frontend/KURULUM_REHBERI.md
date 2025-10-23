# 📦 Workigom - Kurulum Rehberi

Bu rehber, Workigom uygulamasını yerel bilgisayarınızda çalıştırmak için gerekli adımları içerir.

## 🔧 Gereksinimler

Başlamadan önce bilgisayarınızda şunların yüklü olması gerekir:

- **Node.js** (v18 veya üzeri) - [İndir](https://nodejs.org/)
- **npm** (Node.js ile birlikte gelir) veya **yarn**
- Modern bir web tarayıcı (Chrome, Firefox, Safari, Edge)
- Kod editörü (VS Code önerilir)

## 📥 Projeyi İndirme

### Yöntem 1: ZIP İndirme
1. Tüm dosyaları bir ZIP olarak indirin
2. ZIP dosyasını istediğiniz klasöre çıkarın
3. Terminal/Komut İstemi'ni açın
4. Proje klasörüne gidin:
   ```bash
   cd workigom
   ```

### Yöntem 2: Git Clone (Gelecekte)
```bash
git clone https://github.com/your-repo/workigom.git
cd workigom
```

## 🚀 Kurulum Adımları

### 1. Bağımlılıkları Yükleyin

Terminal'de proje klasöründe aşağıdaki komutu çalıştırın:

```bash
npm install
```

veya yarn kullanıyorsanız:

```bash
yarn install
```

Bu işlem bir kaç dakika sürebilir. Tüm gerekli kütüphaneler indirilecektir.

### 2. Geliştirme Sunucusunu Başlatın

Kurulum tamamlandıktan sonra:

```bash
npm run dev
```

veya:

```bash
yarn dev
```

### 3. Tarayıcıda Açın

Terminal'de şuna benzer bir mesaj göreceksiniz:

```
  VITE v6.0.11  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Tarayıcınızda `http://localhost:5173/` adresini açın.

## ✅ İlk Giriş

1. **Landing Sayfası** açılacak
2. **"Başlayın"** butonuna tıklayın
3. **Kullanıcı rolü seçin:**
   - **Bireysel** (Çalışan) - Sol kart
   - **Kurumsal** (Şirket) - Sağ kart

4. **Test kullanıcısı ile giriş yapın:**

   **Bireysel için:**
   - E-posta: `ahmet.yilmaz@email.com`
   - Şifre: `ahmet123`

   **Kurumsal için:**
   - E-posta: `info@elitetemizlik.com`
   - Şifre: `elite123`

5. **"Giriş Yap"** butonuna tıklayın

## 🧪 Test Senaryoları

### Yemek Bağışı Testi

**2 farklı tarayıcı penceresi açın:**

**Pencere 1 - Destek İsteyen (Ahmet):**
1. `ahmet.yilmaz@email.com` / `ahmet123` ile giriş yapın
2. "Birlikte Paylaşıyoruz 🍽️" kartına tıklayın
3. "Yemeğine Destek Bul" → Formu doldurun
4. İlanı yayınlayın

**Pencere 2 - Bağışçı (Ayşe):**
1. `ayse.demir@email.com` / `ayse123` ile giriş yapın
2. "Birlikte Paylaşıyoruz 🍽️" kartına tıklayın
3. "Yemek Bağışçısı Ol" → Ahmet'in talebini görün
4. "Destek Ol" → %20 veya %100 seçin
5. "Desteği Onayla"

**İki pencere arasında geçiş yaparak akışı takip edin!**

Detaylı test senaryoları için: `YEMEK_BAGIS_TEST_REHBERI.md`

## 📱 Mobil Görünüm Testi

Tarayıcınızda mobil görünümü test etmek için:

1. **Chrome/Edge:**
   - F12 tuşuna basın
   - Ctrl+Shift+M (Windows) veya Cmd+Shift+M (Mac)
   - Cihaz seçin (iPhone, Samsung vb.)

2. **Firefox:**
   - F12 tuşuna basın
   - Responsive Design Mode butonuna tıklayın
   - Cihaz boyutunu seçin

## 🏗️ Production Build

Projeyi production için derlemek için:

```bash
npm run build
```

Build edilmiş dosyalar `dist` klasöründe oluşur.

Preview için:

```bash
npm run preview
```

## 🐛 Sorun Giderme

### Port 5173 zaten kullanımda hatası

Başka bir uygulama 5173 portunu kullanıyorsa, Vite otomatik olarak başka bir port seçecektir (örn: 5174).

### Module not found hatası

```bash
rm -rf node_modules package-lock.json
npm install
```

### Sayfa yüklenmiyor / Boş ekran

1. Terminal'de hata mesajlarını kontrol edin
2. Tarayıcı konsolunu (F12) açıp hataları kontrol edin
3. Tarayıcı cache'ini temizleyin (Ctrl+Shift+Del)

### LocalStorage verileri sıfırlamak

Tarayıcı konsolunda (F12 > Console):

```javascript
localStorage.clear()
```

Sonra sayfayı yenileyin (F5).

## 📂 Proje Yapısı

```
workigom/
├── index.html              # Ana HTML
├── package.json            # Bağımlılıklar
├── vite.config.ts          # Vite yapılandırması
├── tsconfig.json           # TypeScript yapılandırması
├── src/
│   └── main.tsx           # Uygulama giriş noktası
├── App.tsx                # Ana uygulama komponenti
├── components/            # React komponentleri
│   ├── employee/         # Bireysel kullanıcı sayfaları
│   ├── company/          # Kurumsal kullanıcı sayfaları
│   ├── shared/           # Paylaşılan komponentler
│   └── ui/               # UI komponentleri
├── lib/
│   └── mockData.ts       # Demo veriler
├── styles/
│   └── globals.css       # Global CSS
└── docs/                 # Dokümantasyon (MD dosyaları)
```

## 🎨 Özelleştirme

### Renk Paletini Değiştirme

`styles/globals.css` dosyasını açın ve CSS değişkenlerini düzenleyin:

```css
:root {
  --color-primary: #012840;
  --color-secondary: #0367A6;
  /* ... diğer renkler */
}
```

### Mock Verileri Düzenleme

`lib/mockData.ts` dosyasında demo kullanıcıları ve verileri bulabilirsiniz.

## 🔐 Güvenlik Notu

⚠️ **ÖNEMLİ:** Bu demo bir prototiptir!

- Şifreler düz metin olarak saklanmaktadır
- Tüm veriler tarayıcı LocalStorage'ında tutulmaktadır
- Gerçek bir ödeme sistemi yoktur
- Production kullanımı için güvenlik önlemleri eklenmelidir

## 📚 Ek Kaynaklar

Proje içindeki dokümantasyon:
- `README.md` - Genel bakış
- `YEMEK_BAGIS_TEST_REHBERI.md` - Yemek bağışı test rehberi
- `TEST_KULLANICI_BILGILERI.md` - Test kullanıcı listesi
- `GOOGLE_OAUTH_ENTEGRASYON_REHBERI.md` - OAuth entegrasyonu

## 💡 İpuçları

1. **Hot Reload:** Kod değişiklikleriniz otomatik olarak tarayıcıya yansır
2. **Console:** Hata ayıklama için tarayıcı konsolunu açık tutun (F12)
3. **Responsive:** Mobil ve desktop görünümlerini test edin
4. **LocalStorage:** Verileri console'dan kontrol edebilirsiniz

## 🚀 Sonraki Adımlar

1. ✅ Uygulamayı başarıyla çalıştırdınız
2. 📱 Mobil ve desktop görünümleri test edin
3. 🧪 Test kullanıcıları ile giriş yapın
4. 🍽️ Yemek bağışı akışını test edin
5. 💼 Acil iş sistemini keşfedin
6. 📖 Dokümantasyonu okuyun

## 📞 Yardım

Sorun yaşıyorsanız:
1. Terminal'deki hata mesajlarını okuyun
2. Tarayıcı konsolunu kontrol edin
3. `KURULUM_REHBERI.md` dosyasını tekrar gözden geçirin
4. GitHub Issues (gelecekte)

---

**Başarılar! 🎉**

Workigom'u başarıyla kurduysanız, artık uygulamayı keşfetmeye başlayabilirsiniz!
