<template>
	<view class="content" id="app">
		<view class="text-area">
			<view class="main-header-wrap">
				<input type="text" style="display: none;"/>
				<img src="static/images/news.png" alt="" class="main-header-news-icon" />
			</view>
			
		</view>
		<view class="main-toggle-wrap">
			<view class="main-toggle-cont">
				<span class="main-cjsh-btn">+ 创建商号</span>
				<!-- <ul class="main-toggle-ul">
					<li>1．会员可根据需要创建多个商号，用于商家经营推广、创业、接活；做自媒与内容。</li>
					<li>2．商号为创新社群模式，内置“商讯、</li>
					<li>3．商号为创新社群模式，内置“商讯、</li>
				</ul> -->
				<view class="hello">
					<view v-for="item in showList">
						<span class="slider-main-toggle">{{item}}</span>
						
					</view>
					<view @click="showAll = !showAll" class="show-more"><!-- {{word}} --><img src="static/images/down-icon.png" class="slider-down-icon" @click="sliderToggle()":class="[rotate?  'rotatetop' : 'rotatebottom']"/></view>
				</view>
				
			</view>
		</view>
		<view class="main-four-wrap">
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
				<view class="inv-h-w">
					<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">公开(20)</view>
					<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">私存(20)</view>
					<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">待审(20)</view>
					<view :class="['inv-h',Inv==3?'inv-h-se':'']" @click="Inv=3">拒绝(20)</view>
                </view>
                <view class="" v-show="Inv == 0">
					<view class="small-tab" v-for="(item , index) in gongkai">
						<navigator :url="'../shop/shop?id=' + item.Id">
							<view class="main-tab-nr">
								<view class="main-tb-title">
									<span>{{ item.CreateTime }}</span>
									<label @click="gongkaiClick(e)" :data-id="item.Id" :data-Status="item.Status">私存</label>
								</view>
								<img :src="item.ShopPic" alt="" class="main-tab-img" />
								<view class="main-tab-right">
									<span class="main-tab-r-title">{{ item.ShopTitle }}</span>
									<label class="main-tab-r-ddd">{{ item.ShopRemark }}</label>
									<ul class="main-four-ul">
										<li>{{ item.ChannelName }}</li>
										<li>{{ item.TypeName }}</li>
										<li>{{ item.ClassName }}</li>
										<li>{{ item.City }} {{ item.Area }}</li>
									</ul>
									<ul class="main-three-ul">
										<li>{{ item.JoinWay }}</li>
										<li>推广（{{ item.IsAd }}）</li>
										<li>红包（{{ item.HasReward }}）</li>
									</ul>
								</view>
								<view class="main-tab-r-b">
									<span>成员待审（120）</span>
									<span>投稿待审（120）</span>
									<span>商链待审（120）</span>
								</view>
							</view>
						</navigator>
					</view>
                </view>
                <view class="" v-show="Inv == 1">
					<view class="small-tab" v-for="(item , index) in sicun">
						<navigator :url="'../shop/shop?id=' + item.Id">
							<view class="main-tab-nr">
								<view class="main-tb-title">
									<span>{{ item.CreateTime }}</span>
									<label @click="sicunClick(e)" :data-id="item.Id" :data-Status="item.Status">公开</label>
								</view>
								<img :src="item.ShopPic" alt="" class="main-tab-img" />
								<view class="main-tab-right">
									<span class="main-tab-r-title">{{ item.ShopTitle }}</span>
									<label class="main-tab-r-ddd">{{ item.ShopRemark }}</label>
									<ul class="main-four-ul">
										<li>{{ item.ChannelName }}</li>
										<li>{{ item.TypeName }}</li>
										<li>{{ item.ClassName }}</li>
										<li>{{ item.City }} {{ item.Area }}</li>
									</ul>
									<ul class="main-three-ul">
										<li>{{ item.JoinWay }}</li>
									</ul>
								</view>
							</view>
						</navigator>
					</view>
                </view>
				<view class="" v-show="Inv == 2" v-for="(item , index) in daishen">
					<navigator :url="'../shop/shop?id=' + item.Id">
						<view class="small-tab">
							<view class="main-tab-nr">
								<img :src="item.ShopPic" alt="" class="main-tab-img" />
								<view class="main-tab-right">
									<span class="main-tab-r-title">{{ item.ShopTitle }}</span>
									<label class="main-tab-r-ddd">{{ item.ShopRemark }}</label>
									<ul class="main-four-ul">
										<li>{{ item.ChannelName }}</li>
										<li>{{ item.TypeName }}</li>
										<li>{{ item.ClassName }}</li>
										<li>{{ item.City }} {{ item.Area }}</li>
									</ul>
									<ul class="main-three-ul">
										<li>{{ item.JoinWay }}</li>
									</ul>
								</view>
							</view>
						</view>
					</navigator>
				</view>
				<view class="" v-show="Inv == 3" v-for="(item , index) in jujue">
					<navigator :url="'../shop/shop?id=' + item.Id">
						<view class="small-tab">
							<view class="main-tab-nr">
								<img :src="item.ShopPic" alt="" class="main-tab-img" />
								<view class="main-tab-right">
									<span class="main-tab-r-title">{{ item.ShopTitle }}</span>
									<label class="main-tab-r-ddd">{{ item.ShopRemark }}</label>
									<ul class="main-four-ul">
										<li>{{ item.ChannelName }}</li>
										<li>{{ item.TypeName }}</li>
										<li>{{ item.ClassName }}</li>
										<li>{{ item.City }} {{ item.Area }}</li>
									</ul>
									<ul class="main-three-ul">
										<li>{{ item.JoinWay }}</li>
									</ul>
								</view>
							</view>
						</view>
					</navigator>
				</view>
				
			</view>
			<view class="list" v-show="tabCurrentIndex === 1">
				<!-- {{ item.state }} -->
				<view class="main-tab-list-wrap" v-for="(item,index) in guanli">
					<navigator :url="'../shop/shop?id=' + item.Id">
						<view class="main-tab-list-cont">
							<view class="main-tab-title">
								<span class="main-tab-time">{{ item.CreateTime }}</span>
								<button   @click="favor" class="my_button" :style="{backgroundColor:bg_color, color: ft_color,}" @mouseenter="change()" @mouseleave="goback()">
									{{content}}
								</button>
							</view>
							<view class="main-tab-nr">
								<img :src="item.SubjectPic" alt="" class="main-tab-img" />
								<view class="main-tab-right">
									<span class="main-tab-r-title">{{ item.ShopTitle }}</span>
									<label class="main-tab-r-ddd">{{ item.ShopRemark }}</label>
									<ul class="main-four-ul">
										<li>{{ item.ChannelName }}</li>
										<li>{{ item.TypeName }}</li>
										<li>{{ item.ClassName }}</li>
										<li>{{ item.City }} {{ item.Area }}</li>
									</ul>
									<ul class="main-three-ul">
										<li>免费加入</li>
										<li>推广（{{ item.IsAd }}）</li>
										<li>红包（{{ item.HasReward }}）</li>
									</ul>
								</view>
							</view>
						</view>
					</navigator>
				</view>
				
			</view>
			<view class="list" v-show="tabCurrentIndex === 2">
				<!-- {{ item.state }} -->
				<view class="main-tab-list-wrap" v-for="(item,index) in jiaru">
					<navigator :url="'../shop/shop?id=' + item.Id">
						<view class="main-tab-list-cont">
							<view class="main-tab-title">
								<span class="main-tab-time">{{ item.CreateTime }}</span>
								<button   @click="favor" class="my_button" :style="{backgroundColor:bg_color, color: ft_color,}" @mouseenter="change()" @mouseleave="goback()">
									{{content}}
								</button>
							</view>
							<view class="main-tab-nr">
								<img :src="item.ShopPic" alt="" class="main-tab-img" />
								<view class="main-tab-right">
									<span class="main-tab-r-title">{{ item.ShopTitle }}</span>
									<label class="main-tab-r-ddd">{{ item.ShopRemark }}</label>
									<ul class="main-four-ul">
										<li>{{ item.ChannelName }}</li>
										<li>{{ item.TypeName }}</li>
										<li>{{ item.ClassName }}</li>
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
					</navigator>
				</view>
			</view>
			<view class="list" v-show="tabCurrentIndex === 3">
				<!-- {{ item.state }} -->
				<view class="main-tab-list-wrap" v-for="(item,index) in guanzhu">
					<navigator :url="'../shop/shop?id=' + item.Id">
						<view class="main-tab-list-cont">
							<view class="main-tab-title">
								<span class="main-tab-time">{{ item.CreateTime }}</span>
								<button   @click="favor" class="my_button" :style="{backgroundColor:bg_color, color: ft_color,}" @mouseenter="change()" @mouseleave="goback()">
									{{content}}
								</button>
							</view>
							<view class="main-tab-nr">
								<img :src="item.SubjectPic" alt="" class="main-tab-img" />
								<view class="main-tab-right">
									<span class="main-tab-r-title">{{ item.SubjectTitle }}</span>
									<label class="main-tab-r-ddd">{{ item.SubjectRemark }}</label>
									<ul class="main-four-ul">
										<li>{{ item.ChannelName }}</li>
										<li>{{ item.TypeName }}</li>
										<li>{{ item.ClassName }}</li>
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
					</navigator>
				</view>
			
				
				
			</view>
		</view>
	</view>
	
</template>

<script>
	import 'pages/index/index.css';
	import uniFav from "@/components/uni-fav/uni-fav.vue"
	export default {
		components: {
			uniFav
		},
		data() {
			return {
				rotate: false,
				gongkai:[],
				sicun:[],
				daishen:[],
				jujue:[],
				guanli:[],
				jiaru:[],
				e:[],
				guanzhu:[],
				toLearnList:[
					'1.会员可根据需要创建多个商号，用于商家经营推广、创业、接活；做自媒与内容。',
					'2.商号为创新社群模式，内置“商讯、',
					'3.商号为创新社群模',
					'4.展开展开展开',
					'5.zzzzzzzzzzzz'   //进行显示的数据
				],
				showAll:false, 
				 
				Inv:0,   //小切换
				
				　
				tabCurrentIndex: 0,
				navList: [
					{
						state: 0,
						text: '我名下的',
						num: 128,
						orderList: []
					},
					{
						state: 1,
						text: '我管理的',
						num: 128,
						orderList: []
					},
					{
						state: 2,
						text: '我加入的',
						num: 128,
						orderList: []
					},
					{
						state: 3,
						text: '我关注的',
						num: 128,
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
			// 页面显示是默认选中第一个
			this.tabCurrentIndex = 0;
			this.tabCurrentIndex1 = 0;
			this.getDataList();
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
			
			getDataList(){
				//我名下的
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_Shop/GetDataList?userId=1133345545746780160',
					method:'POST',
					data:{
						 
					},
					success: (res) =>{
						var gongkai = res.data.rows.filter(function (e) { return e.Status == '2'; });
						var sicun = res.data.rows.filter(function (e) { return e.Status == '4'; });
						var daishen = res.data.rows.filter(function (e) { return e.Status == '1'; });
						var jujue = res.data.rows.filter(function (e) { return e.Status == '3'; });
						this.gongkai = gongkai;
						this.sicun = sicun;
						this.daishen = daishen;
						this.jujue = jujue;
						
						for( var i = 0; i < res.data.rows.length; i++ ) {
							if ( res.data.rows[i].JoinWay == 1 || res.data.rows[i].HasReward == 1 || res.data.rows[i].IsAd == 1){
								res.data.rows[i].JoinWay = '开放加入';
								res.data.rows[i].HasReward = '是';
								res.data.rows[i].IsAd = '是';
							} else if ( res.data.rows[i].JoinWay == 2 || res.data.rows[i].HasReward == 2 || res.data.rows[i].IsAd == 2) {
								res.data.rows[i].JoinWay = '审核加入'
								res.data.rows[i].HasReward = '无';
								res.data.rows[i].IsAd = '否';
							} else if ( res.data.rows[i].JoinWay == 3 ) {
								res.data.rows[i].JoinWay = '付费加入';
							};
							
						}
			
					}
				});
				
				
				//查询某个用户所加入的所有商号
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopMember/GetDataList?userId=1133345545746780160',
					success: (res) =>{
						this.jiaru = res.data.rows
						for( var i = 0; i < res.data.rows.length; i++ ) {
							if ( res.data.rows[i].JoinWay == 1 || res.data.rows[i].HasReward == 1 || res.data.rows[i].IsAd == 1){
								res.data.rows[i].JoinWay = '开放加入';
								res.data.rows[i].HasReward = '是';
								res.data.rows[i].IsAd = '是';
							} else if ( res.data.rows[i].JoinWay == 2 || res.data.rows[i].HasReward == 2 || res.data.rows[i].IsAd == 2) {
								res.data.rows[i].JoinWay = '审核加入'
								res.data.rows[i].HasReward = '无';
								res.data.rows[i].IsAd = '否';
							} else if ( res.data.rows[i].JoinWay == 3 ) {
								res.data.rows[i].JoinWay = '付费加入';
							};
							
						}	
					}
				})
				// 查询某个用户所关注的所有商号
				uni.request({
					url:this.$serverUrl + '/OtherManage/Dev_Collection/GetDataList?userId=1133345545746780160&collectionType=商号关注',
					success: (res) =>{
						this.guanzhu = res.data.rows
						for( var i = 0; i < res.data.rows.length; i++ ) {
							if ( res.data.rows[i].JoinWay == 1 || res.data.rows[i].HasReward == 1 || res.data.rows[i].IsAd == 1){
								res.data.rows[i].JoinWay = '开放加入';
								res.data.rows[i].HasReward = '是';
								res.data.rows[i].IsAd = '是';
							} else if ( res.data.rows[i].JoinWay == 2 || res.data.rows[i].HasReward == 2 || res.data.rows[i].IsAd == 2) {
								res.data.rows[i].JoinWay = '审核加入'
								res.data.rows[i].HasReward = '无';
								res.data.rows[i].IsAd = '否';
							} else if ( res.data.rows[i].JoinWay == 3 ) {
								res.data.rows[i].JoinWay = '付费加入';
							};
							
						}	
					}
				})
				
				
				
			},
			gongkaiClick: function(e) {
				//获取点击对象      
			    var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_Shop/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:4
					},
					success: (res) =>{
						uni.showModal({
						    title: '提示',
						    content: '操作成功',
						    success: function (res) {
						        if (res.confirm) {
						            // console.log('用户点击确定');
									window.location.reload()
						        } else if (res.cancel) {
						            // console.log('用户点击取消');
						        }
						    }
						});
					}
				})	
				
			},
			sicunClick: function(e) {
				//获取点击对象      
			    var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_Shop/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:1
					},
					success: (res) =>{
						uni.showModal({
						    title: '提示',
						    content: '操作成功',
						    success: function (res) {
						        if (res.confirm) {
						            // console.log('用户点击确定');
									window.location.reload()
						        } else if (res.cancel) {
						            // console.log('用户点击取消');
						        }
						    }
						});
						
					}
				})	
				
			},
			changeTab(Inv){
				that.navIdx = Inv;
			},
			changeTab(e) {
				this.tabCurrentIndex = e.target.current;
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			favor (e) {
                this.liked=!this.liked;
                if(this.liked){
                    this.content="取消关注";
                    this.bg_color="#ffffff";
                    this.ft_color="#b22420";
                }

                else{
                    this.content="+关注"
                    this.bg_color="#ffffff";
                    this.ft_color="#b22420";

                }
            },
            change(){
                this.bg_color="#ffffff";
                this.ft_color="#b22420";
            },
            goback(){
                if(this.liked){
                    this.bg_color="#ffffff";
                    this.ft_color="#b22420";
                }
                else{
                    this.bg_color="#ffffff";
                    this.ft_color="#b22420";
                }
            },
			sliderToggle() {
			    if(this.showAll == false){
					this.rotate = !this.rotate;
			    }else{
					this.rotate = !this.rotate;
					
			    }
			}
		}
	}
</script>

