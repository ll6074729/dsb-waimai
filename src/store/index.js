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
let delivery_cost //校区配送价
let packing_expense
let food //推荐商品
let defaultAddress
let shopprom //店铺的优惠活动
let order_id //当前订单id
let order_sn //当前订单编号
let delivery_price = '0' //楼层配送送
let process_date //校区配送时间
/**
 * 登录接口需要的参数
 * 
 */
try{
    if(localStorage.process_date){
        process_date = localStorage.process_date
    }
}catch (e){}
try{
    if(localStorage.delivery_price){
        delivery_price = localStorage.delivery_price
    }
}catch (e){}
try{
    if(localStorage.order_id){
        order_id = localStorage.order_id
    }
}catch (e){}
try{
    if(localStorage.order_sn){
        order_sn = localStorage.order_sn
    }
}catch (e){}
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
    if(localStorage.packing_expense){
        packing_expense = localStorage.packing_expense
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
        packing_expense,
        defaultAddress,
        shopprom,
        order_sn,
        order_id,
        delivery_price,
        process_date
    },
    actions:{
        changeprocess(ctx,process_date){
            ctx.commit('changeprocess',process_date)
        },
        changedeliveryPrice(ctx,delivery_price){
            ctx.commit('changedeliveryPrice',delivery_price)
        },
        changeOrderSn (ctx,order_sn) {
            ctx.commit('changeOrderSn',order_sn)
        },
        changeOrderId (ctx,order_id){
            ctx.commit('changeOrderId',order_id)
        },
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
        changepacking(ctx,packing_expense){
            ctx.commit('changepacking',packing_expense)
        },
        changedelivery(ctx,delivery_cost){
            ctx.commit('changedelivery',delivery_cost)
        },
        defaultAddress(ctx,defaultAddress){
            ctx.commit('defaultAddress',defaultAddress)
        }
    },
    mutations:{
        changeprocess(state,process_date){
            state.process_date = process_date
            try {
                localStorage.process_date = process_date
            }catch (e){
            }
        },
        changedeliveryPrice(state,delivery_price){
            state.delivery_price = delivery_price
            try {
                localStorage.delivery_price = delivery_price
            }catch (e){
            }
        },
        changeOrderId(state,order_id){
            state.order_id = order_id
            try {
                localStorage.order_id = order_id
            }catch (e){
            }
        },
        changeOrderSn(state,order_sn){
            state.order_sn = order_sn
            try {
                localStorage.order_sn = order_sn
            }catch (e){
            }
        },
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
        changepacking(state,packing_expense){
            state.packing_expense = packing_expense
            try {
                localStorage.packing_expense = packing_expense
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