<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <cart-header 
            :timer="delivery_cost[2]" 
            :business_hours="shopinfo.business_hours" 
            v-if="shopinfo.business_hours"
            @estimated="estimated"
            ></cart-header>
        <hr class="hr20">
        <cart-info :cartBox="cartBox" :shopinfo="shopinfo" :page="page"></cart-info>
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
            :shopprom="shopprom"
            :shopinfo="shopinfo"
            @getintegral_num="getintegral_num"
            @getbalance_money="getbalance_money"
            @setcoupon="setcoupon"
            @getdesc="getdesc"
            @getbalance ="getbalance"
            @getintegral ="getintegral"
            v-if="cartprom"
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
            cartBox:JSON.parse(localStorage[this.$route.params.id]),
            page:'cart',
            shopinfo:Object,
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
            cartprom:null,
            cart_id:[],
            desc:"",
            integral:"",
            balance:"",
            balance_money:'',
            integral_num:'',
            custom:0,
            custom_delivery:0,
            fullscreenLoading: true,
            estimated_delivery:'',
        }
    },
    mounted () {
        this.pushshopinfo()
        this.init()
        this.DeliveryList()
        this.coupon_list()
        this.userinfo()
    },
    watch:{
        // 积分
        integral_num () {
            if(!this.integral_num){
                this.integral_num = ""
            }
            var integral_num = this.integral_num || 0
            // this.shopprom = []
           this.money()
            //判断是否已经使用其他支付
            if(this.balance_money > 0){
                this.rulingPrice = this.rulingPrice - this.balance_money || 0
            }
            // 判断余额是否超过支付金额 或者小于支付金额
            if(integral_num/100 > parseFloat(this.rulingPrice)){
                this.integral_num = parseFloat(this.rulingPrice) * 100
                
            }else if(integral_num/100 < parseFloat(this.rulingPrice)){
                this.rulingPrice = (parseFloat(this.rulingPrice) - parseFloat(integral_num)/100).toFixed(2) || 0
            }else if(integral_num/100 == parseFloat(this.rulingPrice)){
                this.rulingPrice = 0
            }
            
        },
        // 余额
        balance_money (){
            if(!this.balance_money){
                this.balance_money = ""
            }
            var balance_money = this.balance_money || 0
            // this.shopprom = []
            this.money()
            //判断是否已经使用其他支付
            if(this.integral_num > 0){
                this.rulingPrice = this.rulingPrice - this.integral_num/100 || 0
            }
            // 判断余额是否超过支付金额 或者小于支付金额
            if(parseFloat(balance_money) > parseFloat(this.rulingPrice)){
                this.balance_money = parseFloat(this.rulingPrice) || 0
            }else if(parseFloat(balance_money) < parseFloat(this.rulingPrice)){
                this.rulingPrice = (parseFloat(this.rulingPrice) - parseFloat(balance_money)).toFixed(2) || 0
            }else if(parseFloat(balance_money) == parseFloat(this.rulingPrice)){
                this.rulingPrice = 0
            }
            
        },
        // 优惠券
        coupon () {
            // 判断原价是否满足优惠券的金额
            if(this.costPrice > parseFloat(this.coupon.coupon.condition)){
                this.rulingPrice =  parseFloat(this.rulingPrice_money) - parseFloat(this.coupon.coupon.money) || 0
                this.coupon_id = this.coupon.id
            }
        },
        delivery_cost() {
            this.money()
        },
        // shopinfo () {
        //     this.money()
        // }
    },
    methods:{
        //送达时间
        estimated (msg) {
            let time = new Date()
            let year = time.getFullYear()
            let month = time.getMonth() + 1
            let day = time.getDate()
            let timer = year+'-'+month+'-'+day+' '+msg+':00'
            this.estimated_delivery = timer
        },
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
            // 把本地购物车传给服务器
            var goods_box = JSON.parse(localStorage[this.$route.params.id])
            var goods_row = new Array()
            // 组装成后端需要的格式
            for(let i in goods_box){
                if(goods_box[i].spec_key){
                    goods_row.push({goods_id:goods_box[i].goods_id,goods_num:goods_box[i].goods_num,spec_key:goods_box[i].spec_key})
                }else{
                    goods_row.push({goods_id:goods_box[i].goods_id,goods_num:goods_box[i].goods_num})
                }
            }
            var submit_date = {
                url:'http://api.dqvip.cc/buyer/submit_order',
                shop_id:this.$route.params.id,
                address_id:JSON.parse(this.$store.state.defaultAddress).address_id,
                pay_code:this.paycode,
                delivery_type:"0",
                user_money:balance_money,
                integral:integral_num,
                c_id:this.coupon_id,
                q_type:'post',
                estimated_delivery:this.estimated_delivery,
                goods_row:goods_row
            }
            if(this.desc == ''){

            }else{
                submit_date.user_note=this.desc
            }
           
            this.$http({
                method: 'post',
                url: '/mobile/api/q',
                // url:'api/buyer/submit_order',
                data: submit_date,
            })
            .then(this.buybtnafter)
            .catch(function (error) {
                // alert(JSON.stringify(error))
                alert(404)
                console.log(error);
            })
        },
        buybtnafter (res) {
            // alert(JSON.stringify(res.data))  
            let date = eval('(' + res.data + ')')
            // let date = res.data
            console.log(date)
            if(date.status !=200){
                this.$message({
                    message: date.message,
                    type: 'warning'
                });
                return
            }
            
            // 把订单存在本地
            this.$store.dispatch("changeOrderId",date.data.order_id)
            this.$store.dispatch("changeOrderSn",date.data.order_sn)
            let _this = this
            localStorage.removeItem(this.shopinfo.shop_id)
            if(parseInt(date.data.order_amount) == 0){
                _this.fullscreenLoading = false;
                location.href='/#/pay/true';
            }else{
                if(date.data.pay_code == 'alipayMobile'){
                    // this.$router.push('/Paystatus')
                    window.location.href = '/Mobile/Payment/getpayCode?order_id='+date.data.order_id+'&pay_code='+date.data.pay_code
                }else{
                    this.$http({
                        method:'post',
                        url:'/Mobile/Payment/getpayCode',
                        data:{
                            order_id:date.data.order_id,
                            pay_radio:'pay_code='+ date.data.pay_code
                        },
                    })
                    .then(function(response){
                        _this.fullscreenLoading = false;
                        _this.styleIndex.callpay(response.data)
                    })
                    .catch(function(error){
                        console.log(error)
                    })
                }
            }
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
            let cart = this.cartBox
            let total = 0
            // 优惠信息
            let shopprom = JSON.parse(this.$store.state.shopprom)
            for(let i in cart){
                console.log(i)
                total += ((parseFloat(cart[i].price) + parseFloat(cart[i].spec_price || 0)) * cart[i].goods_num)
            }
            console.log(total,888888888)
            this.costPrice = total.toFixed(2) 
            this.rulingPrice = total.toFixed(2) || 0
            this.cartprom = []
            // 满减
            for(let i in shopprom[0]){
                var compare = function (obj1, obj2) {
                    var val1 = obj1.condition;
                    var val2 = obj2.condition;
                    if (val1 < val2) {
                        return -1;
                    } else if (val1 > val2) {
                        return 1;
                    } else {
                        return 0;
                    }            
                } 
                shopprom[0].sort(compare)
                if(this.costPrice >= parseFloat(shopprom[0][i].condition)){
                    let Rprice = parseFloat(this.costPrice) - parseFloat(shopprom[0][i].money)
                    this.rulingPrice = Rprice.toFixed(2) || 0
                    this.cartprom[0] = shopprom[0][i]
                }
            }
            console.log()
            // 赠品 只有一个
            if(shopprom[1][0]){
                if(this.costPrice > parseFloat(shopprom[1][0].condition)){
                    this.cartprom[1] = shopprom[1][0]
                }
            }
            
            // 首单is_first
            // 优惠券价钱是所有价钱算完了之后再计算的  watch 中的 coupon 方法
            if(this.shopinfo.is_first < 1 ){
                if(this.shopprom[2][0]){
                    this.rulingPrice = this.rulingPrice - parseFloat(this.shopprom[2][0].money) - parseFloat(this.$store.state.delivery_cost) - parseFloat(this.$store.state.packing_expense) - parseFloat(this.$store.state.delivery_price) || 0
                    if(this.rulingPrice < 0){
                        this.rulingPrice = parseFloat(this.$store.state.delivery_cost) + parseFloat(this.$store.state.packing_expense) + parseFloat(this.$store.state.delivery_price) || 0
                    }else{
                        this.rulingPrice = (parseFloat(this.rulingPrice) + parseFloat(this.$store.state.delivery_price) + parseFloat(this.$store.state.delivery_cost) + parseFloat(this.$store.state.packing_expense)).toFixed(2) || 0
                    }
                    this.rulingPrice_money = this.rulingPrice || 0
                }else{
                    this.rulingPrice_money = this.rulingPrice || 0
                }
            }else if(this.shopinfo.is_first == undefined ){
                this.rulingPrice_money = this.rulingPrice || 0
            }else if(this.shopinfo.is_first > 0){
                this.shopprom[2][0] = null
                this.rulingPrice_money = this.rulingPrice || 0
            }
            console.log(this.rulingPrice)
             // 加配送费
            /**
              * custom_delivery 店铺配送费
              * custom 店铺包装费
              * delivery_cost 默认的费用  是个数组
              * 
              */
            // 判断是否获取到了店铺信息
            if(this.shopinfo){
                // 判断基础配送费是否等于0
                if(this.shopinfo.custom != 0){
                    // 判断商品总价是否小于首单的价钱
                    if(this.shopprom[2][0]){
                        if(parseFloat(total) < parseFloat(this.shopprom[2][0].money || 0)){
                            this.rulingPrice = (parseFloat(this.shopinfo.custom_delivery) +  parseFloat(this.shopinfo.custom) + parseFloat(this.$store.state.delivery_price)).toFixed(2) || 0
                            this.costPrice = (parseFloat(this.costPrice) + parseFloat(this.shopinfo.custom_delivery) +  parseFloat(this.shopinfo.custom) + parseFloat(this.$store.state.delivery_price)).toFixed(2) || 0
                        }else{
                            this.costPrice = (parseFloat(this.costPrice) + parseFloat(this.shopinfo.custom_delivery) +  parseFloat(this.shopinfo.custom) + parseFloat(this.$store.state.delivery_price)).toFixed(2) || 0
                            this.rulingPrice = (parseFloat(this.rulingPrice) + parseFloat(this.shopinfo.custom_delivery) +  parseFloat(this.shopinfo.custom) + parseFloat(this.$store.state.delivery_price)).toFixed(2) || 0
                        }
                    }else{
                        this.costPrice = (parseFloat(this.costPrice) + parseFloat(this.shopinfo.custom_delivery) +  parseFloat(this.shopinfo.custom) + parseFloat(this.$store.state.delivery_price)).toFixed(2) || 0
                        this.rulingPrice = (parseFloat(this.rulingPrice) + parseFloat(this.shopinfo.custom_delivery) +  parseFloat(this.shopinfo.custom) + parseFloat(this.$store.state.delivery_price)).toFixed(2) || 0
                    }
                }else if(this.shopinfo.custom == 0){
                    this.rulingPrice = (parseFloat(this.rulingPrice) + parseFloat(this.shopinfo.custom_delivery) +  parseFloat(localStorage.packing_expense) + parseFloat(this.$store.state.delivery_price)).toFixed(2) || 0
                    this.costPrice = (parseFloat(this.rulingPrice) + parseFloat(this.shopinfo.custom_delivery) +  parseFloat(localStorage.packing_expense) + parseFloat(this.$store.state.delivery_price)).toFixed(2) || 0
                }else if (this.shopinfo.custom == 0 && localStorage.packing_expense == 0){
                    this.rulingPrice = (parseFloat(this.rulingPrice) + parseFloat(this.shopinfo.custom_delivery) +  parseFloat(this.delivery_cost[1].value) + parseFloat(this.$store.state.delivery_price)).toFixed(2) || 0
                    this.costPrice = (parseFloat(this.rulingPrice) + parseFloat(this.shopinfo.custom_delivery) +  parseFloat(this.delivery_cost[1].value) + parseFloat(this.$store.state.delivery_price)).toFixed(2) || 0
                }
            }
           
            if(this.rulingPrice != NaN){
                this.fullscreenLoading = false
            }
            // 如果是首单的话  只计算商品的钱   配送及打包 还是要算的
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
                }
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
                }
            })
            .then(this.getshopinfo)
            .catch(function (error) {
                console.log(error)
            })
        },
        getshopinfo (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            this.shopinfo = date.data
            this.custom_delivery = date.data.custom_delivery
            this.custom = date.data.custom
            
            this.money()
        },
        // 获取配置文件
        DeliveryList () {
            this.$http({
                method: 'post',
                url: '/mobile/api/q',
                // url:'api/init',
                data: {
                    url:'http://api.dqvip.cc/init',
                    q_type:'get'
                }
            })
                .then(this.getDeliveryList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        userinfo () {
            this.$http({
                method: 'post',
                url: '/mobile/api/q',
                // url:'api/user_info',
                data: {
                    url:'http://api.dqvip.cc/user_info',
                    q_type:'get'
                }
            })
                .then(this.getuserinfo)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getuserinfo (res) {
            let date = eval('(' + res.data + ')')
            // let date = res.data
            this.balance = date.data.moeny
            this.integral = date.data.points
            this.money()
        },
        getDeliveryList (res) {
            // let date = res.data
            let date = eval('(' + res.data + ')')
            // console.log(date,33)
            this.delivery_cost = date.data
            let freight = this.$store.state.delivery_cost
            let freight_price = this.$store.state.delivery_price
            let packing_expense = this.$store.state.packing_expense //校区的配送费
            let Distribution = parseFloat(date.data[0].value)
            // 判断是否有默认的收费
            if(freight){
                this.delivery_cost[0].value = (parseFloat(freight) + parseFloat(freight_price)).toFixed(2)
            }
            if(packing_expense){
                this.delivery_cost[1].value = packing_expense
            }
            // this.$nextTick(function () {
            //     this.money()
            // })
        },
        coupon_list () {
            this.$http({
                method: 'post',
                url: '/mobile/api/q',
                // url:'api/buyer/coupon_list',
                data: {
                    url:'http://api.dqvip.cc/buyer/coupon_list',
                    q_type:'get'
                }
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
