<template>
	<view class="jz_beginCard uni-flex uni-column">
		<view class="beginCardImg" style="height: 360upx;"><image src="https://www.jinzun99.com/static/04.png" style="height: 360upx;"></image></view>
		<form class="uni-flex uni-flex-item uni-column form" @submit="formSubmit" @reset="formReset">
			<view class="uni-flex-item justify-align-center uni-flex uni-column">
				<!-- 多选 -->
				<view class="beginCard_name uni-flex align-items" v-if="allSelectStatus">
					<view class="uni-flex-item">申请商品：(合计: {{agencyArrs.length}})</view>
					<view class="uni-flex-item3 uni-flex uni-column " :class="[agencyArrs.length>1?'agencyArrs':'agencyArrsSingle']">
						<view class="agencyArr"  v-for="(item,index) in agencyArrs" :key="index">
							<view class="productPic uni-flex align-items">
								<image :src="item.pic"></image>
								<text class="uni-flex-item AagencyTitle">{{ item.title }}</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 单选 -->
				<view class="beginCard_name uni-flex align-items" v-if="agency.productTitle">
					<view class="uni-flex-item">申请商品：</view>
					<view class="uni-flex-item3 uni-flex">
						<view class="product_pic uni-flex"><image :src="agency.productPic"></image></view>
						<view class="product_title uni-flex justify-align-center">{{ agency.productTitle }}</view>
					</view>
				</view>
				
				<view class="beginCard_name uni-flex align-items" v-if="agency.address||allSelectStatus==true">
					<view class="uni-flex-item">代理地区：</view>
					<input type="text" class="uni-flex-item3" v-model="agency.address" name="address" disabled="disabled" />
				</view>
				<view class="beginCard_name uni-flex align-items">
					<view class="uni-flex-item">真实姓名：</view>
					<input type="text" class="uni-flex-item3" v-model="nickName" name="nickName" placeholder="请填写姓名" />
				</view>
				<view class="beginCard_name uni-flex align-items">
					<view class="uni-flex-item">手机号码：</view>
					<input type="text" class="uni-flex-item3" v-model="mobile" name="mobile" placeholder="请填写手机号码" />
				</view>
				<view class="beginCard_name  uni-flex align-items" v-if="user.licenseUrl == null">
					<view class="uni-flex-item">营业执照：</view>
					<view class="uni-flex-item3">
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
				</view>
				<view class="beginCard_btn"><button formType="submit" class="uni-flex justify-align-center">提交申请</button></view>
			</view>
		</form>
	</view>
</template>

<script>
var graceChecker = require('../../../common/graceChecker.js');
import robbyImageUpload from '../../../components/robby-image-upload/robby-image-upload.vue';
import { mapState, mapMutations } from 'vuex';

export default {
	components: {
		robbyImageUpload
	},
	data() {
		return {
			nickName: '',
			mobile: '',
			user: {},
			show: true,
			imageData: [],
			serverUrl: this.webUrl + 'Upload',
			formData: {
				userId: 2
			},
			agency: {},
			allSelectStatus: false,//单选状态,
			agencyArrs: []//多选代理产品信息
		};
	},
	computed: {
		...mapState(['hasLogin', 'jyyUser','agencyArr'])
	},
	onLoad(e) {
		if (!this.hasLogin) {
			uni.navigateTo({
				url: '../login/login'
			});
		} else {
			if(e.key){//多选申请代理
				this.agencyArrs = JSON.parse(this.agencyArr);//代理商品信息
				this.agency.label = e.key;//代理地址
				this.agency.address = e.key;//代理地址
				this.agency.id = e.addressId;//代理地址id
				this.allSelectStatus = true;//多选状态
				this.user = JSON.parse(this.jyyUser);
				this.mobile = this.user.mobile;
				this.nickName = this.user.nickName;
			}
			else if (e.path) {//会员中心申请代理
				this.agency.productId = 0;
				this.agency.productTitle = '';
				this.agency.productPic = '';
				this.agency.address = '';
				this.user = JSON.parse(this.jyyUser);
				this.mobile = this.user.mobile;
				this.nickName = this.user.nickName;
			} else {//单选申请代理
				this.agency = JSON.parse(decodeURIComponent(e.agency));
				for (var k in this.agency) {
					if (k == 'value') {
						delete this.agency[k];
					}
					if (k == 'cityCode') {
						delete this.agency[k];
					}
				}
				this.user = JSON.parse(this.jyyUser);
				this.mobile = this.user.mobile;
				this.nickName = this.user.nickName;
			}
		}
	},
	methods: {
		deleteImage: function(e) {
			console.log(e);
		},
		addImage: function(e) {
			console.log(e);
		},
		formSubmit: function(e) {
			let image = this.imageData.length > 0 ? this.imageData[0] : '';
			var rule = [
				{
					name: 'nickName',
					checkType: 'notnull',
					checkRule: '1,4',
					errorMsg: '请填写真实姓名'
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
				if (this.user.licenseUrl == null && image == '') {
					uni.showToast({
						title: '请上传运营执照',
						icon: 'none'
					});
				} else {
					if (image == '') {
						image = this.user.licenseUrl;
					}
					let Agency = {};
					if(this.allSelectStatus){//多选申请代理
					
					for(let i=0;i<this.agencyArrs.length;i++){
						delete this.agencyArrs[i].title;
						delete this.agencyArrs[i].pic;
					}
					console.log(this.agencyArrs)
						Agency.agency = this.agencyArrs;
						Agency.area ={};
						Agency.area.id = this.agency.id;
						Agency.area.label = this.agency.label;
					}else if(this.agency.productId==0){//会员中心申请代理
						 Agency = {}
					}
					else{//单选申请代理
						Agency.agency = [{
							id:this.agency.productId
						}];
						Agency.area ={};
						Agency.area.id = this.agency.id;
						Agency.area.label = this.agency.label;
					}
					
					uni.request({
						url: this.webUrl + 'AgentApplyfor',
						method: 'POST',
						data: {
							nickName: this.nickName,
							mobile: this.mobile,
							imageData: image,
							userid: this.user.id,
							agency: JSON.stringify(Agency)
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
							setTimeout(() => {
								uni.switchTab({
									url: '../user/user'
								});
							}, 500);
						},
						fail: () => {},
						complete: () => {}
					});
				}
			} else {
				uni.showToast({
					title: graceChecker.error,
					icon: 'none'
				});
			}
		}
	}
};
</script>

<style>
/*  修改的*/

/* 一个商品时候的高度 */
.agencyArrsSingle {
	height: 124upx;
}
	
/* 多个商品时候的高度 */
.agencyArrs {
	height: 280upx;
	overflow-y: scroll;
}

.AagencyTitle {
	margin-left: 20upx;
}
.productPic {
	margin-bottom: 30upx;
}
.productPic image {
	width: 120upx;
	height: 120upx;
	border: 1upx solid #dfdfdf;
	border-radius: 8upx;
}






.jz_beginCard .beginCard_btn {
	margin: 50upx 0 0 0;
}

.jz_beginCard .beginCard_btn button {
	display: block;
	width: 550upx;
	height: 115upx;
	line-height: 115upx;
	font-size: 28upx;
	color: #ffffff;
	background: url(../../../static/btn.png) no-repeat;
	background-size: 550upx 115upx;
}

.product_pic {
	width: 120upx;
	height: 120upx;
	margin: 20upx 0;
}

.product_pic image {
	width: 120upx;
	height: 120upx;
	border: 1upx solid #dfdfdf;
	border-radius: 8upx;
}


.product_title {
	margin-left: 30upx;
}

.jz_beginCard .beginCard_name {
	height: auto;
	margin-top: 20upx;
	padding: 15upx 40upx;
}

.jz_beginCard .beginCard_name .imageItem,
.jz_beginCard .beginCard_name .imageUpload {
	width: 120upx;
	height: 120upx;
	line-height: 100upx;
	font-size: 100upx;
	margin: 0 !important;
}

.jz_beginCard .beginCard_name .imageUploadContainer {
	margin: 0;
	padding: 20upx 0;
	margin-left: 0;
	padding-left: 0;
}
</style>
