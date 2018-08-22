<template>
    <div>
        <head-bg></head-bg>
        <form-list :page="page"></form-list>
    </div>
</template>
<script>
import HeadBg from "./components/headbg"
import FormList from "../../componentss/formlist" 
export default {
    name:"merchant",
    components:{
        HeadBg,
        FormList,
    },
    data () {
        return {
            page:2
        }
    }
}
</script>
<style lang="stylus" scoped>
    .form
        background-color #499bf5
        .link
            .link-btn
                border 1px solid #ffffff
                color #fff
                font-size 4.26vw
                margin 0 auto
                width 53.33vw
                height 13.33vw
                line-height 13.33vw
                text-align center
                border-radius 6.66vw
                box-sizing border-box
</style>
