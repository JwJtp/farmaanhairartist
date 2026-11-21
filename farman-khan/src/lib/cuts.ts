import type { Photo } from "./images";

/**
 * The Cut Catalogue — real reference photographs (Unsplash licence, shown as
 * inspiration). Replace any photo with Farman's own work, e.g.
 *   photo: { local: "/portfolio/butterfly-01.webp", alt: "Butterfly cut by Farman" }
 */

export type FaceShape = "Oval" | "Round" | "Square" | "Heart" | "Oblong";
export type Gender = "women" | "men";
export type Length = "Short" | "Medium" | "Long";
export type Care = "Wash & go" | "Some styling" | "Love styling";

export type Cut = {
  id: string;
  name: string;
  gender: Gender;
  length: Length;
  care: Care;
  suits: FaceShape[];
  blurb: string;
  photo: Photo;
  tall?: boolean; // taller card in the catalogue grid
};

const u = (id: string, alt: string): Photo => ({ id, alt });

export const CUTS: Cut[] = [
  /* ------------------------------------------------------------ women */
  { id: "butterfly", name: "Butterfly Cut", gender: "women", length: "Long", care: "Some styling", suits: ["Round", "Square", "Oval", "Heart"], blurb: "Voluminous layers with face-framing pieces that open like wings.", photo: u("1605980625458-21e4d9c29c4c", "Butterfly cut with face-framing layers"), tall: true },
  { id: "curtain-bangs", name: "Curtain Bangs", gender: "women", length: "Long", care: "Some styling", suits: ["Oblong", "Heart", "Oval", "Square"], blurb: "Soft middle-parted bangs that blend into long lengths.", photo: u("1628292180187-3bac5c5b3cb6", "Long hair with soft curtain bangs") },
  { id: "bob-fringe", name: "Bob with Fringe", gender: "women", length: "Short", care: "Some styling", suits: ["Oval", "Heart", "Oblong"], blurb: "Jaw-length bob with a bold fringe — sharp and chic.", photo: u("1772758058699-5b3f1abc384d", "Dark bob with a full fringe") },
  { id: "sleek-bob", name: "Sleek Bob", gender: "women", length: "Short", care: "Wash & go", suits: ["Oval", "Heart", "Oblong"], blurb: "Polished, blunt and glossy — a timeless classic.", photo: u("1779350676620-fde279b1d023", "Sleek brown bob from behind") },
  { id: "blonde-bob", name: "Blonde Bob", gender: "women", length: "Short", care: "Some styling", suits: ["Oval", "Square", "Heart"], blurb: "A bright, modern bob that frames the face beautifully.", photo: u("1779406859387-5d6fd116b3ff", "Blonde bob against a dark background"), tall: true },
  { id: "lob", name: "Lob (Long Bob)", gender: "women", length: "Medium", care: "Wash & go", suits: ["Oval", "Round", "Heart", "Square"], blurb: "Shoulder-grazing, versatile and low-maintenance.", photo: u("1499557354967-2b2d8910bcca", "Shoulder-length long bob") },
  { id: "wolf", name: "Wolf / Shag Cut", gender: "women", length: "Medium", care: "Some styling", suits: ["Oval", "Square", "Oblong", "Round"], blurb: "Choppy, shaggy layers full of movement and attitude.", photo: u("1644976914567-7fce1957e540", "Textured shag haircut") },
  { id: "curly-shag", name: "Curly Shag", gender: "women", length: "Medium", care: "Wash & go", suits: ["Oval", "Oblong", "Heart"], blurb: "Layers cut to release natural curl and bounce.", photo: u("1604427803385-a50909946f14", "Curly shag haircut, black and white"), tall: true },
  { id: "pixie", name: "Pixie Cut", gender: "women", length: "Short", care: "Wash & go", suits: ["Oval", "Heart"], blurb: "Short, confident and fresh with a soft fringe.", photo: u("1485290334039-a3c69043e517", "Short blonde pixie cut") },
  { id: "silver-pixie", name: "Silver Pixie", gender: "women", length: "Short", care: "Some styling", suits: ["Oval", "Heart", "Oblong"], blurb: "Cropped and luminous — grey worn with confidence.", photo: u("1674867688577-0ba3be4b7773", "Short white-grey pixie haircut") },
  { id: "long-layers", name: "Long Layers", gender: "women", length: "Long", care: "Wash & go", suits: ["Round", "Square", "Oval"], blurb: "Long, glossy hair with gentle layers through the ends.", photo: u("1731951214880-c8264fc17193", "Long glossy layered hair"), tall: true },
  { id: "beach-waves", name: "Soft Waves", gender: "women", length: "Long", care: "Love styling", suits: ["Oval", "Square", "Oblong", "Round"], blurb: "Effortless bends that add body and movement.", photo: u("1785456390070-9960e3997066", "Long soft wavy hair being styled") },
  { id: "red-bob", name: "Copper Bob", gender: "women", length: "Short", care: "Some styling", suits: ["Oval", "Heart", "Oblong"], blurb: "A short cut with rich, fiery colour.", photo: u("1586266195531-76cfa365cb43", "Red-haired woman with a short bob") },
  { id: "balayage-long", name: "Long Balayage", gender: "women", length: "Long", care: "Some styling", suits: ["Round", "Square", "Oval", "Heart", "Oblong"], blurb: "Long lengths with hand-painted, sun-kissed light.", photo: u("1605980766335-d3a41c7332a1", "Long blonde balayage"), tall: true },

  { id: "cocoa-curls", name: "Cocoa Curls", gender: "women", length: "Medium", care: "Wash & go", suits: ["Oval", "Oblong", "Heart", "Square"], blurb: "Rich brown curls cut to sit full and bouncy.", photo: u("1554519880-ffe46861d570", "Chocolate brown curls with volume"), tall: true },
  { id: "glossy-waves", name: "Glossy Beach Waves", gender: "women", length: "Long", care: "Love styling", suits: ["Oval", "Square", "Round"], blurb: "Loose, touchable waves with a high-shine finish.", photo: u("1682450285233-1fb10d4a4616", "Close-up of glossy beach waves") },
  { id: "soft-fringe", name: "Soft Fringe", gender: "women", length: "Long", care: "Some styling", suits: ["Oblong", "Oval", "Heart"], blurb: "A wispy fringe that softens and frames the eyes.", photo: u("1628292179199-137f784ba047", "Soft fringe with long brown hair") },
  { id: "short-crop", name: "Short Crop", gender: "women", length: "Short", care: "Wash & go", suits: ["Oval", "Heart"], blurb: "Cropped, chic and effortless — ready in minutes.", photo: u("1598771326492-f523d7bd3e89", "Short cropped brown hair") },
  { id: "statement-bangs", name: "Statement Bangs", gender: "women", length: "Medium", care: "Some styling", suits: ["Oblong", "Heart", "Oval"], blurb: "Bold, full bangs for an editorial edge.", photo: u("1589459724893-e858638fa4c8", "Bold bangs in black and white"), tall: true },
  { id: "plum-colour", name: "Plum Fashion Colour", gender: "women", length: "Medium", care: "Some styling", suits: ["Oval", "Round", "Square", "Heart"], blurb: "A daring violet-plum colour cut with soft movement.", photo: u("1492106087820-71f1a00d2b11", "Plum-violet fashion hair colour") },
  { id: "sleek-long", name: "Sleek Long Hair", gender: "women", length: "Long", care: "Some styling", suits: ["Round", "Square", "Oval"], blurb: "Mirror-straight, glossy length with clean ends.", photo: u("1638064432604-8da1fc75de09", "Long sleek straight hair"), tall: true },
  { id: "blunt-bob", name: "Blunt Bob", gender: "women", length: "Short", care: "Wash & go", suits: ["Oval", "Heart", "Oblong"], blurb: "One clean line at the jaw — strong and modern.", photo: u("1614283233556-f35b0c801ef1", "Blunt bob haircut") },
  { id: "long-waves", name: "Long Waves", gender: "women", length: "Long", care: "Love styling", suits: ["Oval", "Square", "Round", "Heart"], blurb: "Romantic long waves with dimension through the lengths.", photo: u("1785456283212-338f5bc44d50", "Long wavy blonde and brunette hair") },

  /* ------------------------------------------------------------ men */
  { id: "military", name: "Military Cut", gender: "men", length: "Short", care: "Wash & go", suits: ["Oval", "Square", "Oblong"], blurb: "Very short all over — sharp, disciplined, zero effort.", photo: u("1568339434343-2a640a1a9946", "Military-style short men's haircut"), tall: true },
  { id: "buzz", name: "Buzz Cut", gender: "men", length: "Short", care: "Wash & go", suits: ["Oval", "Square"], blurb: "Clipper-short and clean, best with a sharp beard.", photo: u("1672155408799-024306d7856d", "Men's buzz cut with beard") },
  { id: "crew", name: "Crew Cut", gender: "men", length: "Short", care: "Wash & go", suits: ["Oval", "Square", "Round"], blurb: "Short tapered sides with a little length on top.", photo: u("1599834562135-b6fc90e642ca", "Men's crew cut") },
  { id: "taper-fade", name: "Taper Fade", gender: "men", length: "Short", care: "Some styling", suits: ["Round", "Oval", "Square", "Oblong"], blurb: "A seamless taper from skin to length — crisp and clean.", photo: u("1772442088712-df1780cbb709", "Clean taper fade from behind") },
  { id: "fade-texture", name: "Fade + Textured Top", gender: "men", length: "Short", care: "Some styling", suits: ["Round", "Square", "Oval"], blurb: "Tight sides with a lifted, textured top.", photo: u("1630827020718-3433092696e7", "Men's fade with textured top, profile"), tall: true },
  { id: "french-crop", name: "French Crop", gender: "men", length: "Short", care: "Wash & go", suits: ["Oblong", "Heart", "Oval"], blurb: "Short textured top with a straight, blunt fringe.", photo: u("1562004760-aceed7bb0fe3", "Men's textured French crop") },
  { id: "pompadour", name: "Pompadour", gender: "men", length: "Medium", care: "Love styling", suits: ["Round", "Square", "Oval"], blurb: "Classic swept-up volume with tight sides — bold and polished.", photo: u("1774544584952-98ded2d9a862", "Men's pompadour, slicked back") },
  { id: "slick-back", name: "Slick Back", gender: "men", length: "Medium", care: "Love styling", suits: ["Oval", "Square", "Oblong"], blurb: "Sleek, swept-back and sharp — instant sophistication.", photo: u("1774544595967-89881d1f7381", "Man styling slicked-back hair"), tall: true },
  { id: "side-part", name: "Classic Side Part", gender: "men", length: "Short", care: "Some styling", suits: ["Oval", "Oblong", "Square", "Heart"], blurb: "A neat, defined parting — office to wedding.", photo: u("1761931403667-a6753db21f32", "Men's side part being combed") },
  { id: "mohawk", name: "Undercut Mohawk", gender: "men", length: "Medium", care: "Love styling", suits: ["Round", "Oval", "Square"], blurb: "Shaved sides with a bold strip of length on top.", photo: u("1695662917617-a1bfc0e2fbed", "Men's mohawk undercut") },
  { id: "scissor-texture", name: "Scissor-Cut Texture", gender: "men", length: "Medium", care: "Some styling", suits: ["Oval", "Square", "Heart", "Oblong"], blurb: "Softer, scissor-cut shape with natural movement.", photo: u("1647140655214-e4a2d914971f", "Scissor-cut men's hairstyle in progress") },
  { id: "long-flow", name: "Long Flow", gender: "men", length: "Long", care: "Some styling", suits: ["Square", "Oval", "Oblong"], blurb: "Medium-long and swept back behind the ears.", photo: u("1635567818469-e28cdf45c1f5", "Men's long flowing hair"), tall: true },
  { id: "shoulder", name: "Shoulder Length / Man Bun", gender: "men", length: "Long", care: "Some styling", suits: ["Square", "Oval", "Heart"], blurb: "Grown-out length you can wear down or tie up.", photo: u("1645224789994-6e04bebf796b", "Men's shoulder-length hair") },
  { id: "beard-shape", name: "Cut + Beard Shape-Up", gender: "men", length: "Short", care: "Some styling", suits: ["Round", "Oval", "Square", "Oblong", "Heart"], blurb: "Haircut finished with a sculpted beard line.", photo: u("1599011176306-4a96f1516d4d", "Beard trim and shape-up with scissors") },
  { id: "mohawk-2", name: "Mohawk Undercut", gender: "men", length: "Medium", care: "Love styling", suits: ["Round", "Oval", "Square"], blurb: "Shaved sides with a bold strip of length on top.", photo: u("1642504640216-a2a8cce892e6", "Mohawk undercut with sunglasses") },
  { id: "curly-top", name: "Curly Top", gender: "men", length: "Medium", care: "Wash & go", suits: ["Oval", "Square", "Oblong"], blurb: "Short sides with natural curls left free on top.", photo: u("1676025911719-32ff252572e9", "Men's curly top"), tall: true },
  { id: "hair-art", name: "Hair Art Design", gender: "men", length: "Short", care: "Some styling", suits: ["Oval", "Square", "Round"], blurb: "A custom line or design cut into the fade.", photo: u("1759675905700-a1b5efedc05c", "Design carved into a men's haircut") },
  { id: "gentleman", name: "Gentleman's Cut", gender: "men", length: "Short", care: "Some styling", suits: ["Oval", "Oblong", "Square"], blurb: "Neat, classic and smart — never out of style.", photo: u("1618049049816-43a00d5b0c3d", "Classic gentleman's haircut") },
  { id: "textured-curls", name: "Textured Curls", gender: "men", length: "Medium", care: "Wash & go", suits: ["Oval", "Square", "Heart"], blurb: "Curl-friendly layers with soft definition.", photo: u("1731141549194-430a126732fb", "Men's textured curly hair") },
  { id: "textured-crop", name: "Textured Crop", gender: "men", length: "Short", care: "Wash & go", suits: ["Oval", "Oblong", "Heart"], blurb: "Short, piece-y top with a low-maintenance finish.", photo: u("1788005163203-aeabacd76e45", "Short dark textured crop"), tall: true },
  { id: "shoulder-2", name: "Shoulder-Length Flow", gender: "men", length: "Long", care: "Some styling", suits: ["Square", "Oval", "Oblong"], blurb: "Grown-out length shaped to fall cleanly.", photo: u("1698163224176-dea3b7739cf4", "Men's shoulder-length hair") },
  { id: "retro-slick", name: "Retro Slick", gender: "men", length: "Medium", care: "Love styling", suits: ["Oval", "Square", "Round"], blurb: "High-shine, swept-back and full of vintage swagger.", photo: u("1774544544892-46e6e1f3495c", "Retro slicked-back hair") },
  { id: "business", name: "Business Cut", gender: "men", length: "Short", care: "Wash & go", suits: ["Oval", "Square", "Oblong", "Round"], blurb: "Tidy, professional and boardroom-ready.", photo: u("1587776535733-b4c80a99ef82", "Neat business haircut") },
  { id: "natural-curls", name: "Natural Curls", gender: "men", length: "Medium", care: "Wash & go", suits: ["Oval", "Oblong", "Square"], blurb: "Shape and weight removal that lets curls thrive.", photo: u("1544535379-b81233c1a64e", "Natural curly men's hair") },
  { id: "side-sweep", name: "Sharp Side Sweep", gender: "men", length: "Short", care: "Some styling", suits: ["Oval", "Oblong", "Heart", "Square"], blurb: "Clean sides with length swept elegantly across.", photo: u("1456327102063-fb5054efe647", "Sharp side-swept haircut"), tall: true },
];

export const FACE_SHAPES: FaceShape[] = ["Oval", "Round", "Square", "Heart", "Oblong"];

/** Rank cuts for a Style Finder answer set. */
export function recommend(gender: Gender, face: FaceShape | "Not sure", length: Length | "Any", care: Care) {
  const careRank: Record<Care, number> = { "Wash & go": 0, "Some styling": 1, "Love styling": 2 };
  return CUTS.filter((c) => c.gender === gender)
    .map((c) => {
      let score = 0;
      if (face === "Not sure" || c.suits.includes(face)) score += 3;
      if (length === "Any" || c.length === length) score += 3;
      score += 2 - Math.abs(careRank[c.care] - careRank[care]);
      return { cut: c, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((r) => r.cut);
}
