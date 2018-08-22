<template>
    <div class="count">
        <div class="count-text">
            {{count}}
        </div>
        <diV v-if="pay_status == 0">
            <p style="color:#469afe">订单待支付</p>
        </diV>
        <div v-if="pay_status ==1">
            <p v-if="order_status == 0">等待商家接单中</p>
            <p v-if="order_status == 1">商家出餐中</p>
            <p v-if="order_status == 2">
                <span v-if="shipping_status == 0">
                    骑手取货中
                </span>
                <span v-if="shipping_status == 1">
                    骑手配送中
                </span>
                <span v-if="shipping_status == 2">
                    订单已收货
                </span>
            </p>
            <p v-if="order_status == 3">订单已取消</p>
            <p v-if="order_status == 4">订单已完成</p>
            <p v-if="order_status == 5">商家已取消订单,请联系商家</p>
        </div>
    </div>
</template>
<script>
export default {
    name:"Count",
    props:{
        order_status:Number,
        shipping_status:Number,
        pay_status:Number,
    },
    data () {
        return {
            count:"12:55",
        }
    },
    methods:{

    },
    watch:{

    },
    computed:{

    }
}
</script>
<style lang="stylus" scoped>
    .count
        width 100%
        text-align center
        .count-text
            position absolute
            background #fff;
            border-radius 50%
            top 5.33vw
            left 50%
            margin-left -10.66vw
            width 21.33vw
            height 21.33vw
            line-height 21.33vw
        p
            font-size 4.8vw
            font-weight bolder
            margin-top 15vw
            margin-bottom 5.66vw
</style>
