<template>
    <div class="count">
        <div class="count-text">
            {{count}}
        </div>
        <p>订单状态</p>
    </div>
</template>
<script>
export default {
    name:"Count",
    data () {
        return {
            count:"12:55",
        }
    },
    methods:{

    },
    watch:{

    },
    computed:{

    }
}
</script>
<style lang="stylus" scoped>
    .count
        width 100%
        text-align center
        .count-text
            position absolute
            background #fff;
            border-radius 50%
            top 5.33vw
            left 50%
            margin-left -10.66vw
            width 21.33vw
            height 21.33vw
            line-height 21.33vw
        p
            font-size 4.8vw
            font-weight bolder
            margin-top 15vw
            margin-bottom 10.66vw
</style>
