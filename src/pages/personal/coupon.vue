<template>
    <div>
        <coupon-head :title="title"></coupon-head>
        <div class="coupon-list" ref="coupon">
            <ul>
                <li class="item pd20" v-for="item in couponList" :key="item.id" >
                    <div class="coupon-money">
                        ￥<span>{{item.money}}</span>
                    </div>
                    <div class="coupon-info">
                        <div class="coupon-name mgbt20 fs28">
                            {{item.name}}
                        </div>
                        <div class="coupon-desc mgbt20 fs20">
                            {{item.name}}
                        </div>
                        <div class="coupon-time fs20">
                            有效期至 {{ item.use_start_time * 1000 | formatDate}}
                        </div>
                    </div>
                </li>
                <li v-if="couponList.lenght == 0">
                    暂无可用优惠券
                </li>
            </ul>
        </div>
    </div>
    
</template>
<script>
import {formatDate} from 'st/time.js'
import CouponHead from '../../componentss/headback'
export default {
    name:'coupon',
    components:{
        CouponHead
    },
    data () {
        return {
            title:'优惠券列表',
            couponList:[],
        }
    },
    mounted () {
        this.coupon_list()
    },
    methods:{
        coupon_list () {
            this.$http({
                method: 'get',
                // url: 'mobile/api/q',
                url:"/api/buyer/coupon_list",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    // q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.getcouponList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getcouponList (res) {
            this.couponList = res.data.data
        },
    },
    filters :{
        formatDate(time) {
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd');
        }
    }
}
</script>
<style lang="stylus" scoped>
    html
        background-color #f7f7f7!important
    .coupon-list
        .coupon-title
            text-align center
            font-size 4vw
            font-weight bold
            border-bottom 1px solid #f7f7f7
            padding 4vw 0
            background-color #fff
            box-shadow 0px 5px 20px 0px rgba(0, 0, 0, 0.05)
        .item
            margin 2.66vw
            background-color #f7f7f7
            height 26.66vw
            background-image url(../../assets/img/coupon_bg_white.png)
            background-size 100% 100%
            background-repeat no-repeat
            display flex
            justify-content center
            align-items center
            .coupon-money
                flex 1
                text-align center
                color #469afe
                span 
                    font-size 8vw
                    font-weight bold
                    vertical-align middle
            .coupon-info
                flex 2    
                .coupon-name
                    font-weight bold
                .fs20
                    color #999   
</style>
