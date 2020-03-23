<template>
	<view class="uni-flex uni-column jz_mymember">

		<view class="uni-flex align-items menberItem" v-if="users.length>0" v-for="(item,key) in users" :key="key">
			<view class="uni-flex justify-align-center menberItemImg">
				<image v-if="item.headIco!=null&& item.headIco!='undefined'" :src="item.headIco"></image>
				<image v-if="item.headIco==null|| item.headIco=='undefined'" src="../../../static/home/home12.png"></image>
			</view>
			<view class="uni-flex-item uni-flex space-between uni-column menberItemright">
				<view class="uni-flex align-items">昵称：{{item.nickName}}</view>
				<view class="uni-flex space-between align-items">
					<view class="">注册时间：{{item.createDate}}</view>
				</view>
				<view class="uni-flex  align-items" v-if="user.business==1">
					<view class="uni-flex justify-align-center btnmember btn " @click="goMyfit(item,key)">
						推广分润设置
					</view>
					<view class="uni-flex justify-align-center btnmember btn" :class="[item.agency? '' : 'NoactiveClass']" @click="setAcentPrice(item,key)">
						代理价格可见
					</view>
				</view>
			</view>
		</view>

		<view class="uni-flex align-items menberItem" v-if="users.length==0" style="color: #B2B2B2;">
			暂无会员
		</view>


	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
		},
		data() {
			return {
				users: [],
				user: {}
			}
		},
		onShow() {},
		onLoad(e) {

			this.user = JSON.parse(this.jyyUser);
			this.init();
		},
		methods: {
			setAcentPrice(item, key) {
				uni.request({
					url: this.webUrl + 'SetAgency',
					method: 'POST',
					data: {
						userid: this.user.id,
						id: item.id,
						agency: !item.agency
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (res.data.result.isSuccess) {
							this.users[key].agency = !item.agency;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			goMyfit(e) {
				uni.navigateTo({
					url: 'myfit?userid=' + e.id
				})
			},
			init() {
				if (!this.hasLogin) {
					uni.navigateTo({
						url: '../login/login',
					});
				} else {
					this.getData();
				}
			},
			getData() {
				uni.request({
					url: this.webUrl + 'GetMyUser',
					method: 'POST',
					data: {
						userid: this.user.id,
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (res.data.data.length > 0) {
							this.users = res.data.data;
						}
					},
					fail: () => {},
					complete: () => {}
				});
			},
			goBuyUser(e) {
				uni.navigateTo({
					url: "./myuser?rank=" + e
				})
			}
		}
	}
</script>
<style>
	.myuser {
		height: 80upx;
		text-align: center;
		line-height: 80upx;
	}

	.mymember .number {
		margin-right: 20upx;
	}

	.btnmember {
		font-size: 24upx;
		margin-top: 20upx;
		width: 180upx;
		height: 50upx;
		border-radius: 8upx;
		color: #fff;
		line-height: 50upx;
	}

	.btnmember.NoactiveClass {
		background: #cdcdcd;
	}
</style>
