# Design Philosophy: Body in Orbit

## Core Principle
Every visual movement and every astronaut-facing sentence must survive evidence review.

## Why a Recovery Review, Not a Dashboard
Astronaut omics does not yet support simple status lights. A dashboard with risk scores could imply clinical readiness that n=4 exploratory data cannot support. Body in Orbit uses a scroll-driven report because the communication problem is sequential: what was measured, what shifted, what moved back toward baseline, what remains uncertain, and what should not be concluded.

## Data Shape Awareness
The starter notebook contains two data types:
- Abundance matrices (metagenomics, cytokine panels, metabolic panel, urine, CBC): rows are features, columns are samples. We build the comparisons.
- Pre-computed differentials (metabolomics, proteomics, EVP, blood RNA-seq, single-cell, spatial): rows are features, columns are statistics (logFC, p, q). The comparison is fixed.

Ground-only data is never animated as a direct in-flight trajectory.

## The n=4 Problem
Four crew members. Every claim is calibrated against this sample size. Findings are classified as Supported, Monitoring Signal, or Overclaim — never as clinical diagnoses.

## Claim Boundary Framework
Every claim passes through: Claim → Evidence (with OSD dataset ID) → Confidence Level → Safer Wording → Operational Action

## Language Safety
Forbidden terms: diagnose, treat, cure, permanent damage, causes (causal), proves, confirms, clearance, risk score, safe, unsafe. These imply clinical certainty that n=4 data cannot support.

## AI as Tool, Not Confidence Amplifier
AI translates unfamiliar methods into plain language, then audits astronaut-facing wording for overclaims. AI does not decide what the biology means.

## Built For the Crew
The test: could Hayley Arceneaux or Chris Sembroski read this and understand what it means for their health? If not, it gets rewritten.
