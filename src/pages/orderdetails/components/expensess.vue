<template>
    <div>
        <div class="cost-item df" v-for="(item,index) in delivery_cost" :key="index" v-if="delivery_cost.length >0 && item.name !='delivery_duration'">
            <div class="cost-type">{{item.desc}}<span style="color:#999;font-size:2.93vw" v-if="index == 0">(包含校区基础费+楼层配送费)</span></div>
            <!-- <div class="cost-price" v-if="item.name == 'delivery_cost'">￥{{(parseFloat(item.value) + parseFloat(this.$store.state.delivery_price)).toFixed(2)}}</div> -->
            <div class="cost-price">￥{{item.value}}</div>
        </div>
        <div class="cost-item df" v-if="delivery_cost1">
            <div class="cost-type">{{delivery_cost1.desc}}<span style="color:#999;font-size:2.93vw">(包含校区基础费+楼层配送费)</span></div>
            <div class="cost-price">￥{{(parseFloat(delivery_cost1.value) + parseFloat(floor_amount)).toFixed(2)}}</div>
        </div>
        <div class="cost-item df" v-if="delivery_cost2">
            <div class="cost-type">{{delivery_cost2.desc}}</div>
            <div class="cost-price">￥{{delivery_cost2.value}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name:"expensess",
    props:{
        delivery_cost:Array,
        delivery_cost1:Object,
        delivery_cost2:Object,
        shopinfo:Object,
        floor_amount:String
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
