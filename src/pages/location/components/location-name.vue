<template>
    <div>
        <div class="df fs32 pd20">
            <div class="loc">
                <img src="../../../assets/img/address-cart.png" alt="">
                <span class="loc-name">成都市金牛区</span>
            </div>
            <div class="loc-btn">
                <img src="../../../assets/img/loc@3x.png" alt="">
                <span class="loc-name">重新定位</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"locationName",
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .df
        height 13.33vw 
        line-height 13.33vw
        .loc
            img 
                width 3.73vw
                height 4.8vw
                margin-right 1.33vw
        .loc-btn
            color #999
            img 
                width 4vw
                height 4vw  
                vertical-align inherit     
                margin-right 1.33vw 
</style>
