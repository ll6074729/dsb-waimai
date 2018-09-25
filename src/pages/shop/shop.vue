<template>
    <div style="position: relative">
        <div class="backg"></div>
        <!-- 头部 -->
        <div class="shop-head" ref="shopHead">
            <router-link class="shop-head-left" tag="div" to="/" v-if="!searchstatus">
                <img src="../../assets/img/back_white.png" alt="">
            </router-link>
            <div class="shop-head-left" v-if="searchstatus" @click="clearinput">
                <img src="../../assets/img/back_white.png" alt="">
            </div>
            <div class="shop-head-center">
                <el-input
                    placeholder="请输入菜品名字"
                    v-model="keyword"
                    maxlength="15"
                    clearable>
                </el-input>
            </div>
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
                        <div class="shop-sale"> <span v-if="this.range != 0">{{this.range}}m | </span> 销量 {{shop.sales}}</div>
                    </div>
                    <div class="shop-foot">
                        {{shop.addr}}
                    </div>
                </div>
            </div>
            <div class="activity" v-if="shop.prom.length > 0">
                <div>
                    <div class="list-item" v-if="shoptitle[0]">
                        <span class="list-item-left">
                            <div class="shop-label-activity shop-label-type1">
                                满减
                            </div>
                        </span>
                        <span class="list-item-right">{{shoptitle[0]}}</span>
                        <img src="../../assets/img/down.png" alt="" :class="{showtitle:showtitle}" style="width:9px;height:5px;margin-top:5px;transform:rotate(0deg);" v-if="!showtitle && shoptitle[1] || shoptitle[2]" @click="down">
                    </div>
                    <el-collapse-transition>
                        <div v-if="showtitle">
                            <div class="list-item" v-if="shoptitle[1]">
                                <span class="list-item-left">
                                    <div class="shop-label-activity shop-label-type3">
                                        赠品
                                    </div>
                                </span>
                                <span class="list-item-right">{{shoptitle[1]}}</span>
                            </div>
                            <div class="list-item" v-if="shoptitle[2]">
                                <span class="list-item-left" >
                                    <div class="shop-label-activity shop-label-type2">
                                        首单
                                    </div>
                                </span>
                                <span class="list-item-right">{{shoptitle[2]}}</span>
                            </div>
                        </div>
                    </el-collapse-transition>
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
            @showgoods="showgoods"
        ></shop-recommend>
        <!-- tab列表 -->
        <div class="shop-box"  ref="tabTop">
            <div class="tab" :class="{ishead:ishead}">
                <div class="tab-btn" :class="{'active':isshowtab == 0}" @click="tab(0)">商品</div>
                <div class="tab-btn" :class="{'active':isshowtab == 1} " @click="tab(1)">评论</div>
            </div>
            <div class="tab-box" :class="{'tab-box-ab':ishead}" >
                <div class="shop-buy" v-show="isshowtab == 0">
                    <shop-menu :cate="shop.cate" :ishead="ishead" @changeNum="changeNum" :num="num" :fullmoney="fullmoney"></shop-menu>
                    <shop-product 
                        :goods="shop.cate" 
                        :cart="cart" 
                        :productImg="productImg"
                        :ishead="ishead"
                        :menuHeight="num"
                        :tabTop="tabTop"
                        :fullmoney="fullmoney"
                        @AglinCart="AglinCart"
                        @upup="changeBuy"
                        @buygoodsinfo="buygoodsinfo"
                        @changeNum="changeNum"
                        @showgoods="showgoods"
                        ></shop-product>
                </div>
                <div class="shop-comment" v-show="isshowtab == 1">
                    <shop-comment :shop="shop" ></shop-comment>
                </div>
            </div>
            <div class="fullmoney" v-if="fullmoney">
                已减  <span>{{fullmoney}}</span> 
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
                    :custom_delivery="shop.custom_delivery"
                    :take_off="shop.take_off"
                    ></shop-foot>
                <shop-buy 
                :isBuy="isBuy" 
                :goodsinfo="goodsinfo"
                :cart="cart"
                @AglinCart="AglinCart"
                @closeGoodsInfo="changeGoodsInfo"
                @buygoodsinfo="buygoodsinfo"
                ></shop-buy>
            </div>
        </div>
        <div class="search-box" ref="searchBox" v-if="searchstatus">
            <ul>
                <li class="item" v-for="itemList in this.searchlist" :key="itemList.goods_id">
                    <div class="shop-left">
                        <div class="shop-img">
                            <img :src="'http://wm.dqvip.cc/'+productImg[itemList.goods_id][0]" alt="" :onerror="defaultImg">
                            <!-- <img :src="productImg[itemList.goods_id][0]" alt="" :onerror="defaultImg">   -->
                        </div>
                    </div>
                    <div class="shop-right">
                        <div class="shop-name">
                            {{itemList.title}}
                        </div>
                        <div class="shop-spec">
                            {{itemList.intro}}
                        </div>
                        <div class="shop-info">
                            销量：{{itemList.sold_num}} | 好评率：{{itemList.sold_num}}
                        </div>
                        <div class="shop-foot">
                            <div class="shop-price">
                                ￥{{itemList.price}}
                            </div>
                            <div class="shop-num">
                                <img class="minus" src="../../assets/img/minus_gray@3x.png" @click="minusSpec" v-if="goods_spec[itemList.goods_id]">
                                <img src="../../assets/img/minus@3x.png" class="minus" alt="" @click="minus(itemList.goods_id)" v-for="cartlist in cart" :key="cartlist.goods_id" v-if="cartlist.goods_id == itemList.goods_id && cartlist.spec_key.length == 0">
                                <span v-for="cartlist in cart" :key="cartlist.goods_id" v-if="cartlist.goods_id == itemList.goods_id && cartlist.spec_key.length == 0">{{cartlist.goods_num}}</span>
                                <span v-if="goods_spec[itemList.goods_id]">{{goods_spec[itemList.goods_id]}}</span>
                                <img class="plus" src="../../assets/img/add@3x.png" alt=""  @click="addCart(itemList.goods_id)">
                            </div>
                        </div>
                    </div>   
                </li>
                <li v-if="this.searchlist.length < 1" style="text-align:center;margin-top:2rem">
                    暂时没有该商品~！
                </li>
            </ul>
        </div>
        <shop-info 
            :goods="goods" 
            :productImg="productImg" 
            :cart="cart" 
            :goods_spec="goods_spec" 
            :goods_feel="goods_feel" 
            @close_feel="closeFeel"
            @upup="changeBuy" 
            @AglinCart="AglinCart" 
            @buygoodsinfo="buygoodsinfo" 
            >
        </shop-info>
        <div id="allmap" style="display:none"></div>
    </div>
</template>
<script>
import BMap from 'BMap'
import BScroll from 'better-scroll'
import ShopMenu from "./components/shopmenu"
import ShopProduct from "./components/shopproduct"
import ShopFoot from "./components/shopfoot"
import ShopBuy from "./components/shopbuy"
import ShopComment from "./components/comment"
import ShopRecommend from "./components/shoprecommend"
import ShopInfo from "./components/shopinfo"
export default {
    name:'Shop',
    components:{
        ShopMenu,
        ShopProduct,
        ShopFoot,
        ShopBuy,
        ShopComment,
        ShopRecommend,
        ShopInfo
    },
    data () {
        return {
            shop:[], //店铺信息
            cart:[], //购物车
            isshowtab:0,
            showtitle:false,
            isShowA:true,
            isCollect: false,  //是否收藏
            searchstatus:false, //是否展示搜索列表
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
            num:0,
            tabTop:0,
            keyword:"",
            timer:null,
            goods:[],
            searchlist:[],
            goods_spec:[],
            fullmoney:null,
            goods_feel:null,
            range:0
        }
    },
    methods:{
        GetDistance() {
            if(localStorage.lat || localStorage.lng){
                let map = new BMap.Map('allmap')
                var pointA = new BMap.Point(localStorage.lng, localStorage.lat)
                var pointB = new BMap.Point(this.shop.longitude, this.shop.latitude)
                // console.log(parseInt(map.getDistance(pointA,pointB)))
                this.range = parseInt(map.getDistance(pointA,pointB))
            }
        },
        down () {
            this.showtitle = !this.showtitle
        },
        showgoods (msg) {
            // console.log(msg,654)
            for(let i in this.goods){
                if(this.goods[i].goods_id == msg){
                    this.goods_feel = i
                    return
                }
            }
            
        },
        closeFeel () {
            this.goods_feel = null
        },
        minusSpec () {
            this.$message({
                message: '多规格商品只能去购物车删除哟',
                type: 'warning'
            });
        },
        // 清楚搜索框
        clearinput () {
            this.searchstatus = false
            this.keyword = ''
        },
        changeNum (msg) {
            this.num = msg
        },
        // 再次请求购物车  新增的数据有了
        AglinCart (msg) {
            
            // let cartId = []
            // for(let i in this.cart){
            //     cartId.push(this.cart[i].cart_id)

            // }
            // if(cartId.indexOf(msg.data.cart_id) == -1){
            //     this.cart.push(msg.data)
            // }else{
            //     this.cart[cartId.indexOf(msg.data.cart_id)].goods_num = msg.data.goods_num
            // }
            // console.log(this.cart)
            // this.getCart()
            this.cart = msg.data
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
                // method: 'post',
                method:'get',
                // url:'mobile/api/q',
                url:'api/buyer/list_address',
                data: {
                    url:'http://api.dqvip.cc/buyer/list_address',
                    q_type:'get'
                },
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
            let area_price = this.$store.state.delivery_cost
            let delivery_price
            for(let i in  this.addressList){
                if(this.addressList[i].is_default == 1){
                    // this.$store.state.defaultAddress = this.addressList[i]
                    this.$store.dispatch("defaultAddress",JSON.stringify(this.addressList[i]))
                    delivery_price = this.addressList[i].delivery.delivery_price
                    this.delivery_price = delivery_price
                    // this.$store.dispatch("changedelivery", (parseFloat(area_price) + parseFloat(delivery_price)).toFixed(2))
                    
                }
            }
            this.$store.dispatch("changedeliveryPrice",delivery_price)
        },
        getCollect () {
            let type
            if(!this.isCollect){
                type = 'false'
            }else{
                type = 'true'
            }
            // console.log(type)
            // 更改收藏状态
            this.$http({
                method: 'post',
                // url: 'mobile/api/q',
                url:'api/buyer/collect_shop',
                data: {
                    url:'http://api.dqvip.cc/buyer/collect_shop',
                    shop_id:this.$route.params.id,
                    collect_type:type,
                    q_type:'post'
                },
            })
                .then(this.collect)
                .catch(function (error) {
                    console.log(error);
                })
        },
        collect (res) {
            // let date = eval('('+res.data+')')
            let date = res.data
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
                // url: 'mobile/api/q',
                url:'api/buyer/shop_info',
                data: {
                    url:'http://api.dqvip.cc/buyer/shop_info',
                    shop_id:this.$route.params.id,
                    q_type:'post'
                },
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
            this.GetDistance()
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
            for(let i in this.shop.cate){
                for(let j = 0;j <this.shop.cate[i].goods.length;j++){
                    if(this.shop.cate[i].goods[j].details_figure){
                        this.productImg[this.shop.cate[i].goods[j].goods_id] = this.shop.cate[i].goods[j].details_figure.split(',')
                    }
                }
            }
        },
        getCart () {
            this.$store.dispatch("changeOrderId",'')
            this.$store.dispatch("changeOrderSn",'')
            // 获取购物车信息 传一个店铺ID
            this.$http({
                method: 'post',
                // url: 'mobile/api/q',
                url:'api/buyer/cart_list',
                data: {
                    url:'http://api.dqvip.cc/buyer/cart_list',
                    shop_id:this.$route.params.id,
                    q_type:'post'
                },
            })
                .then(this.getCartList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getCartList (res) {
            // let date = eval('('+res.data+')')
            let date = res.data
            this.cart = date.data
        },
        // 固定在顶部
        handleTop () {
            if(!this.$refs.tabTop.getBoundingClientRect()){
                return
            }
            // var tabtop = this.styleIndex.handleScroll()
            var tabTop = this.$refs.tabTop.getBoundingClientRect()
            var tabTop1 = tabTop.top
            if(this.tabTop == 0){
                this.tabTop = tabTop1
            }
            if(tabTop1 > this.$refs.shopHead.offsetHeight ){
                this.ishead = false
            }else{
                this.ishead = true
            }
        },
        addCart (GoodId) {
            const that = this
            var goods_num = 1
            var cart_id
            for(let i in this.cart){
                if(this.cart[i].goods_id == GoodId){
                    cart_id = this.cart[i].cart_id
                    goods_num = parseInt(this.cart[i].goods_num) +1
                    break
                }
            }
            // 获取当前商品的信息  规格  
            this.$http({
                method: 'post',
                // url: 'mobile/api/q',
                url:'api/goods_info',
                data: {
                    url:"http://api.dqvip.cc/goods_info",
                    q_type:'post',
                    goods_id:GoodId,
                },
            })
                .then(function(response){
                    that.getaddCart(response,GoodId,goods_num,cart_id)
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getaddCart (res,GoodId,goods_num,cart_id) {
            let date = res.data
            // let date = eval('('+res.data+')')
            let _this = this
            let data ;
            if(cart_id){
                data =  {
                        url:'http://api.dqvip.cc/buyer/cart_change',
                        goods_id:GoodId,
                        shop_id:this.$route.params.id,
                        goods_num:goods_num,
                        cart_id: cart_id,
                        q_type:'post'
                    }
            }else{
                data = {
                        url:'http://api.dqvip.cc/buyer/cart_change',
                        goods_id:GoodId,
                        shop_id:this.$route.params.id,
                        goods_num:goods_num,
                        q_type:'post'
                    }
            }
            if(date.data.spec.length == 0){
                this.$http({
                    method: 'post',
                    // url: 'mobile/api/q',
                    url:'api/buyer/cart_change',
                    data: data,
                })
                .then(function(res){
                    // let date = eval('('+res.data+')')
                    let date = res.data
                    console.log(date)
                    _this.AglinCart(date)
                })
                .catch(function (error) {
                    console.log(error);
                })
            }else{
                this.changeBuy(true)
                this.buygoodsinfo(date.data)
            }
            
        },
        emitCart (res) {
            // let date = eval('('+res.data+')')
            let date = res.data
            if(date.data == ''){
                this.cart = date.data
                this.AglinCart()
            }else{
                alert('加入失败')
            }

        },
        minus(GoodId){
            const that = this
            let goods_num
            let cart_id
            for(let i in this.cart){
                if(GoodId == this.cart[i].goods_id){
                    if(this.cart[i].goods_num == 0){
                        goods_num = this.cart[i].goods_num 
                    }else{
                        goods_num = this.cart[i].goods_num -1
                    }
                    
                    cart_id = this.cart[i].cart_id
                }
            }
            // console.log(goods_num,cart_id)
            if(goods_num == 0){
                
                this.$http({
                    // method:'post',
                    method: 'delete',
                    // url: 'mobile/api/q',
                    url:'api/buyer/cart_clear',
                    data:{
                        cart_id:cart_id,
                        url:"http://api.dqvip.cc/buyer/cart_clear",
                        q_type:'delete',
                    },
                })
                    .then(this.getCart())
                    .catch(function (error) {
                        console.log(error);
                    })
                return
            }
            // 获取当前商品的信息  规格  
            this.$http({
                method: 'post',
                // url: 'mobile/api/q',
                url:'api/goods_info',
                data: {
                    url:"http://api.dqvip.cc/goods_info",
                    q_type:'post',
                    goods_id:GoodId,
                },
            })
                .then(function(response){
                    that.getaddCart(response,GoodId,goods_num,cart_id)
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
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
            // 给满减排序
            var compare = function (obj1, obj2) {
                var val1 = obj1.condition;
                var val2 = obj2.condition;
                if (val1 < val2) {
                    return 1;
                } else if (val1 > val2) {
                    return -1;
                } else {
                    return 0;
                }            
            } 
            type0.sort(compare)
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
                typetitle1 += '满'+type1[i].condition +'赠'+ type1[i].title
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
             if(this.shopprom[2].length > 0){
                let title3 = this.shopprom[2][0].title
                title.push(title3)
            }
            this.$store.dispatch("changeProm",JSON.stringify(this.shopprom))
            this.shoptitle = title
            if(this.shopprom[0].length < 1){
                this.showtitle = true
            }
            // 商品列表
            for(let i in this.shop.cate){
                if(this.shop.cate[i].goods){
                    for(let j = 0; j <this.shop.cate[i].goods.length;j++ ){
                        this.goods.push(this.shop.cate[i].goods[j])
                    }
                }
            }
        },
        cart () {
            console.log(this.cart,333)
            console.log(this.costPrice,444)
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
                    if(this.costPrice >= parseFloat(this.shopprom[0][i].condition)){
                        // console.log(parseFloat(this.shopprom[0][i].condition),66565656)
                        let Rprice = parseFloat(this.costPrice) - parseFloat(this.shopprom[0][i].money)
                        this.fullmoney = parseFloat(this.shopprom[0][i].money)
                        // console.log(this.fullmoney,1)
                        // console.log(parseFloat(this.shopprom[0][i].money),66565656)
                        newmoney = Rprice.toFixed(2)
                        break
                    }else{
                        // console.log(this.costPrice,2)
                        // console.log(this.shopprom[0][i].condition,3)
                        this.fullmoney = null
                    }
                }

                this.rulingPrice = newmoney
            }
            // 多规格
            let spec_array = new Array
            for(let i in this.cart){
                if(this.cart[i].spec_key.length > 0){
                    let goods_num = spec_array[this.cart[i].goods_id] || 0
                    goods_num += parseInt(this.cart[i].goods_num) 
                    spec_array[this.cart[i].goods_id] = goods_num
                }
            }
            this.goods_spec = spec_array

        },
        keyword () {
            if(this.keyword.length > 0){
                document.body.style.overflow='hidden';
                document.body.style.height = window.screen.height + 'px';
                this.searchstatus = true
            }else{
                document.body.style.overflow='auto';
                document.body.style.height = '100%';
                this.searchstatus = false
            }

            if(this.timer){
                clearTimeout(this.timer)
            }
            if(!this.keyword){
                this.searchlist = []
                return
            }
            this.timer = setTimeout(() =>{
                const result = []
                for(var i in this.goods){
                    if(this.goods[i].title.indexOf(this.keyword) > -1){
                        result.push(this.goods[i])
                    }
                }
                this.searchlist = result
            },100)
        }   
    },
    computed :{
        // shopprom () {
        //     return shop.prom
        // }
    },
    created () {
        
    },
    mounted () {
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
    .shop-score >>> .el-rate
        height 2.13vw    
    .shop-head-center >>> .el-input__inner
        height 6.66vw
        width 60vw
        text-align center
        line-height 6.66vw
        font-size 2.9vw
        border-radius 0.5rem
        background-color rgba(0, 0, 0, 0.1)
        border none
        color #fff
    .shop-head
        display flex
        justify-content space-between
        width 100%;
        position fixed
        top 0
        z-index 10
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
        margin-top 10.66vw
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
            padding .66vw 5.33vw
            background-color rgba(0, 0, 0, 0.2)
            .list-item
                display flex
                margin 2.66vw 0
                .showtitle
                    transform rotate(180deg)!important
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
                        color #f0af53
                        background-color #fffae1
                        border solid 1px #f0af53
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
            top 10.66vw
            width 100%      
            background-color #fff
            z-index 10
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
        .fullmoney
            position fixed
            bottom 13.33vw
            background-color #daebff
            width 100%
            height .5rem
            line-height .5rem
            text-align center
            span
                color #469afe
        .shop-cart
            position fixed
            bottom 0
            background-color #fff
            width 100%
            z-index 15
            box-shadow 0px -5px 20px 0px rgba(0, 0, 0, 0.05)
    .search-box
        position fixed
        top 10.66vw
        bottom 13.33vw
        left 0
        right 0
        overflow scroll
        background #fff   
        .item
            display flex
            padding 2.66vw 0
            border-bottom 1px solid #f7f7f7
            .shop-left
                .shop-img
                    width 21.33vw
                    height 21.33vw
                    margin 0 2.66vw
                    img 
                        width 100%
                        height 100%
            .shop-right
                flex 1
                min-width 0
                .shop-name
                    font-size 4vw
                    line-height 5vw
                    font-weight bold
                .shop-spec
                    font-size 2.66vw
                    color #999
                    margin 1.33vw 0
                    line-height 4vw
                .shop-info
                    color #999
                    font-size 2.66vw
                .shop-foot
                    display flex
                    justify-content space-between
                    padding-right 1.33vw
                    font-size 4.26vw
                    margin-top 4vw 
                    .shop-price
                        color #3ea4fd
                        font-weight bold
                        margin-top 1vw
                    .shop-num
                        span 
                            line-height 5vw
                            margin 0 4vw
                        .minus,.plus
                            width 5.33vw
                            height 5.33vw
                            box-sizing border-box
                            display inline-block
</style>
