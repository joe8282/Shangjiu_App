<template>
	<view class="main">
		<view class="tou">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
				<span>{{ item.text }}</span>
			</view>
		</view>
		<view class="sort">
				<span class="sort_active">拓客排序</span>
				<span>商号付费</span>
				<span>分利排序</span>
		</view>
		<view class="content" v-show="tabCurrentIndex === 0">
			<view class="list">
				<view class="bd">
					<navigator class="head">
						<view class="pic">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
						<view class="title">
							<span>商号名称商号名称商号名称商号名称商号名称商号名称商号名称</span>
							<span>详细地址详细地址详细地址详细地址详细地址详细地址详细地址</span>
						</view>
						<view class="fp">
							<span>所属业务员</span>
							<span>张冲傻蛋儿</span>
						</view>
					</navigator>
					<view class="bt">
						<span>客户记录 128</span>
						<span>商号付费 ￥9999</span>
						<span>代理分利 ￥12332</span>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="bd">
					<navigator class="head">
						<view class="pic">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
						<view class="title">
							<span>商号名称商号名称商号名称商号名称商号名称商号名称商号名称</span>
							<span>详细地址详细地址详细地址详细地址详细地址详细地址详细地址</span>
						</view>
						<view class="fp">
							<span>所属业务员</span>
							<span>张冲傻蛋儿</span>
						</view>
					</navigator>
					<view class="bt">
						<span>客户记录 128</span>
						<span>商号付费 ￥9999</span>
						<span>代理分利 ￥12332</span>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="bd">
					<navigator class="head">
						<view class="pic">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
						<view class="title">
							<span>商号名称商号名称商号名称商号名称商号名称商号名称商号名称</span>
							<span>详细地址详细地址详细地址详细地址详细地址详细地址详细地址</span>
						</view>
						<view class="fp">
							<span>所属业务员</span>
							<span>张冲傻蛋儿</span>
						</view>
					</navigator>
					<view class="bt">
						<span>客户记录 128</span>
						<span>商号付费 ￥9999</span>
						<span>代理分利 ￥12332</span>
					</view>
				</view>
			</view>
		</view>
		<view v-show="tabCurrentIndex === 1">
			<view class="list">
				<view class="bd">
					<navigator class="head">
						<view class="pic">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
						<view class="title">
							<span>商号名称商号名称商号名称商号名称商号名称商号名称商号名称</span>
							<span>详细地址详细地址详细地址详细地址详细地址详细地址详细地址</span>
						</view>
						<view class="fp">
							<navigator url="">分配业务员</navigator>
						</view>
					</navigator>
					<view class="bt">
						<span>客户记录 128</span>
						<span>商号付费 ￥9999</span>
						<span>代理分利 ￥12332</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import 'pages/myAgentShop/myAgentShop.css';
	import uniFav from "@/components/uni-fav/uni-fav.vue"
	export default {
		components: {
			uniFav
		},
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [
					{
						state: 0,
						text: '已分配',
					},
					{
						state: 1,
						text: '未分配',
					}
				],
				sortList: [
					{
						state: 0,
						text: '拓客排序',
					},
					{
						state: 1,
						text: '商号付费',
					},
					,
					{
						state: 2,
						text: '分利排序',
					}
				],
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
			},
			//点击选择排序方式
			addClass(){
				console.log(this.length);
			}
		}
	}
</script>

<style>
</style>
