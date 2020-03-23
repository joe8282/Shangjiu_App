<template>
	<view class="uni-flex uni-column myuser">
		<view class="uni-list">
			<view class="content">
				<view v-for="(item,key) in users" :key="key" class="uni-flex justify-content">
					<view class="uni-product uni-flex">
						<view class="image-view">
							<image v-if="item.avatarUrl" class="uni-product-image" :src="item.avatarUrl" />
							<image v-if="!item.avatarUrl" class="uni-product-image"  src="../../../static/user/28.jpg" />
						</view>
						<view class="uni-product-wrap uni-flex uni-column">
							<view class="nick">昵称：<text>{{item.nickName}}</text></view>
							<view class="registerTime">注册时间：<text>{{item.createDate}}</text></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<load-more :loadingType="loadingType" :contentText="contentText"></load-more>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import loadMore from '@/components/uni-load-more.vue';
	var index;
	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
		},
		data() {
			return {
				users: [],
				rank: 1,
				ico:"../",
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
			this.rank = e.rank;
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
					this.getData();
				}
			},
			getData() {
				if (this.loadingType !== 0) {
					return;
				}
				this.loadingType = 1;
				let user = JSON.parse(this.jyyUser);
				uni.request({
					url: this.webUrl + 'MyUserList',
					method: 'POST',
					data: {
						pageIndex: index,
						userid: user.id,
						rank: this.rank
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (res.data.result.userList.length > 0) {
							this.users = this.users.concat(res.data.result.userList);
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
		},
		onReachBottom() {
			this.getData();
		},
		components: {
			loadMore
		}
	}
</script>
