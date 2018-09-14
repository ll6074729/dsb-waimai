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
                }
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
                }
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
