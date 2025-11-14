# 📧 Figma Handoff Email Templates

**Ready-to-Send Email Templates for UX Team**

---

## 📨 TEMPLATE 1: Initial Kick-off (To UX Designer)

**Subject:** 🎨 Workigom Design System - Figma Implementation Task

**To:** [UX Designer Name]  
**CC:** [Product Manager], [Lead Developer]  
**Priority:** High

---

**Body:**

Merhaba [İsim],

Workigom projesi için **Design System Token sistemi** hazır durumda. Frontend'de tüm CSS token'ları tanımlandı ve sıra Figma'da tutarlılığı sağlamakta.

### 📦 Teslim Edilen Dökümanlar:

1. **FIGMA_EDIT_PACK.md** - Component-by-component tam uygulama rehberi (20-40 dk)
2. **FIGMA_TASKS.md** - Task-by-task Jira/Trello ready checklist (25 task)
3. **DESIGN_SYSTEM.md** - Kapsamlı design system dokümantasyonu

### 🎯 Hedef:

**"Sevimli & Eğlenceli"** palet korunarak:
- Design Token sistemi (Color, Text, Effect Styles)
- Master Component yapısı (Sidebar, Cards, Buttons, etc.)
- Tutarlı spacing ve layout kuralları
- Responsive component variants

### ⏱ Tahmini Süre:

**Phase 1:** Setup & Tokens (30 dk)  
**Phase 2:** Master Components (40 dk)  
**Phase 3:** Instance Swap (30 dk)  
**Phase 4:** QA & Responsive (30 dk)  
**Phase 5:** Documentation (20 dk)

**Toplam:** ~2-3 saat

### 📋 İlk Adımlar:

1. `FIGMA_EDIT_PACK.md` dosyasını aç
2. Section 1-4: Design Tokens oluştur (Color, Text, Effect Styles)
3. Section 6: Master Component'leri oluştur
4. Section 7: Instance swap yap
5. `FIGMA_TASKS.md`'deki checklist'i takip et

### 🔗 Kaynaklar:

- **Figma File:** [Figma Link Here]
- **Documentation:** `/docs` folder
- **Frontend Tokens:** `/styles/tokens.css` (referans için)

### 📞 Destek:

Sorularınız olursa Slack üzerinden veya email ile ulaşabilirsiniz. İlk 2-3 task'ı bitirdikten sonra kısa bir review toplantısı yapalım.

**Next Check-in:** [Date/Time] - Phase 1 tamamlandıktan sonra

Başarılar! 🚀

---

**[Your Name]**  
[Your Title]  
[Contact Info]

---

## 📨 TEMPLATE 2: Mid-Progress Check-in (To Team)

**Subject:** ✅ Workigom Figma Design System - Progress Update

**To:** [Team Distribution List]  
**CC:** [Stakeholders]

---

**Body:**

Merhaba takım,

Workigom Design System Figma implementasyonu ilerliyor! İşte güncel durum:

### 📊 Progress Report:

**Tamamlanan:**
✅ Design Tokens (Color, Text, Effect Styles) - 100%  
✅ Master Components (7/7) - 100%  
✅ Instance Swap (4/6 pages) - 67%  

**Devam Eden:**
🔄 QA & Responsive variants  
🔄 Contrast testing  

**Bekleyen:**
⏳ Final documentation  
⏳ Dev handoff  

### 🎯 Key Achievements:

- **11 Color Styles** tutarlı şekilde uygulandı
- **6 Text Styles** tüm sayfalarda kullanılıyor
- **7 Master Component** oluşturuldu (Sidebar, HeaderCard, MetricCard, etc.)
- **4 sayfa** token sistemine geçti (Profile, İş İlanları, İşlerim, Bildirimler)

### 📸 Preview:

[Screenshot 1: Before/After - HeaderCard]  
[Screenshot 2: Master Components]  
[Screenshot 3: Token Styles Panel]

### 🚧 Blocker'lar:

- Yok / [List any blockers]

### 📅 Next Steps:

1. Kalan 2 sayfayı tamamla (Mesajlar, Landing)
2. Responsive variants oluştur
3. Contrast testing yap
4. Dev handoff hazırla

**Expected Completion:** [Date]

**Next Review:** [Date/Time]

Sorularınız varsa lütfen yazın!

---

**[Your Name]**

---

## 📨 TEMPLATE 3: Final Handoff (To Developers)

**Subject:** 🚀 Workigom Figma Design System - Dev Handoff Ready

**To:** [Dev Team]  
**CC:** [Product Manager], [UX Designer]  
**Priority:** High

---

**Body:**

Merhaba dev team,

**Workigom Design System Figma implementasyonu tamamlandı!** ✅

Frontend'deki token sistemi ile tam senkronize çalışacak şekilde Figma dosyası güncellendi.

### 📦 Teslim Edilen:

1. **Figma File (Dev Mode):** [Figma Link]
2. **Token Mapping Table:** [Google Doc Link or attached]
3. **Before/After Screenshots:** [Folder Link]
4. **Documentation:** `/FIGMA_EDIT_PACK.md`

### 🎨 Neler Değişti:

**Design Tokens:**
- 11 Color Styles tanımlandı
- 6 Text Styles standardize edildi
- 2 Effect Styles (shadows) eklendi
- 3 Border Radius standardı belirlendi

**Master Components:**
- ✅ Sidebar (260px, aktif state, icon size 20px)
- ✅ HeaderCard (gradient, elevation-2)
- ✅ MetricCard (min-height 96px, elevation-1)
- ✅ EmptyStateCard (dashed border, centered)
- ✅ JobCard (hover states, badges)
- ✅ ChatList & ChatWindow (message bubbles)
- ✅ CTA Button (3 variants)

**Layout Standardization:**
- Container-left: 24px (tüm sayfalarda)
- Content max-width: 1280px
- Card grid gutter: 16px
- Sidebar width: 260px (fixed)

### 🔗 Figma → CSS Mapping:

| Figma Style | CSS Variable | Value |
|-------------|--------------|-------|
| Turquoise | `--color-turquoise` | `#4DD0E1` |
| Pink | `--color-pink` | `#FF80AB` |
| Lavender | `--color-lavender` | `#B39DDB` |
| Cream | `--color-cream` | `#FFF9E6` |
| radius-md | `--radius-md` | `12px` |
| elevation-1 | `--elevation-1` | `0 6px 20px rgba(...)` |

**Full mapping:** See attached `TOKEN_MAPPING.md`

### 📱 Responsive Breakpoints:

**< 1024px (Tablet):**
- Sidebar collapse to icon-only
- HeaderCard height: 72px
- PageTitle size: 20px

**< 768px (Mobile):**
- Sidebar hidden
- Floating toolbar hidden
- Single column grid
- MetricCard min-height: 80px

### ✅ QA Checklist (Completed):

- ✅ Design Lint: 0 errors
- ✅ Contrast: WCAG AA passed
- ✅ All components use Color/Text/Effect Styles
- ✅ Layout alignment verified
- ✅ Responsive variants created

### 🎯 Action Items for Dev Team:

1. **Review Figma File:** Open in Dev Mode, inspect components
2. **Verify Token Sync:** Compare Figma styles with `/styles/tokens.css`
3. **Update Components:** Apply token classes to remaining components
4. **Test Responsive:** Verify breakpoint behavior matches Figma

### 📚 Documentation Links:

- **FIGMA_EDIT_PACK.md:** Complete Figma implementation guide
- **DESIGN_SYSTEM.md:** Design system documentation
- **QUICK_START.md:** Quick reference guide
- **Frontend Tokens:** `/styles/tokens.css`

### 🧪 Testing Notes:

**Visual Regression:**
- Before/after screenshots attached
- Key components: HeaderCard, MetricCard, Sidebar

**Accessibility:**
- All text meets WCAG AA contrast
- Focus states defined
- Touch targets ≥44px on mobile

### 💬 Questions?

Feel free to comment directly in Figma or ping us on Slack #design-dev channel.

**Dev Handoff Meeting:** [Proposed Date/Time] - Quick walkthrough if needed

Let's ship this! 🚀

---

**[Your Name]**  
UX/Frontend Team  
[Contact Info]

---

## 📨 TEMPLATE 4: Quick Slack/Teams Message

**Channel:** #design-dev

---

**Message:**

🎨 **Workigom Design System Update!**

Figma design system implementation tamamlandı! ✅

**What's New:**
• 11 Color Styles (Turquoise, Pink, Lavender, etc.)
• 6 Text Styles (standardized typography)
• 7 Master Components (Cards, Sidebar, Buttons)
• Responsive variants (<1024px, <768px)

**Resources:**
📎 Figma File (Dev Mode): [Link]
📎 Token Mapping: [Link]
📎 Screenshots: [Link]
📎 Docs: `/FIGMA_EDIT_PACK.md`

**Next Steps:**
1. Review Figma file in Dev Mode
2. Verify token sync with `/styles/tokens.css`
3. Apply to remaining components

**Questions?** Reply here or DM me!

**Handoff meeting:** [Date/Time] (optional, 15 min walkthrough)

cc: @dev-team @product-manager

---

## 📨 TEMPLATE 5: Stakeholder Update

**Subject:** 📊 Workigom Design System - Implementation Complete

**To:** [Stakeholders]  
**CC:** [Team Leads]

---

**Body:**

Merhaba,

Workigom projesinde **Design System standardizasyonu tamamlandı**.

### 🎯 Hedefler (Tamamlandı):

✅ Tutarlı renk paleti ve tipografi  
✅ Tekrar kullanılabilir component kütüphanesi  
✅ Figma-Frontend senkronizasyonu  
✅ Responsive design standardı  
✅ Accessibility compliance (WCAG AA)

### 📊 Impact:

**Öncesi:**
- 20+ farklı renk tonu kullanımı
- Hardcoded spacing değerleri
- Inconsistent component'ler
- Yavaş design-to-dev handoff

**Sonrası:**
- 11 standardize color token
- Tutarlı spacing sistemi
- 7 master component
- %50 daha hızlı handoff süreci

### 🎨 Technical Highlights:

- **Token System:** Color, Text, Effect, Radius tokenları
- **Master Components:** 7 core component (reusable)
- **Responsive Design:** 3 breakpoint standardı
- **Accessibility:** WCAG AA compliance

### 📈 Next Phase:

1. ✅ Component library expansion
2. ✅ Animation guidelines
3. ✅ Dark mode support (optional)
4. ✅ Documentation site

### 📸 Visual Preview:

[Attach 2-3 key screenshots: Before/After, Component Library, Token Panel]

### 🚀 Business Value:

- **Faster Development:** Standardized components reduce dev time
- **Consistency:** Better user experience across app
- **Scalability:** Easy to add new features with existing system
- **Maintainability:** Single source of truth for design

**Questions?** Let's schedule a quick demo!

---

**[Your Name]**  
[Title]  
[Date]

---

## 📋 CHECKLIST: Before Sending Handoff Email

- [ ] Figma Dev Mode enabled
- [ ] File link permissions set (view/comment)
- [ ] Token mapping document attached
- [ ] Before/after screenshots exported
- [ ] Documentation links verified
- [ ] Recipient list confirmed
- [ ] Meeting invite sent (if needed)
- [ ] Slack/Teams announcement prepared

---

## 🎯 Email Writing Tips

### DO:
✅ Be specific with links and attachments  
✅ Use visual aids (screenshots)  
✅ Provide clear action items  
✅ Set expectations (timeline, next steps)  
✅ Offer support channels  

### DON'T:
❌ Send without testing links  
❌ Assume everyone knows context  
❌ Skip the "why" (business value)  
❌ Forget to CC stakeholders  
❌ Use jargon without explanation  

---

**Templates Created:** November 2025  
**Status:** ✅ Ready to Use  
**Format:** Copy-paste friendly
