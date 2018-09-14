<template>
    <div>
         <div class="cart-head">
            <div  class="cart-head-left" @click="back()">
                <img src="../assets/img/back.png" alt="">
            </div>
            <div class="cart-head-text">
                {{title}}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"headback",
    props:{
        title:String
    },
    data () {
        return {

        }
    },
    methods:{
        back () {
            this.$router.go(-1)
        }
    }
}
</script>
<style lang="stylus" scoped>
    .cart-head
        height 10.66vw
        line-height 10.66vw
        border-bottom 1px solid #f7f7f7
        background #fff
        box-shadow 0px 5px 20px 0px rgba(0, 0, 0, 0.05)
        .cart-head-left 
            margin-left 2.13vw
            display inline-block
            img 
                width 2.13vw
                height 4.13vw
                margin-top -1vw
        .cart-head-text
            display inline-block
            margin-left 2.66vw     
            font-size 4.26vw
</style>
