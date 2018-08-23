<template>
    <div>
        <chooes-type @changeradio="changeradio"></chooes-type>
        <hr class="hr20">
        <chooes-order :selectArray="selectArray" @changeordershow="changeordershow"></chooes-order>
        <hr class="hr20">
        <describe :content="content" @changecontent="changecontent"></describe>
        <div class="pd20 upload-img">
            <el-upload
                action="http://wm.dqvip.cc/mobile/api/image"
                list-type="picture-card"
                :on-success="handimg"
                :on-exceed="handexceed"
                :multiple="true"
                :limit='6'
                :data="this.data"
               >
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </div>
        <hr class="hr20">
        <user-info :username="username" :mobile="mobile" @changemobile="changemobile" @changeusername="changeusername"></user-info>
        <div class="submit">
            <div class="submit-btn" @click="submitBtn">
                提交投诉
            </div>
        </div>
        <tab-bar :defaulttab="defaulttab"></tab-bar>
        <order-list :historyOrder="historyOrder" @changeorder="changeorder" :ordershow="ordershow" @changeshow="changeshow"></order-list>
    </div>
</template>
<script>
import ChooesType from "./components/chooesType"
import chooesOrder from "./components/chooesOrder"
import Describe from "./components/describe"
import UserInfo from "./components/userinfo"
import TabBar from "../../componentss/tabbar"
import OrderList from "./components/orderList"
export default {
    name:"complaint",
    components:{
        ChooesType,
        chooesOrder,
        Describe,
        UserInfo,
        TabBar,
        OrderList
    },
    data () {
        return {
            data:{
                file:'liu',
                name:'Complaint'
            },
            defaulttab:2,
            select:'',
            type:0,
            ordershow:false,
            selectArray:0,
            historyOrder:[],
            img:'',
            username:'',
            mobile:'',
            content:'',
        }
    },
    watch : {
        select () {
            for (let i in this.historyOrder){
                if( this.select ==  this.historyOrder[i].order_id){
                    this.selectArray = this.historyOrder[i]
                }
            }
        }
    },
    mounted () {
        this.newhistoryOrder()
    },
    methods:{
        submitBtn () {
            let date ={}
            if(this.select == ''){
                this.$message({
                    type:'error',
                    message:'亲,请选择您要投诉的订单'
                })
                return 
            }else{
                date.order_id = this.select
            }
            if(!this.username == ''){
                date.username = this.username
            }else{
                this.$message({
                    type:'warning',
                    message:'姓名不能为空,我不知道该打给谁o(╥﹏╥)o'
                })
                return 
            }
            if(!this.mobile == ''){
                date.mobile = this.mobile
            }else{
                this.$message({
                    type:'warning',
                    message:'手机号，否则不能联系您勒'
                })
                return 
            }
            if(!this.img == ''){
                date.img = this.img
            }
             if(!this.content == ''){
                date.content = this.content
            }
            date.type = this.type
            this.$http({
                method: 'post',
                url:"/api/buyer/user_complaint",
                data: date,
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.submitinfo)
                .catch(function (error) {
                    console.log(error);
                })
        },
        submitinfo (res) {
            console.log(res)
            let that = this
            if(res.status == 200){
                 this.$message({
                    type:'success',
                    message:'投诉成功，请等待客服联系您'
                })
                setTimeout(that.$router.push({path:'/'}),3000)
            }
        },
        handexceed (files, fileList) {
            // console.log(event,100)
            // console.log(file,200)
            console.log(fileList,300)
            if(fileList.length > 5){
                this.$message({
                    type:'warning',
                    message:'亲,最多只能传6张哟~！'
                })
            }else if(fileList.length == 0){
                this.$message({
                    type:'warning',
                    message:'亲,单次传图不能超过6张'
                })
            }
        },
        handimg (response, file, fileList) {
            this.img += response.data[0] + ','
        },
        changeradio (msg) {
            this.type = msg
        },
        changecontent (msg) {
            this.content = msg
        },
        changeusername (msg) {
            this.username = msg
        },
        changemobile (msg) {
            this.mobile = msg
        },
        changeshow (msg) {
            this.ordershow = msg
        },
        changeordershow (msg) {
            this.ordershow = msg
        },
        changeorder (msg) {
            // console.log(msg,111)
            this.select = msg
        },
        // 历史订单
        newhistoryOrder () {
            this.$http({
                method: 'post',
                // url: 'mobile/api/q',
                url:"/api/buyer/history_order",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    page_size:300
                    // q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.gethistoryOrder)
                .catch(function (error) {
                    console.log(error);
                })
        },
        gethistoryOrder (res) {
            let timer = Date.parse(new Date())/1000 - 86400 * 7;
            let date = res.data.data.data
            let order = []
            for(let i in date){
                if(Date.parse(new Date(date[i].created_at))/1000 > timer){
                    order.push(date[i])
                }
            }
            this.historyOrder = order
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
            box-shadow 0px 5px 20px 0px #35b0fd
</style>
