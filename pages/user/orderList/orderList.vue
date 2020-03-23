<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab jz_orderList" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab, index) in tabBars" :key="tab.id" :class="['swiper-tab-list', tabIndex == index ? 'active' : '']" :id="tab.id" :data-current="index" @tap="tapTab">
				{{ tab.name }}
			</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item v-for="(tab, index1) in newsitems" :key="index1">
				<scroll-view class="list" scroll-y :scroll-top="scrollTop" @scrolltolower="loadMore(index1)" @scroll="scroll">
					<block v-for="(item, index2) in tab.items" :key="index2">
						<!-- <order-Item :popItem="newsitem" :popNewsitems="newsitems" :one="index1" :two="index2" :user="user"></order-Item> -->
						<view v-if="item.orderStatus < 100" class="uni-flex uni-column order-items" @click="bindClick(item)">
							<view class="uni-flex uni-row uni-flex-item order-shop-name order-boder">
								<view class="orderNo">订单号: {{ item.orderNo }}</view>
								<view class="uni-flex uni-flex-item order-status">
									<text v-if="item.orderStatus == 1">待付款</text>
									<text v-if="item.orderStatus == 2">已支付</text>
									<text v-if="item.orderStatus == 3">已发货</text>
									<text v-if="item.orderStatus == 4">交易成功</text>
									<text v-if="item.orderStatus == 99">订单取消</text>
								</view>
							</view>
							<view class="uni-flex uni-column orderList">
								<view class="uni-flex uni-row order-item" v-for="(item, key) in item.items" :key="key" :class="[]">
									<view class="uni-flex uni-flex-item pic item-padding"><image mode="widthFix" :src="item.pic"></image></view>
									<view class="uni-flex uni-column uni-flex-item3 item-padding" style="margin-top: -10upx;">
										<text class="uni-text order-title">{{ item.title }}</text>
										<text class="uni-text order-specs">{{ item.productSpecsStr }}</text>
										<text class="uni-text order-specs">小计</text>
									</view>
									<view class="uni-flex uni-column uni-flex-item item-padding" style="margin-top: -16upx;">
										<text class="uni-text price-red">￥{{ item.prices }}</text>
										<text class="uni-text" style="padding-left: 10upx;">x{{ item.amount }}</text>
										<text class="uni-text price-red">￥{{ item.totalPrice }}</text>
									</view>
								</view>
							</view>
							
							<view class="uni-flex order-line item-padding ">
								<text class="allCount">共{{ item.orderItemCount }}件商品</text>
								合计：
								<text class="price-red allPrice">￥{{ item.actualPayment }}</text>
								(含运费：
								<text class="price-red">￥{{ item.expressCost }}</text>
								)
							</view>
							<view class="uni-flex order-line item-padding order-boder">{{ item.createDate }}</view>
							<view v-if="item.sales > 0" class="uni-flex uni-row order-line item-padding order-boder order-status">{{ item.groupStatus }}</view>
							<view class="uni-flex order-line item-padding order-btn">
								<view v-if="item.orderStatus == 99" class="btn" @click.stop="bindDel(item)">删除订单</view>
								<view v-if="item.orderStatus == 1" class="btn" @click.stop="bindCancel(item)">取消订单</view>
								<view v-if="(item.orderStatus == 1) & (item.payMode == 0)" class="btn" @click.stop="bindPay(item)">付款</view>
								<view v-if="(item.orderStatus == 1) & (item.payMode == 2)" class="btn" @click.stop="bindClick(item)">等待汇款</view>
								<view v-if="item.orderStatus == 2" class="btn" @click.stop="bindClick(item)">等待发货</view>
								<view v-if="refundBtn" class="btn" @click.stop="bindRefund(item)">
									<text v-if="item.refundState == 0">申请退款</text>
									<text v-if="item.refundState == 1">退款中</text>
									<text v-if="item.refundState == 2">退款成功</text>
									<text v-if="item.refundState == 3">退款失败</text>
								</view>
								<view v-if="item.orderStatus == 3 || item.orderStatus == 4" class="btn" @click.stop="bindEms(item)">查看物流</view>
								<view v-if="item.orderStatus == 3" class="btn" @click.stop="bindDone(item)">确认收货</view>
								<!-- <view v-if="item.orderStatus == 4" class="btn" @click.stop="bindEvaluate(item)">
									<text v-if="item.evaluateState==0">立即评价</text>
									<text v-if="item.evaluateState==1">查看评价</text>
								</view> -->
							</view>
						</view>
					</block>
					<view class="uni-tab-bar-loading"><uni-load-more :loadingType="tab.loadingType" :contentText="loadingText"></uni-load-more></view>
				</scroll-view>
			</swiper-item>
		</swiper>
		<backTop :src="backTop.src" @setScrollTop="setScrollTop" tab="true" :scrollTop="backTop.scrollTop"></backTop>
	</view>
</template>
<script>
import { mapState, mapMutations } from 'vuex';

import orderItem from '@/components/tab-nvue/orderItem.vue';
import uniLoadMore from '@/components/uni-load-more.vue';
import backTop from '@/components/uni-top.vue';
import order from '../../../common/order.js';
export default {
	computed: {
		...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
	},
	components: {
		orderItem,
		uniLoadMore,
		backTop
	},
	data() {
		return {
			backTop: {
				src: '../../../static/top.png',
				scrollTop: 0
			},
			scrollTop: 0,
			oldScrollTop: 0,
			loadingText: {
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			scrollLeft: 0,
			isClickChange: false,
			tabIndex: 0,
			user: {},
			newsitems: [
				{
					loadingType: 0,
					pageIndex: 1,
					items: []
				},
				{
					loadingType: 0,
					pageIndex: 1,
					items: []
				},
				{
					loadingType: 0,
					pageIndex: 1,
					items: []
				},
				{
					loadingType: 0,
					pageIndex: 1,
					items: []
				},
				{
					loadingType: 0,
					pageIndex: 1,
					items: []
				}
			],
			tabBars: [
				{
					name: '全部',
					id: 'all'
				},
				{
					name: '待付款',
					id: 'pay'
				},
				{
					name: '待发货',
					id: 'send'
				},
				{
					name: '待收货',
					id: 'wait'
				},
				{
					name: '退款/售后',
					id: 'service'
				}
			]
		};
	},
	onLoad(e) {
		if (!this.hasLogin) {
			uni.navigateTo({
				url: '../login/login'
			});
		} else {
			this.tabIndex = e.tab;
			this.user = JSON.parse(this.jyyUser);
			this.getData(this.tabIndex);
		}
	},
	methods: {
		bindDone(e) {
			order.done(this.webUrl, e, this.user);
		},
		bindDel(e) {
			order.del(this.webUrl, e, this.user.id);
		},
		bindCancel(e) {
			order.cancel(this.webUrl, e, this.user.id);
		},
		bindClick(e) {
			order.view(e);
		},
		bindPay(e) {
			order.pay(e);
		},
		bindRefund(e) {
			order.refund(e);
		},
		bindEms(e) {
			order.ems(e);
		},
		bindEvaluate(e) {
			order.evaluate(e);
		},
		loadMore(e) {
			setTimeout(() => {
				this.addData(e);
			}, 1200);
		},
		setScrollTop() {
			this.scrollTop = this.oldScrollTop;
			this.$nextTick(function() {
				this.scrollTop = 0;
			});
			this.backTop.scrollTop = 0;
		},
		noRepeat(arr) {
			var i,
				j,
				len = arr.length;
			for (i = 0; i < len; i++) {
				for (j = i + 1; j < len; j++) {
					if (arr[i].orderNo == arr[j].orderNo) {
						arr.splice(j, 1);
						len--;
						j--;
					}
				}
			}
			return arr;
		},
		scroll(e) {
			this.backTop.scrollTop = e.detail.scrollTop;
			this.oldScrollTop = e.detail.scrollTop;
		},
		addData(e) {
			this.getData(e);
		},
		async changeTab(e) {
			if (this.newsitems[e.target.current].items.length == 0) {
				this.getData(e.target.current);
			}
			let index = e.target.current;
			if (this.isClickChange) {
				this.tabIndex = index;
				this.isClickChange = false;
				return;
			}
			let tabBar = await this.getElSize('tab-bar'),
				tabBarScrollLeft = tabBar.scrollLeft;
			let width = 0;

			for (let i = 0; i < index; i++) {
				let result = await this.getElSize(this.tabBars[i].id);
				width += result.width;
			}
			let winWidth = uni.getSystemInfoSync().windowWidth,
				nowElement = await this.getElSize(this.tabBars[index].id),
				nowWidth = nowElement.width;
			if (width + nowWidth - tabBarScrollLeft > winWidth) {
				this.scrollLeft = width + nowWidth - winWidth;
			}
			if (width < tabBarScrollLeft) {
				this.scrollLeft = width;
			}
			this.isClickChange = false;
			this.tabIndex = index; //一旦访问data就会出问题
		},
		getData(e) {
			if (this.newsitems[e].loadingType == 2) {
				return;
			}
			this.newsitems[e].loadingType = 1;
			uni.request({
				url: this.webUrl + 'OrderList',
				method: 'POST',
				data: {
					pageIndex: this.newsitems[e].pageIndex,
					userid: this.user.id,
					status: e
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					if (res.data.result.uniOrderList.length > 0) {
						this.newsitems[e].items = this.newsitems[e].items.concat(res.data.result.uniOrderList);
						this.newsitems[e].items = this.noRepeat(this.newsitems[e].items);
					} else {
						this.newsitems[e].loadingType = 2;
						return;
					}
					if (this.newsitems[e].pageIndex == parseInt(res.data.result.pages)) {
						this.newsitems[e].loadingType = 2;
						return;
					} else {
						this.newsitems[e].loadingType = 0;
					}
					this.newsitems[e].pageIndex++;
				},
				fail: () => {},
				complete: () => {}
			});
		},
		getElSize(id) {
			//得到元素的size
			return new Promise((res, rej) => {
				uni.createSelectorQuery()
					.select('#' + id)
					.fields(
						{
							size: true,
							scrollOffset: true
						},
						data => {
							res(data);
						}
					)
					.exec();
			});
		},
		async tapTab(e) {
			//点击tab-bar
			if (this.tabIndex === e.target.dataset.current) {
				return false;
			} else {
				let tabBar = await this.getElSize('tab-bar'),
					tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
				this.scrollLeft = tabBarScrollLeft;
				this.isClickChange = true;
				this.tabIndex = e.target.dataset.current;
			}
		}
	}
};
</script>

<style>
.uni-swiper-tab {
	background: #ffffff;
}
.order-items .order-specs {
	width: auto;
}
</style>
