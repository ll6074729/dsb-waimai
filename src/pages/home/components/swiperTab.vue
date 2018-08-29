<template>
    <div class="icons">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(page,index) of pages" :key="index">
                <div class="icon" v-for="item of page" :key="item.type_id">
                    <router-link :to="{path:'search',query:{type_id:item.type_id}}">
                        <div class="icon-img">
                            <img class="icon-img-content" :src="item.type_pic" alt="" :onerror="defaultImg">
                        </div>
                        <p class="icon-desc">
                            {{item.type_name}}
                        </p>
                    </router-link>
                </div>  
            </swiper-slide> 
        </swiper>
   </div>
</template>
<script>
export default {
    name:'swiperTab',
    props:{
        list:Array
    },
    data () {
        return {
            swiperOption:{
                autoplay:false
            },
            defaultImg: 'this.src="' + require('../../../assets/img/defaultshop.png') + '"'
        }
    },
    computed:{
        pages (){
            const pages = []
            this.list.forEach((item,index) => {
                const page = Math.floor(index/8)
                if(!pages[page]){
                    pages[page] = []
                }
                pages[page].push(item)
            })
            return pages
        }
    }
};
</script>
<style lang="stylus" scoped>
    .icons >>> .swiper-container
        height 0
        padding-bottom 50%
    .icons
        margin-top .1rem
        margin-bottom .1rem
        .icon 
            position relative
            overflow hidden
            float left
            width 25%
            height 0
            padding-bottom 25%
            .icon-img
                position absolute
                top 0
                left 0
                right 0
                bottom .44rem
                box-sizing border-box
                padding .2rem
                .icon-img-content
                    display block
                    margin 0 auto 
                    height 100%
            .icon-desc
                position absolute
                left 0
                right 0
                bottom 0
                text-align center
                height .44rem
                line-height .44rem
                color $darkTextColor
</style>

