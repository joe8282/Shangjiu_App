<template>
	<view class="content">
		<view class="shop-banner-cont">
			<img src="static/images/shop-banner.jpg" alt="">
		</view>
		<view class="shop-title-wrap">
			<view class="shop-title-cont">
				<view class="shop-title-ctitle">这是商区标题这是商区标题这是</view>
				<view class="shop-tx-time-cont">
					<img src="static/images/my-tx.png" alt="" width="23"/>
					<span>爱吃面包的猫</span>
					<label>2019-07-08</label>
				</view>
				<view class="shop-ullist">
					<span>身份</span>
					<span>类型</span>
					<span>行业</span>
					<span>区域</span>
				</view>
				<view class="shop-ullist-red">
					<span>免费加入</span>
					<span>推广（有）</span>
					<span>红包（无）</span>
				</view>
				<view class="shop-ullist-ten">
					<view class="shop-ullist-ll">
						<span>成员</span>
						<label>123</label>
					</view>
					<view class="shop-ullist-ll">
						<span>内容</span>
						<label>123</label>
					</view>
					<view class="shop-ullist-ll">
						<span>商链</span>
						<label>123</label>
					</view>
					<view class="shop-ullist-ll">
						<span>说说</span>
						<label>123</label>
					</view>
					<view class="shop-ullist-ll">
						<span>问答</span>
						<label>123</label>
					</view>
					<view class="shop-ullist-ll">
						<span>留言</span>
						<label>123</label>
					</view>
					<view class="shop-ullist-ll">
						<span>人气</span>
						<label>123</label>
					</view>
					<view class="shop-ullist-ll">
						<span>关注</span>
						<label>123</label>
					</view>
					<view class="shop-ullist-ll">
						<span>打赏</span>
						<label>123</label>
					</view>
					<view class="shop-ullist-ll">
						<span>点赞</span>
						<label>123</label>
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
				<text>联系人：李先生</text>
				<text class="sphone">电话：12345678941</text><br>
				<text>地址：徐州市、铜山区、某某街道、45号某某商城</text>
			</view>
		</view>
		
		<view class="shop-xq-all-cont">
			<view class="shop-xq-all-cc">
				<span>会员可根据需要创建多个商号，用于商家经营推广、创 业、接活；做自媒与内容。商号为创新社群模式，内置 “商讯、商链、说说、问答、</span>
				<label>查看详细介绍</label>
				<label>生成我的商区码</label>
				<label>查看商区代理</label>
				<label>申请商区代理</label>
			</view>
		</view>
		<view class="four-button">
			<span><img src="static/images/t.png" alt="" /></span>
			<span><img src="static/images/l.png" alt="" /></span>
			<span><img src="static/images/g.png" alt="" /></span>
			<span><img src="static/images/f.png" alt="" /></span>
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
				<!-- {{ item.state }} -->
				<view class="main-tab-list-wrap">
					<view class="main-tab-list-cont">
						00
					</view>
				</view>
				<view class="main-tab-list-wrap">
					<view class="main-tab-list-cont">
						00
					</view>
				</view>
				<view class="main-tab-list-wrap">
					<view class="main-tab-list-cont">
						00
					</view>
				</view>
			</view>
			<view class="list" v-show="tabCurrentIndex === 1">
				<!-- {{ item.state }} -->
				<view class="main-tab-list-wrap">
					111
				</view>
				<view class="main-tab-list-wrap">
					<view class="main-tab-list-cont">
						111
					</view>
				</view>
				
			</view>
			<view class="list" v-show="tabCurrentIndex === 2">
				<!-- {{ item.state }} -->
				<view class="main-tab-list-wrap">
					<view class="main-tab-list-cont">
						<!-- <view class="main-tab-title">
							<span class="main-tab-time">2019-09-25</span>
							<button   @click="favor" class="my_button" :style="{backgroundColor:bg_color, color: ft_color,}" @mouseenter="change()" @mouseleave="goback()">
								{{content}}
							</button>
						</view>
						<view class="main-tab-nr">
							<img src="static/images/shangqu-img.png" alt="" class="main-tab-img" />
							<view class="main-tab-right">
								<span class="main-tab-r-title">黑乎乎的返回拉萨觉得浪费精力是大家</span>
								<label class="main-tab-r-ddd">是多久啊来开发时间浪费精力撒旦解放了吉了吉了吉解放了吉</label>
								<ul class="main-four-ul">
									<li>身份</li>
									<li>类型</li>
									<li>行业</li>
									<li>区域</li>
								</ul>
								<ul class="main-three-ul">
									<li>免费加入</li>
									<li>推广（有）</li>
									<li>红包（无）</li>
								</ul>
							</view>
						</view> -->
					</view>
				</view>
				<view class="main-tab-list-wrap">
					<view class="main-tab-list-cont">
						<view class="main-tab-title">
							<span class="main-tab-time">2019-09-25</span>
							<button   @click="favor" class="my_button" :style="{backgroundColor:bg_color, color: ft_color,}" @mouseenter="change()" @mouseleave="goback()">
								{{content}}
							</button>
						</view>
						<view class="main-tab-nr">
							<img src="static/images/shangqu-img.png" alt="" class="main-tab-img" />
							<view class="main-tab-right">
								<span class="main-tab-r-title">黑乎乎的返回拉萨觉得浪费精力是大家</span>
								<label class="main-tab-r-ddd">是多久啊来开发时间浪费精力撒旦解放了吉了吉了吉解放了吉</label>
								<ul class="main-four-ul">
									<li>身份</li>
									<li>类型</li>
									<li>行业</li>
									<li>区域</li>
								</ul>
								<ul class="main-three-ul">
									<li>免费加入</li>
									<li>推广（有）</li>
									<li>红包（无）</li>
								</ul>
							</view>
						</view>
					</view>
				</view>
				<view class="main-tab-list-wrap">
					<view class="main-tab-list-cont">
						<view class="main-tab-title">
							<span class="main-tab-time">2019-09-25</span>
							<button   @click="favor" class="my_button" :style="{backgroundColor:bg_color, color: ft_color,}" @mouseenter="change()" @mouseleave="goback()">
								{{content}}
							</button>
						</view>
						<view class="main-tab-nr">
							<img src="static/images/shangqu-img.png" alt="" class="main-tab-img" />
							<view class="main-tab-right">
								<span class="main-tab-r-title">黑乎乎的返回拉萨觉得浪费精力是大家</span>
								<label class="main-tab-r-ddd">是多久啊来开发时间浪费精力撒旦解放了吉了吉了吉解放了吉</label>
								<ul class="main-four-ul">
									<li>身份</li>
									<li>类型</li>
									<li>行业</li>
									<li>区域</li>
								</ul>
								<ul class="main-three-ul">
									<li>免费加入</li>
									<li>推广（有）</li>
									<li>红包（无）</li>
								</ul>
							</view>
						</view>
					</view>
				</view>
				<view class="main-tab-list-wrap">
					<view class="main-tab-list-cont">
						<view class="main-tab-title">
							<span class="main-tab-time">2019-09-25</span>
							<button   @click="favor" class="my_button" :style="{backgroundColor:bg_color, color: ft_color,}" @mouseenter="change()" @mouseleave="goback()">
								{{content}}
							</button>
						</view>
						<view class="main-tab-nr">
							<img src="static/images/shangqu-img.png" alt="" class="main-tab-img" />
							<view class="main-tab-right">
								<span class="main-tab-r-title">黑乎乎的返回拉萨觉得浪费精力是大家</span>
								<label class="main-tab-r-ddd">是多久啊来开发时间浪费精力撒旦解放了吉了吉了吉解放了吉</label>
								<ul class="main-four-ul">
									<li>身份</li>
									<li>类型</li>
									<li>行业</li>
									<li>区域</li>
								</ul>
								<ul class="main-three-ul">
									<li>免费加入</li>
									<li>推广（有）</li>
									<li>红包（无）</li>
								</ul>
							</view>
						</view>
					</view>
				</view>
				<view class="main-tab-list-wrap">
					<view class="main-tab-list-cont">
						<view class="main-tab-title">
							<span class="main-tab-time">2019-09-25</span>
							<button   @click="favor" class="my_button" :style="{backgroundColor:bg_color, color: ft_color,}" @mouseenter="change()" @mouseleave="goback()">
								{{content}}
							</button>
						</view>
						<view class="main-tab-nr">
							<img src="static/images/shangqu-img.png" alt="" class="main-tab-img" />
							<view class="main-tab-right">
								<span class="main-tab-r-title">黑乎乎的返回拉萨觉得浪费精力是大家</span>
								<label class="main-tab-r-ddd">是多久啊来开发时间浪费精力撒旦解放了吉了吉了吉解放了吉</label>
								<ul class="main-four-ul">
									<li>身份</li>
									<li>类型</li>
									<li>行业</li>
									<li>区域</li>
								</ul>
								<ul class="main-three-ul">
									<li>免费加入</li>
									<li>推广（有）</li>
									<li>红包（无）</li>
								</ul>
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<view class="list" v-show="tabCurrentIndex === 3">
				<!-- {{ item.state }} -->
				<view class="main-tab-list-wrap">
					<view class="main-tab-list-cont">
						333
					</view>
				</view>
				<view class="main-tab-list-wrap">
					<view class="main-tab-list-cont">
						333
					</view>
				</view>
				<view class="main-tab-list-wrap">
					<view class="main-tab-list-cont">
						333
					</view>
				</view>
				
			</view>
			<view class="list" v-show="tabCurrentIndex === 4">
				<!-- {{ item.state }} -->
				<view class="main-tab-list-wrap">
					<view class="main-tab-list-cont">
						444
					</view>
				</view>
				<view class="main-tab-list-wrap">
					<view class="main-tab-list-cont">
						444
					</view>
				</view>
				<view class="main-tab-list-wrap">
					<view class="main-tab-list-cont">
						444
					</view>
				</view>
				
			</view>
			<view class="list" v-show="tabCurrentIndex === 5">
				<view class="inv-h-w">
					<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">通过(20)</view>
					<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">停止(20)</view>
					<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">待审(20)</view>
					<view :class="['inv-h',Inv==3?'inv-h-se':'']" @click="Inv=3">拒绝(20)</view>
				</view>
				<view class="" v-show="Inv == 0">
					<view class="small-tab">
						<view class="stabl-title-cont">
							<img src="static/images/fx_tx.png" alt="" height="100%" />
							<span>胖胖子</span>
							<label>2019-06-29</label>
							
							<i>拒绝</i>
							<i>通过</i>
						</view>
						<view class="stable-dl">
							成员备注成员备注成员备注成员备注成员备注成员备注成员备注
						</view>
					</view>
					<view class="small-tab">
						<view class="stabl-title-cont">
							<img src="static/images/fx_tx.png" alt="" height="100%" />
							<span>胖胖子</span>
							<label>2019-06-29</label>
							
							<i>拒绝</i>
							<i>通过</i>
						</view>
						<view class="stable-dl">
							成员备注成员备注成员备注成员备注成员备注成员备注成员备注
						</view>
					</view>
					<view class="small-tab">
						<view class="stabl-title-cont">
							<img src="static/images/fx_tx.png" alt="" height="100%" />
							<span>胖胖子</span>
							<label>2019-06-29</label>
							
							<i>拒绝</i>
							<i>通过</i>
						</view>
						<view class="stable-dl">
							成员备注成员备注成员备注成员备注成员备注成员备注成员备注
						</view>
					</view>
					
				</view>
				<view class="" v-show="Inv == 1">
					<view class="small-tab">
						<view class="stabl-title-cont">
							<img src="static/images/fx_tx.png" alt="" height="100%" />
							<span>胖胖子</span>
							<label>2019-06-29</label>
							
							<i>拒绝</i>
							<i>通过</i>
						</view>
						<view class="stable-dl">
							成员备注成员备注成员备注成员备注成员备注成员备注成员备注
						</view>
					</view>
				</view>
				<view class="" v-show="Inv == 2">
					<view class="small-tab">
						<view class="stabl-title-cont">
							<img src="static/images/fx_tx.png" alt="" height="100%" />
							<span>胖胖子</span>
							<label>2019-06-29</label>
							
							<i>拒绝</i>
							<i>通过</i>
						</view>
						<view class="stable-dl">
							成员备注成员备注成员备注成员备注成员备注成员备注成员备注
						</view>
					</view>
					<view class="small-tab">
						<view class="stabl-title-cont">
							<img src="static/images/fx_tx.png" alt="" height="100%" />
							<span>胖胖子</span>
							<label>2019-06-29</label>
							
							<i>拒绝</i>
							<i>通过</i>
						</view>
						<view class="stable-dl">
							成员备注成员备注成员备注成员备注成员备注成员备注成员备注
						</view>
					</view>
				</view>
				<view class="" v-show="Inv == 3">
					<view class="small-tab">
						<view class="stabl-title-cont">
							<img src="static/images/fx_tx.png" alt="" height="100%" />
							<span>胖胖子</span>
							<label>2019-06-29</label>
							
							<i>拒绝</i>
							<i>通过</i>
						</view>
						<view class="stable-dl">
							成员备注成员备注成员备注成员备注成员备注成员备注成员备注
						</view>
					</view>
				</view>
				<view class="" v-show="Inv == 4">
					<view class="small-tab">
						<view class="stabl-title-cont">
							<img src="static/images/fx_tx.png" alt="" height="100%" />
							<span>胖胖子</span>
							<label>2019-06-29</label>
							
							<i>拒绝</i>
							<i>通过</i>
						</view>
						<view class="stable-dl">
							成员备注成员备注成员备注成员备注成员备注成员备注成员备注
						</view>
					</view>
					<view class="small-tab">
						<view class="stabl-title-cont">
							<img src="static/images/fx_tx.png" alt="" height="100%" />
							<span>胖胖子</span>
							<label>2019-06-29</label>
							
							<i>拒绝</i>
							<i>通过</i>
						</view>
						<view class="stable-dl">
							成员备注成员备注成员备注成员备注成员备注成员备注成员备注
						</view>
					</view>
					<view class="small-tab">
						<view class="stabl-title-cont">
							<img src="static/images/fx_tx.png" alt="" height="100%" />
							<span>胖胖子</span>
							<label>2019-06-29</label>
							
							<i>拒绝</i>
							<i>通过</i>
						</view>
						<view class="stable-dl">
							成员备注成员备注成员备注成员备注成员备注成员备注成员备注
						</view>
					</view>
					
				</view>
				
			</view>
		</view>
		
	</view>
	
</template>

<script>
	import 'pages/shop/shop.css';
	import uniFav from "@/components/uni-fav/uni-fav.vue"
	export default {
		components: {
			uniFav
		},
		data() {
			return {
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
			// 页面显示是默认选中第一个
			this.tabCurrentIndex = 0;
			this.tabCurrentIndex1 = 0;
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
