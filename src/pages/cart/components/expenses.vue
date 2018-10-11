<template>
    <div>
            <div class="cost-item df" >
                <div class="cost-type">配送费<span style="color:#999;font-size:2.93vw">(包含校区基础费+楼层配送费){{this.shopinfo.custom_delivery}}-- {{this.$store.state.delivery_price}}</span></div>
                <div class="cost-price">￥{{(parseFloat(this.shopinfo.custom_delivery)+ parseFloat(this.$store.state.delivery_price)).toFixed(2)}} </div>
            </div>
            <div class="cost-item df" v-if="parseFloat(this.shopinfo.custom) !=0">
                <div class="cost-type">打包费</div>
                <div class="cost-price">￥{{this.shopinfo.custom}}</div>
            </div>

            <div class="cost-item df" v-if="parseFloat(delivery_cost[1].value) > 0 && parseFloat(this.shopinfo.custom) ==0">
                <div class="cost-type">{{delivery_cost[1].desc}}</div>
                <div class="cost-price">￥{{delivery_cost[1].value}}</div>
            </div>

            <div class="cost-item df" v-if="delivery_cost2 && parseFloat(this.shopinfo.custom) ==0">
                <div class="cost-type">{{delivery_cost2.desc}}</div>
                <div class="cost-price">￥{{delivery_cost2.value}}</div>
            </div>
    </div>
</template>
<script>
export default {
    name:"expenses",
    props:{
        delivery_cost:Array,
        delivery_cost1:Object,
        delivery_cost2:Object,
        shopinfo:Object,
    },
    mounted () {
        this.aa()
    },
    data () {
        return {

        }
    },
    methods : {
        aa () {
            console.log(this.delivery_cost,66)
        }
    },
}
</script>
<style lang="stylus" scoped>
    .cost-item
        padding 4.56vw 5.33vw
        border-bottom 1px solid #f7f7f7
        font-size 4.266vw
        .cost-price
            font-weight bold
</style>
