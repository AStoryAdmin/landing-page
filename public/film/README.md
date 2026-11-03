# public/film

The homepage film (`src/pages/site/home/Film.tsx`). Every file here is
**generated** by `scripts/film-encode.mjs` from the demo-video masters;
do not hand-edit or rename them — the page loads them by these exact names.

Two films: a silent ~10 s **loop** that plays inline, muted, while in view,
and the **full film** with sound that opens in the lightbox from "Watch the
film" (the pattern every 2026 YC homepage with video uses; see the demo-video
repo, `brief/research/yc-launch-videos-2026.md` §3).

| file | what |
|---|---|
| `a-story-loop-16x9.mp4` | laptops, inline: 1920x1080, ~10 s, no audio track, H.264 High, CRF 23, ≤5 Mb/s, faststart |
| `a-story-loop-9x16.mp4` | phones (≤640px), inline: 1080x1920, same |
| `a-story-loop-*-poster.jpg` | frame 0 of each loop; shown before play and under reduced motion / data saver |
| `a-story-film-16x9.mp4` | laptops, lightbox: 1920x1080, H.264 High, CRF 23, ≤5 Mb/s, AAC 128k, faststart |
| `a-story-film-9x16.mp4` | phones (≤640px), lightbox: 1080x1920, same |
| `a-story-film-*-poster.jpg` | frame 0 of each full cut |

To drop in a new cut (the filenames stay the same, so nothing in `src/` changes):

```
node scripts/film-encode.mjs ^
  --src16  "C:\Users\nguye\Desktop\a-story-demo-video\out\<film>-16x9-share.mp4" ^
  --src9   "C:\Users\nguye\Desktop\a-story-demo-video\out\<film>-9x16-share.mp4" ^
  --loop16 "C:\Users\nguye\Desktop\a-story-demo-video\out\A-Story-loop-v6.0-16x9.mp4" ^
  --loop9  "C:\Users\nguye\Desktop\a-story-demo-video\out\A-Story-loop-v6.0-9x16.mp4"
```

Either pair may be given on its own. Without a loop master, cut one out of
the full film: add `--loop-start 10.9 --loop-duration 10` and pass the share
files as `--loop16/--loop9`.

Current placeholders (encoded 2026-11-02): film = v5.6 (49 s); loop = v5.6
share files, 10.9–20.9 s, silent. Both are replaced by v6 the same way.
