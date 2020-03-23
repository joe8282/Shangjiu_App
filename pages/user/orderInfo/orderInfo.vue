<template>
	<view class="uni-flex uni-column  orderInfo ">
		<view class="uni-flex uni-column orderInfo-status">
			<!-- <image mode="widthFix" src="../../../static/order/status1.jpg"></image> -->
			<view class="uni-flex uni-flex-item"></view>
			<view class="uni-flex uni-flex-item2 item-padding fontWt">{{ orderStatus }}</view>
			<view v-if="showTimer" class="uni-flex uni-flex-item2 item-padding">
				<uni-order-countdown
					bgrColor="transparent"
					borderColor="transparent"
					splitorColor="#fff"
					fontColor="#fff"
					:orderStr="orderStr"
					:timer="timer"
				></uni-order-countdown>
			</view>
			<view class="uni-flex uni-flex-item"></view>
		</view>
		<!-- <view class="uni-flex uni-column order-address">
			<view class="uni-flex uni-column order-address-box">
				<view class="uni-flex uni-flex-item uni-row orderMsg">收货信息</view>
				<view class="uni-flex uni-flex-item uni-row">
					{{data.express}}
				</view>
			</view>
			<view class="uni-flex uni-flex-item order-address-line">
				<image src="../../../static/cart/line.png" mode="widthFix"></image>
			</view>
		</view> -->
		<view class=" order-address">
			<view class=" order-address-box">
				<view class=" orderMsg">收货信息</view>
				<view class=" uni-row">{{ orderInfo.express }}</view>
			</view>
			<view class="uni-flex uni-flex-item order-address-line"><image src="../../../static/cart/line.png"></image></view>
		</view>

		<view class="uni-flex uni-column order-items">
			<view class="uni-flex uni-row uni-flex-item order-shop-name order-boder">{{ orderInfo.shopName }}</view>
			<view class="uni-flex uni-row order-item" v-for="(item, key) in orderInfo.items" :key="key">
				<view class="uni-flex uni-flex-item pic item-padding"><image mode="widthFix" :src="item.pic"></image></view>
				<view class="uni-flex uni-column uni-flex-item3 item-padding">
					<text class="uni-text order-title">{{ item.title }}</text>
					<text class="uni-text order-specs">{{ item.productSpecsStr }}</text>
					<text class="uni-text order-specs">小计</text>
				</view>
				<view class="uni-flex uni-column uni-flex-item item-padding">
					<text class="uni-text color-f40">￥{{ item.totalPrice / item.amount }}</text>
					<text class="uni-text">x{{ item.amount }}</text>
					<text class="uni-text color-f40">￥{{ item.totalPrice }}</text>
				</view>
			</view>
			<view class="uni-flex order-line item-padding order-boder order-line-small">
				<view class="uni-flex uni-flex-item">商品总件</view>
				<view class="uni-flex uni-flex-item justify-flex-end">{{ orderInfo.orderItemCount }}</view>
			</view>
			<view class="uni-flex order-line item-padding order-boder order-line-small">
				<view class="uni-flex uni-flex-item">商品总价</view>
				<view class="uni-flex uni-flex-item justify-flex-end">￥{{ orderInfo.totalPrice }}</view>
			</view>
			<view class="uni-flex order-line item-padding order-boder order-line-small">
				<view class="uni-flex uni-flex-item">运费(快递)</view>
				<view class="uni-flex uni-flex-item justify-flex-end">￥{{ orderInfo.expressCost }}</view>
			</view>
			<view class="uni-flex order-line item-padding totalPrice ">
				<view class="uni-flex uni-flex-item">订单总价</view>
				<view class="uni-flex uni-flex-item justify-flex-end color-f40">￥{{ allPrice }}</view>
			</view>
		</view>

		<view class="uni-flex uni-column oderinfo-other">
			<view class="uni-flex order-line-small item-padding order-boder">订单编号：{{ orderInfo.orderNo }}</view>
			<view class="uni-flex order-line-small item-padding order-boder">创建时间：{{ orderInfo.createDate }}</view>
			<!-- 收款信息：<text style="font-size: 28upx; color: #FF0000;">{{orderInfo.payBankInfo}}</text> -->
			<view v-if="orderInfo.payBankCode" class="uni-flex order-line-small item-padding order-boder uni-column">
				<view class="uni-flex order-line-small  order-boder space-between">
					<view>收款对象：{{ payBankInfo.getMoneyPeople }}</view>
					<view class="setClipboardData" @click="setClipboardData(payBankInfo.getMoneyPeople)">复制</view>
				</view>
				<view class="uni-flex order-line-small order-boder space-between">
					<view>银行名称：{{ payBankInfo.bankName }}</view>
					<view class="setClipboardData" @click="setClipboardData(payBankInfo.bankName)">复制</view>
				</view>
				<view class="uni-flex order-line-small  order-boder space-between">
					<view>银行账号：{{ payBankInfo.bankNum }}</view>
					<view class="setClipboardData" @click="setClipboardData(payBankInfo.bankNum)">复制</view>
				</view>
				<view class="uni-flex order-line-small  order-boder space-between">
					<view>银行地址：{{ payBankInfo.bankAddress }}</view>
					<view class="setClipboardData" @click="setClipboardData(payBankInfo.bankAddress)">复制</view>
				</view>
			</view>
			<view v-if="orderInfo.payBankCode" class="uni-flex order-line-small item-padding order-boder">
				汇款识别码：
				<text style="font-size: 28upx; color: #FF0000;">{{ orderInfo.payBankCode }}</text>
			</view>
			<view v-if="waitPayBtn" class="uni-flex order-line-small item-padding order-boder align-items" style="height: 220upx;">
				<view class="">上传汇款单：</view>
				<view class="uni-flex-item">
					<robby-image-upload
						v-model="imageData"
						fileKeyName="data"
						:limit="3"
						:server-url="serverUrl"
						:showUploadProgress="show"
						:form-data="formData"
						@delete="deleteImage"
						@add="addImage"
					></robby-image-upload>
				</view>
			</view>
		</view>

		<view class="uni-flex uni-row footer justify-flex-end">
			<view v-if="delBtn" class="btn" @click="bindDel">删除订单</view>
			<view v-if="cancelBtn" class="btn" @click="bindCancel">取消订单</view>
			<view v-if="payBtn" class="btn" @click="bindPay">付款</view>
			<view v-if="waitPayBtn" class="btn">等待汇款</view>
			<view v-if="refundBtn" class="btn" @click="bindRefund">{{ refundStr }}</view>
			<view v-if="emsBtn" class="btn" @click="bindEms">查看物流</view>
			<view v-if="doneBtn" class="btn" @click="bindDone">确认收货</view>
			<!-- <view v-if="evaluateBtn" class="btn" @click="bindEvaluate">
				{{evaluateStr}}
			</view> -->
		</view>
	</view>
</template>

<script>
import order from '../../../common/order.js';
import util from '../../../common/util.js';
import uniOrderCountdown from '../../../components/uni-order-countdown.vue';
import robbyImageUpload from '../../../components/robby-image-upload/robby-image-upload.vue';
import { mapState, mapMutations } from 'vuex';

export default {
	components: {
		uniOrderCountdown,
		robbyImageUpload
	},
	computed: {
		...mapState(['hasLogin', 'forcedLogin', 'jyyUser']),
		allPrice: function() {
			return (parseFloat(this.orderInfo.totalPrice) + parseFloat(this.orderInfo.expressCost)).toFixed(2);
		},
		delBtn: function() {
			return this.orderInfo.orderStatus == 99;
		},
		cancelBtn: function() {
			return this.orderInfo.orderStatus == 1;
		},
		payBtn: function() {
			return (this.orderInfo.orderStatus == 1) & (this.orderInfo.payMode == 0);
		},
		waitPayBtn: function() {
			return (this.orderInfo.orderStatus == 1) & (this.orderInfo.payMode == 2);
		},
		refundBtn: function() {
			return this.orderInfo.orderStatus == 2 || this.orderInfo.orderStatus == 3;
		},
		refundStr: function() {
			let str = '';
			switch (parseInt(this.orderInfo.refundState)) {
				case 0:
					str = '申请退款';
					break;
				case 1:
					str = '退款中';
					break;
				case 2:
					str = '退款成功';
					break;
				case 3:
					str = '退款失败';
			}
			return str;
		},
		emsBtn: function() {
			return this.orderInfo.orderStatus == 3 || this.orderInfo.orderStatus == 4;
		},
		doneBtn: function() {
			return this.orderInfo.orderStatus == 3;
		},
		evaluateBtn: function() {
			return this.orderInfo.orderStatus == 4;
		},
		evaluateStr: function() {
			let str = '';
			switch (parseInt(this.orderInfo.evaluateState)) {
				case 0:
					str = '立即评价';
					break;
				case 1:
					str = '查看评价';
					break;
			}
			return str;
		},
		orderStatus: function() {
			let str = '';
			switch (parseInt(this.orderInfo.orderStatus)) {
				case 1:
					str = '待付款';
					break;
				case 2:
					str = '已支付';
					break;
				case 3:
					str = '已发货';
					break;
				case 4:
					str = '交易成功';
					break;
				case 99:
					str = '订单取消';
					break;
			}
			return str;
		}
	},
	methods: {
		setClipboardData(val) {
			uni.setClipboardData({
				data: val,
				success() {
					uni.showToast({
						title: '复制成功',
						icon: 'none'
					});
				}
			});
		},
		bindDone(e) {
			order.done(this.webUrl, this.orderInfo, this.user);
		},
		bindDel() {
			order.del(this.webUrl, this.orderInfo, this.user.id);
		},
		bindCancel(e) {
			order.cancel(this.webUrl, this.orderInfo, this.user.id);
		},
		bindPay(e) {
			order.pay(this.orderInfo);
		},
		bindRefund(e) {
			order.refund(this.orderInfo);
		},
		bindEms(e) {
			order.ems(this.orderInfo);
		},
		bindEvaluate(e) {
			order.evaluate(this.orderInfo);
		},
		init() {
			this.getData();
		},
		deleteImage: function(e) {
			let imageData2 = [];
			if (e.allImages.length > 0) {
				for (let i = 0; i < e.allImages.length; i++) {
					imageData2.push({ pic: e.allImages[i] });
				}
			}
			uni.request({
				url: this.webUrl + 'OrderPayBankPic',
				method: 'POST',
				data: {
					orderNo: this.orderInfo.orderNo,
					userid: this.user.id,
					pic: JSON.stringify(imageData2)
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.data.result.isSuccess) {
						uni.showToast({
							title: res.data.result.resultInfo,
							icon: 'none'
						});
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		addImage: function(e) {
			let imageData2 = [];
			if (e.allImages.length > 0) {
				for (let i = 0; i < e.allImages.length; i++) {
					imageData2.push({ pic: e.allImages[i] });
				}
				uni.request({
					url: this.webUrl + 'OrderPayBankPic',
					method: 'POST',
					data: {
						orderNo: this.orderInfo.orderNo,
						userid: this.user.id,
						pic: JSON.stringify(imageData2)
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (res.data.result.isSuccess) {
							uni.showToast({
								title: res.data.result.resultInfo,
								icon: 'none'
							});
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		getData() {
			uni.showLoading({
				title: '加载中'
			});
			uni.request({
				url: this.webUrl + 'GetOrderInfo',
				method: 'POST',
				data: {
					orderNo: this.orderNo,
					userId: this.user.id
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					uni.hideLoading();
					if (res.data.result.isSuccess) {
						this.orderInfo = res.data.result.uniOrder;
						if (this.orderInfo.payBankPic != null) {
							let arr = JSON.parse(this.orderInfo.payBankPic);
							for (let i = 0; i < arr.length; i++) {
								this.imageData.push(arr[i].Pic);
							}
						}
						this.payBankInfo.getMoneyPeople = this.orderInfo.payBankInfo.split(',')[0];
						this.payBankInfo.bankName = this.orderInfo.payBankInfo.split(',')[1];
						this.payBankInfo.bankNum = this.orderInfo.payBankInfo.split(',')[2];
						this.payBankInfo.bankAddress = this.orderInfo.payBankInfo.split(',')[3];
						let s = '';
						switch (parseInt(this.orderInfo.orderStatus)) {
							case 1:
								s = '后自动关闭';
								this.timer = util.dateAddDays(this.orderInfo.createDate, 1 / 96);
								this.showTimer = true;
								break;
							case 2:
								break;
							case 3:
								this.showTimer = true;
								this.timer = util.dateAddDays(this.orderInfo.expressDate, 7);
								s = '后自动确认';
								break;
							case 4:
								break;
							case 99:
								break;
						}
						this.orderStr = s;
						switch (parseInt(this.orderInfo.orderStatus)) {
							case 1:
								break;
							case 2:
								break;
							case 3:
								break;
							case 4:
								break;
							case 99:
								break;
						}
					} else {
						uni.showToast({
							title: res.data.result.resultInfo,
							icon: 'none'
						});
					}
				},
				fail: () => {},
				complete: () => {}
			});
		}
	},
	onPullDownRefresh() {
		this.getData();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	onLoad(e) {
		if (!this.hasLogin) {
			uni.navigateTo({
				url: '../login/login'
			});
		} else {
			this.user = JSON.parse(this.jyyUser);
			this.orderNo = e.order.replace(/"/g, '');
			/*let arr = JSON.parse(e.arr);
				this.newsitems = arr[0];
				this.one = arr[1];
				this.two = arr[2]; */
			this.init();
		}
	},
	data() {
		return {
			orderStr: '关闭交易',
			timer: '',
			showTimer: false,
			one: '',
			two: '',
			orderInfo: {},
			user: {},
			newsitems: [],
			imageData: [],
			serverUrl: this.webUrl + 'Upload',
			show: true,
			formData: {
				userId: 2
			},
			orderNo: '',
			payBankInfo: {
				getMoneyPeople: '',
				bankName: '',
				bankNum: '',
				bankAddress: ''
			}
		};
	}
};
</script>

<style>
.order-items .order-specs {
	width: auto;
}
.orderMsg {
	/* font-weight: 700; */
	color: #000000;
}
.orderInfo .order-line-small {
	height: auto;
}
.setClipboardData {
	margin-left: 30upx;
	color: #ff4400;
}
.orderInfo .imageItem,
.orderInfo .imageUpload {
	width: 140upx;
	height: 140upx;
}
.imageItem image, .moveImage{
	width: 140upx!important;
	height: 140upx!important;
}
</style>
