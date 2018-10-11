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
                if(this.historyOrder[i].order_id = msg){
                    shop.push(
                        {
                            details_figure:this.historyOrder[i].details_figure,
                            goods_id:this.historyOrder[i].goods_id,
                            goods_num:this.historyOrder[i].goods_num,
                            price :this.historyOrder[i].goods_price,
                            shop_id : this.historyOrder[i].shop_id, 
                            show : this.historyOrder[i].show,
                            showMinus : this.historyOrder[i].showMinus,
                            spec : this.historyOrder[i].spec,
                            spec_price : this.historyOrder[i].spec_price || 0,
                            title : this.historyOrder[i].goods_name,
                            spec_key : this.historyOrder[i].spec_key || '',
                            spec_key_name : this.historyOrder[i].spec_key_name || ''
                        }
                    )
                    // shop[i].details_figure = this.historyOrder[i].details_figure //图片
                    // shop[i].goods_id = this.historyOrder[i].goods_id   //ID
                    // shop[i].goods_num = this.historyOrder[i].goods_num   //数量
                    // shop[i].price = this.historyOrder[i].goods_price   //价钱
                    // shop[i].shop_id = this.historyOrder[i].shop_id     //店铺ID
                    // shop[i].show = this.historyOrder[i].show
                    // shop[i].showMinus = this.historyOrder[i].showMinus 
                    // shop[i].spec = this.historyOrder[i].spec   //规格
                    // shop[i].spec_price = this.historyOrder[i].spec_price || 0 //规格价钱
                    // if(this.historyOrder[i].spec_key ){ //规格
                    //     shop[i].spec_key = this.historyOrder[i].spec_key
                    // }
                    // if(this.historyOrder[i].spec_key_name ){ //规格名字
                    //     shop[i].spec_key_name = this.historyOrder[i].spec_key_name 
                    // }
                    
                    // shop[i].title = this.historyOrder[i].goods_name
                    localStorage[this.historyOrder[i].shop_id] = JSON.stringify(shop)
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