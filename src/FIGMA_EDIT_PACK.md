# 🎨 Figma Edit Pack — Workigom (Sevimli Palet)

**Component-by-Component Adım Adım Uygulama Rehberi**

Bu dosya Figma'da doğrudan uygulanabilecek **Edit Pack**'tir. Her adımda hangi layer'ı seçip hangi değeri değiştireceğiniz, yeni Style/Token isimleri ve instance-swap talimatları açıkça verilmiştir.

**⏱ Tahmini Süre:** 20-40 dakika  
**🎯 Hedef:** Tutarlı Design Token sistemi + Master Component yapısı

---

## 📋 Özet Hedef

- ✅ Tek bir Design Token seti kullan: renkler, text styles, radius, shadows
- ✅ Master (main) komponentleri oluştur ve tüm sayfalarda instance'ları swap et
- ✅ Grid / hizalama / spacing kurallarını tüm sayfalarda uygula
- ✅ Mobile davranış kurallarını ekle (sidebar collapse, floating tool gizleme)

---

## 1️⃣ HAZIRLIK — Yeni Page & İsimlendirme

### Adımlar:
1. **Yeni Page Aç:** "Design Tokens & Components"
2. Bu Page içinde **3 frame** oluştur:
   - `Color Styles`
   - `Text Styles`
   - `Effects & Radii`

### Naming Convention:
Component ve Style isimleri **kesin ve kısa** olmalı.

**Color Styles:**
- Turquoise, Pink, Lavender, Lemon, Cream, Surface, Text Strong, Text Muted

**Text Styles:**
- PageTitle, SectionTitle, CardTitle, Body14, Small12, SidebarItem

**Effect Styles:**
- elevation-1, elevation-2

**Radii:**
- radius-sm, radius-md, radius-lg

---

## 2️⃣ COLOR STYLES — (Figma → Right Panel → Styles → +)

### Oluşturulacak Color Styles:

| İsim | HEX | Kullanım |
|------|-----|----------|
| **Turquoise** | `#4DD0E1` | Primary color |
| **Turquoise-Dark** | `#2AB0B4` | Primary-Dark (hover states) |
| **Pink** | `#FF80AB` | Secondary actions |
| **Lavender** | `#B39DDB` | Accent color |
| **Lavender-Overlay** | `rgba(179,157,219,0.08)` | Subtle backgrounds |
| **Lemon** | `#FFF176` | Highlights, warnings |
| **Cream** | `#FFF9E6` | Card backgrounds |
| **Surface** | `#FFFFFF` | White cards |
| **PageBackground** | `#F6F7FB` | Page background |
| **Text-Strong** | `#0B1220` | Headings |
| **Text-Muted** | `#6B7280` | Secondary text |

### Not:
Lavender için bir "overlay" style de oluştur: **Lavender-Overlay** `rgba(179,157,219,0.08)`

---

## 3️⃣ TEXT STYLES — (Figma → Text → Styles → +)

### Oluşturulacak Text Styles:

| İsim | Size | Weight | Line Height | Font |
|------|------|--------|-------------|------|
| **PageTitle** | 22px | 600 | 28px | Poppins/Quicksand |
| **SectionTitle** | 18px | 600 | 24px | Poppins |
| **CardTitle** | 16px | 600 | 20px | Poppins |
| **Body14** | 14px | 400 | 20px | Poppins |
| **Small12** | 12px | 400 | 16px | Poppins |
| **SidebarItem** | 14px | 500 | 20px | Poppins |

---

## 4️⃣ RADII & EFFECTS — (Named Styles)

### Border Radius:
- **radius-sm** = `8px`
- **radius-md** = `12px`
- **radius-lg** = `20px`

### Effect Styles (Shadows):

**elevation-1:**
- X: 0, Y: 6
- Blur: 20, Spread: 0
- Color: `rgba(11,18,30,0.06)`

**elevation-2:**
- X: 0, Y: 10
- Blur: 30, Spread: 0
- Color: `rgba(11,18,30,0.08)`

---

## 5️⃣ GRID & ALIGNMENT Kuralları

### Layout Constants:

| Constant | Value | Usage |
|----------|-------|-------|
| **container-left** | `24px` | Sol hizalama (PageHeader, Content Grid) |
| **content-max-width** | `1200-1280px` | İçerik max genişlik (centered) |
| **card-grid-gutter** | `16px` | Kartlar arası boşluk |
| **sidebar-width** | `260px` | Sidebar genişlik (fixed) |

### Hizalama Kuralı:
- PageHeader, HeaderCard, Content Grid **sol kenarı** `container-left (24px)` ile hizalı olmalı
- İçerik `max-width: 1280px` ve **center aligned**

---

## 6️⃣ MASTER KOMPONENTLER — Oluşturma

Her master component'e oluşturduğunuz **Color/Text/Effect stillerini bağlayın** (doğrudan HEX/weight kullanmayın).

### A) AppContainer (Frame)
```
Width: 100%
Left padding: 24px (container-left)
Right padding: 24px
Max width: 1280px (center)
```

### B) Sidebar (Main Component)
```
Width: 260px
Background: Cream
Padding: 24px 16px

Sidebar Item:
- Auto Layout horizontal
- Spacing: 12px
- Padding: 10px 12px
- Icon size: 20px

Active Item:
- Background: linear gradient (Turquoise → Lavender)
- Border-radius: radius-lg (20px) - pill shape
- Text: White
```

### C) PageHeader (Title Band)
```
Height: 88px
Padding-left: container-left (24px)
Background: linear-gradient(90deg, Turquoise → Turquoise-Dark)
Text: PageTitle style
Effect: elevation-1

Kullanım: İş İlanları, İşlerim, etc. sayfa başlıkları
```

### D) HeaderCard (Banner - Dashboard/Profile)
```
Corner radius: radius-md (12px)
Padding: 18px
Background: linear-gradient(Turquoise → Turquoise-Dark → Lavender-Overlay)
Effect: elevation-2
Text color: White

Kullanım: Profile header, Dashboard banner
```

### E) MetricCard (Stats Cards)
```
Auto Layout: vertical
Padding: 18px
Radius: radius-md
Min-height: 96px
Background: Surface OR Cream (tek tip seç)
Effect: elevation-1

İçerik:
- Title: CardTitle
- Value: 20-22px semibold
- Icon: 32px with colored background
```

### F) EmptyStateCard
```
Padding: 24px
Radius: radius-md
Background: Surface
Border: 1px dashed rgba(107,114,128,0.06)
Effect: elevation-1

İçerik:
- Icon: 48px (centered)
- Title: CardTitle
- Body: Body14 (muted color)

Kullanım: İlanlar/Bildirimler empty states
```

### G) JobCard (Listing Card)
```
Padding: 16px
Radius: radius-md
Shadow: elevation-1

Layout:
- Title: CardTitle
- Meta row: icons + Body14 text
- Badge: small pill (radius-lg, background Pink for "Acil")

Kullanım: İş listelerinde
```

### H) Chat Components

**ChatList:**
```
Width: 320px (fixed)
Background: Surface
Border-right: 1px solid Cream

Conversation Item:
- Avatar: 40px circle
- Title: CardTitle
- Preview: Body14 (muted)
- Time: Small12 (muted)
```

**ChatWindow:**
```
Message Bubbles:
- Incoming: 
  - Background: Surface
  - Text: Text-Strong
  - Radius: 14px
  - Align: left
  
- Outgoing:
  - Background: Turquoise-Dark
  - Text: White
  - Radius: 14px
  - Align: right

Composer:
- Height: 56px
- Input radius: radius-md
- Send button: primary pill (Turquoise)
```

### I) CTA Button (Primary)
```
Height: 44-48px
Radius: radius-md (12px)
Background: Turquoise
Text: Body14 / semibold / white
Shadow: 0 6px 18px rgba(42,176,180,0.18)

Hover:
- Background: Turquoise-Dark
- Transform: scale(1.05)
```

---

## 7️⃣ INSTANCE SWAP — Adım Adım

### Her Sayfa İçin (Profile, İş İlanları, İşlerim, Bildirimler, Mesajlar):

1. **Sayfayı aç**
2. **Top banner** seç → Right-click → **Swap Instance** → **PageHeader** veya **HeaderCard** seç
3. **Stat boxes** seç → **Swap Instance** → **MetricCard**
4. **Text styles kontrol:** Text seç → Text Styles panel → ilgili style uygula
5. **Empty states** seç → **Swap Instance** → **EmptyStateCard**
6. **Job listing cards** seç → **Swap Instance** → **JobCard**
7. **Sidebar** seç → **Swap Instance** → **Sidebar** master component

### Swap Tips:
- Instance'lar override içeriyorsa (text, icons), swap sonrası **Text Styles'ı tekrar uygula**
- Layout shift olursa, parent Auto Layout'u kontrol et → "Hug contents" vs "Fill container"
- Icon'ları da component içinde **instance swap** ile değiştir

---

## 8️⃣ AUTO LAYOUT Kuralları

### Component-Level:
- **List items ve cards:** Auto Layout kullan
- **Vertical stack spacing:** 12-16px
- **Horizontal stack gutter:** 16px
- **Card padding:** Top/Bottom 18px, Left/Right 18px
- **Buttons:** Fixed height (44-48px), center alignment

### Parent Containers:
- Content area: Auto Layout vertical
- Card grids: Auto Layout horizontal wrap OR Frame grid
- Ensure "Hug contents" for cards, "Fill container" for full-width elements

---

## 9️⃣ RESPONSIVE Kuralları (Prototype Notes)

### Breakpoint < 1024px (Tablet):
- **Sidebar:** Collapse to icon-only OR hide into hamburger overlay
- **HeaderCard height:** Reduce to 72px
- **PageTitle font size:** 20px (instead of 22px)

### Breakpoint < 768px (Mobile):
- **Sidebar:** Hidden
- **Floating toolbar:** Hidden
- **Card grid:** Single column stacking
- **Header padding:** 16px (instead of 24px)
- **MetricCard min-height:** 80px (instead of 96px)

### Component Variants (Optional):
Create component variants:
- Sidebar: `Desktop` / `Mobile (Hidden)`
- HeaderCard: `Desktop` / `Mobile (Compact)`

---

## 🔟 QA CHECKLIST (Figma & Dev Handoff)

### Design Tokens:
- [ ] All pages use **PageHeader** OR **HeaderCard** component
- [ ] All stat/metric cards use **MetricCard** master
- [ ] All empty states use **EmptyStateCard**
- [ ] Sidebar uses same width (260px) and active pill style everywhere
- [ ] Colors are NOT hard-coded — all use **Color Styles**
- [ ] Typography uses **Text Styles** (no raw font sizes)
- [ ] Effect styles use **elevation-1** / **elevation-2**

### Layout:
- [ ] Spacing left X (**container-left** = 24px) across pages
- [ ] Card grid gutter = 16px
- [ ] Content max-width = 1280px
- [ ] Sidebar width = 260px (fixed)

### Responsive:
- [ ] Mobile preview: no floating overlaps
- [ ] Sidebar collapses on <1024px
- [ ] Floating toolbar hidden on <768px
- [ ] Card grid stacks to single column on mobile

### Accessibility:
- [ ] Contrast ratio ≥4.5:1 for body text
- [ ] Contrast ratio ≥3:1 for large text
- [ ] Focus states visible on interactive elements

---

## 1️⃣1️⃣ DEVELOPER HANDOFF — Naming + CSS Mapping

### Figma → CSS Mapping:

| Figma Color Style | CSS Variable |
|-------------------|--------------|
| Turquoise | `--color-turquoise: #4DD0E1` |
| Turquoise-Dark | `--color-turquoise-dark: #2AB0B4` |
| Pink | `--color-pink: #FF80AB` |
| Lavender | `--color-lavender: #B39DDB` |
| Cream | `--color-cream: #FFF9E6` |
| Surface | `--color-surface: #FFFFFF` |
| Text-Strong | `--text-strong: #0B1220` |
| Text-Muted | `--text-muted: #6B7280` |

### Developer Tokens Snippet:

Developer'lara bu snippet'i verin (zaten `/styles/tokens.css`'de mevcut):

```css
:root {
  --color-turquoise: #4DD0E1;
  --color-turquoise-dark: #2AB0B4;
  --color-pink: #FF80AB;
  --color-lavender: #B39DDB;
  --color-cream: #FFF9E6;
  --color-surface: #FFFFFF;
  --text-strong: #0B1220;
  --text-muted: #6B7280;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;

  --shadow-1: 0 6px 20px rgba(11,18,30,0.06);
  --shadow-2: 0 10px 30px rgba(11,18,30,0.08);

  --container-left: 24px;
  --grid-gutter: 16px;
  --card-min-height: 96px;
  --sidebar-width: 260px;
}
```

---

## 1️⃣2️⃣ COMPONENT CSS Examples (Developer-Friendly)

### HeaderCard:
```css
.header-card {
  background: linear-gradient(90deg, var(--color-turquoise), var(--color-turquoise-dark));
  border-radius: var(--radius-md);
  padding: 18px;
  box-shadow: var(--shadow-2);
  color: var(--color-surface);
}
```

### MetricCard:
```css
.metric-card {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: 18px;
  min-height: var(--card-min-height);
  box-shadow: var(--shadow-1);
}
```

### EmptyStateCard:
```css
.empty-state {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: 24px;
  border: 1px dashed rgba(107,114,128,0.06);
  text-align: center;
  box-shadow: var(--shadow-1);
}
```

### JobCard:
```css
.job-card {
  background: var(--color-surface);
  border-radius: var(--radius-md);
  padding: 16px;
  box-shadow: var(--shadow-1);
  transition: all 0.25s ease;
}

.job-card:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-2);
}
```

---

## 1️⃣3️⃣ FIGMA PLUGINS Önerileri

### Hızlı Uygulama İçin:
1. **Design Lint** — Style hatalarını bulmak için
2. **Themer** veya **Styles Organizer** — Color/Text Styles cleanup
3. **Contrast** — WCAG contrast testleri
4. **Instance Finder** — Hangi frame'lerde eski styles kullanıldığını bulmak

---

## 1️⃣4️⃣ HIZLI UYGULAMA PLAN (20-40 dakika)

### ⏰ Timeline:

**0-10 dakika:** Token Setup
1. "Design Tokens & Components" Page aç
2. Color/Text/Effect styles oluştur

**10-25 dakika:** Master Components
3. Master componentleri oluştur:
   - HeaderCard (5 dk)
   - MetricCard (3 dk)
   - EmptyStateCard (2 dk)
   - Sidebar (5 dk)
   - JobCard (3 dk)
   - ChatList/ChatWindow (5 dk)

**25-40 dakika:** Instance Swap & QA
4. Her sayfada instance swap yap (10 dk)
5. Design Lint çalıştır, fix yap (3 dk)
6. Mobile preview kontrol (2 dk)

---

## 1️⃣5️⃣ TROUBLESHOOTING & Notes

### Problem: Instance swap sonrası Auto Layout bozuldu
**Çözüm:** Children'ı seç → Right-click → "Add Auto Layout"

### Problem: Spacing issues after swap
**Çözüm:** Parent container → "Hug contents" vs "Fill container" constraints kontrol et

### Problem: Gradient consistency
**Çözüm:** Gradient stops'larda Color Styles kullan (tekrar uygula)

### Problem: Text styles override edildi
**Çözüm:** Text seç → Text Styles panel → ilgili style tekrar uygula

### Problem: Component resize olmuyor
**Çözüm:** Component constraints kontrol et → "Scale" yerine "Left & Right" kullan

---

## 1️⃣6️⃣ HANDOFF CHECKLIST

### Tasarımcı → Developer'a Gönderilecekler:

- [ ] Figma file link (dev mode açık)
- [ ] Token mapping table (Figma Style → CSS variable)
- [ ] Component naming guide
- [ ] Responsive breakpoint notes
- [ ] Before/After screenshots (optional)
- [ ] `/styles/tokens.css` dosyası (zaten mevcut)
- [ ] Bu Figma Edit Pack document

---

## 📧 EMAIL TEMPLATE (UX Ekibine Gönder)

```
Konu: Workigom Design System - Figma Edit Pack

Merhaba [İsim],

Workigom için Design Token sistemi ve Master Component yapısı hazır. 
Figma'da 20-40 dakikada uygulayabileceğiniz adım adım rehber ekliyorum.

📎 Dosya: FIGMA_EDIT_PACK.md

Yapılacaklar:
1. Design Tokens oluştur (Color/Text/Effect Styles)
2. Master Component'leri oluştur
3. Instance swap ile sayfalara uygula
4. QA checklist çalıştır

Frontend kodunda token sistemi zaten hazır (/styles/tokens.css).
Figma ile senkronize çalışmak için bu rehberi takip edebilirsiniz.

Sorularınız varsa ulaşabilirsiniz!

[İmza]
```

---

## ✅ QUICK REFERENCE

### Most Used Values:
```
Container Left: 24px
Max Width: 1280px
Sidebar Width: 260px
Card Gutter: 16px
Card Padding: 18px
Button Height: 44-48px

Radius: 8px, 12px, 20px
Shadow: elevation-1, elevation-2
```

### Primary Colors:
```
Turquoise: #4DD0E1
Pink: #FF80AB
Lavender: #B39DDB
Cream: #FFF9E6
```

---

**Created:** November 2025  
**Version:** 1.0.0  
**Theme:** Sevimli & Eğlenceli 🎨  
**Status:** ✅ Ready for Implementation
