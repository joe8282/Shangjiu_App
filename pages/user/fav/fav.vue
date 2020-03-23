<template>
	<view class="uni-tab-bar">
		<view class="uni-product-list favList">
			<scroll-view scroll-y="false" class="scroll-Y" @scrolltolower="loadMore()">
				<view class="uni-product uni-flex" v-for="(item,index) in newsitems[0].data" :key="index">
					<view class="image-view" @click="goProduct(item)">
						<image class="uni-product-image" :src="item.pic" />
					</view>
					<view class="uni-product-wrap uni-flex uni-column">
						<view class="uni-product-title">{{item.title}}</view>
						<view class="uni-flex uni-product-price uni-flex-item">
							<view class="uni-flex uni-flex-item uni-product-price-original">
								￥{{item.salePrice}}
							</view>
							<view class="uni-flex uni-flex-item uni-product-price-favour">
								￥{{item.marketPrice}}
							</view>
						</view>
					</view>
					<view class="delCollection-wrap uni-flex">
						<view class="delCollection" @click="fav(item,index)">取消收藏</view>
					</view>
				</view>

				<view class="uni-tab-bar-loading">
					<uni-load-more :loadingType="newsitems[0].loadingType" :contentText="loadingText"></uni-load-more>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	import favr from '../../../common/favr.js';
	import uniLoadMore from '@/components/uni-load-more.vue';
	export default {
		computed: {
			...mapState(['hasLogin', 'jyyUser', 'favs'])
		},
		components: {
			uniLoadMore
		},
		data() {
			return {
				loadingText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				user: {},
				newsitems: [{
					"loadingType": 0,
					"pageIndex": 1,
					"data": []
				}],
				show: true
			}
		},
		onLoad(e) {
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '../login/login',
				});
			} else {
				this.user = JSON.parse(this.jyyUser);
			}
		},
		onReady() {
			this.init();
		},
		methods: {
			...mapMutations(['setFavs']),
			init() {
				this.getData();
			},
			fav(e, index) {
				let id = e.favid
				uni.request({
					url: this.webUrl + 'Fav',
					method: 'POST',
					data: {
						id: id,
						mode: 1,
						userid: this.user.id,
						show: !this.show
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						uni.hideLoading();
						if (res.data.result.isSuccess) {
							this.setFavs(JSON.stringify(res.data.result.resultInfo2));
							uni.showToast({
								title: res.data.result.resultInfo,
								icon: "none"
							})
							this.newsitems[0].data.splice(index, 1)
						} else {
							uni.showModal({
								title: "系统提示",
								content: res.data.result.resultInfo,
								icon: "none"
							})
						}
					},
					fail: () => {},
					complete: () => {}
				});

			},
			goProduct(e) {
				console.log(e)
				uni.navigateTo({
					url: '../../merchant/product/product?id=' + e.favid 
				});
			},
			loadMore() {
				setTimeout(() => {
					this.addData();
				}, 1200);
			},
			addData() {
				this.getData();
			},
			getData() {
				if (this.newsitems[0].loadingType === 2) {
					return;
				}
				this.newsitems[0].loadingType = 1;
				uni.request({
					url: this.webUrl + 'Favs',
					method: 'POST',
					data: {
						pageIndex: this.newsitems[0].pageIndex,
						userid: this.user.id
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (res.data.result.uniFavs.length > 0) {
							this.newsitems[0].data = this.newsitems[0].data.concat(res.data.result.uniFavs);
						} else {
							this.newsitems[0].loadingType = 2;
							return;
						}
						if (this.newsitems[0].pageIndex == parseInt(res.data.result.pages)) {
							this.newsitems[0].loadingType = 2;
							return;
						} else {
							this.newsitems[0].loadingType = 0;
						}
						this.newsitems[0].pageIndex++;
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.favList {
		margin-top: 20upx;
	}

	.favList .uni-product-wrap {
		position: relative;
	}

	.delCollection-wrap {
		align-items: center;
		justify-content: center;
	}

	.delCollection-wrap .delCollection {
		width: 150upx;
		height: 55upx;
		line-height: 55upx;
		text-align: center;
		margin-right: 30upx;
		margin-bottom: 5upx;
		display: inline-block;
		background: #fc6f05;
		color: #fff;
		border-radius: 60upx;
		font-size: 24upx;
	}

	.image-view {
		width: 160upx;
		height: 160upx;
		margin-left: 25upx;
		border-radius: 10upx;
	}

	.image-view .uni-product-image {
		width: 160upx;
		height: 160upx;
		border-radius: 10upx;
	}

	.uni-product-price-favour {
		margin-left: 0;
	}

	.uni-product-list {
		overflow-y: scroll;
	}


	.uni-product-wrap {
		flex: 1;
		margin-left: 30upx;
		align-content: space-around;
	}

	.uni-product-number-wrap {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.uni-product {
		width: 90%;
		margin: 2%;
		flex-direction: row;
		background: #FFFFFF;
		border-radius: 35upx;
	}

	.uni-product-number {
		margin-right: 0;
	}

	.sellgroup {
		width: 150upx;
		height: 55upx;
		line-height: 55upx;
		text-align: center;
		margin-right: 10upx;
		margin-bottom: 5upx;
		display: inline-block;
		background: #fc6f05;
		color: #fff;
		border-radius: 60upx;
		font-size: 24upx;
	}

	.uni-product-price-original {
		margin-top: 10upx;
	}

	.uni-product-price-favour {
		margin-top: 10upx;
	}

	.uni-tab-bar-container {
		width: calc(100% - 20upx);
		overflow: hidden;
		margin-left: 10upx;
	}

	::-webkit-scrollbar {
		/*隐藏滚轮*/
		display: none;
	}

	.uni-product-price {
		flex-direction: column;
	}

	.uni-tab-bar-loading {
		margin: 0 auto;
	}
</style>
