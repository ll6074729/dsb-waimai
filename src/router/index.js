import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Search from '@/pages/search/search'
import Shop from '@/pages/shop/shop'
import Cart from '@/pages/cart/cart'
import Pay from '@/pages/pay/pay'
import Order from '@/pages/order/order'
import OrderDetails from '@/pages/orderdetails/orderdetails'
import Personal from '@/pages/personal/personal'
import Site from '@/pages/personal/site'
import Evaluate from '@/pages/evaluate/evaluate'
import Complaint from '@/pages/complaint/complaint'
import Checkin from '@/pages/checkin/checkin'
import Concurrent from '@/pages/concurrent/concurrent'
import Location from '@/pages/location/location'
import Sitelist from '@/pages/sitelist/sitelist'
import Integral from '@/pages/personal/integral'
import Merchant from '@/pages/Merchant/Merchant'
import Coupon from '@/pages/personal/coupon'
import Collect from '@/pages/personal/collect'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        title:'首页'
      }
    },
    {
      path:'/collect',
      name:'Collect',
      component:Collect,
    },
    {
      path:'/coupon',
      name:'Coupon',
      component:Coupon,
    },
    {
      path:'/integral',
      name: 'Integral',
      component: Integral,
      meta:{
        title:'积分明细'
      }
    },
    {
      path:'/Merchant',
      name: 'Merchant',
      component: Merchant,
      meta:{
        title:'入住'
      }
    },
    {
      path: '/Location',
      name: 'Location',
      component: Location,
      meta:{
        title:'首页'
      }
    },
    {
      path:'/search',
      name:'Search',
      component:Search,
      meta:{
        title:'搜索'
      }
    },
    {
      path:'/shop/:id',
      name:'Shop',
      component:Shop,
      meta:{
        title:'商品'
      }
    },
    {
      path:'/cart/:id',
      name:'Cart',
      component:Cart,
      meta:{
        title:'购物车'
      }
    },
    {
      path:'/pay',
      name:'Pay',
      component:Pay,
      meta:{
        title:'支付'
      }
    },
    {
      path:'/order',
      name:'Order',
      component:Order,
      meta:{
        title:'订单'
      }
    },
    {
      path:'/Personal',
      name:'Personal',
      component:Personal,
      meta:{
        title:'个人中心'
      }
    },
    {
      path:'/site',
      name:'Site',
      component:Site,
      meta:{
        title:'新增地址'
      }
    },
    {
      path:'/sitelist',
      name:'Sitelist',
      component:Sitelist,
      meta:{
        title:'地址列表'
      }
    },
    {
      path:'/orderdetails',
      name:'OrderDetails',
      component:OrderDetails,
      meta:{
        title:'订单信息'
      }
    },
    {
      path:'/evaluate',
      name:'Evaluate',
      component:Evaluate
    },
    {
      path:'/complaint',
      name:'Complaint',
      component:Complaint
    },
    {
      path:'/checkin',
      name:'Checkin',
      component:Checkin
    },
    {
      path:'/concurrent',
      name:"Concurrent",
      component:Concurrent
    }
  ]
})
