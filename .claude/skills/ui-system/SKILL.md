---
name: ui-system
description: UI design rules, Tailwind conventions, and animation standards
trigger: working with UI components, styling, or visual design
---

## Design system
- Pure black background: `#000000`
- Text: `#F8FAFC` primary, `#94A3B8` secondary
- Accent: Cyan `#06B6D4` (measured), Purple `#8B5CF6` (uncertain)
- Domain colors: Immune `#22D3EE`, Oxidative `#FBBF24`, Energy `#60A5FA`, Telomere `#A78BFA`, Microbiome `#2DD4BF`

## Typography
- Headings: Space Grotesk (var(--font-space-grotesk))
- Body: Inter (var(--font-inter))
- Data/labels: IBM Plex Mono (var(--font-ibm-plex-mono))
- Fonts loaded in `app/layout.tsx` from next/font/google

## Tailwind rules
- Tailwind only — no inline styles, no CSS modules
- Use utility classes: `text-gray-300`, `bg-white/5`, `border-white/10`
- Mobile-first: default styles for mobile, `lg:` for desktop
- No custom CSS unless absolutely required

## Component patterns
- Max 150 lines per component
- Split large components into smaller ones
- Use semantic HTML: `<section>`, `<nav>`, `<aside>`, `<article>`
- Accessible: proper ARIA labels, keyboard navigation
- Hover/focus/active states on interactive elements

## Responsive layout
- Test at 375px minimum width
- Desktop breakpoint: `lg:` (1024px)
- Scroll story: sticky left (58vw) + scrolling right (42vw) on desktop
- Mobile: stacked layout

## Animation
- Framer Motion only (no CSS transitions)
- Spring config: `stiffness: 90, damping: 22, mass: 0.45`
- Ease curve: `[0.16, 1, 0.3, 1]`
- Max 3 simultaneous animations per section
- AnimatePresence for enter/exit animations

## NO generic AI UI
- No gradient backgrounds
- No glassmorphism (except if medical UI requires it)
- No drop shadows everywhere
- No rounded-xl on everything
- This is a medical report, not a landing page

## Icons
- lucide-react for all icons
- 16px (`w-4 h-4`) for inline, 20px (`w-5 h-5`) for standalone
- Match text color or use domain color
