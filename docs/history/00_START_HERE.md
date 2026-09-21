# A Story — greenfield rebuild

The complete website has been rebuilt from a blank presentation layer. Open the local preview at http://127.0.0.1:5191 while the preview server is running.

The deliverable is **A-Story-Greenfield-Rebuild.zip**. It contains source, approved image derivatives, the production build, and the new verification evidence. The earlier ZIP files remain untouched as recovery references.

## What changed

The opening now explains the private, living family archive, why photographic context disappears, and the talk → listen → follow-up behavior before the emotional narrative begins. One everyday photograph leads. The rest of the page is a continuous photographic sequence: laughter, conversation, connected details, milestones and ordinary life, different recollections, family participation, an open chronology, present life, and an optional physical volume.

The navigation uses only the approved wordmark paths. The A-shaped symbol is removed from active website logos, favicon and app icons. The website uses the requested brown, terracotta, cream, gold and sand palette; approved book artwork keeps its original colors.

How it works, audience pages, pricing, origin, waitlist, questions, guides, policy presentation, purchase guidance and the missing-page view have new layouts. Product examples retain collection creation, conversation progression, memory editing/reset, family contributions, archive search and chapter browsing. The reader retains its accessible dialog and paging with a subtle transition instead of a 3D flip.

## Run it

Use Node 24 or another version supported by the checked-in Vite version.

- `npm ci`
- `npm run dev`
- `npm run lint`
- `npm run build:static`
- `npm run preview -- --host 127.0.0.1 --port 5191`

`dist` is the production output, including 19 public HTML routes and the private noindex preview. Hosting routes and redirects are in `vercel.json` and `scripts/site-routes.mjs`.

## Where to work

Active marketing presentation: `src/design/a-story-greenfield/`.
Route wiring: `src/App.tsx`.
Business facts: `src/lib/pricing.ts`, `product.ts`, `checkout.ts`.
Lead service and form: `src/lib/leads.ts`, `src/components/ui/LeadForm.tsx`.
Shared family pages: `src/components/publicStory.tsx`, `contribute.tsx`.
Approved image provenance: `src/lib/assetRegistry.json`.

Older design folders are inactive recovery sources. They do not define the new marketing pages and should not be used for future visual edits.

## Evidence and limits

Read `qa/greenfield/verification.md` for the actual check results and `qa/greenfield/DESIGN_STUDIES.md` for the pre-implementation composition studies. Desktop and phone captures are in `qa/greenfield/screenshots/`.

No public deployment was made. Checkout remains deliberately unconfigured and routes to the waitlist with the selected plan. Backend credentials are not included. Demonstrations are fictional and local; service writes during QA were intercepted or handled by a local fixture. Live backend availability is a deployment configuration concern, not claimed by this delivery.
