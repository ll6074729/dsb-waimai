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
                                <img src="../../../assets/img/minus@3x.png" class="minus" alt="" @click="minus(item.goods_id,index)" v-for="cartlist in cart" :key="cartlist.goods_id" v-if="cartlist.goods_id == item.goods_id && cartlist.spec_key.length == 0" v-show="item.showMinus">
                            </transition>
                            <span v-for="cartlist in cart" :key="cartlist.goods_id" v-if="cartlist.goods_id == item.goods_id && cartlist.spec_key.length == 0">{{cartlist.goods_num}}</span>
                            <span v-if="goods_spec[item.goods_id]">{{goods_spec[item.goods_id]}}</span>
                            <transition name="bounce">
                                <img class="plus" src="../../../assets/img/add@3x.png" alt=""  @click="addCart(item.goods_id,index)" v-if="item.show">
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
        fullmoney:Number
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
    watch :{
        cart () {
            let spec_array = new Array
            for(let i in this.cart){
                if(this.cart[i].spec_key.length > 0){
                    let goods_num = spec_array[this.cart[i].goods_id] || 0
                    goods_num += parseInt(this.cart[i].goods_num) 
                    spec_array[this.cart[i].goods_id] = goods_num
                }
            }
            this.goods_spec = spec_array
        }
    },
    methods:{
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
        minus(GoodId,index){
            console.log(index)
            this.food[index].showMinus = false
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
                    method: 'post',
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
                    that.getCart(response,GoodId,goods_num,cart_id,index)
                })
                .catch(function (error) {
                    console.log(error);
                })

        },
        addCart (GoodId,index) {
            this.food[index].show = false
            const that = this
            var goods_num = 1
            var cart_id
            for(let i in this.cart){
                if(this.cart[i].goods_id == GoodId){
                    cart_id = this.cart[i].cart_id
                    goods_num = parseInt(this.cart[i].goods_num) +1
                    break
                }
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
                    that.getCart(response,GoodId,goods_num,cart_id,index)
                })
                .catch(function (error) {
                    console.log(error);
                })
        },
        getCart (res,GoodId,goods_num,cart_id,index) {
            // let date = res.data
            let date = eval('('+res.data+')')
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
                this.$emit('upup',true)
                this.$emit('buygoodsinfo',date.data)
                // this.$root.bus.$emit('goodsinfo',date.data)
            }
            this.food[index].showMinus = true
            this.food[index].show = true
        },
        emitCart (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            if(date.data == ''){
                this.$emit('AglinCart','1')
            }else{
                alert('加入失败')
            }

        }
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
