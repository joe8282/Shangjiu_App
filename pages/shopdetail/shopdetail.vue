<template>
	<view class="content">
		<view class="shop-banner-cont">
			<img :src="ShopPic">
		</view>
		<view class="shop-title-wrap">
			<view class="shop-title-cont">
				<view class="shop-title-ctitle">{{ShopTitle}}</view>
				<view class="shop-tx-time-cont">
					<navigator :url="'../user/user?id=' + this.userId">
						<img src="static/images/my-tx.png" alt="" width="23"/>
					</navigator>
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
						<span>成员</span>
						<label>{{MemberNum}}</label>
					</view>
					<view class="shop-ullist-ll">
						<span>内容</span>
						<label>{{ProductNum}}</label>
					</view>
					<view class="shop-ullist-ll">
						<span>商链</span>
						<label>{{LinkNum}}</label>
					</view>
					<view class="shop-ullist-ll">
						<span>说说</span>
						<label>{{ChatNum}}</label>
					</view>
					<view class="shop-ullist-ll">
						<span>问答</span>
						<label>{{AskNum}}</label>
					</view>
					<view class="shop-ullist-ll">
						<span>留言</span>
						<label>{{MessageNum}}</label>
					</view>
					<view class="shop-ullist-ll">
						<span>人气</span>
						<label>{{ClickNum}}</label>
					</view>
					<view class="shop-ullist-ll">
						<span>关注</span>
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
			<view class="shop-six-buttons-cc">
				<span>商号编辑</span>
				<span>外链记录</span>
				<span>商号转移</span>
				<span>授权管理</span>
				<span>商号推广</span>
				<span>红包发放</span>
			</view>
		</view>
		
		<view class="shop-phone-add-cont">
			<view class="shop-phone-add-cc">
				<text>联系人：{{Contact}}</text>
				<text class="sphone">电话：{{ContactTel}}</text><br>
				<text>地址：{{ContactAddress}}</text>
			</view>
		</view>
		
		<view class="shop-xq-all-cont">
			<view class="shop-xq-all-cc">
				<span>会员可根据需要创建多个商号，用于商家经营推广、创业、接活；做自媒与内容。商号为创新社群模式，内置 “商讯、商链、说说、问答、</span>
				<label>查看详细介绍</label>
				<label>生成我的商区码</label>
				<label>查看商区代理</label>
				<label>申请商区代理</label>
			</view>
		</view>
		<view class="four-button">
			<a href="javascript:;"><img src="static/images/t.png" alt="" /></a>
			<a href="javascript:;"><img src="static/images/l.png" alt="" /></a>
			<a href="javascript:;"><img src="static/images/g.png" alt="" /></a>
			<a href="javascript:;"><img src="static/images/f.png" alt="" /></a>
		</view>
		<!-- 隐藏申请加入 start -->
		<view class="sqjr-wrap" v-if="sqjrCont">
			<span>{{ sqjrMsg }}</span>
			<label>您需要符合加入条件，才能点击申请加入，<br>申请提交后请等待商区审核</label>
			<b>申请加入</b>
		</view>
		<!-- 隐藏申请加入 end -->
		
		<!-- 隐藏开放加入 start -->
		<view class="sqjr-wrap" v-if="kfjrCont">
			<label style="margin-top: 30px;margin-bottom: 30px;">{{ dspMsg }}</label>
			<!-- <b>点击加入</b> -->
		</view>
		<!-- 隐藏开放加入 end -->
		
		<!-- 隐藏付费加入 start -->
		<view class="ffjr-wrap" v-if="ffjrCont">
			<view class="ffjr-list-wrap">
				<span>   体验</span>
				<label>￥10</label>
				<b>付费加入</b>
			</view>
			<view class="ffjr-list-wrap">
				<span>   月费</span>
				<label>￥10</label>
				<b>付费加入</b>
			</view>
			<view class="ffjr-list-wrap">
				<span>   年费</span>
				<label>￥10</label>
				<b>付费加入</b>
			</view>
			<view class="ffjr-list-wrap">
				<span>   不限</span>
				<label>￥10</label>
				<b>付费加入</b>
			</view>
			<label class="ffrj-label">如果您是工作人员或合作方，<br>在与商区管理员落实后可通过嘉宾通道免费申请加入</label>
			<b class="ffjr-btn">嘉宾加入</b>
		</view>
		<!-- 隐藏付费加入 end -->
		
		<view class="main-four-wrap shop-main-four" v-if="bottomTab">
			<!-- tab nav-->
			<view class="navbar">
				<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }" @click="tabClick(index)">
					<span>{{ item.text }}</span>
					<br>
					<label>{{ item.num }}</label>
				</view>
			</view>
			<!-- tab 显示区域 -->
			<!-- <button   @click="favor" class="my_button" :style="{backgroundColor:bg_color, color: ft_color,}" @mouseenter="change()" @mouseleave="goback()">
				{{content}}
			</button> -->
			<view class="list" v-show="tabCurrentIndex === 0">
				<view class="main-tab-list-wrap invxs-right" style="margin-top: 10px;" v-for="(item,index) in shangxun">
					<view class="main-tab-list-cont">
						<view class="main-tab-nr">
							<img :src="item.ProductPic" alt="" class="main-tab-img" />
							<view class="main-tab-right">
								<span class="main-tab-r-title">{{ item.ShopTitle }}</span>
								<label class="main-tab-r-ddd">{{ item.ProductTitle }}</label>
								<ul class="main-four-ul">
									<li>{{ item.TypeName }}</li>
									<li>{{ item.ClassName }}</li>
									<li>{{ item.ChannelName }}</li>
									<li>{{ item.City }} {{ item.Area }}</li>
									<span class="tg-red">推广({{item.IsAd}})</span>
								</ul>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="list" v-show="tabCurrentIndex === 1">
				<view class="main-tab-list-wrap" v-for="(item,index) in shanglian">
					<view class="main-tab-list-cont">
						<view class="main-tab-nr">
							<img :src="item.LinkPic" alt="" class="main-tab-img" />
							<view class="main-tab-right">
								<span class="main-tab-r-title">{{ item.ShopTitle }}</span>
								<label class="main-tab-r-ddd">{{ item.LinkTitle }}</label>
								<ul class="main-four-ul">
									<li>{{ item.TypeName }}</li>
									<li>{{ item.ClassName }}</li>
									<li>{{ item.ChannelName }}</li>
									<li>{{ item.City }} {{ item.Area }}</li>
								</ul>
								<ul class="main-three-ul">
									<li>{{ item.JoinWay }}</li>
									<li>推广（{{ item.IsAd }}）</li>
									<li>红包（{{ item.HasReward }}）</li>
								</ul>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<view class="list" v-show="tabCurrentIndex === 2">
				<view class="small-tab small-tab-borderb" v-for="(item,index) in shuoshuo">
					<view class="stabl-title-cont">
						<img :src="item.HeadPic" alt="" height="100%" />
						<span>{{ item.UserName }}</span>
					</view>
					<view class="stable-dl">
						{{ item.SubjectTitle }}
					</view>
					<view class="smtab-imgs">
						<img :src="ssPics1" alt="" height="100%"/>
						<img :src="ssPics2" alt="" height="100%"/>
						<img :src="ssPics3" alt="" height="100%"/>
						<img :src="ssPics4" alt="" height="100%"/>
						<img :src="ssPics5" alt="" height="100%"/>
						<img :src="ssPics6" alt="" height="100%"/>
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
			<view class="list" v-show="tabCurrentIndex === 3">
				<view class="small-tab small-tab-borderb" v-for="(item,index) in wenda">
					<view class="stabl-title-cont">
						<img :src="item.HeadPic" alt="" height="100%" />
						<span>{{ item.UserName }}</span>
					</view>
					<view class="stable-dl">
						{{ item.SubjectTitle }}
					</view>
					<view class="smtab-imgs smtab-five" >
						<img :src="wddPics1" alt="" height="100%"/>
						<img :src="wddPics2" alt="" height="100%"/>
						<img :src="wddPics3" alt="" height="100%"/>
						<img :src="wddPics4" alt="" height="100%"/>
						<img :src="wddPics5" alt="" height="100%"/>
						<img :src="wddPics6" alt="" height="100%"/>
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
					<view class="newshf-wrap" >
						<view class="" v-for="(items,index) in ssPlList">
							<view class="" v-if="items.ParentId == item.Id">
								<view class="news-hf-cont">
									<view class="stabl-title-cont x-hf-title-cont">
										<img src="static/images/fx_tx.png" alt="" height="100%" />
										<span>{{ item.UserName }}</span>
										<label>{{ item.CreateTime }}</label>
									</view>
									<view class="stable-dl">
										{{ item.CommentContent }}
									</view>
								</view>
							</view>
							<view class="" v-else>
								
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<view class="list" v-show="tabCurrentIndex === 4">
				<view class="small-tab small-tab-borderb" v-for="(item,index) in liuyan">
					<view class="stabl-title-cont">
						<img :src="item.HeadPic" alt="" height="100%" />
						<span>{{ item.UserName }}</span>
						
					</view>
					<view class="stable-dl">
						{{ item.SubjectTitle }}
					</view>
					<view class="smtab-imgs smtab-five">
						<img :src="lyPics1" alt="" height="100%"/>
						<img :src="lyPics2" alt="" height="100%"/>
						<img :src="lyPics3" alt="" height="100%"/>
						<img :src="lyPics4" alt="" height="100%"/>
						<img :src="lyPics5" alt="" height="100%"/>
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
					<view class="newshf-wrap" >
						<view class="" v-for="(items,index) in lyPlList">
							<view class="" v-if="items.ParentId == item.Id">
								<view class="news-hf-cont">
									<view class="stabl-title-cont x-hf-title-cont">
										<img src="static/images/fx_tx.png" alt="" height="100%" />
										<span>{{ item.UserName }}</span>
										<label>{{ item.CreateTime }}</label>
									</view>
									<view class="stable-dl">
										{{ item.CommentContent }}
									</view>
								</view>
							</view>
							<view class="" v-else>
								
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="list" v-show="tabCurrentIndex === 5">
				<view class="small-tab" v-for="(item,index) in chengyuan">
					<view class="stabl-title-cont">
						<img :src="item.HeadPic" alt="" height="100%" />
						<span>{{ item.UserName }}</span>
						<label>{{ item.CreateTime }}</label>
					</view>
				</view>
				
				
			</view>
		</view>
		
	</view>
	
</template>

<script>
	import 'pages/shopdetail/shopdetail.css';
	import uniFav from "@/components/uni-fav/uni-fav.vue"
	export default {
		components: {
			uniFav
		},
		data() {
			return {
				sqjrCont: false,
				kfjrCont: false,
				ffjrCont: false,
				sqjrMsg:'',
				bottomTab: false,
				dspMsg:'',
				
				pagesize: 10,
				pre:'item',
				failFlag:true,
				count:0,
				shangxun:[],
				shanglian:[],
				chengyuan:[],
				
				showAll:false, 
				ShopPic:[],
				ShopTitle:[],
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
				MemberNum:[],
				ProductNum:[],
				LinkNum:[],
				ChatNum:[],
				AskNum:[],
				MessageNum:[],
				ClickNum:[],
				CollectionNum:[],
				GetRewardFee:[],
				GoodNum:[],
				Contact:[],
				ContactTel:[],
				ContactAddress:[],
				shuoshuo:[],
				wenda:[],
				liuyan:[],
				ssPics1:[],
				ssPics2:[],
				ssPics3:[],
				ssPics4:[],
				ssPics5:[],
				ssPics6:[],
				wddPics1:'',
				wddPics2:'',
				wddPics3:'',
				wddPics4:'',
				wddPics5:'',
				wddPics6:'',
				lyPics1:[],
				lyPics2:[],
				lyPics3:[],
				lyPics4:[],
				lyPics5:[],
				Inv:0,   //小切换
				Inv1:0,   //小切换
				Inv2:0,   //小切换
				Inv3:0,   //小切换
				Inv4:0,   //小切换
				Invx1:0,   //商讯大tab
				Invxs1:0,   //商讯大tab
				Invxs2:0,   //商讯大tab
				
				ssPlList:[],
				lyPlList:[],
				userId:'',
				
				
				　
				tabCurrentIndex: 0,
				navList: [
					{
						state: 0,
						text: '商讯',
						orderList: []
					},
					{
						state: 1,
						text: '商链',
						orderList: []
					},
					{
						state: 2,
						text: '说说',
						orderList: []
					},
					{
						state: 3,
						text: '问答',
						orderList: []
					},
					{
						state: 4,
						text: '留言',
						orderList: []
					},
					{
						state: 5,
						text: '成员',
						orderList: []
					}
				],
				
				liked:false,
                content:'+关注',
                bg_color:"#fef0f0",
                ft_color:"#f56c6c",
			}
			// textfont:[{
			// 	font:"合抱之木，生于毫末；九层之台，起于垒土。实现中华民族伟大复兴是一个长期而艰巨的过程，需要凝聚磅礴之力，才能实现质的飞跃实现中华民族伟大复兴的中国梦汇聚了强大的“中国力量”。2013年3月17
			// }],
		},

		onLoad(options) {
			
			this.GetShopDetail();
			this.getShopProduct();
			this.getShopLink();
			this.getShopMember();
			this.getOtherManage();
			// 页面显示是默认选中第一个
			this.tabCurrentIndex = 0;
			var getLocaUrl = document.location.href;
			var jqId = getLocaUrl.indexOf('1');
			var newId = getLocaUrl.substr(jqId);
			var newIds = newId.substring(0,19);
			this.userId = newIds;
		},
		computed:{
			showList:function(){
				if(this.showAll == false){                    //当数据不需要完全显示的时候
					var showList = [];　　　　　　　　　　　　　　　 //定义一个空数组
					if(this.toLearnList.length > 2){　　　　　　　//这里我们先显示前三个
						for(var i=0;i<2;i++){
							showList.push(this.toLearnList[i])
						}
					}else{
						showList = this.toLearnList
					}
					return showList;　　　　　　　　　　　　　　　　 //返回当前数组
				}else{
					return this.toLearnList;
				}
			},
			word:function(){
				if(this.showAll == false){　　　　　　　　　　　//对文字进行处理
					return '点击展开'
				}else{
					return '点击收起'
				}
			}
		 },

		methods: {
			getShopProduct(){
				var getLocaUrl = document.location.href;
				var jqId = getLocaUrl.indexOf('1');
				var newId = getLocaUrl.substr(jqId);
				var newIds = newId.substring(0,19);
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopProduct/GetDataList',
					data: {
						ShopId: newIds
					},
					success: (res) =>{
						this.shangxun = res.data.rows
						for ( var s = 0; s < res.data.rows.length; s ++ ) {
							if( res.data.rows[s].IsAd == 1 ) {
								this.shangxun[s].IsAd = '是'
							} else if( res.data.rows[s].IsAd == 2 ) {
								this.shangxun[s].IsAd = '否'
							} 
						}
					}
				})
			},
			getShopLink(){
				var getLocaUrl = document.location.href;
				var jqId = getLocaUrl.indexOf('1');
				var newId = getLocaUrl.substr(jqId);
				var newIds = newId.substring(0,19);
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopLink/GetDataList',
					data: {
						ShopId: newIds
					},
					success: (res) =>{
						this.shanglian = res.data.rows
						for ( var s = 0; s < res.data.rows.length; s ++ ) {
							if( res.data.rows[s].IsAd == 1 || res.data.rows[s].HasReward == 1 || res.data.rows[s].JoinWay == 1) {
								this.shanglian[s].IsAd = '是';
								this.shanglian[s].HasReward = '有';
								this.shanglian[s].JoinWay = '开放加入';
							} else if( res.data.rows[s].IsAd == 2 || res.data.rows[s].HasReward == 2 || res.data.rows[s].JoinWay == 2 ) {
								this.shanglian[s].IsAd = '否';
								this.shanglian[s].HasReward = '无';
								this.shanglian[s].JoinWay = '审核加入';
							} else if( res.data.rows[s].JoinWay == 3 ) {
								this.shanglian[s].JoinWay = '付费加入';
							}
						}
					}
				})
			},
			getShopMember(){
				var getLocaUrl = document.location.href;
				var jqId = getLocaUrl.indexOf('1');
				var newId = getLocaUrl.substr(jqId);
				var newIds = newId.substring(0,19);
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopMember/GetDataList',
					data: {
						ShopId: newIds
					},
					success: (res) =>{
						// console.log(res)
						this.chengyuan = res.data.rows
					}
				})
			},
			
			GetShopDetail(){
				var getLocaUrl = document.location.href;
				var jqId = getLocaUrl.indexOf('1');
				var newId = getLocaUrl.substr(jqId);
				var newIds = newId.substring(0,19);
				var shopIds = newId.substring(27,46)
				
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopMember/CheckJoin?UserId=' + newIds + '&ShopId=' + shopIds ,
					success: (res) =>{
						console.log(res)
						if(res.data.Success == false) {
							this.sqjrCont = true;
							this.sqjrMsg = res.data.Msg;
							this.bottomTab = false;
						}
						if(res.data.Success == true && res.data.Data == 1){
							this.kfjrCont = true;
							this.dspMsg = '您已申请加入商号，请等待审核！'
							this.bottomTab = false;
						}
						if(res.data.Success == true && res.data.Data == 2){
							this.bottomTab = true;
						}
						if(res.data.Success == true && res.data.Data == 3){
							this.kfjrCont = true;
							this.dspMsg = '不好意思，您的条件未满足加入要求！'
							this.bottomTab = false;
						}
						
					}
				})
				
				
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_Shop/GetDataDetail?id=' + newIds,
					success: (res) =>{
						this.ShopPic = res.data.ShopPic;
						this.ShopTitle = res.data.ShopTitle;
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
						this.MemberNum = res.data.MemberNum;
						this.ProductNum = res.data.ProductNum;
						this.LinkNum = res.data.LinkNum;
						this.ChatNum = res.data.ChatNum;
						this.AskNum = res.data.AskNum;
						this.MessageNum = res.data.MessageNum;
						this.ClickNum = res.data.ClickNum;
						this.CollectionNum = res.data.CollectionNum;
						this.GetRewardFee = res.data.GetRewardFee;
						this.GoodNum = res.data.GoodNum;
						this.Contact = res.data.Contact;
						this.ContactTel = res.data.ContactTel;
						this.ContactAddress = res.data.ContactAddress;
						
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
						
						
					},
					
				})
			},
			getOtherManage(){
				uni.request({
					url:this.$serverUrl + '/OtherManage/Dev_Comment/GetDataList',
					method: 'POST',
					header: {
						'content-type': 'multipart/form-data'
					},
					success: (res) =>{
						this.ssPlList = res.data.rows;
					},
				})
				
				
				
				var getLocaUrl = document.location.href;
				var jqId = getLocaUrl.indexOf('1');
				var newId = getLocaUrl.substr(jqId);
				var newIds = newId.substring(0,19)
				uni.request({
					url:this.$serverUrl + '/OtherManage/Dev_Comment/GetDataList?CommentType=商号说说&Status=1&SubjectId=' + newIds ,
					success: (res) =>{
						this.shuoshuo = res.data.rows
						
						for ( var o = 0; o < res.data.rows.length; o ++ ){
							
							var morePic = res.data.rows[o].CommentPic;
							var newPics = morePic.split(';');
							this.ssPics1 = newPics[0];
							this.ssPics2 = newPics[1];
							this.ssPics3 = newPics[2];
							this.ssPics4 = newPics[3];
							this.ssPics5 = newPics[4];
							this.ssPics6 = newPics[5];
						
						}
					},
				})
				uni.request({
					url:this.$serverUrl + '/OtherManage/Dev_Comment/GetDataList?CommentType=商号问答&Status=1&SubjectId=' + newIds ,
					success: (res) =>{
						this.wenda = res.data.rows;
						for ( var w = 0; w < res.data.rows.length; w ++ ){
							// console.log(res.data.rows[w].Id)
							var morePic = res.data.rows[w].CommentPic;
							var newPics = morePic.split(';');
							this.wddPics1 = newPics[0];
							this.wddPics2 = newPics[1];
							this.wddPics3 = newPics[2];
							this.wddPics4 = newPics[3];
							this.wddPics5 = newPics[4];
							
						}
					},
				})
				uni.request({
					url:this.$serverUrl + '/OtherManage/Dev_Comment/GetDataList?CommentType=商号留言&Status=1&SubjectId=' + newIds ,
					success: (res) =>{
						this.liuyan = res.data.rows;
						for ( var y = 0; y < res.data.rows.length; y ++ ){
							
							var morePic2 = res.data.rows[y].CommentPic;
							var newPics2 = morePic2.split(';');
							this.lyPics1 = newPics2[0];
							this.lyPics2 = newPics2[1];
							this.lyPics3 = newPics2[2];
							this.lyPics4 = newPics2[3];
							this.lyPics5 = newPics2[4];
						}
					},
				})
			},
			changeTab(Inv,Inv1,Inv2,Inv3,Inv4,Invx1,Invxs1,Invxs2){
				that.navIdx = Inv;
				that.navIdx = Inv1;
				that.navIdx = Inv2;
				that.navIdx = Inv3;
				that.navIdx = Inv4;
				that.navIdx = Invx1;
				that.navIdx = Invxs1;
				that.navIdx = Invxs2;
					 
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
	


	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36px;
		color: #8f8f94;
	}
</style>
