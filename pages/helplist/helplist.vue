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
				<view class="list" v-for="all in allList">
					<navigator url="../help/help" class="list_content">
						<view class="word">
							<p>{{ all.title }}</p>
							<span><b>{{ all.time }}</b><b>{{ all.leixing }}</b></span>
						</view>
						<view class="pic">
							<span></span>
							<img :src="all.img" />
						</view>
					</navigator>
				</view>
			</view>
			<view  v-show="tabCurrentIndex === 1">
				<view class="list" v-for="ZiXun in ZiXunList">
					<navigator url="../help/help" class="list_content">
						<view class="word">
							<p>{{ ZiXun.title }}</p>
							<span><b>{{ ZiXun.time }}</b><b>{{ ZiXun.leixing }}</b></span>
						</view>
						<view class="pic">
							<span></span>
							<img :src="ZiXun.img" />
						</view>
					</navigator>
				</view>
			</view>
			<view  v-show="tabCurrentIndex === 2">
				<view class="list" v-for="zhishi in zhishiList">
					<navigator url="../help/help" class="list_content">
						<view class="word">
							<p>{{ zhishi.title }}</p>
							<span><b>{{ zhishi.time }}</b><b>{{ zhishi.leixing }}</b></span>
						</view>
						<view class="pic">
							<span></span>
							<img :src="zhishi.img" />
						</view>
					</navigator>
				</view>
			</view>
			<view  v-show="tabCurrentIndex === 3">
				<view class="list" v-for="xiuchang in xiuchangList">
					<navigator url="../help/help" class="list_content">
						<view class="word">
							<p>{{ xiuchang.title }}</p>
							<span><b>{{ xiuchang.time }}</b><b>{{ xiuchang.leixing }}</b></span>
						</view>
						<view class="pic">
							<span></span>
							<img :src="xiuchang.img" />
						</view>
					</navigator>
				</view>
			</view>
			<view  v-show="tabCurrentIndex === 4">
				<view class="list" v-for="qita in qitaList">
					<navigator url="../help/help" class="list_content">
						<view class="word">
							<p>{{ qita.title }}</p>
							<span><b>{{ qita.time }}</b><b>{{ qita.leixing }}</b></span>
						</view>
						<view class="pic">
							<span></span>
							<img :src="qita.img" />
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
			uniFav
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
				allList: [
					{
						title: '11',
						time: '22',
						leixing: '33',
						img: ''
					}
				],
				ZiXunList: [
					{
						title: '11',
						time: '22',
						leixing: '33',
						img: ''
					}
				],
				zhishiList: [
					{
						title: '11',
						time: '22',
						leixing: '33',
						img: ''
					}	
				],
				xiuchangList: [
					{
						title: '11',
						time: '22',
						leixing: '33',
						img: ''
					}	
				],
				qitaList: [
					{
						title: '11',
						time: '22',
						leixing: '33',
						img: ''
					}	
				]
			};
		},
	
		onLoad(options) {
			// 页面显示是默认选中第一个
			this.tabCurrentIndex = 0;
			this.getData();
			this.getDaraList();
			
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
					url:this.$serverUrl + '/Help/Dev_Help/GetDataList',
					success: (res) =>{
						// all
						// var all = res.data.rows.filter(function (e) { return e.TypeName == '资讯'; });
						for ( var a = 0; a < res.data.rows.length; a ++ ) {
							console.log(a)
							var allLeixing = res.data.rows[a].TypeName,
								allHelpTitle = res.data.rows[a].HelpTitle,
								allPic = res.data.rows[a].HelpPic,
								allCreateTime = res.data.rows[a].CreateTime, //获取时间
								allTime = allCreateTime.substring(0,10); //截取后的时间
							this.allList[a].title = allHelpTitle;
							this.allList[a].leixing = allLeixing;
							this.allList[a].img = allPic;
							this.allList[a].time = allTime;
							this.allList.push(res.data.rows[a])
						}
						// 资讯
						var zixun = res.data.rows.filter(function (e) { return e.TypeName == '资讯'; });
						for ( var i = 0; i < zixun.length; i ++ ) {
							var ZxLeixing = zixun[i].TypeName,
								ZxHelpTitle = zixun[i].HelpTitle,
								ZxPic = zixun[i].HelpPic,
								ZxCreateTime = zixun[i].CreateTime, //获取时间
								ZxTime = ZxCreateTime.substring(0,10); //截取后的时间
							
							
							this.ZiXunList[i].title = ZxHelpTitle;
							this.ZiXunList[i].leixing = ZxLeixing;
							this.ZiXunList[i].img = ZxPic;
							this.ZiXunList[i].time = ZxTime;
							this.ZiXunList.push(zixun[i])
						}
						
						// 知识
						var zhishi = res.data.rows.filter(function (e) { return e.TypeName == '知识'; });
						for ( var z = 0; z < zhishi.length; z ++ ) {
						
							var ZSLeixing = zhishi[z].TypeName,
								ZSHelpTitle = zhishi[z].HelpTitle,
								ZSPic = zhishi[z].HelpPic,
								ZSCreateTime = zhishi[z].CreateTime, //获取时间
								ZSTime = ZSCreateTime.substring(0,10); //截取后的时间
							
							
							this.zhishiList[z].title = ZSHelpTitle;
							this.zhishiList[z].leixing = ZSLeixing;
							this.zhishiList[z].img = ZSPic;
							this.zhishiList[z].time = ZSTime;
							this.zhishiList.push(zhishi[z])
						}
						// 秀场
						var xiuchang = res.data.rows.filter(function (e) { return e.TypeName == '秀场'; });
						for ( var x = 0; x < xiuchang.length; x ++ ) {
							var XCLeixing = xiuchang[x].TypeName,
								XCHelpTitle = xiuchang[x].HelpTitle,
								XCPic = xiuchang[x].HelpPic,
								XCCreateTime = xiuchang[x].CreateTime, //获取时间
								XCTime = XCCreateTime.substring(0,10); //截取后的时间
							
							
							this.xiuchangList[x].title = ZSHelpTitle;
							this.xiuchangList[x].leixing = ZSLeixing;
							this.xiuchangList[x].img = ZSPic;
							this.xiuchangList[x].time = ZSTime;
							this.xiuchangList.push(xiuchang[x])
						}
						
						// 其他
						var qita = res.data.rows.filter(function (e) { return e.TypeName == '其他'; });
						for ( var q = 0; q < qita.length; q ++ ) {
							var QTLeixing = qita[x].TypeName,
								QTCHelpTitle = qita[x].HelpTitle,
								QTPic = qita[x].HelpPic,
								QTCreateTime = qita[x].CreateTime, //获取时间
								QTTime = QTCreateTime.substring(0,10); //截取后的时间
							
							
							this.qitaList[x].title = QTHelpTitle;
							this.qitaList[x].leixing = QTLeixing;
							this.qitaList[x].img = QTPic;
							this.qitaList[x].time = QTTime;
							this.qitaList.push(qita[x])
							console.log(xiuchang[z])
						}
						
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
