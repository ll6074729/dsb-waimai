<template>
    <div>
        <div class="menu-list" ref="cate" :class="{ishead:ishead}">
            <ul>
                <li class="menu-item" 
                    v-for="(item,index) in cate" 
                    :key="index" 
                    :class="{active :index == num }"
                    v-if="item.goods.length>=1"
                    @click="tablist(index)"
                    >
                    {{item.cate_name}}
                </li>
            </ul>
        </div>
        
    </div>
</template>
<script>
// import BScroll from 'better-scroll'
export default {
    name:"ShopMenu",
    mounted(){
        // this.scroll = new BScroll(this.$refs.cate,{
        //     click:true
        // })
    },
    props:{
        cate:Array,
        ishead:Boolean,
    },
    data () {
        return {
            num :0,
        }
    },
    methods:{
        tablist (index){
            this.num = index
        }
    }
}
</script>
<style lang="stylus" scoped>
    .ishead
        position fixed
        top 10.33vw
        bottom 13.33vw
    .menu-list
        width 26.66vw
        height 100%
        background-color #f7f7f7
        // padding-bottom 13.33vw
        overflow scroll
        // position absolute
        // top 0
        // left 0
        // right 0
        // bottom 0
        // z-index 1
        .menu-item
            height 13.33vw
            line-height 13.33vw
            text-align center
        .active
            color #1b8adb
            background-color #fff
</style>
