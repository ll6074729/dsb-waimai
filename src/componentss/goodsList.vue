<template>
    <div class="box">
        <slot></slot>
        <div class="tab">
            <div class="item-tab active">销量优先</div>
            <div class="item-tab">评分优先</div>
            <div class="item-tab">优惠优先</div>
        </div>
        <div ref="warpper" class="shop">
                <router-link class="shop-list" tag="div" v-for="item in list" :key="item.id" :to="'/shop/'+item.id">
                    <div class="shop-list-item">
                        <div class="shop-left">
                            <img :src="item.imgUrl" alt="" class="shop-img">
                        </div>
                        <div class="shop-right">
                            <div class="shop-title">
                                <div class="shop-name">{{item.name}}</div>
                                <div class="shop-status" v-if="item.status == 1">休息中</div>
                            </div>
                            <div class="shop-content">
                                <div class="shop-score">
                                    <el-rate
                                        v-model="item.score"
                                        disabled
                                        allow-half
                                        show-score
                                        void-color="#ff3800"
                                        text-color="#333"
                                        score-template="{value}">
                                    </el-rate>

                                </div>
                                <div class="shop-sale">{{item.sale}}m | 月售 {{item.sale}}</div>
                            </div>
                            <div class="shop-foot">
                                <div class="shop-label-left">
                                    
                                    <span  v-for="label in item.label" :key="label">{{label}}</span>
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
        </div>
    </div>
</template>
<script>
import  BScroll from 'better-scroll'
export default {
    name:'goodsList',
    mounted (){
        // this.scroll = new BScroll(this.$refs.warpper)
    },
    props:{
        list:Array
    },
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
@import "~css/style"
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
        .shop-list
            .shop-list-item
                border-top 1px solid #f7f7f7
                display flex
                padding 5.3vw 2.66vw
                .shop-left 
                    flex 0 18.66vw
                    height 100%;
                    .shop-img
                        width 16vw
                        height 16vw
                        padding-right 2.66vw
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
