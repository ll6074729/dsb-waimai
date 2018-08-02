<template>
    <div>
        <div class="laud df">
            <div class="foodname">
                尖椒卤肉盖浇饭 尖椒卤肉盖浇饭尖椒卤肉盖浇饭  尖椒卤肉盖浇饭 
            </div>
            <div class="islaud df">
                <div class="laud-yes">
                    <img src="../../../assets/img/good_gray@3x.png" alt="">
                </div>
                <div class="laud-no">
                    <img src="../../../assets/img/bad_gray@3x.png" alt="">
                </div>
            </div>
        </div>
        <div class="laud df">
            <div class="foodname">
                尖椒卤肉盖浇饭 尖  尖椒卤肉盖浇饭 
            </div>
            <div class="islaud df">
                <div class="laud-yes">
                    <img src="../../../assets/img/good_gray@3x.png" alt="">
                </div>
                <div class="laud-no">
                    <img src="../../../assets/img/bad_gray@3x.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"laud",
    data () {
        return {

        }
    }
}
</script>
<style lang="stylus" scoped>
    .laud
        padding 2.66vw
        .foodname
            flex 1
            margin-right 10%
            line-height 1.2
        .islaud
            width 25%
            .laud-no
                margin-right 30%
            div
                width 4vw
                height 3.73vw
                img 
                    height 100%
                    width 100%
</style>
