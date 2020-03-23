<template>
	<view class="uni-flex uni-column cart order jz_order">
		<view class="uni-flex uni-column uni-flex-item ">

			<view v-if="!mode" class="order-address">
				<view class="order-address-box01">
					<view class="order-address-ico">
						<image src="../../../static/cart/location.png"></image>
					</view>
					<view v-if="showAddress" class="order-message" @click="goAddress">
						<view>
							<view>
								<view class="lf">收货人：{{address.nickName}}</view>
								<view class="rt">电话：{{address.mobile}}</view>
							</view>
							<view class="address">收货地址：{{province}}{{city}}{{district}}{{address.addStr}}</view>
						</view>
					</view>
					<view v-if="!showAddress" class="addAdress" @click="goAddressService">
						<text>添加地址</text>
					</view>

					<view class="order-address-ico2" @click="goAddress">
						<image src="../../../static/cart/image.png"></image>
					</view>

				</view>
				<view class=" order-address-line01">
					<image src="../../../static/cart/line.png"></image>
				</view>
			</view>

			<view v-if="mode" class="order-address">
				<view class=" order-address-box">
					<view class="">收货信息</view>
					<view class="expressMsg fontWnormal">
						{{addressStr}}
					</view>
				</view>
				<view class="uni-flex uni-flex-item order-address-line mg">
					<image src="../../../static/cart/line.png"></image>
				</view>
			</view>

			<!-- 列表循环 -->
			<view class="uni-flex uni-column uni-flex-item cart-list" v-for="(item,m) in json" :key="m">
				<view class="uni-flex uni-column item-shop ">
					<!-- 商家 -->
					<!-- <view class="uni-flex uni-row  order-line">
						{{item.sj}}
					</view> -->
					<!-- 图片产品名称价格数量展示 -->
					<view class="uni-flex uni-row order-item" v-for="(pl,n) in json[m].items" :key="n">
						<!-- 商品图片 -->
						<view class="uni-flex uni-flex-item  item-img">
							<image mode="widthFix" :src="pl.img"></image>
						</view>
						<view class="uni-flex uni-column item-padding uni-flex-item3">
							<view class="uni-flex uni-flex-item fontWnormal">
								{{pl.cp}}
							</view>
							<view class="uni-flex uni-flex-item">
								<view class="uni-flex text cart-attr" v-for="attr in pl.attr" :key="attr">
									{{attr.name}}：{{attr.value}}
								</view>
							</view>
							<view class="uni-flex uni-row uni-flex-item">
								<view class="uni-flex uni-flex-item5" v-if="status==1"><text class="price-red">￥{{pl.jg*pl.unitNum}}</text></view>
								<view class="uni-flex uni-flex-item5" v-if="status==0"><text class="price-red">￥{{pl.jg}}</text></view>
								<view class="uni-flex uni-flex-item ">x{{pl.sl}}</view>
							</view>
						</view>
					</view>
					<view class="uni-flex uni-row  order-line">
						配送费用：<text class="price-red">￥{{item.expressCost}}</text>
					</view>
					<view class="uni-flex uni-row  order-line">
						订单小计：<text class="price-red">￥{{item.totalPrice}}</text>
					</view>
					<view class="uni-flex uni-row  order-line msg">
						买家留言：
						<input class="uni-input fontWnormal" v-model="item.message" placeholder="给卖家的留言(选填)" />
					</view>
				</view>

			</view>
		</view>

		<view class="uni-flex uni-row footer">
			<view class="uni-flex uni-flex-item">合计: <text class="price-red">￥{{allPrice}}</text></view>
			<view class="uni-flex ">
				<view class="uni-flex uni-flex-item btn" @click='order()'>去付款</view>
			</view>
		</view>
		<attr-popup :show="showAttr" @hidePopup="hidePopup" :toptitle="toptitle" :productItems="items"></attr-popup>
		<pay-popup :show="showPay" :banks="banks" @hidePopup="hidePayPopup" @wxPay="wxPay" @bankPay="bankPay"></pay-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	import util from '../../../common/util.js';
	import cart from '../../../common/cart.js';
	import province from '../../../components/mpvue-citypicker/city-data/province.js';
	import city from '../../../components/mpvue-citypicker/city-data/city.js';
	import area from '../../../components/mpvue-citypicker/city-data/area.js';
	import attrPopup from '../../../components/cartcommon/uni-popup-public.vue';
	import payPopup from '../../../components/uni-popup-pay.vue';
	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
		},
		components: {
			attrPopup,
			payPopup
		},
		data() {
			return {
				allPrice: '0.00',
				allNum: 0,
				json: [],
				showAddress: false,
				address: [],
				user: {},
				province: "",
				city: "",
				district: "",
				addressId: "",
				mode: false,
				addressStr: "",
				showAttr: false,
				showPay: false,
				items: [], //弹窗的数组,
				toptitle: '',
				banks: [],
				status: '',
				id: '',
				orderNo: ''
			};
		},
		onLoad(e) {
			//0为直接购买，1为订单列表处结算
			if (e.status == 1) {
				this.status = 1;
			} else {
				this.status = 0;
			}
			this.addressId = e.addressId;
			this.orderNo = e.orderNo;
			this.id = e.id;
			this.init();
		},
		onPullDownRefresh() {
			this.init();
		},

		methods: {
			init() {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '../login/login',
					});

				} else {
					this.user = JSON.parse(this.jyyUser);
					if (this.orderNo == undefined) {
						this.json = cart.getOrder();
						this.orderNo = this.json[0].no;
						this.getAddress();
					} else {
						this.getData();
					}
				}
				uni.stopPullDownRefresh();
			},
			hidePopup() {
				this.showAttr = false;
			},
			hidePayPopup() {
				this.showPay = false;
			},
			goAddress() {
				uni.redirectTo({
					url: "../address/address?url=../order/order"
				})
			},
			goAddressService() {
				uni.redirectTo({
					url: "../addressService/addressService?url=../order/order"
				})
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
						id: this.id
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						uni.hideLoading();
						this.mode = true;
						this.json = [];
						this.json.push(res.data.uniOrder);
						this.addressStr = res.data.uniOrder.express;
						this.showAddress = true;
						this.allPrice = (parseFloat(this.json[0].expressCost) + parseFloat(this.json[0].totalPrice)).toFixed(2);
						//this.Refresh();
						this.banks = res.data.banks;
					},
					fail: () => {},
					complete: () => {}
				});

			},
			getAddress() {
				uni.showLoading({
					title: "加载中",
					mask: true
				})
				let data;
				if (this.addressId == undefined) {
					data = {
						userid: this.user.id,
						orderNo: this.orderNo
					};
				} else {
					data = {
						id: this.addressId,
						orderNo: this.orderNo
					};
				}
				uni.request({
					url: this.webUrl + 'Address',
					method: 'POST',
					data: data,
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						uni.hideLoading();
						if (res.data.result.isSuccess) {
							this.showAddress = true;
							this.address = res.data.address;
							const p = province[res.data.address.province];
							this.province = p.label;
							const c = city[res.data.address.province][res.data.address.city];
							this.city = c.label;
							const d = area[res.data.address.province][res.data.address.city][res.data.address.district];
							this.district = d.label;
							this.Refresh();
							this.banks = res.data.banks;
						}
					},
					fail: () => {
						uni.hideLoading();
					},
					complete: () => {
						uni.hideLoading();
					}
				});
			},
			Refresh() {
				let expressArr = [];
				let all = 0;
				for (let j = 0; j < this.json.length; j++) {
					let arr = this.json[j].items;
					let cost = 0;
					let count = 0;
					let totalPrice = 0;
					for (let i = 0; i < arr.length; i++) {

						//算同类型商品重量
						let exist = false;
						for (let k = 0; k < expressArr.length; k++) {
							if (expressArr[k].id == arr[i].id) {
								expressArr[k].weight += arr[i].weight * arr[i].sl * arr[i].unitNum;
								expressArr[k].expressFees = arr[i].expressFees;
								exist = true;
								break
							}
						}
						if (!exist) {
							expressArr.push({
								"id": arr[i].id,
								"weight": arr[i].weight * arr[i].sl * arr[i].unitNum,
								"expressFees": arr[i].expressFees
							});
						}
						
						count++;
						totalPrice += parseFloat(arr[i].jg * arr[i].sl);
						all += arr[i].jg * arr[i].sl;
					}
					//计算邮费
					for (let l = 0; l < expressArr.length; l++) {
						for (let m = 0; m < expressArr[l].expressFees.length; m++) {
							if (expressArr[l].expressFees[m].province === this.province) {
								cost += this.costExpress(expressArr[l].weight, expressArr[l].expressFees[m], l);
							}
						}
					}

					this.json[j].count = count;
					this.json[j].totalPrice = (totalPrice + cost).toFixed(2);
					this.json[j].expressCost = cost.toFixed(2);
					if (!this.mode) {
						this.json[j].express = this.address.nickName + " " + this.address.mobile + " " + this.province + " " + this.city +
							" " + this.district + " " + this.address.addStr;
					}
					all += cost;
				}
				this.allPrice = all.toFixed(2); //返回数据	
				if (!this.mode) {
					this.ExpressCost();
				}
			},
			ExpressCost() {
				uni.request({
					url: this.webUrl + 'ExpressCost',
					method: 'POST',
					data: {
						user: JSON.stringify(this.user),
						data: JSON.stringify(this.json)
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			costExpress(weight, express, m) {
				if (parseInt(express.first) > 0) {
					if (weight > express.weight) {
						let n = Math.ceil((weight - express.weight) / express.weight);
						return parseFloat(express.first) + parseFloat(express.extend * n);
					} else {
						return parseFloat(express.first);
					}
				} else {
					return 0;
				}
			},
			order() {
				if (!this.showAddress || this.addressStr == null) {
					uni.showModal({
						content: "请设置收货地址！",
						showCancel: false
					});
					return;
				}
				uni.request({
					url: this.webUrl + 'CheckAgency',
					method: 'POST',
					data: {
						user: JSON.stringify(this.user),
						data: JSON.stringify(this.json)
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (!res.data.result.isSuccess) {
							this.showAttr = true;
							this.items = res.data.items;
							this.toptitle = res.data.result.resultInfo;
						} else {
							this.showPay = true;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			bankPay(val) {
				uni.request({
					url: this.webUrl + 'BankPayment',
					method: 'POST',
					data: {
						data: JSON.stringify(this.json),
						user: JSON.stringify(this.user),
						pass: val.pass,
						bank: val.bank
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						uni.hideLoading();
						if (res.data.result.isSuccess) {
							cart.updateCart([]);
							this.showPay = false;
							uni.reLaunch({
								url: "../orderSuccess/orderSuccess?no=" + this.json[0].no
							});
						} else {
							uni.showToast({
								icon: "none",
								title: res.data.result.resultInfo
							})
						}
					},
					fail: (e) => {
						uni.hideLoading();
						uni.showToast({
							icon: "none",
							title: "该订单还未完成支付"
						})
					}
				})
			},
			wxPay() {

				uni.showLoading({
					title: "提交中"
				})
				uni.login({
					success: (e) => {
						uni.request({
							url: this.webUrl + 'Payment',
							method: 'POST',
							data: {
								data: JSON.stringify(this.json),
								user: JSON.stringify(this.user),
								code: e.code
							},
							header: {
								'content-type': 'application/x-www-form-urlencoded'
							},
							success: (res) => {
								console.log(res);
								uni.hideLoading();
								if (res.statusCode !== 200) {
									uni.showToast({
										icon: "none",
										title: "支付失败，请重试！"
									})
									return;
								}
								if (res.data.result.isSuccess) {
									let paymentData = JSON.parse(res.data.result.resultInfo);
									if (paymentData.resultcode == "SUCCESS") {
										uni.requestPayment({
											timeStamp: paymentData.timestamp.toString(),
											nonceStr: paymentData.noncestr,
											package: paymentData.package,
											signType: 'MD5',
											paySign: paymentData.sign,
											success: (res) => {
												cart.updateCart([]);
												uni.redirectTo({
													url: "../orderSuccess/orderSuccess?no=" + this.json[0].no
												});
											},
											fail: (res) => {
												uni.showToast({
													icon: "none",
													title: "该订单还未完成支付"
												})
											},
											complete: () => {
												this.loading = false;
											}
										})
									} else {
										uni.showToast({
											icon: "none",
											title: "该订单还未完成支付"
										})
									}
								}
							},
							fail: (e) => {
								uni.hideLoading();
								uni.showToast({
									icon: "none",
									title: "该订单还未完成支付"
								})
							}
						})
					},
					fail: (e) => {
						uni.hideLoading();
						uni.showModal({
							content: "支付失败,原因为: " + e.errMsg,
							showCancel: false
						})
					}
				})
			}
		}
	}
</script>
<style>

</style>
