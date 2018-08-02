<template>
    <div>
        <div class="head">
            <img src="../../../assets/img/fail@3x.png" alt="">
            <p class="paytype">支付失败</p>
        </div>
    </div>
</template>
<script>
export default {
    name:"payfail",
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .head
        text-align center
        padding-top 11.46vw
        img 
            width 17.06vw
            height 17.06vw
        .paytype
            margin-top 7.06vw
            font-size 4.8vw
            font-weight bolder
</style>
