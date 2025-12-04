import { definePreset, Preset } from 'unocss'

export default definePreset((options) => {
  return {
    debug: true,
    name: 'uno-tran-preset',
    rules: [
      ['w-fit', { width: 'fit-content' }],
      // 文本颜色
      [
        /^text-color-(.+)$/,
        ([, d]) => {
          let code = d
          if (code.includes('16_')) {
            code = '#' + code.split('16_')[1]
          }
          // console.log('匹配', `(${code})`)
          return {
            color: `${code}`,
          }
        },
      ],
      // 子集 margin-right 子集最后一个元素取消marginRight
      [
        /^c-mr-l-(.+)$/,
        function ([, d]) {
          if (d.includes('cancel')) {
            return {
              '& > *': {
                marginRight: `unset`,
              },
            }
          }
        },
      ],
      // 控制子集 margin-right
      [
        /^c-mr-(\d+)$/,
        function ([, d]) {
          console.log('匹配', `(${d})`)
          return {
            '&': {
              'margin-right': `${d}rem`,
            },
          }
        },
      ],
    ],
    variants: [
      // ...
    ],
    // it supports most of the configuration you could have in the root config
  }
})
