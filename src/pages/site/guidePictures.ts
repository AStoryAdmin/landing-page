/**
 * Which photograph stands for each conversation guide, shared by the guide
 * page (Guide.tsx) and the index's contents list (Guides.tsx), so the row a
 * reader clicks shows the picture the guide opens on.
 *
 * One photograph, one page (jury 1 #7): Home keeps the lake (30) and the
 * lunchbox (21), and Care keeps the photo-sorting scene (23), so those
 * guides take a library print of their own. Every other guide shows its own
 * `image` from guides.json.
 */
import guides from "../../lib/guides.json";

type Guide = (typeof guides)[number];

const OWN_PRINT: Record<string, { id: string; alt: string }> = {
  "unlabeled-family-photographs": {
    id: "03",
    alt: "A faded family snapshot, around 1973: a car being unloaded at a new house",
  },
  "different-versions": {
    id: "H03",
    alt: "Friends on a lake shore at dusk, one pointing out across the water",
  },
  "ordinary-life-questions": {
    id: "35",
    alt: "An ordinary weekday: someone carrying laundry through the house",
  },
};

export const guidePicture = (g: Guide) => OWN_PRINT[g.slug] ?? { id: g.image, alt: g.alt };
