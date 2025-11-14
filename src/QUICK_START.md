# 🚀 WORKIGOM Design System - Quick Start

**5 Dakikada Token Sistemine Geçiş Rehberi**

---

## ✅ Checklist - Hemen Yapılacaklar

### 1️⃣ CSS Dosyalarını Import Et (1 dk)

**`/App.tsx` veya ana entry dosyanızda:**

```tsx
// Varsa mevcut import'ların üstüne ekleyin
import './styles/tokens.css';      // ✅ EKLE
import './styles/components.css';  // ✅ EKLE
import './styles/globals.css';     // ✅ Zaten var
```

**VEYA** `/styles/globals.css` içinde (zaten eklendi ✅):

```css
@import "tailwindcss";
@import "./tokens.css";      /* ✅ Eklendi */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
```

---

### 2️⃣ Mevcut Component'leri Kontrol Et (2 dk)

Aşağıdaki component'ler **zaten güncellenmiş durumda** ✅:

- ✅ `/components/LandingPage.tsx` - Header güncellendi
- ✅ `/components/company/CompanyHome.tsx` - Kartlar güncellendi
- ✅ `/styles/globals.css` - Token import eklendi

**Yapmanız gereken:** Diğer component'lerde hardcoded renkler varsa token'lara çevirin.

---

### 3️⃣ Token Kullanım Örnekleri (Copy-Paste)

#### ❌ Eski Yöntem (Hardcoded)
```tsx
<div className="bg-[#4DD0E1] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
  Merhaba
</div>
```

#### ✅ Yeni Yöntem (Token'larla)
```tsx
<div className="bg-[var(--color-turquoise)] rounded-[var(--radius-md)] shadow-[var(--elevation-1)]">
  Merhaba
</div>
```

**VEYA** CSS sınıfı kullan:

```tsx
<div className="metric-card">
  <div className="metric-card__value">24</div>
  <div className="metric-card__label">Personel</div>
</div>
```

---

## 📦 Hazır Component Örnekleri

### Metric Card
```tsx
import { Users } from 'lucide-react';

<div className="metric-card">
  <div className="metric-card__header">
    <div className="metric-card__icon metric-card__icon--turquoise">
      <Users className="w-4 h-4" />
    </div>
  </div>
  <div className="metric-card__value">24</div>
  <div className="metric-card__label">Gelen Personel</div>
</div>
```

### CTA Card
```tsx
<div className="cta-card" onClick={() => navigate('post-job')}>
  <div className="cta-card__content">
    <h4 className="cta-card__title">Günlük personel ihtiyacınız mı var?</h4>
    <p className="cta-card__description">Yakındaki çalışanlar anında bildirim alsın</p>
    <button className="cta-card__button">
      <Zap className="w-3 h-3" />
      İş Talebi Oluştur
    </button>
  </div>
</div>
```

### Header Card
```tsx
<div className="header-card">
  <h1 className="header-card__title">Test Şirketi</h1>
  <div className="header-card__subtitle">
    <MapPin className="w-3 h-3" />
    <span>Beşiktaş, İstanbul</span>
  </div>
</div>
```

### Button Variants
```tsx
<button className="btn btn--primary">Primary</button>
<button className="btn btn--secondary">Secondary</button>
<button className="btn btn--gradient">Gradient</button>
<button className="btn btn--outline">Outline</button>
```

### Badge
```tsx
<span className="badge badge--turquoise">Aktif</span>
<span className="badge badge--pink">Yeni</span>
<span className="badge badge--lavender">Bekliyor</span>
```

---

## 🎨 Sık Kullanılan Token'lar

### Renkler
```css
/* Primary */
var(--color-turquoise)      /* #4DD0E1 - Ana renk */
var(--color-pink)           /* #FF80AB - İkincil */
var(--color-lavender)       /* #B39DDB - Vurgu */
var(--color-lemon)          /* #FFF176 - Uyarı */

/* Neutral */
var(--color-cream)          /* #FFF9E6 - Kart arka planı */
var(--color-surface)        /* #FFFFFF - Beyaz */

/* Text */
var(--text-strong)          /* #333333 - Başlıklar */
var(--text-body)            /* #757575 - Normal metin */
var(--text-muted)           /* #9E9E9E - İkincil metin */
```

### Spacing
```css
var(--space-2)   /* 8px */
var(--space-3)   /* 12px */
var(--space-4)   /* 16px */
var(--space-6)   /* 24px */
```

### Border Radius
```css
var(--radius-sm)    /* 8px */
var(--radius-md)    /* 12px */
var(--radius-lg)    /* 16px */
var(--radius-xl)    /* 20px */
var(--radius-full)  /* 9999px - Tam yuvarlak */
```

### Shadows
```css
var(--elevation-1)  /* Hafif - Kartlar için */
var(--elevation-2)  /* Orta - Yükselen kartlar */
var(--elevation-3)  /* Ağır - Modal'lar */
```

---

## 🔄 Mevcut Component'leri Güncelleme

### Önce (Hardcoded)
```tsx
<Card className="bg-[#FFF9E6] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-3">
  <h4 className="text-[#333333] font-semibold">Başlık</h4>
  <p className="text-[#757575] text-sm">Açıklama</p>
</Card>
```

### Sonra (Token'larla)
```tsx
<Card className="bg-[var(--color-cream)] rounded-[var(--radius-lg)] shadow-[var(--elevation-1)] p-3">
  <h4 className="text-[var(--text-strong)] font-semibold">Başlık</h4>
  <p className="text-[var(--text-body)] text-sm">Açıklama</p>
</Card>
```

### En İyi (CSS Sınıfı)
```tsx
<div className="metric-card">
  <h4>Başlık</h4>
  <p>Açıklama</p>
</div>
```

---

## 🎯 Tailwind ile Token Kullanımı

Tailwind sınıflarında token'ları kullanmak için `[var(--token-name)]` formatını kullanın:

```tsx
{/* Renk */}
<div className="bg-[var(--color-turquoise)]">...</div>

{/* Border Radius */}
<div className="rounded-[var(--radius-md)]">...</div>

{/* Shadow */}
<div className="shadow-[var(--elevation-1)]">...</div>

{/* Spacing */}
<div className="p-[var(--space-4)]">...</div>
<div className="gap-[var(--space-3)]">...</div>
```

---

## 📱 Responsive Kullanım

```tsx
{/* Desktop - Sidebar görünür */}
<div className="sidebar hidden lg:block">...</div>

{/* Mobile - Floating toolbar gizli */}
<div className="floating-toolbar lg:flex hidden">...</div>

{/* Responsive Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--grid-gutter)]">
  {/* Cards */}
</div>
```

---

## 🧪 Test Etme

### 1. Visual Test
```bash
npm run dev
# veya
yarn dev
```

Kontrol edilecekler:
- ✅ Renkler doğru mu?
- ✅ Border radius tutarlı mı?
- ✅ Shadow'lar görünüyor mu?
- ✅ Hover efektleri çalışıyor mu?

### 2. Responsive Test
- Desktop (1280px+)
- Tablet (768px - 1024px)
- Mobile (<768px)

### 3. Contrast Test
Chrome DevTools → Lighthouse → Accessibility

---

## 💡 Pro Tips

### 1. VS Code Autocomplete
Token'ları yazarken `var(--` yazdığınızda tüm token'lar gösterilir.

### 2. Find & Replace
Tüm projede hardcoded değerleri token'larla değiştirmek için:

```
Find: bg-\[#4DD0E1\]
Replace: bg-[var(--color-turquoise)]
```

### 3. Component Librarysi
`/components/examples/ExampleComponents.tsx` dosyasında hazır component'ler var.

---

## 📚 Daha Fazla Bilgi

- **Detaylı Dokümantasyon:** `/DESIGN_SYSTEM.md`
- **Token Listesi:** `/styles/tokens.css`
- **Component Styles:** `/styles/components.css`
- **Örnekler:** `/components/examples/ExampleComponents.tsx`

---

## 🎉 Tamamdır!

Token sistemi aktif! Artık tüm component'lerinizde tutarlı renkler, spacing ve shadow kullanabilirsiniz.

**Sorular?** `DESIGN_SYSTEM.md` dosyasına bakın veya `/components/examples/` klasöründeki örnekleri inceleyin.

---

**Created:** November 2025  
**Theme:** Sevimli & Eğlenceli 🎨✨  
**Status:** ✅ Production Ready
