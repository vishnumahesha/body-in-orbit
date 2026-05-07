---
name: data-layer
description: Static data layer rules for Body in Orbit (no database)
trigger: working with data types, domains, sources, or evidence records
---

## No database
- All data in `data/` directory as TypeScript constants
- No Supabase, Prisma, Drizzle, or DB of any kind
- No API routes, no server actions
- Data is read-only, baked into build

## Data files
- `data/types.ts` — All TypeScript types (single source of truth)
- `data/domains.ts` — 5 biological domains with full evidence
- `data/sources.ts` — 8 Inspiration4 papers with DOIs
- `data/sections.ts` — 10 scroll sections
- `data/perturbationScale.ts` — 0-3 communication score rubric
- `data/crew.ts` — 4 crew members

## Type safety
- All domain IDs use `DomainId` union type
- All timepoints use `Timepoint` union type
- All mission phases use `MissionPhase` union type
- No `any` types
- Evidence records MUST include all required fields

## Evidence record rules
Every `EvidenceRecord` must have:
- claim, plainEnglish, technicalFinding, astronautSafeWording
- assays, sampleTypes, timepointsMeasured, n=4
- sourceIds (must exist in data/sources.ts)
- confidence, perturbationScore (0-3)
- scoreInputs, whyScore
- caution, notClaiming, missionPlanningRelevance

## Domain rules
Every `BiologicalDomain` must have:
- Full metadata (id, label, color, angleDeg, etc.)
- Complete `visualStates` for ALL 10 mission phases
- Evidence record with all required fields
- Recovery status from fixed enum

## Validation
- TypeScript compiler enforces all constraints
- No runtime validation needed (static data)
- Build fails if types don't match
