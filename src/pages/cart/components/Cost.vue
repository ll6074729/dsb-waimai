<template>
    <div>
        <div class="cost-item df">
            <div class="cost-type">配送费</div>
            <div class="cost-price">￥2</div>
        </div>
        <div class="cost-item df">
            <div class="cost-type">餐盒费</div>
            <div class="cost-price">￥1</div>
        </div>
        <hr class="hr20">
        <div class="cost-activity df">
            <div class="activity-type">满减</div>
            <div class="activity-name">满80减32</div>
        </div>
        <div class="cost-activity df">
            <div class="activity-type">赠品</div>
            <div class="activity-name">可口可乐</div>
        </div>
        <div class="cost-item df">
            <div class="cost-type">优惠券</div>
            <div class="cost-coupon">3张可用</div>
            <div class="cost-right">
                <img src="../../../assets/img/right_f7.png" alt="">
            </div>
        </div>
        <hr class="hr20">
        <div class="cost-item pr">
            <div class="cost-type">订单备注</div>
            <textarea name="" id="remarks" cols="10" rows="5" placeholder="请输入备注文字（可不填）"></textarea>
            <span class="textarea-num">0/50</span>
        </div>
    </div>
</template>
<script>
export default {
    name:"Cost"
}
</script>
<style lang="stylus" scoped>
    .cost-item
        padding 4.56vw 5.33vw
        border-bottom 1px solid #f7f7f7
        font-size 4.266vw
        .cost-price
            font-weight bold
        .cost-right
            margin-right -2vw
            img 
                width 2.13vw
                height 4vw
        .cost-coupon
            font-size 3.73vw
            color #4897fe
            margin-right -55vw
        #remarks
            width 100%
            height 27.73vw
            border 1px solid #dbdbdb
            background-color #f7f7f7
            border-radius 5px
            margin-top 4.66vw
            padding 2vw
            box-sizing border-box
            font-size 3.2vw
        .textarea-num
            position absolute
            bottom 6vw
            right 8vw    
            color #999
            font-size 3.2vw
    .cost-activity
        padding 2.3vw 5.33vw
        font-size 3.2vw
        border-bottom 1px solid #f7f7f7
        .activity-type
            background red
            padding 1.33vw 2.13vw
            color #fff
        .activity-name
            line-height 5.6vw    
            color #999
</style>
