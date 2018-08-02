<template>
    <!-- order-no 是选择订单的样式 -->
    <div class="chooes-order order-yes">
        <!-- <router-link to="/" tag="div">
            选择订单
        </router-link> -->
        <div class="shop-img">
            <img src="../../../assets/img/组17@3x.png" alt="">
        </div>
        <div class="order-info">
            <p class="order-head fs28">
                叶氏烧腊
            </p>
            <p class="order-time fs24">
                2018-07-28 17:54
            </p>
            <div class="order df fs28">
                <p class="order-name">梅菜扣肉盖饭等3件商品</p>
                <p class="order-price">￥35.00</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"chooesOrder",
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .chooes-order
        height 26.66vw
        box-sizing border-box
    .order-no
        text-align center
        line-height 26.66vw
        color #469afe
    .order-yes
        display flex    
        padding 4vw 2.66vw
        .shop-img
            margin-right 2.66vw
            img 
                width 8vw
                height 8vw
        .order-info
            flex 1        
            .order-head
                font-weight bold
            .order-time
                color #999
                margin-top 2.13vw  
            .order
                margin-top 5.33vw
                color #999  
                .order-price
                    font-weight bold
                    color #333    
</style>
