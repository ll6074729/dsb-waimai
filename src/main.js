// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui'
import {Rate,Input,Badge,Loading,MessageBox,Radio,Progress} from 'element-ui'
import BaiduMap from 'vue-baidu-map'
import 'element-ui/lib/theme-chalk/index.css'
import 'css/reset.css'
import 'css/icon.css'
import 'css/border.css'
import 'swiper/dist/css/swiper.css'
import 'css/style.css'
import AwesomePicker from 'vue-awesome-picker'
import store from './store/index'
import styleIndex from './assets/static/index'
import axios from 'axios'
import wx from 'weixin-js-sdk'
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
// import 'babel-polyfill'
// import Es6Promise from 'es6-promise'
// require('es6-promise').polyfill()
// Es6Promise.polyfill()


// import WXconfig from 'st/wx'
Vue.use(AwesomePicker)
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.use(Rate)
Vue.use(Input)
Vue.use(Badge)
Vue.use(Loading)
Vue.use(Progress)
Vue.use(Radio)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(BaiduMap, {
  ak: 'ySYb24WsXpbFzl80OKpgeb2xN2CFKdmB'
})
Vue.config.productionTip = false
Vue.prototype.styleIndex = styleIndex
Vue.prototype.$http = axios
router.afterEach((to,from,next) => {
    console.log(to,666)
    console.log(from,666)
    if(to.name != 'Home'){
        // window.scrollTo(0,0);
    }
  
})
Vue.prototype.$wx = wx
// Vue.prototype.WXconfig = WXconfig
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data:{
      bus:new Vue()
  }
})
