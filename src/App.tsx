import { useCallback, useEffect, useState } from "react";
import { Cursor, Navbar } from "./components/chrome";
import { Landing } from "./pages/Landing";
import { Play } from "./pages/Play";
import { sound } from "./utils/sound";

/*
  ═══════════════════════════════════════════════════════════════
  ORB — SELF-PROMPT / BUILD PLAN (indie arcade TCG showcase)
  ───────────────────────────────────────────────────────────────
  ROLE: You are an Awwwards-winning creative developer building
  "orb", a hand-drawn indie arcade TCG by Orb Studios.

  NORTH STAR: It must feel like a Japanese game-center flyer that
  came alive — NOT like a generic AI template. Tactile, loud,
  sticker-bombed, full of tiny human details (barcodes, stamps,
  ticket stubs, handwritten notes, GANU illustrator credits).

  VISUAL SYSTEM (consistent everywhere):
  • Orb red #FF0B0B as hero colour, ink black #111110 outlines,
    paper cream #FFF7E8, yolk yellow #FFD900 accents.
  • Dela Gothic One for ALL display + JP badges. Space Grotesk
    for body. DotGothic16 for pixel/arcade microcopy.
  • Every panel = 3-4px black border + hard offset shadow
    (neo-brutalist sticker style). Rounded 10-14px.
  • Textures: halftone dots, blueprint grid, neon grid on dark,
    film grain, CRT scanlines on /play.
  • Japanese badges on every section (宣言・ぞくせい・ガチャ…),
    vertical side rails, rotating circular text, starbursts.

  SECTIONS (landing):
  1. Hero — red, giant ORB bubble wordmark, 3 floating TCG cards
     with mouse parallax, INSERT COIN marquee, stats ticket.
  2. Manifesto 宣言 — cream, editorial ticket + feature stickers.
  3. Elements ぞくせい — 4 colour-coded type cards.
  4. Deck デッキ — dark arcade room, filterable 5-card grid,
     click for intel modal with lore + stat bars.
  5. Wall of love — tilted review cards.
  6. How to 遊び方 — yellow, 3 steps + VS strip.
  7. Packs ガチャ — interactive weighted gacha pull.
  8. Final CTA + footer with giant outline type.

  INTERACTIONS (tasteful, not over-the-top):
  • Custom arcade cursor (desktop only), magnetic buttons,
    scroll reveals, card tilt + shine sweep, marquee tickers,
    coin counter easter egg, gacha randomiser, modal.
  • /play stays EMPTY by request: stylish CRT "under
    construction" cabinet, build log, back button.

  QUALITY BAR: responsive, 60fps, no layout shift, build clean.
  ═══════════════════════════════════════════════════════════════
*/

export default function App() {
  const [page, setPage] = useState<"home" | "play">("home");

  const go = useCallback((p: "home" | "play") => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  useEffect(() => {
    document.title = page === "play" ? "orb — game cabinet (coming soon)" : "orb — indie arcade TCG by Orb Studios";
  }, [page]);

  return (
    <div key={page} className="min-h-screen bg-[#FFF7E8] text-[#111110]">
      <Cursor />
      <Navbar page={page} go={go} />

      <div className="animate-[pop-in_0.4s_ease-out]">
        {page === "home" ? <Landing go={go} /> : <Play go={go} />}
      </div>
    </div>
  );
}
