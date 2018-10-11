<template>
<div class="shop-cart-box" v-show="isBuy">
    <div class="backg" @click="iscartstatus" v-show="iscartshow"></div>
    <div class="shop-foot"  >
        <div  class="item" @click="iscartstatus">
            <el-badge :max="99" :value="this.goods_val">
                <img src="../../../assets/img/shoppingcart.png" alt="">
            </el-badge>
        </div>
        <div class="shop-cart-info">
            <div class="shop-price">
                <span class="price1">￥{{rulingPrice}}</span>
                <span class="price2" v-if="costPrice != 0">￥{{costPrice}}</span>
            </div>
            <div class="distribution" v-if="addressList.length >0">
                <span >
                    配送费: ￥{{(parseFloat(custom_delivery) + parseFloat(delivery_price)).toFixed(2)}}
                </span>
                <!-- <span v-if="!parseFloat(custom_delivery) || parseFloat(custom_delivery) ==0">
                    配送费: ￥{{(parseFloat(delivery_cost) + parseFloat(delivery_price)).toFixed(2)}}
                </span> -->
            </div>
            <router-link tag="div" class="distribution" v-if="addressList.length == 0" to="/sitelist">
                请先设置默认收货地址
            </router-link>
        </div>
        <div class="buybtn" @click="buybtn" v-if="shop_status !=0 && costPrice >= take_off">
            立即下单
        </div>
        <div class="buybtn" @click="buybtn1" :class="{'buy-db':costPrice < take_off}" v-if="costPrice < take_off && shop_status != 0">
            满{{take_off}}元起送
        </div>
        <div class="buybtn" v-if="shop_status ==0" :class="{'buy-db':shop_status ==0}">
            店铺休息
        </div>
    </div>
    <el-collapse-transition>
        <div class="cart" v-show="iscartshow">
            <div class="cart-head">
                <div class="cart-title">购物车</div>
                <div class="cart-clean" @click="cleanCart">清空</div>
            </div>
            <div class="isgoods" ref="isgoods" v-if="cartBox.length>=1">
                <ul>
                    <li class="isgoods-item" v-for="(item,index) in cartBox" :key="item.cart_id">
                        <div class="isgood-left">
                            <div class="isgood-img">
                                <img :src="productImg[item.goods_id][0]" alt="" :onerror="defaultImg">
                            </div>
                        </div>
                        <div class="isgood-right">
                            <div class="isgood-name">{{item.title}}</div>
                            <div class="isgood-attr">
                                {{item.spec_name}}
                            </div>
                            <div class="isgood-foot">
                                <div class="isgood-price">￥{{parseFloat(item.price) + parseFloat(item.spec_price) || parseFloat(item.price)}}</div>
                                <div class="isgood-num">
                                    <transition name="bounce">
                                        <img class="minus" src="../../../assets/img/minus@3x.png" alt=""  
                                            @click="_minusCart(item.goods_id,index,item.spec_key)"
                                            v-if="item.showMinus"                                            >
                                    </transition>    
                                    <span>{{item.goods_num}}</span>
                                    <transition name="bounce">
                                        <img class="plus" src="../../../assets/img/add@3x.png" alt="" 
                                            @click="_addCart(item.goods_id,index,item.spec_key)"
                                            v-if="item.show"
                                            >
                                    </transition>        
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="cartBox.length<1" class="isshop">
                暂时没有
            </div>
        </div>
    </el-collapse-transition>
</div>
    
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:"ShopFoot",
    props:{
        isBuy: Boolean,
        cart:Array,
        costPrice:Number,
        rulingPrice:Number,
        addressList:Array,
        delivery_price:Number,
        shop_status:Number,
        custom_delivery:String,
        take_off:Number,
        productImg:Array,
        cartBox:Array,
        goods_val:Number,
    },
    mounted() {
        this.getDelivery()
    },
    updated () {
        //  this.scroll = new BScroll(this.$refs.isgoods,{
        //     click:false,
        //     tap:"setgoodsnum"
        // })
    },
    data () {
        return{
            iscartshow:false,
            delivery_cost:this.$store.state.delivery_cost,
            defaultImg: 'this.src="' + require('../../../assets/img/defaultshop.png') + '"',
            imgurl:[],
        }
    },
    methods:{
        _minusCart(goodsId,index,spec_key){
            this.$emit('childMinusCart',[goodsId,index,spec_key])
        },
        _addCart(goodsId,index,spec_key){
            this.$emit('childAddCart',[goodsId,index,spec_key])
        },
        buybtn1() {
            this.$message({
                type:'warning',
                message: '亲,该店铺要满'+this.take_off+'才能下单哟',
            })
        },
        // 去结算界面
        buybtn () {
            if(this.cartBox.length < 1){
                this.$message({
                    type:'warning',
                    message: '亲,请您至少选择一件商品',
                })
            }else if(this.addressList.length < 1){
                this.$message({
                    type:'warning',
                    message: '没有目的地,外卖要送给小哥么~。~！',
                })
            }else{
                // 把本地购物车传给服务器
                var goods_box = JSON.parse(localStorage[this.$route.params.id])
                var goods_row = new Array()
                // 组装成后端需要的格式
                for(let i in goods_box){
                    if(goods_box[i].spec_key){
                        goods_row.push({goods_id:goods_box[i].goods_id,goods_num:goods_box[i].goods_num,spec_key:goods_box[i].spec_key})
                    }else{
                        goods_row.push({goods_id:goods_box[i].goods_id,goods_num:goods_box[i].goods_num})
                    }
                }
                this.$http({
                    method: 'post',
                    url: 'mobile/api/q',
                    // url:'api/buyer/confirm_order',
                    data: {
                        url:'http://api.dqvip.cc/buyer/confirm_order',
                        q_type:'post',
                        shop_id:this.$route.params.id,
                        goods_row:goods_row,
                    },
                })
                .then(this.$router.push({name:'Cart',params:{shop_id:this.$route.params.id}}))
                .catch(function(error){
                    console.log(error)
                })
            }
        },

        // 获取全局配置
        getDelivery () {
            if(this.$store.state.delivery_cost == null || this.$store.state.delivery_cost == undefined || this.$store.state.delivery_cost == NaN){
                this.$http({
                    method: 'post',
                    url: 'mobile/api/q',
                    // url:"/api/init",
                    data: {
                        url:'http://api.dqvip.cc/init',
                        q_type:'get'
                    },
                })
                    .then(this.getDeliveryList)
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        },
        // 公共配置
        getDeliveryList (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            let Distribution = parseFloat(date.data[0].value)
            this.delivery_cost = Distribution.toFixed(2)
        },
        // 是否展示购物车
        iscartstatus () {
            this.iscartshow = !this.iscartshow
        },
        // 清空购物车
        cleanCart () {
            
            this.$emit('claerCart')
            
        },
    },
    computed :{
      
    },
    watch:{
        cartBox () {
            let goods_val = 0
            for(let i in this.cartBox){
                this.cartBox[i].show = true
                this.cartBox[i].showMinus = true
                goods_val += this.cartBox[i].goods_num
                // let img = []
                // if(this.cartBox[i].goods.details_figure.charAt(this.cart[i].goods.details_figure.length - 1) == ","){
                //     for(var j = 0;j<this.cartBox.length;j++){
                //         img = this.cartBox[i].goods.details_figure.split(',')
                //     }
                // }else{
                //     img[0] = this.cartBox[i].goods.details_figure
                // }
                // this.cartBox[i].pic = img
            }
            this.value = goods_val
        },
        isBuy () {
            // console.log(this.swiper,999)
            // if(this.isBuy){
            //     document.body.style.overflow='hidden';
            //     document.body.style.height = window.screen.height + 'px';
            // }else{
            //     document.body.style.overflow='auto';
            //     document.body.style.height = '100%';
            // }
        },
    }
}
</script>
<style lang="stylus" scoped>
.shop-cart-box
    height 100%
    .backg
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        background rgba(0,0,0,0.3)
        z-index 9
    .shop-foot 
        display flex
        justify-content space-between
        z-index 12
        position fixed
        bottom 0
        width 100%
        background-color #fff;
        .item
            box-sizing border-box
            width 13.33vw
            height 13.33vw
            text-align center
            line-height 10vw
            border-radius 50%
            background-color #f7f7f7
            border 1.33vw solid #fff
            margin-top -1.33vw
            margin-left 4vw
            img 
                width 6.4vw
                height 5.33vw
        .shop-cart-info
            box-shadow 0px -5px 20px 0px rgba(0, 0, 0, 0.05)
            height 13.33vw
            line-height 6.66vw
            flex 1
            padding-left 4vw
            .distribution
                font-size 12px
        .buy-db
            background-color #dbdbdb   
            color #999     
    .cart
        position relative
        background-color #fff
        width 100%
        height 100%
        bottom 13.33vw
        z-index 10
        .cart-head
            height 13.33vw
            line-height 13.33vw
            display flex
            padding 0 2.66vw
            justify-content space-between
            background-color #f7f7f7
            font-size 4.26vw
        .isgoods
            overflow scroll
            max-height 80vw
            .isgoods-item
                display flex
                padding 2.66vw
                border-bottom 1px solid #f7f7f7
                .isgood-left
                    width 20vw
                    height 20vw
                    img 
                        width 20vw
                        height 20vw
                .isgood-right 
                    flex 1
                    padding-left 2.66vw
                    .isgood-name
                        font-size 4.26vw
                        font-weight bold
                    .isgood-attr
                        font-size 3.73vw
                        color #999
                        margin 3.73vw 0
                        min-height 3vw
                        span 
                            margin-right 5.33vw
                    .isgood-foot
                        .isgood-price
                            float left
                            color #3ea4fd
                            font-size 4.26vw
                            font-weight bold
                        .isgood-num
                            float right 
                            display flex
                            span 
                                line-height 5vw
                                margin 0 4vw
                            .minus,.plus
                                width 5.33vw
                                height 5.33vw
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
        .isshop
            text-align center
            padding 5vw
</style>
