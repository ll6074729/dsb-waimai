<template>
    <div>
        <div class="assess-text pr pd20">
            <textarea name="assess" id="" cols="30" rows="10" placeholder="写下您想对店家说的话吧~"></textarea>
            <div class="text-num">
                <span>0</span>/<span>200</span>
            </div>
        </div>
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
        <laud></laud>
    </div>
</template>
<script>
import Laud from "./laud"
export default {
    name:"assessshop",
    components:{
        Laud,
    } 
}
</script>
<style lang="stylus" scoped>
    .upload-img >>> .el-upload--picture-card
        width 16vw
        height 16vw
        line-height 18vw
        border 1px solid #c0ccda
    .assess-text
        width 100%
        height 32vw
        box-sizing border-box
        textarea
            width 96%
            height 96%
            padding 2%
            background #f7f7f7
            font-size 3.73vw
        .text-num
            position absolute
            bottom 0
            right 4%   
            font-size 3.2vw
            color #999 
    .upload-img
        margin-top 6vw       
</style>
