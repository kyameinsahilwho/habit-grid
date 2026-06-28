import chromium from '@sparticuz/chromium';
import { chromium as playwright } from 'playwright-core';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { html, css, pageSize = 'A4', orientation = 'portrait', baseUrl } = req.body;

  if (!html) {
    return res.status(400).json({ error: 'HTML is required' });
  }

  let browser = null;

  try {
    const isLocal = process.env.NODE_ENV === 'development' || !process.env.AWS_EXECUTION_ENV;

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
      browser = await playwright.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
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

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=habit-grid.pdf');
    return res.send(pdf);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    return res.status(500).json({ error: 'Failed to generate PDF', details: error.message });
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
}
