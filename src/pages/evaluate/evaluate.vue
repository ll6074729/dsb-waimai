<template>
    <div>
        <head-back :title="title"></head-back>
        <hr class="hr20">
        <assess-take 
            :page='take'
            :takeinfo="takeinfo"
            :confirm_time="confirm_time"
            :ensure_time="ensure_time"
            @changetake="changetake"
            v-if="confirm_time"
            >
        </assess-take>
        <hr class="hr20">
        <assess-take 
            :shopinfo="shopinfo"
            :page='shop'
            @changeshop="changeshop"
            >
        </assess-take>
        <assess-shop 
            :orderinfo="orderinfo"
            @changecontent="changecontent"
            @changeImg="changeImg"
            @changegoods="changegoods"
            >
        </assess-shop>
        <div class="submit">
            <div class="submit-btn" @click="submitBox">
                提交评价
            </div>
        </div>
    </div>

</template>
<script>
import HeadBack from "../../componentss/headback"
import AssessTake from "./components/assess-take"
import AssessShop from "./components/assess-shop"
export default {
    name:"evaluate",
    components:{
        HeadBack,
        AssessTake,
        AssessShop,
    },
    data () {
        return {
            title:'订单评价',
            shop:'shop',
            take:'take',
            shopinfo:{},
            takeinfo:{},
            orderinfo:[],
            deliver_rank:'',
            service_rank:'',
            img:'',
            content:'',
            goods:[],
            confirm_time:null,
            ensure_time:null,
        }
    },
    mounted () {
        this.order_info()
        this.getlist()
    },
    methods:{
        submitBox () {
            let date = {}
            date.order_id = this.$route.query.order_id
            date.service_rank = this.service_rank || 5
            date.deliver_rank = this.deliver_rank || 5
            if(!this.content == ''){
                date.content = this.content
            }
            if(!this.img == ''){
                date.img = this.img
            }
            if(this.goods.length > 0){
                date.goods = this.goods
            }
            date.url = 'http://api.dqvip.cc/buyer/submit_evaluation',
            date.q_type = 'post'
            this.$http({
                method: 'post',
                url: '/mobile/api/q',
                // url:'api/buyer/submit_evaluation',
                data: date,
            })
                .then(this.submitinfo)
                .catch(function (error) {
                    console.log(error);
                })
        },
        submitinfo (res) {
            let that = this
            let date = eval('('+res.data+')')
            console.log(date,6666)
            // console.log(liu,112333654)

            if(date.status == 200){
                this.$message({
                    type:'success',
                    message:'评价成功'
                })
                setTimeout(that.$router.push({path:'/order'}),3000)
            }
        },
        changetake (msg) {
            console.log(msg,156)
            this.deliver_rank = msg
        },
        changeshop (msg) {
            this.service_rank = msg
        },
        changecontent(content){
            this.content = content
        },
        changeImg(img){
            this.img = img
        },
        changegoods(goods){
            this.goods = goods
        },
        // 订单信息
        order_info () {
            this.$http({
                method: 'post',
                url: '/mobile/api/q',
                // url:'api/order_info',
                data: {
                    url:'http://api.dqvip.cc/order_info',
                    q_type:'post',
                    order_id:this.$route.query.order_id,
                    order_sn:this.$route.query.order_sn
                },
            })
                .then(this.getorder_info)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getorder_info (res) {
            let date1 = eval('('+res.data+')')
            // let date1 = res.data
            let date = date1.data
            this.orderinfo = date.order_goods
            this.takeinfo = date.order_ps
            this.ensure_time = date.ensure_time.replace(/\-/g, "/")
            this.confirm_time = date.confirm_time.replace(/\-/g, "/")
        },

        getlist () {
            // 获取店铺信息 传一个店铺ID
            this.$http({
                method: 'post',
                url: '/mobile/api/q',
                // url:'api/buyer/shop_info',
                data: {
                    url:'http://api.dqvip.cc/buyer/shop_info',
                    shop_id:this.$route.query.shop_id,
                    q_type:'post'
                },
            })
                .then(this.getlistbox)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getlistbox(res){
            let date = eval('('+res.data+')')
            // let date = res.data.data
            this.shopinfo = date.data
            // this.shopinfo.addr = date.addr
            // this.shopinfo.shop_name = date.shop_name
        },
    }
}
</script>
<style lang="stylus" scoped>
    .submit
        background-color #f7f7f7
        text-align center
        padding-bottom 13.33vw
        padding-top 6vw
        .submit-btn
            background-image linear-gradient(90deg, 
            #4c91fe 0%, 
            #41a1fe 33%, 
            #35b0fd 65%, 
            #4c91fe 100%);
            color #ffffff
            width 94.66vw
            height 13.33vw
            margin-left 2.66vw
            line-height 13.33vw
</style>
