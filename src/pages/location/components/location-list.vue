<template>
    <div>
        <div class="list" ref="list">
            <ul>
                <div class="list-catagory">
                    <div class="list-title fs24">
                        附近校区
                    </div>
                    <div class="list-no fs24" v-show="isnearby">
                        <p class="list-ps">附近暂无校区</p>
                        <p class="ps">
                            注意：本平台只配送校内订单，不支持配送至校外
                        </p>
                    </div>
                    <div class="list-item" 
                        @click="handClickSchool(item.address,item.area_id)"
                        v-for="(item,index) in nearbySchool" 
                        :key="index">
                        {{item.address}}
                    </div>
                </div>
                <div class="list-catagory">
                    <div class="list-title fs24">
                        热门校区
                    </div>
                    <ul>
                        <li class="list-item"
                            v-on:click="handClickSchool(item.address,item.area_id)"
                            v-for="(item,index) in allSchool" 
                            :key="index">
                            {{item.address}}
                        </li>
                    </ul>
                </div>
            </ul>
        </div>
    </div>
</template>
<script>
import  BScroll from 'better-scroll'
import axios from 'axios'
export default {
    name:"locationList",
    props:{
        nearbySchool:Array, //附近
        allSchool:Array //所有
    },
    data () {
        return {
            isnearby:false
        }
    },
    mounted (){
        this.scroll = new BScroll(this.$refs.list)
    },
    methods:{
        handClickSchool (school,area_id) {
            this.$store.dispatch("changeSchool",school)
            this.$store.dispatch("changearea",area_id)
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
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
    }
}
</script>
<style lang="stylus" scoped>
    .list
        overflow hidden
        position absolute
        top 24vw
        left 0
        right 0
        bottom 0
        z-index 99
        .list-catagory
            .list-title
                padding 2.66vw 5.6vw
                background #f7f7f7
                color #999
            .list-item
                margin 0 5.6vw
                padding 3.33vw 0
                border-bottom 1px solid #f7f7f7    
                &:last-child
                    border none
            .list-no
                text-align center   
                .list-ps
                    color #999     
                    margin-top 10.66vw
                .ps 
                    color #469afe
                    padding-top 5.33vw
                    padding-bottom 9.33vw
</style>
