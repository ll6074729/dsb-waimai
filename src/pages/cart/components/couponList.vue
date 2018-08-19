<template>
    <div class="coupon-list" ref="coupon" v-if="iscoupon">
        <div class="coupon-title" @click="setcoupon">
            我的优惠券
        </div>
        <ul>
            <li class="item pd20" v-for="item in couponList" :key="item.id" :class="{active:item.id ==coupon.id}" @click="couponchange(item)" v-if="item.condition > costPrice">
                <div class="coupon-money">
                    ￥<span>{{item.money}}</span>
                </div>
                <div class="coupon-info">
                    <div class="coupon-name mgbt20 fs28">
                        {{item.name}}
                    </div>
                    <div class="coupon-desc mgbt20 fs20">
                        {{item.name}}
                    </div>
                    <div class="coupon-time fs20">
                        有效期至 {{ item.use_start_time * 1000 | formatDate}}
                    </div>
                </div>
            </li>
            <li>
                暂无可用优惠券
            </li>
        </ul>
       
    </div>
</template>
<script>
import {formatDate} from 'st/time.js'
import BScroll from 'better-scroll'
export default {
    name:"couponList",
    props:{
        couponList:Array,
        iscoupon:Boolean,
        costPrice:Number,
    },
    mounted () {
        this.scroll = new BScroll(this.$refs.coupon,{
            click:true
        })
    },
    data () {
        return {
            coupon:{}
        }
    },
    methods:{
        couponchange (coupon) {
            this.coupon = coupon
            this.$emit('changecoupon',coupon)
            this.setcoupon()
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
    .coupon-list
        background-color #f7f7f7
        position fixed
        width 100%
        bottom 0
        top 60%
        .coupon-title
            text-align center
            font-size 4vw
            font-weight bold
            border-bottom 1px solid #f7f7f7
            padding 4vw 0
            background-color #fff
            box-shadow 0px 5px 20px 0px rgba(0, 0, 0, 0.05)
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
