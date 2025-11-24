import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
const mdPlugin = require('vite-plugin-markdown')
import path from 'path'

export default defineConfig({
  base: '/',
  server: {
    host: 'localhost',
    cors: true,
    open: true,
    hmr: true,
  },
  plugins: [
    vue(),
    AutoImport({ /* options */
      imports: ["vue", "vue-router"]
    }),
    mdPlugin.plugin({
      mode: ['html']
    }),
  ],
  resolve: {
    alias: {
      // 键必须以斜线开始和结束
      "@": path.resolve(__dirname, "src"),
      "p": path.resolve(__dirname, "src/pages"),
      "api": path.resolve(__dirname, "src/api"),
    }
  },
  build:{
    outDir: 'Self',//Specify the output directory (relative to project root).
  }
})
