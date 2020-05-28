<template>
	<view>
		<!-- tab nav-->
		<!-- <view class="navbar1"> -->
		<view class="navbar fx-navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
				<span v-if="btnFlag">{{ item.text }}</span>
			</view>
		</view>
		<!-- tab 显示区域 -->
		<view class="all-arr">
			<view class="showArea" v-show="tabCurrentIndex === 0">
				<view class="allarr-list">
					<view class="allar-title">
						<span>活动哒哒哒</span>
						<label>2019/08/13</label>
					</view>
					<view class="allar-cont">
						<span>您购买的华为P30 手机 天空之境 全网通(8GB+128GB)......请求你评论</span>
					</view>
				</view>
				<view class="allarr-list">
					<view class="allar-title">
						<span>活动哒哒哒</span>
						<label>2019/08/13</label>
					</view>
					<view class="allar-cont">
						<span>您购买的华为P30 手机 天空之境 全网通(8GB+128GB)......请求你评论</span>
					</view>
				</view>
				
			</view>
			<view class="showArea" v-show="tabCurrentIndex === 1">
				<view class="allarr-list">
					<view class="allar-title">
						<span>活动哒哒哒</span>
						<label>2019/08/13</label>
					</view>
					<view class="allar-cont">
						<span>您购买的华为P30 手机 天空之境 全网通(8GB+128GB)......请求你评论</span>
					</view>
				</view>
			</view>
		
			
			
		</view>
	</view>
</template>

<script>
	import 'pages/message/message.css';
	import uniFav from "@/components/uni-fav/uni-fav.vue";
	export default {
		components: {
			uniFav
		},
		data() {
			return {
				pre:'item',
				failFlag:true,
				count:0,
									
				tabCurrentIndex: 0,
				navList: [
					{
						state: 0,
						text: '已读消息',
					},
					{
						state: 1,
						text: '未读消息',
					}
				],
				btnFlag:true,
				

			};
		},
	
		onLoad(options) {
			// 页面显示是默认选中第一个
			this.tabCurrentIndex = 0;
		
		},
		

		
		methods: {		
			
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			}
			
			
			
		}
	}
</script>

<style>
</style>
