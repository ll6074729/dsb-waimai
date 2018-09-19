<template>
    <div class="warpper">
        <swiper :options="swiperOption">
            <!-- slides -->
            <swiper-slide v-for="item in banner" :key="item.ad_id">
                <a href="javascript:;">
                    <img class="swiper-img" :src="item.ad_code" :alt="item.ad_name" srcset="">
                </a>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <div class="mask">
            <img src="../img/border-bottom.png" alt="">
        </div>
        <img src="../../../assets/img/banner1.png" alt="" style="width:100%" v-if="banner.length < 1">
    </div>
</template>
<script>
export default {
    name:'HomeswiperBanner',
    props:{
        banner:Array
    },
    data () {
        return {
            swiperOption: {
                autoplay: true,
                // loop:true,
                pagination: {
                el: ".swiper-pagination"
                }
            },
        }
    }
}
</script>
<style lang="stylus" scoped>
.warpper
    height 53.35vw
    position relative
    .swiper-img
        height 53.35vw
        width 100%
    .mask
        position absolute
        bottom 0
        z-index 10    
        img 
            width 100%

        
</style>
