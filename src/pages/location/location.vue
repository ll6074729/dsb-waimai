<template>
    <div  v-loading.fullscreen.lock="fullscreenLoading">
        <head-top></head-top>
        <location-name></location-name>
        <location-list></location-list>
        <all-map :loding = "fullscreenLoading" v-on:lodingS = "lodingS()" refs="AllMap"></all-map>

    </div>
</template>
<script>
import HeadTop from "./components/headtop"
import LocationName from "./components/location-name"
import LocationList from "./components/location-list"
import AllMap from "../../componentss/allmap"
// import { mapState } from 'vuex'
import { Loading } from 'element-ui'
export default {
    name:"Location",
    created () {
        // this.openFullScreen()
    },
    components:{
        HeadTop,
        LocationName,
        LocationList,
        AllMap
    },
    computed: {
        // ...mapState(['defaultCity'])
    },
    methods:{
        openFullScreen () {
            this.fullscreenLoading = true
        },
        lodingS () {
            console.log('aaaa')
            this.fullscreenLoading = false;
        }
    },
    data () {
        return {
            fullscreenLoading: false
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>
