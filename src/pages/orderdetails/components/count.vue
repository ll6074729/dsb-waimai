<template>
    <div class="count">
        <div class="count-text" v-if="order_status != 0" >
            <!-- <el-progress type="circle" :percentage="0"></el-progress> -->
            <el-progress 
                type="circle" 
                ref="progress" 
                :percentage="count" 
                width="70" 
                :stroke-width= '3'
            >
            </el-progress>
            <div class="count-html">
                {{text}}
            </div>
        </div>
        <diV v-if="pay_status == 0">
            <!-- <p style="color:#469afe">订单待支付</p> -->
            <p v-if="order_status == 0" style="color:#469afe">订单待支付</p>
            <p v-if="order_status == 3" style="color:#469afe">订单已取消</p>
        </diV>
        <div v-if="pay_status ==1">
            <p v-if="order_status == 0">等待商家接单中</p>
            <p v-if="order_status == 1">
                <span v-if="shipping_status == 0 && ps_id == 0">
                    商家出餐中,待骑手接单
                </span>
                <span v-if="shipping_status == 1 || ps_id > 0">
                    商家出餐中,骑手已接单
                </span>
                <!-- <span v-if="ps_id > 0">
                    商家出餐中,骑手已接单
                </span> -->
            </p>
            <p v-if="order_status == 2">
                <span v-if="shipping_status == 0">
                    商家已出餐,骑手取货中
                </span>
                <span v-if="shipping_status == 1">
                    骑手配送中
                </span>
                <span v-if="shipping_status == 2">
                    订单已收货
                </span>
            </p>
            <p v-if="order_status == 3">订单已支付且已取消</p>
            <p v-if="order_status == 4">
                <span v-if="shipping_status == 2">
                    订单已完成
                </span>
            </p>
            <p v-if="order_status == 5">商家已取消订单,请联系商家</p>
        </div>
    </div>
</template>
<script>
export default {
    name:"Count",
    props:{
        order_status:Number,
        shipping_status:Number,
        pay_status:Number,
        timer:String,
        ensure_time:String,
        user_note:String,
        ps_id:Number
    },
    data () {
        return {
            count:"0",
            text:'0:00',
            starttimer: Date.parse(new Date(this.ensure_time))/1000, //接单时间
            currenttimer:'', //当前时间
            endtimer:Date.parse(new Date(this.timer))/1000 //预计到达时间
        }
    },
    mounted () {
        this.time()
        this.currenttimerr()
        this.$nextTick(function () {
            setInterval(this.currenttimerr, 1000);
        })
    },
    methods:{
        time () {
            console.log(this.timerr)
            console.log(this.timer)
        },
        currenttimerr () {
            this.currenttimer = Date.parse(new Date())/1000
            this.starttimer= Date.parse(new Date(this.ensure_time))/1000, //接单时间
            this.endtimer=Date.parse(new Date(this.timer))/1000 //预计到达时间
        },
        leftTimer(){ 
            // console.log(new Date(),new Date(this.endtimer*1000),22)
            var leftTime = (new Date(this.endtimer*1000)) - (new Date()); //计算剩余的毫秒数 
            var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数 
            var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时 
            var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
            var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
            days = this.checkTime(days); 
            hours = this.checkTime(hours); 
            minutes = this.checkTime(minutes); 
            seconds = this.checkTime(seconds); 
            this.text = minutes +':' + seconds
        },
        checkTime (i) { //将0-9的数字前面加上0，例1变为01 
        if(i<10) 
            { 
                i = "0" + i; 
            } 
            return i; 
        } 
    },
    watch:{
        currenttimer () {
            let countTime = parseInt(this.endtimer) - parseInt(this.starttimer) //总时间
            let currenTime = parseInt(this.currenttimer) - parseInt(this.starttimer); //进行的时间
            let bugtime = parseInt(this.endtimer) - parseInt(this.currenttimer) //倒计时
            let minutes =  parseInt(bugtime / 60 % 60, 10)
            let seconds = parseInt(bugtime / 1000 % 60, 10);
            if(this.order_status != 4){
                if(currenTime <= countTime){
                    this.count = parseInt((currenTime/countTime)*100)
                    this.leftTimer()
                }else{
                    this.count = 100
                    this.$refs.progress.color = "#ff7777"
                    this.text = '订单超时'
                }
            }else{
                this.count = 100
                // this.$refs.progress.color = "#ff7777"
                this.text = '订单完成'
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
    .count
        width 100%
        text-align center
        // position relative
        .count-text
            position absolute
            background #fff;
            border-radius 50%
            top 5.33vw
            left 50%
            margin-left -10.66vw
            padding 2vw
            .count-html
                position absolute
                top 40%
                left 50%
                width 50px
                margin-left -25px
                background #fff
                font-size 12px
        p
            font-size 4.8vw
            font-weight bolder
            margin-top 17vw
            margin-bottom 5.66vw
</style>
