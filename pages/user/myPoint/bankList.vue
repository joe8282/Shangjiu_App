<template>
	<view class="uni-flex uni-column address jz_address">

		<view class="uni-flex addresslist uni-column" v-if="bankList.length>0">
			<view class="addressitem uni-flex space-between align-items" v-for="(item,key) in bankList" :key="key">
				<view class="itemleft uni-flex uni-column" style="width: 120upx; word-wrap:break-word;" @click="goOrder(item)">
					<view class="lefNick" v-if="item.defaultVal">{{item.realName}}</view>
					<view class="lefNick uni-flex align-items" v-if="!item.defaultVal">{{item.realName}}</view>
					<view v-if="item.defaultVal" class="leftBtn">默认</view>
				</view>
				<view class="itemcenter uni-flex uni-column" @click="goOrder(item)">
					<view class="centerPhone">{{item.bankNo}}</view>
					<view class="centerAddress">{{item.bankName}}</view>
				</view>
				<view class="itemright uni-flex  justify-align-center">
					<view class="uni-flex uni-column">
						<text @click="goService(item)" class="uni-h5">编辑</text>
						<text @click="del(item,key)" class="uni-h5">删除</text>
					</view>
					<view class="itemRt uni-flex justify-align-center" style="margin-left: 10upx;" v-if="url=='../order/order'" @click="goOrder(item)">
						<uni-icon type="arrowright" size="20" color="#999999"></uni-icon>
					</view>
				</view>
			</view>

			<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
			<view @click="newService()" class="addBtn-wrap uni-flex justify-align-center" v-if="bankList.length>0">
				<view class="addBtn uni-flex justify-align-center">新建银行信息</view>
			</view>
		</view>
		<view class="uni-lists uni-flex justify-align-center uni-column" v-if="bankList.length==0">
			<view class="addressImg uni-flex justify-align-center">
				<image src="../../../static/address/08.png"></image>
			</view>
			<view class="noaddressTitle">1个银行信息也没有,</view>
			<view class="noaddressTitle">快去添加吧</view>
			<view @click="add()" class="addBtn-wrap uni-flex justify-align-center" v-if="bankList.length==0">
				<view class="addBtn uni-flex justify-align-center">新建银行信息</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	import loadMore from '@/components/uni-load-more.vue';
	import uniIcon from '../../../components/uni-icon/uni-icon.vue';
	var index;
	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
		},
		data() {
			return {
				user: {},
				url: "",
				integral: '',
				bankList: [],
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				}
			};
		},
		onPullDownRefresh() {
			this.init();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShow() {
			this.init();
		},
		onLoad(e) {
			this.url = e.url;
			this.integral = e.integral;
			this.init();
		},
		methods: {
			init() {
				index = 1;
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '../login/login',
					});
				} else {
					this.user = JSON.parse(this.jyyUser);
					this.getData();
				}
			},
			goOrder: function(e) {
				if (this.url == undefined || this.url == "undefined") {
					return false;
				} else {
					uni.redirectTo({
						url: "cashOut?addressId=" + e.id + '&integral=' + this.integral
					})
				}
			},
			add() {
				uni.redirectTo({
					url: "bindBank?url=cashOut" + '&integral=' + this.integral
				})
			},
			del(e, key) {
				uni.showModal({
					content: '确认删除？',
					success: (res) => {
						if (res.confirm) {
							uni.showLoading({
								title: "操作中"
							})
							uni.request({
								url: this.webUrl + 'DelBank',
								method: 'POST',
								data: {
									id: e.id,
									userid: this.user.id
								},
								header: {
									'content-type': 'application/x-www-form-urlencoded'
								},
								success: res => {
									uni.hideLoading();
									uni.showToast({
										title: res.data.result.resultInfo,
										icon: "none"
									});
									e.isDeleted = true;
									this.bankList.splice(key, 1)
								},
								fail: () => {},
								complete: () => {}
							});
						}
					}
				})
			},
			getData() {
				if (this.loadingType !== 0) {
					return;
				}
				this.loadingType = 1;
				let user = JSON.parse(this.jyyUser);
				uni.request({
					url: this.webUrl + 'BankList',
					method: 'POST',
					data: {
						pageIndex: index,
						userid: user.id
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (res.data.result.bankList.length > 0) {
							this.bankList = this.bankList.concat(res.data.result.bankList);
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
			newService() {
				uni.navigateTo({
					// url: "bindBank?id=0",
					url: "bindBank?integral=" + this.integral
				})
			},
			goService: function(e) {
				if (this.url == undefined) {
					uni.navigateTo({
						url: "bindBank?id=" + e.id + '&integral=' + this.integral
					})
				} else {
					uni.redirectTo({
						url: "bindBank?id=" + e.id + "&url=" + this.url + '&integral=' + this.integral
					})
				}

			}
		},
		onReachBottom() {
			this.getData();
		},
		components: {
			loadMore,
			uniIcon
		}
	}
</script>
<style>
	page {
		background: #FFFFFF;
	}

	.jz_address .addBtn {
		background: url(../../../static/btn.png) no-repeat;
		width: 550upx;
		height: 115upx;
		color: #FFFFFF;
		font-size: 28upx;
		margin: 0 auto;
		background-size: 550upx 115upx;
	}

	.jz_address .addressitem .itemright {
		margin: 0;
	}
</style>
