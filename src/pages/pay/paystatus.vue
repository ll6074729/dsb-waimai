<template>
    <div>
        <head-back :title="title"></head-back>
        <div class="order-sn df">
            <div>订单号</div>
            <div>{{order_sn}}</div>
        </div>
        <div class="order-sn df">
            <div>订单金额</div>
            <div style="color: #469afe;font-weight: bold;">￥{{order_amount}}</div>
        </div>
        <hr class="hr20">
        <pay-type @payCode="payCode"></pay-type>
        <div class="join-cart" @click="buybtn" v-loading.fullscreen.lock="fullscreenLoading">
            立即支付
        </div>
    </div>
</template>
<script>
import HeadBack from "../../componentss/headback"
import PayType from "../cart/components/paytype"
export default {
    name:'patstatus',
    components:{
        HeadBack,
        PayType
    },
    mounted () {
        this.getorder()
    },
    data () {
        return {
            order_id:0,
            order_sn:0,
            title:"选择支付",
            paycode:'weixin'
        }
    },
    beforeCreate () {
        document.querySelector('body').setAttribute('style', 'background-color:#f7f7f7')
    },
    beforeDestroy () {
        document.querySelector('body').removeAttribute('style')
    },
    methods:{
        buybtn () {
            console.log(this.paycode,this.$route.query.order_id)
            let _this = this
            if(this.paycode == 'alipayMobile'){
                    // this.$router.push('/Paystatus')
                window.location.href = '/Mobile/Payment/getpayCode?order_id='+this.$route.query.order_id+'&pay_code='+this.paycode
            }else{
                this.$http({
                    method:'post',
                    url:'/Mobile/Payment/getpayCode',
                    data:{
                        order_id:this.$route.query.order_id,
                        pay_radio:'pay_code='+ this.paycode
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
        },
        // 选择支付方式
        payCode(type){
            this.paycode = type
        },
        getorder () {
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                data: {
                    url:'http://api.dqvip.cc/order_info',
                    q_type:'post',
                    order_id:this.$route.query.order_id,
                }
            })
                .then(this._getorder)
                .catch(function (error) {
                    console.log(error);
                })
        },
        _getorder (res) {
            let date = eval('('+res.data+')')
            // let date1 = res.data
            console.log(date)
            if(date.data.pay_status == 1){
                this.$router.push({path:'/orderdetails',query:{order_sn:date.data.order_sn,order_id:date.data.order_id}})
            }
            this.order_sn = date.data.order_sn
            this.order_amount = date.data.order_amount
        }
    }
}
</script>
<style lang="stylus" scoped>
    .order-sn
        background #fff
        padding  2.66vw
        border-bottom 1px solid #f7f7f7
    .join-cart
        height 12vw
        color #ffffff
        background-image linear-gradient(90deg, 
        #4c91fe 0%, 
        #41a1fe 33%, 
        #35b0fd 65%, 
        #4c91fe 100%), 
    linear-gradient(
        #469afe, 
        #469afe)
        box-sizing border-box
        margin 5vw 2.66vw 2.66vw 2.66vw    
        text-align center;
        line-height 12vw
        font-size 4.33vw
        font-weight bold
        box-shadow 0px 4px 20px -3px #35b0fd
</style>
