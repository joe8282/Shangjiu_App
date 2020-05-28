<template>
	<view class="body">
		<view class="head">
			<view class="bg">
				<view class="user">
					<view class="username">
						<span>{{ UserName }}</span>
						<span>{{ DepartmentName }}</span>
					</view>
					<view class="pic">
						<view>
							<img class="head_pic" :src="HeadPic" />
						</view>
					</view>
				</view>
				<view class="text">
					<span>{{ Introduce }}</span>
				</view>
			</view>
		</view>
		<view class="content">
			<h3>商号</h3>
			<view class="list" v-for="(item,index) in userList">
				<view class="content_area">
					<view class="pic_bg">
						<view class="c_pic">
							<image :src="item.HeadPic"></image>
						</view>
					</view>
					<view class="c_text">
						<span>{{ item.ShopTitle }}</span>
						<span>{{ item.ShopRemark }}</span>
						<span>
							<label>{{ item.ChannelName }}</label>
							<label>{{ item.TypeName }}</label>
							<label>{{ item.ClassName }}</label>
							<label>{{ item.City }} {{ item.Area }}</label>
						</span>
						<span>
							<label>{{ item.JoinWay }}</label>
							<label>红包（{{ item.HasReward }}）</label>
							<label>体验￥10000</label>
						</span>
					</view>
				</view>
			</view>
			
			
		</view>
	</view>
</template>
<script>
	export default {
		data(){
			return{
				userList:[],
				pagesize: 10,
				UserName:'',
				DepartmentName:'',
				Introduce:'',
				HeadPic:[],
			}
		},
		onLoad(){
			this.getUserData();
		},
		methods:{
			// 加载
			onReachBottom(){
				var newPageSize = this.pagesize += 8;
				var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
					// console.log(scrollTop);
					//可视区的高度
					var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
					// console.log(windowHeight);
					//滚动条的总高度
					var scrollHeight = (document.documentElement.scrollHeight||document.body.scrollHeight)-200;
					// console.log(scrollHeight);
				   //滚动条到底部的条件
				   if(scrollTop+windowHeight > scrollHeight){
					  
				
						//页数增加
						this.pagenum ++;
						
						uni.request({
							url:this.$serverUrl + '/Shop/Dev_Shop/GetDataList?Status=1&pageSize='+newPageSize+'&pageNumber=' + this.pagenum,
							success: (res) =>{
								this.getUserData();
								if(newPageSize > this.userList.length){
									this.loadingText = '没有更多了'
								}else{
									this.loadingText = '正在加载中......'
								}
								
							},
							
						})
					};
				
			},
			getUserData(){
				var getLocaUrl = document.location.href;
				var jqId = getLocaUrl.indexOf('1');
				var newId = getLocaUrl.substr(jqId);
				var newIds = newId.substring(0,19);
				uni.request({
					// url:this.$serverUrl + '/Base_SysManage/Base_User/GetDataDetail?Id=1133345545746780160',
					url:this.$serverUrl + '/Base_SysManage/Base_User/GetDataDetail?Id=' + newIds,
					success: (res) =>{
						this.UserName = res.data.UserName;
						this.DepartmentName = res.data.DepartmentName;
						this.Introduce = res.data.Introduce;
						this.HeadPic = res.data.HeadPic;
					}
				});
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_Shop/GetDataList?Status=1&pageSize='+ this.pagesize+'&pageNumber=' + this.pagenum,
					success: (res) =>{
						this.userList = res.data.rows;
						for ( var s = 0; s < res.data.rows.length; s ++ ) {
							if( res.data.rows[s].IsAd == 1 || res.data.rows[s].HasReward == 1 || res.data.rows[s].JoinWay == 1) {
								this.userList[s].IsAd = '是';
								this.userList[s].HasReward = '有';
								this.userList[s].JoinWay = '开放加入';
							} else if( res.data.rows[s].IsAd == 2 || res.data.rows[s].HasReward == 2 || res.data.rows[s].JoinWay == 2 ) {
								this.userList[s].IsAd = '否';
								this.userList[s].HasReward = '无';
								this.userList[s].JoinWay = '审核加入';
							} else if( res.data.rows[s].JoinWay == 3 ) {
								this.userList[s].JoinWay = '付费加入';
							}
						}
					}
				});
				
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
		font-size: 28rpx;
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
		font-size: 24rpx;
		color: #999999;
	}
	.c_text span:nth-child(3) label{
		padding-right: 50rpx;
	}
	.c_text span:nth-child(4){
		font-size: 24rpx;
		color: #B22420;
		font-weight: bold;
	}
	.c_text span:nth-child(4) label{
		display: inline-block;
		width: 33%;
	}
</style>
