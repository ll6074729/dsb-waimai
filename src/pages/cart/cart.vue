<template>
    <div>
        <cart-header></cart-header>
        <hr class="hr20">
        <cart-info></cart-info>
        <cost></cost>
        <hr class="hr20">
        <pay-type></pay-type>
        <div class="buy-now">
            <div class="paytype db">待支付</div>
            <div class="payprice db">
                <span class="price1">
                    ￥23.00
                </span>
                <span class="price2">
                    ￥30.00
                </span>
            </div>
            <router-link class="buybtn fr" tag="div" to="/pay">
                立即购买
            </router-link>
        </div>
    </div>
</template>
<script>
import CartHeader from "./components/cartheader"
import CartInfo from "./components/cartinfo"
import Cost from "./components/Cost"
import PayType from "./components/paytype"
export default {
    name:"Cart",
    components:{
        CartHeader,
        CartInfo,
        Cost,
        PayType,
    },
    return () {

    }
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
        .paytype
            font-size 4.26vw
            font-weight bold
            margin 0 5.33vw
</style>
