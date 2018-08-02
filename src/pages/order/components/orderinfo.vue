<template>
<div>
    <div class="order-info">
        <div class="order-info-item"  v-for="item in list" :key="item.id">
            <div class="food-name">{{item.name}}</div>
            <div class="food-attr">
                <span  v-for="(itemlist,index) in item.attr" :key="index">{{itemlist.attrname}}/</span>
            </div>
            <div class="food-num">X{{item.num}}</div>
        </div>
    </div>
    <div class="order-price" >
        <span>共 2 件商品 </span> <span class="const-price">￥35.00</span>
    </div>
</div>
    
</template>
<script>
export default {
    name:"orderinfo",
    props:{
        list:Array,
    }
}
</script>
<style lang="stylus" scoped>
    @import "~css/style"
    .order-info
        padding 5.33vw 8vw
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
        padding 0 8vw 4vw 0    
        font-size 4.26vw
        .const-price
            color #469afe
            font-weight bolder   
            margin-left 6vw
</style>
