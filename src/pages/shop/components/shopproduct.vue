<template>
        <div class="shop-product" ref="shop">
            <ul>
                <li class="area" 
                    v-for="(item , index) in goods" 
                    :key="index"
                    :ref="index"
                    >
                    <div class="cate-title" v-if="!(item.goods.length ==0)"> {{item.cate_name}}</div>
                    <div class="item-list">
                        <div class="item" v-for="itemList in item.goods" :key="itemList.cate_id">
                            <div class="shop-left">
                                <div class="shop-img">
                                    <img :src="productImg[index][0]" alt=""> 
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
                                        <div class="minus">-</div>
                                        <span>1</span>
                                        <div class="plus" @click="addCart(itemList.goods_id)">+</div>
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
        this.scroll = new BScroll(this.$refs.shop,{
            click:true
        })
    },
    props:{
        goods:Array,
        cart:Array,
        productImg:Array,
    },
    data () {
        return {
            addCart (GoodId) {
                console.log(GoodId,159357)
                const that = this
                var goods_num = 1
                var cart_id 
                for(let i in this.cart){
                    if(this.cart[i].goods_id == GoodId){
                        cart_id = this.cart[i].cart_id
                        goods_num = this.cart[i].goods_num +1
                        break
                    }
                }
                // 获取当前商品的信息  规格  
                this.$http({
                    method: 'post',
                    url: 'mobile/api/q',
                    // url:'/api/goods_info',
                    data: {
                        url:'http://api.dqvip.cc/goods_info',
                        q_type:'post',
                        goods_id:GoodId,
                    }
                })
                    .then(function(response){
                        that.getCart(response,GoodId,goods_num,cart_id)
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            },
            getCart (res,GoodId,goods_num,cart_id) {
                let date = eval('('+res.data+')')
                // let date = res.data
                let data 
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
                        data: data,
                    })
                    .then(this.$emit('AglinCart'))
                    .catch(function (error) {
                        console.log(error);
                    })
                }else{
                    this.$emit('upup',true)
                    this.$emit('buygoodsinfo',date.data)
                    // this.$root.bus.$emit('goodsinfo',date.data)
                }
                
            },
            // emitCart (res) {
            //     let that = this
            //     if(res.data.status == 200){
            //         alert('成功加入购物车')
                    
            //         // this.$parent.getCart()
            //     }else{
            //         alert(res.data.message)
            //     }

            // }
        }
    }
}
</script>
<style lang="stylus" scoped>
    .item-list >>> .item:last-child 
        border none!important
    .shop-product 
        flex 1
        // position absolute
        // top 2vw
        // left 26.66vw
        // right 0
        // bottom 0
        // overflow hidden
        .area 
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
                            .shop-num
                                span 
                                    line-height 5vw
                                    margin 0 4vw
                                .minus,.plus
                                    width 5.33vw
                                    height 5.33vw
                                    border-radius 50%
                                    box-sizing border-box
                                    font-weight bold
                                    text-align center
                                    display inline-block
                                .minus
                                    border solid 1px #469afe;
                                    color #469afe
                                    line-height 4vw
                                .plus
                                    background-color #469afe
                                    color #fff
                                    line-height 5vw         
</style>
