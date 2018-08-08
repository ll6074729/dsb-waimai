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

        <div class="sitelist">

            <div class="site-item">
                <hr class="hr20">
                <div class="siteinfo">
                    <div class="userinfo">
                        <div class="username">
                            小嚎嚎
                        </div>
                        <div class="userphone">
                            15651448477
                        </div>
                    </div>
                    <div class="sitename fs24">
                        四川省成都市金牛区绿地红星国际C座1426
                    </div>
                </div>
                <div class="df">
                    <div class="defaultsite">
                        <img src="../../assets/img/uncheck.png" alt="">
                        <span>默认地址</span>
                    </div>
                    <div class="handle">
                        <div class="hand-edit">
                            编辑
                        </div>
                        <div class="hand-delete">
                            删除
                        </div>
                    </div>
                </div>
            </div>
            <div class="site-item">
                <hr class="hr20">
                <div class="siteinfo">
                    <div class="userinfo">
                        <div class="username">
                            小嚎嚎2
                        </div>
                        <div class="userphone">
                            15651448477
                        </div>
                    </div>
                    <div class="sitename fs24">
                        四川省成都市金牛区绿地红星国际C座1426
                    </div>
                </div>
                <div class="df">
                    <div class="defaultsite active">
                        <img src="../../assets/img/check.png" alt="">
                        <span>默认地址</span>
                    </div>
                    <div class="handle">
                        <div class="hand-edit">
                            编辑
                        </div>
                        <div class="hand-delete"  @click="open2">
                            删除
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"sitelist",
    data () {
        return {

        }
    },
    methods: {
        open2() {
            this.$confirm('确认删除该地址?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center:true,
                customClass:"messBox"
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        back () {
            this.$router.go(-1)
        },
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
