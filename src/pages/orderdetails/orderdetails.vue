<template>
    <div>
        <head-top></head-top>
        <count 
            :order_status="order_status"
            :shipping_status="shipping_status"
            :pay_status="pay_status"
            :timer="timer"
            :ensure_time="ensure_time"
            ></count>
        <order-btn 
            :page="page"
            :order_status="order_status"
            ></order-btn>
        <hr class="hr20" v-if="order_status ==2">
        <take-out :order_status="order_status"></take-out>
        <hr class="hr20">
        <cart-info :cart="cart" :page="page" :shopinfo="shop"></cart-info>
        <expen-ses :delivery_cost1="delivery_cost1" :delivery_cost2="delivery_cost2"></expen-ses>
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
            :timer="timer"
            :ensure_time="ensure_time"
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
        }
    },
    mounted () {
        this.order_info()
    },
    methods:{
        order_info () {
            this.$http({
                method: 'post',
                // url: 'mobile/api/q',
                url:'api/order_info',
                data: {
                    url:'http://api.dqvip.cc/order_info',
                    q_type:'post',
                    order_id:this.$route.query.order_id,
                    order_sn:this.$route.query.order_sn
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                }
            })
                .then(this.getorder_info)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getorder_info (res) {
            // let date = eval('('+res.data+')')
            let date = res.data
            console.log(date,8464)
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
            this.pay_status = date.data.pay_status
            this.shipping_status = date.data.shipping_status
            this.timer = date.data.finish_time
            this.ensure_time = date.data.ensure_time

            this.delivery_cost1 = {desc:'配送费',value:date.data.delivery_cost,name:"delivery_cost"}
            this.delivery_cost2 = {desc:'打包费',value:date.data.packing_expense,name:"delivery_cost"}
            this.shop_info(date.data.shop_id)
        },
        shop_info (shop_id){
            this.$http({
                method: 'post',
                // url: 'mobile/api/q',
                url:"/api/buyer/shop_info",
                data: {
                    url:'http://api.dqvip.cc/buyer/shop_info',
                    q_type:'post',
                    shop_id:shop_id
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                }
            })
                .then(this.getshop_info)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getshop_info (res) {
            // console.log(res.data.data)
            // let date = eval('('+res.data+')')
            let date = res.data
            console.log(date,666)
            this.shop = date.data
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
