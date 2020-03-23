<template>
	<view class="jz_beginCard uni-flex uni-column jz_loginPassword">
		<form class="uni-flex uni-flex-item uni-column form" @submit="formSubmit" @reset="formReset">
			<view class="uni-flex-item justify-align-center uni-flex uni-column">
				<view class="beginCard_name uni-flex align-items">
					<view class="uni-flex-item">输入新密码：</view>
					<input type="text" password class="uni-flex-item3" v-model="newpassword" name="newpassword" placeholder="请输入新密码" />
				</view>
				<view class="beginCard_name uni-flex align-items">
					<view class="uni-flex-item">确认新密码：</view>
					<input type="text" password class="uni-flex-item3" v-model="confirmPassword" name="confirmPassword" placeholder="确认新密码" />
				</view>
				<view class="beginCard_btn">
					<button formType="submit">
						确认
					</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	var graceChecker = require('../../../common/graceChecker.js');
	import sha1 from '../../../common/sha1.js';

	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				newpassword: '',
				code: '',
				user: {}
			}
		},
		computed: {
			...mapState(['hasLogin', 'jyyUser'])
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
			formSubmit: function(e) {

				var rule = [{
						name: 'newpassword',
						checkType: 'notnull',
						checkRule: '1',
						errorMsg: '输入新密码'
					},
					{
						name: 'confirmPassword',
						checkType: 'notnull',
						checkRule: '1',
						errorMsg: '确认新密码'
					}

				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);

				if (checkRes) {
					uni.request({
						url: this.webUrl + 'UpdatePass',
						method: 'POST',
						data: {
							newpassword: sha1.hex_sha1(this.newpassword),
							confirmPassword: sha1.hex_sha1(this.confirmPassword),
							userId: this.user.id
						},
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						success: res => {
							uni.hideLoading();
							uni.showToast({
								title: res.data.result.resultInfo,
								icon: 'none'
							});
						},
						fail: () => {},
						complete: () => {}
					});
				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: 'none'
					});
				}
			},
		}
	}
</script>

<style>
	.jz_beginCard .beginCard_btn button {
		display: block;
		width: 550upx;
		height: 115upx;
		line-height: 115upx;
		font-size: 28upx;
		color: #FFFFFF;
		background: url(../../../static/btn.png) no-repeat;
		background-size: 550upx 115upx;
	}
</style>
