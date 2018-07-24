<template>
    <div class="header">
        <home-swiper></home-swiper>
        <home-head></home-head>
    </div>
</template>
<script>
import HomeSwiper from './components/swiper'
import HomeHead from './components/head'
export default{
    name:'Home',
    components:{
        HomeSwiper,
        HomeHead
    }
}
</script>
<style lang="stylus" scoped>
    .header
        position relative
</style>
