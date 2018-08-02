<template>
    <div>
        <head-top></head-top>
        <location-name></location-name>
        <location-list></location-list>
    </div>
</template>
<script>
import HeadTop from "./components/headtop"
import LocationName from "./components/location-name"
import LocationList from "./components/location-list"
export default {
    name:"Location",
    components:{
        HeadTop,
        LocationName,
        LocationList
    },
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>

</style>
