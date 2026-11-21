/**
 * Editorial placeholder photography (Unsplash licence — free to use).
 * These are INSPIRATION images, never presented as Farman's client work.
 * Swap any `src` for a local file in /public/portfolio/ when authentic
 * photographs are supplied, e.g. { local: "/portfolio/balayage-01.webp" }.
 */

export type Photo = {
  id?: string; // Unsplash photo id
  local?: string; // path under /public
  alt: string;
};

const WIDTHS = [480, 800, 1200, 1800];

export function photoSrc(p: Photo, w = 1200) {
  if (p.local) return p.local;
  return `https://images.unsplash.com/photo-${p.id}?auto=format&fit=crop&w=${w}&q=80`;
}

export function photoSrcSet(p: Photo) {
  if (p.local) return undefined;
  return WIDTHS.map((w) => `${photoSrc(p, w)} ${w}w`).join(", ");
}

export const PHOTOS = {
  heroWave: { id: "1470259078422-826894b933aa", alt: "Woman tossing long glossy hair in motion" },
  blondeWhite: { id: "1605980766335-d3a41c7332a1", alt: "Soft blonde balayage with lived-in waves" },
  blondePortrait: { id: "1524504388940-b1c1722653e1", alt: "Editorial portrait with luminous blonde hair" },
  balayageBlue: { id: "1605980625458-21e4d9c29c4c", alt: "Dimensional balayage flowing over the shoulders" },
  silverTones: { id: "1605980625600-88b46abafa8d", alt: "Cool grey and black tonal hair colour" },
  wavyClose: { id: "1682450285233-1fb10d4a4616", alt: "Close-up of glossy wavy hair texture" },
  blondeBrunette: { id: "1785456283212-338f5bc44d50", alt: "Long wavy blonde and brunette hair side by side" },
  curlingIron: { id: "1629397685944-7073f5589754", alt: "Hairstylist shaping curls with a curling iron in a salon" },
  stylingWaves: { id: "1785456390070-9960e3997066", alt: "Styling long wavy blonde hair with a hot tool" },
  salonSession: { id: "1638064432648-bc2f9a91b06b", alt: "Client having her hair styled in a salon chair" },
  salonCut: { id: "1707812343087-c9ff9e5abb43", alt: "Precision haircut in progress at a salon" },
  auburnKnot: { id: "1614020863825-28a0bb7e3c3c", alt: "Auburn copper hair twisted into a sculpted knot" },
  copperSmile: { id: "1778110827669-4f16d6d91e8f", alt: "Vivid copper-red hair, editorial portrait" },
  copperMirror: { id: "1762475003359-c6fcb37294f1", alt: "Copper hair reflected in a mirror" },
  copperStreet: { id: "1711721891479-b5d8415deb9d", alt: "Rich red hair in natural daylight" },
  brownCurly: { id: "1554519880-ffe46861d570", alt: "Chocolate brown curls with natural volume" },
  brownBob: { id: "1779350676620-fde279b1d023", alt: "Sleek brown bob from behind" },
  brownTexture: { id: "1602549179763-ce6c9df961b7", alt: "Brown hair texture laid on white linen" },
  chocolateDark: { id: "1620939391250-eb822ac0818a", alt: "Chocolate brown hair against a black background" },
  darkLong: { id: "1596911647169-7085321c81b8", alt: "Long dark glossy hair seen from behind" },
  blackBrown: { id: "1560264641-1b5191cc63e2", alt: "Black to brown hair colour melt" },
  brownHold: { id: "1546877625-cb8c71916608", alt: "Woman holding a section of healthy brown hair" },
  plumWall: { id: "1492106087820-71f1a00d2b11", alt: "Plum-violet fashion hair colour" },
  longKitchen: { id: "1638064432604-8da1fc75de09", alt: "Long straight glossy hair" },
  girlFocus: { id: "1533661338746-e4e47d30dfd8", alt: "Soft natural hair in shallow focus portrait" },
  braiding: { id: "1757866332992-723bf8d6169c", alt: "Hands sectioning dark hair for a treatment" },
  extensions: { id: "1785456463151-623876d5b7af", alt: "Hair professional working on blonde lengths" },
  blackTop: { id: "1554519934-e32b1629d9ee", alt: "Smooth brunette hair over a black top" },
  greyTop: { id: "1519421692594-d7a3f3e3fe5f", alt: "Natural caramel brown hair, soft portrait" },
  pinkWall: { id: "1522337360788-8b13dee7a37e", alt: "Fresh blow-dry with soft movement" },
  bwFlick: { id: "1531924224004-7beee12117a6", alt: "Black and white portrait of hair in motion" },
  // Men's grooming & barbering
  menBlowdry: { id: "1605497788044-5a32c7078486", alt: "Barber blow-drying a man's hair into shape" },
  menScissors: { id: "1647140655214-e4a2d914971f", alt: "Scissor-cut men's hairstyle in progress" },
  menBeardProfile: { id: "1630827020718-3433092696e7", alt: "Men's dark textured hair with a sharp beard line, profile" },
  menBarberCut: { id: "1635273051937-a0ddef9573b6", alt: "Men's haircut being refined by a barber" },
  menThinning: { id: "1657105052497-f996284ffff8", alt: "Texturising a men's cut with thinning shears" },
  menFadeBack: { id: "1772442088712-df1780cbb709", alt: "Clean taper fade seen from behind" },
  menComb: { id: "1761931403667-a6753db21f32", alt: "Styling a men's cut with a comb" },
  menGloves: { id: "1783908688260-0c47404926f3", alt: "Precision men's haircut" },
  menHead: { id: "1568339434343-2a640a1a9946", alt: "Short men's haircut, close crop" },
  menBW: { id: "1578390432942-d323db577792", alt: "Black and white portrait, men's textured hairstyle" },
  menBeardTrim: { id: "1599011176306-4a96f1516d4d", alt: "Beard trim and shape-up with scissors" },
} satisfies Record<string, Photo>;
