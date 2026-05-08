# Body in Orbit: A Post-flight Recovery Review for Astronaut Molecular Data

## Team 3 — Vishnu Mahesha
Rouse High School / Alpha X Program

---

## Problem Statement

The Inspiration4 crew spent three days in orbit. Their molecular data spans 12 datasets, 5 biological domains, and 289 days of sampling. But there are only 4 crew members, and with a sample size that small, it's dangerously easy to say more than the data actually supports. Right now there's no tool that helps someone who isn't a geneticist understand what this data means for their body — and more importantly, what it doesn't mean.

## Approach

I'm building Body in Orbit, an interactive post-flight Recovery Review where the user steps into the role of a mission reviewer. Instead of just showing charts, the site asks you to make calls: which biological systems look like they've returned to baseline? Which ones need monitoring? Which claims about astronaut health are actually supported, and which ones sound convincing but overstep the evidence?

The project pulls from all 12 OSDR datasets in the starter notebook and maps findings across immune regulation, oxidative stress, energy metabolism, genome regulation, and microbiome interactions. Every claim on the site passes through an evidence review: what dataset supports it, how confident are we, what's the safer way to say it, and what should a flight surgeon actually do with this information.

This is primarily a Track 3 submission (Communication & Visualization), but it incorporates Track 1 perturbation analysis and Track 2 risk profiling as supporting layers.

## Expected Output

- A deployed web app (Next.js on Vercel)
- A public GitHub repo with a BioBrief-format README
- A design philosophy note explaining communication choices
- An analysis notebook with reproducible work from the starter Colab
- A signature visual showing how recovery diverges across biological domains
- A Claim Review Board that tests whether each astronaut-facing sentence survives evidence review
- An Evidence Ledger linking every claim to dataset ID, confidence level, and safer wording
- All figures, outputs, and supporting materials

The goal isn't to diagnose anything. It's to help a crew member, a flight surgeon, or a curious researcher ask better questions about what spaceflight leaves behind.

## GitHub Repository

https://github.com/vishnumahesha/body-in-orbit
