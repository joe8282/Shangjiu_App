<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		onLaunch: function() {
			console.log('App Launch')
			//#ifdef H5
			var userid = uni.getStorageSync('userid') || '1133345545746780160';
			// 检测是浏览器端还是微信端
			var ua = navigator.userAgent.toLowerCase();
			if (String(ua.match(/MicroMessenger/i)) === "micromessenger") { //是微信端
				if (userid == '') {
					getCode(); //微信公共号授权处理
				}
			} else {
				console.log('是浏览器端')
				console.log(userid)
				uni.setStorageSync('userid', userid)
			}
			//#endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
	//微信公共号授权处理
	global.getCode = function() {
		let Appid = "wx765313b6f9ffc1e4"; //Appid
		let code = getUrlParam("code"); //是否存在code
		console.log(code);
		let local = window.location.href;
		if (code == null || code === "") {
			//不存在就打开上面的地址进行授权
			window.location.href =
				"https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
				Appid +
				"&redirect_uri=" +
				encodeURIComponent(local) +
				"&response_type=code&scope=snsapi_userinfo&state=shangjiu168#wechat_redirect";
		} else {
			//存在则通过code传向后台调用接口返回微信的个人信息
			uni.request({
				method: "POST",
				url: 'http://manage.shangjiu360.com/Base_SysManage/OAuth/Callback',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					code: code,
					url: encodeURIComponent(local)
				},
				success: function(res) {
					uni.setStorageSync('userid', res.data.userid)
					console.log(res);
					// alert(res.data.userid);		
					//至此登录完成
				}
			});

		}
	}
	//获取地址栏参数
	global.getUrlParam = function(name) {
		console.log(name);
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) {
			return unescape(r[2]);
		}
		return null;
	}
	//判断是否登录
	global.isLogin = function() {
		try {
			var userid = uni.getStorageSync('userid');
		} catch (e) {
			//TODO handle the exception
		}
		if (userid == '') {
			return false;
		} else {
			return userid;
		}
	};
</script>

<style>
	/*每个页面公共css */
	
	/* loadmore */
	.uni-loadmore{
		font-size: 30rpx;
		height:80rpx;
		line-height:80rpx;
		text-align:center;
		padding-bottom:30rpx;
	}
</style>
