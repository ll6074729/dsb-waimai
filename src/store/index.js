import Vue from 'vue'
import Vuex from 'vuex'
import State from './state'
import Mutations from './mutations'
Vue.use(Vuex)

export default new Vuex.Store({
    State,
    Mutations,
})