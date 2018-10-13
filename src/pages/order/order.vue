<template>
    <div v-loading.fullscreen.lock="fullscreenLoading">
        <div v-if="latestOrder.length ==0 && historyOrder.length == 0" class="no">
            <img src="../../assets/img/noorder.png" alt="" >
            <div>
                亲,你还没有想吃的么 ╥﹏╥
            </div>
        </div>
        <div v-if="latestOrder.length != 0" :class="{'history':historyOrder.length == 0}">   
            <div class="title">订单列表</div>
            <shop-info :list="latestOrder" @orderlist="orderlist" @alignOrder="alignOrder"></shop-info>
        </div>
        <div class="history" v-if="historyOrder.length != 0">
            <div class="title">历史记录</div>
            <shop-info :list="historyOrder" @orderlist="orderlist" @alignOrder="alignOrder"></shop-info>
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
        // 再来一单
        alignOrder (msg) {
            // console.log(msg)
            var shop = []
            for(let i in this.historyOrder){
                if(this.historyOrder[i].order_id == msg){
                    for(var j = 0;j<this.historyOrder[i].order_goods.length;j++){
                        shop.push({
                            details_figure:this.historyOrder[i].order_goods[j].details_figure,
                            goods_id:this.historyOrder[i].order_goods[j].goods_id,
                            goods_num:this.historyOrder[i].order_goods[j].goods_num,
                            price :this.historyOrder[i].order_goods[j].goods_price,
                            shop_id : this.historyOrder[i].shop_id, 
                            show : true,
                            showMinus : true,
                            spec : this.historyOrder[i].order_goods[j].spec,
                            spec_price : this.historyOrder[i].order_goods[j].spec_price || 0,
                            title : this.historyOrder[i].order_goods[j].goods_name,
                            spec_key : this.historyOrder[i].order_goods[j].spec_key || '',
                            spec_key_name : this.historyOrder[i].order_goods[j].spec_key_name || ''
                        })
                    }
                    console.log(shop)
                    localStorage[this.historyOrder[i].shop_id] = JSON.stringify(shop)
                    this.$router.push({path:'shop/'+this.historyOrder[i].shop_id})
                }
            }
        },
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
    .no
        text-align center     
        color #999
        img 
            width 66.66vw
            height 66.66vw 
            margin-top 10.33vw    
            margin-bottom 5vw    
    .history
        padding-bottom 13.33vw    
        .title
            background-color #f7f7f7
            font-weight 100

</style>