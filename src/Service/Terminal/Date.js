import moment from 'moment'

class DateCustome {
    constructor() {
    }

    static instance() {
        return new this()
    }

    currentDate() {
        return moment(new Date()).format('yyyy年MM月DD日 HH时mm分ss秒')
    }
}

export default DateCustome