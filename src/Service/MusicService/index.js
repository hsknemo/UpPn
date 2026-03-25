import Api from '../../pages/Terminal/config/Api'
class MusicService {
    constructor(o) {
        this.o = o
    }

    static instance(o = {}) {
        return new this(o)
    }

    async _fetch(url, ops, callback) {
        try {
            var result = await fetch(url, {...ops})
            callback(result, null)
        } catch (e) {
            callback(null, result)
        }
    }


    async fetchMusicList(songName, callback) {
        const ops = {
            method: 'post'
        }
        await this._fetch(Api.Net163Search + songName, ops, callback)
    }
}


export default MusicService