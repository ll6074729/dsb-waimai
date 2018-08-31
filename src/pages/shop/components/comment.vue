<template>
    <div>
        <div class="comment-label">
            <div class="label" :class="{active:chooes== 0}" @click="replace(0,'')">全部 {{shop.all}}</div>
            <div class="label" :class="{active:chooes== 1}" @click="replace(1,'picture')">有图 {{shop.picture}}</div>
            <div class="label" :class="{active:chooes== 2}" @click="replace(2,'good')">好评 {{shop.good}}</div>
            <div class="label" :class="{active:chooes== 3}" @click="replace(3,'bad')">差评 {{shop.bad}}</div>
        </div>
        <div class="comment-list">
            <div class="list-item" v-for="item in evaluation" :key="item.id" v-if="evaluation.length > 0">
                <div class="item-head">
                    <div class="head-img"><img :src="item.head_pic" alt=""></div>
                    <div class="head-name">{{item.username}}</div>
                    <div class="head-time">{{item.created_at}}</div>
                    <el-rate
                        class="head-rate"
                        v-model="item.service_rank"
                        disabled
                        show-text
                        text-color="#ff9900"
                        score-template="{value}"
                        >
                    </el-rate>
                </div>
                <div class="item-content">
                    <div class="comment-text">
                        {{item.content}}
                    </div>
                    <div class="comment-img" >
                        <img :src="itemImg" alt="" v-for="itemImg in item.images" :key="itemImg.index">
                    </div>
                    <div class="shop-reply" v-if="item.comment_reply.length > 0" v-for="reply in item.comment_reply" :key="reply.comment_id">
                        <strong>商家回复:</strong>
                        <span> {{reply.content}}</span>
                    </div>
                </div>
                <div class="comment-food">
                    <div class="food-label" v-for="foodname in item.order_goods" :key="foodname.goods_id">{{foodname.goods_name}}</div>
                </div>
            </div>
            <div v-if="evaluation.length == 0">
                暂无评论
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"ShopComment",
    props:{
        shop:Object
    },
    data () {
        return {
            chooes:'0',
            evaluation:[],
        }
    },
    mounted () {
        this.isevaluation()
    },
    methods : {
        replace(index,type){
            this.chooes = index
            this.isevaluation (type) 
        },
        // 获取评论列表
        isevaluation (type) {
            let date = {}
            date.shop_id = this.$route.params.id
            date.page_size = 300
            if(!type == ''){
                date.type = type
            }
            date.url = 'http://api.dqvip.cc/buyer/evaluation'
            date.q_type = 'post'
            this.$http({
                method: 'post',
                url:"/api/buyer/evaluation",
                // url: '/mobile/api/q',
                data: date,
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY2YmM0MzY4MmZhNDU0YjlmODA1Mjc4MzA0NzI4MmY0MWE3YjNjY2FiZjI1MGIyMTI0MjFkMzgwZmVmYmZmNjU5Y2JmYTI1OWJkNjZlMDEzIn0.eyJhdWQiOiIyIiwianRpIjoiZjZiYzQzNjgyZmE0NTRiOWY4MDUyNzgzMDQ3MjgyZjQxYTdiM2NjYWJmMjUwYjIxMjQyMWQzODBmZWZiZmY2NTljYmZhMjU5YmQ2NmUwMTMiLCJpYXQiOjE1MzU0MjQwMTMsIm5iZiI6MTUzNTQyNDAxMywiZXhwIjoxNTM4MDE2MDEzLCJzdWIiOiIzOCIsInNjb3BlcyI6WyIqIl19.kCp29IMkDLCJBvkbKIjZPpEL308wCI7XkEa1gRXM2jlLrxY_1D-UbvQ51JV9iycgPDykXHurNVhQB80ZexaNj9FoyaTDm6OXA-9ethmm_T2EOLBxk2J9Lg4zF7pYyRbVWmjQDthYSlPs2HXSBQnCn6IL53HhtUoyRPT0JoxmpIX6G4FriM6mbNeCW5q_r_EI4eap6QDhxQeaOvAMrukhdW3jsunmqObtkBxBKeyzfwPBGh6If8xealCnxnkpKeeg2X4sKh_qarxINU62ta85tdiarel9ctYrRCVV7e4JwggIy4-TkdL6eI1G7mYADDzvv7dHQ7FbRYGEWs7MKB7Glu7GpTYh3BCnAQFgx7IsiVIDUburT3R0V68BShuqdDsShHJO-RBQ6ybfOCw0Ejazp9FWr3fmmmH0_zbffJeNuQsKiOUeqiy6x9E3OGBzwJ7BIqCFomFv-Cv-HSL9zgHQ3YU-JNWrIRzH6zFuvd4aMBWzUMh32l5tg5ShwqEpiCPvSAZ1uIFQyw8T6sXmwQ5LViFJ9AAn0NV-dTYnt2t6jgGIZ9kBWGJp2CmIDvYL0quksCIVxnec5ZArdZcfIQqI5jkW8rMcKsGmrKxFukNX6z4MCxEzZsgyOktqeHcV10H_Yq6MdfJWch6n0INsgNAZJPFaCG1l0WrKDPStlnjZb_I'
                }
            })
                .then(this.getevaluation)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getevaluation (res) {
            // console.log(res)
            // let date = eval('('+res.data+')') 
            let date = res.data
            this.evaluation = date.data.data
        }
    }
}
</script>
<style lang="stylus" scoped>
    .list-item >>> .el-rate__icon
        font-size 2.66vw
        // color #4897fe!important
    .list-item >>> .el-rate__text
        font-size 2.66vw
        color #4897fe!important
    .list-item >>> .el-icon-star-on
        color: rgb(239, 242, 247);
    .comment-label
        box-shadow 0px 5px 20px 0px rgba(0, 0, 0, 0.05)
        padding 2.66vw
        padding-bottom 0
        .label
            display inline-block
            margin-bottom 2.66vw
            font-size 3.46vw
            padding 1.6vw 2.66vw
            background-color #f7f7f7
            color #999
            margin-right 2.66vw
        .active
            background-color rgba(72, 151, 254, 0.2)
            color #1b8bdb
    .comment-list
        .list-item
            padding 5.33vw 2.66vw
            border-top 1px solid #f7f7f7
            .item-head
                line-height 5.33vw
                color #999
                font-size 3.2vw
                .head-img
                    display inline-block
                    img 
                        width 5.33vw
                        height 5.33vw
                        border-radius 50%
                        vertical-align bottom
                .head-name
                    display inline-block    
                    margin-left 2.66vw  
                .head-time
                    float right 
                .head-rate
                    margin-top 2.66vw
            .item-content
                .comment-text
                    font-size 3.2vw
                    line-height 5vw
                .comment-img
                    display inline-block
                    margin 2.66vw 0
                    img 
                        width 18vw
                        height 18vw
                        margin-right 1.33vw
                .shop-reply
                    font-size 2.93vw
                    line-height 4.8vw
                    color #999      
                    padding 2.66vw   
                    background-color rgba(70, 154, 254, 0.1)
            .comment-food
                margin-top 2.66vw
                .food-label
                    display inline-block
                    padding 1.86vw 2.66vw
                    color #469afe
                    border 1px solid #92c1ff
                    border-radius .8vw
                    background-color #ecf5ff
                    margin-right 3vw
            &:last-child
                padding-bottom 20vw       
</style>    
