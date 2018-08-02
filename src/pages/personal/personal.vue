<template>
    <div>
        <my-head></my-head>
        <const></const>
        <hr class="hr20">
        <other></other>
        <hr class="hr20">
        <list></list>
        <hr class="hr20">
        <div class="service">
            <a href="tel:400-588-8779">
                在线客服：400-588-8779
            </a>
        </div>
        <div class="info">
            <p>服务时间：10:00~22:00</p>
        </div>
        <tab-bar></tab-bar>
    </div>
</template>
<script>
import MyHead from "./components/head"
import TabBar from '../../componentss/tabbar'
import Const from "./components/const"
import Other from "./components/other"
import List from "./components/list"
export default {
    name:"Personal",
    components:{
        MyHead,
        TabBar,
        Const,
        Other,
        List
    },
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .service
        height 13.33vw
        text-align center
        line-height 13.33vw
        a   
            color #469afe
            font-size 3.73vw
    .info
        background-color #f7f7f7
        color #999
        text-align center
        padding-top 3vw
        padding-bottom 10vw
        font-size 3.2vw
</style>
