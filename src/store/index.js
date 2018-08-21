import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let defaultCity = "获取中..."
let defaultSchool = "获取中..."
let area_id 
let SchoolList 
let cart
let defaultHead = 'this.src="' + require('../assets/img/shopHead.png') + '"'
let defaultShop = 'this.src="' + require('../assets/img/defaultshop.png') + '"'
let addressList
let delivery_cost
let food //推荐商品
let defaultAddress
let shopprom //店铺的优惠活动
/**
 * 登录接口需要的参数
 * 
 */
try{
    if(localStorage.shopprom){
        shopprom = localStorage.shopprom
    }
}catch (e){}
try{
    if(localStorage.delivery_cost){
        delivery_cost = localStorage.delivery_cost
    }
}catch (e){}
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
// 默认地址
try{
    if(localStorage.defaultAddress){
        defaultAddress = localStorage.defaultAddress
    }
}catch (e){}
export default new Vuex.Store({
    state:{
        defaultCity,
        defaultSchool,
        area_id,
        SchoolList,
        cart,
        defaultHead,
        defaultShop,
        addressList,
        delivery_cost,
        defaultAddress,
        shopprom,
    },
    actions:{
        changeProm (ctx ,prom ){
            ctx.commit('changeProm',prom)
        },
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
        },
        addressList(ctx,addressList){
            ctx.commit('addressList',addressList)
        },
        changedelivery(ctx,delivery_cost){
            ctx.commit('changedelivery',delivery_cost)
        },
        defaultAddress(ctx,defaultAddress){
            ctx.commit('defaultAddress',defaultAddress)
        }
    },
    mutations:{
        changeProm(state,prom){
            state.shopprom = prom
            try {
                localStorage.shopprom = prom
            }catch (e){
            }
        },
        defaultAddress(state,defaultAddress){
            state.defaultAddress = defaultAddress
            try {
                localStorage.defaultAddress = defaultAddress
            }catch (e){
            }
        },
        changedelivery(state,delivery_cost){
            state.delivery_cost = delivery_cost
            try {
                localStorage.delivery_cost = delivery_cost
            }catch (e){
            }
        },
        addressList(state,addressList){
            state.addressList = addressList
        },
        // cart(state,cart){
        //     state.cart = cart
        // },
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