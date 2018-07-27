<template>
    <div>
        <!-- 头部 -->
        <div class="shop-head">
            <router-link class="shop-head-left" tag="div" to="/">
                <img src="../../assets/img/back_white.png" alt="">
            </router-link>
            <div class="shop-head-right">
                <img src="../../assets/img/favorite.png" alt="" v-show="isCollect" @click="collect">
                <img src="../../assets/img/favorite_white.png" alt="" v-show="!isCollect" @click="collect">
            </div>
        </div>
        <!-- 商家信息 -->
        <div class="shop-warp">
            <div class="shop-info">
                <div class="shop-left">
                    <img :src="shop.imgUrl" alt="" class="shop-img">
                </div>
                <div class="shop-right">
                    <div class="shop-title">
                        <div class="shop-name">{{shop.name}}</div>
                        <div class="shop-status" v-if="shop.status == 1">休息中</div>
                    </div>
                    <div class="shop-content">
                        <div class="shop-score">
                            <el-rate
                                v-model="shop.score"
                                disabled
                                allow-half
                                show-score
                                void-color="#ff3800"
                                text-color="#fff"
                                score-template="{value}">
                            </el-rate>
                        </div>
                        <div class="shop-sale">{{shop.sale}}m | 月售 {{shop.sale}}</div>
                    </div>
                    <div class="shop-foot">
                        {{shop.describe}}
                    </div>
                </div>
            </div>
            <div class="activity">
                <div v-for="item in activity" :key="item.type">
                    <div class="list-item">
                        <span class="list-item-left">
                            <div class="shop-label-activity shop-label-type1"  v-if="item.type == 1">
                                满减
                            </div>
                            <div class="shop-label-activity shop-label-type2"  v-else-if="item.type == 2">
                                配送
                            </div>
                            <div class="shop-label-activity shop-label-type3"  v-else-if="item.type == 3">
                                赠品
                            </div>
                        </span>
                        <span class="list-item-right">{{item.warp}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- tab列表 -->
        <div class="shop-box">
            <div class="tab">
                <div class="tab-btn" :class="{'active':isShowA}" @click="tab()">商品</div>
                <div class="tab-btn" :class="{'active':!isShowA} " @click="tab()">评论</div>
            </div>
            <div class="tab-box">
                <div class="shop-buy" v-show="isShowA">
                    <shop-menu></shop-menu>
                    <shop-product></shop-product>
                </div>
                <div class="shop-comment" v-show="!isShowA">
                    2
                </div>
            </div>
            <div class="shop-cart">
                <!-- <shop-foot></shop-foot> -->
                <shop-buy></shop-buy>
            </div>
            
        </div>
    </div>
</template>
<script>
import ShopMenu from "./components/shopmenu"
import ShopProduct from "./components/shopproduct"
import ShopFoot from "./components/shopfoot"
import ShopBuy from "./components/shopbuy"
export default {
    name:'Shop',
    components:{
        ShopMenu,
        ShopProduct,
        ShopFoot,
        ShopBuy
    },
    data () {
        return {
            shop:{imgUrl:require("../../assets/img/组17@3x.png"),name:"德克士（金牛凤凰立交店4)",status:0,id:4,score:4,sale:992,describe:"四川省城市职业学院9栋楼下"},
            activity:[{type:1,warp:"满20减5，满30减10，满40减20，满50减3020减5，满30减10，满40减20，满50减30"},{type:2,warp:"配送费 2 元"},{type:3,warp:"满 13.0 元送可口可乐"}],
            isShowA:true,
            isCollect:true,
        }
    },
    methods:{
        tab () {
            this.isShowA = !this.isShowA
        },
        collect () {
            this.isCollect = !this.isCollect
        }
    }
}
</script>
<style lang="stylus" scoped>
    .shop-score >>> .el-rate__icon
        font-size 2.13vw
        color rgb(255,255,255)!important
    .shop-score >>> .el-rate
        height 2.13vw
    .shop-head
        display flex
        justify-content space-between
        width 100%;
        height 10.66vw
        align-items center
        padding 1.33vw 2.66vw
        box-sizing border-box
        background-image: linear-gradient(90deg, 
		#4c91fe 0%, 
		#41a1fe 33%, 
		#35b0fd 65%, 
		#4c91fe 100%), 
	linear-gradient(
		#ffffff, 
		#ffffff);
        .shop-head-left 
            width 2.13vw
            height 4.13vw
            img 
                width 2.13vw
                height 4.13vw
        .shop-head-right 
            width 5.33vw
            height 5.33vw
            img 
                width 5.33vw
                height 5.33vw  
    .shop-warp    
        background-image: linear-gradient(90deg, 
            #4c91fe 0%, 
            #41a1fe 33%, 
            #35b0fd 65%, 
            #4c91fe 100%), 
        linear-gradient(
            #ffffff, 
            #ffffff); 
        padding-bottom 5.33vw       
        .shop-info
            display flex
            margin-top -2px
            padding 2.66vw
            color #fff
            .shop-left 
                flex 0 18.66vw
                height 100%;
                .shop-img
                    width 16vw
                    height 16vw
                    margin-right 2.66vw
                    border-radius 5px
            .shop-right 
                flex 1 auto    
                overflow-x hidden
                .shop-title
                    width 100%
                    display flex
                    justify-content space-between
                    .shop-name
                        font-size 4.26vw
                        height 4.3vw
                        font-weight bold
                        width 75%
                        ellipsis()
                    .shop-status
                        width 13.3vw
                        height 5.3vw
                        background-color #dbdbdb
                        border-radius 2.66vw
                        text-align center
                        line-height 5.3vw
                        font-size 2.93vw
                        color #999
                .shop-content
                    display flex
                    margin 2.66vw 0
                    justify-content space-between
                    .shop-sale
                        color #fff
                        font-size 2.93vw
                .shop-foot
                    font-size 3.2vw
        .activity
            margin 0 6.4vw
            padding 2.66vw 5.33vw
            background-color rgba(0, 0, 0, 0.2)
            .list-item
                display flex
                margin 2.66vw 0
                .list-item-left 
                    width 8.66vw
                    margin-right 1.33vw
                    .shop-label-activity
                        font-size 1.6vw
                        width 100%
                        box-sizing border-box
                        padding 2px
                        border-radius 6px
                    .shop-label-type1
                        color #ff7373 
                        background-color #ffe1e1
                        border solid 1px #ffa6a6
                    .shop-label-type2
                        color #81a2ff
                        background-color #e1efff
                        border solid 1px #a6bdff
                    .shop-label-type3
                        color #43ce56
                        background-color #e2ffe1
                        border solid 1px #7ccc87
                .list-item-right
                    flex 1
                    color #fff
                    font-size 2.93vw
                    line-height 5vw
    .shop-box
        // padding-bottom 13.33vw
        .tab
            display flex
            height 10.66vw
            line-height 10.66vw
            border-bottom 1px solid #f7f7f7
            .tab-btn
                flex 1
                font-size 4.26vw
                text-align center
            .active
                color #4897fe
        .tab-box
            position relative
            width 100%
            .shop-buy
                display flex
        .shop-cart
            position fixed
            bottom 0
            width 100%
            background-color #ffffff
            box-shadow 0px -5px 20px 0px rgba(0, 0, 0, 0.05)
</style>
