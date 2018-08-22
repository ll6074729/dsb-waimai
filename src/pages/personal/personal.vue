<template>
    <div>
        <my-head :userinfo="userinfo"></my-head>
        <const :userinfo="userinfo"></const>
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
        <tab-bar :defaulttab="defaulttab"></tab-bar>
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
            defaulttab:3,
            userinfo:{},
        }
    },
    mounted(){
        this.Userinfo()
    },
    methods :{
        Userinfo () {
            this.$http({
                method: 'get',
                url:"/api/user_info",
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.getUserinfo)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getUserinfo (res) {
            this.userinfo = res.data.data
        }
    },

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
        padding-bottom 20vw
        font-size 3.2vw
</style>
