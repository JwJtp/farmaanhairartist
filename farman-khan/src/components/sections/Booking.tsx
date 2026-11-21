"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, ImagePlus, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Reveal, { SectionHeading } from "@/components/ui/Reveal";
import { SERVICE_NAMES } from "@/lib/content";
import { SITE, telLink, whatsappLink } from "@/lib/site";

type Form = { name: string; phone: string; service: string; date: string; time: string; length: string; message: string };
type Errors = Partial<Record<keyof Form, string>>;

const EMPTY: Form = { name: "", phone: "", service: "", date: "", time: "", length: "", message: "" };
const TIMES = ["Morning (before 1 pm)", "Afternoon (1 – 4 pm)", "Evening (after 4 pm)", "Any time"];
const LENGTHS = ["Short", "Shoulder length", "Long", "Extra long"];

function todayISO() {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function validate(f: Form): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  const digits = f.phone.replace(/\D/g, "");
  if (!/^(91)?[6-9]\d{9}$/.test(digits)) e.phone = "Enter a valid 10-digit Indian mobile number.";
  if (!f.service) e.service = "Choose a service.";
  if (!f.date) e.date = "Choose a preferred date.";
  else if (f.date < todayISO()) e.date = "Please pick today or a future date.";
  if (!f.time) e.time = "Choose a preferred time.";
  if (f.message.length > 600) e.message = "Please keep the message under 600 characters.";
  return e;
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

/**
 * Nothing is stored or sent to a server: the form only composes a WhatsApp
 * message on the visitor's own device. A reference photo is previewed locally
 * and attached by the visitor inside WhatsApp (wa.me links cannot carry files).
 */
export default function Booking() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState(false);
  const [photo, setPhoto] = useState<{ url: string; name: string } | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [ready, setReady] = useState<string | null>(null);

  useEffect(() => () => { if (photo) URL.revokeObjectURL(photo.url); }, [photo]);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...form, [k]: e.target.value };
    setForm(next);
    if (touched) setErrors(validate(next));
  };

  const message = useMemo(() => {
    const lines = [
      "Hello Farman, I'd like to request an appointment.",
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
      `Service: ${form.service}`,
      `Preferred date: ${form.date ? formatDate(form.date) : ""}`,
      `Preferred time: ${form.time}`,
    ];
    if (form.length) lines.push(`Hair length: ${form.length}`);
    if (form.message.trim()) lines.push(`Message: ${form.message.trim()}`);
    if (photo) lines.push("", "I have a reference photo — I'll attach it in this chat.");
    lines.push("", "Sent from the Farmaan.Hair Artist website.");
    return lines.join("\n");
  }, [form, photo]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`f-${first}`)?.focus();
      return;
    }
    const link = whatsappLink(message);
    setReady(link);
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError("");
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return setPhotoError("Please choose an image file.");
    if (file.size > 10 * 1024 * 1024) return setPhotoError("Image must be under 10 MB.");
    if (photo) URL.revokeObjectURL(photo.url);
    setPhoto({ url: URL.createObjectURL(file), name: file.name });
  };

  const err = (k: keyof Form) =>
    errors[k] ? (
      <p id={`e-${k}`} className="mt-2 flex items-center gap-1.5 text-xs text-[#E8907A]">
        <AlertCircle className="h-3.5 w-3.5" /> {errors[k]}
      </p>
    ) : null;
  const aria = (k: keyof Form) => ({ id: `f-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined });

  return (
    <section id="book" className="relative overflow-hidden bg-charcoal py-28 sm:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Appointments" title="Book your" accent="moment." intro="Share a few details and your enquiry opens in WhatsApp, ready to send. Farman's team replies to confirm availability." />
          <Reveal delay={0.1} className="mt-12 space-y-4">
            <a href={telLink} className="group flex items-center gap-5 border-b border-white/10 pb-5">
              <Phone className="h-5 w-5 text-champagne" />
              <span>
                <span className="block text-[10px] uppercase tracking-[0.24em] text-beige/50">Call</span>
                <span className="font-serif text-2xl group-hover:text-champagne">{SITE.phoneDisplay}</span>
              </span>
            </a>
            <a href={whatsappLink("Hi Farman, I'd like to book an appointment.")} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 border-b border-white/10 pb-5">
              <MessageCircle className="h-5 w-5 text-champagne" />
              <span>
                <span className="block text-[10px] uppercase tracking-[0.24em] text-beige/50">WhatsApp</span>
                <span className="font-serif text-2xl group-hover:text-champagne">Chat directly</span>
              </span>
            </a>
            <p className="pt-2 text-xs leading-relaxed text-beige/40">Your details are not stored on this website. They are only placed into a WhatsApp message on your own phone.</p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form noValidate onSubmit={submit} className="relative border border-white/10 bg-obsidian p-6 sm:p-10">
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="f-name" className="field-label">Your name *</label>
                <input {...aria("name")} className="field" autoComplete="name" value={form.name} onChange={set("name")} placeholder="Full name" />
                {err("name")}
              </div>
              <div>
                <label htmlFor="f-phone" className="field-label">Phone number *</label>
                <input {...aria("phone")} className="field" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} placeholder="98xxxxxxxx" />
                {err("phone")}
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="f-service" className="field-label">Preferred service *</label>
                <select {...aria("service")} className="field" value={form.service} onChange={set("service")}>
                  <option value="" disabled>Select a service</option>
                  {SERVICE_NAMES.map((s) => <option key={s}>{s}</option>)}
                </select>
                {err("service")}
              </div>
              <div>
                <label htmlFor="f-date" className="field-label">Preferred date *</label>
                <input {...aria("date")} className="field" type="date" min={todayISO()} value={form.date} onChange={set("date")} />
                {err("date")}
              </div>
              <div>
                <label htmlFor="f-time" className="field-label">Preferred time *</label>
                <select {...aria("time")} className="field" value={form.time} onChange={set("time")}>
                  <option value="" disabled>Select a time</option>
                  {TIMES.map((t) => <option key={t}>{t}</option>)}
                </select>
                {err("time")}
              </div>
              <div className="sm:col-span-2">
                <span className="field-label">Hair length (optional)</span>
                <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Hair length">
                  {LENGTHS.map((l) => (
                    <button
                      key={l}
                      type="button"
                      role="radio"
                      aria-checked={form.length === l}
                      onClick={() => setForm((f) => ({ ...f, length: f.length === l ? "" : l }))}
                      className={`border px-4 py-2.5 text-xs uppercase tracking-[0.18em] transition ${form.length === l ? "border-champagne bg-champagne text-obsidian" : "border-white/15 text-beige/70 hover:border-white/40"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="f-message" className="field-label">Message</label>
                <textarea {...aria("message")} className="field min-h-[96px] resize-y" value={form.message} onChange={set("message")} placeholder="Tell Farman about your hair history or the look you want" maxLength={600} />
                {err("message")}
              </div>
              <div className="sm:col-span-2">
                <span className="field-label">Reference image (optional)</span>
                {photo ? (
                  <div className="mt-2 flex items-center gap-4 border border-white/10 p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.url} alt="Your reference" className="h-16 w-16 object-cover" />
                    <span className="flex-1 truncate text-sm text-beige/70">{photo.name}</span>
                    <button type="button" onClick={() => setPhoto(null)} aria-label="Remove image" className="p-2 text-beige/60 hover:text-ivory">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label className="mt-2 flex cursor-pointer items-center gap-3 border border-dashed border-white/20 p-4 text-sm text-beige/60 transition hover:border-champagne hover:text-ivory focus-within:border-champagne">
                    <ImagePlus className="h-5 w-5 text-champagne" />
                    Add a photo of the look you love
                    <input type="file" accept="image/*" className="sr-only" onChange={onFile} />
                  </label>
                )}
                <p className="mt-2 text-xs text-beige/40">{photoError || "The photo stays on your device — attach it in WhatsApp after the chat opens."}</p>
              </div>
            </div>

            <button type="submit" className="btn-gold mt-10 w-full">
              <MessageCircle className="h-4 w-4" /> Send enquiry on WhatsApp
            </button>
            {touched && Object.keys(errors).length > 0 && (
              <p role="alert" className="mt-4 text-center text-sm text-[#E8907A]">Please check the highlighted fields.</p>
            )}

            <AnimatePresence>
              {ready && (
                <motion.div
                  role="status"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-obsidian/95 p-8 text-center backdrop-blur"
                >
                  <CheckCircle2 className="h-12 w-12 text-champagne" />
                  <p className="display mt-6 text-4xl">Your enquiry is ready.</p>
                  <p className="mt-3 max-w-sm text-beige/70">Farman&apos;s team will confirm availability. Your appointment is confirmed only once they reply.</p>
                  <a href={ready} target="_blank" rel="noopener noreferrer" className="btn-gold mt-8">
                    <MessageCircle className="h-4 w-4" /> Open WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setReady(null);
                      setForm(EMPTY);
                      setPhoto(null);
                      setTouched(false);
                      setErrors({});
                    }}
                    className="mt-5 text-[10px] uppercase tracking-[0.24em] text-beige/50 hover:text-champagne"
                  >
                    Start a new enquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
