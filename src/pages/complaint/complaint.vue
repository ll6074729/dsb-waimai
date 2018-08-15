<template>
    <div>
        <chooes-type></chooes-type>
        <hr class="hr20">
        <chooes-order></chooes-order>
        <hr class="hr20">
        <describe></describe>
        <div class="pd20 upload-img">
            <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
               >
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
        <hr class="hr20">
        <user-info></user-info>
        <div class="submit">
            <div class="submit-btn">
                提交投诉
            </div>
        </div>
        <tab-bar :defaulttab="defaulttab"></tab-bar>
    </div>
</template>
<script>
import ChooesType from "./components/chooesType"
import chooesOrder from "./components/chooesOrder"
import Describe from "./components/describe"
import UserInfo from "./components/userinfo"
import TabBar from "../../componentss/tabbar"
export default {
    name:"complaint",
    components:{
        ChooesType,
        chooesOrder,
        Describe,
        UserInfo,
        TabBar
    },
    data () {
        return {
            defaulttab:2,
        }
    }
}
</script>
<style lang="stylus" scoped>
    .upload-img >>> .el-upload--picture-card
        width 16vw
        height 16vw
        line-height 18vw
        border 1px solid #c0ccda
    .upload-img >>> .el-icon-plus:before
        
    .upload-img
        margin-top 6vw   
        padding-bottom 6vw 
    .submit
        background-color #f7f7f7
        text-align center
        padding-bottom 25vw
        padding-top 6vw
        .submit-btn
            background-image linear-gradient(90deg, 
            #4c91fe 0%, 
            #41a1fe 33%, 
            #35b0fd 65%, 
            #4c91fe 100%);
            color #ffffff
            width 94.66vw
            height 13.33vw
            margin-left 2.66vw
            line-height 13.33vw    
            font-size 5.33vw
</style>
