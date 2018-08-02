<template>
    <div>
        <head-top></head-top>
        <count></count>
        <order-btn></order-btn>
        <hr class="hr20">
        <take-out></take-out>
        <hr class="hr20">
        <cart-info></cart-info>
        <expen-ses></expen-ses>
        <aciti-vity></aciti-vity>
        <div class="df">
            <div class="list-name">
                实付款
            </div>
            <div class="price">
                ￥32.50
            </div>
        </div>
        <hr class="hr20">
        <mess-age></mess-age>
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
           
        }
    }
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
