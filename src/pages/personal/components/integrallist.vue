<template>
    <div class="integral">
        <div class="item df">
            <div class="info">
                <div class="info-text">
                    每日登陆
                </div>
                <div class="info-time">
                    2018-08-03
                </div>
            </div>
            <div class="moeny">
                +10
            </div>
        </div>
        <div class="item df">
            <div class="info">
                <div class="info-text">
                    评价订单
                </div>
                <div class="info-time">
                    2018-08-03
                </div>
            </div>
            <div class="moeny">
                +10
            </div>
        </div>
        <div class="item df">
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
        </div>
    </div>
</template>
<script>
export default {
    name:"integrallist",
}
</script>
<style lang="stylus" scoped>
    .integral
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

