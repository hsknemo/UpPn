import AdsIcon from './iconComponent/Ads.vue'
import Copy from './iconComponent/Copy.vue'
import Spider from './iconComponent/Spider.vue'
import Player from './iconComponent/Player.vue'
import PainStr from './iconComponent/PainStr.vue'
import Blog from './iconComponent/Blog.vue'
import Terminal from './iconComponent/Terminal.vue'
import mapbox from "@/model/PROJECT/iconComponent/Mapbox.vue";
import Tone from "@/model/PROJECT/iconComponent/Tone.vue";
import Tran from '@/model/PROJECT/iconComponent/Tran.vue'
const Projects = reactive({
  pro: [
    {
      capName: '团队工具',
      capList: [
        {
          icon: Tran,
          name: 'VTran',
          desc: '由于内网开发，不让使用聊天及文件发送工具，索性就自己写了一个',
          url: 'https://trandoc.netlify.app/'
        },
      ]
    },
    {
      capName: 'Chrome 插件',
      capList: [
        {
          icon: AdsIcon,
          name: 'Chrome-Ads',
          desc: '一个百度搜索过滤广告插件',
          url: 'https://github.com/hsknemo/chrome-ads'
        },
        {
          icon: Copy,
          name: 'Dscn-Web-Copy',
          desc: 'csdn 网无登录拷贝内容',
          url: 'https://github.com/hsknemo/DSCN-COPY-CODE'
        }
      ]
    },
    {
      capName: 'Node',
      capList: [
        {
          icon: Spider,
          name: '房产信息',
          desc: '用 Node.js 实现 爬取 five eight 房产信息',
          url: 'https://github.com/hsknemo/58-Node-'
        },
        {
          icon: Tone,
          name: 'ToneBox',
          desc: '快速生成Express MVC 脚手架工具',
          url: 'https://www.npmjs.com/package/tone-box-express'
        },
      ]
    },
    {
      capName: 'Page',
      capList: [
        {
          icon: Player,
          name: 'Musicer',
          desc: '纯 ECMAScript 实现的音乐播放器',
          // url: 'https://github.com/hsknemo/music_player'
          url: 'https://music-player-steel-ten.vercel.app/'
        },
        {
          icon: Terminal,
          name: 'Terminal',
          desc: '一个非常 COOL の 终端',
          url: '/#/terminal'
        },
        {
          icon: PainStr,
          name: 'PainStr',
          desc: '封装的动态插入 CSS 样式, 通过循环插入样式, 慢慢插入 CSS 出现效果',
          // url: 'https://github.com/hsknemo/PaintStr'
          url: 'https://paint-str.vercel.app/'
        }
      ]
    },
    {
      capName: '雜項',
      capList: [
        {
          icon: Blog,
          name: '杂货铺',
          desc: '基于 Vue-Press 抒写的个人博文(坚持更新)',
          url: 'https://self-blog-five.vercel.app/'
        },

      ]
    },
    {
      capName: '课程',
      capList: [
        {
          icon: mapbox,
          name: 'mapBox基础入门',
          desc: '讲了一些关于mapbox使用的课程',
          url: 'https://www.bilibili.com/video/BV1iU3ozKEdH/?spm_id_from=333.1387.homepage.video_card.click'
        },
      ]
    },
  ]
})


export default Projects
