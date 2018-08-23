<template>
    <div>
        <div class="assess-text pr pd20">
            <textarea name="assess" id="" cols="30" rows="10" placeholder="写下您想对店家说的话吧~" v-model="content" maxlength="200" @blur="handcontent"></textarea>
            <div class="text-num">
                <span>{{content.length}}</span>/<span>200</span>
            </div>
        </div>
        <div class="pd20 upload-img">
            <el-upload
                action="http://wm.dqvip.cc/mobile/api/image"
                list-type="picture-card"
                :data="this.data"
                :multiple="true"
                :limit='6'
                :on-success="handimg"
               >
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
        <div class="laud df" v-for="(item,index) in orderinfo" :key="item.goods_id">
            <div class="foodname">
                {{item.goods_name}}
            </div>
            <div class="islaud df">
                <div class="laud-yes" @click="handlaud(item.goods_id,1,index)">
                    <img src="../../../assets/img/good_gray@3x.png" alt="" v-if="item.praise == 0 ">
                    <img src="../../../assets/img/good_blue@3x.png" alt=""  v-if="item.praise == 1 ">
                </div>
                <div class="laud-no" @click="handlaud(item.goods_id,0,index)">
                    <img src="../../../assets/img/bad_gray@3x.png" alt="" v-if="item.stamp == 0 ">
                    <img src="../../../assets/img/bad_red@3x.png" alt="" v-if="item.stamp == 1 ">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Laud from "./laud"
export default {
    name:"assessshop",
    props:{
        orderinfo:Array
    },
    components:{
        Laud,
    },
    data () {
        return {
            data:{
                file:'liu',
                name:'food'
            },
            img:'',
            content:'',
            goods:[]
        }
    },
    methods:{
        handcontent () {
            this.$emit("changecontent",this.content)
        },
        handimg (response, file, fileList) {
            this.img += response.data[0] + ','
            this.$emit("changeImg",this.img)
        },
        handlaud (goods_id,status,index){
            this.goods[index] = []
            let goodsBox = {}
            goodsBox.goods_id = goods_id
            if(status == 0){
                goodsBox.stamp = status
                this.orderinfo[index].stamp = 1
                this.orderinfo[index].praise = 0
            }else if(status == 1){
                goodsBox.praise = status
                this.orderinfo[index].stamp = 0
                this.orderinfo[index].praise = 1
            }
            this.goods[index] = goodsBox
            this.$emit('changegoods',this.goods)
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
    .laud
        padding 2.66vw
        .foodname
            flex 1
            margin-right 10%
            line-height 1.2
        .islaud
            width 25%
            .laud-no
                margin-right 30%
            div
                width 4vw
                height 3.73vw
                img 
                    height 100%
                    width 100%     
</style>
