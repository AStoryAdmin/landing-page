/** The same vector geometry and seven-color identity used by Logo.tsx. */
import { readFileSync } from "node:fs";
const read = (path) =>
  readFileSync(new URL(path, import.meta.url), "utf8").replace(/^\uFEFF/, "");
export const brand = JSON.parse(read("../src/lib/brand.json"));
const geometry = JSON.parse(read("../src/components/ui/logoGeometry.json"));
const paths = read("../src/components/ui/logoPaths.ts");
const path = (name) =>
  paths.match(
    new RegExp(
      "export const " + name + "\\s*=\\s*[\x27\x22\x60]([^\x27\x22\x60]+)",
    ),
  )[1];
export function brandSvg({
  icon = false,
  dark = false,
  width = 184,
  height = 58,
} = {}) {
  const letter = dark ? brand.ivory : brand.teal;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${icon ? "-105 -70 630 630" : geometry.viewBox}">${icon ? `<rect x="-105" y="-70" width="630" height="630" rx="80" fill="${brand.ivory}"/>` : ""}<g transform="${icon ? "" : geometry.markTransform}"><path d="${path("LOGO_LETTER_PATH")}" fill="${letter}" fill-rule="evenodd"/><path d="${path("LOGO_WAVEFORM_PATH")}" fill="${brand.warmGold}"/></g>${icon ? "" : `<g transform="${geometry.storyTransform}"><path d="${path("SIMPLE_NAME_STORY_PATH")}" fill="${dark ? brand.brass : brand.warmGold}" fill-rule="evenodd"/></g>`}</svg>`;
}
