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
        <div @click="alignOrder(order_id)" class="order-btn-item bg" v-if="order_status == 4 || order_status == 3">
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
        order_sn:String,
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
        alignOrder (order_id) {
            this.$emit('alignOrder',order_id)
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
                }
            })
                .then(function(res){
                    console.log(res)
                    let date = eval('('+res.data+')')
                    // alert(res.data)
                    if(date.status == 200){
                        _this.$emit('orderlist','0')
                        _this.$message({
                            type: 'success',
                            message: date.message
                        })
                        _this.$router.push('/order')
                    }else{
                        _this.$message({
                            type: 'error',
                            message: date.message
                        })
                    }  
                })
                .catch(function(error){
                    console.log(error)
                })
        },
        pay () {
            this.$router.push({path:'/paystatus',query:{"order_id":this.order_id}})
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
            padding 1.66vw 2.22vw
            border 1px solid #999
            margin-left 2.66vw
            border-radius 1vw
        .bg
            border-color #469afe
            color #469afe
        p
            color #469afe   
</style>
