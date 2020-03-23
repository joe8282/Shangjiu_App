<template>
	<view class="uni-flex paySuccess jz_paySuccess uni-column jz_merchant">

		<view v-if="order.payMode==2" class="paySuccess_header uni-flex uni-column">
			<view class="payok uni-flex justify-align-center">提交成功</view>
			<view class="payarrive  uni-flex justify-align-center">转账请备注订单识别码：<text style="font-size: 28upx; color: #FF0000;">{{order.payBankCode}}</text></view>
			<view class="paybtns  uni-flex justify-align-center uni-row">
				<view @click="view()" class="lookOrder uni-flex justify-align-center">查看订单</view>
				<view @click="home()" class="goHome uni-flex justify-align-center">继续逛</view>
			</view>
		</view>

		<view v-else class="paySuccess_header uni-flex uni-column">
			<view class="payok uni-flex justify-align-center">付款成功</view>
			<view class="paybtns  uni-flex justify-align-center uni-row">
				<view @click="view()" class="lookOrder uni-flex justify-align-center">查看订单</view>
				<view @click="home()" class="goHome uni-flex justify-align-center">继续逛</view>

			</view>
		</view>

		<!-- <view class="paySuccess_footer uni-flex uni-column">
			<view class="payname uni-flex ">
				<view class="paynick commonfont">{{address[0]}}</view>
				<view class="payphone commonfont">{{address[1]}}</view>
			</view>
			<view class="payaddress commonfont">{{address[2]}}{{address[3]}}{{address[4]}}{{address[5]}}</view>
			<view class="payprice uni-flex">
				<view class="commonfont">实付</view>
				<view class="commonfont">￥{{order.totalPrice}}</view>
			</view>
		</view> -->
			<!-- <recommend :items="items" :src="src"></recommend> -->
		<view class="recommend uni-flex uni-column">
			<view class="push_product_title uni-flex justify-align-center">
				<image :src="src"></image>
				<view class="push_title">为你推荐</view>
			</view>
			<view class="uni-flex lists-wrap">
				<view class="uni-flex uni-row list">
					<view class="uni-product-list" id="list">
						<view class="uni-product" v-for="(item, key) in items" :key="key" @click="goProduct(item)">
							<view class="image-view uni-flex justify-align-center">
								<!-- <image :src="item.pic"></image> -->
								<image class="image" :class="{lazy:!item.display}" :id="'lazy'+ key" :data-index="0" @load="imageOnLoad(item)"
								 :src="item.display?item.pic:''" />
								<view class="loadbox" :class="{loaded:item.loaded}">
									<view class="load"></view>
								</view>
							</view>
							<view class="uni-flex uni-column uni-product-title-wrap">
								<view class="uni-product-title uni-flex-item">{{ item.title }}</view>
								<view class="product_details uni-flex uni-row">
									{{item.profile}}
								</view>
								<view class="uni-flex-item prices uni-flex">
									<view class="prices-salePrice">￥{{ item.salePrice }}</view>
									<view class="prices-cart">
										<image src="../../../static/category/cart.png"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import util from '../../../common/util.js';
	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
		},
		components: {
			
		},
		methods: {
			home() {
				uni.switchTab({
					url: '../../home/home'
				});
			},
			view() {
				uni.navigateTo({
					url: '../orderInfo/orderInfo?order=' + JSON.stringify(this.order.orderNo),
				});
			},
			getItems() {
				uni.request({
					url: this.webUrl + 'Recommend',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						this.items = res.data.result.resultInfo;
						setTimeout(()=>{
							util.loads(this.items, 'list', this.windowHeight);
						},300)
					},
					fail: () => {},
					complete: () => {}
				});
			},
			imageOnLoad(e) {
				e.loaded = true;
			},
			goProduct(e) {
				uni.navigateTo({
					url: '../../merchant/product/product?id=' + e.id
				})
			},
			getDate() {
				uni.showLoading({
					title: "加载中"
				})
				uni.request({
					url: this.webUrl + 'GetOrderInfo',
					method: 'POST',
					data: {
						orderNo: this.no,
						userid: this.user.id
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						uni.hideLoading();
						if (res.data.result.isSuccess) {
							this.order = res.data.result.uniOrder;
							let add = this.order.express;
							this.address = add.split(" ");
						} else {
							uni.showToast({
								title: res.data.result.resultInfo,
								icon: "none"
							})
						}

					},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onLoad(e) {
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '../login/login'
				});
			} else {
				this.windowHeight = uni.getSystemInfoSync().windowHeight;
				this.user = JSON.parse(this.jyyUser);
				this.no = e.no;
				this.getDate();
				this.getItems();
			}
		},
		onPageScroll() {
			util.loads(this.items, 'list', this.windowHeight);
		},
		data() {
			return {
				user: {},
				order: {},
				address: [],
				items: [],
				src: '../../../static/pay04.png',
				windowHeight: 0
			};
		}
	};
</script>

<style></style>
