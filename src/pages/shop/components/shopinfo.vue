<template>
    <div>
        <transition name="el-fade-in-linear">
            <div class="shopbox" v-if="goods_feel">
                <div class="shopbox-item" ref="liu">
                    <img src="../../../assets/img/close@3x.png" alt="" class="close" @click="close">
                    <swiper :options="swiperOption" class="swiper-warp" ref="mySwiper">
                        <swiper-slide v-for="(item,index) in goods" :key="item.goods_id" class="swiper-item">
                            <!-- <img src="../../../assets/img/food.jpg" alt="" style="width:100%"> -->
                            <swiper :options="swiperImg" >
                                <swiper-slide v-for="itemimg in productImg[item.goods_id]" :key="itemimg">
                                    <img :src="itemimg" alt=""   style="width:100%;max-height:70vw">
                                </swiper-slide>
                                <div class="swiper-paginationimg" style="text-align:center" slot="pagination"></div>
                            </swiper>    
                            <div class="goods-info">
                                <div class="goods-name">
                                    {{item.title}}
                                </div>
                                <div class="goods-desc">
                                    {{item.intro}}
                                </div>
                                <div class="goods-num df">
                                    <div>￥{{item.price}}</div>
                                    <div class="shop-num">
                                        <img class="minus" src="../../../assets/img/minus_gray@3x.png" @click="minusSpec" v-if="goods_spec[item.goods_id]">
                                        <transition name="bounce">
                                            <img src="../../../assets/img/minus@3x.png" class="minus" alt="" 
                                                @click="_minusCart(item.goods_id,index)" 
                                                v-for="cartlist in cartBox" 
                                                :key="cartlist.goods_id" 
                                                v-if="cartlist.goods_id == item.goods_id && cartlist.spec"
                                                v-show="item.showMinus"
                                            >
                                        </transition>
                                        <span v-for="cartlist in cartBox" :key="cartlist.goods_id" v-if="cartlist.goods_id == item.goods_id && cartlist.spec">{{cartlist.goods_num}}</span>
                                        <span v-if="goods_spec[item.goods_id]">{{goods_spec[item.goods_id]}}</span>
                                        <transition name="bounce">
                                            <img class="plus" src="../../../assets/img/add@3x.png" alt=""  @click="_addCart(item.goods_id,index)" v-show="item.show">
                                        </transition>
                                    </div>
                                </div>
                                <div class="goods-laud">
                                    <div>{{item.praise}}人点赞</div>
                                    <div>{{item.stamp}} 人点踩</div>
                                </div>
                            </div>
                            
                        </swiper-slide>
                    </swiper>
                </div>
                <div class="swiper-other">
                    <div class="swiper-pagination"  slot="pagination"></div>
                    <!-- <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
                    <div class="swiper-button-next swiper-button-black" slot="button-next"></div> -->
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name:'shopinfo',
    props:{
        goods:Array,
        productImg:Array,
        cart:Array,
        goods_spec:Array,
        goods_feel:Number,
        cartBox:Array,
    },
    mounted () {
        this._goodsFeel()
        this.cartBoxfc()
    },
    data () {
        return {
            swiperOption:{
                autoplay:false,
                pagination: {
                    el: '.swiper-pagination',
                    type:'fraction',
                },
            },
            swiperImg:{
                autoplay:false,
                pagination: {
                    el: '.swiper-paginationimg',
                },
            }
        }
    },
    watch: {
        goods_feel () {
            if(this.goods_feel){
            //     document.body.style.overflow='hidden';
            //     document.body.style.height = window.screen.height + 'px';
                console.log('gaoboi')
                this.$nextTick(() => {
                    this.$refs.mySwiper.swiper.slideTo(this.goods_feel, 0, false)
                })
                
            }else{
            //     document.body.style.overflow='auto';
            //     document.body.style.height = '100%';
            }
               
        },
        cartBox () {
            let spec_array = new Array
            for(let i in this.cartBox){
                if(this.cartBox[i].spec_key){
                    if(this.cartBox[i].spec_key.length > 0){
                        let goods_num = spec_array[this.cartBox[i].goods_id] || 0
                        goods_num += parseInt(this.cartBox[i].goods_num) 
                        spec_array[this.cartBox[i].goods_id] = goods_num
                    }
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
            this.close()
            this.$emit('childAddCart',[goodsId,index])
        },
        cartBoxfc () {
            let spec_array = new Array
            for(let i in this.cartBox){
                if(this.cartBox[i].spec_key){
                    if(this.cartBox[i].spec_key.length > 0){
                        let goods_num = spec_array[this.cartBox[i].goods_id] || 0
                        goods_num += parseInt(this.cartBox[i].goods_num) 
                        spec_array[this.cartBox[i].goods_id] = goods_num
                    }
                }
            }
            this.goods_spec = spec_array
        },

        close () {
            this.$emit('close_feel')
        },
         minusSpec () {
            this.$message({
                message: '多规格商品只能去购物车删除哟',
                type: 'warning'
            });
        },

        _goodsFeel () {
            if(this.goods_feel){
                this.$refs.mySwiper.swiper.slideTo(this.goods_feel, 0, false)
            }
        }
    },

}
</script>
<style lang="stylus" scoped>
    .shopbox
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        overflow hidden
        background rgba(0,0,0,.5)
        z-index 20
        .shopbox-item
            .close
                position absolute
                top 9.66vw
                z-index 20
                right 7.66vw
                width 8vw
            .swiper-warp
                overflow inherit
                .swiper-item
                    // position absolute
                    top .5rem
                    bottom 6.5rem
                    overflow scroll
                    margin-left 5%!important
                    margin-right 5%!important
                    width 90%!important
                    background #fff
                    max-height 80vh
                    border-radius 10px
                    img 
                        border-top-left-radius 10px
                        border-top-right-radius 10px
                    .goods-info
                        padding 5.33vw    
                        .goods-name
                            font-size 4.26vw
                            font-weight bold
                            margin-bottom 2.66vw
                        .goods-desc
                            font-size 3.2vw
                            color #999
                            margin-bottom 5.33vw
                        .goods-num
                            margin-bottom 2.66vw
                            div:first-child
                                color #469afe
                                font-size 4.26vw
                            .shop-num
                                span 
                                    line-height 5vw
                                    margin 0 4vw
                                .minus,.plus
                                    width 5.33vw
                                    height 5.33vw
                                    box-sizing border-box
                                    display inline-block
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
                        .goods-laud
                            div
                                display inline-block
                                padding 2.66vw
                                background-color rgba(70, 154, 254, 0.5)
                                color #fff
        .swiper-other
            position fixed
            bottom 0.3rem
            width 100%
            height .9rem
            .swiper-button-prev,.swiper-button-next
                margin-top 0
                height 2.66vw
                width 60vw
            .swiper-pagination
                background rgba(0,0,0,.5)
                color #fff
                width 30%
                left 50%
                margin-left -15%
                height .5rem
                line-height .5rem
                border-radius 6vw
</style>
