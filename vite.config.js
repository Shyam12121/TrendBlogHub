import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/sitemap.xml': {
        target: 'https://trendbloghub.com',
        changeOrigin: true,
      },
      '/robots.txt': {
        target: 'https://trendbloghub.com',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://trendbloghub.com',
        changeOrigin: true,
      },
    },
  },
})