import { chromium as playwright } from 'playwright-core';
import chromium from '@sparticuz/chromium';

// Helper to parse JSON body from incoming stream (only used for local Connect middleware fallback)
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Method Not Allowed');
    return;
  }

  try {
    // Parse body if it hasn't been parsed (Connect middleware vs Vercel Serverless Function body parser)
    let body = req.body;
    if (typeof body === 'string') {
      body = JSON.parse(body);
    } else if (!body) {
      body = await parseBody(req);
    }

    const { bodyHtml, format, orientation, filename, cssContent } = body;
    
    // Construct the fully styled standalone HTML document
    const fullHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap" rel="stylesheet">
        <style>
          ${cssContent || ''}
          
          /* Standalone print overrides */
          body {
            background: transparent !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .pdf-page-container {
            box-shadow: none !important;
            margin: 0 !important;
            page-break-after: always;
            transform: scale(1) !important;
            margin-bottom: 0 !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        </style>
      </head>
      <body>
        ${bodyHtml || ''}
      </body>
      </html>
    `;

    let options = {};
    if (process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.VERCEL) {
      // Configuration for Vercel/Lambda Serverless Function
      options = {
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      };
    } else {
      // Configuration for Local Dev Server using standard local Chrome
      options = {
        headless: true,
        channel: 'chrome' // searches for local Google Chrome installation
      };
    }

    const browser = await playwright.launch(options);
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.setContent(fullHtml, { waitUntil: 'load' });
    
    // Call Chromium's print-to-PDF engine
    const pdfBuffer = await page.pdf({
      format: format === 'letter' ? 'letter' : 'a4',
      landscape: orientation === 'landscape',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    
    await browser.close();
    
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'habit-tracker'}.pdf"`);
    res.end(pdfBuffer);
  } catch (err) {
    console.error('Error generating PDF with Playwright Core:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: err.message }));
  }
}
