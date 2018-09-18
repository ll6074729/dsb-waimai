<template>
    <div>
        <div class="backg" @click="setcoupon" v-if="iscoupon"></div>
        <div class="coupon-list" ref="coupon" v-if="iscoupon">
            <div class="coupon-title" @click="setcoupon">
                我的优惠券
            </div>
            <ul>
                <!-- v-if="item.condition > costPrice" -->
                <li class="item pd20" v-for="item in couponList" :key="item.id" :class="{active:item.id ==coupon.id}" @click="couponchange(item)">
                    <!-- {{couponList}} -->
                    <div class="coupon-money">
                        ￥<span>{{item.coupon.money}}</span>
                    </div>
                    <div class="coupon-info">
                        <div class="coupon-name mgbt20 fs28">
                            {{item.coupon.name}}
                        </div>
                        <div class="coupon-desc mgbt20 fs20">
                            {{item.coupon.name}}
                        </div>
                        <div class="coupon-time fs20">
                            有效期至 {{ item.coupon.use_start_time}}
                        </div>
                    </div>
                </li>
                <li v-if="couponList.length < 1" style="text-align:center;margin-top:3vw">
                    暂无可用优惠券
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {formatDate} from 'st/time.js'
// import BScroll from 'better-scroll'
export default {
    name:"couponList",
    props:{
        couponList:Array,
        iscoupon:Boolean,
        rulingPrice:Number,
        costPrice:Number,
    },
    mounted () {
        // this.scroll = new BScroll(this.$refs.coupon,{
        //     click:true
        // })
    },
    data () {
        return {
            coupon:{}
        }
    },
    methods:{
        couponchange (coupon) {
            if(parseFloat(this.costPrice) >= parseFloat(coupon.coupon.condition)){
                this.coupon = coupon
                this.$emit('changecoupon',coupon)
                this.setcoupon()
            }else{
                this.$message({
                    type:'warning',
                    message:'当前价钱不满足优惠券使用条件'
                })
            }
           
        },
        setcoupon () {
            this.$emit('setcoupon',false)
        }
    },
    filters :{
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    }
}
</script>
<style lang="stylus" scoped>
    .backg
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        background rgba(0,0,0,0.3)
    .coupon-list
        background-color #f7f7f7
        position fixed
        width 100%
        bottom 12vw
        top 60%
        z-index 9
        .coupon-title
            text-align center
            font-size 4vw
            font-weight bold
            border-bottom 1px solid #f7f7f7
            padding 4vw 0
            background-color #fff
            box-shadow 0px 5px 20px 0px rgba(0, 0, 0, 0.05)
        ul
            overflow scroll   
            height 100%
            background-color #f7f7f7
            .active
                background-image url(../../../assets/img/coupon_bg_blue.png)!important
                box-shadow 0px 0px 20px 0px rgba(70, 154, 254, 0.3)
                .coupon-money
                    color #fff!important
                .coupon-info
                    .coupon-name
                        color #fff !important
                    .fs20
                        color rgba(255, 255, 255, 0.5)!important
            .item
                margin 2.66vw
                background-color #f7f7f7
                height 26.66vw
                background-image url(../../../assets/img/coupon_bg_white.png)
                background-size 100% 100%
                background-repeat no-repeat
                display flex
                justify-content center
                align-items center
                .coupon-money
                    flex 1
                    text-align center
                    color #469afe
                    span 
                        font-size 8vw
                        font-weight bold
                        vertical-align middle
                .coupon-info
                    flex 2    
                    .coupon-name
                        font-weight bold
                    .fs20
                        color #999    

</style>
