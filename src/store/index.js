import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
let defaultCity = "获取中..."
let defaultSchool = "获取中..."


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

export default new Vuex.Store({
    state:{
        defaultCity : defaultCity,
        defaultSchool : defaultSchool,
        access_token : '',
        token_type : '',
        expires :''
    },
    actions:{
        changeCity (ctx ,city ){
            ctx.commit('changeCity',city)
        },
        changeSchool (ctx ,school ){
            ctx.commit('changeSchool',school)
        },
        changeUser(ctx){
            axios.get('/mobile/index/getUser')
                .then(function (res) {
                    let date = res.data.data
                    ctx.commit('changeAccess',date.access_token)
                    ctx.commit('changeTokeType',date.token_type)
                    ctx.commit('changeExpires',date.expires_in)
                })
                .catch(function (error) {
                    console.log(error);
                });
            
        },
    },
    mutations:{
        changeAccess (state,token){
            state.access_token = token
        },
        changeTokeType(state, type){
            state.token_type = type
        },
        changeExpires(state, expires){
            let timestamp = Date.parse(new Date())/1000;
            state.expires = parseInt(expires) + parseInt(timestamp)
        },
        changeSchool (state,school){
            state.defaultSchool = school
            try {
                localStorage.defaultSchool = school

            }catch (e){
                console.log('schoole',1)
            }
        },
        changeCity (state ,city ){
            state.defaultCity = city
            try {
                localStorage.defaultCity = city
            }catch (e){
                console.log('city',2)
            }
        }
    }
})