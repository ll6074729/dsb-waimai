import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        defaultCity :"获取中...",
        defaultSchool :"获取中...",
    },
    actions:{
        changeCity (ctx ,city ){
            ctx.commit('changeCity',city)
        },
        changeSchool (ctx ,school ){
            ctx.commit('changeSchool',school)
        },
    },
    mutations:{
        changeSchool (state,school){
            state.defaultSchool = school
        },
        changeCity (state ,city ){
            state.defaultCity = city
        }
    }
})