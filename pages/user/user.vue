<template>
	<view class="body">
		<view class="head">
			<view class="bg">
				<view class="user">
					<view class="username">
						<span>爱吃面包的猫</span>
						<span>广东省广州市</span>
					</view>
					<view class="pic">
						<view>
							<image class="head_pic" src="../../static/images/hy_tx.png"></image>
						</view>
					</view>
				</view>
				<view class="text">
					<span>我叫张冲，是一名进城务工的农民工，今天我中午吃了一个馒头，太好吃了。但是我喜欢吃肉，我家里还有一只爱吃面包的猫</span>
				</view>
			</view>
		</view>
		<view class="content">
			<h3>商号</h3>
			<view class="list">
				<view class="content_area">
					<view class="pic_bg">
						<view class="c_pic">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
					</view>
					<view class="c_text">
						<span>这是一条标题啦啦啦啦啦啦</span>
						<span>这是一条内容啦啦啦啦啦啦213213213213123123123132213123123</span>
						<span>
							<label>身份</label>
							<label>类型</label>
							<label>行业</label>
							<label>区域</label>
						</span>
						<span>
							<label>免费加入</label>
							<label>红包（无）</label>
							<label>体验￥10000</label>
						</span>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="content_area">
					<view class="pic_bg">
						<view class="c_pic">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
					</view>
					<view class="c_text">
						<span>这是一条标题啦啦啦啦啦啦</span>
						<span>这是一条内容啦啦啦啦啦啦213213213213123123123132213123123</span>
						<span>
							<label>身份</label>
							<label>类型</label>
							<label>行业</label>
							<label>区域</label>
						</span>
						<span>
							<label>免费加入</label>
							<label>红包（无）</label>
							<label>体验￥10000</label>
						</span>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="content_area">
					<view class="pic_bg">
						<view class="c_pic">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
					</view>
					<view class="c_text">
						<span>这是一条标题啦啦啦啦啦啦</span>
						<span>这是一条内容啦啦啦啦啦啦213213213213123123123132213123123</span>
						<span>
							<label>身份</label>
							<label>类型</label>
							<label>行业</label>
							<label>区域</label>
						</span>
						<span>
							<label>免费加入</label>
							<label>红包（无）</label>
							<label>体验￥10000</label>
						</span>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	
</script>

<style>
	.body{
		width: 100%;
		height: 100%;
		background-color: #EDEDED;
	}
	.head{
		width: 100%;
		height: 400rpx;
		background-color: white;
	}
	.bg{
		width: 92%;
		height: 100%;
		margin: 0 auto;
	}
	.user{
		height: 60%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.username{
		width: 50%;
		height: 100%;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.username span:first-child{
		font-size: 38rpx;
		font-weight: 400;
	}
	.username span:nth-child(2){
		font-size: 30rpx;
		padding-top: 20rpx;
		color: #646464;
	}
	.username label{
		padding-left: 15rpx;
		padding-right: 15rpx;
	}
	.pic{
		width: 50%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.pic view{
		width: 55%;
		height: 185rpx;
	}
	.head_pic{
		width: 100%;
		height: 100%;
	}
	.text{
		height: 40%;
	}
	.text span{
		font-size: 28rpx;
		color: #646464;
		line-height: 20rpx;
	}
	.content{
		widows: 100%;
		height: 100%;
		margin-top: 20rpx;
		background-color: white;
	}
	h3{
		padding: 10rpx 0 0 40rpx;
		font-weight: 500;
		color: #B22420;
		font-size: 36rpx;
	}
	.list{
		width: 100%;
		height: 200rpx;
		border-bottom: 1px solid #F1F1F1;
	}
	.content_area{
		width: 96%;
		height: 100%;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.pic_bg{
		width: 25%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.c_pic{
		width: 80%;
		height: 70%;
	}
	.c_pic image{
		width: 100%;
		height: 100%;
	}
	.c_text{
		width: 75%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* align-items: center; */
	}
	.c_text span:first-child{
		font-size: 36rpx;
		color: #2C2C2C;
		font-weight: 500;
	}
	.c_text span:nth-child(2){
		font-size: 28rpx;
		color: #646464;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.c_text span:nth-child(3){
		font-size: 28rpx;
		color: #999999;
	}
	.c_text span:nth-child(3) label{
		padding-right: 50rpx;
	}
	.c_text span:nth-child(4){
		font-size: 28rpx;
		color: #B22420;
		font-weight: 700;
	}
	.c_text span:nth-child(4) label{
		display: inline-block;
		width: 33%;
	}
</style>
