<template>
    <div class="header">
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
        <homeswiper-tab :list = "swiperTab"></homeswiper-tab>
        <hr class="hr20">
        <!-- 公告消息 -->
        <homeswiper-tip :notice = "notice"></homeswiper-tip>
        <hr class="hr20">
        <!-- 优选商家 -->
        <recommend :list=" Recommend"></recommend>
        <hr class="hr20">
        <!-- 商家列表 -->
        <goods-list :list="shopList">
            <div class="title">
                优选商家
            </div>
        </goods-list>
        <tab-bar></tab-bar>
        <all-map></all-map>
    </div>
</template>
<script>
import HomeswiperBanner from "./components/swiperbanner";
import HomeHead from "./components/head";
import HomeswiperTab from "./components/swiperTab"
import HomeswiperTip from "./components/swiperTip"
import Recommend from "./components/recommend"
import GoodsList from "../../componentss/goodsList"
import axios from 'axios'
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
        notice:[],
        shopList:[
            {imgUrl:require("./img/组17@3x.png"),name:"德克士（金牛凤凰立交店1)",status:1,id:1,score:4.8,sale:532,label:["快餐·中餐 ","西餐·汉堡"]},
            {imgUrl:require("./img/组17@3x.png"),name:"德克士（金牛凤凰立交店2)",status:0,id:2,score:4.3,sale:132,label:["快餐·中餐 ","西餐·汉堡"]},
            {imgUrl:require("./img/组17@3x.png"),name:"德克士（金牛凤凰立交店3)",status:0,id:3,score:5,sale:9992,label:["快餐·中餐 ","西餐·汉堡"]},
            {imgUrl:require("./img/组17@3x.png"),name:"德克士（金牛凤凰立交店4)",status:0,id:4,score:4,sale:992,label:["快餐·中餐 ","西餐·汉堡"]}
        ],
    }
  },
    methods:{
            chooesSchool () {
                console.log('aaa')
                if(this.$store.state.area_id == undefined){
                    this.$router.push({path:"/Location"})
                }else{
                    axios({
                        method: 'post',
                        url: 'mobile/api/q',
                        data: {
                            url:'http://api.dqvip.cc/home/4',
                            q_type:'get'
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
                console.log(date.data)
                this.banner = date.data.banner //banner图
                this.swiperTab = date.data.shop_type // 分类按钮
                this.notice = date.data.notice //通告
                this.Recommend = date.data.recommend_shop //大牌推荐
                // this.shopList = date.shopList
            },
    },
    mounted() {
        this.chooesSchool()
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
