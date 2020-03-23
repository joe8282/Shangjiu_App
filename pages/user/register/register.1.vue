<template>

	<view class="login uni-flex uni-column register">
		<view class="uni-flex login-top" @click="Home">
			<image mode="widthFix" src="../../../static/login/login_bg.png"></image>
		</view>
		<view class="login-bottom uni-flex-item uni-column uni-flex">
			<view class="login-form uni-flex uni-column">
				<view class="logoImg uni-flex">
					<image src="../../../static/login/login_logo.png"></image>
				</view>
				<view class="tab uni-flex uni-flex-item uni-column">
					<view class="content uni-flex-item">
						<view>
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
								<input class="uni-flex-item userNameIput" placeholder-style="color:#e2e2e2" v-model="password" name="input"
								 placeholder="输入登录密码" />
							</view>
							<view class="form-phone uni-flex">
								<view class="form-phone-lf uni-flex">
									<image src="../../../static/login/ico2.png"></image>
								</view>
								<input class="uni-flex-item userNameIput" placeholder-style="color:#e2e2e2" v-model="password" name="input"
								 placeholder="确认登录密码" />
							</view>
							<view class="form-phone uni-flex">
								<view class="form-phone-lf uni-flex">
									<image src="../../../static/login/login_message.png"></image>
								</view>
								<input class="uni-flex-item userNameIput" placeholder-style="color:#e2e2e2" v-model="password" name="input"
								 placeholder="输入短信验证码" />
								<view class="codeBtn">
									获取验证码
								</view>
							</view>
						</view>
					</view>

				</view>
				<view class="btnImg">
					<image src="../../../static/login/login_btn.png"></image>
				</view>
			</view>
			<view class="login-tip uni-flex">
				<view class="registerMsg">已有账号登录</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				userName: "",
				code: "",
				vcode: "",
				content: '发送验证码',
				totalTime: 10,
				type: "primary",
				canClick: true

			};
		},
		onLoad(e) {
			this.id = e.id;
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			...mapMutations(['login']),
			Register() {
				if (this.userName == "") {
					uni.showToast({
						icon: "none",
						title: "请填写手机号",
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
				// 				if (this.no == "") {
				// 					uni.showToast({
				// 						icon: "none",
				// 						title: "请填写激活码",
				// 					});
				// 					return false;
				// 				}
				uni.showLoading({
					title: "注册中"
				});
				uni.request({
					url: this.webUrl + 'Register',
					method: 'POST',
					data: {
						id: this.id,
						userName: this.userName,
						code: this.code,
						vcode: this.vcode
						// no: this.no
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						uni.hideLoading();
						if (res.data.result.isSuccess) {
							this.login(JSON.stringify(res.data.user));
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
			SendEsms() {
				if (this.userName == "") {
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
							mobile: this.userName
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
										this.canClick = false //这里重新开启
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
