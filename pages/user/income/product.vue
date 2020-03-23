<template>
	<view class="uni-flex uni-column order-items jz_incomeProduct" style="margin-top: 30upx;">
		<view class="uni-flex uni-row uni-flex-item order-shop-name order-boder">
			<view class="orderNo">
				{{moneyLog.orderNo}}
			</view>
			<view class="uni-flex uni-flex-item order-status" style="color: #000000;">
				{{moneyLog.buyer}}
			</view>
		</view>

		<view class="uni-flex uni-row order-item align-items" v-for="(item,key) in items" :key="key">
			<view class="uni-flex uni-flex-item pic item-padding">
				<image mode="widthFix" :src="item.pic"></image>
			</view>
			<view class="uni-flex uni-column uni-flex-item3 item-padding">
				<text class="uni-text order-title">{{item.title}}</text>
				<text class="uni-text order-specs">{{item.productSpecsStr}}</text>
				<text class="uni-text order-specs">分润</text>
			</view>
			<view class="uni-flex uni-column uni-flex-item item-padding">
				<text class="uni-text price-red">￥{{item.totalPrice}}</text>
				<text class="uni-text">x{{item.amount}}</text>
				<text class="uni-text price-red">￥{{item.profit}}</text>
			</view>
		</view>
		<view class="incomeAll uni-flex uni-column" style="background: #F4F5F6;">
			<view class="uni-flex  space-between">
				<view class="uni-flex order-line">
					<text class="allCount">共{{allNum}}件商品</text>
				</view>
				<view class="uni-flex order-line">
					合计：<text class="price-red allPrice">￥{{moneyLog.subTotal}}</text>
				</view>
			</view>
			<view class="uni-flex space-between">
				<view class="uni-flex order-line">
					{{moneyLog.createDate}}
				</view>
				<view class="uni-flex order-line">
					<text class="allCount">分润</text>：<text class="price-red allPrice">￥{{moneyLog.amount}}</text>
				</view>
			</view>
		</view>
		<view class="uni-flex order-line item-padding order-btn" style="height: 10upx;">
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				id: '',
				userid: '',
				moneyLog: {},
				items: []
			}
		},
		computed: {
			allNum() {
				let num = 0;
				for (let i = 0; i < this.items.length; i++) {
					num += this.items[i].amount;
				}
				return num
			}
		},
		onLoad(e) {
			this.id = e.id;
			this.userid = e.userid;
			this.getData();
		},
		methods: {
			getData() {
				uni.request({
					url: this.webUrl + 'GetMoneyLogView',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						userid: this.userid,
						id: this.id
					},
					success: res => {
						if (res.data != null) {
							this.moneyLog = res.data.data;
							this.items = res.data.items;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.order-items .order-boder .orderNo {
		width: 550upx;
	}

</style>
