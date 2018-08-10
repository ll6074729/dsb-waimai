<template>
    <div class="swiper-shop">
        <swiper :options="swiperOption"> 
            <swiper-slide v-for="item in list" :key="item.id">
                <div class="box">
                    <div class="box-left">
                        <img :src="item.img" alt="">
                    </div>
                    <div class="box-right">
                        <div class="box-right-title">
                            {{item.name}}
                        </div>
                        <div class="box-right-price">
                            ￥{{item.price}}
                        </div>
                        <div class="box-right-foot">
                            <span>+</span>
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
export default {
    name:"shoprecommend",
    data () {
        return {
            list:[{"id": 56,"img": require("../../../assets/img/food.jpg"),"name": "鱼香肉丝盖浇饭鱼香肉丝盖浇饭","spec":"商品说明商品说明商品说明商品说明商品说明","sale":"658","zan":"96%","price":"15.00","num":"100"}, 
                {"id": 57,"img": require("../../../assets/img/food.jpg"),"name": "鱼香肉丝盖浇饭鱼香肉丝盖浇饭","spec":"商品说明商品说明商品说明商品说明商品说明","sale":"658","zan":"96%","price":"15.00","num":"100"}, 
                {"id": 58,"img": require("../../../assets/img/food.jpg"),"name": "鱼香肉丝盖浇饭鱼香肉丝盖浇饭","spec":"商品说明商品说明商品说明商品说明商品说明","sale":"658","zan":"96%","price":"15.00","num":"100"},
                {"id": 59,"img": require("../../../assets/img/food.jpg"),"name": "鱼香肉丝盖浇饭鱼香肉丝盖浇饭","spec":"商品说明商品说明商品说明商品说明商品说明","sale":"658","zan":"96%","price":"15.00","num":"100"}, 
                {"id": 60,"img": require("../../../assets/img/food.jpg"),"name": "鱼香肉丝盖浇饭鱼香肉丝盖浇饭","spec":"商品说明商品说明商品说明商品说明商品说明","sale":"658","zan":"96%","price":"15.00","num":"100"}],
            swiperOption:{
                autoplay:false,
                slidesPerView : 1.7
            }    
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import "~css/style"
    .swiper-shop
        background-color #f7f7f7
        padding-top 2.66vw
        padding-bottom 2.66vw
        .box
            padding 2.66vw
            background-color #fff
            display flex
            margin-left 2.66vw
            .box-left 
                img 
                    width 21.33vw
                    height 21.33vw
            .box-right
                margin-left 2.66vw    
                .box-right-title
                    font-size 4vw
                    line-height 5vw
                    font-weight bold   
                    ellipsisClamp()
                .box-right-price
                    font-size 3.73vw
                    color #469afe
                    margin 2.13vw 0
                .box-right-foot
                    span
                        display inline-block
                        width 5.33vw
                        height 5.33vw
                        border-radius 50%
                        color #fff
                        background-color #469afe
                        text-align center
                        line-height 5vw
                        font-weight bold   
</style>
