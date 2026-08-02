# 🌙 ACCET Dark Section Component Guide

This document is the hyper-detailed technical reference for constructing **Dark Sections** (like the Onboarding flow and the top "bun" of the Chiaroscuro layout) in the ACCET application. It outlines the exact classes, colors, and behaviors for every single component.

---

## 1. The "Netflix Effect" Background Architecture

The background is constructed using a multi-layered approach to achieve depth, cinematic texture, and high contrast for the foreground text.

### Layer 1: Base & Image
```tsx
<div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#3866B3]">
  <img 
    src="/images/accet-arq-main-1.JPG"
    alt="Background"
    className="w-full h-full object-cover opacity-25 blur-sm scale-105 saturate-50"
  />
</div>
```
- **Base Color:** `#3866B3`
- **Image Treatment:** Dropped to `25%` opacity, slight `blur-sm`, desaturated by `50%`, and scaled to `105%` to prevent edge bleeding on blur.

### Layer 2: Netflix Gradients
```tsx
{/* Left-to-Right Fade */}
<div className="absolute inset-0 bg-gradient-to-r from-[#3866B3] via-[#3866B3]/80 to-transparent" />
{/* Radial Vignette */}
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#162032_100%)] opacity-90" />
```
- Creates the signature focus on the center while darkening the edges.

### Layer 3: Texture
```tsx
<div className="fixed inset-0 vignette pointer-events-none z-10" />
<div className="fixed inset-0 grain pointer-events-none z-10" />
```
- Adds organic noise and a CSS vignette.

---

## 2. Main Glass Container (`.glass-blue-card`)

The primary wrapper for content over dark backgrounds.

- **Background:** `rgba(255, 255, 255, 0.03)` (Extremely subtle white)
- **Blur:** `backdrop-filter: blur(20px) saturate(120%)`
- **Border:** `1px solid rgba(94, 200, 242, 0.12)` (Sky Blue with 12% opacity)
- **Shadow:** `box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03)` (Almost invisible, no heavy dark shadows)
- **Hover State:** Background shifts to `0.05` opacity, border to `0.25` opacity.
- **Container Shape:** Use `rounded-[32px]` for large main wrappers, or `12px` for standard inner cards.

---

## 3. Typography Rules

### Headings (H1, H2)
- **Font:** `Syne`
- **Classes:** `font-syne font-medium text-white tracking-tight`
- **Usage:** "Project Identity", "AI Engine Selection"

### Body & Descriptions
- **Font:** `DM Sans` (Tailwind `font-sans`)
- **Classes:** `text-slate-300 text-[15px] leading-relaxed`

### Microcopy & Labels
- **Classes:** `text-[11px] text-slate-400 uppercase tracking-widest font-medium`
- **Usage:** Form labels, step indicators.

### Accent Text (Sky Blue)
- **Classes:** `text-[#5EC8F2]`
- **Usage:** Step numbers ("Step 01 / 03") and highlight icons.

---

## 4. Input Fields & Textareas

Forms inside the dark glass card must recede visually until focused.

- **Default State:**
  ```tsx
  className="w-full bg-black/20 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-slate-500 shadow-inner outline-none transition-all"
  ```
- **Focus State (Glow):**
  ```tsx
  className="focus:ring-1 focus:ring-[#5EC8F2]/50 focus:border-[#5EC8F2]/50"
  ```
- **Typography:** `text-[15px]` for inputs, `text-[14px]` for textareas.

---

## 5. Selectable Option Cards (e.g., Asset Class)

Used for mutually exclusive selections (radio-button style UI).

- **Unselected (Muted):**
  ```tsx
  className="bg-black/20 text-slate-300 border border-white/5 hover:border-white/10 hover:bg-white/5"
  ```
- **Selected (Active Glow):**
  ```tsx
  className="bg-gradient-to-r from-[#5EC8F2] to-[#377D8C] text-[#050505] border-transparent shadow-[0_0_20px_rgba(94,200,242,0.3)]"
  ```
- **Shape & Text:** `py-4 px-4 rounded-xl text-[12px] uppercase tracking-wide font-medium`

---

## 6. Primary CTAs (The "Continue" Button)

- **Gradient Fill:** `bg-gradient-to-r from-[#5EC8F2] to-[#377D8C]`
- **Text:** `text-[#050505] font-medium text-[13px]` (Dark text on light background for contrast).
- **Shape:** Pill-shaped `rounded-full` with generous padding `px-8 py-3.5`.
- **Hover/Disabled:** `hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`.

---

## 7. File Upload Area (Drag & Drop)

- **Container:** `bg-black/20 hover:bg-white/5 border border-dashed border-white/20 hover:border-white/40`
- **Shape:** `rounded-xl p-8`
- **Inner Elements:** Icons in `text-slate-400 group-hover:text-white`.

---

## 8. Progress & Context Bars

- **Track Background:** `bg-white/5 rounded-full`
- **Fill (Healthy):** `bg-[#5EC8F2]/80`
- **Fill (Warning/Max):** `bg-red-500/80`
- **Height:** Thin, usually `h-1`.

---

### Summary Checklist for Dark UI:
1. [ ] Is the primary typography `Syne` for headers and `DM Sans` for body?
2. [ ] Are shadows kept below `5%` opacity?
3. [ ] Are inputs darkened (`bg-black/20`) rather than brightened?
4. [ ] Does the active CTA use the Sky Blue gradient with dark text?
5. [ ] Are the borders on glass cards extremely thin and subtle (`rgba(94, 200, 242, 0.12)`)?
