import data from './data.js'

class Base {
  constructor() {}

  static instance() {
    return new this()
  }

  readByKey(key) {
    return data[key]
  }
}

export default Base.instance()