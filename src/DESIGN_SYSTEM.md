# 🎨 WORKIGOM Design System
**"Sevimli & Eğlenceli" Theme - Tokenized & Production Ready**

---

## 📋 Table of Contents
- [Quick Start](#quick-start)
- [Design Tokens](#design-tokens)
- [Component Styles](#component-styles)
- [Figma Integration](#figma-integration)
- [Implementation Checklist](#implementation-checklist)
- [Responsive Guidelines](#responsive-guidelines)

---

## 🚀 Quick Start

### 1. Import Order
```css
/* In your main CSS file or App entry */
@import "tailwindcss";
@import "./styles/tokens.css";      /* Design tokens FIRST */
@import "./styles/components.css";  /* Component styles SECOND */
```

### 2. Use Design Tokens
```css
/* ✅ DO - Use tokens */
.my-card {
  background: var(--color-cream);
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-1);
}

/* ❌ DON'T - Hardcode values */
.my-card {
  background: #FFF9E6;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
```

---

## 🎨 Design Tokens

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-turquoise` | `#4DD0E1` | Primary actions, links |
| `--color-turquoise-dark` | `#3BB8C8` | Hover states |
| `--color-pink` | `#FF80AB` | Secondary actions |
| `--color-pink-dark` | `#F06292` | Hover states |
| `--color-lavender` | `#B39DDB` | Accents, highlights |
| `--color-lemon` | `#FFF176` | Warnings, alerts |
| `--color-cream` | `#FFF9E6` | Cards, backgrounds |
| `--color-surface` | `#FFFFFF` | Default cards |
| `--text-strong` | `#333333` | Headings |
| `--text-body` | `#757575` | Body text |
| `--text-muted` | `#9E9E9E` | Secondary text |

### Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--text-xs` | `12px` | Small labels |
| `--text-sm` | `14px` | Body text |
| `--text-base` | `16px` | Default |
| `--text-lg` | `18px` | Subheadings |
| `--text-2xl` | `22px` | Headings |
| `--font-medium` | `500` | Labels, buttons |
| `--font-semibold` | `600` | Headings |

### Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `--space-2` | `8px` | Tight spacing |
| `--space-3` | `12px` | Default gap |
| `--space-4` | `16px` | Cards, padding |
| `--space-6` | `24px` | Large padding |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `8px` | Small elements |
| `--radius-md` | `12px` | Cards, inputs |
| `--radius-lg` | `16px` | Large cards |
| `--radius-xl` | `20px` | Pills, badges |
| `--radius-full` | `9999px` | Circles |

### Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--elevation-1` | `0 4px 12px rgba(0,0,0,0.08)` | Cards |
| `--elevation-2` | `0 6px 16px rgba(0,0,0,0.1)` | Floating cards |
| `--elevation-3` | `0 8px 24px rgba(0,0,0,0.12)` | Modals |

---

## 🧩 Component Styles

### HeaderCard
```html
<div class="header-card">
  <h1 class="header-card__title">Şirket Adı</h1>
  <p class="header-card__subtitle">
    📍 Beşiktaş, İstanbul
  </p>
</div>
```

**CSS:**
```css
.header-card {
  background: linear-gradient(135deg, var(--color-turquoise) 0%, var(--color-lavender) 100%);
  border-radius: var(--radius-md);
  padding: var(--space-5);
  box-shadow: var(--elevation-2);
}
```

### MetricCard
```html
<div class="metric-card">
  <div class="metric-card__header">
    <div class="metric-card__icon metric-card__icon--turquoise">
      👥
    </div>
  </div>
  <div class="metric-card__value">24</div>
  <div class="metric-card__label">Gelen Personel</div>
</div>
```

**CSS:**
```css
.metric-card {
  background: var(--color-cream);
  border-radius: var(--radius-md);
  padding: var(--card-padding);
  min-height: var(--card-min-height);
  box-shadow: var(--elevation-1);
}
```

### CTA Card
```html
<div class="cta-card">
  <div class="cta-card__content">
    <h4 class="cta-card__title">Günlük personel ihtiyacınız mı var?</h4>
    <p class="cta-card__description">Yakındaki çalışanlar anında bildirim alsın</p>
    <button class="cta-card__button">
      ⚡ İş Talebi Oluştur
    </button>
  </div>
</div>
```

### SearchInput
```html
<div class="search-input-wrapper">
  <input type="text" placeholder="Ara..." />
  <button>Ara</button>
</div>
```

### Badge
```html
<span class="badge badge--turquoise">Aktif</span>
<span class="badge badge--pink">Yeni</span>
<span class="badge badge--lemon">Bekliyor</span>
```

### Button Variants
```html
<button class="btn btn--primary">Primary</button>
<button class="btn btn--secondary">Secondary</button>
<button class="btn btn--gradient">Gradient</button>
<button class="btn btn--outline">Outline</button>
```

---

## 🎯 Figma Integration

### Step 1: Create Design Tokens in Figma

#### Color Styles
1. Open Figma → Design Tokens page
2. Create Color Styles:
   - **Turquoise**: `#4DD0E1`
   - **Pink**: `#FF80AB`
   - **Lavender**: `#B39DDB`
   - **Lemon**: `#FFF176`
   - **Cream**: `#FFF9E6`
   - **Surface**: `#FFFFFF`
   - **Text Strong**: `#333333`
   - **Text Body**: `#757575`

#### Text Styles
1. Create Text Styles:
   - **Dashboard-H1**: 22px / 600 / Poppins
   - **Card-Title**: 16px / 600 / Poppins
   - **Body-14**: 14px / 400 / Poppins
   - **Small-12**: 12px / 400 / Poppins

#### Effect Styles (Shadows)
1. Create Effects:
   - **elevation-1**: `rgba(0,0,0,0.08)` Y4 Blur12
   - **elevation-2**: `rgba(0,0,0,0.1)` Y6 Blur16

### Step 2: Apply to Components

#### HeaderCard
- ✅ Radius: `12px` (radius-md)
- ✅ Padding: `20px`
- ✅ Shadow: elevation-2
- ✅ Gradient: Turquoise → Lavender

#### MetricCard
- ✅ Radius: `12px`
- ✅ Padding: `18px`
- ✅ Min height: `96px`
- ✅ Shadow: elevation-1
- ✅ Background: Cream or Surface

#### Sidebar
- ✅ Width: `260px`
- ✅ Background: Cream
- ✅ Icon size: `20px`
- ✅ Item spacing: `12px`

### Step 3: Instance Swap
1. Update master components with new styles
2. Right-click instances → **Swap Instance** → Select updated master
3. Check for overrides and reapply if needed

---

## ✅ Implementation Checklist

### Figma (Design)
- [ ] All Color Styles created
- [ ] All Text Styles created
- [ ] All Effect Styles created
- [ ] HeaderCard updated (radius, shadow, padding)
- [ ] MetricCard updated (radius, shadow, min-height)
- [ ] Sidebar updated (width, spacing, icons)
- [ ] Instance swaps applied
- [ ] Contrast checked (WCAG AA)

### Frontend (Code)
- [ ] `tokens.css` imported before other styles
- [ ] `components.css` imported after tokens
- [ ] Hardcoded colors replaced with tokens
- [ ] Hardcoded spacing replaced with tokens
- [ ] Hardcoded shadows replaced with tokens
- [ ] Responsive breakpoints tested
- [ ] Floating toolbar hidden on mobile (<768px)
- [ ] Touch targets ≥44px on mobile

### Testing
- [ ] Desktop layout (1280px+)
- [ ] Tablet layout (768px - 1024px)
- [ ] Mobile layout (<768px)
- [ ] Hover states working
- [ ] Focus states visible
- [ ] Color contrast ≥4.5:1 for body text

---

## 📱 Responsive Guidelines

### Desktop (≥1024px)
```css
/* Full layout */
.sidebar { display: block; width: 260px; }
.floating-toolbar { display: flex; }
.content { max-width: 1280px; }
```

### Tablet (768px - 1023px)
```css
/* Collapsed sidebar */
.sidebar { transform: translateX(-100%); }
.sidebar--open { transform: translateX(0); }
```

### Mobile (<768px)
```css
/* Mobile optimized */
.floating-toolbar { display: none; }
.metric-card { min-height: 80px; padding: 12px; }
.header-card { padding: 16px; }
```

---

## 🎨 CSS Token Quick Reference

```css
/* Copy-paste ready examples */

/* Gradient Background */
background: linear-gradient(135deg, 
  var(--color-turquoise) 0%, 
  var(--color-pink) 100%
);

/* Card Style */
background: var(--color-cream);
border-radius: var(--radius-md);
padding: var(--card-padding);
box-shadow: var(--elevation-1);

/* Button Style */
background: var(--color-turquoise);
color: var(--text-white);
border-radius: var(--radius-md);
padding: var(--space-3) var(--space-4);
box-shadow: var(--elevation-1);
transition: all var(--transition-base);

/* Hover Effect */
.element:hover {
  transform: scale(1.05);
  box-shadow: var(--elevation-2);
}
```

---

## 🔄 Figma ↔ Frontend Sync

### Naming Convention
| Figma | CSS | React/Tailwind |
|-------|-----|----------------|
| `Turquoise` | `--color-turquoise` | `bg-[var(--color-turquoise)]` |
| `radius-md` | `--radius-md` | `rounded-[var(--radius-md)]` |
| `elevation-1` | `--elevation-1` | `shadow-[var(--elevation-1)]` |

### Communication Tips
1. Use same component names in Figma and code
2. Reference token names in design comments
3. Keep a shared design system page
4. Update both Figma and code when changes occur

---

## 📚 Resources

- **Tokens File**: `/styles/tokens.css`
- **Components**: `/styles/components.css`
- **Main Styles**: `/styles/globals.css`
- **Font**: [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins)

---

## 🎉 Quick Wins

**Before:**
```css
.card {
  background: #FFF9E6;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
```

**After:**
```css
.card {
  background: var(--color-cream);
  border-radius: var(--radius-md);
  box-shadow: var(--elevation-1);
}
```

**Benefits:**
✅ Consistent across all components  
✅ Easy to update theme globally  
✅ Synced with Figma  
✅ Self-documenting code

---

**Last Updated:** November 2025  
**Version:** 1.0.0  
**Theme:** Sevimli & Eğlenceli 🎨✨
