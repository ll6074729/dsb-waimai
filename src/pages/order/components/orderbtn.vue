<template>
    <div class="order-btn-box" :class="page">
        <div class="order-btn-item bg" v-if="order_status == 0 && pay_status == 0" @click="pay">
            立即支付
        </div>
        <router-link tag="div" to="/complaint" class="order-btn-item" v-if="order_status == 4 && finish_time < confirm_time">
            超时赔付
        </router-link>
        <router-link tag="div" :to="{path:'evaluate',query:{order_id:order_id,order_sn:order_sn,shop_id:shop_id}}" class="order-btn-item bg" v-if="order_status == 4 && is_comment == 0">
            评价订单
        </router-link>
        <div @click="alignOrder" class="order-btn-item bg" v-if="order_status == 4 || order_status == 3">
            再来一单
        </div>
        <div class="order-btn-item" v-if="order_status == 0" @click="cancel_order">
            取消订单
        </div>
        <p v-if="order_status == 1">超时可申请最高十元赔付</p>
        <p v-if="order_status == 2 && shipping_status !=2">超时可申请最高十元赔付</p>
        <p v-if="order_status == 5">余额已退回支付账户</p>
    </div>
</template>
<script>
export default {
    name:"orderbtn",
    props:{
        page:String,
        order_status:Number,
        shop_id:Number,
        order_id:Number,
        order_sn:Number,
        pay_status:Number,
        is_comment:Number,
        finish_time:Number,
        confirm_time:Number
    },
    data () {
        return {
           
        }
    },
    methods:{
        alignOrder (shop_id) {
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // url:'api/buyer/again_orders',
                data: {
                    url:'http://api.dqvip.cc/buyer/again_orders',
                    q_type:'post',
                    order_id:this.order_id
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY1YWE4OTRmYmZkMDRiNzU4Yzk2ZGRlOTY0NzcyMWQ5M2IzM2Q1Mzk1NGZlNTAwMmFlNTQ1ODNkMjZlNjZiMDhiMWYxYmI3ZGIyOWY5MzYzIn0.eyJhdWQiOiIyIiwianRpIjoiZjVhYTg5NGZiZmQwNGI3NThjOTZkZGU5NjQ3NzIxZDkzYjMzZDUzOTU0ZmU1MDAyYWU1NDU4M2QyNmU2NmIwOGIxZjFiYjdkYjI5ZjkzNjMiLCJpYXQiOjE1MzU3MTE1MTIsIm5iZiI6MTUzNTcxMTUxMiwiZXhwIjoxNTM4MzAzNTEyLCJzdWIiOiI2NSIsInNjb3BlcyI6WyIqIl19.sr8YCf3ZR1Tc8P4IU8gLK15WTdRwQy-DdZNxSND_C-sTohzhEfuAz6ZqVPnUmCFU9Stb7o94vKBj-SFg8695SxdnQ6KTsln5jbl0zGqZPpa00nyW-2q_PDu8aKTv78inCEtl_bfsJ7XLz9wOnn8LfM9TmQJz4OXRI52baKpsBZ5Dxapp90uvGFlK26rAuzClXasvCSlH9YuC7J0rLP8yhuc8iFscWxN8YhARPIswVlG9_Mij2-DJdwAiqE_3XPxHPLrxIWsD3Ud-NYs0YbqzkXrEAEbDhllxuDW1VxNH1nvX0qNhvPUZ7WV3GuOfJgbIECvpaBfpQ7EWPZp1bQVFktgutGO0RMbATjE6IaD-tlycB46wIxxintgrDg-KGIowdcGXY274hXJCi8smPF0zPgN7UIT-lnddC6ySkldyWtcdWM0jzsUQvXwt2tmoJ1izcysJHkWQUTRU7Y3BB9oEL1qERCa8qCp8mXnMmXNTtUzRhRB2K2-IBstYKKFdvNl4x0FQMehqSHevkAdOixObkwKI5xoHxqdVouv1W01QeeU4nmpT12yQqZl6XL8b5tNBlAel8CbEd23tc3wPDeXdoxyB-kxYGDqqbocRI4rZs5wnuY32D8bweuv3iCf6RgpIgkKNpdWoZmbNW5QOWMfDCn7BRsLG1VXNs4OLryFRNCk'
                // }
            })
                .then(this._alignOrder)
                .catch(function (error) {
                    console.log(error);
                })
        },
        _alignOrder (res) {
            let date = eval('('+res.data+')')
            this.$router.push({path:'shop',query:{shop_id:this.shop_id}})
        },
        pagestyle () {

        },
        cancel_order () {
            let _this = this
            this.$http({
                method:'post',
                url:'mobile/api/q',
                // url:'api/buyer/cancel_order',
                data:{
                    url:'http://api.dqvip.cc/buyer/cancel_order',
                    q_type:'post',
                    order_id:this.order_id,
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY1YWE4OTRmYmZkMDRiNzU4Yzk2ZGRlOTY0NzcyMWQ5M2IzM2Q1Mzk1NGZlNTAwMmFlNTQ1ODNkMjZlNjZiMDhiMWYxYmI3ZGIyOWY5MzYzIn0.eyJhdWQiOiIyIiwianRpIjoiZjVhYTg5NGZiZmQwNGI3NThjOTZkZGU5NjQ3NzIxZDkzYjMzZDUzOTU0ZmU1MDAyYWU1NDU4M2QyNmU2NmIwOGIxZjFiYjdkYjI5ZjkzNjMiLCJpYXQiOjE1MzU3MTE1MTIsIm5iZiI6MTUzNTcxMTUxMiwiZXhwIjoxNTM4MzAzNTEyLCJzdWIiOiI2NSIsInNjb3BlcyI6WyIqIl19.sr8YCf3ZR1Tc8P4IU8gLK15WTdRwQy-DdZNxSND_C-sTohzhEfuAz6ZqVPnUmCFU9Stb7o94vKBj-SFg8695SxdnQ6KTsln5jbl0zGqZPpa00nyW-2q_PDu8aKTv78inCEtl_bfsJ7XLz9wOnn8LfM9TmQJz4OXRI52baKpsBZ5Dxapp90uvGFlK26rAuzClXasvCSlH9YuC7J0rLP8yhuc8iFscWxN8YhARPIswVlG9_Mij2-DJdwAiqE_3XPxHPLrxIWsD3Ud-NYs0YbqzkXrEAEbDhllxuDW1VxNH1nvX0qNhvPUZ7WV3GuOfJgbIECvpaBfpQ7EWPZp1bQVFktgutGO0RMbATjE6IaD-tlycB46wIxxintgrDg-KGIowdcGXY274hXJCi8smPF0zPgN7UIT-lnddC6ySkldyWtcdWM0jzsUQvXwt2tmoJ1izcysJHkWQUTRU7Y3BB9oEL1qERCa8qCp8mXnMmXNTtUzRhRB2K2-IBstYKKFdvNl4x0FQMehqSHevkAdOixObkwKI5xoHxqdVouv1W01QeeU4nmpT12yQqZl6XL8b5tNBlAel8CbEd23tc3wPDeXdoxyB-kxYGDqqbocRI4rZs5wnuY32D8bweuv3iCf6RgpIgkKNpdWoZmbNW5QOWMfDCn7BRsLG1VXNs4OLryFRNCk'
                // }
            })
                .then(function(res){
                    console.log(res)
                    _this.$emit('orderlist','0')
                    _this.$message({
                        type: 'success',
                        message: '取消成功'
                    })
                    // _this.$router.push('/order')
                })
                .catch(function(error){
                    console.log(error)
                })
        },
        pay () {
            let _this = this
            this.$http({
                method:'post',
                url:'http://wm.dqvip.cc/Mobile/Payment/getpayCode',
                data:{
                    order_id:this.order_id,
                    pay_radio:'pay_code=weixin'
                },
            })
                .then(function(response){
                    _this.styleIndex.callpay(response.data)
                })
                .catch(function(error){
                    console.log(error)
                })
        }
    }
}
</script>
<style lang="stylus" scoped>
    .center
        justify-content center
    .end 
        justify-content flex-end
    .order-btn-box
        display flex
        padding 2.66vw
        .order-btn-item
            padding 2.26vw 3.33vw
            border 1px solid #999
            margin-left 2.66vw
            border-radius 1vw
        .bg
            border-color #469afe
            color #469afe
        p
            color #469afe   
</style>
