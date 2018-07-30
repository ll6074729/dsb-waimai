<template>
    <div>
        <!-- <pay-fail></pay-fail> -->
        <pay-success></pay-success>
    </div>
</template>
<script>
import PayFail from "./components/fail"
import PaySuccess from "./components/success"
export default {
    name:"pay",
    components:{
        PayFail,
        PaySuccess
    },
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>

</style>
