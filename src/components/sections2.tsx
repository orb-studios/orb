import { useState } from "react";
import { Package, Swords, TrendingUp, Sparkles, RotateCcw, Gamepad2, ArrowRight, MapPin, Github } from "./icons";
import { CARDS, ELEMENT_META } from "../data/cards";
import { ArcadeButton, JPBadge, Magnetic, Marquee, SectionHeader, Starburst } from "./ui";
import { ElementIcon, TCGCard } from "./TCGCard";
import { cn } from "../utils/cn";
import { sound } from "../utils/sound";

/* ================= HOW TO PLAY ================= */
export function HowTo() {
  const steps = [
    {
      no: "01", jp: "こうちく", icon: Package, color: "#00b4ff",
      t: "BUILD YOUR DECK", d: "Pick 12 creatures + 3 trick cards. Grass wall? Fire rush? Cursed all-Magic chaos? Your call, champ.",
    },
    {
      no: "02", jp: "たいせん", icon: Swords, color: "#FF0B0B",
      t: "BATTLE IN 60 SECONDS", d: "One HP bar each. Slap a card to attack, swipe to dodge. Elements counter — check the chart or cry trying.",
    },
    {
      no: "03", jp: "しんか", icon: TrendingUp, color: "#2fbf4a",
      t: "PULL, TRADE & SHINE", d: "Win packs, trade dupes with friends, and chase holo foils that sparkle like arcade carpet.",
    },
  ];
  return (
    <section id="how" className="relative overflow-hidden bg-[#FFD900]">
      <div className="halftone absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHeader no="04" jp="あそびかた" title={<>EASY TO LEARN.<br />HARD TO PUT DOWN.</>} sub="60-SECOND DUELS — すぐおぼえられる" />
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.no}
              className="reveal group relative rounded-xl border-4 border-[#111110] bg-[#FFFDF4] p-6 shadow-[8px_8px_0_#111110] transition hover:-translate-y-2 hover:rotate-[0.6deg] md:p-7"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="absolute -top-4 left-5 rounded-full border-[3px] border-[#111110] bg-[#111110] px-3 py-1 font-display text-xs text-white shadow-[3px_3px_0_rgba(0,0,0,0.25)]">
                STEP {s.no} — {s.jp}
              </span>
              <span
                className="mt-3 grid h-16 w-16 place-items-center rounded-xl border-[3.5px] border-[#111110] text-white shadow-[4px_4px_0_#111110] transition group-hover:animate-wiggle"
                style={{ background: s.color }}
              >
                <s.icon className="h-7 w-7" strokeWidth={2.4} />
              </span>
              <h3 className="mt-4 font-display text-xl leading-tight">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#111110]/70">{s.d}</p>
              {i < 2 && (
                <span className="absolute -right-5 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center rounded-full border-[3px] border-[#111110] bg-white shadow-[3px_3px_0_#111110] md:grid">
                  <ArrowRight className="h-5 w-5" />
                </span>
              )}
            </div>
          ))}
        </div>

        {/* versus strip */}
        <div className="reveal mt-10 overflow-hidden rounded-xl border-4 border-[#111110] bg-[#111110] text-white shadow-[8px_8px_0_rgba(0,0,0,0.3)]">
          <div className="flex flex-col items-stretch justify-between gap-4 p-6 md:flex-row md:items-center md:p-8">
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-[3px] border-white bg-[#FF0B0B] font-display text-xl">P1</span>
              <div>
                <p className="font-display text-lg">YOU vs THE ARCADE GHOST</p>
                <p className="font-pixel text-xs tracking-[0.2em] text-white/60">FIRST BATTLE TAKES 90 SECONDS — 初戦はすぐ</p>
              </div>
            </div>
            <div className="hidden items-center gap-2 font-display text-3xl text-[#FFD900] md:flex">
              <span>VS</span><span className="font-jp text-xl">対戦</span>
            </div>
            <div className="flex items-center gap-4 md:flex-row-reverse md:text-right">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-[3px] border-white bg-[#00b4ff] font-display text-xl">
                👾
              </span>
              <div>
                <p className="font-display text-lg">CPU — ARCADE GHOST</p>
                <p className="font-pixel text-xs tracking-[0.2em] text-white/60">DIFFICULTY: NORMAL ★☆☆</p>
              </div>
            </div>
          </div>
          <div className="ticket-edge opacity-20" />
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 md:px-8">
            <p className="font-pixel text-[11px] tracking-[0.25em] text-white/60">NO ACCOUNT NEEDED FOR FIRST DUEL ● アカウント不要</p>
            <p className="flex items-center gap-2 font-display text-sm text-[#FFD900]"><Sparkles className="h-4 w-4" /> WIN = FREE PACK</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= PACK OPENING ================= */
export function Packs() {
  const [pulled, setPulled] = useState<(typeof CARDS)[number] | null>(null);
  const [opening, setOpening] = useState(false);
  const [count, setCount] = useState(0);

  const pull = () => {
    if (opening) return;
    setOpening(true);
    setPulled(null);
    setTimeout(() => {
      const weights = CARDS.map((c) => (c.rarity === "SECRET" ? 0.5 : c.rarity === "LEGENDARY" ? 1 : c.rarity === "EPIC" ? 2.5 : 5));
      const total = weights.reduce((a, b) => a + b, 0);
      let r = Math.random() * total;
      let pick = CARDS[0];
      for (let i = 0; i < CARDS.length; i++) {
        r -= weights[i];
        if (r <= 0) { pick = CARDS[i]; break; }
      }
      setPulled(pick);
      setCount((c) => c + 1);
      setOpening(false);
      sound.packOpen();
    }, 900);
  };

  return (
    <section id="packs" className="relative overflow-hidden bg-[#FF0B0B]">
      <div className="halftone-white absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHeader
          no="05" jp="ガチャ" dark
          title={<>FEELING LUCKY?<br />PULL A PACK.</>}
          sub="FREE DEMO PULLS — タダでひけるよ"
        />

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* booster */}
          <div className="reveal relative mx-auto w-full max-w-[360px]">
            <div className={cn("relative", opening && "animate-shake")}>
              <div className="relative overflow-hidden rounded-2xl border-4 border-[#111110] bg-[#111110] shadow-[10px_10px_0_rgba(0,0,0,0.4)]">
                <div className="halftone-white absolute inset-0 opacity-30" />
                {/* zigzag top seal */}
                <div className="relative flex items-center justify-between bg-[#FFD900] px-5 py-2.5">
                  <span className="font-display text-sm">ORB BOOSTER</span>
                  <span className="font-jp text-sm font-bold">ブースター</span>
                </div>
                <div className="relative px-6 py-8 text-center">
                  <div className="mx-auto h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-[5px_5px_0_rgba(255,255,255,0.3)]">
                    <img src="/brand/logo.jpg" alt="Orb Studios Logo" className="h-full w-full object-cover" />
                  </div>
                  <p className="mt-4 font-display text-2xl text-white">MYSTERY PACK</p>
                  <p className="font-pixel text-xs tracking-[0.3em] text-[#FFD900]">16 CARDS POOL — 100% HAND-DRAWN</p>
                  <div className="mx-auto mt-4 flex max-w-[220px] justify-center gap-1.5">
                    {(Object.keys(ELEMENT_META) as (keyof typeof ELEMENT_META)[]).map((el) => (
                      <span key={el} className="grid h-9 w-9 place-items-center rounded-full border-[3px] border-white text-white" style={{ background: ELEMENT_META[el].color }}>
                        <ElementIcon element={el} className="h-4 w-4" />
                      </span>
                    ))}
                  </div>
                </div>
                <div className="relative bg-white px-5 py-3">
                  <div className="flex items-end justify-between">
                    <div className="flex h-8 items-end gap-[3px]">
                      {[3, 1, 2, 1, 3, 2, 1, 3, 1, 2, 3, 1, 2, 1].map((h, i) => (
                        <span key={i} className="w-[3px] bg-[#111110]" style={{ height: `${h * 8}px` }} />
                      ))}
                    </div>
                    <span className="font-pixel text-[10px] tracking-widest">VOL.01 — ¥0</span>
                  </div>
                </div>
                {opening && (
                  <div className="absolute inset-0 grid place-items-center bg-[#111110]/60 backdrop-blur-[1px]">
                    <p className="animate-blink font-display text-2xl text-[#FFD900]">OPENING… あけてる!</p>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Magnetic>
                <ArcadeButton variant="yellow" data-cursor="go" onClick={pull}>
                  {opening ? "OPENING…" : "PULL A CARD — ひく!"}
                </ArcadeButton>
              </Magnetic>
            </div>
            <p className="mt-3 text-center font-pixel text-xs tracking-[0.25em] text-white/80">
              DEMO PULLS: {String(count).padStart(2, "0")} — つづけてOK
            </p>
          </div>

          {/* result */}
          <div className="reveal relative mx-auto w-full max-w-[340px]">
            {!pulled && !opening && (
              <div className="grid aspect-[3/4.4] place-items-center rounded-xl border-4 border-dashed border-white/50 bg-white/10 p-8 text-center backdrop-blur-sm">
                <div>
                  <Starburst color="white" className="mx-auto h-24 w-24 text-[11px]">
                    ???<br />だれかな
                  </Starburst>
                  <p className="mt-4 font-display text-lg text-white">YOUR PULL APPEARS HERE</p>
                  <p className="mt-1 font-pixel text-xs tracking-[0.2em] text-white/70">LEGEND RATE: 7% — がんばれ</p>
                </div>
              </div>
            )}
            {opening && (
              <div className="grid aspect-[3/4.4] animate-pulse place-items-center rounded-xl border-4 border-white bg-white/20">
                <p className="font-display text-xl text-white">シャッフル中…</p>
              </div>
            )}
            {pulled && !opening && (
              <div className="animate-pop-in">
                <TCGCard card={pulled} tilt={false} />
                <div className="mt-4 flex items-center justify-between rounded-lg border-[3px] border-[#111110] bg-white px-4 py-2.5 shadow-[5px_5px_0_#111110]">
                  <p className="font-display text-sm">YOU PULLED {pulled.name}!</p>
                  <button onClick={pull} className="flex cursor-pointer items-center gap-1 font-pixel text-[11px] tracking-widest text-[#FF0B0B] hover:underline">
                    <RotateCcw className="h-3.5 w-3.5" /> AGAIN
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative border-t-[3.5px] border-[#111110] bg-[#FFD900] py-2.5">
        <Marquee reverse>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-5 pr-5 font-display text-sm">
              <span>NO DUPES IN A BOX</span><span>★</span>
              <span className="font-jp">ダブりなし</span><span>★</span>
              <span>HOLO IN EVERY 3RD PACK</span><span>★</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/* ================= FINAL CTA ================= */
export function FinalCTA({ go }: { go: (p: "home" | "play") => void }) {
  return (
    <section className="grain relative overflow-hidden bg-[#111110] text-white">
      <div className="grid-neon absolute inset-0" />
      {/* red burst */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-20" style={{ background: "conic-gradient(from 0deg, #FF0B0B 0 12deg, transparent 12deg 24deg, #FF0B0B 24deg 36deg, transparent 36deg 48deg, #FF0B0B 48deg 60deg, transparent 60deg 72deg, #FF0B0B 72deg 84deg, transparent 84deg 96deg, #FF0B0B 96deg 108deg, transparent 108deg 120deg, #FF0B0B 120deg 132deg, transparent 132deg 144deg, #FF0B0B 144deg 156deg, transparent 156deg 168deg, #FF0B0B 168deg 180deg, transparent 180deg 192deg, #FF0B0B 192deg 204deg, transparent 204deg 216deg, #FF0B0B 216deg 228deg, transparent 228deg 240deg, #FF0B0B 240deg 252deg, transparent 252deg 264deg, #FF0B0B 264deg 276deg, transparent 276deg 288deg, #FF0B0B 288deg 300deg, transparent 300deg 312deg, #FF0B0B 312deg 324deg, transparent 324deg 336deg, #FF0B0B 336deg 348deg, transparent 348deg 360deg)" }} />
      <div className="relative mx-auto max-w-5xl px-4 py-24 text-center md:px-8 md:py-32">
        <div className="reveal flex justify-center gap-2.5">
          <JPBadge jp="いますぐ" en="RIGHT NOW" bg="#FF0B0B" color="white" />
          <JPBadge jp="無料プレイ" en="FREE" bg="#FFD900" />
        </div>
        <h2 className="reveal mx-auto mt-6 max-w-4xl font-display text-5xl leading-[1.02] md:text-7xl lg:text-8xl">
          READY TO
          <br />
          <span className="text-[#FF0B0B] [text-shadow:4px_4px_0_white]">DUEL, CHAMP?</span>
        </h2>
        <p className="reveal mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/70">
          Your starter deck is packed, the arcade is warm, and somewhere out there
          a <strong className="text-white">KIRIN holo</strong> has your name on it.
          <span className="font-jp font-bold text-[#FFD900]"> — いざ、勝負！</span>
        </p>
        <div className="reveal mt-9 flex flex-wrap items-center justify-center gap-4">
          <Magnetic strength={24}>
            <button
              onClick={() => go("play")}
              data-cursor="go"
              className="group inline-flex cursor-pointer items-center gap-3 border-4 border-white bg-[#FF0B0B] px-10 py-5 font-display text-xl shadow-[8px_8px_0_white] transition hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[4px_4px_0_white] md:text-2xl"
            >
              <Gamepad2 className="h-7 w-7 transition group-hover:animate-wiggle" />
              INSERT COIN — PLAY
            </button>
          </Magnetic>
        </div>
        <p className="reveal mt-6 animate-blink font-pixel text-xs tracking-[0.35em] text-[#FFD900]">
          ● PRESS START ● スタートをおしてね ●
        </p>
      </div>
    </section>
  );
}

/* ================= FOOTER ================= */
export function Footer({ go }: { go: (p: "home" | "play") => void }) {
  return (
    <footer className="relative overflow-hidden border-t-[3.5px] border-[#111110] bg-[#FFFDF4]">
      <div className="mx-auto max-w-7xl px-4 pb-6 pt-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <button onClick={() => go("home")} className="flex cursor-pointer items-center gap-2.5">
              <img
                src="/brand/logo.jpg"
                alt="Orb Studios Logo"
                className="h-11 w-11 rounded-full border-[3px] border-[#111110] object-cover shadow-[3px_3px_0_#111110]"
              />
              <span className="text-left leading-none">
                <span className="block font-display text-2xl">orb</span>
                <span className="block font-pixel text-[9px] tracking-[0.3em] opacity-60">ORB STUDIOS</span>
              </span>
            </button>
            <p className="mt-4 max-w-[280px] text-sm leading-relaxed text-[#111110]/65">
              An indie arcade card game created by two friends. Hand-drawn art by Lakshya (ganu), code &amp; build by Anirudh (anonspud).
            </p>
            <div className="mt-4 flex gap-2.5">
              <a
                href="https://github.com/anonspud/orb-studios"
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-lg border-[3px] border-[#111110] bg-white shadow-[3px_3px_0_#111110] transition hover:-translate-y-1 hover:bg-[#FFD900]"
                aria-label="GitHub Repository"
                title="GitHub Repository"
              >
                <Github className="h-4.5 w-4.5" />
              </a>
              <a
                href="https://orbtcg.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-lg border-[3px] border-[#111110] bg-white shadow-[3px_3px_0_#111110] transition hover:-translate-y-1 hover:bg-[#FFD900]"
                aria-label="Play Game on orbtcg.vercel.app"
                title="Play on orbtcg.vercel.app"
              >
                <Gamepad2 className="h-4.5 w-4.5" />
              </a>
            </div>
          </div>
          <div>
            <p className="font-display text-sm tracking-wide">GAME <span className="font-jp text-xs opacity-50">ゲーム</span></p>
            <ul className="mt-3 space-y-2 text-sm text-[#111110]/70">
              {["Starter deck", "Elements", "How to play", "Booster packs"].map((l) => (
                <li key={l}><a href="#deck" className="transition hover:text-[#FF0B0B] hover:underline">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display text-sm tracking-wide">ABOUT <span className="font-jp text-xs opacity-50">について</span></p>
            <ul className="mt-3 space-y-2 text-sm text-[#111110]/70">
              {["Manifesto", "Creators", "Creatures"].map((l) => (
                <li key={l}><a href="#manifesto" className="transition hover:text-[#FF0B0B] hover:underline">{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display text-sm tracking-wide">CREATORS <span className="font-jp text-xs opacity-50">つくりて</span></p>
            <div className="mt-3 space-y-2 text-sm leading-relaxed text-[#111110]/70">
              <p><strong className="text-[#111110]">Anirudh</strong> (anonspud)<br />Code &amp; Web</p>
              <p><strong className="text-[#111110]">Lakshya</strong> (ganu)<br />Art &amp; Character Design</p>
            </div>
            <p className="mt-3 inline-block rounded-full border-2 border-[#111110] bg-[#FFD900] px-3 py-1 font-pixel text-[10px] tracking-widest text-[#111110]">
              INDIE DUO ★ INDIA
            </p>
          </div>
        </div>

        {/* Transparency Disclaimer Notice */}
        <div className="mt-10 rounded-xl border-[3.5px] border-[#111110] bg-[#FFF7E8] p-5 shadow-[6px_6px_0_#111110]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-dashed border-[#111110]/20 pb-2.5">
            <span className="font-display text-sm text-[#111110]">
              CREATIVE TRANSPARENCY &amp; PRODUCTION NOTICE
            </span>
            <span className="rounded-full border-2 border-[#111110] bg-[#FFD900] px-2.5 py-0.5 font-pixel text-[10px] tracking-widest text-[#111110]">
              100% HUMAN ART
            </span>
          </div>
          <p className="mt-2.5 text-xs leading-relaxed text-[#111110]/80">
            This official website was built with AI code assistance while the full game platform is in active development.
            <strong className="text-[#FF0B0B]"> All card illustrations, creature designs, character artwork, and logos were 100% created by human artists (Art &amp; Character Design: Lakshya / ganu; Development &amp; Code: Anirudh / anonspud).</strong> No generative AI was used for any artwork, card assets, or brand identity.
          </p>
        </div>

        {/* giant outline studio watermark */}
        <div className="pointer-events-none mt-8 select-none overflow-hidden" aria-hidden>
          <p className="text-outline whitespace-nowrap text-center font-display text-[8.5vw] uppercase leading-none tracking-[0.08em] opacity-[0.07] md:text-[5.5rem] lg:text-[6.8rem]">
            ORB STUDIOS
          </p>
        </div>

        <div className="ticket-edge opacity-25" />
        <div className="flex flex-col items-center justify-between gap-3 py-5 font-pixel text-[10px] tracking-[0.2em] text-[#111110]/55 md:flex-row md:text-[11px]">
          <p>© 2026 ORB STUDIOS — ALL RIGHTS RESERVED ● 無断転載禁止</p>
          <p className="flex items-center gap-2">HAND-CRAFTED WITH ♥ IN INDIA</p>
        </div>
      </div>
    </footer>
  );
}
