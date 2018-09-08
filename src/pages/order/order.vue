<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <div v-if="latestOrder.length ==0 && historyOrder.length == 0" style="text-align:center;margin-top:3vw">暂无订单,请您快去购买哟~！</div>
        <div v-if="latestOrder.length != 0" :class="{'history':historyOrder.length == 0}">   
            <div class="title">当前订单</div>
            <shop-info :list="latestOrder" @orderlist="orderlist"></shop-info>
        </div>
        <div class="history" v-if="historyOrder.length != 0">
            <div class="title">历史记录</div>
            <shop-info :list="historyOrder" @orderlist="orderlist"></shop-info>
        </div>
        <tab-bar :defaulttab="defaulttab"></tab-bar>
    </div>
</template>
<script>
import TabBar from '../../componentss/tabbar'
import ShopInfo from "./components/shopinfo"
import OrderInfo from "./components/orderinfo"
import OrderBtn from "./components/orderbtn"
export default {
    name:"order",
    components:{
        TabBar,
        ShopInfo,
        OrderInfo,
        OrderBtn,
    },
    data () {
        return{
            defaulttab:1,
            latestOrder:[],
            historyOrder:[],
            fullscreenLoading: true
        }
    },
    mounted () {
        this.newlatestOrder()
        this.newhistoryOrder()
    },
    watch:{
       
    },
    methods:{
        orderlist () {
            this.newlatestOrder()
            this.newhistoryOrder()
        },
        // 新订单
        newlatestOrder () {
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // url:'api/buyer/latest_order',
                data: {
                    url:'http://api.dqvip.cc/buyer/latest_order',
                    page_size:50,
                    q_type:'post'
                }
            })
                .then(this.getlatestOrder)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getlatestOrder (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            this.latestOrder = date.data.data
            this.fullscreenLoading = false
        },
        // 历史订单
        newhistoryOrder () {
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // url:'api/buyer/history_order',
                data: {
                    url:'http://api.dqvip.cc/buyer/history_order',
                    page_size:300,
                    q_type:'post'
                }
            })
                .then(this.gethistoryOrder)
                .catch(function (error) {
                    console.log(error);
                })
        },
        gethistoryOrder (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            this.historyOrder = date.data.data
        }
    }
}
</script>
<style lang="stylus" scoped>
    .history
        padding-bottom 13.33vw    
        .title
            background-color #f7f7f7
            font-weight 100

</style>