import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import pages from './src/lib/sitePages.json' with { type: 'json' };
import guides from './src/lib/guides.json' with { type: 'json' };
import deployment from './vercel.json' with { type: 'json' };

/** Make local production previews honor the same static routes as hosting. */
function previewStaticRoutes(): Plugin {
    const routes = new Set([
        '/__design/a-story-home-vnext',
        ...pages.map((page) => page.path),
        ...guides.map((guide) => `/guides/${guide.slug}`),
    ]);
    return {
        name: 'a-story-preview-static-routes',
        configurePreviewServer(server) {
            server.middlewares.use((request, response, next) => {
                const url = new URL(request.url ?? '/', 'http://localhost');
                const redirect = deployment.redirects.find(
                    (entry) => entry.source === url.pathname,
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
                if (url.pathname !== '/' && routes.has(url.pathname)) {
                    const file = resolve(
                        server.config.root,
                        server.config.build.outDir,
                        `.${url.pathname}/index.html`,
                    );
                    if (existsSync(file)) {
                        request.url = `${url.pathname}/index.html${url.search}`;
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
