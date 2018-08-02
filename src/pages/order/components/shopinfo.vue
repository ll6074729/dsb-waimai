<template>
    <div>
        <div class="list"  v-for="item in list" :key="item.id">
            <router-link tag="div" to="/OrderInfo">
                <div class="order-head">
                    <img :src="item.shopimg" alt="">
                    <div class="shop-box">
                        <div class="shop-name">{{item.shopname}}</div>
                        <div class="shop-timer">{{item.shoptime}}</div>
                    </div>
                    <div class="order-status">
                        <span v-if="item.shopstatus == 1">等待商家接单</span>
                        <span v-else-if="item.shopstatus == 2">接单中</span>
                        <span v-else-if="item.shopstatus == 3">等待送达</span>
                    </div>
                </div>
                <order-info :list="item.foodList"></order-info>
            </router-link>
            <order-btn></order-btn>
            <hr class="hr20">
        </div>
    </div>
    
</template>
<script>
import OrderBtn from "../components/orderbtn"
import OrderInfo from "../components/orderinfo"
export default {
    name:"shopinfo",
    props:{
        list:Array,
    },
    components:{
        OrderBtn,
        OrderInfo
    },
    data () {
        return {

        }
    },
    methods:{
        
    }
}
</script>
<style lang="stylus" scoped>
    @import "~css/style"
    .order-head
        display flex
        padding 2.66vw
        img 
            width 8vw
            height 8vw
        .shop-box
            margin-left 2.66vw
            margin-right auto  
            .shop-name
                font-size 3.73vw
                font-weight bolder
            .shop-timer
                font-size 3.2vw
                color #999
                margin-top 2vw
        .order-status
            line-height 9.66vw   
            font-size 3.73vw
            color #469afe 
    .order-info
        padding 5.33vw 8vw
        display flex
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