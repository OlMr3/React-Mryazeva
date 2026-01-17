import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/React-Mryazeva/Project/', 
  plugins: [react(),
     visualizer({ filename: './dist/stats.html', open: false, gzipSize: true, brotliSize: true }),
  ],
 
  server: { host: true, port: 5173 },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  }
})
