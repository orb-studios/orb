import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../utils/cn";

/* ---------- ORB bubble wordmark (sticker style, Titan One + ink outline) ---------- */
export function OrbWordmark({ className }: { className?: string }) {
  return (
    <div className={cn("relative select-none", className)} role="img" aria-label="orb">
      <p className="orb-bubble text-center text-[7rem] leading-[0.9] tracking-tight sm:text-[9rem] lg:text-left lg:text-[10.5rem]">
        orb
      </p>
      {/* shine dots */}
      <span className="absolute left-[6%] top-[16%] h-4 w-4 rounded-full bg-white/95" aria-hidden />
      <span className="absolute left-[13%] top-[10%] h-2.5 w-2.5 rounded-full bg-white/80" aria-hidden />
      <span className="absolute bottom-[18%] right-[10%] hidden rounded-full border-[3px] border-[#111110] bg-[#FFD900] px-3 py-1 font-display text-sm shadow-[3px_3px_0_#111110] sm:block" aria-hidden>
        オーブ
      </span>
    </div>
  );
}

/* simple orb coin mark */
export function OrbCoin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <circle cx="50" cy="50" r="44" fill="#FF0B0B" stroke="#111110" strokeWidth="7" />
      <circle cx="50" cy="50" r="17" fill="white" stroke="#111110" strokeWidth="7" />
      <circle cx="38" cy="34" r="6" fill="white" opacity="0.9" />
    </svg>
  );
}

/* ---------- Japanese typography badge ---------- */
export function JPBadge({
  jp,
  en,
  color = "#111110",
  bg = "white",
  className,
  vertical = false,
}: {
  jp: string;
  en?: string;
  color?: string;
  bg?: string;
  className?: string;
  vertical?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 border-[3px] px-3 py-1.5 font-display shadow-[4px_4px_0_#111110]",
        className
      )}
      style={{ background: bg, color, borderColor: "#111110" }}
    >
      <span className={cn("font-display text-sm leading-none tracking-wide", vertical && "vertical-rl")}>{jp}</span>
      {en && (
        <span className="font-pixel text-[11px] leading-none tracking-[0.18em] opacity-80">{en}</span>
      )}
    </span>
  );
}

/* ---------- Starburst sticker ---------- */
export function Starburst({
  children,
  className,
  color = "#FFD900",
  spin = false,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  spin?: boolean;
}) {
  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 200 200"
        className={cn("absolute inset-0 h-full w-full", spin && "animate-[starburst-spin_18s_linear_infinite]")}
        aria-hidden
      >
        <path
          d="M100 0 L118 28 L148 10 L152 42 L185 34 L178 66 L208 78 L188 104 L212 128 L182 140 L190 172 L158 166 L150 198 L128 174 L100 192 L72 174 L50 198 L42 166 L10 172 L18 140 L-2 128 L22 104 L2 78 L32 66 L25 34 L58 42 L62 10 L92 28 Z"
          fill={color}
          stroke="#111110"
          strokeWidth="7"
          strokeLinejoin="round"
          transform="scale(0.92) translate(8,8)"
        />
      </svg>
      <span className="relative z-10 px-8 py-6 text-center font-display text-sm leading-tight text-[#111110]">
        {children}
      </span>
    </div>
  );
}

/* ---------- Marquee ---------- */
export function Marquee({
  children,
  reverse = false,
  fast = false,
  className,
  innerClassName,
}: {
  children: ReactNode;
  reverse?: boolean;
  fast?: boolean;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center",
          reverse ? "animate-marquee-rev" : fast ? "animate-marquee-fast" : "animate-marquee",
          innerClassName
        )}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>{children}</div>
      </div>
    </div>
  );
}

/* ---------- Rotating circular JP badge ---------- */
export function SpinBadge({ text, center, className }: { text: string; center?: ReactNode; className?: string }) {
  const id = useRef(`spin-${Math.random().toString(36).slice(2)}`).current;
  return (
    <div className={cn("relative grid place-items-center", className)}>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow">
        <defs>
          <path id={id} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
        </defs>
        <text className="fill-current font-display" style={{ fontSize: 20.5, letterSpacing: 3 }}>
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <div className="z-10">{center}</div>
    </div>
  );
}

/* ---------- Magnetic button wrapper ---------- */
export function Magnetic({ children, strength = 18 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * (strength / 100)}px, ${y * (strength / 100)}px)`;
    };
    const leave = () => { el.style.transform = "translate(0,0)"; };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [strength]);
  return (
    <div ref={ref} className="inline-block transition-transform duration-200 ease-out will-change-transform">
      {children}
    </div>
  );
}

/* ---------- Section header : ticket style ---------- */
export function SectionHeader({
  no,
  jp,
  title,
  sub,
  dark = false,
}: {
  no: string;
  jp: string;
  title: ReactNode;
  sub?: string;
  dark?: boolean;
}) {
  return (
    <div className="reveal mb-10 flex flex-wrap items-end gap-4 md:mb-14">
      <div
        className={cn(
          "flex items-center gap-3 border-[3px] px-4 py-2 font-display shadow-[5px_5px_0_#111110]",
          dark ? "bg-[#FF0B0B] text-white" : "bg-[#111110] text-white"
        )}
        style={{ borderColor: dark ? "white" : "#111110", boxShadow: dark ? "5px 5px 0 white" : undefined }}
      >
        <span className="font-pixel text-xs tracking-[0.2em] opacity-70">{no}</span>
        <span className="text-lg leading-none">{jp}</span>
      </div>
      <div>
        <h2 className={cn("font-display text-3xl leading-[1.05] md:text-5xl", dark ? "text-white" : "text-[#111110]")}>
          {title}
        </h2>
        {sub && (
          <p className={cn("mt-2 font-pixel text-xs tracking-[0.25em] md:text-sm", dark ? "text-white/60" : "text-[#111110]/60")}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

/* ---------- chunky arcade button ---------- */
export function ArcadeButton({
  children,
  onClick,
  variant = "red",
  className,
  ...rest
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "red" | "black" | "white" | "yellow";
  className?: string;
  [key: string]: any;
}) {
  const styles = {
    red: "bg-[#FF0B0B] text-white hover:bg-[#d60000]",
    black: "bg-[#111110] text-white hover:bg-black",
    white: "bg-white text-[#111110] hover:bg-[#FFF7E8]",
    yellow: "bg-[#FFD900] text-[#111110] hover:bg-[#ffe44d]",
  } as const;
  return (
    <button
      onClick={onClick}
      {...rest}
      className={cn(
        "group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden border-[3.5px] border-[#111110] px-7 py-4 font-display text-base tracking-wide shadow-[6px_6px_0_#111110] transition-all duration-150 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_#111110] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none md:text-lg",
        styles[variant],
        className
      )}
    >
      <span className="card-glare" />
      <span className="relative">{children}</span>
    </button>
  );
}
