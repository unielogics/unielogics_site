import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev-only proxies so browser requests stay same-origin (no CORS preflight).
// Production builds are unaffected — these only run under `vite dev` / `vite preview`.
// The frontend points at these proxy paths via .env.development (VITE_UNIESALES_INTAKE_URL,
// VITE_CORTEX_INTAKE_URL); production uses the absolute api.* URLs as defaults.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      // UnieSales public intake — /api/uniesales-intake/public/intake/unielogics
      //   → https://api.uniesales.com/public/intake/unielogics
      '/api/uniesales-intake': {
        target: 'https://api.uniesales.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/uniesales-intake/, ''),
      },
      // Cortex public intake — /api/uniecortex-intake/v1/public/intake
      //   → https://api.uniecortex.com/v1/public/intake
      '/api/uniecortex-intake': {
        target: 'https://api.uniecortex.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api\/uniecortex-intake/, ''),
      },
    },
  },
})
