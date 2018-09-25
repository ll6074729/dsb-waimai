<template>
    <div>
        <div class="comment-label">
            <div class="label" :class="{active:chooes== 0}" @click="replace(0,'')">全部 {{shop.all}}</div>
            <div class="label" :class="{active:chooes== 1}" @click="replace(1,'picture')">有图 {{shop.picture}}</div>
            <div class="label" :class="{active:chooes== 2}" @click="replace(2,'good')">好评 {{shop.good}}</div>
            <div class="label" :class="{active:chooes== 3}" @click="replace(3,'bad')">差评 {{shop.bad}}</div>
        </div>
        <div class="comment-list">
            <div class="list-item" v-for="(item,index) in evaluation" :key="item.id" v-if="evaluation.length > 0">
                <div class="item-head">
                    <div class="head-img"><img :src="item.head_pic" alt="" ></div>
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
                        <img :src="itemImg" alt="" v-if="itemImg.length > 20" v-for="itemImg in item.pic" :key="itemImg"  @click="previewImage(itemImg,index)">
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
            <div v-if="evaluation.length == 0" class="no">
                <img src="../../../assets/img/noaddress.png" alt="" >
                <div>
                    ( • ̀ω•́ )✧  暂无评论
                </div>
                
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
            CommentPic:[],
        }
    },
    mounted () {
        this.isevaluation()
    },
    methods : {
        previewImage(img,index){
            this.$wx.previewImage({
                current: 'http://wm.dqvip.cc' + img, // 当前显示图片的http链接
                urls: this.evaluation[index].pic // 需要预览的图片http链接列表
            });
        },
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
                // url:"/api/buyer/evaluation",
                url: '/mobile/api/q',
                data: date,
            })
                .then(this.getevaluation)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getevaluation (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            this.evaluation = date.data.data
            let compic
            // console.log(this.evaluation,555)
            for (let i in this.evaluation){
                let compic2 = new Array()
                if(this.evaluation[i].img  != null){
                    compic = this.evaluation[i].img.split(',')
                    for(var j = 0;j < compic.length; j++){
                        // console.log(compic[j],100)
                        compic2.push('http://wm.dqvip.cc'+ compic[j])
                    }
                    this.evaluation[i].pic = compic2
                }    
            }
            // console.log(this.evaluation,666)
        },
    },
    watch :{
        // evaluation () {
        //     let evaluationImg = []
        //     for (let i in this.evaluation){
        //         evaluationImg[i] = this.evaluation[i].img.split(',')
        //     }
        //     console.log(evaluationImg)
        //     this.CommentPic = evaluationImg
        // }
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
        .no
            text-align center     
            color #999
            margin-bottom 20vw
            img 
                width 33.33vw
                height 33.33vw
                margin-top 5vw
                margin-bottom 5vw
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
                        margin-top 1.33vw
                        // position absolute
                        // clip rect()
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
                    margin-bottom 3vw
            &:last-child
                padding-bottom 20vw       
</style>    
