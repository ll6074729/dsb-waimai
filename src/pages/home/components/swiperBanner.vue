<template>
    <div class="warpper">
        <swiper :options="swiperOption">
            <!-- slides -->
            <swiper-slide v-for="item in imgurl" :key="item.id">
                <a href="javascript:;">
                    <img class="swiper-img" :src="item.url" alt="" srcset="">
                </a>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <div class="mask">
            <img src="../img/border-bottom.png" alt="">
        </div>
    </div>
</template>
<script>
export default {
    name:'HomeswiperBanner',
    data () {
        return {
            swiperOption: {
                // autoplay: true,
                // loop:true,
                pagination: {
                el: ".swiper-pagination"
                }
            },
            imgurl:[{url:require('../img/banner@3x.png'),id:1},{url:'http://www.quanjing.com/image/2018image/homepage/1.jpg?v=8',id:2},{url:'http://www.quanjing.com/image/2018image/homepage/3.jpg?v=8',id:3}],
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
