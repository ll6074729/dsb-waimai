<template>
    <div>
        <div class="list"  v-for="item in list" :key="item.id">
            <div>
                <!-- <div class="order-head"> -->
                    <router-link :to="'/shop/'+item.shop.shop_id" class="order-head">
                        <img :src="item.shop.logo" alt="" :onerror="defaultImg">  
                        <div class="shop-box">
                            <div class="shop-name">{{item.shop.shop_name}}</div>
                            <div class="shop-timer">{{item.created_at}}</div>
                        </div>
                    
                    <div class="order-status">
                        <diV v-if="item.pay_status == 0">
                            <p v-if="item.order_status != 3" style="color:#469afe">订单待支付</p>
                            <p v-if="item.order_status == 3" style="color:#469afe">订单已取消</p>
                        </diV>
                        <div v-if="item.pay_status ==1">
                            <p v-if="item.order_status == 0">等待商家接单中</p>
                            <p v-if="item.order_status == 1">商家出餐中</p>
                            <p v-if="item.order_status == 2">
                                <span v-if="item.shipping_status == 0">
                                    骑手取货中
                                </span>
                                <span v-if="item.shipping_status == 1">
                                    骑手配送中
                                </span>
                                <span v-if="item.shipping_status == 2">
                                    订单已收货
                                </span>
                            </p>
                            <p v-if="item.order_status == 3">订单已取消</p>
                            <p v-if="item.order_status == 4">订单已完成</p>
                            <p v-if="item.order_status == 5">商家已取消订单,请联系商家</p>
                        </div>
                    </div>
                </router-link>  
                <order-info :list="item.order_goods" :price="item.order_amount"></order-info>
            </div>
            <order-btn 
                :page="page" 
                :order_status="item.order_status" 
                :order_id="item.order_id" 
                :order_sn="item.order_sn"
                :shop_id="item.shop_id"
                :pay_status="item.pay_status"
                @orderlist="orderlist"
            >
            </order-btn>
            <hr class="hr20">
        </div>
    </div>
    
</template>
<script>
import OrderBtn from "../components/orderbtn"
import OrderInfo from "../components/orderinfo"
export default {
    name:"shopinfo",
    props:{
        list:Array,
    },
    components:{
        OrderBtn,
        OrderInfo
    },
    data () {
        return {
            page:'end',
            defaultName:'迪速帮',
            defaultImg: 'this.src="' + require('../../../assets/img/defaultshop.png') + '"',
        }
    },
    methods:{
        orderlist () {
            this.$emit('orderlist','0')
        },
        order (order_id,order_sn) {
            console.log(order_sn,order_id)
            this.$router.push({path:'/orderdetails',query:{order_sn:order_sn,order_id:order_id}})
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import "~css/style"
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
    .order-info
        padding 5.33vw 8vw
        display flex
        .food-name
            width 32vw
            ellipsis()
        .food-attr
            width 44vw
            ellipsis()
            margin-right auto
            color #999
    .order-price
        display flex
        justify-content flex-end 
        padding 0 8vw 4vw 0    
        font-size 4.26vw
        .const-price
            color #469afe
            font-weight bolder   
            margin-left 6vw        
</style>