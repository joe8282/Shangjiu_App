<template>
	<view>
		<!-- tab nav-->
		<!-- <view class="navbar1"> -->
		<view class="navbar fx-navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
				<span>{{ item.text }}</span>
			</view>
		</view>
		<!-- tab 显示区域 -->
		<view class="all-arr">
			<view class="showArea" v-show="tabCurrentIndex === 0">
				
				<!-- <view class="list" v-for="(item , index) in allList">
					<navigator class="list_content">
						<view class="word">
							<p>{{ item.HelpTitle }}</p>
							<span><b>{{ item.CreateTime }}</b><b>{{ item.TypeName }}</b></span>
						</view>
						<view class="pic">
							<span></span>
							<img :src="item.HelpPic" />
						</view>
					</navigator>
				</view> -->
				<view class="n_indent list" v-for="(item,index) in allList" :key="index" :pageSize="10">
		            <navigator :url="'../help/help?id=' + item.Id " class="list_content" >
						<view class="word">
							<p>{{ item.HelpTitle }}</p>
							<span><b>{{ item.CreateTime }}</b><b>{{ item.TypeName }}</b></span>
						</view>
						<view class="pic-imgs">
							<span></span>
							<img :src="item.HelpPic" />
						</view>
					</navigator>
		        </view>
		        <view class="loading_text">
		            <text>{{loadingText}}</text>
		        </view>
				
				
			</view>
			<view  v-show="tabCurrentIndex === 1">
				<view class="list" v-for="(item , index) in zixun">
					<navigator url="../help/help" class="list_content">
						<view class="word">
							<p>{{ item.HelpTitle }}</p>
							<span><b>{{ item.CreateTime }}</b><b>{{ item.TypeName }}</b></span>
						</view>
						<view class="pic">
							<span></span>
							<img :src="item.HelpPic" />
						</view>
					</navigator>
				</view>
			</view>
			<view  v-show="tabCurrentIndex === 2">
				<view class="list" v-for="(item , index) in zhishi">
					<navigator url="../help/help" class="list_content">
						<view class="word">
							<p>{{ item.HelpTitle }}</p>
							<span><b>{{ item.CreateTime }}</b><b>{{ item.TypeName }}</b></span>
						</view>
						<view class="pic">
							<span></span>
							<img :src="item.HelpPic" />
						</view>
					</navigator>
				</view>
			</view>
			<view  v-show="tabCurrentIndex === 3">
				<view class="list" v-for="(item , index) in xiuchang">
					<navigator url="../help/help" class="list_content">
						<view class="word">
							<p>{{ item.HelpTitle }}</p>
							<span><b>{{ item.CreateTime }}</b><b>{{ item.TypeName }}</b></span>
						</view>
						<view class="pic">
							<span></span>
							<img :src="item.HelpPic" />
						</view>
					</navigator>
				</view>
			</view>
			<view  v-show="tabCurrentIndex === 4">
				<view class="list" v-for="(item , index) in qita">
					<navigator url="../help/help" class="list_content">
						<view class="word">
							<p>{{ item.HelpTitle }}</p>
							<span><b>{{ item.CreateTime }}</b><b>{{ item.TypeName }}</b></span>
						</view>
						<view class="pic">
							<span></span>
							<img :src="item.HelpPic" />
						</view>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import 'pages/helplist/helplist.css';
	import uniFav from "@/components/uni-fav/uni-fav.vue";
	import wsLoadMore from '@/components/wsure-load-more/load-more.vue';
	export default {
		components: {
			uniFav,
			wsLoadMore
		},
		data() {
			return {
				pagesize: 10,
				pre:'item',
				failFlag:true,
				count:0,
									
				tabCurrentIndex: 0,
				navList: [
					{
						state: 0,
						text: '全部',
					},
					{
						state: 1,
						text: '文章',
					},
					{
						state: 2,
						text: '资讯',
					},
					{
						state: 3,
						text: '热点',
					},
					{
						state: 4,
						text: '新闻',
					}
				],
				allList: [],
				items: [],
				zixun: [],
				zhishi: [],
				xiuchang: [],
				qita: [],
				loadingText:'正在加载....'

			};
		},
	
		onLoad(options) {
			// 页面显示是默认选中第一个
			this.tabCurrentIndex = 0;
			this.getData();
			this.getDaraList();
		
		},
		// 下拉刷新
		onPullDownRefresh(){
			console.log('刷新中');
			setTimeout(function(){
				uni.stopPullDownRefresh();
				console.log("OK了")
			},2000)
		},
		
		
		methods: {		
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
							url:this.$serverUrl + '/Help/Dev_Help/GetDataList?Status=1&pageSize='+newPageSize+'&pageNumber=' + this.pagenum,
							success: (res) =>{
								this.allList = res.data.rows;
								if(newPageSize > this.allList.length){
									this.loadingText = '没有更多了'
								}else{
									this.loadingText = '正在加载中......'
								}
								
							},
							
						})
					};
					
					
					
				
				
				
				
				
				
			},
			// 接口调取
			getData() {
				uni.request({
					url:this.$serverUrl + '/Help/Dev_HelpType/GetDataList_NoPagin',
					success: (res) =>{
						this.navList[1].text = res.data[0].Name
						this.navList[2].text = res.data[1].Name
						this.navList[3].text = res.data[2].Name
						this.navList[4].text = res.data[3].Name
					}
				})
			},
			getDaraList() {
				uni.request({
					url:this.$serverUrl + '/Help/Dev_Help/GetDataList?Status=1&pageSize='+ this.pagesize+'&pageNumber=' + this.pagenum,
					success: (res) =>{
						var zixunList = res.data.rows.filter(function (e) { return e.TypeName == '资讯'; });
						var zhishiList = res.data.rows.filter(function (e) { return e.TypeName == '知识'; });
						var xiuchangList = res.data.rows.filter(function (e) { return e.TypeName == '秀场'; });
						var qitaList = res.data.rows.filter(function (e) { return e.TypeName == '其他'; });
						this.allList = res.data.rows;
						this.zixun = zixunList;
						this.zhishi = zhishiList;
						this.xiuchang = xiuchangList;
						this.qita = qitaList;
						// console.log(res.data.rows)
						
					},
					
				})
			},
			
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			}
			
			
			
		}
	}
</script>

<style>
</style>
