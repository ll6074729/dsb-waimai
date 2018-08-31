<template>
    <div>
        <div class="search-head">
            <!-- <router-link to="/" class="search-head-left">
                <img src="../../../assets/img/back.png" alt="">
            </router-link> -->
            <div class="search-head-center">
                <el-input
                    placeholder="请输入内容"
                    v-model="keyword"
                    clearable>
                </el-input>
            </div>
            <!-- <div class="search-head-right">
                <img src="../../assets/img/search@3x.png" alt="" srcset="">
                搜索
            </div> -->
        </div>
        <div class="search-content" v-show="keyword" ref="search">
            <ul>
                <li v-for="(item,index) of list" :key="index" class="list-item" v-show="keyword" @click="handClickSchool(item.address,item.area_id)">
                    {{item.address}}
                </li>
            </ul>
            <div  v-show="!list.length" style="text-align:center">
                暂时没有
            </div>
        </div>

    </div>
</template>
<script>
import  BScroll from 'better-scroll'
export default {
    name:"headTop",
    props:{
        allSchool:Array
    },
    data () {
        return {
            keyword:"",
            list:[],
            timer:null,
        }
    },
    mounted (){
        this.scroll = new BScroll(this.$refs.search,{
            click:true
        })
    },
    methods:{
         handClickSchool (school,area_id) {
            this.$store.dispatch("changeSchool",school)
            this.$store.dispatch("changearea",area_id)
            this.$http({
                method: 'post',
                url: '/mobile/api/q',
                data: {
                    url:'http://api.dqvip.cc/buyer/user_locator',
                    area_id:area_id,
                    q_type:'post'
                },
            })
                .then(this.$router.push({path:"/"}))
                .catch(function (error) {
                    console.log(error);
                })
        },
    },
    watch :{
        keyword () {
           
            if(this.timer){
                clearTimeout(this.timer)
            }
            if(!this.keyword){
                this.list = []
                return
            }
            this.timer = setTimeout(() =>{
                const result = []
                for(var i in this.allSchool){
                    if(this.allSchool[i].address.indexOf(this.keyword) > -1){
                        result.push(this.allSchool[i])
                    }
                }
                this.list = result
            },100)
        }   
    }
}
</script>
<style lang="stylus" scoped>
    .el-input--suffix >>> .el-input__inner
        border none!important
        background #f7f7f7
        height 8vw
        border-radius 1.5vw
        text-align center
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
            width 100%
            height 8vw 
    .search-content
        z-index 100
        overflow: hidden
        position absolute    
        top 10.66vw    
        left 0
        right 0
        bottom 0
        background #fff
        .list-item
            margin 0 5.6vw
            padding 3.33vw 0
            border-bottom 1px solid #f7f7f7    
            &:last-child
                border none
</style>
