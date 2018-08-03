<template>
    <div class="header">
        <!-- 头部轮播 -->
        <homeswiper-banner></homeswiper-banner>
        <!-- 头部搜索 -->
        <home-head></home-head>
        <!-- 广告跳转 -->
        <div class="router-link">
            <router-link to="">
            <img src="../home/img/routerLink.png" alt="">
            </router-link>
        </div>
        <!-- 分类按钮 -->
        <homeswiper-tab :list = "swiperTab"></homeswiper-tab>
        <hr class="hr20">
        <!-- 公告消息 -->
        <homeswiper-tip></homeswiper-tip>
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
        swiperTab: [
            {
            id: "0001",
            imgUrl:require('./img/tab-item.png'),
            desc: "景点门票"
            },
            {
            id: "0002",
            imgUrl:require('./img/tab-item.png'),
            desc: "滑雪季"
            },
            {
            id: "0003",
            imgUrl:require('./img/tab-item.png'),
            desc: "泡温泉"
            },
            {
            id: "0004",
            imgUrl:require('./img/tab-item.png'),
            desc: "动植园"
            },
            {
            id: "0005",
            imgUrl:require('./img/tab-item.png'),
            desc: "游乐园"
            },
            {
            id: "0006",
            imgUrl:require('./img/tab-item.png'),
            desc: "必游榜单"
            },
            {
            id: "0007",
            imgUrl:require('./img/tab-item.png'),
            desc: "演出"
            },
            {
            id: "0008",
            imgUrl:require('./img/tab-item.png'),
            desc: "城市观光"
            },
            {
            id: "0009",
            imgUrl:require('./img/tab-item.png'),
            desc: "一日游"
            }
        ],
        Recommend:[
            {
            imgurl:require("./img/组17@3x.png"),name:"德克士（金牛凤凰立交店）",status:"1",id:1
            },
            {
            imgurl:"http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",name:"小龙坎火锅冒菜",status:"0",id:2
            },
            {
            imgurl:"http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",name:"双流老妈兔头(清泰路店)",status:"1",id:3
            },
            {
            imgurl:"http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",name:"德克士（金牛凤凰立交店）",status:"1",id:4
            },
            {
            imgurl:"http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",name:"我是你大爷",status:"1",id:5
            },
            {
            imgurl:"http://img1.qunarzz.com/piao/fusion/1611/54/ace00878a52d9702.png",name:"谢记美味肥肠鸡冷锅串串(总店)",status:"1",id:6
            }
        ],
        shopList:[
            {imgUrl:require("./img/组17@3x.png"),name:"德克士（金牛凤凰立交店1)",status:1,id:1,score:4.8,sale:532,label:["快餐·中餐 ","西餐·汉堡"]},
            {imgUrl:require("./img/组17@3x.png"),name:"德克士（金牛凤凰立交店2)",status:0,id:2,score:4.3,sale:132,label:["快餐·中餐 ","西餐·汉堡"]},
            {imgUrl:require("./img/组17@3x.png"),name:"德克士（金牛凤凰立交店3)",status:0,id:3,score:5,sale:9992,label:["快餐·中餐 ","西餐·汉堡"]},
            {imgUrl:require("./img/组17@3x.png"),name:"德克士（金牛凤凰立交店4)",status:0,id:4,score:4,sale:992,label:["快餐·中餐 ","西餐·汉堡"]}
        ],
    }
  },
//   methods:{
//         // getHomeInfo () {
//         //     axios.get('')
//         //         .then(this.getHomeInfoSucc)    
//         // },
//         // getHomeInfoSucc(res){
//         //     const date = res.data.data
//         //     this.swiperTab = date.swiperTab
//         //     // this.Recommend = date.Recommend
//         //     // this.shopList = date.shopList
//         // }
        
//   },
//   mounted () {
//         // this.getHomeInfo()
//         // this.WXconfig.wxShowMenu()
//   }

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
