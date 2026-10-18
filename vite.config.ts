import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import deployment from './vercel.json' with { type: 'json' };

/**
 * Make local production previews (`npm run preview`) serve the build the way
 * CloudFront does with deploy/cloudfront-viewer-request.js attached: an old
 * address redirects, and /pricing or /pricing/ is answered by
 * dist/pricing/index.html. Anything else falls through to Vite's own SPA
 * fallback. The doors into the web app (/join/CODE, /sign-in, …) are left to
 * the inline script in index.html, the no-AWS path, so a preview tests that.
 */
function previewStaticRoutes(): Plugin {
    return {
        name: 'a-story-preview-static-routes',
        configurePreviewServer(server) {
            server.middlewares.use((request, response, next) => {
                const url = new URL(request.url ?? '/', 'http://localhost');
                const bare = url.pathname.replace(/\/+$/, '') || '/';
                const redirect = deployment.redirects.find(
                    (entry) => entry.source === bare,
                );
                if (redirect) {
                    const [path, anchor] = redirect.destination.split('#');
                    response.writeHead(301, {
                        Location:
                            path + url.search + (anchor ? `#${anchor}` : ''),
                    });
                    response.end();
                    return;
                }
                if (bare !== '/' && !bare.split('/').pop()!.includes('.')) {
                    const file = resolve(
                        server.config.root,
                        server.config.build.outDir,
                        `.${bare}/index.html`,
                    );
                    if (existsSync(file)) {
                        request.url = `${bare}/index.html${url.search}`;
                    }
                }
                next();
            });
        },
    };
}

export default defineConfig({
    plugins: [react(), previewStaticRoutes()],
});
