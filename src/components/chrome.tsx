import { useEffect, useRef, useState } from "react";
import { Gamepad2, Menu, X, Volume2, VolumeX } from "lucide-react";
import { cn } from "../utils/cn";

/* ---------- custom cursor ---------- */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [hover, setHover] = useState(false);
  const [hoverGo, setHoverGo] = useState(false);
  const [bgMode, setBgMode] = useState<"red" | "dark" | "yellow" | "light">("light");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    document.body.classList.add("cursor-none-fine");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let initialized = false;
    let isMouseDown = false;
    let raf: number;

    const getBgMode = (el: HTMLElement | null): "red" | "dark" | "yellow" | "light" => {
      let curr = el;
      while (curr && curr !== document.documentElement) {
        const bg = window.getComputedStyle(curr).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
          if (match) {
            const r = Number(match[1]);
            const g = Number(match[2]);
            const b = Number(match[3]);
            if (r > 190 && g < 80 && b < 80) return "red";
            if (r < 50 && g < 50 && b < 50) return "dark";
            if (r > 200 && g > 180 && b < 60) return "yellow";
            return "light";
          }
        }
        curr = curr.parentElement;
      }
      return "light";
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!initialized) {
        ringX = mouseX;
        ringY = mouseY;
        initialized = true;
        setVisible(true);
      }

      const t = e.target as HTMLElement | null;
      if (t) {
        const interactiveEl = t.closest("a, button, [role='button'], input, .cursor-pointer") as HTMLElement | null;
        const isInteractive = !!interactiveEl;
        const isGo = isInteractive && !!t.closest('[data-cursor="go"], .cursor-go');
        setHover(isInteractive);
        setHoverGo(isGo);
        setBgMode(getBgMode(t));
      }
    };

    const handleMouseDown = () => {
      isMouseDown = true;
    };
    const handleMouseUp = () => {
      isMouseDown = false;
    };
    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    const loop = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      const dotScale = isMouseDown ? 0.75 : 1;
      const ringScale = isMouseDown ? 0.92 : 1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.body.classList.remove("cursor-none-fine");
    };
  }, []);

  if (!visible) return null;

  // Authentic Orb Studios theme color mapping based on hovered background
  const dotColorClass =
    bgMode === "red"
      ? "bg-[#FFD900] border-[#111110]" // on red background: bright yolk yellow dot with black border
      : bgMode === "dark"
      ? "bg-[#FFD900] border-white" // on dark background: bright yolk yellow dot with white rim
      : bgMode === "yellow"
      ? "bg-[#FF0B0B] border-[#111110]" // on yellow background: orb red dot
      : "bg-[#FF0B0B] border-[#111110]"; // on cream/white: orb red dot

  const ringThemeClass = hoverGo
    ? bgMode === "red"
      ? "h-14 w-14 border-[#111110] bg-[#FFD900] text-[#111110] shadow-[3px_3px_0_#111110]"
      : bgMode === "dark"
      ? "h-14 w-14 border-[#FFD900] bg-[#FFD900] text-[#111110] shadow-[3px_3px_0_#111110]"
      : bgMode === "yellow"
      ? "h-14 w-14 border-[#111110] bg-[#111110] text-[#FFD900] shadow-[3px_3px_0_#111110]"
      : "h-14 w-14 border-[#111110] bg-[#FFD900] text-[#111110] shadow-[3px_3px_0_#111110]"
    : hover
    ? bgMode === "red"
      ? "h-11 w-11 border-white bg-white/25"
      : bgMode === "dark"
      ? "h-11 w-11 border-white/80 bg-white/15"
      : bgMode === "yellow"
      ? "h-11 w-11 border-[#111110]/70 bg-[#111110]/15"
      : "h-11 w-11 border-[#111110]/70 bg-[#111110]/10"
    : bgMode === "red"
    ? "h-9 w-9 border-white bg-white/35"
    : bgMode === "dark"
    ? "h-9 w-9 border-white/70 bg-white/20"
    : bgMode === "yellow"
    ? "h-9 w-9 border-[#111110]/60 bg-[#111110]/15"
    : "h-9 w-9 border-[#111110]/60 bg-[#111110]/10";

  return (
    <div className="pointer-events-none fixed inset-0 z-[200] hidden [@media(pointer:fine)]:block" aria-hidden>
      {/* Focal dot */}
      <div
        ref={dotRef}
        className={cn(
          "absolute left-0 top-0 h-3.5 w-3.5 rounded-full border-2 transition-[opacity,background-color,border-color] duration-150 ease-out",
          dotColorClass,
          hoverGo ? "opacity-0" : "opacity-100"
        )}
      />
      {/* Magnetic follower ring */}
      <div
        ref={ringRef}
        className={cn(
          "absolute left-0 top-0 grid place-items-center rounded-full border-[3px] select-none transition-[width,height,background-color,border-color] duration-150 ease-out",
          ringThemeClass
        )}
      >
        {hoverGo && (
          <span
            className={cn(
              "font-display text-[10px] font-bold tracking-widest leading-none select-none",
              bgMode === "yellow" ? "text-[#FFD900]" : "text-[#111110]"
            )}
          >
            GO!
          </span>
        )}
      </div>
    </div>
  );
}

/* ---------- navbar ---------- */
export function Navbar({
  page,
  go,
  soundEnabled,
  onToggleSound,
}: {
  page: "home" | "play";
  go: (p: "home" | "play") => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}) {
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

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Toggle Button */}
          <button
            onClick={onToggleSound}
            className={cn(
              "flex h-9 cursor-pointer items-center gap-1.5 rounded-lg border-2 border-[#111110] px-2.5 font-pixel text-[11px] tracking-wider shadow-[2px_2px_0_#111110] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
              soundEnabled
                ? "bg-white text-[#111110] hover:bg-[#FFD900]"
                : "bg-[#111110]/10 text-[#111110]/50 hover:bg-[#111110]/20"
            )}
            title={soundEnabled ? "Sound: ON (click to mute)" : "Sound: MUTED (click to enable)"}
            aria-label={soundEnabled ? "Sound: ON (click to mute)" : "Sound: MUTED (click to enable)"}
          >
            {soundEnabled ? (
              <Volume2 className="h-3.5 w-3.5 text-[#FF0B0B]" />
            ) : (
              <VolumeX className="h-3.5 w-3.5" />
            )}
            <span className="hidden md:inline font-bold">
              {soundEnabled ? "SOUND: ON" : "MUTED"}
            </span>
          </button>

          <button
            onClick={() => go("play")}
            data-cursor={page === "play" ? undefined : "go"}
            className={cn(
              "hidden cursor-pointer items-center gap-2 border-[3px] border-[#111110] px-5 py-2 font-display text-sm shadow-[4px_4px_0_#111110] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#111110] sm:inline-flex",
              page === "play" ? "bg-[#111110] text-white" : "bg-[#FF0B0B] text-white hover:bg-[#d60000]"
            )}
          >
            <Gamepad2 className="h-4 w-4" />
            {page === "play" ? "BACK HOME" : "PLAY NOW"}
            <span className="font-jp text-xs opacity-80">プレイ</span>
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="grid h-10 w-10 cursor-pointer place-items-center border-[2.5px] border-[#111110] bg-white shadow-[3px_3px_0_#111110] lg:hidden"
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

          <div className="mt-4 border-b-2 border-dashed border-[#111110]/20 pb-4">
            <button
              onClick={onToggleSound}
              className={cn(
                "flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-[#111110] py-2 font-pixel text-xs shadow-[2px_2px_0_#111110]",
                soundEnabled ? "bg-white" : "bg-black/10 text-black/50"
              )}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4 text-[#FF0B0B]" /> : <VolumeX className="h-4 w-4" />}
              <span>{soundEnabled ? "SOUND: ON" : "SOUND: MUTED"}</span>
            </button>
          </div>

          <button
            onClick={() => { setOpen(false); go("play"); }}
            data-cursor="go"
            className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 border-[3px] border-[#111110] bg-[#FF0B0B] px-5 py-3.5 font-display text-base text-white shadow-[4px_4px_0_#111110]"
          >
            <Gamepad2 className="h-5 w-5" /> PLAY NOW — プレイ
          </button>
        </div>
      )}
    </header>
  );
}
