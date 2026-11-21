"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import EditorialImage from "@/components/ui/EditorialImage";
import Reveal, { SectionHeading } from "@/components/ui/Reveal";
import { GALLERY, GALLERY_FILTERS, type GalleryCategory, type GalleryItem } from "@/lib/content";
import { PHOTOS } from "@/lib/images";

/* ---------------------------------------------------------------- before / after */
function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const fromPointer = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <p className="eyebrow mb-4">Before / After</p>
        <h3 className="display text-4xl sm:text-5xl">
          See the <em className="italic text-champagne">difference.</em>
        </h3>
        <p className="mt-5 text-beige/70">Drag the handle — or use the arrow keys — to compare a flat starting shade with a glossy, dimensional finish.</p>
        <p className="mt-4 text-xs text-beige/40">Illustrative demo using an editorial image. Farman&apos;s real client before/after photos will appear here once supplied.</p>
      </div>

      <div
        ref={box}
        className="relative aspect-[4/3] w-full touch-pan-y select-none overflow-hidden lg:col-span-8"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && fromPointer(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <EditorialImage photo={PHOTOS.balayageBlue} sizes="(min-width:1024px) 60vw, 100vw" className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <EditorialImage
            photo={PHOTOS.balayageBlue}
            sizes="(min-width:1024px) 60vw, 100vw"
            className="absolute inset-0 h-full w-full"
            style={{ filter: "grayscale(0.75) brightness(0.72) contrast(0.85) sepia(0.15)" }}
          />
        </div>
        <span className="absolute left-4 top-4 bg-obsidian/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] backdrop-blur">Before</span>
        <span className="absolute right-4 top-4 bg-champagne px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-obsidian">After</span>

        <div className="absolute inset-y-0 w-px bg-ivory" style={{ left: `${pos}%` }}>
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Before and after comparison"
            className="peer absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize opacity-0"
          />
          <span className="pointer-events-none absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory bg-obsidian/60 backdrop-blur peer-focus-visible:ring-2 peer-focus-visible:ring-champagne">
            <ChevronLeft className="h-4 w-4" />
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- lightbox */
function Lightbox({ items, index, onClose, onStep }: { items: GalleryItem[]; index: number; onClose: () => void; onStep: (d: number) => void }) {
  const item = items[index];
  const touchX = useRef<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

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
      aria-label={item.title}
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) onStep(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="absolute right-5 top-5 z-10 flex h-12 w-12 items-center justify-center border border-ivory/20 hover:border-champagne">
        <X className="h-5 w-5" />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onStep(-1); }} aria-label="Previous image" className="absolute left-3 z-10 hidden h-12 w-12 items-center justify-center border border-ivory/20 hover:border-champagne sm:flex">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onStep(1); }} aria-label="Next image" className="absolute right-3 z-10 hidden h-12 w-12 items-center justify-center border border-ivory/20 hover:border-champagne sm:flex">
        <ChevronRight className="h-5 w-5" />
      </button>

      <AnimatePresence mode="wait">
        <motion.figure
          key={item.photo.id ?? item.photo.local}
          className="relative flex max-h-full w-full max-w-3xl flex-col items-center"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.35 }}
          onClick={(e) => e.stopPropagation()}
        >
          <EditorialImage photo={item.photo} sizes="(min-width:768px) 768px, 100vw" className="h-[72vh] w-full" imgClassName="!object-contain" />
          <figcaption className="mt-4 flex w-full items-center justify-between text-sm">
            <span className="font-serif text-xl italic">{item.title}</span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-beige/50">
              {item.cat} · {index + 1}/{items.length}
            </span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------------------------------------------------------------- gallery */
export default function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory>("All");
  const [open, setOpen] = useState<number | null>(null);

  const items = useMemo(() => (filter === "All" ? GALLERY : GALLERY.filter((g) => g.cat === filter)), [filter]);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="gallery" className="relative bg-obsidian py-28 sm:py-40">
      <div className="container-x">
        <SectionHeading
          eyebrow="Transformation Gallery"
          title="The"
          accent="lookbook."
          intro="An editorial mood-board of the colour and styling directions Farman works in. These are inspiration images — his own portfolio will be added here."
        />

        <Reveal className="mt-12">
          <div role="tablist" aria-label="Filter gallery" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {GALLERY_FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`shrink-0 border px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition ${
                  filter === f ? "border-champagne bg-champagne text-obsidian" : "border-white/15 text-beige/70 hover:border-champagne/60 hover:text-ivory"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 columns-2 gap-3 sm:gap-4 md:columns-3 lg:columns-4">
          <AnimatePresence initial={false}>
            {items.map((g, i) => (
              <motion.button
                key={g.title}
                type="button"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5 }}
                onClick={() => setOpen(i)}
                className="group relative mb-3 block w-full break-inside-avoid overflow-hidden text-left sm:mb-4"
                aria-label={`Open ${g.title}`}
              >
                <EditorialImage photo={g.photo} sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" className={`w-full ${g.ratio}`} imgClassName="transition-transform duration-[1.2s] group-hover:scale-105" />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-obsidian/90 via-transparent to-transparent p-4 opacity-100 transition-opacity duration-500 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                  <span className="text-[9px] uppercase tracking-[0.28em] text-champagne">{g.cat}</span>
                  <span className="font-serif text-xl italic">{g.title}</span>
                </div>
                <Expand className="absolute right-3 top-3 h-4 w-4 opacity-0 transition group-hover:opacity-100" />
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-28 border-t border-white/10 pt-20">
          <BeforeAfter />
        </div>
      </div>

      <AnimatePresence>{open !== null && <Lightbox items={items} index={open} onClose={close} onStep={step} />}</AnimatePresence>
    </section>
  );
}
