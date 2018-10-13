<template>
    <div class="df const">
        <router-link tag="div" to="/balance" >
            <p class="fs40">{{userinfo.moeny}}</p>
            <p class="fs24">余额</p>
        </router-link>
        <router-link tag="div" to="/coupon" class="const-border">
            <p class="fs40">{{couponList.length}}</p>
            <p class="fs24">优惠卷</p>
        </router-link>
        <router-link tag="div" to="/integral">
            <p class="fs40">{{userinfo.points}}</p>
            <p class="fs24">积分</p>
        </router-link>
    </div>
</template>
<script>
export default {
    name:"const",
    props:{
        userinfo:Object,
        couponList:Array
    },
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .const-border
        position relative
        &:before
            content " "
            position absolute
            left 0
            top 25%
            height 50%
            width .021333rem
            background #dbdbdb
        &:after
            content " "
            position absolute
            right 0
            top 25%
            height 50%
            width .021333rem
            background #dbdbdb
    .const
        text-align center
        height 21.33vw
        div
            flex 1
            .fs40
                font-size 5.33vw
                font-weight bolder
                margin-top 5.06vw
            .fs24
                font-size 3.2vw
                margin-top 4vw

</style>
