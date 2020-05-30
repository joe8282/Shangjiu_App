<template>
	<view class="content" id="app">
		<view class="text-area">
			<view class="main-header-wrap">
				<!-- 				<view class="uni-form-item uni-column">
					<img src="static/images/search.png" alt="" class="search-icon-img" />
					<input class="uni-input" placeholder="      输入商号相关信息" />
				</view>
				<img src="static/images/news.png" alt="" class="main-header-news-icon" /> -->
				<uni-nav-bar :fixed="false" color="#fff" background-color="#B22420" right-icon="chat" @clickLeft="showCity"
				 @clickRight="scan">
					<block slot="left">
						<view class="city">
							<view><text class="uni-nav-bar-text">{{ city }}</text></view>
							<uni-icons type="arrowdown" color="#fff" size="22" />
						</view>
					</block>
					<view class="input-view">
						<uni-icons class="input-uni-icon" type="search" size="22" color="#666666" />
						<input confirm-type="search" class="nav-bar-input" type="text" placeholder="输入搜索关键词" @confirm="confirm">
					</view>
				</uni-nav-bar>
			</view>
			<view class="swiper-wrap">
				<swiper class="swiper" circular :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500">
					<swiper-item v-for="(item,index) in pictureList" :key="index">
						<view class="swiper-item"><img :src="item.Pic" mode="widthFix" alt="" /></view>
					</swiper-item>
				</swiper>
			</view>
			<view class="productList-slider-wrap">
				<view class="productList-slider-three">
					<view class="productList-ssthree" @click="toAll">
						<img src="static/images/all1.png" alt="" />
						<span>全部</span>
					</view>
					<view class="productList-ssthree" @click="toFree">
						<img src="static/images/all2.png" alt="" />
						<span>免费</span>
					</view>
					<view class="productList-ssthree" @click="toPay">
						<img src="static/images/all3.png" alt="" />
						<span>付费</span>
					</view>
					<view class="productList-ssthree" @click="toReward">
						<img src="static/images/all4.png" alt="" />
						<span>红包</span>
					</view>
				</view>
				<view class="productList-slider-toggle">
					<picker @change="bindChannelChange" class="type-select" :value="indexChannel" :range="arrayChannel" range-key="Name">
						<view class="uni-input">{{arrayChannel[indexChannel].Name}}
							<uni-icons type="arrowdown" size="20"></uni-icons>
						</view>
					</picker>
					<picker @change="bindTypeChange" class="type-select" :value="indexType" :range="arrayType" range-key="Name">
						<view class="uni-input">{{arrayType[indexType].Name}}
							<uni-icons type="arrowdown" size="20"></uni-icons>
						</view>
					</picker>
					<picker @change="bindClassChange" class="type-select" :value="indexClass" :range="arrayClass" range-key="Name">
						<view class="uni-input">{{arrayClass[indexClass].Name}}
							<uni-icons type="arrowdown" size="20"></uni-icons>
						</view>
					</picker>
					<picker @change="bindSortFieldChange" class="type-select" :value="indexSortField" :range="arraySortField"
					 range-key="Name">
						<view class="uni-input">{{arraySortField[indexClass].Name}}
							<uni-icons type="arrowdown" size="20"></uni-icons>
						</view>
					</picker>
				</view>
			</view>
			<view class="productlist-hh-wrap">
				<view class="productlist-hh-list" v-for="(item,index) in shopList" :key="index">
					<navigator :url="'../shopdetail/shopdetail?id=' + item.Id" class="list_content">
						<view class="small-tab">
							<view class="main-tab-nr">
								<view class="main-tab-right">
									<span class="main-tab-r-title">{{ item.ShopTitle }}</span>
									<label class="main-tab-r-ddd">{{ item.ShopRemark }}</label>
									<ul class="main-four-ul">
										<li>{{ item.ChannelName }}</li>
										<li>{{ item.TypeName }}</li>
										<li>{{ item.ClassName }}</li>
										<li>{{ item.City }}{{ item.Area }}</li>
										<span class="dysf-style" id="joinway">{{ item.JoinWay }}</span>
									</ul>
								</view>
								<img :src="item.ShopPic" alt="" class="main-tab-img" />
							</view>
						</view>
					</navigator>
				</view>
				<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
			</view>
		</view>


	</view>

</template>

<script>
	// import 'pages/shopList/shopList.css';
	// import uniSection from '@/components/uni-section/uni-section.vue';
	// import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue";
	// import uniFav from "@/components/uni-fav/uni-fav.vue"
	// import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
	// import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		components: {
			uniIcons,
			uniNavBar
			// uniFav,
			// uniSection,
			// uniSwiperDot,
			// msDropdownMenu,
			// msDropdownItem,
		},
		data() {
			return {
				city: '全国',
				arrayChannel: [{
					Id: '',
					Name: '身份'
				}],
				arrayType: [{
					Id: '',
					Name: '类型'
				}],
				arrayClass: [{
					Id: '',
					Name: '行业'
				}],
				arraySortField: [{
					Id: 'Sort',
					Name: '排序'
				}, {
					Id: 'CreateTime',
					Name: '最新时间'
				}, {
					Id: 'ClickNum',
					Name: '浏览次数'
				}, {
					Id: 'CollectionNum',
					Name: '关注数量'
				}, {
					Id: 'MemberNum',
					Name: '成员数量'
				}],
				indexChannel: 0,
				indexType: 0,
				indexClass: 0,
				indexSortField: 0,

				pictureList: [],
				shopList: [],

				TypeId: '',
				ClassId: '',
				ChannelId: '',
				JoinWay: '',
				HasReward: '',
				SortField: 'Sort',

				refreshing: false,
				lists: [],
				listsNum: 0,
				fetchPageNum: 1,
				loadMoreText: "加载中...",
				showLoadMore: false,
				max: 0

			}
		},
		onLoad() {
			this.getPicture();
			this.getTypeData();
			this.initData();
		},
		onUnload() {
			this.max = 0,
				this.lists = [],
				this.loadMoreText = "加载更多",
				this.showLoadMore = false;
		},
		onPullDownRefresh() {
			console.log('下拉刷新');
			this.refreshing = true;
			this.initData();
		},
		onReachBottom() {
			console.log("onReachBottom");
			if (this.max > this.listsNum) {
				this.loadMoreText = "没有更多数据了!"
				return;
			}
			this.showLoadMore = true;
			setTimeout(() => {
				this.initData();
			}, 1000);
		},
		methods: {
			showCity() {
				uni.showToast({
					title: '选择城市'
				})
			},
			scan() {
				// uni.showToast({
				// 	title: '扫码'
				// })
			},
			confirm() {
				uni.showToast({
					title: '搜索'
				})
			},
			bindChannelChange: function(e) {
				//console.log('picker发送选择改变，携带值为：' +  this.arrayChannel[e.target.value].Id)
				this.indexChannel = e.target.value
				this.ChannelId = this.arrayChannel[e.target.value].Id
				this.refreshing = false;
				this.fetchPageNum = 1;
				this.shopList = [];
				this.initData();
			},
			bindTypeChange: function(e) {
				//console.log('picker发送选择改变，携带值为：' +  this.arrayType[e.target.value].Id)
				this.indexType = e.target.value
				this.TypeId = this.arrayType[e.target.value].Id
				this.refreshing = false;
				this.fetchPageNum = 1;
				this.shopList = [];
				this.initData();
			},
			bindClassChange: function(e) {
				//console.log('picker发送选择改变，携带值为：' +  this.arrayClass[e.target.value].Id)
				this.indexClass = e.target.value
				this.ClassId = this.arrayClass[e.target.value].Id
				this.refreshing = false;
				this.fetchPageNum = 1;
				this.shopList = [];
				this.initData();
			},
			bindSortFieldChange: function(e) {
				//console.log('picker发送选择改变，携带值为：' +  this.arraySortField[e.target.value].Id)
				this.indexSortField = e.target.value
				this.SortField = this.arraySortField[e.target.value].Id
				this.refreshing = false;
				this.fetchPageNum = 1;
				this.shopList = [];
				this.initData();
			},
			toAll() {
				this.Changeld = '',
					this.Typeld = '',
					this.Classld = '',
					this.SortFieldld = 'Sort',
					this.JoinWay = '',
					this.HasReward = '',
					this.refreshing = false;
				this.fetchPageNum = 1;
				this.shopList = [];
				this.initData();
			},
			toFree() {
				this.Changeld = '',
					this.Typeld = '',
					this.Classld = '',
					this.SortFieldld = 'Sort',
					this.JoinWay = '1',
					this.HasReward = '',
					this.refreshing = false;
				this.fetchPageNum = 1;
				this.shopList = [];
				this.initData();
			},
			toPay() {
				this.Changeld = '',
					this.Typeld = '',
					this.Classld = '',
					this.SortFieldld = 'Sort',
					this.JoinWay = '3',
					this.HasReward = '',
					this.refreshing = false;
				this.fetchPageNum = 1;
				this.shopList = [];
				this.initData();
			},
			toReward() {
				this.Changeld = '',
					this.Typeld = '',
					this.Classld = '',
					this.SortFieldld = 'Sort',
					this.JoinWay = '',
					this.HasReward = '1',
					this.refreshing = false;
				this.fetchPageNum = 1;
				this.shopList = [];
				this.initData();
			},
			getPicture() {
				uni.request({
					url: this.$serverUrl + '/OtherManage/Dev_Picture/GetDataList?PictureType=商号Banner',
					success: (ret) => {
						console.log(ret)
						if (ret.statusCode !== 200) {
							console.log('请求失败:', ret)
						} else {
							let list = [],
								data = ret.data.rows;
							for (let i = 0, length = data.length; i < length; i++) {
								var item = data[i];
								list.push(item);
							}
							this.pictureList = list;
						}
					}
				});
			},
			getTypeData() {
				uni.request({
					url: this.$serverUrl + '/SystemManage/Dev_Type/GetDataList_NoPagin?parentId=1206262951519064064',
					success: (res) => {
						for (var i = 0; i < res.data.length; i++) {
							this.arrayChannel.push({
								Id: res.data[i].Id,
								Name: res.data[i].Name
							})

						}
					}
				});

				uni.request({
					url: this.$serverUrl + '/SystemManage/Dev_Type/GetDataList_NoPagin?parentId=1204236610573570048',
					success: (res) => {
						for (var i = 0; i < res.data.length; i++) {
							this.arrayClass.push({
								Id: res.data[i].Id,
								Name: res.data[i].Name
							})
						}
					}
				});
				uni.request({
					url: this.$serverUrl + '/SystemManage/Dev_Type/GetDataList_NoPagin?parentId=1204236075598483456',
					success: (res) => {
						for (var i = 0; i < res.data.length; i++) {
							this.arrayType.push({
								Id: res.data[i].Id,
								Name: res.data[i].Name
							})
						}
					}
				});
			},
			initData() {
				uni.request({
					url: this.$serverUrl + '/Shop/Dev_Shop/GetDataList?TypeId=' + this.TypeId + '&ClassId=' + this.ClassId +
						'&ChannelId=' + this.ChannelId + '&JoinWay=' + this.JoinWay + '&HasReward=' + this.HasReward + '&SortField=' +
						this.SortField + '&SortType=desc&pageNumber=' + (this.refreshing ? 1 : this.fetchPageNum) +
						'&pageSize=10',
					success: (ret) => {
						console.log(ret)
						if (ret.statusCode !== 200) {
							console.log('请求失败:', ret)
						} else {
							if (this.refreshing && ret.data[0].id === this.lists[0].id) {
								uni.showToast({
									title: '已经最新',
									icon: 'none',
								});
								this.refreshing = false;
								uni.stopPullDownRefresh();
								return;
							}
							let list = [],
								data = ret.data.rows;
							for (let i = 0, length = data.length; i < length; i++) {
								if (ret.data.rows[i].JoinWay == 1) {
									data[i].JoinWay = '开放加入'
								} else if (ret.data.rows[i].JoinWay == 2) {
									data[i].JoinWay = '审核加入'
								} else if (ret.data.rows[i].JoinWay == 3) {
									data[i].JoinWay = '付费加入'
								}
								var item = data[i];
								list.push(item);
							}
							console.log('得到list', list);
							this.max += 10;
							this.listsNum = ret.data.records;
							if (this.refreshing) {
								this.refreshing = false;
								uni.stopPullDownRefresh()
								this.shopList = list;
								this.fetchPageNum = 2;
							} else {
								this.shopList = this.shopList.concat(list);
								this.fetchPageNum += 1;
							}
						}
					}
				});
			}

		}
	}
</script>
<style lang="scss">
	.city {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: flex-start;
		/* width: 160rpx;
	*/
		margin-left: 4px;
	}

	.input-view {
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		/* width: 500rpx;
	*/
		flex: 1;
		background-color: #f8f8f8;
		height: 30px;
		border-radius: 15px;
		padding: 0 15px;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}

	.input-uni-icon {
		line-height: 30px;
	}

	.nav-bar-input {
		height: 30px;
		line-height: 30px;
		/* #ifdef APP-PLUS-NVUE */
		width: 370rpx;
		/* #endif */
		padding: 0 5px;
		font-size: 28rpx;
		background-color: #f8f8f8;
	}

	// css start
	* {
		margin: 0;
		padding: 0;
		touch-action: pan-y;
	}

	body {
		// background-color: #F6F6F6;
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
		// width: 100%;
		// height: 40px;
		// display: flex;
		// justify-content: center;
		// background: url(/static/images/index-header-bg.png) no-repeat center;
		// background-size: 100%;
		// position: relative;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		height: 40px;
	}

	.main-header-news-icon {
		position: absolute;
		right: 12px;
		height: 24px;
		top: 8px;
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

	.swiper {
		height: 300rpx;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
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
		float: right;
	}

	.main-tab-r-title {
		display: inline-block;
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		float: left;
		font-size: 14px;
		line-height: 25px;
	}

	.main-tab-img {
		float: left !important;
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
		padding-bottom: 200rpx;
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

	.productList-slider-toggle {
		float: left;
		width: 100%;
		height: 80rpx;
		margin-top: 40rpx;
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
	}

	.productList-slider-toggle .type-select {
		float: left;
		width: 25%;
		font-size: 30rpx;
		text-align: center;
	}

	// css end
</style>
