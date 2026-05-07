# Body in Orbit - Complete Site Design

**Date:** 2026-05-02  
**Type:** Hackathon project - Torchlight Summit Biosovereignty Track 3  
**Scope:** Mission-readiness briefing website with interactive components and AI debrief

---

## Project Goal

Build a complete, production-quality astronaut health data visualization website that demonstrates responsible molecular data communication. The site must be the safest, clearest astronaut-facing molecular debrief in the competition - prioritizing evidence boundaries over visual spectacle.

## Three Subsystems

### 1. Main Interactive Briefing (/)

A single-page continuous scroll experience with 10 sections:

**Section 0: Mission Start**
- Full viewport hero with title, subtitle, CTA button
- "Begin Mission Briefing" reveals all content below
- State-gated content reveal (briefingStarted boolean)

**Section 1: Mission Briefing**
- Context-setting copy
- 6 mission metadata cards (2x3 grid)

**Section 2: The Three Questions**
- 3 large cards presenting the core questions
- Numbered visual treatment (01/02/03)

**Section 3: What Was Measured**
- MissionTimeline component (NEW)
- CoverageDot component (NEW)
- Grid showing data coverage across timepoints
- 8 assay types × 10 timepoints with coverage status

**Section 4: The Living Baseline**
- EXISTING LivingBaseline component
- Intro copy updates only
- Radial chart with 5 domains, sticky behavior

**Section 5: Crew Monitoring Profile**
- MonitoringProfile component (NEW)
- 5 domain cards with priority badges
- Maps perturbationScore → monitoring priority
- Plain-English summaries from evidence records

**Section 6: Domain Deep Dive**
- EXISTING scroll sections (immune, oxidative, energy, telomere, microbiome)
- 5 story sections with sticky chart integration
- Keep existing evidence panels and source chips

**Section 7: Recovery Split**
- RecoverySplit component (NEW)
- 3 animated horizontal recovery bars
- EVP proteins, Metabolites, Plasma proteins
- Percentage recovery visualization

**Section 8: Claim Boundary Engine**
- ClaimBoundaryEngine component (NEW) - CRITICAL FEATURE
- Interactive claim classification (8 claims)
- User classifies each as: Supported / Monitoring only / Overclaim
- Reveals correctness + educational feedback
- Score tracking (X/8 correct)
- Clinical tone, NOT gamified

**Section 9: Mission Control Recommendations**
- MissionRecommendations component (NEW)
- Table: Domain | Signal | Priority | Follow-up | Do Not Infer
- 5 rows (one per domain)
- Flight Surgeon View panel below

**Section 10: Closing**
- Final messaging
- Two CTAs: "Enter Crew Debrief →" and "Review Evidence"

### 2. AI Debrief Chatbot (/debrief)

**Frontend:**
- Minimal chat interface
- User/AI message bubbles
- 6 suggested starter questions
- AI Safety Trace panel after every response
- Loading states (pulsing dots)
- Fixed input bar at bottom

**Backend:**
- API route: app/api/debrief/route.ts
- Anthropic SDK integration (claude-sonnet-4-5)
- System prompt with 5 domain evidence ledger
- Strict claim-safety rules in prompt
- Conversation history support
- Fallback responses if API unavailable

**Safety Features:**
- Every response includes confidence label
- Every response ends with "Do not conclude:" statement
- Post-response safety trace (4 checkmarks)
- Forbidden words enforced in system prompt

### 3. Claim Audit Script

**Purpose:** Validate all user-facing text against forbidden clinical language

**Implementation:**
- scripts/auditClaims.ts
- Scans domains.ts and sections.ts
- Checks for forbidden terms: diagnosis, disease, abnormal, dangerous, damaged, risk score, treatment, clearance, safe, unsafe, healthy, unhealthy, predicts, clinically significant, pathology
- Allows negation contexts ("not a diagnosis", "do not conclude")
- Validates domain data completeness
- Exit 0 on pass, exit 1 on violations

---

## Design System (Strict Adherence Required)

**Colors:**
- Background: `#000000` (pure black, always)
- Panel bg: `#05070F`
- Panel border: `#1E293B`
- Text primary: `#F8FAFC`
- Text secondary: `#94A3B8`
- Text muted: `#64748B`
- Accent (measured): `#06B6D4` (cyan)
- Accent (uncertain): `#8B5CF6` (purple)
- Accent (warning): `#FBBF24` (amber)
- Success: `#34D399` (checkmarks only)
- Error: `#F87171` (overclaim labels only)

**Domain Colors:**
- Immune: `#22D3EE`
- Oxidative: `#FBBF24`
- Energy: `#60A5FA`
- Telomere: `#A78BFA`
- Microbiome: `#2DD4BF`

**Typography:**
- Headings: Space Grotesk (already loaded)
- Body: Inter (already loaded)
- Data/labels: IBM Plex Mono (already loaded)

**Animation:**
- Default spring: `{ stiffness: 90, damping: 22, mass: 0.45 }`
- Fade in: `initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}`
- Transition: `duration: 0.6, ease: [0.16, 1, 0.3, 1]`
- Stagger children: 0.1s apart
- Max 3 simultaneous animations per viewport

**Cards:**
- bg-[#05070F] border border-[#1E293B] rounded-2xl p-6
- Hover: border-[#06B6D4]/40 transition-colors duration-300

**Spacing:**
- Section spacing: py-32 or py-40 between major sections
- Max content width: max-w-6xl mx-auto px-6

---

## Language Rules (CRITICAL)

**NEVER use:**
- diagnosis, disease, abnormal, dangerous, damaged
- risk score, treatment, clearance, safe, unsafe
- healthy, unhealthy, predicts, clinically significant, pathology

**ALWAYS use:**
- signal, shift, perturbation, baseline, recovery
- confidence, monitoring, exploratory
- communication score (not clinical severity score)

**Key principle:** This is NOT a clinical tool. It shows monitoring signals, not diagnoses or predictions.

---

## Data Architecture

**Existing (DO NOT REBUILD):**
- `data/types.ts` - all TypeScript interfaces
- `data/domains.ts` - 5 biological domains with evidence records
- `data/sources.ts` - 8 published papers with DOIs
- `data/sections.ts` - story sections
- `data/perturbationScale.ts` - 0-3 scoring rubric
- `data/crew.ts` - 4 crew members

**Existing Components (DO NOT REBUILD):**
- `components/baseline/LivingBaseline.tsx`
- `components/baseline/DomainNode.tsx`
- `components/baseline/BaselineGrid.tsx`
- `components/baseline/DomainTrail.tsx`
- `components/evidence/EvidencePanel.tsx`
- `components/evidence/SourceChip.tsx`
- `components/evidence/ClaimAudit.tsx`
- `components/story/StorySection.tsx`
- `components/story/ScrollStory.tsx`
- `components/story/SectionNav.tsx`
- `components/story/StickyStage.tsx`

---

## New Components to Build

### 1. components/mission/MissionStart.tsx
- Full viewport hero
- Button with state management
- Scroll trigger to Section 1

### 2. components/mission/ThreeQuestions.tsx
- 3-card layout
- Numbered visual treatment

### 3. components/timeline/MissionTimeline.tsx
- Timeline grid: 8 assays × 10 timepoints
- Uses CoverageDot component
- In-flight columns highlighted
- Responsive horizontal scroll

### 4. components/timeline/CoverageDot.tsx
- Props: status ("collected" | "partial" | "missing"), inFlight (boolean)
- Renders appropriate dot style

### 5. components/mission/MonitoringProfile.tsx
- 5 domain cards
- Reads from data/domains.ts
- Maps perturbationScore to priority badge
- Shows confidence, recovery status, plain English summary

### 6. components/recovery/RecoverySplit.tsx
- 3 horizontal animated progress bars
- useInView hook from Framer Motion
- Staggered animation on scroll-in

### 7. components/boundary/ClaimBoundaryEngine.tsx
- 8 claim cards with classification buttons
- State: classifications, revealed
- Feedback panels with why/safer wording/source/do-not-conclude
- Score counter
- Clinical tone (not gamified)

### 8. components/mission/MissionRecommendations.tsx
- 5-column table
- Domain-specific monitoring recommendations
- Flight Surgeon View panel

---

## New Pages to Build

### app/debrief/page.tsx
- Chat interface
- Suggested questions (6 buttons)
- User/AI message bubbles
- AI Safety Trace after each response
- Input bar (fixed at bottom)
- Link back to main page

### app/api/debrief/route.ts
- POST endpoint
- Accepts: { message: string, history: { role, content }[] }
- Returns: { response: string }
- Uses @anthropic-ai/sdk
- Model: claude-sonnet-4-5-20250514
- Max tokens: 500
- System prompt with 5-domain evidence ledger
- Fallback responses for offline/no-API-key mode

---

## New Scripts to Build

### scripts/auditClaims.ts
- Scan domains.ts and sections.ts for forbidden terms
- Check negation context
- Validate domain data completeness
- Report violations
- Exit code: 0 pass, 1 fail
- Add to package.json: `"audit:claims": "npx tsx scripts/auditClaims.ts"`

---

## Updates to Existing Files

### app/page.tsx
- Replace simple `<ScrollStory />` with full section assembly
- State management for briefingStarted
- Render all 10 sections in sequence
- Framer Motion viewport observers

### app/layout.tsx
- Update metadata title: "Body in Orbit — Mission Readiness Briefing"
- Update metadata description: "Interactive molecular monitoring brief for astronaut health using Inspiration4 spaceflight data"
- (Fonts already correctly loaded)

### app/globals.css
- Add smooth scroll: `html { scroll-behavior: smooth; }`
- (Everything else already correct)

---

## Dependencies to Add

- `@anthropic-ai/sdk` - for AI debrief chatbot
- `tsx` (devDependency) - for running TypeScript scripts

---

## Implementation Sequence

1. **Install dependencies** (Anthropic SDK, tsx)
2. **Build timeline components** (MissionTimeline, CoverageDot)
3. **Build mission components** (MissionStart, ThreeQuestions, MonitoringProfile, MissionRecommendations)
4. **Build recovery component** (RecoverySplit)
5. **Build claim boundary engine** (ClaimBoundaryEngine) - most complex
6. **Update app/page.tsx** - assemble all sections
7. **Build /debrief page** - frontend
8. **Build /debrief API route** - backend
9. **Create .env.local** with placeholder API key
10. **Build audit script** - claim validation
11. **Update package.json** - add scripts
12. **Update layout metadata**
13. **Test build** - npm run build
14. **Test audit** - npm run audit:claims
15. **Manual verification** - start dev server, test all interactions

---

## Success Criteria

**Functionality:**
- ✓ All 10 sections render correctly
- ✓ MissionStart button reveals content
- ✓ MissionTimeline grid shows correct coverage
- ✓ MonitoringProfile displays 5 domains
- ✓ RecoverySplit bars animate on scroll
- ✓ ClaimBoundaryEngine classifies 8 claims and shows feedback
- ✓ MissionRecommendations table renders
- ✓ /debrief page loads and responds to questions
- ✓ AI Safety Trace appears after each response
- ✓ Audit script runs and validates language

**Quality:**
- ✓ Zero TypeScript errors on build
- ✓ Zero forbidden clinical terms in user-facing text
- ✓ All animations smooth, max 3 simultaneous
- ✓ Mobile-responsive (375px minimum)
- ✓ Contrast ratios meet WCAG standards
- ✓ No white backgrounds anywhere
- ✓ All components under 150 lines

**Claim Safety:**
- ✓ Every domain has notClaiming field
- ✓ Every AI response ends with "Do not conclude:"
- ✓ ClaimBoundaryEngine teaches boundary thinking
- ✓ No clinical overclaiming in any copy

---

## Out of Scope

- User authentication
- Data persistence
- Analytics/tracking
- Multi-language support
- Print styles
- SEO optimization beyond basic metadata
- Accessibility testing (beyond contrast and semantic HTML)
- Backend data storage
- Multiple crew member profiles
- Real-time data updates

---

## Technical Constraints

- Next.js 14 App Router (no Pages Router)
- TypeScript strict mode
- No `any` types
- Components max 150 lines
- Tailwind only (no CSS modules, no inline styles)
- Framer Motion for animations (no CSS transitions)
- No external data fetching (all data is local)
- Deploy target: Vercel

---

## Risk Mitigation

**Risk:** Anthropic API key not available  
**Mitigation:** Fallback responses in API route based on keyword matching

**Risk:** Build fails due to type errors  
**Mitigation:** Use existing type definitions from data/types.ts, validate incrementally

**Risk:** Animations cause performance issues  
**Mitigation:** Max 3 simultaneous, use Framer Motion's performance optimizations

**Risk:** Clinical language leaks into copy  
**Mitigation:** Audit script runs as pre-commit check, manual review of all new text

**Risk:** Mobile layout breaks  
**Mitigation:** Test at 375px, use responsive Tailwind classes, horizontal scroll for table

---

## Approval

User has approved building all three subsystems in one implementation cycle. Specification is complete and detailed. Ready for implementation planning.
