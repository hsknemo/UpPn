class RegisGlobalKey {
    constructor() {
        this.rigisKey = new Map()
        this.rigisKeyAndOption = new Map()
        this.initWatchKey()
    }

    static instance() {
        return new this()
    }

    /**
     * 初始化监听键盘绑定事件
     */
    initWatchKey() {
        var bindKey = []
        window.addEventListener('keydown', ev => {
            var key = ev.key
            bindKey.push(key)
            if (bindKey.length === 2) {
                if (this.isBindKey(bindKey.join('+'))) {
                    var key = bindKey.join('+')
                    this.runRegisKey(key)
                } else {
                    bindKey = []
                }
            }
        })
        window.addEventListener('keyup', ev => {
            var key = ev.key
            bindKey.length = 0
        })
    }


    onRegisKey(bindKey,  o = {}, func) {
        this.rigisKey.set(bindKey, func)
        if (o.desc) {
            this.rigisKeyAndOption.set(bindKey, {
                desc: o.desc
            })
        }
    }

    runRegisKey(bindKey) {
        this.rigisKey.get(bindKey) && this.rigisKey.get(bindKey)()
    }

    isBindKey(key) {
        return this.rigisKey.get(key) ? true : false
    }

    getBindKeys() {
        return this.rigisKeyAndOption
    }
}

export default RegisGlobalKey