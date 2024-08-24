import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    userName: ''
  },
  getters: {
    getToken(state) {
      return state.token || localStorage.getItem('token') || ''
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
      console.log('store, localstorage save token success!')
    },
    delToken(state) {
      state.token = ''
      localStorage.removeItem('token')
    },

    setUserInfo(state, userName) {
      state.userName = userName
    }
  },

  actions: {
    // removeToken: (context) => {
    // context.commit('setToken')
    // }
  }
})

export default store
