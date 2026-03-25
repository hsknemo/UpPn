import MusicService from "../MusicService";

class MicroVideo extends MusicService {
    constructor() {
        super()
    }

    static instance() {
        return new this()
    }

    fetchVideoList(url, ops, callback) {
        let o = {
            method: 'get',
            params: {
                page: 0,
                size: 20
            }
        }
        o.params = Object.assign({}, o.params, ops)
        this._fetch(url + `?page=0&size=${ops.size}`, o, callback)
    }
}


export default MicroVideo