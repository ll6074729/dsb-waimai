<template>
    <div>
        <div class="list">
            <div class="list-catagory">
                <div class="list-title fs24">
                    附近校区
                </div>
                <div class="list-no fs24">
                    <p class="list-ps">附近暂无校区</p>
                    <p class="ps">
                        注意：本平台只配送校内订单，不支持配送至校外
                    </p>
                </div>
                <!-- <div class="list-item">
                    四川长江职业学院
                </div>
                <div class="list-item">
                    四川电影电视学院（安仁校区）
                </div>
                <div class="list-item">
                    四川音乐学院
                </div>
                <div class="list-item">
                    四川大学
                </div> -->
            </div>
            <div class="list-catagory">
                <div class="list-title fs24">
                    热门校区
                </div>
                <div class="list-item" @click="handClickSchool(item)" v-for="(item,index) in school" :key="index">
                    {{item}}
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    name:"locationList",
    data () {
        return {
            school : ["四川长江职业学院","四川电影电视学院(安仁校区)","四川音乐学院","四川大学"]
        }
    },
    methods:{
        handClickSchool (school) {
            this.$store.dispatch("changeSchool",school)
            this.$router.push({path:"/"})
        }
    }
}
</script>
<style lang="stylus" scoped>
    .list
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
