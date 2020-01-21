<template>
	<view class="main">
		<view class="head">
			<view class="btn">
				<view class="add">
					<span>添加业务员</span>
				</view>
			</view>
			<view class="head_tab">
				<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
					<span>{{ item.text }}</span>
				</view>
			</view>
		</view>
		<view class="content" v-show="tabCurrentIndex === 0">
			<view class="list">
				<view class="head_pic">
					<image src="../../static/images/fx_tx.png"></image>
				</view>
				<view class="rt">
					<view class="username">
						<view class="c1">
							<span>宫岛胖胖呀</span>
							<span>2020-01-25</span>
						</view>
						<view class="c2">
							<view class="stop">
								<span>终止</span>
							</view>
						</view>
					</view>
					<view class="count">
						<span>商号总计<b>128</b></span>
						<span>客户总计<b>128</b></span>
						<span>代理分利<b>￥9999</b></span>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="head_pic">
					<image src="../../static/images/fx_tx.png"></image>
				</view>
				<view class="rt">
					<view class="username">
						<view class="c1">
							<span>宫岛胖胖呀</span>
							<span>2020-01-25</span>
						</view>
						<view class="c2">
							<view class="stop">
								<span>终止</span>
							</view>
						</view>
					</view>
					<view class="count">
						<span>商号总计<b>128</b></span>
						<span>客户总计<b>128</b></span>
						<span>代理分利<b>￥9999</b></span>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="head_pic">
					<image src="../../static/images/fx_tx.png"></image>
				</view>
				<view class="rt">
					<view class="username">
						<view class="c1">
							<span>宫岛胖胖呀</span>
							<span>2020-01-25</span>
						</view>
						<view class="c2">
							<view class="stop">
								<span>终止</span>
							</view>
						</view>
					</view>
					<view class="count">
						<span>商号总计<b>128</b></span>
						<span>客户总计<b>128</b></span>
						<span>代理分利<b>￥9999</b></span>
					</view>
				</view>
			</view>
		</view>
		<view class="content1" v-show="tabCurrentIndex === 1">
			<view class="list">
				<view class="head_pic">
					<image src="../../static/images/fx_tx.png"></image>
				</view>
				<view class="rt">
					<view class="username">
						<view class="c1">
							<span>宫岛胖胖呀</span>
							<span>2020-01-25</span>
						</view>
						<view class="c2">
							<view class="stop">
								<span>恢复</span>
							</view>
						</view>
					</view>
					<view class="count">
						<span>商号总计<b>128</b></span>
						<span>客户总计<b>128</b></span>
						<span>代理分利<b>￥9999</b></span>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="head_pic">
					<image src="../../static/images/fx_tx.png"></image>
				</view>
				<view class="rt">
					<view class="username">
						<view class="c1">
							<span>宫岛胖胖呀</span>
							<span>2020-01-25</span>
						</view>
						<view class="c2">
							<view class="stop">
								<span>恢复</span>
							</view>
						</view>
					</view>
					<view class="count">
						<span>商号总计<b>128</b></span>
						<span>客户总计<b>128</b></span>
						<span>代理分利<b>￥9999</b></span>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="head_pic">
					<image src="../../static/images/fx_tx.png"></image>
				</view>
				<view class="rt">
					<view class="username">
						<view class="c1">
							<span>宫岛胖胖呀</span>
							<span>2020-01-25</span>
						</view>
						<view class="c2">
							<view class="stop">
								<span>恢复</span>
							</view>
						</view>
					</view>
					<view class="count">
						<span>商号总计<b>128</b></span>
						<span>客户总计<b>128</b></span>
						<span>代理分利<b>￥9999</b></span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import 'pages/myAgentWorker/myAgentWorker.css';
	import uniFav from "@/components/uni-fav/uni-fav.vue"
	export default {
	    data() {
	        return {
				tabCurrentIndex: 0,
				navList: [
					{
						state: 0,
						text: '已添加',
					},
					{
						state: 1,
						text: '已终止',
					}
				],
	        }
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
