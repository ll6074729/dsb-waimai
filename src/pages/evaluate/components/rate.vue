<template>
    <div>
        <div class="block">
            <span class="demonstration">骑手评分</span>
            <el-rate
                v-model="value2"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
        </div>
    </div>
</template>
<script>
export default {
    name:"rate",
    data () {
        return {
            value2:null
        }
    }
}
</script>
<style lang="stylus" scoped>
    .block
        text-align center
        padding 6vw 0
        .demonstration
            margin-bottom 4vw
            display block
</style>
