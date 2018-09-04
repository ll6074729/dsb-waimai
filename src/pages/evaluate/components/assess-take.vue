<template>
    <div>
        <div class="box pd20">
            <div class="head-img">
                <img :src="takeinfo.headimgurl" alt="" v-if="page == 'take'" :onerror="defaultImg">
                <img :src="shopinfo.logo" alt="" v-if="page == 'shop'" :onerror="defaultImg">
            </div>
            <div class="head-name">
                <span v-if="page == 'take'">{{takeinfo.nickname}}</span> 
                <span v-if="page == 'shop'">{{shopinfo.shop_name}}</span> 
            </div>
            <div class="head-info"  v-if="page == 'take'">
                <span>配送用时</span>
                <span style="color:#469afe">25分钟</span>
            </div>
        </div>
        <div class="block">
            <span class="demonstration" v-if="page == 'take'">骑手评分</span>
            <span class="demonstration" v-if="page == 'shop'">店铺评分</span>
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
import Rate from "./rate"
export default {
    name:"assesstake",
    props:{
        page:String,
        shopinfo:Object,
        takeinfo:Object
    },
    components:{
        Rate,
    },
    data () {
        return {
            value2:null,
            defaultImg: 'this.src="' + require('../../../assets/img/defaultshop.png') + '"',
        }
    },
    watch : {
        value2 () {
            if(this.page == 'take'){
                this.$emit('changetake',this.value2)
            }else if(this.page == 'shop'){
                this.$emit('changeshop',this.value2)
            }
        }
    },
    methods:{
        changerate () {
            // if(this.page == 'take'){
            //     console.log(this.value2,1000)
            //     this.$emit('changetake',this.value2)
            // }else if(this.page == 'shop'){
            //     console.log(this.value2,2000)
            //     this.$emit('changeshop',this.value2)
            // }
        }
    }
}
</script>
<style lang="stylus" scoped>
    .box
        display flex
        height 13.33vw
        line-height 13.33vw
        border-bottom 1px solid #f7f7f7
        .head-img
            margin-right 2.66vw
            img 
                width 8vw
                height 8vw
        .head-name
            margin-right auto 
    .block >>> .el-rate__icon
        font-size 7vw
    .block
        text-align center
        padding 6vw 0
        .demonstration
            margin-bottom 4vw
            display block        
</style>
