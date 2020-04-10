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
		<view class="sqjr-wrap" style="display: none;">
			<span>申请条件：据了解爱死了放假了就爱睡觉打发时间地方</span>
			<label>您需要符合加入条件，才能点击申请加入，<br>申请提交后请等待商区审核</label>
			<b>申请加入</b>
		</view>
		<!-- 隐藏申请加入 end -->
		
		<!-- 隐藏开放加入 start -->
		<view class="sqjr-wrap" style="display: none;">
			<label style="margin-top: 30px;margin-bottom: 10px;">您可以直接点击加入，无需审核与付费</label>
			<b>点击加入</b>
		</view>
		<!-- 隐藏开放加入 end -->
		
		<!-- 隐藏付费加入 start -->
		<view class="ffjr-wrap" style="display: none;">
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
		
		<view class="main-four-wrap shop-main-four">
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
				<view class="main-tab-list-wrap invxs-right" style="margin-top: 10px;">
					<view class="main-tab-list-cont">
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
									<span class="tg-red">推广(有)￥10000</span>
								</ul>
							</view>
						</view>
					</view>
				</view>
				<view class="main-tab-list-wrap invxs-right" style="margin-top: 10px;">
					<view class="main-tab-list-cont">
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
									<span class="tg-red">推广(有)￥10000</span>
								</ul>
							</view>
						</view>
					</view>
				</view>
				<view class="main-tab-list-wrap invxs-right" style="margin-top: 10px;">
					<view class="main-tab-list-cont">
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
									<span class="tg-red">推广(有)￥10000</span>
								</ul>
							</view>
						</view>
					</view>
				</view>
			
			</view>
			<view class="list" v-show="tabCurrentIndex === 1">
				<view class="main-tab-list-wrap">
					<view class="main-tab-list-cont">
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
			<view class="list" v-show="tabCurrentIndex === 2">
				<view class="small-tab small-tab-borderb">
					<view class="stabl-title-cont">
						<img src="static/images/fx_tx.png" alt="" height="100%" />
						<span>胖胖子</span>
					</view>
					<view class="stable-dl">
						成员备注成员备注成员备注成员备注成员备注成员备注成员备注
					</view>
					<view class="smtab-imgs">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
					</view>
					<view class="small-tab-timeer">
						<i>2019-02-19</i>
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
				<view class="small-tab small-tab-borderb">
					<view class="stabl-title-cont">
						<img src="static/images/fx_tx.png" alt="" height="100%" />
						<span>胖胖子</span>
					</view>
					<view class="stable-dl">
						成员备注成员备注成员备注成员备注成员备注成员备注成员备注
					</view>
					<view class="smtab-imgs">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
					</view>
					<view class="small-tab-timeer">
						<i>2019-02-19</i>
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
				<view class="small-tab small-tab-borderb">
					<view class="stabl-title-cont">
						<img src="static/images/fx_tx.png" alt="" height="100%" />
						<span>胖胖子</span>
					</view>
					<view class="stable-dl">
						成员备注成员备注成员备注成员备注成员备注成员备注成员备注
					</view>
					<view class="smtab-imgs">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
					</view>
					<view class="small-tab-timeer">
						<i>2019-02-19</i>
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
				<view class="small-tab small-tab-borderb">
					<view class="stabl-title-cont">
						<img src="static/images/fx_tx.png" alt="" height="100%" />
						<span>胖胖子</span>
					</view>
					<view class="stable-dl">
						成员备注成员备注成员备注成员备注成员备注成员备注成员备注
					</view>
					<view class="smtab-imgs smtab-five">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
					</view>
					<view class="small-tab-timeer">
						<i>2019-02-19</i>
						<view class="small-tab-icons">
							<span class="icon iconfont">&#xe68b;</span>
							<label>12580</label>
						</view>
						<view class="small-tab-icons">
							<span class="icon iconfont">&#xe600;</span>
							<label>12580</label>
						</view>
					</view>
					<view class="newshf-wrap">
						<view class="news-hf-zi">
							最新回答
						</view>
						<view class="news-hf-cont">
							<view class="stabl-title-cont x-hf-title-cont">
								<img src="static/images/fx_tx.png" alt="" height="100%" />
								<span>胖胖子</span>
								<label>2019-02-19</label>
							</view>
							<view class="stable-dl">
								成员备注成员备注成员备注成员备注成员备注成员备注成员备注
							</view>
						</view>
					</view>
				</view>
				
			</view>
			<view class="list" v-show="tabCurrentIndex === 4">
				<view class="small-tab small-tab-borderb">
					<view class="stabl-title-cont">
						<img src="static/images/fx_tx.png" alt="" height="100%" />
						<span>胖胖子</span>
						
					</view>
					<view class="stable-dl">
						成员备注成员备注成员备注成员备注成员备注成员备注成员备注
					</view>
					<view class="smtab-imgs smtab-five">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
					</view>
					<view class="small-tab-timeer">
						<i>2019-02-19</i>
						<view class="small-tab-icons">
							<span class="icon iconfont">&#xe68b;</span>
							<label>12580</label>
						</view>
						<view class="small-tab-icons">
							<span class="icon iconfont">&#xe600;</span>
							<label>12580</label>
						</view>
					</view>
					<view class="newshf-wrap">
						<view class="news-hf-zi">
							最新回答
						</view>
						<view class="news-hf-cont">
							<view class="stabl-title-cont x-hf-title-cont">
								<img src="static/images/fx_tx.png" alt="" height="100%" />
								<span>胖胖子</span>
								<label>2019-02-19</label>
							</view>
							<view class="stable-dl">
								成员备注成员备注成员备注成员备注成员备注成员备注成员备注
							</view>
						</view>
					</view>
				</view>
				<view class="small-tab small-tab-borderb">
					<view class="stabl-title-cont">
						<img src="static/images/fx_tx.png" alt="" height="100%" />
						<span>胖胖子</span>
						
					</view>
					<view class="stable-dl">
						成员备注成员备注成员备注成员备注成员备注成员备注成员备注
					</view>
					<view class="smtab-imgs smtab-five">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
					</view>
					<view class="small-tab-timeer">
						<i>2019-02-19</i>
						<view class="small-tab-icons">
							<span class="icon iconfont">&#xe68b;</span>
							<label>12580</label>
						</view>
						<view class="small-tab-icons">
							<span class="icon iconfont">&#xe600;</span>
							<label>12580</label>
						</view>
					</view>
					<view class="newshf-wrap">
						<view class="news-hf-zi">
							最新回答
						</view>
						<view class="news-hf-cont">
							<view class="stabl-title-cont x-hf-title-cont">
								<img src="static/images/fx_tx.png" alt="" height="100%" />
								<span>胖胖子</span>
								<label>2019-02-19</label>
							</view>
							<view class="stable-dl">
								成员备注成员备注成员备注成员备注成员备注成员备注成员备注
							</view>
						</view>
					</view>
				</view>
				<view class="small-tab small-tab-borderb">
					<view class="stabl-title-cont">
						<img src="static/images/fx_tx.png" alt="" height="100%" />
						<span>胖胖子</span>
						
					</view>
					<view class="stable-dl">
						成员备注成员备注成员备注成员备注成员备注成员备注成员备注
					</view>
					<view class="smtab-imgs smtab-five">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
					</view>
					<view class="small-tab-timeer">
						<i>2019-02-19</i>
						<view class="small-tab-icons">
							<span class="icon iconfont">&#xe68b;</span>
							<label>12580</label>
						</view>
						<view class="small-tab-icons">
							<span class="icon iconfont">&#xe600;</span>
							<label>12580</label>
						</view>
					</view>
					<view class="newshf-wrap">
						<view class="news-hf-zi">
							最新回答
						</view>
						<view class="news-hf-cont">
							<view class="stabl-title-cont x-hf-title-cont">
								<img src="static/images/fx_tx.png" alt="" height="100%" />
								<span>胖胖子</span>
								<label>2019-02-19</label>
							</view>
							<view class="stable-dl">
								成员备注成员备注成员备注成员备注成员备注成员备注成员备注
							</view>
						</view>
					</view>
				</view>
				<view class="small-tab small-tab-borderb">
					<view class="stabl-title-cont">
						<img src="static/images/fx_tx.png" alt="" height="100%" />
						<span>胖胖子</span>
						
					</view>
					<view class="stable-dl">
						成员备注成员备注成员备注成员备注成员备注成员备注成员备注
					</view>
					<view class="smtab-imgs smtab-five">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
						<img src="static/images/shangqu-img.png" alt="">
					</view>
					<view class="small-tab-timeer">
						<i>2019-02-19</i>
						<view class="small-tab-icons">
							<span class="icon iconfont">&#xe68b;</span>
							<label>12580</label>
						</view>
						<view class="small-tab-icons">
							<span class="icon iconfont">&#xe600;</span>
							<label>12580</label>
						</view>
					</view>
					<view class="newshf-wrap">
						<view class="news-hf-zi">
							最新回答
						</view>
						<view class="news-hf-cont">
							<view class="stabl-title-cont x-hf-title-cont">
								<img src="static/images/fx_tx.png" alt="" height="100%" />
								<span>胖胖子</span>
								<label>2019-02-19</label>
							</view>
							<view class="stable-dl">
								成员备注成员备注成员备注成员备注成员备注成员备注成员备注
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="list" v-show="tabCurrentIndex === 5">
				<view class="small-tab">
					<view class="stabl-title-cont">
						<img src="static/images/fx_tx.png" alt="" height="100%" />
						<span>胖胖子</span>
						<label>2019-06-29</label>
					</view>
				</view>
				<view class="small-tab">
					<view class="stabl-title-cont">
						<img src="static/images/fx_tx.png" alt="" height="100%" />
						<span>胖胖子</span>
						<label>2019-06-29</label>
					</view>
				</view>
				<view class="small-tab">
					<view class="stabl-title-cont">
						<img src="static/images/fx_tx.png" alt="" height="100%" />
						<span>胖胖子</span>
						<label>2019-06-29</label>
					</view>
				</view>
				<view class="small-tab">
					<view class="stabl-title-cont">
						<img src="static/images/fx_tx.png" alt="" height="100%" />
						<span>胖胖子</span>
						<label>2019-06-29</label>
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

				showAll:false, 
				 
				Inv:0,   //小切换
				Inv1:0,   //小切换
				Inv2:0,   //小切换
				Inv3:0,   //小切换
				Inv4:0,   //小切换
				Invx1:0,   //商讯大tab
				Invxs1:0,   //商讯大tab
				Invxs2:0,   //商讯大tab
				
				　
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
