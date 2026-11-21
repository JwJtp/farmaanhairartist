"use client";

import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import EditorialImage from "@/components/ui/EditorialImage";
import Reveal from "@/components/ui/Reveal";
import { CUTS, type Cut, type Gender, type Length } from "@/lib/cuts";
import { whatsappLink } from "@/lib/site";

const LENGTHS: (Length | "All")[] = ["All", "Short", "Medium", "Long"];

export const bookCutMessage = (c: Cut) =>
  `Hi Farman, I saw the "${c.name}" on the Farmaan.Hair Artist website and I'd like to book this cut. When are you available?`;

/* ---------------------------------------------------------------- detail modal */
function CutModal({ list, index, onClose, onStep }: { list: Cut[]; index: number; onClose: () => void; onStep: (d: number) => void }) {
  const cut = list[index];
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<number | null>(null);

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-obsidian/95 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={cut.name}
      onClick={onClose}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 z-10 flex h-12 w-12 items-center justify-center border border-ivory/20 hover:border-champagne">
        <X className="h-5 w-5" />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onStep(-1); }} aria-label="Previous cut" className="absolute left-3 z-10 hidden h-12 w-12 items-center justify-center border border-ivory/20 hover:border-champagne md:flex">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onStep(1); }} aria-label="Next cut" className="absolute right-3 z-10 hidden h-12 w-12 items-center justify-center border border-ivory/20 hover:border-champagne md:flex">
        <ChevronRight className="h-5 w-5" />
      </button>

      <AnimatePresence mode="wait">
        <motion.div
          key={cut.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.stopPropagation()}
          className="grid max-h-[90vh] w-full max-w-5xl overflow-y-auto border border-white/10 bg-charcoal md:grid-cols-2"
        >
          <EditorialImage photo={cut.photo} sizes="(min-width:768px) 50vw, 100vw" className="aspect-[4/5] w-full md:aspect-auto md:h-full" />
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <p className="eyebrow">{cut.gender === "women" ? "Women's cut" : "Men's cut"} · {index + 1}/{list.length}</p>
            <h3 className="display mt-4 text-5xl sm:text-6xl">{cut.name}</h3>
            <p className="mt-5 text-lg text-beige/75">{cut.blurb}</p>
            <dl className="mt-8 grid grid-cols-2 gap-px border border-white/10 bg-white/10 text-sm">
              <div className="bg-charcoal p-4">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-beige/50">Length</dt>
                <dd className="mt-1 font-serif text-xl">{cut.length}</dd>
              </div>
              <div className="bg-charcoal p-4">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-beige/50">Daily care</dt>
                <dd className="mt-1 font-serif text-xl">{cut.care}</dd>
              </div>
              <div className="col-span-2 bg-charcoal p-4">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-beige/50">Flatters</dt>
                <dd className="mt-1 font-serif text-xl">{cut.suits.join(" · ")} faces</dd>
              </div>
            </dl>
            <a href={whatsappLink(bookCutMessage(cut))} target="_blank" rel="noopener noreferrer" className="btn-gold mt-8">
              <MessageCircle className="h-4 w-4" /> Book this cut
            </a>
            <p className="mt-3 text-xs text-beige/40">Reference photo for inspiration — Farman tailors every cut to your face and hair.</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- collection */
const THEME = {
  women: {
    id: "women-cuts",
    section: "bg-ivory text-obsidian",
    eyebrow: "text-bronze",
    line: "bg-bronze/60",
    kicker: "The Women's Collection",
    title: "For",
    accent: "Her.",
    accentCls: "text-bronze",
    intro: "Butterfly layers, bobs, bangs, pixies and curls — cuts designed around your face, your texture and the way you live.",
    muted: "text-obsidian/60",
    chip: "border-obsidian/20 text-obsidian/70 hover:border-obsidian",
    chipOn: "border-obsidian bg-obsidian text-ivory",
    arrow: "border-obsidian/25 text-obsidian hover:bg-obsidian hover:text-ivory",
    track: "bg-obsidian/10",
    bar: "bg-obsidian",
    card: "aspect-[3/4] w-[74vw] sm:w-[320px] lg:w-[360px]",
    outline: "[-webkit-text-stroke:1px_rgba(244,240,233,0.7)]",
  },
  men: {
    id: "men-cuts",
    section: "bg-obsidian text-ivory",
    eyebrow: "text-champagne",
    line: "bg-champagne/60",
    kicker: "The Men's Collection · Barber Studio",
    title: "For",
    accent: "Him.",
    accentCls: "text-champagne",
    intro: "Military cuts, fades, crops, pompadours, undercuts, curls and long hair — sharp lines, clean finish, every time.",
    muted: "text-beige/60",
    chip: "border-white/15 text-beige/70 hover:border-champagne/60",
    chipOn: "border-champagne bg-champagne text-obsidian",
    arrow: "border-white/20 text-ivory hover:bg-champagne hover:text-obsidian",
    track: "bg-white/10",
    bar: "bg-champagne",
    card: "aspect-[4/5] w-[74vw] sm:w-[320px] lg:w-[360px]",
    outline: "[-webkit-text-stroke:1px_rgba(198,164,119,0.8)]",
  },
} as const;

export function CutCollection({ side }: { side: Gender }) {
  const t = THEME[side];
  const [length, setLength] = useState<Length | "All">("All");
  const [open, setOpen] = useState<number | null>(null);
  const rail = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: rail });

  const all = useMemo(() => CUTS.filter((c) => c.gender === side), [side]);
  const list = useMemo(() => all.filter((c) => length === "All" || c.length === length), [all, length]);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);
  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    rail.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [length]);

  const slide = (dir: number) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 760), behavior: "smooth" });
  };

  // drag-to-scroll on desktop
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  return (
    <section id={t.id} className={`relative overflow-hidden py-28 sm:py-36 ${t.section}`}>
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className={`eyebrow mb-6 flex items-center gap-4 ${t.eyebrow}`}>
              <span className={`h-px w-10 ${t.line}`} /> {t.kicker}
            </p>
            <h2 className="display text-7xl sm:text-8xl lg:text-[9rem]">
              {t.title} <em className={`italic ${t.accentCls}`}>{t.accent}</em>
            </h2>
            <p className={`mt-6 max-w-xl text-lg leading-relaxed ${t.muted}`}>{t.intro}</p>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-6 lg:col-span-5 lg:items-end">
            <p className={`font-serif text-2xl italic ${t.muted}`}>
              <span className={`not-italic ${t.accentCls}`}>{String(all.length).padStart(2, "0")}</span> signature cuts
            </p>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={`Filter ${side}'s cuts by length`}>
              {LENGTHS.map((l) => (
                <button
                  key={l}
                  type="button"
                  role="radio"
                  aria-checked={length === l}
                  onClick={() => setLength(l)}
                  className={`border px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition ${length === l ? t.chipOn : t.chip}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* rail */}
      <div
        ref={rail}
        className="no-scrollbar mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [--pad:1.25rem] sm:gap-6 sm:[--pad:2rem] lg:cursor-grab lg:[--pad:3rem]"
        style={{ paddingInline: "max(var(--pad), calc((100vw - 1400px) / 2 + var(--pad)))", scrollPaddingInline: "max(var(--pad), calc((100vw - 1400px) / 2 + var(--pad)))" }}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || !rail.current) return;
          drag.current = { x: e.clientX, left: rail.current.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || !rail.current) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) > 5) d.moved = true;
          rail.current.scrollLeft = d.left - dx;
        }}
        onPointerUp={() => setTimeout(() => (drag.current = null), 0)}
        onPointerLeave={() => (drag.current = null)}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((c, i) => (
            <motion.button
              key={c.id}
              type="button"
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => !drag.current?.moved && setOpen(i)}
              className={`group relative shrink-0 snap-start overflow-hidden text-left ${t.card}`}
              aria-label={`${c.name} — view details`}
            >
              <EditorialImage photo={c.photo} sizes="(min-width:1024px) 360px, 74vw" className="absolute inset-0 h-full w-full" imgClassName="scale-[1.03] transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
              <div className="absolute inset-0 border border-transparent transition-colors duration-700 group-hover:border-champagne/50" />

              <span className={`display absolute left-5 top-3 text-7xl italic text-transparent ${t.outline}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className="absolute right-4 top-5 bg-obsidian/60 px-2.5 py-1 text-[9px] uppercase tracking-[0.24em] text-ivory backdrop-blur">{c.length}</span>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="display text-4xl text-ivory">{c.name}</h3>
                <p className="mt-2 max-h-0 overflow-hidden text-sm leading-relaxed text-beige/80 opacity-0 transition-all duration-700 group-hover:max-h-24 group-hover:opacity-100 max-lg:max-h-24 max-lg:opacity-100">
                  {c.blurb}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-champagne">
                  View &amp; book <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* progress + arrows */}
      <div className="container-x mt-8 flex items-center gap-6">
        <div className={`relative h-px flex-1 overflow-hidden ${t.track}`}>
          <motion.div className={`absolute inset-y-0 left-0 w-full origin-left ${t.bar}`} style={{ scaleX: scrollXProgress }} />
        </div>
        <span className={`hidden text-[10px] uppercase tracking-[0.24em] sm:inline ${t.muted}`}>Drag or swipe</span>
        <div className="flex gap-2">
          <button type="button" onClick={() => slide(-1)} aria-label="Previous cuts" className={`flex h-12 w-12 items-center justify-center border transition ${t.arrow}`}>
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => slide(1)} aria-label="More cuts" className={`flex h-12 w-12 items-center justify-center border transition ${t.arrow}`}>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>{open !== null && list[open] && <CutModal list={list} index={open} onClose={close} onStep={step} />}</AnimatePresence>
    </section>
  );
}
