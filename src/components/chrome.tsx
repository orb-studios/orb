import { useEffect, useState } from "react";
import { Gamepad2, Menu, X, Coins, Volume2, AlertTriangle } from "lucide-react";
import { cn } from "../utils/cn";

/* ---------- custom cursor ---------- */
export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    document.body.classList.add("cursor-none-fine");
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,.cursor-pointer"));
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("cursor-none-fine");
    };
  }, []);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      setRing((r) => ({ x: r.x + (pos.x - r.x) * 0.16, y: r.y + (pos.y - r.y) * 0.16 }));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pos]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden [@media(pointer:fine)]:block" aria-hidden>
      <div
        className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#111110] bg-[#FF0B0B]"
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className={cn(
          "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-[#111110] transition-all duration-200",
          hover ? "h-14 w-14 bg-[#FFD900]/90" : "h-9 w-9 bg-white/70"
        )}
        style={{ left: ring.x, top: ring.y }}
      />
      {hover && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 font-pixel text-[10px] font-bold tracking-widest"
          style={{ left: ring.x, top: ring.y }}
        >
          GO!
        </div>
      )}
    </div>
  );
}

/* ---------- top utility strip ---------- */
export function TopStrip({ credits, onCoin }: { credits: number; onCoin: () => void }) {
  return (
    <div className="relative z-[60] flex items-center justify-between gap-4 overflow-hidden border-b-[3px] border-[#111110] bg-[#111110] px-4 py-1.5 text-white md:px-8">
      <p className="truncate font-pixel text-[10px] tracking-[0.25em] md:text-[11px]">
        ORB STUDIOS <span className="text-[#FFD900]">★</span> INDIE ARCADE TCG <span className="text-[#FFD900]">★</span>{" "}
        <span className="hidden sm:inline">16 CARDS REVEALED — TOKYO / OSAKA — 東京</span>
      </p>
      <div className="flex shrink-0 items-center gap-3">
        <button
          onClick={onCoin}
          className="group flex cursor-pointer items-center gap-1.5 rounded-full border-2 border-white/30 bg-white/10 px-3 py-0.5 font-pixel text-[11px] tracking-widest transition hover:border-[#FFD900] hover:bg-[#FFD900] hover:text-[#111110]"
          title="Insert coin"
        >
          <Coins className="h-3.5 w-3.5 transition group-hover:animate-wiggle" />
          {String(credits).padStart(2, "0")} COINS
        </button>
        <span className="hidden items-center gap-1.5 font-pixel text-[11px] tracking-widest text-white/60 md:flex">
          <Volume2 className="h-3.5 w-3.5" /> SOUND: ON
        </span>
      </div>
    </div>
  );
}

/* ---------- sample/temporary site notice banner ---------- */
export function SampleNoticeBanner() {
  return (
    <aside aria-label="Sample notice" className="relative z-[65] border-b-[3px] border-[#111110] bg-[#FFD900] px-4 py-2 text-[#111110]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border-2 border-[#111110] bg-[#FF0B0B] px-2.5 py-0.5 font-display text-[10px] text-white shadow-[2px_2px_0_#111110]">
            <AlertTriangle className="h-3 w-3" /> SAMPLE PREVIEW / 仮設サイト
          </span>
          <p className="font-pixel text-[11px] tracking-wide sm:text-xs">
            <strong>NOTICE:</strong> This is a temporary showcase website while the official Orb Studios platform is under construction (WIP). This sample site will be deleted soon!
          </p>
        </div>
        <span className="hidden font-pixel text-[10px] tracking-widest text-[#111110]/70 lg:inline">
          OFFICIAL SITE IN DEV ● ORB STUDIOS
        </span>
      </div>
    </aside>
  );
}

/* ---------- navbar ---------- */
export function Navbar({ page, go }: { page: "home" | "play"; go: (p: "home" | "play") => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = [
    { label: "CARDS", jp: "カード", href: "#deck" },
    { label: "ELEMENTS", jp: "ぞくせい", href: "#elements" },
    { label: "HOW TO PLAY", jp: "あそびかた", href: "#how" },
    { label: "PACKS", jp: "パック", href: "#packs" },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-[70] border-b-[3.5px] border-[#111110] bg-[#FFFDF4]/95 backdrop-blur-md transition-shadow",
        scrolled && "shadow-[0_4px_0_#111110]"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <button onClick={() => go("home")} className="group flex cursor-pointer items-center gap-2.5">
          <span className="transition group-hover:scale-105">
            <img
              src="/brand/logo.jpg"
              alt="Orb Studios Logo"
              className="h-10 w-10 rounded-full border-[2.5px] border-[#111110] object-cover shadow-[2px_2px_0_#111110]"
            />
          </span>
          <span className="text-left leading-none">
            <span className="block font-display text-2xl tracking-tight">orb</span>
            <span className="block font-pixel text-[9px] tracking-[0.3em] opacity-60">ORB STUDIOS</span>
          </span>
          <span className="ml-1 hidden rounded-full border-2 border-[#111110] bg-[#FFD900] px-2 py-0.5 font-display text-[10px] shadow-[2px_2px_0_#111110] sm:inline-block">
            オーブ
          </span>
        </button>

        <div className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={page === "home" ? l.href : `#home${l.href}`}
              onClick={page === "play" ? () => go("home") : undefined}
              className="group relative rounded-md px-4 py-2 font-display text-[13px] tracking-wide transition hover:bg-[#111110] hover:text-white"
            >
              {l.label}
              <span className="ml-1.5 font-jp text-[11px] font-bold opacity-50 group-hover:text-[#FFD900] group-hover:opacity-100">
                {l.jp}
              </span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => go("play")}
            className={cn(
              "hidden cursor-pointer items-center gap-2 border-[3px] border-[#111110] px-5 py-2.5 font-display text-sm shadow-[4px_4px_0_#111110] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#111110] sm:inline-flex",
              page === "play" ? "bg-[#111110] text-white" : "bg-[#FF0B0B] text-white hover:bg-[#d60000]"
            )}
          >
            <Gamepad2 className="h-4 w-4" />
            {page === "play" ? "BACK HOME" : "PLAY NOW"}
            <span className="font-jp text-xs opacity-80">プレイ</span>
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="grid h-11 w-11 cursor-pointer place-items-center border-[3px] border-[#111110] bg-white shadow-[4px_4px_0_#111110] lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="animate-pop-in border-t-[3px] border-[#111110] bg-[#FFFDF4] px-4 pb-6 pt-2 lg:hidden">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => { setOpen(false); if (page === "play") go("home"); }}
              className="flex items-center justify-between border-b-2 border-dashed border-[#111110]/20 py-3 font-display text-lg"
            >
              <span>{l.label}</span>
              <span className="font-jp text-sm opacity-50">{l.jp} — 0{i + 1}</span>
            </a>
          ))}
          <button
            onClick={() => { setOpen(false); go("play"); }}
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 border-[3px] border-[#111110] bg-[#FF0B0B] px-5 py-3.5 font-display text-base text-white shadow-[4px_4px_0_#111110]"
          >
            <Gamepad2 className="h-5 w-5" /> PLAY NOW — プレイ
          </button>
        </div>
      )}
    </header>
  );
}
