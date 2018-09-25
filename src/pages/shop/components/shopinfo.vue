<template>
    <div>
        <transition name="el-fade-in-linear">
            <div class="shopbox" v-if="goods_feel">
                <div class="shopbox-item" ref="liu">
                    <img src="../../../assets/img/close@3x.png" alt="" class="close" @click="close">
                    <swiper :options="swiperOption" class="swiper-warp" ref="mySwiper">
                        <swiper-slide v-for="item in goods" :key="item.goods_id" class="swiper-item">
                            <!-- <img src="../../../assets/img/food.jpg" alt="" style="width:100%"> -->
                            <swiper :options="swiperImg" >
                                <swiper-slide v-for="itemimg in productImg[item.goods_id]" :key="itemimg">
                                    <img :src="itemimg" alt=""   style="width:100%;max-height:85vw">
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
                                        <!-- <div class="minus minus_spec" @click="minusSpec" v-if="goods_spec[item.goods_id]">-</div>
                                        <div class="minus" @click="minus(item.goods_id)" v-for="cartlist in cart" :key="cartlist.goods_id" v-if="cartlist.goods_id == item.goods_id && cartlist.spec_key.length == 0">-</div>
                                        <span v-for="cartlist in cart" :key="cartlist.goods_id" v-if="cartlist.goods_id == item.goods_id && cartlist.spec_key.length == 0">{{cartlist.goods_num}}</span>
                                        <span v-if="goods_spec[item.goods_id]">{{goods_spec[item.goods_id]}}</span>
                                        <div class="plus" @click="addCart(item.goods_id)">+</div> -->

                                        <img class="minus" src="../../../assets/img/minus_gray@3x.png" @click="minusSpec" v-if="goods_spec[item.goods_id]">
                                        <img src="../../../assets/img/minus@3x.png" class="minus" alt="" @click="minus(item.goods_id)" v-for="cartlist in cart" :key="cartlist.goods_id" v-if="cartlist.goods_id == item.goods_id && cartlist.spec_key.length == 0">
                                        <span v-for="cartlist in cart" :key="cartlist.goods_id" v-if="cartlist.goods_id == item.goods_id && cartlist.spec_key.length == 0">{{cartlist.goods_num}}</span>
                                        <span v-if="goods_spec[item.goods_id]">{{goods_spec[item.goods_id]}}</span>
                                        <img class="plus" src="../../../assets/img/add@3x.png" alt=""  @click="addCart(item.goods_id)">
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
    },
    mounted () {
        
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
                document.body.style.overflow='hidden';
                document.body.style.height = window.screen.height + 'px';
                this.$nextTick(() => {
                    this.$refs.mySwiper.swiper.slideTo(this.goods_feel, 0, false)
                })
                
            }else{
                document.body.style.overflow='auto';
                document.body.style.height = '100%';
            }
               
        },
    },
    methods:{
        close () {
            this.$emit('close_feel')
        },
         minusSpec () {
            this.$message({
                message: '多规格商品只能去购物车删除哟',
                type: 'warning'
            });
        },
        minus(GoodId){
            const that = this
            let goods_num
            let cart_id
            for(let i in this.cart){
                if(GoodId == this.cart[i].goods_id){
                    if(this.cart[i].goods_num == 0){
                        goods_num = this.cart[i].goods_num 
                    }else{
                        goods_num = this.cart[i].goods_num -1
                    }
                    
                    cart_id = this.cart[i].cart_id
                }
            }
            console.log(goods_num,cart_id)
            if(goods_num == 0){
                
                this.$http({
                    method:'post',
                    // method: 'delete',
                    url: 'mobile/api/q',
                    // url:'api/buyer/cart_clear',
                    data:{
                        cart_id:cart_id,
                        url:"http://api.dqvip.cc/buyer/cart_clear",
                        q_type:'delete',
                    },
                })
                    .then(this.$parent.getCart)
                    .catch(function (error) {
                        console.log(error);
                    })
                return
            }
            // 获取当前商品的信息  规格  
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // url:'api/goods_info',
                data: {
                    url:"http://api.dqvip.cc/goods_info",
                    q_type:'post',
                    goods_id:GoodId,
                },
            })
                .then(function(response){
                    that.getCart(response,GoodId,goods_num,cart_id)
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        addCart (GoodId) {
            const that = this
            var goods_num = 1
            var cart_id 
            for(let i in this.cart){
                if(this.cart[i].goods_id == GoodId){
                    cart_id = this.cart[i].cart_id
                    goods_num = parseInt(this.cart[i].goods_num) + 1
                    break
                }
            }
            // 获取当前商品的信息  规格  
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // url:'api/goods_info',
                data: {
                    url:'http://api.dqvip.cc/goods_info',
                    q_type:'post',
                    goods_id:GoodId,
                },
            })
                .then(function(response){
                    let date = eval('('+response.data+')')
                    // let date = response.data
                    if(date.status == 200){
                        that.getCart(date,GoodId,goods_num,cart_id)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getCart (date,GoodId,goods_num,cart_id) {
            let data ;
            let _this = this
            if(cart_id){
                data =  {
                    url:'http://api.dqvip.cc/buyer/cart_change',
                    goods_id:GoodId,
                    shop_id:this.$route.params.id,
                    goods_num:goods_num,
                    cart_id: cart_id,
                    q_type:'post'
                }
            }else{
                data = {
                    url:'http://api.dqvip.cc/buyer/cart_change',
                    goods_id:GoodId,
                    shop_id:this.$route.params.id,
                    goods_num:goods_num,
                    q_type:'post'
                }
            }
            console.log(date.data.spec.length)
            if(date.data.spec.length == 0){
                this.$http({
                    method: 'post',
                    url: 'mobile/api/q',
                    // url:'api/buyer/cart_change',
                    data: data,
                })
                .then(function(res){
                    let date = eval('('+res.data+')')
                    // let date = res.data
                    console.log(date)
                    _this.$emit('AglinCart',date)
                })
                .catch(function (error) {
                    console.log(error);
                })
            }else{
                this.$emit('close_feel')
                this.$emit('upup',true)
                this.$emit('buygoodsinfo',date.data)
            }
            
        },
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
