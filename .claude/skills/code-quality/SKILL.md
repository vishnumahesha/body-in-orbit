---
name: code-quality
description: Type safety, testing, error handling, and anti-overengineering rules
trigger: reviewing code, refactoring, or adding new features
---

## Type safety
- TypeScript strict mode enabled
- No `any` types (use `unknown` if needed)
- All props interfaces defined
- Return types on complex functions
- Union types for fixed enums (DomainId, Timepoint, etc.)

## Testing checklist
- Build must pass: `npm run build`
- No TypeScript errors
- No ESLint errors
- Manual test in browser at localhost:3000
- Test on mobile viewport (375px)
- Test all interactive elements (clicks, hovers, keyboard)
- Verify evidence panel opens/closes
- Verify scroll sections transition correctly

## Error handling
- IntersectionObserver cleanup in useEffect
- Safe null checks for optional data
- Fallback UI for missing data (but shouldn't happen with static data)
- No try/catch blocks unless interacting with browser APIs

## No overengineering
- No abstract base classes
- No generic utility functions for one-time use
- No premature optimization
- No complex state management (useState is fine)
- No context providers unless actually needed
- No custom hooks unless reused 3+ times

## Performance
- Default to server components
- Client components only when needed
- No large dependencies (current bundle is good)
- SVG over images where possible
- Lazy load heavy components if needed

## Code style
- Const arrow functions: `const Component = () => {}`
- Early returns over nested ifs
- Destructure props in function signature
- Group related code with blank lines
- Comments only for non-obvious logic

## When stuck
- Search codebase before creating new utilities
- Check if similar component exists
- Use existing patterns from other components
- Ask before adding new dependencies
