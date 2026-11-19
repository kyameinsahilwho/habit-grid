import { createFileRoute } from '@tanstack/react-router';

// On Cloudflare the PDF is rendered by Browser Rendering (the BROWSER binding
// in wrangler.jsonc). In local development it uses the installed Chrome or Edge.
async function launchBrowser() {
  if (process.env.NODE_ENV === 'development') {
    // Kept out of the Worker bundle: playwright-core only runs under Node.
    const playwrightCore = 'playwright-core';
    const { chromium: playwright } = await import(/* @vite-ignore */ playwrightCore);
    for (const channel of ['chrome', 'msedge', undefined]) {
      try {
        return await playwright.launch({ headless: true, channel });
      } catch (err) {
        console.warn(`Failed to launch ${channel ?? 'default'} browser`, err);
      }
    }
    throw new Error('No local browser available to render the PDF.');
  }
  // Nitro's Cloudflare runtime exposes the Worker bindings on globalThis.__env__.
  const env = (globalThis as { __env__?: { BROWSER?: unknown } }).__env__;
  if (!env?.BROWSER) throw new Error('Browser Rendering binding (BROWSER) is not configured.');
  const { launch } = await import('@cloudflare/playwright');
  return launch(env.BROWSER as Parameters<typeof launch>[0]);
}

export const Route = createFileRoute('/api/generate-pdf')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { html, css, pageSize = 'A4', orientation = 'portrait', baseUrl } = body;

          if (!html) {
            return new Response(JSON.stringify({ error: 'HTML is required' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            });
          }

          const browser = await launchBrowser();
          const context = await browser.newContext();
          const page = await context.newPage();

          const fullHtml = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                ${baseUrl ? `<base href="${baseUrl}">` : ''}
                <style>${css || ''}</style>
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Abril+Fatface&display=swap" rel="stylesheet">
              </head>
              <body>
                ${html}
              </body>
            </html>
          `;

          await page.setContent(fullHtml, { waitUntil: 'networkidle' });

          const pdf = await page.pdf({
            format: pageSize,
            landscape: orientation === 'landscape',
            printBackground: true,
            preferCSSPageSize: true,
            margin: {
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            },
          });

          await browser.close();

          return new Response(pdf, {
            status: 200,
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': 'attachment; filename=habit-grid.pdf',
            },
          });
        } catch (error: any) {
          console.error('PDF Generation Error:', error);
          return new Response(JSON.stringify({ error: 'Failed to generate PDF', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }
      },
    },
  },
});
