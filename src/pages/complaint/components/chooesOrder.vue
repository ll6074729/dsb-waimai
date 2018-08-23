<template>
    <!-- order-no 是选择订单的样式 -->
    <div class="chooes-order" @click="isordershow">
        <div class="choess-roder order-no" @touchmove.prevent v-if="selectArray == 0">
            选择订单 > 
        </div>
        <div v-if="selectArray != 0" class="order-yes">
            <div class="shop-img">
                <img src="../../../assets/img/组17@3x.png" alt="">
            </div>
            <div class="order-info">
                <p class="order-head fs28">
                    {{selectArray.order_shop.shop_name}}
                </p>
                <p class="order-time fs24">
                    {{selectArray.created_at}}
                </p>
                <div class="order df fs28">
                    <p class="order-name">{{selectArray.order_goods[0].goods_name}}等{{selectArray.order_goods.length}}件商品</p>
                    <p class="order-price">￥{{selectArray.total_amount}}</p>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name:"chooesOrder",
    props:{
        selectArray:Object,
        ordershow:Boolean
    },
    methods:{
        isordershow () {
            this.ordershow = !this.ordershow
            this.$emit('changeordershow',this.ordershow)
        }
    },
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
