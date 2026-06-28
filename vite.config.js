import { defineConfig } from 'vite';
import handler from './api/pdf.js';

export default defineConfig({
  plugins: [
    {
      name: 'puppeteer-pdf-generator-local',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url.startsWith('/api/pdf') && req.method === 'POST') {
            try {
              await handler(req, res);
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          } else {
            next();
          }
        });
      }
    }
  ]
});
