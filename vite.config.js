import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
const mdPlugin = require('vite-plugin-markdown')
import path from 'path'
import UnoCSS from 'unocss/vite'
import postcssPresetEnv from "postcss-preset-env"
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({ /* options */
      imports: ["vue", "vue-router"]
    }),
    mdPlugin.plugin({
      mode: ['html'],
    }),
    Icons({
      compiler: 'vue3',// 指定编译器
      autoInstall: true,// 自动安装
    }),
  ],
  css: {
    postcss: {
      plugins:[postcssPresetEnv()]
    }
  },
  resolve: {
    alias: {
      // 键必须以斜线开始和结束
      "@": path.resolve(__dirname, "src"),
      "p": path.resolve(__dirname, "src/pages"),
      "api": path.resolve(__dirname, "src/api"),
    }
  },
  server:{
    host:'0.0.0.0'
  },
  build:{
    outDir: 'Self',//Specify the output directory (relative to project root).
  }
})
