<template>
        <div class="shop-product" ref="shop" :class="{isfullmoney:fullmoney}">
            <ul>
                <li class="area" 
                    v-for="(item , index) in goods" 
                    :key="index"
                    :ref="index"
                    >
                    <div class="cate-title" v-if="!(item.goods.length ==0)"> {{item.cate_name}}</div>
                    <div class="item-list">
                        <div class="item" v-for="itemList in item.goods" :key="itemList.cate_id">
                            <div class="shop-left" @click="showgoods(itemList.goods_id)">
                                <div class="shop-img">
                                    <!-- <img :src="'http://wm.dqvip.cc/'+productImg[itemList.goods_id][0]" alt="" :onerror="defaultImg"> -->
                                    <img :src="productImg[itemList.goods_id][0]" alt="" :onerror="defaultImg">  
                                </div>
                            </div>
                            <div class="shop-right">
                                <div class="shop-name">
                                    {{itemList.title}}
                                </div>
                                <div class="shop-spec">
                                    {{itemList.intro}}
                                </div>
                                <div class="shop-info">
                                    销量：{{itemList.sold_num}} | 好评率：{{itemList.sold_num}}
                                </div>
                                <div class="shop-foot">
                                    <div class="shop-price">
                                        ￥{{itemList.price}}
                                    </div>
                                    <div class="shop-num">
                                        <!-- <div class="minus minus_spec" @click="minusSpec" v-if="goods_spec[itemList.goods_id]">-</div>
                                        <div class="minus" @click="minus(itemList.goods_id)" v-for="cartlist in cart" :key="cartlist.goods_id" v-if="cartlist.goods_id == itemList.goods_id && cartlist.spec_key.length == 0">-</div>
                                        <span v-for="cartlist in cart" :key="cartlist.goods_id" v-if="cartlist.goods_id == itemList.goods_id && cartlist.spec_key.length == 0">{{cartlist.goods_num}}</span>
                                        <span v-if="goods_spec[itemList.goods_id]">{{goods_spec[itemList.goods_id]}}</span>
                                        <div class="plus" @click="addCart(itemList.goods_id)">+</div> -->

                                        <img class="minus" src="../../../assets/img/minus_gray@3x.png" @click="minusSpec" v-if="goods_spec[itemList.goods_id]">
                                        <img class="minus" src="../../../assets/img/minus@3x.png" @click="minus(itemList.goods_id)" v-for="cartlist in cart" :key="cartlist.goods_id" v-if="cartlist.goods_id == itemList.goods_id && cartlist.spec_key.length == 0">
                                        <span v-for="cartlist in cart" :key="cartlist.goods_id" v-if="cartlist.goods_id == itemList.goods_id && cartlist.spec_key.length == 0">{{cartlist.goods_num}}</span>
                                        <span v-if="goods_spec[itemList.goods_id]">{{goods_spec[itemList.goods_id]}}</span>
                                        <img class="plus" src="../../../assets/img/add@3x.png" @click="addCart(itemList.goods_id)">
                                    </div>
                                </div>
                            </div>
                             
                        </div>
                    </div>
                </li>
            </ul>
        </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:"ShopProduct",
    mounted (){
        // this.scroll = new BScroll(this.$refs.shop,{
        //     click:true
        // })
        window.addEventListener("scroll",this.handleTop)
        // this.handleoffset()
    },
    props:{
        goods:Array,
        cart:Array,
        productImg:Array,
        ishead:Boolean,
        menuHeight:Number,
        tabTop:Number,
        fullmoney:Number
    },
    data () {
        return {
            defaultImg: 'this.src="' + require('../../../assets/img/defaultshop.png') + '"',
            goods_spec:[],
        }
    },
    watch :{
        menuHeight () {
            document.documentElement.scrollTop = document.body.scrollTop = (this.$refs[this.menuHeight][0].offsetTop + this.tabTop)
        },
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
        handleTop (){
            for(let i = 0;i<this.goods.length;i++){
                var mheight = this.$refs[i][0].getBoundingClientRect().top
                if(mheight){
                    if(mheight > 30 && mheight <52){
                        this.$emit('changeNum',i)
                    }
                }
            }
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
                    // method:'post',
                    method: 'delete',
                    // url: 'mobile/api/q',
                    url:'api/buyer/cart_clear',
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
                // url: 'mobile/api/q',
                url:'api/goods_info',
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
                    goods_num = parseInt(this.cart[i].goods_num) +1
                    break
                }
            }
            // 获取当前商品的信息  规格  
            this.$http({
                method: 'post',
                // url: 'mobile/api/q',
                url:'api/goods_info',
                data: {
                    url:'http://api.dqvip.cc/goods_info',
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
        getCart (res,GoodId,goods_num,cart_id) {
            // let date = eval('('+res.data+')')
            let date = res.data
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
                    // url: 'mobile/api/q',
                    url:'api/buyer/cart_change',
                    data: data,
                })
                .then(function(res){
                    // let date = eval('('+res.data+')')
                    let date = res.data
                    console.log(date)
                    _this.$emit('AglinCart',date)
                })
                .catch(function (error) {
                    console.log(error);
                })
            }else{
                this.$emit('upup',true)
                this.$emit('buygoodsinfo',date.data)
            }
            
        },
    }
}
</script>
<style lang="stylus" scoped>
    .item-list >>> .item:last-child 
        border none!important
    .isfullmoney
        padding-bottom 1.5rem!important
    .shop-product 
        background-color #fff
        flex 1
        // position absolute
        // top 2vw
        // left 26.66vw
        // right 0
        // bottom 0
        // overflow hidden
        .area 
            &:last-child
                padding-bottom 13.33vw
            .cate-title
                width 95%
                height 6.66vw
                line-height 6.66vw
                text-align center
                color #999
                background #f7f7f7
                margin  2vw 2.5%
            .item-list
                .item
                    display flex
                    padding 2.66vw 0
                    border-bottom 1px solid #f7f7f7
                    .shop-left
                        .shop-img
                            width 21.33vw
                            height 21.33vw
                            margin 0 2.66vw
                            img 
                                width 100%
                                height 100%
                    .shop-right
                        flex 1
                        min-width 0
                        .shop-name
                            font-size 4vw
                            line-height 5vw
                            font-weight bold
                        .shop-spec
                            font-size 2.66vw
                            color #999
                            margin 1.33vw 0
                            line-height 4vw
                        .shop-info
                            color #999
                            font-size 2.66vw
                        .shop-foot
                            display flex
                            justify-content space-between
                            padding-right 1.33vw
                            font-size 4.26vw
                            margin-top 4vw 
                            .shop-price
                                color #3ea4fd
                                font-weight bold
                                margin-top 1vw
                            .shop-num
                                span 
                                    line-height 5vw
                                    margin 0 4vw
                                .minus,.plus
                                    width 5.33vw
                                    height 5.33vw
                                    box-sizing border-box
                                    display inline-block
                                .minus
                                    line-height 5.33vw
                                .plus
                                    line-height 5.33vw     

                                 #animation{
                                    -webkit-animation:tada 1s .2s ease both;
                                    -moz-animation:tada 1s .2s ease both;
                                    }
                                    @-webkit-keyframes tada{
                                        0%{-webkit-transform:scale(1)}
                                        10%,20%{-webkit-transform:scale(0.9) rotate(-3deg)}
                                        30%,50%,70%,90%{-webkit-transform:scale(1.1) rotate(3deg)}
                                        40%,60%,80%{-webkit-transform:scale(1.1) rotate(-3deg)}
                                        100%{-webkit-transform:scale(1) rotate(0)}
                                    }
                                    @-moz-keyframes tada{
                                        0%{-moz-transform:scale(1)}
                                        10%,20%{-moz-transform:scale(0.9) rotate(-3deg)}
                                        30%,50%,70%,90%{-moz-transform:scale(1.1) rotate(3deg)}
                                        40%,60%,80%{-moz-transform:scale(1.1) rotate(-3deg)}
                                        100%{-moz-transform:scale(1) rotate(0)}
                                    }   
</style>
