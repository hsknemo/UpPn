import { createStore } from 'vuex'
const store = createStore({
  state() {
    return {
      menu: []
    }
  },
  mutations: {
    updateMenu(state, val) {
      state.menu = val
    }
  },
  actions: {
    UPDATE_MENU({commit}, val) {
      commit('updateMenu', val)
    }
  },
})
export default store
