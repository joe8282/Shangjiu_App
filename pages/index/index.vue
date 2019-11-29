<template>
	<view class="content" id="app">
		<view class="text-area">
			<view class="main-header-wrap">
				<input type="text" />
			</view>
			
		</view>
		<view class="main-toggle-wrap">
			<view class="main-toggle-cont">
				<span class="main-cjsh-btn">+ 创建商号</span>
				<ul class="main-toggle-ul">
					<li>1．会员可根据需要创建多个商号，用于商家经营推广、创业、接活；做自媒与内容。</li>
					<li>2．商号为创新社群模式，内置“商讯、</li>
					<li>3．商号为创新社群模式，内置“商讯、</li>
				</ul>
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
							<button @click="favor" class="my_button" :style="{backgroundColor:bg_color, color: ft_color,}" @mouseenter="change()" @mouseleave="goback()">
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
				333
				
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
	import 'static/css/index.css';
	import uniFav from "@/components/uni-fav/uni-fav.vue"
	export default {
		components: {
			uniFav
		},
		data() {
			return {
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
			};
		},

		onLoad(options) {
			// 页面显示是默认选中第一个
			this.tabCurrentIndex = 0;
		},

		methods: {
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

