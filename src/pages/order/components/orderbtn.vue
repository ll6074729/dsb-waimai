<template>
    <div class="order-btn-box" :class="page">
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
    props:{
        page:String
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
        .bg{
            border-color #469afe
            color #469afe
        }    
</style>
