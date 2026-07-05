import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'
// @ts-ignore
import handler from './api/generate-pdf.js'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    nitro({
      preset: 'vercel',
    }),
    tanstackStart(),
    viteReact(),
    {
      name: 'api-middleware',
      configureServer(server) {
        server.middlewares.use((req: any, res: any, next: any) => {
          if (req.url === '/api/generate-pdf' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk: any) => {
              body += chunk.toString();
            });
            req.on('end', async () => {
              try {
                req.body = JSON.parse(body);

                // Mock res helper methods typical for Vercel Serverless/Express
                res.status = (code: number) => {
                  res.statusCode = code;
                  return res;
                };
                res.json = (data: any) => {
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                  return res;
                };
                res.send = (data: any) => {
                  res.end(data);
                  return res;
                };

                await handler(req, res);
              } catch (e: any) {
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
  ],
})

export default config
