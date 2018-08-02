<template>
    <div>
        <head-top></head-top>
        <div class="formlist">
            <form-list></form-list>
        </div>
    </div>
</template>
<script>
import HeadTop from "./component/headtop"
import FormList from "../../componentss/formlist"
export default {
    name:"concurrent",
    components:{
        HeadTop,
        FormList
    },
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .formlist
        position absolute
        width 100%
        top 85%
</style>
