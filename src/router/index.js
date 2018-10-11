import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Text from '@/pages/text/text'
import Search from '@/pages/search/search'
import Shop from '@/pages/shop/shop'
import Cart from '@/pages/cart/cart'
import Pay from '@/pages/pay/pay'
import Paystatus from '@/pages/pay/paystatus'
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
import Balance from '@/pages/personal/balance'
import Merchant from '@/pages/Merchant/Merchant'
import Coupon from '@/pages/personal/coupon'
import Collect from '@/pages/personal/collect'
import complaintList from '@/pages/personal/complaintList'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{
        title:'首页',
        keepAlive: false
      }
    },
    {
      path: '/text',
      name: 'Text',
      component: Text,
      meta:{
        title:'测试',
        keepAlive: false
      }
    },
    {
      path:'/paystatus',
      name:'Paystatus',
      component:Paystatus,
      meta:{keepAlive: false}
    },
    {
      path:'/complaintList',
      name:'complaintList',
      component:complaintList,
      meta:{keepAlive: false}
    },
    {
      path:'/collect',
      name:'Collect',
      component:Collect,
      meta:{keepAlive: false}
    },
    {
      path:'/coupon',
      name:'Coupon',
      component:Coupon,
      meta:{keepAlive: false}
    },
    {
      path:'/integral',
      name: 'Integral',
      component: Integral,
      meta:{
        title:'积分明细',
        keepAlive: false
      }
    },
    {
      path:'/balance',
      name: 'Balance',
      component: Balance,
      meta:{
        title:'余额明细',
        keepAlive: false
      }
    },
    {
      path:'/Merchant',
      name: 'Merchant',
      component: Merchant,
      meta:{
        title:'入住',
      }
    },
    {
      path: '/Location',
      name: 'Location',
      component: Location,
      meta:{
        title:'选择校区',
        keepAlive: false
      }
    },
    {
      path:'/search',
      name:'Search',
      component:Search,
      meta:{
        title:'搜索',
        keepAlive: false
      }
    },
    {
      path:'/shop/:id',
      name:'Shop',
      component:Shop,
      meta:{
        title:'商品',
        keepAlive: false
      }
    },
    {
      path:'/cart/:id',
      name:'Cart',
      component:Cart,
      meta:{
        title:'购物车',
        keepAlive: false
      }
    },
    {
      path:'/pay/:status',
      name:'Pay',
      component:Pay,
      meta:{
        title:'支付',
        keepAlive: false
      }
    },
    {
      path:'/order',
      name:'Order',
      component:Order,
      meta:{
        title:'订单',
        keepAlive: false
      }
    },
    {
      path:'/Personal',
      name:'Personal',
      component:Personal,
      meta:{
        title:'个人中心',
        keepAlive: true
      }
    },
    {
      path:'/site',
      name:'Site',
      component:Site,
      meta:{
        title:'新增地址',
        keepAlive: false
      }
    },
    {
      path:'/sitelist',
      name:'Sitelist',
      component:Sitelist,
      meta:{
        title:'地址列表',
        keepAlive: false
      }
    },
    {
      path:'/orderdetails',
      name:'OrderDetails',
      component:OrderDetails,
      meta:{
        title:'订单信息',
        keepAlive: false
      }
    },
    {
      path:'/evaluate',
      name:'Evaluate',
      component:Evaluate,
      meta:{
        keepAlive: false
      }
    },
    {
      path:'/complaint',
      name:'Complaint',
      component:Complaint,
      meta:{
        keepAlive: false
      }
    },
    {
      path:'/checkin',
      name:'Checkin',
      component:Checkin,
      meta:{
        keepAlive: false
      }
    },
    {
      path:'/concurrent',
      name:"Concurrent",
      component:Concurrent,
      meta:{
        keepAlive: false
      }
    }
  ]
})
