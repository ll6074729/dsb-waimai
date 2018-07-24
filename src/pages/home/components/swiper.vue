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
    name:'HomeSwiper',
    data () {
        return {
            swiperOption: {
                autoplay: true,
                loop:true,
                pagination: {
                el: ".swiper-pagination"
                }
            },
            imgurl:[{url:'https://goss.veer.com/creative/vcg/veer/612/veer-161548038.jpg',id:1},{url:'http://www.quanjing.com/image/2018image/homepage/1.jpg?v=8',id:2},{url:'http://www.quanjing.com/image/2018image/homepage/3.jpg?v=8',id:3}],
        }
    }
}
</script>
<style lang="stylus" scoped>
.warpper
    height 53.35vw
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
