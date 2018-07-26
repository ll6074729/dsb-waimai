<template>
    <div>
        <div class="search-head">
            <router-link to="/" class="search-head-left">
                <img src="../../assets/img/back.png" alt="">
            </router-link>
            <div class="search-head-center">
                <input type="text" placeholder="输入商品、商户名">
                <img src="../../assets/img/clearbutton.png" alt="">
            </div>
            <div class="search-head-right">
                <img src="../../assets/img/search@3x.png" alt="" srcset="">
            </div>
        </div>
        <goods-list :list="shopList"></goods-list>

    </div>
    
</template>
<script>
import GoodsList from "../../componentss/goodsList"
export default {
    name:'Search',
    components:{
        GoodsList:GoodsList
    },
    data () {
        return {
            shopList:[
                {imgUrl:require("../../assets/img/组17@3x.png"),name:"德克士（金牛凤凰立交店)",status:1,id:1,score:4,sale:532,label:["快餐·中餐 ","西餐·汉堡"]},
                {imgUrl:require("../../assets/img/组17@3x.png"),name:"德克士（金牛凤凰立交店)",status:0,id:2,score:4,sale:132,label:["饮料·奶茶","汉堡·炸鸡"]}
            ],
        }
    }
}
</script>
<style lang="stylus" scoped>
    .search-head
        display flex
        justify-content space-between
        width 100%;
        height 10.66vw
        align-items center
        padding 1.33vw 2.66vw
        box-sizing border-box
        .search-head-left 
            width 2.13vw
            height 4.13vw
            img 
                width 100%
        .search-head-center
            position relative
            width 80%
            height 8vw
            background-color #f7f7f7
            input 
                height 100%
                width 80%
                margin-left 5%
                background-color #f7f7f7
            img 
                position absolute
                right 5.33vw
                top 2vw
                width 4vw
        .search-head-right 
            width 5.33vw
            height 5.33vw
            img 
                width 100%        
</style>
