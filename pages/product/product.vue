<template>
	<view class="content">
		<view class="shop-banner-cont">
			<img :src="ProductPic" width="100%">
		</view>
		<view class="shop-title-wrap">
			<view class="shop-title-cont">
				<view class="shop-title-ctitle">{{ProductTitle}}</view>
				<view class="shop-tx-time-cont">
					<img src="static/images/my-tx.png" alt="" width="23"/>
					<span>{{UserName}}</span>
					<label>{{CreateTime}}</label>
				</view>
				<view class="shop-ullist">
					<span>{{ChannelName}}</span>
					<span>{{TypeName}}</span>
					<span>{{ClassName}}</span>
					<span>{{Provice}}{{City}}{{Area}}</span>
					
				</view>
				<view class="shop-ullist-red">
					<span>{{FeeWay}}</span>
					<span>推广（{{IsAd}}）</span>
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
						<label class="main-tab-r-ddd">{{ aaShopRemark }}</label>
						<ul class="main-four-ul">
							<li>{{ aaChannelName }}</li>
							<li>{{ aaTypeName }}</li>
							<li>{{ aaClassName }}</li>
							<li>{{ aaCity }}{{ aaArea }}</li>
							<li><span class="dysf-style">{{ aaJoinWay }}</span></li>
						</ul>
					</view>
				</view>
			</view>
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
				<label>{{CommentNum}}</label>
			</view>
			<view class="small-tab small-tab-borderb" v-for="(item,index) in productPl">
				<view class="stabl-title-cont">
					<img :src="item.HeadPic" alt="" height="100%" />
					<span>{{ item.UserName }}</span>
				</view>
				<view class="stable-dl">
					<rich-text :nodes="item.CommentContent"></rich-text>
				</view>
				<view class="smtab-five">
					<img :src="item1" v-for="(item1,index1) in item.CommentPic.split(';')" alt="" />
				</view>
				<view class="small-tab-timeer">
					<i>{{ item.CreateTime }}</i>
<!-- 					<view class="small-tab-icons">
						<span class="icon iconfont">&#xe68b;</span>
						<label>12580</label>
					</view>
					<view class="small-tab-icons">
						<span class="icon iconfont">&#xe600;</span>
						<label>12580</label>
					</view> -->
					
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
				Id: '',
				　
				ProductPic:[],
				ProductTitle:[],
				UserName:[],
				CreateTime:[],
				ChannelName:[],
				TypeName:[],
				ClassName:[],
				Provice: [],
				City:[],
				Area:[],
				FeeWay:'',
				PayFee:0,
				IsAd:[],
				HasReward:[],
				CommentNum:[],
				ClickNum:[],
				CollectionNum:[],
				GetRewardFee:[],
				GoodNum:[],
				ProductContent:[],
				
				productPl:[], //评论
				
				aaShopPic:[],
				aaShopTitle:[],
				aaShopRemark:[],
				aaChannelName:[],
				aaTypeName:[],
				aaClassName:[],
				aaCity:[],
				aaArea:[],
				aaJoinWay:[],
				aaHasReward:[],
			}
			
			
		},
		onLoad(options) {
			this.Id = options.id;
			this.getDataList();
			// this.getShopProduct();
			setTimeout(() => {
				this.getShopProduct();
			}, 1000)
		},
		methods: {
			getDataList(){
				
				//  商讯内容
				uni.request({
					url:this.$serverUrl + '/Product/Dev_Product/GetDataDetail?id=' + this.Id,
					success: (res) =>{
						this.ProductPic = res.data.ProductPic;
						this.ProductTitle = res.data.ProductTitle;
						this.UserName = res.data.UserName;
						this.CreateTime = res.data.CreateTime.split(' ')[0];;
						this.ChannelName = res.data.ChannelName;
						this.TypeName = res.data.TypeName;
						this.ClassName = res.data.ClassName;
						this.Provice = res.data.Provice;
						this.City = res.data.City;
						this.Area = res.data.Area;
						this.PayFee = res.data.PayFee;
						this.IsAd = res.data.IsAd;
						this.CommentNum = res.data.CommentNum;
						this.ClickNum = res.data.ClickNum;
						this.CollectionNum = res.data.CollectionNum;
						this.GetRewardFee = res.data.GetRewardFee;
						this.GoodNum = res.data.GoodNum;
						this.ProductContent = res.data.ProductContent;
						if ( res.data.FeeWay == 1 ){
							this.FeeWay = '免费'
						} else if ( res.data.FeeWay == 2 ) {
							this.FeeWay = '订阅收费（'+ this.PayFee + '）'
						} else if ( res.data.FeeWay == 3 ) {
							this.FeeWay = '项目收费（'+ this.PayFee + '）'
						};
						if (res.data.IsAd == 1) {
							this.IsAd = '是';
						} else {
							this.IsAd = '否';
						};
						var shopId = res.data.ShopId;
						// 中间商号信息
						uni.request({
							url:this.$serverUrl + '/Shop/Dev_Shop/GetDataDetail?id=' + shopId,
							success: (resdata) =>{
								console.log(resdata)
								this.aaShopPic = resdata.data.ShopPic;
								this.aaShopTitle = resdata.data.ShopTitle;
								this.aaShopRemark = resdata.data.ShopRemark;
								this.aaChannelName = resdata.data.ChannelName ;
								this.aaTypeName = resdata.data.TypeName;
								this.aaClassName = resdata.data.ClassName;
								this.aaCity = resdata.data.City;
								this.aaArea = resdata.data.Area;
								this.aaJoinWay = resdata.data.JoinWay;
								this.aaHasReward = resdata.data.HasReward;
								if ( resdata.data.JoinWay == 1 ){
									this.aaJoinWay = '开放加入'
								} else if ( resdata.data.JoinWay == 2 ) {
									this.aaJoinWay = '审核加入'
								} else if ( resdata.data.JoinWay == 3 ) {
									this.aaJoinWay = '付费加入'
								};
								if( resdata.data.HasReward == 1 ) {
									this.aaHasReward = '是';
								} else if ( resdata.data.HasReward == 2 ) {
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
					url:this.$serverUrl + '/OtherManage/Dev_Comment/GetDataList?CommentType=商讯评论&Status=1&SubjectId=' + this.Id,
					success: (res) =>{
						this.productPl = res.data.rows;
						// for ( var o = 0; o < res.data.rows.length; o ++ ){
						// 	console.log(res)
						// 	var morePic = res.data.rows[o].CommentPic;
						// 	var newPics = morePic.split(';');
						// 	this.plPics1 = newPics[0];
						// 	this.plPics2 = newPics[1];
						// 	this.plPics3 = newPics[2];
						// 	this.plPics4 = newPics[3];
						// 	this.plPics5 = newPics[4];
							
						// }
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
