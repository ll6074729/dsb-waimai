<template>
    <div v-if="list.length > 0">
        <div class="title title-94">
            大牌推荐
        </div>
        <div class="recommend-box">
            <swiper :options="swiperOption"> 
                <swiper-slide v-for="item in list" :key="item.shop_id">
                    <router-link tag="div" :to="'/shop/'+item.shop_id">
                        <img :src="item.logo" alt="" srcset="" :onerror="defaultImg">
                        <p>{{item.shop_name}}</p>
                        <span v-if="item.status == '0'" class="status0">
                            休息中
                        </span>
                        <span v-else-if="item.status=='1'" class="status1">
                            大牌推荐
                        </span>
                    </router-link>
                </swiper-slide>
                <div class="swiper-scrollbar"></div>
            </swiper>
        </div>
    </div>
</template>
<script>
export default {
    name:"recommend",
    props:{
        list:Array
    },
    data () {
        return {
            swiperOption: {
                // autoplay: true,
                slidesPerView : 3.5,
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
            },
            defaultImg: 'this.src="' + require('../../../assets/img/defaultshop.png') + '"'
        }
    },
    methods:{
        recommend () {
            console.log(this.list,456)
        }
    },
    mounted () {
        this.recommend()
    }
}
</script>
<style lang="stylus" scoped>
    .swiper-slide
        padding 4.26vw 0
        text-align center
        img 
            width 16vw
            height 16vw
        p
            ellipsisClamp()    
            margin-top 2.66vw
            font-size 3.2vw
            height 8vw
            line-height 4vw
            font-weight bold
        span 
            display inline-block
            margin-top 2.66vw
            padding 1.6vw 2.66vw
            border 1px solid #dbdbdb
            font-size 2.66vw
        .status0
            color #999
        .status1
            color #469afe        
            border-color #469afe
</style>
