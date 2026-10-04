/**
 * CloudFront Function (runtime: cloudfront-js-2.0), event: viewer request.
 *
 * Why it exists: astoryapp.com is served from S3 through CloudFront, and S3
 * only finds a file by its exact name. `npm run build:static` writes every
 * page as dist/<route>/index.html (dist/pricing/index.html, …), but a visitor
 * asks for /pricing or /pricing/. Without this, S3 answers 404, CloudFront's
 * error page hands back the app shell, and the page draws in a browser while
 * Google, link previews and Apple's privacy-policy check see "404 Not Found"
 * — which is what the live site did until 2026-10-03.
 *
 *   /pricing/        → /pricing/index.html
 *   /pricing         → /pricing/index.html
 *   /terms.html      → unchanged (a real file)
 *   /assets/app.js   → unchanged
 *
 * Install once: CloudFront → Functions → Create function → paste this →
 * Publish → Associate with the distribution's default behavior, event type
 * "Viewer request". See docs/PUBLISHING.md.
 */
function handler(event) {
    var request = event.request;
    var uri = request.uri;
    if (uri.endsWith('/')) {
        request.uri = uri + 'index.html';
    } else if (!uri.split('/').pop().includes('.')) {
        request.uri = uri + '/index.html';
    }
    return request;
}
