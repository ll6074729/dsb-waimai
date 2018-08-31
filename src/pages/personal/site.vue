<template>
    <div>
        <div class="head df">
            <div class="head-back" @click="back()">
                <img src="../../assets/img/back.png" alt="">
            </div>
            <div @click="newAddress">
                保存地址
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
                    <input type="text" placeholder="联系人手机号" maxlength="11" v-model="mobile">
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
                    地址
                </div>
                <div class="list-input">
                    <input type="text" placeholder="请填写详细地址" v-model="address">
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
            address_id:'', //编辑才传
            address_list:this.$store.state.addressList,
            picker: {
                textConfirm:"确定",
                data: [{
                    value: this.$store.state.defaultSchool,
                    children:[
                    {
                        value: 'A',
                        children: [
                            { value: 'A-a'},
                            { value: 'A-b'},
                            { value: 'A-c'}
                        ]
                    },
                    {
                        value: 'B',
                        children: [
                            { value: 'b-a'},
                            { value: 'b-b'},
                            { value: 'b-c'}
                        ]
                    }],
                }],
            },
            build_name:[],
            build:[]
        }
    },
    methods:{
        setIsDefault () {
            if(this.address_list.length == 0){
                this.is_default = 1
            }else {
                this.is_default = 0
            }
        },
        newAddress () {
            this.$http({
                 method: 'post',
                // url: 'mobile/api/q',
                url:"api/buyer/edit_address",
                data: {
                    // url:'http://api.dqvip.cc/buyer/edit_address',
                    // q_type:'post',
                    area_id:this.$store.state.area_id,
                    consignee:this.consignee,
                    mobile:this.mobile,
                    floor:this.floor,
                    address:this.address,
                    building:this.building,
                    delivery_id:this.delivery_id,
                    is_default:this.is_default,
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                }
            })
            .then(this.add_address)
            .catch(function (error) {
                console.log(error)
            })
        },
        add_address (res) {
            let that = this
            // let date = eval('('+res.data+')')
            let date = res.data
            if(date.status == 200){
                this.$message({
                    type: 'success',
                    message: date.message,
                })  
                setTimeout(function(){
                    that.back()
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
            this.schoolAddress = index[0].value + index[1].value + index[2].value +"层"
            this.delivery_id = this.delivery.data[this.$store.state.area_id][index[1].index].child[index[2].index].delivery_id
        },
        getSchool () {
            this.$http({
                method: 'post',
                // url: 'mobile/api/q',
                url:'api/buyer/delivery',
                data: {
                    url:'http://api.dqvip.cc/buyer/delivery',
                    area_id:this.$store.state.area_id,
                    q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                }
            })
            .then(this.getAllSchool)
            .catch(function (error) {
                console.log(error);
            });
        },
        getAllSchool (res) {
            let date = res.data
            this.delivery = date
            // const date = eval('('+ res.data +')')
            const result = []
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
