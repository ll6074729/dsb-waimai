// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui'
import {Rate,Input,Badge,Form,Loading,MessageBox} from 'element-ui'
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


// import WXconfig from 'st/wx'
Vue.use(AwesomePicker)
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.use(Rate)
Vue.use(Input)
Vue.use(Badge)
Vue.use(Loading)
// Vue.use(MessageBox)

Vue.use(BaiduMap, {
  ak: 'ySYb24WsXpbFzl80OKpgeb2xN2CFKdmB'
})
Vue.config.productionTip = false
Vue.prototype.styleIndex = styleIndex
Vue.prototype.$http = axios
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
