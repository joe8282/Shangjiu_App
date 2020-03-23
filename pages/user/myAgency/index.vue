<template>
	<view class="uni-flex lists jz_lists uni-column jz_myfit jz_agent cart jz_cart ">
		<view class="tab-search uni-column" style="background-color: #F1F1F1;">
			<view class="tabList">
				<scroll-view class="uni-flex uni-swiper-tab" scroll-x :scroll-left="scrollLeft" id="tab-bars">
					<view v-for="(tab, i) in categorys" :key="i" class="swiper-tab-list" :id="'tab' + tab.id" :data-current="index" @click="changeTab(i, tab)">
						<view class="productTitle-item uni-flex uni-column">
							<view :class="['picname', curIndex == i ? 'activeLine' : '']">{{ tab.title }}</view>
						</view>
					</view>
				</scroll-view>
			</view>

			<view class="search uni-flex ">
				<view class="uni-flex-item uni-flex search-input">
					<input
						placeholder="请选择地区"
						@input="inputChange"
						v-model="key"
						:focus="isFocus"
						@focus="focus"
						@blur="blur"
						class="uni-flex-item"
						disabled="disabled"
						@click="showMulLinkageThreePicker"
					/>
					<view class="icon icon-del uni-flex justify-align-center" style="height: 100%;" @click.stop="clear" v-if="isDelShow"><icon type="clear" size="12"></icon></view>
				</view>

				<view class="searchBtn uni-flex justify-align-center" @click="search">
					<image src="../../../static/search02.png"></image>
					<text>搜索</text>
				</view>
			</view>
		</view>

		<view class="agent-product uni-flex uni-column">
			<view class="agentTop uni-flex space-between" id="list">
				<view class="topItem uni-flex uni-column align-items " v-if="item.agency == 2" v-for="(item, key) in products" :key="key" @click.stop="selected(products, key)">
					<view class="uni-flex  topItem-wrap">
						<image
							class="image topImg"
							:class="{ lazy: !item.display }"
							:id="'lazy' + key"
							:data-index="0"
							@load="imageOnLoad(item, key)"
							:src="item.display ? item.pic : ''"
						/>
						<view class="loadbox" :class="{ loaded: item.loaded }"><view class="load"></view></view>
					</view>
					<view class=" uni-flex  uni-column">
						<view class="uni-flex agencyTitle justify-align-center" v-if="!item.show">{{ item.title }}</view>
						<view class=" agencyTitle titleSingle " v-if="item.show">{{ item.title }}</view>
						<view class="uni-flex justify-align-center" style="color: #f00000;" v-if="user.agency == 1">￥{{ item.salePrice.toFixed(2) }}</view>
					</view>
					<view class="selectBtn uni-flex ">
						<image src="../../../static/select.png" v-if="!item.select"></image>
						<image src="../../../static/selectActive.png" v-if="item.select"></image>
					</view>
				</view>
			</view>
			<view class="agentBottom uni-flex space-between"></view>
		</view>
		<load-more :loadingType="loadingType" :contentText="contentText" class="loadMore"></load-more>
		<backTop :src="backTop.src" :scrollTop="backTop.scrollTop"></backTop>
		<mpvue-city-picker
			:themeColor="themeColor"
			ref="mpvueCityPicker"
			:pickerValueDefault="cityPickerValueDefault"
			@onCancel="onCancel"
			@onConfirm="onConfirm"
			@onReset="onReset"
		></mpvue-city-picker>
		<view class="uni-flex uni-row footer" v-if="products.length > 0&&isShow==true">
			<view class="uni-flex uni-flex-item ">
				<view class="uni-flex item-sel ">
					<view :class="[yuan, { bg: allSelect }]" @click="AllSelect()"><text v-if="allSelect" class="gou"></text></view>
				</view>
				<view class="uni-flex uni-flex-item itemAll">全选</view>
				<view class="uni-flex uni-flex-item3"></view>
				<view class="uni-flex uni-flex-item3 justify-align-center">
					<view class="uni-flex uni-flex-item btn" @click="js()" :class="{ activeBg: bgChange }">加入购物车({{ allNum }})</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue';
import util from '../../../common/util.js';
import address from '../../../common/getAddessId.js';
import amap from '../../../common/amap-wx.js';
import loadMore from '@/components/uni-load-more.vue';
import backTop from '@/components/uni-top.vue';
import cart from '../../../common/cart.js';

var index;
export default {
	computed: {
		...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
	},
	components: {
		loadMore,
		backTop,
		mpvueCityPicker
	},
	data() {
		return {
			isShow: false,
			newProducts: [],
			allNum: 0,
			filterCount: 0,
			allSelect: false,
			bgChange: false,
			cityPickerValueDefault: [0, 0, 1],
			themeColor: '#007AFF',
			pickerText: '',
			amapPlugin: null,
			amapKey: '408ca849e7fb38410487446db08ec898',
			addressName: '',
			backTop: {
				src: '../../../static/top.png',
				scrollTop: 0
			},
			loadingType: 0,
			contentText: {
				contentdown: '上拉显示更多',
				contentrefresh: '正在加载...',
				contentnomore: '没有更多数据了'
			},
			active: false,
			isDelShow: false,
			isFocus: false,
			sortNavfixed: false,
			show: false,
			windowHeight: 0,
			type: 0,
			cates: [
				{
					css: '',
					id: '0',
					no: '000',
					show: '0',
					subs: [],
					title: '全部品牌'
				}
			],
			categorys: [
				{
					ico: '../../../static/merchant/all.png',
					id: '000',
					no: '000',
					title: '全部品牌'
				}
			],
			category: {},
			products: [],
			curIndex: 0,
			key: '',
			id: '000',
			scrollLeft: 0,
			scrollY: 0,
			agentStatus: 1,
			user: {},
			addressId: '',
			popupType: '',
			popupContent: '',
			popupShow: false
		};
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
	onShow() {},
	onLoad(e) {
		this.user = JSON.parse(this.jyyUser);
		index = 1;
		this.windowHeight = uni.getSystemInfoSync().windowHeight;
		this.getCategory();
		if (e.n > 4) {
			setTimeout(() => {
				this.public(e.n, e);
			}, 200);
		}
		// #ifdef MP-WEIXIN
		this.amapPlugin = new amap.AMapWX({
			key: this.amapKey
		});
		this.getRegeo();
		// #endif
		// #ifdef H5
		uni.getLocation({
			type: 'wgs84',
			geocode: true,
			success: res => {
				let gitude = res.longitude + ',' + res.latitude;
				let that = this;
				uni.request({
					url: 'https://restapi.amap.com/v3/geocode/regeo',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					data: {
						output: 'JSON',
						location: gitude,
						key: 'bf5fad85b6706db59ac208af908aa99e'
					},
					success: result => {
						let addresss = result.data.regeocode.addressComponent;
						console.log(address);
						let province = addresss.province;
						let city = addresss.city;
						let district = addresss.district;
						that.addressName = province + '-' + city + '-' + district;
						that.addressId = address.getAddressid(province, city, district);
						that.key = that.addressName;
						that.getData();
					},
					fail: () => {},
					complete: () => {}
				});
			}
		});
		// #endif
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
	watch: {},
	methods: {
		...mapMutations(['setAgency']),
		//单选
		selected(e, index) {
			this.newProducts = [];
			let select = e[index].select;
			e[index].select = !select;
			this.$set(this.products[index], 'select', e[index].select);

			//判断商品是否全部选中，是的话，全选也选中
			let json = this.products.length;
			for (let j = 0; j < this.products.length; j++) {
				if (this.products[j].agency == 2) {
					this.newProducts.push(this.products[j]);
				}
			}
			let all = true;
			console.log(this.newProducts);
			for (let i = 0; i < this.newProducts.length; i++) {
				all *= this.newProducts[i].select;
			}
			if (all == true) {
				this.allSelect = true;
			} else {
				this.allSelect = false;
			}
			this.allSl();
		},
		// 全选
		AllSelect() {
			let selected = this.allSelect;
			this.allSelect = !selected;
			let arr = this.products;
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].agency == 2) {
					//循环商品为选中
					if (this.allSelect == true) {
						this.products[i].select = true;
					}
					if (this.allSelect == false) {
						this.products[i].select = false;
					}
				}
			}
			this.allSl(); //商品数量
		},
		//结算商品数量
		allSl() {
			let js = 0;
			let arr = this.products;
			for (let i = 0; i < arr.length; i++) {
				js += this.products[i].select;
			}
			this.allNum = js;
			if (this.allNum > 0) {
				this.bgChange = true;
			} else {
				this.bgChange = false;
			}
		},
		// 结算
		js() {
			let idStr = '';
			for (let i = 0; i < this.products.length; i++) {
				if (this.products[i].select) {
					idStr += this.products[i].id + ',';
				}
			}
			let str = idStr.slice(0, idStr.length - 1);
			if (str == '') {
				uni.showToast({
					title: '请选择商品！',
					icon: 'none'
				});
				return;
			}
			uni.showLoading({
				title: '操作中'
			});

			uni.request({
				url: this.webUrl + 'FlashCart',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {
					userId: this.user.id,
					id: str
				},
				success: res => {
					uni.hideLoading();
					if (res.data.result.length > 0) {
						cart.addCart(res.data.result);
						//cart.updateCart();
						uni.switchTab({
							url: '../cart/cart'
						});
					} else {
						uni.showToast({
							title: '操作失败',
							icon: 'none'
						});
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		onConfirm(e) {
			this.pickerText = e.label;
			this.key = this.pickerText;
			this.addressId = e.id;
		},
		getRegeo() {
			uni.showLoading({
				title: '获取信息中'
			});
			this.amapPlugin.getRegeo({
				success: data => {
					let province = data[0].regeocodeData.addressComponent.province;
					let city = data[0].regeocodeData.addressComponent.city;
					let district = data[0].regeocodeData.addressComponent.district;
					this.addressName = province + '-' + city + '-' + district;
					this.addressId = address.getAddressid(province, city, district);
					this.key = this.addressName;
					this.getData();
					uni.hideLoading();
				}
			});
		},
		showMulLinkageThreePicker() {
			this.$refs.mpvueCityPicker.show();
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
			this.allNum = 0;
			this.allSelect = false;
			this.bgChange = false;
			this.products = [];
			this.getData();
		},
		onCancel(e) {
			//console.log(e)
		},
		onReset() {
			this.pickerText = '';
			this.key = '';
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
					brand: this.id,
					area: this.key,
					userid: this.user.id,
					pageSize: 100,
					agentStatus: 1,
					agency: this.user.agency
				},
				success: res => {
					if (res.data.result.ratioProducts.length > 0) {
						this.products = this.products.concat(res.data.result.ratioProducts);
						for (let i = 0; i < this.products.length; i++) {
							if (this.products[i].agency == 2) {
								this.isShow = true;
								break
							}else{
								this.isShow = false;
							}
						}
						setTimeout(() => {
							util.loads(this.products, 'list', this.windowHeight);
						}, 500);
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
					.fields(
						{
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
			this.id = e.id;
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
				this.allNum = 0;
				this.allSelect = false;
				this.bgChange = false;
				this.getData();
				setTimeout(() => {
					util.loads(this.products, 'list', this.windowHeight);
				}, 500);
			}
		},
		imageOnLoad(e) {
			e.loaded = true;
		},
		getCategory() {
			uni.request({
				url: this.webUrl + 'Brands',
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					this.cates = this.cates.concat(res.data.result.brands);
					this.categorys = this.categorys.concat(res.data.result.brands);
				},
				fail: () => {},
				complete: () => {}
			});
		}
	}
};
</script>

<style>
/*----- 改动的 */
/* #ifdef H5 */
.jz_cart .footer{
	bottom: 0!important;
}
/* #endif */
.activeBg {
	background: #dd0101 !important;
}

.jz_cart.jz_agent .btn {
	border-radius: 6rpx;
	background: #cdcdcd;
	letter-spacing: 4rpx;
}

.jz_agent .center {
	width: 100%;
}

.jz_agent .selectContent {
	padding: 0 20upx;
}

.jz_agent .selectBtn {
	position: absolute;
	right: 0upx;
	bottom: 0upx;
}

.jz_agent .selectBtn image {
	width: 40upx;
	height: 40upx;
}

.jz_agent .agencyStatus {
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -50upx;
	margin-top: -50upx;
	width: 100upx;
	height: 100upx;
	background: rgba(0, 0, 0, 0.4);
	z-index: 888;
	border-radius: 50%;
	color: #ffffff;
}

.jz_agent .loadMore {
	margin-bottom: 100upx;
}

.jz_agent .agent-product .agentTop .topItem {
	position: relative;
	padding-bottom: 40upx;
	border-radius: 8upx;
	box-shadow: 0 0 10rpx 0 #b2b2b2;
	margin-bottom: 30upx;
}

.jz_agent .beginCard_btn {
	position: fixed;
	left: 0;
	bottom: 20upx;
	width: 100%;
	z-index: 999;
}

.jz_agent .beginCard_btn button {
	display: block;
	width: 550upx;
	height: 115upx;
	line-height: 115rpx;
	font-size: 28rpx;
	background: url(../../../static/btn.png) no-repeat;
	background-size: 550upx 115upx;
	color: #ffffff;
}

.jz_agent .checkStyle {
	position: absolute;
	top: 0upx;
	left: -16upx;
	width: 0;
	height: 0;
	z-index: 100;
	border-top: 50upx solid #11c200;
	border-right: 50upx solid transparent;
}

.jz_agent .checkStyleActick {
	position: absolute;
	top: 0upx;
	left: -16upx;
	width: 0;
	height: 0;
	z-index: 100;
	border-top: 50upx solid #ff0000;
	border-right: 50upx solid transparent;
}

.jz_agent .topItem {
	position: relative;
	z-index: 666;
	overflow: hidden;
}

.jz_agent .swiper-tab-list {
	width: 170upx !important;
}

.jz_lists scroll-view.uni-swiper-tab {
	padding-top: 0upx !important;
}

.jz_myfit.jz_lists scroll-view.uni-swiper-tab {
	padding-top: 0upx !important;
	margin-bottom: 0upx !important;
	padding-bottom: 0upx;
}

.jz_agent .agencyBtn {
	color: #09bb07;
	background: #11c200 !important;
	padding: 0 10upx;
}

.jz_agent .agent-product {
	margin-top: 235upx !important;
}

/* ------改动的 */

.jz_agent .agencyTitle.titleSingle {
	margin: 0 auto;
	width: 210upx;
	font-size: 26upx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	text-align: center;
}

.jz_agent .topItem-wrap {
	width: 224upx;
	height: 224upx;
	position: relative;
}

.jz_agent .agencyTitle {
	width: 224upx;
	overflow: hidden;
	white-space: nowrap;
}

.jz_agent .search-input .icon-del.icon {
	width: 50upx;
	top: 0;
}

.jz_myfit .loadbox {
	border-top-left-radius: 20upx;
	border-top-right-radius: 20upx;
}

.tab-search {
	position: fixed;
	width: 100%;
	z-index: 8888;
}

.jz_myfit.jz_lists scroll-view.uni-swiper-tab {
	margin-bottom: 0;
}

.jz_agent .agent-product {
	margin-top: 320upx;
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

.placeholder {
	background: #e2e2e2 url(../../../static/load.gif) center center no-repeat;
	opacity: 1;
	transition: opacity 0.4s linear;
}

.placeholder.loaded {
	opacity: 0;
}

.list-collapse {
	padding-left: 36upx;
	box-sizing: border-box;
}

.lists .sortNav .navActive {
	color: #d80000;
}

.uni-filter {
	margin-top: 8upx;
	background-color: #ffffff;
	padding: 16upx 24upx;
	font-size: 28upx;
	justify-content: space-between;
	position: relative;
}

.uni-filter .uni-filter-item {
	background-color: #f1f1f1;
	padding: 8upx 0;
	border-radius: 4upx;
	width: 24%;
	height: 32upx;
	justify-content: center;
	align-items: center;
	position: relative;
}

.uni-filter .uni-filter-sel {
	background-color: #c50200;
	color: #ffffff;
}

/* .uni-filter .uni-filter-line {
	position: absolute;
	height: 4upx;
	background: #f1f1f1;
	top: 50%;
	left: 0;
	margin-top: -2upx;
	width: 100%;
} */

.jz_agent .search {
	margin-top: 8upx;
}
</style>
