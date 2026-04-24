/**
 *  WebSite: {
 *    SubTitle
 *  }
 *
 */

const Template = function (o) {
  this.path = o.path
  this.name = o.name
  this.text = o.text
  this.time = o.time
  this.readTime = o.readTime
  this.isCodeArea = o.hasCode
  return this
}

const skill = {
  bar: {
    ...new Template({
      path: 'playground',
      name: '惊呆!',
      text: '12313',
      time: 'Apr 31',
      readTime: '3 min'
    })
  },
  前端开发套路: {
    ...new Template({
      path: 'playground/fe-end/qian-duan-kai-fa',
      name: '前端开发套路',
      text: '前端开发套路',
      time: 'May 03',
      readTime: '15 min'
    })
  },
  Vue2vs3: {
    ...new Template({
      path: 'playground/fe-end/vue2-vs-vue3',
      name: 'vue2 与 vue3 上手感觉',
      text: 'vue2 vue3 上手感觉',
      time: 'May 03',
      readTime: '1 min'
    })
  },
  土发造炮: {
    ...new Template({
      path: 'playground/fe-end/JS-Async',
      name: '土发造炮-异步',
      text: '土发造炮-异步',
      time: 'May 09',
      readTime: '30 min'
    })
  }
}

const life = {
  '内心日记': {
    ...new Template({
      path: 'life/nei-xin-zheng-zha',
      name: '内心日记',
      text: '内心日记',
      time: '26 Apr 24',
      readTime: '5 min'
    })
  },
  上海疫情: {
    ...new Template({
      path: 'life/shang-hai-yi-qing',
      name: '上海疫情😢!',
      text: '上海疫情😢',
      time: '22 Apr 31',
      readTime: '3 min'
    })
  },
  前端之路: {
    ...new Template({
      path: 'life/qian-duan-zhi-lu',
      name: '如何踏上这条前端路!',
      text: '如何踏上这条前端路',
      time: '22 May 03',
      readTime: '未知'
    })
  },
  周日日记: {
    ...new Template({
      path: 'life/zhou-ri-ri-ji',
      name: '周日日记 🤷🏻‍♀️',
      text: '周日日记',
      time: '22 May 08',
      readTime: '10 s'
    })
  },
  新的希望: {
    ...new Template({
      path: 'life/hope',
      name: '新的希望 🎁',
      text: '新的希望🎁',
      time: '22 May 19',
      readTime: '10 s'
    })
  },
  送给老弟: {
    ...new Template({
      path: 'life/ao-li-gei',
      name: '与弟书 📢',
      text: '与弟书 📢',
      time: 'May 19',
      readTime: '未知'
    })
  },
  浪潮: {
    ...new Template({
      path: 'life/how-to-do',
      name: '浪潮 📒',
      text: '浪潮',
      time: '25 oct 28',
      readTime: '10 min'
    })
  },
  tran: {
    ...new Template({
      path: 'life/tran',
      name: 'Tran 🔗',
      text: 'Tran',
      time: '25 Nov 11',
      readTime: '10 min'
    })
  }

}

const draw = {
  'draw-she-qu-xian': {
    ...new Template({
      path: 'test/draw-she-qu-xian',
      name: '弯曲的蛇形曲线',
      time: '24 Dec 5',
      readTime: '5 min'
    })
  },

}

const frontKnowlage = {
  'v3-study': {
    ...new Template({
      path: 'front/vue3-study',
      name: 'vue3 上面的技巧方法',
      time: '25 Nov 11',
      readTime: '5 min'
    })
  },
  'chunk-upload': {
    ...new Template({
      path: 'front/chunk-upload',
      name: '切片上传',
      time: '25 Nov 24',
      readTime: '10 min'
    })
  },
  ku: {
    ...new Template({
      path: 'front/front-lib',
      name: '前端库 📂',
      time: '07 Jan 26',
      readTime: '5 min'
    })
  },
  hotKey: {
    ...new Template({
      path: 'front/hotkey',
      name: '快捷键',
      time: '07 Jan 26',
      readTime: '5 min'
    })
  }
}

const movie = {
  'dong-ji-dao': {
    ...new Template({
      path: 'movie/dong-ji-dao',
      name: '东极岛',
      time: 'Oct 15 2025',
      readTime: '30 s'
    }),
  },
  'xiao-shen-ke': new Template({
    path: 'movie/xiao-shen-ke',
    name: '肖申克的救赎',
    time: 'Oct 23 2025',
    readTime: '30 s'
  }),
  'test': new Template({
    path: 'test/test',
    name: 'ts',
    time: 'Oct 5 2025',
    readTime: '30 s'
  })
}

const classes = {
  'mapbox-one': {
    ...new Template({
      path: 'classes/mapbox/map-box-lesson-one',
      name: '第一章：利用mapbox初始化地图',
      time: '25 Oct 15',
      readTime: '5 min',
      hasCode: true,
    })
  },
  'mapbox-sec': {
    ...new Template({
      path: 'classes/mapbox/create-point',
      name: '第二章：创建点位数据',
      time: '25 Oct 19',
      readTime: '5 min',
      hasCode: true,
    })
  }
}


const data = {
  生活小记: [
    life.前端之路,
    life.上海疫情,
    life.周日日记,
    life.新的希望,
    life.内心日记,
    // life.送给老弟,
  ],
  前端: [
    frontKnowlage["v3-study"],
    frontKnowlage['chunk-upload'],
    frontKnowlage['ku'],
    frontKnowlage['hotKey'],
  ],
  做的一些项目: [
    life.tran,
  ],

  影视: [
    movie['dong-ji-dao'],
    movie['xiao-shen-ke'],
  ],

  // 技能篇
  // 技能篇: [
  //   skill.土发造炮,
  //   skill.Vue2vs3,
  //   skill.前端开发套路,
  //   skill.bar,
  // ],

  // 心灵鸡汤
  心灵鸡汤: [
    life.浪潮,
  ],
  '课程笔记': [
    classes["mapbox-one"],
    classes["mapbox-sec"],
  ],
  // 画页面
  这个页面这么画: [
    draw["draw-she-qu-xian"],
  ],

}


export default data
