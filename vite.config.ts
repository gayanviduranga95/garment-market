import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    allowedHosts: [
      'major-bibliopolistic-unironically.ngrok-free.dev'
    ]
  }
})
