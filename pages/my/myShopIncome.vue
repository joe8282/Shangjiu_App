<template>
	<view class="body">
		<view class="head">
			<view class="nav">
				<span>总收入</span>
				<span>￥{{shopIncome}}</span>
			</view>
		</view>
		<view class="mon">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" fields="month">
							<view class="riqi">
								<view class="uni-input">{{date}}</view>
								<image src="../../static/images/zongh2.png"></image>
							</view>
							<span class="money">本月收入{{shopIncomeMonth}}元</span>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="fx-navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }"
			 @click="tabClick(index)">
				<span>{{ item.text }}</span>
			</view>
		</view>
		<view class="content">
			<view class="list" v-for="item in lists">
				<view class="left">
					<view class="left_head">
						<image class="headpic" :src="item.HeadPic"></image>
					</view>
					<view class="left_user">
						<span>{{item.UserName}}</span>
						<span>{{item.CreateTime}}</span>
					</view>
				</view>
				<view class="right">
					<span>+{{item.Price}}元</span>
				</view>
			</view>
		</view>
		<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				shopIncome: 0,
				shopIncomeMonth: 0,
				tabCurrentIndex: 0,
				tabCurrentType: '商号收费',
				navList: [{
						state: 0,
						text: '商号收费',
					},
					{
						state: 1,
						text: '商号打赏',
					}
				],
				date: currentDate,
				refreshing: false,
				lists: [],
				listsNum: 0,
				fetchPageNum: 1,
				loadMoreText: "加载中...",
				showLoadMore: false,
				max: 0
			}
		},
		onLoad(options) {
			this.getUserInfo();
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
			}, 800);	
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			getUserInfo(){
				uni.request({
					url:this.$serverUrl + '/Base_SysManage/Base_User/GetDataDetail?Id=' + uni.getStorageSync('userid'),
					success: (res) =>{
						//console.log(res)
						this.shopIncome = res.data.ShopIncomeFee + res.data.ShopRewardFee;
					},
					
				})
			},
			tabClick(index) {
				this.tabCurrentIndex = index;
				if(index==0){
					this.tabCurrentType = '商号收费'
				}else{
					this.tabCurrentType = '商号打赏'
				}
				this.refreshing = false;
				this.fetchPageNum =1;
				this.lists = [];
				this.initData();
			},
			initData() {
				// console.log(this.date)
				var inyear = this.date.split('年')[0] 
				var inmonth = this.date.split('年')[1] .split('月')[0] 
				uni.request({
					url: this.$serverUrl + '/Base_SysManage/Dev_AccountRecord/GetDataList?Status=2&RecordClass='+this.tabCurrentType+'&UserId='+uni.getStorageSync('userid')+'&InYear='+inyear+'&InMonth='+inmonth+'&pageNumber=' + (this.refreshing ? 1 : this.fetchPageNum) +
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
								var item = data[i];
								//item.guid = this.newGuid() + item.id
								list.push(item);
								this.shopIncomeMonth = this.shopIncomeMonth + item.Price
							}
							console.log('得到list', list);
							this.max += 10;
							this.listsNum = ret.data.records;
							if (this.refreshing) {
								this.refreshing = false;
								uni.stopPullDownRefresh()
								this.lists = list;
								this.fetchPageNum = 2;
							} else {
								this.lists = this.lists.concat(list);
								this.fetchPageNum += 1;
							}
						}
					}
				});
			},
			bindDateChange: function(e) {
				let checked = e.target.value.split('-');
				this.date = checked[0] + '年' + checked[1] + '月';
				console.log(this.date);
				this.refreshing = false;
				this.fetchPageNum =1;
				this.lists = [];
				this.initData();
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				// let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				// day = day > 9 ? day : '0' + day;
				return `${year}年${month}月`;
			}
		}
	}
</script>

<style>
	uni-page-wrapper {
		width: 100%;
		max-height: 100%;
		background-color: rgba(246, 246, 246, 1);
	}

	.head {
		width: 100%;
		height: 300rpx;
		background-color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.nav {
		width: 92%;
		height: 80%;
		background-color: #B22420;
		border-radius: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.nav span {
		color: #FFFFFF;
	}

	.nav span:first-child {
		font-size: 24rpx;
	}

	.nav span:nth-child(2) {
		font-size: 48rpx;
		font-weight: bold;
		padding-top: 20rpx;
	}

	.mon {
		width: 100%;
		height: 120rpx;
		display: flex;
		align-items: center;
		background-color: #efefef;
	}

	.uni-list {
		width: 90%;
		height: 90%;
		margin: 0 auto;
		display: flex;
		align-items: center;
	}

	.uni-input {
		font-size: 30rpx;
		font-weight: 400;
	}

	.riqi {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}

	picker image {
		width: 20rpx;
		height: 12rpx;
		padding-left: 10rpx;
	}

	.money {
		font-size: 26rpx;
		color: #8E8E8E;
	}

	.content {
		width: 100%;
		height: 100%;
		background-color: white;
		margin: 0 auto;
	}

	.list {
		width: 90%;
		margin-left: 5%;
		height: 120rpx;
		border-bottom: 1px solid #F6F6F6;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.left_head {
		width: 15%;
		height: 100%;
		height: 74rpx;
	}

	.headpic {
		width: 100%;
		height: 100%;
	}

	.left {
		width: 70%;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.left_user {
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
	}

	.left_user span:first-child {
		font-size: 30rpx;
		color: #181818;
	}

	.left_user span:nth-child(2) {
		font-size: 28rpx;
		color: #8E8E8E;
		padding-top: 10rpx;
	}

	.right {
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.right span {
		font-size: 36rpx;
		color: #B22420;
		text-align: right;
	}


	.fx-navbar {
		display: flex;
		margin-top: 20rpx;
		margin-bottom: 40rpx;
		width: 100%;
		height: 80rpx;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.fx-navbar .nav-item {
		color: #000000;
		font-size: 32rpx;
		width: 30%;
	}

	.fx-navbar .current span {
		font-weight: bold;
		color: #B22420;
		border-bottom: 4rpx solid #B22420;
		padding-bottom: 6rpx;
	}
</style>
