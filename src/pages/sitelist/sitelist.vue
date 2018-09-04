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

        <div class="sitelist" v-show="isshow" v-for="(item,index) in list" :key="item.address_id">
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
        edit_address (num) {
            // console.log(num)
            this.$router.push({path:'/site',query:{address_num:num}})
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
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY1YWE4OTRmYmZkMDRiNzU4Yzk2ZGRlOTY0NzcyMWQ5M2IzM2Q1Mzk1NGZlNTAwMmFlNTQ1ODNkMjZlNjZiMDhiMWYxYmI3ZGIyOWY5MzYzIn0.eyJhdWQiOiIyIiwianRpIjoiZjVhYTg5NGZiZmQwNGI3NThjOTZkZGU5NjQ3NzIxZDkzYjMzZDUzOTU0ZmU1MDAyYWU1NDU4M2QyNmU2NmIwOGIxZjFiYjdkYjI5ZjkzNjMiLCJpYXQiOjE1MzU3MTE1MTIsIm5iZiI6MTUzNTcxMTUxMiwiZXhwIjoxNTM4MzAzNTEyLCJzdWIiOiI2NSIsInNjb3BlcyI6WyIqIl19.sr8YCf3ZR1Tc8P4IU8gLK15WTdRwQy-DdZNxSND_C-sTohzhEfuAz6ZqVPnUmCFU9Stb7o94vKBj-SFg8695SxdnQ6KTsln5jbl0zGqZPpa00nyW-2q_PDu8aKTv78inCEtl_bfsJ7XLz9wOnn8LfM9TmQJz4OXRI52baKpsBZ5Dxapp90uvGFlK26rAuzClXasvCSlH9YuC7J0rLP8yhuc8iFscWxN8YhARPIswVlG9_Mij2-DJdwAiqE_3XPxHPLrxIWsD3Ud-NYs0YbqzkXrEAEbDhllxuDW1VxNH1nvX0qNhvPUZ7WV3GuOfJgbIECvpaBfpQ7EWPZp1bQVFktgutGO0RMbATjE6IaD-tlycB46wIxxintgrDg-KGIowdcGXY274hXJCi8smPF0zPgN7UIT-lnddC6ySkldyWtcdWM0jzsUQvXwt2tmoJ1izcysJHkWQUTRU7Y3BB9oEL1qERCa8qCp8mXnMmXNTtUzRhRB2K2-IBstYKKFdvNl4x0FQMehqSHevkAdOixObkwKI5xoHxqdVouv1W01QeeU4nmpT12yQqZl6XL8b5tNBlAel8CbEd23tc3wPDeXdoxyB-kxYGDqqbocRI4rZs5wnuY32D8bweuv3iCf6RgpIgkKNpdWoZmbNW5QOWMfDCn7BRsLG1VXNs4OLryFRNCk'
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
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY1YWE4OTRmYmZkMDRiNzU4Yzk2ZGRlOTY0NzcyMWQ5M2IzM2Q1Mzk1NGZlNTAwMmFlNTQ1ODNkMjZlNjZiMDhiMWYxYmI3ZGIyOWY5MzYzIn0.eyJhdWQiOiIyIiwianRpIjoiZjVhYTg5NGZiZmQwNGI3NThjOTZkZGU5NjQ3NzIxZDkzYjMzZDUzOTU0ZmU1MDAyYWU1NDU4M2QyNmU2NmIwOGIxZjFiYjdkYjI5ZjkzNjMiLCJpYXQiOjE1MzU3MTE1MTIsIm5iZiI6MTUzNTcxMTUxMiwiZXhwIjoxNTM4MzAzNTEyLCJzdWIiOiI2NSIsInNjb3BlcyI6WyIqIl19.sr8YCf3ZR1Tc8P4IU8gLK15WTdRwQy-DdZNxSND_C-sTohzhEfuAz6ZqVPnUmCFU9Stb7o94vKBj-SFg8695SxdnQ6KTsln5jbl0zGqZPpa00nyW-2q_PDu8aKTv78inCEtl_bfsJ7XLz9wOnn8LfM9TmQJz4OXRI52baKpsBZ5Dxapp90uvGFlK26rAuzClXasvCSlH9YuC7J0rLP8yhuc8iFscWxN8YhARPIswVlG9_Mij2-DJdwAiqE_3XPxHPLrxIWsD3Ud-NYs0YbqzkXrEAEbDhllxuDW1VxNH1nvX0qNhvPUZ7WV3GuOfJgbIECvpaBfpQ7EWPZp1bQVFktgutGO0RMbATjE6IaD-tlycB46wIxxintgrDg-KGIowdcGXY274hXJCi8smPF0zPgN7UIT-lnddC6ySkldyWtcdWM0jzsUQvXwt2tmoJ1izcysJHkWQUTRU7Y3BB9oEL1qERCa8qCp8mXnMmXNTtUzRhRB2K2-IBstYKKFdvNl4x0FQMehqSHevkAdOixObkwKI5xoHxqdVouv1W01QeeU4nmpT12yQqZl6XL8b5tNBlAel8CbEd23tc3wPDeXdoxyB-kxYGDqqbocRI4rZs5wnuY32D8bweuv3iCf6RgpIgkKNpdWoZmbNW5QOWMfDCn7BRsLG1VXNs4OLryFRNCk'
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
                    // url:'api/buyer/del_address',
                    data: {
                        url:'http://api.dqvip.cc/buyer/del_address',
                        q_type:'delete',
                        address_id:msg,
                    },
                    // headers :{
                    //     'Accept':'application/json',
                    //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY1YWE4OTRmYmZkMDRiNzU4Yzk2ZGRlOTY0NzcyMWQ5M2IzM2Q1Mzk1NGZlNTAwMmFlNTQ1ODNkMjZlNjZiMDhiMWYxYmI3ZGIyOWY5MzYzIn0.eyJhdWQiOiIyIiwianRpIjoiZjVhYTg5NGZiZmQwNGI3NThjOTZkZGU5NjQ3NzIxZDkzYjMzZDUzOTU0ZmU1MDAyYWU1NDU4M2QyNmU2NmIwOGIxZjFiYjdkYjI5ZjkzNjMiLCJpYXQiOjE1MzU3MTE1MTIsIm5iZiI6MTUzNTcxMTUxMiwiZXhwIjoxNTM4MzAzNTEyLCJzdWIiOiI2NSIsInNjb3BlcyI6WyIqIl19.sr8YCf3ZR1Tc8P4IU8gLK15WTdRwQy-DdZNxSND_C-sTohzhEfuAz6ZqVPnUmCFU9Stb7o94vKBj-SFg8695SxdnQ6KTsln5jbl0zGqZPpa00nyW-2q_PDu8aKTv78inCEtl_bfsJ7XLz9wOnn8LfM9TmQJz4OXRI52baKpsBZ5Dxapp90uvGFlK26rAuzClXasvCSlH9YuC7J0rLP8yhuc8iFscWxN8YhARPIswVlG9_Mij2-DJdwAiqE_3XPxHPLrxIWsD3Ud-NYs0YbqzkXrEAEbDhllxuDW1VxNH1nvX0qNhvPUZ7WV3GuOfJgbIECvpaBfpQ7EWPZp1bQVFktgutGO0RMbATjE6IaD-tlycB46wIxxintgrDg-KGIowdcGXY274hXJCi8smPF0zPgN7UIT-lnddC6ySkldyWtcdWM0jzsUQvXwt2tmoJ1izcysJHkWQUTRU7Y3BB9oEL1qERCa8qCp8mXnMmXNTtUzRhRB2K2-IBstYKKFdvNl4x0FQMehqSHevkAdOixObkwKI5xoHxqdVouv1W01QeeU4nmpT12yQqZl6XL8b5tNBlAel8CbEd23tc3wPDeXdoxyB-kxYGDqqbocRI4rZs5wnuY32D8bweuv3iCf6RgpIgkKNpdWoZmbNW5QOWMfDCn7BRsLG1VXNs4OLryFRNCk'
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
