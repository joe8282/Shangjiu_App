<template>
	<view class="uni-flex uni-column myuser">
		<view class="uni-list">
			<view class="content">
				<view v-for="(item,key) in orders" :key="key" class="uni-flex justify-content">
					<view class="uni-product uni-flex">
						<view class="image-view">
							<image class="uni-product-image" :src="item.avatarUrl" />
						</view>
						<view class="uni-product-wrap uni-flex uni-column">
							<view class="nick">昵称：<text>{{item.nickName}}</text></view>
							<view class="orders">订单：{{item.orderNo}}</view>
							<view class="spreadMoney">金额/推广费：<text>{{item.subTotal}}/{{item.amount}}</text><text v-if="item.state==0">未确认</text><text
								 v-if="item.state==1">已确认</text></view>
							<view class="orderTime">下单时间：<text>{{item.createDate}}</text></view>
						</view>
					</view>
				</view>

			</view>

		</view>
		<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import loadMore from '@/components/uni-load-more.vue';
	var index;
	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
		},
		data() {
			return {
				orders: [],
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			};
		},
		onPullDownRefresh() {
			this.init();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShow() {
			this.init();
		},
		onLoad(e) {
			this.rank = e.rank;
			this.init();
		},
		methods: {
			init() {
				index = 1;
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '../login/login',
					});
				} else {
					this.getData();
				}
			},
			getData() {
				if (this.loadingType !== 0) {
					return;
				}
				this.loadingType = 1;
				let user = JSON.parse(this.jyyUser);
				uni.request({
					url: this.webUrl + 'MyOrders',
					method: 'POST',
					data: {
						pageIndex: index,
						userid: user.id,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (res.data.result.uniMoneyLogList.length > 0) {
							this.orders = this.orders.concat(res.data.result.uniMoneyLogList);
						} else {
							this.loadingType = 2;
							return;
						}
						if (index == parseInt(res.data.result.pages)) {
							this.loadingType = 2;
							return;
						} else {
							this.loadingType = 0;
						}
						index++;
					},
					fail: () => {},
					complete: () => {}
				});
			},
		},
		onReachBottom() {
			this.getData();
		},
		components: {
			loadMore
		}
	}
</script>
<style>
	.myuser .orders {
		width: 350upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap
	}
</style>
