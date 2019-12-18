<template>
	<view class="content">
		<view class="my-header-wrap">
			<img src="static/images/setting-icon.png" alt="" class="setting-icon" />
			<view class="my-top-txs">
				<img src="static/images/my-tx.png" alt="" class="my-tx-icon" />
				<span class="my-name">爱吃面包的猫</span>
				<span class="my-time">2019-01-02</span>
			</view>
		</view>
		<view class="my-fl-three">
			<ul>
				<li>
					<img src="/static/images/my-icon1.png" alt=""/>
					<span>创建商区</span>
				</li>
				<li>
					<img src="/static/images/my-icon2.png" alt=""/>
					<span>发布内容</span>
				</li>
				<li>
					<img src="/static/images/my-icon3.png" alt=""/>
					<span>付费窗口</span>
				</li>
			</ul>
		</view>
		<view class="my-cont-wrap">
			<view class="my-cont-title">
				<label></label>
				<span>我的代理信息</span>
				<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
			</view>
			<view class="my-dl-wrap">
				<ul>
					<li style="width: 30%;margin-left: 35%;"><span>申请代理商</span></li>
					<!-- <li style="width: 40%;"><span>商家经办加入代理</span></li>
					<li style="width: 30%;"><span>申请业务员</span></li> -->
				</ul>
			</view>
		</view>
		<!-- <view class="my-cont-wrap">
			<view class="my-cont-title">
				<label></label>
				<span>我的待审事项</span>
				<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
			</view>
			<view class="my-dl-three">
				<ul class="my-three-ul">
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>内容投稿待审</label>
					</li>
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>商区内链待审</label>
					</li>
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>成员加入待审</label>
					</li>
				</ul>
			</view>
		</view> -->
		<view class="my-cont-wrap">
			<view class="my-cont-title">
				<label></label>
				<span>我的账号管理</span>
				<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
				<img src="static/images/my-wen.png" alt="" class="my-wen-icon-rr" />
			</view>
			<view class="my-dl-three">
				<ul class="my-three-ul">
					<li>
						<span>205</span>
						<label>充值余额</label>
					</li>
					<li>
						<span>205</span>
						<label>我的收入</label>
					</li>
					<li>
						<span>205</span>
						<label>应结余额</label>
					</li>
				</ul>
			</view>
		</view>
		<view class="my-cont-wrap">
			<view class="my-cont-title">
				<label></label>
				<span>我的会员主页</span>
				<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
				<img src="static/images/my-wen.png" alt="" class="my-wen-icon-rr" />
			</view>
			<view class="my-dl-three">
				<ul class="my-one-ul">
					<li>
						<span>205</span>
						<label>我的商号</label>
					</li>
				</ul>
			</view>
		</view>
		<view class="my-cont-wrap">
			<view class="my-cont-title">
				<label></label>
				<span>我的消息处理</span>
				<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
				<img src="static/images/my-wen.png" alt="" class="my-wen-icon-rr" />
			</view>
			<view class="my-dl-three">
				<ul class="my-two-ul">
					<li>
						<span>205</span>
						<label>未读消息</label>
					</li>
					<li>
						<span>205</span>
						<label>全部消息</label>
					</li>
				</ul>
			</view>
		</view>
		<view class="my-cont-wrap">
			<view class="my-cont-title">
				<label></label>
				<span>我的推广拓客</span>
				
				<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
				<i class="my-cont-title-i">205</i>
				<img src="static/images/my-wen.png" alt="" class="my-wen-icon-rr" />
			</view>
			
		</view>
		<view class="my-cont-wrap">
			<view class="my-cont-title">
				<label></label>
				<span>我的商讯收藏</span>
				
				<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
				<i class="my-cont-title-i">205</i>
				<img src="static/images/my-wen.png" alt="" class="my-wen-icon-rr" />
			</view>
			
		</view>
		<!-- <view class="my-cont-wrap">
			<view class="my-cont-title">
				<label></label>
				<span>我管理的商区</span>
				<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
			</view>
			<view class="my-dl-three">
				<ul class="my-four-ul">
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>商区</label>
					</li>
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>内容</label>
					</li>
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>内链</label>
					</li>
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>外链</label>
					</li>
				</ul>
			</view>
		</view>
		<view class="my-cont-wrap">
			<view class="my-cont-title">
				<label></label>
				<span>我加入的商区</span>
				<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
			</view>
			<view class="my-dl-three">
				<ul class="my-two-ul">
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>已加商区</label>
					</li>
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>待审商区</label>
					</li>
				</ul>
			</view>
		</view>
		<view class="my-cont-wrap">
			<view class="my-cont-title">
				<label></label>
				<span>我的收藏关注</span>
				<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
			</view>
			<view class="my-dl-three">
				<ul class="my-two-ul">
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>商区</label>
					</li>
					<li>
						<span>205<img src="static/images/my-wen.png" alt="" class="my-wen-icon" /></span>
						<label>内容</label>
					</li>
				</ul>
			</view>
		</view> -->
		<view class="my-sj-lx">
			<view class="my-sj-lx-wrap">
				<view class="my-cont-title">
					<span>商九客服信息</span>
					<img src="static/images/right-arrow.png" alt="" class="right-arrow" />
				</view>
				<view class="my-sj-lxx">
					<view class="my-dh">
						<span>电话：</span>
						<label>13500000000</label>
					</view>
					<view class="my-yx">
						<span>邮箱：</span>
						<label>xxxxxxx@163.com</label>
					</view>
				</view>
			</view>
		</view>
		
	</view>
	
</template>

<script>
	import 'static/css/shopAdd.css'
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {

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
