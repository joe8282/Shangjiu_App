<template>
	<view class="uni-flex lists jz_lists uni-column jz_myfit jz_agent  ">
		<view class="tab-search uni-column">
			<view class="tabList">
				<scroll-view class="uni-flex uni-swiper-tab" scroll-x :scroll-left="scrollLeft" id="tab-bars">
					<view v-for="(tab, i) in categorys" :key="i" class="swiper-tab-list" :id="'tab' + tab.id" :data-current="index"
					 @click="changeTab(i, tab)">
						<view class="productTitle-item uni-flex uni-column">
							<image :src="tab.ico"></image>
							<view :class="['picname', curIndex == i ? 'activeLine' : '']">{{ tab.title }}</view>
						</view>
					</view>
				</scroll-view>
				<view style="height: 10upx;background: #F4F5F6;width: 100%;"></view>
			</view>
			<view class="search uni-flex ">
				<!-- :class="[sortNavfixed ? 'fixed' : '']" -->
				<view class="uni-flex-item uni-flex search-input">
					<input placeholder="关键词" @input="inputChange" v-model="key" :focus="isFocus" @focus="focus" @blur="blur" class="uni-flex-item" />
					<icon v-if="isDelShow" class="icon icon-del" @click.stop="clear" type="clear" size="12"></icon>
				</view>

				<view class="searchBtn uni-flex justify-align-center" @click="search">
					<image src="../../../static/search02.png"></image>
					<text>搜索</text>
				</view>
			</view>
		</view>

		<view class="agent-product uni-flex uni-column" id="list">
			<view class=" uni-flex uni-row uni-flex-item myfit-product" v-for="(item, key) in products" :key="key">
				<view class="uni-flex product-img justify-align-center">
					<image class="image" :class="{ lazy: !item.display }" :id="'lazy' + key" :data-index="0" @load="imageOnLoad(item, key)"
					 :src="item.display ? item.pic : ''" style="left: 0;top: 0;"/>
					<view class="loadbox" :class="{loaded:item.loaded}" style="left: 0;top: 0;">
						<view class="load"></view>
					</view>
				</view>
				<view class="uni-flex  uni-column space-between product-contents">
					<view class="uni-flex title">{{item.title}}</view>
					<view class="prices uni-flex uni-flex">
						<view class="uni-flex">我的价格:{{item.costPrice}}/瓶</view>
						<view class="uni-flex" style="margin-left: 20upx;">代理价格:{{item.salePrice}}/瓶</view>
					</view>
					<view class="uni-flex fen">
						利润:<text>{{Math.round(item.salePrice*100-item.costPrice*100)/100}}</text>元
					</view>
				</view>
			</view>
		</view>

		<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
		<backTop :src="backTop.src" :scrollTop="backTop.scrollTop"></backTop>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';

	import util from '../../../common/util.js';
	import loadMore from '@/components/uni-load-more.vue';
	import backTop from '@/components/uni-top.vue';
	var index;
	export default {
		components: {
			loadMore,
			backTop
		},
		data() {
			return {
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				item: {},
				showSlider: false,
				sliderIndex: 0,
				items: [{}, {}, {}],
				user: {},
				userid: 0,
				active: false,
				isDelShow: false,
				isFocus: false,
				sortNavfixed: false,
				show: false,
				windowHeight: 0,
				type: 0,
				cates: [{
					css: '',
					id: '0',
					no: '000',
					show: '0',
					subs: [],
					title: '全部'
				}],
				categorys: [{
					ico: '../../../static/merchant/all.png',
					id: '000',
					no: '000',
					title: '全部'
				}],
				category: {},
				products: [],
				product: {
					ratio: 0
				},
				productKey: 0,
				curIndex: 0,
				key: '',
				id: '000',
				clock: 0,
				scrollLeft: 0,
				backTop: {
					"src": "../../static/top.png",
					"scrollTop": 0
				}
			};
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
		},
		onLoad(e) {
			index = 1;
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '../login/login',
				});
			} else {
				this.windowHeight = uni.getSystemInfoSync().windowHeight;
				this.user = JSON.parse(this.jyyUser);
				this.getCategory();
				this.getData();
				if (e.n > 4) {
					setTimeout(() => {
						this.public(e.n, e);
					}, 200);
				}
			}
		},
		onPageScroll(e) {
			this.backTop.scrollTop = e.scrollTop;
			util.loads(this.products, 'list', this.windowHeight);
			uni.createSelectorQuery()
				.selectAll('#list')
				.boundingClientRect(datas => {
					this.sortNavfixed = parseInt(datas[0].top) < 78 ? true : false;
				})
				.exec();
		},
		onPullDownRefresh() {
			this.getData();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			this.getData();
		},
		methods: {
			setKey(e) {
				this.sliderIndex = e;
			},
			hidesliderPopup() {
				this.showSlider = false;
			},
			set(productId, ratio, share) {
				uni.request({
					url: this.webUrl + 'SetUserRatio',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						userid: this.user.id,
						setid: this.userid,
						productId: productId,
						price: share,
						ratio: ratio.toFixed(2)
					},
					success: res => {
						uni.showLoading({
							title: res.data.result.resultInfo,
							icon: "none"
						});
						setTimeout(function() {
							uni.hideLoading();
						}, 500);
					},
					fail: () => {
						mescroll.endErr();
					},
					complete: () => {}
				});
			},
			sliderChange(e) {
				let index;
				// #ifndef H5
				index = e.currentTarget.id;
				// #endif
				// #ifdef H5
				index = this.sliderIndex;
				// #endif
				this.products[index].share = parseInt((this.products[index].salePrice - this.products[index].costPrice) * e.detail.value /
					100);
				this.set(this.products[index].id, e.detail.value / 100, this.products[index].share);
			},
			focus() {
				this.active = true;
				//HM修改 增加获取焦点判断
				if (this.key != '') {
					this.isDelShow = true;
				}
			},
			inputChange(event) {
				var keyword = event.detail.value;
				this.$emit('input', keyword);
				if (this.key) {
					this.isDelShow = true;
				}
			},
			blur() {
				this.isFocus = false;
				if (!this.key) {
					this.active = false;
				}
			},
			clear() {
				//HM修改 收起键盘
				uni.hideKeyboard();
				this.isFocus = false;
				this.key = '';
				this.active = false;
				//HM修改 清空内容时候触发组件input
				this.isDelShow = false;
			},
			search() {
				index = 1;
				this.loadingType = 0;
				this.products = [];
				this.getData();
			},
			getData() {
				if (this.loadingType !== 0) {
					return;
				}
				uni.request({
					url: this.webUrl + 'List',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						pageNum: index,
						id: this.id,
						userid: this.user.id,
						key: this.key,
						setid: this.userid
					},
					success: res => {
						if (res.data.result.ratioProducts.length > 0) {
							this.products = this.products.concat(res.data.result.ratioProducts);
							setTimeout(() => {
								util.loads(this.products, 'list', this.windowHeight);
							}, 500)
						} else {
							this.loadingType = 2;
							return;
						}
						if (index == parseInt(res.data.result.pages)) {
							this.loadingType = 2;
							return;
						} else {
							this.loadingType = 0;
						}
						index++;
					},
					fail: () => {},
					complete: () => {}
				});
			},
			getElSize(id) {
				//得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery()
						.select('#' + id)
						.fields({
								size: true,
								scrollOffset: true
							},
							data => {
								res(data);
							}
						)
						.exec();
				});
			},
			async public(i, e) {
				this.id = e.no;
				let index = i;
				let tabBars = await this.getElSize('tab-bars'),
					tabBarScrollLeft = tabBars.scrollLeft; //点击的时候记录并设置scrollLeft
				let width = 0;
				for (let j = 0; j < index; j++) {
					let result = await this.getElSize('tab' + this.categorys[j].id);
					width += result.width;
				}
				let winWidth = uni.getSystemInfoSync().windowWidth,
					nowElement = await this.getElSize('tab' + this.categorys[index].id),
					nowWidth = nowElement.width;
				if (width + nowWidth - tabBarScrollLeft > winWidth - nowWidth) {
					this.scrollLeft = width + nowWidth * 3 - winWidth;
				}

				if (width < tabBarScrollLeft) {
					this.scrollLeft = width;
				}
			},
			changeTab(i, e) {
				if (this.curIndex === i) {
					return false;
				} else {
					this.public(i, e);
					this.isClickChange = true;
					this.curIndex = i;
					index = 1;
					this.loadingType = 0;
					this.products = [];
					this.getData();
					setTimeout(() => {
						util.loads(this.products, 'list', this.windowHeight);
					}, 500)

				}
			},
			imageOnLoad(e) {
				e.loaded = true;
			},
			getCategory() {
				uni.request({
					url: this.webUrl + 'Categorys',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						this.cates = this.cates.concat(res.data.result.uniClassifys);
						this.categorys = this.categorys.concat(res.data.result.categorys);
					},
					fail: () => {},
					complete: () => {}
				});
			},
			goAgentPriduct: function(e) {
				uni.navigateTo({
					url: 'product?id=' + e.id
				});
			}
		}
	};
</script>

<style>
	.tab-search {
		position: fixed;
		width: 100%;
		z-index: 9999;
	}

	.jz_myfit.jz_lists scroll-view.uni-swiper-tab {
		margin-bottom: 0;
	}
	.jz_myfit .myfit-product .product-img{
		width: 180upx;
		height: 180upx;
		margin-right: 20upx;
		margin-top: 17.5upx;
	}
	.jz_myfit .myfit-product image{
		width: 180upx;
		height: 180upx;
		border-radius: 20upx;
	}


	/* #ifdef H5 */
	.myfit-slider input {
		display: block;
		text-align: center;
		width: 200upx;
		background: #dd0101;
		color: #FFFFFF;
		border-radius: 30upx;
		font-size: 26upx;
	}

	.myfit-slider>view:last-child {
		margin-right: 10upx;
	}

	/* #endif */


	slider {
		display: inline;
		margin-left: 0;
		margin-right: 0;
	}

	.jz_agent.jz_myfit .agent-product {
		margin-top: 280upx;
	}

	.jz_myfit .myfit-product {
		padding: 10upx;
	}
	
	.jz_myfit .product-contents{
		padding: 25upx 0;
		width: auto!important;
		margin-left: 0!important;
	}

	.fixed {
		width: 100%;
		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef H5 */
		/* top: 84upx; */
		top: 44px;
		/* #endif */
		background: #ffffff;
		margin: 0 !import;
		z-index: 999;
		box-sizing: border-box;
		border-bottom: 2upx solid #eeeeee;
		transform: translateZ(0);
		-webkit-transform: translateZ(0);
	}

	.activeLine {
		border-bottom: 2upx solid #ff273c;
	}

	.jz_lists {
		position: relative;
	}


	.jz_lists scroll-view.uni-swiper-tab {
		border-bottom: 0;
		height: auto;
		line-height: auto;
		padding-top: 20upx;
	}

	.jz_lists .productTitle-item {
		justify-content: center;
		align-items: center;
	}

	.jz_lists .productTitle-item .picname {
		line-height: 60upx;
	}

	.jz_lists .productTitle-item image {
		width: 50upx;
		height: 50upx;
	}

	.lists .sortNav .Nav:first-child {
		/* border-left: none; */
	}

	.list .tab-bar-wrap {
		width: 200upx;
	}

	::-webkit-scrollbar {
		display: none;
	}

	.lists .nav-left {
		width: 218upx;
		border-right: solid 1upx #e0e0e0;
		padding-top: 20upx;
		box-sizing: border-box;
	}

	.lists .nav-left .nav-left-title {
		height: 80upx;
		font-weight: 600;
		margin: 0 auto;
		margin-left: 10upx;
	}

	.lists .nav-left-item {
		height: 110upx;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.lists .nav-left-item image {
		width: 40upx;
		height: 40upx;
		margin-right: 18upx;
	}

	.lists .nav-right {
		width: 100%;
		box-sizing: border-box;
	}

	.uni-tab-bar-loading {
		width: 100%;
	}

	.uni-tab-bar-loading .loading-text {
		margin-top: 50upx;
		font-size: 28upx;
		text-align: center;
	}

	.lists .list {
		width: 100%;
		height: 92%;
	}


	#tab-bar {
		background-color: #ffffff;
		padding-bottom: 60upx;
		overflow: hidden;
	}

	.uni-tab-bar .active {
		color: #ffe200;
		/* border-left: 10upx solid #ffe200; */
	}


	.prices .prices-cart image {
		width: 52upx;
		height: 50upx;
		margin-right: 10upx;
	}

	.prices .prices-salePrice {
		font-size: 22upx;
		color: #f00000;
	}


	.image {
		position: absolute;
		width: 100%;
		height: 100%;
	}


	.list-collapse {
		padding-left: 36upx;
		box-sizing: border-box;
	}


	.lists .sortNav .navActive {
		color: #d80000;
	}
</style>
