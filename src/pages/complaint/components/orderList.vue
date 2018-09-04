<template>
    <div v-if="ordershow">
        <div class="backg" @click="changeshow"></div>
        <div class="order" v-if="ordershow">
            <div class="order-title" @click="changeshow">
                选择投诉订单
            </div>
            <div class="order-list" ref="orderlist" v-if="historyOrder.length > 0">
                <ul>
                    <li class="order-item" v-for="item in historyOrder" :key="item.order_id" @click="chooesorder(item.order_id)">
                        <div class="order-head">
                            <img :src="item.shop.logo" alt="" :onerror="defaultImg">
                            <div class="shop-box">
                                <div class="shop-name">{{item.shop.shop_name}}</div>
                                <div class="shop-timer">{{item.created_at}}</div>
                            </div>
                        </div>
                        <div class="goods">
                            <div class="goodsinfo">
                                {{item.order_goods[0].goods_name}}等{{item.order_goods.length}}件商品
                            </div>
                            <div class="goods-money">
                                ￥{{item.order_amount}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="order-list-no" v-if="historyOrder.length < 1">
                暂时没有订单可供您投诉,请您先去下单哟~！
            </div>
        </div>
    </div>
    
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:"orderlist",
    props:{
        historyOrder:Array,
        ordershow:Boolean
    },
    mounted () {
        // this.scroll = new BScroll(this.$refs.orderlist,{
        //     click:true
        // })
    },
    methods:{
        changeshow () {
            // this.ordershow = !this.ordershow 
            this.$emit('changeshow',!this.ordershow )
        },
        chooesorder (order_id) {
            // console.log(order_id)
            this.changeshow()
            this.$emit('changeorder',order_id)
        }
    },
    data () {
        return {
            defaultImg:'this.src="' + require('../../../assets/img/defaultshop.png') + '"'
        }
    }
}
</script>
<style lang="stylus" scoped>
    .backg
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        background rgba(0,0,0,0.3)
    .order
        position fixed
        bottom 0
        left 0
        right 0
        top 25%
        background #fff
        .order-title
            text-align center
            padding 5vw 0
            border-bottom 1px solid #f7f7f7 
        .order-list-no
            text-align center
            margin-top 3vw    
        .order-list
            position absolute
            top 13.32vw
            left 0
            right 0
            .order-item
                padding 3vw 0
                border-bottom 1px solid #eee
                .order-head
                    display flex
                    padding 2.66vw
                    img 
                        width 8vw
                        height 8vw
                    .shop-box
                        margin-left 2.66vw
                        margin-right auto  
                        .shop-name
                            font-size 3.73vw
                            font-weight bolder
                        .shop-timer
                            font-size 3.2vw
                            color #999
                            margin-top 2vw
                    .order-status
                        line-height 9.66vw   
                        font-size 3.73vw
                        color #469afe   
            .goods     
                display flex
                padding-left 13.32vw
                padding-right 8vw
                justify-content space-between
                .goodsinfo
                    font-size 3.73vw
                    color #999

</style>

