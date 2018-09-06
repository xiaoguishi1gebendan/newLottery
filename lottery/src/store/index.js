import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import state from './state'
import mutation from './mutation'
Vue.use(Vuex)
export default new Vuex.Store({
    state,
    getters,
    mutation
})