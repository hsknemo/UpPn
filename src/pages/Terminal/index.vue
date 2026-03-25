<template>
  <div class="container" ref="container">

    <div class="row-log-container" v-if="logInputsArr.length">
      <template :key='index' v-for="(item, index) in logInputsArr">
        <!--        普通命令历史 输出的日志-->
        <div class="history" v-if="item.runCommoand">
          <div class="left no-select">~</div>
          <div class="right">{{ item.runCommoand }}</div>
        </div>
        <div class="log-item" v-if="item.runStatus !== 'any'">
          <div class="sub-wrap">
            <component
                v-if="item.runStatus"
                :is="item.runStatus === 'success' ? SuccessLog : ErrorLog"
                :info="item.info"
            />
          </div>
        </div>

        <!--        history 输出的日志-->
        <template :key='index' v-for="(history, index) in item.runHistoryLog">
          <div class="log">
            <div class="logItem">
              {{ history.commondItem }}
            </div>
          </div>
        </template>

        <!--       music list 音乐列表-->
        <component v-if="item.musicList"
                   :is='MusicList'
                   :searchMusicList="item.musicList">
        </component>

        <!--      video list 短视频列表-->
        <component v-if="item.videoList"
                   :is='MicroVideoList'
                   :videoList="item.videoList">
        </component>

        <!--       说明书组件-->
        <component v-if="item.help"
                   :is='ReadMe'
                   :oHelpData="item.help"
        >
        </component>
      </template>
    </div>

    <div class="row-input">
      <span class="position no-select green">️~</span>
      <span class="mk-hk">:</span>
      <input
          ref="inputRef"
          v-model="onInput"
          @keydown="onInputKeyPress"
          autofocus
          type="text"
          class="terminal-input"
      >
    </div>
  </div>
</template>

<script>
import ReadMe from './compo/ReadMe.vue'
// 正确调用命令组件
import SuccessLog from "./compo/Success.vue";
// 错误调用命令组件
import ErrorLog from "./compo/Error.vue";
// 音乐列表组件
import MusicList from './compo/MusicList.vue'
import MicroVideoList from './compo/MicroVideo.vue'
// 音乐服务
import MusicService from '../../Service/MusicService/index'
// 主服务
import Service from '../../Service/Terminal/index'
// 短视频服务
import MicroVideo from '../../Service/MicroVideo/index'

// 调用 API
import Api from './config/Api.js'
// 实例化服务
const musicService = MusicService.instance()
const microVideo = MicroVideo.instance()
const service = Service.instance({})
export default {
  name: "index.vue",

  data() {
    let onInput = ''
    return {
      MicroVideoList,
      ReadMe,
      onInput,
      ErrorLog,
      SuccessLog,
      MusicList,
      logInputsArr: [],
      historyInputsArray: [],
      historyLog: {
        runHistoryLog: []
      },
      SYSTEM_KEY_MAP: {}
    }
  },

  mounted() {
    this.initSystemKeyBind()
    this.onBaseRegisCommond()
    this.initNumber()
  },

  methods: {
    initNumber() {
      const num = ''
      Number.prototype.unoInnerFixed = function (args) {
        let result = ''

        if (String(this) !== '') {
          let strNumber = String(this)

          if (strNumber.includes('.')) {
            let splitNum = strNumber.split('.')
            let firstNum = splitNum[0]
            let lastNum = splitNum[1]
            result = lastNum.substring(0, args)
            return Number(firstNum + '.' + result)
          }
          result = strNumber
          return Number(result)
        }
      }

      const result = Number(num).unoInnerFixed(4)
    },
    initSystemKeyBind() {
      const KeyMap = {
        '老板键': {
          key: 'Control+h',
          config: {
            desc: '老板键'
          },
          func: (miniService) => {
            const {terminal} = miniService
            terminal.runCommondBy('cls', (res, err) => {
              console.log({
                res
              })
              if (res) {
                this.logInputsArr = []
              }
            })
          }
        },
        focusInput: {
          key: 'Control+g',
          config: {
            desc: '全局聚焦当前命令输入框'
          },
          func: miniService => {
            this.$refs.inputRef.focus()
          }
        },
      }
      service.bindKey(KeyMap.老板键.key, KeyMap.老板键.config || {}, KeyMap.老板键.func)
      service.bindKey(KeyMap.focusInput.key, KeyMap.focusInput.config || {}, KeyMap.focusInput.func)

    },

    // 注册一些基础的命令
    onBaseRegisCommond() {
      const KeyMap = {
        帮助信息: {
          key: 'help',
          config: {
            desc: '查看帮助'
          },
          func: miniService => {
            const {readMeService, terminal, globalKeyService} = miniService
            const result = readMeService.getHelp({
              service: {
                terminal,
                globalKeyService,
              }
            })
            console.log(result)
            var data = {
              fastKey: {},
              command: {}
            }
            result.regisKey.forEach((item, index) => {
              data.fastKey[index] = item.desc || ''
            })
            result.terminalCommand.forEach((item, index) => {
              data.command[index] = item.desc || ''
            })
            console.log(data)
            this.logInputsArr.push({
              runCommoand: this.onInput,
              help: {
                data
              }
            })
          }
        },
        网易云音乐: {
            key: 'net',
            config: {
            desc: '网易云音乐帮助键',
            option: {
              '-s': (args) => {
                console.log(args, '关键词')
                musicService.fetchMusicList(args, async (data, error) => {
                  if (data) {
                    const d = await data.json()
                    // var o = terminal.runCommondSuccess('net - s' + args, {
                    //   info: '获取列表成功'
                    // })
                    var oMusicList = Object.assign({}, {
                      runCommoand: 'net -s ' + args,
                      runStatus: 'success'
                    }, {
                      musicList: d?.result?.songs || []
                    })
                    console.log({
                      oMusicList: oMusicList
                    })
                    this.logInputsArr.push(oMusicList)
                    return
                  }
                  if (error) {
                    this.logInputsArr.push(terminal.runCommondError('net - s' + args))
                  }
                })
              }
            },
          },
          func: miniService => {
            this.logInputsArr.push({
              runCommoand: this.onInput,
              MusicPlay: true
            })
          }
        },
        短视频: {
          key: 'vd',
          config: {
            desc: '短视频命令',
            option: {
              '-n': (args) => {
                console.log(args, '数量')
                microVideo.fetchVideoList(Api.smallVideo, {
                  page: 0,
                  size: args
                }, async (data, error) => {
                  if (data) {
                    const d = await data.json()
                    // var o = terminal.runCommondSuccess('net - s' + args, {
                    //   info: '获取列表成功'
                    // })
                    var oVideoList = Object.assign({}, {
                      runCommoand: 'vd -n ' + args,
                      runStatus: 'success'
                    }, {
                      videoList: d?.result?.list || []
                    })

                    this.logInputsArr.push(oVideoList)
                    return
                  }
                  if (error) {
                    this.logInputsArr.push(terminal.runCommondError('vd -n' + args))
                  }
                })
              }
            },
          },
          func: miniService => {
            this.logInputsArr.push({
              runCommoand: this.onInput,
              MusicPlay: true
            })
          }
        },
        bing搜索: {
          key: 'bing',
          config: {
            desc: '必应搜索键',
            alias: ['b', 'bi'],
            option: {
              '-s': function (args) {
                window.open(Api.Bing + '?q=' + args)
              }
            }
          },
          func: miniService => ({})
        },
        清除: {
          key: 'clear',
          config: {
            alias: ['cl', 'cls']
          },
          func: miniService => {
            this.logInputsArr = []
          }
        },
        开发者信息: {
          key: 'info',
          config: {
            desc: '开发者信息命令',
          },
          func: miniService => {
            this.logInputsArr.push({
              runStatus: 'success',
              runCommoand: this.onInput,
              info: 'Autor: QinKai'
            })
          }
        },
        查看历史: {
          key: 'history',
          config: {
            alias: ['hs', 'his'],
            desc: '查看历史信息命令',
            option: {
              '-l': () => {
                this.logInputsArr.push({
                  runStatus: 'success',
                  runCommoand: this.onInput,
                  info: '真牛逼'
                })
              }
            },
          },
          func: miniService => {
            const {terminal} = miniService
            var a = []
            terminal.getHistory().forEach(item => {
              a.push({
                commondItem: item
              })
            })

            this.logInputsArr.push({
              runCommoand: this.onInput,
              runHistoryLog: a
            })
            console.log(this.logInputsArr)
          }
        },
        查看日期: {
          key: 'date',
          config: {},
          func: miniService => {
            const {terminal} = miniService
            let date = terminal.getDate()
            this.logInputsArr.push({
              runCommoand: this.onInput,
              info: date,
              runStatus: 'success'
            })
          }
        }
      }
      service.bindCommond(KeyMap.帮助信息.key, KeyMap.帮助信息.config || {}, KeyMap.帮助信息.func)
      service.bindCommond(KeyMap.网易云音乐.key, KeyMap.网易云音乐.config || {}, KeyMap.网易云音乐.func)
      service.bindCommond(KeyMap.bing搜索.key, KeyMap.bing搜索.config || {}, KeyMap.bing搜索.func)
      service.bindCommond(KeyMap.清除.key, KeyMap.清除.config || {}, KeyMap.清除.func)
      service.bindCommond(KeyMap.开发者信息.key, KeyMap.开发者信息.config || {}, KeyMap.开发者信息.func)
      service.bindCommond(KeyMap.查看历史.key, KeyMap.查看历史.config || {}, KeyMap.查看历史.func)
      service.bindCommond(KeyMap.查看日期.key, KeyMap.查看日期.config || {}, KeyMap.查看日期.func)
      service.bindCommond(KeyMap.短视频.key, KeyMap.短视频.config || {}, KeyMap.短视频.func)


    },

    onRegisCommon() {

    },

    onGoPageLast() {
      const safeHeight = 400
      const container = this.$refs.container
      const offsetHeight = container.scrollHeight + safeHeight
      setTimeout(_ => {
        this.$nextTick(_ => {
          container.scrollTop = offsetHeight
          console.log(container, offsetHeight)
        })
      }, 200)

    },

    onCommandRun(commond) {
      return new Promise((resolve, reject) => {
        service.runCommond(commond, function (result) {
          if (result.status === 'success') {
            resolve(result)
          } else {
            reject(result)
          }
        })
      })
    },

    async onEnterInput() {
      try {
        if (!this.onInput) {
          this.logInputsArr.push({
            runCommoand: '~',
            runStatus: 'any'
          })
          return
        }
        var data = await this.onCommandRun(this.onInput)

      } catch (e) {
        console.log(e)
        this.logInputsArr.push({
          runCommoand: e.runCommoand,
          info: e.info,
          runStatus: e.status,
          runHistoryLog: []
        })
      } finally {
        this.onGoPageLast()
        this.onInput = ''
      }

    },

    onInputKeyPress(ev) {
      let key = ev.key
      console.log('press', ev)
      switch (key) {
          // 按下回车键
        case 'Enter':
          this.onEnterInput()
          break
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: calc(100vh - 140px);
  overflow: scroll;

  .row-input {
    display: flex;
    align-items: center;
    padding: 10px;

    .position.green {
      color: #09e309;
    }

    .mk-hk {
      margin-left: 8px;
      display: none;
    }

    .position, .terminal-input, .mk-hk {
      color: var(--half-gray-128);
    }

    .terminal-input {
      font-size: 14px;
      font-family: system-ui, "JetBrains Mono";
      padding: 10px;
      width: 100%;
      outline: none;
      border: none;
      background-color: unset;
    }
  }


  .row-log-container {
    * {
      color: var(--half-gray-128)
    }

    margin-top: 10px;
    padding: 10px;

    .history, .sub-wrap {
      display: flex;
      align-items: center;

      .left {
        margin-right: 10px;
      }

    }

    .sub-wrap {
      display: flex;
      align-items: center;
    }

  }
}

.no-select {
  user-select: none;
}
</style>
