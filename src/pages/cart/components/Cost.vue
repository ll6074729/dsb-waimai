<template>
    <div>
        <expen-ses :delivery_cost="delivery_cost"></expen-ses>
        <hr class="hr20">
        <aciti-vity></aciti-vity>
        <div class="cost-item df" @click="iscoupon">
            <div class="cost-type">优惠券</div>
            <div class="cost-coupon">{{coupontetx}}</div>
            <div class="cost-right">
                <img src="../../../assets/img/right_f7.png" alt="">
            </div>
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
    },
    components:{
        AcitiVity,
        ExpenSes,
    },
    data () {
        return {
            desc:"", //描述
            coupontetx:'',
        }
    },
    watch:{
        coupon (){
            this.coupontetx = this.coupon.name
        }
    },
    computed:{
        // coupontetx () {
        //     return this.couponList.length +"张可用"
        // }
    },
    methods :{
        iscoupon () {
            this.$emit('setcoupon',true)
        }

    }
}
</script>
<style lang="stylus" scoped>
    .cost-item
        padding 4.56vw 5.33vw
        border-bottom 1px solid #f7f7f7
        font-size 4.266vw
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
