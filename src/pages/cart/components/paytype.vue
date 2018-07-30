<template>
    <div>
        <div class="pay-list">
            <div class="pay-item">
                <div class="pay-img db">
                    <img src="../../../assets/img/Alibaba@3x.png" alt="">
                </div>
                <div class="pay-name db">
                    支付宝支付
                </div>
                <div class="checkout fr">
                    <img src="../../../assets/img/check.png" alt="">
                </div>
            </div>

            <div class="pay-item">
                <div class="pay-img db">
                    <img src="../../../assets/img/Tencent@3x(1).png" alt="">
                </div>
                <div class="pay-name db ">
                    微信支付
                </div>
                <div class="checkout fr">
                    <img src="../../../assets/img/uncheck.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"paytype",
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .pay-list
        padding-bottom 20vw
        background-color #f7f7f7
        .pay-item
            border-bottom 1px solid #f7f7f7
            background-color #fff
            padding 2.66vw
            .pay-img
                img 
                    width 8vw
                    height 8vw
            .pay-name
                margin-left 5vw   
                font-size 4.26vw     
            .checkout
                margin-top 1vw
                img 
                    width 5.33vw
                    height 5.33vw
</style>
