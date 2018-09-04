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
        <goods-list :shopList="shopList" :page="page">
            <div class="title">
                优选商家
            </div>
        </goods-list>
        <tab-bar :defaulttab="defaulttab"></tab-bar>
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
        defaulttab:0,
        page:'shop-home',
    }
  },
    methods:{
        chooesSchool () {
            if(this.$store.state.area_id == undefined){
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
                    // headers :{
                    //     'Accept':'application/json',
                    //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY1YWE4OTRmYmZkMDRiNzU4Yzk2ZGRlOTY0NzcyMWQ5M2IzM2Q1Mzk1NGZlNTAwMmFlNTQ1ODNkMjZlNjZiMDhiMWYxYmI3ZGIyOWY5MzYzIn0.eyJhdWQiOiIyIiwianRpIjoiZjVhYTg5NGZiZmQwNGI3NThjOTZkZGU5NjQ3NzIxZDkzYjMzZDUzOTU0ZmU1MDAyYWU1NDU4M2QyNmU2NmIwOGIxZjFiYjdkYjI5ZjkzNjMiLCJpYXQiOjE1MzU3MTE1MTIsIm5iZiI6MTUzNTcxMTUxMiwiZXhwIjoxNTM4MzAzNTEyLCJzdWIiOiI2NSIsInNjb3BlcyI6WyIqIl19.sr8YCf3ZR1Tc8P4IU8gLK15WTdRwQy-DdZNxSND_C-sTohzhEfuAz6ZqVPnUmCFU9Stb7o94vKBj-SFg8695SxdnQ6KTsln5jbl0zGqZPpa00nyW-2q_PDu8aKTv78inCEtl_bfsJ7XLz9wOnn8LfM9TmQJz4OXRI52baKpsBZ5Dxapp90uvGFlK26rAuzClXasvCSlH9YuC7J0rLP8yhuc8iFscWxN8YhARPIswVlG9_Mij2-DJdwAiqE_3XPxHPLrxIWsD3Ud-NYs0YbqzkXrEAEbDhllxuDW1VxNH1nvX0qNhvPUZ7WV3GuOfJgbIECvpaBfpQ7EWPZp1bQVFktgutGO0RMbATjE6IaD-tlycB46wIxxintgrDg-KGIowdcGXY274hXJCi8smPF0zPgN7UIT-lnddC6ySkldyWtcdWM0jzsUQvXwt2tmoJ1izcysJHkWQUTRU7Y3BB9oEL1qERCa8qCp8mXnMmXNTtUzRhRB2K2-IBstYKKFdvNl4x0FQMehqSHevkAdOixObkwKI5xoHxqdVouv1W01QeeU4nmpT12yQqZl6XL8b5tNBlAel8CbEd23tc3wPDeXdoxyB-kxYGDqqbocRI4rZs5wnuY32D8bweuv3iCf6RgpIgkKNpdWoZmbNW5QOWMfDCn7BRsLG1VXNs4OLryFRNCk'
                    // }
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
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY1YWE4OTRmYmZkMDRiNzU4Yzk2ZGRlOTY0NzcyMWQ5M2IzM2Q1Mzk1NGZlNTAwMmFlNTQ1ODNkMjZlNjZiMDhiMWYxYmI3ZGIyOWY5MzYzIn0.eyJhdWQiOiIyIiwianRpIjoiZjVhYTg5NGZiZmQwNGI3NThjOTZkZGU5NjQ3NzIxZDkzYjMzZDUzOTU0ZmU1MDAyYWU1NDU4M2QyNmU2NmIwOGIxZjFiYjdkYjI5ZjkzNjMiLCJpYXQiOjE1MzU3MTE1MTIsIm5iZiI6MTUzNTcxMTUxMiwiZXhwIjoxNTM4MzAzNTEyLCJzdWIiOiI2NSIsInNjb3BlcyI6WyIqIl19.sr8YCf3ZR1Tc8P4IU8gLK15WTdRwQy-DdZNxSND_C-sTohzhEfuAz6ZqVPnUmCFU9Stb7o94vKBj-SFg8695SxdnQ6KTsln5jbl0zGqZPpa00nyW-2q_PDu8aKTv78inCEtl_bfsJ7XLz9wOnn8LfM9TmQJz4OXRI52baKpsBZ5Dxapp90uvGFlK26rAuzClXasvCSlH9YuC7J0rLP8yhuc8iFscWxN8YhARPIswVlG9_Mij2-DJdwAiqE_3XPxHPLrxIWsD3Ud-NYs0YbqzkXrEAEbDhllxuDW1VxNH1nvX0qNhvPUZ7WV3GuOfJgbIECvpaBfpQ7EWPZp1bQVFktgutGO0RMbATjE6IaD-tlycB46wIxxintgrDg-KGIowdcGXY274hXJCi8smPF0zPgN7UIT-lnddC6ySkldyWtcdWM0jzsUQvXwt2tmoJ1izcysJHkWQUTRU7Y3BB9oEL1qERCa8qCp8mXnMmXNTtUzRhRB2K2-IBstYKKFdvNl4x0FQMehqSHevkAdOixObkwKI5xoHxqdVouv1W01QeeU4nmpT12yQqZl6XL8b5tNBlAel8CbEd23tc3wPDeXdoxyB-kxYGDqqbocRI4rZs5wnuY32D8bweuv3iCf6RgpIgkKNpdWoZmbNW5QOWMfDCn7BRsLG1VXNs4OLryFRNCk'
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
