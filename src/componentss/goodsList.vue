<template>
    <div class="box">
        <slot ref="homeTitle"></slot>
        <div class="tab">
            <div class="item-tab active">销量优先</div>
            <div class="item-tab">评分优先</div>
            <div class="item-tab">热门新店</div>
        </div>
        <div ref="shopList" class="shop">
            <ul>
                <li v-for="item in shopList" :key="item.shop_id" class="shop-list">
                    <router-link :to="'/shop/'+item.shop_id">
                        <div class="shop-list-item">
                            <div class="shop-left">
                                <img :src="item.logo" alt="" class="shop-img" :onerror="defaultImg">
                                <span class="tag new" v-if="item.is_new == 1">new</span>
                                <span class="tag hot" v-if="item.is_hot == 1">hot</span>
                            </div>
                            <div class="shop-right">
                                <div class="shop-title">
                                    <div class="shop-name">{{item.shop_name}}</div>
                                    <div class="shop-status" v-if="item.status == 0">休息中</div>
                                </div>
                                <div class="shop-content">
                                    <div class="shop-score">
                                        <el-rate
                                            v-model="item.store_ratings"
                                            disabled
                                            allow-half
                                            show-score
                                            void-color="#ff3800"
                                            text-color="#333"
                                            score-template="{value}">
                                        </el-rate>

                                    </div>
                                    <div class="shop-sale">{{item.sale}}m | 销量 {{item.sale}}</div>
                                </div>
                                <div class="shop-foot">
                                    <div class="shop-label-left">
                                        
                                        <span  v-for="label in item.tags" :key="label">{{label}}</span>
                                    </div>
                                    <div class="shop-label-right">
                                        <span class="label-status">
                                            送到寝室
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import  BScroll from 'better-scroll'
export default {
    name:'goodsList',
    props:{
        shopList:Array
    },
    data () {
        return {
            defaultImg: 'this.src="' + require('../assets/img/defaultshop.png') + '"'
        }
    },
    methods : {
         handleTop () {
            var scrollTop = this.styleIndex.handleScroll()
            // if(scrollTop >= 180){
            //     this.ishead = true
            // }else{
            //     this.ishead = false
            // }
            console.log(scrollTop,123)
        },
    },
    mounted (){
        window.addEventListener("scroll",this.handleTop)
    },
}
</script>
<style lang="stylus" scoped>
@import "~css/style"
.box
    position relative
    padding-bottom 14vw
    .tab
        display flex
        padding 0 6vw
        // border-bottom 1px solid #f7f7f7
        .item-tab
            text-align center
            flex 1
            height 10.6vw
            line-height 10.6vw
            color #999
        .active
            color #469afe
            font-weight bold
    .shop
        // position absolute
        // top 24vw
        // left 0
        // right 0
        // bottom 0
        // overflow hidden
        // z-index 1
        .shop-list
            .shop-list-item
                border-top 1px solid #f7f7f7
                display flex
                padding 5.3vw 2.66vw
                .shop-left 
                    // flex 0 18.66vw
                    height 100%;
                    margin-right 2.66vw
                    box-sizing border-box
                    position relative
                    width 16vw
                    height 16vw
                    .shop-img
                        width 100%
                        height 100%
                        // padding-right 2.66vw
                    .tag
                        position absolute
                        right 0
                        top 0
                        width 8vw
                        height 3.2vw
                        text-align center
                        color #fff
                        line-height 2.4vw
                        font-style italic
                        font-size 1.6vw
                    .new
                        background-color #31dd7a
                    .hot
                        background-color #dd3131    
                .shop-right 
                    flex 1 auto    
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
                            color #999
                            font-size 2.93vw
                    .shop-foot
                        display flex
                        justify-content space-between
                        .shop-label-left 
                            span 
                                display inline-block
                                font-size 2.1vw
                                color #999
                                border 1px solid #999
                                padding 0.8vw 2vw
                                margin-right 2.66vw
                                border-radius 0.8vw
                        .shop-label-right 
                            span 
                                font-size 2.4vw
                                background #469afe
                                padding 0.8vw 2vw
                                color #fff


</style>
