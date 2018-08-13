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
        <homeswiper-tab :list="swiperTab"></homeswiper-tab>
        <hr class="hr20">
        <!-- 公告消息 -->
        <homeswiper-tip :notice="notice"></homeswiper-tip>
        <hr class="hr20">
        <!-- 优选商家 -->
        <recommend :list="Recommend"></recommend>
        <hr class="hr20">
        <!-- 商家列表 -->
        <goods-list :shopList="shopList">
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
        shopList:[],
    }
  },
    methods:{
        chooesSchool () {
            if(this.$store.state.area_id == undefined){
                this.$router.push({path:"/Location"})
            }else{
                this.$http({
                    method: 'post',
                    url: 'mobile/api/q',
                    data: {
                        url:'http://api.dqvip.cc/home',
                        area_id:4,
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
            console.log(res)
            const date = eval('(' + res.data + ')')
            console.log(date.data)
            this.banner = date.data.banner //banner图
            this.swiperTab = date.data.shop_type // 分类按钮
            this.notice = date.data.notice //通告
            this.Recommend = date.data.recommend_shop //大牌推荐
        },
        handSearch () {
            this.$http({
                method: 'post',
                url: '/mobile/api/q',
                data: {
                    url:'http://api.dqvip.cc/buyer/shop_list',
                    type_id : this.$route.query.type_id,
                    area_id : 4,
                    q_type:'get'
                },
            })
                .then(this.getSearch)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getSearch (res) {
            let date = eval('(' + res.data + ')')
            console.log(date,888)
            this.shopList = date.data.data //商家列表
            console.log(this.shopList,999)
        }
    },
    mounted() {
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
