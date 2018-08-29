<template>
    <div>
        <my-head :userinfo="userinfo"></my-head>
        <const :userinfo="userinfo" :couponList="couponList"></const>
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
            couponList:[],
        }
    },
    mounted(){
        this.Userinfo()
        this.coupon_list()
    },
    methods :{
        coupon_list () {
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // method:'get',
                // url:'api/buyer/coupon_list',
                data: {
                    url:'http://api.dqvip.cc/buyer/coupon_list',
                    q_type:'get'
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                // }
            })
                .then(this.getcouponList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getcouponList (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            console.log(date,19)
            this.couponList = date.data
        },
        Userinfo () {
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // method:'get',
                // url:'api/user_info',
                data:{
                    url:"http://api.dqvip.cc/user_info",
                    q_type:'get'
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                // }
            })
                .then(this.getUserinfo)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getUserinfo (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            console.log(date,20)
            this.userinfo =  date.data
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
