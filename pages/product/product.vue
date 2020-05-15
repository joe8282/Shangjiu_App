<template>
	<view class="content">
		<view class="shop-banner-cont">
			<img :src="ProductPic" width="100%">
		</view>
		<view class="shop-title-wrap">
			<view class="shop-title-cont">
				<view class="shop-title-ctitle">{{ProductTitle}}<span style="opacity: 0;" id="shopIDs">{{shopIDs}}</span></view>
				<view class="shop-tx-time-cont">
					<img src="static/images/my-tx.png" alt="" width="23"/>
					<span>{{UserName}}</span>
					<label>{{CreateTime}}</label>
				</view>
				<view class="shop-ullist">
					<span>{{ChannelName}}</span>
					<span>{{TypeName}}</span>
					<span>{{ClassName}}</span>
					<span>{{City}}-{{Area}}</span>
					
				</view>
				<view class="shop-ullist-red">
					<span>{{JoinWay}}</span>
					<span>推广（{{IsAd}}）</span>
					<span>红包（{{HasReward}}）</span>
				</view>
				<view class="shop-ullist-ten">
					<view class="shop-ullist-ll">
						<span>评论</span>
						<label>{{CommentNum}}</label>
					</view>
					<view class="shop-ullist-ll">
						<span>人气</span>
						<label>{{ClickNum}}</label>
					</view>
					<view class="shop-ullist-ll">
						<span>收藏</span>
						<label>{{CollectionNum}}</label>
					</view>
					<view class="shop-ullist-ll">
						<span>打赏</span>
						<label>{{GetRewardFee}}</label>
					</view>
					<view class="shop-ullist-ll">
						<span>点赞</span>
						<label>{{GoodNum}}</label>
					</view>
				</view>
			</view>
		</view>
		
		<view class="shop-six-buttons-cont">
			<view class="shop-six-buttons-cc shop-four-cc">
				<span>查看二维码</span>
			</view>
		</view>
		
		<view class="sssh-wrap">
			<view class="main-tab-list-cont">
				<view class="main-tab-nr">
					<img :src="aaShopPic" alt="" class="main-tab-img" />
					<view class="main-tab-right">
						<span class="main-tab-r-title">{{ aaShopTitle }}</span>
						<label class="main-tab-r-ddd">{{ aaShopContent }}</label>
						<ul class="main-four-ul">
							<li>{{ aaChannelName }}</li>
							<li>{{ aaTypeName }}</li>
							<li>{{ aaClassName }}</li>
							<li>{{ aaCity }}-{{ aaArea }}</li>
						</ul>
						<ul class="main-three-ul">
							<li>{{ aaJoinWay }}</li>
							<li>红包（{{ aaHasReward }}）</li>
							<li>体验￥10000</li>
						</ul>
					</view>
				</view>
			</view>
			<!-- <view class="main-tab-list-cont" v-for="(item,index) in shopDetailJk">
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
						</ul>
						<ul class="main-three-ul">
							<li>{{ item.JoinWay }}</li>
							<li>红包（{{ item.HasReward }}）</li>
							<li>体验￥10000</li>
						</ul>
					</view>
				</view>
			</view> -->
		</view>
		<view class="sssh-xq-listwrap">
			<view class="sssh-xq-list">
				<view class="sssh-xq-listcont">
					<span>{{ProductContent}}</span>
				</view>
			</view>
			
		</view>
		
		<view class="sypj-pj-wrap">
			<view class="sypj-title">
				<span>所有评论</span>
				<label>12358</label>
			</view>
			<view class="small-tab small-tab-borderb" v-for="(item,index) in productPl">
				<view class="stabl-title-cont">
					<img :src="item.HeadPic" alt="" height="100%" />
					<span>{{ item.RealName }}</span>
				</view>
				<view class="stable-dl">
					{{ item.CommentContent }}
				</view>
				<view class="smtab-imgs smtab-imgs smtab-five">
					<img :src="plPics1" alt="">
					<img :src="plPics2" alt="">
					<img :src="plPics3" alt="">
					<img :src="plPics4" alt="">
					<img :src="plPics5" alt="">
				</view>
				<view class="small-tab-timeer">
					<i>{{ item.CreateTime }}</i>
					<view class="small-tab-icons">
						<span class="icon iconfont">&#xe68b;</span>
						<label>12580</label>
					</view>
					<view class="small-tab-icons">
						<span class="icon iconfont">&#xe600;</span>
						<label>12580</label>
					</view>
					
				</view>
			</view>
			
			
		</view>
		
		
		
		
		
		
	</view>
	
</template>

<script>
	import 'pages/product/product.css';
	import uniFav from "@/components/uni-fav/uni-fav.vue"
	export default {
		components: {
			uniFav
		},
		data() {
			return {				　
				ProductPic:[],
				ProductTitle:[],
				UserName:[],
				CreateTime:[],
				ChannelName:[],
				TypeName:[],
				ClassName:[],
				City:[],
				Area:[],
				JoinWay:[],
				IsAd:[],
				HasReward:[],
				CommentNum:[],
				ClickNum:[],
				CollectionNum:[],
				GetRewardFee:[],
				GoodNum:[],
				ProductContent:[],
				shopIDs:[],
				productPl:[], //评论
				plPics1:[], //评论图片1
				plPics2:[], //评论图片2
				plPics3:[], //评论图片3
				plPics4:[], //评论图片4
				plPics5:[], //评论图片5
				shopDetailJk: [], // 中间商号信息
				
				aaShopPic:[],
				aaShopTitle:[],
				aaShopContent:[],
				aaChannelName:[],
				aaTypeName:[],
				aaClassName:[],
				aaCity:[],
				aaArea:[],
				aaJoinWay:[],
				aaHasReward:[],
			}
			
			
		},
		onLoad() {
			this.getDataList();
			// this.getShopProduct();
			setTimeout(() => {
				this.getShopProduct();
			}, 1000)
		},
		methods: {
			getDataList(){
				
				//  商讯内容
				var getLocaUrl = document.location.href;
				var jqId = getLocaUrl.indexOf('1');
				var newId = getLocaUrl.substr(jqId);
				uni.request({
					url:this.$serverUrl + '/Product/Dev_Product/GetDataDetail?id=' + newId,
					success: (res) =>{
						this.ProductPic = res.data.ProductPic;
						this.ProductTitle = res.data.ProductTitle;
						this.UserName = res.data.UserName;
						this.CreateTime = res.data.CreateTime;
						this.ChannelName = res.data.ChannelName;
						this.TypeName = res.data.TypeName;
						this.ClassName = res.data.ClassName;
						this.City = res.data.City;
						this.Area = res.data.Area;
						this.JoinWay = res.data.JoinWay;
						this.IsAd = res.data.IsAd;
						this.HasReward = res.data.HasReward;
						this.CommentNum = res.data.CommentNum;
						this.ClickNum = res.data.ClickNum;
						this.CollectionNum = res.data.CollectionNum;
						this.GetRewardFee = res.data.GetRewardFee;
						this.GoodNum = res.data.GoodNum;
						this.ProductContent = res.data.ProductContent;
						this.shopIDs = res.data.ShopId;
						var shShopIds = this.shopIDs;
						// 中间商号信息
						uni.request({
							url:this.$serverUrl + '/Shop/Dev_Shop/GetDataDetail?id=' + shShopIds,
							success: (resdata) =>{
								console.log(resdata)
								this.aaShopPic = resdata.data.ShopPic;
								this.aaShopTitle = resdata.data.ShopTitle;
								this.aaShopContent = resdata.data.ShopContent;
								this.aaChannelName = resdata.data.ChannelName ;
								this.aaTypeName = resdata.data.TypeName;
								this.aaClassName = resdata.data.ClassName;
								this.aaCity = resdata.data.City;
								this.aaArea = resdata.data.Area;
								this.aaJoinWay = resdata.data.JoinWay;
								this.aaHasReward = resdata.data.HasReward;
								if ( this.aaJoinWay == 1 ){
									this.aaJoinWay = '开放加入'
								} else if ( this.aaJoinWay == 2 ) {
									this.aaJoinWay = '审核加入'
								} else if ( this.aaJoinWay == 3 ) {
									this.aaJoinWay = '付费加入'
								};
								if( this.aaHasReward == 1 ) {
									this.aaHasReward = '是';
								} else if ( this.aaHasReward == 2 ) {
									this.aaHasReward = '否';
								}
								
								
							}
						})
						
						if ( this.JoinWay == 1 ){
							this.JoinWay = '开放加入'
						} else if ( this.JoinWay == 2 ) {
							this.JoinWay = '审核加入'
						} else if ( this.JoinWay == 3 ) {
							this.JoinWay = '付费加入'
						};
						
						if( this.IsAd == 1 || this.IsTop == 1 || this.HasReward == 1 ) {
							this.IsAd = '是';
							this.IsTop = '是';
							this.HasReward = '是';
						} else if (  this.IsAd == 2 || this.IsTop == 2 || this.HasReward == 2 ) {
							this.IsAd = '否';
							this.IsTop = '否';
							this.HasReward = '否';
						}
					}
				})
				// 商讯下面的评论
				uni.request({
					url:this.$serverUrl + '/OtherManage/Dev_Comment/GetDataList?CommentType=商讯评论&Status=1&SubjectId=' + newId,
					success: (res) =>{
						this.productPl = res.data.rows;
						for ( var o = 0; o < res.data.rows.length; o ++ ){
							console.log(res)
							var morePic = res.data.rows[o].CommentPic;
							var newPics = morePic.split(';');
							this.plPics1 = newPics[0];
							this.plPics2 = newPics[1];
							this.plPics3 = newPics[2];
							this.plPics4 = newPics[3];
							this.plPics5 = newPics[4];
							
						}
					}
				})
			},
			
			getShopProduct(){
				
			}
			
			
			
		}

		
		

		
	}
</script>

<style>
	


	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36px;
		color: #8f8f94;
	}
</style>
