import data from './data.js'


class Base {
  constructor() {

  }

  static instanceo() {
    return new this()
  }

  readByKey(key) {
    return data[key]
  }

  readKey() {
    return Object.keys(data)
  }
}

export default new Base()