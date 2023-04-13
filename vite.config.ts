import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  build: {
    rollupOptions: {
      input: {
        waterretention: fileURLToPath(new URL('./waterretention.html', import.meta.url)),
        biochar: fileURLToPath(new URL('./biochar.html', import.meta.url)),
        tracermethods: fileURLToPath(new URL('./tracermethods.html', import.meta.url)),
      }
    }
  }
})
