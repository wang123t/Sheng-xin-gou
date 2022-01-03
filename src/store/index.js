import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

import home from './home'
import user from './user'
import search from './search'
export default new Vuex.Store({
  modules: {
    home,
    user,
    search,
  }//配置store的模块
})
