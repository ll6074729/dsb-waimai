<template>
    <div>
        <div class="head">
            <div class="head-img pd20" @click="back()">
                <img src="../../../assets/img/back_white.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"headtop",
    methods:{
        back () {
            this.$router.push({path:'/order'})
        }
    }
}
</script>
<style lang="stylus" scoped>
    .head
        height 16vw
        background-image linear-gradient(90deg, 
		#4c91fe 0%, 
		#41a1fe 33%, 
		#35b0fd 65%, 
		#4c91fe 100%)
        .head-img
            line-height 16vw
            img 
                width 2.13vw
                height 4.13vw
</style>
