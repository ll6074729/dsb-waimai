<template>
    <div>
        <div class="shop-head">
            <div class="shop-head-img">
                <img :src="shopinfo.logo" alt="" :onerror="this.$store.state.defaultHead">
            </div>
            <div class="shop-head-name">{{shopinfo.shop_name}}</div>
            <div class="takeout-img"  v-if="page != 'cart'">
                <a :href="'tel:' + shopinfo.mobile">
                    <img src="../../../assets/img/call.png" alt="" >
                </a>
            </div>
        </div>
        <div class="goods-list">
            <div class="goods-list-item" v-for="(item,index) in cartBox" :key="index">
                <div class="goods-img">
                    <img :src="item.pic[0]" alt="" :onerror="defaultImg">
                </div>
                <div class="goods-info">
                    <div class="goods-name" v-if="page != 'center'">{{item.title}}</div>
                    <div class="goods-name" v-if="page == 'center'">{{item.goods_name}}</div>
                    <div class="goods-type">
                        <span>{{item.spec_name || item.spec_key_name}}</span>
                    </div>
                </div>
                <div class="goods-num">
                    x{{item.goods_num}}
                </div>
                <div class="goods-price"  v-if="page != 'center'">
                    ￥{{parseFloat(item.price) +  parseFloat(item.spec_price || 0)}}
                </div>
                <div class="goods-price"  v-if="page == 'center'">
                    ￥{{parseFloat(item.goods_price) +  parseFloat(item.spec_price || 0)}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"CartInfo",
    props:{
        page:String,
        cartBox:Array,
        shopinfo:Array
    },
    data () {
        return {
            defaultImg : 'this.src="' + require('../../../assets/img/defaultshop.png') + '"'
        }
    },
    mounted () {
        this.cartBoxfc()
    },
    watch : {
        cartBox () {
            for(let i in this.cartBox){
                let img = []
                for(var j = 0;j<this.cartBox.length;j++){
                    if(this.cartBox[i].details_figure.substring(0,this.cartBox[i].details_figure.length -1) == ','){
                        img = this.cartBox[i].details_figure.split(',')
                    }else{
                        img[0] = this.cartBox[i].details_figure
                    }
                    
                }
                this.cartBox[i].pic = img
            }
        }
    },
    methods: {
        cartBoxfc () {
            for(let i in this.cartBox){
                let img = []
                for(var j = 0;j<this.cartBox.length;j++){
                    if(this.cartBox[i].details_figure.substring(0,this.cartBox[i].details_figure.length -1) == ','){
                        img = this.cartBox[i].details_figure.split(',')
                    }else{
                        img[0] = this.cartBox[i].details_figure
                    }
                    
                }
                this.cartBox[i].pic = img
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
@import "~css/style"
    .shop-head
        padding 0 5.33vw
        display flex
        height 13.33vw
        line-height 13.33vw
        .shop-head-img
            vertical-align middle
            margin-right 2.66vw
            img 
                width 6.66vw
                height 6.66vw
                border-radius 50%
        .shop-head-name
            font-size 3.73vw
            margin-right auto 
        .takeout-img
            a
                img 
                    width 10.66vw
                    height 10.66vw    
    .goods-list
        .goods-list-item
            padding 2.66vw 5.33vw
            background #f7f7f7
            display flex
            .goods-img
                img 
                    width 13.33vw
                    height 13.33vw
            .goods-info
                margin-left 2.66vw
                width 50vw
                .goods-name
                    font-size 4.266vw
                    font-weight bold
                    // ellipsis()
                .goods-type
                    margin-top 4.66vw
                    font-size 3.2vw
                    span 
                        color #999
            .goods-num
                line-height 13.33vw
                
            .goods-price
                line-height 13.33vw
                font-weight bold
                margin-left 6.66vw
                width 70px
</style>
