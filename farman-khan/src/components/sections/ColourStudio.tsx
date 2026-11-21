"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import WaterBallLab from "@/components/effects/WaterBallLab";
import EditorialImage from "@/components/ui/EditorialImage";
import Reveal, { SectionHeading } from "@/components/ui/Reveal";
import { COLOURS } from "@/lib/content";
import { whatsappLink } from "@/lib/site";

export default function ColourStudio() {
  const [active, setActive] = useState(0);
  const [preview, setPreview] = useState<number | null>(null);
  const shown = COLOURS[preview ?? active];

  return (
    <>
      <section id="colour" className="relative overflow-hidden bg-obsidian py-28 sm:py-40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40 transition-[background] duration-1000"
          style={{ background: `radial-gradient(circle at 80% 40%, ${shown.hex}55, transparent 55%)` }}
        />
        <div className="container-x relative">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Signature Colour Studio"
              title="A lookbook of"
              accent="colour."
              intro="Hover or tap a shade to preview the mood. Every colour is customised in consultation — tone, depth and placement adjusted to you."
            />
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            {/* Swatches */}
            <div className="lg:col-span-5" role="radiogroup" aria-label="Hair colour shades" onMouseLeave={() => setPreview(null)}>
              {COLOURS.map((c, i) => {
                const on = i === active;
                return (
                  <button
                    key={c.name}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setPreview(i)}
                    onFocus={() => setPreview(i)}
                    onBlur={() => setPreview(null)}
                    className={`group flex w-full items-center gap-5 border-b py-5 text-left transition ${on ? "border-champagne" : "border-white/10 hover:border-white/30"}`}
                  >
                    <span
                      className={`h-12 w-12 shrink-0 rounded-full ring-1 ring-offset-4 ring-offset-obsidian transition ${on ? "ring-champagne" : "ring-white/10 group-hover:ring-white/30"}`}
                      style={{ background: `radial-gradient(circle at 35% 30%, #ffffff55, ${c.hex} 45%, ${c.hex})` }}
                    />
                    <span className="flex-1">
                      <span className={`display block text-3xl transition ${on ? "italic text-champagne" : "text-ivory group-hover:translate-x-1"}`}>{c.name}</span>
                      <span className="mt-1 block text-sm text-beige/50">{c.note}</span>
                    </span>
                    <span className="font-serif text-sm italic text-beige/40">{String(i + 1).padStart(2, "0")}</span>
                  </button>
                );
              })}
            </div>

            {/* Large preview */}
            <div className="relative lg:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden lg:sticky lg:top-24">
                <AnimatePresence mode="wait">
                  <motion.div key={shown.name} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
                    <EditorialImage photo={shown.photo} sizes="(min-width:1024px) 55vw, 100vw" className="h-full w-full" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-8 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="eyebrow text-beige/60">Shade inspiration</p>
                    <p className="display mt-2 text-5xl italic sm:text-6xl">{shown.name}</p>
                  </div>
                  <a
                    href={whatsappLink(`Hi Farman, I'd like a colour consultation. I'm interested in: ${COLOURS[active].name}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                  >
                    Colour consultation <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experimental liquid colour lab — WebGPU fluid, static orb elsewhere */}
      <section aria-labelledby="lab-title" className="relative overflow-hidden border-y border-white/5 bg-charcoal">
        <div className="container-x grid items-center gap-6 py-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow mb-5">Experimental · Liquid Colour Lab</p>
            <h2 id="lab-title" className="display text-5xl sm:text-6xl">
              Colour, <em className="italic text-champagne">in motion.</em>
            </h2>
            <p className="mt-6 max-w-md text-beige/70">
              A live fluid simulation — move your cursor or finger across it and watch the colour ripple. It takes on the shade you pick —
              currently <span className="text-champagne">{COLOURS[active].name}</span>.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {COLOURS.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Use ${c.name}`}
                  aria-pressed={i === active}
                  className={`h-8 w-8 rounded-full ring-1 ring-offset-2 ring-offset-charcoal transition ${i === active ? "ring-champagne" : "ring-transparent hover:ring-white/30"}`}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </Reveal>
          <div className="relative h-[480px] sm:h-[640px] lg:col-span-7">
            <WaterBallLab hex={COLOURS[active].hex} />
          </div>
        </div>
      </section>
    </>
  );
}
