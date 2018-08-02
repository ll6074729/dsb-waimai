<template>
    <div class="chooes-type">
        <div class="chooes-item active">
            <img src="../../../assets/img/radiu.png" alt="">
            <span>配送问题</span>
        </div>
        <div class="chooes-item">
            <img src="../../../assets/img/uncheck.png" alt="">
            <span>餐品质量</span>
        </div>
        <div class="chooes-item">
            <img src="../../../assets/img/uncheck.png" alt="">
            <span>平台服务</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"chooesType",
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .chooes-type
        display flex
        text-align center
        .chooes-item
            height 13.33vw
            line-height 13.33vw
            flex 1
            font-size 3.73vw
            img 
                width 4vw
                height 4vw
                vertical-align sub
        .active
            color #469afe   
</style>
