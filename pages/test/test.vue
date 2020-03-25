<template>
    <scroll-view scroll-y="true"  class="content">

<!-- 遍历自己自定义的数据 items -->
        <view class="n_indent" v-for="(item,index) in items" :key="index">
            <view class="head_time">
                <text>{{item.list.time}}</text>
            </view>
            <view class="n_content">
                <view class="n_h1">
                    <text>{{item.list.delivery}}</text>
                </view>
                <view class="n_p">
                    <text>你在 [{{item.list.text}}] 下的订单已送达出。（点击查看详情） </text>
                </view>
            </view>
        </view>
        <view class="loading_text">
            <text>{{loadingText}}</text>
        </view>
    </scroll-view>
</template>

<script>
	import wsLoadMore from '@/components/wsure-load-more/load-more.vue';
 
	export default {
		components:{
			wsLoadMore
		},
		data() {
			return {
				pre:'item',
				failFlag:false,
				count:0,
				items:[
					{
						id:1,
						list:{
							time:'11:21',
							delivery:'您的商品已送出',
							text:'杨铭宇黄焖鸡米饭（广埠屯店）'
						}
					},
					{
						id:2,
						list:{
							time:'10:56',
							delivery:'您的订单已接单',
							text:'杨铭宇黄焖鸡米饭（广埠屯店）'
						}
					},
					{
						id:3,
						list:{
							time:'昨天11:44',
							delivery:'您的订单已送达',
							text:'杨铭宇黄焖鸡米饭（广埠屯店）'
						}
					},
					{
						id:4,
						list:{
							time:'昨天11:17',
							delivery:'您的商品已送出',
							text:'老韩煸鸡（武大店）'
						}
					},
					{
						id:5,
						list:{
							time:'昨天11:00',
							delivery:'您的商品已接单',
							text:'杨铭宇饭（街道口店）'
						}
					}
				],
				loadingText:'正在加载...'
			}
		},
		onLoad:function(option){
			// 进入页面 加载数据
			setTimeout(function(){
				console.log('刷新成功')
			},2000);
			uni.startPullDownRefresh({
				success:function(red) {
					console.log(red);
				}
			})
		},
		
		// 下拉刷新
		onPullDownRefresh(){
			console.log('刷新中');
			setTimeout(function(){
				uni.stopPullDownRefresh();
				console.log("OK了")
			},2000)
		},
		
		// 上拉加载
		onReachBottom(){
			// 自己模拟数据  后期开发ajax请求数据
			if(this.items.length > 40){
				this.loadingText = '我是有底线的';
				return false;
			}
			var len = this.items.length;
			for(var i =1; i < 10 ; i++){
				var id = this.items[len - 1].id + i ;
				var  p = {
					id: id,
					list:{
						time:'昨天11:00',
						delivery:'您的商品已接单',
						text:'杨铭宇饭（街道口店）'
					}
				}
				this.items.push(p);
			}
		},
		
		methods:{
			
		}
	}
</script>
<style lang="scss">
	page{background-color: #f6f5f5; }
	
	.content {
		.n_indent {
			margin-top: 30upx;
			&:first-child {
				margin-top: 0;
			}
			.head_time {
				color: #969696;
				display: flex;
				justify-content: center;
				padding: 30upx 0;
				font-size: 20upx;
			}
			.n_content {
				background-color: #fff;
				padding: 34upx 63upx 34upx 34upx;
				font-size: 34upx;
				.n_h1 {
					margin-bottom: 20upx;
					font-weight: 700;
				}
				.n_p {
					color: #969696;
					font-size: 20upx;
				}
			}
			
		}
		.loading_text {
			display: flex;
			justify-content: center;
			font-size: 20upx;
			margin: 48upx 0 30upx;
			color: #979797;
		}
	}
</style>