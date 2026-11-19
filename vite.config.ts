import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { nitro } from 'nitro/vite'

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    tailwindcss(),
    nitro({
      preset: 'cloudflare_module',
      cloudflare: {
        // Merge ./wrangler.jsonc (name, Browser Rendering binding) into the
        // generated deploy config.
        deployConfig: true,
        nodeCompat: true,
      },
    }),
    tanstackStart(),
    viteReact(),
  ],
})

export default config
