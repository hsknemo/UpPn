import DateCustome from './Date'
class Terminal {
    constructor() {
        // 注册命令行执行方法
        this.commonMap = new Map()
        // 记录命令行的的输入命令
        this.historyCommondList = []
        // 记录命令行的 log 输出
        this.teminalLogMap = new Map()
        
        this.terminalDate = this.installService(DateCustome, 'currentDate')

    }

    static instance(o) {
        return new this(o)
    }

    installService(service, func) {
        const s = service.instance()
        return s[func]()
    }

    regisCommondMap(commond, config, func) {
        this.commonMap.set(commond, func)

        // 如果配置项有别名那么也会注册别名的命令
        if (config.alias) {
            config.alias.forEach(item => {
                this.commonMap.set(item, func)
            })
        }

        if (config.option) {
            let options = config.option
            for (const commondKey in options) {
                // 设置子命令
                this.commonMap.set(commond, {
                    [commondKey]: options[commondKey],
                })
            }
            var m = this.commonMap.get(commond)
            m.func = func
            this.commonMap.set(commond, m)
        }

        if (config.desc) {
            var m = this.commonMap.get(commond)
            m.desc = config.desc
            this.commonMap.set(commond, m)
        }
        console.log(this.commonMap, '注册')

    }

    getHistory() {
        return this.historyCommondList
    }

    setCommandHistory(commond) {
        this.historyCommondList.push(commond)
    }

    isMap(m) {
        return Object.prototype.toString.call(m) === '[object Object]'
    }

    runCommondBy(commond, callback) {
        this.setCommandHistory(commond)
        var result = this.parseCommand(commond)
        console.log({
            runcommand: result
        })

        if (this.commonMap.get(result.start)) {
            let terminalOutput = {}

            var currentCommand = this.commonMap.get(result.start)

            if (result?.option?.size) {
                result.option.forEach((item, index) => {
                    console.log({
                        遍历: item,
                        index
                    })
                    // key: -p    value: val
                    if (currentCommand[index]) {
                        terminalOutput = currentCommand[index](item || '')
                    }
                })
            } else {
                console.log(currentCommand)
                if (this.isMap(currentCommand)) {
                    currentCommand.func()
                } else {
                    terminalOutput = currentCommand()
                }
            }
            callback(this.runCommondSuccess(commond, terminalOutput))
        } else {
            callback(this.runCommondError(commond))
        }
    }

    runCommondError(commond) {
        return {
            runCommoand: commond,
            status: 'error',
            info: '运行失败'
        }
    }

    runCommondSuccess(commond, terminalOutput) {
        console.log({
            run: commond
        })
        return Object.assign({},{
            runCommoand: commond.start || commond,
            status: 'success',
            info: '运行成功'
        }, terminalOutput)
    }

    clearCommond(commandList) {
        for (let i = 0; i < commandList.length; i++) {
            if (!commandList[i]) {
                commandList.splice(i, 1)
                i += 1
            }
        }
        return commandList
    }

    parseCommand(command) {
        console.log({
            '解析的命令是': command
        })
        var oCommondMap = {}

        const commondList = command.split(' ')

        const c = this.clearCommond(commondList)
        console.log({
            c
        })
        c.forEach((item, index) => {
            if (commondList[0] !== '') {
                oCommondMap['start'] = commondList[0]
            }

            if (item.includes('-') && item[0] === '-') {
                oCommondMap.option = oCommondMap.option || new Map()
                oCommondMap.option.set(item, commondList[index + 1] || '')
            }
        })
        console.log({
            parseResult: oCommondMap
        })

        return oCommondMap
    }

    getBindCommand() {
        return this.commonMap
    }

    getDate() {
        return this.terminalDate
    }
}




export default Terminal