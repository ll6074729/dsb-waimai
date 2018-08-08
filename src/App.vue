<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'
import wx from 'weixin-js-sdk'
export default {
  name: 'App',
  data () {
    return {

    }
  },
  mounted () {
    this.styleIndex.wxShowMenu()
    this.$store.dispatch('changeUser')
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
