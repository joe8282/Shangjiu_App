<template>
	<view class="content">
		<view class="shop-banner-cont">
			<img :src="ShopPic">
		</view>
		<view class="shop-title-wrap">
			<view class="shop-title-cont">
				<view class="shop-title-ctitle">{{ShopTitle}}</view>
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
				<view class="fbsx-button-wrap">
					<navigator :url="'../productAdd/productAdd?id=' + this.proId">
					<span>发布商讯</span>
					</navigator>
				</view>
				<view class="inv-h-w sx-bigtab" style="margin-bottom: -10px;">
					<view :class="['inv-h',Invx1==0?'inv-h-se':'']" @click="Invx1=0">我的商讯(120)</view>
					<view :class="['inv-h',Invx1==1?'inv-h-se':'']" @click="Invx1=1">外部投稿(120)</view>
				</view>
				<view class="" v-show="Invx1 == 0">
					<view class="inv-h-w" style="margin-bottom: -10px;">
						<view :class="['inv-h',Invxs1==0?'inv-h-se':'']" @click="Invxs1=0">公开(20)</view>
						<view :class="['inv-h',Invxs1==1?'inv-h-se':'']" @click="Invxs1=1">私存(20)</view>
						<view :class="['inv-h',Invxs1==2?'inv-h-se':'']" @click="Invxs1=2">待审(20)</view>
						<view :class="['inv-h',Invxs1==3?'inv-h-se':'']" @click="Invxs1=3">拒绝(20)</view>
					</view>
					<view class="" v-show="Invxs1 == 0">
						<view class="main-tab-list-wrap invxs-right" v-for="(item , index) in gongkai">
							<view class="main-tab-list-cont">
								<view class="main-tab-title">
									<span class="main-tab-time">{{ item.CreateTime }}</span>
									<i>取消置顶</i>
									<i @click="gongkaiClick(e)" :data-id="item.Id" :data-Status="item.Status">私存</i>
								</view>
								<view class="main-tab-nr">
									<img :src="item.ProductPic" alt="" class="main-tab-img" />
									<view class="main-tab-right">
										<span class="main-tab-r-title">{{ item.ProductTitle }}</span>
										<label class="main-tab-r-ddd">{{ item.ProductRemark }}</label>
										<ul class="main-four-ul">
											<li>{{ item.ChannelName }}</li>
											<li>{{ item.TypeName }}</li>
											<li>{{ item.ClassName }}</li>
											<li>{{ item.City }} {{ item.Area }}</li>
											<span class="tg-red">推广({{ item.IsAd }})</span>
										</ul>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="" v-show="Invxs1 == 1">
						<view class="main-tab-list-wrap invxs-right" v-for="(item , index) in sicun">
							<view class="main-tab-list-cont">
								<view class="main-tab-title">
									<span class="main-tab-time">{{ item.CreateTime }}</span>
									<i @click="sicunClick(e)" :data-id="item.Id" :data-Status="item.Status">公开</i>
								</view>
								<view class="main-tab-nr">
									<img :src="item.ProductPic" alt="" class="main-tab-img" />
									<view class="main-tab-right">
										<span class="main-tab-r-title">{{ item.ProductTitle }}</span>
										<label class="main-tab-r-ddd">{{ item.ProductRemark }}</label>
										<ul class="main-four-ul">
											<li>{{ item.ChannelName }}</li>
											<li>{{ item.TypeName }}</li>
											<li>{{ item.ClassName }}</li>
											<li>{{ item.City }} {{ item.Area }}</li>
										</ul>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="" v-show="Invxs1 == 2">
						<view class="main-tab-list-wrap invxs-right" v-for="(item , index) in daishen">
							<view class="main-tab-list-cont">
								<view class="main-tab-title">
									<span class="main-tab-time">{{ item.CreateTime }}</span>
								</view>
								<view class="main-tab-nr">
									<img :src="item.ProductPic" alt="" class="main-tab-img" />
									<view class="main-tab-right">
										<span class="main-tab-r-title">{{ item.ProductTitle }}</span>
										<label class="main-tab-r-ddd">{{ item.ProductRemark }}</label>
										<ul class="main-four-ul">
											<li>{{ item.ChannelName }}</li>
											<li>{{ item.TypeName }}</li>
											<li>{{ item.ClassName }}</li>
											<li>{{ item.City }} {{ item.Area }}</li>
										</ul>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="" v-show="Invxs1 == 3">
						<view class="main-tab-list-wrap invxs-right" v-for="(item , index) in jujue">
							<view class="main-tab-list-cont">
								<view class="main-tab-title">
									<span class="main-tab-time">{{ item.CreateTime }}</span>
								</view>
								<view class="main-tab-nr">
									<img :src="item.ProductPic" alt="" class="main-tab-img" />
									<view class="main-tab-right">
										<span class="main-tab-r-title">{{ item.ProductTitle }}</span>
										<label class="main-tab-r-ddd">{{ item.ProductRemark }}</label>
										<ul class="main-four-ul">
											<li>{{ item.ChannelName }}</li>
											<li>{{ item.TypeName }}</li>
											<li>{{ item.ClassName }}</li>
											<li>{{ item.City }} {{ item.Area }}</li>
										</ul>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="" v-show="Invx1 == 1">
					<view class="inv-h-w" style="margin-bottom: -10px;">
						<view :class="['inv-h',Invxs2==0?'inv-h-se':'']" @click="Invxs2=0">通过(20)</view>
						<view :class="['inv-h',Invxs2==1?'inv-h-se':'']" @click="Invxs2=1">停止(20)</view>
						<view :class="['inv-h',Invxs2==2?'inv-h-se':'']" @click="Invxs2=2">待审(20)</view>
						<view :class="['inv-h',Invxs2==3?'inv-h-se':'']" @click="Invxs2=3">拒绝(20)</view>
					</view>
					<view class="" v-show="Invxs2 == 0">
						<view class="main-tab-list-wrap invxs-right" v-for="(item , index) in gongkai1">
							<view class="main-tab-list-cont">
								<view class="main-tab-title">
									<span class="main-tab-time">{{ item.CreateTime }}</span>
									<i>取消置顶</i>
									<i @click="gongkai1Click(e)" :data-id="item.Id" :data-Status="item.Status">停止</i>
								</view>
								<view class="main-tab-nr">
									<img :src="item.ProductPic" alt="" class="main-tab-img" />
									<view class="main-tab-right">
										<span class="main-tab-r-title">{{ item.ProductTitle }}</span>
										<label class="main-tab-r-ddd">{{ item.ProductRemark }}</label>
										<ul class="main-four-ul">
											<li>{{ item.ChannelName }}</li>
											<li>{{ item.TypeName }}</li>
											<li>{{ item.ClassName }}</li>
											<li>{{ item.City }} {{ item.Area }}</li>
										</ul>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="" v-show="Invxs2 == 1">
						<view class="main-tab-list-wrap invxs-right" v-for="(item , index) in sicun1">
							<view class="main-tab-list-cont">
								<view class="main-tab-title">
									<span class="main-tab-time">{{ item.CreateTime }}</span>
									<i @click="sicun1Click(e)" :data-id="item.Id" :data-Status="item.Status">恢复</i>
								</view>
								<view class="main-tab-nr">
									<img :src="item.ProductPic" alt="" class="main-tab-img" />
									<view class="main-tab-right">
										<span class="main-tab-r-title">{{ item.ProductTitle }}</span>
										<label class="main-tab-r-ddd">{{ item.ProductRemark }}</label>
										<ul class="main-four-ul">
											<li>{{ item.ChannelName }}</li>
											<li>{{ item.TypeName }}</li>
											<li>{{ item.ClassName }}</li>
											<li>{{ item.City }} {{ item.Area }}</li>
										</ul>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="" v-show="Invxs2 == 2">
						<view class="main-tab-list-wrap invxs-right" v-for="(item , index) in daishen1">
							<view class="main-tab-list-cont">
								<view class="main-tab-title">
									<span class="main-tab-time">{{ item.CreateTime }}</span>
									<i @click="jujue1Click(e)" :data-id="item.Id" :data-Status="item.Status">拒绝</i>
									<i @click="tongguo1Click(e)" :data-id="item.Id" :data-Status="item.Status">通过</i>
								</view>
								<view class="main-tab-nr">
									<img :src="item.ProductPic" alt="" class="main-tab-img" />
									<view class="main-tab-right">
										<span class="main-tab-r-title">{{ item.ProductTitle }}</span>
										<label class="main-tab-r-ddd">{{ item.ProductRemark }}</label>
										<ul class="main-four-ul">
											<li>{{ item.ChannelName }}</li>
											<li>{{ item.TypeName }}</li>
											<li>{{ item.ClassName }}</li>
											<li>{{ item.City }} {{ item.Area }}</li>
										</ul>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="" v-show="Invxs2 == 3">
						<view class="main-tab-list-wrap invxs-right" v-for="(item , index) in jujue1">
							<view class="main-tab-list-cont">
								<view class="main-tab-title">
									<span class="main-tab-time">{{ item.CreateTime }}</span>
									<i @click="tongguo2Click(e)" :data-id="item.Id" :data-Status="item.Status">通过</i>
								</view>
								<view class="main-tab-nr">
									<img :src="item.ProductPic" alt="" class="main-tab-img" />
									<view class="main-tab-right">
										<span class="main-tab-r-title">{{ item.ProductTitle }}</span>
										<label class="main-tab-r-ddd">{{ item.ProductRemark }}</label>
										<ul class="main-four-ul">
											<li>{{ item.ChannelName }}</li>
											<li>{{ item.TypeName }}</li>
											<li>{{ item.ClassName }}</li>
											<li>{{ item.City }} {{ item.Area }}</li>
										</ul>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="list" v-show="tabCurrentIndex === 1">
				<view class="inv-h-w" style="margin-bottom: -10px;">
					<view :class="['inv-h',Inv1==0?'inv-h-se':'']" @click="Inv1=0">通过(20)</view>
					<view :class="['inv-h',Inv1==1?'inv-h-se':'']" @click="Inv1=1">停止(20)</view>
					<view :class="['inv-h',Inv1==2?'inv-h-se':'']" @click="Inv1=2">待审(20)</view>
					<view :class="['inv-h',Inv1==3?'inv-h-se':'']" @click="Inv1=3">拒绝(20)</view>
				</view>
				<view class="" v-show="Inv1 == 0">
					<view class="main-tab-list-wrap" v-for="(item , index) in slgongkai">
						<view class="main-tab-list-cont">
							<view class="main-tab-title">
								<span class="main-tab-time">{{ item.CreateTime }}</span>
								<i>取消置顶</i>
								<i @click="slgongkaiClick(e)" :data-id="item.Id" :data-Status="item.Status">停止</i>
							</view>
							<view class="main-tab-nr">
								<img :src="item.LinkPic" alt="" class="main-tab-img" />
								<view class="main-tab-right">
									<span class="main-tab-r-title">{{ item.ShopTitle }}</span>
									<label class="main-tab-r-ddd">{{ item.Remark }}</label>
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
					</view>
				</view>
				<view class="" v-show="Inv1 == 1">
					<view class="main-tab-list-wrap" v-for="(item , index) in slsicun">
						<view class="main-tab-list-cont">
							<view class="main-tab-title">
								<span class="main-tab-time">{{ item.CreateTime }}</span>
								<i @click="slsicunClick(e)" :data-id="item.Id" :data-Status="item.Status">恢复</i>
							</view>
							<view class="main-tab-nr">
								<img :src="item.LinkPic" alt="" class="main-tab-img" />
								<view class="main-tab-right">
									<span class="main-tab-r-title">{{ item.ShopTitle }}</span>
									<label class="main-tab-r-ddd">{{ item.Remark }}</label>
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
					</view>
				</view>
				<view class="" v-show="Inv1 == 2">
					<view class="main-tab-list-wrap" v-for="(item , index) in sldaishen">
						<view class="main-tab-list-cont">
							<view class="main-tab-title">
								<span class="main-tab-time">{{ item.CreateTime }}</span>
								<i @click="sldaishen1Click(e)" :data-id="item.Id" :data-Status="item.Status">拒绝</i>
								<i @click="sldaishen2Click(e)" :data-id="item.Id" :data-Status="item.Status">通过</i>
							</view>
							<view class="main-tab-nr">
								<img src="static/images/shangqu-img.png" alt="" class="main-tab-img" />
								<view class="main-tab-right">
									<span class="main-tab-r-title">{{ item.ShopTitle }}</span>
									<label class="main-tab-r-ddd">{{ item.Remark }}</label>
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
					</view>
				</view>
				<view class="" v-show="Inv1 == 3">
					<view class="main-tab-list-wrap" v-for="(item , index) in sljujue">
						<view class="main-tab-list-cont">
							<view class="main-tab-title">
								<span class="main-tab-time">{{ item.CreateTime }}</span>
								<i @click="sljujueClick(e)" :data-id="item.Id" :data-Status="item.Status">通过</i>
							</view>
							<view class="main-tab-nr">
								<img src="static/images/shangqu-img.png" alt="" class="main-tab-img" />
								<view class="main-tab-right">
									<span class="main-tab-r-title">{{ item.ShopTitle }}</span>
									<label class="main-tab-r-ddd">{{ item.Remark }}</label>
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
					</view>
				</view>
				
			</view>
			<view class="list" v-show="tabCurrentIndex === 2">
				<view class="inv-h-w" style="margin-bottom: -10px;">
					<view :class="['inv-h',Inv2==0?'inv-h-se':'']" @click="Inv2=0">公开(20)</view>
					<view :class="['inv-h',Inv2==1?'inv-h-se':'']" @click="Inv2=1">停止(20)</view>
				</view>
				<view class="" v-show="Inv2 == 0">
					<view class="small-tab small-tab-borderb" v-for="( item, index ) in shuoshuogk">
						<view class="stabl-title-cont">
							<img :src="item.HeadPic" alt="" height="100%" />
							<span>{{ item.RealName }}</span>
							<i>取消置顶</i>
							<i @click="ssgkClick(e)" :data-id="item.Id" :data-Status="item.Status">停止</i>
						</view>
						<view class="stable-dl">
							{{ item.CommentContent }}
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
				
				<view class="" v-show="Inv2 == 1">
					<view class="small-tab small-tab-borderb" v-for="( item, index ) in shuoshuotz">
						<view class="stabl-title-cont">
							<img :src="item.HeadPic" alt="" height="100%" />
							<span>{{ item.RealName }}</span>
							<i @click="sstzClick(e)" :data-id="item.Id" :data-Status="item.Status">恢复</i>
						</view>
						<view class="stable-dl">
							{{ item.CommentContent }}
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
			</view>
			<view class="list" v-show="tabCurrentIndex === 3">
				<view class="inv-h-w" style="margin-bottom: -10px;">
					<view :class="['inv-h',Inv3==0?'inv-h-se':'']" @click="Inv3=0">公开(20)</view>
					<view :class="['inv-h',Inv3==1?'inv-h-se':'']" @click="Inv3=1">停止(20)</view>
				</view>
				<view class="" v-show="Inv3 == 0">
					<view class="small-tab small-tab-borderb" v-for="(item,index) in wendagk">
						<view class="stabl-title-cont">
							<img :src="item.HeadPic" alt="" height="100%" />
							<span>{{ item.RealName }}</span>
							<i>取消置顶</i>
							<i @click="wdgkClick(e)" :data-id="item.Id" :data-Status="item.Status">停止</i>
						</view>
						<view class="stable-dl">
							{{ item.CommentContent }}
						</view>
						<view class="smtab-imgs smtab-five">
							<img :src="ssPics1" alt="" height="100%"/>
							<img :src="ssPics2" alt="" height="100%"/>
							<img :src="ssPics3" alt="" height="100%"/>
							<img :src="ssPics4" alt="" height="100%"/>
							<img :src="ssPics5" alt="" height="100%"/>
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
				<view class="" v-show="Inv3 == 1">
					<view class="small-tab small-tab-borderb" v-for="(item,index) in wendatz">
						<view class="stabl-title-cont">
							<img :src="item.HeadPic" alt="" height="100%" />
							<span>{{ item.RealName }}</span>
							<i @click="wdtzClick(e)" :data-id="item.Id" :data-Status="item.Status">恢复</i>
						</view>
						<view class="stable-dl">
							{{ item.CommentContent }}
						</view>
						<view class="smtab-imgs smtab-five">
							<img :src="ssPics1" alt="" height="100%"/>
							<img :src="ssPics2" alt="" height="100%"/>
							<img :src="ssPics3" alt="" height="100%"/>
							<img :src="ssPics4" alt="" height="100%"/>
							<img :src="ssPics5" alt="" height="100%"/>
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
			</view>
			<view class="list" v-show="tabCurrentIndex === 4">
				<view class="inv-h-w" style="margin-bottom: -10px;">
					<view :class="['inv-h',Inv4==0?'inv-h-se':'']" @click="Inv4=0">公开(20)</view>
					<view :class="['inv-h',Inv4==1?'inv-h-se':'']" @click="Inv4=1">停止(20)</view>
				</view>
				<view class="" v-show="Inv4 == 0">
					<view class="small-tab small-tab-borderb" v-for="(item,index) in liuyangk">
						<view class="stabl-title-cont">
							<img :src="item.HeadPic" alt="" height="100%" />
							<span>{{ item.RealName }}</span>
							<i>取消置顶</i>
							<i @click="lygkClick(e)" :data-id="item.Id" :data-Status="item.Status">停止</i>
						</view>
						<view class="stable-dl">
							{{ item.CommentContent }}
						</view>
						<view class="smtab-imgs smtab-five">
								<img :src="ssPics1" alt="" height="100%"/>
								<img :src="ssPics2" alt="" height="100%"/>
								<img :src="ssPics3" alt="" height="100%"/>
								<img :src="ssPics4" alt="" height="100%"/>
								<img :src="ssPics5" alt="" height="100%"/>
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
				<view class="" v-show="Inv4 == 1">
					<view class="small-tab small-tab-borderb" v-for="(item,index) in liuyantz">
						<view class="stabl-title-cont">
							<img :src="item.HeadPic" alt="" height="100%" />
							<span>{{ item.RealName }}</span>
							<i @click="lytzClick(e)" :data-id="item.Id" :data-Status="item.Status">恢复</i>
						</view>
						<view class="stable-dl">
							{{ item.CommentContent }}
						</view>
						<view class="smtab-imgs smtab-five">
								<img :src="ssPics1" alt="" height="100%"/>
								<img :src="ssPics2" alt="" height="100%"/>
								<img :src="ssPics3" alt="" height="100%"/>
								<img :src="ssPics4" alt="" height="100%"/>
								<img :src="ssPics5" alt="" height="100%"/>
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
			</view>
			<view class="list" v-show="tabCurrentIndex === 5">
				<view class="inv-h-w">
					<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">通过(20)</view>
					<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">停止(20)</view>
					<view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">待审(20)</view>
					<view :class="['inv-h',Inv==3?'inv-h-se':'']" @click="Inv=3">拒绝(20)</view>
				</view>
				<view class="" v-show="Inv == 0">
					<view class="small-tab" v-for="(item, index) in cygongkai">
						<view class="stabl-title-cont">
							<img :src="ShopPic" alt="" height="100%" />
							<span>{{ item.RealName }}</span>
							<label>{{ item.CreateTime }}</label>
							<i @click="cygongkaiClick(e)" :data-id="item.Id" :data-Status="item.Status">停止</i>
							<i>发送消息</i>
							<i>编辑</i>
						</view>
						<view class="stable-dl">
							{{ item.ShopRemark }}
						</view>
					</view>
				</view>
				<view class="" v-show="Inv == 1">
					<view class="small-tab" v-for="(item, index) in cysicun">
						<view class="stabl-title-cont">
							<img :src="ShopPic" alt="" height="100%" />
							<span>{{ item.RealName }}</span>
							<label>{{ item.CreateTime }}</label>
							
							<i @click="cysicunClick(e)" :data-id="item.Id" :data-Status="item.Status">恢复</i>
						</view>
						<view class="stable-dl">
							{{ item.ShopRemark }}
						</view>
					</view>
				</view>
				<view class="" v-show="Inv == 2">
					<view class="small-tab" v-for="(item, index) in cydaishen">
						<view class="stabl-title-cont">
							<img :src="ShopPic" alt="" height="100%" />
							<span>{{ item.RealName }}</span>
							<label>{{ item.CreateTime }}</label>
							
							<i @click="cydaishen1Click(e)" :data-id="item.Id" :data-Status="item.Status">拒绝</i>
							<i @click="cydaishen2Click(e)" :data-id="item.Id" :data-Status="item.Status">通过</i>
						</view>
						<view class="stable-dl">
							{{ item.ShopRemark }}
						</view>
					</view>
				</view>
				<view class="" v-show="Inv == 3">
					<view class="small-tab" v-for="(item, index) in cyjujue">
						<view class="stabl-title-cont">
							<img :src="ShopPic" alt="" height="100%" />
							<span>{{ item.RealName }}</span>
							<label>{{ item.CreateTime }}</label>
							
							<i @click="cyjujueClick(e)" :data-id="item.Id" :data-Status="item.Status">通过</i>
						</view>
						<view class="stable-dl">
							{{ item.ShopRemark }}
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

				showAll:false, 
				 
				Inv:0,   //小切换
				Inv1:0,   //小切换
				Inv2:0,   //小切换
				Inv3:0,   //小切换
				Inv4:0,   //小切换
				Invx1:0,   //商讯大tab
				Invxs1:0,   //商讯大tab
				Invxs2:0,   //商讯大tab
				e:[],
				proId:'',
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
				　
				gongkai:[],
				sicun:[],
				daishen:[],
				jujue:[],
				gongkai1:[],
				sicun1:[],
				daishen1:[],
				jujue1:[],
				cygongkai:[],
				cysicun:[],
				cydaishen:[],
				cyjujue:[],
				slgongkai:[],
				slsicun:[],
				sldaishen:[],
				sljujue:[],
				
				shuoshuogk:[],
				shuoshuotz:[],
				wendagk:[],
				wendatz:[],
				liuyangk:[],
				liuyantz:[],
				
				ssPics1:[],
				ssPics2:[],
				ssPics3:[],
				ssPics4:[],
				ssPics5:[],
				ssPics6:[],
				
				
				
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
			this.getDataDetail();
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
			getDataDetail(){
				var getLocaUrl = document.location.href;
				var jqId = getLocaUrl.indexOf('1');
				var newId = getLocaUrl.substr(jqId);
				var newIds = newId.substring(0,19);
				this.proId = newIds
				uni.request({
					// 详情信息
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
				
				// 底部列表 商讯-我的商讯
				uni.request({
					url:this.$serverUrl + '/Product/Dev_Product/GetDataList',
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
					},
					
				});
				// 底部列表 商讯-外部投稿
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopProduct/GetDataList',
					success: (res) =>{
						var gongkai1 = res.data.rows.filter(function (e) { return e.Status == '2'; });
						var sicun1 = res.data.rows.filter(function (e) { return e.Status == '4'; });
						var daishen1 = res.data.rows.filter(function (e) { return e.Status == '1'; });
						var jujue1 = res.data.rows.filter(function (e) { return e.Status == '3'; });
						this.gongkai1 = gongkai1;
						this.sicun1 = sicun1;
						this.daishen1 = daishen1;
						this.jujue1 = jujue1;
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
					},
					
				});
				// 底部列表 商号成员信息
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopMember/GetDataList',
					success: (res) =>{
						var cygongkai = res.data.rows.filter(function (e) { return e.Status == '2'; });
						var cysicun = res.data.rows.filter(function (e) { return e.Status == '4'; });
						var cydaishen = res.data.rows.filter(function (e) { return e.Status == '1'; });
						var cyjujue = res.data.rows.filter(function (e) { return e.Status == '3'; });
						this.cygongkai = cygongkai;
						this.cysicun = cysicun;
						this.cydaishen = cydaishen;
						this.cyjujue = cyjujue;
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
					},
					
				});
				// 底部列表 商链 信息
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopLink/GetDataList',
					success: (res) =>{
						var slgongkai = res.data.rows.filter(function (e) { return e.Status == '2'; });
						var slsicun = res.data.rows.filter(function (e) { return e.Status == '4'; });
						var sldaishen = res.data.rows.filter(function (e) { return e.Status == '1'; });
						var sljujue = res.data.rows.filter(function (e) { return e.Status == '3'; });
						this.slgongkai = slgongkai;
						this.slsicun = slsicun;
						this.sldaishen = sldaishen;
						this.sljujue = sljujue;
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
					},
					
				});
				
				// 底部列表 说说 信息
				uni.request({
					url:this.$serverUrl + '/OtherManage/Dev_Comment/GetDataList',
					success: (res) =>{
						console.log(res)
						var shuoshuogk = res.data.rows.filter(function (e) { return e.Status == '1'; });
						var shuoshuotz = res.data.rows.filter(function (e) { return e.Status == '2'; });
						var wendagk = res.data.rows.filter(function (e) { return e.Status == '1'; });
						var wendatz = res.data.rows.filter(function (e) { return e.Status == '2'; });
						var liuyangk = res.data.rows.filter(function (e) { return e.Status == '1'; });
						var liuyantz = res.data.rows.filter(function (e) { return e.Status == '2'; });
						this.shuoshuogk = shuoshuogk;
						this.shuoshuotz = shuoshuotz;
						this.wendagk = wendagk;
						this.wendatz = wendatz;
						this.liuyangk = liuyangk;
						this.liuyantz = liuyantz;
						for ( var s = 0; s < res.data.rows.length; s ++ ){
							
							var morePic = res.data.rows[s].CommentPic;
							var newPics = morePic.split(';');
							this.ssPics1 = newPics[0];
							this.ssPics2 = newPics[1];
							this.ssPics3 = newPics[2];
							this.ssPics4 = newPics[3];
							this.ssPics5 = newPics[4];
							this.ssPics6 = newPics[5];
						
						}
						
						
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
					},
					
				});
				
			},
			// 我的商讯 公开 私存按钮点击
			gongkaiClick: function(e) {
				console.log(e)
				//获取点击对象      
			    var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Product/Dev_Product/UpdateData',
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
			// 我的商讯 私存到待审
			sicunClick: function(e) {
				//获取点击对象      
			    var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Product/Dev_Product/UpdateData',
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
			// 商讯- 外部投稿	 -公开-通过按钮
			gongkai1Click:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopProduct/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:4
					},
					success: (res) =>{
						console.log(res)
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
			// 商讯- 外部投稿	 -停止-公开按钮
			sicun1Click:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopProduct/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:2
					},
					success: (res) =>{
						console.log(res)
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
			
			// 商讯- 外部投稿	 -待审-通过按钮
			tongguo1Click:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopProduct/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:2
					},
					success: (res) =>{
						console.log(res)
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
			// 商讯- 外部投稿	 -待审-拒绝按钮
			jujue1Click:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopProduct/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:3
					},
					success: (res) =>{
						console.log(res)
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
			// 商讯- 外部投稿	 -拒绝
			tongguo2Click:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopProduct/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:2
					},
					success: (res) =>{
						console.log(res)
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
			// 成员 通过 按钮
			cygongkaiClick:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopMember/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:4
					},
					success: (res) =>{
						console.log(res)
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
			// 成员 停止 按钮
			cysicunClick:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopMember/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:2
					},
					success: (res) =>{
						console.log(res)
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
			// 成员 待审-拒绝 按钮
			cydaishen1Click:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopMember/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:3
					},
					success: (res) =>{
						console.log(res)
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
			// 成员 待审-通过 按钮
			cydaishen2Click:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopMember/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:2
					},
					success: (res) =>{
						console.log(res)
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
			// 成员 待审-通过 按钮
			cyjujueClick:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopMember/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:2
					},
					success: (res) =>{
						console.log(res)
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
			// 商链 通过 按钮
			slgongkaiClick:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopLink/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:4
					},
					success: (res) =>{
						console.log(res)
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
			// 商链 停止 按钮
			slsicunClick:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopLink/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:2
					},
					success: (res) =>{
						console.log(res)
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
			// 商链 待审-拒绝按钮
			sldaishen1Click:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopLink/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:3
					},
					success: (res) =>{
						console.log(res)
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
			// 商链 待审-通过按钮
			sldaishen2Click:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopLink/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:2
					},
					success: (res) =>{
						console.log(res)
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
			// 商链 待审-通过按钮
			sljujueClick:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopLink/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:2
					},
					success: (res) =>{
						console.log(res)
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
			// 商链 待审-通过按钮
			sljujueClick:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/Shop/Dev_ShopLink/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:2
					},
					success: (res) =>{
						console.log(res)
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
			// 问答 公开 
			wdgkClick:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/OtherManage/Dev_Comment/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:2
					},
					success: (res) =>{
						console.log(res)
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
			// 问答 停止
			wdtzClick:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/OtherManage/Dev_Comment/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:1
					},
					success: (res) =>{
						console.log(res)
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
			// 说说 公开
			ssgkClick:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/OtherManage/Dev_Comment/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:2
					},
					success: (res) =>{
						console.log(res)
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
			// shuoshuo 停止
			sstzClick:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/OtherManage/Dev_Comment/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:1
					},
					success: (res) =>{
						console.log(res)
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
			// 留言 公开
			lygkClick:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/OtherManage/Dev_Comment/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:2
					},
					success: (res) =>{
						console.log(res)
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
			// 留言 停止
			lytzClick:function(e){
				var el = event.currentTarget;
				var datasetId = el.dataset.id,
				    datasetStatus = el.dataset.status;
				uni.request({
					url:this.$serverUrl + '/OtherManage/Dev_Comment/UpdateData',
					method:'POST',
					data: {
						id:datasetId,
						status:1
					},
					success: (res) =>{
						console.log(res)
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
