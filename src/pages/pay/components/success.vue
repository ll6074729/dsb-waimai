<template>
    <div>
        <div class="head">
            <img src="../../../assets/img/sec@3x.png" alt="">
            <p class="paytype">支付成功</p>
            <p class="payservice">预计12:15送达</p>
        </div>
    </div>
</template>
<script>
export default {
    name:"paysuccess",
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
        .payservice
            font-size 4.26vw
            color #469afe
            margin-top 2.66vw
            // margin-bottom 9.33vw
</style>
