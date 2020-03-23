<template>
	<view class="uni-flex jz_user uni-column">
		<view class="user-header">
			<view class="uni-flex userinfo">
				<view class="inforlf uni-flex">
					<view class="face uni-flex">
						<image v-if="user.avatarUrl != null" :src="user.avatarUrl"></image>
						<image v-if="user.avatarUrl == null" src="../../../static/user/02.png"></image>
					</view>
					<view class="username uni-flex uni-column">
						<view class="uname">{{ user.nickName }}</view>
						<view class="utime">上次登录时间：23:00:00</view>
					</view>
				</view>
				<view class="inforrt uni-flex uni-column" @click="bindLogout">
					<image src="../../../static/user/03.png"></image>
					<view>退出登录</view>
				</view>
			</view>
			<view class="userlist uni-flex">
				<navigator url="../fav/fav" class="useritem uni-flex uni-column">
					<view>{{ userbase.fav }}</view>
					<view>我的收藏</view>
				</navigator>
				<view class="line"></view>
				<navigator class="useritem uni-flex uni-column" :url="'../myPoint/myPoint?integral=' + userbase.integral">
					<view>{{ userbase.integral }}</view>
					<view>我的积分</view>
				</navigator>
				<view v-if="user.business > 0" class="line"></view>
				<navigator v-if="user.business > 0" url="../myuser/mymember" class="useritem uni-flex uni-column">
					<view>{{ userbase.myUser }}</view>
					<view>我的会员</view>
				</navigator>
			</view>
		</view>
		<view class="user-content uni-flex-item">
			<view class="userbox uni-flex">
				<view class="uni-flex boxlf" @click="goAgent">
					<image src="../../../static/user/04.png"></image>
					<view class="uni-flex uni-column titles">
						<view class="titlestop">代理查询</view>
						<view class="titlesbottom">查询区域代理</view>
					</view>
				</view>
				<view class="boxline"></view>
				<view class="uni-flex boxlf" @click="goMyAgency">
					<image src="../../../static/user/flash.gif"></image>
					<view class="uni-flex uni-column titles">
						<view class="titlestop">快速下单</view>
						<view class="titlesbottom">代理商品一键下单</view>
					</view>
				</view>
			</view>
			<view class="orders uni-flex uni-column">
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate uni-navigate-right uni-flex">
						<view class="myorder">我的订单</view>
						<view class="lookall" @click="goAllOrder">查看全部订单</view>
					</view>
				</view>
				<view class="uni-flex orderList uni-flex-item">
					<navigator url="../orderList/orderList?tab=1" class="orderitem uni-flex uni-column">
						<image src="../../../static/user/06.png"></image>
						<view class="">待付款</view>
						<view class="badge" v-if="userbase.orderPay > 0">{{ userbase.orderPay }}</view>
					</navigator>
					<navigator url="../orderList/orderList?tab=2" class="orderitem uni-flex uni-column">
						<image src="../../../static/user/07.png"></image>
						<view class="">待发货</view>
						<view class="badge" v-if="userbase.orderShipments > 0">{{ userbase.orderShipments }}</view>
					</navigator>
					<navigator url="../orderList/orderList?tab=3" class="orderitem uni-flex uni-column">
						<image src="../../../static/user/08.png"></image>
						<view class="">待收货</view>
						<view class="badge" v-if="userbase.orderReceiving > 0">{{ userbase.orderReceiving }}</view>
					</navigator>
					<navigator url="../orderList/orderList?tab=4" class="orderitem uni-flex uni-column">
						<image src="../../../static/user/09.png"></image>
						<view class="">退款/售后</view>
						<view class="badge badgeF" v-if="userbase.orderReturn > 0">{{ userbase.orderReturn }}</view>
					</navigator>
					<navigator url="../orderList/orderList?tab=0" class="orderitem uni-flex uni-column">
						<image src="../../../static/user/10.png"></image>
						<view>全部订单</view>
					</navigator>
				</view>
			</view>
			<view class="card uni-flex uni-column">
				<view v-if="user.business > 0" class="uni-list">
					<navigator url="../myAgency/index" hover-class="navigator-hover">
						<view class="uni-list-cell">
							<view class="uni-list-cell-navigate uni-flex firstcell">
								<view class="listmsg uni-flex align-items">
									<image class="listleft" src="../../../static/user/agency.png"></image>
									<text class="">我的代理</text>
								</view>
								<view class="uni-flex align-items">
									<text class="num">{{userbase.myAgency}}</text>
									<image class="listrt" src="../../../static/user/14.png"></image>
								</view>
							</view>
						</view>
					</navigator>
				</view>

				<!-- <view v-if="user.business>0" class="uni-list">
					<navigator url="../agent/index" hover-class="navigator-hover">
						<view class="uni-list-cell">
							<view class="uni-list-cell-navigate uni-flex">

								<view class="listmsg uni-flex align-items">
									<image class="listleft" src="../../../static/user/04.png"></image>
									<text class="">代理查询</text>
								</view>
								<image class="listrt" src="../../../static/user/14.png"></image>
							</view>
						</view>
					</navigator>
				</view> -->
				<view v-if="user.business > 0" class="uni-list">
					<navigator url="../myuser/mymember" hover-class="navigator-hover">
						<view class="uni-list-cell">
							<view class="uni-list-cell-navigate uni-flex">
								<view class="listmsg uni-flex align-items">
									<image class="listleft" src="../../../static/user/17.png"></image>
									<text class="">我的会员</text>
								</view>
								<view class="uni-flex align-items">
									<text class="num">{{userbase.myUser}}</text>
									<image class="listrt" src="../../../static/user/14.png"></image>
								</view>
							</view>
						</view>
					</navigator>
				</view>
				<view v-if="user.business == 1" class="uni-list">
					<navigator url="../profit/index" hover-class="navigator-hover">
						<view class="uni-list-cell">
							<view class="uni-list-cell-navigate uni-flex">
								<view class="listmsg uni-flex align-items">
									<image class="listleft" src="../../../static/user/40.png"></image>
									<text class="">利润查询</text>
								</view>
								<image class="listrt" src="../../../static/user/14.png"></image>
							</view>
						</view>
					</navigator>
				</view>

				<view v-if="user.business > 0" class="uni-list">
					<navigator url="../income/income" hover-class="navigator-hover">
						<view class="uni-list-cell">
							<view class="uni-list-cell-navigate uni-flex firstcell">
								<view class="listmsg uni-flex align-items">
									<image class="listleft" src="../../../static/user/15.png"></image>
									<text class="">收益明细</text>
								</view>
								<image class="listrt" src="../../../static/user/14.png"></image>
							</view>
						</view>
					</navigator>
				</view>
				<view v-if="user.business > 0" class="uni-list">
					<navigator @click="goBeginCard" hover-class="navigator-hover">
						<view class="uni-list-cell">
							<view class="uni-list-cell-navigate uni-flex">
								<view class="listmsg uni-flex align-items">
									<image class="listleft" src="../../../static/user/16.png"></image>
									<text class="">开牌申请</text>
								</view>
								<image class="listrt" src="../../../static/user/14.png"></image>
							</view>
						</view>
					</navigator>
				</view>

				<view class="uni-list">
					<navigator v-if="user.business > 0" @click="goCode" hover-class="navigator-hover">
						<view class="uni-list-cell">
							<view class="uni-list-cell-navigate uni-flex">
								<view class="listmsg uni-flex align-items">
									<image class="listleft" src="../../../static/user/qr.png"></image>
									<text class="">推广码</text>
								</view>
								<image class="listrt" src="../../../static/user/14.png"></image>
							</view>
						</view>
					</navigator>
				</view>
				<view v-if="user.business == 0" class="uni-list">
					<navigator @click="goAgentFor()" hover-class="navigator-hover">
						<view class="uni-list-cell">
							<view class="uni-list-cell-navigate uni-flex">
								<view class="listmsg uni-flex align-items">
									<image class="listleft" src="../../../static/user/16.png"></image>
									<text class="">申请代理</text>
								</view>
								<image class="listrt" src="../../../static/user/14.png"></image>
							</view>
						</view>
					</navigator>
				</view>
				<view class="uni-list">
					<navigator url="../account/account" hover-class="navigator-hover firstcell">
						<view class="uni-list-cell">
							<view class="uni-list-cell-navigate uni-flex">
								<view class="listmsg uni-flex align-items">
									<image class="listleft" src="../../../static/user/11.png"></image>
									<text class="">个人信息</text>
								</view>
								<image class="listrt" src="../../../static/user/14.png"></image>
							</view>
						</view>
					</navigator>
				</view>
				<view class="uni-list">
					<navigator url="../address/address" hover-class="navigator-hover">
						<view class="uni-list-cell">
							<view class="uni-list-cell-navigate uni-flex">
								<view class="listmsg uni-flex align-items">
									<image class="listleft" src="../../../static/user/12.png"></image>
									<text class="">收货地址</text>
								</view>
								<image class="listrt" src="../../../static/user/14.png"></image>
							</view>
						</view>
					</navigator>
				</view>
				<view class="uni-list">
					<navigator url="../loginPassword/loginPassword" hover-class="navigator-hover">
						<view class="uni-list-cell">
							<view class="uni-list-cell-navigate uni-flex">
								<view class="listmsg uni-flex align-items">
									<image class="listleft" src="../../../static/user/13.png"></image>
									<text class="">登录密码</text>
								</view>
								<image class="listrt" src="../../../static/user/14.png"></image>
							</view>
						</view>
					</navigator>
				</view>
				<view class="uni-list">
					<navigator @click="bindLogout" hover-class="navigator-hover lastcell">
						<view class="uni-list-cell">
							<view class="uni-list-cell-navigate uni-flex">
								<view class="listmsg uni-flex align-items">
									<image class="listleft" src="../../../static/user/18.png"></image>
									<text class="">退出登录</text>
								</view>
								<image class="listrt" src="../../../static/user/14.png"></image>
							</view>
						</view>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	computed: {
		...mapState(['hasLogin', 'forcedLogin', 'jyyUser'])
	},
	methods: {
		...mapMutations(['login', 'logout']),
		goAllOrder() {
			uni.navigateTo({
				url: '../orderList/orderList?tab=0'
			});
		},
		goAgent() {
			uni.navigateTo({
				url: '../agent/index'
			});
		},
		goAgentFor() {
			uni.navigateTo({
				url: '../agent/applyfor?path=user'
			});
		},
		goCode() {
			uni.navigateTo({
				url: '../../qrCode/index?id=' + this.user.id
			});
		},
		goBeginCard() {
			uni.navigateTo({
				url: '../beginCard/beginCard'
			});
		},
		bindLogout() {
			uni.showModal({
				content: '确认退出？',
				success: res => {
					if (res.confirm) {
						this.logout();
						uni.switchTab({
							url: '../../home/home'
						});
					}
				}
			});
		},
		init() {
			if (!this.hasLogin) {
				uni.navigateTo({
					url: '../login/login'
				});
			} else {
				this.user = JSON.parse(this.jyyUser);
				this.getData();

				uni.request({
					url: this.webUrl + 'FlashCart',
					data: 'userid=' + this.user.id + '&id=55,56',
					method: 'POST',
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		goMyAgency() {
			uni.navigateTo({
				url: '../myAgency/index'
			});
		},
		getData() {
			uni.request({
				url: this.webUrl + 'GetUserInfo',
				data: 'userid=' + this.user.id,
				method: 'POST',
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: res => {
					this.userbase = res.data.result;
					this.login(JSON.stringify(res.data.user));
				},
				fail: () => {},
				complete: () => {}
			});
		}
	},
	onShow() {
		this.init();
	},
	onLoad(e) {
		this.init();
	},
	onPullDownRefresh() {
		this.init();
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	},
	data() {
		return {
			user: {},
			userbase: {}
		};
	}
};
</script>

<style>
.user-header {
	background: url(../../../static/user/01.png);
	background-size: 100% 100%;
}

.boxline {
	background: url(../../../static/user/line.png) no-repeat;
}

.jz_income .content_item .item_titles > view:first-child {
	margin-top: 20upx;
}
.num {
	font-size: 26rpx;
	color: #ca0000;
	margin-right: 10upx;
}
</style>
