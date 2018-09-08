<template>
    <div>
        <collect-head :title="title"></collect-head>
        <div class="complaint-list">
            <ul class="pd20">
                <li class="item" v-for="(item,index) in this.complaintList" :key="item.order_id">
                    <div class="item-head df fs24 pd20">
                        <div>投诉时间：{{item.created_at}}</div>
                        <div v-if="item.status == 0" class="status-color">处理中</div>
                        <div v-if="item.status == 1" class="status-color">处理中</div>
                        <!-- <div v-if="item.status == 1">已处理</div> -->
                    </div>
                    <div class="item-content pd20 fs24">
                        <p>投诉详情</p>
                        <div style="margin:3vw 0">{{item.content}}</div>
                        <div class="item-picture">
                            <img :src="pic" alt="" v-for="pic in picture[index]" :key="pic" :onerror="defaultImg">
                        </div>
                    </div>
                    <div class="item-foot fs24 pd20">
                        <!-- <div>订单号：{{item.order.order_sn}}</div> -->
                        <div>投诉类型：<span v-if="item.type == 0">配送问题</span><span v-if="item.type == 1">餐品质量</span><span v-if="item.type == 2">平台服务</span></div>
                    </div>
                </li>
            </ul>
        </div>    
        <div v-if="this.complaintList.length < 1" style="text-align:center;margin-top:3vw">
            暂无投诉
        </div>
    </div>
</template>
<script>
import CollectHead from '../../componentss/headback'
export default {
    name:"complaintList",
    components:{
        CollectHead
    },
    data () {
        return {
            title:'投诉列表',
            complaintList:[],
            picture:[],
            defaultImg: 'this.src="' + require('../../assets/img/defaultshop.png') + '"'
        }
    },
    mounted () {
        this.getcomplaint()
    },
    methods:{
        getcomplaint () {
             this.$http({
                method: 'post',
                url: 'mobile/api/q',
                data: {
                    url:'http://api.dqvip.cc/buyer/complaint_list',
                    q_type:'get'
                },
            })
                .then(this.getcomplaintList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getcomplaintList (res) {
            let date1 = eval('('+res.data+')') 
            this.complaintList = date1.data
            for(let i in date1.data) {
                if(date1.data[i].picture != null){
                    this.picture[i] = date1.data[i].picture.substring(0,date1.data[i].picture.length-1).split(',')
                } 
            }
        },
    },
}
</script>
<style lang="stylus" scoped>
    .complaint-list
        ul
            .item
                margin 2.66vw 0
                box-shadow 0px 0px 20px 0px rgba(0, 0, 0, 0.1)
                .item-head
                    height 10.66vw
                    background-color  #469afe
                    line-height 10.66vw
                    color #fff
                .item-content
                    p
                        margin 2vw 0
                        color #469afe
                    .item-picture
                        img 
                            width 13.33vw
                            height 13.33vw
                            margin-right 2.66vw    
                .item-foot 
                    color #999
                    div
                        padding 2.66vw 0        
                        

</style>

