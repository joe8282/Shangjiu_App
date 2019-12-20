<template>
	<view class="content">
		<view class="shopAdd-commit-img-wrap">
			上传主图 
		</view>
		<view class="shopAdd-cont-wrap">
			<view class="shopAdd-cont-cc">
				<view class="shopAdd-cont-title">
					<span>商号名称：</span>
					<!-- <textarea value="" placeholder="请填写商号名称" class="shopAdd-textarea" /> -->	
				</view>
				<textarea @blur="bindTextAreaBlur" auto-height placeholder="请填写商号名称" class="shopAdd-textarea" />
			</view>
		</view>
		<view class="shopAdd-cont-wrap">
			<view class="shopAdd-cont-cc">
				<view class="shopAdd-cont-title">
					<span>商号所有者身份：</span>
				</view>
			</view>
		</view>
	




		
	</view>
	
</template>

<script>
	import 'pages/shopAdd/shopAdd.css'
	export default {
		data() {
			return {
				
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
		font-size: 36px;
		color: #8f8f94;
	}
</style>
