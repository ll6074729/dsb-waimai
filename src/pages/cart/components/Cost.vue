<template>
    <div>
        <expen-ses :delivery_cost="delivery_cost" v-if="delivery_cost"></expen-ses>
        <hr class="hr20">
        <aciti-vity :cartprom="cartprom" :page="page" :shopprom="shopprom"></aciti-vity>
        <div class="cost-item df" @click="iscoupon">
            <div class="cost-type">优惠券</div>
            <div class="cost-coupon">{{coupontetx}}</div>
            <div class="cost-right">
                <img src="../../../assets/img/right_f7.png" alt="">
            </div>
        </div>
        <div class="cost-item df">
            <div class="cost-type">使用余额</div>
            <input type="number" :placeholder="balance +'元可用'" v-model="balance_money" maxlength="4">
        </div>
        <div class="cost-item df">
            <div class="cost-type">积分抵扣</div>
            <input type="text" :placeholder=" '可用积分'+integral + ',100积分=1元'" v-model="integral_num" maxlength="6">
        </div>
        <hr class="hr20">
        <div class="cost-item pr">
            <div class="cost-type">订单备注</div>
            <textarea name="" id="remarks" cols="10" rows="5" placeholder="请输入备注文字（可不填）" v-model="desc" maxlength="50"></textarea>
            <span class="textarea-num">{{desc.length}}/50</span>
        </div>
    </div>
</template>
<script>
import AcitiVity from "./activity"
import ExpenSes from "./expenses"
export default {
    name:"Cost",
    props:{
        delivery_cost:Array,
        coupon:Object,
        couponList:Array,
        shopprom:Array,
        cartprom:Object,
        rulingPrice:Number,
        desc:String,
        integral:String,
        balance:String,
        balance_money:String,
        integral_num:String,
    },
    components:{
        AcitiVity,
        ExpenSes,
    },
    data () {
        return {
            coupontetx:'',
            page:'cart',
            // balance_money:'',
            // integral_num:'',
        }
    },
    watch:{
        coupon (){
            console.log('coupon')
            this.coupontetx = this.coupon.coupon.name
        },
        integral_num () {
            // var integral_num = this.integral_num || 0
            // var balance_money = this.balance_money || 0
            // var constmoney = parseFloat(balance_money) + parseFloat(parseFloat(integral_num)/100)
            // // 积分大于支付价钱
            // if(parseFloat(integral_num)/100 > parseFloat(this.rulingPrice)){
            //     this.integral_num = this.rulingPrice * 100
            //     this.balance_money = 0
            // }
            // //总价大于支付价钱
            // if(constmoney > parseFloat(this.rulingPrice)){
            //     this.balance_money = (parseFloat(this.rulingPrice) - parseFloat(integral_num)/100).toFixed(2)
            // }
            // this.$emit('getbalance_money', parseFloat(this.balance_money))
            if(this.integral_num  > parseFloat(this.integral)){
                this.integral_num = parseFloat(this.integral)
            }
            this.$emit('getintegral_num',this.integral_num)
        },
        desc (){
            this.$emit('getdesc',this.desc)
        },
        balance_money () {
            // var integral_num = this.integral_num || 0
            // var balance_money = this.balance_money || 0
            // var constmoney = parseFloat(balance_money) + parseFloat(parseFloat(integral_num)/100)
            // // 余额大于支付价钱
            // if(balance_money > parseFloat(this.rulingPrice)){
            //     this.balance_money = parseFloat(this.rulingPrice)
            //     this.integral_num = 0
            // }
            // //总价大于支付价钱
            // if(constmoney > parseFloat(this.rulingPrice)){
            //     this.integral_num = (parseFloat(this.rulingPrice) - this.balance_money)*100
            // }
            if(this.balance_money > parseFloat(this.balance)){
                this.balance_money = parseFloat(this.balance)
            }
            this.$emit('getbalance_money', parseFloat(this.balance_money))
            // this.$emit('getintegral_num',this.integral_num)
        },
        balance () {
            this.$emit('getbalance',this.balance)
        },
        integral () {
            this.$emit('getintegral',this.integral)
        }
    },
    computed:{
        // coupontetx () {
        //     return this.couponList.length +"张可用"
        // }
    },
    mounted () {
        this.handmoney()
    },
    methods :{
        iscoupon () {
            this.$emit('setcoupon',true)
        },
        // 判断积分余额是否大于待支付金额
        handmoney () {
            console.log(this.cartprom,998)
        }
    }
}
</script>
<style lang="stylus" scoped>
    .cost-item
        padding 4.56vw 5.33vw
        border-bottom 1px solid #f7f7f7
        font-size 4.266vw
        .cost-type
            margin-top 1vw
        input 
            width 75%
            vertical-align middle
        .cost-right
            margin-right -2vw
            img 
                width 2.13vw
                height 4vw
        .cost-coupon
            font-size 3.73vw
            color #4897fe
            margin-right -55vw
        #remarks
            width 100%
            height 27.73vw
            border 1px solid #dbdbdb
            background-color #f7f7f7
            border-radius 5px
            margin-top 4.66vw
            padding 2vw
            box-sizing border-box
            font-size 3.2vw
        .textarea-num
            position absolute
            bottom 6vw
            right 8vw    
            color #999
            font-size 3.2vw
</style>
