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
            comment:[{id:1,name:"一直下雨",userImg:"https://bpic.588ku.com/element_water_img/18/07/03/32ba65ec9c2ed72759a09e287caa26ab.jpg",time:"2017-08-12 12:15",rate:4,content:"这家店的味道不错，这几天一直在这里吃，室友都说好这家店的味道不错，这几天一直在这里吃，室友都说好",images:["https://bpic.588ku.com/element_water_img/18/06/12/cd6ca398b1888c04effaa03663de9881.jpg","https://bpic.588ku.com/element_water_img/18/06/12/b5206ed1949f294ef52fe10701e55cd3.jpg"],reply:"感谢您对小店的认可，祝您用餐愉快，我们会继续努力！用餐过程中如有任何问题，您可随时联系我们。我们会第一时间为您服务，谢谢！",commodity:["小计面包","烤肉饭"]},
            {id:2,name:"干死小菠菜",userImg:"https://bpic.588ku.com/element_water_img/18/07/14/77926eb9de021e758a0448d618d06ff6.jpg",time:"2017-08-12 12:15",rate:4.6,content:"这家店的味道不错，这几天一直在这里吃，室友都说好这家店的味道不错，这几天一直在这里吃，室友都说好",images:["https://bpic.588ku.com/element_water_img/18/06/12/cd6ca398b1888c04effaa03663de9881.jpg","https://bpic.588ku.com/element_water_img/18/06/12/b5206ed1949f294ef52fe10701e55cd3.jpg"],reply:"你好啊",commodity:["小计面包"]},
            {id:3,name:"干死高波波",userImg:"https://bpic.588ku.com/element_water_img/18/07/14/77926eb9de021e758a0448d618d06ff6.jpg",time:"2017-08-12 12:15",rate:4.6,content:"这家店的味道不错，这几天一直在这里吃，室友都说好这家店的味道不错，这几天一直在这里吃，室友都说好",images:["https://bpic.588ku.com/element_water_img/18/06/12/cd6ca398b1888c04effaa03663de9881.jpg","https://bpic.588ku.com/element_water_img/18/06/12/b5206ed1949f294ef52fe10701e55cd3.jpg"],reply:"冲啊，干死高波波 ，为了全世界，为了我们的小孩子",commodity:["小计面包"]}],
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
            this.$http({
                method: 'post',
                url:"/api/buyer/evaluation",
                data: date,
                headers :{
                    'Accept':'application/json',
                    'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjNkYThhNDYyM2UxN2FlMmMzMTZiYzdlMTYxZWQzYzFlYzJkOTdhYWMyODI2NmY0ZjQ0MDJkNTYzMmE4Zjk0NmRhMTg5MWZlZGQ5Njg3Yjc0In0.eyJhdWQiOiIyIiwianRpIjoiM2RhOGE0NjIzZTE3YWUyYzMxNmJjN2UxNjFlZDNjMWVjMmQ5N2FhYzI4MjY2ZjRmNDQwMmQ1NjMyYThmOTQ2ZGExODkxZmVkZDk2ODdiNzQiLCJpYXQiOjE1MzM3OTc5NTAsIm5iZiI6MTUzMzc5Nzk1MCwiZXhwIjoxNTM2Mzg5OTUwLCJzdWIiOiIyMyIsInNjb3BlcyI6WyIqIl19.nf0LL13XkxrqXYfMJKs2cffU13FSvI4tpzR0Im2n8yKWH1pmShSYz0C2en7G3uGaQ6R4kOQAmuNGtWz11jkTAy7xFyGr9KwRMaxorHG6ajgLjMV8X5f3pzgUhdvH9pSwO2z4yRPi7oE3y40lzfS-itiPgvsMKjpoczPPcg1-KHb1to6KrzNC7ljVQxR9YWy4p3yyO3ylfLBgMSUdRQ21ONBMbsNd-hxQ6_MyKrSsagygwPGqenWKonRlZjG_M-E6ey5sNSAkVBCtLJqt0HCnwEAmhkRCBDw52s0bOYjpd263dM46yIUW1cILOWX-pKjG30zPNBlyO0xEZVpRy0Q47_QGOZtsjGecWu7sqqF6isyUVHfFvPaF_FrhKmVfv8EHOAqBMcBl3KsFEuHQtukzxNY7XuWn9FuWTr4o0udptfpMUcPTTn4MRpgsVBhBIGaUJligDmS-AMzygvjP0l4ljUpA7j92xSewGUbsoR3kgPdPQx7JJPhMlsVy69gepbzAHt2DPSi7uZG5jEbCT-wg2Zs2ybmXQzkH89CPeY7oCbDoOUIVzYrTQkoC75TmOKwHWLe5u4BkAi8rfye8ZhTAm5CcEGamg2LbQl2C1kHfH9E1y5qwR2VM0JYca9VuZGY4wlaPPB_j4WYmYQ_LeXY7NBmii_ag2-td6JgSU9FgYKQ'
                }
            })
                .then(this.getevaluation)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getevaluation (res) {
            console.log(res)
            this.evaluation = res.data.data.data
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
