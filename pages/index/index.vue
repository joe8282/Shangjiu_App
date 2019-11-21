<template>
	<view class="content">
		<view class="text-area">
			<view class="main-header-wrap">
				<span class="xisisi">1111</span>
			</view>
		</view>
	</view>
</template>

<script>
	import 'static/css/index.css'
	import uniNavBar from 'components/uni-nav-bar/uni-nav-bar.vue'
	import uniIcon from 'components/uni-icon/uni-icon.vue'
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	


	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
