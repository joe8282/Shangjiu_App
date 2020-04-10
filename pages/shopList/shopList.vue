<template>
	<view class="content" id="app">
		<view class="text-area">
			<view class="main-header-wrap">
				<view class="uni-form-item uni-column">
					<img src="static/images/search.png" alt="" class="search-icon-img" />
					<input class="uni-input"  placeholder="      输入商号相关信息" />
				</view>
				<img src="static/images/news.png" alt="" class="main-header-news-icon" />
			</view>
			<view class="swiper-wrap">
				<uni-swiper-dot :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
					<swiper class="swiper-box" @change="change">
						<swiper-item v-for="(item, index) in info" :key="index">
							<view :class="item.colorClass" class="swiper-item">
								<image class="image" :src="item.url" mode="aspectFill" width="100%" />
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>
			<view class="productList-slider-wrap">
				<view class="productList-slider-three">
					<view class="productList-ssthree">
						<img src="static/images/all1.png" alt="" />
						<span>全部</span>
					</view>
					<view class="productList-ssthree">
						<img src="static/images/all2.png" alt="" />
						<span>免费</span>
					</view>
					<view class="productList-ssthree">
						<img src="static/images/all3.png" alt="" />
						<span>付费</span>
					</view>
					<view class="productList-ssthree">
						<img src="static/images/all4.png" alt="" />
						<span>红包</span>
					</view>
				</view>
				<view class="productList-slider-toggle">
					<view class="ps-toggle-list">
						<view class="pstoggle-list-left">
							<b>身份 |</b>
						</view>
						<view class="stoggle-list-right" id="hideshow-slider">
							<span>社团</span>
							<span>全部</span>
							<span>商报</span>
							<span>商社</span>
							<span>资讯</span>
							<span>社团</span>
							<span>全部</span>
							<span>商报</span>
							<span>商社</span>
							<span>资讯</span>
						</view>
						<img src="static/images/down-icon.png" class="slider-down-icon1" @click="sliderToggle()":class="[rotate?  'rotatetop' : 'rotatebottom']"/>
					</view>
					<view class="ps-toggle-list">
						<view class="pstoggle-list-left">
							<b>类型 |</b>
						</view>
						<view class="stoggle-list-right" id="hideshow-slider1">
							<span>全部</span>
							<span>商社</span>
							<span>商报</span>
							<span>社团</span>
							<span>资讯</span>
							<span>全部</span>
							<span>商社</span>
							<span>商报</span>
							<span>社团</span>
							<span>资讯</span>
						</view>
						<img src="static/images/down-icon.png" class="slider-down-icon1" @click="sliderToggle1()":class="[rotate1?  'rotatetop' : 'rotatebottom']"/>
					</view>
					<view class="ps-toggle-list">
						<view class="pstoggle-list-left">
							<b>行业 |</b>
						</view>
						<view class="stoggle-list-right" id="hideshow-slider2">
							<span>全部</span>
							<span>商社</span>
							<span>商报</span>
							<span>社团</span>
							<span>资讯</span>
							<span>全部</span>
							<span>商社</span>
							<span>商报</span>
							<span>社团</span>
							<span>资讯</span>
						</view>
						<img src="static/images/down-icon.png" class="slider-down-icon1" @click="sliderToggle2()":class="[rotate2?  'rotatetop' : 'rotatebottom']"/>
					</view>
					<view class="ps-toggle-list">
						<view class="pstoggle-list-left">
							<b>排序 |</b>
						</view>
						<view class="stoggle-list-right" id="hideshow-slider3">
							<span>综合</span>
							<span>浏览</span>
							<span>时间</span>
							<span>关注</span>
							<span>成员</span>
							<span>综合</span>
							<span>浏览</span>
							<span>时间</span>
							<span>关注</span>
							<span>成员</span>
						</view>
						<img src="static/images/down-icon.png" class="slider-down-icon1" @click="sliderToggle3()":class="[rotate3?  'rotatetop' : 'rotatebottom']"/>
					</view>
				</view>
			</view>
			<view class="productlist-hh-wrap">
				<view class="productlist-hh-list">
					<view class="small-tab">
						<view class="main-tab-nr">
							<img src="static/images/shangqu-img.png" alt="" class="main-tab-img" />
							<view class="main-tab-right">
								<span class="main-tab-r-title">黑乎乎的返回拉萨觉得浪费精力是大家</span>
								<label class="main-tab-r-ddd">是多久啊来开发时间浪费精力撒旦解放了吉了吉了吉解放了吉</label>
								<ul class="main-four-ul">
									<li>身份</li>
									<li>类型</li>
									<li>行业</li>
									<li>区域</li>
									<span class="dysf-style">订阅收费 ￥10000</span>
								</ul>
							</view>
						</view>
					</view>
				</view>
				<view class="productlist-hh-list">
					<view class="small-tab">
						<view class="main-tab-nr">
							<img src="static/images/shangqu-img.png" alt="" class="main-tab-img" />
							<view class="main-tab-right">
								<span class="main-tab-r-title">黑乎乎的返回拉萨觉得浪费精力是大家</span>
								<label class="main-tab-r-ddd">是多久啊来开发时间浪费精力撒旦解放了吉了吉了吉解放了吉</label>
								<ul class="main-four-ul">
									<li>身份</li>
									<li>类型</li>
									<li>行业</li>
									<li>区域</li>
									<span class="dysf-style">订阅收费 ￥10000</span>
								</ul>
							</view>
						</view>
					</view>
				</view>
				<view class="productlist-hh-list">
					<view class="small-tab">
						<view class="main-tab-nr">
							<img src="static/images/shangqu-img.png" alt="" class="main-tab-img" />
							<view class="main-tab-right">
								<span class="main-tab-r-title">黑乎乎的返回拉萨觉得浪费精力是大家</span>
								<label class="main-tab-r-ddd">是多久啊来开发时间浪费精力撒旦解放了吉了吉了吉解放了吉</label>
								<ul class="main-four-ul">
									<li>身份</li>
									<li>类型</li>
									<li>行业</li>
									<li>区域</li>
									<span class="dysf-style">订阅收费 ￥10000</span>
								</ul>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
		</view>
		
	
	</view>
	
</template>

<script>
	import 'pages/shopList/shopList.css';
	import uniSection from '@/components/uni-section/uni-section.vue';
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue";
	import uniFav from "@/components/uni-fav/uni-fav.vue"
	export default {
		components: {
			uniFav,
			uniSection,
			uniSwiperDot
		},
		data() {
			return {
				sss:false,
				rotate: false,
				rotate1: false,
				rotate2: false,
				rotate3: false,
				info: [{
						colorClass: 'uni-bg-red',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
						content: '内容 A'
					},
					{
						colorClass: 'uni-bg-green',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
						content: '内容 B'
					},
					{
						colorClass: 'uni-bg-blue',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
						content: '内容 C'
					}
				],
				dotStyle: [{
						backgroundColor: 'rgba(0, 0, 0, .3)',
						border: '1px rgba(0, 0, 0, .3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
						selectedBorder: '1px rgba(0, 0, 0, .9) solid'
					},
					{
						backgroundColor: 'rgba(255, 90, 95,0.3)',
						border: '1px rgba(255, 90, 95,0.3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
						selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
					},
					{
						backgroundColor: 'rgba(83, 200, 249,0.3)',
						border: '1px rgba(83, 200, 249,0.3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
						selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
					}
				],
				modeIndex: -1,
				styleIndex: -1,
				current: 0,
				mode: 'default',
				dotsStyles: {}
				　
				

			}
		},
		onLoad() {},
		methods: {
			change(e) {
				this.current = e.detail.current
			},
			selectStyle(index) {
				this.dotsStyles = this.dotStyle[index]
				this.styleIndex = index
			},
			selectMode(mode, index) {
				this.mode = mode
				this.modeIndex = index
				this.styleIndex = -1
				this.dotsStyles = this.dotStyle[0]
			},
			sliderToggle() {
			    if(this.rotate == false){
			        document.getElementById("hideshow-slider").style.height="auto"
					this.rotate = !this.rotate;
			    }else{
			        document.getElementById("hideshow-slider").style.height="24px"
					this.rotate = !this.rotate;
			    }
			},
			sliderToggle1() {
			    if(this.rotate1 == false){
			        document.getElementById("hideshow-slider1").style.height="auto"
					this.rotate1 = !this.rotate1;
			    }else{
			        document.getElementById("hideshow-slider1").style.height="24px"
					this.rotate1 = !this.rotate1;
			    }
			},
			sliderToggle2() {
			    if(this.rotate2 == false){
			        document.getElementById("hideshow-slider2").style.height="auto"
					this.rotate2 = !this.rotate2;
			    }else{
			        document.getElementById("hideshow-slider2").style.height="24px"
					this.rotate2 = !this.rotate2;
			    }
			},
			sliderToggle3() {
			    if(this.rotate3 == false){
			        document.getElementById("hideshow-slider3").style.height="auto"
					this.rotate3 = !this.rotate3;
			    }else{
			        document.getElementById("hideshow-slider3").style.height="24px"
					this.rotate3 = !this.rotate3;
			    }
			}
		}
	}
</script>

