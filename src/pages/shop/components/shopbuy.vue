<template>
    <div>
        <div class="head">
            <div class="head-left">
                <div class="head-img">
                    <img src="../../../assets/img/food.jpg" alt="">
                </div>
            </div>
            <div class="head-right">
                <div class="food-name">小龙坎火锅冒菜</div>
                <div class="food-price">￥15.00</div>
            </div>
            <div class="colse">
                <img src="../../../assets/img/close.png" alt="">
            </div>
        </div>
        <div class="category">
            <div>
                <div class="category-item">
                    <div class="category-name">分量：</div>
                    <div class="category-list">
                        <div class="item">大份</div>
                        <div class="item">中分</div>
                        <div class="item">小份</div>
                    </div>
                </div>
                <div class="category-item">
                    <div class="category-name">口味</div>
                    <div class="category-list">
                        <div class="item">辣死人不偿命</div>
                        <div class="item">我是正常人</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="join-cart">
            加入购物车
        </div>
    </div>
</template>
<script>
export default {
    name:"ShopBuy",
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .head
        height 21.33vw
        padding 5.33vw 2.66vw
        position relative
        .head-left
            float left
            .head-img
                img 
                    width 21.33vw
                    height 21.33vw
        .head-right 
            float left 
            width 70%
            margin-left 2.66vw
            display flex
            flex-direction column 
            height 100%
            justify-content space-between
            font-size 5.33vw
            font-weight bold
            .food-price
                color #469afe
        .colse
            position absolute
            top 5.6vw
            right 2.66vw
            img 
                width 4.8vw
                height 4.8vw        
    .category
        padding 0 2.66vw     
        .category-item 
            .category-list
                .item
                    font-size 4.26vw
                    padding 3.33vw 8vw
                    border 1px solid #dbdbdb
                    color #999
                    display inline-block
                    border-radius 3px
                    margin-right 2.66vw
                    margin-top 2.66vw
                    margin-bottom 5.33vw
    .join-cart
        height 12vw
        color #ffffff
        background-image linear-gradient(90deg, 
		#4c91fe 0%, 
		#41a1fe 33%, 
		#35b0fd 65%, 
		#4c91fe 100%), 
	linear-gradient(
		#469afe, 
		#469afe)
        box-sizing border-box
        margin 5vw 2.66vw 2.66vw 2.66vw    
        text-align center;
        line-height 12vw
        font-size 4.33vw
        font-weight bold
        box-shadow 0px 4px 20px -3px #35b0fd
</style>
