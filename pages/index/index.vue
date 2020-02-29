<template>
	<view class="content" id="app">
		<view class="text-area">
			<view class="main-header-wrap">
				<input type="text" />
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
					<view :class="['inv-h',Inv==4?'inv-h-se':'']" @click="Inv=4">停止(20)</view>
                </view>
                <view class="" v-show="Inv == 0">
					<view class="small-tab">
						<view class="main-tab-nr">
							<view class="main-tb-title">
								<span>2019-09-19</span>
								<label>私存</label>
							</view>
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
							<view class="main-tab-r-b">
								<span>成员待审（120）</span>
								<span>投稿待审（120）</span>
								<span>商链待审（120）</span>
							</view>
						</view>
					</view>
					<view class="small-tab">
						<view class="main-tab-nr">
							<view class="main-tb-title">
								<span>2019-09-19</span>
								<label>私存</label>
							</view>
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
							<view class="main-tab-r-b">
								<span>成员待审（120）</span>
								<span>投稿待审（120）</span>
								<span>商链待审（120）</span>
							</view>
						</view>
					</view>
					<view class="small-tab">
						<view class="main-tab-nr">
							<view class="main-tb-title">
								<span>2019-09-19</span>
								<label>私存</label>
							</view>
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
							<view class="main-tab-r-b">
								<span>成员待审（120）</span>
								<span>投稿待审（120）</span>
								<span>商链待审（120）</span>
							</view>
						</view>
					</view>
					
                </view>
                <view class="" v-show="Inv == 1">
					<view class="small-tab">
						<view class="main-tab-nr">
							<view class="main-tb-title">
								<span>2019-09-19</span>
								<label>公开</label>
							</view>
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
								</ul>
							</view>
						</view>
					</view>
                </view>
				<view class="" v-show="Inv == 2">
					<view class="small-tab">
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
								</ul>
							</view>
						</view>
					</view>
					<view class="small-tab">
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
								</ul>
							</view>
						</view>
					</view>
				</view>
				<view class="" v-show="Inv == 3">
					<view class="small-tab">
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
								</ul>
							</view>
						</view>
					</view>
					<view class="small-tab">
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
								</ul>
							</view>
						</view>
					</view>
					<view class="small-tab">
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
								</ul>
							</view>
						</view>
					</view>
				</view>
				<view class="" v-show="Inv == 4">
					<view class="small-tab">
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
								</ul>
							</view>
						</view>
					</view>
					<view class="small-tab">
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
								</ul>
							</view>
						</view>
					</view>
					<view class="small-tab">
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
								</ul>
							</view>
						</view>
					</view>
					<view class="small-tab">
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
								</ul>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="list" v-show="tabCurrentIndex === 1">
				<!-- {{ item.state }} -->
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
			<view class="list" v-show="tabCurrentIndex === 2">
				<!-- {{ item.state }} -->
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

