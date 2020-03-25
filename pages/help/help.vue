<template>
	<view class="body">
		<view class="head">
			<view class="bg">
				<image :src="HelpPic"></image>
			</view>
			<view class="title">
				<h1>{{HelpTitle}}</h1>
				<view class="time"><span>{{CreateTime}}</span><span>类型</span></view>
				<view class="count">
					<span>评论 {{CommentNum}}</span>
					<span>人气 {{ClickNum}}</span>
					<span>收藏 {{CollectNum}}</span>
					<span>打赏 {{RewardFee}}</span>
					<span>点赞 {{GoodNum}}</span>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="text-area">
				<span>{{HelpContent}}</span>
				<view class="pic"><image :src="HelpPic"></image></view>
					
						
			</view>
		</view>
		<view class="comment">
			<h3>所有评论<span>9999</span></h3>
			<view class="comment_area">
				<view class="comment_list">
					<view class="user">
						<view class="tx"><image src="../../static/images/fx_tx.png"></image></view>
						<span>商九管理员</span>
					</view>
					<view class="comment_text">
						<span>这篇文章写的挺好的，非常实用，也让我感觉商九这个平台是真的不错。</span>
					</view>
					<view class="comment_pic">
						<view class="pic_list">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
						<view class="pic_list">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
						<view class="pic_list">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
						<view class="pic_list">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
						<view class="pic_list">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
					</view>
					<view class="comment_count">
						<span class='ly_time'>2019-09-15</span>
						<view class="ly">
							<view><image src="../../static/images/fx_ly.png"></image></view>
							<span>9999</span>
						</view>
						<view class="dz">
							<view><image src="../../static/images/fx_dz.png"></image></view>
							<span>9999</span>
						</view>
					</view>
				</view>
			</view>
			<view class="comment_area">
				<view class="comment_list">
					<view class="user">
						<view class="tx"><image src="../../static/images/fx_tx.png"></image></view>
						<span>商九管理员</span>
					</view>
					<view class="comment_text">
						<span>这篇文章写的挺好的，非常实用，也让我感觉商九这个平台是真的不错。</span>
					</view>
					<view class="comment_pic">
						<view class="pic_list">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
						<view class="pic_list">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
						<view class="pic_list">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
						<view class="pic_list">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
						<view class="pic_list">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
					</view>
					<view class="comment_count">
						<span class='ly_time'>2019-09-15</span>
						<view class="ly">
							<view><image src="../../static/images/fx_ly.png"></image></view>
							<span>9999</span>
						</view>
						<view class="dz">
							<view><image src="../../static/images/fx_dz.png"></image></view>
							<span>9999</span>
						</view>
					</view>
				</view>
			</view>
			<view class="comment_area">
				<view class="comment_list">
					<view class="user">
						<view class="tx"><image src="../../static/images/fx_tx.png"></image></view>
						<span>商九管理员</span>
					</view>
					<view class="comment_text">
						<span>这篇文章写的挺好的，非常实用，也让我感觉商九这个平台是真的不错。</span>
					</view>
					<view class="comment_pic">
						<view class="pic_list">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
						<view class="pic_list">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
						<view class="pic_list">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
						<view class="pic_list">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
						<view class="pic_list">
							<image src="../../static/images/fx_pl.png"></image>
						</view>
					</view>
					<view class="comment_count">
						<span class='ly_time'>2019-09-15</span>
						<view class="ly">
							<view><image src="../../static/images/fx_ly.png"></image></view>
							<span>9999</span>
						</view>
						<view class="dz">
							<view><image src="../../static/images/fx_dz.png"></image></view>
							<span>9999</span>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import 'pages/help/help.css';
	export default {
		data(){
			return{
				HelpPic: '',
				HelpTitle: '',
				CreateTime: '',
				CommentNum: '',
				ClickNum: '',
				CollectNum: '',
				RewardFee: '',
				GoodNum: '',
				HelpContent: ''
			}
		},
		onLoad(){
			this.GetDataDetail()
			
		},
		methods: {
			GetDataDetail(){
				var getLocaUrl = document.location.href;
				var jqId = getLocaUrl.indexOf('1');
				var newId = getLocaUrl.substr(jqId);
				uni.request({
					url:this.$serverUrl + '/Help/Dev_Help/GetDataDetail?id=' + newId,
					success: (res) =>{
						console.log(res)
						this.HelpPic = res.data.HelpPic;
						this.HelpTitle = res.data.HelpTitle;
						this.CreateTime = res.data.CreateTime;
						this.CommentNum = res.data.CommentNum;
						this.ClickNum = res.data.ClickNum;
						this.CollectNum = res.data.CollectNum;
						this.RewardFee = res.data.RewardFee;
						this.GoodNum = res.data.GoodNum;
						this.HelpContent = res.data.HelpContent;
						
						
					},
					
				})
			}
		}
	}
</script>

<style>
</style>
