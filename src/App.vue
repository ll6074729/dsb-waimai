<template>
  <div id="app" v-cloak class="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>  
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import axios from 'axios'
import wx from 'weixin-js-sdk'
export default {
  name: 'App',
  data () {
    return {
      defaultImg: 'this.src="' + require('./assets/img/defaultshop.png') + '"'
    }
  },
  mounted () {
    this.styleIndex.wxShowMenu()
    // axios.defaults.baseURL = 'http://api.dqvip.cc';
    // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // this.$store.dispatch('changeUser')
  },
  methods:{

  },
  watch:{
    '$route' () {
      // this.styleIndex.getUser()

    },
  }
}
</script>

<style>

</style>
