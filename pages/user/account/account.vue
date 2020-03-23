<template>
	<view class="uni-flex uni-column" id="account">
		<view class="uni-flex uni-column">
			<uni-list>
				<view class="uni-flex space-between align-items listHead ">
					<view class="uni-flex  headRt">头像</view>
					<view class="uni-flex headLf space-between">
						<!-- #ifndef H5 -->
						<avatar
							selWidth="200px"
							selHeight="400upx"
							@upload="myUpload"
							:avatarSrc="user.avatarUrl"
							avatarStyle="width: 120upx; height: 120upx; "
							v-if="avatarUrl != null"
						></avatar>
						<avatar
							selWidth="200px"
							selHeight="400upx"
							@upload="myUpload"
							:avatarSrc="url"
							avatarStyle="width: 120upx; height: 120upx; "
							v-if="avatarUrl == null"
						></avatar>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<view class="uploadImg">
							<robby-image-upload
								v-model="imageData"
								fileKeyName="data"
								:limit="1"
								:server-url="serverUrl"
								:showUploadProgress="show"
								:form-data="formData"
								@delete="deleteImage"
								@add="addImage"
							></robby-image-upload>
						</view>
						<!-- #endif -->
						<ni-icon class="uni-icon-wrapper uni-flex justify-align-center" :size="20" color="#bbb" type="arrowright" />
					</view>
				</view>
				<uni-list-item title="昵称" :show-badge="true" :badge-text="nickName" @click="nickNameReset" />
				<uni-list-item :show-badge="true" :badge-text="user.mobile" title="手机号" @click="showTip" />
			</uni-list>
		</view>
	</view>
</template>

<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item02.vue';
import robbyImageUpload from '../../../components/robby-image-upload/robby-image-uploadL.vue';
var graceChecker = require('../../../common/graceChecker.js');

import { mapState, mapMutations } from 'vuex';
import niIcon from '@/components/ni-iconss/ni-icons.vue';
import avatar from '@/components/yq-avatar/yq-avatar.vue';
export default {
	computed: {
		...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
	},
	components: {
		uniList,
		uniListItem,
		niIcon,
		avatar,
		robbyImageUpload
	},
	methods: {
		...mapMutations(['login']),
		deleteImage() {},
		addImage: function(e) {
			if (e.allImages.length > 0) {
				uni.showToast({
					title: '修改成功',
					icon: 'success',
					duration: 1000
				});
				this.user.avatarUrl = e.allImages[0];
				this.avatarUrl = e.allImages[0];
				this.login(JSON.stringify(this.user));
				this.postData();
			}
		},
		postData() {
			uni.request({
				url: this.webUrl + 'SaveInfo',
				method: 'POST',
				data: {
					userid: this.user.id,
					avatarUrl: this.avatarUrl
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					uni.hideLoading();
				},
				fail: () => {},
				complete: () => {}
			});
		},
		showTip() {
			uni.showToast({
				title: '手机号不可修改！',
				duration: 1000,
				icon: 'none'
			});
		},
		nickNameReset() {
			uni.navigateTo({
				url: 'nickNameReset'
			});
		},
		myUpload(rsp) {
			this.user.avatarUrl = rsp.path;
			uni.uploadFile({
				url: this.webUrl + 'Upload',
				filePath: this.user.avatarUrl,
				name: 'data',
				success: res => {
					uni.showToast({
						title: '修改成功',
						icon: 'success',
						duration: 1000
					});
					this.user.avatarUrl = res.data;
					this.avatarUrl = res.data;
					this.login(JSON.stringify(this.user));
					this.postData();
				},
				fail: err => {
					uni.showModal({
						content: err.errMsg,
						showCancel: false
					});
					uni.hideLoading();
				},
				complete: () => {}
			});
		},
		formSubmit: function(e) {
			var rule = [
				{
					name: 'nickName',
					checkType: 'notnull',
					checkRule: '1,4',
					errorMsg: '请填写账号呢称'
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
					url: this.webUrl + 'SaveInfo',
					method: 'POST',
					data: {
						user: JSON.stringify(this.user)
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						uni.hideLoading();
						this.login(JSON.stringify(this.user));
						uni.showModal({
							title: '系统提示',
							content: res.data.result.resultInfo,
							showCancel: false,
							success: function(res) {
								if (res.confirm) {
									uni.switchTab({
										url: '../user/user'
									});
								}
							}
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
		}
	},
	onShow() {
		this.user = JSON.parse(this.jyyUser);
		this.nickName = this.user.nickName;
	},
	onLoad(e) {
		if (!this.hasLogin) {
			uni.navigateTo({
				url: '../login/login'
			});
		} else {
			this.user = JSON.parse(this.jyyUser);
			this.nickName = this.user.nickName;
			// #ifdef MP-WEIXIN
			this.avatarUrl = this.user.avatarUrl;
			// #endif
			// #ifdef H5
			this.imageData[0] = this.user.avatarUrl;
			// #endif
		}
	},
	data() {
		return {
			imageData: [],
			serverUrl: this.webUrl + 'Upload',
			show: true,
			formData: {
				userId: 2
			},
			user: {},
			nickName: '',
			avatarUrl: '',
			url: '../../static/user/02.png'
		};
	}
};
</script>

<style>
.uni-list-item__container {
}
.headLf {
	/* width: 25%; */
	margin-right: 30upx;
	/* padding-right: 30upx; */
}
.headRt {
	font-size: 32upx;
	color: #333333;
}
.listHead {
	/* width: 100%; */
	height: 164upx;
	margin-left: 28upx;
	box-sizing: border-box;
	border-bottom: 1upx solid #f2f2f2;
}

.uni-badge-success {
	background: none;
	color: #999999;
}

#account .uni-badge-success {
	font-size: 28upx;
}

.uni-list-item__content-title {
	color: #333333;
}

.uni-list-item:first-child .uni-list-item__content .uni-list-item__content-title {
	display: flex;
	align-items: center;
	height: 84upx;
}

.uni-list-item__container {
	position: relative;
	padding: 20upx 30upx !important;
}

.uni-list-item__icon {
	position: absolute;
	right: 50upx;
}

.uni-list-item__icon image {
	width: 100upx;
	height: 100upx;
	border-radius: 50%;
}
</style>
