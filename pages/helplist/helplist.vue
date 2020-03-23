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
				<view class="list" v-for="(item , index) in allList">
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
	import uniFav from "@/components/uni-fav/uni-fav.vue"
	export default {
		components: {
			uniFav,
		},
		data() {
			return {
									
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
				zixun: [],
				zhishi: [],
				xiuchang: [],
				qita: []

			};
		},
	
		onLoad(options) {
			// 页面显示是默认选中第一个
			this.tabCurrentIndex = 0;
			this.getData();
			this.getDaraList();
			setTimeout(function () {
			}, 1000);
			uni.startPullDownRefresh();
		},
		onPullDownRefresh() {
	        setTimeout(function () {
	            uni.stopPullDownRefresh();
	        }, 1000);
	    },
		
		methods: {
			
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
					// url:this.$serverUrl + '/Help/Dev_Help/GetDataList?TypeId=' + TypeId + '&Status=' + Status,
					url:this.$serverUrl + '/Help/Dev_Help/GetDataList?Status=1',
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
						
						
						
						
					}
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
