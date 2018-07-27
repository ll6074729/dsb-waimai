<template>
        <div class="shop-product" ref="shop">
            <div>
                <div class="area" 
                    v-for="(item , key) in list" 
                    :key="key"
                    :ref="key"
                    >
                    <div class="cate-title"> {{key}}</div>
                    <div class="item-list">
                        <div class="item" v-for="itemList in item" :key="itemList.id">
                            <div class="shop-left">
                                <div class="shop-img">
                                    <img :src="itemList.img" alt="">
                                </div>
                            </div>
                            <div class="shop-right">
                                <div class="shop-name">
                                    {{itemList.name}}
                                </div>
                                <div class="shop-spec">
                                    {{itemList.spec}}
                                </div>
                                <div class="shop-info">
                                    月售：{{itemList.sale}} | 好评率：{{itemList.zan}}
                                </div>
                                <div class="shop-foot">
                                    <div class="shop-price">
                                        ￥{{itemList.price}}
                                    </div>
                                    <div class="shop-num">
                                        <span>+</span>
                                    </div>
                                </div>
                            </div>
                             
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:"ShopProduct",
    mounted (){
        this.scroll = new BScroll(this.$refs.shop)
    },
    data () {
        return {
            list: {"店长推荐": [{"id": 56,"img": require("../../../assets/img/food.jpg"),"name": "鱼香肉丝盖浇饭鱼香肉丝盖浇饭","spec":"商品说明商品说明商品说明商品说明商品说明","sale":"658","zan":"96%","price":"15.00","num":"100"}, 
                    {"id": 57,"img": require("../../../assets/img/food.jpg"),"name": "鱼香肉丝盖浇饭鱼香肉丝盖浇饭","spec":"商品说明商品说明商品说明商品说明商品说明","sale":"658","zan":"96%","price":"15.00","num":"100"}, 
                    {"id": 58,"img": require("../../../assets/img/food.jpg"),"name": "鱼香肉丝盖浇饭鱼香肉丝盖浇饭","spec":"商品说明商品说明商品说明商品说明商品说明","sale":"658","zan":"96%","price":"15.00","num":"100"}],
                    "烧菜": [{"id": 6,"img": require("../../../assets/img/food.jpg"),"name": "鱼香肉丝盖浇饭鱼香肉丝盖浇饭","spec":"商品说明商品说明商品说明商品说明商品说明","sale":"658","zan":"96%","price":"15.00","num":"100"},
                    {"id": 7,"img": require("../../../assets/img/food.jpg"),"name": "鱼香肉丝盖浇饭鱼香肉丝盖浇饭","spec":"商品说明商品说明商品说明商品说明商品说明","sale":"658","zan":"96%","price":"15.00","num":"100"},
                    {"id": 8,"img": require("../../../assets/img/food.jpg"),"name": "鱼香肉丝盖浇饭鱼香肉丝盖浇饭","spec":"商品说明商品说明商品说明商品说明商品说明","sale":"658","zan":"96%","price":"15.00","num":"100"}]},
           
        }
    }
}
</script>
<style lang="stylus" scoped>
    .item-list >>> .item:last-child 
        border none!important
    .shop-product 
        flex 1
        .area 
            .cate-title
                width 95%
                height 6.66vw
                line-height 6.66vw
                text-align center
                color #999
                background #f7f7f7
                margin  2vw 2.5%
            .item-list
                .item
                    display flex
                    padding 2.66vw 0
                    border-bottom 1px solid #f7f7f7
                    .shop-left
                        .shop-img
                            width 21.33vw
                            height 21.33vw
                            margin 0 2.66vw
                            img 
                                width 100%
                                height 100%
                    .shop-right
                        .shop-name
                            font-size 4vw
                            line-height 5vw
                            font-weight bold
                        .shop-spec
                            font-size 2.66vw
                            color #999
                            margin 1.33vw 0
                            line-height 4vw
                        .shop-info
                            color #999
                            font-size 2.66vw
                        .shop-foot
                            display flex
                            justify-content space-between
                            padding-right 1.33vw
                            font-size 4.26vw
                            margin-top 4vw 
                            .shop-price
                                color #3ea4fd
                                font-weight bold
                            .shop-num
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
