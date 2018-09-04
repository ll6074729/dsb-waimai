<template>
    <div>
        <head-back :title="title"></head-back>
        <integral-list></integral-list>
    </div>
</template>
<script>
import HeadBack from "../../componentss/headback"
import IntegralList from "./components/integrallist"
export default {
    name:"integral",
    components:{
        HeadBack,
        IntegralList
    },
    data () {
        return{
            title:'积分明细'
        }
    }
}
</script>
<style lang="stylus" scoped>

</style>
