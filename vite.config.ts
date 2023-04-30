import { defineConfig } from 'vite'
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';
import react from '@vitejs/plugin-react'
import path from 'path';

const vitestConfig: VitestUserConfigInterface = {
  test: {
    environment: 'jsdom',
    globals:true,
    setupFiles: ['./tests/setup.js']
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: vitestConfig.test,
  resolve:{
    alias: [{find:"@", replacement: path.resolve(__dirname,"src")}]
  }
})
