import { useRef, useState } from "react";
import { Droplet, Flame, Leaf, Sparkles, Heart, Zap, Wind, Skull } from "lucide-react";
import { ELEMENT_META, type OrbCard, type ElementType } from "../data/cards";
import { cn } from "../utils/cn";

const IconMap = {
  leaf: Leaf,
  droplet: Droplet,
  flame: Flame,
  sparkles: Sparkles,
  wind: Wind,
  skull: Skull,
  zap: Zap,
} as const;

export function ElementIcon({ element, className }: { element: ElementType; className?: string }) {
  const meta = ELEMENT_META[element] || ELEMENT_META.GRASS;
  const Icon = IconMap[meta.icon as keyof typeof IconMap] || Sparkles;
  return <Icon className={className} strokeWidth={2.6} />;
}

export function TCGCard({
  card,
  onSelect,
  tilt = true,
  className,
}: {
  card: OrbCard;
  onSelect?: (c: OrbCard) => void;
  tilt?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<string>("");
  const meta = ELEMENT_META[card.element] || ELEMENT_META.GRASS;

  const handleMove = (e: React.MouseEvent) => {
    if (!tilt || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setStyle(`perspective(900px) rotateY(${px * 14}deg) rotateX(${-py * 14}deg) translateY(-6px)`);
  };
  const handleLeave = () => setStyle("");

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={() => onSelect?.(card)}
      style={{ transform: style }}
      className={cn(
        "group relative w-full cursor-pointer select-none transition-transform duration-200 ease-out will-change-transform",
        className
      )}
    >
      {/* Outer frame showcasing authentic full card */}
      <div
        className="relative aspect-[614/889] w-full overflow-hidden rounded-[12px] border-[4px] border-[#111110] bg-[#111110] shadow-[8px_8px_0_#111110] transition-all duration-300 ease-out group-hover:scale-[1.04] group-hover:shadow-[12px_12px_0_#111110]"
        style={{ borderColor: "#111110" }}
      >
        {/* Authentic hand-drawn card image */}
        <img
          src={card.art}
          alt={card.name}
          loading="lazy"
          className="h-full w-full object-cover"
          draggable={false}
        />

        {/* Diagonal sheen sweep on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{ background: "repeating-linear-gradient(-55deg, transparent 0 26px, white 26px 52px)" }}
        />
        <div className="card-glare" />

        {/* Bottom hover bar prompt (only when card has click action) */}
        {onSelect && (
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-center border-t-2 border-[#111110] bg-[#111110]/90 px-3 py-1 text-white opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100">
            <span className="font-pixel text-[10px] tracking-[0.2em] text-[#FFD900]">CLICK FOR INTEL</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- detail modal ---------- */
export function CardModal({ card, onClose }: { card: OrbCard | null; onClose: () => void }) {
  if (!card) return null;
  const meta = ELEMENT_META[card.element] || ELEMENT_META.GRASS;
  const max = 400;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" role="dialog" aria-modal>
      <div className="absolute inset-0 bg-[#111110]/75 backdrop-blur-sm" onClick={onClose} />
      <div className="animate-pop-in relative grid w-full max-w-3xl overflow-hidden rounded-2xl border-4 border-[#111110] bg-[#FFFDF4] text-[#111110] shadow-[14px_14px_0_#111110] md:grid-cols-[1fr_1.15fr]">
        {/* Left column: Card display */}
        <div className="relative flex items-center justify-center p-6 md:p-8" style={{ background: meta.soft }}>
          <div className="halftone-fine absolute inset-0 opacity-60" />
          <div className="relative w-full max-w-[280px]">
            <TCGCard card={card} tilt={false} />
          </div>
        </div>

        {/* Right column: Card Intel */}
        <div className="relative flex flex-col gap-4 p-6 md:p-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-10 w-10 cursor-pointer place-items-center rounded-full border-[3px] border-[#111110] bg-white font-display text-lg shadow-[3px_3px_0_#111110] transition hover:rotate-90 hover:bg-[#FF0B0B] hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border-[3px] border-[#111110] px-3 py-1 font-display text-xs text-white"
              style={{ background: meta.color }}
            >
              <ElementIcon element={card.element} className="h-3.5 w-3.5" />
              {card.element} ● {meta.jp}
            </span>
            <span className="rounded-full border-[3px] border-[#111110] bg-[#FFD900] px-3 py-1 font-pixel text-[11px] tracking-widest">
              No.{card.num}/{card.total}
            </span>
            <span
              className={cn(
                "rounded-full border-2 border-[#111110] px-2.5 py-0.5 font-pixel text-[10px] tracking-widest font-bold",
                card.rarity === "SECRET" && "bg-[#8B5CF6] text-white",
                card.rarity === "LEGENDARY" && "bg-[#FFD900] text-[#111110]",
                card.rarity === "EPIC" && "bg-[#EC4899] text-white",
                card.rarity === "COMMON" && "bg-[#8B5A2B] text-white"
              )}
            >
              {card.rarity} ({card.ribbon} Ribbon)
            </span>
            <span className="rounded-full border-2 border-[#111110] bg-white px-2.5 py-0.5 font-pixel text-[10px] tracking-widest font-bold text-[#111110]">
              DRAWN: {card.drawOrder}
            </span>
          </div>

          <div>
            <h3 className="font-display text-4xl leading-none">{card.name}</h3>
            <p className="mt-1 font-jp text-lg font-bold text-[#111110]/60">
              {card.jp}
            </p>
          </div>

          <p className="text-[15px] leading-relaxed text-[#111110]/80">{card.lore}</p>

          {/* Move box */}
          <div className="rounded-xl border-[3px] border-[#111110] bg-white p-4 shadow-[4px_4px_0_#111110]">
            <div className="flex items-center justify-between">
              <p className="font-display text-base text-[#111110]">{card.move}</p>
              <p className="font-jp text-sm font-bold opacity-60">{card.moveJp}</p>
            </div>
            <p className="mt-1 text-sm text-[#111110]/70">{card.moveDesc}</p>
          </div>

          {/* Stat bars */}
          <div className="space-y-2.5">
            {[
              { label: "HP", icon: Heart, val: card.hp, maxVal: max, color: "#FF0B0B" },
              { label: "DMG", icon: Zap, val: card.atk, maxVal: max, color: "#FF8A00" },
              { label: "BST", icon: Sparkles, val: card.bst, maxVal: 750, color: "#10B981" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3">
                <span className="flex w-14 items-center gap-1 font-display text-sm">
                  <s.icon className="h-4 w-4" /> {s.label}
                </span>
                <div className="h-4 flex-1 overflow-hidden rounded-full border-2 border-[#111110] bg-[#111110]/10">
                  <div
                    className="h-full rounded-full border-r-2 border-[#111110]"
                    style={{ width: `${Math.min((s.val / s.maxVal) * 100, 100)}%`, background: s.color }}
                  />
                </div>
                <span className="w-12 text-right font-display text-sm font-bold">{s.val}</span>
              </div>
            ))}
          </div>

          <div className="mt-auto border-t-2 border-dashed border-[#111110]/20 pt-3">
            <p className="font-pixel text-[11px] tracking-[0.2em] text-[#111110]/60">
              ILLUS. {card.illustrator} ● 100% HAND-DRAWN ● ORB STUDIOS ● 手描き
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
