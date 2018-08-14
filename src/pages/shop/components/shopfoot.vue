<template>
<div class="shop-cart-box" v-show="isBuy">
    <div class="shop-foot"  >
        <div  class="item" @click="iscartstatus()">
            <el-badge value="1" :max="99">
                <img src="../../../assets/img/shoppingcart.png" alt="">
            </el-badge>
        </div>
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
    <div class="cart" v-show="iscartshow">
        <div class="cart-head">
            <div class="cart-title">购物车</div>
            <div class="cart-clean" @click="cleanCart">清空</div>
        </div>
        <div class="isgoods" ref="isgoods" v-if="cart.length>=1">
            <ul>
                <li class="isgoods-item" v-for="item in cart" :key="item.cart_id">
                    <div class="isgood-left">
                        <div class="isgood-img">
                            <img src="../../../assets/img/food.jpg" alt="">
                        </div>
                    </div>
                    <div class="isgood-right">
                        <div class="isgood-name">{{item.goods.title}}</div>
                        <div class="isgood-attr">
                            <span>大份</span>
                            <span>特辣</span>
                            <span>加肉</span>
                        </div>
                        <div class="isgood-foot">
                            <div class="isgood-price">￥{{item.goods.price}}</div>
                            <div class="isgood-num">
                                <div class="minus">-</div>
                                <span>{{item.goods_num}}</span>
                                <div class="plus">+</div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div v-if="cart.length<1">
            暂时没有
        </div>
    </div>
</div>
    
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:"ShopFoot",
    props:{
        isBuy: Boolean,
        cart:Array,
    },
    mounted() {
        
    },
    updated () {
        this.scroll = new BScroll(this.$refs.isgoods)
    },
    data () {
        return{
            iscartshow:false,
        }
    },
    methods:{
        iscartstatus () {
            this.iscartshow = !this.iscartshow
        },
        cleanCart () {
            this.$http({
                 method: 'delete',
                // url: 'mobile/api/q',
                url:"/api/buyer/cart_clear",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    // q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.cleanCartList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        cleanCartList (res) {
            this.$emit('cleanCart','false')
            if(res.data.status == 200){
                this.$message({
                    message: '添加成功',
                    type: 'success',
                    // duration:0
                });
            }else{
                this.$message({
                    message: '添加失败',
                    type: 'waring',
                    // duration:0
                });
            }
            
        }
    }
}
</script>
<style lang="stylus" scoped>
.shop-cart-box
    height 100%
    .shop-foot 
        display flex
        justify-content space-between
        z-index 12
        position fixed
        bottom 0
        width 100%
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
        position relative
        background-color #fff
        width 100%
        height 100%
        bottom 13.33vw
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
            position absolute
            top 13.33vw
            left 0
            right 0
            bottom 26.66vw
            overflow hidden
            z-index 1
            height 100%
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
