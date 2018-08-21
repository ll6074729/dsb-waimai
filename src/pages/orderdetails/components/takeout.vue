<template>
    <div class="takeout pd20" v-if="order_status == 2">
        <div class="takeout-img">
            <img src="../../../assets/img/组17@3x.png" alt="">
        </div>
        <div class="takeout-info">
            <div class="takeout-job">配送员</div>
            <div class="takeout-name">小理哥哥</div>
        </div>
        <div class="takeout-phone">
            <a href="tel:13398499055">
                <img src="../../../assets/img/call.png" alt="">
            </a>
        </div>
    </div>
</template>
<script>
export default {
    name:"Takeout",
    props:{
        order_status:Number
    }
}
</script>
<style lang="stylus" scoped>
    .takeout
        height 20vw
        line-height 20vw
        padding-right 5.33vw
        display flex
        .takeout-img
            margin-right 2vw
            img 
                width 13.33vw
                height 13.33vw
                border-radius 50%
        .takeout-info
            margin-right auto
            line-height 1
            div
                margin-top 4vw
            .takeout-job
                font-size 3.2vw
                background-color #469afe
                text-align center
                height 5.33vw
                line-height 5.33vw
                // padding 1.33vw 2.13vw
                border-radius 2.66vw
                color #fff
            .takeout-name
                font-weight bold    
        .takeout-phone
            a
                img 
                    width 10.66vw
                    height 10.66vw        
</style>
