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
            rulingPrice_money:0, //优惠券的折扣价
            couponList:[],
            coupon:{},
            coupon_id:'',
            iscoupon:false,
            paycode:'weixin',
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
            // this.shopprom = []
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
            // this.shopprom = []
            this.money()
            //判断是否已经使用其他支付
            if(this.integral_num > 0){
                this.rulingPrice = this.rulingPrice - this.integral_num/100
            }
            // 判断余额是否超过支付金额 或者小于支付金额
            if(parseFloat(balance_money) > parseFloat(this.rulingPrice)){
                this.balance_money = parseFloat(this.rulingPrice)
            }else if(parseFloat(balance_money) < parseFloat(this.rulingPrice)){
                this.rulingPrice = (parseFloat(this.rulingPrice) - parseFloat(balance_money)).toFixed(2)
            }else if(parseFloat(balance_money) == parseFloat(this.rulingPrice)){
                this.rulingPrice = 0
            }
            
        },
        coupon () {
            // 判断原价是否满足优惠券的金额
            if(this.costPrice > parseFloat(this.coupon.coupon.condition)){
                this.rulingPrice =  parseFloat(this.rulingPrice_money) - parseFloat(this.coupon.coupon.money)
                this.coupon_id = this.coupon.cid
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
            var balance_money = this.balance_money || 0
            var integral_num = this.integral_num || 0
            this.$http({
                method: 'post',
                url: '/mobile/api/q',
                // url:'api/buyer/submit_order',
                data: {
                    url:'http://api.dqvip.cc/buyer/submit_order',
                    shop_id:this.$route.params.id,
                    address_id:JSON.parse(this.$store.state.defaultAddress).address_id,
                    pay_code:this.paycode,
                    delivery_type:"0",
                    user_note:this.desc,
                    cart_id:this.cart_id,
                    user_money:balance_money,
                    integral:integral_num,
                    coupon_id:this.coupon_id,
                    q_type:'post'
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                // }
            })
            .then(this.buybtnafter)
            .catch(function (error) {
                console.log(error);
            })
        },
        buybtnafter (res) {
            this.fullscreenLoading = false;
            let date = eval('(' + res.data + ')')
            // let date = res.data
            // 把订单存在本地
            this.$store.dispatch("changeOrderId",date.data.order_id)
            this.$store.dispatch("changeOrderSn",date.data.order_sn)
            let _this = this
            this.$http({
                method:'post',
                url:'http://wm.dqvip.cc/Mobile/Payment/getpayCode',
                data:{
                    order_id:date.data.order_id,
                    pay_radio:'pay_code='+ date.data.pay_code
                },
            })
                .then(function(response){
                    _this.styleIndex.callpay(response.data)
                })
                .catch(function(error){
                    console.log(error)
                })
            // if(date.status == 200){
            //     this.styleIndex.wxpay()
            // }

                // this.$router.push({path:'/pay',query:{order_sn:date.data.order_sn,order_id:date.data.order_id}})
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
            let shopprom = JSON.parse(this.$store.state.shopprom)
            for(let i in cart){
                total += ((parseFloat(cart[i].goods.price) + parseFloat(cart[i].spec_price)) * cart[i].goods_num) 
            }
            // 加配送费
            for(let i =0;i<2;i++){
                total += parseFloat(this.delivery_cost[i].value)
            }
            
            this.costPrice = total.toFixed(2)
            this.rulingPrice = total.toFixed(2)
            // 满减
            console.log(shopprom,9993)
            console.log(shopprom[0],999333)
            for(let i in shopprom[0]){
                if(this.costPrice > parseFloat(shopprom[0][i].condition)){
                    let Rprice = parseFloat(this.costPrice) - parseFloat(shopprom[0][i].money)
                    this.rulingPrice = Rprice.toFixed(2)
                    this.cartprom[0] = shopprom[0][i]
                    // this.cartprom.push(this.shopprom[0][i])
                    // break 
                }
            }
            // 赠品
            for(let i in shopprom[1]){
                if(this.costPrice > parseFloat(shopprom[1][i].condition)){
                    this.cartprom.push(shopprom[1][i])
                    // break
                }
            }
            // 首单
            // if(!this.shopprom[2]){
            //     for(let i in this.shopprom[2]){
            //         this.cartprom.push(this.shopprom[2][i])
            //     }
            // }
            // 优惠券价钱是所有价钱算完了之后再计算的  watch 中的 coupon 方法
            this.rulingPrice_money = this.rulingPrice
        },
        // 初始化购物车
        init () {
            this.$http({
                method: 'post',
                url: '/mobile/api/q',
                // url:'api/buyer/cart_list',
                data: {
                    url:'http://api.dqvip.cc/buyer/cart_list',
                    shop_id:this.$route.params.id,
                    q_type:'post'
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                // }
            })
                .then(this.initCart)
                .catch(function (error) {
                    console.log(error);
                })
        },
        initCart (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            this.cart = date.data
            // console.log(date,2)
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
                url: '/mobile/api/q',
                // url:'api/buyer/shop_info',
                data: {
                    url:'http://api.dqvip.cc/buyer/shop_info',
                    shop_id:this.$route.params.id,
                    q_type:'post'
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                // }
            })
            .then(this.getshopinfo)
            .catch(function (error) {
                console.log(error);
            })
        },
        getshopinfo (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            this.shopinfo = date.data
        },
        // 获取配置文件
        DeliveryList () {
            this.$http({
                method: 'get',
                url: '/mobile/api/q',
                // url:'api/init',
                data: {
                    url:'http://api.dqvip.cc/init',
                    q_type:'get'
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                // }
            })
                .then(this.getDeliveryList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        userinfo () {
            this.$http({
                method: 'get',
                url: '/mobile/api/q',
                // url:'api/user_info',
                data: {
                    url:'http://api.dqvip.cc/user_info',
                    q_type:'get'
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                // }
            })
                .then(this.getuserinfo)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getuserinfo (res) {
            let date = eval('(' + res.data + ')')
            // let date = res.data
            console.log(date,4)
            this.balance = date.data.moeny
            this.integral = date.data.points
        },
        getDeliveryList (res) {
            // let date = res.data
            let date = eval('(' + res.data + ')')
            console.log(date,5)
            this.delivery_cost = date.data
            let freight = this.$store.state.delivery_cost
            let packing_expense = this.$store.state.packing_expense
            let Distribution = parseFloat(date.data[0].value)
            // 判断是否有默认的收费
            if(freight){
                this.delivery_cost[0].value = freight
            }
            if(packing_expense){
                this.delivery_cost[1].value = packing_expense
            }
            this.money()
            // this.delivery_cost = Distribution.toFixed(2)
        },
        coupon_list () {
            this.$http({
                method: 'post',
                url: '/mobile/api/q',
                // url:'api/buyer/coupon_list',
                data: {
                    url:'http://api.dqvip.cc/buyer/coupon_list',
                    q_type:'get'
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                // }
            })
                .then(this.getcouponList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getcouponList (res) {
            let date = eval('('+res.date+')')
            // let date =res.data
            if(date){
                this.couponList = date.data
            }
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
