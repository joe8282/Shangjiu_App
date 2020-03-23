<template>
	<view class="jz_messageItem uni-flex uni-column align-items">


		<view class="uni-flex" v-for="(mess,key) in messages" :key="key" @click="goMessage(mess)">
			
			<view v-if="mess.mode==0" class="list_item uni-flex uni-column align-items">
				<view class="item_time uni-flex justify-align-center">{{mess.createDate}}</view>
				<view class="item_content uni-flex uni-column">
					<view class="content_title uni-flex space-between align-items">
						<view>{{mess.title}}</view>
						<image class="activeimg" src="../../../static/message/noactive.png" v-if="mess.state==1"></image>
						<image   class="activeimg" src="../../../static/message/active.png" v-if="mess.state==0" ></image>
					</view>
					<view class="conten_detail">{{mess.intro}}</view>
				</view>
			</view>

			<view v-if="mess.mode==1" class="list_item uni-flex uni-column align-items">
				<view class="item_time uni-flex justify-align-center">{{mess.createDate}}</view>
				<view class="item_content uni-flex uni-column">
					<view class="content_title uni-flex space-between align-items">
						<view>{{mess.title}}</view>
						<image class="activeimg" src="../../../static/message/noactive.png" v-if="mess.state==1"></image>
						<image   class="activeimg" src="../../../static/message/active.png" v-if="mess.state==0" ></image>
					</view>
					<image :src="mess.pic"></image>
					<view class="conten_detail">{{mess.intro}}</view>
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
		data() {
			return {
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				user: {},
				messages: [],
				module: 0
			}
		},
		computed: {
			...mapState(['hasLogin', 'jyyUser'])
		},
		onLoad(e) {
			index = 1;
			this.module = e.module;
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '../login/login',
				});
			} else {
				this.user = JSON.parse(this.jyyUser);
				this.getData();
			}
		},
		onReachBottom() {
			this.getData();
		},
		components: {
			loadMore
		},
		methods: {
			goMessage(e) {
				uni.navigateTo({
					url: 'messageView?id=' + e.id+ '&userid=' + this.user.id
				})
			},
			getData() {
				if (this.loadingType !== 0) {
					return;
				}
				this.loadingType = 1;
				uni.request({
					url: this.webUrl + 'GetMessageList',
					method: 'POST',
					data: {
						pageIndex: index,
						userid: this.user.id,
						module: this.module
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (res.data.result.messages.length > 0) {
							this.messages = this.messages.concat(res.data.result.messages);
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
			}			
		}
	}
</script>

<style>
</style>
