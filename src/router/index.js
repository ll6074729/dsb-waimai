import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/home'
import Search from '@/pages/search/search'
import Shop from '@/pages/shop/shop'
import Cart from '@/pages/cart/cart'
import Pay from '@/pages/pay/pay'
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
  ]
})
