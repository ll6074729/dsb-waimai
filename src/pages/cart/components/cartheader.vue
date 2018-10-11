<template>
    <div>
        <div class="cart-head">
            <div  class="cart-head-left" @click="back()">
                <img src="../../../assets/img/back.png" alt="">
            </div>
            <div class="cart-head-text">
                确认订单
            </div>
        </div>
        <router-link class="cart-address" tag="div" :to="{path:'/sitelist',query:{page:'cart',cart_id:this.$route.params.id}}">
            <div class="address-left db">
                <img src="../../../assets/img/address-cart.png" alt="">
            </div>
            <div class="address-content db">
                <div class="address-top">
                    {{this.$store.state.defaultSchool}}{{defaultAddress.building || JSON.parse(this.$store.state.defaultAddress).building}}{{defaultAddress.floor || JSON.parse(this.$store.state.defaultAddress).floor}}楼{{defaultAddress.address || JSON.parse(this.$store.state.defaultAddress).address}}室
                </div>
                <div class="address-info">
                    <strong>{{defaultAddress.consignee || JSON.parse(this.$store.state.defaultAddress).consignee}}</strong>
                    <strong>{{defaultAddress.mobile || JSON.parse(this.$store.state.defaultAddress).mobile}}</strong>
                </div>
            </div>
            <div class="address-right fr">
                <img src="../../../assets/img/right_f7.png" alt="">
            </div>
        </router-link>
        <div class="delivery">
            <div class="fl delivery-left">
                <img src="../../../assets/img/time.png" alt="">
            </div>
            <div class="delivery-content fl">
                <strong class="fl">
                    送达时间
                </strong>
                <span class="fr" @click="show()" ref="timers">尽快送达，预计{{parseInt(timer.value)}}分钟</span>    
            </div>
            <awesome-picker
                ref="picker"
                :data="picker.data"
                :textConfirm="picker.textConfirm"
                @confirm="handlePickerConfirm"
                >
            </awesome-picker>
            <div class="delivery-right fr" @click="show()">
                <img src="../../../assets/img/right_f7.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"cartheader",
    props:{
        timer:Object,
        business_hours:String
    },
    data () {
        return {
            defaultAddress:[],
            Servicetime:'',
            picker: {
                textConfirm:"确定",
                data: [
                    {
                        value: '立即送出',
                        children: [
                            { value: '立即送出' }
                        ]
                    }
                ]
            },
        } 
    },
    mounted () {
        this.initAddress()
        this.coumputertime()
        this.init()
        
    },
    methods:{
        handlePickerConfirm (index,value) {
            if(index[0].value == '立即送出'){
                this.$refs.timers.innerText = '尽快送达，预计'+parseInt(this.timer.value)+'分钟'
                this.Servicetime = 0
                this.$emit('estimated',0)
            }else{
                this.$refs.timers.innerText = '预定送达时间'+index[0].value+':'+index[1].value
                this.Servicetime = index[0].value+':'+index[1].value
                this.$emit('estimated',index[0].value+':'+index[1].value)
            }
        },
        coumputertime () {
            //把所有时间加入到picker 里面
            let nowtime = (Date.parse(new Date())/1000 + parseInt(this.timer.value) * 60)*1000
            var nowhours = new Date(nowtime)
            let timefirst = []
            let endtime = this.business_hours.substring(this.business_hours.length-8,this.business_hours.length-6)//结束小时

            // 设置立即送达
            timefirst[0] = {}
            timefirst[0].value = '立即送出'
            timefirst[0].children = []
            timefirst[0].children[0] = {}
            timefirst[0].children[0].value = '立即送出'
            for (let i = 1;i <= endtime ;i++){
                timefirst[i] = {}
                timefirst[i].value = i
                timefirst[i].children = []
                for(var k = 0; k < 6; k++){
                    if(i == endtime){
                        timefirst[i].children[0] = {}
                        timefirst[i].children[0].value = '00'
                    }else{
                        timefirst[i].children[k] = {}
                        timefirst[i].children[k].value = k+'0'
                    }
                    
                }
            }
            // 获得店铺营业时间
            let starttime = this.business_hours.substring(0,2)
            // 开始时间(小时)
            if(nowhours.getHours() > starttime && nowhours.getHours() < endtime){
                timefirst.splice(1,nowhours.getHours()-1) //第一个是立即送出
                if(nowhours.getMinutes() > 50){
                    // timefirst.splice(1,2)
                }
            }else{
                // 大于结束时间
                timefirst.splice(1,endtime)
            }
            // console.log(timefirst)
            //开始时间(分钟)
            if(timefirst.length ==1){

            }else{
                let second = 0
                for(let i = 0 ;i < timefirst[1].children.length; i++){
                    // console.log(parseInt(timefirst[1].children[i].value))
                    // console.log(parseInt(nowhours.getMinutes()))
                    if(parseInt(timefirst[1].children[i].value) < parseInt(nowhours.getMinutes())){
                        second ++
                    }
                }
                timefirst[1].children = timefirst[1].children.splice(second,6)
            }
        
            this.picker.data = timefirst
            
        },
        show () {
            this.$refs.picker.show();
        },
        back () {
            this.$router.go(-1)
        },
        // 初始化页面
        init () {
            if(!this.defaultAddress)
                this.$confirm('请先设置默认收货地址', '提示', {
                    confirmButtonText: '确定',
                    type: 'warning',
                    center: true,
                    showCancelButton:false,
                    showClose:false,
                    closeOnClickModal:false
                }).then(() => {
                    this.$router.push({path:'/sitelist'})
                })
        },

        // 获取默认地址
        initAddress () {
            console.log('默认地址设置成功')
            this.defaultAddress = eval('('+this.$store.state.defaultAddress+')')
        }
    }
}
</script>
<style lang="stylus" scoped>
    @import "~css/style"
    .cart-head
        height 10.66vw
        line-height 10.66vw
        position fixed
        top 0
        border-bottom 1px solid #f7f7f7
        width 100%
        background-color #fff
        .cart-head-left 
            margin-left 2.13vw
            display inline-block
            img 
                width 2.13vw
                height 4.13vw
                margin-top -1vw
        .cart-head-text
            display inline-block
            margin-left 2.66vw     
            font-size 4.26vw
    .cart-address
        margin-top 13.33vw
        padding 5.33vw 2.66vw    
        border-bottom 1px solid #f7f7f7
        .address-left
            margin-left 2.66vw
            margin-right 4.66vw
            img 
                width 4.8vw
                height 5.86vw
        .address-content
            vertical-align middle
            width 80%
            line-height 150%
            .address-top 
                font-size 3.73vw
                font-size 4.5vw
            .address-info
                font-size 3.66vw
                color #999
                margin-top 4vw
                max-width 75vw
                ellipsis()
        .address-right 
            margin-top 3vw
            img 
                width 2.13vw
                height 4vw
    .delivery
        padding 0 2.66vw
        line-height 13.33vw
        height 13.33vw
        .delivery-left
            img 
                width 4.8vw
                height 4.8vw
                margin-right 4.66vw
                margin-left 3vw
                margin-top -1vw
        .delivery-content
            width 75vw
            strong 
                font-size 3.73vw
                color #333
                font-weight bold
            span 
                font-size 3.2vw
                color #4897fe
        .delivery-right 
            img 
                width 2.13vw
                height 4vw    
</style>
