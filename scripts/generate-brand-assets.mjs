// Regenerates every icon and the Open Graph card from the single source logo.
//
//   node scripts/generate-brand-assets.mjs
//
// Run by hand and committed for reproducibility. Never imported by the app, so
// sharp adds nothing to the bundle — it is already present as a Next
// transitive dependency for image optimisation.
//
// ---------------------------------------------------------------------------
// A defect in the source asset that everything here works around:
//
// public/images/nyoni-logo.png is 1100x1430 with NO alpha channel. Its
// "transparent" background is a checkerboard pattern baked into the pixels —
// someone exported a transparent PNG flattened against the editor's preview
// grid. Flattening or trimming it cannot help, because the checker is real
// image data.
//
// So the emblem is cropped out of the roundel and masked to a circle, which
// discards the checkered area entirely. The artwork is dark navy, so it is
// then placed on cream rather than the brand black — navy on #181714 is
// invisible.
//
// If a clean vector logo ever arrives, replace SOURCE and delete the EMBLEM
// crop; everything else here still works.
// ---------------------------------------------------------------------------
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";

const SOURCE = "public/images/nyoni-logo.png";
const DEEP_BLACK = "#181714";
const CREAM = "#f7f3ea";
const LIGHT_GOLD = "#c5a165";

/** The circular emblem's bounding box within the 1100x1430 source. */
const EMBLEM = { left: 92, top: 116, size: 916 };

await mkdir("public/icons", { recursive: true });

/**
 * The emblem, cropped from the roundel and masked to a circle so no checkered
 * background survives. Returns a PNG buffer with transparency outside the
 * circle, ready to composite onto any ground.
 */
async function emblem(diameter) {
  const mask = Buffer.from(
    `<svg width="${diameter}" height="${diameter}"><circle cx="${diameter / 2}" cy="${diameter / 2}" r="${diameter / 2}" fill="#fff"/></svg>`,
  );
  return sharp(SOURCE)
    .extract({ left: EMBLEM.left, top: EMBLEM.top, width: EMBLEM.size, height: EMBLEM.size })
    .resize(diameter, diameter)
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();
}

/**
 * The emblem full-bleed on an opaque cream square, as a PNG buffer. Cream, not
 * the brand black — the cow and the wordmark are dark navy and would disappear
 * on #181714.
 */
async function emblemOnCream(size) {
  const mark = await emblem(size);
  return sharp({ create: { width: size, height: size, channels: 4, background: CREAM } })
    .composite([{ input: mark, top: 0, left: 0 }])
    .png()
    .toBuffer();
}

async function icon(size, out) {
  await writeFile(out, await emblemOnCream(size));
  console.log(`${out}  ${size}x${size}`);
}

await icon(32, "src/app/icon.png");
await icon(180, "src/app/apple-icon.png");
await icon(192, "public/icons/icon-192.png");
await icon(512, "public/icons/icon-512.png");

/**
 * favicon.ico, built by hand.
 *
 * The file that was here was 25931 bytes — the exact size of the Next.js
 * starter favicon, i.e. the framework's own logo sitting in the browser tab of
 * a funeral-cover site.
 *
 * sharp cannot write .ico, so the container is assembled directly. Every
 * browser in use accepts PNG payloads inside an ICO, which avoids having to
 * encode BMP with its bottom-up rows and AND mask.
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
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width  (0 means 256)
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
  console.log(`${out}  ${sizes.join("px, ")}px`);
}

await favicon("src/app/favicon.ico");

/*
  Open Graph: 1200x630 is the size every platform actually crops to. The old
  tag pointed at the raw 1100x1430 portrait, which WhatsApp and Facebook
  reduced to an unrecognisable strip — and WhatsApp forwarding is how this
  business actually spreads, so this card matters more than the favicon does.

  Every line of wording is already on the site. The waiting period is on the
  card deliberately: a share image that promises a cow without the condition
  attached is exactly the thing this site exists not to do. Cross-check any
  change against src/lib/site-data.ts and TRUST-TODO.md.
*/
const OG_W = 1200;
const OG_H = 630;
const OG_MARK = 360;

const card = `<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${OG_W}" height="${OG_H}" fill="${DEEP_BLACK}"/>
  <rect x="0" y="0" width="${OG_W}" height="7" fill="${LIGHT_GOLD}"/>
  <g font-family="Georgia, 'Times New Roman', serif">
    <text x="540" y="150" font-family="Arial, Helvetica, sans-serif" font-size="24" letter-spacing="7" fill="${LIGHT_GOLD}">NYONI</text>
    <text x="540" y="240" font-size="56" fill="#ffffff">Funeral cover</text>
    <text x="540" y="302" font-size="56" fill="#ffffff">in Limpopo,</text>
    <text x="540" y="364" font-size="56" font-style="italic" fill="#e2c99c">from R100 a month.</text>
  </g>
  <g font-family="Arial, Helvetica, sans-serif" fill="#ffffff" fill-opacity=".72" font-size="25">
    <text x="540" y="437">One cow. 100kg of maize meal.</text>
    <text x="540" y="473">Firewood. A bakkie for the day.</text>
  </g>
  <rect x="540" y="512" width="64" height="2" fill="${LIGHT_GOLD}"/>
  <text x="540" y="560" font-family="Arial, Helvetica, sans-serif" font-size="21" letter-spacing="3" fill="${LIGHT_GOLD}">AFTER SIX PAID MONTHS</text>
</svg>`;

const ogMark = await emblem(OG_MARK);
const ogRing = Buffer.from(
  `<svg width="${OG_MARK + 28}" height="${OG_MARK + 28}" xmlns="http://www.w3.org/2000/svg"><circle cx="${(OG_MARK + 28) / 2}" cy="${(OG_MARK + 28) / 2}" r="${(OG_MARK + 28) / 2}" fill="${CREAM}"/></svg>`,
);

await sharp({ create: { width: OG_W, height: OG_H, channels: 4, background: DEEP_BLACK } })
  .composite([
    { input: Buffer.from(card), top: 0, left: 0 },
    { input: ogRing, top: Math.round((OG_H - (OG_MARK + 28)) / 2), left: 106 },
    { input: ogMark, top: Math.round((OG_H - OG_MARK) / 2), left: 120 },
  ])
  .png()
  .toFile("src/app/opengraph-image.png");

console.log(`src/app/opengraph-image.png  ${OG_W}x${OG_H}`);
