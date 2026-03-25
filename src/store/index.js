import menuStore from './menu/index'
import { createStore } from 'vuex'

var storeModules = createStore({
  modules: {
    menu: menuStore
  }
})
export default storeModules
