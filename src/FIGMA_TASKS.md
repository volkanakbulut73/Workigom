# 📋 Workigom Figma Tasks - Design System Implementation

**Jira/Trello/Asana Ready Task List**

---

## 🎯 EPIC: Design System Token Implementation

**Story Points:** 13  
**Assignee:** UX Designer  
**Priority:** High  
**Sprint:** Current  
**Due Date:** [Set date]

---

## 📦 PHASE 1: Setup & Tokens (3 story points)

### ✅ TASK-001: Create Design Tokens Page
**Time:** 5 minutes  
**Description:**
- [ ] Open Figma file
- [ ] Create new Page: "Design Tokens & Components"
- [ ] Create 3 frames inside: "Color Styles", "Text Styles", "Effects & Radii"

**Acceptance Criteria:**
- Page exists with 3 organized frames
- Naming convention documented

---

### ✅ TASK-002: Create Color Styles
**Time:** 10 minutes  
**Description:**
Create following Color Styles in Figma:

- [ ] Turquoise - `#4DD0E1`
- [ ] Turquoise-Dark - `#2AB0B4`
- [ ] Pink - `#FF80AB`
- [ ] Lavender - `#B39DDB`
- [ ] Lavender-Overlay - `rgba(179,157,219,0.08)`
- [ ] Lemon - `#FFF176`
- [ ] Cream - `#FFF9E6`
- [ ] Surface - `#FFFFFF`
- [ ] PageBackground - `#F6F7FB`
- [ ] Text-Strong - `#0B1220`
- [ ] Text-Muted - `#6B7280`

**Acceptance Criteria:**
- All 11 color styles created
- Styles named exactly as specified
- No hard-coded colors remain in designs

**Reference:** Section 2 of FIGMA_EDIT_PACK.md

---

### ✅ TASK-003: Create Text Styles
**Time:** 10 minutes  
**Description:**
Create following Text Styles:

- [ ] PageTitle - 22px/600/28px line height/Poppins
- [ ] SectionTitle - 18px/600/24px/Poppins
- [ ] CardTitle - 16px/600/20px/Poppins
- [ ] Body14 - 14px/400/20px/Poppins
- [ ] Small12 - 12px/400/16px/Poppins
- [ ] SidebarItem - 14px/500/20px/Poppins

**Acceptance Criteria:**
- All 6 text styles created
- Poppins font loaded and applied
- Styles named exactly as specified

**Reference:** Section 3 of FIGMA_EDIT_PACK.md

---

### ✅ TASK-004: Create Effect & Radius Styles
**Time:** 5 minutes  
**Description:**

**Radius Styles:**
- [ ] radius-sm = 8px
- [ ] radius-md = 12px
- [ ] radius-lg = 20px

**Effect Styles (Shadows):**
- [ ] elevation-1: X0 Y6 Blur20 rgba(11,18,30,0.06)
- [ ] elevation-2: X0 Y10 Blur30 rgba(11,18,30,0.08)

**Acceptance Criteria:**
- 3 radius values documented
- 2 effect styles created
- Styles named exactly as specified

**Reference:** Section 4 of FIGMA_EDIT_PACK.md

---

## 📦 PHASE 2: Master Components (5 story points)

### ✅ TASK-005: Create Sidebar Master Component
**Time:** 10 minutes  
**Description:**
- [ ] Create Sidebar component (260px width)
- [ ] Background: Cream color style
- [ ] Padding: 24px 16px
- [ ] Sidebar item: Auto Layout horizontal, spacing 12px
- [ ] Icon size: 20px
- [ ] Active state: gradient pill (Turquoise → Lavender), radius-lg
- [ ] Create component variants: Desktop / Mobile

**Acceptance Criteria:**
- Sidebar component published
- Active/inactive states work
- Uses Color Styles (no hard-coded colors)
- Icon size consistent (20px)

**Reference:** Section 6B of FIGMA_EDIT_PACK.md

---

### ✅ TASK-006: Create HeaderCard Master Component
**Time:** 5 minutes  
**Description:**
- [ ] Create HeaderCard component
- [ ] Radius: radius-md (12px)
- [ ] Padding: 18px
- [ ] Background: gradient (Turquoise → Turquoise-Dark)
- [ ] Effect: elevation-2
- [ ] Text color: White
- [ ] Add text override slots

**Acceptance Criteria:**
- HeaderCard component published
- Uses Color/Effect Styles
- Gradient uses color stops with styles
- Override slots for name, location, rating

**Reference:** Section 6D of FIGMA_EDIT_PACK.md

---

### ✅ TASK-007: Create MetricCard Master Component
**Time:** 5 minutes  
**Description:**
- [ ] Create MetricCard component
- [ ] Auto Layout: vertical
- [ ] Padding: 18px
- [ ] Radius: radius-md
- [ ] Min-height: 96px
- [ ] Background: Surface OR Cream
- [ ] Effect: elevation-1
- [ ] Icon slot: 32px with colored bg
- [ ] Value text: 20-22px semibold
- [ ] Label: CardTitle style

**Acceptance Criteria:**
- MetricCard component published
- Min-height constraint set
- Icon/value/label override slots work
- Uses Color/Text/Effect Styles

**Reference:** Section 6E of FIGMA_EDIT_PACK.md

---

### ✅ TASK-008: Create EmptyStateCard Master Component
**Time:** 3 minutes  
**Description:**
- [ ] Create EmptyStateCard component
- [ ] Padding: 24px
- [ ] Radius: radius-md
- [ ] Background: Surface
- [ ] Border: 1px dashed rgba(107,114,128,0.06)
- [ ] Effect: elevation-1
- [ ] Icon: 48px centered
- [ ] Title: CardTitle
- [ ] Body: Body14 (muted)

**Acceptance Criteria:**
- EmptyStateCard component published
- Dashed border applied
- Icon/title/body override slots work
- Center-aligned content

**Reference:** Section 6F of FIGMA_EDIT_PACK.md

---

### ✅ TASK-009: Create JobCard Master Component
**Time:** 5 minutes  
**Description:**
- [ ] Create JobCard component
- [ ] Padding: 16px
- [ ] Radius: radius-md
- [ ] Shadow: elevation-1
- [ ] Layout: Title (CardTitle), Meta row, Badge slot
- [ ] Badge: small pill (radius-lg, Pink bg for "Acil")
- [ ] Hover state: scale(1.02), elevation-2

**Acceptance Criteria:**
- JobCard component published
- Title/meta/badge override slots work
- Hover state defined
- Badge variants created (Acil, Normal, etc.)

**Reference:** Section 6G of FIGMA_EDIT_PACK.md

---

### ✅ TASK-010: Create Chat Components
**Time:** 10 minutes  
**Description:**

**ChatList:**
- [ ] Width: 320px fixed
- [ ] Conversation item: Avatar 40px, Title, Preview
- [ ] Time: Small12 (muted)

**ChatWindow:**
- [ ] Incoming bubble: Surface bg, Text-Strong, radius 14px
- [ ] Outgoing bubble: Turquoise-Dark bg, White text, radius 14px
- [ ] Composer: height 56px, radius-md input, primary send button

**Acceptance Criteria:**
- ChatList component published
- ChatWindow with message bubble variants
- Composer component published
- All use Color/Text Styles

**Reference:** Section 6H of FIGMA_EDIT_PACK.md

---

### ✅ TASK-011: Create CTA Button Master Component
**Time:** 3 minutes  
**Description:**
- [ ] Create Button component
- [ ] Height: 44-48px
- [ ] Radius: radius-md (12px)
- [ ] Background: Turquoise
- [ ] Text: Body14/semibold/white
- [ ] Shadow: 0 6px 18px rgba(42,176,180,0.18)
- [ ] Hover: Turquoise-Dark bg, scale(1.05)
- [ ] Variants: Primary, Secondary, Outline

**Acceptance Criteria:**
- Button component published
- 3 variants created
- Hover states defined
- Uses Color/Text Styles

**Reference:** Section 6I of FIGMA_EDIT_PACK.md

---

## 📦 PHASE 3: Instance Swap & Apply (3 story points)

### ✅ TASK-012: Apply Master Components to Profile Page
**Time:** 5 minutes  
**Description:**
- [ ] Open Profile page
- [ ] Swap header → HeaderCard
- [ ] Swap stat boxes → MetricCard
- [ ] Reapply Text Styles if needed
- [ ] Verify spacing (container-left = 24px)

**Acceptance Criteria:**
- All instances swapped
- Text Styles applied
- Layout intact
- No hard-coded values

---

### ✅ TASK-013: Apply Master Components to İş İlanları Page
**Time:** 5 minutes  
**Description:**
- [ ] Open İş İlanları page
- [ ] Swap page header → PageHeader component
- [ ] Swap job cards → JobCard
- [ ] Swap empty state → EmptyStateCard (if exists)
- [ ] Verify grid gutter = 16px

**Acceptance Criteria:**
- All instances swapped
- Grid layout consistent
- Empty state uses master component

---

### ✅ TASK-014: Apply Master Components to İşlerim Page
**Time:** 5 minutes  
**Description:**
- [ ] Open İşlerim page
- [ ] Swap header → PageHeader
- [ ] Swap job listings → JobCard
- [ ] Swap stat cards → MetricCard
- [ ] Verify spacing

**Acceptance Criteria:**
- All instances swapped
- Components aligned properly

---

### ✅ TASK-015: Apply Master Components to Bildirimler Page
**Time:** 3 minutes  
**Description:**
- [ ] Open Bildirimler page
- [ ] Swap empty state → EmptyStateCard
- [ ] Swap notification items → standardized component
- [ ] Verify typography

**Acceptance Criteria:**
- Empty state uses master component
- Consistent spacing

---

### ✅ TASK-016: Apply Master Components to Mesajlar Page
**Time:** 5 minutes  
**Description:**
- [ ] Open Mesajlar page
- [ ] Swap chat list → ChatList component
- [ ] Swap conversation view → ChatWindow component
- [ ] Verify composer component
- [ ] Test message bubble variants

**Acceptance Criteria:**
- ChatList and ChatWindow components applied
- Incoming/outgoing bubble styles correct
- Composer functional

---

### ✅ TASK-017: Update Sidebar on All Pages
**Time:** 5 minutes  
**Description:**
- [ ] Replace sidebar on all pages with Sidebar master component
- [ ] Verify active state shows correct page
- [ ] Verify width = 260px
- [ ] Verify icon size = 20px

**Acceptance Criteria:**
- Sidebar consistent across all pages
- Active state works
- No duplicate sidebars

---

## 📦 PHASE 4: QA & Responsive (2 story points)

### ✅ TASK-018: Run Design Lint & Fix Issues
**Time:** 10 minutes  
**Description:**
- [ ] Install/Run Design Lint plugin
- [ ] Fix hard-coded colors → replace with Color Styles
- [ ] Fix hard-coded text sizes → replace with Text Styles
- [ ] Fix missing effects → apply elevation-1 or elevation-2
- [ ] Document any exceptions

**Acceptance Criteria:**
- Design Lint shows 0 errors (or documented exceptions)
- All colors use Color Styles
- All typography uses Text Styles

**Tools:** Design Lint plugin

---

### ✅ TASK-019: Verify Layout Alignment
**Time:** 5 minutes  
**Description:**
- [ ] Check container-left = 24px on all pages
- [ ] Check content max-width = 1280px
- [ ] Check card grid gutter = 16px
- [ ] Check sidebar width = 260px
- [ ] Check button heights = 44-48px

**Acceptance Criteria:**
- All layout values match specification
- Consistent spacing across pages

**Reference:** Section 5 of FIGMA_EDIT_PACK.md

---

### ✅ TASK-020: Create Responsive Variants
**Time:** 10 minutes  
**Description:**

**Tablet (<1024px):**
- [ ] Create Sidebar → icon-only variant
- [ ] Reduce HeaderCard height → 72px
- [ ] PageTitle font size → 20px

**Mobile (<768px):**
- [ ] Sidebar → hidden variant
- [ ] Floating toolbar → hidden
- [ ] Card grid → single column
- [ ] MetricCard min-height → 80px

**Acceptance Criteria:**
- Component variants created for breakpoints
- Prototype shows responsive behavior
- Mobile preview looks correct

**Reference:** Section 9 of FIGMA_EDIT_PACK.md

---

### ✅ TASK-021: Run Contrast Check
**Time:** 5 minutes  
**Description:**
- [ ] Install/Run Contrast plugin
- [ ] Check body text contrast ≥4.5:1
- [ ] Check large text contrast ≥3:1
- [ ] Fix any failing contrast ratios
- [ ] Document pass/fail results

**Acceptance Criteria:**
- All critical text passes WCAG AA
- Contrast report generated

**Tools:** Contrast plugin or WebAIM

---

### ✅ TASK-022: Create Before/After Screenshots
**Time:** 5 minutes  
**Description:**
- [ ] Screenshot: Profile page (before/after)
- [ ] Screenshot: İş İlanları page (before/after)
- [ ] Screenshot: Sidebar (before/after)
- [ ] Screenshot: MetricCard (before/after)
- [ ] Export to folder

**Acceptance Criteria:**
- 4+ screenshot pairs
- Clear visual difference shown
- Organized in shared folder

---

## 📦 PHASE 5: Documentation & Handoff (1 story point)

### ✅ TASK-023: Create Token Mapping Document
**Time:** 5 minutes  
**Description:**
- [ ] Create table: Figma Style Name → CSS Variable
- [ ] List all Color Styles
- [ ] List all Text Styles
- [ ] List all Effect Styles
- [ ] Export as Markdown or Google Doc

**Acceptance Criteria:**
- Complete mapping table
- Shared with dev team

**Reference:** Section 11 of FIGMA_EDIT_PACK.md

---

### ✅ TASK-024: Enable Dev Mode & Share File
**Time:** 3 minutes  
**Description:**
- [ ] Enable Dev Mode on Figma file
- [ ] Verify all components inspectable
- [ ] Share file link with dev team
- [ ] Set appropriate permissions (view/comment)

**Acceptance Criteria:**
- Dev Mode enabled
- Link shared via Slack/Email
- Developers can inspect styles

---

### ✅ TASK-025: Write Handoff Email
**Time:** 5 minutes  
**Description:**
- [ ] Use email template from FIGMA_EDIT_PACK.md
- [ ] Attach Figma link
- [ ] Attach token mapping document
- [ ] Attach before/after screenshots
- [ ] Send to dev team + product manager

**Acceptance Criteria:**
- Email sent
- All attachments included
- Clear next steps outlined

**Reference:** Section 16 (Email Template) of FIGMA_EDIT_PACK.md

---

## 📊 PROGRESS TRACKER

```
Phase 1: Setup & Tokens          [░░░░░░░░░░] 0/4 tasks
Phase 2: Master Components       [░░░░░░░░░░] 0/7 tasks
Phase 3: Instance Swap & Apply   [░░░░░░░░░░] 0/6 tasks
Phase 4: QA & Responsive         [░░░░░░░░░░] 0/5 tasks
Phase 5: Documentation & Handoff [░░░░░░░░░░] 0/3 tasks

Total Progress:                  [░░░░░░░░░░] 0/25 tasks (0%)
```

---

## 🎯 ACCEPTANCE CRITERIA (Epic Level)

### Must Have:
- [ ] All 11 Color Styles created and applied
- [ ] All 6 Text Styles created and applied
- [ ] 7+ Master Components created
- [ ] All pages use master components (no hard-coded values)
- [ ] Design Lint shows 0 critical errors
- [ ] Responsive variants created
- [ ] Dev handoff complete

### Nice to Have:
- [ ] Before/after screenshots
- [ ] Animated prototype
- [ ] Component documentation
- [ ] Usage guidelines

---

## 📚 RESOURCES

- **Main Guide:** `/FIGMA_EDIT_PACK.md`
- **Quick Start:** `/QUICK_START.md`
- **Design System:** `/DESIGN_SYSTEM.md`
- **CSS Tokens:** `/styles/tokens.css`

---

## 🏷️ LABELS

`design-system` `figma` `tokens` `high-priority` `sprint-ready`

---

## 💬 COMMENTS TEMPLATE

**For each completed task, comment:**
```
✅ Task completed
- Time spent: [X minutes]
- Issues found: [None / List issues]
- Screenshot: [Link if applicable]
```

---

**Created:** November 2025  
**Epic Owner:** UX Team  
**Status:** 🔄 Ready to Start  
**Next Review:** After Phase 2 completion
