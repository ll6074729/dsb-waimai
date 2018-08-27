<template>
    <div>
        <head-top></head-top>
        <count 
            :order_status="order_status"
            :shipping_status="shipping_status"
            :pay_status="pay_status"
            ></count>
        <order-btn 
            :page="page"
            :order_status="order_status"
            ></order-btn>
        <hr class="hr20" v-if="order_status ==2">
        <take-out :order_status="order_status"></take-out>
        <hr class="hr20">
        <cart-info :cart="cart" :page="page" :shopinfo="shop"></cart-info>
        <expen-ses></expen-ses>
        <aciti-vity :cartprom="cartprom" :page="page" :coupon="coupon" :user_money="user_money" :integral="integral"></aciti-vity>
        <div class="df">
            <div class="list-name">
                实付款
            </div>
            <div class="price">
                ￥{{order_amount}}
            </div>
        </div>
        <hr class="hr20">
        <mess-age 
            :order_sn="order_sn"
            :address="address"
            :consignee="consignee"
            :user_mobile="user_mobile"
            ></mess-age>
    </div>
</template>
<script>
import HeadTop from "./components/head"
import Count from "./components/count"
import OrderBtn from "../order/components/orderbtn"
import TakeOut from "./components/takeout"
import CartInfo from "../cart/components/cartinfo"
import ExpenSes from "../cart/components/expenses"
import AcitiVity from "../cart/components/activity"
import MessAge from "./components/message"
export default {
    name:"OrderDetails",
    components:{
        HeadTop,
        Count,
        OrderBtn,
        TakeOut,
        CartInfo,
        ExpenSes,
        AcitiVity,
        MessAge
    },
    data () {
        return {
            page:'center',
            consignee:'',
            order_sn:this.$route.query.order_sn,
            address:'',
            user_mobile:'',
            cart:[],
            shop:[],
            cartprom:[],
            coupon:0, //优惠券
            order_amount:0, //实付款
            user_money:0, //使用的余额
            integral:0, //积分
            order_status:0, //订单状态
            shipping_status:0, //配送状态
            pay_status:0, //支付状态
        }
    },
    mounted () {
        this.order_info()
    },
    methods:{
        order_info () {
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                data: {
                    url:'http://api.dqvip.cc/order_info',
                    q_type:'post',
                    order_id:this.$route.query.order_id,
                    order_sn:this.$route.query.order_sn
                },
            })
                .then(this.getorder_info)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getorder_info (res) {
            console.log(res.data.data)
            let date = eval('('+res.data.data+')') 
            this.consignee = date.consignee
            this.address = date.address
            this.user_mobile = date.mobile
            this.cart = date.order_goods
            this.cartprom = date.order_shop_prom
            this.coupon = parseFloat(date.coupon_price)
            this.order_amount = parseFloat(date.order_amount)
            this.user_money = parseFloat(date.user_money)
            this.integral = parseFloat(date.integral)
            this.order_status = date.order_status
            this.pay_status = date.pay_status
            this.shipping_status = date.shipping_status
            this.shop_info(date.shop_id)
        },
        shop_info (shop_id){
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // url:"/api/buyer/shop_info",
                data: {
                    url:'http://api.dqvip.cc/buyer/shop_info',
                    q_type:'post',
                    shop_id:shop_id
                },
            })
                .then(this.getshop_info)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getshop_info (res) {
            // console.log(res.data.data)
            this.shop = eval('('+res.data.data+')') 
        }
    },
}
</script>
<style lang="stylus" scoped>
    .df
        padding 0 5.33vw
        height 13.33vw
        line-height 13.33vw
        font-size 4.26vw
        font-weight bold
        .price
            color #469afe
</style>
