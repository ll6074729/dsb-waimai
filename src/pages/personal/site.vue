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
            consignee:'',
            mobile:'',
            is_default:1,
            floor:'',
            address:'',
            building:'',
            delivery_id:5, //楼层ID
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
            // this.$http({
            //     method: 'post',
            //     url: 'mobile/api/q',
            //     data: {
            //         url:'http://api.dqvip.cc/buyer/edit_address',
            //         area_id:4,
            //         consignee:this.consignee,
            //         mobile:this.mobile,
            //         floor:this.floor,
            //         address:this.address,
            //         building:this.building,
            //         delivery_id:this.delivery_id,
            //         is_default:1,
            //         q_type:'post'
            //     }
            // })

            this.$http({
                 method: 'post',
                // url: 'mobile/api/q',
                url:"/api/buyer/edit_address",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    // q_type:'post'
                    area_id:4,
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
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
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
            console.log(date)
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
            // console.log(index)
            this.building = index[1].value
            this.floor = 1
            this.schoolAddress = index[0].value + index[1].value + "1层"
        },
        getSchool () {
            // this.$http({
            //     method: 'post',
            //     url: 'mobile/api/q',
            //     data: {
            //         url:'http://api.dqvip.cc/buyer/delivery',
            //         area_id:4,
            //         q_type:'post'
            //     }
            // })
            this.$http({
                method: 'post',
                url: '/api/buyer/delivery',
                data: {
                    // url:'http://api.dqvip.cc/buyer/delivery',
                    area_id:4,
                    // q_type:'post'
                },
                 headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
            .then(this.getAllSchool)
            .catch(function (error) {
                console.log(error);
            });
        },
        getAllSchool (res) {
            let date = res.data
            // const date = eval('('+ res.data +')')
            const result = []
            // const date =  res.data 
            console.log(date)
            for(let i in date.data){
                var re = {}
                re.value = date.data[i].build_name
                result.push(re)
            }
            console.log(result)
            this.picker.data[0].children = result
        }
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
