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
                <!-- <img src="../../assets/img/clearbutton.png" alt=""> -->
            </div>
            <div class="search-head-right">
                <img src="../../assets/img/search@3x.png" alt="" srcset="">
            </div>
        </div>
        <goods-list :shopList="shopList"></goods-list>
    </div>
</template>
<script>
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
            shopList:[{id:1,name:"liuy"},{id:2,name:"li"}],
            // shopList:[],
        }
    },
    methods:{
        handSearch () {
            axios({
                method: 'post',
                url: '/mobile/api/q',
                data: {
                    url:'http://api.dqvip.cc/buyer/shop_list',
                    type_id : this.$route.query.type_id,
                    area_id : this.$store.state.area_id,
                    q_type:'get'
                },
            })
                .then(this.getSearch)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getSearch (res) {
            const date = eval('(' + res.data + ')')
            this.shopList = date.data.data
            console.log(this.shopList)
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
