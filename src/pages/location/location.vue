<template>
    <div >
        <head-top></head-top>
        <location-name></location-name>
        <location-list></location-list>
        <all-map></all-map>
    </div>
</template>
<script>
import HeadTop from "./components/headtop"
import LocationName from "./components/location-name"
import LocationList from "./components/location-list"
import AllMap from "../../componentss/allmap"
import { mapState } from 'vuex'
import { Loading } from 'element-ui'
export default {
    name:"Location",
    created () {
        // Loading.service(options);
        this.openFullScreen()
    },
    components:{
        HeadTop,
        LocationName,
        LocationList,
        AllMap
    },
    computed: {
        ...mapState(['city'])
    },
    methods:{
        openFullScreen () {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
        }
    },
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>

</style>
