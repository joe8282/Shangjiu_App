<template>
	<view class="jz_beginCard uni-flex uni-column">
		<view class="beginCardImg">
			<image src="https://www.jinzun99.com/static/01.png"></image>
		</view>
		<form class="uni-flex uni-flex-item uni-column form" @submit="formSubmit" @reset="formReset">
			<view class="uni-flex-item justify-align-center uni-flex uni-column">
				<view class="beginCard_name uni-flex align-items">
					<view class="uni-flex-item">真实姓名：</view>
					<input type="text"  class="uni-flex-item3" v-model="nickName" name="nickName" placeholder="请填写姓名"  placeholder-style="font-size: 24upx;"/>
				</view>
				<view class="beginCard_name uni-flex align-items">
					<view class="uni-flex-item">手机号码：</view>
					<input type="text"  class="uni-flex-item3" v-model="mobile" name="mobile" placeholder="请填写手机号码"   placeholder-style="font-size: 24upx;"/>
				</view>
				<view class="beginCard_btn">
					<button formType="submit" class="uni-flex justify-align-center">
						提交申请
					</button>
				</view>
				<view class="uni-flex align-items beginCard-phone">
					<image src="../../../static/beginCard/03.png"></image>
					官方联系电话
				</view>
				<view class="uni-flex align-items phone">
					400-888-6666
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	var graceChecker = require('../../../common/graceChecker.js');
	
	import {
		mapState,
		mapMutations
	} from 'vuex';

	export default {
		data() {
			return {
				nickName: '',
				mobile: '',
				user: {}
			}
		},
		computed: {
			...mapState(['hasLogin', 'jyyUser'])
		},
		onLoad() {
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '../login/login'
				});
			} else {
				this.user = JSON.parse(this.jyyUser);
				this.nickName=this.user.nickName;
				this.mobile=this.user.mobile;
			}
		},
		methods: {
			formSubmit: function(e) {

				var rule = [{
						name: 'nickName',
						checkType: 'notnull',
						checkRule: '1,4',
						errorMsg: '请填写姓名'
					},
					{
						name: 'mobile',
						checkType: 'string',
						checkRule: '11',
						errorMsg: '手机号码11个字符'
					}

				];
				//进行表单检查
				var formData = e.detail.value;
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					uni.request({
						url: this.webUrl + 'OpenBrand',
						method: 'POST',
						data: {
							nickName: this.nickName,
							mobile: this.mobile
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
	.jz_beginCard .beginCard_btn button{
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
