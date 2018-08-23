

<template>
    <div class="chooes-type">
        <el-radio v-model="radio" label="0" class="chooes-item">配送问题</el-radio>
        <el-radio v-model="radio" label="1" class="chooes-item">餐品质量</el-radio>
        <el-radio v-model="radio" label="2" class="chooes-item">平台服务</el-radio>
    </div>
</template>
<script>
export default {
    name:"chooesType",
    data () {
        return {
            radio:'0'
        }
    },
    watch:{
        radio () {
            console.log(this.radio)
            this.$emit('changeradio',this.radio)
        }
    }
}
</script>
<style lang="stylus" scoped>
    .chooes-type
        display flex
        text-align center
        .chooes-item
            height 13.33vw
            line-height 13.33vw
            flex 1
        .active
            color #469afe   
</style>
