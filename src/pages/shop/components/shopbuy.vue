<template>
    <div class="buy_box" v-show="isBuy">
        <div class="head">
            <div class="head-left">
                <div class="head-img">
                    <img src="goodsinfo.goods_info.details_figure" alt="" :onerror="this.$store.state.defaultShop">
                </div>
            </div>
            <div class="head-right">
                <div class="food-name">{{goodsinfo.goods_info.title}}</div>
                <div class="food-price">￥{{goodsinfo.goods_info.price}}</div>
            </div>
            <div class="colse" @click="closeGoodsInfo">
                <img src="../../../assets/img/close.png" alt="">
            </div>
        </div>
        <div class="category" ref="categoryList">
            <ul>
                <li class="category-item" v-for="(item,index) in goodsinfo.spec" :key="index">
                    <div class="category-name">{{item.name}}：</div>
                    <div class="category-list" >
                        <div class="item" 
                            :class="{active:itemList.item_id === 1}" 
                            v-for="(itemList,index) of item.item" 
                            :key="itemList.item_id"
                            @click="chooesItem(index,itemList.item_id,itemList.goods_id)">{{itemList.item}}</div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="join-cart" cart-id="goodsinfo.goods_info.cart_id">
            加入购物车
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:"ShopBuy",
    props:{
        isBuy:Boolean
    },
    data () {
        return {
            goodsinfo:[]
        }
    },
    updated () {
        this.$root.bus.$on('goodsinfo',value=>{
            this.goodsinfo = value
        }),
        this.scroll = new BScroll(this.$refs.categoryList,{
            click:true
        })
    },
    methods:{
        // 关闭当前面板
        closeGoodsInfo (){
            this.$emit('closeGoodsInfo',false)
        },
        // 选择规格
        chooesItem (index,item_id,goods_id) {
            console.log(index)
            console.log(item_id)
            console.log(goods_id)
            // this.isActive = item_id

        }
    }
}
</script>
<style lang="stylus" scoped>
.buy_box
    background #fff
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
        overflow hidden   
        max-height 40vw
        .category-item 
            .category-list
                .item
                    font-size 3.26vw
                    padding 3vw 7vw
                    border 1px solid #dbdbdb
                    color #999
                    display inline-block
                    border-radius 3px
                    margin-right 2.66vw
                    margin-top 2.66vw
                    margin-bottom 5.33vw
                .active
                    background-color #469afe
                    color #fff    
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
