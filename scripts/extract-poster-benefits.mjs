// Extracts the eight benefit product images from the Nyoni poster master.
//
//   node scripts/extract-poster-benefits.mjs
//
// ---------------------------------------------------------------------------
// These are TEMPORARY stand-ins. Read this before relying on them.
//
// The renders are lifted from Austin's own poster (assets/poster/), so there is
// no licensing problem — but they are AI-generated composites, not photographs
// of Nyoni's actual goods, and the poster only holds them at 164-352px wide.
// That ceiling is why the benefits layout uses small precise thumbnails rather
// than large imagery: upscaling these would look worse than not using them.
//
// They are replaced the moment Austin's own delivery photographs arrive. The
// shot list briefing him on those photos is the companion to this file.
//
// Two known compromises, both acceptable at thumbnail size and both fixed by
// real photographs:
//   - the bakkie is a badged Mahindra, i.e. another company's vehicle
//   - the maize sacks are generic, not the 50kg bags Nyoni actually buys
// ---------------------------------------------------------------------------
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SOURCE = "assets/poster/nyoni-poster-master.png";
const OUT = "public/images/benefits";

/**
 * The poster's tile background is #f2ebe4; the site's cream token is #f7f3ea.
 * Five to eight points apart per channel — invisible alone, but a clear seam
 * once the tile sits on a cream page. A flat per-channel lift maps the
 * background exactly onto the token and moves the product pixels by the same
 * imperceptible amount.
 */
const LIFT = [5, 8, 6];

/** left, top, width, height within the 1024x1536 poster. */
const TILES = [
  ["cow", 58, 864, 188, 154],
  ["maize-meal", 276, 864, 156, 154],
  ["firewood", 458, 864, 217, 154],
  ["bakkie", 710, 864, 236, 154],
  ["bread", 60, 1152, 344, 116],
  ["chicken", 442, 1152, 174, 116],
  ["cabbage", 626, 1152, 157, 116],
  ["potatoes", 797, 1152, 179, 116],
];

await mkdir(OUT, { recursive: true });

for (const [name, left, top, width, height] of TILES) {
  const file = `${OUT}/${name}.webp`;
  await sharp(SOURCE)
    .extract({ left, top, width, height })
    .linear([1, 1, 1], LIFT)
    // No resize: these are used at or below native size. Upscaling an
    // already-soft 164px render is how a site starts looking cheap.
    .webp({ quality: 92 })
    .toFile(file);
  console.log(`${file}  ${width}x${height}`);
}
