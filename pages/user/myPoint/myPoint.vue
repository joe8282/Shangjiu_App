<template>
	<view class="jz_myPoint uni-flex uni-column">
		<view class="myPint_header uni-flex uni-column">
			<view class="t">账户积分</view>
			<view class="p">{{integral}}</view>
		</view>

		<view class="uni-list uni-flex uni-column">
			<view class="uni-list-cell " hover-class="uni-list-cell-hover" @click="goCashOut">
				<view class="uni-list-cell-navigate uni-navigate-right">
					<view class="uni-flex align-items">
						<image src="../../../static/img01.png"></image>
						<text>申请提现</text>
					</view>
				</view>
			</view>
			<view class="uni-list-cell " hover-class="uni-list-cell-hover" @click="goDetail">
				<view class="uni-list-cell-navigate uni-navigate-right">
					<view class="uni-flex align-items">
						<image src="../../../static/img02.png"></image>
						<text>提现明细</text>
					</view>
				</view>
			</view>
		</view>
		<view class="myPint_pace"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				integral: ''
			}
		},
		onLoad(e) {
			this.integral = e.integral;
		},
		methods: {
			goCashOut() {
				uni.navigateTo({
					url: 'cashOut?integral='+this.integral
				})
			},
			goDetail() {
				uni.navigateTo({
					url: 'income'
				})
			}
		}
	}
</script>

<style>
</style>
