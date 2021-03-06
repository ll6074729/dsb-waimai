import axios from 'axios'
import wx from 'weixin-js-sdk'
export default {
 
    wxShowMenu: function() {
 
        axios.post('http://wm.dqvip.cc/wap/index/getWxConf').then(function(res) {

            const wxArray = res.data
            console.log(location.href.split('#')[0]) 

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
                        console.log(res,333)
                    }
                });
              });
           
        })
 
    }
 
}
