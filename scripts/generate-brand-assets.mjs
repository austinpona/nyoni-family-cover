// Regenerates every icon, the brand lockup and the Open Graph card from the
// single source logo.
//
//   node scripts/generate-brand-assets.mjs
//
// Run by hand and committed for reproducibility. Never imported by the app, so
// sharp adds nothing to the bundle — it is already present as a Next
// transitive dependency for image optimisation.
//
// ---------------------------------------------------------------------------
// Source file, and the defect that used to be worked around here
//
// SOURCE is nyoni-logo-source.png — a clean 1280x1215 export supplied by Austin
// on 1 September 2026, measured as a perfectly flat white background.
//
// The file it replaced, public/images/nyoni-logo.png, had a checkerboard
// pattern baked into its pixels: someone had exported a transparent PNG
// flattened against the editor's preview grid, so the checker was real image
// data that no amount of flattening or trimming could remove. That file is
// still referenced by the in-page logo components and should be retired there
// too.
//
// So the two pieces of the logo are lifted out separately and recomposed:
//
//   the roundel   y 131..1024  — cropped and masked to a circle, which
//                                discards the checker outside it
//   the wordmark  y 1062..1195 — thresholded to a pure mask and repainted in
//                                brand navy, which discards the checker behind
//                                it while keeping the real letterforms
//
// Recomposing rather than substituting matters: the NYONI wordmark keeps its
// own typeface instead of a lookalike font.
//
// If a clean vector logo ever arrives, replace SOURCE and delete ROUNDEL and
// WORDMARK; everything downstream still works.
// ---------------------------------------------------------------------------
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const SOURCE = "public/images/nyoni-logo-source.png";
const DEEP_BLACK = "#181714";
const CREAM = "#f7f3ea";
const NAVY = "#12233f";
const LIGHT_GOLD = "#c5a165";

/** Measured from the source by scanning for bands of dark pixels. */
const ROUNDEL = { left: 189, top: 65, width: 900, height: 900 };
const WORDMARK = { left: 320, top: 1057, width: 640, height: 150 };

await mkdir("public/icons", { recursive: true });

/**
 * The circular emblem, masked so no checkered background survives.
 * Transparent outside the circle, ready to composite onto any ground.
 */
async function emblem(diameter) {
  const mask = Buffer.from(
    `<svg width="${diameter}" height="${diameter}"><circle cx="${diameter / 2}" cy="${diameter / 2}" r="${diameter / 2}" fill="#fff"/></svg>`,
  );
  return sharp(SOURCE)
    .extract(ROUNDEL)
    .resize(diameter, diameter)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

/**
 * The NYONI wordmark, repainted in brand navy on a transparent ground.
 *
 * Thresholding is safe here in a way it would not be over the whole logo:
 * this region is dark type on a light ground with no white highlights to
 * lose, so everything light is background by definition.
 */
async function wordmark(width) {
  const height = Math.round((width * WORDMARK.height) / WORDMARK.width);
  const mask = await sharp(SOURCE)
    .extract(WORDMARK)
    .resize(width, height)
    .greyscale()
    .threshold(190)
    .negate()
    .raw()
    .toBuffer();
  return sharp({ create: { width, height, channels: 3, background: NAVY } })
    .joinChannel(mask, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
}

/**
 * The full brand lockup: emblem above wordmark, on cream. This is the logo as
 * it appears in the site header, and it is what belongs anywhere the mark is
 * shown large — the Knowledge Panel logo, home-screen icons, the share card.
 *
 * Cream, not the brand black: the artwork is dark navy and vanishes on #181714.
 */
async function lockup(size, out) {
  const pad = Math.round(size * 0.07);
  const markD = Math.round(size * 0.6);
  const wordW = Math.round(size * 0.66);

  const mark = await emblem(markD);
  const word = await wordmark(wordW);
  const wordH = (await sharp(word).metadata()).height;

  const blockH = markD + Math.round(size * 0.045) + wordH;
  const top = Math.round((size - blockH) / 2);

  return sharp({ create: { width: size, height: size, channels: 4, background: CREAM } })
    .composite([
      { input: mark, top, left: Math.round((size - markD) / 2) },
      { input: word, top: top + markD + Math.round(size * 0.045), left: Math.round((size - wordW) / 2) },
    ])
    .png()
    .toFile(out)
    .then(() => console.log(`${out}  ${size}x${size}  (lockup, pad ${pad})`));
}

/** The emblem full-bleed on an opaque cream square, as a PNG buffer. */
async function emblemOnCream(size) {
  const mark = await emblem(size);
  return sharp({ create: { width: size, height: size, channels: 4, background: CREAM } })
    .composite([{ input: mark, top: 0, left: 0 }])
    .png()
    .toBuffer();
}

/*
  Which mark goes at which size, and why.

  Google Search renders a favicon at roughly 16-24px AND crops it to a circle.
  A lockup there loses twice: the wordmark becomes an illegible smudge, and the
  circle crop cuts off whatever sits at the bottom of the square — which is
  exactly where the wordmark is. So the small icons carry the emblem alone,
  which is still unmistakably the Nyoni mark at that size.

  Everything rendered large enough to read gets the real lockup.
*/
await writeFile("src/app/icon.png", await emblemOnCream(48));
console.log("src/app/icon.png  48x48  (emblem — circle-cropped in search)");

await lockup(180, "src/app/apple-icon.png");
await lockup(192, "public/icons/icon-192.png");
await lockup(512, "public/icons/icon-512.png");
await lockup(1024, "public/images/nyoni-logo-lockup.png");

/**
 * favicon.ico, built by hand.
 *
 * The file that was here originally was 25931 bytes — the exact size of the
 * Next.js starter favicon, i.e. the framework's own logo in the browser tab of
 * a funeral-cover site.
 *
 * sharp cannot write .ico, so the container is assembled directly. Every
 * browser in use accepts PNG payloads inside an ICO, which avoids encoding BMP
 * with its bottom-up rows and AND mask.
 */
async function favicon(out, sizes = [16, 32, 48]) {
  const images = await Promise.all(sizes.map((size) => emblemOnCream(size)));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(sizes.length, 4);

  let offset = 6 + 16 * sizes.length;
  const entries = [];
  for (const [index, size] of sizes.entries()) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 means 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height
    entry.writeUInt8(0, 2); // palette size
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(images[index].length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += images[index].length;
    entries.push(entry);
  }

  await writeFile(out, Buffer.concat([header, ...entries, ...images]));
  console.log(`${out}  ${sizes.join("px, ")}px  (emblem)`);
}

await favicon("src/app/favicon.ico");

/*
  Open Graph: 1200x630 is the size every platform actually crops to. This is
  the card that appears in every WhatsApp forward, and WhatsApp forwarding is
  how this business spreads, so it matters more than the favicon does.

  Every line of wording is already on the site. The waiting period is on the
  card deliberately: a share image promising a cow without the condition
  attached is exactly the thing this site exists not to do. Cross-check any
  change against src/lib/site-data.ts and TRUST-TODO.md.
*/
const OG_W = 1200;
const OG_H = 630;
const OG_MARK = 300;
const OG_WORD = 290;

const card = `<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${OG_W}" height="${OG_H}" fill="${DEEP_BLACK}"/>
  <rect x="0" y="0" width="${OG_W}" height="7" fill="${LIGHT_GOLD}"/>
  <g font-family="Georgia, 'Times New Roman', serif">
    <text x="500" y="232" font-size="56" fill="#ffffff">Funeral cover</text>
    <text x="500" y="294" font-size="56" fill="#ffffff">in Limpopo,</text>
    <text x="500" y="356" font-size="56" font-style="italic" fill="#e2c99c">from R100 a month.</text>
  </g>
  <g font-family="Arial, Helvetica, sans-serif" fill="#ffffff" fill-opacity=".72" font-size="25">
    <text x="500" y="429">One cow. 100kg of maize meal.</text>
    <text x="500" y="465">Firewood. A bakkie for the day.</text>
  </g>
  <rect x="500" y="504" width="64" height="2" fill="${LIGHT_GOLD}"/>
  <text x="500" y="552" font-family="Arial, Helvetica, sans-serif" font-size="21" letter-spacing="3" fill="${LIGHT_GOLD}">AFTER SIX PAID MONTHS</text>
</svg>`;

/*
  The logo goes on the card as the real lockup on cream, and is not recoloured.

  An earlier version painted the NYONI wordmark in light gold so it would read
  against the dark ground. That broke two BRAND.md rules at once — "the logo is
  never recoloured" and "do not introduce the logo's amber as a type colour" —
  and the brand system is explicit that the logo is placed as-is with the
  palette arranged around it, never the other way round. So the panel is cream
  and the mark sits on it untouched, which is also what "always on cream, never
  on a photograph" asks for.
*/
const PANEL_W = 330;
const PANEL_H = 400;
const panelTop = Math.round((OG_H - PANEL_H) / 2);
const panelLeft = 100;

const ogMark = await emblem(OG_MARK - 40);
const ogWord = await wordmark(OG_WORD - 40);
const markD = OG_MARK - 40;

const panel = await sharp({
  create: { width: PANEL_W, height: PANEL_H, channels: 4, background: CREAM },
})
  .composite([
    { input: ogMark, top: 34, left: Math.round((PANEL_W - markD) / 2) },
    {
      input: ogWord,
      top: 34 + markD + 22,
      left: Math.round((PANEL_W - (OG_WORD - 40)) / 2),
    },
  ])
  .png()
  .toBuffer();

await sharp({ create: { width: OG_W, height: OG_H, channels: 4, background: DEEP_BLACK } })
  .composite([
    { input: Buffer.from(card), top: 0, left: 0 },
    { input: panel, top: panelTop, left: panelLeft },
  ])
  .png()
  .toFile("src/app/opengraph-image.png");

console.log(`src/app/opengraph-image.png  ${OG_W}x${OG_H}  (lockup + card)`);
