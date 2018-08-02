<template>
    <div>
        <div class="cost-item df">
            <div class="cost-type">配送费</div>
            <div class="cost-price">￥2</div>
        </div>
        <div class="cost-item df">
            <div class="cost-type">餐盒费</div>
            <div class="cost-price">￥1</div>
        </div>
    </div>
</template>
<script>
export default {
    name:"expenses",
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
