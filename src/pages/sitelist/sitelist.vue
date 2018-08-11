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
                    <div class="defaultsite" :class="{active:is_default}">
                        <img src="../../assets/img/uncheck.png" alt="">
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
        getsddr () {
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
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
            console.log(date)
            if(date.data == ''){
                this.isshow = false
            }else{
                this.isshow = true
                this.list = date.data
                console.log()
            }
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
                    url: 'mobile/api/q',
                    data: {
                        url:'http://api.dqvip.cc/buyer/del_address',
                        address_id:msg,
                        q_type:'delete'
                    },
                })
                .then(this.issuccess)
                .catch(function (error) {
                    console.log(error);
                });
                
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        issuccess (res) {
            let date = eval('('+res.data+')')
            console.log(date)
            this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
        },
        back () {
            this.$router.go(-1)
        },
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
