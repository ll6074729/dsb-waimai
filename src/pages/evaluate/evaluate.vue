<template>
    <div>
        <head-back></head-back>
        <hr class="hr20">
        <assess-take></assess-take>
        <hr class="hr20">
        <assess-take></assess-take>
        <assess-shop></assess-shop>
        <div class="submit">
            <div class="submit-btn">
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

        }
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
