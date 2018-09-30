import axios from 'axios'
import wx from 'weixin-js-sdk'
export default{
    stop(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='hidden';
        document.addEventListener("touchmove",mo,false);//禁止页面滑动
    },
      /***取消滑动限制***/
    move(){
        var mo=function(e){e.preventDefault();};
        document.body.style.overflow='';//出现滚动条
        document.removeEventListener("touchmove",mo,false);
    },
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
    getmap (lng,lat) {
        var x_pi = 3.14159265358979324 * 3000.0 / 180.0;
        var x = parseFloat(lng);
        var y = parseFloat(lat);
        var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
        var theta = Math.atan2(y,x) + 0.000003 * Math.cos(x * x_pi);
        lng = z * Math.cos(theta) + 0.0065;
        lat = z * Math.sin(theta) + 0.006;
        window.localStorage.lng = lng;
        window.localStorage.lat = lat;
    },
    /**
     * 拿到用户信息  token_type   expires_in  过期时间    access_token 后台请求需要的
     */
    wxShowMenu () {
        // this.GetQueryString(location.href)
        var _this = this
        axios.post('http://wm.dqvip.cc/index.php?m=Mobile&c=Index&a=ajaxGetWxConfig&t='+Math.random(),{
            'askUrl':encodeURIComponent(location.href.split('#')[0]) 
        }).then(function(res) {
           
            if(res.data == null || res.data == ''){
                alert('请求微信配置失败,请重新打开公众号')
                return false
            }
            let wxArray = res.data
            console.log(res.data)
            localStorage.user_id = res.data.user.user_id
            localStorage.token = res.data.user.access_token
            wx.config({
                debug: false,
                appId: wxArray.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
                timestamp:wxArray.timestamp, // 必填，生成签名的时间戳
                nonceStr: wxArray.nonceStr, // 必填，生成签名的随机串
                signature: wxArray.signature,// 必填，签名，见附录1
                jsApiList: [
                  'chooseWXPay', //支付
                  'getLocation', //获取地理位置
                  'updateAppMessageShareData', //新的分享朋友
                  'updateTimelineShareData',//新的分享朋友圈
                  'onMenuShareTimeline', //老的分享朋友圈
                  'onMenuShareAppMessage'
                ]

            });
               //处理验证失败的信息
            wx.error(function (res) {
                console.log(res)
                // alert(res)
            });
              //处理验证成功的信息
            wx.ready(function () {
                //获取坐标
                wx.getLocation({
                    type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                    success: function (res) {
                        var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                        var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                        var speed = res.speed; // 速度，以米/每秒计
                        var accuracy = res.accuracy; // 位置精度
                        _this.getmap(longitude,latitude)
                    }
                })
                //分享朋友圈（1.4）
                var title = localStorage.defaultSchool + '迪速帮'
                var link = window.location.origin+ '/?uid='+localStorage.user_id+'/'+window.location.hash
                var imgUrl = window.location.origin + '/public/upload/logo/2018/09-30/920390a840b925c51cd3bf84c954deaf.png'
                console.log(link)
                wx.onMenuShareTimeline({ 
                    title: title, // 分享标题
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                }, function(res) { 
                //这里是回调函数 
                    alert(JSON.stringify(res))
                }); 
                wx.onMenuShareAppMessage({
                    title: title, // 分享标题
                    desc: '迪速帮高校服务平台，专注于为校园师生提供最优质的服务，分享多多，优惠多多，一起行动吧！', // 分享描述
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgUrl, // 分享图标
                    type: '', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                    // 用户点击了分享后执行的回调函数
                    }
                });
            })
        })
 
    },
    // 微信支付方法
    jsApiCall(Parameters){
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