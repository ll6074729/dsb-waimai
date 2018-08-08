<template>
    <div class="list">
        <router-link to="/sitelist" tag="div" class="list-item">
            <div class="list-icon">
                <img src="../../../assets/img/ts-focus-point@3x.png" alt="">
            </div>
            <div class="list-name">地址管理</div>
            <div class="list-right">
                <img src="../../../assets/img/right_f7.png" alt="">
            </div>
        </router-link>
        <router-link to="/site" tag="div" class="list-item">
            <div class="list-icon">
                <img src="../../../assets/img/ts-star-2@3x.png" alt="">
            </div>
            <div class="list-name">我的收藏</div>
            <div class="list-right">
                <img src="../../../assets/img/right_f7.png" alt="">
            </div>
        </router-link>
        <router-link to="/site" tag="div" class="list-item">
            <div class="list-icon">
                <img src="../../../assets/img/ts-souji.png" alt="">
            </div>
            <div class="list-name">反馈意见</div>
            <div class="list-right">
                <img src="../../../assets/img/right_f7.png" alt="">
            </div>
        </router-link>
    </div>
</template>
<script>
export default {
    name:"list",
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .list
        .list-item
            display flex
            padding 0 8vw
            height 13.33vw
            line-height 13.33vw
            box-sizing border-box
            .list-icon
                margin-right 2.66vw
                img 
                    width 5.33vw
            .list-name
                margin-right auto
                font-size 3.73vw
            .list-right
                img 
                    width 2.13vw
                    height 4.13vw
            &:nth-of-type(even)
                background #f7f7f7
</style>
