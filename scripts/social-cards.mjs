/** Render share images with the supplied wordmark, local fonts and approved photographs. */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { brand, brandSvg } from "./brand-svg.mjs";
import { pages, guides } from "./site-routes.mjs";
const all = [
  ...pages,
  ...guides.map((g) => ({
    og: g.slug,
    photo: g.image,
    phrase: [g.question],
    name: "Questions worth asking",
  })),
];
await mkdir("public/og", { recursive: true });
const mark = Buffer.from(brandSvg());
const escape = (t) =>
  t.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const text = async (t, size = 52, serif = false, tint = brand.chocolate) =>
  sharp({
    text: {
      text: `<span foreground="${tint}">${escape(t)}</span>`,
      font: serif
        ? `Source Serif 4 Italic ${size}`
        : `Figtree SemiBold ${size}`,
      fontfile: serif
        ? "assets/render-fonts/SourceSerif4-Italic.ttf"
        : "assets/render-fonts/Figtree.ttf",
      width: 500,
      rgba: true,
      spacing: 5,
    },
  })
    .png()
    .toBuffer();
for (const item of all) {
  const photo = await sharp(`public/mission/${item.photo}-1200.webp`)
    .resize(542, 530, { fit: "inside" })
    .toBuffer({ resolveWithObject: true });
  const layers = [
    { input: mark, left: 54, top: 47 },
    { input: await text(item.name.toUpperCase(), 15), left: 56, top: 169 },
    {
      input: photo.data,
      left: 632 + Math.floor((542 - photo.info.width) / 2),
      top: Math.floor((630 - photo.info.height) / 2),
    },
    { input: await text("astoryapp.com", 16), left: 56, top: 566 },
  ];
  let top = 215;
  for (let i = 0; i < item.phrase.length; i++) {
    const buffer = await text(
      item.phrase[i],
      item.phrase.join(" ").length > 85 ? 42 : 53,
      i > 0,
      i > 0 ? brand.terracotta : brand.chocolate,
    );
    const info = await sharp(buffer).metadata();
    if (top + info.height > 530)
      throw new Error(`Social card text exceeds available space: ${item.og}`);
    layers.push({ input: buffer, left: 54, top });
    top += info.height + 17;
  }
  await sharp({
    create: { width: 1200, height: 630, channels: 3, background: brand.ivory },
  })
    .composite(layers)
    .jpeg({ quality: 90 })
    .toFile(`public/og/${item.og}.jpg`);
}
console.log(
  `Rendered ${all.length} page-specific social images with local licensed fonts.`,
);
