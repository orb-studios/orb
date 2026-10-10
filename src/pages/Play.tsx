import { useEffect, useState } from "react";
import { ArrowLeft, Construction, Gamepad2, Lock, Wrench } from "lucide-react";
import { JPBadge, Magnetic } from "../components/ui";
import { useReveal } from "../hooks/useReveal";

export function Play({ go, credits }: { go: (p: "home" | "play") => void; credits: number }) {
  useReveal();
  const [dots, setDots] = useState("");

  useEffect(() => {
    const t = setInterval(() => setDots((d) => (d.length >= 3 ? "" : d + ".")), 500);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="scanlines crt-flicker relative min-h-[calc(100vh-120px)] overflow-hidden bg-[#0c0c0e] text-white">
      <div className="grid-neon absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[110%] -translate-x-1/2 rounded-[100%] bg-[#FF0B0B]/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center md:py-24">
        <div className="reveal is-visible flex gap-2.5">
          <JPBadge jp="工事中" en="UNDER CONSTRUCTION" bg="#FFD900" />
          <JPBadge jp="まっててね" en="STAGE 01" bg="white" />
        </div>

        {/* cabinet screen */}
        <div className="reveal is-visible relative mt-8 w-full overflow-hidden rounded-2xl border-4 border-white/90 bg-[#111110] shadow-[10px_10px_0_#FF0B0B]">
          <div className="flex items-center justify-between border-b-[3px] border-white/20 bg-black/40 px-5 py-3">
            <p className="font-pixel text-xs tracking-[0.3em] text-white/70">ORB ARCADE ● PLAYER 1</p>
            <p className="flex items-center gap-2 font-pixel text-xs tracking-[0.2em] text-[#FFD900]">
              <span className="h-2.5 w-2.5 animate-blink rounded-full bg-[#FF0B0B]" /> CREDIT {String(credits).padStart(2, "0")}
            </p>
          </div>
          <div className="relative px-6 py-14 md:py-20">
            <Construction className="mx-auto h-14 w-14 text-[#FFD900]" strokeWidth={1.8} />
            <h1 className="mx-auto mt-6 max-w-xl font-display text-4xl leading-tight md:text-6xl">
              GAME CABINET
              <br />
              <span className="text-[#FF0B0B] [text-shadow:3px_3px_0_white]">LOADING{dots}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/65">
              This page is intentionally empty — the duel engine is still being
              soldered together by extremely tired goblins.
              <span className="font-jp font-bold text-white/90"> もうすこし まってね！</span>
            </p>
            <p className="mt-6 animate-blink font-pixel text-sm tracking-[0.4em] text-[#FFD900]">
              ► PRESS START TO GO BACK ◄
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Magnetic>
                <button
                  onClick={() => go("home")}
                  className="inline-flex cursor-pointer items-center gap-2.5 border-[3.5px] border-white bg-[#FF0B0B] px-8 py-4 font-display text-lg shadow-[6px_6px_0_white] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_white]"
                >
                  <ArrowLeft className="h-5 w-5" /> BACK TO SHOWCASE
                </button>
              </Magnetic>
            </div>
          </div>
          {/* fake controls */}
          <div className="flex items-center justify-center gap-6 border-t-[3px] border-white/20 bg-black/40 px-5 py-4 opacity-50">
            <span className="flex items-center gap-2 font-pixel text-[11px] tracking-[0.25em] text-white/70">
              <Gamepad2 className="h-4 w-4" /> CONTROLS LOCKED <Lock className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        {/* roadmap ticket */}
        <div className="reveal is-visible mt-8 w-full rounded-xl border-[3px] border-dashed border-white/30 bg-white/5 p-6 text-left">
          <p className="flex items-center gap-2 font-display text-base text-[#FFD900]">
            <Wrench className="h-5 w-5" /> BUILD LOG
          </p>
          <ul className="mt-3 space-y-2 font-pixel text-xs tracking-[0.15em] text-white/70">
            <li>[DONE] OFFICIAL SHOWCASE LAUNCH</li>
            <li>[DONE] 16 CREATURE CARDS REVEALED (45 IN TOTAL SET)</li>
            <li className="text-white">[WIP] DUEL ENGINE — PROTOTYPING{dots}</li>
            <li className="opacity-50">[TODO] ONLINE DUELS — IN DEVELOPMENT</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
