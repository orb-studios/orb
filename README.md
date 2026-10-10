# Orb Studios — Official Website

The official website for **Orb**, an indie arcade trading card game (TCG) created by **Orb Studios**.

> **Status:** The official website is in active development. During this rollout period, players can still access the legacy duel test app at [orbtcg.vercel.app](https://orbtcg.vercel.app/). This repository represents the official home and ongoing website for Orb Studios.

---

## About the Project

**Orb** is an indie arcade trading card game inspired by retro arcade fighters, physical gacha machines, and Saturday morning cartoons. Built around quick, snack-sized 60-second battles, high-stakes type matchups, and 100% handcrafted physical creature art.

### Creators
* **Anirudh (anonspud)** — Code, Web Engineering, and Implementation
* **Lakshya (ganu)** — Art Direction, Creature Illustrations, and Character Design

We are an independent duo based in India building this card game for the pure love of tabletop duels and arcade machines.

---

## Creative Transparency & Art Guarantee

* **100% Human Art:** All creature cards, panoramic world illustrations, card frames, and logos were hand-drawn and designed by Lakshya (ganu). No generative AI was used for any artwork, card assets, or brand graphics.
* **Code Implementation:** The frontend website code was built with AI code assistance by Anirudh (anonspud) to create a custom arcade-flyer web experience.

---

## Tech Stack

* **Framework:** React 19
* **Build Tool:** Vite 7
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4 (configured via `@theme`)
* **Icons:** Lucide React
* **Audio:** Web Audio API (native synth sound effects)

---

## Getting Started Locally

### Prerequisites
* Node.js (v18 or higher recommended)
* npm

### Installation & Run

1. Clone the repository:
   ```bash
   git clone git@github.com:orb-studios/orb.git
   cd orb
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build locally:
   ```bash
   npm run preview
   ```

---

## Deployment

The project is configured for continuous production deployment on Vercel:
* **Project on Vercel:** `orbstudios`
* **Live Website URL:** [https://orbstudios.vercel.app](https://orbstudios.vercel.app)
