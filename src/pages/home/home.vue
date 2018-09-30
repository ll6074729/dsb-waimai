<template>
<keep-alive>
    <div class="header"  v-loading.fullscreen.lock="fullscreenLoading">
        <!-- 头部轮播 -->
        <homeswiper-banner :banner="banner"></homeswiper-banner>
        <!-- 头部搜索 -->
        <home-head></home-head>
        <!-- 广告跳转 -->
        <div class="router-link">
            <router-link to="/concurrent">
                <img src="../home/img/routerLink.png" alt="">
            </router-link>
        </div>
        <!-- 分类按钮 -->
        <homeswiper-tab :list="swiperTab"></homeswiper-tab>
        <hr class="hr20">
        <!-- 公告消息 -->
        <homeswiper-tip :notice="notice" v-if="notice"></homeswiper-tip>
        <hr class="hr20">
        <!-- 优选商家 -->
        <recommend :list="Recommend" v-if="Recommend"></recommend>
        <hr class="hr20">
        <!-- 商家列表 -->
        <goods-list :shopList="shopList" :page="page" :shopprom="shopprom" v-if="shopprom" :tags="tags" :range="range">
            <div class="title">
                优选商家
            </div>
        </goods-list>
        <tab-bar :defaulttab="defaulttab"></tab-bar>
        <!-- <all-map></all-map> -->
        <div id="allmap" style="display:none"></div>
    </div>
</keep-alive>
    
</template>
<script>
import BMap from 'BMap'
import HomeswiperBanner from "./components/swiperbanner";
import HomeHead from "./components/head";
import HomeswiperTab from "./components/swiperTab"
import HomeswiperTip from "./components/swiperTip"
import Recommend from "./components/recommend"
import GoodsList from "../../componentss/goodsList"
import TabBar from '../../componentss/tabbar'
export default {
  name: "Home",
  components: {
    HomeswiperBanner,
    HomeHead,
    HomeswiperTab,
    HomeswiperTip,
    Recommend,
    GoodsList,
    TabBar,
  },
  data () {
    return {
        banner:[],
        swiperTab: [],
        Recommend:[],
        shopprom:null,
        tags:[],
        notice:[],
        shopList:[],
        defaulttab:0,
        page:'shop-home',
        lng:localStorage.lng,
        lat:localStorage.lat,
        range:[],
        fullscreenLoading: true
    }
  },
    methods:{
        _GetDistance() {
            if(localStorage.lat || localStorage.lng){
                window.map = new BMap.Map('allmap')
                console.log(map)
            }
        },
        chooesSchool () {
            if(this.$store.state.area_id == undefined || this.$store.state.delivery_price == NaN){
                this.$router.push({path:"/Location"})
            }else{
                this.$http({
                    method: 'post',
                    url: '/mobile/api/q',
                    // url:'/api/home',
                    data: {
                        url:'http://api.dqvip.cc/home',
                        area_id:this.$store.state.area_id,
                        q_type:'post'
                    },
                })
                    .then(this.getHomeInfoSucc)
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        },
        getHomeInfoSucc(res){
            const date = eval('(' + res.data + ')')
            // let date = res.data
            console.log(date.data)
            this.banner = date.data.banner //banner图
            this.swiperTab = date.data.shop_type // 分类按钮
            this.notice = date.data.notice //通告
            this.Recommend = date.data.recommend_shop //大牌推荐
            this.fullscreenLoading = false
        },
        handSearch () {
            this.$http({
                method: 'post',
                url: '/mobile/api/q',
                // url:'/api/buyer/shop_list',
                data: {
                    url:'http://api.dqvip.cc/buyer/shop_list',
                    q_type:'post',
                    type_id : this.$route.query.type_id,
                    area_id : this.$store.state.area_id,
                    sales : 'desc',
                },
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
            for(let i in this.shopList){
                if(this.shopList[i].tags){
                    let tag = this.shopList[i].tags
                    this.tags[this.shopList[i].shop_id] = tag.split(',')
                }
                if(this.shopList[i].longitude && this.shopList[i].latitude){
                    var pointA = new BMap.Point(this.lng, this.lat)
                    var pointB = new BMap.Point(this.shopList[i].longitude, this.shopList[i].latitude)
                    this.range[this.shopList[i].shop_id] = parseInt(window.map.getDistance(pointA,pointB))
                }else{
                    this.range[this.shopList[i].shop_id] = 0
                }
            }
            this.fullscreenLoading = false
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
            
            let addressList = date.data
            let area_price = this.$store.state.delivery_cost
            let delivery_price
            for(let i in  addressList){
                // 判断校区是否相同
                if(addressList[i].area_id == this.$store.state.area_id){
                    if(addressList[i].is_default == 1 ){
                        this.$store.dispatch("defaultAddress",JSON.stringify(addressList[i]))
                        delivery_price = addressList[i].delivery.delivery_price
                        return
                    }
                }else{
                    this.$store.dispatch("defaultAddress","")
                }
            }
            this.$store.dispatch("changedeliveryPrice",delivery_price)
        },
    },
    mounted() {
        this.getaddressList()
        this._GetDistance()
        this.chooesSchool()
        this.handSearch()
       
    },

}
</script>
<style lang="stylus" scoped>
.header {
    position: relative;

    .router-link {
        width: 100%;

        img {
            width: 100%;
        }
    }
}
</style>
