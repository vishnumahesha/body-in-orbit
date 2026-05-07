---
name: nextjs-architecture
description: Next.js 14 App Router rules and component boundaries
trigger: working with Next.js components, routes, or file structure
---

## App Router
- Next.js 14 App Router only (no pages/ directory)
- No src/ — `app/` at root
- Routes: `app/page.tsx`, layouts: `app/layout.tsx`
- Use `loading.tsx`, `error.tsx` for boundaries

## Server vs Client
Default to server components. Use "use client" only for:
- Hooks (useState, useEffect, useRef)
- Event handlers (onClick, etc.)
- Browser APIs (window, localStorage)
- Framer Motion
- Third-party libraries with hooks

## Structure
```
app/               # Routes
components/        # Reusable components
  baseline/        # Chart
  evidence/        # Panels
  story/           # Scroll
data/              # Static data (no DB)
```

## Rules
- One component per file, under 150 lines
- `@/` imports from root
- No API routes (static data only)
- Deploy: Vercel static export
