<template>
    <div class="box" ref="goodslist"   v-loading.fullscreen.lock="fullscreenLoading">
        <div :class="{'box-head':isgoods,'box-head-search':page == 'shop-search' && isheader}" ref="tab">
            <slot ref="homeTitle"></slot>
            <!-- <div > -->
                <!-- 0销量  1好评 2 热门新店 -->
                <swiper :options="swiperOption" class="tab"> 
                    <swiper-slide class="item-tab" :class="{'active':sort == 0}">综合排序</swiper-slide>
                    <swiper-slide class="item-tab" :class="{'active':sort == 1}">速度最快</swiper-slide>
                    <swiper-slide class="item-tab" :class="{'active':sort == 2}">销量优先</swiper-slide>
                    <swiper-slide class="item-tab" :class="{'active':sort == 3}">好评优先</swiper-slide>
                    <swiper-slide class="item-tab" :class="{'active':sort == 4}">热门新店</swiper-slide>
                </swiper>    
            <!-- </div> -->
        </div>
        <div ref="shopList" class="shop" :class="page" >
            <ul :class="{'shop-height':isgoods}" v-if="shopList.length > 0">
                <li  v-for="(item,index) in shopList" :key="index" class="shop-list">
                    <router-link class="shop-list-item" :to="'/shop/'+item.shop_id" tag="div">
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
                                        score-template="{value}"
                                        style="display:inline-block"
                                        >
                                    </el-rate>
                                    <span class="shop-sale" style="margin-left:3vw;font-size:10px;display:inline-block;margin-top:-1vw">销量 {{item.sales}}</span>   
                                </div>
                                <!--  {{parseInt(item.sell_time) + parseInt(this.$store.state.process_date)}}-->
                                <div class="shop-sale"> <span v-if="range[item.shop_id] < 1000">{{range[item.shop_id]}}m | </span> <span v-if="range[item.shop_id] > 999">{{(range[item.shop_id]/1000).toFixed(2)}}km |</span>  {{parseInt(item.sell_time) + parseInt(process_date)}}分钟</div>
                            </div>
                            <div class="shop-foot">
                                <div class="shop-label-left">
                                    {{item.take_off}}元起送 | 配送费 <span v-if="parseFloat(item.custom_delivery) != 0">
                                    {{parseFloat(item.custom_delivery) + parseFloat(delivery_price)}}
                                </span>
                                <span v-if="parseFloat(item.custom_delivery) == 0">
                                    {{parseFloat(delivery_cost) + parseFloat(delivery_price)}}
                                </span>
                                    <!-- <span  v-for="label in tags[item.shop_id]" :key="label"  v-if="tags[item.shop_id]">{{label}}</span> -->
                                    <!-- <strong v-if="!tags[item.shop_id]" style="font-size:2.93vw">{{item.addr}}</strong> -->
                                </div>
                                <div class="shop-label-right">
                                    <span class="label-status" v-if="item.delivery_label">
                                        {{item.delivery_label}}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </router-link>
                    <div class="tagBox" v-if="tags[item.shop_id]">
                        <span  v-for="label in tags[item.shop_id]" :key="label"  v-if="tags[item.shop_id]">{{label}}</span>
                    </div>
                    <!-- :class="{'arrow-up':item.arrow_up == true}" -->
                    <div class="shop-prom" :ref="index" :class="{'arrow-up':item.arrow_up == 1}">
                        <span class="span1" v-if="item.picked_up == 1">到店自提</span>
                        <span class="span2" v-for="promitem in item.prom" :key="promitem.prom_id" v-if="promitem.type == 2">
                            {{promitem.title}}
                        </span>
                        <span class="span3" v-for="promitem in item.prom" :key="promitem.prom_id" v-if="promitem.type == 0">
                            {{promitem.title}}
                        </span>
                        <span class="span4" v-for="promitem in item.prom" :key="promitem.prom_id" v-if="promitem.type == 1">
                            {{promitem.title}}
                        </span>
                        <!-- <div class="activity" @click="showtitle(index)">
                            <div class="list-item" v-if="parseFloat(item.custom_delivery) != 0 || parseFloat(delivery_cost) != 0 ">
                                <span class="list-item-left">
                                    <div class="shop-label-activity shop-label-type4">
                                        配送
                                    </div>
                                </span>
                                <span class="list-item-right" v-if="parseFloat(item.custom_delivery) != 0">
                                    配送费{{parseFloat(item.custom_delivery) + parseFloat(delivery_price)}}
                                </span>
                                <span class="list-item-right" v-if="parseFloat(item.custom_delivery) == 0">
                                    配送费{{parseFloat(delivery_cost) + parseFloat(delivery_price)}}
                                </span>
                                <img src="../assets/img/down_black.png" alt="" style="width:9px;height:5px;margin-top:5px;transform:rotate(0deg);">
                            </div>
                            <div class="list-item" v-if="shopprom[item.shop_id].full ==1">
                                <span class="list-item-left">
                                    <div class="shop-label-activity shop-label-type1">
                                        满减
                                    </div>
                                </span>
                                <span class="list-item-right">
                                    <span v-for="promitem in item.prom" :key="promitem.prom_id" v-if="promitem.type == 0">
                                        {{promitem.title}}
                                    </span>
                                </span>
                            </div>
                            <div class="list-item"  v-if="shopprom[item.shop_id].give ==1 ">
                                <span class="list-item-left">
                                    <div class="shop-label-activity shop-label-type3">
                                        赠品
                                    </div>
                                </span>
                                <span class="list-item-right">
                                    <span v-for="promitem in item.prom" :key="promitem.prom_id" v-if="promitem.type == 1">
                                        满{{promitem.condition}}赠{{promitem.title}}
                                    </span>
                                </span>
                            </div>
                            <div class="list-item"  v-if="shopprom[item.shop_id].order ==1">
                                <span class="list-item-left">
                                    <div class="shop-label-activity shop-label-type2">
                                        首单
                                    </div>
                                </span>
                                <span class="list-item-right">
                                    <span v-for="promitem in item.prom" :key="promitem.prom_id" v-if="promitem.type == 2">
                                        {{promitem.title}}
                                    </span>
                                </span>
                            </div>
                        </div> -->
                    </div>
                    <!-- <img src="../assets/img/down_black.png" alt="" v-if="item.arrow_up" class="down" :class="{'arrow_down':item.arrow_down == 2}" @click="up(index)"> -->
                </li>
            </ul>
            <div style="text-align: center;font-size: 2.93vw;color: #999;">没有更多商家咯~！</div>
        </div>
        <div v-if="shopList.length < 1" class="shop-no">
            <img src="../assets/img/noshop.png" alt="" >
            <div>
                真对不起,商家们不知道哪里去了 ╥﹏╥
            </div>
        </div>
        <div id="allmap" style="display:none"></div>
    </div>
</template>
<script>
var vm = null
import BMap from 'BMap'
// import  BScroll from 'better-scroll'
export default {
    name:'goodsList',
    props:{
        shopList:Array,
        page:String,
        input10:String,
        shopprom:Array,
        tags:Array,
        range:Array,
    },
    data () {
        return {
            sort:0,
            isgoods:false,
            isheader:false,
            fullscreenLoading: false,
            delivery_cost:this.$store.state.delivery_cost,
            defaultImg: 'this.src="' + require('../assets/img/defaultshop.png') + '"',
            lng:localStorage.lng,
            lat:localStorage.lat,
            process_date:this.$store.state.process_date || 0,
            delivery_price:this.$store.state.delivery_price || 0.00,
            swiperOption: {
                // autoplay: true,
                slidesPerView : 4.5,
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
                on:{
                    click:function () {
                        const realIndex = this.clickedIndex;
                        vm.chooes(realIndex);
                    }
                }
            },
        }
    },
    methods : {
        showtitle(index){
            console.log(index)
            this.shopList[index].showtitle = true
            
        },
        _GetDistance() {
            if(localStorage.lat || localStorage.lng){
                window.map = new BMap.Map('allmap') 
            }
        },
        chooes (sort) {
            this.sort = sort
            this.fullscreenLoading = true;
            if(this.page == 'shop-search'){
                document.documentElement.scrollTop = document.body.scrollTop = 0
            }
            this.handSearch(sort)
        },
        handSearch (sort) {
            let data = {
                url:'http://api.dqvip.cc/buyer/shop_list',
                q_type:'post',
                type_id : this.$route.query.type_id,
                area_id : this.$store.state.area_id,
                search_name:this.input10
            }
            if(sort == 2){
                data.sales = 'desc'
            }else if(sort == 3){
                data.store_ratings = 'desc'
            }else if(sort == 4){
                data.is_new = 1
            }else if(sort == 0){
                data.sort = 'desc'
            }else if (sort == 1){
                data.avg_minute = 'desc'
            }
            this.$http({
                method: 'post',
                url: '/mobile/api/q',
                // url:'/api/buyer/shop_list',
                data: data,
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
            if(!this.$refs.tab.getBoundingClientRect()){
                return
            }
            let tab = this.$refs.tab.getBoundingClientRect().height
            let shopList = this.$refs.shopList.getBoundingClientRect().top
            if(this.page == 'shop-search'){
                if(shopList >  tab){
                    this.isheader = false
                }else{
                    this.isheader = true
                }
            }else{
                if(scrollTop < 700){
                    this.isgoods = false
                }else{
                    this.isgoods = true
                }
            }
        },
        up(index){
            // this.shopList[0].arrow_up = !this.shopList[0].arrow_up
            if(this.shopList[index].arrow_up == 2){
                this.shopList[index].arrow_up = 1
                this.$set(this.shopList[index],'arrow_up',1)
            }else{
                this.shopList[index].arrow_up = 2
                this.$set(this.shopList[index],'arrow_up',2)
            } 
        },
        // 隐藏标签
        isshow () {
            for(let i = 0; i < this.shopList.length; i++){
                if(this.$refs[i][0].clientHeight > 25){
                    this.shopList[i].arrow_up = 1
                    // this.shopList[i].arrow_down = false
                }
            }
        }
    },
    watch :{
        shopList () {
            this.isshow()
            this.shopprom = []
            for (var i = 0; i < this.shopList.length;i++) {
                this.shopList[i].showtitle = false
                if(this.shopList[i].prom.length > 0){
                    this.shopprom[this.shopList[i].shop_id] = {}
                    for(let j = 0; j <this.shopList[i].prom.length;j++){
                        if(this.shopList[i].prom[j].type == 0){
                            this.shopprom[this.shopList[i].shop_id].full = 1
                        }
                        if(this.shopList[i].prom[j].type == 1){
                            this.shopprom[this.shopList[i].shop_id].give = 1
                        }
                        if(this.shopList[i].prom[j].type == 2){
                            this.shopprom[this.shopList[i].shop_id].order = 1
                        }
                    }
                }else{
                    this.shopprom[this.shopList[i].shop_id] = {}
                    this.shopprom[this.shopList[i].shop_id].full = 0
                    this.shopprom[this.shopList[i].shop_id].give = 0
                    this.shopprom[this.shopList[i].shop_id].order = 0
                }
            }
            // 店铺距离
            for(let i in this.shopList){
                if(this.shopList[i].tags){
                    let tag = this.shopList[i].tags
                    this.tags[this.shopList[i].shop_id] = tag.split(',')
                }
                if(this.shopList[i].longitude && this.shopList[i].latitude){
                    var pointA = new BMap.Point(this.lng, this.lat)
                    var pointB = new BMap.Point(this.shopList[i].longitude, this.shopList[i].latitude)
                    let distance = parseInt(window.map.getDistance(pointA,pointB))
                }else{
                    this.range[this.shopList[i].shop_id] = 0
                }
            }
        },
    },
    created () {
        this._GetDistance()
        vm = this
    },
    mounted (){
        this.isshow()
        window.addEventListener("scroll",this.handleTop)
        // this.scroll = new BScroll(this.$refs.shopList,{
        //     click:true
        // })
    },
}
</script>
<style lang="stylus" scoped>
@import "~css/style"
.shop-no
    text-align center     
    color #999
    img 
        width 66.66vw
        height 66.66vw 
        margin-top 10.33vw    
        margin-bottom 5vw    
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
        position fixed
        top 0 !important    
        width 100%
        background-color #fff
        z-index 100
        box-shadow 0px -5px 20px 0px rgba(0,0,0,0.1)
    .tab
        display flex
        // padding 0 6vw
        // border-bottom 1px solid #f7f7f7
        .item-tab
            text-align center
            // width 29.33vw
            height 10.6vw
            line-height 10.6vw
            color #999
            font-size 3.46vw
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
            position relative
            .shop-list-item
                border-top 1px solid #f7f7f7
                display flex
                padding 2.66vw
                // padding-bottom 0
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
                            padding-top 0.5vw
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
                        margin-top 1vw
                        justify-content space-between
                        .shop-sale
                            color #999
                            font-size 2.93vw
                            line-height 4vw
                    .shop-foot
                        display flex
                        justify-content space-between
                        margin-top 2vw
                        .shop-label-left 
                            color #999
                            font-size 2.93vw
                            // span 
                            //     display inline-block
                            //     font-size 2.1vw
                            //     color #999
                            //     border 1px solid #dbdbdb
                            //     padding 0.8vw 2vw
                            //     margin-right 2.66vw
                            //     border-radius 0.8vw
                        .shop-label-right 
                            span 
                                font-size 2.4vw
                                background #469afe
                                padding 0.8vw 2vw
                                padding-bottom 0.4vw
                                color #fff
            .tagBox
                padding-left 21.32vw    
                margin-bottom 2vw 
                span
                    text-align center  
                    // padding 1vw 2.93vw 
                    color #4ea1ff
                    padding .1rem .1rem .05rem
                    // border 1px solid #dbdbdb
                    border-radius 3px
                    margin-right 5px
                    display inline-block
                    background #eaf1ff
                    font-size 10px
            .arrow_down
                transform rotate(180deg)
            .down
                position absolute
                right 5vw
                top 32vw
                width 9px
                height 5px
                transform rotate(0deg)      
            .arrow-up
                display -webkit-box
                -webkit-box-orient vertical
                -webkit-line-clamp 1
                overflow hidden        
            .shop-prom
                padding-left 21.32vw
                margin-bottom 2.66vw
                // margin-top 2vw
                padding-right 10vw
                position relative
                span
                    border 1px solid #dbdbdb
                    font-size 10px
                    color #999
                    padding 0.08rem 1.5vw
                    padding-bottom 0.04rem
                    margin-right 0.6vw
                    margin-bottom 1.5vw
                    display inline-block
                .span1
                    color #30b9aa
                    border-color #d6f4f1
                .span2 
                    color #4ea1ff
                    border-color #eaf1ff 
                .span3
                    color #fa6056
                    border-color #fcdfdd
                .span4
                    color #4ea1ff
                    border-color #eaf1ff    
                // .activity
                //     .list-item
                //         display flex
                //         margin 2.66vw 0
                //         position relative
                //         &:last-child
                //             margin-bottom 0
                //         .list-item-left 
                //             // width 8.66vw
                //             margin-right 1.33vw
                //             .shop-label-activity
                //                 font-size 1.6vw
                //                 width 100%
                //                 box-sizing border-box
                //                 padding 2px
                //                 border-radius 3px
                //             .shop-label-type1
                //                 color #ff7373 
                //                 background-color #ffe1e1
                //                 border solid 1px #ffa6a6
                //             .shop-label-type2
                //                 color #f0af53
                //                 background-color #fffae1
                //                 border solid 1px #f0af53
                //             .shop-label-type3
                //                 color #43ce56
                //                 background-color #e2ffe1
                //                 border solid 1px #7ccc87
                //             .shop-label-type4
                //                 color #81a2ff
                //                 background-color #e1efff
                //                 border solid 1px #a6bdff
                //         .list-item-right
                //             flex 1
                //             font-size 2.93vw
                //             line-height 5vw
                //             margin-top -.5vw
                //             max-width 65vw
                //             ellipsis()
</style>
