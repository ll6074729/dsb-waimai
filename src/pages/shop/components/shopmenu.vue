<template>
    <div>
        <div class="menu-list" ref="cate" >
            <ul :class="{ishead:ishead}">
                <li class="menu-item" 
                    v-for="(item,index) in cate" 
                    :key="index" 
                    :class="{active :index == numList }"
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
        // window.addEventListener("scroll",this.handleTop)
        // this.scroll = new BScroll(this.$refs.cate,{
        //     click:true
        // })
    },
    props:{
        cate:Array,
        ishead:Boolean,
        num:Number,
    },
    data () {
        return {
            numList:0
        }
    },
    watch :{
        num () {
            if(this.num < 0){
                this.numList = 0
            }else{
                console.log(this.num,111111)
                this.numList = this.num
            }
        }
    },
    methods:{
        tablist (index){
            // this.num = index
            this.$emit('changeNum',index)
        }
    }
}
</script>
<style lang="stylus" scoped>
    .ishead
        position fixed
        top 10.33vw
        bottom 13.33vw
        overflow scroll
        width 26.66vw
    .menu-list
        width 26.66vw
        height 100%
        background-color #f7f7f7
        // padding-bottom 13.33vw
        // overflow scroll
        // position absolute
        // top 0
        // left 0
        // right 0
        // bottom 0
        // z-index 1
        .menu-item
            height 13.33vw
            line-height 9.33vw
            text-align center
            box-sizing border-box
            padding 2vw
            box-sizing border-box
            padding 2vw
            text-overflow ellipsis
            white-space nowrap
            overflow hidden
        .active
            color #1b8adb
            background-color #fff
</style>
