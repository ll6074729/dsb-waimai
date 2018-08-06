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
  mounted () {
    this.styleIndex.wxShowMenu()
  },
  methods:{
  }
}
</script>

<style>
</style>
