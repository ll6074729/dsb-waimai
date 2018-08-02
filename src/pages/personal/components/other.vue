<template>
    <div class="df">
        <router-link to="/concurrent" tag="div">
            <img src="../../../assets/img/组19@3x.png" alt="">
            <p>兼职</p>
        </router-link>
        <router-link to="/checkin" tag="div">
            <img src="../../../assets/img/组20@3x.png" alt="">
            <p>加盟</p>
        </router-link>
        <div>
            <img src="../../../assets/img/组21@3x.png" alt="">
            <p>入住</p> 
        </div>
    </div>
</template>
<script>
export default {
    name:"other",
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .df
        text-align center
        height 26.66vw
        div 
            flex 1
            img 
                width 13.33vw
                height 13.33vw
                margin-top 4vw
            p
                font-size 3.73vw
                margin-top 2.66vw
                color #333
</style>
