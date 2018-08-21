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
                url:"/api/order_info",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    // q_type:'post'
                    order_id:this.$route.query.order_id,
                    order_sn:this.$route.query.order_sn
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.getorder_info)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getorder_info (res) {
            console.log(res.data.data)
            let date = res.data.data
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
                url:"/api/buyer/shop_info",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    // q_type:'post'
                    shop_id:shop_id
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.getshop_info)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getshop_info (res) {
            // console.log(res.data.data)
            this.shop = res.data.data
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
