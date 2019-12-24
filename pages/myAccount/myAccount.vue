<template>
	<view class="body">
		<view class="head">
			<view class="money">
				<span>未结算金额</span>
				<span>￥<b>99999.00</b></span>
			</view>
		</view>
		<view class="sr_count">
			<view class="sr1">
				<view class="sr_title"><span>收入账户</span><span>共计:1250000元</span></view>
				<view class="sr_count1">
					<navigator class="kt">
						<span>拓客收入</span>
						<span>￥9999</span>
					</navigator>
					<view class="sx"></view>
					<navigator class="kt">
						<span>商号代理</span>
						<span>￥9999</span>
					</navigator>
					<view class="sx"></view>
					<navigator class="kt">
						<span>平台代理</span>
						<span>￥9999</span>
					</navigator>
					<view class="sx"></view>
					<navigator class="kt">
						<span>拓客收入</span>
						<span>￥9999</span>
					</navigator>
				</view>
				<view class="sr_count1" style="border-top: 1px solid  #DADADA;">
					<navigator class="kt">
						<span>商号收费</span>
						<span>￥9999</span>
					</navigator>
					<view class="sx"></view>
					<navigator class="kt">
						<span>红包收入</span>
						<span>￥9999</span>
					</navigator>
					<view class="sx"></view>
				</view>
			</view>
		</view>
		<view class="cash">
			<!-- 一般用法 -->
			<uni-list>
			    <uni-list-item  title="充值账户"></uni-list-item>
			</uni-list>
			<view class="c1">
				<view class="cc">
					<span>历史充值</span>
					<span>￥999999</span>
				</view>
				<view class="sx"></view>
				<view class="cc">
					<span>余额充值</span>
					<span>￥999999</span>
				</view>
			</view>
		</view>
		<view class="zc">
			<view class="zc1">
				<span>我的支出</span>
				<span>￥9999<img src="static/images/right-arrow.png" alt="" class="right-arrow" /></span>
			</view>
			<view class="zc1" style="border-top: 1px solid  #DADADA;">
				<span>结算记录</span>
				<span>￥9999<img src="static/images/right-arrow.png" alt="" class="right-arrow" /></span>
			</view>
		</view>
		<view class="bank">
			<uni-list>
			    <uni-list-item  title="我的银行卡"></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import 'pages/myAccount/myAccount.css';
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
	    components: {uniList,uniListItem}
	}
	// import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
</script>

<style>
</style>
