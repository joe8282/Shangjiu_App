<template>
	<view class="jz_login">
		<view class="uni-flex login-top">
			<image mode="widthFix" src="../../../static/login/login_bg.png"></image>
			<div class="waveWrapper waveAnimation">

				<div class="circles">
					<div class="circle"></div>
					<div class="circle"></div>
					<div class="circle"></div>
					<div class="circle"></div>
					<div class="circle"></div>
					<div class="circle"></div>
					<div class="circle"></div>
				</div>



			</div>
		</view>
		<view class=" space"></view>
		<view class="login-box uni-column ">
			<view class="login-form uni-flex uni-column">
				<view class="logoImg uni-flex" @click="Home">
					<image src="../../../static/login/login_logo.png"></image>
				</view>
				<view class="tab uni-flex uni-flex-item uni-column">
					<view class="uni-flex uni-row login-tab">
						<view @click="Mode(0)" class="uni-flex uni-flex-item  " v-bind:class="[current==0 ? activeClass : '']">
							密码登录
						</view>
						<view @click="Mode(1)" class="uni-flex uni-flex-item  " v-bind:class="[current==1 ? activeClass : '']">
							短信登录
						</view>
					</view>

					<view class="uni-flex content uni-flex-item">
						<view class="uni-flex uni-column" v-show="current === 0">
							<view class="form-phone uni-flex">
								<view class="form-phone-lf uni-flex">
									<image src="../../../static/login/ico1.png"></image>
								</view>
								<input class="uni-flex-item userNameIput" placeholder-style="color:#e2e2e2" v-model="phone" name="input"
								 placeholder="输入手机号码" />
							</view>
							<view class="form-phone uni-flex">
								<view class="form-phone-lf uni-flex">
									<image src="../../../static/login/ico2.png"></image>
								</view>
								<input class="uni-flex-item userNameIput" password placeholder-style="color:#e2e2e2" v-model="password" name="input"
								 placeholder="输入登录密码" />
							</view>
						</view>
						<view class="uni-flex uni-column" v-show="current === 1">
							<view class="form-phone uni-flex">
								<view class="form-phone-lf uni-flex">
									<image src="../../../static/login/ico1.png"></image>
								</view>
								<input class="uni-flex-item userNameIput" placeholder-style="color:#e2e2e2" v-model="phone" name="input"
								 placeholder="输入手机号码" />
							</view>
							<view class="form-phone uni-flex">
								<view class="form-phone-lf uni-flex">
									<image src="../../../static/login/login_message.png"></image>
								</view>
								<input class="uni-flex-item userNameIput" placeholder-style="color:#e2e2e2" v-model="code" name="input"
								 placeholder="输入短信验证码" />
								<view class="codeBtn uni-flex" >
									<button class="send uni-flex-item" :type="type" size="mini" @click="SendEsms">{{content}}</button>
								</view>
							</view>
						</view>
					</view>

				</view>
				<view class="btnImg" @click="Login">
					登录
				</view>
			</view>
			<view class="login-tip uni-flex">
				<view class="registerMsg" @click="goRegister">注册账号</view>
				<view class="line"></view>
				<view class="registerMsg" @click="goHome">返回首页</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import group from '../../../common/group.js';
	import sha1 from '../../../common/sha1.js';

	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser', 'favs'])
		},
		data() {
			return {
				url: "",
				phone: "",
				password: "",
				code: "",
				vcode: "",
				current: 0,
				activeClass: "login-tab-on",
				content: '发送验证码',
				totalTime: 10,
				type: "primary",
				canClick: true,
			};
		},
		onLoad(e) {
			this.url = e.url;
			this.init();
		},
		methods: {
			...mapMutations(['login', 'setFavs', 'setShare']),
			goRegister() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			goHome(){
				uni.switchTab({
					url:'../../home/home'
				})
			},
			Mode(e) {
				this.current = e;
			},
			Home() {
				uni.switchTab({
					url: '../../home/home'
				})
			},
			init() {
				if (this.hasLogin) {
					uni.navigateBack({
						delta: 1
					});
				}
			},
			SendEsms() {
				if (this.phone == "") {
					uni.showToast({
						icon: "none",
						title: "请填写手机号码",
					})
				} else {
					if (!this.canClick) return //改动的是这两行代码
					uni.showLoading({
						title: "发送中"
					});
					uni.request({
						url: this.webUrl + 'SendEsms',
						method: 'POST',
						data: {
							mobile: this.phone
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: res => {
							uni.hideLoading()
							if (res.data.result.status == "1") {
								this.vcode = res.data.result.code;
								this.canClick = false
								this.type = "default";
								this.content = this.totalTime + 's'
								let clock = setInterval(() => {
									this.totalTime--
									this.content = this.totalTime + 's'
									if (this.totalTime < 0) {
										clearInterval(clock)
										this.content = '重新发送'
										this.totalTime = 10
										this.canClick = true //这里重新开启
										this.type = "primary"
									}
								}, 1000)

							} else {
								uni.showToast({
									icon: "none",
									title: "发送失败",
								})
							}
						},
						fail: () => {},
						complete: () => {}
					});
				}
			},
			Login() {
				if (this.phone == "") {
					uni.showToast({
						icon: "none",
						title: "请填写手机号",
					});
					return false;
				}
				if (this.current == 0) {
					if (this.password == "") {
						uni.showToast({
							icon: "none",
							title: "请填写登录密码",
						});
						return false;
					}
				} else {
					if (this.code == "") {
						uni.showToast({
							icon: "none",
							title: "请填写验证码",
						});
						return false;
					}
				}
				uni.showLoading({
					title: "登录中"
				});
				uni.request({
					url: this.webUrl + 'login',
					method: 'POST',
					data: {
						code: this.code,
						vcode: this.vcode,
						phone: this.phone,
						current: this.current,
						password: sha1.hex_sha1(this.password)
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						uni.hideLoading();
						if (res.data.result.isSuccess) {
							this.login(JSON.stringify(res.data.user));
							this.setFavs(JSON.stringify(res.data.favs));
							uni.navigateBack({
								delta: 1
							});
						} else {
							uni.showToast({
								title: res.data.result.resultInfo,
								icon: "none"
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
			/* wxGetUserInfo(e) {
				this.loading = true;
				if (e.detail.errMsg !== 'getUserInfo:ok') {
					uni.showModal({
						title: "获取用户信息失败",
						content: "错误原因" + e.detail.errMsg,
						showCancel: false
					});
					return;
				} else {
					uni.request({
						url: this.webUrl + 'Register',
						method: 'POST',
						data: {
							code: this.code,
							userInfo: JSON.stringify(e.detail.userInfo),
							shareId: this.shareId
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: res => {
							if (res.data.result.isSuccess) {
								this.loading = false;
								this.login(JSON.stringify(res.data.result.resultInfo));
								this.setFavs(JSON.stringify(res.data.result.resultInfo2));
								group.updateCart([]);
								uni.navigateBack({
									delta: 1
								});
							}
						},
						fail: () => {},
						complete: () => {}
					});

				}
			} */

		}
	}
</script>
<style>
	page {
		background: #FFFFFF;
	}

	.jz_login .btnImg {
		width: 460upx;
		text-align: center;
		height: 80upx;
		line-height: 80upx;
		color: #FFFFFF;
		background: url(../../../static/btn.png) no-repeat;
		background-size: 460upx 80upx;
	}
</style>
