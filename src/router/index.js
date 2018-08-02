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
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/search',
      name:'Search',
      component:Search
    },
    {
      path:'/shop/:id',
      name:'Shop',
      component:Shop
    },
    {
      path:'/cart',
      name:'Cart',
      component:Cart
    },
    {
      path:'/pay',
      name:'Pay',
      component:Pay
    },
    {
      path:'/order',
      name:'Order',
      component:Order
    },
    {
      path:'/Personal',
      name:'Personal',
      component:Personal
    },
    {
      path:'/site',
      name:'Site',
      component:Site
    },
    {
      path:'/orderdetails',
      name:'OrderDetails',
      component:OrderDetails
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
    }
  ]
})
