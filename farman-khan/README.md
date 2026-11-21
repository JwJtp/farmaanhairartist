# Farmaan.Hair Artist — by Farman Khan

Luxury portfolio, cut catalogue and appointment-enquiry website.
Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Three.js · Lucide.

## Run it

1. `npm install`
2. `npm run dev`, then open http://localhost:3000
3. `npm run build` creates a static site in `/out`. Upload that folder to any host (Vercel, Netlify, Hostinger, cPanel).

## Before going live

1. **Domain:** set `NEXT_PUBLIC_SITE_URL=https://yourdomain.com` (in Vercel env vars or `.env.local`). This turns on the canonical URL, sitemap.xml and absolute Open Graph links.
2. **Exact salon branch:** Delhi has several Pacific Malls. Once you confirm which one, set `mapsUrl` in `src/lib/site.ts` and a "Get directions" button appears.
3. **Instagram:** check that both URLs in `src/lib/site.ts` open the right accounts.
4. **Real photos:** put files in `public/portfolio/` and swap the entries in `src/lib/images.ts`, e.g. `{ local: "/portfolio/balayage-01.webp", alt: "..." }`.
   - Farman's portrait: replace the main image in `src/components/sections/About.tsx` (it's currently an editorial salon photo).
   - Real before/after: replace the two images in `BeforeAfter` (`Gallery.tsx`) and remove the "illustrative demo" note.

## Where things live

| What | File |
|---|---|
| Phone, WhatsApp, location, Instagram | `src/lib/site.ts` |
| Services, gallery, colours, look-finder, "why" items | `src/lib/content.ts` |
| Photos | `src/lib/images.ts` |
| Original Originkit effects (unchanged) | `src/components/effects/originkit/` |
| Effect wrappers (lazy load, fallbacks, palettes) | `src/components/effects/` |

## 3D effects (original Originkit code, unchanged)

- **Vortex** (Three.js): the hero (home) section only, placed beside the headline. Gold and bronze, with a lighter particle count on phones and a soft glow fallback.
- **Glass Cube** (WebGL2): the closing visual in the last section (Contact), beside the contact card. Recoloured to champagne, bronze, rose gold and ivory. Visitors can drag it to turn it. It falls back to a CSS cube.
- **Water Ball** (WebGPU): the Liquid Colour Lab. It starts automatically when on screen and takes on the selected hair shade. Mouse-wheel zoom is blocked so page scrolling never gets stuck. Browsers without WebGPU, and visitors who prefer reduced motion, get a static liquid orb.
- Each effect mounts only near the viewport and unmounts (freeing its GPU context) when scrolled away.

## Cut Catalogue and Style Finder

- **Two separate collections:** **For Her** (`#women-cuts`, light ivory editorial style) with 23 women's cuts, and **For Him** (`#men-cuts`, dark barber-studio style) with 25 men's cuts. Each has length filters, a swipeable row of large cards, and a full detail view with a **Book this cut** WhatsApp button. Code: `src/components/sections/CutCollections.tsx`.
- **Style Finder** (`#finder`): four questions (who it's for, face shape, length, daily styling) that show the 3 best-matched cuts and send them to Farman on WhatsApp.
- All cuts live in `src/lib/cuts.ts`. To add a cut, copy one entry. To use Farman's own photo, set `photo: { local: "/portfolio/your-file.webp", alt: "..." }`.

## Why React Strict Mode is off

`reactStrictMode` is `false` in `next.config.mjs`. In `npm run dev`, Strict Mode starts every component twice. The original Originkit Vortex releases its WebGL context when it stops, so the second start would show a blank hero. Live builds are not affected either way.

## Preview build

`PREVIEW=1 npm run build` makes asset paths relative (for previews hosted in a sub-folder). Normal builds don't need it.

## Credit

The footer credit "Designed & developed by Nexobova" links to https://nexobova.com (`Footer` in `src/components/sections/Closing.tsx`).

## Privacy

The booking form stores nothing and sends nothing to a server. It builds a WhatsApp message on the visitor's device. A reference photo is previewed locally, and the visitor attaches it inside WhatsApp.

## Image credits

The placeholder editorial photography is from Unsplash (Unsplash Licence). It is shown as inspiration only and is labelled that way on the site.
