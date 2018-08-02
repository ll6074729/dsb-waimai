<template>
    <div class="message">
        <div class="message-item df">
            <div class="list-name">
                送达时间
            </div>
            <div class="list-text">
                到店自提 (13:55)
            </div>
        </div>
        <div class="message-item df msn-add">
            <div class="list-name">
                收货地址
            </div>
            <div class="message-text">
                <div class="message-info">
                    <span class="message-name">刘理</span>
                    <span class="message-phone">13398499055</span>
                </div>
                <div class="message-address">
                    长江职业学院学院路男生宿舍2栋3单元3楼308
                </div>
            </div>
        </div>
        <div class="message-item df">
            <div class="list-name">
                订单号
            </div>
            <div class="list-text">
                15643137132132
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"message",
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .message
        .message-item
            height 13.33vw
            line-height 13.33vw
            padding 0 5.33vw
            border-bottom 1px solid #f7f7f7
            font-size 4.26vw
        .msn-add
            height auto  
            line-height 1.5
            padding 4.66vw 5.33vw
            div
                flex 1
            .message-text
                text-align right   
                .message-address
                    font-size 3.2vw
                    color #999
</style>
