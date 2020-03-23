<template>
	<view class="uni-flex article uni-column">
		<view class="uni-flex uni-h4  article-title">{{article.title}}</view>
		<view class="uni-flex  color-555 article-time">
			<view class="" style="font-size: 24upx;">{{article.createDate}}</view>
		</view>
		<view class="uni-flex pic" v-if="mode==1"><image :src="article.pic" mode="widthFix"></image></view>
		<view class="uni-flex ">
			<u-parse :content="htmlString" @preview="preview" @navigate="navigate" />
		</view>
	</view>
</template>

<script>
	import marked from '../../../components/marked'
	import uParse from '@/components/u-parse/u-parse.vue'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				id: 0,
				article: {},
				htmlString: "",
				userid : 0,
				mode: 0
			};
		},
		onLoad(e) {
			this.id = e.id;
			this.userid = e.userid;
			this.getData();
		},
		methods: {
			preview(src, e) {
				// do something
				//console.log("src: " + src);
			},
			navigate(href, e) {
				// 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
				//console.log("href: " + href);
				/* uni.showModal({
					content: "点击链接为：" + href,
					showCancel: false
				}) */
			},
			getData() {
				uni.showLoading({
					title: '页面加载中',
					mask: true
				});
				uni.request({
					url: this.webUrl + 'GetMessageView',
					method: 'POST',
					data: {
						userid: this.userid,
						id: this.id
					},
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						uni.hideLoading();
							this.article = res.data.data;
							this.mode =this.article.mode;
							uni.setNavigationBarTitle({
								title: this.article.title
							});
							this.htmlString = marked(this.article.reMark);
					},
					fail: () => {},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	/* @import url("../../../components/gaoyia-parse/parse.css"); */
	@import url("../../../components/gaoyia-parse/parse.css");
	.article .article-title, .article-time,.pic{
		padding: 0 50upx;
	}
	.article .pic {
		margin-top: 45upx;
		/* #ifdef H5 */
		margin-bottom: 45upx;
		/* #endif */
		margin-bottom: ;
	}
	.article .article-title {
		margin-top: 50upx;
		margin-bottom: 10upx;
	}

	.article .article-time {
		font-size: 22upx;
		color: #919294;
		justify-content: space-between;
	}
	
	.article .article-time .article-btn {
		width: 100upx;
		height: 42upx;
		text-align: center;
		line-height: 42upx;
		color: #fceaea;
		background: #dd0000;
	}
	
	.article .wxParse .p {
		text-indent: 2em;
	}
	
	.article .wxParse .img{
		width: 730upx !important;
		margin-left:  11.5upx;
		margin-bottom: 3upx;
	}
</style>
