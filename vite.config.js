import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
  plugins: [vue()],
  base: './',
  server: { watch: { ignored: ['**/public/python/**'] } },
  test: { include: ['tests/unit/**/*.test.js'] }
});
