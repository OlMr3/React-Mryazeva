import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Чтобы не импортировать describe, it, expect в каждый файл
    environment: 'jsdom', // Для тестирования React компонентов
    setupFiles: './src/setupTests.js', // Файл с дополнительной настройкой
  }
})
