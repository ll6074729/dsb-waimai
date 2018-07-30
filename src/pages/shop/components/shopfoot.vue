<template>
<div>
    <div class="shop-foot">
        <el-badge value="" :max="99" class="item">
            <img src="../../../assets/img/shoppingcart.png" alt="">
        </el-badge>
        <div class="shop-cart-info">
            <div class="shop-price">
                <span class="price1">￥23.00</span>
                <span class="price2">￥30.00</span>
            </div>
            <div class="distribution">
                配送费: ￥1
            </div>
        </div>
        <router-link tag="div" class="buybtn" to="/cart">
            立即下单
        </router-link>
    </div>
    <!-- <div class="cart">
        <div class="cart-head">
            <div class="cart-title">购物车</div>
            <div class="cart-clean">清空</div>
        </div>
        <div class="isgoods" ref="isgoods">
            <div>
                <div class="isgoods-item">
                    <div class="isgood-left">
                        <div class="isgood-img">
                            <img src="../../../assets/img/food.jpg" alt="">
                        </div>
                    </div>
                    <div class="isgood-right">
                        <div class="isgood-name">鱼香肉丝盖浇饭</div>
                        <div class="isgood-attr">
                            <span>大份</span>
                            <span>特辣</span>
                            <span>加肉</span>
                        </div>
                        <div class="isgood-foot">
                            <div class="isgood-price">￥12.00</div>
                            <div class="isgood-num">
                                <div class="minus">-</div>
                                <span>1</span>
                                <div class="plus">+</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="isgoods-item">
                    <div class="isgood-left">
                        <div class="isgood-img">
                            <img src="../../../assets/img/food.jpg" alt="">
                        </div>
                    </div>
                    <div class="isgood-right">
                        <div class="isgood-name">鱼香肉丝盖浇饭</div>
                        <div class="isgood-attr">
                            <span>大份</span>
                            <span>特辣</span>
                            <span>加肉</span>
                        </div>
                        <div class="isgood-foot">
                            <div class="isgood-price">￥12.00</div>
                            <div class="isgood-num">
                                <div class="minus">-</div>
                                <span>1</span>
                                <div class="plus">+</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="isgoods-item">
                    <div class="isgood-left">
                        <div class="isgood-img">
                            <img src="../../../assets/img/food.jpg" alt="">
                        </div>
                    </div>
                    <div class="isgood-right">
                        <div class="isgood-name">鱼香肉丝盖浇饭</div>
                        <div class="isgood-attr">
                            <span>大份</span>
                            <span>特辣</span>
                            <span>加肉</span>
                        </div>
                        <div class="isgood-foot">
                            <div class="isgood-price">￥12.00</div>
                            <div class="isgood-num">
                                <div class="minus">-</div>
                                <span>1</span>
                                <div class="plus">+</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="isgoods-item">
                    <div class="isgood-left">
                        <div class="isgood-img">
                            <img src="../../../assets/img/food.jpg" alt="">
                        </div>
                    </div>
                    <div class="isgood-right">
                        <div class="isgood-name">鱼香肉丝盖浇饭</div>
                        <div class="isgood-attr">
                            <span>大份</span>
                            <span>特辣</span>
                            <span>加肉</span>
                        </div>
                        <div class="isgood-foot">
                            <div class="isgood-price">￥12.00</div>
                            <div class="isgood-num">
                                <div class="minus">-</div>
                                <span>1</span>
                                <div class="plus">+</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="isgoods-item">
                    <div class="isgood-left">
                        <div class="isgood-img">
                            <img src="../../../assets/img/food.jpg" alt="">
                        </div>
                    </div>
                    <div class="isgood-right">
                        <div class="isgood-name">鱼香肉丝盖浇饭</div>
                        <div class="isgood-attr">
                            <span>大份</span>
                            <span>特辣</span>
                            <span>加肉</span>
                        </div>
                        <div class="isgood-foot">
                            <div class="isgood-price">￥12.00</div>
                            <div class="isgood-num">
                                <div class="minus">-</div>
                                <span>1</span>
                                <div class="plus">+</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="isgoods-item">
                    <div class="isgood-left">
                        <div class="isgood-img">
                            <img src="../../../assets/img/food.jpg" alt="">
                        </div>
                    </div>
                    <div class="isgood-right">
                        <div class="isgood-name">鱼香肉丝盖浇饭</div>
                        <div class="isgood-attr">
                            <span>大份</span>
                            <span>特辣</span>
                            <span>加肉</span>
                        </div>
                        <div class="isgood-foot">
                            <div class="isgood-price">￥12.00</div>
                            <div class="isgood-num">
                                <div class="minus">-</div>
                                <span>1</span>
                                <div class="plus">+</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> -->
</div>
    
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:"ShopFoot",
    mounted() {
        // this.scroll = new BScroll(this.$refs.isgoods)
    },
    data () {
        return{

        }
    }
}
</script>
<style lang="stylus" scoped>

    .shop-foot 
        display flex
        justify-content space-between
        z-index 12
        position relative
        background-color #fff;
        .item
            box-sizing border-box
            width 13.33vw
            height 13.33vw
            text-align center
            line-height 10vw
            border-radius 50%
            background-color #f7f7f7
            border 1.33vw solid #fff
            margin-top -1.33vw
            margin-left 4vw
            img 
                width 6.4vw
                height 5.33vw
        .shop-cart-info
            box-shadow 0px -5px 20px 0px rgba(0, 0, 0, 0.05)
            height 13.33vw
            line-height 6.66vw
            flex 1
            padding-left 4vw
    .cart
        position absolute
        background-color #fff
        width 100%
        bottom 13.33vw
        max-height 100vw
        z-index 10
        .cart-head
            height 13.33vw
            line-height 13.33vw
            display flex
            padding 0 2.66vw
            justify-content space-between
            background-color #f7f7f7
            font-size 4.26vw
        .isgoods
            .isgoods-item
                // height 26.66vw
                display flex
                padding 2.66vw
                border-bottom 1px solid #f7f7f7
                .isgood-left
                    width 20vw
                    height 20vw
                    img 
                        width 20vw
                        height 20vw
                .isgood-right 
                    flex 1
                    padding-left 2.66vw
                    .isgood-name
                        font-size 4.26vw
                        font-weight bold
                    .isgood-attr
                        font-size 3.73vw
                        color #999
                        margin 3.73vw 0
                        span 
                            margin-right 5.33vw
                    .isgood-foot
                        .isgood-price
                            float left
                            color #3ea4fd
                            font-size 4.26vw
                            font-weight bold
                        .isgood-num
                            float right 
                            display flex
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
                                
                            .minus
                                border solid 1px #469afe;
                                color #469afe
                                line-height 4vw
                            .plus
                                background-color #469afe
                                color #fff
                                line-height 5vw

</style>
