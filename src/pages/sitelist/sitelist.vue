<template>
    <div>
        <div class="head df">
            <div class="head-back" @click="back()">
                <img src="../../assets/img/back.png" alt="">
            </div>
            <router-link tag="div" :to="{path:'/site',query:{page:this.$route.query.page,cart_id:this.$route.query.cart_id}}">
                新增地址
            </router-link>
        </div>
        <div class="siteBox">
            <div class="sitelist" v-show="isshow" v-for="(item,index) in list" :key="item.address_id">
                <div class="site-item" v-if="item.area_id == area_id">
                    <hr class="hr20">
                    <div class="siteinfo">
                        <div class="userinfo">
                            <div class="username">
                                {{item.consignee}}
                            </div>
                            <div class="userphone">
                                {{item.mobile}}
                            </div>
                        </div>
                        <div class="sitename fs24">
                            <!-- {{item.area.address}} -->
                            {{item.building}}{{item.address}}
                        </div>
                    </div>
                    <div class="df">
                        <div class="defaultsite" :class="{active:item.is_default == 1}" @click="setDefault(item.address_id)">

                            <img src="../../assets/img/uncheck.png" v-if="item.is_default == 0" alt="">
                            <img src="../../assets/img/check.png" v-if="item.is_default == 1" alt="">
                            <span>默认地址</span>
                        </div>
                        <div class="handle">
                            <div class="hand-edit" @click="edit_address(index)">
                                编辑
                            </div>
                            <div class="hand-delete" @click="open2(item.address_id)">
                                删除
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="siteno" v-show="!isshow">
                <img src="../../assets/img/noaddress.png" alt="" >
                <div>
                    您还没有设置宿舍地址哦 o(￣▽￣)ｄ 
                </div>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name:"sitelist",
    data () {
        return {
            isshow:'',
            list:[],
            area_id:this.$store.state.area_id
        }
    },
    methods: {
        edit_address (num) {
            this.$router.push({path:'/site',query:{address_num:num,page:this.$route.query.page}})
        },
        defaultAddress () {
            for(let i in  this.list){
                if(this.list[i].is_default == 1){
                    // this.$store.state.defaultAddress = this.addressList[i]
                    this.$store.dispatch("defaultAddress",JSON.stringify(this.list[i]))
                    this.$store.dispatch("changedeliveryPrice",this.list[i].delivery.delivery_price)
                }
            }
        },
        // 修改默认地址
        setDefault (address_id){
            this.$http({
                method: 'post',
                url:'/mobile/api/q',
                // url:'api/buyer/default_address',
                data: {
                    url:'http://api.dqvip.cc/buyer/default_address',
                    address_id:address_id,
                    q_type:'post'
                },
            })
                .then(this.setDefaultfuc)
                .catch(function (error) {
                    console.log(error);
                })
        },
        setDefaultfuc (res) {
            console.log(res)
            let date = eval('('+res.data+')')
            // let date = res.data
            this.list = date.data
            if(this.$route.query.page == 'cart'){
                this.$router.go(-1)
            }
            this.defaultAddress()
        },
        getsddr () {
            this.$http({
                method: 'post',
                url:'/mobile/api/q',
                // url:'api/buyer/list_address',
                data: {
                    url:'http://api.dqvip.cc/buyer/list_address',
                    q_type:'get'
                },
            })
                .then(this.getaddrList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getaddrList (res){
            const date = eval('('+res.data+')')
            // let date = res.data
            console.log(date)
            this.$store.dispatch('addressList',date.data)
            if(date.data == ''){
                this.isshow = false
            }else{
                this.isshow = true
                // this.list = []
                this.list = date.data
                // 把列表传给其他子组件
            }
            this.defaultAddress()
        },
        open2(msg) {
            this.$confirm('确认删除该地址?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center:true,
                customClass:"messBox"
            }).then(() => {
                this.$http({
                    method: 'post',
                    url:'/mobile/api/q',
                    // url:'api/buyer/del_address',
                    data: {
                        url:'http://api.dqvip.cc/buyer/del_address',
                        q_type:'delete',
                        address_id:msg,
                    },
                })
                .then(this.issuccess)
                .catch(function (error) {
                    console.log(error)
                })
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })          
            })
        },
        issuccess (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            if(date.status == 200 ){
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
                this.getsddr()
            }else{
                this.$message({
                    type: 'error',
                    message: date.message
                })
            }

        },
        back () {
            // this.$router.go(-1)
            console.log(this.$route.query.page)
            console.log(this.$route.query.cart_id)
            this.$router.go(-1)
           
        },
    },
    watch:{

    },
    mounted () {
        this.getsddr()
    }
}
</script>
<style lang="stylus" scoped>    
    .head
        position fixed
        width 100%
        top 0
        height 10.66vw
        box-sizing border-box
        padding 0 2.66vw
        line-height 10.66vw
        background-color #fff
        .head-back
            img 
                width 2.13vw
                height 4.13vw
    .siteBox
        margin-top 10.66vw
        .siteno
            text-align center     
            color #999
            img 
                width 66.66vw
                height 66.66vw 
                margin-top 21.33vw    
                margin-bottom 5vw      
        .sitelist
            .site-item
                .siteinfo
                    padding 5.33vw
                    border-bottom 1px solid #f7f7f7
                    .userinfo
                        .username,.userphone
                            color #333
                        .userphone
                            float right  
                        .username
                            float left       
                    .sitename
                        clear both     
                        margin-top 10.66vw
                        color #999   
                .df
                    padding 4vw 5.33vw
                    .active
                        color #469afe
                    .defaultsite
                        img 
                            width 4vw 
                            height 4vw  
                            vertical-align bottom 
                            margin-right 2.66vw
                    .handle
                        display flex   
                        color #999
                        .hand-edit
                            margin-right 5vw     
</style>
