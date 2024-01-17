import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  assetsInclude: ["**/*.tiff"],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
      define: {
        global: 'globalThis'
      },
      supported: {
        bigint: true
      },
    },
  },
  build: {
    target: ["esnext"],
    rollupOptions: {
      input: {
        waterretention: fileURLToPath(new URL('./waterretention.html', import.meta.url)),
        biochar: fileURLToPath(new URL('./biochar.html', import.meta.url)),
        tracermethods: fileURLToPath(new URL('./tracermethods.html', import.meta.url)),
        moisturedrain: fileURLToPath(new URL('./moisturedrain.html', import.meta.url)),
        dataassimilation: fileURLToPath(new URL('./dataassimilation.html', import.meta.url)),
        rapidassessment: fileURLToPath(new URL('./rapidassessment.html', import.meta.url)),
      }
    }
  }
})
