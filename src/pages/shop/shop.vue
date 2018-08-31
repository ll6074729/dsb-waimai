<template>
    <div style="position: relative">
        <div class="backg"></div>
        <!-- 头部 -->
        <div class="shop-head">
            <router-link class="shop-head-left" tag="div" to="/">
                <img src="../../assets/img/back_white.png" alt="">
            </router-link>
            <div class="shop-head-right">
                <img src="../../assets/img/favorite.png" alt="" v-show="!isCollect" @click="isCollectA">
                <img src="../../assets/img/favorite_white.png" alt="" v-show="isCollect" @click="isCollectA">
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
                        <div class="shop-status" v-if="shop.status == 0">休息中</div>
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
            <div class="activity" v-if="shop.prom.length > 1">
                <div>
                    <div class="list-item" v-if="shoptitle[0]">
                        <span class="list-item-left">
                            <div class="shop-label-activity shop-label-type1">
                                满减
                            </div>
                        </span>
                        <span class="list-item-right">{{shoptitle[0]}}</span>
                    </div>
                    <div class="list-item" v-if="shoptitle[1]">
                        <span class="list-item-left">
                            <div class="shop-label-activity shop-label-type3">
                                赠品
                            </div>
                        </span>
                        <span class="list-item-right">{{shoptitle[1]}}</span>
                    </div>
                    <div class="list-item" v-if="shoptitle[2]">
                        <span class="list-item-left">
                            <div class="shop-label-activity shop-label-type2">
                                首单
                            </div>
                        </span>
                        <span class="list-item-right">{{shoptitle[2]}}</span>
                    </div>
                </div>
            </div>
        </div>
        <shop-recommend 
            :food="shop.recommend_goods" 
            :cart="cart" 
            :recommendImg="recommendImg"
            @upup="changeBuy" 
            @AglinCart="AglinCart" 
            @buygoodsinfo="buygoodsinfo" 
        ></shop-recommend>
        <!-- tab列表 -->
        <div class="shop-box"  ref="tabTop">
            <div class="tab" :class="{ishead:ishead}">
                <div class="tab-btn" :class="{'active':isshowtab == 0}" @click="tab(0)">商品</div>
                <div class="tab-btn" :class="{'active':isshowtab == 1} " @click="tab(1)">评论</div>
            </div>
            <div class="tab-box" :class="{'tab-box-ab':ishead}" >
                <div class="shop-buy" v-show="isShowA">
                    <shop-menu :cate="shop.cate" :ishead="ishead"></shop-menu>
                    <shop-product 
                        :goods="shop.cate" 
                        :cart="cart" 
                        :productImg="productImg"
                        :ishead="ishead"
                        @AglinCart="AglinCart"
                        @upup="changeBuy"
                        @buygoodsinfo="buygoodsinfo"
                        ></shop-product>
                </div>
                <div class="shop-comment" v-show="!isShowA">
                    <shop-comment :shop="shop"></shop-comment>
                </div>
            </div>
            <div class="shop-cart">
                <shop-foot 
                    :isBuy="!isBuy" 
                    :cart="cart"
                    :costPrice="costPrice" 
                    :rulingPrice="rulingPrice" 
                    :addressList="addressList"
                    :delivery_price="delivery_price"
                    :shop_status="shop.status"
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
            isshowtab:0,
            isShowA:true,
            isCollect: false,  //是否收藏
            ishead:false,
            isBuy:false, //规格
            costPrice:0, //原价
            rulingPrice:0, //折扣价
            addressList:[],
            goodsinfo:[],
            shopprom:[],
            shoptitle:[],
            delivery_price:0,
            recommendImg:[],
            productImg:[],
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
        tab (tab) {
            this.isshowtab = tab
            this.isShowA = !this.isShowA
        },
        isCollectA () {
            this.isCollect = !this.isCollect
            this.getCollect()
        },
        // 获取地址
        getaddressList () {
            this.$http({
                method: 'post',
                // method:'get',
                url:'mobile/api/q',
                // url:'api/buyer/list_address',
                data: {
                    url:'http://api.dqvip.cc/buyer/list_address',
                    q_type:'get'
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                // }
            })
                .then(this.getaddrList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getaddrList (res){
            const date = eval('('+res.data+')')
            // let date = res.data
            this.addressList = date.data
            let area_price = this.$store.state.delivery_cost
            let delivery_price
            for(let i in  this.addressList){
                if(this.addressList[i].is_default == 1){
                    // this.$store.state.defaultAddress = this.addressList[i]
                    this.$store.dispatch("defaultAddress",JSON.stringify(this.addressList[i]))
                    delivery_price = this.addressList[i].delivery.delivery_price
                    this.$store.dispatch("changedelivery", (parseFloat(area_price) + parseFloat(delivery_price)).toFixed(2))
                    
                }
            }
        },
        getCollect () {
            let type
            if(!this.isCollect){
                type = 'false'
            }else{
                type = 'true'
            }
            console.log(type)
            // 更改收藏状态
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // url:'api/buyer/collect_shop',
                data: {
                    url:'http://api.dqvip.cc/buyer/collect_shop',
                    shop_id:this.$route.params.id,
                    collect_type:type,
                    q_type:'post'
                },
                //  headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                // }
            })
                .then(this.collect)
                .catch(function (error) {
                    console.log(error);
                })
        },
        collect (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            // this.isCollect = eval(res.data.message)
            console.log(date.message)
            if(date.status == 200){
                if(date.message  != 'false'){
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
            }else{
                this.$message({
                    message: '发生不可预料的错误,请联系客服',
                    type: 'error',
                    // duration:0
                });
            }
            
        },
        getlist () {
            // 获取店铺信息 传一个店铺ID
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // url:'api/buyer/shop_info',
                data: {
                    url:'http://api.dqvip.cc/buyer/shop_info',
                    shop_id:this.$route.params.id,
                    q_type:'post'
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                // }
            })
                .then(this.getlistbox)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getlistbox(res){
            let date = eval('('+res.data+')')
            // let date = res.data
            this.shop = date.data
            if(this.shop.is_collect == 1){
                this.isCollect = true
            }else{
                this.isCollect = false
            }
            // 推荐商品的图片
            for(let i in this.shop.recommend_goods){
                this.recommendImg[i] = new Array()
                for(let j in this.shop.recommend_goods[i]){
                    if(this.shop.recommend_goods[i].details_figure)
                        this.recommendImg[i] = this.shop.recommend_goods[i].details_figure.split(',')
                }
            }
            // 列表商品的图片
            console.log(this.shop.cate,5656)
            for(let i in this.shop.cate){
                for(let j = 0;j <this.shop.cate[i].goods.length;j++){
                    if(this.shop.cate[i].goods[j].details_figure){
                        this.productImg[this.shop.cate[i].goods[j].goods_id] = this.shop.cate[i].goods[j].details_figure.split(',')
                    }
                }
            }
            console.log(this.productImg,1993)
        },
        getCart () {
            this.$store.dispatch("changeOrderId",'')
            this.$store.dispatch("changeOrderSn",'')
            // 获取购物车信息 传一个店铺ID
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // url:'api/buyer/cart_list',
                data: {
                    url:'http://api.dqvip.cc/buyer/cart_list',
                    shop_id:this.$route.params.id,
                    q_type:'post'
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                // }
            })
                .then(this.getCartList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getCartList (res) {
            let date = eval('('+res.data+')') 
            // let date = res.data
            this.cart = date.data
        },
        // 清空购物车
        // cleanCart (msg){
        //     this.cart = msg
        // },
        // 固定在顶部
        handleTop () {
            // var tabtop = this.styleIndex.handleScroll()
            var tabTop = this.$refs.tabTop.getBoundingClientRect()
            var tabTop1 = tabTop.top
            // console.log(tabTop1)
            if(tabTop1 > 1 ){
                this.ishead = false
            }else{
                this.ishead = true
            }
        }
    },
    watch : {
        shop () {
            let title = []
            let typetitle0 = ''
            let typetitle1 = ''
            let typetitle2 = ''
            let type = []
            let type0 = []
            let type1 = []
            let type2 = []

            // 满减
            for(var i = 0;i < this.shop.prom.length;i++){ 
                if(this.shop.prom[i].type == 0){
                    type0.push(this.shop.prom[i])
                }
            }
            for(var i in type0){
                typetitle0 += (type0[i].title + ";")
            }
            title.push(typetitle0)
            type.push(type0)
            // 赠品
            for(var i = 0;i < this.shop.prom.length;i++){ 
                if(this.shop.prom[i].type == 1){
                    type1.push(this.shop.prom[i])
                }
            }
            for(var i in type1){
                typetitle1 += (type1[i].title + ";")
            }
            title.push(typetitle1)
            type.push(type1)
            for(var i = 0;i < this.shop.prom.length;i++){ 
                if(this.shop.prom[i].type == 2){
                    type2.push(this.shop.prom[i])
                }
            }
            if(!type2){
                typetitle2 = (type2[0].title)
                title.push(typetitle2)
            }
            type.push(type2)
            this.shopprom = type
            console.log(this.shopprom,99955566)
            this.$store.dispatch("changeProm",JSON.stringify(this.shopprom))
            this.shoptitle = title
        },
        cart () {
            let cart = this.cart
            let total = 0
            for(let i in cart){
                total += ((parseFloat(cart[i].goods.price) + parseFloat(cart[i].spec_price)) * cart[i].goods_num) 
            }
            
            this.costPrice = total.toFixed(2) //原价
            this.rulingPrice = total.toFixed(2)
            if(!this.shopprom[0]){
                this.getCart()
            }
            if(this.shopprom[0]){
                let newmoney = this.rulingPrice
                for(let i in this.shopprom[0]){
                    if(this.costPrice > parseFloat(this.shopprom[0][i].condition)){
                        let Rprice = parseFloat(this.costPrice) - parseFloat(this.shopprom[0][i].money)
                        newmoney = Rprice.toFixed(2)
                    }
                }

                this.rulingPrice = newmoney
            }

        },
    },
    computed :{
        // shopprom () {
        //     return shop.prom
        // }
    },
    created () {
        
    },
    mounted () {
        // this.getshop()
        this.getlist()
        this.getaddressList()
        this.getCart()
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
                        border-radius 3px
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
                    margin-top -.5vw
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
            .shop-comment
                background-color #fff    
        .tab-box-ab
            // position fixed   
            top 10.66vw     
            // width 100%
        .shop-cart
            position fixed
            bottom 0
            background-color #fff
            width 100%
            z-index 15
            box-shadow 0px -5px 20px 0px rgba(0, 0, 0, 0.05)
</style>
