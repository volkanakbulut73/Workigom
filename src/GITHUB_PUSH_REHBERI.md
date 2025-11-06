# GitHub'a Push Etme Rehberi

## 🚀 Workigom Projesini GitHub'a Yükleme

### Adım 1: Projeyi İndirin
Figma Make'ten projenizi yerel bilgisayarınıza indirin.
- Sağ üst köşedeki **Export** veya **Download** butonunu kullanın
- Tüm dosyalar ZIP olarak inecektir

### Adım 2: GitHub Repository Oluşturun
1. [GitHub](https://github.com) hesabınıza giriş yapın
2. Sağ üst köşede **+** işaretine tıklayın
3. **New repository** seçin
4. Repository bilgilerini doldurun:
   - **Repository name:** `workigom`
   - **Description:** "Mobil öncelikli iş pazarı uygulaması - React + TypeScript + Tailwind CSS"
   - **Public** veya **Private** seçin
   - ✅ **Add a README file** SEÇMEYIN (zaten var)
   - **Create repository** butonuna tıklayın

### Adım 3: Git Kurulumu Kontrol Edin
Terminal veya Command Prompt açın ve Git'in yüklü olduğunu kontrol edin:

```bash
git --version
```

Eğer Git yüklü değilse: https://git-scm.com/downloads

### Adım 4: Projeyi Terminal'de Açın
```bash
cd workigom-projenizin-yolu
```

### Adım 5: Git Repository Başlatın
```bash
# Git repository'yi başlat
git init

# Tüm dosyaları stage'e ekle
git add .

# İlk commit'i oluştur
git commit -m "🎉 İlk commit: Workigom mobil iş pazarı uygulaması

- Bireysel ve Kurumsal kullanıcı rolleri
- Acil iş talep sistemi
- Dayanışma Menüsü (Yemek bağışı sistemi)
- Admin paneli
- Responsive tasarım
- QR kod sistemi
- Bildirim sistemi
- Cari hesap yönetimi"
```

### Adım 6: GitHub Repository'ye Bağlan
GitHub'da oluşturduğunuz repository'nin URL'sini kopyalayın ve:

```bash
# Remote repository ekle
git remote add origin https://github.com/KULLANICI_ADINIZ/workigom.git

# Branch adını main olarak ayarla
git branch -M main

# GitHub'a push et
git push -u origin main
```

### Adım 7: .gitignore Dosyası Oluşturun (Opsiyonel ama Önerilen)
Eğer node_modules gibi gereksiz dosyalar varsa:

```bash
# .gitignore dosyası oluştur
touch .gitignore
```

.gitignore içeriği:
```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
build/
dist/

# Misc
.DS_Store
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db
```

### Adım 8: package.json Oluşturun (Eğer Yoksa)
```bash
npm init -y
```

Sonra package.json'ı güncelleyin:
```json
{
  "name": "workigom",
  "version": "1.0.0",
  "description": "Mobil öncelikli iş pazarı uygulaması",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "latest",
    "recharts": "^2.10.0",
    "sonner": "^2.0.3",
    "react-hook-form": "^7.55.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "^10.4.16"
  }
}
```

## 📋 Sonraki Adımlar

### GitHub'da Repository Ayarları
1. **Settings** > **General** > **Social Preview** bölümünden bir önizleme görseli ekleyin
2. **About** bölümüne proje açıklaması ve konular ekleyin
3. **Topics:** `react`, `typescript`, `tailwindcss`, `job-marketplace`, `mobile-first`

### README.md Güncelleme
README.md dosyanıza şunları ekleyebilirsiniz:
- 📸 Ekran görüntüleri
- 🎥 Demo video linki
- 🌐 Canlı demo URL'si (Vercel, Netlify vb.)

### Deployment (Opsiyonel)
Projenizi canlıya almak için:

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy
```

## ⚠️ Önemli Notlar

1. **API Key'leri:** Eğer API key'leriniz varsa, bunları `.env` dosyasında saklayın ve `.gitignore`'a ekleyin
2. **Hassas Veriler:** Şifre, token gibi hassas bilgileri asla GitHub'a push etmeyin
3. **Branch Stratejisi:** 
   - `main` - production branch
   - `develop` - development branch
   - `feature/yeni-ozellik` - yeni özellik geliştirme

## 🔄 Güncellemeleri Push Etme

Değişiklik yaptıktan sonra:
```bash
git add .
git commit -m "✨ Yeni özellik: Kullanıcı tipi seçimi"
git push origin main
```

## 🤝 Collaboration

Ekip arkadaşlarınızı eklemek için:
1. Repository > **Settings** > **Collaborators**
2. GitHub kullanıcı adını girin
3. Erişim seviyesini seçin

## 📞 Yardım

Git komutları hakkında daha fazla bilgi:
- `git status` - Değişiklikleri görüntüle
- `git log` - Commit geçmişini gör
- `git branch` - Branch'leri listele
- `git checkout -b yeni-branch` - Yeni branch oluştur
- `git pull origin main` - Güncellemeleri çek

---

**🎉 Tebrikler!** Workigom projeniz artık GitHub'da!

Repository URL: `https://github.com/KULLANICI_ADINIZ/workigom`
