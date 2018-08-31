<template>
<div class="shop-cart-box" v-show="isBuy">
    <div class="backg" @click="iscartstatus" v-show="iscartshow"></div>
    <div class="shop-foot"  >
        <div  class="item" @click="iscartstatus">
            <el-badge :max="99">
                <img src="../../../assets/img/shoppingcart.png" alt="">
            </el-badge>
        </div>
        <div class="shop-cart-info">
            <div class="shop-price">
                <span class="price1">￥{{rulingPrice}}</span>
                <span class="price2" v-if="costPrice != 0">￥{{costPrice}}</span>
            </div>
            <div class="distribution" v-if="addressList.length >0">
                配送费: ￥{{(parseFloat(delivery_cost) + parseFloat(delivery_price)).toFixed(2)}}
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
                            <img src="../../../assets/img/food.jpg" alt="">
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
                                <div class="minus" @click="setgoodsnum(item.goods_num,item.goods_id,'minus',item.cart_id,item.spec_key)">-</div>
                                <span>{{item.goods_num}}</span>
                                <div class="plus" @click="setgoodsnum(item.goods_num,item.goods_id,'plus',item.cart_id,item.spec_key)">+</div>
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
            value:132,
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
                    // url: 'mobile/api/q',
                    url:'api/buyer/cart_change',
                    data: data,
                    headers :{
                        'Accept':'application/json',
                        'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                    }
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
                    // url: 'mobile/api/q',
                    url:"/api/init",
                    data: {
                        url:'http://api.dqvip.cc/init',
                        q_type:'get'
                    },
                    headers :{
                        'Accept':'application/json',
                        'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                    }
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
            // let date = eval('('+res.data+')')
            let date = res.data
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
                // url: 'mobile/api/q',
                url:'api/buyer/cart_clear',
                data:date,
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                }
            })
                .then(this.$parent.AglinCart)
                .catch(function (error) {
                    console.log(error);
                })
        },
        // cleanCartList (res) {
        //     this.$emit('AglinCart')
        //     if(res.data.status == 200){
        //         this.$message({
        //             message: '清空成功',
        //             type: 'success',
        //         });
        //     }else{
        //         this.$message({
        //             message: '清空失败',
        //             type: 'waring',
        //         });
        //     }
            
        // }
    },
    computed :{
      
    },
    watch:{
        cart () {
           
        }
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
                                border-radius 50%
                                box-sizing border-box
                                font-weight bold
                                text-align center
                                
                            .minus
                                border solid 1px #469afe;
                                color #469afe
                                line-height 4vw
                            .plus
                                background-color #469afe
                                color #fff
                                line-height 5vw
        .isshop
            text-align center
            padding 5vw
</style>
