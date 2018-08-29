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
                debug: false,
                appId: wxArray.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
                timestamp:wxArray.timestamp, // 必填，生成签名的时间戳
                nonceStr: wxArray.nonceStr, // 必填，生成签名的随机串
                signature: wxArray.signature,// 必填，签名，见附录1
                jsApiList: [
                  'chooseWXPay'
                ]

            });
               //处理验证失败的信息
            wx.error(function (res) {
                console.log(res)
                alert(res)
            });
              //处理验证成功的信息
            wx.ready(function () {
                // wx.getLocation({
                //     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                //     success: function (res) {
                //         var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                //         var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                //         var speed = res.speed; // 速度，以米/每秒计
                //         var accuracy = res.accuracy; // 位置精度
                        
                //     }
                // })
                // wx.chooseWXPay({
                //     timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                //     nonceStr: '', // 支付签名随机串，不长于 32 位
                //     package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                //     signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                //     paySign: '', // 支付签名
                //     success: function (res) {
                //     // 支付成功后的回调函数
                //     }
                // });
            })
        })
 
    },
    // 微信支付方法
    jsApiCall(Parameters){
        console.log(Parameters)
		WeixinJSBridge.invoke(
            // 'getBrandWCPayRequest',$jsApiParameters,
            'getBrandWCPayRequest',Parameters,
			function(res){
				 WeixinJSBridge.log(res.err_msg);
				 if(res.err_msg == "get_brand_wcpay_request:ok") {
                    location.href='/#/pay/true';
				 }else{
				 	// alert(res.err_code+res.err_desc+res.err_msg);
                    location.href='/#/pay/false';
				 }
			}
		);
	},
    callpay(res)
	{
		if (typeof WeixinJSBridge == "undefined"){
		    if( document.addEventListener ){
		        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
		    }else if (document.attachEvent){
		        document.attachEvent('WeixinJSBridgeReady', jsApiCall);
		        document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
		    }
		}else{
		    this.jsApiCall(res);
		}
	}

}