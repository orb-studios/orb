# AGENTS.md — Autonomous Agent Guidelines for Orb Studios

## Project Overview
This repository (`github.com/orb-studios/orb`) contains the official web platform and showcase for **Orb**, an indie arcade trading card game (TCG) created by **Orb Studios** (Anirudh Gupta and Lakshya Singh).

- **Production URL:** `https://orbstudios.vercel.app`
- **Architecture:** React 19, Vite 7, TypeScript, Tailwind CSS v4.

---

## Autonomous Operation Directives

### 1. User & Team Awareness
- If operating under **Lakshya Singh** (`ganu` / `lakshyare`):
  - Read [LAKSHYA_AGENT_GUIDE.md](file:///home/anirudh/Projects/orb-studios/orb/LAKSHYA_AGENT_GUIDE.md) thoroughly before executing tasks.
  - Act as Lakshya's pair-programmer and vibecoding partner.
  - Maintain a non-intimidating, creator-friendly tone.
  - Handle all Git branching, build checks, and Pull Requests automatically.
- If operating under **Anirudh Gupta** (`anonspud` / `anirudh`):
  - Act as Tech Lead & Systems Architect partner.
  - Anirudh reviews PRs and maintains direct authority over `main` and production deployments.

### 2. Critical Safety Rules
- **ZERO AI CARD ART:** Never use generative AI tools to generate, modify, or hallucinate card artwork or creature illustrations. All card art is exclusively hand-drawn by Lakshya on Autodesk Sketchbook (Samsung Galaxy M31).
- **BRANCH PROTECTION:**
  - Direct pushes to `main` by Lakshya's agent are **STRICTLY PROHIBITED**.
  - All new work must be performed on isolated branches (`feature/lakshya-...`, `art/lakshya-...`, `fix/lakshya-...`).
  - Submit changes as a clean Pull Request targeting `main`.
- **CANONICAL CARD DATA:**
  - Set 1 Alpha contains exactly 16 cards (Common: 6, Epic: 4, Legendary: 4, Secret: 2).
  - Centaur and Quetzalcoatlus are permanently excluded.
  - Spellings: `cracken` (with a 'c'), `peacock` (one word).
  - BST Formula: HP + ATK + DEF (Commons 450-500, Epics 500-600, Legendaries 650-700, Secrets 700-750).

### 3. Build & Verification
Always run and verify:
```bash
npm run build
```
before creating a commit or opening a Pull Request.
