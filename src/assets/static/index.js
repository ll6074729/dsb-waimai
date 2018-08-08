import axios from 'axios'
import wx from 'weixin-js-sdk'
export default{
    handleScroll () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        return scrollTop
    },
    back () {
        this.$router.go(-1)
    },
    GetQueryString () {
        var currentUrl = window.location.href;
        var arr = currentUrl.split("?");
        if (arr.length > 1) {
            arr = arr[1].split("&");//分割参数
            for (var i = 0; i < arr.length; i++) {
                var tem = arr[i].split("="); //分割参数名和参数内容
                if (tem[0] == 'code') {
                    return tem[1];
                }
            }
            return null;
        }
        else {
            return null;
        }
    },
    /**
     * 拿到用户信息  token_type   expires_in  过期时间    access_token 后台请求需要的
     */
    wxShowMenu () {
        // this.GetQueryString(location.href)
        axios.post('/index.php?m=Mobile&c=Index&a=ajaxGetWxConfig&t='+Math.random(),{
            'askUrl':encodeURIComponent(location.href.split('#')[0]) 
        }).then(function(res) {
            let wxArray = res.data
            wx.config({
                debug: true,
                appId: wxArray.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
                timestamp:wxArray.timestamp, // 必填，生成签名的时间戳
                nonceStr: wxArray.nonceStr, // 必填，生成签名的随机串
                signature: wxArray.signature,// 必填，签名，见附录1
                jsApiList: [
                  'getLocation'
                ]

              });
               //处理验证失败的信息
              wx.error(function (res) {
                console.log(res)
                alert(res)
              });
              //处理验证成功的信息
              wx.ready(function () {
                
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        var speed = res.speed; // 速度，以米/每秒计
                        var accuracy = res.accuracy; // 位置精度
                        
                    }
                })
                
              })
           
        })
 
    },
}