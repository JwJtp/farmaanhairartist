import { PHOTOS, type Photo } from "./images";

export type Service = { no: string; name: string; desc: string; photo: Photo; span: "tall" | "wide" | "square" };

export const SERVICES: Service[] = [
  { no: "01", name: "Hair Colour", desc: "Tone chosen for your skin, eyes and lifestyle — rich, even and luminous.", photo: PHOTOS.brownHold, span: "tall" },
  { no: "02", name: "Global Hair Colour", desc: "One seamless shade from root to tip with mirror-like shine.", photo: PHOTOS.chocolateDark, span: "square" },
  { no: "03", name: "Balayage", desc: "Hand-painted light that grows out softly, never with a harsh line.", photo: PHOTOS.blondeWhite, span: "wide" },
  { no: "04", name: "Highlights", desc: "Precise ribbons of brightness that add depth and movement.", photo: PHOTOS.blondePortrait, span: "square" },
  { no: "05", name: "Ombre Hair", desc: "A graceful melt from deep roots to lighter ends.", photo: PHOTOS.blackBrown, span: "tall" },
  { no: "06", name: "Hair Transformation", desc: "A complete new direction — colour, shape and finish planned together.", photo: PHOTOS.copperSmile, span: "square" },
  { no: "07", name: "Hair Styling", desc: "Blow-dries, waves and event looks with a polished, camera-ready finish.", photo: PHOTOS.curlingIron, span: "wide" },
  { no: "08", name: "Hair Treatment", desc: "Care rituals that restore softness, strength and shine.", photo: PHOTOS.wavyClose, span: "square" },
  { no: "09", name: "Professional Hair Consultation", desc: "An honest, one-to-one conversation about what your hair can become.", photo: PHOTOS.salonSession, span: "square" },
  { no: "10", name: "Custom Hair Makeovers", desc: "A look designed only for you, from first idea to final reveal.", photo: PHOTOS.auburnKnot, span: "tall" },
  { no: "11", name: "Men's Cuts & Styling", desc: "Fades, crops, military cuts and textured styles — sharp lines, clean finish.", photo: PHOTOS.menBarberCut, span: "square" },
];

export const SERVICE_NAMES = SERVICES.map((s) => s.name);

export type GalleryCategory = "All" | "Men" | "Balayage" | "Brown" | "Copper & Burgundy" | "Global Colour" | "Highlights" | "Styling";
export const GALLERY_FILTERS: GalleryCategory[] = ["All", "Men", "Balayage", "Brown", "Copper & Burgundy", "Global Colour", "Highlights", "Styling"];

export type GalleryItem = { photo: Photo; cat: Exclude<GalleryCategory, "All">; title: string; ratio: string };

export const GALLERY: GalleryItem[] = [
  { photo: PHOTOS.blondeWhite, cat: "Balayage", title: "Blonde Balayage", ratio: "aspect-[4/5]" },
  { photo: PHOTOS.chocolateDark, cat: "Brown", title: "Chocolate Gloss", ratio: "aspect-[3/4]" },
  { photo: PHOTOS.copperSmile, cat: "Copper & Burgundy", title: "Copper Glow", ratio: "aspect-square" },
  { photo: PHOTOS.balayageBlue, cat: "Balayage", title: "Caramel Ribbons", ratio: "aspect-[2/3]" },
  { photo: PHOTOS.stylingWaves, cat: "Styling", title: "Soft Hollywood Waves", ratio: "aspect-[4/5]" },
  { photo: PHOTOS.darkLong, cat: "Global Colour", title: "Long Glossy Global", ratio: "aspect-[3/4]" },
  { photo: PHOTOS.blondePortrait, cat: "Highlights", title: "Luminous Highlights", ratio: "aspect-[4/5]" },
  { photo: PHOTOS.auburnKnot, cat: "Copper & Burgundy", title: "Auburn Sculpt", ratio: "aspect-square" },
  { photo: PHOTOS.brownCurly, cat: "Brown", title: "Cocoa Curls", ratio: "aspect-[4/5]" },
  { photo: PHOTOS.curlingIron, cat: "Styling", title: "Curl Set", ratio: "aspect-[3/4]" },
  { photo: PHOTOS.blondeBrunette, cat: "Highlights", title: "Blonde & Brunette", ratio: "aspect-[4/3]" },
  { photo: PHOTOS.copperStreet, cat: "Copper & Burgundy", title: "Red Copper", ratio: "aspect-[3/4]" },
  { photo: PHOTOS.blackBrown, cat: "Global Colour", title: "Espresso Melt", ratio: "aspect-square" },
  { photo: PHOTOS.wavyClose, cat: "Balayage", title: "Sun-kissed Texture", ratio: "aspect-[4/5]" },
  { photo: PHOTOS.menFadeBack, cat: "Men", title: "Taper Fade", ratio: "aspect-[4/5]" },
  { photo: PHOTOS.menBeardProfile, cat: "Men", title: "Textured Top & Beard", ratio: "aspect-[3/4]" },
  { photo: PHOTOS.menHead, cat: "Men", title: "Military Crop", ratio: "aspect-square" },
  { photo: PHOTOS.menComb, cat: "Men", title: "Classic Side Part", ratio: "aspect-[4/5]" },
  { photo: PHOTOS.menBW, cat: "Men", title: "Textured Crop", ratio: "aspect-[3/4]" },
  { photo: PHOTOS.menBlowdry, cat: "Men", title: "Blow-dried Volume", ratio: "aspect-[4/5]" },
];

export type ColourShade = { name: string; hex: string; photo: Photo; note: string };

export const COLOURS: ColourShade[] = [
  { name: "Blonde", hex: "#D9B98A", photo: PHOTOS.blondePortrait, note: "Bright, soft and luminous — from honey to beige." },
  { name: "Caramel", hex: "#B07A45", photo: PHOTOS.balayageBlue, note: "Warm golden brown that glows in daylight." },
  { name: "Ash Brown", hex: "#7A6A5C", photo: PHOTOS.silverTones, note: "Cool, smoky brown that keeps brassiness away." },
  { name: "Chocolate Brown", hex: "#4A2E22", photo: PHOTOS.chocolateDark, note: "Deep, rich and glossy — timeless on Indian skin tones." },
  { name: "Copper", hex: "#B5562C", photo: PHOTOS.copperSmile, note: "Bold, fiery warmth with real dimension." },
  { name: "Burgundy", hex: "#6B1E2E", photo: PHOTOS.plumWall, note: "Wine-dark depth with a jewel-toned shine." },
  { name: "Balayage", hex: "#C9A06E", photo: PHOTOS.blondeWhite, note: "Hand-painted light for a lived-in finish." },
  { name: "Global Colour", hex: "#2B1A14", photo: PHOTOS.darkLong, note: "One even shade, root to tip, full of shine." },
];

export type LookOption = { id: string; label: string; photo?: Photo; hex?: string };
export type LookStep = { key: "colour" | "length" | "finish"; title: string; options: LookOption[] };

export const LOOK_STEPS: LookStep[] = [
  {
    key: "colour",
    title: "Choose a colour direction",
    options: [
      { id: "blonde", label: "Blonde", photo: PHOTOS.blondePortrait },
      { id: "caramel-balayage", label: "Caramel Balayage", photo: PHOTOS.balayageBlue },
      { id: "chocolate", label: "Chocolate Brunette", photo: PHOTOS.chocolateDark },
      { id: "copper", label: "Copper", photo: PHOTOS.copperSmile },
      { id: "burgundy", label: "Burgundy / Plum", photo: PHOTOS.plumWall },
      { id: "natural", label: "Natural Dark Gloss", photo: PHOTOS.darkLong },
    ],
  },
  {
    key: "length",
    title: "Your current length",
    options: [
      { id: "short", label: "Short / Bob", photo: PHOTOS.brownBob },
      { id: "shoulder", label: "Shoulder length", photo: PHOTOS.greyTop },
      { id: "long", label: "Long", photo: PHOTOS.longKitchen },
      { id: "extra-long", label: "Extra long", photo: PHOTOS.darkLong },
    ],
  },
  {
    key: "finish",
    title: "Pick a finish",
    options: [
      { id: "sleek", label: "Sleek & straight", photo: PHOTOS.blackTop },
      { id: "waves", label: "Soft waves", photo: PHOTOS.stylingWaves },
      { id: "curls", label: "Defined curls", photo: PHOTOS.brownCurly },
      { id: "volume", label: "Bouncy blow-dry", photo: PHOTOS.pinkWall },
    ],
  },
];

export const WHY = [
  { title: "Creative hair artistry", text: "Every look is designed, not copied — shaped around you." },
  { title: "Attention to detail", text: "Sectioning, placement and tone handled with precision." },
  { title: "Personalised consultation", text: "Your hair history, routine and goals come first." },
  { title: "Colour-focused expertise", text: "Colour is the speciality — from subtle gloss to full change." },
  { title: "Professional styling approach", text: "A finish that looks as good in person as on camera." },
  { title: "Customer-focused experience", text: "Clear advice, honest expectations, and real care." },
] as const;
