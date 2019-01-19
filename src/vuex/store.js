import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'
import state from './state'
import mutations from './mutations'
Vue.use(Vuex);

const actions = {
  update (context) {
    console.log('dispatch')
    setTimeout(function(){
      context.commit('test', 'updateToken');
    }, 2000)
  }
}
export default new Vuex.Store({
  mutations,
  actions,
  getters,
  state
})
