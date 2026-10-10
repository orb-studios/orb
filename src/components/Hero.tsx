import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Play, Layers, ChevronDown, Sparkles, Zap } from "lucide-react";
import { CARDS } from "../data/cards";
import { JPBadge, Magnetic, Marquee, OrbWordmark, SpinBadge, Starburst } from "./ui";
import { TCGCard } from "./TCGCard";

export function Hero({ go }: { go: (p: "home" | "play") => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      setTilt({
        x: (e.clientX - r.left) / r.width - 0.5,
        y: (e.clientY - r.top) / r.height - 0.5,
      });
    };
    el.addEventListener("mousemove", move);
    return () => el.removeEventListener("mousemove", move);
  }, []);

  const left = CARDS.find((c) => c.id === "cracken") || CARDS[0];
  const mid = CARDS.find((c) => c.id === "kirin") || CARDS[1];
  const right = CARDS.find((c) => c.id === "skeleton") || CARDS[2];

  return (
    <section ref={root} className="grain relative overflow-hidden bg-[#FF0B0B]">
      {/* textures */}
      <div className="halftone-white absolute inset-0 opacity-60" />
      <div
        className="absolute inset-0 opacity-25"
        style={{ background: "repeating-linear-gradient(-45deg, transparent 0 34px, rgba(0,0,0,0.5) 34px 36px)" }}
      />
      {/* giant faint kanji backdrop */}
      <div className="pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2 select-none font-display text-[26rem] leading-none text-black/10 xl:block">
        魂
      </div>
      <div className="pointer-events-none absolute -left-10 top-10 hidden select-none font-display text-[12rem] leading-none text-white/10 xl:block">
        炎
      </div>

      {/* vertical side rails */}
      <div className="absolute left-0 top-0 z-20 hidden h-full w-12 flex-col items-center justify-between border-r-[3px] border-[#111110] bg-[#FFFDF4] py-6 lg:flex">
        <span className="vertical-rl font-display text-sm tracking-[0.3em]">オーブ・トレーディングカード</span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-[#FF0B0B] font-pixel text-xs text-white">●</span>
        <span className="vertical-rl font-pixel text-[11px] tracking-[0.3em] opacity-60">INDIE ARCADE TCG — VOL.01</span>
      </div>
      <div className="absolute right-0 top-0 z-20 hidden h-full w-12 flex-col items-center justify-between border-l-[3px] border-[#111110] bg-[#111110] py-6 text-white lg:flex">
        <span className="vertical-rl font-pixel text-[11px] tracking-[0.3em] text-white/70">PRESS START — はじめよう</span>
        <span className="h-16 w-[3px] animate-blink bg-[#FFD900]" />
        <span className="vertical-rl font-display text-sm tracking-[0.3em] text-[#FFD900]">バトル・コレクション</span>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-12 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-20 lg:pb-24">
        {/* LEFT — type */}
        <div className="text-center lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
            <JPBadge jp="オーブスタジオ" en="ORB STUDIOS" bg="#111110" color="white" />
            <JPBadge jp="手描き" en="HAND-DRAWN" bg="#FFD900" />
          </div>

          <div
            className="relative mx-auto mt-4 max-w-[560px] lg:mx-0"
            style={{ transform: `translate(${tilt.x * -14}px, ${tilt.y * -10}px)` }}
          >
            <OrbWordmark className="w-full" />
            {/* sparkles */}
            <Sparkles className="absolute -left-4 top-2 h-8 w-8 animate-float text-[#FFD900] drop-shadow-[2px_2px_0_#111110]" style={{ ["--fl-rot" as string]: "-12deg" }} />
            <Zap className="absolute -right-2 top-10 h-7 w-7 animate-float-delayed fill-[#FFD900] text-[#111110]" />
          </div>

          <p className="mx-auto mt-5 max-w-[480px] font-display text-xl leading-snug text-white [text-shadow:3px_3px_0_#111110] md:text-2xl lg:mx-0">
            A TINY ARCADE TCG WITH A{" "}
            <span className="bg-[#111110] text-[#FFD900]">HUGE HEART</span>
          </p>
          <p className="mx-auto mt-3 max-w-[440px] text-[15px] font-medium leading-relaxed text-white/95 [text-shadow:1px_1px_0_rgba(0,0,0,0.4)] lg:mx-0">
            Collect 45 hand-drawn creatures, build a rowdy little deck, and duel
            in snack-sized 60-second battles. No pay-to-win. Just vibes.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
            <Magnetic>
              <button
                onClick={() => go("play")}
                data-cursor="go"
                className="group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden border-4 border-[#111110] bg-[#111110] px-8 py-4 font-display text-lg text-white shadow-[7px_7px_0_rgba(0,0,0,0.35)] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_rgba(0,0,0,0.35)]"
              >
                <span className="card-glare" />
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#FF0B0B] transition group-hover:scale-110">
                  <Play className="h-4 w-4 fill-white" />
                </span>
                PLAY FREE
                <span className="font-jp text-sm text-[#FFD900]">無料</span>
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href="#deck"
                className="inline-flex items-center gap-2 border-4 border-[#111110] bg-white px-7 py-4 font-display text-lg shadow-[7px_7px_0_#111110] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0_#111110]"
              >
                <Layers className="h-5 w-5" /> VIEW DECK
              </a>
            </Magnetic>
          </div>

          {/* stats ticket */}
          <div className="mx-auto mt-8 grid max-w-[480px] grid-cols-3 overflow-hidden rounded-lg border-[3.5px] border-[#111110] bg-[#FFFDF4] shadow-[6px_6px_0_#111110] lg:mx-0">
            {[
              { n: "16", l: "REVEALED", jp: "公開中" },
              { n: "07", l: "ELEMENTS", jp: "ぞくせい" },
              { n: "60s", l: "BATTLES", jp: "バトル" },
            ].map((s, i) => (
              <div key={s.l} className={i > 0 ? "border-l-[3px] border-[#111110] px-2 py-3" : "px-2 py-3"}>
                <p className="font-display text-2xl leading-none md:text-3xl">{s.n}</p>
                <p className="mt-1 font-pixel text-[10px] tracking-[0.2em]">{s.l}</p>
                <p className="font-jp text-[11px] font-bold text-[#FF0B0B]">{s.jp}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — floating card fan */}
        <div className="relative mx-auto h-[480px] w-full max-w-[520px] sm:h-[560px] lg:h-[620px]">
          {/* rotating badge */}
          <SpinBadge
            text="オーブ ● HAND-DRAWN ● ARCADE TCG ● オーブ ● "
            center={
              <span className="grid h-14 w-14 place-items-center rounded-full border-[3px] border-[#111110] bg-[#FFD900] font-display text-xl shadow-[4px_4px_0_#111110]">
                魂
              </span>
            }
            className="absolute -top-2 right-2 z-30 h-32 w-32 text-white [filter:drop-shadow(3px_3px_0_#111110)] md:h-36 md:w-36"
          />
          <Starburst color="#FFD900" className="absolute -left-2 top-6 z-30 h-28 w-28 animate-float text-[13px] md:h-32 md:w-32">
            STARTER<br />DECK 01<br />決定版!
          </Starburst>

          {/* cards */}
          <div
            className="absolute left-0 top-16 w-[46%] animate-float"
            style={{ ["--fl-rot" as string]: "-10deg", transform: `translate(${tilt.x * 22}px, ${tilt.y * 16}px) rotate(-10deg)` } as CSSProperties}
          >
            <div className="rotate-[-10deg]"><TCGCard card={left} tilt={false} /></div>
          </div>
          <div
            className="absolute right-0 top-24 w-[46%] animate-float-delayed"
            style={{ transform: `translate(${tilt.x * -22}px, ${tilt.y * -12}px)` } as CSSProperties}
          >
            <div className="rotate-[9deg]"><TCGCard card={right} tilt={false} /></div>
          </div>
          <div
            className="absolute left-1/2 top-40 z-10 w-[52%] -translate-x-1/2"
            style={{ transform: `translate(calc(-50% + ${tilt.x * 10}px), ${tilt.y * 8}px)` }}
          >
            <div className="animate-[float_4s_ease-in-out_infinite]">
              <TCGCard card={mid} tilt={false} className="[filter:drop-shadow(0_18px_24px_rgba(0,0,0,0.35))]" />
            </div>
          </div>

          {/* floor shadow */}
          <div className="absolute -bottom-2 left-1/2 h-8 w-[80%] -translate-x-1/2 rounded-[100%] bg-black/30 blur-xl" />
        </div>
      </div>

      {/* bottom insert-coin strip */}
      <div className="relative z-20 border-y-[3.5px] border-[#111110] bg-[#111110] py-4 text-white">
        <Marquee>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-6 pr-6 font-pixel text-sm tracking-[0.3em]">
              <span className="text-[#FFD900]">★ INSERT COIN ★</span>
              <span>コインをいれてね</span>
              <span className="text-[#FF0B0B]">●</span>
              <span className="font-display text-sm tracking-normal">COLLECT — BATTLE — TRADE</span>
              <span className="text-[#FF0B0B]">●</span>
            </span>
          ))}
        </Marquee>
        <a
          href="#manifesto"
          className="absolute left-1/2 top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border-[3px] border-white bg-[#FF0B0B] px-5 py-2 font-display text-sm shadow-[3px_3px_0_rgba(255,255,255,0.35)] transition hover:scale-105 md:inline-flex"
        >
          SCROLL <ChevronDown className="h-4 w-4 animate-bounce-soft" />
        </a>
      </div>
    </section>
  );
}
