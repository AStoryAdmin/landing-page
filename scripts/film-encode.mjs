/**
 * Encodes the homepage film (home/Film.tsx) from the demo-video masters.
 *
 * The masters are ~18 Mb/s share cuts, far too heavy to autoplay on a web
 * page; this writes the two web versions the page actually loads, plus a
 * poster for each cut (frame 0) so the card has a picture before the video
 * arrives or when autoplay is refused. The filenames are fixed: the page
 * references them by name, so a new cut of the film is dropped in by
 * running this once with the new masters — nothing in src/ changes.
 *
 *   node scripts/film-encode.mjs --src16 <16x9 master.mp4> --src9 <9x16 master.mp4>
 *
 * The page shows a SILENT ~10 s loop inline (the YC homepage pattern, see
 * brief/research/yc-launch-videos-2026.md §3 in the demo-video repo) and
 * opens the full film with sound in a lightbox. The loop has its own masters:
 *
 *   --loop16 <16x9 loop.mp4> --loop9 <9x16 loop.mp4>
 *
 * Until a loop master exists, cut one out of the full film with
 * --loop-start <s> --loop-duration <s> (applied to the loop sources, so pass
 * the share files as --loop16/--loop9); the loop is encoded without audio
 * either way. Any pair may be omitted; only what is given is re-encoded.
 *
 * Optional: --ffmpeg <path to ffmpeg(.exe)> (default: the demo-video repo's
 * tools/ffmpeg.exe beside this repo, or `ffmpeg` on PATH); --out <dir>
 * (default public/film). Two threads so it can run beside a dev server.
 *
 * Output (public/film/):
 *   a-story-film-16x9.mp4          1920x1080  H.264 High, CRF 23, ≤5 Mb/s, AAC 128k, faststart
 *   a-story-film-9x16.mp4          1080x1920  same
 *   a-story-film-16x9-poster.jpg   frame 0, -q:v 3
 *   a-story-film-9x16-poster.jpg   frame 0, -q:v 3
 *   a-story-loop-16x9.mp4          1920x1080  same video settings, no audio track
 *   a-story-loop-9x16.mp4          1080x1920  same
 *   a-story-loop-16x9-poster.jpg   frame 0 of the loop, -q:v 3
 *   a-story-loop-9x16-poster.jpg   frame 0 of the loop, -q:v 3
 */
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

const args = Object.fromEntries(
  process.argv
    .slice(2)
    .map((a, i, all) => (a.startsWith("--") ? [a.slice(2), all[i + 1]] : null))
    .filter(Boolean),
);

const { src16, src9, loop16, loop9 } = args;
const loopStart = args["loop-start"];
const loopDuration = args["loop-duration"];
if ((src16 ? 1 : 0) + (src9 ? 1 : 0) === 1 || (loop16 ? 1 : 0) + (loop9 ? 1 : 0) === 1) {
  console.error("give both cuts of a pair: --src16 with --src9, --loop16 with --loop9");
  process.exit(1);
}
if (!src16 && !loop16) {
  console.error(
    "usage: node scripts/film-encode.mjs [--src16 <16x9.mp4> --src9 <9x16.mp4>] [--loop16 <16x9.mp4> --loop9 <9x16.mp4> [--loop-start <s> --loop-duration <s>]] [--ffmpeg <bin>] [--out <dir>]",
  );
  process.exit(1);
}
for (const f of [src16, src9, loop16, loop9].filter(Boolean)) {
  if (!existsSync(f)) {
    console.error(`source not found: ${f}`);
    process.exit(1);
  }
}

const defaultFfmpeg = path.resolve(root, "..", "a-story-demo-video", "tools", "ffmpeg.exe");
const ffmpeg = args.ffmpeg ?? (existsSync(defaultFfmpeg) ? defaultFfmpeg : "ffmpeg");
const out = path.resolve(root, args.out ?? "public/film");
mkdirSync(out, { recursive: true });

const common = [
  "-y", "-hide_banner", "-loglevel", "error", "-stats",
  "-threads", "2",
];

function run(label, argv) {
  console.log(`\n▸ ${label}`);
  const r = spawnSync(ffmpeg, argv, { stdio: "inherit" });
  if (r.status !== 0) {
    console.error(`ffmpeg failed (${label})`);
    process.exit(r.status ?? 1);
  }
}

/** `trim` = { start, duration } in seconds; `silent` drops the audio track. */
function video(src, name, w, h, { trim, silent = false } = {}) {
  const dest = path.join(out, `${name}.mp4`);
  const cut = trim ? ["-ss", String(trim.start), "-t", String(trim.duration)] : [];
  run(`${name}.mp4 (${w}x${h}${trim ? `, ${trim.start}s +${trim.duration}s` : ""}${silent ? ", silent" : ""})`, [
    ...common,
    ...cut,
    "-i", src,
    "-vf", `scale=${w}:${h}:flags=lanczos,format=yuv420p`,
    "-c:v", "libx264", "-profile:v", "high", "-level", "4.1",
    "-preset", "slow", "-crf", "23",
    "-maxrate", "5M", "-bufsize", "10M",
    "-pix_fmt", "yuv420p",
    ...(silent ? ["-an"] : ["-c:a", "aac", "-b:a", "128k", "-ac", "2"]),
    "-movflags", "+faststart",
    dest,
  ]);
  return dest;
}

function poster(src, name, start) {
  const dest = path.join(out, `${name}-poster.jpg`);
  run(`${name}-poster.jpg`, [
    ...common,
    ...(start ? ["-ss", String(start)] : []),
    "-i", src,
    "-frames:v", "1", "-q:v", "3",
    dest,
  ]);
  return dest;
}

const files = [];
if (src16) {
  files.push(
    video(src16, "a-story-film-16x9", 1920, 1080),
    video(src9, "a-story-film-9x16", 1080, 1920),
    poster(src16, "a-story-film-16x9"),
    poster(src9, "a-story-film-9x16"),
  );
}
if (loop16) {
  const trim =
    loopStart || loopDuration
      ? { start: Number(loopStart ?? 0), duration: Number(loopDuration ?? 10) }
      : undefined;
  files.push(
    video(loop16, "a-story-loop-16x9", 1920, 1080, { trim, silent: true }),
    video(loop9, "a-story-loop-9x16", 1080, 1920, { trim, silent: true }),
    poster(loop16, "a-story-loop-16x9", trim?.start),
    poster(loop9, "a-story-loop-9x16", trim?.start),
  );
}

console.log("\nWritten:");
for (const f of files) {
  const mb = statSync(f).size / 1024 / 1024;
  console.log(`  ${path.relative(root, f)}  ${mb.toFixed(2)} MB`);
}
