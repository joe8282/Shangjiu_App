<template>
	<view class="main">
		<view class="head">
			<view class="count">
				<span>总计:<b>{{alluser}}</b>人</span>
			</view>
		</view>
		<view class="part">
			<view class="mon">
				<view class="uni-list">
					<view class="uni-list-cell">
						<view class="uni-list-cell-db">
							<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" fields="month">
								<view class="riqi">
									<view class="uni-input">{{date}}</view>
									<image src="../../static/images/zongh2.png"></image>
								</view>
								<span class="money">本月拓客<b>{{listsNum}}</b>人</span>
							</picker>
						</view>
					</view>
				</view>
			</view>
			<view class="content" v-for="item in lists">
				<view class="list" @click="goDetail(item)">
					<view class="head_pic">
						<image :src="item.HeadPic"></image>
					</view>
					<view class="username">
						<span>{{item.UserName}}</span>
					</view>
					<view class="new_add">
						<span>{{item.CreateTime.split(' ')[0]}}</span>
					</view>
				</view>
			</view>
			<view class="uni-loadmore" v-if="showLoadMore">{{loadMoreText}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				alluser: 0,
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
			}, 1000);	
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
						this.alluser = res.data.UserNum;
						
						
					},
					
				})
			},
			initData() {
				// console.log(this.date)
				var inyear = this.date.split('年')[0] 
				var inmonth = this.date.split('年')[1] .split('月')[0] 
				uni.request({
					url: this.$serverUrl + '/Base_SysManage/Base_User/GetDataList?upuserid='+uni.getStorageSync('userid')+'&InYear='+inyear+'&InMonth='+inmonth+'&pageNumber=' + (this.refreshing ? 1 : this.fetchPageNum) +
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
					year = year - 2;
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

	.main {
		width: 100%;
		height: 100%;
	}

	.head {
		height: 100rpx;
		background-color: #FFFFFF;
		border-top: 2rpx solid rgba(246, 246, 246, 1);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.count {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50%;
	}

	.count span {
		color: #B22420;
		font-size: 34rpx;
	}

	.count span b {
		font-weight: normal;
		padding-left: 10rpx;
		padding-right: 10rpx;
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
		justify-content: center;
		margin-top: 20rpx;
	}

	picker image {
		width: 20rpx;
		height: 12rpx;
		padding-left: 10rpx;
		padding-top: 10rpx;
	}

	.money {
		font-size: 26rpx;
		color: #8E8E8E;
	}

	.money b {
		padding-left: 10rpx;
		padding-right: 10rpx;
	}

	.content {
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		margin-top: 10rpx;
	}

	.list {
		height: 140rpx;
		border-bottom: 2rpx solid #F6F6F6;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.head_pic {
		width: 18%;
		height: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.username {
		width: 50%;
		height: 100%;
		display: flex;
		align-items: center;
	}

	.new_add {
		width: 30%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.head_pic image {
		width: 65%;
		height: 70%;
	}

	.username span {
		font-size: 32rpx;
	}

	.new_add span {
		color: #8E8E8E;
		font-size: 28rpx;
	}
</style>
