import { Quote, Star } from "lucide-react";
import { Hero } from "../components/Hero";
import { Deck, Elements, Manifesto } from "../components/sections1";
import { FinalCTA, Footer, HowTo, Packs } from "../components/sections2";
import { Marquee } from "../components/ui";
import { useReveal } from "../hooks/useReveal";

function WallOfLove() {
  const quotes = [
    { n: "PLAYTESTER 01", jp: "さいこう", s: "Cracken is pure joy. The hand-drawn aesthetic feels completely different from generic digital cards.", c: "#00b4ff" },
    { n: "PLAYTESTER 02", jp: "たのしい", s: "60-second duel pace is super quick. Fast rounds, high stakes, easy to learn.", c: "#FF0B0B" },
    { n: "PLAYTESTER 03", jp: "キラキラ", s: "The physical hand-drawn card frames and creature illustrations by Lakshya give it genuine personality.", c: "#ff5c00" },
  ];
  return (
    <section className="relative overflow-hidden border-y-[3.5px] border-[#111110] bg-[#FFF7E8]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="reveal mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-2xl md:text-4xl">
            PLAYTEST VOICES <span className="font-jp text-lg text-[#FF0B0B]">みんなのこえ</span>
          </h2>
          <p className="flex items-center gap-1.5 font-pixel text-xs tracking-[0.2em] text-[#111110]/60">
            <Star className="h-4 w-4 fill-[#FFD900]" /> EARLY INDIE PLAYTEST FEEDBACK
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {quotes.map((q, i) => (
            <figure
              key={q.n}
              className="reveal relative rounded-xl border-[3.5px] border-[#111110] bg-white p-6 shadow-[6px_6px_0_#111110]"
              style={{ transitionDelay: `${i * 80}ms`, transform: `rotate(${i === 1 ? 1 : i === 0 ? -1 : 0.6}deg)` }}
            >
              <Quote className="h-6 w-6 fill-[#FFD900]" />
              <blockquote className="mt-3 text-[15px] leading-relaxed">“{q.s}”</blockquote>
              <figcaption className="mt-4 flex items-center justify-between border-t-[3px] border-dashed border-[#111110]/20 pt-3">
                <span className="font-display text-sm">{q.n}</span>
                <span className="rounded-full border-2 border-[#111110] px-2.5 py-0.5 font-jp text-xs font-bold text-white" style={{ background: q.c }}>
                  {q.jp}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="border-t-[3.5px] border-[#111110] bg-[#111110] py-2.5 text-white">
        <Marquee>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-6 pr-6 font-pixel text-xs tracking-[0.3em]">
              <span>* * * * *</span>
              <span className="font-display text-sm tracking-normal">HAND-DRAWN INDIE TCG BY ANIRUDH &amp; LAKSHYA — ORB STUDIOS</span>
              <span className="text-[#FFD900]">*</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

export function Landing({ go, onCoin }: { go: (p: "home" | "play") => void; onCoin: () => void }) {
  useReveal();
  return (
    <main>
      <Hero go={go} onCoin={onCoin} />
      <Manifesto />
      <Elements />
      <Deck />
      <WallOfLove />
      <HowTo />
      <Packs onCoin={onCoin} />
      <FinalCTA go={go} />
      <Footer go={go} />
    </main>
  );
}
