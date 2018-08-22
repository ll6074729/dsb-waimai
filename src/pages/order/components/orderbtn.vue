<template>
    <div class="order-btn-box" :class="page">
        <router-link tag="div" to="/" class="order-btn-item" v-if="order_status == 4 ">
            超时赔付
        </router-link>
        <router-link tag="div" :to="{path:'evaluate',query:{order_id:order_id,order_sn:order_sn,shop_id:shop_id}}" class="order-btn-item bg" v-if="order_status == 2">
            评价订单
        </router-link>
        <router-link tag="div" to="/" class="order-btn-item bg" v-if="order_status == 4 || order_status == 3">
            再来一单
        </router-link>
        <router-link tag="div" to="/" class="order-btn-item" v-if="order_status == 0">
            取消订单
        </router-link>
        <p v-if="order_status == 1">超时可申请最高十元赔付</p>
        <p v-if="order_status == 5">余额已退回支付账户</p>
    </div>
</template>
<script>
export default {
    name:"orderbtn",
    props:{
        page:String,
        order_status:Number,
        shop_id:Number,
        order_id:Number,
        order_sn:Number
    },
    data () {
        return {
           
        }
    },
    methods:{
        pagestyle () {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .center
        justify-content center
    .end 
        justify-content flex-end
    .order-btn-box
        display flex
        padding 2.66vw
        .order-btn-item
            padding 2.26vw 3.33vw
            border 1px solid #999
            margin-left 2.66vw
            border-radius 1vw
        .bg
            border-color #469afe
            color #469afe
        p
            color #469afe   
</style>
