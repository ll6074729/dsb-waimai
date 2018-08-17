<template>
    <div style="position: relative">
        <!-- 头部 -->
        <div class="shop-head">
            <router-link class="shop-head-left" tag="div" to="/">
                <img src="../../assets/img/back_white.png" alt="">
            </router-link>
            <div class="shop-head-right">
                <img src="../../assets/img/favorite.png" alt="" v-show="isCollect" @click="isCollectA">
                <img src="../../assets/img/favorite_white.png" alt="" v-show="!isCollect" @click="isCollectA">
            </div>
        </div>
        <!-- 商家信息 -->
        <div class="shop-warp">
            <div class="shop-info">
                <div class="shop-left">
                    <img :src="shop.logo" alt="" class="shop-img" :onerror="this.$store.state.defaultHead">
                </div>
                <div class="shop-right">
                    <div class="shop-title">
                        <div class="shop-name">{{shop.shop_name}}</div>
                        <div class="shop-status" v-if="shop.status == 1">休息中</div>
                    </div>
                    <div class="shop-content">
                        <div class="shop-score">
                            <el-rate
                                v-model="shop.store_ratings"
                                disabled
                                allow-half
                                show-score
                                void-color="#ff3800"
                                text-color="#fff"
                                score-template="{value}">
                            </el-rate>
                        </div>
                        <div class="shop-sale">{{shop.sales}}m | 销量 {{shop.sales}}</div>
                    </div>
                    <div class="shop-foot">
                        {{shop.addr}}
                    </div>
                </div>
            </div>
            <div class="activity">
                <div v-for="item in shop.prom" :key="item.prom_id">
                    <div class="list-item">
                        <span class="list-item-left">
                            <div class="shop-label-activity shop-label-type1"  v-if="item.type == 0">
                                满减
                            </div>
                            <div class="shop-label-activity shop-label-type2"  v-else-if="item.type == 2">
                                首单
                            </div>
                            <div class="shop-label-activity shop-label-type3"  v-else-if="item.type == 1">
                                赠品
                            </div>
                        </span>
                        <span class="list-item-right">{{item.title}}</span>
                    </div>
                </div>
            </div>
        </div>
        <shop-recommend :food = "shop.recommend_goods" :cart="cart" @upup="changeBuy" @AglinCart="AglinCart" @buygoodsinfo="buygoodsinfo" ></shop-recommend>
        <!-- tab列表 -->
        <div class="shop-box">
            <div class="tab" :class="{ishead:ishead}" ref="tabTop">
                <div class="tab-btn" :class="{'active':isShowA}" @click="tab()">商品</div>
                <div class="tab-btn" :class="{'active':!isShowA} " @click="tab()">评论</div>
            </div>
            <div class="tab-box" :class="{'tab-box-ab':ishead}" >
                <div class="shop-buy" v-show="isShowA">
                    <shop-menu :cate="shop.cate"></shop-menu>
                    <shop-product :goods="shop.cate" :cart="cart"></shop-product>
                </div>
                <div class="shop-comment" v-show="!isShowA">
                    <shop-comment ></shop-comment>
                </div>
            </div>
            <div class="shop-cart">
                <shop-foot 
                    :isBuy="!isBuy" 
                    :cart="cart"
                    @cleanCart ="cleanCart" 
                    :costPrice="costPrice" 
                    :rulingPrice="rulingPrice" 
                    :addressList="addressList"
                    ></shop-foot>
                <shop-buy 
                :isBuy="isBuy" 
                :goodsinfo="goodsinfo"
                :cart="cart"
                @AglinCart="AglinCart"
                @closeGoodsInfo="changeGoodsInfo"
                ></shop-buy>
            </div>
            
        </div>
    </div>
</template>
<script>
import ShopMenu from "./components/shopmenu"
import ShopProduct from "./components/shopproduct"
import ShopFoot from "./components/shopfoot"
import ShopBuy from "./components/shopbuy"
import ShopComment from "./components/comment"
import ShopRecommend from "./components/shoprecommend"
export default {
    name:'Shop',
    components:{
        ShopMenu,
        ShopProduct,
        ShopFoot,
        ShopBuy,
        ShopComment,
        ShopRecommend
    },
    data () {
        return {
            shop:[], //店铺信息
            cart:[], //购物车
            isShowA:true,
            isCollect: false,  //是否收藏
            ishead:false,
            isBuy:false, //规格
            costPrice:0, //原价
            rulingPrice:0, //折扣价
            addressList:[],
            goodsinfo:[],
            shopprom:[]
        }
    },
    methods:{
        // 再次请求购物车
        AglinCart () {
            this.getCart()
        },
        buygoodsinfo (msg) {
            this.goodsinfo = msg
        },
        // 更改显示 立即购买 还是规格选择
        changeBuy (msg) {
            this.isBuy = msg
        },
        changeGoodsInfo (msg){
            this.isBuy = msg
        },
        tab () {
            this.isShowA = !this.isShowA
        },
        isCollectA () {
            this.isCollect = !this.isCollect
            this.getCollect()
        },
        // 获取地址
        getaddressList () {
            this.$http({
                method: 'get',
                url:"/api/buyer/list_address",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    // q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.getaddrList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getaddrList (res){
            // const date = eval('('+res.data+')')
            let date = res.data
            this.addressList = date.data
            for(let i in  this.addressList){
                if(this.addressList[i].is_default == 1){
                    // this.$store.state.defaultAddress = this.addressList[i]
                    this.$store.dispatch("defaultAddress",JSON.stringify(this.addressList[i]))
                }
            }
        },
        getCollect () {
            // 更改收藏状态
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                data: {
                    url:'http://api.dqvip.cc/buyer/collect_shop',
                    shop_id:this.$route.params.id,
                    collect_type:this.isCollect,
                    q_type:'get'
                },
            })
                .then(this.collect)
                .catch(function (error) {
                    console.log(error);
                })
        },
        collect (res) {
            let date = eval('('+res.data+')')
            console.log(eval(date))
            // this.isCollect = eval(res.data.message)
            if(date.message  == false){
                this.$message({
                    message: '收藏成功',
                    type: 'success',
                    // duration:0
                });
            }else{
                this.$message({
                    message: '取消收藏',
                    type: 'warning',
                    // duration:0
                });
            }
        },
        getlist () {
            // 获取店铺信息 传一个店铺ID
            this.$http({
                method: 'post',
                // url: 'mobile/api/q',
                url:"/api/buyer/shop_info",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    shop_id:this.$route.params.id,
                    // q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.getlistbox)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getlistbox(res){
            // let date = eval('('+res.data+')')
            let date = res.data
            this.shop = date.data
            if(this.shop.is_collect == 0){
                this.isCollect = false
            }else{
                this.isCollect = true
            }
        },
        getCart () {
            // 获取购物车信息 传一个店铺ID
            this.$http({
                method: 'post',
                // url: 'mobile/api/q',
                url:"/api/buyer/cart_list",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    shop_id:this.$route.params.id,
                    // q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.getCartList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getCartList (res) {
            let date = res.data
            // console.log(date,888)
            this.cart = date.data
        },
        // 清空购物车
        cleanCart (msg){
            this.cart = msg
        },
        // 固定在顶部
        handleTop () {
            var tabTop = this.$refs.tabTop.getBoundingClientRect()
            var tabTop1 = tabTop.top
            if(tabTop1 >= 0 ){
                this.ishead = false
            }else{
                this.ishead = true
            }
        }
    },
    watch : {
        cart () {
            let cart = this.cart
            let total = 0
            for(let i in cart){
                total += ((parseFloat(cart[i].goods.price) + parseFloat(cart[i].spec_price)) * cart[i].goods_num) 
            }
            this.costPrice = total.toFixed(2)
            this.rulingPrice = total.toFixed(2)
        },
        shop () {
            let shopprom = []
            for(var i = 0;i < this.shop.prom.length;i++){
                shopprom[i] = new Array()
                for(var j = 0;j < this.shop.prom.length;j++){
                    if(this.shop.prom[i].type == this.shop.prom[j].type){
                        shopprom[i][j] = this.shop.prom[i]
                    }    
                }
                
            }
            console.log(shopprom,988989)
            // this.shopprom = shopprom
            // console.log(shopprom,9989)
        }
    },
    computed :{
        // shopprom () {
        //     return shop.prom
        // }
    },
    mounted () {
        this.getlist()
        this.getCart()
        this.getaddressList()
        window.addEventListener('scroll',this.handleTop)
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
                    // width 8.66vw
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
        .ishead
            position fixed
            top 0
            width 100%      
            background-color #fff
            z-index 1000  
        .tab-box
            position relative
            width 100%
            .shop-buy
                display flex
                position relative
        .tab-box-ab
            padding-top 10.66vw        
        .shop-cart
            position fixed
            bottom 0
            background-color #fff
            width 100%
            box-shadow 0px -5px 20px 0px rgba(0, 0, 0, 0.05)
</style>
