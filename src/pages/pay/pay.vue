<template>
    <div>
        <!-- <pay-fail></pay-fail> -->
        <pay-success></pay-success>
        <div class="btn df">
            <router-link tag="div" to="/">继续点餐</router-link>
            <div @click="order">订单详情 </div>
            <!-- <router-link tag="div" to="/orderdetails">订单详情</router-link> -->
        </div>
        <!-- <pay-share></pay-share> -->
        <recom-mend></recom-mend>
    </div>
</template>
<script>
import PayFail from "./components/fail"
import PaySuccess from "./components/success"
import PayShare from "./components/payshare"
import RecomMend from "./components/recommend"
export default {
    name:"pay",
    components:{
        PayFail,
        PaySuccess,
        PayShare,
        RecomMend,
    },
    data () {
        return {

        }
    },
    methods:{
        order () {
            // console.log(this.$route.query.order_sn)
            this.$router.push({path:'/orderdetails',query:{order_sn:this.$route.query.order_sn,order_id:this.$route.query.order_id}})
        }
    }
}
</script>
<style lang="stylus" scoped>
    .btn
        margin 9.33vw 12.53vw
        div
            border 1px solid #dbdbdb
            width 32vw
            height 10.66vw
            border-radius 1vw
            text-align center
            line-height 10.66vw
</style>
