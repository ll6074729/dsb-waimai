import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let defaultCity = "获取中..."
let defaultSchool = "获取中..."
let area_id = 4
let SchoolList 
let cart

/**
 * 登录接口需要的参数
 * 
 */
try{
    if(localStorage.defaultCity){
        defaultCity = localStorage.defaultCity
    }
}catch (e){}

try{
    if(localStorage.defaultSchool){
        defaultSchool = localStorage.defaultSchool
    }
}catch (e){}

try{
    if(localStorage.area_id){
        area_id = localStorage.area_id
    }
}catch (e){}

try{
    if(localStorage.SchoolList){
        SchoolList = localStorage.SchoolList
    }
}catch (e){}

export default new Vuex.Store({
    state:{
        defaultCity,
        defaultSchool,
        area_id,
        SchoolList,
        cart
    },
    actions:{
        changeCity (ctx ,city ){
            ctx.commit('changeCity',city)
        },
        changeSchool (ctx ,school ){
            ctx.commit('changeSchool',school)
        },
        changearea (ctx ,area_id ){
            ctx.commit('changearea',area_id)
        },
        changeSchoolList (ctx , SchoolList){
            ctx.commit('changeSchoolList',SchoolList)
        }
    },
    mutations:{
        cart(state,cart){
            state.cart = cart
        },
        changeSchoolList (state,SchoolList){
            state.SchoolList = SchoolList
            try {
                localStorage.SchoolList = SchoolList
            }catch (e){
            }
        },
        changearea (state,area_id){
            state.area_id = area_id
            try {
                localStorage.area_id = area_id
            }catch (e){
            }
        },
        changeSchool (state,school){
            state.defaultSchool = school
            try {
                localStorage.defaultSchool = school
            }catch (e){
            }
        },
        changeCity (state ,city ){
            state.defaultCity = city
            try {
                localStorage.defaultCity = city
            }catch (e){
            }
        }
    }
})