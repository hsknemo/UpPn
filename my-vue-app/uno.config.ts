import {  defineConfig, presetAttributify, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify({ /* preset options */}),
    // ...custom presets
  ],
  transformers: [
    transformerDirectives(),
    // ...custom transformers
  ],
})
