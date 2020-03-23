<template>

	<view class="jz_login jz_register">
		<view class="uni-flex login-top" @click="Home">
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

					<view class="uni-flex content uni-flex-item">
						<view class="uni-flex uni-column">
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
								<input class="uni-flex-item userNameIput" password placeholder-style="color:#e2e2e2" v-model="password1" name="input"
								 placeholder="输入登录密码" />
							</view>
							<view class="form-phone uni-flex">
								<view class="form-phone-lf uni-flex">
									<image src="../../../static/login/ico2.png"></image>
								</view>
								<input class="uni-flex-item userNameIput" password placeholder-style="color:#e2e2e2" v-model="password2" name="input"
								 placeholder="确认登录密码" />
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
				<view class="btnImg" @click="Register">
					注册
				</view>
			</view>
			<view class="login-tip uni-flex">
				<view class="registerMsg" @click="goRegister">已有账号登录</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import sha1 from '../../../common/sha1.js';

	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser', 'favs', 'shareId'])
		},
		data() {
			return {
				phone: "",
				code: "",
				vcode: "",
				password1: "",
				password2: "",
				content: '发送验证码',
				totalTime: 10,
				type: "primary",
				canClick: true,
				shareId: 0
			};
		},
		onLoad() {
			this.init();
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			...mapMutations(['login', 'setFavs', 'setShare']),
			goRegister(){
				uni.navigateTo({
					url:'../login/login'
				})
			},
			init() {
				if (!this.hasLogin) {
					uni.getStorage({
						key: 'shareUserId',
						success: (res) => {
							this.shareId = res.data;
							console.log(this.shareId)
						}
					});
				}
			},
			Register() {
				if (this.phone == "") {
					uni.showToast({
						icon: "none",
						title: "请填写手机号",
					});
					return false;
				}
				if (this.password1 == "") {
					uni.showToast({
						icon: "none",
						title: "请输入登录密码",
					});
					return false;
				}
				if (this.password2 == "") {
					uni.showToast({
						icon: "none",
						title: "请确认登录密码",
					});
					return false;
				}
				if (this.code == "") {
					uni.showToast({
						icon: "none",
						title: "请填写验证码",
					});
					return false;
				}
				uni.showLoading({
					title: "注册中"
				});
				uni.request({
					url: this.webUrl + 'Register',
					method: 'POST',
					data: {
						phone: this.phone,
						pass1: sha1.hex_sha1(this.password1),
						pass2: sha1.hex_sha1(this.password2),
						shareId: this.shareId,
						code: this.code,
						vcode: this.vcode
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						uni.hideLoading();
						if (res.data.result.isSuccess) {
							this.login(JSON.stringify(res.data.user));
							this.setFavs(JSON.stringify(res.data.favs));
							uni.switchTab({
								url: '../user/user'
							});
						} else {
							uni.showToast({
								icon: "none",
								title: res.data.result.resultInfo,
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});

			},
			Home() {
				uni.switchTab({
					url: '../../home/home'
				})
			},
			SendEsms() {
				if (this.phone == "") {
					uni.showToast({
						icon: "none",
						title: "请填写手机号码",
					})
				} else {
					console.log(this.canClick)
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
			}
		}
	}
</script>
<style>
	.jz_login .btnImg {
		width: 460upx;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
		font-size: 24upx;
		color: #FFFFFF;
		background: url(../../../static/btn.png) no-repeat;
		background-size: 460upx 80upx;
	}
</style>
