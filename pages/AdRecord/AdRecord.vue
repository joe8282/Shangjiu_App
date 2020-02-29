<template>
	<view class="content" id="app">
		<view class="main-toggle-wrap">
			<view class="main-toggle-cont">
				<span class="main-cjsh-btn">商号推广</span>
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
		<view class="ARtitle-wrap">
			<span>推广中（123）</span>
		</view>
		<view class="ARnews-wrap">
			<view class="ARnews-conts-list">
				<view class="ARcl-list-title">
					<view class="ARcl-list">
						<span>推广区域</span>
						<label>某某市</label>
					</view>
					<view class="ARcl-list">
						<span>开始时间</span>
						<label>2019-12-02</label>
					</view>
					<view class="ARcl-list">
						<span>结束时间</span>
						<label>2019-12-02</label>
					</view>
					<view class="ARcl-list">
						<span>剩余天数</span>
						<label>156天</label>
					</view>
				</view>
				<view class="ARzdtg-cont">
					<span>置顶推广</span>
					<span>共165天</span>
					<span>剩余165天</span>
					<span></span>
				</view>
				<view class="ARzdsx-cont">
					<span>自动刷新</span>
					<span>共165天</span>
					<span>剩余165天</span>
					<span>3次/天</span>
				</view>
			</view>
			<view class="ARbottom-wrap">
				<span>置顶推广</span>
				<span class="ARred">手动刷新</span>
				<span>自动刷新</span>
			</view>
		</view>
		<view class="ARnews-wrap">
			<view class="ARnews-conts-list">
				<view class="ARcl-list-title">
					<view class="ARcl-list">
						<span>推广区域</span>
						<label>某某市</label>
					</view>
					<view class="ARcl-list">
						<span>开始时间</span>
						<label>2019-12-02</label>
					</view>
					<view class="ARcl-list">
						<span>结束时间</span>
						<label>2019-12-02</label>
					</view>
					<view class="ARcl-list">
						<span>剩余天数</span>
						<label>156天</label>
					</view>
				</view>
				<view class="ARzdtg-cont">
					<span>置顶推广</span>
					<span>共165天</span>
					<span>剩余165天</span>
					<span></span>
				</view>
			</view>
			<view class="ARbottom-wrap">
				<span>置顶推广</span>
				<span class="ARred">手动刷新</span>
				<span class="ARred">自动刷新</span>
			</view>
		</view>
		<view class="ARnews-wrap">
			<view class="ARnews-conts-list">
				<view class="ARcl-list-title">
					<view class="ARcl-list">
						<span>推广区域</span>
						<label>某某市</label>
					</view>
					<view class="ARcl-list">
						<span>开始时间</span>
						<label>2019-12-02</label>
					</view>
					<view class="ARcl-list">
						<span>结束时间</span>
						<label>2019-12-02</label>
					</view>
					<view class="ARcl-list">
						<span>剩余天数</span>
						<label>156天</label>
					</view>
				</view>
				<view class="ARzdsx-cont">
					<span>自动刷新</span>
					<span>共165天</span>
					<span>剩余165天</span>
					<span>3次/天</span>
				</view>
			</view>
			<view class="ARbottom-wrap">
				<span class="ARred">置顶推广</span>
				<span class="ARred">手动刷新</span>
				<span>自动刷新</span>
			</view>
		</view>
	</view>
	
</template>

<script>
	import 'pages/AdRecord/AdRecord.css';
	export default {
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
				showAll:false
			}

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
			}
		 },

		methods: {
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

