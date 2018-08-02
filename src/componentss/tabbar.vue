<template>
    <div>
        <div class="tabbar">
            <router-link tag="div" class="tabbar-item db active" to="/">
                <img src="../assets/img/home@3x.png" alt="" class="home">
                <p>外卖</p>
            </router-link>
            <router-link tag="div" class="tabbar-item db" to="/order">
                <img src="../assets/img/note@3x.png" alt="" class="Order">
                <p>订单</p>
            </router-link>
            <router-link tag="div" class="tabbar-item db" to="/complaint">
                <img src="../assets/img/information@3x.png" alt="" class="Complaint">
                <p>投诉</p>
            </router-link>
            <router-link tag="div" class="tabbar-item db" to="/Personal">
                <img src="../assets/img/contact@3x.png" alt="" class="my">
                <p>我的</p>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name:"tabbar",
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .tabbar
        position fixed
        bottom 0
        width 100%
        background-color #fff;
        z-index 9999999
        height 13.33vw
        box-shadow 0px -5px 20px 0px rgba(0, 0, 0, 0.1)
        padding-left 2.34vw
        .active
            color #469afe
        .tabbar-item
            width 22.66vw
            text-align center
            img 
                margin 2vw auto
            .home
                width 5.6vw
                height 5.2vw
            .Order
                width 4.13vw
                height 5.2vw
            .Complaint
                width 5.06vw
                height 4.93vw
            .my
                width 5.06vw
                height 4.8vw
            p 
                font-size 2.93vw

</style>
