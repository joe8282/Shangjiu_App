<template>
	<view>
		<!-- tab nav-->
		<view class="navbar fx-navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
				<span>{{ item.text }}</span>
			</view>
		</view>
		<!-- tab 显示区域 -->
		<view>
			<view class="showArea" v-show="tabCurrentIndex === 0">
				<view class="list">
					<view class="list_content">
						<view class="word">
							<p>Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式J框架。</p>
							<span><b>2019-09-15</b><b>类型</b></span>
						</view>
						<view class="pic">
							<image src="../../static/images/tuboshu.jpg"></image>
						</view>
					</view>
				</view>
				<view class="list">
					<view class="list_content">
						<view class="word">
							<p>Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式J框架。</p>
							<span><b>2019-09-15</b><b>类型</b></span>
						</view>
						<view class="pic">
							<image src="../../static/images/tuboshu.jpg"></image>
						</view>
					</view>
				</view>
				<view class="list">
					<view class="list_content">
						<view class="word">
							<p>Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式J框架。</p>
							<span><b>2019-09-15</b><b>类型</b></span>
						</view>
						<view class="pic">
							<image src="../../static/images/tuboshu.jpg"></image>
						</view>
					</view>
				</view>
				<view class="list">
					<view class="list_content">
						<view class="word">
							<p>Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式J框架。</p>
							<span><b>2019-09-15</b><b>类型</b></span>
						</view>
						<view class="pic">
							<image src="../../static/images/tuboshu.jpg"></image>
						</view>
					</view>
				</view>
				<view class="list">
					<view class="list_content">
						<view class="word">
							<p>Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式J框架。</p>
							<span><b>2019-09-15</b><b>类型</b></span>
						</view>
						<view class="pic">
							<image src="../../static/images/tuboshu.jpg"></image>
						</view>
					</view>
				</view>
			</view>
			<view  v-show="tabCurrentIndex === 1">
				文章内容	
			</view>
			<view  v-show="tabCurrentIndex === 2">
				资讯内容	
			</view>
			<view  v-show="tabCurrentIndex === 3">
				热点内容	
			</view>
			<view  v-show="tabCurrentIndex === 4">
				新闻内容	
			</view>
		</view>
	</view>
</template>

<script>
	import 'pages/helplist/helplist.css';
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
						text: '全部',
					},
					{
						state: 1,
						text: '文章',
					},
					{
						state: 2,
						text: '资讯',
					},
					{
						state: 3,
						text: '热点',
					},
					{
						state: 4,
						text: '新闻',
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
			}
		}
	}
</script>

<style>
</style>
