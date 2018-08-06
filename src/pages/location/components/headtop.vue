<template>
    <div>
         <div class="search-head">
            <!-- <router-link to="/" class="search-head-left">
                <img src="../../../assets/img/back.png" alt="">
            </router-link> -->
            <div class="search-head-center">
                <el-input
                    placeholder="请输入内容"
                    v-model="input10"
                    clearable>
                </el-input>
            </div>
            <div class="search-head-right">
                <!-- <img src="../../assets/img/search@3x.png" alt="" srcset=""> -->
                搜索
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"headTop",
    data () {
        return {
            input10:""
        }
    }
}
</script>
<style lang="stylus" scoped>
    .el-input--suffix >>> .el-input__inner
        border none!important
        background #f7f7f7
        height 8vw
        border-radius 3.33vw
    .search-head
        display flex
        justify-content space-between
        width 100%;
        height 10.66vw
        align-items center
        padding 1.33vw 2.66vw
        box-sizing border-box
        .search-head-left 
            width 2.13vw
            height 4.13vw
            img 
                width 100%
        .search-head-center
            position relative
            width 70%
            height 8vw 
</style>
