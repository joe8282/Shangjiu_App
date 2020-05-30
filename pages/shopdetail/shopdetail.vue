<template>
	<view class="content">
		<view class="shop-banner-cont">
			<img :src="ShopPic">
		</view>
		<view class="shop-title-wrap">
			<view class="shop-title-cont">
				<view class="shop-title-ctitle">{{ShopTitle}}</view>
				<view class="shop-tx-time-cont">
					<img src="static/images/my-tx.png" alt="" width="23" />
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
					<span>{{JoinWay}}</span>
					<span>推广（{{IsAd}}）</span>
					<span>红包（{{HasReward}}）</span>
				</view>
				<view class="shop-ullist-ten">
					<view class="shop-ullist-ll">
						<text>成员 {{MemberNum}}</text>
					</view>
					<view class="shop-ullist-ll">
						<text>内容 {{ProductNum}}</text>
					</view>
					<view class="shop-ullist-ll">
						<text>商链 {{LinkNum}}</text>
					</view>
					<view class="shop-ullist-ll">
						<text>说说 {{ChatNum}}</text>
					</view>
					<view class="shop-ullist-ll">
						<text>问答 {{AskNum}}</text>
					</view>
					<view class="shop-ullist-ll">
						<text>留言 {{MessageNum}}</text>
					</view>
					<view class="shop-ullist-ll">
						<text>人气 {{ClickNum}}</text>
					</view>
					<view class="shop-ullist-ll">
						<text>关注 {{CollectionNum}}</text>
					</view>
					<view class="shop-ullist-ll">
						<text>打赏 {{GetRewardFee}}</text>
					</view>
					<view class="shop-ullist-ll">
						<text>点赞 {{GoodNum}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 		<view class="shop-six-buttons-cont">
			<view class="shop-six-buttons-cc">
				<span>商号编辑</span>
				<span>外链记录</span>
				<span>商号转移</span>
				<span>授权管理</span>
				<span>商号推广</span>
				<span>红包发放</span>
			</view>
		</view> -->

		<view class="shop-phone-add-cont">
			<view class="shop-phone-add-cc">
				<text>联系人：{{Contact}}</text>
				<text class="sphone">电话：{{ContactTel}}</text><br>
				<text>地址：{{ContactAddress}}</text>
			</view>
		</view>

		<view class="shop-xq-all-cont">
			<view class="shop-xq-all-cc">
				<text>{{ShopRemark}}</text>
				<label @click="openContent()">查看详细介绍</label>
				<label>生成我的商区码</label>
				<label>查看商区代理</label>
				<label>申请商区代理</label>
			</view>
			<uni-popup ref="popup" type="center">
				<rich-text :nodes="ShopContent" class="popup-content"></rich-text>
				<view class="uni-image-close" @click="cancel">
					<uni-icons type="clear" color="#fff" size="50" />
				</view>
			</uni-popup>
		</view>
		<view class="four-button">
			<a href="javascript:;"><img src="static/images/t.png" alt="" /></a>
			<a href="javascript:;"><img src="static/images/l.png" alt="" /></a>
			<a href="javascript:;"><img src="static/images/g.png" alt="" /></a>
			<a href="javascript:;"><img src="static/images/f.png" alt="" /></a>
		</view>
		<!-- 隐藏申请加入 start -->
		<view class="sqjr-wrap" v-if="sqjrCont">
			<label>加入条件：{{ JoinDemand }}</label>
			<label>{{ sqjrMsg }}</label>
			<b v-if="sqjrBt" @click="toJoin(1)">申请加入</b>
		</view>
		<!-- 隐藏申请加入 end -->

		<!-- 隐藏开放加入 start -->
		<view class="sqjr-wrap" v-if="kfjrCont">
			<label>您可以直接点击加入，无须审核与付费。</label>
			<b @click="toJoin(2)">点击加入</b>
		</view>
		<!-- 隐藏开放加入 end -->

		<!-- 隐藏付费加入 start -->
		<view class="ffjr-wrap" v-if="ffjrCont">
			<view class="ffjr-list-wrap">
				<span> 体验</span>
				<label>￥{{ JoinFeeOnce }}</label>
				<b @click="toPay(1)">付费加入</b>
			</view>
			<view class="ffjr-list-wrap">
				<span> 月费</span>
				<label>￥{{ JoinFeeMonth }}</label>
				<b @click="toPay(2)">付费加入</b>
			</view>
			<view class="ffjr-list-wrap">
				<span> 年费</span>
				<label>￥{{ JoinFeeYear }}</label>
				<b @click="toPay(3)">付费加入</b>
			</view>
			<view class="ffjr-list-wrap">
				<span> 不限</span>
				<label>￥{{ JoinFeeUnlimited }}</label>
				<b @click="toPay(4)">付费加入</b>
			</view>
			<label class="ffrj-label">如果您是工作人员或合作方，<br>在与商区管理员落实后可通过嘉宾通道免费申请加入</label>
			<b class="ffjr-btn">嘉宾加入</b>
		</view>
		<!-- 隐藏付费加入 end -->

		<view class="main-four-wrap shop-main-four" v-if="bottomTab">
			<!-- tab nav-->
			<view class="navbar">
				<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{ current: tabCurrentIndex === index }"
				 @click="tabClick(index)">
					<span>{{ item.text }}</span>
					<br>
					<label>{{ item.num }}</label>
				</view>
			</view>
			<view class="list" v-show="tabCurrentIndex === 0">
				<view class="main-tab-list-wrap invxs-right" style="margin-top: 10px;" v-for="(item,index) in shangxun">
					<navigator :url="'../shopdetail/shopdetail?id=' + item.Id">
						<view class="main-tab-list-cont">
							<view class="main-tab-nr">
								<img :src="item.ProductPic" alt="" class="main-tab-img" />
								<view class="main-tab-right">
									<span class="main-tab-r-title">{{ item.ProductTitle }}</span>
									<label class="main-tab-r-ddd">{{ item.ProductRemark }}</label>
									<ul class="main-four-ul">
										<li>{{ item.TypeName }}</li>
										<li>{{ item.ClassName }}</li>
										<li>{{ item.ChannelName }}</li>
										<li>{{ item.City }}{{ item.Area }}</li>
										<li><span class="tg-red">推广({{item.IsAd}})</span></li>
									</ul>
								</view>
							</view>
						</view>
					</navigator>
				</view>
			</view>
			<view class="list" v-show="tabCurrentIndex === 1">
				<view class="main-tab-list-wrap" v-for="(item,index) in shanglian">
					<view class="main-tab-list-cont">
						<view class="main-tab-nr">
							<img :src="item.LinkPic" alt="" class="main-tab-img" />
							<view class="main-tab-right">
								<span class="main-tab-r-title">{{ item.LinkTitle }}</span>
								<!-- <label class="main-tab-r-ddd">{{ item.ShopTitle }}</label> -->
								<ul class="main-four-ul">
									<li>{{ item.TypeName }}</li>
									<li>{{ item.ClassName }}</li>
									<li>{{ item.ChannelName }}</li>
									<li>{{ item.City }}{{ item.Area }}</li>
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
					<view class="smtab-five">
						<img :src="item1" v-for="(item1,index1) in item.CommentPic.split(';')" alt="" height="100%" />
					</view>
					<view class="small-tab-timeer">
						<i>{{ item.CreateTime }}</i>
						<!-- 						<view class="small-tab-icons">
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
			<view class="list" v-show="tabCurrentIndex === 3">
				<view class="small-tab small-tab-borderb" v-for="(item,index) in wenda">
					<view class="stabl-title-cont">
						<img :src="item.HeadPic" alt="" height="100%" />
						<span>{{ item.UserName }}</span>
					</view>
					<view class="stable-dl">
						{{ item.SubjectTitle }}
					</view>
					<view class="smtab-five">
						<img :src="item1" v-for="(item1,index1) in item.CommentPic.split(';')" alt="" height="100%" />
					</view>
					<view class="small-tab-timeer">
						<i>{{ item.CreateTime }}</i>
						<!-- 						<view class="small-tab-icons">
							<span class="icon iconfont">&#xe68b;</span>
							<label>12580</label>
						</view>
						<view class="small-tab-icons">
							<span class="icon iconfont">&#xe600;</span>
							<label>12580</label>
						</view> -->
					</view>
					<view class="newshf-wrap">
						<view class="" v-for="(items,index) in huifu">
							<view class="" v-if="items.ParentId == item.Id">
								<view class="news-hf-cont">
									<view class="stabl-title-cont x-hf-title-cont">
										<img :src="items.HeadPic" alt="" height="100%" />
										<span>{{ items.UserName }}</span>
										<label>{{ items.CreateTime }}</label>
									</view>
									<view class="stable-dl">
										{{ items.CommentContent }}
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
					<view class="smtab-five">
						<img :src="item1" v-for="(item1,index1) in item.CommentPic.split(';')" alt="" height="100%" />
					</view>
					<view class="small-tab-timeer">
						<i>{{ item.CreateTime }}</i>
						<!-- 						<view class="small-tab-icons">
							<span class="icon iconfont">&#xe68b;</span>
							<label>12580</label>
						</view>
						<view class="small-tab-icons">
							<span class="icon iconfont">&#xe600;</span>
							<label>12580</label>
						</view> -->
					</view>
					<view class="newshf-wrap">
						<view class="" v-for="(items,index) in huifu">
							<view class="" v-if="items.ParentId == item.Id">
								<view class="news-hf-cont">
									<view class="stabl-title-cont x-hf-title-cont">
										<img src="static/images/fx_tx.png" alt="" height="100%" />
										<span>{{ items.UserName }}</span>
										<label>{{ items.CreateTime }}</label>
									</view>
									<view class="stable-dl">
										{{ items.CommentContent }}
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
						<label>{{ item.CreateTime.split(' ')[0] }}</label>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom"></view>
		<view class="bottomBar">
			<view class="bottomBarLi">
				<view class="bottomBarImage">
					<uni-icons type="chatboxes" size="25"></uni-icons>
				</view>
				<text>说说</text>
			</view>
			<view class="bottomBarLi">
				<view class="bottomBarImage">
					<uni-icons type="help" size="25"></uni-icons>
				</view>
				<text>问答</text>
			</view>
			<view class="bottomBarLi">
				<view class="bottomBarImage">
					<uni-icons type="compose" size="25"></uni-icons>
				</view>
				<text>留言</text>
			</view>
			<view class="bottomBarLi">
				<view class="bottomBarImage">
					<uni-icons type="star" size="25"></uni-icons>
				</view>
				<text>关注</text>
			</view>
			<view class="bottomBarLi">
				<view class="bottomBarImage">
					<!-- <img src="../../static/images/dashang.png" alt="" height="100%" /> -->
					<uni-icons type="plus" size="25"></uni-icons>
				</view>
				<text>打赏</text>
			</view>
		</view>
	</view>
</template>

<script>
	import 'pages/shopdetail/shopdetail.css';
	// import uniFav from "@/components/uni-fav/uni-fav.vue"
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniIcons,
			uniPopup
		},
		data() {
			return {
				Id: '',

				sqjrCont: false,
				kfjrCont: false, //开发加入
				ffjrCont: false,
				sqjrMsg: '需符合加入条件才能点击申请，申请提交后请等待商区审核',
				bottomTab: false,
				sqjrBt: true,

				shangxun: [],
				shanglian: [],
				chengyuan: [],
				shuoshuo: [],
				wenda: [],
				liuyan: [],
				huifu: [],

				ShopPic: '',
				ShopTitle: '',
				ShopRemark: '',
				ShopContent: '',
				UserName: [],
				CreateTime: [],
				ChannelName: [],
				TypeName: [],
				ClassName: [],
				Provice: [],
				City: [],
				Area: [],
				JoinWay: '',
				JoinDemand: '',
				JoinFeeOnce: 0,
				JoinFeeMonth: 0,
				JoinFeeYear: 0,
				JoinFeeUnlimited: 0,
				IsAd: [],
				HasReward: [],
				MemberNum: [],
				ProductNum: [],
				LinkNum: [],
				ChatNum: [],
				AskNum: [],
				MessageNum: [],
				ClickNum: [],
				CollectionNum: [],
				GetRewardFee: [],
				GoodNum: [],
				Contact: [],
				ContactTel: [],
				ContactAddress: [],

				tabCurrentIndex: 0,

				navList: [{
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
				]
			}
			// textfont:[{
			// 	font:"合抱之木，生于毫末；九层之台，起于垒土。实现中华民族伟大复兴是一个长期而艰巨的过程，需要凝聚磅礴之力，才能实现质的飞跃实现中华民族伟大复兴的中国梦汇聚了强大的“中国力量”。2013年3月17
			// }],
		},

		onLoad(options) {
			this.Id = options.id;
			this.GetShopDetail();
			this.getShopProduct();
			this.getShopLink();
			this.getShopMember();
			this.getOtherManage();
			// 页面显示是默认选中第一个
			this.tabCurrentIndex = 0;
		},
		methods: {
			openContent() {
				this.$refs.popup.open()
			},
			cancel() {
				this.$refs.popup.close()
			},
			getShopProduct() {
				uni.request({
					url: this.$serverUrl + '/Shop/Dev_ShopProduct/GetDataList',
					data: {
						ShopId: this.Id,
						Status: 2,
						SortType: 'desc'
					},
					success: (res) => {
						this.shangxun = res.data.rows
						for (var s = 0; s < res.data.rows.length; s++) {
							if (res.data.rows[s].IsAd == 1) {
								this.shangxun[s].IsAd = '是'
							} else if (res.data.rows[s].IsAd == 2) {
								this.shangxun[s].IsAd = '否'
							}
						}
					}
				})
			},
			getShopLink() {
				uni.request({
					url: this.$serverUrl + '/Shop/Dev_ShopLink/GetDataList',
					data: {
						ShopId: this.Id,
						Status: 2,
						SortType: 'desc'
					},
					success: (res) => {
						this.shanglian = res.data.rows
						for (var s = 0; s < res.data.rows.length; s++) {
							if (res.data.rows[s].IsAd == 1 || res.data.rows[s].HasReward == 1 || res.data.rows[s].JoinWay == 1) {
								this.shanglian[s].IsAd = '是';
								this.shanglian[s].HasReward = '有';
								this.shanglian[s].JoinWay = '开放加入';
							} else if (res.data.rows[s].IsAd == 2 || res.data.rows[s].HasReward == 2 || res.data.rows[s].JoinWay == 2) {
								this.shanglian[s].IsAd = '否';
								this.shanglian[s].HasReward = '无';
								this.shanglian[s].JoinWay = '审核加入';
							} else if (res.data.rows[s].JoinWay == 3) {
								this.shanglian[s].JoinWay = '付费加入';
							}
						}
					}
				})
			},
			getShopMember() {
				uni.request({
					url: this.$serverUrl + '/Shop/Dev_ShopMember/GetDataList',
					data: {
						ShopId: this.Id,
						Status: 2,
						SortType: 'desc'
					},
					success: (res) => {
						// console.log(res)
						this.chengyuan = res.data.rows
					}
				})
			},
			getOtherManage() {
				// uni.request({
				// 	url:this.$serverUrl + '/OtherManage/Dev_Comment/GetDataList?CommentType=商号说说&Status=1&SubjectId=' + this.Id ,
				// 	success: (res) =>{
				// 		this.shuoshuo = res.data.rows
				// 	},
				// })
				// uni.request({
				// 	url:this.$serverUrl + '/OtherManage/Dev_Comment/GetDataList?CommentType=商号问答&Status=1&SubjectId=' + this.Id ,
				// 	success: (res) =>{
				// 		this.wenda = res.data.rows;
				// 	},
				// })
				// uni.request({
				// 	url:this.$serverUrl + '/OtherManage/Dev_Comment/GetDataList?CommentType=商号留言&Status=1&SubjectId=' + this.Id ,
				// 	success: (res) =>{
				// 		this.liuyan = res.data.rows;
				// 	},
				// })
				uni.request({
					url: this.$serverUrl + '/OtherManage/Dev_Comment/GetDataList?Status=1&SubjectId=' + this.Id ,
					method: 'POST',
					header: {
						'content-type': 'multipart/form-data'
					},
					success: (res) => {
						// this.ssPlList = res.data.rows;
						let shuoshuoList = [],
							wendaList = [],
							liuyanList = [],
							huifuList = []
						for (var s = 0; s < res.data.rows.length; s++) {
							if (res.data.rows[s].CommentType == '商号说说') {
								shuoshuoList.push(res.data.rows[s]);
							} else if (res.data.rows[s].CommentType == '商号问答') {
								wendaList.push(res.data.rows[s]);
							} else if (res.data.rows[s].CommentType == '商号留言') {
								liuyanList.push(res.data.rows[s]);
							} else if (res.data.rows[s].ParentId != 0) {
								huifuList.push(res.data.rows[s]);
							}
						}
						this.shuoshuo = shuoshuoList
						this.wenda = wendaList
						this.liuyan = liuyanList
						this.huifu = huifuList
					},
				})

			},

			GetShopDetail() {
				uni.request({
					url: this.$serverUrl + '/Shop/Dev_Shop/GetDataDetail?id=' + this.Id,
					success: (res) => {
						this.ShopPic = res.data.ShopPic;
						this.ShopTitle = res.data.ShopTitle;
						this.ShopRemark = res.data.ShopRemark;
						this.ShopContent = res.data.ShopContent;
						this.UserName = res.data.UserName;
						this.CreateTime = res.data.CreateTime.split(' ')[0];
						this.ChannelName = res.data.ChannelName;
						this.TypeName = res.data.TypeName;
						this.ClassName = res.data.ClassName;
						this.Provice = res.data.Provice;
						this.City = res.data.City;
						this.Area = res.data.Area;
						this.JoinWay = res.data.JoinWay;
						this.JoinDemand = res.data.JoinDemand;
						this.JoinFeeOnce = res.data.JoinFeeOnce;
						this.JoinFeeMonth = res.data.JoinFeeMonth;
						this.JoinFeeYear = res.data.JoinFeeYear;
						this.JoinFeeUnlimited = res.data.JoinFeeUnlimited;
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

						if (res.data.JoinWay == 1) {
							this.JoinWay = '开放加入'
							this.kfjrCont = true
						} else if (res.data.JoinWay == 2) {
							this.JoinWay = '审核加入'
						} else if (res.data.JoinWay == 3) {
							this.JoinWay = '付费加入'
						};

						if (res.data.IsAd == 1) {
							this.IsAd = '是';
						} else {
							this.IsAd = '否';
						};

						if (res.data.HasReward == 1) {
							this.HasReward = '有';
						} else {
							this.HasReward = '无';
						};

						uni.request({
							url: this.$serverUrl + '/Shop/Dev_ShopMember/CheckJoin?UserId=' + uni.getStorageSync('userid') + '&ShopId=' +
								this.Id,
							success: (res) => {
								console.log(res)
								if (res.data.Success == false) {
									if (this.JoinWay == '开放加入') {
										this.kfjrCont = true
									}
									if (this.JoinWay == '审核加入') {
										this.sqjrCont = true
									}
									if (this.JoinWay == '付费加入') {
										this.ffjrCont = true
									}
									this.bottomTab = false;
								}
								if (res.data.Success == true && res.data.Data == 1) {
									if (this.JoinWay == '审核加入') {
										this.sqjrMsg = '您已申请加入商号，请等待审核！'
										this.sqjrCont = true
										this.sqjrBt = false
										this.bottomTab = false;
									}
								}
								if (res.data.Success == true && res.data.Data == 2) {
									console.log(this.JoinWay)
									if (this.JoinWay == '开放加入') {
										console.log(res.data.Data)
										this.kfjrCont = false
									}
									if (this.JoinWay == '审核加入') {
										this.sqjrCont = false
									}
									if (this.JoinWay == '付费加入') {
										this.ffjrCont = false
									}
									this.bottomTab = true;
								}
								if (res.data.Success == true && res.data.Data == 3) {
									//this.dspMsg = '不好意思，您的条件未满足加入要求！'
									if (this.JoinWay == '审核加入') {
										this.sqjrMsg = '不好意思，您的条件未满足加入要求'
										this.sqjrCont = true
										this.sqjrBt = false
									}
									this.bottomTab = false;
								}

							}
						})
					},

				})

			},

			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
			},
			toJoin(status) {
				uni.request({
					url: this.$serverUrl + '/Shop/Dev_ShopMember/SaveData',
					method: "POST",
					data: {
						Id: '',
						UserId: uni.getStorageSync('userid'),
						ShopId: this.Id,
						Status: status
					},
					success: (res) => {
						console.log(res)
						if (res.data.Success) {
							if (status == 2) {
								uni.showToast({
									title: '加入成功！',
									icon: "success"
								});
								this.kfjrCont = false
								this.bottomTab = true;
							} else if (status == 1) {
								uni.showToast({
									title: '已提交请等待审核',
									icon: "success"
								});
								this.sqjrMsg = '您已申请加入商号，请等待审核！'
								this.sqjrBt = false
							}

						} else {
							uni.showToast({
								title: '加入失败',
								icon: "none"
							});
						}
					}
				});
			},
			toPay(way) {
				uni.request({
					url: this.$serverUrl + '/Shop/Dev_ShopMember/SaveData',
					method: "POST",
					data: {
						Id: '',
						UserId: uni.getStorageSync('userid'),
						ShopId: this.Id,
						Status: 2
					},
					success: (res) => {
						console.log(res)
						if (res.data.Success) {
							uni.showToast({
								title: '付费加入成功！',
								icon: "success"
							});
							this.ffjrCont = false
							this.bottomTab = true;

						} else {
							uni.showToast({
								title: '付费加入失败',
								icon: "none"
							});
						}
					}
				});
			}

		}
	}
</script>

<style>
	.popup-content {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		background-color: #fff;
		padding: 15px;
		font-size: 14px;
		height: 400px;
		overflow-y: auto;
	}

	.uni-image-close {
		margin-top: 10px;
		text-align: center;
	}

	.bottomBar {
		position: fixed;
		z-index: 100;
		bottom: 0;
		background-color: #fff;
		border-top: 1px solid #ccc;
		font-size: 12px;
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 40px;
		padding: 4px 0px;
	}

	.bottomBarLi {
		width: 20%;
		text-align: center;
	}

	.bottomBarImage {}

	.bottomBarImage img {
		width: 25px;
	}

	* {
		margin: 0;
		padding: 0;
		touch-action: pan-y;
	}

	body {
		background-color: #F6F6F6;
	}

	ul,
	li {
		list-style: none;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	a {
		text-decoration: none;
	}

	img {
		max-width: 100%;
		vertical-align: middle;
	}

	em {
		font-style: normal;
	}

	i {
		font-style: normal;
	}

	@font-face {
		font-family: "iconfont";
		src: url('/static/fonts/iconfont.eot?t=1581411798999');
		/* IE9 */
		src: url('/static/fonts/iconfont.eot?t=1581411798999#iefix') format('embedded-opentype'),
			/* IE6-IE8 */
			url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAANkAAsAAAAAB1wAAAMWAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDBgqCRIIlATYCJAMMCwgABCAFhG0HNhtrBsgOJSHNwADgAQBAPLyNle/PzCK6OwUozwLFA6qT5fimaquAfZWoRNdUqMazEXto9/0c5BxKglkhLyd9kaVQQerAeg24pv6ixPJsNreqtMZIwAkOtMvWIuMNZEC+YeyClnicQNOiSGbHxZWNYKswxwXiEc/2gW0mrCgsVxeqFUuLeA9W6umF+Q/gXfD9+C8+bEkqmTn15E7RIOT+gm/LLWbGrE6PAMl0TrBVZGwBhbitdN+wiNJbLDRVpaVWCaqKkKaKGQYIxJq2utE/XiKqzPw2WIOZxC9wBAS/ll8ggQyqKHgIPIb68dCHpxNLD0vZcdmxueMOnVebfTo2bzt2yL758tC27T7Hn8dvO+Rpf+AIwOxJ5JEnieazF8ufe9ksP73i0Hp1+8p5s/hw+soFh9bHh0F7n8Q6LL977alv65aLioNF8yE4ll5utSe6LH+r9+ntDGa/yM1wLUJFrhmWmyyepSkx9pddbzlFjy7atD5wsfOni7pDr+GTGI3qfl0oCu3fFXIseDRoadAudDfkcHDxtqaQRLuYos/+dms/GH9t5oanIs50WBW9X5y2+ANfoW/XwDByc2dnc82yoLCgWb96x9ng/PV3CLkDvQDzy/lbLgAgzyz+xW98Xxe4q8cl87+tQwE/uVXPYHh+ueiurZ+pKgaK3rykY1vRZKYlF0XsiA1vdjEwldDUfOZg+ofeDddOOicJ9YyEIalZQFa3RCq0LVS0bKOqbg9Nm0pWt4wQFqI0sGEhQOg7jaTrE7K+u6RCe4uKqe+o6ocFmq7CY8uWleDtCwjuo3gQ9Y8hfkBVGNtG7cPCeswOSX0kLQvYzZiY+BiKi47N50qwgskUM0zDbDylDGKIKqNicBqWJBVpRBXwAI3mKNXSY2KYqhdFD6gy2DtCYH0obBDSbwzCG6BSMF5vyr7w+XoYa4ikD2moqgo3wwgTvn8kTrTYDqQStdKp6lYuMRnGikdRDIRBqGRIMXBikpVWIVr1IAE2gIrGDUhq0sWgbkxXdfTyWvkFilgd5rQcKXIU+UmfYt3PuyGBBwAAAA==') format('woff2'),
			url('/static/fonts/iconfont.woff?t=1581411798999') format('woff'),
			url('/static/fonts/iconfont.ttf?t=1581411798999') format('truetype'),
			/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
			url('/static/fonts/iconfont.svg?t=1581411798999#iconfont') format('svg');
		/* iOS 4.1- */
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-zan:before {
		content: "\e600";
	}

	.icon-bianji:before {
		content: "\e68b";
	}





	.shop-banner-cont {
		width: 100%;

	}

	.shop-title-wrap {
		width: 100%;
		background: #FFFFFF;
	}

	.shop-title-cont {
		width: 92%;
		margin-left: 4%;
		padding-bottom: 10px;

	}

	.shop-title-ctitle {
		width: 100%;
		font-size: 16px;
		font-weight: bold;
		color: #2c2c2c;
		padding: 10px 0px;
	}

	.shop-tx-time-cont {
		width: 100%;
		height: 26px;
		line-height: 30px;
		justify-content: center;
	}

	.shop-tx-time-cont span {
		font-size: 14px;
		color: #646464;
		margin-left: 6px;
	}

	.shop-tx-time-cont label {
		float: right;
		font-size: 14px;
		vertical-align: middle;
		line-height: 34px;
	}

	.shop-ullist,
	.shop-ullist-red {
		width: 100%;
		height: 30px;
		float: left;
	}

	.shop-ullist span {
		font-size: 14px;
		color: #646464;
		margin-right: 20px;
	}

	.shop-ullist-red {
		font-size: 14px;
		margin-right: 16px;
		color: #b22420;
		height: 24px;
		line-height: 24px;
	}

	.shop-ullist-red span {
		margin-right: 20px;
	}

	.shop-ullist-ten {
		width: 100%;
		vertical-align: middle;
		justify-content: center;
	}

	.shop-ullist-ten view {
		width: 20%;
		font-size: 14px;
		display: inline-flex;
		color: #646464;
		line-height: 20px;
	}

	.shop-six-buttons-cont {
		width: 100%;
		margin-top: 10px;
		background: #FFFFFF;
		padding-bottom: 10px;
		padding-top: 2px;
	}

	.shop-six-buttons-cc span {
		justify-content: center;
		vertical-align: middle;
		text-align: center;
		display: inline-flex;
		font-size: 14px;
		color: #ed7070;
		border: 1px solid #ED7070;
		padding: 2px 4px;
		border-radius: 4px;
		width: 20%;
		margin: 0 1%;
		margin-top: 8px;
	}

	.shop-six-buttons-cc {
		width: 92%;
		margin-left: 4%;
	}

	.shop-phone-add-cont {
		width: 100%;
		background: #FFFFFF;
		margin-top: 10px;
		padding: 10px 0;
	}

	.shop-phone-add-cc {
		width: 92%;
		margin-left: 4%;

	}

	.shop-phone-add-cc text {
		font-size: 14px;
		color: #646464;
		display: inline-flex;
	}

	.sphone {
		margin-left: 16px;
	}

	.shop-xq-all-cont {
		width: 100%;
		padding: 10px 0;
		background: #FFFFFF;
		margin-top: 10px;
	}

	.shop-xq-all-cc {
		width: 92%;
		margin-left: 4%;
	}

	.shop-xq-all-cc span {
		width: 100%;
		font-size: 14px;
		color: #646464;
		line-height: 20px;
		display: block;
	}

	.shop-xq-all-cc label {
		display: inline-flex;
		justify-content: center;
		vertical-align: middle;
		width: 39%;
		margin: 0 5%;
		font-size: 14px;
		color: #ed7675;
		border: 1px solid #ed7675;
		height: 24px;
		line-height: 24px;
		border-radius: 4px;
		margin-top: 6px;
	}

	.main-four-wrap {
		width: 100%;
		float: left;
		background: #FFFFFF;
		margin-top: 10px;
	}

	.main-four-nav {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #F1F1F1;
		float: left;
	}

	.navbar {
		height: 32px;
		border-bottom: 1px solid #F1F1F1;
		width: 100%;
		float: left;
	}

	.navbar .nav-item {
		width: 16.5%;
		float: left;
		text-align: center;
		font-size: 14px;
		margin-top: 6px;
	}

	.current {
		color: #b22420;
	}

	.show-more {
		font-size: 14px;
		text-align: center;
		color: #b22420;
		margin-top: 10px;
	}

	.main-tab-list-wrap {
		width: 100%;
		float: left;
		margin-left: 0%;
		margin-top: 10px;
	}

	.main-tab-list-cont {
		width: 92%;
		float: left;
		margin-left: 4%;
		border-bottom: 1px solid #F1F1F1;
		padding-bottom: 10px;
	}

	.main-tab-title {
		width: 100%;
		height: 40px;
		line-height: 40px;
		float: left;
	}

	.main-tab-time {
		float: left;
		color: #646464;
		font-size: 14px;
	}

	.my_button {
		border: 1px solid #b22420;
		width: 70px;
		font-size: 12px;
		background-color: #FFFFFF !important;
		padding: 0 !important;
		color: #b22420 !important;
		float: right;
		margin-top: 8px;
		line-height: 24px;
	}

	.main-tab-nr {
		width: 100%;
		float: left;
	}

	.main-tab-right {
		width: 80%;
		float: right;
	}

	.main-tab-r-title {
		display: inline-block;
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		float: left;
		font-size: 14px;
	}

	.main-tab-img {
		float: left;
		width: 18%;
	}

	.main-tab-r-ddd {
		display: inline-block;
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		float: left;
		font-size: 12px;
		color: #646464;
		margin-top: 5px;
	}

	.main-four-ul,
	.main-three-ul {
		float: left;
		display: inline-block;
		width: 100%;
		padding: 0;
		margin-top: 5px;
	}

	.main-four-ul li {
		float: left;
		color: #999999;
		margin-right: 14px;
		font-size: 12px;
	}

	.main-three-ul li {
		width: 33%;
		float: left;
		color: #b22420;
		font-size: 12px;
	}

	.inv-h-w {
		width: 92%;
		margin-left: 4%;
		height: 40px;
		line-height: 34px;
		float: left;
	}

	.inv-h-w view {
		width: 25%;
		display: inline-block;
		font-size: 14px;
		text-align: center;
	}

	.small-tab {
		width: 92%;
		margin-left: 4%;
		padding-bottom: 10px;
		float: left;
		margin-top: 10px;
	}

	.main-tb-title {
		width: 100%;
		float: left;
	}

	.main-tb-title span {
		font-size: 12px;
		color: #646464;
		float: left;
		line-height: 14px;
	}

	.main-tb-title label {
		float: right;
		font-size: 12px;
		color: #b22420;
		border: 1px solid #b22420;
		height: 20px;
		line-height: 20px;
		padding: 0 10px;
		border-radius: 4px;
	}

	.main-tab-r-b {
		width: 100%;
		float: left;
	}

	.main-tab-r-b span {
		font-size: 12px;
		width: 33%;
		display: inline-flex;
		color: #999999;
	}

	.four-button {
		width: 100%;
		height: 54px;
		background: #FFFFFF;
		margin-top: 10px;
	}

	.four-button a {
		display: inline-flex;
		width: 25%;
		height: 54px;
		text-align: center;
		justify-content: center;

	}

	.four-button a img {
		height: 40px;
		margin-top: 7px;
	}

	.stabl-title-cont {
		width: 100%;
		height: 26px;
		line-height: 26px;
	}

	.stabl-title-cont span {
		font-size: 14px;
		margin-left: 10px;
		margin-right: 10px;
	}

	.stabl-title-cont label {
		font-size: 14px;
		color: #aeaeae;
		float: right;
	}

	.stabl-title-cont i {
		float: right;
		font-size: 14px;
		color: #b22420;
		border: 1px solid #B22420;
		padding: 0 10px;
		border-radius: 4px;
		height: 20px;
		line-height: 20px;
		margin-top: 3px;
		margin-left: 6px;
	}

	.stable-dl {
		width: 100%;
		font-size: 14px;
		color: #8e8e8e;
		margin-top: 6px;
		line-height: 20px;
	}

	.shop-main-four .inv-h {
		color: #666666;
	}

	.shop-main-four .inv-h-se {
		color: #B22420;
	}

	.main-tab-title i {
		float: right;
		font-size: 14px;
		color: #b22420;
		border: 1px solid #B22420;
		padding: 0 10px;
		border-radius: 4px;
		height: 20px;
		line-height: 20px;
		margin-top: 8px;
		margin-left: 6px;
	}

	.smtab-imgs {
		width: 100%;
	}

	.smtab-imgs img {
		width: 31%;
		margin: 1% 1%;
	}

	.smtab-five img {
		width: 18%;
		margin: 4px 6px 4px 0;
	}

	.small-tab-timeer {
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		color: #8e8e8e;
	}

	.small-tab-timeer i {
		font-size: 14px;
		color: #8e8e8e;
		float: left;
	}

	.small-tab-icons {
		float: right;
		margin-left: 10px;
	}

	.small-tab-borderb {
		border-bottom: 1px solid #F1F1F1;
		padding-bottom: 0 !important;
		margin-top: 10px;
	}

	.newshf-wrap {
		width: 100%;
	}

	.news-hf-zi {
		width: 100%;
		font-size: 16px;
		font-family: '微软雅黑';
		margin-top: 10px;
		margin-bottom: 4px;
	}

	.news-hf-cont {
		width: 92%;
		background: #f4f4f4;
		padding: 2% 4%;
		border-radius: 4px;
		margin-bottom: 10px;
	}

	.x-hf-title-cont {
		color: #838383;
	}

	.fbsx-button-wrap {
		width: 100%;
		margin: 4px 0;
		float: left;

	}

	.fbsx-button-wrap span {
		color: #ed7070;
		border: 1px solid #ed7070;
		font-size: 14px;
		border-radius: 4px;
		float: right;
		margin-right: 4%;
		padding: 2px 4px;
	}

	.sx-bigtab {
		margin-top: -6px;
	}

	.sx-bigtab uni-view {
		width: 36% !important;
	}

	.invxs-right .main-tab-img {
		float: right;
	}

	.invxs-right .main-tab-right {
		float: left;
	}

	.invxs-right .main-four-ul li {
		margin-top: 6px;
		color: #646464;
	}

	.tg-red {
		color: #b30000;
	}


	/* 商讯详情 */
	.shop-four-cc span {
		font-size: 13px;
	}

	.sssh-wrap {
		width: 100%;
		background: #FFFFFF;
		margin-top: 10px;
		margin-bottom: 10px;
		float: left;
		padding-top: 10px;
	}

	.sssh-xq-list {
		width: 100%;
		float: left;
		background: #FFFFFF;
	}

	.sssh-xq-listcont {
		width: 92%;
		margin-left: 4%;
		padding-bottom: 10px;
	}

	.sssh-xq-listcont span {
		font-size: 14px;
		line-height: 18px;
		display: inline-flex;
		color: #646464;
		margin-bottom: 10px;
	}

	.sypj-pj-wrap {
		width: 100%;
		background: #FFFFFF;
		margin-top: 10px;
		float: left;

	}

	.sypj-pj-list-cont {
		width: 92%;
		margin-left: 4%;

	}

	.sypj-title {
		width: 92%;
		margin-left: 4%;
		height: 30px;
		float: left;
		line-height: 30px;
		margin-top: 12px;
	}

	.sypj-title span {
		font-size: 16px;
		float: left;
	}

	.sypj-title label {
		font-size: 13px;
		color: #999999;
		float: left;
		margin-left: 4px;
	}

	.sqjr-wrap,
	.ffjr-wrap {
		width: 100%;
		float: left;
		background: #FFFFFF;
		margin-top: 10px;
	}

	.sqjr-wrap span {
		font-size: 14px;
		color: #181818;
		display: inline-block;
		width: 100%;
		text-align: center;
		margin-top: 30px;
		margin-bottom: 14px;

	}

	.sqjr-wrap label,
	.ffrj-label {
		width: 100%;
		text-align: center;
		display: inline-block;
		font-size: 14px;
		color: #646464;
		line-height: 150%;
		margin: 10px 0px;
	}

	.sqjr-wrap b,
	.ffjr-btn {
		background: #f27273;
		border-radius: 4px;
		width: 40%;
		margin-left: 30%;
		float: left;
		height: 30px;
		line-height: 30px;
		color: #FFFFFF;
		font-size: 14px;
		font-weight: 300;
		text-align: center;
		margin-top: 10px;
		margin-bottom: 26px;

	}

	.ffjr-wrap {
		padding-top: 20px;
	}

	.ffjr-list-wrap {
		width: 92%;
		margin-left: 4%;
		float: left;
		height: 40px;
		line-height: 40px;
		margin-bottom: 4px;

	}

	.ffjr-list-wrap span {
		font-size: 14px;
		border-left: 4px solid #f27273;
		float: left;
		height: 14px;
		line-height: 14px;
		margin-top: 13px;
		text-indent: 4px;


	}

	.ffjr-list-wrap label {
		font-size: 14px;
		color: #F00000;
		float: left;
		margin-left: 20px;
	}

	.ffjr-list-wrap b {
		width: 100px;
		height: 30px;
		line-height: 30px;
		display: block;
		float: right;
		background: #F27273;
		color: #FFFFFF;
		font-size: 14px;
		font-weight: 300;
		border-radius: 4px;
		text-align: center;
		margin-top: 5px;
	}
</style>

