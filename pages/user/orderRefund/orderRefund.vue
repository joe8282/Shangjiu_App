<template>
	<view class="uni-flex uni-column  orderInfo ">
		<view class="uni-flex uni-column order-items">
			<view class="uni-flex uni-row uni-flex-item order-shop-name order-boder">
				{{orderInfo.shopName}}
			</view>
			<view class="uni-flex uni-row order-item" v-for="(item,key) in orderInfo.items" :key="key">
				<view class="uni-flex uni-flex-item pic item-padding">
					<image mode="widthFix" :src="item.pic"></image>
				</view>
				<view class="uni-flex uni-column uni-flex-item3 item-padding">
					<text class="uni-text order-title">{{item.title}}</text>
					<text class="uni-text order-specs">{{item.productSpecsStr}}</text>
				</view>
				<view class="uni-flex uni-column uni-flex-item item-padding">
					<text class="uni-text">￥{{item.price}}</text>
					<text class="uni-text">x{{item.amount}}</text>
				</view>
			</view>
			<view class="uni-flex order-line item-padding order-boder order-line-small">
				<view class="uni-flex uni-flex-item">商品总价</view>
				<view class="uni-flex uni-flex-item justify-flex-end">￥{{orderInfo.totalPrice}}</view>
			</view>
			<view class="uni-flex order-line item-padding order-boder order-line-small">
				<view class="uni-flex uni-flex-item">运费(快递)</view>
				<view class="uni-flex uni-flex-item justify-flex-end">￥{{orderInfo.expressCost}}</view>
			</view>
			<view class="uni-flex order-line item-padding totalPrice ">
				<view class="uni-flex uni-flex-item">订单总价</view>
				<view class="uni-flex uni-flex-item justify-flex-end color-f40">￥{{totalPrice}}</view>
			</view>
		</view>

		<view class="uni-flex uni-column oderinfo-other">
			<view class="uni-flex order-line-small item-padding order-boder">
				订单编号：{{orderInfo.orderNo}}
			</view>
			<view class="uni-flex order-line-small item-padding order-boder">
				创建时间：{{orderInfo.createDate}}
			</view>
		</view>

		<view v-if="orderInfo.refundState == 0" class="uni-flex uni-flex-item order oderinfo-other">
			<view class="uni-flex uni-flex-item uni-row order-address-box">
				<view class="uni-flex order-address-ico">
					<image src="../../../static/cart/location.png" mode="widthFix"></image>
				</view>
				<view v-if="orderInfo.orderStatus==2" class="uni-flex uni-column uni-flex-item4" @click="showPopup">
					<view class="uni-flex uni-flex-item">仅退款</view>
					<view class="uni-flex uni-flex-item">未收到货或商家协商同意前提下</view>
				</view>
				<view v-if="orderInfo.orderStatus==3" class="uni-flex uni-column uni-flex-item4" @click="showPopup">
					<view class="uni-flex uni-flex-item">退款退货</view>
					<view class="uni-flex uni-flex-item">已收到货，需要退款退货</view>
				</view>
			</view>
		</view>

		<view class="uni-flex uni-column order-refundLogs">
			<view :class="refundLog.Mode=='1'? 'buyer': 'saler'" class="uni-flex uni-column " v-for="refundLog in refundLogs"
			 :key="refundLog">
				<view class="uni-flex uni-flex-item uni-row order-refundLog-title">
					<view class="uni-flex uni-flex-item4">{{refundLog.Name}}</view>
					<view class="uni-flex uni-flex-item1 order-refundLog-date">{{refundLog.CreateDate}}</view>
				</view>
				<view class="uni-flex uni-column order-refundLog">
					<view class="uni-flex uni-flex-item uni-row">
						{{refundLog.Step}}
					</view>
					<view class="uni-flex uni-flex-item uni-row order-refundLog-text">
						{{refundLog.Text}}
					</view>
				</view>

			</view>
		</view>
		<view class="uni-flex space"></view>
		<refund-popup :show="hasShowPop" :user="user" :refunds="refunds" :express="express" :orderInfo="orderInfo" v-on:getData="getData"
		 v-on:hidePopup="hidePopup"></refund-popup>

		<view v-if="orderInfo.refundState > 0" class="uni-flex uni-row footer justify-flex-end">
			<view v-if="orderInfo.refundState==1" class="btn">
				等待处理
			</view>
			<view v-if="orderInfo.refundState==2" class="btn">
				成功退款
			</view>
			<view v-if="orderInfo.refundState==3" class="btn" @click="reapply">
				重新申请
			</view>
		</view>

	</view>
</template>

<script>
	import order from '../../../common/order.js';
	import refundPopup from '../../../components/uni-popup-refund.vue';

	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		components: {
			refundPopup
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser']),
			totalPrice: function() {
				return (parseFloat(this.orderInfo.totalPrice) + parseFloat(this.orderInfo.expressCost)).toFixed(2);
			}
		},
		methods: {
			init() {
				switch (parseInt(this.orderInfo.orderStatus)) {
					case 2:
						this.show = true;
						break
					case 3:
						this.show = true;
						break
				}
				this.refundLogs = JSON.parse(this.orderInfo.refundLog);
			},
			reapply() {
				order.reapply(this.webUrl, this.orderInfo, this.user);
				this.getData();
			},
			getRefunds() {
				uni.request({
					url: this.webUrl + 'OrderRefund',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						this.refunds = res.data.result.uniOrderRefundList;
						this.express = res.data.result.uniExpress;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			hidePopup() {
				this.hasShowPop = false;
			},
			showPopup() {
				this.hasShowPop = true;
			},
			getData() {
				uni.showLoading({
					title: "加载中"
				})
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
							this.init();
						}
						else{
							uni.showToast({
								title:res.data.result.resultInfo,
								icon:"none"
							})
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
					url: '../login/login',
				});
			} else {
				this.user = JSON.parse(this.jyyUser);
				console.log(e.order)
				this.orderNo = e.order.replace(/"/g,"");
				this.getRefunds();
				this.getData();
			}
		},		
		data() {
			return {
				hasShowPop: false,
				orderInfo: {},
				user: {},
				refunds: [],
				refundLogs: [],
				express: [],
				orderNo: ''
			};
		}
	}
</script>


<style>
	.order-address-ico { 
		margin-top: 35upx;
		margin-right: 10upx;
		width: 40upx;
		height: 40upx;
	}
	
	.order-address-ico image {
		width: 40upx;
		height: 40upx;
	}
	
	.orderInfo .order-refundLogs {
		padding: 0;
		margin: 16upx;
	}
</style>
