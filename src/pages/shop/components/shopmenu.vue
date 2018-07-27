<template>
    <div>
        <div class="menu-list" ref="warpper">
            <div>
                <div class="menu-item" 
                    v-for="(item,index) in list" 
                    :key="index" 
                    :class="{active :index == num }"
                    @click="tablist(index)">
                    {{item}}
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:"ShopMenu",
    mounted(){
        this.scroll = new BScroll(this.$refs.warpper)
    },
    data () {
        return {
            list:['店长推荐','烧菜','凉菜','饮品'],
            num :0,
        }
    },
    methods:{
        tablist (index){
            console.log(1,index)
            this.num = index
        }
    }
}
</script>
<style lang="stylus" scoped>
    .menu-list
        width 26.66vw
        height 100%
        background-color #f7f7f7
        padding-bottom 13.33vw
        .menu-item
            height 13.33vw
            line-height 13.33vw
            text-align center
        .active
            color #1b8adb
            background-color #fff
</style>
