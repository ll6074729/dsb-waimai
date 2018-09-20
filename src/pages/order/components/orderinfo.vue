<template>
<div>
    <div class="order-info">
        <div class="order-info-item"  v-for="item in list" :key="item.id"  @click="order(item.order_id,item.order_sn)">
            <div class="food-name">{{item.goods_name}}</div>
            <div class="food-attr">
                <span>{{item.spec_key_name}}</span>
            </div>
            <div class="food-num">x {{item.goods_num}}</div>
        </div>
    </div>
    <div class="order-price" >
        <span>共 {{list.length}} 件商品 </span> <span class="const-price">￥{{price}}</span>
    </div>
</div>
    
</template>
<script>
export default {
    name:"orderinfo",
    props:{
        list:Array,
        price:String,
    },
    methods:{
        order (order_id,order_sn) {
            this.$router.push({path:'/orderdetails',query:{order_sn:order_sn,order_id:order_id}})
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import "~css/style"
    .order-info
        padding 0.5vw 3vw 5.33vw
        padding-left 13vw
        .order-info-item
            display flex
            margin-bottom 1.5vw
            .food-name
                width 32vw
                ellipsis()
            .food-attr
                width 44vw
                ellipsis()
                margin-right auto
                color #999
    .order-price
        display flex
        justify-content flex-end 
        padding 0 3.5vw 4vw 0    
        font-size 4.26vw
        .const-price
            color #469afe
            font-weight bolder   
            margin-left 6vw
</style>
