<template>
    <div class="headbg">
        <div class="back" @click="back()">
            <img src="../../../assets/img/back_white.png" alt="">
        </div>
        <img src="../../../assets/img/checkin.png" alt="" class="headbg-img">
    </div>
</template>
<script>
export default {
    name:"headbg",
    data () {
        return {

        }
    },
    methods:{
        back () {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="stylus" scoped>
    .headbg
        position relative
        .back
            position fixed
            top 4vw
            left 4vw
            img 
                width 2.13vw
                height 4.13vw
        .headbg-img
            width 100%     
</style>
