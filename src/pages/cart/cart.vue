<template>
    <div>
        <cart-header></cart-header>
        <hr class="hr20">
        <cart-info :cart="cart" :shopinfo="shopinfo"></cart-info>
        <cost 
            :delivery_cost="delivery_cost" 
            :coupon="coupon" 
            :couponList="couponList" 
            :cartprom="cartprom" 
            :desc="desc"
            :balance="balance"
            :integral="integral"
            :rulingPrice="rulingPrice"
            :integral_num="integral_num"
            :balance_money="balance_money"
            @getintegral_num="getintegral_num"
            @getbalance_money="getbalance_money"
            @setcoupon="setcoupon"
            @getdesc="getdesc"
            @getbalance ="getbalance"
            @getintegral ="getintegral"
            ></cost>
        <hr class="hr20">
        <pay-type @payCode="payCode"></pay-type>
        <coupon-list :couponList="couponList" @changecoupon="changecoupon" :iscoupon="iscoupon" @setcoupon="setcoupon" :costPrice="costPrice" :rulingPrice="rulingPrice"></coupon-list>
        <div class="buy-now">
            <div class="paytype db">待支付</div>
            <div class="payprice db">
                <span class="price1">
                    ￥{{rulingPrice}}
                </span>
                <span class="price2">
                    ￥{{costPrice}}
                </span>
            </div>
            <div class="buybtn fr" @click="buybtn" v-loading.fullscreen.lock="fullscreenLoading">
                立即购买
            </div>
            <!-- <router-link class="buybtn fr" tag="div" to="/pay">
                
            </router-link> -->
        </div>
    </div>
</template>
<script>
import CartHeader from "./components/cartheader"
import CartInfo from "./components/cartinfo"
import Cost from "./components/Cost"
import PayType from "./components/paytype"
import CouponList from "./components/couponList"
export default {
    name:"Cart",
    components:{
        CartHeader,
        CartInfo,
        Cost,
        PayType,
        CouponList,
    },
    data () {
        return {
            cart:[],
            shopinfo:[],
            delivery_cost:[],
            costPrice:0, //原价
            rulingPrice:0, //折扣价
            couponList:[],
            coupon:{},
            iscoupon:false,
            paycode:'wechat',
            shopprom:JSON.parse(this.$store.state.shopprom),
            cartprom:[],
            cart_id:[],
            fullscreenLoading: false,
            desc:"",
            integral:"",
            balance:"",
            balance_money:'',
            integral_num:'',
        }
    },
    mounted () {
        this.init()
        this.pushshopinfo()
        this.DeliveryList()
        this.coupon_list()
        this.userinfo()
    },
    watch:{
        integral_num () {
            var integral_num = this.integral_num || 0
            this.money()
            //判断是否已经使用其他支付
            if(this.balance_money > 0){
                this.rulingPrice = this.rulingPrice - this.balance_money
            }
            // 判断余额是否超过支付金额 或者小于支付金额
            if(integral_num/100 > parseFloat(this.rulingPrice)){
                this.integral_num = parseFloat(this.rulingPrice) * 100
                
            }else if(integral_num/100 < parseFloat(this.rulingPrice)){
                this.rulingPrice = (parseFloat(this.rulingPrice) - parseFloat(integral_num)/100).toFixed(2)
            }else if(integral_num/100 == parseFloat(this.rulingPrice)){
                this.rulingPrice = 0
            }
        },
        balance_money (){
            var balance_money = this.balance_money || 0
            this.money()
            //判断是否已经使用其他支付
            if(this.integral_num > 0){
                this.rulingPrice = this.rulingPrice - this.integral_num/100
            }
            // 判断余额是否超过支付金额 或者小于支付金额
            if(balance_money > parseFloat(this.rulingPrice)){
                this.balance_money = this.rulingPrice
                
            }else if(balance_money < parseFloat(this.rulingPrice)){
                this.rulingPrice = (parseFloat(this.rulingPrice) - balance_money).toFixed(2)
            }else if(balance_money == parseFloat(this.rulingPrice)){
                this.rulingPrice = 0
            }
        },
        coupon () {
            // 判断原价是否满足优惠券的金额
            if(this.costPrice > parseFloat(this.coupon.condition)){
                this.rulingPrice = this.rulingPrice - parseFloat(this.coupon.money)
            }
        }
    },
    methods:{
        // 可使用的余额
        getbalance_money (msg) {
            this.balance_money = parseFloat(msg)
        },
        getintegral_num (msg) {
            this.integral_num = parseFloat(msg)
        },
        // 余额
        getbalance (msg) {
            this.balance = msg
        },
        // 积分
        getintegral (msg) {
            this.integral = msg
        },
        // 描述
        getdesc (msg) {
            this.desc = msg
        },
        // 结算
        buybtn(){
            this.fullscreenLoading = true;
            this.$http({
                method: 'post',
                // url: 'mobile/api/q',
                url:"/api/buyer/submit_order",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    shop_id:this.$route.params.id,
                    address_id:JSON.parse(this.$store.state.defaultAddress).address_id,
                    pay_code:this.paycode,
                    delivery_type:"0",
                    user_note:this.desc,
                    cart_id:this.cart_id
                    // q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
            .then(this.buybtnafter)
            .catch(function (error) {
                console.log(error);
            })
        },
        buybtnafter (res) {
            console.log(res)
            this.fullscreenLoading = false;
        },
        // 选择支付方式
        payCode(type){
            this.paycode = type
        },
        // 选中优惠券
        setcoupon (msg) {
            this.iscoupon = msg
        },
        changecoupon (msg) {
            // console.log(msg)
            this.coupon = msg
        },
        // 计算价钱
        money () {
            let cart = this.cart
            let total = 0
            for(let i in cart){
                total += ((parseFloat(cart[i].goods.price) + parseFloat(cart[i].spec_price)) * cart[i].goods_num) 
            }
            
            // 加配送费
            for(let i =0;i<2;i++){
                total += parseFloat(this.delivery_cost[i].value)
            }
            
            this.costPrice = total.toFixed(2)
            this.rulingPrice = total.toFixed(2)
            // console.log(total,1691)
            // 满减
            for(let i in this.shopprom[0]){
                console.log(this.costPrice,i)
                if(this.costPrice > parseFloat(this.shopprom[0][i].condition)){
                    // console.log(this.shopprom[0][i].condition,i)
                    let Rprice = parseFloat(this.costPrice) - parseFloat(this.shopprom[0][i].money)
                    this.rulingPrice = Rprice.toFixed(2)
                    this.cartprom.push(this.shopprom[0][i])
                    break 
                }else{
                    // console.log(i)
                }
            }
            // console.log(this.rulingPrice,1691)
            // console.log(this.rulingPrice,993)
            // 赠品
            for(let i in this.shopprom[1]){
                // console.log(this.shopprom[1],993)
                if(this.costPrice > parseFloat(this.shopprom[1][i].condition)){
                    // console.log(this.shopprom[1][i],887744)
                    this.cartprom.push(this.shopprom[1][i])
                    break
                }
            }
            // 首单
            // if(!this.shopprom[2]){
            //     for(let i in this.shopprom[2]){
            //         this.cartprom.push(this.shopprom[2][i])
            //     }
            // }
            
        },
        // 初始化购物车
        init () {
            this.$http({
                method: 'post',
                // url: 'mobile/api/q',
                url:"/api/buyer/cart_list",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    shop_id:this.$route.params.id,
                    // q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.initCart)
                .catch(function (error) {
                    console.log(error);
                })
        },
        initCart (res) {
            console.log(res)
            this.cart = res.data.data
            var cart_id = []
            for(let i in this.cart){
                cart_id.push(this.cart[i].cart_id)
            }
            this.cart_id = cart_id
            this.money()
        },
        pushshopinfo () {
            this.$http({
                method: 'post',
                // url: 'mobile/api/q',
                url:"/api/buyer/shop_info",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    shop_id:this.$route.params.id,
                    // q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
            .then(this.getshopinfo)
            .catch(function (error) {
                console.log(error);
            })
        },
        getshopinfo (res) {
            this.shopinfo = res.data.data
        },
        // 获取配置文件
        DeliveryList () {
            this.$http({
                method: 'get',
                // url: 'mobile/api/q',
                url:"/api/init",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    // q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.getDeliveryList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        userinfo () {
            this.$http({
                method: 'get',
                // url: 'mobile/api/q',
                url:"/api/user_info",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    // q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.getuserinfo)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getuserinfo (res) {
            // console.log(res,1993)
            let date = res.data
            console.log(date,1993)
            this.balance = date.data.moeny
            this.integral = date.data.points
        },
        getDeliveryList (res) {
            let date = res.data
            console.log(date)
            this.delivery_cost = date.data
            let Distribution = parseFloat(date.data[0].value)
            // this.delivery_cost = Distribution.toFixed(2)
        },
        coupon_list () {
            this.$http({
                method: 'get',
                // url: 'mobile/api/q',
                url:"/api/buyer/coupon_list",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    // q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.getcouponList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getcouponList (res) {
            this.couponList = res.data.data
        }
        
    },
}
</script>
<style lang="stylus" scoped>
    .buy-now
        position fixed
        bottom 0
        width 100%
        background-color #fff
        height 13.33vw
        line-height 13.33vw
        box-shadow 0px -5px 20px 0px rgba(0, 0, 0, 0.05)
        .paytype
            font-size 4.26vw
            font-weight bold
            margin 0 5.33vw
</style>
