<template>
    <div>
        <div class="shop-head">
            <div class="shop-head-img db">
                <img src="../../../assets/img/组17@3x.png" alt="">
            </div>
            <div class="shop-head-name db">土耳其烤肉饭（长职）</div>
        </div>
        <div class="goods-list">
            <div class="goods-list-item">
                <div class="goods-img">
                    <img src="../../../assets/img/food.jpg" alt="">
                </div>
                <div class="goods-info">
                    <div class="goods-name">土豆肉丝盖浇饭</div>
                    <div class="goods-type">
                        <span>大份</span>
                        <span>微辣</span>
                        <span>加饭</span>
                    </div>
                </div>
                <div class="goods-num">
                    x4
                </div>
                <div class="goods-price">
                    ￥40.00
                </div>
            </div>
            <div class="goods-list-item">
                <div class="goods-img">
                    <img src="../../../assets/img/food.jpg" alt="">
                </div>
                <div class="goods-info">
                    <div class="goods-name">土豆肉丝盖浇饭</div>
                    <div class="goods-type">
                        <span>大份</span>
                        <span>微辣</span>
                        <span>加饭</span>
                    </div>
                </div>
                <div class="goods-num">
                    x4
                </div>
                <div class="goods-price">
                    ￥400.00
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"CartInfo",
    return () {

    }
}
</script>
<style lang="stylus" scoped>
@import "~css/style"
    .shop-head
        padding 2vw 5.33vw
        .shop-head-img
            vertical-align middle
            img 
                width 6.66vw
                height 6.66vw
                border-radius 50%
        .shop-head-name
            font-size 3.73vw
            margin-left 2.93vw
    .goods-list
        .goods-list-item
            padding 2.66vw 5.33vw
            background #f7f7f7
            display flex
            .goods-img
                img 
                    width 13.33vw
                    height 13.33vw
            .goods-info
                margin-left 2.66vw
                width 50vw
                .goods-name
                    font-size 4.266vw
                    font-weight bold
                    ellipsis()
                .goods-type
                    margin-top 4.66vw
                    font-size 3.2vw
                    span 
                        color #999
            .goods-num
                line-height 13.33vw
                
            .goods-price
                line-height 13.33vw
                font-weight bold
                margin-left 6.66vw
                width 70px
</style>
