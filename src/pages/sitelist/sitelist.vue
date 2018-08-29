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
                url:'/mobile/api/q',
                // url:'api/buyer/default_address',
                data: {
                    url:'http://api.dqvip.cc/buyer/default_address',
                    address_id:address_id,
                    q_type:'post'
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                // }
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
            this.defaultAddress()
        },
        getsddr () {
            this.$http({
                method: 'get',
                url:'/mobile/api/q',
                // url:'api/buyer/list_address',
                data: {
                    url:'http://api.dqvip.cc/buyer/list_address',
                    q_type:'get'
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                // }
            })
                .then(this.getaddrList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getaddrList (res){
            const date = eval('('+res.data+')')
            // let date = res.data
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
                this.$http({
                    method: 'post',
                    url:'/mobile/api/q',
                    url:'api/buyer/del_address',
                    data: {
                        url:'http://api.dqvip.cc/buyer/del_address',
                        q_type:'delete',
                        address_id:msg,
                    },
                    // headers :{
                    //     'Accept':'application/json',
                    //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                    // }
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
