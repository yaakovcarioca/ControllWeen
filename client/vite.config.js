import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@babel/runtime'],
    },
  },

  // Configuração para lidar com as rotas no modo SPA
  optimizeDeps: {},
  base: '/',
});
