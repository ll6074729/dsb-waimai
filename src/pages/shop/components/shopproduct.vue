<template>
        <div class="shop-product" ref="shop">
            <ul>
                <li class="area" 
                    v-for="(item , index) in goods" 
                    :key="index"
                    :ref="index"
                    >
                    <div class="cate-title" v-if="!(item.goods.length ==0)"> {{item.cate_name}}</div>
                    <div class="item-list">
                        <div class="item" v-for="itemList in item.goods" :key="itemList.cate_id">
                            <div class="shop-left">
                                <div class="shop-img">
                                    <img :src="itemList.details_figure" alt=""> 
                                </div>
                            </div>
                            <div class="shop-right">
                                <div class="shop-name">
                                    {{itemList.title}}
                                </div>
                                <div class="shop-spec">
                                    {{itemList.intro}}
                                </div>
                                <div class="shop-info">
                                    销量：{{itemList.sold_num}} | 好评率：{{itemList.sold_num}}
                                </div>
                                <div class="shop-foot">
                                    <div class="shop-price">
                                        ￥{{itemList.price}}
                                    </div>
                                    <div class="shop-num">
                                        <div class="minus">-</div>
                                        <span>1</span>
                                        <div class="plus">+</div>
                                    </div>
                                </div>
                            </div>
                             
                        </div>
                    </div>
                </li>
            </ul>
        </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:"ShopProduct",
    mounted (){
        this.scroll = new BScroll(this.$refs.shop)
    },
    props:{
        goods:Array
    },
    data () {
        return {
        }
    }
}
</script>
<style lang="stylus" scoped>
    .item-list >>> .item:last-child 
        border none!important
    .shop-product 
        flex 1
        // position absolute
        // top 2vw
        // left 26.66vw
        // right 0
        // bottom 0
        // overflow hidden
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
                        flex 1
                        min-width 0
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
                                span 
                                    line-height 5vw
                                    margin 0 4vw
                                .minus,.plus
                                    width 5.33vw
                                    height 5.33vw
                                    border-radius 50%
                                    box-sizing border-box
                                    font-weight bold
                                    text-align center
                                    display inline-block
                                .minus
                                    border solid 1px #469afe;
                                    color #469afe
                                    line-height 4vw
                                .plus
                                    background-color #469afe
                                    color #fff
                                    line-height 5vw         
</style>
