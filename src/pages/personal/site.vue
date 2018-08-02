<template>
    <div>
        <div class="head df">
            <div class="head-back" @click="back()">
                <img src="../../assets/img/back.png" alt="">
            </div>
            <div>
                保存地址
            </div>
        </div>
        <div class="consignee">
            <div class="df pd20">
                <div class="list-name">
                    联系人
                </div>
                <div class="list-input">
                    <input type="text" placeholder="请输入您的姓名" maxlength="20">
                </div>
            </div>
            <div class="df pd20">
                <div class="list-name">
                    手机号
                </div>
                <div class="list-input">
                    <input type="text" placeholder="联系人手机号" maxlength="11">
                </div>
            </div>
            <hr class="hr20">
            <!-- 地址 -->
            <div class="df pd20">
                <div class="list-name">
                    校区
                </div>
                <awesome-picker
                    ref="picker"
                    :data="picker.data"
                    :textConfirm="picker.textConfirm"
                    @confirm="handlePickerConfirm"
                    >
                </awesome-picker>
                <div class="list-school df" @click="show()">
                    <div class="school-name">
                        长江职业技术学院
                    </div>
                    <div class="school-right">
                        <img src="../../assets/img/right_f7.png" alt="">
                    </div>
                </div>
            </div>
            <div class="df pd20">
                <div class="list-name">
                    地址
                </div>
                <div class="list-input">
                    <input type="text" placeholder="请填写详细地址" >
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import Slider from "./components/slider"
export default {
    name:"site",
    components:{
        Slider
    },
    data () {
        return {
            picker: {
                textConfirm:"确定",
                data: [
                    ['四川长江职业技术学院','四川电影电视学院(安仁校区)'],
                    ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
                    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
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
    .head
        height 10.66vw
        padding 0 2.66vw
        line-height 10.66vw
        .head-back
            img 
                width 2.13vw
                height 4.13vw
    .consignee
        border-bottom 1px solid #f7f7f7
        .df
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
</style>
