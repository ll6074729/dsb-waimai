<template>
    <div>
        <div v-if="page != 'cart'">
            <div class="cost-activity df" v-if="coupon != 0">
                <div class="center">优惠券</div>
                <div class="activity-name">-{{coupon}}</div>
            </div>
            <div class="cost-activity df" v-if="user_money != 0">
                <div class="center">余额</div>
                <div class="activity-name">-{{user_money}}</div>
            </div>
            <div class="cost-activity df" v-if="integral != 0">
                <div class="center">积分</div>
                <div class="activity-name">-{{integral/100}}</div>
            </div>
        </div>
        <div class="cost-activity df" v-if="cartprom[0]">
            <div class="activity-type type0">满减</div>
            <div class="activity-name" v-if="page != 'center'" >{{cartprom[0].title}}</div>
            <div class="activity-name" v-if="page == 'center'" >-{{cartprom[0].deduction_money}}</div>
        </div>
        <div class="cost-activity df" v-if="cartprom[1]">
            <div class="activity-type type1">赠品</div>
            <div class="activity-name" v-if="page != 'center'" >{{cartprom[1].title}}</div>
            <div class="activity-name" v-if="page == 'center'" >{{cartprom[1].prom_title}}</div>
        </div>
        <div class="cost-activity df" v-if="shopprom[2][0]">
            <div class="activity-type type2">首单</div>
            <div class="activity-name" v-if="page != 'center'" >{{shopprom[2][0].title}}</div>
            <div class="activity-name" v-if="page == 'center'" >{{shopprom[2][0].deduction_money}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name:"activity",
    props:{
        cartprom:Object,
        page:String,
        coupon:Number,
        integral:Number,
        user_money:Number,
        shopprom:Array,
    },
    mounted () {
        this.liucartprom()
    },
    methods : {
        liucartprom () {
            console.log(this.cartprom,199)
        }
    },
    data () {
        return {

        }
    },
    watch: {
        cartprom () {
            console.log(this.cartprom,199)
        }
    }
}
</script>
<style lang="stylus" scoped>
    .cost-activity
        padding 2.3vw 5.33vw
        font-size 3.2vw
        border-bottom 1px solid #f7f7f7
        .center
            margin-top 1vw
            padding 1.33vw 2.13vw
        .activity-type
            padding 1.33vw 2.13vw
        .type0
            background-color #ffe1e1  
            color #ff7373
        .type1
            background-color #e2ffe1  
            color #43ce56
        .type2
            background-color #e1efff   
            color #81a2ff
        .activity-name
            line-height 5.6vw    
            color #999
</style>
