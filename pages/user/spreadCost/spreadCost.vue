<template>
	<view class="uni-flex uni-column">
		<view class="spreadCost-wrap uni-flex justify-content align-items uni-column">
			<view class="uni-flex-item">推广总额</view>
			<view class="uni-flex-item spreadCost">0.00</view>
		</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate">
					未确认推广费：<text class="number">￥{{count1}}</text>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate">
					已确认推广费：<text class="number">￥{{count2}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'


	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
		},
		data() {
			return {
				user: {},
				count1: 0,
				count2: 0,
			}
		},
		onLoad() {
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
					this.getData();
				}
			},
			getData(){
				uni.request({
					url: this.webUrl + 'MyOrdersCount',
					method: 'POST',
					data: {
						userid: this.user.id
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						this.count1 = res.data.result.resultInfo;
						this.count2 = res.data.result.resultInfo2;			
					},
					fail: () => {},
					complete: () => {}
				});
			}
			
		}
	}
</script>
<style>
	.spreadCost-wrap {
		height: 130upx;
		text-align: center;
		line-height: 80upx;
		background: #FFFFFF;
	}

	.uni-list-cell:after {
		background: none;
	}

	.spreadCost-wrap .spreadCost {
		margin-top: -30upx;
	}

	.spreadCost-wrap .number {
		margin-right: 20upx;
	}

	.spreadCostBtn {
		margin-top: 15upx;
		width: 95%;
		text-align: center;
		color: #FFFFFF;
		background: #4cda64;
	}
</style>
