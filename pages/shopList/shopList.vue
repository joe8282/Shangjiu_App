<template>
	<view class="content" id="app">
		<view class="text-area">
			<view class="main-header-wrap">
				<view class="uni-form-item uni-column">
					<img src="static/images/search.png" alt="" class="search-icon-img" />
					<input class="uni-input" placeholder="      输入商号相关信息" />
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
					<view class="productList-ssthree" @click="to">
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
					<ms-dropdown-menu>
						<ms-dropdown-item v-model="value1" :list="sflist"></ms-dropdown-item>
						<ms-dropdown-item v-model="value1" :list="lxlist"></ms-dropdown-item>
						<ms-dropdown-item v-model="value1" :list="hylist"></ms-dropdown-item>
						<ms-dropdown-item v-model="value1" :list="pxlist"></ms-dropdown-item>

					</ms-dropdown-menu>
				</view>
			</view>
			<view class="productlist-hh-wrap">
				<view class="productlist-hh-list" v-for="(item,index) in shopList" :key="index">
					<navigator :url="'../shopdetail/shopdetail?id=' + item.Id + '&UserId=' + item.UserId" class="list_content">
						<view class="small-tab">
							<view class="main-tab-nr">
								<img :src="item.ShopPic" alt="" class="main-tab-img" />
								<view class="main-tab-right">
									<span class="main-tab-r-title">{{ item.ShopTitle }}</span>
									<label class="main-tab-r-ddd">{{ item.ShopContent }}</label>
									<ul class="main-four-ul">
										<li>{{ item.ChannelName }}</li>
										<li>{{ item.TypeName }}</li>
										<li>{{ item.ClassName }}</li>
										<li>{{ item.City }}-{{ item.Area }}</li>
										<span class="dysf-style" id="joinway">{{ item.JoinWay }}</span>
									</ul>
								</view>
							</view>
						</view>
					</navigator>
				</view>
			</view>


		</view>


	</view>

</template>

<script>
	// import 'pages/shopList/shopList.css';
	import uniSection from '@/components/uni-section/uni-section.vue';
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue";
	import uniFav from "@/components/uni-fav/uni-fav.vue"
	import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
	import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'
	export default {
		components: {
			uniFav,
			uniSection,
			uniSwiperDot,
			msDropdownMenu,
			msDropdownItem
		},
		data() {
			return {
				sflist: [{
					text: '111',
					value: 0
				}],
				lxlist: [{
					text: '111',
					value: 0
				}],
				hylist: [{
					text: '111',
					value: 0
				}],
				pxlist: [{
						text: '升序',
						value: 0
					},
					{
						text: '升序',
						value: 1
					},
					{
						text: '降序',
						value: 2
					}
				],
				value1: 0,
				value2: 1,
				value3: 'init',

				shopList: [],
				shenfen: [],
				hangye: [],
				leixing: [],
				sss: false,
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
		onLoad() {
			this.getShopListData();
			this.getShopAddData();
		},
		methods: {
			to() {
				uni.navigateTo({
					url: '../login/register'
				});
			},
			choose() {
				let obj = {
					value: 'Name'
				}
				this.$refs.dropdownItem.choose(obj)
			},
			close() {
				this.$refs.dropdownItem.closePopup()
			},



			getShopAddData() {
				uni.request({
					url: this.$serverUrl + '/SystemManage/Dev_Type/GetDataList_NoPagin?parentId=1206262951519064064',
					success: (res) => {
						var arr = ['a', 'b', 'c', 'd'];
						arr.splice(1, 1);
						console.log(arr)
						for (var i = 0; i < res.data.length; i++) {
							this.shenfen = res.data;
							var sfName = res.data[i].Name;
							var sfId = res.data[i].Id;
							this.sflist[0].text = res.data[0].Name;
							this.sflist.push({
								text: sfName,
								value: sfId
							})


						}
					}
				});

				uni.request({
					url: this.$serverUrl + '/SystemManage/Dev_Type/GetDataList_NoPagin?parentId=1204236610573570048',
					success: (res) => {
						for (var h = 0; h < res.data.length; h++) {
							this.hangye = res.data
							var hyName = res.data[h].Name;
							var hyId = res.data[h].Id;
							this.hylist[0].text = res.data[0].Name;
							this.hylist.push({
								text: hyName,
								value: hyId
							})
						}
					}
				});
				uni.request({
					url: this.$serverUrl + '/SystemManage/Dev_Type/GetDataList_NoPagin?parentId=1204236075598483456',
					success: (res) => {
						for (var l = 0; l < res.data.length; l++) {
							this.leixing = res.data
							var lxName = res.data[l].Name;
							var lxId = res.data[l].Id;
							this.lxlist[0].text = res.data[0].Name;
							this.lxlist.push({
								text: lxName,
								value: lxId
							})
						}
					}
				});
			},
			getShopListData() {
				var desc = desc
				uni.request({
					url: this.$serverUrl + '/Shop/Dev_Shop/GetDataList',
					data: {
						// SortType: desc

					},
					success: (res) => {
						this.shopList = res.data.rows;
						for (var j = 0; j < this.shopList.length; j++) {
							if (res.data.rows[j].JoinWay == 1) {
								this.shopList[j].JoinWay = '开放加入'
							} else if (res.data.rows[j].JoinWay == 2) {
								this.shopList[j].JoinWay = '审核加入'
							} else if (res.data.rows[j].JoinWay == 3) {
								this.shopList[j].JoinWay = '付费加入'
							}
						}


					},

				})
			},


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
				if (this.rotate == false) {
					document.getElementById("hideshow-slider").style.height = "auto"
					this.rotate = !this.rotate;
				} else {
					document.getElementById("hideshow-slider").style.height = "24px"
					this.rotate = !this.rotate;
				}
			},
			sliderToggle1() {
				if (this.rotate1 == false) {
					document.getElementById("hideshow-slider1").style.height = "auto"
					this.rotate1 = !this.rotate1;
				} else {
					document.getElementById("hideshow-slider1").style.height = "24px"
					this.rotate1 = !this.rotate1;
				}
			},
			sliderToggle2() {
				if (this.rotate2 == false) {
					document.getElementById("hideshow-slider2").style.height = "auto"
					this.rotate2 = !this.rotate2;
				} else {
					document.getElementById("hideshow-slider2").style.height = "24px"
					this.rotate2 = !this.rotate2;
				}
			},
			sliderToggle3() {
				if (this.rotate3 == false) {
					document.getElementById("hideshow-slider3").style.height = "auto"
					this.rotate3 = !this.rotate3;
				} else {
					document.getElementById("hideshow-slider3").style.height = "24px"
					this.rotate3 = !this.rotate3;
				}
			}
		}
	}
</script>
<style lang="scss">
	// css start
	* {
		margin: 0;
		padding: 0;
		touch-action: pan-y;
	}

	body {
		background-color: #F6F6F6;
	}

	ul,
	li {
		list-style: none;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	a {
		text-decoration: none;
	}

	img {
		max-width: 100%;
		vertical-align: middle;
	}

	em {
		font-style: normal;
	}

	i {
		font-style: normal;
	}

	.main-header-wrap {
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: center;
		background: url(/static/images/index-header-bg.png) no-repeat center;
		background-size: 100%;
		position: relative;
	}

	.main-header-news-icon {
		position: absolute;
		right: 12px;
		height: 24px;
		top: 8px;
	}

	.list .inv-h-se {
		color: #B22420;
	}

	.xisisi {
		color: blue;
		display: flex;
		justify-content: center;
		vertical-align: middle;
	}

	.main-header-wrap .uni-input-input {
		background: #efefef !important;
		border-radius: 4px;
		font-size: 14px;
		text-indent: 26px;


	}

	.uni-input-placeholder {
		background: #efefef !important;
		border-radius: 4px;
		font-size: 14px;
	}

	.uni-form-item {
		width: 56%;
		position: relative;
	}

	.search-icon-img {
		position: absolute;
		height: 54%;
		z-index: 99999999;
		top: 25%;
		left: 2%;
	}

	.uni-input {
		border-radius: 4px;
		margin-top: 9px;
	}

	.swiper-wrap {
		width: 92%;
		float: left;
		margin-left: 4%;
		margin-top: 10px;
		border-radius: 4px;
		overflow: hidden;
	}

	.swiper-wrap uni-image {
		width: 100% !important;
		border-radius: 4px;
	}

	.productlist-hh-list {
		margin-top: 10px;
		width: 100%;
		float: left;
		border-bottom: 1px solid #ececec;
	}

	.small-tab {
		width: 92%;
		margin-left: 4%;
		padding-bottom: 10px;
		float: left;
	}

	.main-tb-title {
		width: 100%;
		float: left;
	}

	.main-tb-title span {
		font-size: 12px;
		color: #646464;
		float: left;
		line-height: 14px;
	}

	.main-tb-title label {
		float: right;
		font-size: 12px;
		color: #b22420;
		border: 1px solid #b22420;
		height: 20px;
		line-height: 20px;
		padding: 0 10px;
		border-radius: 4px;
	}

	.main-tab-r-b {
		width: 100%;
		float: left;
	}

	.main-tab-r-b span {
		font-size: 12px;
		width: 33%;
		display: inline-flex;
		color: #999999;
	}

	.main-tab-nr {
		width: 100%;
		float: left;
	}

	.main-tab-right {
		width: 80%;
		float: left;
	}

	.main-tab-r-title {
		display: inline-block;
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		float: left;
		font-size: 14px;
		line-height: 20px;
	}

	.main-tab-img {
		float: right !important;
		width: 18%;
	}

	.main-tab-r-ddd {
		display: inline-block;
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		float: left;
		font-size: 12px;
		color: #646464;
		height: 20px;
	}

	.main-four-ul,
	.main-three-ul {
		float: left;
		display: inline-block;
		width: 100%;
		padding: 0;
	}

	.main-four-ul li {
		float: left;
		color: #999999;
		margin-right: 14px;
		font-size: 12px;
	}

	.main-three-ul li {
		width: 33%;
		float: left;
		color: #b22420;
		font-size: 12px;
	}

	.productlist-hh-wrap {
		width: 100%;
		float: left;
	}

	.dysf-style {
		font-size: 12px;
		float: left;
		color: #b22420;
	}

	.productList-slider-wrap {
		width: 92%;
		margin-left: 4%;
		float: left;
		margin-top: 10px;
	}

	.productList-ssthree {
		width: 25%;
		height: 60px;
		float: left;
		position: relative;
		margin-bottom: 10px;
	}

	.productList-ssthree img {
		width: 30px;
		position: absolute;
		left: 50%;
		top: 10px;
		margin-left: -15px;
	}

	.productList-ssthree span {
		display: inline-block;
		width: 100%;
		text-align: center;
		position: absolute;
		top: 44px;
		left: 0;
		font-size: 14px;
		color: #646464;
	}

	.ps-toggle-list {
		width: 100%;
		float: left;
		position: relative;
	}

	.productList-slider-toggle {
		width: 100%;
		float: left;
	}

	.pstoggle-list-left {
		width: 14%;
		float: left;
		height: 100%;
		font-size: 14px;
		line-height: 28px;
		color: #2c2c2c;
	}

	.stoggle-list-right {
		width: 86%;
		float: right;
		height: 24px;
		overflow: hidden;
	}

	.stoggle-list-right span {
		display: inline-block;
		width: 20%;
		font-size: 14px;
		color: #646464;
		text-align: left;
	}

	.slider-down-icon1 {
		width: 20px;
		position: absolute;
		right: 0;
		top: 6px;
	}

	p {
		height: 200px;
		overflow: hidden;
	}

	.rotatetop {
		transform: rotate(180deg);
	}

	.rotatebottom {
		transform: rotate(0deg);
	}

	.dropdown-item {
		width: 14% !important;
		float: left;
	}

	.dropdown-item .list__option {
		font-size: 14px !important;
	}

	.dropdown-item .list__option:first-child {
		display: none !important;
	}

	.dropdown-item__selected[data-v-2978376e] {
		background: #FFFFFF !important;
		padding: 6px !important;
	}

	.dropdown-item__selected .selected__name[data-v-2978376e] {
		font-size: 14px !important;
	}

	// css end

	.dropdown-item-content {
		padding: 20rpx;
	}

	.dropdown-item-content .btn {
		background: #F00000;
		background: #007aff;
		color: #fff;
		padding: 20rpx;
		display: inline-block;
		border-radius: 10rpx;
	}

	.dropdown-item-title {
		display: flex;

	}

	.dropdown-item-title .title {
		color: red;
	}

	.dropdown-item-title .btn {
		font-size: 24rpx;
		background: #F00000;
		background: #007aff;
		color: #fff;
		padding: 10rpx;
		display: inline-block;
		border-radius: 10rpx;
	}
</style>
