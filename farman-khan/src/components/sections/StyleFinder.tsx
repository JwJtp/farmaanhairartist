"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, MessageCircle, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import EditorialImage from "@/components/ui/EditorialImage";
import Reveal, { SectionHeading } from "@/components/ui/Reveal";
import { FACE_SHAPES, recommend, type Care, type FaceShape, type Gender, type Length } from "@/lib/cuts";
import { whatsappLink } from "@/lib/site";

type Answers = { gender?: Gender; face?: FaceShape | "Not sure"; length?: Length | "Any"; care?: Care };

/** Simple outline of each face shape (a geometric guide, not a drawing of a person). */
function FaceIcon({ shape }: { shape: FaceShape | "Not sure" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2 } as const;
  return (
    <svg viewBox="0 0 40 50" className="h-12 w-10" aria-hidden>
      {shape === "Oval" && <ellipse cx="20" cy="25" rx="13" ry="19" {...common} />}
      {shape === "Round" && <circle cx="20" cy="25" r="16" {...common} />}
      {shape === "Square" && <rect x="5" y="8" width="30" height="34" rx="6" {...common} />}
      {shape === "Heart" && <path d="M5 12 Q20 4 35 12 Q34 32 20 46 Q6 32 5 12 Z" {...common} />}
      {shape === "Oblong" && <rect x="9" y="3" width="22" height="44" rx="10" {...common} />}
      {shape === "Not sure" && <text x="20" y="32" textAnchor="middle" fontSize="20" fill="currentColor" fontFamily="Georgia, serif">?</text>}
    </svg>
  );
}

export default function StyleFinder() {
  const [a, setA] = useState<Answers>({});
  const [step, setStep] = useState(0);

  const STEPS = [
    {
      key: "gender" as const,
      q: "Who is the cut for?",
      opts: [
        { v: "women", label: "Women" },
        { v: "men", label: "Men" },
      ],
    },
    {
      key: "face" as const,
      q: "What's your face shape?",
      hint: "Look in a mirror with hair pulled back — which outline is closest?",
      opts: [...FACE_SHAPES, "Not sure" as const].map((f) => ({ v: f, label: f })),
    },
    {
      key: "length" as const,
      q: "How much length do you want?",
      opts: (["Short", "Medium", "Long", "Any"] as const).map((l) => ({ v: l, label: l === "Any" ? "Open to anything" : l })),
    },
    {
      key: "care" as const,
      q: "How much styling do you do each day?",
      opts: (["Wash & go", "Some styling", "Love styling"] as const).map((c) => ({ v: c, label: c })),
    },
  ];

  const done = step >= STEPS.length;
  const results = done && a.gender && a.face && a.length && a.care ? recommend(a.gender, a.face, a.length, a.care) : [];

  const pick = (key: keyof Answers, v: string) => {
    setA((p) => ({ ...p, [key]: v }));
    setTimeout(() => setStep((s) => s + 1), 220);
  };

  const message = results.length
    ? `Hi Farman, I used the Style Finder on the Farmaan.Hair Artist website (${a.gender === "men" ? "men's" : "women's"}, ${a.face} face, ${a.length} length, ${a.care}). My matches: ${results
        .map((r) => r.name)
        .join(", ")}. Which would you recommend for me, and when are you available?`
    : "";

  const current = STEPS[Math.min(step, STEPS.length - 1)];

  return (
    <section id="finder" className="relative overflow-hidden bg-charcoal py-28 sm:py-40">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-champagne/10 blur-[120px]" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Style Finder"
          title="Which cut"
          accent="suits you?"
          intro="Four quick questions. Get your three best-matched cuts — with real photos — and send them straight to Farman."
        />

        {/* progress */}
        <Reveal className="mt-14 flex items-center gap-3">
          {STEPS.map((s, i) => (
            <span key={s.key} className={`h-[3px] flex-1 transition-colors duration-500 ${i < step ? "bg-champagne" : i === step ? "bg-champagne/50" : "bg-white/10"}`} />
          ))}
          <span className="ml-2 text-[10px] uppercase tracking-[0.24em] text-beige/50">{done ? "Your matches" : `${step + 1} / ${STEPS.length}`}</span>
        </Reveal>

        <div className="mt-10 min-h-[420px]">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key={current.key} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
                <h3 className="display text-4xl sm:text-5xl">{current.q}</h3>
                {"hint" in current && current.hint && <p className="mt-3 text-beige/55">{current.hint}</p>}
                <div className={`mt-10 grid gap-3 ${current.key === "face" ? "grid-cols-3 sm:grid-cols-6" : current.key === "gender" ? "grid-cols-2 sm:max-w-xl" : "grid-cols-2 sm:grid-cols-4"}`} role="radiogroup" aria-label={current.q}>
                  {current.opts.map((o) => {
                    const on = a[current.key] === o.v;
                    return (
                      <button
                        key={o.v}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => pick(current.key, o.v)}
                        className={`group flex flex-col items-center justify-center gap-3 border px-4 py-8 transition ${on ? "border-champagne bg-champagne/10 text-champagne" : "border-white/10 text-ivory/85 hover:border-champagne/60 hover:text-champagne"}`}
                      >
                        {current.key === "face" && <FaceIcon shape={o.v as FaceShape | "Not sure"} />}
                        <span className={`font-serif ${current.key === "gender" ? "text-4xl" : "text-xl"} italic`}>{o.label}</span>
                        {on && <Check className="h-4 w-4" />}
                      </button>
                    );
                  })}
                </div>
                {step > 0 && (
                  <button type="button" onClick={() => setStep((s) => s - 1)} className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-beige/50 hover:text-champagne">
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div key="results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h3 className="display flex flex-wrap items-center gap-4 text-4xl sm:text-5xl">
                  <Sparkles className="h-8 w-8 text-champagne" /> Your top matches
                </h3>
                <p className="mt-3 text-beige/55">
                  {a.gender === "men" ? "Men's" : "Women's"} · {a.face} face · {a.length === "Any" ? "any length" : `${a.length} length`} · {a.care}
                </p>
                <div className="mt-10 grid gap-4 md:grid-cols-3">
                  {results.map((c, i) => (
                    <motion.article
                      key={c.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 * i, duration: 0.6 }}
                      className="group relative overflow-hidden border border-white/10"
                    >
                      <EditorialImage photo={c.photo} sizes="(min-width:768px) 33vw, 100vw" className="aspect-[4/5] w-full" imgClassName="transition-transform duration-[1.2s] group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                      <span className="absolute left-4 top-4 bg-champagne px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian">
                        {i === 0 ? "Best match" : `Match ${i + 1}`}
                      </span>
                      <div className="absolute inset-x-0 bottom-0 p-6">
                        <p className="display text-3xl">{c.name}</p>
                        <p className="mt-2 text-sm text-beige/75">{c.blurb}</p>
                      </div>
                    </motion.article>
                  ))}
                </div>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" className="btn-gold">
                    <MessageCircle className="h-4 w-4" /> Send my matches to Farman
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setA({});
                      setStep(0);
                    }}
                    className="btn-line"
                  >
                    <RotateCcw className="h-4 w-4" /> Start again
                  </button>
                  <a href={a.gender === "men" ? "#men-cuts" : "#women-cuts"} className="btn-line">Browse all cuts</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
