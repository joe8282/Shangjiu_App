<template>
	<view class="content" id="app">
		<!-- 商号推广第一步 -->
		<!-- <view class="tgqy-wrap">
			<view class="tgqy-cont">
				<span>推广区域</span>
				<pickerAddress @change="change" class="select-city">{{txt}}</pickerAddress>
			</view>
			<view class="zdsx-bz Adadd-bz">备注：可选择不限（全国）、省、市、区县等不同等级区域进行推广，如选择上级区域则自动在下级所有区域全覆盖显示。</view>
			<view class="sxmt-list-wrap">
				<span>推广天数</span>
				<input class="uni-input" placeholder="" />
				<label>天</label>
			</view>
			<view class="AOyes-btn">确定</view>
		</view> -->
		<!-- 商号推广第二步 -->
		<view class="zdsx-two">
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
					<span>单价</span>
					<label>0.2元/次</label>
				</view>
				<view class="zdsx-two-xl">
					<span>总价</span>
					<label>158元</label>
				</view>
			</view>
			<view class="zdsx-bz AdAdd-bz2">备注：支付提交后，如审核通过，则从通过之日起计时; 如审核未通过，则所支付费用返还至充值账户。</view>
			<view class="zdsx-zhcz">
				<span>充值账户余额：2元</span>
				<label>立即充值</label>
			</view>
			<view class="AOyes-btn Adadd-yesbtn">支付提交</view>
		</view>
	</view>
	
</template>

<script>
	import 'pages/AdAdd/AdAdd.css';
	import pickerAddress from '@/components/wangding-pickerAddress/wangding-pickerAddress.vue';
	export default {
		components:{
		    pickerAddress
		},
		data() {
			return {
				txt: '选择地址',
			}

		},
		methods: {
			change(data) {
			    this.txt = data.data.join('')
			    console.log(data.data)
			}
		   
		}

		
	}
</script>

