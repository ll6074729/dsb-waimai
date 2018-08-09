<template>
    <div  v-loading.fullscreen.lock="fullscreenLoading">
        <head-top :allSchool="allSchool"></head-top>
        <location-name></location-name>
        <location-list  :nearbySchool ="nearbySchool" :allSchool="allSchool"></location-list>
        <all-map :loding ="fullscreenLoading" v-on:lodingS ="lodingS()" refs="AllMap" v-on:handMap="handMap"></all-map>

    </div>
</template>
<script>
import HeadTop from "./components/headtop"
import LocationName from "./components/location-name"
import LocationList from "./components/location-list"
import AllMap from "../../componentss/allmap"
// import { mapState } from 'vuex'
import { Loading } from 'element-ui'
import axios from 'axios'
export default {
    name:"Location",
     data () {
        return {
            fullscreenLoading: false,
            nearbySchool:[],
            school : [],
            allSchool:[]
        }
    },
    created () {
        this.openFullScreen()
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
    mounted () {
        this.AllSchool()
    },
    methods:{
        openFullScreen () {
            this.fullscreenLoading = true
        },
        lodingS () {
            this.fullscreenLoading = false;
        },
        // 坐标
        handMap (msg) {
            axios({
                method: 'post',
                url: 'mobile/api/q',
                data: {
                    url:'http://api.dqvip.cc/buyer/area_list',
                    long_and_lat:msg,
                    q_type:'post'
                },
            })
            .then(this.getSchool)
            .catch(function (error) {
                console.log(error);
            });
        },
        // 坐标
        getSchool (res) {
            const res1 = eval('(' + res.data + ')')
            const date = res1.data
            this.nearbySchool = date
        },
        // 所有学校
        AllSchool () {
            axios({
                method: 'post',
                url: 'mobile/api/q',
                data: {
                    url:'http://api.dqvip.cc/buyer/area_list',
                    // long_and_lat:'',
                    search_name:'',
                    q_type:'post'
                },
            })
            .then(this.getAllSchool)
            .catch(function (error) {
                console.log(error);
            });
        },
        getAllSchool (res) {
            const res1 = eval('(' + res.data + ')')
            const date = res1.data
            this.allSchool = date
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>
