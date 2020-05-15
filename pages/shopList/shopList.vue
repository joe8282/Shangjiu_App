<template>
	<view class="content" id="app">
		<view class="text-area">
			<view class="main-header-wrap">
				<view class="uni-form-item uni-column">
					<img src="static/images/search.png" alt="" class="search-icon-img" />
					<input class="uni-input"  placeholder="      输入商号相关信息" />
				</view>
				<img src="static/images/news.png" alt="" class="main-header-news-icon" />
			</view>
			<view class="swiper-wrap">
				<uni-swiper-dot :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
					<swiper class="swiper-box" @change="change">
						<swiper-item v-for="(item, index) in info" :key="index">
							<view :class="item.colorClass" class="swiper-item">
								<image class="image" :src="item.url" mode="aspectFill" width="100%" />
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>
			<view class="productList-slider-wrap">
				<view class="productList-slider-three">
					<view class="productList-ssthree">
						<img src="static/images/all1.png" alt="" />
						<span>全部</span>
					</view>
					<view class="productList-ssthree">
						<img src="static/images/all2.png" alt="" />
						<span>免费</span>
					</view>
					<view class="productList-ssthree">
						<img src="static/images/all3.png" alt="" />
						<span>付费</span>
					</view>
					<view class="productList-ssthree">
						<img src="static/images/all4.png" alt="" />
						<span>红包</span>
					</view>
				</view>
				<view class="productList-slider-toggle">
					<ms-dropdown-menu>
						<ms-dropdown-item v-model="value1" :list="sflist"></ms-dropdown-item>
						<ms-dropdown-item v-model="value1" :list="lxlist"></ms-dropdown-item>
						<ms-dropdown-item v-model="value1" :list="hylist"></ms-dropdown-item>
						<ms-dropdown-item v-model="value1" :list="pxlist"></ms-dropdown-item>
						
					</ms-dropdown-menu>
				</view>
			</view>
			<view class="productlist-hh-wrap">
				<view class="productlist-hh-list" v-for="(item,index) in shopList" :key="index">
					<navigator :url="'../shopdetail/shopdetail?id=' + item.Id + '&UserId=' + item.UserId" class="list_content">
						<view class="small-tab">
							<view class="main-tab-nr">
								<img :src="item.ShopPic" alt="" class="main-tab-img" />
								<view class="main-tab-right">
									<span class="main-tab-r-title">{{ item.ShopTitle }}</span>
									<label class="main-tab-r-ddd">{{ item.ShopContent }}</label>
									<ul class="main-four-ul">
										<li>{{ item.ChannelName }}</li>
										<li>{{ item.TypeName }}</li>
										<li>{{ item.ClassName }}</li>
										<li>{{ item.City }}-{{ item.Area }}</li>
										<span class="dysf-style" id="joinway">{{ item.JoinWay }}</span>
									</ul>
								</view>
							</view>
						</view>
					</navigator>
				</view>
			</view>
			
			
		</view>
		
	
	</view>
	
</template>

<script>
	import 'pages/shopList/shopList.css';
	import uniSection from '@/components/uni-section/uni-section.vue';
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue";
	import uniFav from "@/components/uni-fav/uni-fav.vue"
	import msDropdownMenu from '@/components/ms-dropdown/dropdown-menu.vue'
	import msDropdownItem from '@/components/ms-dropdown/dropdown-item.vue'
	export default {
		components: {
			uniFav,
			uniSection,
			uniSwiperDot,
			msDropdownMenu,
			msDropdownItem
		},
		data() {
			return {
				sflist: [
					{
						text: '111',
						value: 0
					}
				],
				lxlist: [
					{
						text: '111',
						value: 0
					}
				],
				hylist: [
					{
						text: '111',
						value: 0
					}
				],
				pxlist: [
					{
						text: '升序',
						value: 0
					},
					{
						text: '升序',
						value: 1
					},
					{
						text: '降序',
						value: 2
					}
				],
				value1: 0,
				value2: 1,
				value3: 'init',
				
				shopList:[],
				shenfen:[],
				hangye:[],
				leixing:[],
				sss:false,
				rotate: false,
				rotate1: false,
				rotate2: false,
				rotate3: false,
				info: [{
						colorClass: 'uni-bg-red',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
						content: '内容 A'
					},
					{
						colorClass: 'uni-bg-green',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
						content: '内容 B'
					},
					{
						colorClass: 'uni-bg-blue',
						url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
						content: '内容 C'
					}
				],
				dotStyle: [{
						backgroundColor: 'rgba(0, 0, 0, .3)',
						border: '1px rgba(0, 0, 0, .3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
						selectedBorder: '1px rgba(0, 0, 0, .9) solid'
					},
					{
						backgroundColor: 'rgba(255, 90, 95,0.3)',
						border: '1px rgba(255, 90, 95,0.3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
						selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
					},
					{
						backgroundColor: 'rgba(83, 200, 249,0.3)',
						border: '1px rgba(83, 200, 249,0.3) solid',
						color: '#fff',
						selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
						selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
					}
				],
				modeIndex: -1,
				styleIndex: -1,
				current: 0,
				mode: 'default',
				dotsStyles: {}
				　
				

			}
		},
		onLoad() {
			this.getShopListData();
			this.getShopAddData();
		},
		methods: {
			choose() {
				let obj = {
					value: 'Name'
				}
				this.$refs.dropdownItem.choose(obj)
			},
			close() {
				this.$refs.dropdownItem.closePopup()
			},
			
			
			
			getShopAddData(){
				uni.request({
					url:this.$serverUrl + '/SystemManage/Dev_Type/GetDataList_NoPagin?parentId=1206262951519064064',
					success: (res) =>{
						var arr = ['a','b','c','d'];
						arr.splice(1,1);
						console.log(arr)
						for( var i = 0; i <res.data.length; i++ ){
							this.shenfen = res.data;
							var sfName = res.data[i].Name;
							var sfId = res.data[i].Id;
							this.sflist[0].text = res.data[0].Name;
							this.sflist.push({
								text: sfName,
								value: sfId
							})
							
							
						}
					}
				});
				
				uni.request({
					url:this.$serverUrl + '/SystemManage/Dev_Type/GetDataList_NoPagin?parentId=1204236610573570048',
					success: (res) =>{
						for( var h = 0; h <res.data.length; h++ ){
							this.hangye = res.data
							var hyName = res.data[h].Name;
							var hyId = res.data[h].Id;
							this.hylist[0].text = res.data[0].Name;
							this.hylist.push({
								text: hyName,
								value: hyId
							})
						}
					}
				});
				uni.request({
					url:this.$serverUrl + '/SystemManage/Dev_Type/GetDataList_NoPagin?parentId=1204236075598483456',
					success: (res) =>{
						for( var l = 0; l <res.data.length; l++ ){
							this.leixing = res.data
							var lxName = res.data[l].Name;
							var lxId = res.data[l].Id;
							this.lxlist[0].text = res.data[0].Name;
							this.lxlist.push({
								text: lxName,
								value: lxId
							})
						}
					}
				});
			},
			getShopListData(){
				var desc = desc
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_Shop/GetDataList',
					data: {
						// SortType: desc
						
					},
					success: (res) =>{
						this.shopList = res.data.rows;
						for ( var j = 0; j < this.shopList.length; j ++ ) {
							if( res.data.rows[j].JoinWay == 1 ) {
								this.shopList[j].JoinWay = '开放加入'
							} else if( res.data.rows[j].JoinWay == 2 ) {
								this.shopList[j].JoinWay = '审核加入'
							} else if ( res.data.rows[j].JoinWay == 3 ){
								this.shopList[j].JoinWay = '付费加入'
							}
						}
						
						
					},
					
				})
			},
			
			
			change(e) {
				this.current = e.detail.current
			},
			selectStyle(index) {
				this.dotsStyles = this.dotStyle[index]
				this.styleIndex = index
			},
			selectMode(mode, index) {
				this.mode = mode
				this.modeIndex = index
				this.styleIndex = -1
				this.dotsStyles = this.dotStyle[0]
			},
			sliderToggle() {
			    if(this.rotate == false){
			        document.getElementById("hideshow-slider").style.height="auto"
					this.rotate = !this.rotate;
			    }else{
			        document.getElementById("hideshow-slider").style.height="24px"
					this.rotate = !this.rotate;
			    }
			},
			sliderToggle1() {
			    if(this.rotate1 == false){
			        document.getElementById("hideshow-slider1").style.height="auto"
					this.rotate1 = !this.rotate1;
			    }else{
			        document.getElementById("hideshow-slider1").style.height="24px"
					this.rotate1 = !this.rotate1;
			    }
			},
			sliderToggle2() {
			    if(this.rotate2 == false){
			        document.getElementById("hideshow-slider2").style.height="auto"
					this.rotate2 = !this.rotate2;
			    }else{
			        document.getElementById("hideshow-slider2").style.height="24px"
					this.rotate2 = !this.rotate2;
			    }
			},
			sliderToggle3() {
			    if(this.rotate3 == false){
			        document.getElementById("hideshow-slider3").style.height="auto"
					this.rotate3 = !this.rotate3;
			    }else{
			        document.getElementById("hideshow-slider3").style.height="24px"
					this.rotate3 = !this.rotate3;
			    }
			}
		}
	}
</script>
<style lang="scss">
.dropdown-item-content {
	padding: 20rpx;
}
.dropdown-item-content .btn{
	background: #F00000;
	background: #007aff;
	color: #fff;
	padding: 20rpx;
	display: inline-block;
	border-radius: 10rpx;
}
.dropdown-item-title {
	display: flex;
	
}
.dropdown-item-title .title {
	color: red;
}
.dropdown-item-title .btn {
	font-size: 24rpx;
	background: #F00000;
	background: #007aff;
	color: #fff;
	padding: 10rpx;
	display: inline-block;
	border-radius: 10rpx;
}
	
</style>

