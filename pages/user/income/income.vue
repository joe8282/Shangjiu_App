<template>
	<view class="jz_income uni-flex uni-column">
		<view class="item_top uni-flex space-between">
			<view class="dataBtn uni-flex justify-align-center" @click="onShowDatePicker('rangetime')">
				<view class="date"> {{range[0]}} - {{range[1]}}</view>
				<image src="../../../static/income/03.png"></image>
			</view>
			<view class="moneny uni-flex justify-align-center">收入 ￥{{income}}</view>
		</view>
		<view class="income_item uni-flex uni-column">

			<view class="income_space"></view>
			<view class="content_list uni-flex uni-column">
				<view class="content_item_wrap">
					<view class="content_item uni-flex space-between align-items" v-for="(item, key) in moneyLogList" :key="key"
					 @click="goProduct(item)">
						<view class="item_lf uni-flex align-items">
							<view class="uni-flex justify-align-center lef-img">
								<image :src="'../../../static/income/0'+item.rank+'.png'"></image>
							</view>
							<view class="item_titles uni-flex space-between uni-column">
								<view class="" v-if="item.rank==1">推广收益 - 直接收益</view>
								<view class="" v-if="item.rank==2">推广收益 - 间接收益</view>
								<view class="uni-flex">
									<view class="orderNo ">{{item.orderNo}}</view>
								</view>
								<view class="">{{item.createDate}}</view>
							</view>
						</view>

						<view class="item_rt uni-flex  justify-align-center">
							<view class="uni-flex uni-column">
								<view>￥{{item.amount}}</view>
								<view v-if="item.state==0" style="color: #666666;">未确认</view>
								<view v-if="item.state==1" style="color: #666666;">已确认</view>
							</view>
							<view class="uni-flex justify-align-center rtLine" >
								<uni-icon type="arrowright" size="20"></uni-icon>
							</view>
							
						</view>
					</view>
				</view>

			</view>

		</view>
		<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		<mx-date-picker :show="showPicker" :type="type" :value="value" :show-tips="true" :begin-text="'开始'" :end-text="'结束'"
		 :show-seconds="true" @confirm="onSelected" @cancel="onSelected" />
	</view>
</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	import MxDatePicker from "@/components/mx-datepicker/mx-datepicker.vue";
	import util from '../../../common/util.js'
	import loadMore from '@/components/uni-load-more.vue';
	import backTop from '@/components/uni-top.vue';
	import uniIcon from '../../../components/uni-icon.vue';

	var index;
	var date = new Date();
	var range = util.getMonthFirstLastDay(date.getFullYear(), date.getMonth() + 1);
	export default {
		components: {
			MxDatePicker,
			loadMore,
			backTop,
			uniIcon
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
		},
		data() {
			return {
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				backTop: {
					"src": "../../static/top.png",
					"scrollTop": 0
				},
				user: {},
				moneyLogList: [],
				showPicker: false,
				type: 'rangetime',
				range: range,
				value: '',
				income: 0,
			}
		},
		onLoad() {
			
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '../login/login',
				});
			} else {
				range[0]='2019-11-01';
				index = 1;
				this.user = JSON.parse(this.jyyUser);
				this.getData();
			}

		},
		onPullDownRefresh() {
			this.getData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			this.getData();
		},
		methods: {
			goProduct(e) {
				uni.navigateTo({
					url: 'product?id=' + e.id + '&userid=' + this.user.id
				})
			},
			getData() {
				if (this.loadingType !== 0) {
					return;
				}
				uni.request({
					url: this.webUrl + 'GetMoneyLog',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						userid: this.user.id,
						PageIndex: index,
						begin: this.range[0],
						end: this.range[1],
					},
					success: res => {
						this.income = res.data.result.income.toFixed(2);
						if (res.data.result.moneyLogList.length > 0) {
							this.moneyLogList = this.moneyLogList.concat(res.data.result.moneyLogList);
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
			onShowDatePicker(type) { //显示
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onSelected(e) { //选择
				this.showPicker = false;
				if (e) {
					this.range[0] = util.formatDate(e.value[0], "YY-MM-DD");
					this.range[1] = util.formatDate(e.value[1], "YY-MM-DD");
					index = 1;
					this.loadingType = 0;
					this.moneyLogList = [];
					this.getData();
				}
			}
		}
	}
</script>


<style>
	.rtLine{
		color: #999999;
		margin-left: 30upx;
	}
	
	page {
		height: auto;
	}

	.jz_income .mescroll-uni.mescroll-uni-fixed {
		position: static;
	}

	.jz_income .orderNo {
		width: 300upx;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.jz_income .orderNoTitle {
		width: 110upx;
	}
</style>
