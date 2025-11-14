# 🎨 Workigom Figma Design System - Documentation Hub

**Figma Implementation Paketinin Merkez Dökümanı**

---

## 📚 Dokümantasyon Haritası

### 🚀 Hızlı Başlangıç
```
1. FIGMA_EDIT_PACK.md oku (20 dk)
2. FIGMA_TASKS.md'deki task'ları takip et
3. Tamamlandığında FIGMA_HANDOFF_EMAIL.md'deki template'i kullan
```

---

## 📁 Dosya Yapısı

### 1️⃣ **FIGMA_EDIT_PACK.md** 
**📘 Ana Rehber - Component-by-Component**

**İçerik:**
- Setup & token oluşturma (Color, Text, Effect Styles)
- Master component oluşturma (Sidebar, Cards, Buttons, etc.)
- Instance swap adımları
- Responsive design kuralları
- QA checklist
- Developer handoff guide

**Kim kullanmalı:** UX Designer  
**Süre:** 20-40 dakika  
**Format:** Step-by-step guide

**Kullanım:**
```bash
# 1. Dosyayı aç
open FIGMA_EDIT_PACK.md

# 2. Section 1-4: Token'ları oluştur
# 3. Section 6: Master component'leri oluştur
# 4. Section 7: Instance swap yap
# 5. Section 10: QA checklist çalıştır
```

---

### 2️⃣ **FIGMA_TASKS.md**
**📋 Task List - Jira/Trello/Asana Ready**

**İçerik:**
- 25 ayrı task (story points ile)
- 5 phase (Setup, Components, Swap, QA, Handoff)
- Her task için:
  - Time estimate
  - Description
  - Acceptance criteria
  - Reference links

**Kim kullanmalı:** UX Designer, Project Manager  
**Süre:** Track olarak kullanılır  
**Format:** Checklist with acceptance criteria

**Kullanım:**
```bash
# Jira/Trello'ya import edilebilir
# Her task ayrı bir issue/card olarak eklenebilir
# Epic: "Design System Token Implementation" (13 story points)
```

**Progress Tracking:**
```
Phase 1: Setup & Tokens          [░░░░░░░░░░] 0/4 tasks
Phase 2: Master Components       [░░░░░░░░░░] 0/7 tasks
Phase 3: Instance Swap & Apply   [░░░░░░░░░░] 0/6 tasks
Phase 4: QA & Responsive         [░░░░░░░░░░] 0/5 tasks
Phase 5: Documentation & Handoff [░░░░░░░░░░] 0/3 tasks
```

---

### 3️⃣ **FIGMA_HANDOFF_EMAIL.md**
**📧 Email Templates - Ready to Send**

**İçerik:**
- 5 farklı email template:
  1. Initial kick-off (UX'e)
  2. Mid-progress check-in (Takıma)
  3. Final handoff (Developer'lara)
  4. Quick Slack message
  5. Stakeholder update

**Kim kullanmalı:** Project Manager, UX Lead  
**Süre:** 5 dakika (template copy-paste)  
**Format:** Copy-paste ready email bodies

**Kullanım:**
```bash
# Template seç, kopyala, özelleştir, gönder
# [Placeholder]'ları doldur
# Links ve attachments ekle
```

---

### 4️⃣ **FIGMA_README.md** (Bu Dosya)
**🗺️ Navigation Hub**

**İçerik:**
- Tüm Figma dokümanlarının haritası
- Hızlı başlangıç yolu
- Kullanım senaryoları
- FAQ

---

## 🎯 Kullanım Senaryoları

### Senaryo 1: "Figma'yı token sistemine geçirmek istiyorum"
```
1. FIGMA_EDIT_PACK.md aç
2. Section 1-4: Token setup (30 dk)
3. Section 6: Master components (40 dk)
4. Section 7: Instance swap (30 dk)
5. Section 10: QA (20 dk)
Toplam: ~2 saat
```

### Senaryo 2: "Task'lara bölüp Jira'ya eklemek istiyorum"
```
1. FIGMA_TASKS.md aç
2. Her task'ı Jira'ya issue olarak ekle
3. Epic oluştur: "Design System Token Implementation"
4. Story points ata (toplam 13)
5. Sprint'e ekle
```

### Senaryo 3: "Developer'lara handoff yapmak istiyorum"
```
1. FIGMA_HANDOFF_EMAIL.md aç
2. Template 3 seç (Final Handoff to Developers)
3. [Placeholder]'ları doldur
4. Figma link + token mapping attach et
5. Gönder
```

### Senaryo 4: "Stakeholder'lara güncelleme vermek istiyorum"
```
1. FIGMA_HANDOFF_EMAIL.md aç
2. Template 5 seç (Stakeholder Update)
3. Screenshots ekle
4. Business value vurgula
5. Gönder
```

---

## 🔗 İlgili Dokümanlar (Frontend)

Figma implementasyonu frontend token sistemi ile senkronize:

### Frontend Token Files:
- `/styles/tokens.css` - CSS variables (matching Figma styles)
- `/styles/components.css` - Component styles
- `/styles/globals.css` - Global styles

### Frontend Documentation:
- `/DESIGN_SYSTEM.md` - Full design system guide
- `/QUICK_START.md` - 5-minute quick start
- `/IMPLEMENTATION_CHECKLIST.md` - Implementation steps
- `/components/examples/` - React component examples

### Mapping:
```
Figma Color Style "Turquoise" → CSS --color-turquoise: #4DD0E1
Figma Text Style "CardTitle"  → CSS 16px/600/Poppins
Figma Effect "elevation-1"    → CSS 0 6px 20px rgba(...)
```

---

## ✅ Quick Checklist

### Before Starting:
- [ ] Figma file access verified
- [ ] Poppins font installed
- [ ] Design Lint plugin installed
- [ ] Contrast plugin installed

### During Implementation:
- [ ] Follow FIGMA_EDIT_PACK.md sections in order
- [ ] Check off tasks in FIGMA_TASKS.md
- [ ] Document any blockers
- [ ] Take before/after screenshots

### After Completion:
- [ ] Run Design Lint (0 errors)
- [ ] Run Contrast check (WCAG AA)
- [ ] Enable Dev Mode
- [ ] Send handoff email (Template 3)
- [ ] Update stakeholders (Template 5)

---

## 📊 Token Summary

### Color Tokens (11):
```
Turquoise, Turquoise-Dark, Pink, Lavender, Lavender-Overlay,
Lemon, Cream, Surface, PageBackground, Text-Strong, Text-Muted
```

### Text Styles (6):
```
PageTitle (22px/600), SectionTitle (18px/600), CardTitle (16px/600),
Body14 (14px/400), Small12 (12px/400), SidebarItem (14px/500)
```

### Effect Styles (2):
```
elevation-1 (Y6 Blur20), elevation-2 (Y10 Blur30)
```

### Radius Values (3):
```
radius-sm (8px), radius-md (12px), radius-lg (20px)
```

### Layout Constants:
```
container-left: 24px
content-max-width: 1280px
card-grid-gutter: 16px
sidebar-width: 260px
```

---

## 🎨 Master Components (7)

1. **Sidebar** (260px, active state pill)
2. **HeaderCard** (gradient, elevation-2)
3. **MetricCard** (min-height 96px, elevation-1)
4. **EmptyStateCard** (dashed border, centered)
5. **JobCard** (hover states, badges)
6. **ChatList & ChatWindow** (message bubbles)
7. **CTA Button** (3 variants)

---

## 📱 Responsive Breakpoints

### < 1024px (Tablet):
- Sidebar: Icon-only or collapsed
- HeaderCard: 72px height
- PageTitle: 20px font size

### < 768px (Mobile):
- Sidebar: Hidden
- Floating toolbar: Hidden
- Grid: Single column
- MetricCard: 80px min-height

---

## 🚀 Implementation Timeline

```
Day 1 (2 hours):
  Morning: Setup & Tokens (Phase 1)
  Afternoon: Master Components (Phase 2, part 1)

Day 2 (2 hours):
  Morning: Master Components (Phase 2, part 2)
  Afternoon: Instance Swap (Phase 3)

Day 3 (1.5 hours):
  Morning: QA & Responsive (Phase 4)
  Afternoon: Documentation & Handoff (Phase 5)

Total: ~5.5 hours
```

---

## 💡 Pro Tips

1. **Start with tokens first** - Color/Text/Effect Styles are foundation
2. **Create master components next** - Don't swap instances until masters are ready
3. **Use Design Lint early** - Catch issues before they multiply
4. **Document as you go** - Screenshot before/after for each component
5. **Test responsive** - Don't wait until the end

---

## 🐛 Common Issues & Solutions

### Issue: "Instance swap breaks layout"
**Solution:** Check parent Auto Layout constraints (Hug vs Fill)

### Issue: "Text styles not applying"
**Solution:** Select text layer directly, reapply Text Style

### Issue: "Gradient colors not using styles"
**Solution:** Reapply Color Style to each gradient stop

### Issue: "Components don't resize properly"
**Solution:** Check constraints → Use "Left & Right" not "Scale"

---

## 📞 Support & Questions

### For Figma Questions:
- Check FIGMA_EDIT_PACK.md troubleshooting section
- Comment in Figma file
- Slack: #design-system channel

### For Frontend Integration:
- Check DESIGN_SYSTEM.md
- Review /styles/tokens.css
- Slack: #design-dev channel

### For Project Management:
- FIGMA_TASKS.md for task breakdown
- Update progress in Jira/Trello
- Weekly sync meetings

---

## 📈 Success Metrics

### Design Quality:
- [ ] Design Lint: 0 errors
- [ ] Contrast: WCAG AA pass
- [ ] Component reuse: >80%

### Developer Experience:
- [ ] Handoff time: <1 hour
- [ ] CSS-Figma sync: 100%
- [ ] Questions/clarifications: <5

### Business Impact:
- [ ] Design-to-dev speed: +50%
- [ ] Consistency score: >90%
- [ ] Time to implement new features: -30%

---

## 🎉 Next Steps After Completion

1. **Expand Library:** Add more components as needed
2. **Documentation Site:** Create component documentation
3. **Dark Mode:** Add dark theme variants (optional)
4. **Animations:** Define animation guidelines
5. **Illustrations:** Add illustration library

---

## 📚 Additional Resources

### Figma Learning:
- [Figma Styles & Variables](https://help.figma.com/hc/en-us/articles/360039957034)
- [Component Best Practices](https://www.figma.com/best-practices/components-styles-and-shared-libraries/)
- [Auto Layout Guide](https://help.figma.com/hc/en-us/articles/360040451373)

### Design System Examples:
- Material Design
- Atlassian Design System
- Shopify Polaris

---

**Created:** November 2025  
**Version:** 1.0.0  
**Status:** ✅ Ready for Implementation  
**Theme:** Sevimli & Eğlenceli 🎨

---

## 🗂️ File Structure Summary

```
/
├── FIGMA_EDIT_PACK.md          ← Main implementation guide
├── FIGMA_TASKS.md              ← Task checklist (Jira ready)
├── FIGMA_HANDOFF_EMAIL.md      ← Email templates
├── FIGMA_README.md             ← This file (navigation hub)
│
├── /styles/
│   ├── tokens.css              ← CSS tokens (matches Figma)
│   ├── components.css          ← Component styles
│   └── globals.css             ← Global styles
│
└── /components/examples/
    └── ExampleComponents.tsx   ← React component examples
```

---

**Quick Links:**
- [Edit Pack](FIGMA_EDIT_PACK.md) | [Tasks](FIGMA_TASKS.md) | [Emails](FIGMA_HANDOFF_EMAIL.md)
- [Design System](DESIGN_SYSTEM.md) | [Quick Start](QUICK_START.md)
