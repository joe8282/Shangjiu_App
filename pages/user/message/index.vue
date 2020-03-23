<template>
	<view class="jz_message uni-flex uni-column">

		<view class="messageItem uni-flex align-items space-between uni-navigate-right" @click="goMessageItem(0)">
			<view class="ItemLf uni-flex">
				<view class="itemimg uni-flex  justify-align-center">
					<image src="../../../static/message/01.png"></image>
				</view>
				<view class="itemcontent uni-flex uni-column">
					<view class="message01">通知消息</view>
					<view class="message02">{{messages[0].message}}条未读消息</view>
				</view>
			</view>
			<view class="itemRt uni-flex justify-align-center">
				<uni-icon type="arrowright" size="20"></uni-icon>
			</view>
		</view>

		<!-- <view class="messageItem uni-flex align-items space-between" @click="goMessageItem">
			<view class="ItemLf uni-flex">
				<view class="itemimg uni-flex  justify-align-center">
					<image src="../../static/message/03.png"></image>
				</view>
				<view class="itemcontent uni-flex uni-column">
					<view class="message01">我的私信</view>
					<view class="message02">暂无私信消息</view>
				</view>
			</view>
			<view class="itemRt uni-flex justify-align-center">
				<image src="../../static/message/02.png"></image>
			</view>
		</view> -->

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	import uniIcon from '../../../components/uni-icon.vue'
	export default {
		data() {
			return {
				user: {},
				messages: [{
					"message": 0
				}]
			}
		},
		components:{
			uniIcon
		},
		computed: {
			...mapState(['hasLogin', 'jyyUser'])
		},
		onLoad() {
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '../login/login',
				});
			} else {
				this.user = JSON.parse(this.jyyUser);
				this.getData();
			}
		},
		onShow() {
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '../login/login',
				});
			} else {
				this.user = JSON.parse(this.jyyUser);
				this.getData();
			}
		},
		methods: {
			goMessageItem(e) {
				uni.navigateTo({
					url: 'messageList?module=' + e
				})
			},
			getData() {
				uni.request({
					url: this.webUrl + 'GetNoReadMessageCount',
					data: "userid=" + this.user.id,
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						this.messages = res.data.data;
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
