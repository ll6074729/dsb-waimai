<template>
    <div>
        <head-top></head-top>
        <count 
            :order_status="order_status"
            :shipping_status="shipping_status"
            :pay_status="pay_status"
            :timer="timer"
            :ensure_time="ensure_time"
            :user_note="user_note"
            :ps_id="ps_id"
            :is_comment="is_comment"
            ></count>
        <order-btn 
            :page="page"
            :order_status="order_status"
            :pay_status="pay_status"
            :shop_id="this.shop_id"
            :order_id="this.$route.query.order_id"
            :is_comment="is_comment"
            ></order-btn>
        <hr class="hr20" v-if="order_ps">
        <take-out :order_status="order_status" :order_ps="order_ps"></take-out>
        <hr class="hr20">
        <cart-info :cart="cart" :page="page" :shopinfo="shop" ></cart-info>
        <expen-ses :delivery_cost1="delivery_cost1" :delivery_cost2="delivery_cost2"></expen-ses>
        <aciti-vity :cartprom="cartprom" :shopprom="shopprom" :page="page" :coupon="coupon" :user_money="user_money" :integral="integral"></aciti-vity>
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
            :timer="timer"
            :ensure_time="ensure_time"
            :user_note="user_note"
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
            shopprom:[],
            delivery_cost1:{},
            delivery_cost2:{},
            cartprom:[],
            coupon:0, //优惠券
            order_amount:0, //实付款
            user_money:0, //使用的余额
            integral:0, //积分
            order_status:0, //订单状态
            shipping_status:0, //配送状态
            pay_status:0, //支付状态
            timer:'', //到达时间
            ensure_time:'', //接单时间
            user_note:'',
            ps_id:0,
            order_ps:null,
            shop_id:0,
            is_comment:0,
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
                // url:'api/order_info',
                data: {
                    url:'http://api.dqvip.cc/order_info',
                    q_type:'post',
                    order_id:this.$route.query.order_id,
                    order_sn:this.$route.query.order_sn
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY1YWE4OTRmYmZkMDRiNzU4Yzk2ZGRlOTY0NzcyMWQ5M2IzM2Q1Mzk1NGZlNTAwMmFlNTQ1ODNkMjZlNjZiMDhiMWYxYmI3ZGIyOWY5MzYzIn0.eyJhdWQiOiIyIiwianRpIjoiZjVhYTg5NGZiZmQwNGI3NThjOTZkZGU5NjQ3NzIxZDkzYjMzZDUzOTU0ZmU1MDAyYWU1NDU4M2QyNmU2NmIwOGIxZjFiYjdkYjI5ZjkzNjMiLCJpYXQiOjE1MzU3MTE1MTIsIm5iZiI6MTUzNTcxMTUxMiwiZXhwIjoxNTM4MzAzNTEyLCJzdWIiOiI2NSIsInNjb3BlcyI6WyIqIl19.sr8YCf3ZR1Tc8P4IU8gLK15WTdRwQy-DdZNxSND_C-sTohzhEfuAz6ZqVPnUmCFU9Stb7o94vKBj-SFg8695SxdnQ6KTsln5jbl0zGqZPpa00nyW-2q_PDu8aKTv78inCEtl_bfsJ7XLz9wOnn8LfM9TmQJz4OXRI52baKpsBZ5Dxapp90uvGFlK26rAuzClXasvCSlH9YuC7J0rLP8yhuc8iFscWxN8YhARPIswVlG9_Mij2-DJdwAiqE_3XPxHPLrxIWsD3Ud-NYs0YbqzkXrEAEbDhllxuDW1VxNH1nvX0qNhvPUZ7WV3GuOfJgbIECvpaBfpQ7EWPZp1bQVFktgutGO0RMbATjE6IaD-tlycB46wIxxintgrDg-KGIowdcGXY274hXJCi8smPF0zPgN7UIT-lnddC6ySkldyWtcdWM0jzsUQvXwt2tmoJ1izcysJHkWQUTRU7Y3BB9oEL1qERCa8qCp8mXnMmXNTtUzRhRB2K2-IBstYKKFdvNl4x0FQMehqSHevkAdOixObkwKI5xoHxqdVouv1W01QeeU4nmpT12yQqZl6XL8b5tNBlAel8CbEd23tc3wPDeXdoxyB-kxYGDqqbocRI4rZs5wnuY32D8bweuv3iCf6RgpIgkKNpdWoZmbNW5QOWMfDCn7BRsLG1VXNs4OLryFRNCk'
                // }
            })
                .then(this.getorder_info)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getorder_info (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            this.consignee = date.data.consignee
            this.address = date.data.address
            this.user_mobile = date.data.mobile
            this.cart = date.data.order_goods
            this.cartprom = date.data.order_shop_prom
            this.coupon = parseFloat(date.data.coupon_price)
            this.order_amount = parseFloat(date.data.order_amount)
            this.user_money = parseFloat(date.data.user_money)
            this.integral = parseFloat(date.data.integral)
            this.order_status = date.data.order_status
            this.order_sn = date.data.order_sn
            this.pay_status = date.data.pay_status
            this.shipping_status = date.data.shipping_status
            this.user_note = date.data.user_note
            if(date.data.finish_time){
                this.timer = date.data.finish_time.replace(/\-/g, "/")
            }else{
                this.timer = date.data.finish_time
            }
            if(date.data.ensure_time){
                this.ensure_time = date.data.ensure_time.replace(/\-/g, "/")
            }else{
                this.ensure_time = date.data.ensure_time
            }
            this.ps_id = date.data.ps_id
            this.order_ps = date.data.order_ps
            this.shop_id = date.data.shop_id
            this.is_comment = date.data.is_comment
            this.shop = date.data.order_shop
            this.delivery_cost1 = {desc:'配送费',value:date.data.delivery_cost,name:"delivery_cost"}
            this.delivery_cost2 = {desc:'打包费',value:date.data.packing_expense,name:"delivery_cost"}
            this.shopprom = JSON.parse(this.$store.state.shopprom)
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
