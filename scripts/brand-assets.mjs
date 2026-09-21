/** Generate the custom-A app icons from the authoritative identity geometry. */
import fs from "node:fs/promises";
import sharp from "sharp";
import { brand, brandSvg } from "./brand-svg.mjs";
await fs.writeFile(
  "public/favicon.svg",
  brandSvg({ icon: true, width: 64, height: 64 }),
);
for (const [name, size] of [
  ["apple-touch-icon.png", 180],
  ["icon-192.png", 192],
  ["icon-512.png", 512],
  ["logo.png", 512],
])
  await sharp(Buffer.from(brandSvg({ icon: true, width: size, height: size })))
    .png()
    .toFile("public/" + name);
await sharp("public/og/home.jpg").png().toFile("public/og-cover.png");
await fs.writeFile(
  "public/site.webmanifest",
  JSON.stringify(
    {
      name: "A Story",
      short_name: "A Story",
      description:
        "A private, living family archive built through conversation.",
      start_url: "/",
      display: "standalone",
      background_color: brand.ivory,
      theme_color: brand.chocolate,
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
        {
          src: "/icon-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    null,
    2,
  ) + "\n",
);
console.log("Custom-A icons and manifest generated.");
