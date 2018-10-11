<template>
    <div class="swiper-shop" v-if="food.length != 0">
        <swiper :options="swiperOption"> 
            <swiper-slide v-for="(item,index) in food" :key="item.goods_id">
                <div class="box">
                    <div class="box-left" @click="showgoods(item.goods_id)">
                        <img :src="recommendImg[index][0]" alt="" :onerror="defaultImg">
                    </div>
                    <div class="box-right">
                        <div class="box-right-title">
                            {{item.title}}
                        </div>
                        <div class="box-right-price">
                            ￥{{item.price}}
                        </div>
                        <div class="box-right-foot">
                            <img class="minus" src="../../../assets/img/minus_gray@3x.png" @click="minusSpec" v-if="goods_spec[item.goods_id]">
                            <transition name="bounce">
                                <img src="../../../assets/img/minus@3x.png" class="minus" alt="" @click="_minusCart(item.goods_id,index)" v-for="cartlist in cartBox" :key="cartlist.goods_id" v-if="cartlist.goods_id == item.goods_id && cartlist.spec" v-show="item.showMinus">
                            </transition>
                            <span v-for="cartlist in cartBox" :key="cartlist.goods_id" v-if="cartlist.goods_id == item.goods_id && cartlist.spec">{{cartlist.goods_num}}</span>
                            <span v-if="goods_spec[item.goods_id]">{{goods_spec[item.goods_id]}}</span>
                            <transition name="bounce">
                                <img class="plus" src="../../../assets/img/add@3x.png" alt=""  @click="_addCart(item.goods_id,index)" v-if="item.show">
                            </transition>    
                        </div>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
export default {
    name:"shoprecommend",
    props:{
        food:Array,
        cart:Array,
        recommendImg:Array,
        fullmoney:Number,
        cartBox:Array,
    },
    data () {
        return {
            swiperOption:{
                autoplay:false,
                slidesPerView : 1.7
            },
            defaultImg: 'this.src="' + require('../../../assets/img/defaultshop.png') + '"',
            goods_spec:[],
        }
    },
    mounted () {
        this.cartBoxfc()
    },
    watch :{
        cartBox () {
            let spec_array = new Array
            for(let i in this.cartBox){
                if(this.cartBox[i].spec_key.length > 0){
                    let goods_num = spec_array[this.cartBox[i].goods_id] || 0
                    goods_num += parseInt(this.cartBox[i].goods_num) 
                    spec_array[this.cartBox[i].goods_id] = goods_num
                }
            }
            this.goods_spec = spec_array
        }
    },
    methods:{

        _minusCart(goodsId,index){
            this.$emit('childMinusCart',[goodsId,index])
        },
        _addCart(goodsId,index){
            this.$emit('childAddCart',[goodsId,index])
        },

        cartBoxfc () {
            let spec_array = new Array
            for(let i in this.cartBox){
                if(this.cartBox[i].spec_key.length > 0){
                    let goods_num = spec_array[this.cartBox[i].goods_id] || 0
                    goods_num += parseInt(this.cartBox[i].goods_num) 
                    spec_array[this.cartBox[i].goods_id] = goods_num
                }
            }
            this.goods_spec = spec_array
        },

        showgoods(num) {
            console.log(num)
            this.$emit('showgoods',num)
        },
        minusSpec () {
            this.$message({
                message: '多规格商品只能去购物车删除哟',
                type: 'warning'
            });
        },
    }
}
</script>
<style lang="stylus" scoped>
    @import "~css/style"
    .swiper-shop >>> .swiper-container
        z-index 0
    .swiper-shop
        background-color #f7f7f7
        padding-top 2.66vw
        padding-bottom 2.66vw
        .box
            padding 2.66vw
            background-color #fff
            display flex
            margin-left 2.66vw
            position relative
            .box-left 
                img 
                    width 21.33vw
                    height 21.33vw
            .box-right
                margin-left 2.66vw    
                .box-right-title
                    font-size 4vw
                    line-height 5vw
                    font-weight bold  
                    min-height 10vw 
                    ellipsisClamp()
                .box-right-price
                    font-size 3.73vw
                    color #469afe
                    margin 1.13vw 0
                .box-right-foot
                    span 
                        line-height 5vw
                        margin 0 4vw
                    .minus,.plus
                        width 5.33vw
                        height 5.33vw
                        box-sizing border-box
                        display inline-block
                    .opacity
                        opacity 0
                    .plus
                        color #fff
                        line-height 5.33vw   
                        position absolute  
                        right 5vw
                        bottom 2.8vw
                    .bounce-enter-active 
                        animation bounce-in .5s
                    .bounce-leave-active 
                        animation bounce-in .5s reverse
                    @keyframes bounce-in {
                        0% {
                            transform: scale(0.5);
                        }
                        50% {
                            transform: scale(1.5);
                        }
                        100% {
                            transform: scale(1);
                        }
                    }    
</style>
