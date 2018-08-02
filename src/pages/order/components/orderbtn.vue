<template>
    <div class="order-btn-box">
        <router-link tag="div" to="/" class="order-btn-item">
            超时赔付
        </router-link>
        <router-link tag="div" to="/evaluate" class="order-btn-item bg">
            评价订单
        </router-link>
        <router-link tag="div" to="/" class="order-btn-item bg">
            再来一单
        </router-link>
        <!-- <router-link tag="div" to="/" class="order-btn-item">
            取消订单
        </router-link> -->
    </div>
</template>
<script>
export default {
    name:"orderbtn",
    data () {
        return {
           
        }
    }
}
</script>
<style lang="stylus" scoped>
    .order-btn-box
        display flex
        // justify-content flex-end
        justify-content center
        padding 2.66vw
        .order-btn-item
            padding 2.26vw 3.33vw
            border 1px solid #999
            margin-left 2.66vw
            border-radius 1vw
        .bg{
            border-color #469afe
            color #469afe
        }    
</style>
