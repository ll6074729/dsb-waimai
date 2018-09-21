<template>
    <div>
        <coupon-head :title="title"></coupon-head>
        <div class="coupon-list" ref="coupon">
            <ul>
                <li class="item pd20" v-for="item in couponList" :key="item.id" >
                    <div class="coupon-money">
                        ￥<span>{{item.coupon.money}}</span>
                    </div>
                    <div class="coupon-info">
                        <div class="coupon-name mgbt20 fs28">
                            {{item.coupon.name}}
                        </div>
                        <div class="coupon-desc mgbt20 fs20">
                            {{item.coupon.name}}
                        </div>
                        <div class="coupon-time fs20">
                            <!-- 有效期至 {{ item.coupon.use_start_time * 1000 | formatDate}} -->
                            有效期至 {{ item.coupon.use_start_time}}
                        </div>
                    </div>
                </li> 
                <li v-if="couponList.length < 1" class="no">
                    <img src="../../assets/img/noaddress.png" alt="" >
                    <div>
                        您还没有获得优惠券哟(〃'▽'〃)
                    </div>
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
                method: 'post',
                url: 'mobile/api/q',
                // methods:'get',
                // url:'/api/buyer/coupon_list',
                data: {
                    url:'http://api.dqvip.cc/buyer/coupon_list',
                    q_type:'get'
                },
            })
                .then(this.getcouponList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getcouponList (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            // alert(res.data)
            this.couponList = date.data
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
        margin-top 13.66vw
        .coupon-title
            text-align center
            font-size 4vw
            font-weight bold
            border-bottom 1px solid #f7f7f7
            padding 4vw 0
            background-color #fff
            box-shadow 0px 5px 20px 0px rgba(0, 0, 0, 0.05)
        .no
            text-align center     
            color #999
            img 
                width 66.66vw
                height 66.66vw 
                margin-top 21.33vw    
                margin-bottom 5vw      
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
