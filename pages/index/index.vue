<template>
	<view class="content">
		<view class="text-area">
			<view class="main-header-wrap">
				<input type="text" />
			</view>
			
		</view>
		<view class="uni-padding-wrap main-swiper">
			<view class="page-section swiper">
				<view class="page-section-spacing">
					<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
						<swiper-item>
							<view class="swiper-item uni-bg-red"><img src="static/images/slide_img1.jpg" height="100%" /></view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item uni-bg-green"><img src="static/images/slide_img1.jpg" height="100%"/></view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item uni-bg-blue"><img src="static/images/slide_img1.jpg" height="100%"/></view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<view class="main-two-nav">
			<ul>
				<li>11</li>
				<li>11</li>
			</ul>
		</view>
	</view>
	
</template>

<script>
	import 'static/css/index.css'
	// import uniNavBar from 'components/uni-nav-bar/uni-nav-bar.vue'
	// import uniIcon from 'components/uni-icon/uni-icon.vue'
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
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
