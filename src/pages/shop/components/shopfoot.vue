<template>
<div class="shop-cart-box" v-show="isBuy">
    <div class="backg" @click="iscartstatus" v-show="iscartshow"></div>
    <div class="shop-foot"  >
        <div  class="item" @click="iscartstatus">
            <el-badge :max="99" :value="value">
                <img src="../../../assets/img/shoppingcart.png" alt="">
            </el-badge>
        </div>
        <div class="shop-cart-info">
            <div class="shop-price">
                <span class="price1">￥{{rulingPrice}}</span>
                <span class="price2" v-if="costPrice != 0">￥{{costPrice}}</span>
            </div>
            <div class="distribution" v-if="addressList.length >0">
                <span v-if="parseFloat(custom_delivery) !=0">
                    配送费: ￥{{(parseFloat(custom_delivery) + parseFloat(delivery_price)).toFixed(2)}}
                </span>
                <span v-if="!parseFloat(custom_delivery) || parseFloat(custom_delivery) ==0">
                    配送费: ￥{{(parseFloat(delivery_cost) + parseFloat(delivery_price)).toFixed(2)}}
                </span>
            </div>
            <router-link tag="div" class="distribution" v-if="addressList.length == 0" to="/sitelist">
                请先设置默认收货地址
            </router-link>
        </div>
        <div class="buybtn" @click="buybtn" v-if="shop_status !=0">
            立即下单
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
            <div class="isgoods" ref="isgoods" v-if="cart.length>=1">
                <ul>
                    <li class="isgoods-item" v-for="item in cart" :key="item.cart_id">
                        <div class="isgood-left">
                            <div class="isgood-img">
                                <img :src="item.pic[0]" alt="" :onerror="defaultImg">
                            </div>
                        </div>
                        <div class="isgood-right">
                            <div class="isgood-name">{{item.goods.title}}</div>
                            <div class="isgood-attr">
                                {{item.spec_key_name}}
                            </div>
                            <div class="isgood-foot">
                                <div class="isgood-price">￥{{parseFloat(item.goods.price) +  parseFloat(item.spec_price)}}</div>
                                <div class="isgood-num">
                                    <img class="minus" src="../../../assets/img/minus@3x.png" alt=""  @click="setgoodsnum(item.goods_num,item.goods_id,'minus',item.cart_id,item.spec_key)">
                                    <span>{{item.goods_num}}</span>
                                    <img class="plus" src="../../../assets/img/add@3x.png" alt="" @click="setgoodsnum(item.goods_num,item.goods_id,'plus',item.cart_id,item.spec_key)">
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-if="cart.length<1" class="isshop">
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
        custom_delivery:String
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
            value:0,
            defaultImg: 'this.src="' + require('../../../assets/img/defaultshop.png') + '"',
            imgurl:[],
        }
    },
    methods:{
        // 去结算界面
        buybtn () {
            if(this.cart.length < 1){
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
                this.$router.push({name:'Cart',params:{shop_id:this.$route.params.id}})
            }
        },
        // 购物车增加商品
        setgoodsnum (goods_num,goods_id,status,cart_id,spec_id) {
            if(status == 'plus'){
                var goods_num = goods_num+1
            }else{
                var goods_num = goods_num-1
            }
            // 判断数量是否大于0
            if(goods_num < 1){
                this.cleanCart(cart_id)
            }else{
                // 判断是否是多选规格的商品
                if(spec_id == ''){
                    var data = {
                        url:'http://api.dqvip.cc/buyer/cart_change',
                        goods_id:goods_id,
                        shop_id:this.$route.params.id,
                        goods_num:goods_num,
                        cart_id:cart_id,
                        q_type:'post'
                    }
                }else{
                    var sepc = spec_id.split("_")
                    var data = {
                        url:'http://api.dqvip.cc/buyer/cart_change',
                        goods_id:goods_id,
                        shop_id:this.$route.params.id,
                        goods_num:goods_num,
                        spec_key:sepc,
                        cart_id:cart_id,
                        q_type:'post'
                    }
                }
                this.$http({
                    method: 'post',
                    url: 'mobile/api/q',
                    // url:'api/buyer/cart_change',
                    data: data,
                })
                .then(this.$parent.AglinCart)
                .catch(function (error) {
                    console.log(error);
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
            console.log(this.addressList,169)
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
        cleanCart (cart_id) {
            var cart_type = typeof(cart_id)
            if(cart_type == 'number'){
                var cart_id = cart_id
                var date = {cart_id:cart_id}
            }else{
                var date = {}
            }
            date.url = 'http://api.dqvip.cc/buyer/cart_clear'
            date.q_type = 'delete'
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // url:'api/buyer/cart_clear',
                data:date,
            })
                .then(this.$parent.AglinCart)
                .catch(function (error) {
                    console.log(error);
                })
        },
    },
    computed :{
      
    },
    watch:{
        cart () {
            let goods_val = 0
            for(let i in this.cart){
                goods_val += this.cart[i].goods_num
                let img 
                for(var j = 0;j<this.cart.length;j++){
                    img = this.cart[i].goods.details_figure.split(',')
                }
                this.cart[i].pic = img
            }
            this.value = goods_val
        },
        isBuy () {
            // console.log(this.swiper,999)
            if(this.isBuy){
                document.body.style.overflow='hidden';
                document.body.style.height = window.screen.height + 'px';
            }else{
                document.body.style.overflow='auto';
                document.body.style.height = 'auto';
            }
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
        .isshop
            text-align center
            padding 5vw
</style>
