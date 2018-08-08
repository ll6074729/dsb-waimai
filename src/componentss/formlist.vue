<template>
    <div class="box">
        <div class="df pd20 box-item">
            <div class="list-name">
                姓名
            </div>
            <div class="list-input">
                <input type="text" placeholder="请输入您的真实姓名" >
            </div>
        </div>
        <div class="df pd20 box-item">
            <div class="list-name">
                手机
            </div>
            <div class="list-input">
                <input type="text" placeholder="请输入您的联系方式" >
            </div>
        </div>
        <div class="df pd20 box-item">
            <div class="list-name">
                微信
            </div>
            <div class="list-input">
                <input type="text" placeholder="请输入您的微信账号" >
            </div>
        </div>
        <div class="df pd20 box-item">
            <div class="list-name">
                校区
            </div>
            <awesome-picker
                ref="picker"
                :data="picker.data"
                >
            </awesome-picker>
            <div class="list-school df" @click="show()">
                <div class="school-name">
                    请选择兼职校区
                </div>
                <div class="school-right">
                    <img src="../assets/img/right_f7.png" alt="">
                </div>
            </div>
        </div>

        <div class="submit">
            <div class="submit-btn">
                提交申请
            </div>
        </div>
        <p class="ps fs24">
            申请后24小时内会有客服和您联系，请保证通讯畅通
        </p>
    </div>
</template>
<script>
export default {
    name:"formlist",
    data () {
        return {
            picker: {
                textConfirm:"确定",
                data: [
                    ['四川长江职业技术学院','四川电影电视学院(安仁校区)'],
                ],
            },
        }
    },
     methods:{
        back () {
            this.$router.go(-1)
        },
        show () {
            this.$refs.picker.show();
        },
        handlePickerConfirm (index,value) {
            console.log(index)
        }
        
    }   
}
</script>
<style lang="stylus" scoped>
.box
    padding-top 7vw
    padding-bottom 8vw
    .box-item
        border-radius 1.33vw
        margin 2.66vw
        background-color #fff
        height 13.33vw
        font-size 3.73vw
        border-top 1px solid #f7f7f7
        .list-name
            line-height 13.33vw
            width 16vw
            font-weight bold
        .list-input
            flex 1
            input 
                height 100%
                width 100%
                font-size 3.73vw
        .list-school
            flex 1   
            line-height 13.33vw
            .school-right
                img 
                    width 2.13vw
                    height 4.13vw
    .submit 
        text-align center
        .submit-btn
            margin 6vw auto
            font-size 4.8vw
            border-radius 6.66vw
            width 80vw
            height 13.33vw
            line-height 13.33vw
            color #469afe
            font-weight bold
            background-color #fff
    .ps
        color #ffffff
        text-align center   
    .ps-m
        color #999
        text-align center    
.box-m
    background-color #f7f7f7        
</style>
