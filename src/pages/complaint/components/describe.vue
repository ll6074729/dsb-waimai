<template>
    <div class="pd20">
        <div class="desc-title fd28">
            内容描述
        </div>
        <div class="desc-text">
            <textarea name="desc" id="" placeholder="请输入您的投诉内容，200字以内"></textarea>
        </div>
    </div>
</template>
<script>
export default {
    name:"describe",
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .pd20
        .desc-title
            padding 4vw 0
        .desc-text
            width 100%
            height 32vw
            box-sizing border-box
            background #f7f7f7    
            textarea
                height 96%
                width 96%
                background #f7f7f7 
                padding 2%
</style>
