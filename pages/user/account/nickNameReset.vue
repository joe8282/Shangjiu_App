<template>
	<view class="uni-flex uni-column nickNameReset jz_address">
		<view class="uni-flex">
			<input v-model="user.nickName" />
		</view>
		<view class="addBtnwrap uni-flex justify-align-center">
			<view class="addBtn uni-flex justify-align-center" @click="submit">保存昵称</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
		},
		data() {
			return {
				user: {}
			}
		},
		onLoad() {
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '../login/login',
				});
			} else {
				this.user = JSON.parse(this.jyyUser);
			}

		},
		methods: {
			...mapMutations(['login']),
			submit() {
				if (this.nickName == '') {
					uni.showToast({
						duration: 1000,
						title: '昵称不为空',
						icon: "none"
					})
				} else {
					uni.showLoading({
						title: '更新中'
					})
					uni.request({
						url: this.webUrl + 'SaveInfo',
						method: 'POST',
						data: {
							userid: this.user.id,
							nickName: this.user.nickName
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: res => {
							uni.hideLoading();
							this.login(JSON.stringify(this.user));

							uni.showToast({
								icon: "none",
								title: res.data.result.resultInfo,
								success() {
									setTimeout(() => {
										uni.navigateBack({
											delta: 1
										})
									}, 1000)
								}
							})
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
	.jz_address .addBtnwrap {
		width: 100%;
		margin-top: 30upx;
	}

	.nickNameReset input {
		width: 100%;
		border: 0;
		background: #FFFFFF;
		height: 80upx;
		line-height: 80upx;
		padding-left: 20upx;
		box-sizing: border-box;
	}

	.jz_address .addBtn {
		width: 550rpx;
		height: 115rpx;
		color: #FFFFFF;
		font-size: 28rpx;
		margin: 0 auto;
		background: url(../../../static/btn.png) no-repeat;
		background-size: 550rpx 115rpx;
	}
</style>
