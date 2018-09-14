<template>
    <div>
        <head-back :title="title"></head-back>
        <integral-list :integral="integral" :title="title"></integral-list>
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
            title:'余额明细',
            integral:[]
        }
    },
    mounted () {
        this.getintegral()
    },
    methods :{
        getintegral () {
            this.$http({
                method: 'post',
                // url: '/mobile/api/q',
                url:'api/buyer/account_log',
                data: {
                   page_size:15
                },
            })
            .then(this._getintegral)
            .catch(function (error) {
                console.log(error);
            })
        },
        _getintegral (res) {
            console.log(res)
            // let date = eval('('+res.data+')')
            let date = res.data
            this.integral = date.data.data
        }
    },
}
</script>
<style lang="stylus" scoped>

</style>
