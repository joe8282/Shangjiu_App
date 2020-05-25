<template>
	<view class="content">
		<view class="my-header-wrap">
			<view class="my-top-setting">
				<img src="static/images/setting-icon.png" alt="" class="setting-icon" @click="ToSetting()" />
			</view>
			<view class="my-tx-icon"><img :src="UserPic" /></view>
			<view class="my-name">{{UserName}}</view>
			<view class="my-time">{{CreateTime}}</view>
		</view>
		<view class="my-fl-three">
			<ul>
				<li>
					<img src="/static/images/my-icon1.png" alt="" />
					<span>创建商区</span>
				</li>
				<li>
					<img src="/static/images/my-icon2.png" alt="" />
					<span>发布内容</span>
				</li>
				<li>
					<img src="/static/images/my-icon3.png" alt="" />
					<span>付费窗口</span>
				</li>
			</ul>
		</view>
		<view class="my-content">
			<view class="my-cont-wrap">
				<view class="my-cont-title">
					<label></label>
					<span>我的代理信息</span>
					<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
				</view>
				<view class="my-dl-wrap">
					<ul>
						<li style="width: 30%;margin-left: 35%;"><span>申请代理商</span></li>
						<!-- <li style="width: 40%;"><span>商家经办加入代理</span></li>
					<li style="width: 30%;"><span>申请业务员</span></li> -->
					</ul>
				</view>
			</view>
			<!-- <view class="my-cont-wrap">
			<view class="my-cont-title">
				<label></label>
				<span>我的待审事项</span>
				<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
			</view>
			<view class="my-dl-three">
				<ul class="my-three-ul">
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>内容投稿待审</label>
					</li>
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>商区内链待审</label>
					</li>
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>成员加入待审</label>
					</li>
				</ul>
			</view>
		</view> -->
			<view class="my-cont-wrap">
				<view class="my-cont-title">
					<label></label>
					<span>我的账号管理</span>
					<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
					<img src="static/images/my-wen.png" alt="" class="my-wen-icon-rr" />
				</view>
				<view class="my-dl-three">
					<ul class="my-three-ul">
						<li>
							<span>{{RechargeLeftFee}}</span>
							<label>充值余额</label>
						</li>
						<li>
							<span>{{IncomeFee}}</span>
							<label>我的收入</label>
						</li>
						<li>
							<span>{{StatementLeftFee}}</span>
							<label>应结余额</label>
						</li>
					</ul>
				</view>
			</view>
			<view class="my-cont-wrap">
				<view class="my-cont-title">
					<label></label>
					<span>我的会员主页</span>
					<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
					<img src="static/images/my-wen.png" alt="" class="my-wen-icon-rr" />
				</view>
				<view class="my-dl-three">
					<ul class="my-one-ul">
						<li>
							<span>{{ShopNum}}</span>
							<label>我的商号</label>
						</li>
					</ul>
				</view>
			</view>
			<view class="my-cont-wrap">
				<view class="my-cont-title">
					<label></label>
					<span>我的消息处理</span>
					<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
					<img src="static/images/my-wen.png" alt="" class="my-wen-icon-rr" />
				</view>
				<!-- 			<view class="my-dl-three">
				<ul class="my-two-ul">
					<li>
						<span>205</span>
						<label>未读消息</label>
					</li>
					<li>
						<span>205</span>
						<label>全部消息</label>
					</li>
				</ul>
			</view> -->
			</view>
			<view class="my-cont-wrap">
				<view class="my-cont-title">
					<label></label>
					<span>我的推广拓客</span>

					<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
					<i class="my-cont-title-i">{{UserNum}}</i>
					<img src="static/images/my-wen.png" alt="" class="my-wen-icon-rr" />
				</view>

			</view>
			<view class="my-cont-wrap">
				<view class="my-cont-title">
					<label></label>
					<span>我的商讯收藏</span>

					<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
					<i class="my-cont-title-i">{{ProductNum}}</i>
					<img src="static/images/my-wen.png" alt="" class="my-wen-icon-rr" />
				</view>

			</view>
			<!-- <view class="my-cont-wrap">
			<view class="my-cont-title">
				<label></label>
				<span>我管理的商区</span>
				<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
			</view>
			<view class="my-dl-three">
				<ul class="my-four-ul">
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>商区</label>
					</li>
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>内容</label>
					</li>
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>内链</label>
					</li>
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>外链</label>
					</li>
				</ul>
			</view>
		</view>
		<view class="my-cont-wrap">
			<view class="my-cont-title">
				<label></label>
				<span>我加入的商区</span>
				<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
			</view>
			<view class="my-dl-three">
				<ul class="my-two-ul">
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>已加商区</label>
					</li>
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>待审商区</label>
					</li>
				</ul>
			</view>
		</view>
		<view class="my-cont-wrap">
			<view class="my-cont-title">
				<label></label>
				<span>我的收藏关注</span>
				<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
			</view>
			<view class="my-dl-three">
				<ul class="my-two-ul">
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>商区</label>
					</li>
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>内容</label>
					</li>
				</ul>
			</view>
		</view> -->
			<!-- <view class="my-sj-lx">
				<view class="my-sj-lx-wrap">
					<view class="my-cont-title">
						<span>商九客服信息</span>
						<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
					</view>
					<view class="my-sj-lxx">
						<view class="my-dh">
							<span>电话：</span>
							<label>13500000000</label>
						</view>
						<view class="my-yx">
							<span>邮箱：</span>
							<label>xxxxxxx@163.com</label>
						</view>
					</view>
				</view>
			</view> -->

		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				UserName: '', //用户昵称
				UserPic: '', //用户头像
				RechargeLeftFee: '', //充值余额
				IncomeFee: '', //收入总额
				StatementLeftFee: '', //未结算金额
				ShopNum: '', //我的商号
				UserNum: '', //我的推广拓客
				ProductNum: '', //我的商讯收藏
				CreateTime: '' //创建时间
			}
		},
		onLoad() {
			this.GetUserInfo();
		},
		methods: {
			GetUserInfo() {
				var id = '1133345545746780160'; //用户id
				uni.request({
					url: this.$serverUrl + '/Base_SysManage/Base_User/GetDataDetail?Id=' + id,
					success: (res) => {
						console.log(res);
						this.UserName = res.data.UserName;
						this.UserPic = res.data.HeadPic;
						this.RechargeLeftFee = res.data.RechargeLeftFee;
						this.IncomeFee = res.data.IncomeFee;
						this.StatementLeftFee = res.data.StatementLeftFee;
						this.ShopNum = res.data.ShopNum;
						this.UserNum = res.data.UserNum;
						this.ProductNum = res.data.ProductNum;
						var time = (res.data.CreateTime).trim().split(" ");
						this.CreateTime = time[0];
					},

				})
			},
			ToSetting() {
				uni.navigateTo({
					url: '../my/setting'
				})
			}
		}
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
		touch-action: pan-y;
	}

	body {
		background-color: #F6F6F6;
	}

	ul,
	li {
		list-style: none;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	a {
		text-decoration: none;
	}

	img {
		max-width: 100%;
		vertical-align: middle;
	}

	em {
		font-style: normal;
	}

	i {
		font-style: normal;
	}

	.my-content{
		padding: 10rpx;
		background-color: #efefef;
		height: 1000rpx;
	}

	.my-fl-three {
		height: 80px;
		background: #FFFFFF;
		width: 100%;
	}

	.my-fl-three ul {
		display: inline-block;
		float: left;
		width: 100%;
		height: 80px;
	}

	.my-fl-three ul li {
		display: inline-block;
		width: 33%;
		float: left;
		font-size: 12px;
		position: relative;
	}

	.my-fl-three ul li img {
		position: absolute;
		left: 50%;
		margin-left: -17px;
		top: 10px;
	}

	.my-fl-three ul li span {
		display: inline-block;
		width: 100%;
		text-align: center;
		margin-top: 50px;
	}

	.my-cont-wrap {
		width: 92%;
		float: left;
		margin-left: 4%;
		background: #FFFFFF;
		/* height: 216rpx; */
		border-radius: 10px;
		margin-top: 10px;
		padding-bottom: 14px;
	}

	.my-cont-title {
		width: 92%;
		margin-left: 4%;
		height: 20px;
		margin-top: 10px;
	}

	.my-cont-title label {
		display: inline-block;
		width: 6px;
		height: 14px;
		background: #b22420;
		margin-right: 4px;
		float: left;
		margin-top: 7px;

	}

	.my-cont-title-i {
		font-size: 14px;
		margin-left: 5px;
		color: #ed9795;
	}

	.my-wen-icon-rr {
		float: right;
		margin-top: 5px;
		margin-right: 20px;
	}

	.my-cont-title span {
		display: inline-block;
		font-size: 16px;
		float: left;
		margin-top: 3px;
	}

	.my-dl-wrap ul {
		width: 100%;
		float: left;
		margin-top: 22px;
	}

	.my-dl-wrap ul li {
		/* width: 33%; */
		float: left;
		text-align: center;
		height: 24px;
		font-size: 14px;
	}

	.my-dl-wrap ul li span {
		display: inline-block;
		background: #b22420;
		color: #FFFFFF;
		padding: 0 10px;
		border-radius: 4px;
		height: 24px;
		line-height: 24px;
	}

	.my-dl-three {
		width: 100%;
		float: left;
	}

	.my-three-ul {
		width: 100%;
		float: left;
		display: inline-block;
		margin-top: 20px;
	}

	.my-three-ul li {
		width: 33%;
		display: inline-block;
		float: left;
	}

	.my-three-ul li span {
		display: inline-block;
		width: 100%;
		float: left;
		font-size: 14px;
		color: #ed9795;
		text-align: center;
		margin-bottom: 4px;
		position: relative;
	}

	.my-three-ul li label {
		display: inline-block;
		width: 100%;
		float: left;
		text-align: center;
		font-size: 14px;
		color: #646464;
	}

	.my-three-ul .my-wen-icon {
		position: absolute;
		right: 14%;
	}

	.my-two-ul {
		width: 100%;
		float: left;
		display: inline-block;
		margin-top: 20px;
	}

	.my-two-ul li {
		width: 50%;
		display: inline-block;
		float: left;
	}

	.my-two-ul li span {
		display: inline-block;
		width: 100%;
		float: left;
		font-size: 14px;
		color: #ed9795;
		text-align: center;
		margin-bottom: 4px;
		position: relative;
	}

	.my-two-ul li label {
		display: inline-block;
		width: 100%;
		float: left;
		text-align: center;
		font-size: 14px;
		color: #646464;
	}

	.my-two-ul .my-wen-icon {
		position: absolute;
		right: 20%;
	}

	.my-one-ul {
		width: 100%;
		float: left;
		display: inline-block;
		margin-top: 20px;
	}

	.my-one-ul li {
		width: 100%;
		display: inline-block;
		float: left;
	}

	.my-one-ul li span {
		display: inline-block;
		width: 100%;
		float: left;
		font-size: 14px;
		color: #ed9795;
		text-align: center;
		margin-bottom: 4px;
		position: relative;
	}

	.my-one-ul li label {
		display: inline-block;
		width: 100%;
		float: left;
		text-align: center;
		font-size: 14px;
		color: #646464;
	}

	.my-one-ul .my-wen-icon {
		position: absolute;
		right: 20%;
	}

	.my-four-ul {
		width: 100%;
		float: left;
		display: inline-block;
		margin-top: 20px;
	}

	.my-four-ul li {
		width: 25%;
		display: inline-block;
		float: left;
	}

	.my-four-ul li span {
		display: inline-block;
		width: 100%;
		float: left;
		font-size: 14px;
		color: #ed9795;
		text-align: center;
		margin-bottom: 4px;
		position: relative;
	}

	.my-four-ul li label {
		display: inline-block;
		width: 100%;
		float: left;
		text-align: center;
		font-size: 14px;
		color: #646464;
	}

	.my-four-ul .my-wen-icon {
		position: absolute;
		right: 10%;
	}

	.my-sj-lx {
		width: 100%;
		height: 130px;
		float: left;
		background: #FFFFFF;
		margin-top: 10px;
	}

	.my-sj-lx-wrap {}

	.right-arrow {
		float: right;
		margin-top: 4px;
	}

	.my-sj-lxx {
		width: 92%;
		float: left;
		margin-left: 4%;
	}

	.my-sj-lxx view {
		font-size: 14px;
	}

	.my-dh {
		margin-top: 16px;
		margin-bottom: 10px;
	}

	.content {
		flex: 1;
		width: 750rpx;
		min-height: 100vh;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.my-header-wrap {
		width: 100%;
		height: 300rpx;
		background: url(/static/images/my-bg.jpg) no-repeat center;
		background-size: 100%;
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
	}

	.my-top-setting {
		text-align: right;
		padding: 10rpx 20rpx;
	}

	.my-tx-icon {
		text-align: center;
		margin-bottom: 10rpx;
	}

	.my-tx-icon img {
		border-radius: 50%;
		height: 150rpx;
	}

	.my-name {
		text-align: center;
		margin-bottom: 10rpx;
		color: #FFFFFF;
		font-size: 28rpx;
	}

	.my-time {
		text-align: center;
		margin-bottom: 10upx;
		color: #FFFFFF;
		font-size: 22rpx;
	}



	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36px;
		color: #8f8f94;
	}
</style>
