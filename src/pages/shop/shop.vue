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
                        <div class="shop-sale"> <span v-if="this.range != 0 && this.range < 1000">{{this.range}}m | </span><span v-if="this.range != 0 && this.range > 999">{{this.range/1000}}km | </span> 销量 {{shop.sales}}</div>
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
                                <img src="../../assets/img/down.png" alt="" :class="{showtitle:showtitle1}" style="width:9px;height:5px;margin-top:5px;transform:rotate(0deg);" v-if="!shoptitle[0]" @click="down1">
                            </div>
                            <el-collapse-transition>
                                <div v-if="showtitle1">
                                    <div class="list-item" v-if="shoptitle[2]">
                                        <span class="list-item-left" >
                                            <div class="shop-label-activity shop-label-type2">
                                                首单
                                            </div>
                                        </span>
                                        <span class="list-item-right">{{shoptitle[2]}}</span>
                                    </div>
                                </div>
                                <div v-if="!showtitle1 && !shoptitle[1] && shoptitle[2]">
                                    <div class="list-item">
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
                    </el-collapse-transition>
                </div>
            </div>
        </div>
        <shop-recommend 
            :food="shop.recommend_goods" 
            :cart="cart" 
            :cartBox="cartBox"
            :recommendImg="recommendImg"
            @childAddCart="childAddCart"
            @childMinusCart="childMinusCart"
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
                    <shop-menu v-if="shop.cate.length > 0" :cate="shop.cate" :ishead="ishead" @changeNum="changeNum" :num="num" :fullmoney="fullmoney"></shop-menu>
                    <shop-product 
                        :goods="shop.cate" 
                        :cart="cart" 
                        :cartBox="cartBox"
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
                        @childAddCart="childAddCart"
                        @childMinusCart="childMinusCart"
                        v-if="shop.cate.length > 0"
                        ></shop-product>
                    <div v-if="shop.cate.length < 1" class="goodno">
                        <img src="../../assets/img/nogoods.png" alt="" >
                        <div>
                            商家很懒,还没有上传商品哟~！
                        </div>
                    </div>    
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
                    :cartBox="cartBox"
                    :costPrice="costPrice" 
                    :rulingPrice="rulingPrice" 
                    :addressList="addressList"
                    :delivery_price="delivery_price"
                    :shop_status="shop.status"
                    :productImg="productImg"
                    :custom_delivery="shop.custom_delivery"
                    :take_off="shop.take_off"
                    :goods_val="goods_val"
                    @childAddCart="childAddCart"
                    @childMinusCart="childMinusCart"
                    @claerCart="claerCart"
                    ></shop-foot>
                <shop-buy 
                :isBuy="isBuy" 
                :goodsinfo="goodsinfo"
                :cart="cartBox"
                :foodnum="foodnum"
                @AglinCart="AglinCart"
                @closeGoodsInfo="changeGoodsInfo"
                @buygoodsinfo="buygoodsinfo"
                @makeCart="makeCart"
                ></shop-buy>
            </div>
        </div>
        <div class="search-box" ref="searchBox" v-if="searchstatus">
            <ul>
                <li class="item" v-for="(itemList,index) in this.searchlist" :key="itemList.goods_id">
                    <div class="shop-left">
                        <div class="shop-img">
                            <img :src="productImg[itemList.goods_id][0]" alt="" :onerror="defaultImg">
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
                                <transition name="bounce">
                                    <img src="../../assets/img/minus@3x.png"  v-show="itemList.showMinus" class="minus" alt="" @click="minusCart(itemList.goods_id,index,shop.shop_id)" v-for="cartlist in cartBox" :key="cartlist.goods_id" v-if="cartlist.goods_id == itemList.goods_id && cartlist.spec">
                                </transition>
                                <span v-for="cartlist in cartBox" :key="cartlist.goods_id" v-if="cartlist.goods_id == itemList.goods_id && cartlist.spec">{{cartlist.goods_num}}</span>
                                <span v-if="goods_spec[itemList.goods_id]">{{goods_spec[itemList.goods_id]}}</span>
                                <transition name="bounce">
                                    <img class="plus" src="../../assets/img/add@3x.png" alt=""  @click="_addCart(itemList.goods_id,index)" v-if="itemList.show">
                                </transition>
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
            :cartBox="cartBox"
            @childAddCart="childAddCart"
            @childMinusCart="childMinusCart"
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
            showtitle1:false,
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
            range:0,
            cartBox:[],
            goods_val:0,
            foodnum:1,
        }
    },
    methods:{
        // 多规格修改vue 的值
        makeCart(msg){
            console.log(msg)
            this.cartBox = msg
        },
        // 子组件的减少
        childMinusCart (msg){
            if(msg[2]){
                this.minusCart(msg[0],msg[1],this.shop.shop_id,msg[2])
            }else{
                this.minusCart(msg[0],msg[1],this.shop.shop_id)
            }
            
        },
        // 适用于主组件
        _addCart (goodsId,index) {
            let msg = []
            msg[0] = goodsId
            msg[1] = index
            this.childAddCart (msg)
        },
        // 子组件的加入购物车
        childAddCart (msg){
            let that = this
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // url:'api/goods_info',
                data: {
                    url:'http://api.dqvip.cc/goods_info',
                    q_type:'post',
                    goods_id:msg[0],
                },
            })
                .then(function(res){
                    // let date = res.data
                    let date = eval('('+res.data+')')
                    if(msg[2]){
                        that.addCart(msg[0],msg[1],that.shop.shop_id,date.data,msg[2])
                    }else{
                        that.addCart(msg[0],msg[1],that.shop.shop_id,date.data)
                    }
                    
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        randomString (len) {
        　　len = len || 32;
        　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        　　var maxPos = $chars.length;
        　　var pwd = '';
        　　for (let i = 0; i < len; i++) {
        　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        　　}
        　　return pwd;
        },
        /**
         * 加入购物车
         * allshopCart 所有的店铺购物车
         */
         
        addCart(goodsId,index,shopId,date,spec_key){
            // 判断是否存在
                if(!localStorage[shopId]){
                    localStorage[shopId] = "[]"
                }
                var jsonarray = eval('('+localStorage[shopId]+')')
                // 判断购物车是否有商品 有的话直接进

                for(let k in jsonarray){  
                    
                    if(goodsId == jsonarray[k].goods_id){  //循环购物车是否有当前商品
                        if(spec_key){
                            for(let j in jsonarray){
                                if(jsonarray[j].spec_key == spec_key){  //循环购物车是否有相同规格的商品
                                    jsonarray[j].goods_num ++
                                    this.cartBox = jsonarray
                                    localStorage[shopId] = JSON.stringify(jsonarray)
                                    return
                                }
                            }
                            
                        }else{
                            console.log(22222222222222222)
                            if(date.spec.length == 0 || date.spec.length == ''){
                                jsonarray[k].goods_num ++
                                this.cartBox = jsonarray
                                localStorage[shopId] = JSON.stringify(jsonarray)
                                
                            }else{
                                this.closeFeel()
                                this.isBuy = true
                                this.goodsinfo = date
                            }
                        }
                        
                        
                        return
                         
                    }
                   
                }

                for(var i = 0;i< this.shop.cate.length;i++){
                    console.log('1593')
                    for(var j = 0;j <this.shop.cate[i].goods.length;j++){
                            //查询购物车中是否存在当前商品
                        if(this.shop.cate[i].goods[j].goods_id == goodsId){
                            this.shop.cate[i].goods[j].goods_num = 1
                            this.shop.cate[i].goods[j].spec = date.spec
                            // 判断是否是多规格商品
                            if(date.spec.length == 0 || date.spec.length == ''){
                                jsonarray.push(this.shop.cate[i].goods[j])
                            }else{
                                this.isBuy = true
                                this.goodsinfo = date
                            }
                        }
                    }
                }
                this.cartBox = jsonarray
                localStorage[shopId] = JSON.stringify(jsonarray) //把购物车信息保存到本地
                
        },
        // 减购物车
        minusCart(goodsId,index,shopId,spec_key){
            console.log(spec_key)
            var jsonarray = eval('('+localStorage[shopId]+')')
            for(let k in jsonarray){  //循环购物车是否有当前商品
                if(goodsId == jsonarray[k].goods_id && spec_key == jsonarray[k].spec_key){
                    //判断商品数量是否大于1  否则删掉记录
                    if(jsonarray[k].goods_num > 1){
                        jsonarray[k].goods_num --
                    }else{
                        jsonarray.splice(k,1)
                    }
                    this.cartBox = jsonarray
                    localStorage[shopId] = JSON.stringify(jsonarray)
                    return
                }
            }
        },
        /**
         * 清空购物车
         * 
         */
        claerCart () {
            let shop_id = this.$route.params.id
            this.cartBox = []
            localStorage.removeItem(shop_id)
        },




        GetDistance() {
            if(localStorage.lat || localStorage.lng){
                let map = new BMap.Map('allmap')
                var pointA = new BMap.Point(localStorage.lng, localStorage.lat)
                var pointB = new BMap.Point(this.shop.longitude, this.shop.latitude)
                // console.log(parseInt(map.getDistance(pointA,pointB)))
                this.range = parseInt(map.getDistance(pointA,pointB))
            }
        },
        down1 () {
            this.showtitle1 = !this.showtitle1
        },
        down () {
            this.showtitle = !this.showtitle
            this.showtitle1 = !this.showtitle1
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
                method: 'post',
                // method:'get',
                url:'mobile/api/q',
                // url:'api/buyer/list_address',
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
                url: 'mobile/api/q',
                // url:'api/buyer/collect_shop',
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
            let date = eval('('+res.data+')')
            // let date = res.data
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
                    this.$set(this.shop.recommend_goods[i],'show',true)
                    this.$set(this.shop.recommend_goods[i],'showMinus',true)
                    if(this.shop.recommend_goods[i].details_figure)
                        this.recommendImg[i] = this.shop.recommend_goods[i].details_figure.split(',')
                }
            }
            // 列表商品的图片
            for(let i in this.shop.cate){
                for(let j = 0;j <this.shop.cate[i].goods.length;j++){
                    this.$set(this.shop.cate[i].goods[j],'show',true)
                    this.$set(this.shop.cate[i].goods[j],'showMinus',true)
                    if(this.shop.cate[i].goods[j].details_figure){
                        this.productImg[this.shop.cate[i].goods[j].goods_id] = this.shop.cate[i].goods[j].details_figure.split(',')
                    }
                }
            }
            this.cartBox = JSON.parse(localStorage[this.$route.params.id])
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
        // 判断是否有选中商品
        getshopid () {
            if(this.$route.params.good){
                for(let i in this.goods){
                    if(this.goods[i].goods_id == this.$route.params.good){
                        this.goods_feel = i
                    }
                }
            }
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
            this.getshopid()
        },
        cartBox () {
            // console.log(this.cart,333)
            // console.log(this.costPrice,444)
            let cart = this.cartBox
            console.log(cart)
            let total = 0
            for(let i in cart){
                total += ((parseFloat(cart[i].price) + parseFloat(cart[i].spec_price || 0)) * cart[i].goods_num) 
            }
            
            this.costPrice = total.toFixed(2) //原价
            this.rulingPrice = total.toFixed(2)
            if(this.shopprom[0]){
                let newmoney = this.rulingPrice
                for(let i in this.shopprom[0]){
                    if(this.costPrice >= parseFloat(this.shopprom[0][i].condition)){
                        let Rprice = parseFloat(this.costPrice) - parseFloat(this.shopprom[0][i].money)
                        this.fullmoney = parseFloat(this.shopprom[0][i].money)
                        newmoney = Rprice.toFixed(2)
                        break
                    }else{
                        this.fullmoney = null
                    }
                }
                this.rulingPrice = newmoney
            }
            // 多规格
            let spec_array = new Array
            for(let i in this.cartBox){
                if(this.cartBox[i].spec_key){
                    if(this.cartBox[i].spec_key.length > 0){
                        let goods_num = spec_array[this.cartBox[i].goods_id] || 0
                        goods_num += parseInt(this.cartBox[i].goods_num) 
                        spec_array[this.cartBox[i].goods_id] = goods_num
                    }
                }
               
            }
            this.goods_spec = spec_array
            let goods_val = 0
            for(let i in this.cartBox){
                goods_val += this.cartBox[i].goods_num
            }
            this.goods_val = goods_val
        },
        keyword () {
            if(this.keyword.length > 0){
                // document.body.style.overflow='hidden';
                // document.body.style.height = window.screen.height + 'px';
                this.searchstatus = true
            }else{
                // document.body.style.overflow='auto';
                // document.body.style.height = '100%';
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
        this.getlist()
        this.getaddressList()
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
        background-color #f5f7fa
        border none
        color #999
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
                // overflow-x hidden
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
                .goodno
                    text-align center     
                    color #999
                    width 100%
                    img 
                        width 48vw
                        height 29.6vw 
                        margin-top 20.33vw    
                        margin-bottom 5vw     
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
                        .bounce-enter-active 
                                animation bounce-in .5s
                        .bounce-leave-active 
                            animation bounce-in .5s reverse
                        @keyframes bounce-in {
                            0% {
                                transform: scale(0.5);
                            }
                            50% {
                                transform: scale(1.5);
                            }
                            100% {
                                transform: scale(1);
                            }
                        }        
</style>
