<template>
    <div>
        <div class="share-box">
            <p>分享至朋友圈赢最高20元优惠券</p>
            <div class="buybtn">参与活动</div>
        </div>
    </div>
</template>
<script>
export default {
    name:"payshare",
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .share-box
        margin 13.33vw auto 
        margin-bottom 5vw
        width 80vw
        height 35vw
        position relative
        background-image url(../../../assets/img/sharebg.png)
        background-size cover
        text-align center
        p
            padding-top 8.8vw
            font-size 3.73vw
            color #469afe
        .buybtn
            height 10vw
            line-height 10vw
            width 40vw
            margin 5.33vw auto
</style>
