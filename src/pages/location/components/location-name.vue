<template>
    <div>
        <div class="df fs32 pd20">
            <div class="loc">
                <img src="../../../assets/img/address-cart.png" alt="">
                <span class="loc-name">{{this.$store.state.defaultCity}}</span>
            </div>
            <div class="loc-btn" @click="chooesclick">
            <!-- <router-link to="/Location" class="loc-btn" tag="div"> -->
                <img src="../../../assets/img/loc@3x.png" alt="">
                <span class="loc-name">重新定位 </span>
            <!-- </router-link> -->
            </div>
        </div>
    </div>
</template>
<script>
// import { mapState } from 'vuex'
export default {
    name:"locationName",
    data () {
        return {

        }
    },
    props:Array,
    computed: {
        // ...mapState(['defaultCity'])
    },
    methods:{
        chooesclick () {
            this.$router.push({path:"/Location"})
            this.$router.go(0)
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
                vertical-align sub     
                margin-right 1.33vw  
</style>
