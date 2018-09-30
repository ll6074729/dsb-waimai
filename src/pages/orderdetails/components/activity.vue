<template>
    <div>
        <div class="cost-activity df" v-if="item.prom_type == 0" v-for="item in this.shopprom" :key="item.id">
            <div class="activity-type type0">满减</div>
            <div class="activity-name">-{{item.deduction_money}}</div>
        </div>
        <div class="cost-activity df" v-if="item.prom_type == 1" v-for="item in this.shopprom" :key="item.id">
            <div class="activity-type type1">赠品</div>
            <div class="activity-name" >{{item.prom_title}}</div>
        </div>
        <div class="cost-activity df" v-if="item.prom_type == 2" v-for="item in this.shopprom" :key="item.id">
            <div class="activity-type type2">首单</div>
            <div class="activity-name">-{{item.deduction_money}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name:"act",
    props:{
        shopprom:Array
    },
}
</script>
<style lang="stylus" scoped>
    .cost-activity
        padding 2.3vw 5.33vw
        font-size 3.2vw
        border-bottom 1px solid #f7f7f7
        .center
            margin-top 1vw
            padding 1.33vw 2.13vw
        .activity-type
            padding 1.33vw 2.13vw
        .type0
            background-color #ffe1e1  
            color #ff7373
        .type1
            background-color #e2ffe1  
            color #43ce56
        .type2
            background-color #e1efff   
            color #81a2ff
        .activity-name
            line-height 5.6vw    
            color #999
</style>
