---
name: accet-branding
description: Enforces the ACCET 2026 UI/UX Design System, including cinematic dark themes, minimalistic glassmorphism, card styles, and strict versioning organization.
---

# ACCET 2026 UI/UX Design System & Branding Guidelines

You are an organized, meticulous UI/UX styling agent. Whenever you are tasked with designing, modifying, or creating UI components for the ACCET platform, you MUST strictly adhere to these 2026 branding standards.

## 1. The ACCET Aesthetic
The overarching theme is **Cinematic Minimalist Glassmorphism**. The UI should feel premium, sleek, uncluttered, and highly readable. Avoid overlapping elements, "information over information", and loud, glowing boxes that crowd the viewport.

## 2. Color Palette & Backgrounds
- **Primary Background**: Deep cinematic dark (`#050505`). DO NOT use heavy, bright blues or intrusive matrix dots for the main background.
- **Glass Cards (glass-card / glass-platinum)**:
  - **Background**: Extremely translucent (e.g., `rgba(255, 255, 255, 0.03)` to `rgba(10, 10, 10, 0.6)`).
  - **Blur**: High blur is essential `backdrop-filter: blur(40px)`.
  - **Border**: Minimal, ultra-thin 1px borders (e.g., `rgba(255, 255, 255, 0.08)`).
- **Accents**: Use the ACCET brand cyan (`#5EC8F2`) and teal (`#377D8C`) strategically. For active states or buttons, use a horizontal gradient (`from-[#5EC8F2] to-[#377D8C]`).

## 3. Typography
- **Primary Font**: `Inter` (sans-serif). Keep it clean and highly legible.
- **Secondary Font**: `Syne` (for major display headers only, sparingly).
- **Monospace**: `JetBrains Mono` (for technical badges, step indicators, or small uppercase labels).
- **Spacing**: Use generous padding (`p-10`, `p-14`) and gaps (`gap-8`, `gap-10`) to allow the design to breathe. 

## 4. Components & Interactive Elements
- **Navigation (HeaderNav)**: Use capsule/pill-shaped tabs for navigation (`rounded-full`, `px-4`, `py-2`). Do not use large blocky buttons in the header. The ACCET logo (`logo.png`) must always be cleanly presented on the left.
- **Inputs**: Use dark backdrops (`bg-black/40`) with subtle inner shadows. Avoid harsh white borders on inputs.
- **Buttons**: The primary call-to-action (e.g., "Continue") should use the cyan gradient with a dark text contrast (e.g., `text-[#050505]`) and rounded corners (`rounded-full`).

## 5. Versioning & Organization Protocol
As an organized agent:
- Always track version numbers precisely. When updating the UI, reference the current system version (e.g., `v1.0.7`).
- Never push to `main` without asking. Always create a semantically versioned branch (e.g., `v1.0.7-test.1`) before pushing.
- Structure your code cleanly: group related Tailwind classes (layout, colors, typography, interactions).
