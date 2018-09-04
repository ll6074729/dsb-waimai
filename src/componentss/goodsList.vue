<template>
    <div class="box" ref="goodslist"   v-loading.fullscreen.lock="fullscreenLoading">
        <div :class="{'box-head':isgoods,'box-head-search':page == 'shop-search'}" >
            <slot ref="homeTitle"></slot>
            <div class="tab">
                <div class="item-tab" :class="{'active':sort == 0}" @click="chooes(0)">销量优先</div>
                <div class="item-tab" :class="{'active':sort == 1}" @click="chooes(1)">评分优先</div>
                <div class="item-tab" :class="{'active':sort == 2}" @click="chooes(2)">热门新店</div>
            </div>
        </div>
        <div ref="shopList" class="shop" :class="page">
            <ul :class="{'shop-height':isgoods}">
                <!-- <li v-for="item in shopList" :key="item.shop_id" class="shop-list"> -->
                    <router-link tag="li" :to="'/shop/'+item.shop_id" v-for="item in shopList" :key="item.shop_id" class="shop-list">
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
                                    <!-- {{item.sale}}m |  -->
                                    <div class="shop-sale">销量 {{item.sale}}</div>
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
                <!-- </li> -->
            </ul>
        </div>
    </div>
</template>
<script>
// import  BScroll from 'better-scroll'
export default {
    name:'goodsList',
    props:{
        shopList:Array,
        page:String,
    },
    data () {
        return {
            sort:0,
            isgoods:false,
            fullscreenLoading: false,
            defaultImg: 'this.src="' + require('../assets/img/defaultshop.png') + '"'
        }
    },
    methods : {
        chooes (sort) {
            this.sort = sort
            this.fullscreenLoading = true;
            this.handSearch(sort)
        },
        handSearch (sort) {
            let data = {
                url:'http://api.dqvip.cc/buyer/shop_list',
                q_type:'post',
                type_id : this.$route.query.type_id,
                area_id : this.$store.state.area_id,
            }
            if(sort == 0){
                data.sales = 'desc'
            }else if(sort == 1){
                data.store_ratings = 'desc'
            }else if(sort == 2){
                data.is_new = 1
            }
            this.$http({
                method: 'post',
                url: '/mobile/api/q',
                // url:'/api/buyer/shop_list',
                data: data,
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY1YWE4OTRmYmZkMDRiNzU4Yzk2ZGRlOTY0NzcyMWQ5M2IzM2Q1Mzk1NGZlNTAwMmFlNTQ1ODNkMjZlNjZiMDhiMWYxYmI3ZGIyOWY5MzYzIn0.eyJhdWQiOiIyIiwianRpIjoiZjVhYTg5NGZiZmQwNGI3NThjOTZkZGU5NjQ3NzIxZDkzYjMzZDUzOTU0ZmU1MDAyYWU1NDU4M2QyNmU2NmIwOGIxZjFiYjdkYjI5ZjkzNjMiLCJpYXQiOjE1MzU3MTE1MTIsIm5iZiI6MTUzNTcxMTUxMiwiZXhwIjoxNTM4MzAzNTEyLCJzdWIiOiI2NSIsInNjb3BlcyI6WyIqIl19.sr8YCf3ZR1Tc8P4IU8gLK15WTdRwQy-DdZNxSND_C-sTohzhEfuAz6ZqVPnUmCFU9Stb7o94vKBj-SFg8695SxdnQ6KTsln5jbl0zGqZPpa00nyW-2q_PDu8aKTv78inCEtl_bfsJ7XLz9wOnn8LfM9TmQJz4OXRI52baKpsBZ5Dxapp90uvGFlK26rAuzClXasvCSlH9YuC7J0rLP8yhuc8iFscWxN8YhARPIswVlG9_Mij2-DJdwAiqE_3XPxHPLrxIWsD3Ud-NYs0YbqzkXrEAEbDhllxuDW1VxNH1nvX0qNhvPUZ7WV3GuOfJgbIECvpaBfpQ7EWPZp1bQVFktgutGO0RMbATjE6IaD-tlycB46wIxxintgrDg-KGIowdcGXY274hXJCi8smPF0zPgN7UIT-lnddC6ySkldyWtcdWM0jzsUQvXwt2tmoJ1izcysJHkWQUTRU7Y3BB9oEL1qERCa8qCp8mXnMmXNTtUzRhRB2K2-IBstYKKFdvNl4x0FQMehqSHevkAdOixObkwKI5xoHxqdVouv1W01QeeU4nmpT12yQqZl6XL8b5tNBlAel8CbEd23tc3wPDeXdoxyB-kxYGDqqbocRI4rZs5wnuY32D8bweuv3iCf6RgpIgkKNpdWoZmbNW5QOWMfDCn7BRsLG1VXNs4OLryFRNCk'
                // }
            })
                .then(this.getSearch)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getSearch (res) {
            let date = eval('(' + res.data + ')')
            // let date = res.data
            this.shopList = date.data.data //商家列表
            this.fullscreenLoading = false;
        },


        handleTop () {
            var scrollTop = this.styleIndex.handleScroll()
            if(this.page == 'shop-search'){
                if(scrollTop > 1 ){
                    this.isgoods = false
                }else{
                    this.isgoods = true
                }
            }else{
                if(scrollTop < 740){
                    this.isgoods = false
                }else{
                    this.isgoods = true
                }
            }
            
            // console.log(this.$refs.goodslist.getBoundingClientRect().top,93)
            // console.log(scrollTop,123)
        },
    },
    mounted (){
        window.addEventListener("scroll",this.handleTop)
        // this.scroll = new BScroll(this.$refs.shopList,{
        //     click:true
        // })
    },
}
</script>
<style lang="stylus" scoped>
@import "~css/style"
.boxfixed
    position fixed!important
    z-index 101
    top 0
    width 100%
    background #ffffff
.box
    position relative
    // padding-bottom 14vw
    height 100%
    .box-head
        position fixed
        top 12vw
        width 100%
        background-color #fff
        z-index 100
        box-shadow 0px -5px 20px 0px rgba(0,0,0,0.1)
    .box-head-search
        top 0!important    
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
    .shop-search
        top 10.66vw
    .shop-home
        top 23.96vw
    
    .shop
        // position absolute
        // top 10.66vw
        // left 0
        // right 0
        // bottom 0
        // overflow scroll
        // height 155vw
        padding-bottom 15vw
        // z-index 1
        .shop-height
            padding-top 23.96vw    
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
                        line-height 3vw
                        font-style italic
                        font-size 2.6vw
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
