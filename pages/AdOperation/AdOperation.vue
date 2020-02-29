<template>
	<view class="content" id="app">
		<!-- 自动刷新第一步 -->
		<!-- <view class="zdsx-one">
			<view class="zdsx-title-wrap">
				<view class="zdsx-title-cont">
					<view class="zdsx-title-left">
						<span>推广区域</span>
						<label>某某市</label>
					</view>
					<view class="zdsx-title-right">
						<span>推广剩余天数</span>
						<label>125天</label>
					</view>
				</view>
			</view>
			<view class="zdsx-bz">
				备注：刷新区域即为本项推广区域，设置上级区域刷新后，在所有下级区域均全部同步刷新；刷新天数不能超过推广剩余天数。
			</view>
			<view class="sxmt-list-wrap">
				<span>刷新天数</span>
				<input class="uni-input" placeholder="" />
				<label>天</label>
			</view>
			<view class="sxmt-list-wrap">
				<span>每天次数</span>
				<input class="uni-input" placeholder="" />
				<label>次</label>
			</view>
			<view class="AOyes-btn">确定</view>
		</view> -->
		
		<!-- 自动刷新第二步 -->
		<!-- <view class="zdsx-two">
			<view class="zdsx-two-list">
				<view class="zdsx-two-xl">
					<span>刷新区域</span>
					<label>某某市</label>
				</view>
				<view class="zdsx-two-xl">
					<span>刷新天数</span>
					<label>125天</label>
				</view>
				<view class="zdsx-two-xl">
					<span>每天次数</span>
					<label>3次/天</label>
				</view>
				<view class="zdsx-two-xl">
					<span>单价</span>
					<label>0.2元/次</label>
				</view>
				<view class="zdsx-two-xl">
					<span>总价</span>
					<label>158元</label>
				</view>
			</view>
			<view class="zdsx-two-bz">备注：支付提交后，即从当日计时。</view>
			<view class="zdsx-zhcz">
				<span>充值账户余额：2元</span>
				<label>立即充值</label>
			</view>
			<view class="AOyes-btn">支付提交</view>
		</view> -->
		
		<!-- 手动刷新 -->
		<view class="zdsx-two">
			<view class="zdsx-two-list sdsx-list">
				<view class="zdsx-two-xl">
					<span>单价</span>
					<label>0.2元/次</label>
				</view>
			</view>
			<view class="zdsx-two-bz">备注：手动刷新后即时提升自然排名。</view>
			<view class="zdsx-zhcz">
				<span>充值账户余额：2元</span>
				<label>立即充值</label>
			</view>
			<view class="AOyes-btn">支付提交</view>
		</view>
	</view>
	
</template>

<script>
	import 'pages/AdOperation/AdOperation.css';
	export default {
		data() {
			return {
				
			}

		},
		 methods: {
			
		   
		}

		
	}
</script>

