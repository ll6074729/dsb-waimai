<template>
    <div>
        <div class="recommend-box">
            <div class="title">
                为你推荐
            </div>
            <div class="goods-list">
                <div class="goods-item" v-for="item in regood" :key="item.goods_id" @click="shopGood(item.shop_id,item.goods_id)">
                    <img :src="item.details_figure" :alt="item.title" :onerror="defaultImg">
                    <div class="goods-info">
                        <p>{{item.title}}</p>
                        <p class="goods-price">￥{{item.price}}</p>
                    </div>
                </div>
                <!-- <router-link tag="div" :to="'/shop/'+item.shop_id+'/'+item.goods_id" class="goods-item" v-for="item in regood" :key="item.goods_id"> -->
                <!-- </router-link> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"recommend",
    props:{
        regood:Array
    },
    data () {
        return {
            defaultImg:'this.src="' + require('../../../assets/img/defaultshop.png') + '"'
        }
    },
    methods: {
        shopGood (shop_id,good_id) {
            this.$router.push({
                name:'Shop',
                params:{
                    id:shop_id,good:good_id
                }
            })
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import "~css/style"
    .recommend-box
        background-color #f7f7f7
        .goods-list
            padding 1.33vw
            .goods-item
                width 50%
                box-sizing border-box
                padding 0.66vw
                display inline-block
                img 
                    width 100%
                    height 46.66vw
                .goods-info
                    background-color #fff 
                    padding 2.66vw
                    p:first-child
                        margin-bottom 2.66vw
                        font-weight bolder
                        padding-top 1vw
                        ellipsis()
                    .goods-price
                        color #469afe  
                        font-size 3.73vw
</style>        
