import { createFileRoute } from '@tanstack/react-router';
import chromium from '@sparticuz/chromium';
import { chromium as playwright } from 'playwright-core';

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

          let browser = null;
          const isLocal = process.env.NODE_ENV === 'development' || process.platform !== 'linux';

          if (isLocal) {
            try {
              browser = await playwright.launch({
                headless: true,
                channel: 'chrome',
              });
            } catch (err) {
              console.warn('Failed to launch Google Chrome, trying Microsoft Edge...', err);
              try {
                browser = await playwright.launch({
                  headless: true,
                  channel: 'msedge',
                });
              } catch (err2) {
                console.warn('Failed to launch Microsoft Edge, trying default launch...', err2);
                browser = await playwright.launch({
                  headless: true,
                });
              }
            }
          } else {
            try {
              const execPath = await chromium.executablePath();
              browser = await playwright.launch({
                args: chromium.args,
                executablePath: execPath,
                headless: chromium.headless,
              });
            } catch (err) {
              console.warn('Failed to launch @sparticuz/chromium, falling back to standard playwright launch...', err);
              browser = await playwright.launch({
                headless: true,
              });
            }
          }

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
