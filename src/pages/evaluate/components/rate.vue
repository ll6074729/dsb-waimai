<template>
    <div>
        <div class="block">
            <span class="demonstration" v-if="page == 'take'">骑手评分</span>
            <span class="demonstration" v-if="page == 'shop'">骑手评分</span>
            <el-rate
                v-model="value2"
                :allow-half="true"
                @change="changerate"
                :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
        </div>
    </div>
</template>
<script>
export default {
    name:"rate",
    props:{
        page:String
    },
    data () {
        return {
            value2:null
        }
    },

    methods:{
        changerate () {
            console.log(this.value2,100)
            if(this.page == 'take'){
                this.$emit('changetake',this.value2)
            }else if(this.page == 'shop'){
                this.$emit('changeshop',this.value2)
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
    .block >>> .el-rate__icon
        font-size 9vw
    .block
        text-align center
        padding 6vw 0
        .demonstration
            margin-bottom 4vw
            display block
</style>
