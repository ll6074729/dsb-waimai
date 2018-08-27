<template>
    <div class="buy_box" v-show="isBuy">
        <div class="head">
            <div class="head-left">
                <div class="head-img">
                    <img src="goodsinfo.goods_info.details_figure" alt="" :onerror="this.$store.state.defaultShop">
                </div>
            </div>
            <div class="head-right">
                <div class="food-name">{{goodsinfo.goods_info.title}}</div>
                <div class="food-price">￥{{goodsinfo.goods_info.price}}</div>
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
                            :class="{active:index}"
                            v-for="(itemList,index) of item.item" 
                            :key="itemList.item_id"
                            @click="chooesItem(index,itemList.item_id,itemList.goods_id,itemList.spec_id)"
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
            cartbox:[]
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
                    data: data,
                })
                .then(this.emitCart)
                .catch(function (error) {
                    console.log(error);
                })
        },
        emitCart (res) {
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
        },
        // 选择规格
        chooesItem (index,item_id,goods_id,spec_id) {
            var cart = {}
            cart.goods_id = goods_id
            cart.index = index
            cart.item_id = item_id
            cart.spec_id = spec_id
            this.cartbox[spec_id] = cart
            console.log(this.cartbox)
        }
    },
    watch:{
        cartbox () {
            console.log(1111)
            console.log(this.cartbox)
        }
    }
}
</script>
<style lang="stylus" scoped>
.buy_box
    background #fff
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
