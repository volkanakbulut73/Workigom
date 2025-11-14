# 🎨 WORKIGOM Styles Directory

**Design System Token Files - "Sevimli & Eğlenceli" Theme**

---

## 📁 Files Overview

### 1. `tokens.css` - Design Tokens
**Priority:** Import FIRST  
**Purpose:** Core design system variables

Contains:
- ✅ Color palette (Turquoise, Pink, Lavender, Lemon, Cream)
- ✅ Typography (font sizes, weights, line heights)
- ✅ Spacing scale (4px - 40px)
- ✅ Border radius (8px - 9999px)
- ✅ Shadows/Elevation (3 levels)
- ✅ Layout constants (sidebar width, container, etc.)
- ✅ Transitions & animations
- ✅ Z-index layers

**Usage:**
```css
.my-element {
  background: var(--color-turquoise);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  box-shadow: var(--elevation-1);
}
```

---

### 2. `components.css` - Component Styles
**Priority:** Import SECOND  
**Purpose:** Pre-built component classes using tokens

Contains:
- ✅ `.header-card` - Gradient header cards
- ✅ `.metric-card` - Stats/metric display cards
- ✅ `.cta-card` - Call-to-action cards
- ✅ `.search-input-wrapper` - Search inputs
- ✅ `.sidebar` - Navigation sidebar
- ✅ `.badge` - Tags and labels
- ✅ `.btn` - Button variants
- ✅ `.floating-toolbar` - Fixed position toolbar
- ✅ `.application-card` - Application listings
- ✅ `.skeleton` - Loading states

**Usage:**
```tsx
<div className="metric-card">
  <div className="metric-card__value">24</div>
  <div className="metric-card__label">Personel</div>
</div>
```

---

### 3. `globals.css` - Global Styles
**Priority:** Import THIRD  
**Purpose:** Global base styles, Tailwind config

Contains:
- ✅ Tailwind CSS base
- ✅ Poppins font import
- ✅ Base HTML/body styles
- ✅ Typography defaults
- ✅ Utility animations (bounce, bubble, etc.)
- ✅ Dark mode variables (if needed)

**Already imports:** `tokens.css` ✅

---

## 🚀 Quick Start

### Import Order (Choose One)

**Option A: In your main CSS file**
```css
@import "tailwindcss";
@import "./tokens.css";
@import "./components.css";
/* Other styles */
```

**Option B: In your App.tsx**
```tsx
import './styles/tokens.css';
import './styles/components.css';
import './styles/globals.css';
```

**Option C: Already done!**
`globals.css` already imports `tokens.css` ✅  
Just import `components.css` in your App if needed.

---

## 🎨 Token Categories

### Colors
```css
--color-turquoise: #4DD0E1;    /* Primary */
--color-pink: #FF80AB;          /* Secondary */
--color-lavender: #B39DDB;      /* Accent */
--color-lemon: #FFF176;         /* Highlight */
--color-cream: #FFF9E6;         /* Background */
```

### Spacing
```css
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
```

### Radius
```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 9999px;
```

### Shadows
```css
--elevation-1: 0 4px 12px rgba(0,0,0,0.08);   /* Cards */
--elevation-2: 0 6px 16px rgba(0,0,0,0.1);    /* Floating */
--elevation-3: 0 8px 24px rgba(0,0,0,0.12);   /* Modals */
```

---

## 📚 Documentation

- **Quick Start:** `/QUICK_START.md` - 5 min setup guide
- **Full Docs:** `/DESIGN_SYSTEM.md` - Complete design system
- **Examples:** `/components/examples/ExampleComponents.tsx` - Code examples
- **Checklist:** `/IMPLEMENTATION_CHECKLIST.md` - Implementation steps

---

## 🔧 Usage Examples

### Using Tokens in Tailwind
```tsx
<div className="bg-[var(--color-turquoise)] rounded-[var(--radius-md)] p-[var(--space-4)]">
  Content
</div>
```

### Using Component Classes
```tsx
<div className="metric-card">
  <div className="metric-card__icon metric-card__icon--turquoise">
    <Users />
  </div>
  <div className="metric-card__value">24</div>
  <div className="metric-card__label">Personel</div>
</div>
```

### Using Tokens in Custom CSS
```css
.my-custom-card {
  background: var(--color-cream);
  border-radius: var(--radius-md);
  padding: var(--card-padding);
  box-shadow: var(--elevation-1);
  transition: all var(--transition-base);
}

.my-custom-card:hover {
  transform: scale(1.02);
  box-shadow: var(--elevation-2);
}
```

---

## ✅ Migration Checklist

- [x] ✅ `tokens.css` created
- [x] ✅ `components.css` created
- [x] ✅ `globals.css` updated
- [ ] 🔄 Import order verified
- [ ] 🔄 Components using token classes
- [ ] 🔄 Hardcoded values replaced
- [ ] 🔄 Responsive testing complete

---

## 🎯 Best Practices

1. **Always use tokens** instead of hardcoded values
2. **Prefer component classes** over inline styles
3. **Keep consistent naming** (BEM convention)
4. **Test responsive** breakpoints
5. **Document changes** when adding new tokens

---

## 🐛 Troubleshooting

### Tokens not working?
- Check import order
- Verify CSS variables in DevTools
- Clear cache and rebuild

### Styles not applying?
- Check class name spelling
- Verify file is imported
- Check CSS specificity

### Colors look wrong?
- Ensure `tokens.css` is imported first
- Check for color overwrites in other files

---

## 📞 Support

Questions? Check:
1. `/QUICK_START.md` - Quick reference
2. `/DESIGN_SYSTEM.md` - Detailed guide
3. `/components/examples/` - Live examples

---

**Created:** November 2025  
**Theme:** Sevimli & Eğlenceli 🎨  
**Status:** ✅ Production Ready
