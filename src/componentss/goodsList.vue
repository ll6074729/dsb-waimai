<template>
    <div class="box" ref="goodslist" :class="{'boxfixed':isgoods}"  v-loading.fullscreen.lock="fullscreenLoading">
        <slot ref="homeTitle"></slot>
        <div class="tab">
            <div class="item-tab" :class="{'active':sort == 0}" @click="chooes(0)">销量优先</div>
            <div class="item-tab" :class="{'active':sort == 1}" @click="chooes(1)">评分优先</div>
            <div class="item-tab" :class="{'active':sort == 2}" @click="chooes(2)">热门新店</div>
        </div>
        <div ref="shopList" class="shop" :class="page">
            <ul>
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
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
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
            // if(scrollTop >= 180){
            //     this.ishead = true
            // }else{
            //     this.ishead = false
            // }
            // if(this.$refs.goodslist.offsetTop >= scrollTop){
            //     this.isgoods = false
            // }else{
            //     this.isgoods = true
            //     this.scroll = new BScroll(this.$refs.shopList)
            // }
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
    padding-bottom 14vw
    height 100%
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
        position absolute
        // top 10.66vw
        left 0
        right 0
        bottom 0
        overflow scroll
        height 155vw
        padding-bottom 15vw
        z-index 1
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
