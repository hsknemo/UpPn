
class ReadMe {
    constructor(o) {
        this.o = o
        this.helpCommand = {}
    }

    static instance(o = {}) {
        return new this(o)
    }

    init(service) {
        const regisKey = service.globalKeyService.getBindKeys()
        const terminalCommand = service.terminal.getBindCommand()

        this.helpCommand = {
            regisKey,
            terminalCommand
        }
    }

    getHelp({ service }) {
        this.init(service)
        return this.helpCommand
    }


}

export default ReadMe