<template>
    <div>
        <div class="head df">
            <div class="head-back" @click="back()">
                <img src="../../assets/img/back.png" alt="">
            </div>
            <div @click="newAddress">
                <span v-if="this.$route.query.page">保存并使用</span>
                <span v-if="!this.$route.query.page">保存地址</span>
            </div>
        </div>
        <div class="consignee">
            <div class="df pd20">
                <div class="list-name">
                    联系人
                </div>
                <div class="list-input">
                    <input type="text" placeholder="请输入您的姓名" maxlength="20" v-model="consignee">
                </div>
            </div>
            <div class="df pd20">
                <div class="list-name">
                    手机号
                </div>
                <div class="list-input">
                    <input type="number" placeholder="联系人手机号" maxlength="11" v-model="mobile" pattern="[0-9]*">
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
                        {{schoolAddress}}
                    </div>
                    <div class="school-right">
                        <img src="../../assets/img/right_f7.png" alt="">
                    </div>
                </div>
            </div>
            <div class="df pd20">
                <div class="list-name">
                    寝室号
                </div>
                <div class="list-input">
                    <input type="text" placeholder="请填写寝室号" v-model="address" maxlength="8">
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
            schoolAddress:'请选择您当前的地址',
            delivery:'',
            consignee:'',
            mobile:'',
            is_default:1,
            floor:'',
            address:'',
            building:'',
            delivery_id:'', //楼层ID
            address_id:null, //编辑才传
            address_list:this.$store.state.addressList,
            picker: {
                textConfirm:"确定",
                data: [
                    {
                        value: localStorage.defaultSchool,
                        children: [
                        { value: 'A-a' },
                        { value: 'A-b' },
                        { value: 'A-c' }
                        ]
                    }
                ]
            },
            build_name:[],
            build:[]
        }
    },
    methods:{
        Modify () {
            if(this.$route.query.address_num || this.$route.query.address_num == 0){
                this.consignee = this.address_list[this.$route.query.address_num].consignee
                this.mobile = this.address_list[this.$route.query.address_num].mobile
                this.floor =this.address_list[this.$route.query.address_num].floor
                this.address = this.address_list[this.$route.query.address_num].address
                this.building = this.address_list[this.$route.query.address_num].building
                this.delivery_id = this.address_list[this.$route.query.address_num].delivery_id
                this.address_id = this.address_list[this.$route.query.address_num].address_id
                this.schoolAddress = this.picker.data[0].value + this.building + this.floor
            }
        },
        setIsDefault () {
            if(this.address_list.length == 0){
                this.is_default = 1
            }else {
                this.is_default = 0
            }
        },
        newAddress () {
            let date = {
                url:'http://api.dqvip.cc/buyer/edit_address',
                q_type:'post',
                area_id:this.$store.state.area_id,
                consignee:this.consignee,
                mobile:this.mobile,
                floor:this.floor,
                address:this.address,
                building:this.building,
                delivery_id:this.delivery_id,
                is_default:this.is_default,
            }
            if(this.$route.query.address_num || this.$route.query.address_num ==0){
                date.address_id = this.address_id
            }
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // url:"api/buyer/edit_address",
                data: date,
            })
            .then(this.add_address)
            .catch(function (error) {
                console.log(error)
            })
        },
        add_address (res) {
            let that = this
            let date = eval('('+res.data+')')
            // let date = res.data
            if(that.$route.query.page){
                this.$http({
                    method: 'post',
                    url:'mobile/api/q',
                    // url:'api/buyer/default_address',
                    data: {
                        url:'http://api.dqvip.cc/buyer/default_address',
                        address_id:date.data.address_id,
                        q_type:'post'
                    }
                })
            }
            if(date.status == 200){
                this.$message({
                    type: 'success',
                    message: date.message,
                })  
                setTimeout(function(){
                    if(that.$route.query.page){
                        that.$router.go(-2)
                    }else{
                        that.back()
                    }
                },1000)
            }else{
                this.$message({
                    type: 'error',
                    message: date.message
                })  
            }
        },
        back () {
            this.$router.go(-1)
        },
        show () {
            this.$refs.picker.show();
        },
        handlePickerConfirm (index,value) {
            this.building = index[1].value
            this.floor = index[2].value
            this.schoolAddress = index[0].value + index[1].value + index[2].value +'楼'
            this.delivery_id = this.delivery.data[this.$store.state.area_id][index[1].index].child[index[2].index].delivery_id
        },
        getSchool () {
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // url:'api/buyer/delivery',
                data: {
                    url:'http://api.dqvip.cc/buyer/delivery',
                    area_id:this.$store.state.area_id,
                    q_type:'post'
                },
            })
            .then(this.getAllSchool)
            .catch(function (error) {
                console.log(error);
            });
        },
        getAllSchool (res) {
            // let date = res.data
            const date = eval('('+ res.data +')')
            this.delivery = date
            const result = []
            // console.log(date.data[this.$store.state.area_id],163)
            for(let i in date.data[this.$store.state.area_id]){
                var re = {}
                re.value =  date.data[this.$store.state.area_id][i].build_name
                for(let j = 0;j< date.data[this.$store.state.area_id][i].child.length;j++){
                    re.children = date.data[this.$store.state.area_id][i].child
                }
                result.push(re)
            }
            this.picker.data[0].children = result
        }
    },
    created () {

    },
    mounted () {
        this.getSchool()
        this.setIsDefault()
        this.Modify()
    },
    computed :{
        
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
