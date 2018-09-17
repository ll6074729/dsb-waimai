<template>
    <div>
        <div class="search-head">
            <router-link to="/" class="search-head-left">
                <img src="../../assets/img/back.png" alt="">
            </router-link>
            <div class="search-head-center">
                <el-input
                    placeholder="请输入内容"
                    v-model="input10"
                    clearable>
                </el-input>
            </div>
            <div class="search-head-right" @click="searchitem">
                <img src="../../assets/img/search@3x.png" alt="" srcset="">
            </div>
        </div>
        <goods-list :shopList="shopList" :page="page" :input10="input10" :tags="tags" :range="range"></goods-list>
        <div id="allmap" style="display:none"></div>
    </div>
</template>
<script>
import BMap from 'BMap'
import GoodsList from "../../componentss/goodsList"
import axios from "axios"
export default {
    name:'Search',
    components:{
        GoodsList
    },
    data () {
        return {
            input10: '',
            shopList:[],
            page:'shop-search',
            tags:[],
            range:[],
        }
    },
    created () {
        this._GetDistance()
    },
    methods:{
        _GetDistance() {
            if(localStorage.lat || localStorage.lng){
                window.map = new BMap.Map('allmap')
                console.log(map)
            }
        },
        searchitem (){
            this.$http({
                 method:'post',
                url: '/mobile/api/q',
                // url:'/api/buyer/shop_list',
                data: {
                    url:'http://api.dqvip.cc/buyer/shop_list',
                    type_id : this.$route.query.type_id,
                    area_id : this.$store.state.area_id,
                    search_name : this.input10,
                    sales : 'desc',
                    q_type:'post',
                },
            })
                .then(this.getSearch)
                .catch(function (error) {
                    console.log(error);
                })
        },
        handSearch () {
            axios({
                method:'post',
                url: '/mobile/api/q',
                // url:'/api/buyer/shop_list',
                data: {
                    url:'http://api.dqvip.cc/buyer/shop_list',
                    type_id : this.$route.query.type_id,
                    area_id : this.$store.state.area_id,
                    sales : 'desc',
                    q_type:'post'
                },
            })
                .then(this.getSearch)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getSearch (res) {
            const date = eval('(' + res.data + ')')
            // let date = res.data
            if(date.status == 200){
                this.shopList = date.data.data
                for(let i in this.shopList){
                    if(this.shopList[i].tags){
                        let tag = this.shopList[i].tags
                        this.tags[this.shopList[i].shop_id] = tag.split(',')
                    }
                    if(this.shopList[i].longitude && this.shopList[i].latitude){
                        var pointA = new BMap.Point(this.lng, this.lat)
                        var pointB = new BMap.Point(this.shopList[i].longitude, this.shopList[i].latitude)
                        this.range[this.shopList[i].shop_id] = parseInt(window.map.getDistance(pointA,pointB))
                    }else{
                        this.range[this.shopList[i].shop_id] = 0
                    }
                }
            }else{
                this.$message({
                    message:date.message,
                    type:'warning'
                })
            }
        }
    },
    mounted () {
        this.handSearch()
    },
}
</script>
<style lang="stylus" scoped>
    .el-input--suffix >>> .el-input__inner
        border none!important
        background #f7f7f7
        height 8vw
    .search-head
        display flex
        justify-content space-between
        width 100%;
        height 10.66vw
        align-items center
        padding 1.33vw 2.66vw
        box-sizing border-box
        .search-head-left 
            width 2.13vw
            height 4.13vw
            img 
                width 100%
        .search-head-center
            position relative
            width 80%
            height 8vw
            background-color #f7f7f7
        .search-head-right 
            width 5.33vw
            height 5.33vw
            img 
                width 100%        
</style>
