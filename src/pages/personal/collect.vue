<template>
    <div>
        <collect-head :title="title"></collect-head>
        <div class="collect-list">
            <ul>
                <li class="item df" v-for="item in this.collect" :key="item.collect_id">
                    <hr class="hr20">
                    <div class="item-left">
                        <div class="item-shopimg">
                            <img :src="item.shop.logo" alt="" :onerror="defaultImg">
                        </div>
                    </div>
                    <div class="item-right">
                        <!-- 头部信息 -->
                        <div class="item-right-top df">
                            <div class="item-r-t-left">
                                {{item.shop.shop_name}}
                            </div>
                            <div class="item-r-t-right">
                                <span class="shop-status" v-if="item.shop.status == 0">休息中</span>
                                <span class="shop-status" v-if="item.shop.status == 1" :class="{'status-color':item.shop.status == 1}">营业中</span>
                            </div>
                        </div>
                        <!-- 评分 -->
                        <div class="item-right-center fs24">
                            <el-rate
                                v-model="item.shop.store_ratings"
                                disabled
                                allow-half
                                show-score
                                void-color="#ff3800"
                                text-color="#333"
                                score-template="{value}">
                            </el-rate>
                            <div class="shop-sales">
                                销量{{item.shop.sales}}
                            </div>
                        </div>
                        <!-- 其他 -->
                        <div class="item-right-bottom df fs24">
                            <div class="delivery_cost">
                                <!-- {{this.$store.state.defaultSchool}} -->
                                <!-- 配送费2.00元 -->
                            </div>
                            <div class="collect-btn" @click="deleteCollect(item.shop_id)">
                                取消收藏
                            </div>
                        </div>
                    </div>
                </li>
                <li v-if="this.collect.length == 0" style="text-align:center;margin-top:3vw">
                    暂无收藏
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import CollectHead from '../../componentss/headback'
export default {
    name:"collect",
    components:{
        CollectHead
    },
    data () {
        return {
            title:'店铺收藏',
            collect:[],
            defaultImg: 'this.src="' + require('../../assets/img/defaultshop.png') + '"'
        }
    },
    mounted () {
        this.getcollect()
    },
    methods:{
        getcollect () {
             this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // url:'api/buyer/collect_list',
                data: {
                    url:'http://api.dqvip.cc/buyer/collect_list',
                    q_type:'get'
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY1YWE4OTRmYmZkMDRiNzU4Yzk2ZGRlOTY0NzcyMWQ5M2IzM2Q1Mzk1NGZlNTAwMmFlNTQ1ODNkMjZlNjZiMDhiMWYxYmI3ZGIyOWY5MzYzIn0.eyJhdWQiOiIyIiwianRpIjoiZjVhYTg5NGZiZmQwNGI3NThjOTZkZGU5NjQ3NzIxZDkzYjMzZDUzOTU0ZmU1MDAyYWU1NDU4M2QyNmU2NmIwOGIxZjFiYjdkYjI5ZjkzNjMiLCJpYXQiOjE1MzU3MTE1MTIsIm5iZiI6MTUzNTcxMTUxMiwiZXhwIjoxNTM4MzAzNTEyLCJzdWIiOiI2NSIsInNjb3BlcyI6WyIqIl19.sr8YCf3ZR1Tc8P4IU8gLK15WTdRwQy-DdZNxSND_C-sTohzhEfuAz6ZqVPnUmCFU9Stb7o94vKBj-SFg8695SxdnQ6KTsln5jbl0zGqZPpa00nyW-2q_PDu8aKTv78inCEtl_bfsJ7XLz9wOnn8LfM9TmQJz4OXRI52baKpsBZ5Dxapp90uvGFlK26rAuzClXasvCSlH9YuC7J0rLP8yhuc8iFscWxN8YhARPIswVlG9_Mij2-DJdwAiqE_3XPxHPLrxIWsD3Ud-NYs0YbqzkXrEAEbDhllxuDW1VxNH1nvX0qNhvPUZ7WV3GuOfJgbIECvpaBfpQ7EWPZp1bQVFktgutGO0RMbATjE6IaD-tlycB46wIxxintgrDg-KGIowdcGXY274hXJCi8smPF0zPgN7UIT-lnddC6ySkldyWtcdWM0jzsUQvXwt2tmoJ1izcysJHkWQUTRU7Y3BB9oEL1qERCa8qCp8mXnMmXNTtUzRhRB2K2-IBstYKKFdvNl4x0FQMehqSHevkAdOixObkwKI5xoHxqdVouv1W01QeeU4nmpT12yQqZl6XL8b5tNBlAel8CbEd23tc3wPDeXdoxyB-kxYGDqqbocRI4rZs5wnuY32D8bweuv3iCf6RgpIgkKNpdWoZmbNW5QOWMfDCn7BRsLG1VXNs4OLryFRNCk'
                // }
            })
                .then(this.getCollectList)
                .catch(function (error) {
                    console.log(error);
                })
        },
        getCollectList (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            this.collect = date.data
        },
        deleteCollect (shop_id) {
            this.$http({
                method: 'post',
                url: 'mobile/api/q',
                // url:'api/buyer/collect_shop',
                data: {
                    url:'http://api.dqvip.cc/buyer/collect_shop',
                    shop_id:shop_id,
                    collect_type:'false',
                    q_type:'post'
                },
                // headers :{
                //     'Accept':'application/json',
                //     'Authorization':'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImY1YWE4OTRmYmZkMDRiNzU4Yzk2ZGRlOTY0NzcyMWQ5M2IzM2Q1Mzk1NGZlNTAwMmFlNTQ1ODNkMjZlNjZiMDhiMWYxYmI3ZGIyOWY5MzYzIn0.eyJhdWQiOiIyIiwianRpIjoiZjVhYTg5NGZiZmQwNGI3NThjOTZkZGU5NjQ3NzIxZDkzYjMzZDUzOTU0ZmU1MDAyYWU1NDU4M2QyNmU2NmIwOGIxZjFiYjdkYjI5ZjkzNjMiLCJpYXQiOjE1MzU3MTE1MTIsIm5iZiI6MTUzNTcxMTUxMiwiZXhwIjoxNTM4MzAzNTEyLCJzdWIiOiI2NSIsInNjb3BlcyI6WyIqIl19.sr8YCf3ZR1Tc8P4IU8gLK15WTdRwQy-DdZNxSND_C-sTohzhEfuAz6ZqVPnUmCFU9Stb7o94vKBj-SFg8695SxdnQ6KTsln5jbl0zGqZPpa00nyW-2q_PDu8aKTv78inCEtl_bfsJ7XLz9wOnn8LfM9TmQJz4OXRI52baKpsBZ5Dxapp90uvGFlK26rAuzClXasvCSlH9YuC7J0rLP8yhuc8iFscWxN8YhARPIswVlG9_Mij2-DJdwAiqE_3XPxHPLrxIWsD3Ud-NYs0YbqzkXrEAEbDhllxuDW1VxNH1nvX0qNhvPUZ7WV3GuOfJgbIECvpaBfpQ7EWPZp1bQVFktgutGO0RMbATjE6IaD-tlycB46wIxxintgrDg-KGIowdcGXY274hXJCi8smPF0zPgN7UIT-lnddC6ySkldyWtcdWM0jzsUQvXwt2tmoJ1izcysJHkWQUTRU7Y3BB9oEL1qERCa8qCp8mXnMmXNTtUzRhRB2K2-IBstYKKFdvNl4x0FQMehqSHevkAdOixObkwKI5xoHxqdVouv1W01QeeU4nmpT12yQqZl6XL8b5tNBlAel8CbEd23tc3wPDeXdoxyB-kxYGDqqbocRI4rZs5wnuY32D8bweuv3iCf6RgpIgkKNpdWoZmbNW5QOWMfDCn7BRsLG1VXNs4OLryFRNCk'
                // }
            })
                .then(this.Collectstatus)
                .catch(function (error) {
                    console.log(error);
                })
        },
        Collectstatus (res) {
            let date = eval('('+res.data+')')
            // let date = res.data
            if(date.status == 200){
                this.getcollect()
                if(date.message  != 'false'){
                    this.$message({
                        message: '收藏成功',
                        type: 'success',
                        // duration:0
                    });
                }else{
                    this.$message({
                        message: '取消收藏',
                        type: 'success',
                        // duration:0
                    });
                }
            }else{
                this.$message({
                    message: '发生不可预料的错误,请联系客服',
                    type: 'error',
                    // duration:0
                });
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
    .el-rate >>> .el-rate__icon
        font-size 4.5vw!important
    .el-rate >>> .el-rate__text
        font-size 2.86vw!important
    .collect-list
        .item
            height 26.66vw
            background-color #ffffff
            border-bottom 1px solid #eee
            &:last-child
                border-bottom none
            .item-left
                .item-shopimg
                    padding 2.66vw
                    img 
                        width 21.33vw
                        height 21.33vw
            .item-right
                flex 1    
                padding-top 3vw   
                padding-right 5vw   
                .item-right-top
                    .item-r-t-left
                        font-size 4.8vw
                        font-weight bold
                    .item-r-t-right 
                        .status-color 
                            color #469afe    
                .fs24
                    color #999       
                .item-right-center
                    .el-rate
                        display inline-block
                        .el-rate__item
                            .el-rate__icon
                                font-size 1.86vw!important
                    .shop-sales
                        margin-top 3vw
                        margin-bottom 5vw
                        margin-left 5vw
                        display inline-block

</style>
