# 🎴 Figma Quick Reference Card

**1-Page Cheat Sheet for Workigom Design System**

---

## 🎨 COLOR TOKENS (11)

| Token | HEX | Usage |
|-------|-----|-------|
| **Turquoise** | `#4DD0E1` | Primary actions |
| **Primary-Dark** | `#2AB0B4` | Hover states |
| **Pink** | `#FF80AB` | Secondary actions |
| **Lavender** | `#B39DDB` | Accents |
| **Lemon** | `#FFF176` | Highlights |
| **Cream** | `#FFF9E6` | Backgrounds |
| **Surface** | `#FFFFFF` | Cards |
| **Bg** | `#F6F7FB` | Page background |
| **Text-Strong** | `#0B1220` | Headings |
| **Text-Muted** | `#6B7280` | Secondary text |
| **Lavender-Overlay** | `rgba(179,157,219,0.08)` | Subtle overlays |

---

## 📝 TEXT STYLES (6)

| Style | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| **PageTitle** | 22px | 600 | 28px | Page headers |
| **SectionTitle** | 18px | 600 | 24px | Section headers |
| **CardTitle** | 16px | 600 | 20px | Card titles |
| **Body14** | 14px | 400 | 20px | Body text |
| **Small12** | 12px | 400 | 16px | Small labels |
| **SidebarItem** | 14px | 500 | 20px | Sidebar text |

**Font:** Poppins (all styles)

---

## 🔲 LAYOUT TOKENS

| Token | Value | Usage |
|-------|-------|-------|
| **container-left** | 24px | Left padding |
| **content-max-width** | 1280px | Max content width |
| **grid-gutter** | 16px | Card spacing |
| **card-min-height** | 96px | Minimum card height |

---

## 🎯 RADII

| Token | Value | Usage |
|-------|-------|-------|
| **radius-sm** | 8px | Small elements |
| **radius-md** | 12px | Cards, inputs |
| **radius-lg** | 20px | Pills, badges |

---

## ✨ EFFECTS

| Style | Value | Usage |
|-------|-------|-------|
| **elevation-1** | `0 6px 20px rgba(11,18,30,0.06)` | Cards |
| **elevation-2** | `0 10px 30px rgba(11,18,30,0.08)` | Headers, floating |

---

## 🧩 MASTER COMPONENTS (9)

### 1. **Sidebar - Main**
- Width: 260px
- Background: Cream
- Padding: 24px/16px
- Variants: Default, Active

### 2. **PageHeader**
- Height: 88px
- Padding-left: 24px
- Gradient: Primary-Dark
- Variants: Default, Compact (72px)

### 3. **HeaderCard**
- Padding: 18px
- Radius: radius-md
- Gradient: Turquoise → Primary-Dark
- Effect: elevation-2

### 4. **MetricCard**
- Padding: 18px
- Min-height: 96px
- Radius: radius-md
- Effect: elevation-1
- Background: Surface/Cream

### 5. **EmptyStateCard**
- Padding: 24px
- Radius: radius-md
- Border: 1px dashed
- Effect: elevation-1
- Content: Icon (48px) + Title + Body

### 6. **JobCard**
- Padding: 16px
- Radius: radius-md
- Effect: elevation-1
- Content: Title + Meta + Badge

### 7. **Badge**
- Radius: radius-lg (pill)
- Background: Pink (default)
- Text: White, Small12

### 8. **ChatList**
- Width: 320px (fixed)
- Item: Avatar (40px) + Title + Preview

### 9. **ChatWindow**
- Incoming: Surface bg, 14px radius
- Outgoing: Primary-Dark bg, white text
- Composer: 56px height

---

## 📱 RESPONSIVE BREAKPOINTS

### Tablet (<1024px)
- PageHeader: 72px height
- Sidebar: Icon-only or collapsed
- PageTitle: 20px

### Mobile (<768px)
- Sidebar: Hidden
- Floating toolbar: Hidden
- Grid: Single column
- MetricCard: 80px min-height

---

## 🎯 FIGMA AI PROMPT SEQUENCE

### Quick Flow (21 Steps):
```
1-5:   Setup & Tokens (15-20 min)
6-12:  Master Components (30-40 min)
13-15: Instance Swap (20-30 min)
16-18: QA & Verification (15-20 min)
19-21: Export & Handoff (10-15 min)

Total: 90-125 minutes
```

---

## ⌨️ KEYBOARD SHORTCUTS

| Action | Shortcut |
|--------|----------|
| Create component | `Ctrl/Cmd + Alt + K` |
| Frame tool | `F` |
| Text tool | `T` |
| Rectangle | `R` |
| Auto Layout | `Shift + A` |
| Swap instance | Right-click → Swap |
| Create style | 4 dots → Create style |

---

## 🔍 QUICK CHECKS

### Before Starting:
- [ ] Figma file open
- [ ] Edit permissions verified
- [ ] Poppins font loaded
- [ ] Backup/version created

### After Each Phase:
- [ ] Check output vs expected
- [ ] Document errors
- [ ] Take screenshots
- [ ] Update tracker

### Before Handoff:
- [ ] Design Lint: 0 errors
- [ ] All styles applied
- [ ] Components published
- [ ] Dev Mode enabled
- [ ] Documentation exported

---

## 💡 COMMON TASKS

### Create Color Style:
1. Rectangle → Fill color
2. 4 dots → Create style
3. Name → Create

### Create Text Style:
1. Text tool → Type
2. Set font/size/weight
3. 4 dots → Create style
4. Name → Create

### Create Component:
1. Select frame/group
2. `Ctrl/Cmd + Alt + K`
3. Name component
4. Publish (if library)

### Swap Instance:
1. Select instance
2. Right-click → Swap instance
3. Choose component
4. Verify overrides

### Apply Auto Layout:
1. Select frame
2. `Shift + A`
3. Set spacing/padding
4. Set constraints

---

## 🐛 TROUBLESHOOTING

### Issue: Style not applying
**Fix:** Select element directly, reapply style

### Issue: Auto Layout broken
**Fix:** Remove Auto Layout, reapply with correct settings

### Issue: Component won't swap
**Fix:** Check if element is instance, try detaching and reconnecting

### Issue: Gradient not using styles
**Fix:** Reapply Color Style to each gradient stop

### Issue: Text override lost
**Fix:** Text overrides preserved after swap, reapply if needed

---

## 📊 CSS MAPPING (Quick Copy)

```css
:root {
  /* Colors */
  --color-turquoise: #4DD0E1;
  --color-turquoise-dark: #2AB0B4;
  --color-pink: #FF80AB;
  --color-lavender: #B39DDB;
  --color-cream: #FFF9E6;
  --color-surface: #FFFFFF;
  
  /* Spacing */
  --container-left: 24px;
  --grid-gutter: 16px;
  
  /* Radius */
  --radius-md: 12px;
  --radius-lg: 20px;
  
  /* Effects */
  --elevation-1: 0 6px 20px rgba(11,18,30,0.06);
  --elevation-2: 0 10px 30px rgba(11,18,30,0.08);
}
```

---

## ✅ QA CHECKLIST

- [ ] 11 Color Styles created
- [ ] 6 Text Styles created
- [ ] 2 Effect Styles created
- [ ] 9 Master Components created
- [ ] 45+ instances swapped
- [ ] Auto Layout normalized
- [ ] Design Lint: 0 critical errors
- [ ] Responsive checked
- [ ] All pages use styles (no hard-coded)
- [ ] Dev handoff package ready

---

## 🎯 SUCCESS METRICS

**Target:**
- Styles: 19/19 (100%)
- Components: 9/9 (100%)
- Instance Swaps: 45+ (100%)
- QA Score: 6/6 PASS
- Design Lint: 0 errors
- Time: <125 minutes

---

## 📧 QUICK LINKS

- **Full Guide:** FIGMA_EDIT_PACK.md
- **AI Prompts:** FIGMA_AI_PROMPTS.md
- **Tracker:** FIGMA_AI_TRACKER.md
- **Tasks:** FIGMA_TASKS.md (Jira ready)
- **Emails:** FIGMA_HANDOFF_EMAIL.md

---

## 🎨 GRADIENT FORMULAS

### Primary Gradient:
```
linear-gradient(90deg, Turquoise 0%, Primary-Dark 100%)
```

### Header Gradient:
```
linear-gradient(135deg, Turquoise 0%, Primary-Dark 50%, Lavender-Overlay 100%)
```

### Active Pill:
```
linear-gradient(90deg, Turquoise 0%, Lavender 100%)
```

---

## 📱 COMPONENT USAGE

| Page | Components Used |
|------|----------------|
| **Landing** | HeaderCard |
| **Profile** | HeaderCard, MetricCard (3x) |
| **Dashboard** | PageHeader, MetricCard (4x) |
| **İş İlanları** | PageHeader, JobCard, EmptyStateCard |
| **İşlerim** | PageHeader, JobCard |
| **Bildirimler** | EmptyStateCard |
| **Mesajlar** | ChatList, ChatWindow |

---

## 🔢 BY THE NUMBERS

```
Color Styles:        11
Text Styles:          6
Effect Styles:        2
Master Components:    9
Component Variants:   4
Layout Tokens:        4
Radius Values:        3
Gradient Formulas:    3
Expected Swaps:      45+
QA Checks:            6
```

---

## ⏱️ TIME ESTIMATES

| Task | Time |
|------|------|
| Single prompt | 2-5 min |
| Phase 1 (Setup) | 15-20 min |
| Phase 2 (Components) | 30-40 min |
| Phase 3 (Swap) | 20-30 min |
| Phase 4 (QA) | 15-20 min |
| Phase 5 (Export) | 10-15 min |
| **Total** | **90-125 min** |

---

**Print this page for quick reference during implementation!**

**Created:** November 2025  
**Version:** 1.0.0  
**Theme:** Sevimli & Eğlenceli 🎨
