# 🤖 FIGMA AI PROMPTS — Workigom Design Token & Component Implementation

**Otomatik Figma Design System Kurulumu**

---

## 📖 Kullanım Talimatları

### Nasıl Kullanılır:
1. Her prompt'u **sırasıyla** Figma AI sohbetine yapıştırın
2. Her adımın tamamlanmasını bekleyin
3. Sonucu kontrol edin
4. Bir sonraki prompt'a geçin

### NOT:
- ⚠️ Eğer bir adım otomatik uygulanamıyorsa Figma AI size element path veya öneri verecektir
- 📝 Bu path'leri kullanarak manuel düzeltme yapın
- ✅ Her adımın sonunda Figma AI'den onay istenir

---

## 🎯 PROMPT SEQUENCE (21 Adım)

### PHASE 1: SETUP & TOKENS (Adım 1-5)

---

#### ✅ PROMPT 1: Hazırlık — Design Tokens Sayfası Oluştur

```
Yeni bir Page aç ve adını 'Design Tokens & Components' koy. Bu page içinde üç frame oluştur: 'Color Styles', 'Text Styles', 'Effects & Radii'. İşlem tamamlandığında 'Done: Design Tokens page created' yaz ve oluşturulan frame'lerin linklerini veya isimlerini listele. Adımı tamamladığını gösteren kısa bir özet ve varsa hata/uyarı öğelerinin listesi ile cevap ver.
```

**Expected Output:**
```
Done: Design Tokens page created

Created frames:
- Color Styles
- Text Styles
- Effects & Radii

No errors or warnings.
```

**Manual Fallback:**
- Figma → Pages → + → "Design Tokens & Components"
- Frame tool (F) → 3 frames oluştur
- İsimleri manuel olarak değiştir

---

#### ✅ PROMPT 2: Renk Stillerini Oluştur

```
Design Tokens > Color Styles frame'ine şu Color Styles'ları sırayla ekle (her birini ayrı style olarak oluştur):
- Turquoise — #4DD0E1
- Primary-Dark — #2AB0B4
- Pink — #FF80AB
- Lavender — #B39DDB
- Lavender-Overlay — rgba(179,157,219,0.08)
- Lemon — #FFF176
- Cream — #FFF9E6
- Surface — #FFFFFF
- Bg — #F6F7FB
- Text-Strong — #0B1220
- Text-Muted — #6B7280

Her style eklendikten sonra 'Added: <style-name>' şeklinde kısa onay ver. Tamamlandığında hepsinin bir listesini göster. Adımı tamamladığını gösteren kısa bir özet ve varsa hata/uyarı öğelerinin listesi ile cevap ver.
```

**Expected Output:**
```
Added: Turquoise (#4DD0E1)
Added: Primary-Dark (#2AB0B4)
Added: Pink (#FF80AB)
Added: Lavender (#B39DDB)
Added: Lavender-Overlay (rgba(179,157,219,0.08))
Added: Lemon (#FFF176)
Added: Cream (#FFF9E6)
Added: Surface (#FFFFFF)
Added: Bg (#F6F7FB)
Added: Text-Strong (#0B1220)
Added: Text-Muted (#6B7280)

Total: 11 Color Styles created
No errors or warnings.
```

**Manual Fallback:**
- Rectangle oluştur
- Fill rengi seç
- Right panel → 4 dots → "Create style"
- İsmi gir → Create

**Verification:**
- Right panel → Local styles → 11 color style görünmeli

---

#### ✅ PROMPT 3: Tipografi Stillerini Oluştur

```
Design Tokens > Text Styles frame'ine şu Text Styles'ları oluştur:
- PageTitle — 22px / 600 / line-height 28px (font: Poppins veya Quicksand)
- SectionTitle — 18px / 600 / lh 24px
- CardTitle — 16px / 600 / lh 20px
- Body14 — 14px / 400 / lh 20px
- Small12 — 12px / 400 / lh 16px
- SidebarItem — 14px / 500 / lh 20px

Her oluşturma sonrası onayla ve finalde tüm text style isimlerini göster. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
Added: PageTitle (22px/600/28px - Poppins)
Added: SectionTitle (18px/600/24px)
Added: CardTitle (16px/600/20px)
Added: Body14 (14px/400/20px)
Added: Small12 (12px/400/16px)
Added: SidebarItem (14px/500/20px)

Total: 6 Text Styles created
No errors or warnings.
```

**Manual Fallback:**
- Text tool (T) → sample text yaz
- Right panel → Text → font/size/weight ayarla
- 4 dots → "Create style"
- İsmi gir → Create

**Verification:**
- Right panel → Local styles → 6 text style görünmeli

---

#### ✅ PROMPT 4: Radii ve Efekt Stillerini Oluştur

```
Design Tokens > Effects & Radii frame'inde şunları style olarak oluştur:
- radius-sm = 8px
- radius-md = 12px
- radius-lg = 20px
- elevation-1: shadow 0px 6px 20px rgba(11,18,30,0.06)
- elevation-2: shadow 0px 10px 30px rgba(11,18,30,0.08)

Oluşturduktan sonra 'Radii & Effects created' ve eklenen stilleri listele. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
Radii & Effects created:

Radii (documented):
- radius-sm: 8px
- radius-md: 12px
- radius-lg: 20px

Effect Styles:
- elevation-1: 0px 6px 20px rgba(11,18,30,0.06)
- elevation-2: 0px 10px 30px rgba(11,18,30,0.08)

Total: 3 radius values + 2 effect styles
No errors or warnings.
```

**Manual Fallback:**

**For Radius:**
- Rectangle oluştur
- Right panel → Border radius → değer gir
- Not: Radius'u style olarak kaydedemezsiniz, dokümante edin

**For Effects:**
- Rectangle oluştur
- Right panel → Effects → + → Drop shadow
- Values: X0, Y6, Blur20, Color rgba(11,18,30,0.06)
- 4 dots → "Create style"

**Verification:**
- Local styles → 2 effect style görünmeli

---

#### ✅ PROMPT 5: Grid ve Container Kuralını Not Al

```
Proje genelinde kullanılmak üzere şu layout tokenlarını bir 'Tokens Note' objesi halinde oluştur ve Design Tokens sayfasına ekle:
- container-left = 24px
- content-max-width = 1280px
- grid-gutter = 16px
- card-min-height = 96px

Ekleme sonrası 'Layout tokens added' bildirimi ver. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
Layout tokens added:

- container-left: 24px
- content-max-width: 1280px
- grid-gutter: 16px
- card-min-height: 96px

Created as annotation/text note in Design Tokens page.
No errors or warnings.
```

**Manual Fallback:**
- Text tool (T)
- Şu metni yazın:
```
LAYOUT TOKENS
container-left: 24px
content-max-width: 1280px
grid-gutter: 16px
card-min-height: 96px
```

---

### PHASE 2: MASTER COMPONENTS (Adım 6-12)

---

#### ✅ PROMPT 6: Master Component - Sidebar

```
Yeni bir Master Component oluştur: 'Sidebar - Main'
- Frame genişliği 260px, background = Cream style
- Padding: 24px 16px
- İçindeki bir SidebarItem component şablonu oluştur: Auto Layout horizontal, spacing 12px, icon 20px, text style = SidebarItem
- Active state için bir variant oluştur: background = linear-gradient(Turquoise → Lavender) ve border-radius = radius-lg

Component oluşturulduğunda 'Created: Sidebar - Main' ve komponent linkini ver. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
Created: Sidebar - Main

Specifications:
- Width: 260px
- Background: Cream (color style)
- Padding: 24px 16px
- SidebarItem: Auto Layout, 12px spacing, 20px icon
- Variants: Default, Active (gradient bg)

Component link: [Link or path]
No errors or warnings.
```

**Manual Fallback:**
1. Frame oluştur (260px width)
2. Fill → Cream color style
3. Padding → 24px top/bottom, 16px left/right
4. SidebarItem:
   - Auto Layout horizontal
   - Icon 20x20 + Text (SidebarItem style)
   - Spacing 12px
5. Component → Create component
6. Add variant → Active
7. Active variant → gradient fill

---

#### ✅ PROMPT 7: Master Component - PageHeader

```
Yeni Master Component oluştur: 'PageHeader'
- Height 88px, padding-left = container-left, background = linear-gradient(Primary-Dark → slightly darker overlay), text style = PageTitle
- Border-radius bottom corners = radius-md
- Uygulanabilir olarak PageHeader'in bir variant'ı 'compact' (height 72px, PageTitle 20px) oluştur

Oluşturunca 'Created: PageHeader' ve variant'ları listele. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
Created: PageHeader

Specifications:
- Height: 88px
- Padding-left: 24px
- Background: gradient (Primary-Dark)
- Text: PageTitle style
- Bottom radius: 12px

Variants:
- Default (88px height)
- Compact (72px height, 20px title)

No errors or warnings.
```

**Manual Fallback:**
1. Frame 88px height
2. Fill → gradient (Primary-Dark + darker)
3. Padding left 24px
4. Text → PageTitle style
5. Border radius → bottom 12px
6. Create component
7. Add variant → Compact

---

#### ✅ PROMPT 8: Master Component - HeaderCard

```
Yeni Master Component oluştur: 'HeaderCard'
- Padding 18px, radius = radius-md, background = linear-gradient(Turquoise → Primary-Dark → Lavender-Overlay as subtle stop)
- Effect = elevation-2
- İçine: büyük başlık (PageTitle), alt açıklama (Body14), search/cta slot'u (placeholder)

Oluşturulduğunu onayla ve component linkini paylaş. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
Created: HeaderCard

Specifications:
- Padding: 18px
- Radius: 12px (radius-md)
- Background: gradient (Turquoise → Primary-Dark → Lavender-Overlay)
- Effect: elevation-2
- Content: Title (PageTitle) + Description (Body14) + CTA slot

Component link: [Link]
No errors or warnings.
```

---

#### ✅ PROMPT 9: Master Component - MetricCard

```
Yeni Master Component oluştur: 'MetricCard'
- Auto Layout vertical, padding 18px, min-height = card-min-height, radius = radius-md, background = Surface (veya parametre ile Cream)
- Effect = elevation-1
- İçerik: small icon + title (CardTitle) + main value (20–22px semibold)

Create component ve örnek instance göster. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
Created: MetricCard

Specifications:
- Auto Layout: vertical
- Padding: 18px
- Min-height: 96px
- Radius: 12px
- Background: Surface (color style)
- Effect: elevation-1
- Content: Icon (32px) + Title (CardTitle) + Value (22px/600)

Example instance created.
No errors or warnings.
```

---

#### ✅ PROMPT 10: Master Component - EmptyStateCard

```
Yeni Master Component oluştur: 'EmptyStateCard'
- Padding 24px, radius-md, background = Surface, border = 1px dashed rgba(107,114,128,0.06), effect = elevation-1
- İçerik: icon (48px centered), title (CardTitle), body (Body14, Text-Muted)

Create component ve örnek instance göster. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
Created: EmptyStateCard

Specifications:
- Padding: 24px
- Radius: 12px
- Background: Surface
- Border: 1px dashed (muted)
- Effect: elevation-1
- Content: Icon (48px) + Title (CardTitle) + Body (Body14, muted)

Example instance created.
No errors or warnings.
```

---

#### ✅ PROMPT 11: Master Component - JobCard & Badge

```
Yeni Master Component oluştur: 'JobCard'
- Padding 16px, radius = radius-md, effect = elevation-1
- Layout: Title (CardTitle), meta row (icons+meta), badge slot top-right (Badge component)

Ayrıca küçük bir 'Badge' master component oluştur (radius-lg, small pill) — default background Pink, text white.

Oluşturma sonrası 'JobCard and Badge created' bildir. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
JobCard and Badge created

JobCard specifications:
- Padding: 16px
- Radius: 12px
- Effect: elevation-1
- Layout: Title + Meta row + Badge slot

Badge specifications:
- Shape: Pill (radius-lg: 20px)
- Background: Pink
- Text: White, Small12 style

No errors or warnings.
```

---

#### ✅ PROMPT 12: Chat Components - ChatList & ChatWindow

```
Chat için iki master component oluştur:
- 'ChatList' : width fixed 320px, list item template (avatar 40px, title CardTitle, preview Body14)
- 'ChatWindow' : message bubble styles: incoming (background Surface, radius 14px), outgoing (background Primary-Dark, white text, radius 14px). Composer area: height 56px, input radius-md, send button primary pill.

Oluşturulduğunda 'Chat components created' diyip örnek görünümü göster. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
Chat components created

ChatList:
- Width: 320px (fixed)
- Item: Avatar (40px) + Title (CardTitle) + Preview (Body14)

ChatWindow:
- Incoming bubble: Surface bg, 14px radius
- Outgoing bubble: Primary-Dark bg, white text, 14px radius
- Composer: 56px height, radius-md input, primary send button

Example instances created.
No errors or warnings.
```

---

### PHASE 3: INSTANCE SWAP & APPLY (Adım 13-15)

---

#### ✅ PROMPT 13: Swap Instances — Otomatik Değiştir

```
Tüm dosyada (her page) Master component'leri kullanarak mevcut elementleri Swap Instance ile değiştir:
- Page listesi: Landing, Profile, Dashboard, İş İlanları, İşlerim, Bildirimler, Mesajlar
- Header bölümlerini PageHeader veya HeaderCard ile değiştir
- Tüm istatistik kutularını MetricCard ile değiştir
- Boş-alan gösterimleri için EmptyStateCard kullan
- Tüm ilan listelerini JobCard ile değiştir

Her sayfa için swap sırasında oluşan hataları veya override'ları raporla. Adım bittiğinde 'Swap completed for N pages' yaz. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
Swap completed for 7 pages

Landing:
- Header → HeaderCard (swapped)
- CTA cards → Custom (kept)

Profile:
- Header → HeaderCard (swapped)
- Stats → 3x MetricCard (swapped)

Dashboard:
- Header → PageHeader (swapped)
- Stats → 4x MetricCard (swapped)

İş İlanları:
- Header → PageHeader (swapped)
- Job listings → 12x JobCard (swapped)
- Empty state → EmptyStateCard (swapped)

İşlerim:
- Header → PageHeader (swapped)
- Job cards → 8x JobCard (swapped)

Bildirimler:
- Empty state → EmptyStateCard (swapped)

Mesajlar:
- Chat list → ChatList (swapped)
- Conversation → ChatWindow (swapped)

Total swapped: 45 instances
Overrides: Text content, icons (preserved)
Errors: None
```

**Manual Fallback:**
1. Select element
2. Right-click → Swap instance
3. Choose master component
4. Verify text/icon overrides

---

#### ✅ PROMPT 14: Text & Color Styles Uygula

```
Tüm metinleri seç ve uygun Text Styles ile eşleştir:
- Büyük başlıklar → PageTitle
- Bölüm başlıkları → SectionTitle
- Kart başlıkları → CardTitle
- Body metinleri → Body14

Ayrıca tüm renk dolumlarını ve gradient stoplarını Color Styles ile eşleştir (hard-coded renkleri Color Styles'a bağla). Yapılan değişiklikleri özetle. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
Text & Color Styles applied

Text Styles:
- PageTitle: 12 instances
- SectionTitle: 18 instances
- CardTitle: 45 instances
- Body14: 120 instances
- Small12: 34 instances

Color Styles:
- Turquoise: 28 instances
- Pink: 15 instances
- Lavender: 10 instances
- Cream: 35 instances
- Surface: 50 instances

Hard-coded colors replaced: 45
Gradient stops updated: 12

No errors or warnings.
```

---

#### ✅ PROMPT 15: Auto Layout & Spacing Normalize

```
Tüm ana container'lar ve kartlar için Auto Layout ayarlarını normalize et:
- Kart padding = 18px
- Card grid gutter = 16px
- Vertical stack spacing = 12px
- Container-left = 24px apply

Auto Layout hatalarını raporla ve düzeltme önerisi yaz. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
Auto Layout normalized

Applied:
- Card padding: 18px (42 cards)
- Grid gutter: 16px (8 grids)
- Vertical spacing: 12px (25 stacks)
- Container-left: 24px (7 pages)

Errors found: 3
1. Profile page > Stats grid: gutter was 20px → fixed to 16px
2. Dashboard > Card stack: spacing was 24px → fixed to 12px
3. İş İlanları > Container: left was 16px → fixed to 24px

All errors corrected.
No warnings.
```

---

### PHASE 4: QA & VERIFICATION (Adım 16-18)

---

#### ✅ PROMPT 16: Run Design Lint & Fix

```
Design Lint plugin çalıştır (veya style check):
- Hard-coded renkler, unstyled text, unmatched radii, missing effects tespit et.
- Her hata için dosya/çerçeve/element path'ini ver ve otomatik olarak düzeltilebilenleri uygula (color/text styles eşleştir). 

Bir rapor üret: total checks, fixed X, remaining Y with list. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
Design Lint Report

Total checks: 245
Fixed: 38
Remaining: 2

Fixed issues:
- Hard-coded colors: 22 (replaced with Color Styles)
- Unstyled text: 12 (applied Text Styles)
- Missing effects: 4 (added elevation-1)

Remaining issues:
1. Landing > Hero section > Icon color #FF5722 (not in palette)
   → Suggestion: Replace with Pink (#FF80AB)
   
2. Profile > Avatar border: hard-coded #E0E0E0
   → Suggestion: Create new style or use Text-Muted

Manual fix required for remaining 2 issues.
```

---

#### ✅ PROMPT 17: Mobile/Responsive Preview Kontrolü

```
Her ana sayfayı iPhone ve Tablet önizlemede test et:
- <1024px: PageHeader height -> 72px, sidebar -> icon-only or collapse
- <768px: sidebar hidden, floating toolbar hidden, card grid -> single column

Görünümde örtüşme veya taşma varsa listede göster ve her sorun için 1-2 cümle öneri yaz. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
Responsive preview tested

iPhone (375px):
✅ Landing: OK
✅ Profile: OK
⚠️  Dashboard: Stats cards overlap
   → Suggestion: Change grid to single column
✅ İş İlanları: OK
✅ İşlerim: OK
✅ Bildirimler: OK
⚠️  Mesajlar: ChatList too wide
   → Suggestion: Set ChatList width to 100% on mobile

Tablet (768px):
✅ All pages: OK
✅ Sidebar: Collapsed to icon-only
✅ PageHeader: Compact variant applied

Issues found: 2 (Dashboard, Mesajlar)
Suggestions provided.
```

---

#### ✅ PROMPT 18: Final QA Checklist Uygulaması

```
Aşağıdaki QA checklist'i otomatik kontrol et ve raporla:
- Color Styles: tüm sayfalarda kullanılıyor mu?
- Text Styles: tüm metinlerde uygulanmış mı?
- Effects: metric/header/summary card'larda elevation-1 veya elevation-2 var mı?
- Radii: tüm kartlar radius-md mi kullanıyor?
- EmptyStateCard: tüm boş durumlarda aynı component kullanılıyor mu?
- Sidebar: width 260px ve active pill aynı mı?

Her maddenin sonucu PASS/FAIL olarak listelensin. FAIL olanlara düzeltme adımı öner. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
QA Checklist Results

✅ PASS: Color Styles used on all pages (11/11 styles applied)
✅ PASS: Text Styles applied to all text (6/6 styles used)
✅ PASS: Effects applied (elevation-1: 42 cards, elevation-2: 8 headers)
✅ PASS: Radii consistent (radius-md: 50 cards)
✅ PASS: EmptyStateCard used in all empty states (3 instances)
✅ PASS: Sidebar width 260px, active pill consistent (7 pages)

Total: 6/6 PASS
No failures.
Implementation complete! ✨
```

---

### PHASE 5: DOCUMENTATION & EXPORT (Adım 19-21)

---

#### ✅ PROMPT 19: Export Değişiklik Listesi

```
Yapılan tüm değişiklikleri sıralı bir 'Change Log' olarak çıkart:
- Hangi page'te hangi component swap edildi (ör. Profile: HeaderCard swapped, 3 MetricCard swapped)
- Hangi Color/Text/Effect style eklendi
- Kaç instance güncellendi

Change Log'u markdown formatında ver ve dosya adı 'FIGMA_CHANGES_LOG.md' olsun. Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
FIGMA_CHANGES_LOG.md created

# Figma Design System - Change Log

## Color Styles (11 added)
- Turquoise (#4DD0E1)
- Primary-Dark (#2AB0B4)
- Pink (#FF80AB)
- Lavender (#B39DDB)
- Lavender-Overlay (rgba(179,157,219,0.08))
- Lemon (#FFF176)
- Cream (#FFF9E6)
- Surface (#FFFFFF)
- Bg (#F6F7FB)
- Text-Strong (#0B1220)
- Text-Muted (#6B7280)

## Text Styles (6 added)
- PageTitle (22px/600/28px)
- SectionTitle (18px/600/24px)
- CardTitle (16px/600/20px)
- Body14 (14px/400/20px)
- Small12 (12px/400/16px)
- SidebarItem (14px/500/20px)

## Master Components (7 created)
- Sidebar - Main (2 variants)
- PageHeader (2 variants)
- HeaderCard
- MetricCard
- EmptyStateCard
- JobCard
- Badge
- ChatList
- ChatWindow

## Instance Swaps by Page

### Landing
- HeaderCard: 1 swapped

### Profile
- HeaderCard: 1 swapped
- MetricCard: 3 swapped

### Dashboard
- PageHeader: 1 swapped
- MetricCard: 4 swapped

### İş İlanları
- PageHeader: 1 swapped
- JobCard: 12 swapped
- EmptyStateCard: 1 swapped

### İşlerim
- PageHeader: 1 swapped
- JobCard: 8 swapped

### Bildirimler
- EmptyStateCard: 1 swapped

### Mesajlar
- ChatList: 1 swapped
- ChatWindow: 1 swapped

## Total Changes
- Color Styles: 11
- Text Styles: 6
- Effect Styles: 2
- Master Components: 9
- Instance Swaps: 45
- Auto Layout normalizations: 75
- Hard-coded values replaced: 45

Change log complete.
```

---

#### ✅ PROMPT 20: Developer Handoff Paketi Oluştur

```
Developer handoff için tek bir paket hazırla:
- FIGMA_README.md (kısa notlar ve token mapping)
- tokens listesi (Color & Text & Effects)
- Örnek CSS snippet'leri (tokens -> CSS variable mapping)
- Export: her master component için component name + layer path + usage notes (kopyala-yapıştır için)

Bu paketi tek bir ZIP-like manifest halinde listeler gibi göster (link veremiyorsan dosya içerik özetini markdown olarak sun). Adımı tamamladığını gösteren kısa bir özet ile cevap ver.
```

**Expected Output:**
```
Developer Handoff Package created

FIGMA_README.md
───────────────────────────────────────
# Workigom Design System - Figma Handoff

## Token Mapping

### Colors
| Figma Style | CSS Variable | Value |
|-------------|--------------|-------|
| Turquoise | --color-turquoise | #4DD0E1 |
| Primary-Dark | --color-turquoise-dark | #2AB0B4 |
| Pink | --color-pink | #FF80AB |
| Lavender | --color-lavender | #B39DDB |
| Cream | --color-cream | #FFF9E6 |
| Surface | --color-surface | #FFFFFF |
| Text-Strong | --text-strong | #0B1220 |
| Text-Muted | --text-muted | #6B7280 |

### Typography
| Figma Style | CSS |
|-------------|-----|
| PageTitle | 22px/600/28px Poppins |
| CardTitle | 16px/600/20px Poppins |
| Body14 | 14px/400/20px Poppins |

### Effects
| Figma Style | CSS |
|-------------|-----|
| elevation-1 | 0 6px 20px rgba(11,18,30,0.06) |
| elevation-2 | 0 10px 30px rgba(11,18,30,0.08) |

## Master Components

1. **Sidebar - Main**
   - Path: Design Tokens & Components > Sidebar - Main
   - Usage: Navigation sidebar
   - Variants: Default, Active

2. **HeaderCard**
   - Path: Design Tokens & Components > HeaderCard
   - Usage: Profile/dashboard banners
   
3. **MetricCard**
   - Path: Design Tokens & Components > MetricCard
   - Usage: Stats/metric displays

... (full list)

## CSS Snippets

```css
:root {
  --color-turquoise: #4DD0E1;
  --color-turquoise-dark: #2AB0B4;
  --color-pink: #FF80AB;
  --color-lavender: #B39DDB;
  --color-cream: #FFF9E6;
  --color-surface: #FFFFFF;
  
  --radius-md: 12px;
  --elevation-1: 0 6px 20px rgba(11,18,30,0.06);
}
```

Package manifest complete.
Export as single document or separate files as needed.
```

---

#### ✅ PROMPT 21: Son Rapor ve Onay İsteği

```
Tüm adımları tamamladın mı? Eğer tamamlandıysa:
- Kısa bir özet ver: kaç style eklendi, kaç master component yaratıldı, kaç instance swap edildi, QA sonuçları (PASS/FAIL).
- Eğer hala açık kalan sorunlar varsa listele ve önceliklendirilmiş düzeltme adımlarını sırala.

Ardından 'Tamamlandı' veya 'Eksikler var' şeklinde net bir cevap ver.
```

**Expected Output:**
```
✅ TAMAMLANDI

Implementation Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STYLES CREATED:
- Color Styles: 11
- Text Styles: 6
- Effect Styles: 2
- Total: 19 styles

MASTER COMPONENTS:
- Created: 9 components
- Variants: 4 (Sidebar, PageHeader variations)
- Total: 9 components

INSTANCE SWAPS:
- Total swaps: 45 instances
- Pages updated: 7
- Success rate: 100%

AUTO LAYOUT:
- Normalized: 75 elements
- Spacing fixes: 12
- Padding corrections: 30

QA RESULTS:
✅ Color Styles: PASS
✅ Text Styles: PASS
✅ Effects: PASS
✅ Radii: PASS
✅ Components: PASS
✅ Sidebar: PASS

REMAINING ISSUES: 2 (minor)
1. Landing > Hero icon color (manual fix needed)
2. Profile > Avatar border (create new style)

PRIORITY FIXES:
1. [LOW] Update hero icon to Pink
2. [LOW] Create avatar border style

STATUS: ✅ READY FOR HANDOFF

All critical tasks complete.
Design system implementation successful! 🎉
```

---

## 📋 QUICK REFERENCE

### Prompt Sequence Summary:
```
1-5:   Setup & Tokens
6-12:  Master Components
13-15: Instance Swap & Apply
16-18: QA & Verification
19-21: Documentation & Export
```

### Expected Timeline:
- **Phase 1:** 15-20 minutes
- **Phase 2:** 30-40 minutes
- **Phase 3:** 20-30 minutes
- **Phase 4:** 15-20 minutes
- **Phase 5:** 10-15 minutes
**Total:** ~90-125 minutes (1.5-2 hours)

---

## 🐛 Troubleshooting

### If Figma AI Can't Complete a Step:

**Option 1: Retry**
```
Retry the previous step with more specific instructions:
[Paste prompt again with added details]
```

**Option 2: Manual Fallback**
- Follow "Manual Fallback" instructions in each prompt section
- Document what was done manually
- Continue to next prompt

**Option 3: Skip & Mark**
```
Mark this step as "Manual" and proceed to next prompt.
I will complete this step manually after AI sequence.
Continue with next prompt: [number]
```

---

## ✅ Verification Checklist

After completing all prompts:

- [ ] Design Tokens page exists
- [ ] 11 Color Styles created
- [ ] 6 Text Styles created
- [ ] 2 Effect Styles created
- [ ] 9 Master Components created
- [ ] 45+ instances swapped
- [ ] Auto Layout normalized
- [ ] Design Lint: 0 critical errors
- [ ] Responsive preview checked
- [ ] QA checklist: 6/6 PASS
- [ ] Change log exported
- [ ] Developer handoff package ready

---

## 📧 After Completion

**Send to Developer:**
- Figma file link (Dev Mode enabled)
- FIGMA_CHANGES_LOG.md
- FIGMA_README.md (from prompt 20)
- Token mapping table

**Send to Stakeholders:**
- Before/after screenshots
- Implementation summary
- QA results

---

**Created:** November 2025  
**Version:** 1.0.0  
**Status:** ✅ Ready for AI Execution  
**Estimated Time:** 90-125 minutes
