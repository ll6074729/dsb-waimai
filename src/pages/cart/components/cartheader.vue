<template>
    <div>
        <div class="cart-head">
            <div  class="cart-head-left" @click="back()">
                <img src="../../../assets/img/back.png" alt="">
            </div>
            <div class="cart-head-text">
                确认订单
            </div>
        </div>
        <div class="cart-address">
            <div class="address-left db">
                <img src="../../../assets/img/address-cart.png" alt="">
            </div>
            <div class="address-content db">
                <div class="address-top">
                    <strong>小理哥</strong>
                    <strong>15233215411</strong>
                </div>
                <div class="address-info">
                    长江职业学院男生宿舍2栋3楼305长江职业学院男生宿舍2栋3楼305
                </div>
            </div>
            <div class="address-right fr">
                <img src="../../../assets/img/right_f7.png" alt="">
            </div>
        </div>
        <div class="delivery">
            <div class="fl delivery-left">
                <img src="../../../assets/img/time.png" alt="">
            </div>
            <div class="delivery-content fl">
                <strong class="fl">
                    送达时间
                </strong>
                <span class="fr">尽快送达，预计30分钟</span>    
            </div>
            <div class="delivery-right fr">
                <img src="../../../assets/img/right_f7.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"cartheader",
    return () {
        
    },
    methods:{
        back () {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import "~css/style"
    .cart-head
        height 10.66vw
        line-height 10.66vw
        border-bottom 1px solid #f7f7f7
        .cart-head-left 
            margin-left 2.13vw
            display inline-block
            img 
                width 2.13vw
                height 4.13vw
                margin-top -1vw
        .cart-head-text
            display inline-block
            margin-left 2.66vw     
            font-size 4.26vw
    .cart-address
        padding 5.33vw 2.66vw    
        border-bottom 1px solid #f7f7f7
        .address-left
            margin-left 2.66vw
            margin-right 4.66vw
            img 
                width 4.8vw
                height 5.86vw
        .address-content
            vertical-align middle
            .address-top 
                font-size 3.73vw
            .address-info
                font-size 2.93vw
                color #999
                margin-top 4vw
                max-width 75vw
                ellipsis()
        .address-right 
            margin-top 3vw
            img 
                width 2.13vw
                height 4vw
    .delivery
        padding 0 2.66vw
        line-height 13.33vw
        height 13.33vw
        .delivery-left
            img 
                width 4.8vw
                height 4.8vw
                margin-right 4.66vw
                margin-left 3vw
        .delivery-content
            width 75vw
            strong 
                font-size 3.73vw
                color #333
                font-weight bold
            span 
                font-size 3.2vw
                color #4897fe
        .delivery-right 
            img 
                width 2.13vw
                height 4vw    
</style>
