import { defineConfig } from 'vite';
import handler from './api/generate-pdf.js';

export default defineConfig({
  plugins: [
    {
      name: 'api-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/generate-pdf' && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk.toString();
            });
            req.on('end', async () => {
              try {
                req.body = JSON.parse(body);

                // Mock res helper methods typical for Vercel Serverless/Express
                res.status = (code) => {
                  res.statusCode = code;
                  return res;
                };
                res.json = (data) => {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                  return res;
                };
                res.send = (data) => {
                  res.end(data);
                  return res;
                };

                await handler(req, res);
              } catch (e) {
                console.error('Vite Middleware Error:', e);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: e.message }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ]
});
