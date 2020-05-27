<template>
	<view class="body">
		<view v-for="item in lists">
			<view class="news">
				<view class="content">
					<view class="head">
						<image :src="item.HeadPic"></image>
						<span class="username">{{item.UserName}}</span>
					</view>
					<view class="text-area">
						<view class="left">
							<p>{{item.SubjectTitle}}</p>
							<p class="des">
								<span>{{item.CreateTime.split(' ')[0]}}</span>
								<span>{{item.TypeName}}</span>
								<span>{{item.ClassName}}</span>
								<span>{{item.ChannelName}}</span>
								<!-- <span>￥99999</span> -->
							</p>
						</view>
						<view class="right">
							<image :src="item.SubjectPic"></image>
						</view>
					</view>
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
			return {
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
		methods: {
			initData() {
				uni.request({
					url: this.$serverUrl + '/OtherManage/Dev_Collection/GetDataList?collectionType=商讯收藏&userId=' + uni.getStorageSync(
							'userid') + '&pageNumber=' + (this.refreshing ? 1 : this.fetchPageNum) +
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
							this.max += 6;
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
			}
		}
	}
</script>

<style>
	.body {
		width: 100%;
		height: 100%;
	}

	.news {
		width: 100%;
		height: 220rpx;
		border-bottom: 1px solid #F1F1F1;
	}

	.content {
		width: 94%;
		height: 100%;
		margin: 0 auto;
	}

	.head {
		width: 100%;
		height: 35%;
		display: flex;
		align-items: center;
	}

	.head image {
		width: 50rpx;
		height: 50rpx;
	}

	.head span {
		font-size: 30rpx;
		padding-left: 20rpx;
	}

	.text-area {
		width: 100%;
		height: 65%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.left {
		width: 75%;
		height: 100%;
	}

	.right {
		width: 25%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.right image {
		width: 80%;
		height: 80%;
	}

	.left p:first-child {
		width: 100%;
		height: 60%;
		font-size: 30rpx;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.des {
		font-size: 26rpx;
		width: 100%;
		height: 40%;
		display: flex;
		/* justify-content: center; */
		align-items: flex-start;
	}

	.des span:first-child {
		width: 30%;
		color: #646464;
	}

	.des span:nth-child(2),
	.des span:nth-child(3),
	.des span:nth-child(4) {
		width: 13%;
		color: #646464;
		text-align: center;
	}

	/* 	.des span:last-child{
		width: 30%;
		color: #B30000;
		text-align: center;
	} */
</style>
