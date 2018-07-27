// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import ElementUI from 'element-ui'
import {Rate,Input,Badge} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'css/reset.css'
import 'css/icon.css'
import 'swiper/dist/css/swiper.css'
import 'css/style.css'
Vue.use(VueAwesomeSwiper)
Vue.use(ElementUI)
Vue.use(Rate)
Vue.use(Input)
Vue.use(Badge)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
