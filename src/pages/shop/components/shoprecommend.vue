<template>
    <div class="swiper-shop" v-if="food.length != 0">
        <swiper :options="swiperOption"> 
            <swiper-slide v-for="item in food" :key="item.goods_id">
                <div class="box">
                    <div class="box-left">
                        <img :src="item.details_figure" alt="" >
                    </div>
                    <div class="box-right">
                        <div class="box-right-title">
                            {{item.title}}
                        </div>
                        <div class="box-right-price">
                            ￥{{item.price}}
                        </div>
                        <div class="box-right-foot">
                            <div class="minus">-</div>
                            <span>1</span>
                            <div class="plus" @click="addCart(item.goods_id)">+</div>
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
        cart:Array
    },
    data () {
        return {
           swiperOption:{
                autoplay:false,
                slidesPerView : 1.7
            }    
        }
    },
    methods:{
        addCart (GoodId) {
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
                // url: 'mobile/api/q',
                url:'/api/goods_info',
                data: {
                    goods_id:GoodId,
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
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
            // let date = eval('('+res.data+')')
            let date = res.data
            let data 
            if(cart_id){
                data =  {
                        // url:'http://api.dqvip.cc/goods_info',
                        goods_id:GoodId,
                        shop_id:this.$route.params.id,
                        goods_num:goods_num,
                        cart_id: cart_id
                        // q_type:'post'
                    }
            }else{
                data = {
                        // url:'http://api.dqvip.cc/goods_info',
                        goods_id:GoodId,
                        shop_id:this.$route.params.id,
                        goods_num:goods_num,
                        // q_type:'post'
                    }
            }
            if(date.data.spec.length == 0){
                this.$http({
                    method: 'post',
                    // url: 'mobile/api/q',
                    url:'/api/buyer/cart_change',
                    data: data,
                    headers :{
                        'Accept':'application/json',
                        'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                    }
                })
                .then(this.emitCart)
                .catch(function (error) {
                    console.log(error);
                })
            }else{
                this.$emit('upup',true)
                this.$emit('buygoodsinfo',date.data)
                // this.$root.bus.$emit('goodsinfo',date.data)
            }
            
        },
        emitCart (res) {
            if(res.data.data == ''){
                alert('成功加入购物车')
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
                    margin 2.13vw 0
                .box-right-foot
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
