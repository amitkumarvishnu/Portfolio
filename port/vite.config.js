import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Using a relative base makes GitHub Pages deployment work for project sites.
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react()],
})
