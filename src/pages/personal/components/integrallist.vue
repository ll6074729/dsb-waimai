<template>
    <div class="integral">
        <div>
            <div class="item df" v-for="item in integral" :key="item.id" v-if="parseInt(item.user_money)  != 0 || parseInt(item.pay_points) != 0">
                <div class="info">
                    <div class="info-text">
                        {{item.desc}}
                    </div>
                    <div class="info-time">
                        {{item.change_time}}
                    </div>
                </div>
                <div class="moeny" v-if="title == '积分明细'">
                    {{item.pay_points}}
                </div>
                <div class="moeny" v-if="title == '余额明细'">
                    {{item.user_money}}
                </div>
            </div>
            <!-- <div class="item df">
                <div class="info">
                    <div class="info-text">
                        平台消费
                    </div>
                    <div class="info-time">
                        2018-08-03
                    </div>
                </div>
                <div class="moeny moeny-fail">
                    -500
                </div>
            </div> -->
        </div>
        <div v-if="integral.length < 1" style="text-align:center;margin-top:3vw">
            暂无{{title}}
        </div>
    </div>
</template>
<script>
export default {
    name:"integrallist",
    props:{
        integral:Array,
        title:String
    }
}
</script>
<style lang="stylus" scoped>
    .integral
        margin-top 13.66vw
        .item
            padding 6vw 2.66vw
            border-bottom 1px solid #f7f7f7
            .info
                font-size 3.73vw
                .info-time
                    color #999
                    margin-top 2.66vw
            .moeny
                font-size 5.33vw
                margin-top 2vw    
            .moeny-fail
                color #c56262    
</style>

