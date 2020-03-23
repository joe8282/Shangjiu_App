<template>
	<view class="uni-flex uni-column cart jz_order order">
		<view class="uni-flex uni-column uni-flex-item">
			<!-- 列表循环 -->
			<view class="uni-flex uni-column uni-flex-item  cart-list" v-for="(item,m) in json" :key="item">
				<view class="uni-flex uni-column order-address">
					<view class=" order-address-box">
						<view class="">收货信息</view>
						<view class="expressMsg fontWnormal">
							{{item.express}}
						</view>
					</view>
					<view class="uni-flex uni-flex-item order-address-line mg">
						<image src="../../../static/cart/line.png"></image>
					</view>
				</view>
				<view class="uni-flex uni-column item-shop ">
					<!-- 商家 -->
					<view class="uni-flex uni-row  order-line">
						{{item.sj}}
					</view>
					<!-- 图片产品名称价格数量展示 -->
					<view class="uni-flex uni-row  order-item" v-for="pl in json[m].items" :key="pl">
						<!-- 商品图片 -->
						<view class="uni-flex uni-flex-item item-padding item-img">
							<image mode="widthFix" :src="pl.img"></image>
						</view>
						<view class="uni-flex uni-column item-padding uni-flex-item3">
							<view class="uni-flex uni-flex-item">
								{{pl.cp}}
							</view>
							<view class="uni-flex uni-flex-item">
								<view class="uni-flex text cart-attr" v-for="(attr,n) in pl.attr" :key="attr">
									{{attr.name}}：{{attr.value}}
								</view>
							</view>
							<view class="uni-flex uni-row uni-flex-item">
								<view class="uni-flex uni-flex-item5 price-red">￥{{pl.jg}}</view>
								<view class="uni-flex uni-flex-item ">x{{pl.sl}}</view>
							</view>
						</view>
					</view>

					<view class="uni-flex uni-row  order-line">
						订单编号：<text class="fontWnormal">{{item.no}}</text>
					</view>
					<view class="uni-flex uni-row  order-line">
						配送费用：<text class="price-red">￥{{item.expressCost}}</text>
					</view>
					<view class="uni-flex uni-row  order-line">
						支付金额：<text class="price-red">￥{{allprice}}</text>
					</view>
					<view class="uni-flex uni-row  order-line usermsg">
						<view class="usermsg-lf">买家留言：</view>
						<view class="fontWnormal usermsg-rt">{{item.message}}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="uni-btn-v uni-common-mt">
			<button type="primary" @click="weixinPay" :loading="loading">微信支付</button>
		</view>


		<view class="uni-flex uni-row footer">
			<!-- <view class="uni-flex-item uni-flex">付款金额: <text class="price-red">￥{{allprice}}</text></view>
			<view class="buttons">
				<view class="button" @click='home()'>再逛逛</view>
			</view> -->
			<view class="uni-flex uni-flex-item">付款金额:  <text class="price-red">￥{{allPrice}}</text></view>
			<view class="uni-flex ">
				<view class="uni-flex uni-flex-item btn" @click='home()'>再逛逛</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'


	import cart from '../../../common/cart.js';
	import smsPopup from '../../../components/uni-popup-sms.vue';

	export default {
		components: {
			smsPopup
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser']),
			allprice: function() {
				let allprice = 0;
				for (let j = 0; j < this.json.length; j++) {
					let arr = this.json[j].items;
					for (let i = 0; i < arr.length; i++) {
						allprice += arr[i].jg * arr[i].sl;
					}
					allprice = allprice + parseFloat(this.json[j].expressCost)
				}
				return allprice.toFixed(2);
			}
		},
		data() {
			return {
				allPrice: "0.00",
				orderNo: "",
				loading: false,
				json: [],
				user: {},
			};
		},
		onLoad(e) {
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '../login/login',
				});
			} else {
				this.user = JSON.parse(this.jyyUser);
				this.orderNo = e.orderNo;
				this.init();
			}
		},
		onPullDownRefresh() {
			this.init();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			weixinPay() {
				console.log("发起支付");
				this.loading = true;
				uni.login({
					success: (e) => {
						console.log("login success", e);
						uni.request({
							url: this.webUrl + 'Payment',
							method: 'POST',
							data: {
								data: JSON.stringify(this.json),
								user: JSON.stringify(this.user)
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							success: (res) => {
								if (res.statusCode !== 200) {
									uni.showModal({
										content: "支付失败，请重试！",
										showCancel: false
									});
									return;
								}
								if (res.data.ret === 0) {
									let paymentData = JSON.parse(res.data.payment);
									if (paymentData.resultcode == "SUCCESS") {
										uni.requestPayment({
											timeStamp: paymentData.timestamp.toString(),
											nonceStr: paymentData.noncestr,
											package: paymentData.package,
											signType: 'MD5',
											paySign: paymentData.sign,
											success: (res) => {
												uni.showToast({
													title: "支付成功!"
												})
												uni.navigateTo({
													url: "../orderSuccess/orderSuccess"
												});
											},
											fail: (res) => {
												uni.showModal({
													content: "支付失败,原因为: " + res
														.errMsg,
													showCancel: false
												})
											},
											complete: () => {
												this.loading = false;
											}
										})
									} else {
										uni.showModal({
											content: "支付失败,原因为: " + paymentData.errcode + paymentData.errcodedes,
											showCancel: false
										})
									}

								} else {
									uni.showModal({
										content: res.data.desc,
										showCancel: false
									})
								}
							},
							fail: (e) => {
								this.loading = false;
								uni.showModal({
									content: "支付失败,原因为: " + e.errMsg,
									showCancel: false
								})
							}
						})
					},
					fail: (e) => {
						this.loading = false;
						uni.showModal({
							content: "支付失败,原因为: " + e.errMsg,
							showCancel: false
						})
					}
				})
			},
			init() {
				if (this.orderNo == undefined) {
					this.json = cart.getOrder();
				} else {
					this.getData();
				}
				setTimeout(() => {
					this.price();
				}, 500)

			},
			getData() {
				uni.showLoading({
					title: "加载中"
				})
				uni.request({
					url: this.webUrl + 'GetOrder',
					method: 'POST',
					data: {
						userid: this.user.id,
						orderNo: this.orderNo
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						uni.hideLoading();
						this.json = [];
						this.json.push(res.data.uniOrder);
						let express = this.json[0].express;
						let index = express.indexOf(" ");
						this.mobile = express.slice(index, index + 12);
						this.tip = this.mobile.substr(0, 3) + "******" + this.mobile.substr(10, 2);

					},
					fail: () => {},
					complete: () => {}
				});

			},
			price() {
				let all = 0;
				for (let j = 0; j < this.json.length; j++) {
					all = parseFloat(this.json[j].totalPrice)
				}
				this.allPrice = all.toFixed(2); //返回数据
			},
			home() {
				uni.switchTab({
					url: '../../home/home'
				});
			}
		}
	}
</script>

<style>
	.order .footer .button {
		width: 160upx;
		height: 64upx;
		margin: 0 8upx;
		color: #fff;
		line-height: 64upx;
		background: #f40;
		border-radius: 16px;
		padding: 0;
		font-size: 28upx;
		display: inline-block;
		text-align: center;
	}

	.mg {
		margin-top: 10upx;
		width: 100%;
	}

	.mg image {
		width: 100%;
		height: 10upx;
	}

	.expressMsg {
		width: calc(100% - 20upx);
	}
</style>
