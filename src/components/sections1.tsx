import { useMemo, useState } from "react";
import { Brush, Timer, HeartHandshake, Swords, ArrowUpRight, BadgeCheck } from "lucide-react";
import { CARDS, ELEMENT_META, type ElementType } from "../data/cards";
import { JPBadge, Marquee, SectionHeader, Starburst } from "./ui";
import { CardModal, ElementIcon, TCGCard } from "./TCGCard";
import { cn } from "../utils/cn";

/* ================= MANIFESTO ================= */
export function Manifesto() {
  const feats = [
    {
      icon: Brush,
      jp: "てがき",
      t: "100% hand-drawn",
      d: "Every creature is hand-drawn and inked by human artist GANU. Wobbly lines and bold personality stay in.",
    },
    {
      icon: Timer,
      jp: "60びょう",
      t: "60-second battles",
      d: "Built for bus rides and lunch breaks. Shuffle, slap cards, done before your noodles cool.",
    },
    {
      icon: HeartHandshake,
      jp: "フェア",
      t: "Zero pay-to-win",
      d: "Earn packs by playing. Rare pulls come from skill and luck — never your wallet.",
    },
  ];

  return (
    <section id="manifesto" className="relative overflow-hidden bg-[#FFF7E8]">
      <div className="grid-blueprint absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHeader no="01" jp="宣言" title={<>SMALL STUDIO.<br />BIG MONSTERS.</>} sub="THE ORB MANIFESTO — なぜつくった？" />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div className="reveal">
            <div className="relative rounded-xl border-4 border-[#111110] bg-[#FFFDF4] p-7 shadow-[8px_8px_0_#111110] md:p-9">
              <div className="absolute -top-5 left-6 flex gap-2">
                <JPBadge jp="ドキドキ" en="WAKU WAKU" bg="#FF0B0B" color="white" />
                <JPBadge jp="インディー" en="INDIE" bg="white" className="hidden sm:inline-flex" />
              </div>
              <p className="font-display text-2xl leading-snug md:text-[1.7rem]">
                We missed the <span className="bg-[#FFD900] px-1.5">crinkle of a fresh pack</span> on
                the walk home from the arcade —
              </p>
              <p className="mt-4 text-[15.5px] leading-relaxed text-[#111110]/75">
                so we made <strong className="text-[#111110]">orb</strong>: a pocket-sized trading card
                game inspired by retro arcade fighters and Saturday morning cartoons.
                Chunky HP numbers. Loud elements. Creatures with personalities bigger than their attack stats.
              </p>
              <p className="mt-3 text-[15.5px] leading-relaxed text-[#111110]/75">
                Handcrafted creature designs and art by <strong className="text-[#111110]">Lakshya (ganu)</strong>,
                code &amp; web build by <strong className="text-[#111110]">Anirudh (anonspud)</strong>.
                Just two friends building an indie card game for fun.
              </p>
              <div className="ticket-edge my-6 opacity-30" />
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex -space-x-2">
                  <span className="grid h-10 w-10 place-items-center rounded-full border-[3px] border-[#111110] bg-[#FF0B0B] font-display text-xs text-white">
                    A
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border-[3px] border-[#111110] bg-[#111110] font-display text-xs text-[#FFD900]">
                    L
                  </span>
                </div>
                <p className="font-pixel text-[11px] tracking-[0.2em] text-[#111110]/60">
                  CREATED BY ANIRUDH (ANONSPUD) &amp; LAKSHYA (GANU)
                </p>
              </div>
              {/* stamp */}
              <div className="absolute -bottom-6 -right-3 rotate-[8deg] rounded-lg border-[3.5px] border-[#FF0B0B] bg-white/90 px-4 py-2 font-display text-sm text-[#FF0B0B] shadow-[4px_4px_0_#111110] md:right-8">
                INDIE PROJECT
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {feats.map((f, i) => (
              <div
                key={f.t}
                className="reveal group flex gap-5 rounded-xl border-[3.5px] border-[#111110] bg-white p-5 shadow-[6px_6px_0_#111110] transition hover:-translate-y-1 hover:shadow-[8px_9px_0_#111110] md:p-6"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-lg border-[3px] border-[#111110] bg-[#FFD900] shadow-[3px_3px_0_#111110] transition group-hover:animate-wiggle">
                  <f.icon className="h-6 w-6" strokeWidth={2.4} />
                </span>
                <span>
                  <span className="flex flex-wrap items-center gap-2">
                    <strong className="font-display text-lg">{f.t}</strong>
                    <span className="rounded-full border-2 border-[#111110] bg-[#111110] px-2 py-0.5 font-jp text-[11px] font-bold text-white">
                      {f.jp}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-[#111110]/70">{f.d}</span>
                </span>
              </div>
            ))}
            <div className="reveal flex items-center gap-3 rounded-xl border-[3.5px] border-dashed border-[#111110]/40 bg-[#FFD900]/30 px-5 py-4">
              <BadgeCheck className="h-5 w-5 shrink-0" />
              <p className="font-pixel text-xs tracking-[0.15em]">
                16 CARDS REVEALED IN THIS PREVIEW — 45 IN THE FULL FIRST EDITION!
              </p>
            </div>
          </div>
        </div>

        {/* Panoramic Artwork Showcase */}
        <div className="reveal mt-12 overflow-hidden rounded-xl border-4 border-[#111110] bg-[#111110] shadow-[8px_8px_0_#111110]">
          <div className="relative aspect-[2980/1244] w-full overflow-hidden">
            <img
              src="/brand/hero-banner.jpg"
              alt="Skeleton King on throne - Orb TCG artwork"
              className="h-full w-full object-cover select-none"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111110]/85 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-3 text-white md:bottom-5 md:left-6 md:right-6">
              <div>
                <span className="rounded-full border-2 border-white bg-[#FF0B0B] px-3 py-0.5 font-pixel text-[10px] tracking-widest uppercase">
                  ORIGINAL WORLD ART ● 100% 手描き
                </span>
                <p className="mt-1 font-display text-base sm:text-xl md:text-2xl text-white [text-shadow:2px_2px_0_#111110]">
                  THE SKELETON KING ON HIS THRONE
                </p>
              </div>
              <p className="font-pixel text-[11px] tracking-[0.2em] text-[#FFD900]">
                ART: LAKSHYA (GANU) * WEB: ANIRUDH (ANONSPUD)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* divider marquee */}
      <div className="relative border-y-[3.5px] border-[#111110] bg-[#111110] py-2.5 text-white">
        <Marquee>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-5 pr-5 font-display text-sm tracking-wide">
              <span>GRASS くさ</span><span className="text-[#2fbf4a]">●</span>
              <span>WATER みず</span><span className="text-[#00b4ff]">●</span>
              <span>FIRE ほのお</span><span className="text-[#ff5c00]">●</span>
              <span>MAGIC まほう</span><span className="text-[#f032a7]">●</span>
              <span>AIR かぜ</span><span className="text-[#38bdf8]">●</span>
              <span>PHANTOM ゆうれい</span><span className="text-[#a855f7]">●</span>
              <span>PLASMA プラズマ</span><span className="text-[#06b6d4]">●</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/* ================= ELEMENTS ================= */
export function Elements() {
  const order: ElementType[] = ["GRASS", "WATER", "FIRE", "MAGIC", "AIR", "PHANTOM", "PLASMA"];

  return (
    <section id="elements" className="relative overflow-hidden bg-[#FFFDF4]">
      <div className="halftone-fine absolute inset-0 opacity-70" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <SectionHeader no="02" jp="ぞくせい" title={<>SEVEN ELEMENTS.<br />ZERO MERCY.</>} sub="PICK YOUR AFFINITY — えらんでね" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {order.map((el, i) => {
            const m = ELEMENT_META[el];
            const count = CARDS.filter((c) => c.element === el).length;
            return (
              <div
                key={el}
                className="reveal group relative overflow-hidden rounded-xl border-4 border-[#111110] bg-white shadow-[7px_7px_0_#111110] transition hover:-translate-y-2 hover:rotate-[-0.5deg] hover:shadow-[10px_11px_0_#111110]"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="relative flex items-center justify-between px-5 pb-4 pt-5" style={{ background: m.color }}>
                  <div className="halftone-white absolute inset-0 opacity-50" />
                  <span className="relative grid h-14 w-14 place-items-center rounded-full border-[3.5px] border-[#111110] bg-white text-[#111110] shadow-[3px_3px_0_#111110] transition group-hover:animate-wiggle">
                    <ElementIcon element={el} className="h-6 w-6" />
                  </span>
                  <span className="relative font-display text-4xl text-white [text-shadow:3px_3px_0_#111110]">{m.jp}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl">{el}</h3>
                    <span className="font-pixel text-[11px] tracking-widest text-[#111110]/50">{String(count).padStart(2, "0")} SHOWN</span>
                  </div>
                  <p className="mt-2 min-h-[50px] text-sm leading-relaxed text-[#111110]/70">{m.desc}</p>
                  <div className="mt-3 flex items-center justify-between rounded-lg border-[3px] border-[#111110] px-3 py-2 font-pixel text-[11px] tracking-widest" style={{ background: m.soft }}>
                    <span className="flex items-center gap-1.5"><Swords className="h-3.5 w-3.5" /> STRONG VS</span>
                    <span className="font-display text-[11px]">{m.beats}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="reveal mt-8 text-center font-pixel text-xs tracking-[0.25em] text-[#111110]/50">
          FULL ELEMENTAL CHART UNLOCKS IN-GAME — ずかんをコンプリートしよう
        </p>
      </div>
    </section>
  );
}

/* ================= DECK ================= */
export function Deck() {
  const [filter, setFilter] = useState<ElementType | "ALL">("ALL");
  const [selected, setSelected] = useState<(typeof CARDS)[number] | null>(null);

  const filterOptions: (ElementType | "ALL")[] = [
    "ALL",
    "GRASS",
    "WATER",
    "FIRE",
    "MAGIC",
    "AIR",
    "PHANTOM",
    "PLASMA",
  ];

  const list = useMemo(() => (filter === "ALL" ? CARDS : CARDS.filter((c) => c.element === filter)), [filter]);

  return (
    <section id="deck" className="relative overflow-hidden bg-[#111110] text-white">
      <div className="grid-neon absolute inset-0" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[120%] -translate-x-1/2 rounded-[100%] bg-[#FF0B0B]/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader dark no="03" jp="デッキ" title={<>STARTER DECK 01.<br />MEET THE GANG.</>} sub="CLICK A CARD FOR INTEL — カードをタップ" />
          <div className="reveal relative mb-10 md:mb-14">
            <Starburst color="#FF0B0B" className="h-28 w-28 text-[12px] md:h-32 md:w-32">
              <span className="text-white [text-shadow:2px_2px_0_#111110]">
                16 / 45<br />REVEALED!<br />公開中
              </span>
            </Starburst>
          </div>
        </div>

        {/* filters */}
        <div className="reveal mb-10 flex flex-wrap gap-2.5">
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-full border-[3px] px-4 py-1.5 font-display text-xs sm:text-sm transition",
                filter === f
                  ? "border-white bg-[#FF0B0B] text-white shadow-[4px_4px_0_white]"
                  : "border-white/30 bg-white/5 text-white/70 hover:border-white hover:text-white"
              )}
            >
              {f !== "ALL" && <ElementIcon element={f} className="h-4 w-4" />}
              {f}
              {f !== "ALL" && <span className="font-jp text-xs opacity-70">{ELEMENT_META[f].jp}</span>}
              <span className="ml-1 rounded-full bg-white/20 px-1.5 py-0.2 font-pixel text-[10px]">
                {f === "ALL" ? CARDS.length : CARDS.filter((c) => c.element === f).length}
              </span>
            </button>
          ))}
        </div>

        {/* cards grid */}
        <div key={filter} className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {list.map((c, i) => (
            <div key={c.id} className="animate-pop-in flex flex-col" style={{ animationDelay: `${i * 40}ms` }}>
              <TCGCard card={c} onSelect={setSelected} />
              <div className="mt-3 flex items-center justify-between px-1">
                <p className="font-pixel text-[11px] tracking-[0.15em] text-white/70 truncate">
                  No.{c.num} — {c.name}
                </p>
                <span
                  className="flex shrink-0 cursor-pointer items-center gap-1 font-pixel text-[11px] tracking-widest text-[#FFD900] hover:underline"
                  onClick={() => setSelected(c)}
                >
                  INTEL <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-12 flex flex-col items-center gap-3 rounded-xl border-[3px] border-dashed border-white/30 bg-white/5 p-6 text-center">
          <p className="font-display text-lg text-white/90">+ 29 MORE CREATURES HIDING IN THE ARCADE…</p>
          <p className="font-pixel text-xs tracking-[0.25em] text-white/50">
            あと29ひき — FULL 45-CARD SET REVEALS AT OFFICIAL LAUNCH
          </p>
        </div>
      </div>

      <CardModal card={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
