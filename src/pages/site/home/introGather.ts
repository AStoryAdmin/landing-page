/**
 * THE GATHERING — the scene behind the first-visit opening.
 *
 * A brass rule lies across the dark, the years running along it. As the count
 * climbs, photographs rise out of the rule at the year they were taken and
 * hang there: a life, scattered, exactly as a family actually holds it. Then
 * they gather — oldest first — into a single stack at the centre, boards
 * close around them, and the stack *is* the keepsake volume, in the cover the
 * product actually prints (coverbook.pdf: tracked capitals, the date line,
 * the names in italic, the clustered prints, "Family is everything to us").
 *
 * And then one more photograph arrives, after the book is shut, and slips in
 * anyway. That is the whole product in one gesture: the book is not the end.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * TEAL AND BRASS ONLY. The site's chocolate goes muddy against the teal and
 * has no part in this scene.
 *
 * THE COVER ARTWORK IS DRAWN, NOT DOWNLOADED — painted to a canvas here, so
 * the opening costs its photographs and nothing else. The photographs are the
 * illustrative library's archival set, dated the way the rest of the site
 * dates them.
 * ─────────────────────────────────────────────────────────────────────────
 */
import {
  AmbientLight,
  BoxGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  DoubleSide,
  Group,
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Points,
  PointsMaterial,
  Scene,
  SRGBColorSpace,
  BufferGeometry,
  Float32BufferAttribute,
  WebGLRenderer,
} from "three";
import {
  LOGO_LETTER_PATH,
  LOGO_WAVEFORM_PATH,
  SIMPLE_NAME_STORY_PATH,
} from "../../../components/ui/logoPaths";

const TEAL = "#0F4A58";
const BRASS = "#D8AE4D";
const IVORY = "#F3EBDD";
const PAPER = "#FFFDF8";

/**
 * The life, in the order it happened. `lane` lifts a print clear of its
 * neighbours so the rule does not become a single crowded row.
 */
const SHOTS: { id: string; year: number }[] = [
  { id: "02", year: 1956 },
  { id: "07", year: 1972 },
  { id: "13", year: 1988 },
  { id: "12", year: 1996 },
  { id: "30", year: 2005 },
  { id: "27", year: 2016 },
];

const SPAN = 12.2;

/**
 * Where each print waits, and the order they arrive in.
 *
 * The volume is already there, shut, from the first frame — nothing binds and
 * the camera does not move. All that happens is that a life fades up around
 * it, one photograph at a time, beginning at the top left, down the left
 * margin, across and up the right, ending at the top right. Then they go into
 * the book.
 *
 * `layout.flank` is how far out the margins sit; it narrows with the viewport
 * so the pair still fit on a tall window.
 */
/*
 * Where each print waits, in the order it arrives: three down the left, then
 * three down the right, each side zigzagging in and out so the column has a
 * shape instead of being a stack. Three a side rather than four, because four
 * at a readable size will not fit between the motto and the year rule — and
 * they are set close to the volume, since the gap either side of it was the
 * emptiest part of the frame.
 */
const POS = [
  { x: -1.1, y: 2.45 },
  { x: -1.64, y: 1.97 },
  { x: -1.1, y: 1.49 },
  { x: 1.1, y: 2.45 },
  { x: 1.64, y: 1.97 },
  { x: 1.1, y: 1.49 },
];
const layout = { flank: 1, scale: 1 };
/* Small at the margin; smaller still as it goes in. */
const FLANK_SCALE = 0.58;

/* ── Helpers ───────────────────────────────────────────────────────────── */

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (v: number) => {
  const t = clamp01(v);
  return t * t * (3 - 2 * t);
};
/** Slow out of rest, slow into place: the curve a thing carried follows. */
const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const mix = (a: number, b: number, t: number) => a + (b - a) * t;

function loadImage(src: string) {
  return new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/* ── The artwork ───────────────────────────────────────────────────────── */

/** A photograph as a print: paper mat, the image, the year beneath it. */
function printTexture(img: HTMLImageElement | null, year: number) {
  const w = 520;
  const h = 640;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;
  g.fillStyle = PAPER;
  g.fillRect(0, 0, w, h);
  const m = 26;
  const iw = w - m * 2;
  const ih = 470;
  if (img) {
    const s = Math.max(iw / img.width, ih / img.height);
    const dw = img.width * s;
    const dh = img.height * s;
    g.save();
    g.beginPath();
    g.rect(m, m, iw, ih);
    g.clip();
    g.drawImage(img, m + (iw - dw) / 2, m + (ih - dh) / 2, dw, dh);
    g.restore();
  } else {
    g.fillStyle = "#DED3C2";
    g.fillRect(m, m, iw, ih);
  }
  g.strokeStyle = "rgba(42,31,24,0.16)";
  g.lineWidth = 2;
  g.strokeRect(m, m, iw, ih);
  g.fillStyle = "#70503B";
  g.font = "italic 30px 'Source Serif 4', Georgia, serif";
  g.textAlign = "center";
  g.fillText(String(year), w / 2, h - 52);
  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  t.minFilter = LinearFilter;
  return t;
}

/** The A Story lockup, drawn with the real logo paths. */
function drawMark(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  s: number,
) {
  g.save();
  g.translate(x, y);
  g.scale(s, s);
  g.save();
  g.scale(0.5, 0.5);
  g.fillStyle = IVORY;
  g.fill(new Path2D(LOGO_LETTER_PATH), "evenodd");
  g.fillStyle = BRASS;
  g.fill(new Path2D(LOGO_WAVEFORM_PATH), "evenodd");
  g.restore();
  g.translate(-486, -76);
  g.fillStyle = BRASS;
  g.fill(new Path2D(SIMPLE_NAME_STORY_PATH), "evenodd");
  g.restore();
}

/**
 * The cover, as the product prints it (coverbook.pdf). Teal bookcloth, the
 * title in tracked capitals, the date line, the names in italic brass, a
 * clustered stack of prints, and the foot line with the mark.
 */
function coverTexture(stack: (HTMLImageElement | null)[]) {
  const w = 1024;
  const h = 1365;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d")!;

  const cloth = g.createLinearGradient(0, 0, w, h);
  cloth.addColorStop(0, "#14576A");
  cloth.addColorStop(0.55, TEAL);
  cloth.addColorStop(1, "#0A3A46");
  g.fillStyle = cloth;
  g.fillRect(0, 0, w, h);
  /* The weave, at almost no contrast: cloth, not flat paint. */
  for (let x = 0; x < w; x += 3) {
    g.fillStyle = "rgba(255,255,255,0.028)";
    g.fillRect(x, 0, 1, h);
  }
  for (let y = 0; y < h; y += 3) {
    g.fillStyle = "rgba(0,0,0,0.035)";
    g.fillRect(0, y, w, 1);
  }
  /* The turn-in shadow along the hinge. */
  const hinge = g.createLinearGradient(0, 0, w * 0.09, 0);
  hinge.addColorStop(0, "rgba(0,0,0,0.42)");
  hinge.addColorStop(1, "transparent");
  g.fillStyle = hinge;
  g.fillRect(0, 0, w * 0.09, h);

  const L = 96;
  g.textAlign = "left";
  g.fillStyle = IVORY;
  g.font = "600 62px 'Figtree', system-ui, sans-serif";
  const title = "MOMENTS & MEMORIES";
  let tx = L;
  for (const ch of title) {
    g.fillText(ch, tx, 186);
    tx += g.measureText(ch).width + 4.2;
  }
  g.fillStyle = "rgba(243,235,221,0.68)";
  g.font = "500 22px 'Figtree', system-ui, sans-serif";
  let dx = L;
  for (const ch of "1952 — STILL BEING WRITTEN") {
    g.fillText(ch, dx, 232);
    dx += g.measureText(ch).width + 4.4;
  }
  g.fillStyle = BRASS;
  g.font = "italic 400 72px 'Source Serif 4', Georgia, serif";
  g.fillText("The Hartleys", L, 344);

  /* The clustered prints, as on the printed cover. */
  const put = (
    img: HTMLImageElement | null,
    x: number,
    y: number,
    pw: number,
    rot: number,
  ) => {
    const ph = pw * 1.16;
    g.save();
    g.translate(x + pw / 2, y + ph / 2);
    g.rotate((rot * Math.PI) / 180);
    g.translate(-pw / 2, -ph / 2);
    g.shadowColor = "rgba(0,0,0,0.5)";
    g.shadowBlur = 26;
    g.shadowOffsetY = 10;
    g.fillStyle = PAPER;
    g.fillRect(0, 0, pw, ph);
    g.shadowColor = "transparent";
    const m = pw * 0.05;
    const iw = pw - m * 2;
    const ih = ph - m * 3.1;
    if (img) {
      const s = Math.max(iw / img.width, ih / img.height);
      g.save();
      g.beginPath();
      g.rect(m, m, iw, ih);
      g.clip();
      g.drawImage(
        img,
        m + (iw - img.width * s) / 2,
        m + (ih - img.height * s) / 2,
        img.width * s,
        img.height * s,
      );
      g.restore();
    } else {
      g.fillStyle = "#DED3C2";
      g.fillRect(m, m, iw, ih);
    }
    g.restore();
  };
  put(stack[0], 300, 470, 380, -5.5);
  put(stack[1], 120, 610, 330, 4);
  put(stack[2], 430, 760, 400, -2.5);

  /* The foot: the family's line on the left, the mark on the right. */
  g.fillStyle = "rgba(243,235,221,0.35)";
  g.fillRect(L, h - 214, w - L * 2, 1);
  g.fillStyle = IVORY;
  g.font = "italic 400 40px 'Source Serif 4', Georgia, serif";
  g.fillText("Family is everything to us.", L, h - 150);
  drawMark(g, w - 300, h - 178, 0.34);

  const t = new CanvasTexture(c);
  t.colorSpace = SRGBColorSpace;
  t.minFilter = LinearFilter;
  return t;
}

/* ── The scene ─────────────────────────────────────────────────────────── */

export type Gather = {
  /** Driven by the intro timeline; every value is 0–1. */
  state: {
    reveal: number;
    gather: number;
    bind: number;
    lift: number;
    dust: number;
  };
  resize: () => void;
  dispose: () => void;
};

const CARD_W = 0.92;
const CARD_H = 1.13;
/** Where the volume stands once it is bound. */
const BOOK_Y = 1.36;

export function createGather(canvas: HTMLCanvasElement): Gather | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
  } catch {
    return null; /* No WebGL: the caller keeps its flat fallback. */
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;

  const scene = new Scene();
  const camera = new PerspectiveCamera(40, 1, 0.1, 100);

  scene.add(new AmbientLight(new Color("#86AEB9"), 2.1));
  /* One warm key from the upper left, as everywhere else on the site. */
  const key = new DirectionalLight(new Color("#FFEFD2"), 3.4);
  key.position.set(-2.8, 3.8, 5.2);
  scene.add(key);
  /* A cool rim so the volume separates from the dark behind it. */
  const rim = new DirectionalLight(new Color("#9FE2F2"), 1.15);
  rim.position.set(3.6, 1.2, -3.0);
  scene.add(rim);
  /* A low fill, so the cloth under the foot edge is not a silhouette. */
  const fillLight = new DirectionalLight(new Color("#BFE6EE"), 0.5);
  fillLight.position.set(0.4, -2.2, 2.4);
  scene.add(fillLight);

  /* ── The rule the years run along ── */
  const railGeo = new PlaneGeometry(SPAN + 1.4, 0.016);
  const rail = new Mesh(
    railGeo,
    new MeshBasicMaterial({
      color: new Color(BRASS),
      transparent: true,
      opacity: 0.3,
    }),
  );
  scene.add(rail);
  const fill = new Mesh(
    railGeo,
    new MeshBasicMaterial({ color: new Color(BRASS), transparent: true }),
  );
  fill.scale.x = 0;
  scene.add(fill);
  const bead = new Mesh(
    new PlaneGeometry(0.09, 0.09),
    new MeshBasicMaterial({ color: new Color(IVORY), transparent: true }),
  );
  bead.rotation.z = Math.PI / 4;
  scene.add(bead);

  /* ── The prints ── */
  const cardGeo = new PlaneGeometry(CARD_W, CARD_H);
  type Card = {
    mesh: Mesh;
    mat: MeshStandardMaterial;
    order: number;
    spawn: { x: number; y: number; z: number; rot: number };
    slot: { x: number; y: number; z: number; rot: number };
    u: number;
  };
  const cards: Card[] = [];
  SHOTS.forEach((shot, i) => {
    const mat = new MeshStandardMaterial({
      transparent: true,
      opacity: 0,
      roughness: 0.92,
      metalness: 0,
      side: DoubleSide,
    });
    const mesh = new Mesh(cardGeo, mat);
    mesh.visible = false;
    scene.add(mesh);
    cards.push({
      mesh,
      mat,
      spawn: {
        x: POS[i].x,
        y: POS[i].y,
        z: 0.45 + (((i * 37) % 11) / 11 - 0.5) * 0.22,
        rot: (((i * 53) % 13) / 13 - 0.5) * 0.14,
      },
      /* Where it goes: into the shut volume, at its face. */
      slot: {
        x: (((i * 29) % 7) / 7 - 0.5) * 0.05,
        y: BOOK_Y + (((i * 19) % 5) / 5 - 0.5) * 0.12,
        z: 0.1 + (i - SHOTS.length / 2) * 0.004,
        rot: (((i * 17) % 9) / 9 - 0.5) * 0.06,
      },
      order: i,
      u: i / (SHOTS.length - 1),
    });
    void loadImage(`/mission/${shot.id}-640.webp`).then((img) => {
      mat.map = printTexture(img, shot.year);
      mat.needsUpdate = true;
    });
  });

  /* ── The volume the prints become ── */
  const book = new Group();
  book.position.set(0, BOOK_Y, 0);
  book.visible = false;
  scene.add(book);

  const D = 0.135; /* the thickness of the block */
  const boardMat = new MeshStandardMaterial({
    color: new Color("#0C3F4C"),
    roughness: 0.78,
    metalness: 0.05,
  });
  const back = new Mesh(
    new BoxGeometry(CARD_W + 0.05, CARD_H + 0.05, 0.022),
    boardMat,
  );
  back.position.z = -D / 2;
  book.add(back);
  const pages = new Mesh(
    new BoxGeometry(CARD_W + 0.008, CARD_H + 0.006, D - 0.02),
    new MeshStandardMaterial({ color: new Color("#E9DECC"), roughness: 0.95 }),
  );
  book.add(pages);
  const spine = new Mesh(
    new BoxGeometry(D + 0.04, CARD_H + 0.05, 0.024),
    boardMat,
  );
  spine.rotation.y = Math.PI / 2;
  spine.position.x = -(CARD_W + 0.05) / 2;
  book.add(spine);

  const coverMat = new MeshStandardMaterial({
    roughness: 0.62,
    metalness: 0.12,
  });
  const hinge = new Group();
  hinge.position.set(-(CARD_W + 0.05) / 2, 0, D / 2);
  book.add(hinge);
  const front = new Mesh(
    new BoxGeometry(CARD_W + 0.05, CARD_H + 0.05, 0.022),
    coverMat,
  );
  front.position.x = (CARD_W + 0.05) / 2;
  hinge.add(front);
  void Promise.all(
    ["01", "H02", "H04"].map((id) => loadImage(`/mission/${id}-640.webp`)),
  ).then((imgs) => {
    coverMat.map = coverTexture(imgs);
    coverMat.needsUpdate = true;
  });

  /* Dust in the light, so the air has something in it. */
  const N = 700;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 16;
    pos[i * 3 + 1] = Math.random() * 4.2;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 7;
  }
  const dustGeo = new BufferGeometry();
  dustGeo.setAttribute("position", new Float32BufferAttribute(pos, 3));
  const dustMat = new PointsMaterial({
    color: new Color(BRASS),
    size: 0.016,
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const dust = new Points(dustGeo, dustMat);
  scene.add(dust);

  /*
   * `bind` and `lift` are no longer animated: the volume is already bound and
   * already settled when the opening starts. They stay as constants so the
   * geometry below still reads in one place.
   */
  const state = { reveal: 0, gather: 0, bind: 1, lift: 1, dust: 0 };

  /*
   * How far back to stand. A single `fov < 1 ? 58 : 40` left the bound volume
   * overflowing the screen on a tall window, because the limit there is the
   * height, not the field of view. The columns pull in and the camera pulls
   * back together as the viewport narrows, so the whole scene always fits.
   */
  let fit = 1;
  const resize = () => {
    const w = canvas.clientWidth || innerWidth;
    const h = canvas.clientHeight || innerHeight;
    renderer.setSize(w, h, false);
    const a = w / h;
    camera.aspect = a;
    camera.fov = a >= 1.7 ? 40 : a >= 1.25 ? 46 : a >= 0.95 ? 52 : 58;
    camera.updateProjectionMatrix();
    fit = a >= 1.7 ? 1 : a >= 1.25 ? 1.1 : a >= 0.95 ? 1.24 : 1.46;
    /* The clusters draw in as the viewport narrows. */
    layout.flank = a >= 1.7 ? 1 : a >= 1.25 ? 0.93 : a >= 0.95 ? 0.84 : 0.74;
    layout.scale = a >= 1.25 ? 1 : a >= 0.95 ? 0.9 : 0.8;
  };
  resize();

  let raf = 0;
  const tick = () => {
    raf = requestAnimationFrame(tick);
    const { reveal, gather, bind, lift } = state;
    const l = easeInOut(clamp01(lift));
    const gg = easeInOut(clamp01(gather));

    /* The rule fills as the years pass, with the bead riding its head. */
    fill.scale.x = reveal;
    fill.position.x = -((SPAN + 1.4) / 2) * (1 - reveal);
    bead.position.set(-(SPAN + 1.4) / 2 + (SPAN + 1.4) * reveal, 0, 0.01);
    const railFade = 1 - smooth((lift - 0.35) / 0.5);
    (rail.material as MeshBasicMaterial).opacity = 0.3 * railFade;
    (fill.material as MeshBasicMaterial).opacity = railFade;
    (bead.material as MeshBasicMaterial).opacity =
      railFade * (1 - smooth(gather));

    cards.forEach((c) => {
      /*
       * One at a time, and slowly. Each print holds a quarter of the reveal
       * to itself, so it fades up over roughly half a second rather than
       * snapping in — and it does not move again until the merge.
       */
      const FADE = 0.26;
      const step = (1 - FADE) / Math.max(1, cards.length - 1);
      const up = smooth((reveal - c.order * step) / FADE);
      /* At the end every one of them goes into the book, oldest first. */
      const g = easeInOut(clamp01((gather - c.order * 0.06) / 0.72));
      if (up <= 0.001) {
        c.mesh.visible = false;
        return;
      }
      c.mesh.visible = true;
      c.mesh.scale.setScalar(
        mix(FLANK_SCALE, FLANK_SCALE * 0.42, g) * layout.scale,
      );
      c.mesh.position.set(
        mix(c.spawn.x * layout.flank, c.slot.x, g),
        mix(c.spawn.y, c.slot.y, g),
        mix(c.spawn.z, c.slot.z, g),
      );
      c.mesh.rotation.set(0, 0, mix(c.spawn.rot, c.slot.rot, g));
      /* It fades out as it reaches the cover, rather than landing on it. */
      c.mat.opacity = up * (1 - smooth((g - 0.62) / 0.38));
    });

    /* The boards arrive around the block and the cover closes over it. */
    book.visible = bind > 0.001;
    if (book.visible) {
      const b = easeInOut(clamp01(bind));
      book.scale.setScalar(mix(0.94, 1, b));
      /*
       * Flat-on, a book is a rectangle. It turns as it closes, not only once
       * it has settled, so the block is never presented square to the camera.
       */
      book.rotation.y = -0.38 * Math.max(l, b * 0.6);
      book.rotation.x = 0.07 * Math.max(l, b * 0.5);
      /*
       * Open at -74°, shut at 0. It used to start at -142°, which swings the
       * board out past edge-on and leaves the page block facing the camera
       * for most of the movement — a blank cream card, mid-bind. Three
       * quarters open still reads as a cover coming down on the stack.
       */
      hinge.rotation.y = ((-74 * Math.PI) / 180) * (1 - b);
      boardMat.opacity = 1;
      const fade = smooth(bind / 0.4);
      [boardMat, coverMat].forEach((m) => {
        m.transparent = fade < 1;
        m.opacity = fade;
      });
    }

    dustMat.opacity = state.dust * 0.5;
    dust.rotation.y += 0.0003;

    /*
     * The camera starts far enough back to hold the whole life, comes in as
     * it gathers, and settles three-quarters on the bound volume.
     */
    camera.position.set(
      mix(mix(0, 0.12, gg), 0.66, l),
      mix(mix(1.5, 1.44, gg), 1.5, l),
      mix(mix(6.2 * fit, 4.4 * fit, gg), 3.45 * fit, l),
    );
    /* At rest the volume sits low in frame, with clear sky for the name. */
    camera.lookAt(0, mix(mix(1.35, BOOK_Y, gg), BOOK_Y + 0.44, l), 0);
    renderer.render(scene, camera);
  };
  tick();

  addEventListener("resize", resize);

  return {
    state,
    resize,
    dispose() {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      scene.traverse((o) => {
        const m = o as Mesh;
        if (m.geometry) m.geometry.dispose();
        const mat = m.material as MeshStandardMaterial | undefined;
        if (mat) {
          mat.map?.dispose();
          mat.dispose();
        }
      });
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
    },
  };
}
