<template>
    <div>
         <div class="head df">
            <div class="head-back" @click="back()">
                <img src="../../assets/img/back.png" alt="">
            </div>
            <router-link tag="div" to="/site">
                新增地址
            </router-link>
        </div>

        <div class="sitelist" v-show="isshow" v-for="item in list" :key="item.address_id">
            <div class="site-item">
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
                        {{item.address}}
                    </div>
                </div>
                <div class="df">
                    <div class="defaultsite" :class="{active:item.is_default == 1}" @click="setDefault(item.address_id)">

                        <img src="../../assets/img/uncheck.png" v-if="item.is_default == 0" alt="">
                        <img src="../../assets/img/check.png" v-if="item.is_default == 1" alt="">
                        <span>默认地址</span>
                    </div>
                    <div class="handle">
                        <div class="hand-edit">
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
            暂时没有地址
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
        }
    },
    methods: {
        defaultAddress () {
            for(let i in  this.list){
                if(this.list[i].is_default == 1){
                    // this.$store.state.defaultAddress = this.addressList[i]
                    this.$store.dispatch("defaultAddress",JSON.stringify(this.list[i]))
                }
            }
        },
        // 修改默认地址
        setDefault (address_id){
            this.$http({
                method: 'post',
                url:"/api/buyer/default_address",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    address_id:address_id,
                    // q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.setDefaultfuc)
                .catch(function (error) {
                    console.log(error);
                })
        },
        setDefaultfuc (res) {
            console.log(res)
            this.list = res.data.data
            this.defaultAddress()
        },
        getsddr () {
            // this.$http({
            //     method: 'post',
            //     url: 'mobile/api/q',
            //     data: {
            //         url:'http://api.dqvip.cc/buyer/list_address',
            //         q_type:'get'
            //     },
            // })
            this.$http({
                method: 'get',
                url:"/api/buyer/list_address",
                data: {
                    // url:'http://api.dqvip.cc/buyer/shop_info',
                    // q_type:'post'
                },
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.getaddrList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getaddrList (res){

            // const date = eval('('+res.data+')')
            let date = res.data
            console.log(date)
            this.$store.dispatch('addressList',date.data)
            if(date.data == ''){
                this.isshow = false
            }else{
                this.isshow = true
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
                // this.$http({
                //     method: 'post',
                //     url: 'mobile/api/q',
                //     data: {
                //         url:'http://api.dqvip.cc/buyer/del_address',
                //         address_id:msg,
                //         q_type:'delete'
                //     },
                // })
                this.$http({
                    method: 'delete',
                    url:"/api/buyer/del_address",
                    data: {
                        // url:'http://api.dqvip.cc/buyer/shop_info',
                        // q_type:'post'
                        address_id:msg,
                    },
                    headers :{
                        'Accept':'application/json',
                        'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                    }
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
            
            // let date = eval('('+res.data+')')
            let date = res.data
            console.log(date)
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
        height 10.66vw
        padding 0 2.66vw
        line-height 10.66vw
        .head-back
            img 
                width 2.13vw
                height 4.13vw
    .siteno
        text-align center            
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
