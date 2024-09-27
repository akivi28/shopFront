import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  return{
    plugins: [react()],
    server: {
      proxy: mode === 'development' ? {
        '/api': {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      } : undefined
    },
    define: {
      'process.env.API_URL': JSON.stringify(process.env.VITE_API_URL)
    }
  }
})
