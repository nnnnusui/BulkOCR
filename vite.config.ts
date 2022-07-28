import {
  resolve,
} from "path";
import {
  defineConfig,
} from "vite";
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    target: 'esnext',
  },
  server: {
    port: 3000,
  },
  plugins: [
    solidPlugin(),
  ],
});
