<template>
    <div class="tip">
        <div class="tip-img">
            <img src="../img/tip.png" alt="">
        </div>
        <div class="tip-content">
            <swiper :options="swiperOption">
                <swiper-slide v-for="item in tips" :key="item.id">
                        {{item.content}}
                </swiper-slide> 
            </swiper>
        </div>
   </div>
</template>
<script>
export default {
    name:'HomeswiperTip',

    data () {
        return {
            swiperOption:{
                autoplay:300,
                loop:true,
                direction : 'vertical',
                // slidesPerView: 2,
            },
            tips:[{content:"学生一放假商家集体休息 请不要点餐家集体休息 请不要点餐家集体休息 请不要点餐",id:1},{content:"现在是放假时间现在是放假时间现在是放假时间现在是放假时间现在是放假时间现在是放假时间现在是放假时间",id:2}]
        }
    },

}
</script>
<style lang="stylus" scoped>
@import "~css/style"
    .tip
        position relative
        padding 2.93vw
        .tip-img
            width 4.5vw
            height 4.8vw
            display inline-block
            img 
                width 100%
                height 100%
        .tip-content
            height 4.8vw
            display inline-block
            margin-left 3vw
            line-height 4.8vw
            width 90%
            vertical-align middle
            overflow hidden
            .swiper-slide
                height 100%
                // width 100%!important
                ellipsis()
</style>

