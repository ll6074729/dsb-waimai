<template>
    <div>
        <div class="box pd20">
            <div class="head-img">
                <img src="../../../assets/img/组17@3x.png" alt="">
            </div>
            <div class="head-name">
                小理哥哥
            </div>
            <div class="head-info">
                <span>配送用时</span>
                <span class="">25分钟</span>
            </div>
        </div>
        <rate></rate>
    </div>
</template>
<script>
import Rate from "./rate"
export default {
    name:"assesstake",
    components:{
        Rate,
    }
}
</script>
<style lang="stylus" scoped>
    .box
        display flex
        height 13.33vw
        line-height 13.33vw
        border-bottom 1px solid #f7f7f7
        .head-img
            margin-right 2.66vw
            img 
                width 8vw
                height 8vw
        .head-name
            margin-right auto 
</style>
