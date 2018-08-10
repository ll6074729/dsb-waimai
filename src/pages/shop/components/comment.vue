<template>
    <div>
        <div class="comment-label">
            <div class="label active">全部 123</div>
            <div class="label">有图 23</div>
            <div class="label">好评 666</div>
            <div class="label">差评 45</div>
        </div>
        <div class="comment-list">
            <div class="list-item" v-for="item in comment" :key="item.id">
                <div class="item-head">
                    <div class="head-img"><img :src="item.userImg" alt=""></div>
                    <div class="head-name">{{item.name}}</div>
                    <div class="head-time">{{item.time}}</div>
                    <el-rate
                        class="head-rate"
                        v-model="item.rate"
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
                    <div class="shop-reply">
                        <strong>商家回复:</strong>
                        <span>{{item.reply}}</span>
                    </div>
                </div>
                <div class="comment-food">
                    <div class="food-label">蛋包饭</div>
                    <div class="food-label">酸辣土豆丝</div>
                    <div class="food-label">尖椒卤肉盖浇饭</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"ShopComment",
    data () {
        return {
            comment:[{id:1,name:"一直下雨",userImg:"https://bpic.588ku.com/element_water_img/18/07/03/32ba65ec9c2ed72759a09e287caa26ab.jpg",time:"2017-08-12 12:15",rate:4,content:"这家店的味道不错，这几天一直在这里吃，室友都说好这家店的味道不错，这几天一直在这里吃，室友都说好",images:["https://bpic.588ku.com/element_water_img/18/06/12/cd6ca398b1888c04effaa03663de9881.jpg","https://bpic.588ku.com/element_water_img/18/06/12/b5206ed1949f294ef52fe10701e55cd3.jpg"],reply:"感谢您对小店的认可，祝您用餐愉快，我们会继续努力！用餐过程中如有任何问题，您可随时联系我们。我们会第一时间为您服务，谢谢！",commodity:["小计面包","烤肉饭"]},
            {id:2,name:"干死小菠菜",userImg:"https://bpic.588ku.com/element_water_img/18/07/14/77926eb9de021e758a0448d618d06ff6.jpg",time:"2017-08-12 12:15",rate:4.6,content:"这家店的味道不错，这几天一直在这里吃，室友都说好这家店的味道不错，这几天一直在这里吃，室友都说好",images:["https://bpic.588ku.com/element_water_img/18/06/12/cd6ca398b1888c04effaa03663de9881.jpg","https://bpic.588ku.com/element_water_img/18/06/12/b5206ed1949f294ef52fe10701e55cd3.jpg"],reply:"你好啊",commodity:["小计面包"]},
            {id:3,name:"干死高波波",userImg:"https://bpic.588ku.com/element_water_img/18/07/14/77926eb9de021e758a0448d618d06ff6.jpg",time:"2017-08-12 12:15",rate:4.6,content:"这家店的味道不错，这几天一直在这里吃，室友都说好这家店的味道不错，这几天一直在这里吃，室友都说好",images:["https://bpic.588ku.com/element_water_img/18/06/12/cd6ca398b1888c04effaa03663de9881.jpg","https://bpic.588ku.com/element_water_img/18/06/12/b5206ed1949f294ef52fe10701e55cd3.jpg"],reply:"冲啊，干死高波波 ，为了全世界，为了我们的小孩子",commodity:["小计面包"]}]
        }
    },
    mounted () {

    },
    methods : {

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
            &:last-child
                padding-bottom 20vw       
</style>    
