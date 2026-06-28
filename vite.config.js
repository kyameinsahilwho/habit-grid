import { defineConfig } from 'vite';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper to parse JSON body from incoming stream
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

// Request handler shared between Dev & Preview servers
async function handlePdfRequest(req, res) {
  try {
    const { bodyHtml, format, orientation, filename } = await parseBody(req);
    
    // Read style.css contents to inline them
    const styleCssPath = path.resolve(__dirname, 'src/style.css');
    const cssContent = fs.readFileSync(styleCssPath, 'utf-8');
    
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
          ${cssContent}
          
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
        ${bodyHtml}
      </body>
      </html>
    `;

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });
    
    // Call Chromium's print-to-PDF engine
    const pdfBuffer = await page.pdf({
      format: format === 'letter' ? 'letter' : 'A4',
      landscape: orientation === 'landscape',
      printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    
    await browser.close();
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename || 'habit-tracker'}.pdf"`);
    res.end(pdfBuffer);
  } catch (err) {
    console.error('Error generating PDF with Puppeteer:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: err.message }));
  }
}

export default defineConfig({
  plugins: [
    {
      name: 'puppeteer-pdf-generator',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url.startsWith('/api/pdf') && req.method === 'POST') {
            await handlePdfRequest(req, res);
          } else {
            next();
          }
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url.startsWith('/api/pdf') && req.method === 'POST') {
            await handlePdfRequest(req, res);
          } else {
            next();
          }
        });
      }
    }
  ]
});
