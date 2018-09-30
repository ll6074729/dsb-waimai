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
        <expen-ses :delivery_cost1="delivery_cost1" :delivery_cost2="delivery_cost2" :shopinfo="shop" :floor_amount="floor_amount"></expen-ses>
        <!-- <aciti-vity :cartprom="cartprom" :shopprom="shopprom" :page="page" :coupon="coupon" :user_money="user_money" :integral="integral"></aciti-vity> -->
       <aciti-vity :shopprom="shopprom" v-if="shopprom"></aciti-vity>
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
import ExpenSes from "./components/expensess"
import AcitiVity from "./components/activity"
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
            floor_amount:0,
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
                }
            })
                .then(this.getorder_info)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getorder_info (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            console.log(date)
            this.shopprom = date.data.order_shop_prom
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
            this.floor_amount = date.data.floor_amount
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
