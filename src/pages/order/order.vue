<template>
    <div>
        <shop-info :list="shophead" ></shop-info>
        <div class="history">
            <div class="title">历史记录</div>
            <shop-info :list="shophead" ></shop-info>
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
    mounted () {
        this.latestOrder()
        this.historyOrder()
    },
    methods:{
        // 新订单
        latestOrder () {
            this.$http({
                method: 'post',
                // url: 'mobile/api/q',
                url:"/api/buyer/latest_order",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    page_size:1
                    // q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.getlatestOrder)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getlatestOrder (res) {
            console.log(res)
        },
        // 历史订单
        historyOrder () {
            this.$http({
                method: 'post',
                // url: 'mobile/api/q',
                url:"/api/buyer/history_order",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    page_size:1
                    // q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.gethistoryOrder)
                .catch(function (error) {
                    console.log(error);
                })
        },
        gethistoryOrder (res) {
            console.log(res)
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