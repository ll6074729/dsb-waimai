<template>
    <div>
        <div class="cost-item df" v-for="item in delivery_cost" :key="item.id" v-if="item.name != 'delivery_duration'">
            <div class="cost-type">{{item.desc}}</div>
            <div class="cost-price">￥{{item.value}}.00</div>
        </div>
    </div>
</template>
<script>
export default {
    name:"expenses",
    props:{
        delivery_cost:Array
    },
    data () {
        return {

        }
    }
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
