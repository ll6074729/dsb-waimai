<template>
    <div>
        <shop-info :list="shophead" ></shop-info>
        <div class="history">
            <div class="title">历史记录</div>
            <shop-info :list="shophead" ></shop-info>
        </div>
        <tab-bar></tab-bar>
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
            // shophead:[{id:1,shopname:"德克士",shopimg:require("../../assets/img/组17@3x.png"),shoptime:"2018-07-30  12:33",shopstatus:"1"},
            //     {id:2,shopname:"肯不起",shopimg:require("../../assets/img/组17@3x.png"),shoptime:"2018-07-01  12:33",shopstatus:"2"},
            //     {id:3,shopname:"麦得就是贵",shopimg:require("../../assets/img/组17@3x.png"),shoptime:"2018-07-06  12:33",shopstatus:"3"}
            // ],
            // orderfood:[{id:1,name:"扣肉饭",attr:[{id:1,attrname:"大份"},{id:2,attrname:"中杯"},{id:3,attrname:"小杯"}],num:4},{id:2,name:"我得最爱除了你没有其他得",attr:[{id:1,attrname:"大份"},{id:2,attrname:"中杯"},{id:3,attrname:"小杯"}],money:35.40}
            // ],
            shophead:[{id:1,shopname:"德克士",shopimg:require("../../assets/img/组17@3x.png"),shoptime:"2018-07-30  12:33",shopstatus:"1",money:35.40,foodList:[{id:1,name:"1扣肉饭",attr:[{id:1,attrname:"大份"},{id:2,attrname:"中杯"},{id:3,attrname:"小杯"}],num:4},{id:2,name:"我得最爱除了你没有其他得",attr:[{id:1,attrname:"大份"},{id:2,attrname:"中杯"},{id:3,attrname:"小杯"}],num:6}]},
            {id:2,shopname:"肯不起",shopimg:require("../../assets/img/组17@3x.png"),shoptime:"2018-07-01  12:33",shopstatus:"2",money:95.40,foodList:[{id:1,name:"2扣肉饭",attr:[{id:1,attrname:"大份"},{id:2,attrname:"中杯"},{id:3,attrname:"小杯"}],num:4},{id:2,name:"我得最爱除了你没有其他得",attr:[{id:1,attrname:"大份"},{id:2,attrname:"中杯"},{id:3,attrname:"小杯"}],num:6}]},
            {id:3,shopname:"麦得就是贵",shopimg:require("../../assets/img/组17@3x.png"),shoptime:"2018-07-06  12:33",shopstatus:"3",money:135.40,foodList:[{id:1,name:"3扣肉饭",attr:[{id:1,attrname:"大份"},{id:2,attrname:"中杯"},{id:3,attrname:"小杯"}],num:4},{id:2,name:"我得最爱除了你没有其他得",attr:[{id:1,attrname:"大份"},{id:2,attrname:"中杯"},{id:3,attrname:"小杯"}],num:6}]}]
        }
    },
    methods:{

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