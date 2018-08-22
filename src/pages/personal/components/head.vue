<template>
    <div class="myhead">
        <div class="head-img">
            <img :src="userinfo.headimgurl" alt="" :onerror="defaultImg">
        </div>
        <p>{{userinfo.nickname}}</p>
        <img src="../../../assets/img/border-bottom.png" alt="" class="border-btm">
    </div>
</template>
<script>
export default {
    name:"MyHead",
    props:{
        userinfo:Object
    },
    data () {
        return {
            defaultImg: 'this.src="' + require('../../../assets/img/defaultshop.png') + '"',
        }
    }
}
</script>
<style lang="stylus" scoped>
    .myhead
        position relative
        text-align center
        height 40vw
        background-image url(../../../assets/img/mybg.png)
        background-size cover
        .head-img
            padding-top 6.66vw
            img 
                width 16vw
                height 16vw
                border 0.53vw solid #fff
                border-radius 50%
        p
            margin-top 4vw        
            font-size 4.26vw
            color #fff
        .border-btm
            width 100%        
            position absolute
            bottom 0
            left 0
</style>
