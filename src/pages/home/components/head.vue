<template>
    <div class="head">
        <div class="address">
            <a href="javascript:;">
                <i class="icon-address icon">
                </i>
                <span class="address-text ellipse">成都</span>  
                <i class="icon icon-right"></i>
            </a>
        </div>
        <div class="search">
            <i class="icon-search icon"></i>
            <input type="text" placeholder="输入搜索内容" maxlength="22">
        </div>
    </div>
</template>
<script>
export default {
    name:'Homehead',
    data () {
        return {
        }
    }
}
</script>
<style lang="stylus" scoped>

    .head
        position absolute
        top 5vw
        padding 0 3vw
        width 100%
        z-index 100
        display flex
        text-align center
        align-items  center
        box-sizing border-box
        justify-content space-between
        .address,.search
            height 8vw
            line-height 8vw
            position relative
        .address
            width 37.3vw
            background #dbdbdb
            border-radius 30px
            background-color rgba(0, 0, 0, 0.2)
            a
                color #fff
                font-size 3vw
                .address-text
                    display inline-block
                    text-align left 
                    width 25vw

        .search 
            width 53.3vw  
            input 
                width 100%
                height 100%
                outline none 
                border none 
                border-radius 30px
                text-indent 10vw
                font-size 2.9vw
</style>
