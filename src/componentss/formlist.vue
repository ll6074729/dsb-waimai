<template>
    <div class="box" :class="{merchant:page == 2,concurrentBox:page == 0}">
        <div class="df pd20 box-item">
            <div class="list-name">
                姓名
            </div>
            <div class="list-input">
                <input type="text" placeholder="请输入您的真实姓名" v-model="username" minlength="2" maxlength="15">
            </div>
        </div>
        <div class="df pd20 box-item">
            <div class="list-name">
                手机
            </div>
            <div class="list-input">
                <input type="text" placeholder="请输入您的联系方式" v-model="mobile" maxlength="11" minlength="6">
            </div>
        </div>
        <!-- <div class="df pd20 box-item">
            <div class="list-name">
                微信
            </div>
            <div class="list-input">
                <input type="text" placeholder="请输入您的微信账号" v-model="wechat_number" minlength="3" maxlength="26">
            </div>
        </div> -->
        <div class="df pd20 box-item" v-if="page == 2">
            <div class="list-name">
                店铺名
            </div>
            <div class="list-input">
                <input type="text" placeholder="请输入您的店铺名" v-model="shop_name" minlength="3" maxlength="26">
            </div>
        </div>
        <div class="df pd20 box-item">
            <div class="list-name">
                <span v-if="page != 2">校区</span> 
                <span v-if="page == 2">店铺地址</span>
            </div>
            <awesome-picker
                ref="picker"
                :data="picker.data"
                @confirm="PickerConfirm"
                >
            </awesome-picker>
            <div class="list-school df" @click="show()">
                <div class="school-name">
                    <span v-if="page != 2">{{area_name}}</span> 
                    <span v-if="page == 2">{{area_name}}</span>
                </div>
                <div class="school-right">
                    <img src="../assets/img/right_f7.png" alt="">
                </div>
            </div>
        </div>

        <div class="submit">
            <div class="submit-btn" @click="submitBtn">
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
    props:{
        page:Number
    },
    data () {
        return {
            picker: {
                textConfirm:"确定",
                data: [['请选择校区']],
            },
            username:'',
            mobile:'',
            wechat_number:'',
            area_id:1,
            area_name:'请选择校区',
            shop_name:'',
            school_list:[]
        }
    },
    mounted () {
        this.AllSchool()
    },
    methods:{
        PickerConfirm(index) {      
            if(index[0].index == 0){
                this.$message({
                    type: 'warning',
                    message:'请选择正确的校区'
                })
            }else{
                this.area_name = index[0].value
                this.area_id = this.school_list[index[0].index].area_id
            }
        },
         // 所有学校
        AllSchool () {
            this.$http({
                method: 'post',
                url: '/mobile/api/q',
                // url:'api/buyer/area_list',
                data: {
                    search_name:'',
                    url:'http://api.dqvip.cc/buyer/area_list',
                    q_type:'post',
                },
            })
            .then(this.getAllSchool)
            .catch(function (error) {
                console.log(error);
            });
        },
        getAllSchool (res) {
            // let date = res.data
            let date = eval('('+res.data+')')

            this.school_list = date.data
            for(let i in  date.data){
                this.picker.data[0][date.data[i].area_id] = date.data[i].address
            }
            
        },
        back () {
            this.$router.go(-1)
        },
        show () {
            this.$refs.picker.show();
        },
        handlePickerConfirm (index,value) {
            console.log(index)
        },
        // 提交数据
        submitBtn () {
            let submitDate = {
                url:'http://api.dqvip.cc/hiring',
                q_type:'post',
                username:this.username,
                mobile:this.mobile,
                area_id:this.area_id,
                type:this.page,
                address:this.area_name
            }
            if(this.page == 2){
                submitDate.shop_name=this.shop_name
            }
            this.$http({
                method: 'post',
                // url:"/api/hiring",
                url:'/mobile/api/q',
                data: submitDate,
            })
                .then(this.submitinfo)
                .catch(function (error) {
                    console.log(error);
                })
        },
        submitinfo (res) {
            console.log(res)
            // let date = res.data
            let date = eval('('+res.data+')')
            if(date.status == 200){
                this.$confirm('成功加入,请等待客服与您联系', {
                        confirmButtonText: '确定',
                        showCancelButton:false,
                        type: 'success',
                        center: true
                    }).then(() => {
                        this.$router.push('/Personal')
                    }).catch(() => {
                        this.$router.push('/Personal')
                    });
            }else{
                this.$message({
                    type: 'warning',
                    message: date.message
                })
            }
        }
        
    }   
}
</script>
<style lang="stylus" scoped>
.merchant
    background-color #f7f7f7
    .ps
        color #333!important
.concurrentBox
    padding 0!important   
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
            .school-name
                color #999  
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
