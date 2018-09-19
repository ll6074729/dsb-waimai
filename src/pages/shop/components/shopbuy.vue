<template>
<div>
    <el-collapse-transition>
        <div class="buy_box" v-if="isBuy">
            <div class="backg" @click="closeGoodsInfo"></div>
            <div class="shop-box">
                <div class="head">
                    <div class="head-left">
                        <div class="head-img">
                            <img :src="this.imgurl" alt="" :onerror="defaultImg">
                        </div>
                    </div>
                    <div class="head-right">
                        <div class="food-name">{{goodsinfo.goods_info.title}}</div>
                        <div class="food-price" ref="goodsPrice">￥{{goodsinfo.goods_info.price}}</div>
                    </div>
                    <div class="colse" @click="closeGoodsInfo">
                        <img src="../../../assets/img/close.png" alt="">
                    </div>
                </div>
                <div class="category" ref="categoryList">
                    <ul>
                        <li class="category-item" v-for="(item,index) in goodsinfo.spec" :key="index">
                            <div class="category-name">{{item.name}}：</div>
                            <div class="category-list" >
                                <div class="item" 
                                    v-for="(itemList,index) of item.item" 
                                    :key="itemList.item_id"
                                    @click="chooesItem(index,itemList.item_id,itemList.goods_id,itemList.spec_id,itemList.price)"
                                    :ref="itemList.spec_id"
                                    >
                                    {{itemList.item}} 
                                    </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="join-cart" cart-id="goodsinfo.goods_info.cart_id" @click="addCart" >
                    加入购物车
                </div>
            </div>
        </div>
    </el-collapse-transition>
</div>
    
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:"ShopBuy",
    props:{
        isBuy:Boolean,
        goodsinfo:Array,
        cart:Array
    },
    data () {
        return {
            cartbox:[],
            cartlist:{},
            imgurl:'',
            // goodsPrice:this.goodsinfo.goods_info.price,
            defaultImg: 'this.src="' + require('../../../assets/img/defaultshop.png') + '"'
        }
    },
    updated () {
        this.scroll = new BScroll(this.$refs.categoryList,{
            click:true
        })
    },
    computed:{

    },
    methods:{
        addCart () {
            var cartspec_key = ''
            var data = {}
            let spec = []
            data.goods_num = 1
            data.shop_id = this.$route.params.id
            // 循环当前多规格的数组
            for(let i in this.cartbox){
                if(this.cartbox[i]){
                    spec.push(this.cartbox[i].item_id)
                    data.goods_id = this.cartbox[i].goods_id    
                    data.spec_key = spec
                }
            }
            // 判断 规格是否都选中了一个
            // console.log()
            if(spec.length < this.goodsinfo.spec.length){
                this.$message({
                    message: '请在所有规格下至少选一项',
                    type: 'warning'
                })
                return
            }
            // 判断 购物车是否存在了当前同规格的产品
            for(let i in this.cartbox){
                cartspec_key += this.cartbox[i].item_id +"_"
            }
            cartspec_key = cartspec_key.slice(0,-1)
            for(let i in this.cart){
                if(cartspec_key == this.cart[i].spec_key){
                    data.cart_id = this.cart[i].cart_id
                    data.goods_num = this.cart[i].goods_num +1
                }
            }
            data.url = 'http://api.dqvip.cc/buyer/cart_change'
            data.q_type = 'post'
            this.$http({
                    method: 'post',
                    url: 'mobile/api/q',
                    // url:'api/buyer/cart_change',
                    data: data,
                })
                .then(this.emitCart)
                .catch(function (error) {
                    console.log(error);
                })
        },
        emitCart (res) {
            // let date = res.data
            let date = eval('('+res.data+')')
            if(date.status ==200){
                this.cartbox = []
                this.closeGoodsInfo()
                this.$emit('AglinCart')
                
            }
        },
        // 关闭当前面板
        closeGoodsInfo (){
            this.cartbox = []
            this.$emit('closeGoodsInfo',false)
            this.$emit('buygoodsinfo',[])
        },
        // 选择规格
        chooesItem (index,item_id,goods_id,spec_id,spec_price) {

            this.cartlist = {}
            this.cartlist.goods_id = goods_id
            this.cartlist.index = index
            this.cartlist.item_id = item_id
            this.cartlist.spec_id = spec_id
            this.cartlist.spec_price = spec_price
            this.cartbox[spec_id] = this.cartlist
            // console.log(this.$refs[spec_id],0)
            // this.$refs[spec_id][index].
            
            //  let i = 0; i < this.$refs[spec_id].length -1; i ++
            for(let i in this.$refs[spec_id]){
                if(this.$refs[spec_id][i].style){
                    this.$refs[spec_id][i].style.color = '#999'
                    this.$refs[spec_id][i].style.background = '#fff'
                }
            }
            this.$refs[spec_id][index].style.color = '#fff'
            this.$refs[spec_id][index].style.background = '#469afe'
            let foodprice = 0
            for(let i = 0;i < this.cartbox.length;i++){
                if(this.cartbox[i]){
                    foodprice += parseFloat(this.cartbox[i].spec_price)
                }
            }
            console.log(this.$refs)
            console.log(goods_id)
            console.log(this.$refs[goods_id])
            this.$refs.goodsPrice.innerHTML = '￥'+ (parseFloat(this.goodsinfo.goods_info.price) + parseFloat(foodprice)).toFixed(2)
            // this.goodsinfo.goods_info.price = (parseFloat(this.goodsinfo.goods_info.price) + parseFloat(foodprice)).toFixed(2)
        }
    },
    watch:{
        goodsinfo () {
            let img = this.goodsinfo.goods_info.details_figure.split(',')
            this.imgurl = img[0]
            // this.$refs.goodsPrice.innerHTML = this.goodsinfo.goods_info.price
        },
        cartbox () {
            console.log(1111)
            console.log(this.cartbox)
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
.buy_box
    background #fff
    .backg
        position fixed
        top 0
        left 0
        right 0
        bottom 0
        background rgba(0,0,0,0.3)
        z-index 14
    .shop-box
        position absolute
        bottom 0
        width 100%
        background-color #fff
        z-index 15
        .head
            height 21.33vw
            padding 5.33vw 2.66vw
            position relative
            .head-left
                float left
                .head-img
                    img 
                        width 21.33vw
                        height 21.33vw
            .head-right 
                float left 
                width 70%
                margin-left 2.66vw
                display flex
                flex-direction column 
                height 100%
                justify-content space-between
                font-size 5.33vw
                font-weight bold
                .food-price
                    color #469afe
            .colse
                position absolute
                top 5.6vw
                right 2.66vw
                img 
                    width 4.8vw
                    height 4.8vw        
        .category
            padding 0 2.66vw  
            overflow hidden   
            max-height 40vw
            .category-item 
                .category-list
                    .item
                        font-size 3.26vw
                        padding 3vw 7vw
                        border 1px solid #dbdbdb
                        color #999
                        display inline-block
                        border-radius 3px
                        margin-right 2.66vw
                        margin-top 2.66vw
                        margin-bottom 5.33vw
                    .active
                        background-color #469afe
                        color #fff    
        .join-cart
            height 12vw
            color #ffffff
            background-image linear-gradient(90deg, 
            #4c91fe 0%, 
            #41a1fe 33%, 
            #35b0fd 65%, 
            #4c91fe 100%), 
        linear-gradient(
            #469afe, 
            #469afe)
            box-sizing border-box
            margin 5vw 2.66vw 2.66vw 2.66vw    
            text-align center;
            line-height 12vw
            font-size 4.33vw
            font-weight bold
            box-shadow 0px 4px 20px -3px #35b0fd
</style>
