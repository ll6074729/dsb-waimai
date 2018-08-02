<template>
    <div>
        <div class="recommend-box">
            <div class="title">
                为你推荐
            </div>
            <div class="goods-list">
                <div class="goods-item" v-for="item in list" :key="item.id">
                    <img :src="item.imgurl" alt="item.name">
                    <div class="goods-info">
                        <p>{{item.name}}</p>
                        <p class="goods-price">￥{{item.money}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"recommend",
    data () {
        return {
            list:[{id:1,name:"北京烤鸭北京烤鸭北京烤鸭北京烤鸭北京烤鸭",money:"20.00",imgurl:require("../../../assets/img/food.jpg")},{id:2,name:"凉白肉",money:"2230.00",imgurl:require("../../../assets/img/food.jpg")},{id:3,name:"红烧肉",money:"220.00",imgurl:require("../../../assets/img/food.jpg")},{id:4,name:"卤肉饭",money:"30.00",imgurl:require("../../../assets/img/food.jpg")}]
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import "~css/style"
    .recommend-box
        background-color #f7f7f7
        .goods-list
            padding 1.33vw
            .goods-item
                width 50%
                box-sizing border-box
                padding 0.66vw
                display inline-block
                img 
                    width 100%
                    height 46.66vw
                .goods-info
                    background-color #fff 
                    padding 2.66vw
                    p:first-child
                        margin-bottom 2.66vw
                        font-weight bolder
                        ellipsis()
                    .goods-price
                        color #469afe  
                        font-size 3.73vw
</style>        
