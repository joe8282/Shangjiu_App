<template>
	<view class="uni-flex uni-column mymember">
		<view class="myuser">我的会员</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate uni-navigate-right" @click="goBuyUser()">
					一级会员<text class="number">0</text>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate uni-navigate-right" @click="goBuyUser()">
					二级会员<text class="number">0</text>
				</view>
			</view>
			<view class="uni-list-cell">
				<view class="uni-list-cell-navigate uni-navigate-right" @click="goBuyUser()">
					三级会员<text class="number">0</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onShow() {},
		onLoad(e) {},
		methods: {
			goBuyUser() {
				uni.navigateTo({
					url: "./mySpreadOrder"
				})
			}
		}
	}
</script>
<style>
	.myuser {
		height: 80upx;
		text-align: center;
		line-height: 80upx;
	}
	.mymember .number {
		margin-right: 20upx;
	}
</style>
