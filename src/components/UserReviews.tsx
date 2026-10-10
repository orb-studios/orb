import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Quote,
  Star,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { REVIEWS } from "../data/reviews";
import { JPBadge, Magnetic, Marquee, SectionHeader } from "./ui";
import { cn } from "../utils/cn";

export function UserReviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll loop: advances every 3.6s unless hovered or dragging or paused
  useEffect(() => {
    if (!isAutoPlay || isHovered || isDragging) return;
    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 24) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 350, behavior: "smooth" });
      }
    }, 3600);

    return () => clearInterval(interval);
  }, [isAutoPlay, isHovered, isDragging]);

  // Track active slide index from scroll position
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const cardWidth = 350;
    const idx = Math.round(scrollRef.current.scrollLeft / cardWidth);
    setCurrentIndex(Math.min(Math.max(0, idx), REVIEWS.length - 1));
  };

  // Button navigation with loop-around
  const scrollLeft = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollLeft <= 16) {
      scrollRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: -360, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    if (scrollLeft + clientWidth >= scrollWidth - 24) {
      scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scrollRef.current.scrollBy({ left: 360, behavior: "smooth" });
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.3;
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  const stopDragging = () => {
    setIsDragging(false);
  };

  return (
    <section id="reviews" className="relative overflow-hidden border-t-[3.5px] border-[#111110] bg-[#FFF7E8]">
      <div className="grid-blueprint absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        {/* Header with Title & Summary Badge */}
        <div className="reveal mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex gap-2">
              <JPBadge jp="みんなのこえ" en="COMMUNITY VOICES" bg="#FFD900" />
              <JPBadge jp="公式レビュー" en="VERIFIED" bg="white" />
            </div>
            <h2 className="mt-4 font-display text-3xl leading-tight md:text-5xl text-[#111110]">
              WHAT PLAYERS
              <br />
              <span className="text-[#FF0B0B] [text-shadow:3px_3px_0_#FFD900]">ARE SAYING.</span>
            </h2>
            <p className="mt-2.5 font-pixel text-xs tracking-[0.2em] text-[#111110]/70 md:text-sm">
              REAL TESTIMONIALS FROM THE LIVE ORB TCG PLATFORM (ORBTCG.VERCEL.APP)
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5 rounded-xl border-[3px] border-[#111110] bg-white px-4 py-2.5 shadow-[4px_4px_0_#111110]">
              <div className="flex items-center gap-1 text-[#FFD900]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#FFD900] text-[#111110]" strokeWidth={1.5} />
                ))}
              </div>
              <span className="font-display text-lg text-[#111110]">4.9</span>
              <span className="font-pixel text-[11px] tracking-wider text-[#111110]/60">
                (32 REVIEWS)
              </span>
            </div>

            {/* Navigation & Autoplay Controls */}
            <div className="flex items-center gap-2">
              <Magnetic strength={12}>
                <button
                  onClick={() => setIsAutoPlay((v) => !v)}
                  className={cn(
                    "flex h-11 items-center gap-1.5 rounded-xl border-[3px] border-[#111110] px-3 font-pixel text-[11px] tracking-wider shadow-[3px_3px_0_#111110] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none",
                    isAutoPlay ? "bg-[#FFD900] text-[#111110]" : "bg-white text-[#111110]/70"
                  )}
                  title={isAutoPlay ? "Pause Auto-Scroll" : "Play Auto-Scroll"}
                  aria-label={isAutoPlay ? "Pause Auto-Scroll" : "Play Auto-Scroll"}
                >
                  {isAutoPlay ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
                  <span className="hidden sm:inline">{isAutoPlay ? "AUTO: ON" : "AUTO: OFF"}</span>
                </button>
              </Magnetic>

              <Magnetic strength={15}>
                <button
                  onClick={scrollLeft}
                  className="grid h-11 w-11 place-items-center rounded-xl border-[3px] border-[#111110] bg-white shadow-[3px_3px_0_#111110] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#FFD900] hover:shadow-none"
                  aria-label="Previous Review"
                  title="Previous"
                >
                  <ChevronLeft className="h-6 w-6 text-[#111110]" strokeWidth={2.8} />
                </button>
              </Magnetic>

              <Magnetic strength={15}>
                <button
                  onClick={scrollRight}
                  className="grid h-11 w-11 place-items-center rounded-xl border-[3px] border-[#111110] bg-white shadow-[3px_3px_0_#111110] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:bg-[#FFD900] hover:shadow-none"
                  aria-label="Next Review"
                  title="Next"
                >
                  <ChevronRight className="h-6 w-6 text-[#111110]" strokeWidth={2.8} />
                </button>
              </Magnetic>
            </div>
          </div>
        </div>

        {/* Scrollable Carousel Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); stopDragging(); }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          className={cn(
            "flex gap-5 overflow-x-auto pb-6 pt-2 select-none snap-x snap-mandatory scroll-smooth",
            "cursor-grab active:cursor-grabbing",
            "[&::-webkit-scrollbar]:h-2.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#111110]/10",
            "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#FF0B0B] [&::-webkit-scrollbar-thumb]:border-2 [&::-webkit-scrollbar-thumb]:border-[#111110]"
          )}
          style={{ scrollbarWidth: "thin" }}
        >
          {REVIEWS.map((r, i) => (
            <article
              key={`${r.user}-${i}`}
              className="group relative flex w-[310px] shrink-0 snap-start flex-col justify-between rounded-2xl border-[3.5px] border-[#111110] bg-white p-6 shadow-[6px_6px_0_#111110] transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0_#111110] sm:w-[360px]"
            >
              {/* Header: User avatar + details + Quote icon */}
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border-[2.5px] border-[#111110] font-display text-base text-white shadow-[2px_2px_0_#111110]"
                      style={{ background: r.color }}
                    >
                      {r.user.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-display text-sm leading-tight text-[#111110]">
                        {r.user}
                      </p>
                      <div className="mt-1 flex items-center gap-1 font-pixel text-xs text-[#FF0B0B]">
                        <span>{r.stars}</span>
                        <span className="ml-1 text-[10px] text-[#111110]/60">({r.rating.toFixed(1)})</span>
                      </div>
                    </div>
                  </div>

                  <Quote className="h-6 w-6 text-[#FFD900]/40 transition group-hover:text-[#FFD900]" />
                </div>

                {/* Body Text */}
                <p className="mt-4 text-[14.5px] leading-relaxed text-[#111110]/85">
                  “{r.text}”
                </p>
              </div>

              {/* Card Footer: Verified Badge */}
              <div className="mt-5 flex items-center justify-between border-t-2 border-dashed border-[#111110]/20 pt-3 font-pixel text-[10px] tracking-widest text-[#111110]/55">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-[#2fbf4a]" />
                  VERIFIED DUELIST
                </span>
                <span className="text-[#FF0B0B] font-jp font-bold">ORB TCG</span>
              </div>
            </article>
          ))}
        </div>

        {/* Carousel Footer Indicator & Link */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 font-pixel text-xs text-[#111110]/70">
          <div className="flex items-center gap-3">
            <span className="tracking-widest">
              SLIDE {String(currentIndex + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
            </span>
            <div className="hidden sm:flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[#FF0B0B]" />
              <span className="text-[10px] tracking-wider text-[#111110]/50">
                DRAG OR USE ARROWS TO BROWSE
              </span>
            </div>
          </div>

          <a
            href="https://orbtcg.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="group flex cursor-pointer items-center gap-1.5 font-display text-xs text-[#111110] hover:text-[#FF0B0B] hover:underline"
          >
            <span>PLAY ON ORBTCG &amp; SUBMIT A REVIEW</span>
            <ExternalLink className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* Decorative Bottom Marquee */}
      <div className="border-t-[3.5px] border-[#111110] bg-[#111110] py-2.5 text-white">
        <Marquee>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="flex items-center gap-6 pr-6 font-pixel text-xs tracking-[0.3em]">
              <span className="text-[#FFD900]">★</span>
              <span>4.9 / 5.0 RATING ACROSS 32 VERIFIED REVIEWS</span>
              <span className="text-[#FF0B0B]">●</span>
              <span className="font-display text-sm tracking-normal">HAND-DRAWN CARDS ● FAST BATTLES ● ZERO PAY-TO-WIN</span>
              <span className="text-[#FFD900]">★</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
