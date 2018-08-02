<template>
    <div>
        <div class="cost-activity df">
            <div class="activity-type">满减</div>
            <div class="activity-name">满80减32</div>
        </div>
    </div>
</template>
<script>
export default {
    name:"activity",
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .cost-activity
        padding 2.3vw 5.33vw
        font-size 3.2vw
        border-bottom 1px solid #f7f7f7
        .activity-type
            background red
            padding 1.33vw 2.13vw
            color #fff
        .activity-name
            line-height 5.6vw    
            color #999
</style>
