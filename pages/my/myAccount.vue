<template>
	<view class="body">
		<view class="head">
			<view class="money">
				<span>未结算金额</span>
				<span>￥<b>{{StatementLeftFee}}</b></span>
			</view>
		</view>
		<view class="sr_count">
			<view class="sr1">
				<view class="sr_title"><span>收入账户</span><span>合计：￥{{IncomeFee}}</span></view>
				<view class="sr_count1">
					<navigator class="kt">
						<span>拓客收入</span>
						<span>￥{{AdCommissionFee+AdRewardFee}}</span>
					</navigator>
					<view class="sx"></view>
					<navigator class="kt">
						<span>商号代理</span>
						<span>￥{{ShopAgentFee}}</span>
					</navigator>
					<view class="sx"></view>
					<navigator class="kt">
						<span>平台代理</span>
						<span>￥{{AgentIncomeFee}}</span>
					</navigator>
					<view class="sx"></view>
					<navigator class="kt">
						<span>红包收入</span>
						<span>￥{{RewardIncomeFee}}</span>
					</navigator>
				</view>
				<view class="sr_count1" style="border-top: 1px solid  #DADADA;">
					<navigator url="/pages/my/myShopIncome" class="kt">
						<span>商号收入</span>
						<span>￥{{ShopIncomeFee}}</span>
					</navigator>
					<view class="sx"></view>
					<navigator class="kt">
						<span>商讯收入</span>
						<span>￥{{ProductIncomeFee}}</span>
					</navigator>
					<view class="sx"></view>
				</view>
			</view>
		</view>
		<view class="cash">
			<!-- 一般用法 -->
			<uni-list>
				<navigator url="../rechargeRecord/rechargeRecord">
					<uni-list-item  title="充值账户"></uni-list-item>
				</navigator>
			</uni-list>
			<view class="c1">
				<view class="cc">
					<span>历史充值</span>
					<span>￥{{RechargeAllFee}}</span>
				</view>
				<view class="sx"></view>
				<view class="cc">
					<span>余额充值</span>
					<span>￥{{RechargeLeftFee}}</span>
				</view>
			</view>
		</view>
		<view class="other">
			<uni-list>
				<uni-list-item  title="我的支出" :show-badge="true" :badge-text="ExpendFee"></uni-list-item>
				<uni-list-item  title="结算记录" :show-badge="true" :badge-text="StatementBackFee"></uni-list-item>
				<uni-list-item  title="我的银行卡" rightText="0" ></uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	// import uniSection from '@/components/uni-section/uni-section.vue'
	import uniList from "@/components/uni-list/uni-list.vue"
	import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
	export default {
	    components: {uniList,uniListItem},
		data() {
			return {
				StatementLeftFee: 0,
				StatementBackFee: '￥0',
				IncomeFee: 0,
				AdCommissionFee: 0,
				AdRewardFee:0,
				ShopIncomeFee: 0,
				ProductIncomeFee: 0,
				ShopAgentFee: 0,
				AgentIncomeFee: 0,
				RewardIncomeFee: 0,
				RechargeAllFee: 0,
				RechargeLeftFee: 0,
				ExpendFee: '￥0'
			}
		},
		onLoad(options) {
			this.getUserInfo();
		},
		methods: {
			getUserInfo(){
				uni.request({
					url:this.$serverUrl + '/Base_SysManage/Base_User/GetDataDetail?Id=' + uni.getStorageSync('userid'),
					success: (res) =>{
						//console.log(res)
						this.StatementLeftFee = res.data.StatementLeftFee;
						this.StatementBackFee = '￥'+res.data.StatementBackFee.toString();
						this.ExpendFee = '￥'+res.data.ExpendFee.toString();
						this.IncomeFee = res.data.IncomeFee;
						this.ShopIncomeFee = res.data.ShopIncomeFee + res.data.ShopRewardFee;
						this.ProductIncomeFee = res.data.ProductIncomeFee + res.data.ProductRewardFee;
						
						
					},
					
				})
			}
		}
	}
</script>

<style>
	.body{
		width: 100%;
		height: 100%;
		background-color: #EDEDED;
	}
	.head{
		background-color: #B22420;
		width: 100%;
		height: 300rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.money{
		display: flex;
		flex-direction: column;
		color: #FFFFFF;
		text-align: center;
	}
	.money span{
		font-size: 28rpx;
		padding-bottom: 20rpx;
	}
	.money b{
		font-size: 52rpx;
		font-weight: 400;
		letter-spacing: 5rpx;
	}
	.sr_count{
		width: 100%;
		height: 400rpx;
		background-color: #FFFFFF;
		/* margin-top: 20rpx; */
	}
	.sr1{
		width: 90%;
		height: 100%;
		margin: 0 auto;
	}
	.sr_title{
		width: 100%;
		height: 20%;
		border-bottom: 1px solid #DADADA;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.sr_title span{
		display: inline-block;
		width: 50%;
	}
	.sr_title span:first-child{
		text-align: left;
		font-size: 28rpx;
		color: #181818;
	}
	.sr_title span:nth-child(2){
		text-align: right;
		font-size: 28rpx;
		color: #999999;
	}
	.sr_count1{
		width: 100%;
		height: 40%;
		/* border-bottom: 1px solid #DADADA; */
		display: flex;
		align-items: center;
		/* justify-content: center; */
		text-align: center;
	}
	.kt{
		width: 24.5%;
		height: 70%;
	}
	.sr_count1 navigator span:first-child{
		font-size: 28rpx;
		color: #646464;
		font-weight: 400;
		display: block;
	}
	.sr_count1 navigator span:nth-child(2){
		font-size: 34rpx;
		color: #ED9795;
		line-height: 100rpx;
	}
	.sx{
		width: 2rpx;
		height: 70rpx;
		background:#DADADA;
	}
	.cash{
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		margin-top: 20rpx;
	}
	.cash span{
		font-size: 34rpx;
	}
	.c1{
		width: 90%;
		height:140rpx;
		margin:  0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top: 1px solid  #DADADA;
	}
	.cc{
		width: 45%;
		height: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
		text-align: center;
	}
	.cc span:first-child{
		font-size: 28rpx;
		color: #646464;
		font-weight: 400;
		padding-top: 20rpx;
	}
	.cc span:nth-child(2){
		font-size: 34rpx;
		color: #ED9795;
		line-height: 100rpx;
	}
	.other{
		width: 100%;
		height: 100%;
		background-color: #FFFFFF;
		margin-top: 20rpx;
	}
</style>
