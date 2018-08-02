<template>
    <div>
       <div class="df pd20">
            <div class="list-name">
                姓名
            </div>
            <div class="list-input">
                <input type="text" placeholder="请输入您的姓名" maxlength="20">
            </div>
        </div>
        <div class="df pd20">
            <div class="list-name">
                手机号
            </div>
            <div class="list-input">
                <input type="text" placeholder="请输入您的联系方式" maxlength="11">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"userinfo",
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .df
        height 13.33vw
        font-size 3.73vw
        border-top 1px solid #f7f7f7
        .list-name
            line-height 13.33vw
            width 16vw
            font-weight bold
        .list-input
            flex 1
            input 
                height 100%
                width 100%
                font-size 3.73vw
        .list-school
            flex 1   
            line-height 13.33vw
            .school-right
                img 
                    width 2.13vw
                    height 4.13vw
</style>
