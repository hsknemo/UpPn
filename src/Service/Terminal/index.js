import MusicService from "../MusicService";
import TerminalService from "./Terminal";
import GlobalKeyService from "./RegisGlobalKey";
import ReadMeService from "./Readme";


class Service {
    constructor() {
        this.install()
    }

    static instance(o = {}) {
        return new this(o)
    }

    install() {
        // 实例化服务
        this.terminal = TerminalService.instance()
        this.musicService = MusicService.instance()
        this.globalKeyService = GlobalKeyService.instance()
        this.readMeService = ReadMeService.instance()
    }

    bindKey(key, config, func) {
        let service = {
            terminal: this.terminal,
            musicService: this.musicService,
            readMeService: this.readMeService
        }
        this.globalKeyService.onRegisKey(key, config, func.bind(this, service))
    }

    bindCommond(command, config, func) {
        let service = {
            terminal: this.terminal,
            musicService: this.musicService,
            readMeService: this.readMeService,
            globalKeyService: this.globalKeyService,
        }
        this.terminal.regisCommondMap(command, config, func.bind(this, service))
    }

    runCommond(command, func) {
        this.terminal.runCommondBy(command, func)
    }

    /**
     * 获取绑定键信息
     * @returns {[]}
     */
    getCommandHistory() {
        return this.terminal.getHistory()
    }
}

export default Service