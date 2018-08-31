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
                    type="search"
                    clearable>
                </el-input>
                <!-- <img src="../../assets/img/clearbutton.png" alt=""> -->
            </div>
            <div class="search-head-right">
                <img src="../../assets/img/search@3x.png" alt="" srcset="">
            </div>
        </div>
        <goods-list :shopList="shopList" :page="page"></goods-list>
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
            shopList:[],
            page:'shop-search',
        }
    },
    methods:{
        handSearch () {
            axios({
                method:'post',
                // url: '/mobile/api/q',
                url:'/api/buyer/shop_list',
                data: {
                    url:'http://api.dqvip.cc/buyer/shop_list',
                    type_id : this.$route.query.type_id,
                    area_id : this.$store.state.area_id,
                    sales : 'desc',
                    q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                }
            })
                .then(this.getSearch)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getSearch (res) {
            // const date = eval('(' + res.data + ')')
            let date = res.data
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
